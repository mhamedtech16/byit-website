"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";

import { routes } from "@/_lib/routes";
import { useMobile } from "@/hooks/useMobile";
import { cn } from "@/shadcn/lib/utils";

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
  const [mode, setMode] = React.useState<"login" | "signup">("login");
  const isMobile = useMobile();
  const router = useRouter();

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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md flex z-50 items-center md:justify-between lg:justify-around px-4 h-[11vmin] md:h-[11vmin]",
        isMobile && "h-[11vmin] justify-between"
      )}
    >
      <button
        className="relative w-[16vmin] h-[8vmin] cursor-pointer"
        onClick={() => router.push(routes.Home)}
      >
        <Image
          src={"/images/logo.jpg"}
          alt="Logo"
          fill
          //  width={130}
          // height={100}
          className="object-contain rounded-[3px]"
        />
      </button>

      {/* The Responsive of (Mobile,IPad) and Web */}
      {isMobile ? (
        <MobileNavigation onOpen={onOpen} />
      ) : (
        <WebNavigation onOpen={onOpen} />
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
    </header>
  );
}
