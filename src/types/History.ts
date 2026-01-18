type Status = "PENDING" | "ACCEPTED";

export interface Historys {
  client_name: string;
  created_at: string;
  value: number;
  userCommission: number;
  status: Status;
}
