import { useAuthStore } from "@/store/authStore";
import {
  AuthUser,
  ClosignFormRequest,
  ClosignFormResponse,
  ConfirmLoginCode,
  CreateFeedback,
  CreateFeedbackResponse,
  LoginRequestValues,
  LoginResponse,
  NewMeetingsRequest,
  SharesDealRequest,
  SharesDealResponse,
  SignUpRequest,
  UpdateAccountRequest,
  UpdatePasswordRequest,
} from "@/types/User";

import { api } from "./apiInstance";

export const loginApi = async (
  values: LoginRequestValues,
  lang: string
): Promise<LoginResponse> => {
  const data = {
    phone: `${values.phone}`,
    password: values.password,
    country: `${values.countryCode}`,
    // token: await AsyncStorage.getItem('@FCMToken'),
  };
  return api.post(`signin`, JSON.stringify(data), {
    headers: {
      "Accept-Language": lang,
    },
  });
};

export const signupApi = async (
  values: SignUpRequest,
  lang: string
): Promise<LoginResponse> => {
  const data = {
    fullname: values.fullname,
    phone: `${values.phone}`,
    password: values.password,
    email: values.email,
    city: values.city,
    yearsExperience: values.yearsExperience,
    country: values.country,
    type: values.type,
    // token: await AsyncStorage.getItem('@FCMToken'),
  };

  return api.post("signUp", JSON.stringify(data), {
    headers: {
      "Accept-Language": lang,
    },
  });
};

export const confirmLoginCodeApi = async (
  values: ConfirmLoginCode,
  lang: string
): Promise<LoginResponse> => {
  const data = {
    phone: `${values.phone}`,
    verifycode: values.verifycode,
    country: `${values.country}`,
    // token: await AsyncStorage.getItem('@FCMToken'),
  };
  return api.post("confirmLoginCode", JSON.stringify(data), {
    headers: {
      "Accept-Language": lang,
    },
  });
};

export const logoutApi = async (
  token: string,
  lang: string
): Promise<LoginResponse> => {
  const data = {
    token, // sent in the body
  };

  return api.post("logout", JSON.stringify(data), {
    headers: {
      "Accept-Language": lang,
      Authorization: `Bearer ${token}`, // also in the header
      "Content-Type": "application/json",
    },
  });
};

export const getUserDataApi = (user: AuthUser | null) => {
  return api.get(`${user?.user?.id}/getUser`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
  });
};

export const updateAccountApi = async (
  values: UpdateAccountRequest,
  lang: string,
  id: number | undefined,
  token: string | undefined
): Promise<LoginResponse> => {
  const data = {
    fullname: values.fullname,
    phone: `${values.phone}`,
    email: values.email,
    city: values.city,
    yearsExperience: values.yearsExperience,
    country: values.country,
    type: values.type,
    // token: await AsyncStorage.getItem('@FCMToken'),
  };

  return api.put(`user/${id}/updateInfo`, JSON.stringify(data), {
    headers: {
      "Accept-Language": lang,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePassowrdApi = async (
  values: UpdatePasswordRequest,
  lang: string,
  token: string | undefined
): Promise<LoginResponse> => {
  const data = {
    currentPassword: values.oldPassword,
    newPassword: values.newPassword,
    // token: await AsyncStorage.getItem('@FCMToken'),
  };

  return api.put(`user/updatePassword`, JSON.stringify(data), {
    headers: {
      "Accept-Language": lang,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAccountApi = async (
  lang: string,
  id: number | undefined,
  token: string | undefined
): Promise<LoginResponse> => {
  return api.delete(`${id}/delete`, {
    headers: {
      "Accept-Language": lang,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const closingFormApi = async (
  values: ClosignFormRequest,
  lang: string
): Promise<ClosignFormResponse> => {
  const token = useAuthStore.getState().currentUser?.token;

  const formData = new FormData();

  // Append as string, because FormData doesn't support native numbers, but backend will cast them
  // formData.append("conpany", String(values.developer)); // ⬅ conpany = developer ID
  formData.append("company", String(values.developer)); // Developer
  formData.append("project", String(values.project)); // Project
  formData.append("vendor", String(values.vendor)); // Partner
  formData.append("clientCountry", String(values.clientCountry ?? 0)); // client country

  formData.append("clientName", values.clientName || ""); // Client Name
  formData.append("unitCode", values.unitCode); // Unit Code
  formData.append("salesName", values.developerSalesName || ""); // Sales Name
  formData.append("salesCountry", String(values.salesCountry ?? 0)); // sales country
  formData.append("salesPhone", values.developerSalesNumber || ""); // Sales Number
  formData.append("value", String(values.dealValue ?? 0)); // Value
  formData.append("type", String(values.type ?? "")); // Type

  if (values.uploadFile) {
    formData.append("provement", values.uploadFile as unknown as File); // Provement
  }

  return api.post("deals", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept-Language": lang,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const sharesDealFormApi = async (
  values: SharesDealRequest,
  lang: string
): Promise<SharesDealResponse> => {
  const token = useAuthStore.getState().currentUser?.token;

  const formData = new FormData();

  // Append as string, because FormData doesn't support native numbers, but backend will cast them
  // formData.append("conpany", String(values.developer)); // ⬅ conpany = developer ID
  formData.append("sharedProperty", String(values.sharedProperty)); // Developer
  formData.append("sharesCount", String(values.sharesCount)); // Project
  formData.append("clientCountry", String(values.clientCountry ?? 0)); // client country

  formData.append("clientName", values.clientName || ""); // Client Name
  formData.append("salesName", values.developerSalesName || ""); // Sales Name
  formData.append("salesCountry", String(values.salesCountry ?? 0)); // sales country
  formData.append("salesPhone", values.developerSalesNumber || ""); // Sales Number
  formData.append("value", String(values.value ?? 0)); // Value
  formData.append("type", String(values.type ?? "")); // Type

  if (values.uploadFile) {
    formData.append("provement", values.uploadFile as unknown as File); // Provement
  }

  return api.post("deals", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept-Language": lang,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const newMeetingsApi = async (
  values: NewMeetingsRequest,
  lang: string
): Promise<ClosignFormResponse> => {
  const token = useAuthStore.getState().currentUser?.token;

  const formData = new FormData();

  // Append as string, because FormData doesn't support native numbers, but backend will cast them
  // formData.append("conpany", String(values.developer)); // ⬅ conpany = developer ID
  formData.append("company", String(values.developer)); // Developer
  formData.append("project", String(values.project)); // Project
  formData.append("clientCountry", String(values.clientCountry ?? 0)); // client country

  formData.append("clientName", values.clientName || ""); // Client Name
  formData.append("clientPhone", values.clientPhone || ""); // Client Phone
  formData.append("salesName", values.salesName || ""); // Sales Name
  formData.append("salesCountry", String(values.salesCountry ?? 0)); // sales country
  formData.append("salesPhone", values.salesPhone || ""); // Sales Number

  if (values.uploadFile) {
    formData.append("idCardImg", values.uploadFile as unknown as File); // Provement
  }

  return api.post("meetings", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept-Language": lang,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createFeedbackApi = async (
  values: CreateFeedback,
  lang: string,
  id: number | undefined
): Promise<CreateFeedbackResponse> => {
  const token = useAuthStore.getState().currentUser?.token;
  const data = {
    notes: values.notes,
    status: values.status,
  };

  return api.post(`leads/${id}/createFeedBack`, JSON.stringify(data), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept-Language": lang,
    },
  });
};

export const updateFeedbackApi = async (
  values: CreateFeedback,
  lang: string,
  id: number | undefined
): Promise<CreateFeedbackResponse> => {
  const token = useAuthStore.getState().currentUser?.token;
  const data = {
    notes: values.notes,
    status: values.status,
  };

  return api.put(`leads/${id}/updateFeedBack`, JSON.stringify(data), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept-Language": lang,
    },
  });
};

export const deleteFeedbackApi = async (
  id: number | undefined
): Promise<CreateFeedbackResponse> => {
  const token = useAuthStore.getState().currentUser?.token;

  return api.delete(`leads/${id}/removeFeedBack`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
