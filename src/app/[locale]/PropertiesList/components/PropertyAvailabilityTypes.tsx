import { useTranslations } from "next-intl";

import { useMobile } from "@/hooks/useMobile";
import { Property } from "@/types/Properties";

import { AvailabilityPopoverButton } from "./AvailabilityPopoverButton";
import { ProjectsUnit } from "@/types/PropertiesV2";

type Props = {
  item: ProjectsUnit;
};
const PropertyAvailabilityTypes = ({ item }: Props) => {
  const t = useTranslations();
  const isMobile = useMobile();
  return (
    <>
      {isMobile ? (
        <div
          className={`flex flex-row px-[5%] ${
            item.project_type != "Separated" ? "justify-between" : "justify-center"
          } border-t-1 border-t-gray-300 py-[2vmin]`}
        >
          <div className="items-center flex flex-col">
            <AvailabilityPopoverButton
              type="Apartment"
              item={item.project.}
              className="w-[12vmin] h-[12vmin] rounded-full hover:bg-primary/5 cursor-pointer shadow-md"
            >
              <i className="fa-solid fa-city text-primary text-1xl"></i>
            </AvailabilityPopoverButton>
            <p className="text-center text-sm font-bold mt-2">
              {t("Apartment")}
            </p>
          </div>

          {item.type != "SEPARATED" && (
            <>
              <div className="items-center flex flex-col">
                <AvailabilityPopoverButton
                  type="Villa"
                  item={item.project.villas}
                  className="w-[12vmin] h-[12vmin] rounded-full hover:bg-primary/5 cursor-pointer shadow-md"
                >
                  <i className="fa-solid fa-house-chimney text-primary text-1xl"></i>
                </AvailabilityPopoverButton>
                <p className="text-center text-sm font-bold mt-2">
                  {t("Villa")}
                </p>
              </div>

              <div className="items-center flex flex-col">
                <AvailabilityPopoverButton
                  type="Commercial"
                  item={item.project.mall}
                  className="w-[12vmin] h-[12vmin] rounded-full hover:bg-primary/5 cursor-pointer shadow-md"
                >
                  <i className="fa-solid fa-hotel text-primary text-1xl"></i>
                </AvailabilityPopoverButton>
                <p className="text-center text-sm font-bold mt-2">
                  {t("Commercial")}
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div
          className={`flex flex-row px-[10%] ${
            item.type != "SEPARATED" ? "justify-between" : "justify-center"
          } border-t-1 border-t-gray-300 py-[1vmin]`}
        >
          <div className="items-center flex flex-col">
            <AvailabilityPopoverButton
              type="Apartment"
              item={item.project.apartments}
              className="w-[6vmin] h-[6vmin] rounded-[7vmin] hover:bg-primary/5 cursor-pointer shadow-md"
            >
              <i className="fa-solid fa-city text-primary text-2xl"></i>
            </AvailabilityPopoverButton>
            <p className="text-center font-bold mt-2">{t("Apartment")}</p>
          </div>

          {item.type != "SEPARATED" && (
            <>
              <div className="items-center flex flex-col">
                <AvailabilityPopoverButton
                  type="Villa"
                  item={item.project.villas}
                  className="w-[6vmin] h-[6vmin] rounded-[7vmin] hover:bg-primary/5 cursor-pointer shadow-md"
                >
                  <i className="fa-solid fa-house-chimney text-primary text-2xl"></i>
                </AvailabilityPopoverButton>
                <p className="text-center font-bold mt-2">{t("Villa")}</p>
              </div>

              <div className="items-center flex flex-col">
                <AvailabilityPopoverButton
                  type="Commercial"
                  item={item.project.mall}
                  className="w-[6vmin] h-[6vmin] rounded-[7vmin] hover:bg-primary/5 bg-background cursor-pointer shadow-md"
                >
                  <i className="fa-solid fa-hotel text-primary text-2xl"></i>
                </AvailabilityPopoverButton>
                <p className="text-center  font-bold mt-2">{t("Commercial")}</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PropertyAvailabilityTypes;
