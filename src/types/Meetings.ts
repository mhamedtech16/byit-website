export interface Meeting {
  id: number;
  clientName: string;
  clientPhone: string;
  salesName: string;
  salesPhone: string;
  status: string;
  createdAt: string;
  company: { name: string; id: number } | null;
  project: { name: string; id: number } | null;
  borker: { fullname: string; id: number; type: string } | null;
  clientCountry: { countryCode: string; name: string; id: number };
  salesCountry: { name: string; id: number } | null;
  earning: {
    _id: string;
    broker: number;
    month: string;
    updatedAt: string;
    amount: number;
    reason: string;
    __v: number;
    createdAt: string;
  };
}
