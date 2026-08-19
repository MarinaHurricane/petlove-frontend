import type { Pet } from "./pet";
import type { OwnPet } from "./ownPet";

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  favorites: Pet[];
  ownPets: OwnPet[];
  viewed: Pet[];
  createdAt: string;
  updatedAt: string;
}