import { PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

import ModalDemo from "@/components/Modal";
import VoicePlayer from "@/components/VoicePlayer";
import { useIsRTL } from "@/hooks/useRTL";
import { cn } from "@/shadcn/lib/utils";
import { ProjectsUnit, NewLaunch } from "@/types/PropertiesV2";

type Props = {
  item: ProjectsUnit | NewLaunch | undefined;
  type?: "projectsUnit" | "newLaunch";
};

const SalesContact = ({ item, type = "projectsUnit" }: Props) => {
  const t = useTranslations();
  const [isOpen, setOpen] = useState<boolean>(false);
  const isRTL = useIsRTL();

  const voiceNote =
    type === "projectsUnit"
      ? (item as ProjectsUnit)?.voice_orientation
      : undefined;

  const projectName =
    type === "projectsUnit"
      ? isRTL
        ? (item as ProjectsUnit)?.project.ar_name
        : (item as ProjectsUnit)?.project.en_name
      : isRTL
      ? (item as NewLaunch)?.name_ar
      : (item as NewLaunch)?.name_en;

  // partners سواء في projects أو newLaunch
  const partners =
    type === "projectsUnit"
      ? (item as ProjectsUnit)?.project?.partners
      : (item as NewLaunch)?.partners;

  return (
    <div
      className={cn(
        "flex flex-row w-full justify-between items-center border-t border-t-gray-300 py-4",

        type === "projectsUnit" && "pl-[8%] pr-[4%]"
      )}
    >
      <div className="items-center">
        <button
          onClick={() => setOpen(true)}
          className="font-bold cursor-pointer hover:opacity-90"
        >
          {t("contactPerson")}
        </button>
      </div>

      <div className="flex flex-row justify-between items-center gap-[6vmin] px-[5vmin]">
        {voiceNote && <VoicePlayer title={projectName} src={voiceNote} />}

        <button
          onClick={() => setOpen(true)}
          className="w-[6vmin] h-[6vmin] rounded-[3vmin] hover:bg-primary/5 cursor-pointer shadow-md flex items-center justify-center"
        >
          <PhoneCall className="text-gray-500 text-2xl" />
        </button>

        <button
          onClick={() => setOpen(true)}
          className="w-[6vmin] h-[6vmin] rounded-[3vmin] hover:bg-primary/5 cursor-pointer shadow-md flex items-center justify-center"
        >
          <i className="fab fa-whatsapp text-gray-500 text-3xl"></i>
        </button>
      </div>

      <ModalDemo isOpen={isOpen} onClose={() => setOpen(false)}>
        <>
          {partners?.map((partner, index) => (
            <div
              className="p-4 flex flex-row justify-between items-center border-b-2"
              key={index}
            >
              <div>
                <ul>
                  <li key={index} className="flex items-center gap-3">
                    {/* Partner Image */}
                    {partner.logo && (
                      <Image
                        src={partner.logo}
                        alt={partner.en_name}
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-gray-500"
                      />
                    )}

                    <span className="text-base font-medium">
                      {isRTL ? partner.ar_name : partner.en_name}
                    </span>
                  </li>
                </ul>

                <div className="flex flex-col">
                  <p className="text-base font-medium mt-2">
                    {t("Sales in charge")}
                  </p>
                  <p className="text-base text-app-gray font-semibold">
                    {partner.salesperson_phone}
                  </p>
                </div>
              </div>

              {/** Contact Partner */}
              <div className="flex items-center gap-5">
                <Link href={`tel:${partner.salesperson_phone}`} target="_blank">
                  <button className="w-[6vmin] h-[6vmin] rounded-[3vmin] hover:bg-primary/5 cursor-pointer shadow-md flex items-center justify-center">
                    {/* <i className="fa-solid fa-phone-volume text-gray-500 text-2xl"></i> */}
                    <PhoneCall className=" text-gray-500 text-2xl" />
                  </button>
                </Link>

                <Link
                  href={`https://wa.me/${partner.salesperson_phone}?text=Hi, i’m from Byit app by Ahya investments.`}
                  target="_blank"
                >
                  <button className=" w-[6vmin] h-[6vmin] rounded-[3vmin] hover:bg-primary/5 cursor-pointer shadow-md flex items-center justify-center">
                    <i className="fab fa-whatsapp text-gray-500 text-3xl"></i>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </>
      </ModalDemo>
    </div>
  );
};

export default SalesContact;
