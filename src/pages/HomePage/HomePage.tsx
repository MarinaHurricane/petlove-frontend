import css from "./HomePage.module.css";
import { Header } from "../../components/Header/Header";
import { Container } from "../../components/Container/Container";

export const HomePage = () => {
  return (
    <div className={css.hero}>
      <Container>
        <div className={css.heroBox}>
          {/* <Header variant="home"/> */}
          <Header/>
          <h1 className={css.title}>
            Take good <span className={css.care}>care</span> of your small pets
          </h1>
          <p className={css.text}>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </div>
      </Container>
    </div>
  );
};
