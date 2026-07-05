import axios from "axios";
import { api } from "./axios";

export const getPets = async (
  category?,
  query?,
  gender?,
  city?,
  sort?,
  page,
) => {
  const { data } = await api.get("/pets", {
    params: {
      category: category,
      search: query,
      gender,
      location: city?.value,
      sort,
      page,
    },
  });
  console.log(data);
  return data;
};

export const getCategories = async () => {
  const { data } = await api.get("/pets/categories");
  console.log(data);
  return data;
};

export const getSpecies = async () => {
  const { data } = await api.get("/pets/species");
  console.log(data);
  return data;
};

export const getGender = async () => {
  const { data } = await api.get("/pets/gender");
  console.log(data);
  return data;
};

export const getCities = async (search?) => {
  if (!search) return [];
  const { data } = await api.get("/cities/locations", {
    params: {
      search: search,
    },
  });
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


export const getPetById = async(petId) => {
  const { data } = await api.get(`/pets/${petId}`);

  return data;
}

export const addFavoritePet = async(petId) => {
  const {data} = await api.patch(`user/me/favorites/${petId}`);
  console.log(data);
  return data;
}