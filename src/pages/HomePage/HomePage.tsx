import css from "./HomePage.module.css";
import { Header } from "../../components/Header/Header";
import { Container } from "../../components/Container/Container";
import desktop1x from "../../assets/image-desktop-1x.jpg";
import desktop2x from "../../assets/image-desktop-2x.jpg";
import tablet1x from "../../assets/image-tablet-1x.jpg";
import tablet2x from "../../assets/image-tablet-2x.jpg";
import mobile1x from "../../assets/image-mobile-1x.jpg";
import mobile2x from "../../assets/image-mobile-2x.jpg";

export const HomePage = () => {
  return (
    <>
      <section className={css.hero}>
        <div className={css.section}>
          <Container>
            <div className={css.heroBox}>
              {/* <Header variant="home"/> */}
              <Header variant="home" />
              <h1 className={css.title}>
                Take good <span className={css.care}>care</span> of your small
                pets
              </h1>
              <p className={css.text}>
                Choosing a pet for your home is a choice that is meant to enrich
                your life with immeasurable joy and tenderness.
              </p>
            </div>
          </Container>
        </div>
      </section>

      <div className={css.imageBox}>
        <picture>
          <source
            media="(min-width: 1280px"
            srcSet={`${desktop1x} 1x, ${desktop2x} 2x`}
          />

          {/* <img className={css.homeImg} src={desktop1x} alt="girl with a dog" /> */}

          <source
            media="(min-width: 768px"
            srcSet={`${tablet1x} 1x, ${tablet2x} 2x`}
          />

          {/* <img className={css.homeImg} src={tablet1x} alt="girl with a dog" /> */}

          <source
            media="(min-width: 375px"
            srcSet={`${mobile1x} 1x, ${mobile2x} 2x`}
          />

          <img className={css.homeImg} src={mobile1x} alt="girl with a dog" />
        </picture>
      </div>
    </>
  );
};
