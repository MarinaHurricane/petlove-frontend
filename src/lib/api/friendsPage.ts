import type { Friend } from "../../types/friend";
import { api } from "./axios";

export const getFriends = async (): Promise<Friend[]> => {
  const { data } = await api.get<Friend[]>("/friends");

  return data;
};
