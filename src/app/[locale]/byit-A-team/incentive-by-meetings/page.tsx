"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { routes } from "@/_lib/routes";
import useMeetings from "@/hooks/useMeeting";
import { Button } from "@/shadcn/components/ui/button";
import { useAuthStore } from "@/store/authStore";

import MeetingsHorizontal from "./components/MeetingsHorizontal";

export default function Page() {
  const router = useRouter();
  const t = useTranslations();
  const { currentUser } = useAuthStore();
  const { meetings } = useMeetings(currentUser);

  return (
    <div className="p-6 bg-slate-50">
      <div className="flex justify-between items-center px-6">
        <h1 className="text-xl font-bold">{t("myMeetings")}</h1>
        <Button onClick={() => router.push(routes.NewMeetings)}>
          {t("newMeetings")}
        </Button>
      </div>
      <MeetingsHorizontal data={meetings} />
    </div>
  );
}
