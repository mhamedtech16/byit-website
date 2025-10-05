import { useCallback, useRef } from "react";

export function useAutoCloseDialog(
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  delay: number = 3000,
  defaultOnClose?: () => void // ✅ كول باك افتراضي
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openDialog = useCallback(
    (customOnClose?: () => void) => {
      setOpen(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setOpen(false);
        // ✅ الأول ينفذ الكول باك المخصص لو اتبعت
        if (customOnClose) {
          customOnClose();
        } else if (defaultOnClose) {
          defaultOnClose();
        }
      }, delay);
    },
    [setOpen, delay, defaultOnClose]
  );

  const closeDialog = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(false);
    if (defaultOnClose) defaultOnClose();
  }, [setOpen, defaultOnClose]);

  return { openDialog, closeDialog };
}
