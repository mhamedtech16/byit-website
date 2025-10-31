"use client";

import {
  ChevronDown,
  ChevronUp,
  Dot,
  Heart,
  LogOut,
  Menu,
  User2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { routes } from "@/_lib/routes";
import { useActiveLink } from "@/_utils/navigation";
import { logoutApi } from "@/Apis/Auth";
import { imgs } from "@/assets";
import { useIsRTL } from "@/hooks/useRTL";
import { Button } from "@/shadcn/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shadcn/components/ui/sheet";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";

import { AlertDialogDemo } from "./Alret";
import LocaleSwitcher from "./LocaleSwitcher";

function MobileNavigation({
  onOpen,
}: {
  onOpen: (type: "login" | "signup") => void;
}) {
  const t = useTranslations("Header");
  const router = useRouter();
  const [showProperties, setShowProperties] = useState(false);
  const { linkClass } = useActiveLink();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isRTL = useIsRTL();
  const locale = useLocale();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const { currentUser, hasHydrated, clearUser } = useAuthStore();
  const isAuthenticated = currentUser?.user.approved;
  if (!hasHydrated) return null;

  const handleLogout = async () => {
    try {
      if (!currentUser?.token) {
        throw new Error("No token available for logout");
      }

      const res = await logoutApi(currentUser.token, locale); // token is guaranteed to be a string

      if (res) {
        setIsSheetOpen(false);
        router.replace(routes.Home);
        clearUser();
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const isLoggedIn = () => {
    if (!isAuthenticated) {
      setOpenAlertDialog(true);
    } else {
      router.push(routes.ClosingForm);
      setIsSheetOpen(false);
    }
  };

  const openLoginModal = () => {
    setOpenAlertDialog(false);
    onOpen("login");
  };

  const onCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isRTL ? "right" : "left"}
        className="w-[70%] sm:w-[300px] overflow-y-auto"
      >
        <SheetHeader
          className={cn(
            "shadow-md w-full",
            isRTL ? "flex-row-reverse" : "flex-row"
          )}
        >
          <Image
            src={"/images/logo.png"}
            alt="Logo"
            // fill
            width={100}
            height={80}
            className="object-cover rounded-[3px]"
          />
          <SheetTitle className="hidden" />
        </SheetHeader>

        <div className="flex flex-col gap-4 mt-1 px-3">
          {currentUser && (
            <h1 className="text-primary font-medium">
              {`Welcome! ${currentUser?.user.fullname}`}
            </h1>
          )}

          <Link
            href={routes.Home}
            className={linkClass(routes.Home)}
            onClick={onCloseSheet}
          >
            {t("home")}
          </Link>
          {/* Dropdown Trigger */}
          <button
            onClick={() => {
              setShowProperties((prev) => !prev);
            }}
            className={cn(
              "flex items-center justify-between font-normal text-foreground px-2",
              linkClass(routes.PropertiesList ?? routes.PropertyDetails)
            )}
          >
            {t("properties")}
            {showProperties ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {/* Dropdown Content */}
          {showProperties && (
            <div className="flex flex-col gap-2">
              <Link
                href={{
                  pathname: routes.PropertiesList,
                  query: { propertyType: "COMPOUND" },
                }}
                onClick={onCloseSheet}
                className={cn(linkClass(routes.PropertiesList, "COMPOUND"), "flex flex-row")}
              >
                <Dot size={30} />
                {t("searchCompounds")}
              </Link>
              <Link
                onClick={onCloseSheet}
                href={{
                  pathname: routes.PropertiesList,
                  query: { propertyType: "SEPARATED" },
                }}
                className={cn(linkClass(routes.PropertiesList, "SEPARATED"), "flex flex-row")}

              >
                <Dot size={30} />
                {t("searchSeparates")}
              </Link>
            </div>
          )}
          <Link
            href={routes.NewLaunches}
            onClick={onCloseSheet}
            className={linkClass(routes.NewLaunches)}
          >
            {t("newLaunches")}
          </Link>

          <Link
            href={routes.SharedProperties}
            onClick={onCloseSheet}
            className={linkClass(routes.SharedProperties)}
          >
            <div>
              <Image
                src={imgs.partment_logo} // الصورة عندك في public/images
                alt={t("newLaunches")}
                width={80}
                height={40}
                className="object-contain"
              />
              <span className={isRTL ? "mr-0.5" : "ml-0.5"}>
                {t("sharedProperties")}
              </span>
            </div>
          </Link>

          <button
            onClick={() => {
              if (!isAuthenticated) {
                setOpenAlertDialog(true);
              } else {
                router.push(routes.Contests);
                setIsSheetOpen(false);
              }
            }}
            className={cn(linkClass(routes.Contests), `cursor-pointer ${isRTL ? "text-right" : "text-left"}`)}
          >
            {t("contests")}
          </button>

          {/* <Link
            href={routes.Contests}
            className={linkClass(routes.Contests)}
            onClick={onCloseSheet}
          >
            {t("contests")}
          </Link> */}

          <Link
            href={routes.GuideLines}
            className={linkClass(routes.GuideLines)}
            onClick={onCloseSheet}
          >
            {t("guideLines")}
          </Link>

          <Link
            href={routes.AboutUs}
            className={linkClass(routes.AboutUs)}
            onClick={onCloseSheet}
          >
            {t("about")}
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                href={routes.AccountDetails}
                className={cn(linkClass(routes.AccountDetails), " gap-2 flex flex-row ")}
                onClick={onCloseSheet}
              >
                <User2Icon size={24} color="gray" />
                {t("account")}
              </Link>

              <Link
                href={routes.Favourites}
                className={cn(linkClass(routes.Favourites), " gap-2 flex flex-row")}
                onClick={onCloseSheet}
              >
                <Heart size={24} color="gray" />
                {t("favourites")}
              </Link>
              <button
                onClick={handleLogout}
                className={cn(
                  "flex items-center gap-2 px-3 py-3 border-b-[0.5px] border-gray-300"
                )}
              >
                <LogOut size={24} color="gray" />
                {t("logout")}
              </button>
            </>
          ) : (
            <Button
              onClick={() => {
                onOpen("login");
                onCloseSheet();
              }}
              variant="outline"
            >
              {t("login")}
            </Button>
          )}

          <Button onClick={isLoggedIn}>{t("closingForm")}</Button>
          {openAlertDialog && (
            <AlertDialogDemo
              open={openAlertDialog}
              title="warning"
              description="mustLogin"
              action="login"
              cancel="later"
              translate="Header"
              onCancel={() => setOpenAlertDialog(false)}
              onAction={openLoginModal}
            />
          )}
          <LocaleSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavigation;
