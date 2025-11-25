import axios from "axios";
import { useLocale } from "next-intl";
import { useCallback } from "react";

import { Project, PropertiesResponse } from "@/types/Properties";
import { User } from "@/types/User";

import { api } from "./apiInstance";
import { BASE_END_POINT } from "./config";

const useGetApis = () => {
  const currentLang = useLocale();

  const getPropertiesApi = (
    selectedLocationIds: number[],
    selectedTypeIds: number[],
    selectedDeliveryTypes: string[],
    selectedFinishingTypes: string[],
    selectedBedroom: string[],
    selectedProject: Project | null,
    fromPrice: number | null,
    toPrice: number | null,
    isFilter: boolean,
    page: number,
    propertyType: string,
    user: User | null
  ): Promise<PropertiesResponse> => {
    let params = "";
    if (isFilter) {
      if (selectedTypeIds.length > 0) {
        params = `${params}&category=${selectedTypeIds}`;
      }
      if (selectedLocationIds.length > 0) {
        params = `${params}&location=${selectedLocationIds}`;
      }
      if (selectedDeliveryTypes.length > 0) {
        params = `${params}&deliveryStatus=${selectedDeliveryTypes}`;
      }
      if (selectedFinishingTypes.length > 0) {
        params = `${params}&finishingType=${selectedFinishingTypes}`;
      }
      if (selectedBedroom.length > 0) {
        params = `${params}&bedroom=${selectedBedroom}`;
      }
      if (selectedProject) {
        params = `${params}&project=${selectedProject?.id}`;
      }
      if (fromPrice != null && fromPrice > 0) {
        params = `${params}&priceFrom=${fromPrice}`;
      }
      if (toPrice != null && toPrice > 0 && toPrice > (fromPrice || 0)) {
        params = `${params}&priceTo=${toPrice}`;
      }
    }
    const currentPropertyType =
      propertyType == "COMPOUND" ? "RELATED-TO-COMPOUND" : "SEPARATED";
    //params = `${params}&sortByOnspotRatio=UP&available=true&type=${currentPropertyType}`;
    params = `${params}&available=true&type=${currentPropertyType}`;
    return axios.get(`${BASE_END_POINT}properties?page=${page}${params}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
        "Accept-Language": currentLang,
      },
    });
  };
  ////////
  /////==========
  // useGetApis.ts
  const getAllDevelopersApi = (
    page: number,
    search: string,
    propertyType?: string
  ) => {
    let params = "";

    // لو موجود propertyType ضيفه
    if (propertyType) {
      params = `type=${
        propertyType == "SEPARATED" ? propertyType : "COMPOUND"
      }`;
    }

    if (search) {
      params += `${params ? "&" : ""}search=${search}`;
    }

    return axios.get(
      `${BASE_END_POINT}companies?page=${page}${params ? `&${params}` : ""}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": `${currentLang}`,
        },
      }
    );
  };

  ///////
  const getProjectsByDeveloperApi = (developerId: number, page: number = 1) => {
    const params = developerId ? `&company=${developerId}` : "";

    return api.get(`projects?page=${page}&${params}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": currentLang,
      },
    });
  };

  //////
  const getAllProjectsApi = (
    page: number,
    search: string,
    propertyType: string,
    developerId: number
  ) => {
    let params = developerId ? `&company=${developerId}` : "";
    if (search) {
      params += `&search=${search}`;
    }
    return axios.get(
      `${BASE_END_POINT}projects?page=${page}&type=${
        propertyType == "SEPARATED" ? propertyType : "COMPOUND"
      }${params}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": `${currentLang}`,
        },
      }
    );
  };
  //////////////
  const getAllNewLaunchesApi = (
    page: number,
    search: string,
    developerId: number
  ) => {
    let params = developerId ? `&company=${developerId}` : "";
    if (search) {
      params += `&search=${search}`;
    }
    return axios.get(`${BASE_END_POINT}newLaunches?page=${page}${params}`, {
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${user.token}`,
        "Accept-Language": `${currentLang}`,
      },
    });
  };
  ////////////
  const getAllCategoriesApi = (propertyType: string) => {
    return axios.get(`${BASE_END_POINT}categories?type=${propertyType}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": currentLang,
      },
    });
  };
  //////////
  const getAllLocationsApi = (propertyType: string) => {
    return axios.get(
      `${BASE_END_POINT}location/withoutPagenation/get?type=${propertyType}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": currentLang,
        },
      }
    );
  };

  const getAllCitiessApi = useCallback(() => {
    return api.get(`countries/50/cities/withoutPagenation/get`);
  }, []);

  const getAllCountriesApi = useCallback(() => {
    return api.get(`countries/withoutPagenation/get`);
  }, []);

  ////////////////===== Get App  Setting
  const getAppSettingApi = () => {
    return api.get(`setting`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": currentLang,
      },
    });
  };

  const getAllDevelopersWithoutPageenationApi = useCallback(() => {
    return api.get(`companies/withoutPagenation/get`);
  }, []);

  const getAllProjectssWithoutPageenationApi = useCallback(() => {
    return api.get(`projects/withoutPagenation/get`);
  }, []);

  const getAboutUsApi = useCallback(() => {
    return api.get("about");
  }, []);

  /////
  const getFavouritesApi = useCallback(
    (page: number, type: string, user: User | null) => {
      return api.get(`favourites?type=${type}&page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    []
  );

  const getDealsApi = useCallback((user: User | null) => {
    return api.get("deals", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });
  }, []);

  const getCampaignApi = useCallback((user: User | null) => {
    return api.get("campaigns", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });
  }, []);

  const getLeadsApi = useCallback((user: User | null) => {
    return api.get("leads", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });
  }, []);

  const getGuideLinesApi = useCallback(() => {
    return api.get("guidelines");
  }, []);

  const getSharedPropertiesApi = useCallback(() => {
    return api.get("sharedProperties");
  }, []);

  const getVendorsApi = useCallback(() => {
    return api.get("vendors");
  }, []);

  return {
    getPropertiesApi,
    getAllDevelopersApi,
    getAllProjectsApi,
    getAllNewLaunchesApi,
    getAllCategoriesApi,
    getAllLocationsApi,
    getAllCitiessApi,
    getAllCountriesApi,
    getAllDevelopersWithoutPageenationApi,
    getAllProjectssWithoutPageenationApi,
    getAppSettingApi,
    getAboutUsApi,
    getFavouritesApi,
    getDealsApi,
    getGuideLinesApi,
    getSharedPropertiesApi,
    getVendorsApi,
    getProjectsByDeveloperApi,
    getCampaignApi,
    getLeadsApi,
  };
};

export default useGetApis;
