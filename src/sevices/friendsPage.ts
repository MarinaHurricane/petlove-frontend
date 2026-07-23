import { api } from "../lib/api/axios";

export const getFriends = async() => {
    const { data } = await api.get("/friends");
    return data;
}