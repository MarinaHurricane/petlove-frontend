import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Pet } from "../../types/pet";
import type { OwnPet } from "../../types/ownPet";

type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  favorites: Pet[];
  ownPets: OwnPet[];
  viewed: Pet[];
};

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      setUser: (user) => {
        set({
          user,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
