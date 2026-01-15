export interface ShareUnit {
  id: string;
  developer: string;
  developer_logo: string;
  project_en_name: string;
  project_ar_name: string;
  salesperson_en_name: string;
  salesperson_country: string;
  salesperson_phone: string;
  category: string;
  total_shares: number;
  min_shares: number;
  available_shares: number;
  price: number;
  share_price: number;
  down_payment_: number;
  number_of_years: number;
  voice_orientation: string;
  brochure_pdf: string;
  duration_type: string;
  pay_type: string;
  project_type: string;
  country: string;
  city: string;
  location: string;
  actual_commission: number;
  communicated_commission: number;
  on_spot_commission: number;
  on_spot_broker_commission: number;
  creation: string;
  deliveries: string[];
  finishes: string[];
  images: string[];
}

export interface ShareUnitResponse {
  data: ShareUnit[];
}
