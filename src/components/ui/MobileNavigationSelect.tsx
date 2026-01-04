"use client";

import { MessageCircleWarning } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import { deleteAccountApi } from "@/Apis/v1/Auth";
import { colors } from "@/constants/colors";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import { useAuthStore } from "@/store/authStore";

import { AlertDialogDemo } from "../Alret";

// ---------- Props Types ----------
type Option = {
  label: string;
  value: string;
  callbackParams?: { page: number; type: string };
};

interface MobileNavigationSelectProps {
  label?: string;
  onChoiceCallback?: (page: number, type: string) => void;
  options: Option[];
  activeValue?: string;
}

export default function MobileNavigationSelect({
  label,
  options,
  onChoiceCallback,
  activeValue,
}: MobileNavigationSelectProps) {
  const t = useTranslations("Settings");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const { currentUser, clearUser } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false); // modal state
  const [selectedValue, setSelectedValue] = useState<string>(pathname);

  useEffect(() => {
    if (activeValue) {
      setSelectedValue(activeValue);
    }
  }, [activeValue]);

  const handleChange = useCallback(
    (value: string) => {
      setSelectedValue(value);

      const selected = options.find((o) => o.value === value);

      if (value === "delete") {
        setIsOpen(true);
        return;
      }

      if (selected?.callbackParams && onChoiceCallback) {
        onChoiceCallback(
          selected.callbackParams.page,
          selected.callbackParams.type
        );
      } else {
        router.push(value);
      }
    },
    [router, onChoiceCallback, options]
  );

  const handleDeleteAccount = useCallback(async () => {
    try {
      if (!currentUser) return;

      const id = currentUser.user.id;
      const token = currentUser.token;

      const res = await deleteAccountApi(locale, id, token);
      if (res) {
        clearUser(); // Clear session
        router.push("/"); // Redirect to home
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setIsOpen(false);
    }
  }, [currentUser, locale, clearUser, router]);

  return (
    <div className="absolute w-full p-4 z-50">
      <Select onValueChange={handleChange} value={selectedValue}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder={label && t(label)} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={
                option.value === "delete"
                  ? "text-red-500 focus:text-red-500 hover:text-red-600"
                  : ""
              }
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Alert Confirmation Dialog */}
      <AlertDialogDemo
        open={isOpen}
        title="title"
        description="deleteConfirmation"
        action="yes"
        cancel="no"
        translate="DeleteAccount"
        onAction={handleDeleteAccount}
        actionClassName="bg-red-500 hover:bg-red-500/80"
        onCancel={() => setIsOpen(false)}
        icon={<MessageCircleWarning size={50} color={colors.red} />}
      />
    </div>
  );
}
