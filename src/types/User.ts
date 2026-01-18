export interface User {
  user: {
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
  };
  token: string;
}

export interface CurrentUser {
  id: string;
  phone_number: string;
  email: string;
  years_of_experience: number;
  country: string;
  total_earned: number;
  remaining_balances: number;
  total_deals: number;
  full_name: string;
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

export type SharesUnitData = {
  idx: number;
  name?: string;
  owner: string;
  creation: string;
  modified?: string;
  modified_by?: string;
  docstatus?: number;
  broker?: string;
  image?: string;
  client_name: string;
  salesperson?: string; // JWT or session token
  unit_code?: number; // Country code for phone number validation
  shared_unit: string;
  unit_type: string;
  status: string;
  shares_count: number;
  doctype: string;
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
  country: string;
  en_name: string;
  ar_name: string;
  id: string;
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
  en_name: string;
  ar_name: string;
  country: string;
  id: string;
}

export interface DropdownVendors {
  name_en: string;
  name_ar: string;
  name: string;
  id: number;
}

export interface DropdownCountry {
  ar_name: string;
  en_name: string;
  country_code: string;
  phone_code: string;
  image: string;
  id: string;
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

export interface UpdateAccountRequest {
  fullname: string;
  email: string;
  phone?: string;
  city?: string;
  type?: string;
  yearsExperience?: string;
  country: string;
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
export interface DealsFormRequest {
  type: string;
  client_name: string;
  salesperson_name: string;
  salesperson_phone: string;
  developer_text: string;
  project_text: string;
  project: string;
  developer: string;
  unit_code: string;
  price: number;
  image: string | undefined;
  partner: string;
}

export interface Deals {
  idx: number;
  name?: string;
  owner: string;
  creation: string;
  modified?: string;
  modified_by?: string;
  docstatus?: number;
  eoi: string;
  broker?: string;
  salesperson?: string; // JWT or session token
  unit_code?: number; // Country code for phone number validation
  category: string;
  unit_type: string;
  status: string;
  is_on_spot: number;
  rejection_reason: null;
  ref_id: string;
  is_other_developer: number;
  developer: string;
  developer_text: string;
  project_type: string;
  project: string;
  project_text: string;
  partner: string;
  project_unit: string;
  doctype: string;
  contract_image: string;
  payment_from_developer: [];
  payment_to_broker: [];
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

export interface SharesUnitRequest {
  client_name: string;
  salesperson_name: string;
  salesperson_phone: string;
  shared_unit: string;
  shared_count: number;
  image: string; // File object for the uploaded document
}

export interface SharesDealResponse {
  data: SharesDealData;
}

export interface SharesUnitResponse {
  data: SharesUnitData;
}

export interface ClosignFormResponse {
  data: ClosignForm;
}

export interface DealsFormResponse {
  data: Deals;
}

/////////.
export interface LoginResponse {
  data: User;
}
