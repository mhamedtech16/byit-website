"use client";

import { notFound } from "next/navigation";

import HomePage from "@/app/components/HomePage";
import { useMobile } from "@/hooks/useMobile";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

import HomePageMobile from "../components/HomePageMobile";

export default function HomePage1() {
  const isOnline = useOnlineStatus();
  const isMobile = useMobile();

  if (!isOnline) {
    notFound();
  }

  return <>{isMobile ? <HomePageMobile /> : <HomePage />}</>;
}
