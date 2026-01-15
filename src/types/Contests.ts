export interface PrizesData {
  targetPoints: TargetPoint[];
  target_logo: string;
  target_info: string;
}

export interface Prize {
  points: number;
  en_title: string;
  ar_title: string;
  img: string;
  id: number;
}

export interface TargetPoint {
  prize: {
    ar_title: string;
    en_title: string;
    img: string;
    id: number;
  };
  point: number;
}
