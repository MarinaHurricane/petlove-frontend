import css from "./PetsPage.module.css";
import { Title } from "../../components/Title/Title";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useState } from "react";
import Select, { type SingleValue } from "react-select";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import AsyncSelect from "react-select/async";
import { Pagination } from "../../components/Pagination/Pagination";
import { PetsList } from "../../components/PetList/PetList";
import { asyncStyles, selectStyles } from "../../sevices/reactSelectStyles";
import {
  getPets,
  getSpecies,
  getCategories,
  getGender,
  getCities,
  type CityOption,
} from "../../lib/api/petsPage";
import { Modal } from "../../components/Modal/Modal";
import { PetModalInfo } from "../../components/PetModalInfo/PetModalInfo";
import { useAuthStore } from "../../lib/store/authStore";
import { LoginModal } from "../../components/LoginModal/LoginModal";
import { addFavoritePet } from "../../lib/api/petsPage";
import { FavoritesModal } from "../../components/FavoritesModal/FavoritesModal";
import { removePetFromFavorites } from "../../lib/api/user";
import { Icon } from "../../components/Icon/Icon";
import { Button } from "../../components/Button/Button";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import type { Pet } from "../../types/pet";

type SelectOption = {
  value: string;
  label: string;
};

export const PetsPage = () => {
  const { user } = useAuthStore();
  const setUser = useAuthStore((state) => state.setUser);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [species, setSpecies] = useState<string | null>(null);
  const [city, setCity] = useState<CityOption | null>(null);
  const [sort, setSort] = useState<string | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [modalType, setModalType] = useState("");
  const [addFavoriteModalOpen, setaddFavoriteModalOpen] = useState(false);

  const handleCloseModal = () => {
    setSelectedPet(null);
    setModalType(null);
  };

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handlePetClick = (pet: Pet) => {
    if (user) {
      setSelectedPet(pet);
    } else {
      setModalType("loginModal");
    }
  };

  const handleAddToFavorites = async (petId: string) => {
    if (!user) {
      setModalType("loginModal");
      return;
    }

    const updatedUser = await addFavoritePet(petId);
    setUser(updatedUser);
    setaddFavoriteModalOpen(true);
  };

  const handleDeleteFromFavorites = async (petId) => {
    if (!user) return;

    const updatedUser = await removePetFromFavorites(petId);
    setUser(updatedUser);
  };

  const handleSubmit = (formData: FormData) => {
    const searchValue = formData.get("search") as string;

    setQuery(searchValue.trim());
    setPage(1);
  };

  const handleReset = () => {
    setQuery("");
    setCategory(null);
    setGender(null);
    setSpecies(null);
    setCity(null);
    setSort(null);
    setPage(1);
  };

  const {
    data: petsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["petsData", category, query, gender, species, city, sort, page],
    queryFn: () => getPets(category, query, gender, species, city, sort, page),
    placeholderData: keepPreviousData,
  });

  const pets = petsData?.pets ?? [];
  const totalPages = petsData?.totalPages ?? 0;

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categoryOptions = categories?.map((category) => {
    return {
      value: category,
      label: category[0].toUpperCase() + category.slice(1),
    };
  });

  const { data: speciesData } = useQuery({
    queryKey: ["speciesData"],
    queryFn: getSpecies,
  });

  const speciesOptions = speciesData?.map((item) => {
    return {
      value: item,
      label: item[0].toUpperCase() + item.slice(1),
    };
  });

  const { data: genders } = useQuery({
    queryKey: ["genders"],
    queryFn: getGender,
  });

  const genderOptions = genders?.map((item) => {
    return {
      value: item,
      label: item[0].toUpperCase() + item.slice(1),
    };
  });

  if (isLoading) return <Loader />;

  if (isError) return <ErrorMessage />;

  return (
    <section className={css.petsPage}>
      <Title>Find your favorite pet</Title>

      <div className={css.formWrapper}>
        <form className={css.filtersForm} action={handleSubmit}>
          <SearchBar onSearch={handleSearch} className={css.petSearch} />

          <div className={css.categoryGender}>
            <Select<SelectOption>
              className={css.select}
              options={categoryOptions}
              placeholder="Category"
              value={
                categoryOptions?.find((option) => option?.value === category) ||
                null
              }
              onChange={(option: SingleValue<SelectOption>) =>
                setCategory(option?.value || null)
              }
              styles={selectStyles}
            />
            <Select<SelectOption>
              className={css.select}
              options={genderOptions}
              placeholder="By gender"
              value={
                genderOptions?.find(
                  (option: SingleValue<SelectOption>) =>
                    option?.value === gender,
                ) || null
              }
              onChange={(option) => setGender(option?.value || null)}
              styles={selectStyles}
            />
          </div>
          <Select<SelectOption>
            className={css.select}
            options={speciesOptions}
            placeholder="By type"
            value={
              speciesOptions?.find((option) => option?.value === species) ||
              null
            }
            onChange={(option: SingleValue<SelectOption>) =>
              setSpecies(option?.value || null)
            }
            styles={selectStyles}
          />
          <div className={css.locationWrapper}>
            <AsyncSelect
              className={css.select}
              cacheOptions
              defaultOptions
              loadOptions={getCities}
              value={city}
              onChange={setCity}
              placeholder="Location"
              isClearable
              loadingMessage={() => "Loading..."}
              styles={{
                ...selectStyles,
                ...asyncStyles,
              }}
            />
            <Icon name="icon-search" className={css.iconSearch} />
          </div>

          <div className={css.radioWrapper}>
            <label
              className={
                sort === "popular"
                  ? `${css.radioButton} ${css.active} `
                  : css.radioButton
              }
            >
              <input
                type="radio"
                name="sort"
                value="popular"
                checked={sort === "popular"}
                onChange={(e) => setSort(e.target.value || null)}
                hidden
              />
              Popular
            </label>
            <label
              className={
                sort === "unpopular"
                  ? `${css.radioButton} ${css.active} `
                  : css.radioButton
              }
            >
              <input
                type="radio"
                name="sort"
                value="unpopular"
                checked={sort === "unpopular"}
                onChange={(e) => setSort(e.target.value || null)}
                hidden
              />
              Unpopular
            </label>

            <label
              className={
                sort === "expensive"
                  ? `${css.radioButton} ${css.active} `
                  : css.radioButton
              }
            >
              <input
                type="radio"
                name="sort"
                value="expensive"
                checked={sort === "expensive"}
                onChange={(e) => setSort(e.target.value || null)}
                hidden
              />
              Expensive
            </label>
            <label
              className={
                sort === "cheap"
                  ? `${css.radioButton} ${css.active} `
                  : css.radioButton
              }
            >
              <input
                type="radio"
                name="sort"
                value="cheap"
                checked={sort === "cheap"}
                onChange={(e) => setSort(e.target.value || null)}
                hidden
              />
              Cheap
            </label>
            <Button type="button" onClick={handleReset}>
              Reset search
            </Button>
          </div>
        </form>
      </div>

      {pets?.length === 0 ? (
        <div className={css.noResults}>
          <h2>No pets found</h2>
          <p className={css.notice}>
            Try changing or resetting some filters to see more pets.
          </p>
          <Button
            type="button"
            className={css.resetFilters}
            onClick={handleReset}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <PetsList
          pets={pets}
          onPetClick={handlePetClick}
          onFavClick={handleAddToFavorites}
          onFavoriteDelete={handleDeleteFromFavorites}
          variant="generalList"
        />
      )}

      {selectedPet && (
        <Modal onClose={handleCloseModal}>
          <PetModalInfo pet={selectedPet} onClose={handleCloseModal} />
        </Modal>
      )}

      {modalType === "loginModal" && (
        <Modal onClose={handleCloseModal}>
          <LoginModal />
        </Modal>
      )}

      {addFavoriteModalOpen && (
        <Modal onClose={() => setaddFavoriteModalOpen(false)}>
          <FavoritesModal />
        </Modal>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </section>
  );
};
