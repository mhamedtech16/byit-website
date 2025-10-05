"use client";

import {
  CheckCircle2Icon,
  Heart,
  LogOut,
  User2,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { routes } from "@/_lib/routes";
import { useActiveLink } from "@/_utils/navigation";
import { logoutApi } from "@/Apis/Auth";
import { colors } from "@/constants/colors";
import { useAutoCloseDialog } from "@/hooks/useAutoCloseDialog";
import { useIsRTL } from "@/hooks/useRTL";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/shadcn/components/ui/navigation-menu";
import { Separator } from "@/shadcn/components/ui/separator";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";

import { AlertDialogDemo } from "./Alret";
import { NavigationMenuTriggerDemo } from "./ui/NavigationMenuTrigger";

export default function UserAccount() {
  const router = useRouter();
  const { currentUser, setcurrentUser } = useAuthStore();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const t = useTranslations("Header");
  const { linkClass } = useActiveLink();
  const isRTL = useIsRTL();
  const locale = useLocale();
  const { openDialog } = useAutoCloseDialog(setOpenAlertDialog, 2000);

  const handleLogout = () => {
    if (!currentUser?.token) {
      console.error("No token available for logout");
      return;
    }

    logoutApi(currentUser?.token, locale)
      .then((res) => {
        if (res) {
          openDialog(() => {
            router.replace(routes.Home);
            setcurrentUser(null);
          });
        }
      })
      .catch((err) => {
        setcurrentUser(null);
        console.error("Logout failed", err);
      });
  };

  return (
    <>
      {isRTL ? (
        <NavigationMenuItem>
          <NavigationMenuTriggerDemo
            onPointerMove={(e) => e.preventDefault()} // disable hover
            onPointerLeave={(e) => e.preventDefault()} // disable hover
          >
            <User2 size={24} />
            {currentUser?.user.fullname.charAt(0) ?? ""}
          </NavigationMenuTriggerDemo>

          <NavigationMenuContent>
            <div className="flex justify-center items-center">
              <div className="bg-primary w-16 h-16 rounded-4xl items-center justify-center flex">
                <p className="text-gray-300 text-2xl text-center">
                  {currentUser?.user.fullname.charAt(0) ?? ""}
                </p>
              </div>
            </div>
            <p className="text-app-gray text-md text-center font-semibold my-3">
              {currentUser?.user.fullname}
            </p>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href={routes.AccountDetails}
                    className={cn(
                      linkClass(routes.AccountDetails),
                      "flex-row items-center justify-end gap-2"
                    )}
                  >
                    {t("account")}
                    <User2Icon size={24} color="gray" />
                  </Link>
                </NavigationMenuLink>
              </li>
              <Separator />
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href={routes.Favourites}
                    className={cn(
                      linkClass(routes.Favourites),
                      "flex-row items-center justify-end gap-2"
                    )}
                  >
                    {t("favourites")}
                    <Heart size={24} color="gray" />
                  </Link>
                </NavigationMenuLink>
              </li>
              <Separator />
              <li>
                <NavigationMenuLink asChild>
                  <button
                    onClick={handleLogout}
                    className={cn(
                      "flex-row items-center justify-end gap-2 w-full cursor-pointer"
                    )}
                  >
                    {t("logout")}
                    <LogOut size={24} color="gray" />
                  </button>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      ) : (
        <NavigationMenuItem>
          <NavigationMenuTriggerDemo
            onPointerMove={(e) => e.preventDefault()} // disable hover
            onPointerLeave={(e) => e.preventDefault()}
          >
            <User2 size={24} />
            {currentUser?.user.fullname.charAt(0) ?? ""}
          </NavigationMenuTriggerDemo>

          <NavigationMenuContent>
            <div className="flex justify-center items-center">
              <div className="bg-primary w-16 h-16 rounded-4xl items-center justify-center flex">
                <p className="text-gray-300 text-2xl text-center">
                  {currentUser?.user.fullname.charAt(0) ?? ""}
                </p>
              </div>
            </div>
            <p className="text-app-gray text-md text-center font-semibold my-3">
              {currentUser?.user.fullname}
            </p>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href={routes.AccountDetails}
                    className={cn(
                      linkClass(routes.AccountDetails),
                      "flex-row items-center gap-2"
                    )}
                  >
                    <User2Icon size={24} color="gray" />
                    {t("account")}
                  </Link>
                </NavigationMenuLink>
              </li>
              <Separator />
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href={routes.Favourites}
                    className={cn(
                      linkClass(routes.Favourites),
                      "flex-row items-center gap-2"
                    )}
                  >
                    <Heart size={24} color="gray" />
                    {t("favourites")}
                  </Link>
                </NavigationMenuLink>
              </li>
              <Separator />
              <li>
                <NavigationMenuLink asChild>
                  <button
                    onClick={handleLogout}
                    className={cn(
                      "flex-row items-center justify-start gap-2 cursor-pointer w-full"
                    )}
                  >
                    <LogOut size={24} color="gray" />
                    {t("logout")}
                  </button>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      )}

      {openAlertDialog && (
        <AlertDialogDemo
          open={openAlertDialog}
          title="loggedOut"
          translate="Auth"
          contentClassName="items-center justify-center gap-10"
          headerClassName="items-center"
          actionClassName="px-20 text-lg"
          icon={<CheckCircle2Icon size={50} color={colors.primary} />}
        />
      )}
    </>
  );
}
