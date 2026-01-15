"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

import { Button } from "@/shadcn/components/ui/button";

// Animation variants
const containerVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

type Props = {
  onChoiceCallback: (page: number, type: string) => void;
  activeType?: string; // 🔥 جاي من برة (اختياري)
};

export function FavouriteSidebar({ onChoiceCallback, activeType }: Props) {
  const t = useTranslations();

  // نخزن نسخة محلية من الـ activeType
  const [currentActive, setCurrentActive] = useState<string>(
    activeType ?? "Projects Unit"
  );

  // لو البروب اتغير من برة نعمل sync مع الستايت المحلي
  useEffect(() => {
    if (activeType) {
      setCurrentActive(activeType);
    }
  }, [activeType]);

  const handleChoice = (page: number, type: string) => {
    setCurrentActive(type); // نحدد الـ active
    onChoiceCallback(page, type);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-64 border-r p-6 space-y-6 bg-white shadow-sm rounded-xl h-[40vmin]"
    >
      <h2 className="text-xl font-semibold">{t("Header.favourites")}</h2>

      <motion.div className="flex flex-col space-y-4">
        <motion.div variants={linkVariants}>
          <Button
            onClick={() => handleChoice(1, "Projects Unit")}
            variant="linkUnderline"
            size="linkUnderline"
            className={
              currentActive === "Projects Unit"
                ? "text-primary font-semibold underline"
                : ""
            }
          >
            {t("Header.properties")}
          </Button>
        </motion.div>

        <motion.div variants={linkVariants}>
          <Button
            onClick={() => handleChoice(1, "New Launch")}
            variant="linkUnderline"
            size="linkUnderline"
            className={
              currentActive === "New Launch"
                ? "text-primary font-semibold underline"
                : ""
            }
          >
            {t("Header.newLaunches")}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
