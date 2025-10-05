"use client";

import { useTranslations } from "next-intl";
import { JSX, MouseEventHandler } from "react";

import { useIsRTL } from "@/hooks/useRTL";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialog,
} from "@/shadcn/components/ui/alert-dialog";
import { cn } from "@/shadcn/lib/utils";

type AlertProps = {
  open: boolean;
  title?: string;
  description?: string;
  cancel?: string;
  action?: string;
  onCancel?: MouseEventHandler<HTMLButtonElement> | undefined;
  onAction?: MouseEventHandler<HTMLButtonElement> | undefined;
  translate?: string;
  contentClassName?: string;
  actionClassName?: string;
  headerClassName?: string;
  icon?: JSX.Element;
};

export function AlertDialogDemo({
  open,
  onCancel,
  onAction,
  translate,
  title,
  description,
  cancel,
  action,
  contentClassName,
  actionClassName,
  headerClassName,
  icon,
}: AlertProps) {
  const isRTL = useIsRTL();
  const t = useTranslations(translate);
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className={contentClassName}>
        <AlertDialogDescription />
        <AlertDialogHeader
          className={
            (cn(isRTL ? "items-start" : "items-start"), headerClassName)
          }
        >
          {icon && icon}
          {title && <AlertDialogTitle>{t(title)}</AlertDialogTitle>}
          {description && (
            <AlertDialogDescription>{t(description)}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {onCancel && (
            <AlertDialogCancel onClick={onCancel}>
              {cancel && t(cancel)}
            </AlertDialogCancel>
          )}
          {onAction && (
            <AlertDialogAction onClick={onAction} className={actionClassName}>
              {action && t(action)}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
