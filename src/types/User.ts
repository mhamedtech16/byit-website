export interface User {
  fullname: string;
  type: string;
  approved: boolean;
  called: boolean;
  deals: number;
  verifyEmail: boolean;
  verifyPhone: boolean;
  block: boolean;
  createdAt: string;
  id: number;
  email: string;
  phone: string;
  earns: number;
  totalEarns: number;
  invitationCode: string;
  invitedUsers: number;
  token: string[];
  networkEarns: number;
  totalNetworkEarns: number;
  totalNetworkDeals: number;
  totalMeetingsCount: number;
  monthMeetingsCount: number;
  meetingsEarns: number;
  totalMeetingsEarns: number;
  country: Country;
  city: City;
  yearsExperience: string;
  enableMeetings: boolean;
  enableByitATeam: boolean;
  enableLeadGeneration: boolean;
}

export interface AuthUser {
  user?: User; // ✅ optional
  token?: string;
}

export interface Users {
  fullname: string;
  type: string;
  approved: boolean;
  called: boolean;
  deals: number;
  verifyEmail: boolean;
  verifyPhone: boolean;
  block: boolean;
  createdAt: string;
  id: number;
  email: string;
  phone: string;
  earns: number;
  totalEarns: number;
  invitationCode: string;
  invitedUsers: number;
  token: string[];
  networkEarns: number;
  totalNetworkEarns: number;
  totalNetworkDeals: number;
  country: Country;
  city: City;
  yearsExperience: string;
}

type vendor = {
  id: number;
  name: string;
};

export interface ClosignForm {
  status: "PENDING" | "APPROVED" | "REJECTED"; // extend if more statuses
  deleted: boolean;
  clientName: string;
  unitCode: string;
  project: number;
  clientCountry: number;
  salesName: string;
  salesPhone: string;
  salesCountry: number;
  value: number;
  vendor?: vendor;
  developer: number;
  provement: string; // file URL
  createdAt: string;
  updatedAt: string;
  id: number;
  user: User;
  developerName: string;
  projectName: string;
}

export interface Meetings {
  status: string; // extend if more statuses
  clientName: string;
  project: number;
  clientCountry: number;
  salesName: string;
  salesPhone: string;
  salesCountry: number;
  developer: number;
  provement: string; // file URL
  createdAt: string;
  id: number;
}

type SharedProperty = {
  id: number;
  projectName: string;
};

export type SharesDealData = {
  clientName: string;
  salesName: string;
  salesPhone: string;
  value: number; // القيمة الإجمالية
  sharesCount: number; // عدد الأسهم
  type: string; // النوع
  provement: string; // رابط الملف المرفوع
  status: "PENDING" | "APPROVED" | "REJECTED"; // حالة الصفقة
  id: number;
  createdAt: string; // ISO date string
  sharedProperty: SharedProperty;
  user: User;
  clientCountry: Country;
  salesCountry: Country;
};
export interface Country {
  name: string;
  name_ar: string;
  name_en: string;
  img: string;
  countryCode: string;
  id: number;
}

export interface City {
  name: string;
  name_en: string;
  name_ar: string;
  id: number;
}

export interface DropdownDeveloper {
  name: string;
  name_en: string;
  name_ar: string;
  logo: string;
  type: string; // e.g. "COMPOUND"
  id: number;
}

export interface DropdownShareProperties {
  projectName: string;
  projectName_ar: string;
  projectName_en: string;
  availableShares: number;
  sharePrice: number;
  logo: string;
  type: string; // e.g. "COMPOUND"
  id: number;
}

interface Developer {
  id: number;
  name: string;
  logo: string;
}

export interface DropdownProject {
  name: string;
  name_en: string;
  name_ar: string;
  logo: string;
  type: string; // e.g. "COMPOUND"
  id: number;
  company: Developer;
}

export interface DropdownCity {
  name_en: string;
  name_ar: string;
  name: string;
  id: number;
}

export interface DropdownVendors {
  name_en: string;
  name_ar: string;
  name: string;
  id: number;
}

export interface DropdownCountry {
  name: string;
  name_ar: string;
  name_en: string;
  countryCode: string;
  isoCode: string;
  numbersCount: number;
  hint: string;
  img: string;
  id: number;
}
export interface SignUpRequest {
  fullname: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  city?: string;
  type?: string;
  yearsExperience?: string; // Array of objects with id and name for years of experience
  country: number; // Country code for phone number validation
  //   token?: string; // JWT or session token
}

export interface CreateFeedback {
  notes: string;
  status: string | undefined;
}

export interface CreateFeedbackResponse {
  success: boolean;
}

export interface UpdateAccountRequest {
  fullname: string;
  email: string;
  phone?: string;
  city?: string;
  type?: string;
  yearsExperience?: string;
  country: number;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
export interface ConfirmLoginCode {
  phone: string;
  verifycode: string;
  country: number;
  //token?: string; // JWT or session token
}

export interface LoginRequestValues {
  phone: string;
  password: string;
  countryCode: string;
  //token?: string; // JWT or session token
}

export interface FileProps {
  name: string;
  uri: string;
  type: string;
}

export interface ClosignFormRequest {
  salesName?: string;
  developerName?: string;
  projectName?: string;
  developer: number;
  project: number;
  vendor?: number;
  clientName?: string;
  clientCountry?: number;
  unitCode: string;
  developerSalesName?: string;
  developerSalesNumber?: string;
  dealValue?: number; // JWT or session token
  salesCountry?: number; // Country code for phone number validation
  uploadFile?: File; // File object for the uploaded document
  type: string;
}

export interface NewMeetingsRequest {
  salesName?: string;
  salesPhone?: string;
  salesCountry?: number; // Country code for phone number validation
  developer: number;
  project: number;
  clientName?: string;
  clientPhone?: string;
  clientCountry?: number;
  uploadFile?: File; // File object for the uploaded document
}

export interface SharesDealRequest {
  salesName?: string;
  clientName?: string;
  clientCountry?: number;
  developerSalesName?: string;
  developerSalesNumber?: string;
  sharedProperty?: number;
  sharesCount?: number;
  value?: number; // JWT or session token
  salesCountry?: number; // Country code for phone number validation
  uploadFile?: File; // File object for the uploaded document
  type: string;
}

export interface SharesDealResponse {
  data: SharesDealData;
}

export interface ClosignFormResponse {
  data: ClosignForm;
}

/////////.
export interface LoginResponse {
  data: AuthUser;
}
