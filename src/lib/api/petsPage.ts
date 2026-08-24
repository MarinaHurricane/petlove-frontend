import type { OwnPet } from "../../types/ownPet";
import type { Pet } from "../../types/pet";
import { api } from "./axios";

export const getPets = async (
  category?,
  query?,
  gender?,
  species?,
  city?,
  sort?,
  page?,
  perPage?,
) => {
  const { data } = await api.get("/pets", {
    params: {
      category: category,
      search: query,
      gender,
      species,
      location: city?.value,
      sort,
      page,
      perPage,
    },
  });

  return data;
};

export const getCategories = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>("/pets/categories");

  return data;
};

export const getSpecies = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>("/pets/species");

  return data;
};

export const getGender = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>("/pets/gender");

  return data;
};

export const getCities = async (
  search?: string,
): Promise<{ value: string; label: string }[]> => {
  const { data } = await api.get(
    search ? "/cities/locations" : "/cities",
    search
      ? {
          params: { search },
        }
      : undefined,
  );

  return data.map((city) => ({
    value: city.city,
    label: city.city,
  }));
};

export const getPetById = async (petId: string): Promise<Pet> => {
  const { data } = await api.get<Pet>(`/pets/${petId}`);

  return data;
};

export const addFavoritePet = async (petId: string) => {
  const { data } = await api.patch(`/user/me/favorites/${petId}`);

  return data;
};

export const addOwnPet = async (petData: FormData): Promise<OwnPet> => {
  const { data } = await api.post<OwnPet>("/pets", petData);

  return data;
};

export const getRandomPet = async (species: string): Promise<Pet> => {
  const { data } = await api.get<Pet>(`/pets/random/${species}`);

  return data;
};
