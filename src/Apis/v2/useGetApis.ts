// Call the v2  API
import { useLocale } from "next-intl";
import React from "react";

import { api } from "./apiInstance";

const useGetApisV2 = () => {
  const currentLang = useLocale();

  const getCurrentUserApi = React.useCallback(async () => {
    return api.get("method/brokerage.api.broker_api.get", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getDevelopersApi = React.useCallback(
    async (page: number, limit: number, project_type?: string | undefined) => {
      let url = "method/brokerage.api.developer_api.list";
      if (page && limit) {
        url += `?page=${page}&limit=${limit}`;
      } else if (project_type) {
        url += `?filters={"project_type":"${project_type}"}`;
      }
      return api.get(url, {
        headers: {
          "Accept-Language": currentLang,
        },
      });
    },
    [currentLang]
  );

  const getCategoriesApi = React.useCallback(async () => {
    return api.get("resource/Category", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getLocationsApi = React.useCallback(async () => {
    return api.get("resource/RE Location", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getProjectsApi = React.useCallback(async () => {
    return api.get("method/brokerage.api.re_project_api.list", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getProjectsByDeveloperIdApi = React.useCallback(
    async (developerID: string, page: number) => {
      return api.get(
        `method/brokerage.api.re_project_api.list?filters={"developer":"${developerID}"}&page=${page}`,
        {
          headers: {
            "Accept-Language": currentLang,
          },
        }
      );
    },
    [currentLang]
  );

  const getProjectsByIdApi = React.useCallback(
    async (id: string) => {
      return api.get(`method/brokerage.api.re_project_api.list?id=${id}`, {
        headers: {
          "Accept-Language": currentLang,
        },
      });
    },
    [currentLang]
  );

  const getProjectsUnitsApi = React.useCallback(
    async (project_type?: string, is_favorite?: boolean) => {
      let url = "method/brokerage.api.project_category_api.list";

      if (is_favorite === true) {
        url += `?filters={"is_favorite": true}`;
      } else if (project_type) {
        const currentPropertyType =
          project_type === "COMPOUND" ? "Compound" : "Separated";

        url += `?filters={"project_type": "${currentPropertyType}"}`;
      }

      return api.get(url, {
        headers: {
          "Accept-Language": currentLang,
        },
      });
    },
    [currentLang]
  );

  const getProjectsUnitsByIdApi = React.useCallback(
    async (id: string) => {
      return api.get(`method/brokerage.api.project_category_api.get?id=${id}`, {
        headers: {
          "Accept-Language": currentLang,
        },
      });
    },
    [currentLang]
  );

  const getNewLaunchApi = React.useCallback(
    async (is_favorite?: boolean) => {
      let url = "method/brokerage.api.new_launch_api.list";
      if (is_favorite === true) {
        url += `?filters={"is_favorite": true}`;
      }
      return api.get(url, {
        headers: {
          "Accept-Language": currentLang,
        },
      });
    },
    [currentLang]
  );

  const getNewLaunchByIdApi = React.useCallback(
    async (id: string) => {
      return api.get(`method/brokerage.api.new_launch_api.get`, {
        params: {
          id,
        },
        headers: {
          "Accept-Language": currentLang,
        },
      });
    },
    [currentLang]
  );

  const getCountiresApi = React.useCallback(async () => {
    return api.get("method/brokerage.api.re_country_api.list", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getCitiesApi = React.useCallback(async () => {
    return api.get("resource/City", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getVideoGallaryApi = React.useCallback(async () => {
    return api.get("resource/Video Gallery", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getDevliveriesApi = React.useCallback(async () => {
    return api.get("resource/Delivery", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getFinishingApi = React.useCallback(async () => {
    return api.get("resource/Finishing", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getUnitTypeApi = React.useCallback(async () => {
    return api.get("resource/Unit Type", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getDealsApi = React.useCallback(
    async (deal_type: string) => {
      let url = "method/brokerage.api.deal_api.list";

      if (deal_type) {
        url += `?deal_type=${deal_type}`;
      }
      return api.get(url, {
        headers: {
          "Accept-Language": currentLang,
        },
      });
    },
    [currentLang]
  );

  const getAboutUsApi = React.useCallback(async () => {
    return api.get("method/brokerage.api.settings_api.get", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getSharedUnitApi = React.useCallback(async () => {
    return api.get("resource/Shared Unit", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getPrizeApi = React.useCallback(async () => {
    return api.get("resource/Prize", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getHomeImagesApi = React.useCallback(async () => {
    return api.get("method/brokerage.api.home_images_api.get", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getPartnerApi = React.useCallback(
    async (page?: number, limit?: number) => {
      let url = "method/brokerage.api.partner_api.list";
      if (page) {
        url += `?page=${page}`;
      } else if (limit) {
        url += `?limit=${limit}`;
      } else if (limit && page) {
        url += `?limit=${limit}&page=${page}`;
      }
      return api.get(url, {
        headers: {
          "Accept-Language": currentLang,
        },
      });
    },
    [currentLang]
  );

  return {
    getCurrentUserApi,
    getDevelopersApi,
    getCategoriesApi,
    getLocationsApi,
    getProjectsApi,
    getProjectsUnitsApi,
    getNewLaunchApi,
    getCountiresApi,
    getCitiesApi,
    getVideoGallaryApi,
    getDevliveriesApi,
    getFinishingApi,
    getUnitTypeApi,
    getDealsApi,
    getAboutUsApi,
    getSharedUnitApi,
    getPrizeApi,
    getProjectsUnitsByIdApi,
    getNewLaunchByIdApi,
    getProjectsByIdApi,
    getHomeImagesApi,
    getProjectsByDeveloperIdApi,
    getPartnerApi,
  };
};

export default useGetApisV2;
