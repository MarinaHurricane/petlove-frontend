import css from "./NewsPage.module.css";
import { Container } from "../../components/Container/Container";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import { Pagination } from "../../components/Pagination/Pagination";
import { Title } from "../../components/Title/Title";
import { Icon } from "../../components/Icon/Icon";
import { SearchBar } from "../../components/SearchBar/SearchBar";

export const NewsPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  //   const debounceSetQuery = useDebouncedCallback(handleSearch, 500);

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
  });

  const newsList = data?.news || [];
  console.log(newsList);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      <Title>News</Title>
      <SearchBar onSearch={handleSearch} />
      <NewsList newsList={newsList} />
      <Pagination
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />
    </>
  );
};



const NewsList = ({ newsList }) => {
  console.log(newsList);
  return (
    <ul>
      {newsList.map((news) => (
        <li key={news.id}>
          <News news={news} />
        </li>
      ))}
    </ul>
  );
};

const News = ({ news }) => {
  console.log(news);
  return (
    <div className={css.newsBox}>
      <img src={news.imgUrl} alt="" />
      <h3>{news.title}</h3>
      <p>{news.text}</p>

      <div className={css.newsDate}>
        <p>{new Date(news.date).toLocaleDateString("en-GB")}</p>
        <a href={news.url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
};
