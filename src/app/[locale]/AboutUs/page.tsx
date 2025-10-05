"use client";

import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

import { imgs } from "@/assets";
import BackgroundImage from "@/components/BackgroundImage";
import { useAboutUs } from "@/hooks/useAboutUs";
import { useIsRTL } from "@/hooks/useRTL";

function convertAboutUsTextToHTML(text: string) {
  const cleanedText = text.startsWith("edit") ? text.slice(4).trim() : text;

  const lines = cleanedText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines
    .map((line, index) => {
      // ✅ شيل "-" لو موجودة
      const content = line.startsWith("-") ? line.replace(/^-+\s*/, "") : line;

      if (index === 1 || index === 2) {
        return `<ul class="list-disc pl-6 text-white mb-10"><li>${content}</li></ul>`;
      } else {
        return `<p class='mb-10'>${content}</p>`;
      }
    })
    .join("");
}

export default function AboutUs() {
  const t = useTranslations("AboutUs");
  const { data } = useAboutUs();
  const isRTL = useIsRTL();

  const htmlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!htmlRef.current || !data?.data) return;

    const html = isRTL
      ? convertAboutUsTextToHTML(data.data.aboutUs_ar)
      : convertAboutUsTextToHTML(data.data.aboutUs_en);

    htmlRef.current.innerHTML = html;
  }, [data, isRTL]);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeInOut", // ✅ correct type
      },
    }),
  };

  return (
    <div className="bg-[#0D2C52] text-white min-h-screen pb-12">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6, type: "spring" }}
        className="items-center justify-center flex mb-8 relative w-[100%] h-[45vmin]"
      >
        <BackgroundImage img={imgs.aboutUs} />
        <motion.h1
          className="absolute text-center text-[8vmin] font-bold mt-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {t("missionTitle")}
        </motion.h1>
      </motion.div>

      <div className="space-y-6 max-w-3xl mx-auto p-4">
        <motion.div
          className="text-base leading-7"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <div ref={htmlRef} />
        </motion.div>
      </div>
    </div>
  );
}
