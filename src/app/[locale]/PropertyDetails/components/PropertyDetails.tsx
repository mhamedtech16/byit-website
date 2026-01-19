"use client";

import { Building2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "use-intl";

import MessageModal from "@/components/MessageModal";
import ModalDemo from "@/components/Modal";
import NoData from "@/components/NoData";
import PropertyCalculator from "@/components/PropertyCalculator";
import { SkeletonLoading } from "@/components/SkeletonComponent";
import FavouriteButton from "@/components/ui/FavouriteButton";
import { colors } from "@/constants/colors";
import usePropertiesDetails from "@/hooks/usePropertiesDetails";
import { useIsRTL } from "@/hooks/useRTL";
import { pricePerLangauge } from "@/lib/PriceArray";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";

import PropertyAvailabilityTypes from "./PropertyAvailabilityTypes";
import SalesContact from "./SalesContact";

const PropertyDetails = () => {
  const t = useTranslations();
  const isRTL = useIsRTL();
  const locale = useLocale();
  const [isCalOpen, setCalcOpen] = useState(false);
  const [isAlretOpen, setAlretOpen] = useState(false);
  const { id } = useParams();
  const { currentUser } = useAuthStore();
  const { property, loading, error } = usePropertiesDetails(
    currentUser,
    Number(id)
  );
  const item = property;
  if (loading) {
    return <SkeletonLoading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-app-gray font-bold">Not Found</p>
      </div>
    );
  }
  if (!property) {
    return (
      <NoData
        message="noResultFound"
        imageSrc={<Building2 size={200} color={colors.white} />}
      />
    );
  }

  return (
    <>
      <div className="w-[95%] p-2 mx-auto rounded-xl" key={item?.id}>
        <div className="relative w-[100%] h-[400px]">
          <Image
            alt="property image"
            src={item?.imgs?.[0] ?? ""}
            fill
            className="object-cover rounded-xl"
          />
          <div className="absolute top-[12vmin] mx-[2vmin] flex flex-col justify-between h-[40%]">
            <button className=" w-[7vmin] h-[7vmin] bg-[var(--light-primary)] rounded-[3.5vmin] flex justify-center items-center cursor-pointer">
              <i className="fa-brands fa-readme text-white text-[5vmin]"></i>
            </button>

            <button
              onClick={() => {
                setCalcOpen(true);
                setAlretOpen(true);
              }}
              className="w-[7vmin] h-[7vmin] bg-[var(--orangeApp)] rounded-[3.5vmin] flex justify-center items-center cursor-pointer"
            >
              <i className="fa-solid fa-calculator text-white text-[5vmin]"></i>
            </button>
          </div>

          <div
            className={cn(
              "absolute top-[4vmin] mx-[2vmin] flex flex-col justify-between h-[40%]",
              isRTL ? "left-0" : "right-0"
            )}
          >
            <FavouriteButton
              item={item}
              favoriteType={"Property"}
              isItemFavorite={item?.isFavourite}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between my-5">
          <div className="flex flex-col w-[49%] gap-3">
            <div>
              <p className="font-bold text-xl">{item?.company?.name}</p>
            </div>

            <div>
              <p className="font-bold ">{item?.project?.name}</p>
              <p className="text-gray-400 ">{item?.location?.name}</p>
            </div>

            <div>
              <p className="font-bold ">{t("Starting Price")}</p>
              <p className="text-gray-400 ">
                {" "}
                {(item?.project?.startingPrice ?? 0) > 0
                  ? `${pricePerLangauge(
                      item?.project.startingPrice,
                      locale
                    )} ${t("EGP")}`
                  : t("onHold")}
              </p>
            </div>

            <div>
              <p className="font-bold ">{t("Down Payment")}</p>
              <p className="text-gray-400 ">
                {pricePerLangauge(parseFloat(item?.downPayment ?? ""), locale)}
              </p>
            </div>

            <div>
              <p className="font-bold ">{t("Installments")}</p>
              <p className="text-gray-400">
                {pricePerLangauge(item?.installmentDuration, locale)}
                {item?.durationType}
              </p>
            </div>

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
              src={item?.company?.logo ?? ""}
              // layout="responsive"
              className="rounded-xl"
              width={200}
              height={200}
            />
            <div>
              <p className="font-bold ">{t("Type")}</p>
              <p className="text-gray-400 ">{item?.category?.categoryName}</p>
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

        {/* <SalesContact /> */}
        <SalesContact item={item} type="property" />
        <PropertyAvailabilityTypes item={item} />
        <ModalDemo isOpen={isCalOpen} onClose={() => setCalcOpen(false)}>
          <PropertyCalculator
            type={"property"}
            item={item}
            setCalcOpen={setCalcOpen}
          />
        </ModalDemo>
        <MessageModal isAlretOpen={isAlretOpen} setAlretOpen={setAlretOpen} />
      </div>
    </>
  );
};

export default PropertyDetails;
