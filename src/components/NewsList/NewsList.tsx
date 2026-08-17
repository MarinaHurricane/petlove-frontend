import type { News as NewsType } from "../../types/news";
import { News } from "../News/News";
import css from "./NewsList.module.css";

type NewsListProps = {
  newsList: NewsType[];
};

export const NewsList = ({ newsList }: NewsListProps) => {
  return (
    <ul className={css.newsList}>
      {newsList.map((news) => (
        <li key={news._id}>
          <News news={news} />
        </li>
      ))}
    </ul>
  );
};
