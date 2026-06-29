import { api } from "./axios";

export const registerUser = async(userData) => {
    const {data} = await api.post("/auth/register", userData);
    return data;
}