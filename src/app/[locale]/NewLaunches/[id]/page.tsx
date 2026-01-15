"use client";

import { useParams } from "next/navigation";
import React from "react";

import useGetApisV2 from "@/Apis/v2/useGetApis";
import { NewLaunch } from "@/types/PropertiesV2";

import NewLaunchItem from "../components/NewLaunchItem";

const Page = () => {
  const params = useParams();
  const { id } = params;
  const decodedId = decodeURIComponent(decodeURIComponent(String(id)));

  const { getNewLaunchByIdApi } = useGetApisV2();
  const [newLaunches, setNewLaunches] = React.useState<NewLaunch>();

  const fetchNewLaunch = React.useCallback(async () => {
    getNewLaunchByIdApi(decodedId)
      .then((res) => setNewLaunches(res?.data?.data))
      .catch((err) => console.log(err));
  }, [getNewLaunchByIdApi, decodedId]);

  React.useEffect(() => {
    fetchNewLaunch();
  }, [fetchNewLaunch]);

  return (
    <div className="flex flex-col bg-primary pb-2">
      <NewLaunchItem item={newLaunches} key={newLaunches?.id} />
    </div>
  );
};

export default Page;
