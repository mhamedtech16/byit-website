"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ar";
import "dayjs/locale/en";
dayjs.extend(utc);
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import MeetingsLoader from "@/components/ui/MeetingsLoader";
import { Sidebar } from "@/components/ui/Sidebar";
import { Button } from "@/shadcn/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { Meeting } from "@/types/Meetings";

import MeetingsContent from "./MeetingsContent";

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export default function MeetingsHorizontal({ data }: { data: Meeting[] }) {
  const t = useTranslations();
  const locale = useLocale();
  dayjs.locale(locale);
  const { currentUser } = useAuthStore();

  const [activeMonth, setActiveMonth] = useState("");
  const [loading, setLoading] = useState(true);

  const year = dayjs().year();

  const months = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) =>
      dayjs.utc(`${year}-${i + 1}-01`).format("MMMM YYYY")
    );
  }, [year]);

  const groupedMeetings = useMemo(() => {
    const grouped: Record<string, Meeting[]> = {};
    data.forEach((m) => {
      const month = dayjs(m.createdAt).utc().format("MMMM YYYY");
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(m);
    });
    return grouped;
  }, [data]);

  // auto select current month on mount
  useEffect(() => {
    const currentMonth = dayjs().utc().format("MMMM YYYY");
    setActiveMonth(currentMonth);
  }, []);

  useEffect(() => {
    if (!activeMonth) return;

    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, [activeMonth]);

  const activeMeetings = useMemo(() => {
    return activeMonth ? groupedMeetings[activeMonth] ?? [] : [];
  }, [activeMonth, groupedMeetings]);

  const acceptedMeetings = useMemo(
    () => activeMeetings.filter((m) => m.status === "ACCEPTED").length,
    [activeMeetings]
  );

  const remainingMeetings = Math.max(4 - acceptedMeetings, 0);

  return (
    <div className="flex w-full p-16 min-h-screen">
      {/* Sidebar */}
      <Sidebar label={t("months")}>
        {months.map((month) => (
          <motion.div variants={linkVariants} key={month}>
            <Button
              onClick={() => setActiveMonth(month)}
              variant="linkUnderline"
              size="linkUnderline"
              className={
                activeMonth === month
                  ? "text-orangeApp font-semibold underline"
                  : ""
              }
            >
              {month}
            </Button>
          </motion.div>
        ))}
      </Sidebar>

      {/* Right content */}
      <div className="flex-1 px-10">
        {!activeMonth ? (
          <p className="text-muted-foreground text-lg">Select a month</p>
        ) : loading ? (
          <MeetingsLoader />
        ) : (
          <MeetingsContent
            activeMonth={activeMonth}
            activeMeetings={activeMeetings}
            currentUser={currentUser}
            remainingMeetings={remainingMeetings}
            acceptedMeetings={acceptedMeetings}
          />
        )}
      </div>
    </div>
  );
}
