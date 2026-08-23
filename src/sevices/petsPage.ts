import { api } from "../lib/api/axios";

export const getCities = async (search?) => {
  if (!search) return [];
  const { data } = await api.get("/cities/locations", {
    params: {
      search: search,
    },
  });

  return data.map((city) => ({
    value: city.city,
    label: city[0].toUpperCase() + city.slice(1),
  }));
};

export const cityOptions = await getCities();
