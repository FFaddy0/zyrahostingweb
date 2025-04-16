import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      isDarkMode: true, // Default to dark mode
      
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      setDarkMode: () => set({ isDarkMode: true }),
      
      setLightMode: () => set({ isDarkMode: false }),
    }),
    {
      name: "theme-storage", // unique name for localStorage
    }
  )
); 