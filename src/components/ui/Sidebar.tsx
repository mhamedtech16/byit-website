"use client";

import { motion } from "framer-motion";
import { MessageCircleWarning } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useState } from "react";

import { routes } from "@/_lib/routes";
import { deleteAccountApi } from "@/Apis/v1/Auth";
import { colors } from "@/constants/colors";
import { Button } from "@/shadcn/components/ui/button";
import { useAuthStore } from "@/store/authStore";

import { AlertDialogDemo } from "../Alret";

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

export function Sidebar() {
  const t = useTranslations("Settings");
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const isActive = (route: string) => pathname === route;
  const { currentUser, setcurrentUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteAccount = useCallback(async () => {
    try {
      if (!currentUser) return;

      const id = currentUser?.user.id;
      const token = currentUser?.token;

      const res = await deleteAccountApi(locale, id, token);
      if (res) {
        setcurrentUser(null); // Clear session
        router.push(routes.Home); // Redirect to home
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      // Optionally show toast or status message
    }
  }, [currentUser, locale, router, setcurrentUser]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-64 border-r p-6 space-y-6 bg-white shadow-sm"
    >
      <h2 className="text-xl font-semibold">{t("settings")}</h2>

      <motion.div className="flex flex-col space-y-4">
        <motion.div variants={linkVariants}>
          <Button
            onClick={() => router.push(routes.AccountDetails)}
            variant="linkUnderline"
            size="linkUnderline"
            className={
              isActive(routes.AccountDetails)
                ? "text-primary font-semibold underline"
                : ""
            }
          >
            {t("account")}
          </Button>
        </motion.div>

        <motion.div variants={linkVariants}>
          <Button
            onClick={() => router.push(routes.ChangePassword)}
            variant="linkUnderline"
            size="linkUnderline"
            className={
              isActive(routes.ChangePassword)
                ? "text-primary font-semibold underline"
                : ""
            }
          >
            {t("changePassword")}
          </Button>
        </motion.div>

        <motion.div variants={linkVariants}>
          <Button
            onClick={() => router.push(routes.UpdateAccount)}
            variant="linkUnderline"
            size="linkUnderline"
            className={
              isActive(routes.UpdateAccount)
                ? "text-primary font-semibold underline"
                : ""
            }
          >
            {t("updateAccount")}
          </Button>
        </motion.div>

        <motion.div variants={linkVariants}>
          <Button
            onClick={() => setIsOpen(true)}
            variant="linkUnderline"
            size="linkUnderline"
            className="text-red-500"
          >
            {t("deleteAccount")}
          </Button>

          <AlertDialogDemo
            open={isOpen}
            title="title"
            description="deleteConfirmation"
            action="yes"
            cancel="no"
            translate="DeleteAccount"
            headerClassName="flex items-start"
            onAction={handleDeleteAccount}
            actionClassName="bg-red-500 hover:bg-red-500/80"
            onCancel={() => setIsOpen(false)}
            icon={<MessageCircleWarning size={50} color={colors.red} />}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
