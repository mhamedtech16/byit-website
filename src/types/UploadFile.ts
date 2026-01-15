export interface UploadFile {
  file: File;
}

export interface FileResponse {
  data: {
    message: {
      name: string;
      owner: string;
      creation: string;
      modified: string;
      modified_by: string;
      docstatus: number;
      idx: number;
      file_name: number;
      is_private: number;
      file_type: string;
      is_home_folder: number;
      is_attachments_folder: number;
      file_size: number;
      file_url: string;
      folder: string;
      is_folder: number;
      content_hash: string;
      uploaded_to_dropbox: number;
      uploaded_to_google_drive: number;
      doctype: string;
    };
  };
}
