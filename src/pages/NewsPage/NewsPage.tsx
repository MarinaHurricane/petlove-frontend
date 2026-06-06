import css from "./NewsPage.module.css";
import { Container } from "../../components/Container/Container";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";

export const NewsPage = () => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

const getNews = async(page = 1, query) => {
    const {data}  = await axios.get(`https://petlove-backend-jniu.onrender.com/api/news`, {
        params: {
            search: query
        }
    });
    console.log(data);
    return data;
}

    const { data } = useQuery({
        queryKey: ['news', page, query],
        queryFn: ()=> getNews(page, query)
    })

    const newsList = data?.news || [];
    console.log(newsList);

    const handleSearch = (newQuery) => {
        setQuery(newQuery);
        setPage(1);
    }

    const debounceSetQuery = useDebouncedCallback(handleSearch, 500);
  return (
    <>
      <h2 className={css.title}>News</h2>
      <SearchBar onSearch={debounceSetQuery}/>
      <NewsList newsList={newsList}/>
    </>
  );
};



const SearchBar = ({onSearch}) => {
    const handleChange = (e) => {
        onSearch(e.target.value);
    }
  return <input className={css.search} type="text" placeholder="Search"
  onChange={handleChange} />;
};

const NewsList = ({newsList}) => {
    console.log(newsList);
    return (
        <ul>
        {newsList.map(news => <li key={news.id}><News news={news}/></li>)}
        </ul>
    )

}

const News = ({news}) => {
    console.log(news);
    return (
        <div className={css.newsBox}>
            <img src={news.imgUrl} alt="" />
            <h3>{news.title}</h3>
            <p>{news.text}</p>
        </div>

    )
}
