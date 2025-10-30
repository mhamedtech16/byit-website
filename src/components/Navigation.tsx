"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import * as React from "react";

import { routes } from "@/_lib/routes";
import { useMobile } from "@/hooks/useMobile";
import { useIsRTL } from "@/hooks/useRTL";
import { Button } from "@/shadcn/components/ui/button";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";

import { AlertDialogDemo } from "./Alret";
import LocaleSwitcher from "./LocaleSwitcher";
import LoginPage from "./Login";
import MobileNavigation from "./MobileNavigation";
import ModalDemo from "./Modal";
import SignUpPage from "./Signup";
import WebNavigation from "./WebNavigation";

// const components: { title: string; href: string; description: string }[] = [
//     {
//         title: "Alert Dialog",
//         href: "/docs/primitives/alert-dialog",
//         description:
//             "A modal dialog that interrupts the user with important content and expects a response.",
//     },
//     {
//         title: "Hover Card",
//         href: "/docs/primitives/hover-card",
//         description:
//             "For sighted users to preview content available behind a link.",
//     },
//     {
//         title: "Progress",
//         href: "/docs/primitives/progress",
//         description:
//             "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//     },
//     {
//         title: "Scroll-area",
//         href: "/docs/primitives/scroll-area",
//         description: "Visually or semantically separates content.",
//     },
//     {
//         title: "Tabs",
//         href: "/docs/primitives/tabs",
//         description:
//             "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//     },
//     {
//         title: "Tooltip",
//         href: "/docs/primitives/tooltip",
//         description:
//             "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//     },
// ]

export function NavigationMenuDemo() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const [openAlertDialogClosingForm, setOpenAlertDialogClosingForm] =
    React.useState(false);
  const t = useTranslations("Header");
  const [mode, setMode] = React.useState<"login" | "signup">("login");
  const { currentUser, hasHydrated } = useAuthStore();
  const isAuthenticated = currentUser?.user.approved;
  const isMobile = useMobile();
  const isRTL = useIsRTL();
  const router = useRouter();

  if (!hasHydrated) return null;

  const onClose = () => {
    setIsOpen(false);
  };
  const onOpen = (type: "login" | "signup") => {
    setMode(type);
    setIsOpen(true);
  };
  const switchAuthMode = (newMode: "login" | "signup") => {
    onClose();
    setTimeout(() => {
      onOpen(newMode);
    }, 200);
  };

  const isLoggedInDeals = () => {
    if (!isAuthenticated) {
      setOpenAlertDialog(true);
    } else {
      setOpenAlertDialogClosingForm(false);
      router.push(routes.ClosingForm);
    }
  };

  const isLoggedInSharesDeal = () => {
    if (!isAuthenticated) {
      setOpenAlertDialog(true);
    } else {
      setOpenAlertDialogClosingForm(false);
      router.push(routes.SharesDeals);
    }
  };

  const openLoginModal = () => {
    setOpenAlertDialog(false);
    onOpen("login");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md flex z-50 items-center md:justify-between lg:justify-around h-[11vmin] md:h-[11vmin]",
        isMobile && "h-[11vmin] justify-between px-4"
      )}
    >
      {/* The Responsive of (Mobile,IPad) and Web */}
      {isMobile ? (
        <>
          <button
            className="relative w-[16vmin] h-[8vmin] cursor-pointer"
            onClick={() => router.push(routes.Home)}
          >
            <Image
              src={"/images/logo.png"}
              alt="Logo"
              fill
              //  width={130}
              // height={100}
              className="object-contain rounded-[3px]"
            />
          </button>
          <MobileNavigation onOpen={onOpen} />
        </>
      ) : (
        <>
          <WebNavigation onOpen={onOpen} />
          <div className="flex gap-1 items-center">
            {!isAuthenticated && (
              <Button
                onClick={() => onOpen("login")}
                variant="login"
                size="login"
              >
                {t("login")}
              </Button>
            )}

            <Button onClick={() => setOpenAlertDialogClosingForm(true)}>
              {t("closingForm")}
            </Button>
            <LocaleSwitcher />
          </div>
        </>
      )}

      <ModalDemo isOpen={isOpen} onClose={onClose}>
        {mode === "login" ? (
          <LoginPage
            toggleMode={() => switchAuthMode("signup")}
            CloseModal={() => setIsOpen(false)}
          />
        ) : (
          <SignUpPage
            toggleMode={() => switchAuthMode("login")}
            CloseModal={() => setIsOpen(false)}
          />
        )}
      </ModalDemo>

      {openAlertDialog && (
        <AlertDialogDemo
          open={openAlertDialog}
          title="warning"
          description="mustLogin"
          action="login"
          cancel="later"
          translate="Header"
          headerClassName={isRTL ? "items-start" : "items-start"}
          onCancel={() => setOpenAlertDialog(false)}
          onAction={openLoginModal}
        />
      )}

      <ModalDemo
        isOpen={openAlertDialogClosingForm}
        onClose={() => setOpenAlertDialogClosingForm(false)}
      >
        <div className="items-center flex flex-col">
          <h2 className="text-lg font-medium mb-4">{t("closingForm")}</h2>
          <div className="flex gap-4">
            <Button
              onClick={isLoggedInSharesDeal}
              className="p-10 flex flex-col"
            >
              {t("sharesDeals")}
            </Button>
            <Button onClick={isLoggedInDeals} className="p-10">
              {t("deals")}
            </Button>
          </div>
        </div>
      </ModalDemo>
    </header>
  );
}
