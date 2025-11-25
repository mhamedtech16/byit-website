import { motion } from "framer-motion";

import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent } from "@/shadcn/components/ui/card";

interface ClientCardProps {
  name: string;
  phone: string;
  status: string;
  onAddFeedback: () => void;
}

export function ClientCard({
  name,
  phone,
  status,
  onAddFeedback,
}: ClientCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full shadow-md">
        <CardContent className="space-y-3">
          <div className="flex space-x-1">
            <span className="text-gray-600 font-bold">Client Name:</span>
            <span>{name}</span>
          </div>

          <div className="flex space-x-1">
            <span className="text-gray-600 font-bold">Client phone:</span>
            <span>{phone}</span>
          </div>

          <div className="flex space-x-1">
            <span className="text-gray-600 font-bold">Status:</span>
            <span className="font-semibold">{status}</span>
          </div>

          <Button
            className="w-full bg-orangeApp hover:bg-orangeApp/80 text-white"
            onClick={onAddFeedback}
          >
            Add Feedback
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
