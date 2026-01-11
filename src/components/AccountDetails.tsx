"use client";

import { motion } from "framer-motion";
import { HandCoins } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { routes } from "@/_lib/routes";
import { Sidebar } from "@/components/ui/Sidebar";
import { pricePerLangauge } from "@/lib/PriceArray";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import { Card, CardContent } from "@/shadcn/components/ui/card";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { Separator } from "@/shadcn/components/ui/separator";
import { useAuthStore } from "@/store/authStore";

import AccountMenu from "./AccountMenu";

export default function AccountDetails() {
  const t = useTranslations("Settings");
  const { currentUser } = useAuthStore();
  const locale = useLocale();
  const router = useRouter();

  const user = {
    avatarUrl: "/placeholder-profile.jpg",
  };

  return (
    <div className="flex min-h-screen w-screen p-16 bg-slate-50">
      <Sidebar label="settings">
        <AccountMenu />
      </Sidebar>

      <div className="flex-1 p-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
                  <Avatar className="w-28 h-28 border-4 border-white shadow-md bg-primary">
                    <AvatarImage src={user.avatarUrl} alt="User" />
                    <AvatarFallback className="bg-primary text-white text-center text-3xl">
                      {currentUser?.user?.fullname?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="pt-6 text-center">
                  <h2 className="text-2xl font-semibold">
                    {currentUser?.user?.fullname}
                  </h2>
                </div>

                <div className="flex flex-row justify-between items-center w-[95%]">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      {t("myEarnings")} :
                    </h3>
                    <div className="flex  items-center space-x-3">
                      <HandCoins color="gold" size={40} />
                      <p className="text-gray-500 text-xl font-bold">
                        {`${pricePerLangauge(
                          currentUser?.user?.earns,
                          locale
                        )} ${t("currency")}`}
                      </p>
                    </div>
                    <p className="text-gray-500 text-sm font-bold">
                      {t("yourEarningsShouldBeRequested")}
                    </p>
                  </div>

                  <button
                    className="bg-white hover:bg-primary/5 shadow-lg rounded-4xl p-4 flex items-center justify-center cursor-pointer"
                    onClick={() => router.push(routes.History)}
                  >
                    <p className="text-orangeApp font-bold">{t("myHistory")}</p>
                  </button>
                </div>

                <Separator className="my-6" />
              </div>

              <div className="flex flex-wrap -mx-2">
                {[
                  { label: t("fullname"), value: currentUser?.user?.fullname },
                  { label: t("email"), value: currentUser?.user?.email },
                  { label: t("phone"), value: currentUser?.user?.phone },
                  {
                    label: t("state"),
                    value:
                      currentUser?.user?.city?.name ||
                      currentUser?.user?.city?.name_en,
                  },
                  {
                    label: t("yearsExperience"),
                    value: currentUser?.user?.yearsExperience,
                  },
                  {
                    label: t("country"),
                    value:
                      currentUser?.user?.country.name ||
                      currentUser?.user?.country.name_en,
                  },
                ].map((item, index) => (
                  <div key={index} className="w-full md:w-1/2 px-2 mb-4">
                    <Label className="text-primary mb-2 text-md block">
                      {item.label}
                    </Label>
                    <Input
                      value={item.value}
                      readOnly
                      className="cursor-not-allowed focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 hover:border-muted active:border-muted bg-muted/50"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
