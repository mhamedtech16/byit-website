"use client";

import { useParams } from "next/navigation";
import React from "react";

import useGetApisV2 from "@/Apis/v2/useGetApis";
import { ProjectsUnit } from "@/types/PropertiesV2";

import PropertyListItem from "../components/PropertyListItem";

const Page = () => {
  const { slug } = useParams();
  const [projectCategory, setProjectCategory] = React.useState<ProjectsUnit>();
  const { getProjectsUnitsByIdApi } = useGetApisV2();

  const fetchData = React.useCallback(async () => {
    await getProjectsUnitsByIdApi(String(slug))
      .then((res) => setProjectCategory(res.data.data))
      .catch((err) => console.log(err));
  }, [slug, getProjectsUnitsByIdApi]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col flex-1 w-full mx-auto bg-primary pb-5">
      <div className="flex justify-between w-[90%] mx-auto pt-4 bg-primary">
        <PropertyListItem item={projectCategory} key={projectCategory?.id} />
      </div>
    </div>
  );
};

export default Page;
