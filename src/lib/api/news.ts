import type { News } from "../../types/news";
import { api } from "./axios";

type NewsResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  totalNews: number;
  news: News[];
};

export const getNews = async (
  page: number,
  query: string,
): Promise<NewsResponse> => {
  const { data } = await api.get<NewsResponse>("/news", {
    params: {
      search: query,
      page: page,
    },
  });

  return data;
};
