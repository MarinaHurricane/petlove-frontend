import css from "./PetsPage.module.css";
import { Title } from "../../components/Title/Title";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import AsyncSelect from "react-select/async";
import { Pagination } from "../../components/Pagination/Pagination";
import { PetsList } from "../../components/PetList/PetList";

import {
  getPets,
  getSpecies,
  getCategories,
  getGender,
  getCities,
  getPetById,
} from "../../lib/api/petsPage";
import { Modal } from "../../components/Modal/Modal";
import { PetModalInfo } from "../../components/PetModalInfo/PetModalInfo";

export const PetsPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [gender, setGender] = useState(null);
  const [species, setSpecies] = useState(null);
  const [city, setCity] = useState(null);
  const [sort, setSort] = useState(null);
  const [isOpen, setIsopen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const handleOpenModal = () => setIsopen(true);
  const handleCloseModal = () => setIsopen(false);

  console.log(category);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    console.log(pet);
  };

  const handleReset = () => {
    setQuery("");
    setCategory(null);
    setGender(null);
    setSpecies(null);
    setCity(null);
    setSort(null);
  };

  const { data: petsData, isLoading } = useQuery({
    queryKey: ["petsData", category, query, gender, city, sort, page],
    queryFn: () => getPets(category, query, gender, city, sort, page),
  });
  console.log(petsData?.pets);
  console.log(gender);

  const pets = petsData?.pets;
  const totalPages = petsData?.totalPages;

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  console.log(categories);

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

  return (
    <>
      <Title>Find your favorite pet</Title>

      <SearchBar onSearch={handleSearch} />
      <form className={css.filtersForm}>
        <div className={css.categoryGender}>
          <Select
            className={css.select}
            options={categoryOptions}
            placeholder="Category"
            value={
              categoryOptions?.find((option) => option?.value === category) ||
              null
            }
            onChange={(option) => setCategory(option?.value || null)}
          />
          <Select
            className={css.select}
            options={genderOptions}
            placeholder="By gender"
            value={
              genderOptions?.find((option) => option?.value === gender) || null
            }
            onChange={(option) => setGender(option?.value || null)}
          />
        </div>
        <Select
          className={css.select}
          options={speciesOptions}
          placeholder="By type"
          value={
            speciesOptions?.find((option) => option?.value === species) || null
          }
          onChange={(option) => setSpecies(option?.value || null)}
        />
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={getCities}
          value={city}
          // onChange={(city) => setCity(city?.value || null)}
          onChange={setCity}
          placeholder="Available locations..."
          isClearable
        />

        <label>
          <input
            type="radio"
            name="sort"
            value="popular"
            checked={sort === "popular"}
            onChange={(e) => setSort(e.target.value || null)}
          />
          Popular
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="unpopular"
            checked={sort === "unpopular"}
            onChange={(e) => setSort(e.target.value || null)}
          />
          Unpopular
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="expensive"
            checked={sort === "expensive"}
            onChange={(e) => setSort(e.target.value || null)}
          />
          Expensive
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="cheap"
            checked={sort === "cheap"}
            onChange={(e) => setSort(e.target.value || null)}
          />
          Cheap
        </label>
      </form>
      <button onClick={handleReset}>Reset search</button>
      <PetsList pets={pets} onPetClick={handlePetClick} />
      {selectedPet && (
        <Modal onClose={() => setSelectedPet(null)}>
          <PetModalInfo pet={selectedPet} />
        </Modal>
      )}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
};
