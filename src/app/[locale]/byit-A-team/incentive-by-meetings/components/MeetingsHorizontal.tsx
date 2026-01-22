"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ar";
import "dayjs/locale/en";
dayjs.extend(utc);
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import MeetingsLoader from "@/components/ui/MeetingsLoader";
import { Sidebar } from "@/components/ui/Sidebar";
import { useMobile } from "@/hooks/useMobile";
import { useIsRTL } from "@/hooks/useRTL";
import { Button } from "@/shadcn/components/ui/button";
import { ScrollArea, ScrollBar } from "@/shadcn/components/ui/scroll-area";
import { cn } from "@/shadcn/lib/utils";
import { Earnings, Meeting } from "@/types/Meetings";

import MeetingsContent from "./MeetingsContent";

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export default function MeetingsHorizontal({
  data,
  earning = [],
  activeMonth,
  setActiveMonth,
}: {
  data: Meeting[];
  earning: Earnings[];
  activeMonth: string;
  setActiveMonth: Dispatch<SetStateAction<string>>;
}) {
  const monthRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = useTranslations();
  const isMobile = useMobile();
  const isRTL = useIsRTL();
  const locale = useLocale();
  dayjs.locale(locale);

  const [loading, setLoading] = useState(true);

  const year = dayjs().year();

  const months = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) =>
      dayjs.utc(`${year}-${i + 1}-01`).format("MMMM YYYY"),
    );
  }, [year]);

  useEffect(() => {
    if (!isMobile) return;
    if (loading) return;
    if (!activeMonth) return;

    const monthIndex = months.findIndex((m) => m === activeMonth);
    const el = monthRefs.current[monthIndex];

    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    });
  }, [activeMonth, months, loading, isMobile]);

  // auto select current month on mount
  useEffect(() => {
    const currentMonth = dayjs().utc().format("MMMM YYYY");
    setActiveMonth(currentMonth);
  }, [setActiveMonth]);

  useEffect(() => {
    if (!activeMonth) return;

    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, [activeMonth]);

  const activeMeetings = useMemo(() => data, [data]);

  const safeEarning = Array.isArray(earning) ? earning : [];

  const meetingEarnings = safeEarning.reduce(
    (sum, i: Earnings) => (i.reason === "MEETINGS" ? sum + i.amount : sum),
    0,
  );

  const resiveEarnings = safeEarning.reduce(
    (sum, i: Earnings) => (i.reason === "PAID-MEETING" ? sum + i.amount : sum),
    0,
  );

  const acceptedMeetings = useMemo(
    () => activeMeetings.filter((m) => m.status === "ACCEPTED").length,
    [activeMeetings],
  );

  const remainingMeetings = Math.max(4 - acceptedMeetings, 0);
  if (loading) {
    return <MeetingsLoader />;
  }
  return (
    <div
      className={cn("flex w-full min-h-screen", isMobile ? "flex-col" : "p-16")}
    >
      {isMobile ? (
        <ScrollArea
          className="rounded-md whitespace-nowrap"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="flex w-max space-x-4 p-4">
            {months.map((month, index) => (
              <Button
                key={month}
                ref={(el) => {
                  monthRefs.current[index] = el;
                }}
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
            ))}
          </div>
          <ScrollBar orientation="horizontal" hidden />
        </ScrollArea>
      ) : (
        <Sidebar label={t("months")}>
          {/*Side Bar for web */}
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
      )}

      {/* Right content */}
      <div className={cn(isMobile ? "" : "flex-1 px-10")}>
        {!activeMonth ? (
          <p className="text-muted-foreground text-lg">Select a month</p>
        ) : (
          // <></>
          <MeetingsContent
            activeMonth={activeMonth}
            activeMeetings={activeMeetings}
            meetingsEarning={meetingEarnings}
            reiceveEarning={resiveEarnings}
            remainingMeetings={remainingMeetings}
            acceptedMeetings={acceptedMeetings}
          />
        )}
      </div>
    </div>
  );
}
