import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";

import MessageModal from "@/components/MessageModal";
import ModalDemo from "@/components/Modal";
import PropertyCalculator from "@/components/PropertyCalculator";
import FavouriteButton from "@/components/ui/FavouriteButton";
import { useMobile } from "@/hooks/useMobile";
import { useIsRTL } from "@/hooks/useRTL";
import { pricePerLangauge } from "@/lib/PriceArray";
import { Label } from "@/shadcn/components/ui/label";
import { cn } from "@/shadcn/lib/utils";
import { NewLaunch } from "@/types/Properties";

import SalesContact from "../../PropertiesList/components/SalesContact";

type Props = {
  item: NewLaunch;
};
const NewLaunchItem = ({ item }: Props) => {
  const t = useTranslations("NewLaunches");
  const locale = useLocale();
  const isRTL = useIsRTL();
  const isMobile = useMobile();
  const [isCalOpen, setCalcOpen] = useState(false);
  const [isAlretOpen, setAlretOpen] = useState(false);
  if (isMobile) {
    return (
      <div className="w-[100%] mx-auto rounded-xl shadow-md bg-white mb-3">
        <div className="relative w-full h-[50vmin]">
          <Image
            alt="property image"
            src={item.imgs[0]}
            fill
            className="object-cover rounded-xl"
          />

          {/* Logo positioned on top-right */}
          <div className="absolute top-40 right-5 w-[12vmin] h-[12vmin]">
            <Image
              alt="company logo"
              src={item.company.logo}
              fill
              className="object-cover rounded-3xl shadow-md bg-white p-1"
            />
          </div>

          <div className="absolute top-30 mx-[3vmin] flex flex-col justify-between h-[70%]">
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

          {/* Button Favorite */}
          <div className={cn("absolute top-4", isRTL ? "left-4" : "right-4")}>
            <FavouriteButton
              item={item}
              favoriteType={"NewLaunch"}
              isItemFavorite={item.isFavourite}
            />
          </div>
        </div>
        <div className="flex flex-row mt-10 p-2">
          <div className="flex flex-col w-[90%] gap-3">
            <div>
              <p className="font-bold ">{t("Project Name")}</p>
              <p className="text-gray-400 ">{item.name}</p>
            </div>

            <div>
              <p className="font-bold ">{t("Location")}</p>
              <p className="text-gray-400 ">{item.location.name}</p>
            </div>
          </div>
        </div>

        <div className="border-t-1 my-[1vmin]" />
        <div className="flex flex-col w-[90%] gap-3 p-2">
          <p className="font-bold ">{t("Price")}</p>

          <div className="flex flex-col gap-3">
            {item.features.map((featureItm, idx) => (
              <Label className="font-bold" key={featureItm.category.name + idx}>
                {featureItm.category.name} :{" "}
                <Label className="text-gray-400 ">
                  {pricePerLangauge(featureItm.price, locale)}
                </Label>
              </Label>
            ))}

            {/* <Label className="font-bold">
              {t("Commission")} :
              {item?.commissions?.length > 0 &&
              parseFloat(item?.commissions?.[0]) > 0
                ? item?.commissions?.map((i, ind) => (
                    <Label className="text-gray-400 " key={i + ind}>
                      {`${ind > 0 ? " - " : ""}`}
                      {englishToArabicDigits(i, locale)}%
                    </Label>
                  ))
                : parseFloat(item?.commissions?.[0] || "0") == 0 && (
                    <Label>{t("commissionToBeAnnounced")}</Label>
                  )}
            </Label> */}
          </div>

          <div className="border-t-1 my-[1vmin]" />
          <p className="font-bold ">{t("EOI")}</p>
          <div className="flex flex-col gap-3">
            {item.features.map((featureItm, idx) => (
              <Label className="font-bold" key={featureItm.category.name + idx}>
                {featureItm.category.name} :{" "}
                <Label className="text-gray-400 ">
                  {pricePerLangauge(featureItm.bookingPrice, locale)} {t("EGP")}
                </Label>
              </Label>
            ))}
          </div>

          <SalesContact item={item} type="newLaunch" />
        </div>
        <ModalDemo isOpen={isCalOpen} onClose={() => setCalcOpen(false)}>
          <PropertyCalculator
            type={"newLaunch"}
            item={item}
            setCalcOpen={setCalcOpen}
          />
        </ModalDemo>
        <MessageModal isAlretOpen={isAlretOpen} setAlretOpen={setAlretOpen} />
      </div>
    );
  } else {
    return (
      <div className="w-[90%] mx-auto p-2 rounded-xl shadow-md bg-white mt-3 ">
        <div className="relative w-[100%] h-[50vh]">
          <Image
            alt="property image"
            src={item.imgs[0]}
            fill
            className="object-cover rounded-xl"
          />
          <div className="absolute top-4 mx-[2vmin] flex flex-col justify-between h-[70%]">
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
          <div className={cn("absolute top-4", isRTL ? "left-4" : "right-4")}>
            <FavouriteButton
              item={item}
              favoriteType={"NewLaunch"}
              isItemFavorite={item.isFavourite}
            />
          </div>
        </div>
        <div className="flex flex-row mt-10">
          <div className="flex flex-col w-[90%] gap-3">
            <div>
              <p className="font-bold ">{t("developerName")}</p>
              <p className="text-gray-400 ">{item.company.name}</p>
            </div>

            <div>
              <p className="font-bold ">{t("Project Name")}</p>
              <p className="text-gray-400 ">{item.name}</p>
            </div>

            <div>
              <p className="font-bold ">{t("Location")}</p>
              <p className="text-gray-400 ">{item.location.name}</p>
            </div>
          </div>

          <div className="relative  w-[12vmin] h-[12vmin]">
            <Image
              alt="property image"
              src={item.company.logo}
              fill
              className="object-cover rounded-[2vmin]"
            />
          </div>
        </div>

        <div className="border-t-1 my-[1vmin]" />
        <div className="flex flex-col w-[90%] gap-3">
          <p className="font-bold ">{t("Price")}</p>

          <div className="flex flex-col gap-3">
            {item.features.map((featureItm, idx) => (
              <Label className="font-bold" key={featureItm.category.name + idx}>
                {featureItm.category.name} :{" "}
                <Label className="text-gray-400 ">
                  {pricePerLangauge(featureItm.price, locale)}
                </Label>
              </Label>
            ))}

            {/* <Label className="font-bold">
              {t("Commission")} :
              {item?.commissions?.length > 0 &&
              parseFloat(item?.commissions?.[0]) > 0
                ? item?.commissions?.map((i, ind) => (
                    <Label className="text-gray-400 " key={i + ind}>
                      {`${ind > 0 ? " - " : ""}`}
                      {englishToArabicDigits(i, locale)}%
                    </Label>
                  ))
                : parseFloat(item?.commissions?.[0] || "0") == 0 && (
                    <Label>{t("commissionToBeAnnounced")}</Label>
                  )}
            </Label> */}
          </div>

          <div className="border-t-1 my-[1vmin]" />
          <p className="font-bold ">{t("EOI")}</p>
          <div className="flex flex-col gap-3">
            {item.features.map((featureItm, idx) => (
              <Label className="font-bold" key={featureItm.category.name + idx}>
                {featureItm.category.name} :
                <Label className="text-gray-400 ">
                  {pricePerLangauge(featureItm.bookingPrice, locale)} {t("EGP")}
                </Label>
              </Label>
            ))}
          </div>

          <SalesContact item={item} type="newLaunch" />
          <ModalDemo isOpen={isCalOpen} onClose={() => setCalcOpen(false)}>
            <PropertyCalculator
              type={"newLaunch"}
              item={item}
              setCalcOpen={setCalcOpen}
            />
          </ModalDemo>
          <MessageModal isAlretOpen={isAlretOpen} setAlretOpen={setAlretOpen} />
        </div>
      </div>
    );
  }
};

export default NewLaunchItem;
