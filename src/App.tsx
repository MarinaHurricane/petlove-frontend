import { Route, Routes } from "react-router-dom";

import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage/HomePage";
import { NewsPage } from "./pages/NewsPage/NewsPage";
import { PetsPage } from "./pages/PetsPage/PetsPage";
import { FriendsPage } from "./pages/FriendsPage/FriendsPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { AddPetPage } from "./pages/AddPetPage/AddPetPage";

// import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<MainLayout />}>
        <Route path="news" element={<NewsPage />} />
        <Route path="pets" element={<PetsPage />} />
        <Route path="friends" element={<FriendsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="add-pet" element={<AddPetPage />} />
      </Route>
    </Routes>
  );
};

export default App;
