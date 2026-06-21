import css from "./PetsPage.module.css";
import { Title } from "../../components/Title/Title";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AsyncSelect from "react-select/async";
// import { getCities, cityOptions } from "../../sevices/petsPage";

export const PetsPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [gender, setGender] = useState(null);
  const [species, setSpecies] = useState(null);
  const [city, setCity] = useState(null);
const [sort, setSort] = useState(null);

  console.log(category);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    // const options =  await getCategories();
  };

  const handleReset = () => {
    setQuery("");
    setCategory(null);
    setGender(null);
    setSpecies(null);
    setCity(null);
    setSort(null);
  }
  const getCategories = async () => {
    const { data } = await axios.get(
      "https://petlove-backend-jniu.onrender.com/api/pets/categories",
    );
    console.log(data);
    return data;
  };

  const getSpecies = async () => {
    const { data } = await axios.get(
      "https://petlove-backend-jniu.onrender.com/api/pets/species",
    );
    console.log(data);
    return data;
  };

  const getGender = async () => {
    const { data } = await axios.get(
      "https://petlove-backend-jniu.onrender.com/api/pets/gender",
    );
    console.log(data);
    return data;
  };

  const getCities = async (search?) => {
    if (!search) return [];
    const { data } = await axios.get(
      "https://petlove-backend-jniu.onrender.com/api/cities/locations",
      {
        params: {
          search: search,
        },
      },
    );
    console.log(data);
    const cityData = data.map((city) => ({
      value: city.city,
      label: city.city,
    }));
    console.log(cityData);
    return data.map((city) => ({
      value: city.city,
      label: city.city,
    }));
  };

  const getPets = async (category?, query?, gender?, city?, sort?) => {
    const { data } = await axios.get(
      "https://petlove-backend-jniu.onrender.com/api/pets",
      {
        params: {
          category: category,
          search: query,
          gender,
          location: city?.value,
          sort,
        },
      },
    );
    console.log(data);
    return data;
  };

  const { data: petsData, isLoading } = useQuery({
    queryKey: ["petsData", category, query, gender, city, sort],
    queryFn: () => getPets(category, query, gender, city, sort),
  });
  console.log(petsData?.pets);
  console.log(gender);

  const pets = petsData?.pets;

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  console.log(categories);

  const { data: speciesData } = useQuery({
    queryKey: ["speciesData"],
    queryFn: getSpecies,
  });

  const { data: genders } = useQuery({
    queryKey: ["genders"],
    queryFn: getGender,
  });

  const speciesOptions = speciesData?.map((item) => {
    return {
      value: item,
      label: item[0].toUpperCase() + item.slice(1),
    };
  });

  const categoryOptions = categories?.map((category) => {
    return {
      value: category,
      label: category[0].toUpperCase() + category.slice(1),
    };
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
            value={categoryOptions?.find(option => option?.value === category) || null}
            onChange={(option) => setCategory(option?.value || null)}
          />
          <Select
            className={css.select}
            options={genderOptions}
            placeholder="By gender"
            value={genderOptions?.find(option => option?.value === gender) || null}
            onChange={(option) => setGender(option?.value || null)}
          />
        </div>
        <Select
          className={css.select}
          options={speciesOptions}
          placeholder="By type"
          value={speciesOptions?.find(option => option?.value === species) || null}
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
          <input type="radio" 
          name="sort" 
          value="popular"
          checked={sort === "popular"} 
          onChange={(e) => setSort(e.target.value || null)}
          />
          Popular
        </label>
        <label>
          <input type="radio" 
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
          onChange={(e)=> setSort(e.target.value || null)}/>
          Expensive
        </label>
        <label>
          <input type="radio"
          name="sort"
          value="cheap"
          checked={sort === "cheap"}
          onChange={(e) => setSort(e.target.value || null)} />
          Cheap
        </label>
      </form>
      <button onClick={handleReset}>Reset search</button>
      <PetsList pets={pets} />
    </>
  );
};

const PetsList = ({ pets }) => {
  return (
    <ul className={css.petsList}>
      {pets?.map((pet) => (
        <Pet pet={pet} />
      ))}
    </ul>
  );
};

const Pet = ({ pet }) => {
  return (
    <li className={css.pet} key={pet._id}>
      <div className={css.petContainer}>
        <img src={pet.imgURL} alt="pet-image" />
        <h3>{pet.title}</h3>
      </div>
    </li>
  );
};
