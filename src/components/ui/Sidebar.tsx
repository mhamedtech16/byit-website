"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

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

export function Sidebar({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}) {
  const t = useTranslations("Settings");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-64 border-r p-6 space-y-6 bg-white shadow-sm"
    >
      {label ? (
        <h2 className="text-xl font-semibold">{t(label)}</h2>
      ) : (
        <h2 className="text-xl font-semibold">Lead Genration</h2>
      )}

      <motion.div className="flex flex-col space-y-4">{children}</motion.div>
    </motion.div>
  );
}
