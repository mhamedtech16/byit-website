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
    id: string;
    project_en_name: string;
    project_ar_name: string;
  }[];
  width?: string;
  value?: string;
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
export function SharesPropertiesDropDown({
  title,
  titleSearch,
  titleLoading,
  data,
  width,
  onChange,
  onClick,
  value,
  translate,
  className,
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
            ? data.find(
                (framework: {
                  id: string;
                  project_en_name: string;
                  project_ar_name: string;
                }) => framework.id === value
              )?.id
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
                  id: string;
                  project_en_name: string;
                  project_ar_name: string;
                }) => (
                  <CommandItem
                    key={framework.id}
                    value={framework.id}
                    onSelect={() => {
                      onChange(framework.id);
                      setOpen(false);
                    }}
                  >
                    {isRTL
                      ? framework.project_ar_name
                      : framework.project_en_name || framework.id}
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
