"use client";

import HomePage from "@/app/components/HomePage";
import { useMobile } from "@/hooks/useMobile";

import HomePageMobile from "../components/HomePageMobile";

export default function HomePage1() {
  const isMobile = useMobile();

  return <>{isMobile ? <HomePageMobile /> : <HomePage />}</>;
}
