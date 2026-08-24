import type { OwnPet } from "../../types/ownPet";
import type { Pet } from "../../types/pet";
import { api } from "./axios";

type PetResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  totalPets: number;
  pets: Pet[];
};
type City = {
  city: string;
};

type CityOption = {
  value: string;
  label: string;
};

export const getPets = async (
  category?: string,
  query?: string,
  gender?: string,
  species?: string,
  city?: CityOption | null,
  sort?: string,
  page?: number,
  perPage?: number,
): Promise<PetResponse> => {
  const { data } = await api.get<PetResponse>("/pets", {
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
): Promise<CityOption[]> => {
  const { data } = await api.get<City[]>(
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

export const getRandomPet = async (species: "dog" | "cat"): Promise<Pet> => {
  const { data } = await api.get<Pet>(`/pets/random/${species}`);

  return data;
};
