import { api } from "./axios";

export const getUserInfo = async (userId) => {
  const { data } = await api.get("/user/me", userId);
  return data;
};

export const editUserAvatar = async (file) => {
  try {
    const formData = new FormData();

    formData.append("avatar", file);

    const { data } = await api.patch("/user/me/avatar", formData);

    console.log("DATA:", data);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



export const updateProfile = async (editData) => {
  try {
    const { data } = await api.patch("/user/me", editData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const viewedPets = async (petId) => {
  const { data } = await api.patch(`/user/me/addViewed/${petId}`);
  return data;
};


export const removePetFromFavorites = async(petId) => {
  const {data} = await api.delete(`/user/me/${petId}`);
  return data;
}