"use client";
import React, { useEffect, useState } from "react";

import useGetApis from "@/Apis/useGetApis";
import { NewLaunch } from "@/types/Properties";

import NewLaunchItem from "./components/NewLaunchItem";

const NewLaunches = () => {
  const { getAllNewLaunchesApi } = useGetApis();
  const [newLaunches, setNewLaunches] = useState<NewLaunch[]>();

  const getNewLaunches = React.useCallback(
    (page: number, search: string, developerId: number) => {
      getAllNewLaunchesApi(page, search, developerId)
        .then((res) => {
          setNewLaunches(res.data.data);
        })
        .catch(() => {});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    getNewLaunches(1, "", 0);
  }, [getNewLaunches]);
  return (
    <div className="flex flex-col bg-primary pb-2">
      {newLaunches?.map((item, index) => (
        <NewLaunchItem item={item} key={index} />
      ))}
    </div>
  );
};

export default NewLaunches;
