type Status = "PENDING" | "ACCEPTED";

export interface History {
  clientName: string;
  createdAt: string;
  value: number;
  userCommission: number;
  status: Status;
}
