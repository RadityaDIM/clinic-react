import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (newToken) => set({ token: newToken }),
      setUser: (newUser) => set({ user: newUser }),
      logout: () => set({ token: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthStore;
