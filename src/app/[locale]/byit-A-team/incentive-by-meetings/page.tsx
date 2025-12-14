"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { routes } from "@/_lib/routes";
import useMeetings from "@/hooks/useMeeting";
import { useMobile } from "@/hooks/useMobile";
import { getMonthRange } from "@/lib/formateDate";
import { Button } from "@/shadcn/components/ui/button";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";

import MeetingsHorizontal from "./components/MeetingsHorizontal";

export default function Page() {
  const isMobile = useMobile();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const { currentUser } = useAuthStore();
  const [activeMonth, setActiveMonth] = useState("");
  const { startDate, endDate } = getMonthRange(activeMonth, locale);
  const { meetings } = useMeetings(currentUser, startDate, endDate);

  return (
    <div className="p-6 bg-slate-50">
      <div
        className={cn(
          "flex items-center justify-between",
          isMobile ? "px-0" : "justify-between px-6"
        )}
      >
        <h1 className="text-xl font-bold">{t("myMeetings")}</h1>
        {/* {isMobile ? (
          <Button
            onClick={() => router.push(routes.NewMeetings)}
            className=" fixed top-[92%] left-48 border border-white"
          >
            {t("newMeetings")}
          </Button>
        ) : ( */}
        <Button
          onClick={() => router.push(routes.NewMeetings)}
          className={cn(isMobile && "px-4")}
        >
          {t("newMeetings")}
        </Button>
        {/* )} */}
      </div>
      <MeetingsHorizontal
        data={meetings}
        activeMonth={activeMonth}
        setActiveMonth={setActiveMonth}
      />
    </div>
  );
}
