import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import ModalDemo from "@/components/Modal";
import SharedPropertyCalculator from "@/components/SharedPropertyCalculator";
import { useMobile } from "@/hooks/useMobile";
import { useIsRTL } from "@/hooks/useRTL";
import { pricePerLangauge } from "@/lib/PriceArray";
import { cn } from "@/shadcn/lib/utils";
import { SharedProperties } from "@/types/Properties";

import SharedSalesContact from "./SharedSalesContact";

type Props = {
  item: SharedProperties;
};
const SharedPropertyListItem = ({ item }: Props) => {
  const t = useTranslations();
  const isRTL = useIsRTL();
  const isMobile = useMobile();
  const currentLang = useLocale();
  const [isCalOpen, setCalcOpen] = useState(false);

  return (
    <div
      className="w-[100%] p-2 rounded-xl shadow-md bg-white"
      key={item.id}
      //onClick={() => router.push('PropertyDetails')}
    >
      {/* <Image alt="property image" src={'/images/intro1.jpg'}
                layout="responsive"
                className="rounded-xl"
                width={500}
                height={500} /> */}
      <div className="relative w-[100%] h-[50vmin] overflow-hidden">
        <Image
          alt="property image"
          src={item?.imgs?.[0]}
          fill
          className="object-cover rounded-xl"
        />

        {isMobile ? (
          <>
            {(item?.minShares ?? 0) > 0 && (
              <div
                className={cn(
                  "absolute top-6 bg-[var(--blue)] text-white w-60 py-1 rotate-45 rounded-lg",
                  isRTL
                    ? "left-[-70px] rotate-[-45deg]"
                    : "right-[-70px] rotate-45"
                )}
              >
                <p className="whitespace-pre-line text-center font-semibold text-xl">
                  {t("minimumShares", { count: item?.minShares || 0 })}
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {(item?.minShares ?? 0) > 0 && (
              <div
                className={cn(
                  "absolute top-10 bg-[var(--blue)] text-white w-80 py-2 rotate-45 rounded-lg",
                  isRTL
                    ? "left-[-80px] rotate-[-45deg]"
                    : "right-[-80px] rotate-45"
                )}
              >
                <p className="whitespace-pre-line text-center font-semibold text-xl">
                  {t("minimumShares", { count: item?.minShares || 0 })}
                </p>
              </div>
            )}
          </>
        )}

        <div className="absolute top-[12vmin] mx-[2vmin] flex flex-col justify-center gap-10">
          {isMobile ? (
            <>
              <button
                className=" h-[8vmin] w-[8vmin] bg-[var(--light-primary)] rounded-[3.5vmin] flex justify-center items-center cursor-pointer"
                onClick={() => window.open(item?.pdf, "_blank")}
              >
                <i className="fa-brands fa-readme text-white text-[5vmin]"></i>
              </button>

              <button
                onClick={() => {
                  setCalcOpen(true);
                }}
                className="h-[8vmin] w-[8vmin] bg-[var(--orangeApp)] rounded-[3.5vmin] flex justify-center items-center cursor-pointer"
              >
                <i className="fa-solid fa-calculator text-white text-[5vmin]"></i>
              </button>
            </>
          ) : (
            <>
              <button
                className=" w-[7vmin] h-[7vmin] bg-[var(--light-primary)] rounded-[3.5vmin] flex justify-center items-center cursor-pointer"
                onClick={() => window.open(item?.pdf, "_blank")}
              >
                <i className="fa-brands fa-readme text-white text-[5vmin]"></i>
              </button>

              <button
                onClick={() => {
                  setCalcOpen(true);
                }}
                className="w-[7vmin] h-[7vmin] bg-[var(--orangeApp)] rounded-[3.5vmin] flex justify-center items-center cursor-pointer"
              >
                <i className="fa-solid fa-calculator text-white text-[5vmin]"></i>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col w-[49%] gap-3">
          <div>
            {isRTL ? (
              <p className="font-bold ">{item?.projectName_ar}</p>
            ) : (
              <p className="font-bold ">{item?.projectName_en}</p>
            )}

            <p className="text-gray-400 ">{t(item?.location?.name)}</p>
          </div>

          <div>
            <p className="font-bold ">{t("unitPrice")}</p>
            <p className="text-gray-400 ">
              {`${pricePerLangauge(item?.price, currentLang)} ${t("EGP")}`}
            </p>
          </div>

          <div>
            <p className="font-bold ">{t("sharePrice")}</p>
            <p className="text-gray-400 ">
              {`${pricePerLangauge(item?.sharePrice, currentLang)} ${t("EGP")}`}
            </p>
          </div>

          {item.priceType === "INSTALLMENT" ? (
            <>
              <div>
                <p className="font-bold ">{t("Down Payment")}</p>
                <p className="text-gray-400 ">
                  {`${pricePerLangauge(
                    parseFloat(item.downPayment),
                    currentLang
                  )} ${t("EGP")}`}
                </p>
              </div>

              <div>
                <p className="font-bold ">{t("Installments")}</p>
                <p className="text-gray-400 ">
                  {`${pricePerLangauge(
                    item.installmentDuration,
                    currentLang
                  )} ${t("years")}`}
                </p>
                <p className="text-gray-400 ">
                  ({`${item?.monthlyInstallment} ${t("EGP")}`}/
                  {t(item.durationType)})
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="font-bold ">{t(item?.priceType)}</p>
              </div>
            </>
          )}

          <div>
            <p className="font-bold ">{t("Delivery")}</p>
            {item?.deliveryStatus?.map((item, index) => (
              <p key={`delivery-${index}`} className="text-gray-400 ">
                {t(item)}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-[49%] gap-2">
          <Image
            alt="property image"
            src={item?.companyLogo ?? ""}
            // layout="responsive"
            className="rounded-xl border-[0.5px] border-gray-300"
            width={isMobile ? 100 : 200}
            height={isMobile ? 100 : 200}
          />
          <div>
            <p className="font-bold ">{t("Type")}</p>
            <p className="text-gray-400 ">{t(item?.category?.categoryName)}</p>
          </div>

          <div>
            <p className="font-bold ">{t("Finishing")}</p>
            {item?.finishingType?.map((item, index) => (
              <p className="text-gray-400" key={index}>
                {t(item)}
              </p>
            ))}
          </div>
        </div>
      </div>

      <SharedSalesContact item={item} />

      <ModalDemo isOpen={isCalOpen} onClose={() => setCalcOpen(false)}>
        <SharedPropertyCalculator item={item} />
      </ModalDemo>
    </div>
  );
};

export default SharedPropertyListItem;
