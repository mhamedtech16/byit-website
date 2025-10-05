// hooks/useFetch.ts
"use client";

import { useEffect, useState } from "react";

import useGetApis from "@/Apis/useGetApis";
import {
  DropdownCity,
  DropdownCountry,
  DropdownDeveloper,
  DropdownProject,
} from "@/types/User";

const useFetch = () => {
  const [projects, setProjects] = useState<DropdownProject[]>([]);
  const [cities, setCities] = useState<DropdownCity[]>([]);
  const [developers, setDevelopers] = useState<DropdownDeveloper[]>([]);
  const [countries, setCountries] = useState<DropdownCountry[]>([]);

  const {
    getAllProjectssWithoutPageenationApi,
    getAllCitiessApi,
    getAllDevelopersWithoutPageenationApi,
    getAllCountriesApi,
  } = useGetApis();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [projectRes, cityRes, developerRes, countryRes] =
          await Promise.all([
            getAllProjectssWithoutPageenationApi(),
            getAllCitiessApi(),
            getAllDevelopersWithoutPageenationApi(),
            getAllCountriesApi(),
          ]);

        setProjects(projectRes.data?.data || []);
        setCities(
          cityRes.data?.data?.map((city: DropdownCity) => ({
            id: String(city.id),
            name: city.name,
            name_ar: city.name_ar,
            name_en: city.name_en,
          })) || []
        );
        setDevelopers(developerRes.data?.data || []);
        setCountries(countryRes.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch one or more resources:", error);
      }
    };

    fetchAllData();
  }, [
    getAllProjectssWithoutPageenationApi,
    getAllCitiessApi,
    getAllDevelopersWithoutPageenationApi,
    getAllCountriesApi,
  ]);

  return {
    projects,
    cities,
    developers,
    countries,
  };
};

export default useFetch;
