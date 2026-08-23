import { api } from "./axios";

export const getNews = async (page, query) => {
  const { data } = await api.get("/news", {
    params: {
      search: query,
      page: page,
    },
  });
  return data;
};
