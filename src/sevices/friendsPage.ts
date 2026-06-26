import { api } from "../lib/axios";

export const getFriends = async() => {
    const { data } = await api.get("/friends");
    console.log(data);
    return data;
}