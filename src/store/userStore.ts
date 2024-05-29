import { create } from 'zustand';
import { User } from '../types/user';
import { persist } from 'zustand/middleware';

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  deleteUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set({ user }),
      deleteUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);
