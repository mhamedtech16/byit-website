"use client";

import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { routes } from "@/_lib/routes";
import { useAboutUs } from "@/hooks/useAboutUs";
import { useIsRTL } from "@/hooks/useRTL";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";

import { AlertDialogDemo } from "./Alret";
import LoginPage from "./Login";
import ModalDemo from "./Modal";
import SignUpPage from "./Signup";

const LinkedIn = "https://www.linkedin.com/company/byitapp";

export default function Footer() {
  const t = useTranslations("Footer");
  const [open, setOpen] = useState(false);
  const isRTL = useIsRTL();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuthStore();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const { data } = useAboutUs();
  const isAuthenticated = currentUser?.user.approved;

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = (type: "login" | "signup") => {
    setMode(type);
    setIsOpen(true);
  };

  const openLoginModal = () => {
    setOpenAlertDialog(false);
    onOpen("login");
  };

  const switchAuthMode = (newMode: "login" | "signup") => {
    onClose();
    setTimeout(() => {
      onOpen(newMode);
    }, 200);
  };

  return (
    <footer className="bg-primary dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap">
          {/* Company */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-2">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("company")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={routes.AboutUs}
                  className="text-white hover:underline"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href={routes.GuideLines}
                  className="text-white hover:underline"
                >
                  {t("guideLines")}
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="text-white hover:underline">
                  {t("Footer.careers")}
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Services */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-2">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("services")}
            </h3>
            <ul className="space-y-2">
              <div>
                {/* الزرار */}
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  className="text-white hover:underline flex items-center gap-2 cursor-pointer"
                >
                  {t("listing")}
                  <span className="text-xs">{open ? "▲" : "▼"}</span>
                </button>

                {/* اللينكات اللي هتنزل */}
                {open && (
                  <ul className="mt-2 space-y-2 pl-8 list-disc text-white">
                    <li>
                      <Link
                        href={{
                          pathname: routes.PropertiesList,
                          query: { propertyType: "COMPOUND" },
                        }}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-2 hover:underline text-white list-disc",
                          isRTL ? "text-right" : "text-left"
                        )}
                      >
                        {t("searchCompounds")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={{
                          pathname: routes.PropertiesList,
                          query: { propertyType: "SEPARATED" },
                        }}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-2 hover:underline text-white",
                          isRTL ? "text-right" : "text-left"
                        )}
                      >
                        {t("searchSeparates")}
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <li>
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      setOpenAlertDialog(true);
                    } else {
                      router.push(routes.Contests);
                    }
                  }}
                  className="text-white hover:underline cursor-pointer"
                >
                  {t("contests")}
                </button>
              </li>
              <li>
                <Link
                  href={routes.NewLaunches}
                  className="text-white hover:underline"
                >
                  {t("newLaunches")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          {/* <div className="w-full sm:w-1/2 md:w-1/4 px-2">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("Footer.legal")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white hover:underline">
                  {t("Footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:underline">
                  {t("Footer.terms")}
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Socials */}
          <div className="w-full sm:w-1/2 md:w-1/4">
            <div className="flex gap-4 mt-2">
              <div
                onClick={() => window.open(data?.data.facebook)}
                className="cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook
                  className="text-white dark:text-gray-400 hover:text-gray-400"
                  size={24}
                />
              </div>

              <div
                onClick={() => window.open(data?.data.instagram)}
                className="cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram
                  className="text-white dark:text-gray-400 hover:text-gray-400"
                  size={24}
                />
              </div>
              <div
                onClick={() => window.open(data?.data.whatsapp)}
                className="cursor-pointer"
                aria-label="Whatsapp"
              >
                <Image
                  src="/whatsapp-logo.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="hover:opacity-80"
                />
              </div>
              <div
                onClick={() => window.open(LinkedIn)}
                className="cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin
                  className="text-white dark:text-gray-400 hover:text-gray-400"
                  size={24}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-sm text-gray-200 dark:text-gray-400 text-center">
          &copy; {new Date().getFullYear()} Byit Corp {t("rights")}.
        </div>
      </div>

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
          onCancel={() => setOpenAlertDialog(false)}
          onAction={openLoginModal}
        />
      )}
    </footer>
  );
}
