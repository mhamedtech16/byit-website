import { useCallback, useState } from "react";

import useGetApisV2 from "@/Apis/v2/useGetApis";
import { Developers, Projects } from "@/types/PropertiesV2";

const OTHER_DEVELOPER: Developers = {
  id: "Other",
  en_name: "Other",
  ar_name: "أخرى",
  logo: "/files/dddb314c-9329-4b6a-90b3-ce059ed8fa40.png",
  project_type: "Compound",
};

export function useDevelopersAndProjects(propertyType?: string) {
  const { getDevelopersApi, getProjectsByDeveloperIdApi } = useGetApisV2();

  const [developers, setDevelopers] = useState<Developers[]>([]);
  const [devPage, setDevPage] = useState(1);
  const [devPages, setDevPages] = useState(0);
  const [devLoading, setDevLoading] = useState(false);

  const [projects, setProjects] = useState<Projects[]>([]);
  const [projectPage, setProjectPage] = useState(1);
  const [projectPages, setProjectPages] = useState(0);
  const [projectsLoading, setProjectsLoading] = useState(false);

  // ===== Fetch Developers with pagination =====
  const fetchDevelopers = useCallback(
    async (page: number = 1, refresh: boolean = true, limit?: number) => {
      try {
        setDevLoading(true);
        const response = await getDevelopersApi(page, limit || 20);

        if (response?.data?.data) {
          setDevelopers((prev) =>
            refresh
              ? [...response.data.data, OTHER_DEVELOPER]
              : [...prev, ...response.data.data]
          );
          setDevPage(response.data.page);
          setDevPages(response.data.pageCount);
        }
      } catch (error) {
        console.error("Error fetching developers:", error);
      } finally {
        setDevLoading(false);
      }
    },
    [getDevelopersApi]
  );

  // ===== Fetch Projects (all or by developer) with pagination =====
  const fetchProjects = useCallback(
    async (developerId?: string, page: number = 1, refresh: boolean = true) => {
      try {
        setProjectsLoading(true);

        const response = await getProjectsByDeveloperIdApi(
          developerId || "",
          page
        );

        if (response?.data?.data) {
          setProjects((prev) =>
            refresh ? response.data.data : [...prev, ...response.data.data]
          );
          setProjectPage(response.data.page);
          setProjectPages(response.data.pageCount);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setProjectsLoading(false);
      }
    },
    [getProjectsByDeveloperIdApi]
  );

  return {
    developers,
    devPage,
    devPages,
    devLoading,
    fetchDevelopers,

    projects,
    setProjects,
    projectPage,
    projectPages,
    projectsLoading,
    fetchProjects,
  };
}
