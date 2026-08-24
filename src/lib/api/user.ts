import { api } from "./axios";
import type { User } from "../../types/user";

export const getUserInfo = async (): Promise<User> => {
  const { data } = await api.get<User>("/user/me");

  return data;
};

type UpdateAvatarResponse = {
  url: string;
};

export const editUserAvatar = async (
  file: File,
): Promise<UpdateAvatarResponse> => {
  const formData = new FormData();

  formData.append("avatar", file);

  const { data } = await api.patch<UpdateAvatarResponse>(
    "/user/me/avatar",
    formData,
  );

  return data;
};

type EditUserData = {
  name: string;
  email: string;
  phone?: string;
};

export const updateProfile = async (editData: EditUserData): Promise<User> => {
  const { data } = await api.patch<User>("/user/me", editData);

  return data;
};

export const viewedPets = async (petId: string): Promise<User> => {
  const { data } = await api.patch<User>(`/user/me/addViewed/${petId}`);

  return data;
};

export const removePetFromFavorites = async (petId: string): Promise<User> => {
  const { data } = await api.delete<User>(`/user/me/${petId}`);

  return data;
};
