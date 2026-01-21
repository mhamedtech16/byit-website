import {
  AuthUser,
  ClosignForm,
  Meetings,
  SharesDealData,
  User,
} from "@/types/User";

export interface UserState {
  // user: SignUp | null;
  currentUser: AuthUser | null;
  signupUser: User | null;
  token: string;
  setToken: (token: string) => void;
  closingFormUser: ClosignForm | null;
  meetings: Meetings | null;
  sharesDeal: SharesDealData | null;
  setcurrentUser: (currentUser: AuthUser | null) => void;
  setSignupUser: (signupUser: User) => void;
  hasHydrated: boolean;
  setHasHydrated: () => void;
  setClsosingFormUser: (closingFormUser: ClosignForm) => void;
  setMeetings: (meetings: Meetings) => void;
  setSharesDeal: (sharesDeal: SharesDealData) => void;
  // setUser: (user: SignUp) => void;
  clearUser: () => void;
  // isAuthenticated: boolean;
}
