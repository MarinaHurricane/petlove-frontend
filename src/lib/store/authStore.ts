import { create } from 'zustand';
import { persist } from 'zustand/middleware'

type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  favorites: string[];
  ownPets: string[];
};

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
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
  name: "auth-storage"
}
)
);