"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import ReactDOM from "react-dom";

import { useIsRTL } from "@/hooks/useRTL";
import { Button } from "@/shadcn/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalDemo({ isOpen, onClose, children }: ModalProps) {
  const isRTL = useIsRTL();
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-neutral-800 rounded-2xl p-4 sm:p-6 
             w-[95%] sm:w-[90%] md:max-w-lg 
             max-h-[80vh] sm:max-h-[60vh] 
             overflow-y-auto shadow-xl relative"
            initial={{ y: -250, opacity: 0 }}
            animate={{ y: -10, opacity: 1 }}
            exit={{ y: -250, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant={isRTL ? "iconARClose" : "iconENClose"}
              size="iconClose"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </Button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
