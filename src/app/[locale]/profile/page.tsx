"use client";

import { useTranslations } from "next-intl";

import LocaleSwitcher from "@/components/LocaleSwitcher";
import { Button } from "@/shadcn/components/ui/button";

export default function Page() {
  const t = useTranslations();
  return (
    <div>
      <LocaleSwitcher />
      <Button className="text-green-500">{t("HomePage.description")}</Button>
    </div>
  );
}
