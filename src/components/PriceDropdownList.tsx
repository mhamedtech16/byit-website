"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import * as React from "react";
import { ClassNameValue } from "tailwind-merge";

import { pricePerLangauge } from "@/lib/PriceArray";
import { Button } from "@/shadcn/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
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
  data: number[];
  width?: string;
  value?: number;
  onChange: (value: number) => void;
  onClick?: () => void;
  className?: ClassNameValue;
};
export function PriceDropdownList({
  title,
  data,
  width,
  onChange,
  onClick,
  value,
  className,
}: Props) {
  const locale = useLocale();
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = React.useState<number | null>(null);
  const t = useTranslations();
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
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            `${width ? width : "w-[300px]"} justify-between`,
            className
          )}
        >
          {value
            ? pricePerLangauge(
              data.find((framework: number) => framework === value) || 0,
              locale
            )
            : `${t(title)}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`${width ? width : "w-[300px]"} p-0`}
        style={{ width: popoverWidth ?? undefined }}
      >
        <Command>
          {/* <CommandInput placeholder={`${t('Search')} ${title}...`} className="h-9" /> */}
          <CommandList>
            <CommandEmpty>{title} loading...</CommandEmpty>
            <CommandGroup>
              {data.map((framework: number, index: number) => (
                <CommandItem
                  key={index}
                  value={`${pricePerLangauge(framework, "ar")}`}
                  onSelect={() => {
                    onChange(framework);
                    setOpen(false);
                  }}
                >
                  {pricePerLangauge(framework, locale)}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
