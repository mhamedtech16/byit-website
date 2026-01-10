import { motion } from "framer-motion";
import { Loader2, SquarePen, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { colors } from "@/constants/colors";
import { formatDate } from "@/lib/formateDate";
import { getStatusColor } from "@/lib/statusColor";
import { Card, CardContent } from "@/shadcn/components/ui/card";
import { cn } from "@/shadcn/lib/utils";

interface ClientCardProps {
  notes: string;
  status: string | undefined;
  createAt: string;
  isDeleting: boolean;
  updateFeedback: () => void;
  deleteFeedback: () => Promise<void>;
}

export function FeedbackList({
  notes,
  status,
  createAt,
  isDeleting,
  updateFeedback,
  deleteFeedback,
}: ClientCardProps) {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {/*  Loading Above the card */}
      {isDeleting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-white/70 backdrop-blur-sm z-20 flex items-center justify-center rounded-xl"
        >
          <Loader2 className="animate-spin" size={32} color={colors.primary} />
        </motion.div>
      )}

      <Card className="w-full shadow-md">
        <CardContent className="space-y-3">
          <div className="flex space-x-1 justify-between">
            <div className="flex space-x-1">
              <span className="text-gray-600 font-bold">{t("notes")}</span>
              <span>{notes}</span>
            </div>

            <div className="flex space-x-2">
              <button className="cursor-pointer" onClick={updateFeedback}>
                <SquarePen size={24} color={colors.primary} />
              </button>
              <button className="cursor-pointer" onClick={deleteFeedback}>
                <Trash2 size={24} color={colors.red} />
              </button>
            </div>
          </div>

          <div className="flex space-x-1">
            <span className="text-gray-600 font-bold">{t("status_label")}</span>
            <span className={cn("font-semibold", getStatusColor(status))}>
              {status}
            </span>
          </div>

          <div className="flex space-x-1">
            <span className="text-gray-600 font-bold">{t("createAt")}</span>
            <span>{formatDate(createAt, locale)}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
