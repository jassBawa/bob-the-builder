import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define Zustand store for authentication state with persistence
export const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      token: null,
      name: "",
      login: (token, name) => set({ isLoggedIn: true, token, name }),
      logout: () => set({ isLoggedIn: false, token: null, name: "" }),
    }),
    {
      name: "authStore", // Optional: Customize storage key (default: "zustand:yourStoreName")
      // storage: localStorage, // Choose storage (localStorage or alternative)
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        name: state.name,
      }), // Persist only relevant data
    }
  )
);
