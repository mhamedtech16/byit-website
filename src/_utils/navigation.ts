import { usePathname, useSearchParams } from "next/navigation";

import { useMobile } from "@/hooks/useMobile";

function removeLocale(path: string) {
  const segments = path.split("/").filter(Boolean);
  if (segments.length > 0 && ["en", "ar"].includes(segments[0])) {
    segments.shift(); // remove locale
  }
  return `/${segments.join("/")}`;
}

export function useActiveLink() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMobile = useMobile();

  const currentType = searchParams.get("propertyType");
  const cleanedPath = removeLocale(pathname);

  const isActive = (href: string, expectedType?: string) => {
    const matchesPath = removeLocale(href) === cleanedPath;
    const matchesType = expectedType ? currentType === expectedType : true;
    return matchesPath && matchesType;
  };

  const linkClass = (href: string, expectedType?: string) =>
    `relative px-2 py-3 transition-all duration-300 ease-in-out
     after:absolute after:left-0 after:bottom-0 after:h-[2px]
     after:w-full after:transition-transform after:duration-300
     after:scale-x-0 after:bg-primary/30 border-gray-300 ${
       isMobile ? "border-b-[0.5px] flex items-center" : ""
     } 
     ${isActive(href, expectedType) ? "bg-primary/10 text-black" : ""}`;

  return { linkClass };
}
