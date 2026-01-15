import { PhoneCall } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import VoicePlayer from "@/components/VoicePlayer";
import { ShareUnit } from "@/types/ShareUnit";

type Props = {
  item: ShareUnit;
};
const SharedSalesContact = ({ item }: Props) => {
  const t = useTranslations();

  return (
    <div className="flex flex-row w-[100%] justify-between border-t-1 border-t-gray-300 py-[2vmin]">
      <div className="w-[60%]">
        <p className="font-bold ">{t("Sales in charge")}</p>
        <p className="text-gray-400 ">{item?.salesperson_en_name}</p>
      </div>
      <div className="flex flex-row justify-between items-center gap-[6vmin] px-[5vmin]">
        {/* <button className="w-[6vmin] h-[6vmin] rounded-[3vmin] hover:bg-primary/5 cursor-pointer shadow-md flex items-center justify-center">
          <i className="fa-duotone fa-solid fa-sliders text-gray-500 text-2xl"></i>
        </button> */}
        {item.voice_orientation && (
          <VoicePlayer
            title={item.voice_orientation}
            src={item.voice_orientation}
          />
        )}

        <Link href={`tel:${item?.salesperson_phone}`} target="_blank">
          <button className="w-[6vmin] h-[6vmin] rounded-[3vmin] hover:bg-primary/5 cursor-pointer shadow-md flex items-center justify-center">
            {/* <i className="fa-solid fa-phone-volume text-gray-500 text-2xl"></i> */}
            <PhoneCall className=" text-gray-500 text-2xl" />
          </button>
        </Link>

        <Link
          href={`https://wa.me/${item?.salesperson_phone}?text=Hi, i’m from Byit app by Ahya investments.`}
          target="_blank"
        >
          <button className=" w-[6vmin] h-[6vmin] rounded-[3vmin] hover:bg-primary/5 cursor-pointer shadow-md flex items-center justify-center">
            <i className="fab fa-whatsapp text-gray-500 text-3xl"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SharedSalesContact;
