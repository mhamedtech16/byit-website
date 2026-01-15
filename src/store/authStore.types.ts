import { CurrentUser, Deals, SharesUnitData, User } from "@/types/User";

export interface UserState {
  user: CurrentUser | null;
  currentUser: User | null;
  signupUser: User | null;
  token: string;
  setToken: (token: string) => void;
  closingFormUser: Deals | null;
  sharesDeal: SharesUnitData | null;
  setcurrentUser: (currentUser: User | null) => void;
  setSignupUser: (signupUser: User) => void;
  hasHydrated: boolean;
  setHasHydrated: () => void;
  setClsosingFormUser: (closingFormUser: Deals) => void;
  setSharesDeal: (sharesDeal: SharesUnitData) => void;
  setUser: (user: CurrentUser) => void;
  clearUser: () => void;
  // isAuthenticated: boolean;
}
