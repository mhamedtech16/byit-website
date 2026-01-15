"use client";
import React, { useEffect, useState } from "react";

import useGetApisV2 from "@/Apis/v2/useGetApis";
import { NewLaunch } from "@/types/PropertiesV2";

import NewLaunchItem from "./components/NewLaunchItem";

const NewLaunches = () => {
  const { getNewLaunchApi } = useGetApisV2();
  const [newLaunches, setNewLaunches] = useState<NewLaunch[]>();

  const getNewLaunches = React.useCallback(async () => {
    getNewLaunchApi()
      .then((res) => {
        setNewLaunches(res.data.data);
      })
      .catch(() => {});
  }, [getNewLaunchApi]);

  useEffect(() => {
    getNewLaunches();
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
