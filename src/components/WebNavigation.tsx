"use client";

import { Building, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { routes } from "@/_lib/routes";
import { useActiveLink } from "@/_utils/navigation";
import { imgs } from "@/assets";
import { Button } from "@/shadcn/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/shadcn/components/ui/navigation-menu";
import { Separator } from "@/shadcn/components/ui/separator";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";

import { AlertDialogDemo } from "./Alret";
import ModalDemo from "./Modal";
import UserAccount from "./UserAccount";

function WebNavigation({
  onOpen,
}: {
  onOpen: (type: "login" | "signup") => void;
}) {
  const t = useTranslations("Header");
  const { linkClass } = useActiveLink();
  const locale = useLocale();
  const router = useRouter();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openByitTeamDialog, setOpenByitTeamDialog] = useState(false);
  const isRTL = locale === "ar";
  const { currentUser, hasHydrated } = useAuthStore();

  if (!hasHydrated) return null;

  const isAuthenticated = currentUser?.user?.approved ?? false;

  const enableMeetings = currentUser?.user?.enableMeetings ?? false;
  const enableLeadGenration = currentUser?.user?.enableLeadGeneration ?? false;
  const enableByitATeam = currentUser?.user?.enableByitATeam ?? false;
  const openLoginModal = () => {
    setOpenAlertDialog(false);
    onOpen("login");
  };
  console.log(enableLeadGenration);

  console.log(!enableByitATeam);

  return (
    <div className="lg:flex hidden">
      {/* <div
       className={`flex items-center justify-between w-full px-1 py-2 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
  > */}
      <NavigationMenu viewport={false} key="main-nav" className="z-[200]">
        <NavigationMenuList
          className={isRTL ? "flex-row-reverse gap-3" : "flex-row gap-3"}
        >
          <button
            className="relative flex-shrink-0 w-[120px] h-[60px] cursor-pointer"
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
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={routes.Home} className={linkClass(routes.Home)}>
                {t("home")}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                linkClass(routes.PropertiesList ?? routes.PropertyDetails),
                "cursor-pointer"
              )}
              onPointerMove={(e) => e.preventDefault()}
              onPointerLeave={(e) => e.preventDefault()}
            >
              {t("properties")}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {isRTL ? (
                <ul className="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        //onClick={() => router.push({ pathname: routes.PropertiesList, query: { propertyType: 'RELATED-TO-COMPOUND' } } as any)}
                        href={{
                          pathname: routes.PropertiesList,
                          query: { propertyType: "COMPOUND" },
                        }}
                        className={cn(
                          linkClass(routes.PropertiesList, "COMPOUND"),
                          isRTL &&
                            "text-right flex-row items-center justify-end gap-3"
                        )}
                      >
                        {t("searchCompounds")}
                        <Building2 size={24} />
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <Separator />
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        // onClick={() => router.push({ pathname: routes.PropertiesList, query: { propertyType: 'SEPARATED' } } as any)}
                        href={{
                          pathname: routes.PropertiesList,
                          query: { propertyType: "SEPARATED" },
                        }}
                        className={cn(
                          linkClass(routes.PropertiesList, "SEPARATED"),
                          isRTL &&
                            "text-right flex-row items-center justify-end gap-3"
                        )}
                      >
                        {t("searchSeparates")}
                        <Building size={24} />
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              ) : (
                <ul className="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        //onClick={() => router.push({ pathname: routes.PropertiesList, query: { propertyType: 'RELATED-TO-COMPOUND' } } as any)}
                        href={{
                          pathname: routes.PropertiesList,
                          query: { propertyType: "COMPOUND" },
                        }}
                        className={cn(
                          linkClass(routes.PropertiesList, "COMPOUND"),
                          isRTL
                            ? "text-right flex-row items-center justify-end gap-3"
                            : "text-left flex-row items-center justify-start gap-3"
                        )}
                      >
                        <Building2 size={24} />
                        {t("searchCompounds")}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <Separator />
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        // onClick={() => router.push({ pathname: routes.PropertiesList, query: { propertyType: 'SEPARATED' } } as any)}
                        href={{
                          pathname: routes.PropertiesList,
                          query: { propertyType: "SEPARATED" },
                        }}
                        className={cn(
                          linkClass(routes.PropertiesList, "SEPARATED"),
                          isRTL
                            ? "text-right flex-row items-center justify-end gap-3"
                            : "text-left flex-row items-center justify-start gap-3"
                        )}
                      >
                        <Building size={24} />
                        {t("searchSeparates")}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              )}
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                href={routes.NewLaunches}
                className={linkClass(routes.NewLaunches)}
              >
                {t("newLaunches")}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    setOpenAlertDialog(true);
                  } else {
                    setOpenByitTeamDialog(true);
                  }
                }}
                className={cn(
                  linkClass(
                    routes.LeadGenration.Root &&
                      routes.IncentiveByMeetings &&
                      routes.NewMeetings
                  ),
                  "cursor-pointer"
                )}
              >
                Byit A-Team
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                href={routes.SharedProperties}
                className={linkClass(routes.SharedProperties)}
              >
                <Image
                  src={imgs.partment_logo}
                  alt="Shared Properties"
                  width={80}
                  height={40}
                />
                <span>{t("sharedProperties")}</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    setOpenAlertDialog(true);
                  } else {
                    router.push(routes.Contests);
                  }
                }}
                className={cn(linkClass(routes.Contests), "cursor-pointer")}
              >
                {t("contests")}
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                href={routes.GuideLines}
                className={linkClass(routes.GuideLines)}
              >
                {t("guideLines")}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {isAuthenticated && <UserAccount />}

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
            isOpen={openByitTeamDialog}
            onClose={() => setOpenByitTeamDialog(false)}
          >
            <div className="flex justify-center items-center p-12 space-x-6">
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

              {/* <Button onClick={() => {}}>Close</Button> */}
            </div>
            {/* <p>
              ⭐ مميزات الـ Meetings تقدر تحجز وتسجّل ميتينجز حقيقية مع عملاء
              مهتمين بالشراء. كل ميتينج بيتراجع ويتوثق علشان يضمن حقك. بعد إكمال
              4 ميتينجز مختلفة، تقدر تحصل على حافز مالى قدره 5000 جنيه تتابع عدد
              الميتينجز والأرباح الخاصة بيك بسهولة. 🚀 مميزات الـ Lead
              Generation تقدر تشترك في حملات ليدز مخصصة على مشاريع مختارة.
              اللِيدز بتوصلك ببيانات عملاء حقيقية وجاهزة للمتابعة. الحملات مصممة
              تساعدك تقفل أسرع وتزود دخلك.
            </p> */}
            {enableLeadGenration && enableMeetings ? null : (
              <>
                <div className="text-right">
                  <strong className="text-primary">
                    Byit A-team من أول بيعة بتقفلها مع بايت، بتنضم ل
                  </strong>
                </div>

                <div className="text-right flex flex-col space-y-2 mt-2">
                  <strong> Meetings مميزات الـ </strong>
                  <ul
                    dir="rtl"
                    className="mr-4 list-disc space-y-3 [&>li]:text-sm"
                  >
                    <li>
                      تقدر تحجز وتسجّل ميتينجز حقيقية مع عملاء مهتمين بالشراء.
                    </li>
                    <li>كل ميتينج بيتراجع ويتوثق علشان يضمن حقك.</li>
                    <li>
                      بعد إكمال 4 ميتينجز مختلفة، تقدر تحصل على حافز مالى قدره
                      5000 جنيه
                    </li>
                    <li>تتابع عدد الميتينجز والأرباح الخاصة بيك بسهولة.</li>
                  </ul>
                </div>
                <div className="text-right flex flex-col space-y-2 mt-4">
                  <strong> Lead Generation مميزات الـ </strong>
                  <ul
                    dir="rtl"
                    className="mr-4 list-disc space-y-3 [&>li]:text-sm"
                  >
                    <li>تقدر تشترك في حملات ليدز مخصصة على مشاريع مختارة.</li>
                    <li>كل ميتينج بيتراجع ويتوثق علشان يضمن حقك.</li>
                    <li>
                      اللِيدز بتوصلك ببيانات عملاء حقيقية وجاهزة للمتابعة.
                    </li>
                    <li>الحملات مصممة تساعدك تقفل أسرع وتزود دخلك.</li>
                  </ul>
                </div>
              </>
            )}
          </ModalDemo>

          {/* <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={routes.AboutUs} className={linkClass(routes.AboutUs)}>
                {t("about")}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem> */}

          {/* <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="#" className={linkClass(routes.Blog.Root)}>Blog</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem> */}
          {/* Mobile Toggle */}

          {/* {isAuthenticated ? (
            <UserAccount />
          ) : (
            <Button onClick={() => onOpen("login")} variant="outline">
              {t("login")}
            </Button>
          )}

          <Button onClick={() => setOpenAlertDialogClosingForm(true)}>
            {t("closingForm")}
          </Button> */}
          {/* {openAlertDialog && (
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
          </ModalDemo> */}

          {/* <LocaleSwitcher /> */}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default WebNavigation;
