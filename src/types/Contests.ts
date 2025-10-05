export interface PrizesData {
  targetPoints: TargetPoint[];
  targetAchievementLogo: string;
  targetAchievementInfo: string;
}

export interface Contests {
  name: string;
  name_en: string;
  name_ar: string;
  img: string;
  id: number;
}

export interface TargetPoint {
  prize: {
    name: string;
    img: string;
    id: number;
  };
  point: number;
}
