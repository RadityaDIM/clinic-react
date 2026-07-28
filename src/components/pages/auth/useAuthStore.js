import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (newToken) => set({ token: newToken }),
      setUser: (newUser) => set({ user: newUser }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

const initialToken = useAuthStore.getState().token;

if (initialToken) {
  try {
    const decodedToken = jwtDecode(initialToken);
    if (decodedToken.exp * 1000 < Date.now()) {
      // Jika token sudah kedaluwarsa, bersihkan state otentikasi.
      useAuthStore.setState({ token: null, user: null });
      console.log("Sesi telah berakhir, token kedaluwarsa telah dihapus.");
    }
  } catch (error) {
    // Jika token tidak valid (gagal di-decode), bersihkan state.
    useAuthStore.setState({ token: null, user: null });
    console.error(
      "Token tidak valid ditemukan di storage, state telah dibersihkan.",
    );
  }
}

export default useAuthStore;
