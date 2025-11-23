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
