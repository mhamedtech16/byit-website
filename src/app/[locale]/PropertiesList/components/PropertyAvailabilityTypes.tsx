import { useTranslations } from "next-intl";

import { useMobile } from "@/hooks/useMobile";
import { Property } from "@/types/Properties";

import { AvailabilityPopoverButton } from "./AvailabilityPopoverButton";

type Props = {
  item: Property;
};
const PropertyAvailabilityTypes = ({ item }: Props) => {
  const t = useTranslations();
  const isMobile = useMobile();
  return (
    <>
      {isMobile ? (
        <div
          className={`flex flex-row px-[10%] ${
            item.type != "SEPARATED" ? "justify-between" : "justify-center"
          } border-t-1 border-t-gray-300 py-[2vmin]`}
        >
          <div>
            <AvailabilityPopoverButton
              type="Apartment"
              item={item.project.apartments}
              className="w-[8vmin] h-[12vmin] rounded-full hover:bg-primary/5 cursor-pointer shadow-md"
            >
              <i className="fa-solid fa-city text-primary text-4xl"></i>
            </AvailabilityPopoverButton>
            <p className="text-center font-bold mt-2">{t("Apartment")}</p>
          </div>

          {item.type != "SEPARATED" && (
            <>
              <div>
                <AvailabilityPopoverButton
                  type="Villa"
                  item={item.project.villas}
                  className="w-[8vmin] h-[12vmin] rounded-full hover:bg-primary/5 cursor-pointer shadow-md"
                >
                  <i className="fa-solid fa-house-chimney text-primary text-4xl"></i>
                </AvailabilityPopoverButton>
                <p className="text-center font-bold mt-2">{t("Villa")}</p>
              </div>

              <div>
                <AvailabilityPopoverButton
                  type="Commercial"
                  item={item.project.mall}
                  className="w-[8vmin] h-[12vmin] rounded-full hover:bg-primary/5 cursor-pointer shadow-md"
                >
                  <i className="fa-solid fa-hotel text-primary text-4xl"></i>
                </AvailabilityPopoverButton>
                <p className="text-center font-bold mt-2">{t("Commercial")}</p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div
          className={`flex flex-row px-[10%] ${
            item.type != "SEPARATED" ? "justify-between" : "justify-center"
          } border-t-1 border-t-gray-300 py-[2vmin]`}
        >
          <div>
            <AvailabilityPopoverButton
              type="Apartment"
              item={item.project.apartments}
              className="w-[10vmin] h-[10vmin] rounded-[5vmin] hover:bg-primary/5 cursor-pointer shadow-md"
            >
              <i className="fa-solid fa-city text-primary text-5xl"></i>
            </AvailabilityPopoverButton>
            <p className="text-center font-bold mt-2">{t("Apartment")}</p>
          </div>

          {item.type != "SEPARATED" && (
            <>
              <div>
                <AvailabilityPopoverButton
                  type="Villa"
                  item={item.project.villas}
                  className="w-[10vmin] h-[10vmin] rounded-[5vmin] hover:bg-primary/5 cursor-pointer shadow-md"
                >
                  <i className="fa-solid fa-house-chimney text-primary text-5xl"></i>
                </AvailabilityPopoverButton>
                <p className="text-center font-bold mt-2">{t("Villa")}</p>
              </div>

              <div>
                <AvailabilityPopoverButton
                  type="Commercial"
                  item={item.project.mall}
                  className="w-[10vmin] h-[10vmin] rounded-[5vmin] hover:bg-primary/5 cursor-pointer shadow-md"
                >
                  <i className="fa-solid fa-hotel text-primary text-5xl"></i>
                </AvailabilityPopoverButton>
                <p className="text-center font-bold mt-2">{t("Commercial")}</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PropertyAvailabilityTypes;
