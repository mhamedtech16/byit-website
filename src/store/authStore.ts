import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  AuthUser,
  ClosignForm,
  Meetings,
  SharesDealData,
  User,
} from "@/types/User";

import { UserState } from "./authStore.types";

const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      // user: null,
      closingFormUser: null,
      sharesDeal: null,
      currentUser: null,
      signupUser: null,
      meetings: null,
      token: "",
      hasHydrated: false,
      setHasHydrated: () => set({ hasHydrated: true }),
      setToken: (token: string) => set({ token }),
      setcurrentUser: (currentUser: AuthUser | null) => set({ currentUser }),
      setSignupUser: (signupUser: User) => set({ signupUser }),
      setClsosingFormUser: (closingFormUser: ClosignForm) =>
        set({ closingFormUser }),
      setMeetings: (meetings: Meetings) => set({ meetings }),
      setSharesDeal: (sharesDeal: SharesDealData) => set({ sharesDeal }),
      // setUser: (currentUser: SignUp) => set({ user }),
      clearUser: () => set({ currentUser: null }),
      // get isAuthenticated() {
      //   return get().currentUser !== null;
      // },
    }),
    {
      name: "app-user", // localStorage key
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated?.(); // mark hydrated once Zustand is ready
      },
    },
  ),
);

export { useAuthStore };
export const authStore = useAuthStore;
