import css from "./News.module.css";
import type { News as NewsType } from "../../types/news";

type NewsProps = {
  news: NewsType;
};

export const News = ({ news }: NewsProps) => {
  return (
    <div className={css.newsBox}>
      <div className={css.contentWrapper}>
        <img src={news.imgUrl} alt={news.title} className={css.image} />
        <h3 className={css.newsTitle}>{news.title}</h3>
        <p className={css.newsParagraph}>{news.text}</p>
      </div>

      <div className={css.newsDate}>
        <p className={css.date}>
          {new Date(news.date).toLocaleDateString("en-GB")}
        </p>
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className={css.link}
        >
          Read more
        </a>
      </div>
    </div>
  );
};
