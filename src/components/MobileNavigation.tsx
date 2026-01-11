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
import ModalDemo from "./Modal";

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
  const [openByitTeamDialog, setOpenByitTeamDialog] = useState(false);
  const [openAlertDialogClosingForm, setOpenAlertDialogClosingForm] =
    useState(false);
  const { currentUser, hasHydrated, clearUser } = useAuthStore();
  const isAuthenticated = currentUser?.user?.approved;
  if (!hasHydrated) return null;

  const enableMeetings = currentUser?.user?.enableMeetings ?? false;
  const enableLeadGenration = currentUser?.user?.enableLeadGeneration ?? false;
  const enableByitATeam = currentUser?.user?.enableByitATeam ?? false;

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

  const onCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
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
                {`Welcome! ${currentUser?.user?.fullname}`}
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
                  className={linkClass(routes.PropertiesList)}
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
                  className={linkClass(routes.PropertiesList)}
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

            <button
              // href={routes.NewLaunches}
              onClick={() => {
                if (!isAuthenticated) {
                  setOpenAlertDialog(true);
                } else {
                  setOpenByitTeamDialog(true);
                  setIsSheetOpen(false);
                }
              }}
              className={linkClass(routes.LeadGenration.Root)}
            >
              Byit A-Team
            </button>

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
              className={cn(linkClass(routes.Contests), "cursor-pointer")}
            >
              {t("contests")}
            </button>

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
                  className={cn(linkClass(routes.AccountDetails), " gap-2")}
                  onClick={onCloseSheet}
                >
                  <User2Icon size={24} color="gray" />
                  {t("account")}
                </Link>

                <Link
                  href={routes.Favourites}
                  className={cn(linkClass(routes.Favourites), " gap-2")}
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

            <Button
              onClick={() => {
                setOpenAlertDialogClosingForm(true);
                setIsSheetOpen(false);
              }}
            >
              {t("closingForm")}
            </Button>

            <LocaleSwitcher />
          </div>
        </SheetContent>
      </Sheet>
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
      <ModalDemo
        isOpen={openAlertDialogClosingForm}
        onClose={() => setOpenAlertDialogClosingForm(false)}
      >
        <div className="items-center flex flex-col">
          <h2 className="text-lg font-medium mb-4">{t("closingForm")}</h2>
          <div className="flex gap-4">
            <Button onClick={isLoggedInSharesDeal} className="p-10 flex">
              {t("sharesDeals")}
            </Button>
            <Button onClick={isLoggedInDeals} className="p-10">
              {t("deals")}
            </Button>
          </div>
        </div>
      </ModalDemo>

      <ModalDemo
        isOpen={openByitTeamDialog}
        onClose={() => setOpenByitTeamDialog(false)}
      >
        <div className="flex flex-col p-10 gap-4">
          <Button
            onClick={() => {
              router.push(routes.LeadGenration.Root);
              setOpenByitTeamDialog(false);
            }}
            disabled={!enableLeadGenration || !enableByitATeam}
          >
            Lead Generation
          </Button>

          <Button
            onClick={() => {
              router.push(routes.IncentiveByMeetings);
              setOpenByitTeamDialog(false);
            }}
            disabled={!enableMeetings || !enableByitATeam}
          >
            Incentive By Meetings
          </Button>
        </div>
      </ModalDemo>
    </>
  );
}

export default MobileNavigation;
