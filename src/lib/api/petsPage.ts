import { api } from "./axios";

export const getPets = async (
  category?,
  query?,
  gender?,
  species?,
  city?,
  sort?,
  page,
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

export const getCategories = async () => {
  const { data } = await api.get("/pets/categories");

  return data;
};

export const getSpecies = async () => {
  const { data } = await api.get("/pets/species");

  return data;
};

export const getGender = async () => {
  const { data } = await api.get("/pets/gender");

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

// export const getCities = async (search?) => {
//   if (!search) return [];
//   const { data } = await api.get("/cities/locations", {
//     params: {
//       search: search,
//     },
//   });

//   const cityData = data.map((city) => ({
//     value: city.city,
//     label: city.city,
//   }));
//   console.log(cityData);
//   return data.map((city) => ({
//     value: city.city,
//     label: city.city,
//   }));
// };

// export const getAllCities = async (): Promise<
//   { value: string; label: string }[]
// > => {
//   const { data } = await api.get("/cities");

//   return data.map((city) => ({
//     value: city.city,
//     label: city.city,
//   }));
// };

export const getPetById = async (petId) => {
  const { data } = await api.get(`/pets/${petId}`);

  return data;
};

export const addFavoritePet = async (petId) => {
  const { data } = await api.patch(`user/me/favorites/${petId}`);

  return data;
};

export const addOwnPet = async (petData) => {
  const { data } = await api.post("/pets", petData);
  return data;
};

export const getRandomPet = async (species) => {
  const { data } = await api.get(`/pets/random/${species}`);
  return data;
};

// import type { Pet } from "../../types/pet";
// import { api } from "./axios";

// type PetResponse = {
//   page: number;
//   perPage: number;
//   totalPages: number;
//   totalPets: number;
//   pets: Pet[];
// };

// export const getPets = async (
//   category?: string,
//   query?: string,
//   gender?: string,
//   species?: string,
//   city?: { value: string; label: string } | null,
//   sort?: string,
//   page?: number,
//   perPage?: number,
// ): Promise<PetResponse> => {
//   const { data } = await api.get<PetResponse>("/pets", {
//     params: {
//       category,
//       search: query,
//       gender,
//       species,
//       location: city?.value,
//       sort,
//       page,
//       perPage,
//     },
//   });

//   return data;
// };

// export const getCategories = async (): Promise<string[]> => {
//   const { data } = await api.get<string[]>("/pets/categories");

//   return data;
// };

// export const getSpecies = async (): Promise<string[]> => {
//   const { data } = await api.get<string[]>("/pets/species");

//   return data;
// };

// export const getGender = async (): Promise<string[]> => {
//   const { data } = await api.get<string[]>("/pets/gender");

//   return data;
// };

// export const getCities = async (search?: string): Promise<CityOption[]> => {
//   if (!search) return [];

//   const { data } = await api.get<{ city: string }[]>("/cities/locations", {
//     params: {
//       search,
//     },
//   });

//   return data.map((city) => ({
//     value: city.city,
//     label: city.city,
//   }));
// };

// export const getPetById = async (petId: string): Promise<Pet> => {
//   const { data } = await api.get<Pet>(`/pets/${petId}`);

//   return data;
// };

// export const addFavoritePet = async (petId: string) => {
//   const { data } = await api.patch(`/user/me/favorites/${petId}`);

//   return data;
// };

// export const addOwnPet = async (petData: FormData) => {
//   const { data } = await api.post("/pets", petData);

//   return data;
// };

// export const getRandomPet = async (species: string): Promise<Pet> => {
//   const { data } = await api.get<Pet>(`/pets/random/${species}`);

//   return data;
// };
