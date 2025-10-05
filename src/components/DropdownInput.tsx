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
    name_ar: string;
    name_en: string;
  }[];
  width?: string;
  value?: number;
  onChange: (value: string | number) => void;
  onClick?: () => void;
  className?: ClassNameValue;
  outlineSecoundry?: boolean;
  hasMore?: boolean;
  onLoadMore?: (page: number, refresh: boolean, search: "") => void;
  page?: number;
  loadingMore?: boolean;
  translate?: string;
};
export function DropdownInput({
  title,
  titleSearch,
  titleLoading,
  data,
  width,
  onChange,
  onClick,
  value,
  className,
  translate,
  outlineSecoundry,
  hasMore,
  onLoadMore,
  page,
  loadingMore,
}: Props) {
  const t = useTranslations(translate);
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
            ? (() => {
                const selected = data.find(
                  (framework: {
                    id: string | number;
                    name: string;
                    name_ar: string;
                    name_en: string;
                  }) => framework.id === value
                );
                if (!selected) return "";
                return isRTL ? selected.name_ar : selected.name_en;
              })()
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
            <CommandEmpty>{titleLoading && t(titleLoading)}</CommandEmpty>
            <CommandGroup>
              {data.map(
                (framework: {
                  id: string | number;
                  name: string;
                  name_ar: string;
                  name_en: string;
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
                      : framework.name_en || framework.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === framework.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              )}
              {hasMore && (
                <div className="flex justify-center p-2">
                  <Button
                    variant="ghost"
                    className="text-sm"
                    disabled={loadingMore}
                    onClick={() =>
                      onLoadMore ? onLoadMore((page || 0) + 1, false, "") : null
                    }
                  >
                    {loadingMore ? "Loading..." : "Load More"}
                  </Button>
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
