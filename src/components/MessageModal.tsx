import { useTranslations } from "next-intl";
import React from "react";

import { useMobile } from "@/hooks/useMobile";
import { cn } from "@/shadcn/lib/utils";

import ModalDemo from "./Modal";

function MessageModal({
  isAlretOpen,
  setAlretOpen,
}: {
  isAlretOpen: boolean;
  setAlretOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const isMobile = useMobile();
  const t = useTranslations();
  return (
    <ModalDemo isOpen={isAlretOpen} onClose={() => setAlretOpen(false)}>
      <h1
        className={cn(
          "text-center  font-bold underline text-orangeApp mb-6 mt-4",
          isMobile ? "text-2xl" : "text-3xl"
        )}
      >
        Byit Partners Hub
      </h1>
      <ul className="space-y-3">
        {/* Arabic Section (bullet on the right) */}
        <li dir="rtl" className="flex items-center justify-start gap-2">
          <span className="w-2 h-2 bg-black rounded-full" />
          <span className="text-xl font-medium">اختار الشريك</span>
        </li>
        <li dir="rtl" className="flex items-center justify-start gap-2">
          <span className="w-2 h-2 bg-black rounded-full" />
          <span className="text-xl font-medium">
            اذكر اسمه في استمارة حجز عميلك
          </span>
        </li>
        <li dir="rtl" className="flex items-center justify-start gap-2">
          <span className="w-2 h-2 bg-black rounded-full" />
          <span className="text-xl font-medium">ارفع الاستمارة علي Byit</span>
        </li>
        <li dir="rtl" className="flex items-center justify-start gap-2">
          <span className="w-2 h-2 bg-black rounded-full" />
          <span className="text-xl font-medium">
            استلم عمولتك من Byit في وقت اسرع
          </span>
        </li>

        {/* English Section (force LTR with bullet on left) */}
        <li dir="ltr" className="flex items-center justify-start gap-2">
          <span className="w-2 h-2 bg-black rounded-full" />
          <span
            className={cn(
              "font-medium text-left",
              isMobile ? "text-lg" : "text-xl"
            )}
          >
            Choose the partner
          </span>
        </li>
        <li dir="ltr" className="flex items-center  gap-2">
          <span className="w-2 h-2 bg-black rounded-full" />
          <span
            className={cn(
              "font-medium text-left",
              isMobile ? "text-lg" : "text-xl"
            )}
          >
            Mention their name on the reservation form
          </span>
        </li>
        <li dir="ltr" className="flex items-center gap-2">
          <span className="w-2 h-2 bg-black rounded-full" />
          <span
            className={cn(
              "font-medium text-left",
              isMobile ? "text-lg" : "text-xl"
            )}
          >
            Upload your form on Byit
          </span>
        </li>
        <li dir="ltr" className="flex items-center gap-2">
          <span className="w-2 h-2 bg-black rounded-full" />
          <span
            className={cn(
              "font-medium text-left",
              isMobile ? "text-lg" : "text-xl"
            )}
          >
            Collect your commission fast and easy
          </span>
        </li>
      </ul>
      <div className="flex justify-center px-40 mt-6">
        <button
          className="bg-orangeApp flex items-center justify-center w-full py-2 rounded-full cursor-pointer"
          onClick={() => setAlretOpen(false)}
        >
          <p className="text-2xl font-medium text-white">{t("ok")}</p>
        </button>
      </div>
    </ModalDemo>
  );
}

export default MessageModal;
