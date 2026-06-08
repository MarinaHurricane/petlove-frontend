import css from "./NewsPage.module.css";
import { Container } from "../../components/Container/Container";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import { Pagination } from "../../components/Pagination/Pagination";
import { Title } from "../../components/Title/Title";
import { Icon } from "../../components/Icon/Icon";

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

const SearchBar = ({ onSearch }) => {
    const [value, setValue] = useState('')
  const handleSubmit = (formData: FormData) => {
    const searchValue = formData.get("search") as string;

    onSearch(searchValue.trim());
  };

    const handleClear = (e) => {
        setValue('');
        onSearch('');
        e.target.value = '';
    }
  return (
    <form className={css.form} action={handleSubmit}>
      <input
        className={css.search}
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="search"
      />
      <div className={css.buttons}>
      {value && <button type="button" className={css.clearButton} onClick={handleClear}>
        <Icon name="icon-x" className={css.icon}/>
        </button>}
        <button type="submit" className={css.clearButton} >
            <Icon name="icon-search" className={css.icon}/>
        </button>
        </div>
    </form>
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
