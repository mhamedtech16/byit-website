export interface AboutUS {
  name: string;
  owner: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: string;
  ar_company_name: string;
  en_company_name: string;
  ar_about_us: string;
  en_about_us: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  website: string;
  customer_service: string;
  cil: string;
  contract: string;
  closing_support: string;
  coverage: string;
  doctype: string;
  id: number;
}

export interface AboutUsResponse {
  data: AboutUS;
}
