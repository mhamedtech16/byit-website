import { useLocale, useTranslations } from "next-intl";
import { ReactNode } from "react";

import { pricePerLangauge } from "@/lib/PriceArray";
import { Button } from "@/shadcn/components/ui/button";
import { Label } from "@/shadcn/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";
import { Apartment, Mall, Villa } from "@/types/Properties";

type Props = {
  title?: string;
  className: string;
  children: ReactNode;
  item: Apartment[] | Villa[] | Mall[];
  type: string;
};
export function AvailabilityPopoverButton({
  className,
  children,
  item,
}: Props) {
  const t = useTranslations();
  const currentLang = useLocale();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={className} variant="outline">
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">
            {item.map((itm, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <p className="font-bold">- {t(`${itm.type}`)}</p>
                {itm.available ? (
                  <div className="w-[100%] flex-col gap-4">
                    <p>
                      {t("Price")} :{" "}
                      {pricePerLangauge(itm.price || 0, currentLang)}
                    </p>
                    <p>
                      {t("Area")} :{" "}
                      {pricePerLangauge(itm.area || 0, currentLang)}
                    </p>
                  </div>
                ) : (
                  <Label className="text-red-600" htmlFor="width">
                    {t("Not Available")}
                  </Label>
                )}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
