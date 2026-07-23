import { News } from '../News/News';
import css from './NewsList.module.css';

export const NewsList = ({ newsList }) => {
  console.log(newsList);
  return (
    <ul className={css.newsList}>
      {newsList.map((news) => (
        <li key={news.id}>
          <News news={news} />
        </li>
      ))}
    </ul>
  );
};