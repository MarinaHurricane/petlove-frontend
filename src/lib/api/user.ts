import { api } from "./axios"

export const editUserAvatar = async(formData: FormData) => {
    const {data} = await api.patch("/user/me/avatar", formData);
    return data;
}

export const updateProfile = async(editData) => {
    const {data} = api.patch("/user/me/", editData);
}