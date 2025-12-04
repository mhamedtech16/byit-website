import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import MessageModal from "@/components/MessageModal";
import ModalDemo from "@/components/Modal";
import PropertyCalculator from "@/components/PropertyCalculator";
import FavouriteButton from "@/components/ui/FavouriteButton";
import { useMobile } from "@/hooks/useMobile";
import { useIsRTL } from "@/hooks/useRTL";
import { pricePerLangauge } from "@/lib/PriceArray";
import { cn } from "@/shadcn/lib/utils";
import { Property } from "@/types/Properties";

import PropertyAvailabilityTypes from "./PropertyAvailabilityTypes";
import SalesContact from "./SalesContact";

type Props = {
  item: Property;
};
const PropertyListItem = ({ item }: Props) => {
  const t = useTranslations();
  const isRTL = useIsRTL();
  const isMobile = useMobile();
  const currentLang = useLocale();
  const [isCalOpen, setCalcOpen] = useState(false);
  const [isAlretOpen, setAlretOpen] = useState(false);

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
      <div className="relative w-[100%] h-[50vmin]">
        <Image
          alt="property image"
          src={item?.imgs?.[0]}
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
            isItemFavorite={item.isFavourite}
          />
        </div>
      </div>
      <div
        className={cn(
          "flex flex-row justify-between my-5",
          isMobile ? "px-0" : "px-[8%]"
        )}
      >
        <div className={cn("flex flex-col gap-3", isMobile && "w-[49%]")}>
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
              {item.project.startingPrice > 0
                ? `${pricePerLangauge(
                    item.project.startingPrice,
                    currentLang
                  )} ${t("EGP")}`
                : t("onHold")}
            </p>
          </div>

          <div>
            <p className="font-bold ">{t("Down Payment")}</p>
            <p className="text-gray-400 ">
              {pricePerLangauge(parseFloat(item.downPayment), currentLang)}
            </p>
          </div>

          <div>
            <p className="font-bold ">{t("Installments")}</p>
            <p className="text-gray-400 ">
              {pricePerLangauge(item.installmentDuration, currentLang)}
              {item.durationType}
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
        <div className={cn("flex flex-col  gap-3", isMobile && "w-[49%]")}>
          <Image
            alt="property image"
            src={item.company?.logo}
            // layout="responsive"
            className="rounded-xl border-[0.5px] border-gray-300"
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
  );
};

export default PropertyListItem;
