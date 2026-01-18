import { FileResponse } from "@/types/UploadFile";
import {
  DealsFormRequest,
  DealsFormResponse,
  SharesUnitRequest,
  SharesUnitResponse,
} from "@/types/User";

import { api } from "./apiInstance";

export const sharesDealFormApi = async (
  uploadFile: File | null,
  lang: string
) => {
  const formData = new FormData();

  if (uploadFile) {
    formData.append("file", uploadFile as unknown as File); // Provement
  }

  return api.post("method/upload_file", formData, {
    headers: {
      "Accept-Language": lang,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const dealsFormApi = async (
  values: DealsFormRequest,
  lang: string
): Promise<DealsFormResponse> => {
  const body = {
    developer: values.developer,
    project: values.project,
    partner: values.partner,
    client_name: values.client_name || "",
    unit_code: values.unit_code,
    salesperson_name: values.salesperson_name || "",
    salesperson_phone: values.salesperson_phone || "",
    price: Number(values.price ?? 0),
    type: values.type ?? "Contracted",
    image: values.image,
    project_text: values.project_text,
    developer_text: values.developer_text,
  };

  return api.post("method/brokerage.api.deal_api.create", body, {
    headers: {
      "Accept-Language": lang,
      "Content-Type": "application/json",
    },
  });
};

export const sharesUnitFormApi = async (
  values: SharesUnitRequest
): Promise<SharesUnitResponse> => {
  const body = {
    shared_unit: values.shared_unit,
    shares_count: values.shared_count,
    client_name: values.client_name,
    salesperson_name: values.salesperson_name,
    sales_country: values.salesperson_country,
    salesperson_phone: values.salesperson_phone,
    image: values.image,
  };

  return api.post("method/brokerage.api.shared_deal_api.create", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addFavouriteApi = (
  id: string | undefined,
  type: string,
  is_favorite: boolean
) => {
  const data = {
    type: type,
    id: id,
    is_favorite: is_favorite,
  };
  return api.post(
    `method/brokerage.api.favorite_api.update`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const uploadFile = (file: File): Promise<FileResponse> => {
  const formData = new FormData();

  formData.append("file", file as unknown as File);
  return api.post("method/upload_file", formData, {
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
    },
  });
};
