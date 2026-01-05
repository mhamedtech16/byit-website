import { useCallback, useState } from "react";

import useGetApis from "@/Apis/v1/useGetApis";
import { Developer, Project } from "@/types/Properties";

export function useDevelopersAndProjects(propertyType?: string) {
  const { getAllDevelopersApi, getProjectsByDeveloperApi } = useGetApis();

  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [devPage, setDevPage] = useState(1);
  const [devPages, setDevPages] = useState(0);
  const [devLoading, setDevLoading] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectPage, setProjectPage] = useState(1);
  const [projectPages, setProjectPages] = useState(0);
  const [projectsLoading, setProjectsLoading] = useState(false);

  // ===== Fetch Developers with pagination =====
  const fetchDevelopers = useCallback(
    async (page: number = 1, refresh: boolean = true, search: string = "") => {
      try {
        setDevLoading(true);
        const response = await getAllDevelopersApi(page, search, propertyType);

        if (response?.data?.data) {
          setDevelopers((prev) =>
            refresh ? response.data.data : [...prev, ...response.data.data]
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
    [getAllDevelopersApi, propertyType]
  );

  // ===== Fetch Projects (all or by developer) with pagination =====
  const fetchProjects = useCallback(
    async (developerId?: number, page: number = 1, refresh: boolean = true) => {
      try {
        setProjectsLoading(true);

        let response;

        if (developerId && developerId > 0) {
          response = await getProjectsByDeveloperApi(developerId, page);
        } else {
          response = await getProjectsByDeveloperApi(developerId || 0, page);
        }

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
    [getProjectsByDeveloperApi]
  );

  return {
    developers,
    devPage,
    devPages,
    devLoading,
    fetchDevelopers,

    projects,
    projectPage,
    projectPages,
    projectsLoading,
    fetchProjects,
  };
}
