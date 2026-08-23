import { api } from "./axios";

type RegisterUserData = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

type LoginUserData = {
  email: string;
  password: string;
};

export const registerUser = async (userData: RegisterUserData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

export const loginUser = async (userData: LoginUserData) => {
  const { data } = await api.post("/auth/login", userData);
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};
