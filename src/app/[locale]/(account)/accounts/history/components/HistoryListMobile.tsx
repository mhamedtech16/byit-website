"use client";

import { motion, Variants } from "framer-motion";
import { History } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { imgs } from "@/assets";
import BackgroundImage from "@/components/BackgroundImage";
import NoData from "@/components/NoData";
import { SkeletonLoading } from "@/components/SkeletonComponent";
import { colors } from "@/constants/colors";
import useHistory from "@/hooks/useHistory";
import { formatDate } from "@/lib/formateDate";
import { pricePerLangauge } from "@/lib/PriceArray";
import { getVisiblePages } from "@/lib/VisiblePages";
import { Card, CardContent } from "@/shadcn/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/components/ui/pagination";
import { Tabs, TabsList, TabsTrigger } from "@/shadcn/components/ui/tabs";
import { cn } from "@/shadcn/lib/utils";

export default function HistoryListMobile() {
  const t = useTranslations("History");
  const [page, setPage] = useState(1);
  const { history, loading, dealType, totalPages, refetch } = useHistory(
    page,
    10,
  );
  const [activeType, setActiveType] = useState<string>(
    dealType ?? "CONTRACTED",
  );
  const locale = useLocale();

  const totalValue = history.reduce((sum, item) => sum + item.value, 0);
  const totalEarnings = history.reduce(
    (sum, item) => sum + item.userCommission,
    0,
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
          {/*  Total price */}
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
      <div className="flex flex-col px-4">
        <Tabs
          value={activeType}
          onValueChange={(value) => {
            setActiveType(value);
            refetch(value);
          }}
        >
          <TabsList className={cn("w-full h-16")}>
            <TabsTrigger value="CONTRACTED">{t("closedDeals")}</TabsTrigger>

            <TabsTrigger value="SHARING">{t("sharesDeals")}</TabsTrigger>
          </TabsList>
          {history.length === 0 ? (
            <NoData
              message="noHistoryFound"
              imageSrc={<History size={100} color={colors.white} />}
            />
          ) : (
            <div className="mt-5">
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
        </Tabs>
        <Pagination className="mt-10 mb-10">
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  if (page === 1) {
                    e.preventDefault();
                    return;
                  }
                  setPage((p) => p - 1);
                }}
                className={cn(
                  "text-white",
                  page === 1 ? "opacity-50 cursor-not-allowed" : "text-white",
                )}
              />
            </PaginationItem>

            {/* Pages */}
            {getVisiblePages(page, totalPages).map((p, i) => {
              if (p === "...") {
                return (
                  <PaginationItem key={`dots-${i}`}>
                    <span className="px-3 text-white">…</span>
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={p}>
                  <PaginationLink
                    isActive={page === p}
                    className={cn(
                      "text-white",
                      page === p && "bg-white text-black",
                    )}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  if (page === totalPages) {
                    e.preventDefault();
                    return;
                  } else if (totalPages === 0) {
                    e.preventDefault();
                    return;
                  }
                  setPage((p) => p + 1);
                }}
                className={cn(
                  "text-white",
                  page === totalPages ? "opacity-50 cursor-not-allowed" : "",
                  totalPages === 0 ? "opacity-50 cursor-not-allowed" : "",
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
