import css from './News.module.css';

export const News = ({ news }) => {
  console.log(news);
  return (
    <div className={css.newsBox}>
        <div className={css.contentWrapper}>
      <img src={news.imgUrl} alt="" className={css.image}/>
      <h3 className={css.newsTitle}>{news.title}</h3>
      <p className={css.newsParagraph}>{news.text}</p>
      </div>

      <div className={css.newsDate}>
        <p className={css.date}>{new Date(news.date).toLocaleDateString("en-GB")}</p>
        <a href={news.url} target="_blank" rel="noopener noreferrer" className={css.link}>
          Read more
        </a>
      </div>
    </div>
  );
};