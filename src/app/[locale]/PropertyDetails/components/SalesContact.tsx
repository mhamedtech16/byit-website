import { PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

import ModalDemo from "@/components/Modal";
import VoicePlayer from "@/components/VoicePlayer";
import { cn } from "@/shadcn/lib/utils";
import { Property, NewLaunch } from "@/types/Properties";

type Props = {
  item: Property | NewLaunch | null;
  type?: "property" | "newLaunch";
};

const SalesContact = ({ item, type = "property" }: Props) => {
  const t = useTranslations();
  const [isOpen, setOpen] = useState<boolean>(false);

  const voiceNote =
    type === "property" ? (item as Property).voiceNote : undefined;

  const projectName =
    type === "property"
      ? (item as Property).project?.name
      : (item as NewLaunch).name;

  // vendors سواء في property أو newLaunch
  const vendors =
    type === "property"
      ? (item as Property)?.project.vendors
      : (item as NewLaunch)?.vendors;

  return (
    <div
      className={cn(
        "flex flex-row w-full justify-between items-center border-t border-t-gray-300 py-4",
        type === "property" && "pl-[8%] pr-[4%]"
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
          {vendors?.map((vendor, index) => (
            <div
              className="p-4 flex flex-row justify-between items-center border-b-2"
              key={index}
            >
              <div>
                <ul>
                  <li key={index} className="flex items-center gap-3">
                    {/* Vendor Image */}
                    {vendor.logo && (
                      <Image
                        src={vendor.logo}
                        alt={vendor.name}
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-gray-500"
                      />
                    )}

                    <span className="text-base font-medium">{vendor.name}</span>
                  </li>
                </ul>

                <div className="flex flex-col">
                  <p className="text-base font-medium mt-2">
                    {t("Sales in charge")}
                  </p>
                  <p className="text-base text-app-gray font-semibold">
                    {vendor.contactName}
                  </p>
                </div>
              </div>

              {/** Contact Vendor */}
              <div className="flex items-center gap-5">
                <Link href={`tel:${vendor.contactPhone}`} target="_blank">
                  <button className="w-[6vmin] h-[6vmin] rounded-[3vmin] hover:bg-primary/5 cursor-pointer shadow-md flex items-center justify-center">
                    {/* <i className="fa-solid fa-phone-volume text-gray-500 text-2xl"></i> */}
                    <PhoneCall className=" text-gray-500 text-2xl" />
                  </button>
                </Link>

                <Link
                  href={`https://wa.me/${vendor.contactPhone}?text=Hi, i’m from Byit app by Ahya investments.`}
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
