import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { getStatusColor } from "@/lib/statusColor";
import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent } from "@/shadcn/components/ui/card";
import { cn } from "@/shadcn/lib/utils";

interface ClientCardProps {
  name: string;
  phone: string;
  status: string | undefined;
  onAddFeedback: () => void;
  openFeedback: () => void;
}

export function LeadList({
  name,
  phone,
  status,
  onAddFeedback,
  openFeedback,
}: ClientCardProps) {
  const t = useTranslations();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full shadow-md">
        <CardContent className="space-y-3">
          <div className="flex space-x-1">
            <span className="text-gray-600 font-bold">{t("client_name")}</span>
            <span>{name}</span>
          </div>

          <div className="flex space-x-1">
            <span className="text-gray-600 font-bold">{t("client_phone")}</span>
            <span>{phone}</span>
          </div>

          <div className="flex space-x-1">
            <span className="text-gray-600 font-bold">{t("status_label")}</span>
            <span className={cn("font-semibold", getStatusColor(status))}>
              {status}
            </span>
          </div>

          <Button
            className="w-full bg-orangeApp hover:bg-orangeApp/80 text-white"
            onClick={onAddFeedback}
          >
            {t("add_feedback")}
          </Button>
          <Button className="w-full" onClick={openFeedback}>
            {t("feedback_list")}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
