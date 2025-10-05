"use client";

import { useWindowScroll } from "@uidotdev/usehooks";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { Button } from "@/shadcn/components/ui/button";

export default function ScrollUpButton() {
  const [{ y }, scrollTo] = useWindowScroll();
  const isVisible = (y ?? 0) > 200;

  const handleScrollTop = () => {
    scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={handleScrollTop}
              className="rounded-full shadow-lg"
              size="icon"
              variant={"scrollUp"}
            >
              <ArrowUp size={24} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
