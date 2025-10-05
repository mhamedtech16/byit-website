"use client";
import { useLocale } from "next-intl";
import { useMemo } from "react";

import { api } from "./apiInstance";

export const useApi = () => {
  const lang = useLocale();

  // clone the api and add lang header dynamically
  return useMemo(() => {
    const instance = api;
    instance.defaults.headers["Accept-Language"] = lang;
    return instance;
  }, [lang]);
};
