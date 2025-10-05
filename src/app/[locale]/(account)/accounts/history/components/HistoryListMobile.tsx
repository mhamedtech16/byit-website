"use client";

import { motion, Variants } from "framer-motion";
import { History } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { imgs } from "@/assets";
import BackgroundImage from "@/components/BackgroundImage";
import NoData from "@/components/NoData";
import { SkeletonLoading } from "@/components/SkeletonComponent";
import { colors } from "@/constants/colors";
import useHistory from "@/hooks/useHistory";
import { formatDate } from "@/lib/formateDate";
import { pricePerLangauge } from "@/lib/PriceArray";
import { Card, CardContent } from "@/shadcn/components/ui/card";

export default function HistoryListMobile() {
  const t = useTranslations("History");
  const { history, loading } = useHistory();
  const locale = useLocale();

  const totalValue = history.reduce((sum, item) => sum + item.value, 0);
  const totalEarnings = history.reduce(
    (sum, item) => sum + item.userCommission,
    0
  );

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  };

  if (loading) {
    return <SkeletonLoading />;
  }
  return (
    <div className="min-h-screen bg-primary overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
        className="items-center justify-center flex mb-8 relative w-full h-[40vmin]"
      >
        {/* Background */}
        <BackgroundImage img={imgs.intro} />

        {/*  Title */}
        <motion.h1
          className="absolute top-[10%] text-center text-[8vmin] font-bold text-white"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          {t("history")}
        </motion.h1>

        <div className="absolute top-[55%] w-full px-8 flex justify-between">
          {/*  Total Value */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="flex flex-col items-center text-white"
          >
            <span className="text-lg font-bold">{t("totalValue")}</span>
            <span className="text-lg font-semibold">
              {pricePerLangauge(totalValue || 0, locale)} {t("EGP")}
            </span>
          </motion.div>

          {/*  Total Earning */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="flex flex-col items-center text-white"
          >
            <span className="text-lg font-bold">{t("totalEarnings")}</span>
            <span className="text-lg font-semibold">
              {pricePerLangauge(totalEarnings || 0, locale)} {t("EGP")}
            </span>
          </motion.div>
        </div>
      </motion.div>
      {history.length === 0 ? (
        <NoData
          message="noHistoryFound"
          imageSrc={<History size={100} color={colors.white} />}
        />
      ) : (
        <div className="flex flex-col px-4">
          {history.map((item, index) => (
            <Card key={index} className="shadow-lg mb-4">
              <CardContent>
                <div className="space-y-2">
                  {/*  Client Name */}
                  <div className="flex space-x-2">
                    <span className="text-black font-bold">
                      {`${t("clientName")}:`}
                    </span>
                    <span className="font-medium text-app-gray">
                      {item.clientName}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex  space-x-2">
                    <span className="text-black font-bold">
                      {`${t("createdAt")}:`}
                    </span>
                    <span className="font-medium text-app-gray">
                      {formatDate(item.createdAt, locale)}
                    </span>
                  </div>

                  {/*  Deal Value */}
                  <div className="flex  space-x-2">
                    <span className="font-bold text-green-500">
                      {`${t("dealValue")}:`}
                    </span>
                    <span className="font-medium text-green-500">
                      {pricePerLangauge(item.value || 0, locale)}
                    </span>
                    <span className="font-medium text-green-500">
                      {t("EGP")}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex justify-between items-center">
                    <span className="text-slate-950 font-medium text-xl">
                      {`${t("status")}:`}
                    </span>
                    <span
                      className={`font-semibold ${
                        item.status === "ACCEPTED"
                          ? "text-white bg-green-500 p-2 rounded-xl"
                          : "text-white bg-orangeApp p-2 rounded-xl"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
