"use client";

import React from "react";

import { useMobile } from "@/hooks/useMobile";

import HistoryList from "./components/HistoryList";
import HistoryListMobile from "./components/HistoryListMobile";

export default function Page() {
  const isMobile = useMobile();
  return isMobile ? <HistoryListMobile /> : <HistoryList />;
}
