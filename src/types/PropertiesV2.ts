export interface NewLaunch {
  id: string;
  name_en: string;
  name_ar: string;
  images: string[];
  communicated_commission: number;
  on_spot_commission: number;
  broker_commission: number;
  on_spot_broker_commission: number;
  location: string;
  is_favorite: boolean;
  units: { price: number; booking_price: number; unit_type: string }[];
  developer: Developers;
  partners: Partners[];
}

export interface Developers {
  id: string;
  en_name: string;
  ar_name: string;
  logo: string;
  project_type: string;
}

export interface Partners {
  id: string;
  en_name: string;
  ar_name: string;
  logo: string;
  actual_commission: number;
  communicated_commission: number;
  on_spot_commission: number;
  broker_commission: number;
  on_spot_broker_commission: number;
  salesperson_phone: string;
}

export interface Projects {
  id: string;
  en_name: string;
  ar_name: string;
  country_en_name: string;
  country_ar_name: string;
  city_en_name: string;
  city_ar_name: string;
  location_en_name: string;
  location_ar_name: string;
  project_type: string;
  brochure_pdf: string;
  voice_orientation: string;
  actual_commission: number;
  communicated_commission: number;
  on_spot_commission: number;
  broker_commission: number;
  on_spot_broker_commission: number;
  developer: Developers;
  partners: Partners[];
}

export interface Project {
  id: string;
  ar_name: string;
  en_name: string;
}

export interface ProjectsUnit {
  id: string;
  en_unit_type: string;
  ar_unit_type: string;
  en_category: string;
  ar_category: string;
  project_type: string;
  price: number;
  pay_type: string;
  down_payment_percent: number;
  duration_type: string;
  number_of_years: number;
  en_location: string;
  ar_location: string;
  is_favorite: boolean;
  voice_orientation: string;
  images: string[];
  deliveries: string[];
  finishes: string[];
  developer: Developers;
  project: {
    id: string;
    en_name: string;
    ar_name: string;
    brochure_pdf: string;
    starting_price: number;
    communicated_commission: number;
    on_spot_commission: number;
    broker_commission: number;
    on_spot_broker_commission: number;
    partners: Partners[];
  };
}
