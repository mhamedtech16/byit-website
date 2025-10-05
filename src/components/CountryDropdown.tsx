"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { ClassNameValue } from "tailwind-merge";

import { useIsRTL } from "@/hooks/useRTL";
import { Button } from "@/shadcn/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shadcn/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";
import { cn } from "@/shadcn/lib/utils";

type Props = {
  title: string;
  titleSearch?: string;
  titleLoading?: string;
  data: {
    id: string | number;
    name: string;
    name_en: string;
    name_ar: string;
  }[];
  width?: string;
  value?: string | number; // <-- change here
  onChange: (value: string | number) => void;
  onClick?: () => void;
  className?: ClassNameValue;
  outlineSecoundry?: boolean;
};
export function CountryDropdown({
  title,
  titleSearch,
  titleLoading,
  data,
  width,
  onChange,
  onClick,
  value,
  className,
  outlineSecoundry,
}: Props) {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const isRTL = useIsRTL();
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (buttonRef.current) {
      setPopoverWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  const onOpenCh = (isOpen: boolean) => {
    setOpen(isOpen);
    onClick?.();
  };

  return (
    <Popover open={open} onOpenChange={onOpenCh}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant={outlineSecoundry ? "outlineSecoundry" : "outline"}
          role="combobox"
          aria-expanded={open}
          className={cn(
            `${width ? width : "w-[300px]"} justify-between`,
            className
          )}
        >
          {value
            ? data.find(
                (framework: {
                  id: string | number;
                  name: string;
                  name_en: string;
                  name_ar: string;
                }) => framework.name === value
              )?.name ||
              data.find(
                (framework: {
                  id: string | number;
                  name: string;
                  name_en: string;
                  name_ar: string;
                }) => framework.name_ar === value
              )?.name_ar ||
              data.find(
                (framework: {
                  id: string | number;
                  name: string;
                  name_en: string;
                  name_ar: string;
                }) => framework.name_en === value
              )?.name_en ||
              data.find(
                (framework: {
                  id: string | number;
                  name: string;
                  name_en: string;
                  name_ar: string;
                }) => framework.id === value
              )?.name
            : title && t(title)}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`${width ? width : "w-[300px]"} p-0`}
        style={{ width: popoverWidth ?? undefined }}
      >
        <Command>
          <CommandInput
            placeholder={titleSearch && t(titleSearch)}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>{titleLoading && t(titleLoading)} </CommandEmpty>
            <CommandGroup>
              {data.map(
                (framework: {
                  id: string | number;
                  name: string;
                  name_en: string;
                  name_ar: string;
                }) => (
                  <CommandItem
                    key={framework.id}
                    value={framework.name}
                    onSelect={() => {
                      onChange(framework.id);
                      setOpen(false);
                    }}
                  >
                    {isRTL
                      ? framework.name_ar
                      : framework.name_en || framework.name || framework.id}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === framework.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
