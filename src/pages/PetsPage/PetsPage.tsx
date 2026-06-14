import css from "./PetsPage.module.css";
import { Title } from "../../components/Title/Title";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const PetsPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [gender, setGender] = useState(null);
  const [species, setSpecies] = useState(null);

  console.log(category);


  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    // const options =  await getCategories();
  };
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

  const getPets = async(category?, query?, gender?) => {
    const {data} = await axios.get("https://petlove-backend-jniu.onrender.com/api/pets", {
      params: {
        category: category,
        search: query,
        gender,
      }
    }
    );
      console.log(data);
    return data;
  }

    const { data: petsData, isLoading } = useQuery({
    queryKey: ["petsData", category, query, gender],
    queryFn: () => getPets(category, query, gender),
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

  const speciesOptions = speciesData?.map(item => {
    return {
      value: item,
      label: item[0].toUpperCase() + item.slice(1),
    }
  })

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
      <div className={css.filtersContainer}>
        <SearchBar onSearch={handleSearch} />
        <div className={css.categoryGender}>
          <Select className={css.select} options={categoryOptions}  placeholder="Category" value={category} onChange={(option) => setCategory(option?.value || null)}/>
            <Select className={css.select} options={genderOptions} placeholder="By gender" value={gender} onChange={(option) => setGender(option?.value || null)}/>
            
        </div>
             <Select className={css.select} options={speciesOptions} placeholder="By type" value={species} onChange={(option) => setSpecies(option?.value || null)}/>
      </div>
       <PetsList pets={pets}/>
     

     
    </>
  );
};

const PetsList = ({pets}) => {
  return (
    <ul className={css.petsList}>
      {pets?.map(pet => <Pet pet={pet}/>)}
    </ul>

  )
}

const Pet = ({pet}) => {
  return (
       <li className={css.pet} key={pet._id}>
          <div className={css.petContainer}>
            <img src={pet.imgURL} alt="pet-image" />
            <h3>{pet.title}</h3>
          </div>
        </li>


  )
}
