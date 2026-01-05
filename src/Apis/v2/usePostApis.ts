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
