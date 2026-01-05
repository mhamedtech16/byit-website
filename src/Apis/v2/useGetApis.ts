// Call the v2  API
import { useLocale } from "next-intl";
import React from "react";

import { api } from "./apiInstance";

const useGetApisV2 = () => {
  const currentLang = useLocale();

  const getDevelopers = React.useCallback(async () => {
    return api.get("method/brokerage.api.developer_api.list", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getCategories = React.useCallback(async () => {
    return api.get("resource/Category", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getLocations = React.useCallback(async () => {
    return api.get("resource/RE Location", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getProjects = React.useCallback(async () => {
    return api.get("method/brokerage.api.re_project_api.list", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getProjectsUnits = React.useCallback(async () => {
    return api.get("method/brokerage.api.project_unit_api.list", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getNewLaunch = React.useCallback(async () => {
    return api.get("method/brokerage.api.new_launch_api.list", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getCountires = React.useCallback(async () => {
    return api.get("method/brokerage.api.re_country_api.list", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getCities = React.useCallback(async () => {
    return api.get("resource/City", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getVideoGallary = React.useCallback(async () => {
    return api.get("resource/Video Gallery", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getDevliveries = React.useCallback(async () => {
    return api.get("resource/Delivery", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getFinishing = React.useCallback(async () => {
    return api.get("resource/Finishing", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getUnitType = React.useCallback(async () => {
    return api.get("resource/Unit Type", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getDeals = React.useCallback(async () => {
    return api.get("method/brokerage.api.deal_api.create", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  const getAboutUs = React.useCallback(async () => {
    return api.get("resource/Byit Settings/Byit Settings", {
      headers: {
        "Accept-Language": currentLang,
      },
    });
  }, [currentLang]);

  return {
    getDevelopers,
    getCategories,
    getLocations,
    getProjects,
    getProjectsUnits,
    getNewLaunch,
    getCountires,
    getCities,
    getVideoGallary,
    getDevliveries,
    getFinishing,
    getUnitType,
    getDeals,
    getAboutUs,
  };
};

export default useGetApisV2;
