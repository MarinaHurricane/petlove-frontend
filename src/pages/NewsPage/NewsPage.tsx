import css from "./NewsPage.module.css";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Pagination } from "../../components/Pagination/Pagination";
import { Title } from "../../components/Title/Title";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { NewsList } from "../../components/NewsList/NewsList";
import { getNews } from "../../lib/api/news";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

export const NewsPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleSubmit = (formData: FormData) => {
    const searchValue = formData.get("search") as string;

    setQuery(searchValue.trim());
    setPage(1);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["news", page, query],
    queryFn: () => getNews(page, query),
    placeholderData: keepPreviousData,
  });

  const newsList = data?.news || [];

  if (isLoading) return <Loader />;

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <div className={css.titleSearchbarWrapper}>
        <Title>News</Title>
        <form action={handleSubmit}>
          <SearchBar onSearch={handleSearch} />
        </form>
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
