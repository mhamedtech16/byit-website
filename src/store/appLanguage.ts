import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Language = "en" | "ar";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: "en",
      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () =>
        set({ language: get().language === "en" ? "ar" : "en" }),
    }),
    {
      name: "app-language", // key used in localStorage
      storage: createJSONStorage(() => localStorage), // use createJSONStorage for correct typing
    }
  )
);
