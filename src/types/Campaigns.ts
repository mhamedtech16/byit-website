type Broker = {
  fullname: string;
  id: number;
  type: string;
};

type Country = {
  countryCode: string;
  name: string;
  id: number;
};

export interface Campaign {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
  description: string;
  description_ar: string;
  description_en: string;
  img: string;
  whatsappNumber: string;
  isJoined: boolean;
  project: { name: string; id: number } | null;
  company: { name: string; id: number } | null;
  brokersCount: number;
  leadsCount: number;
  created_at: string;
}

export interface Leads {
  id: number;
  fullname: string;
  phone: string;
  campaign: { name: string; id: number } | null;
  status: string;
  notes: string;
  created_at: string;
  broker: Broker | null;
  conutry: Country;
}
