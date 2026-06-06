import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Container } from "../components/Container/Container";

export const MainLayout = () => {
  return (
    <>
      <Container>
        <Header />

        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
};
