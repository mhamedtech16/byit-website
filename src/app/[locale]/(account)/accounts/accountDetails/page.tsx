"use client";

import AccountDetails from "@/components/AccountDetails";
import { useMobile } from "@/hooks/useMobile";

import AccountDetailsMobile from "./components/AccountDetailsMobile";

export default function Page() {
  const isMobile = useMobile();
  return (
    <div className="items-center justify-center flex min-h-screen bg-primary">
      {isMobile ? <AccountDetailsMobile /> : <AccountDetails />}
    </div>
  );
}
