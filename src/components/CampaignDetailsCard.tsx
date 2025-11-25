"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent } from "@/shadcn/components/ui/card";

interface CampaignDetailsProps {
  img: string;
  name: string;
  description: string;
  whatsappNumber: string;
  onReadMore: () => void;
  isRTL?: boolean;
  isJoined?: boolean;
  onShowLeads: () => void;
}

export function CampaignDetailsCard({
  img,
  name,
  description,
  whatsappNumber,
  onReadMore,
  isRTL = false,
  isJoined,
  onShowLeads,
}: CampaignDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 p-10"
    >
      <Card className="overflow-x-hidden">
        <div className="relative w-full h-[40vmin]">
          <Image
            src={img}
            alt={name}
            fill
            className="object-cover px-4 rounded-2xl"
          />
        </div>

        <CardContent className="p-6 space-y-4">
          <h3 className="text-2xl font-semibold">{name}</h3>

          <p className="text-gray-600 leading-relaxed">{description}</p>

          <div className="flex gap-4">
            <Button variant="secondary" onClick={onReadMore}>
              {isRTL ? "اقرأ المزيد" : "Read more details"}
            </Button>

            {isJoined ? (
              <Button
                className="bg-orangeApp hover:bg-orangeApp/80 text-white"
                onClick={onShowLeads}
              >
                Leads
              </Button>
            ) : (
              <Button
                className="bg-primary text-white"
                onClick={() =>
                  window.open(`https://wa.me/${whatsappNumber}`, "_blank")
                }
              >
                {isRTL ? "انضم" : "Join"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
