import type { OwnPet } from "../../types/ownPet";
import type { User } from "../../types/user";
import { api } from "./axios";

export const addUserPet = async (formData: FormData): Promise<OwnPet> => {
  const { data } = await api.post<OwnPet>("/pets", formData);

  return data;
};

type DeleteUserPetResponse = {
  pet: OwnPet;
  updatedUser: User;
};

export const deleteUserPet = async (
  petId: string,
): Promise<DeleteUserPetResponse> => {
  const { data } = await api.delete<DeleteUserPetResponse>(`/pets/${petId}`);

  return data;
};
