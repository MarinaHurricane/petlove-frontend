import { create } from 'zustand';
import { persist } from 'zustand/middleware'

type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  favorites: string[];
  ownPets: string[];
  viewed: string[];
};

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  //  updateAvatar: (url: string) => void;
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

    // updateAvatar: (url) =>
    //     set((state) => ({
    //       user: state.user
    //         ? { ...state.user, avatar: url }
    //         : null,
    //     })),

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