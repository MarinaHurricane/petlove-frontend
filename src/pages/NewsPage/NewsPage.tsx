import css from "./NewsPage.module.css";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pagination } from "../../components/Pagination/Pagination";
import { Title } from "../../components/Title/Title";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { NewsList } from "../../components/NewsList/NewsList";

export const NewsPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  const getNews = async (page, query) => {
    const { data } = await axios.get(
      `https://petlove-backend-jniu.onrender.com/api/news`,
      {
        params: {
          search: query,
          page: page,
        },
      },
    );
    console.log(data.totalPages);
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["news", page, query],
    queryFn: () => getNews(page, query),
    placeholderData: keepPreviousData,
  });

  const newsList = data?.news || [];
  console.log(newsList);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
    <div className={css.titleSearchbarWrapper}>
      <Title>News</Title>
      <SearchBar onSearch={handleSearch} />
      </div>
      <NewsList newsList={newsList} />
      <Pagination
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />
    </>
  );
};
