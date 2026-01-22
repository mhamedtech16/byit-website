"use client";

import dayjs from "dayjs";
import { useTranslations } from "next-intl";

import { useMobile } from "@/hooks/useMobile";
import { getStatusColor } from "@/lib/statusColor";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { Separator } from "@/shadcn/components/ui/separator";
import { cn } from "@/shadcn/lib/utils";
import { Meeting } from "@/types/Meetings";

interface MeetingsContentProps {
  activeMonth: string;
  activeMeetings: Meeting[];
  remainingMeetings: number;
  acceptedMeetings: number;
  meetingsEarning: number;
  reiceveEarning: number;
}

export default function MeetingsContent({
  activeMonth,
  activeMeetings,
  remainingMeetings,
  acceptedMeetings,
  meetingsEarning,
  reiceveEarning,
}: MeetingsContentProps) {
  const isMobile = useMobile();
  const t = useTranslations();

  return (
    <Card className="rounded-xl border shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-lg text-center">{activeMonth}</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-4">
        {/* === Summary Cards === */}
        <div className="space-y-3">
          <Card className="p-3 text-center bg-blue-100 rounded-lg border space-y-4">
            <p className="text-lg text-black font-bold">
              {t("myMeetingEarnings")}
            </p>
            <div
              className={cn(
                isMobile
                  ? "flex flex-col space-y-4"
                  : "flex flex-row justify-around",
              )}
            >
              <div className="flex flex-col space-y-4">
                <p className="text-xl font-bold">Total earning</p>
                <p className="font-bold text-lg text-green-500">
                  {`${meetingsEarning - reiceveEarning} ${t("EGP")}`}
                </p>
              </div>

              <div className="flex flex-col space-y-4">
                <p className="text-xl font-bold">Total recive cash</p>
                <p className="font-bold text-lg text-green-500">
                  {`${reiceveEarning ?? 0} ${t("EGP")}`}
                </p>
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Card className="flex-1 p-3 text-center bg-green-100 rounded-lg border">
              <p className="text-lg font-bold text-black">{t("noMeetings")}</p>
              <p className="font-bold text-lg">{acceptedMeetings}</p>
            </Card>

            <Card className="flex-1 p-3 text-center bg-red-100 rounded-lg border">
              <p className="text-lg font-bold text-black">
                {t("remainingMeetings")}
              </p>
              <p className="font-bold text-lg">{remainingMeetings}</p>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Meetings list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeMeetings.length > 0 ? (
            activeMeetings?.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg border bg-muted/30 border-primary/30 space-y-2"
              >
                <p className="font-bold text-xl text-primary">{`#${item.id}`}</p>
                <p className="space-x-1">
                  <b>{t("clientName")}:</b>
                  <span className="text-primary">{item.clientName}</span>
                </p>
                <p className="space-x-1">
                  <b>{t("date")}:</b>
                  <span className="text-primary">
                    {dayjs(item.createdAt).utc().format("DD MMM YYYY")}
                  </span>
                </p>
                <p className="space-x-1">
                  <b>{t("salesName")}:</b>
                  <span className="text-primary">{item.salesName}</span>
                </p>
                <p className="space-x-1">
                  <b>{t("developer")}:</b>
                  <span className="text-primary">{item.company?.name}</span>
                </p>
                <p className="space-x-1">
                  <b>{t("project")}:</b>
                  <span className="text-primary">{item.project?.name}</span>
                </p>
                <p className="text-xl font-bold text-primary space-x-1">
                  <b>{t("status")}:</b>
                  <span
                    className={` font-semibold ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No meetings</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
