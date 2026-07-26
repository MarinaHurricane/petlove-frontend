import css from './NotFound.module.css';
import mobile1x from '../../assets/not-found-mobile-1x.jpg';
import mobile2x from '../../assets/not-found-mobile-2x.jpg';
import tablet1x from '../../assets/not-found-tablet-1x.jpg';
import tablet2x from '../../assets/not-found-tablet-2x.jpg';
import desktop1x from '../../assets/not-found-desktop-1x.jpg';
import desktop2x from '../../assets/not-found-desktop-2x.jpg';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <section className={css.notFoundPage}>
            <div className={css.notFoundWrapper}>
            <div className={css.notFoundText}>
                <span className={css.number}>4</span>
                <div className={css.imageWrapper}>
                 <picture>
          <source
            media="(min-width: 1280px"
            srcSet={`${desktop1x} 1x, ${desktop2x} 2x`}
          />

          <source
            media="(min-width: 768px"
            srcSet={`${tablet1x} 1x, ${tablet2x} 2x`}
          />

          <source
            media="(min-width: 375px"
            srcSet={`${mobile1x} 1x, ${mobile2x} 2x`}
          />

          <img className={css.image} src={mobile1x} alt="ginger cat on orange background" />
          </picture>
          </div>
          <span className={css.number}>4</span>
            </div>

            <p className={css.notFoundParagraph}> Ooops! This page not found :( </p>
            <Button className={css.navButton}><Link to={"/"}>To home page</Link></Button>
            </div>
        </section>
    )
}