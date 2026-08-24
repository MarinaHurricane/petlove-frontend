import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../../types/user";

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
