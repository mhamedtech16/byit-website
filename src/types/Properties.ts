export interface Developer {
  name: string;
  name_en: string;
  name_ar: string;
  logo: string;
  type: string;
  id: number;
}
interface Vendors {
  name: string;
  logo: string;
  contactName: string;
  contactPhone: string;
  contactTitle: string;
  ratio: number;
  diffOnspotRatio: number;
  onspotRatio: number;
  netRatio: number;
  companyRatio: number;
}
export interface Property {
  /// Property or Compound
  type: string;
  priceType: string;
  price: number;
  downPayment: string;
  durationType: string;
  installmentDuration: number;
  finishingType: string[];
  deliveryStatus: string[];
  imgs: string[];
  voiceNote: string;
  available: boolean;
  top: boolean;
  isFavourite: boolean;
  createdAt: string;
  id: number;
  url: string;
  vendors: Vendors[];
  location: {
    name: string;
    id: number;
  };
  company: {
    name: string;
    logo: string;
    id: number;
  };
  category: {
    categoryName: string;
    id: number;
  };
  project: {
    name: string;
    imgs: string;
    ratio: number;
    location: {
      type: string;
      coordinates: number[];
    };
    villas: Villa[];
    apartments: Apartment[];
    mall: Mall[];
    nawyApp: boolean;
    diffOnspotRatio: number;
    onspotRatio: number;
    netRatio: number;
    companyRatio: number;
    id: number;
    employeName: string;
    employeCountry: {
      name: string;
      id: number;
    };
    employePhone: string;
    startingPrice: number;
    vendors: Vendors[];
  };
}

export interface SharedProperties {
  type: string;
  priceType: string;
  price: number;
  downPayment: string;
  durationType: string;
  installmentDuration: number;
  monthlyInstallment?: number;
  sharePrice?: number;
  totalShares?: number;
  availableShares?: number;
  soldShares?: number;
  minShares?: number;
  projectName_en?: string;
  projectName_ar?: string;
  projectName?: string;
  companyLogo?: string;
  netRatio?: number;
  ratio?: number;
  finishingType: string[];
  deliveryStatus: string[];
  imgs: string[];
  pdf?: string;
  voiceNote: string;
  available: boolean;
  employeName?: string;
  employeCountry?: {
    name: string;
    id: number;
  };
  employePhone?: string;
  createdAt: string;
  id: number;
  location: {
    name: string;
    id: number;
  };
  category: {
    categoryName: string;
    id: number;
  };
}

export interface SharedPropertiesResponse {
  data: SharedProperties[];
}

export type Project = {
  type: string;
  name: string;
  name_en: string;
  name_ar: string;
  img: string;
  employeName: string;
  employeCountry: {
    name: string;
    id: number;
  };
  ratio: number;
  companyRatio: number;
  diffOnspotRatio: number;
  pdf: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  villas: Villa[];
  apartments: Apartment[];
  mall: Mall[];
  nawyApp: boolean;
  top: boolean;
  id: number;
  employePhone: string;
  company: {
    name: string;
    logo: string;
    id: number;
  };
};

export interface Villa {
  price: number;
  area: number;
  available: boolean;
  type: string;
}
export interface Apartment {
  price: number | null;
  area: number | null;
  available: boolean;
  type: string;
}
export interface Mall {
  price: number;
  area: number;
  available: boolean;
  type: string;
}

export interface PropertiesResponse {
  data: {
    data: Property[];
    pageCount: number;
    page: number;
  };
}

export interface Category {
  categoryName: string;
  categoryName_en: string;
  categoryName_ar: string;
  type: string;
  hasChild: boolean;
  id: number;
  createdAt: string;
}

export interface Location {
  name: string;
  name_en: string;
  name_ar: string;
  type: string;
  id: number;
}

export interface NewLaunch {
  name: string;
  name_en: string;
  name_ar: string;
  description: string;
  imgs: string[];
  commissions: string[];
  id: number;
  salesName: string;
  salesPhone: string;
  isFavourite: boolean;
  vendors: Vendors[];
  location: {
    name: string;
    id: number;
  };
  company: {
    name: string;
    logo: string;
    id: number;
  };
  features: NewLaunchFeature[];
}

export interface NewLaunchFeature {
  price: number;
  bookingPrice: number;
  category: {
    name: string;
    id: number;
  };
}
