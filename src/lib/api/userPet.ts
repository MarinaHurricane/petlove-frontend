import { api } from "./axios"

export const addUserPet = async(formData: FormData) => {
    const { data} = await api.post("/pets", formData);
    console.log(data);
    return data;
}