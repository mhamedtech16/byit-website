"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { ClassNameValue } from "tailwind-merge";

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
  titleLoading?: string;
  data: number[]; // هنا بناخد أرقام بس
  width?: string;
  value?: number;
  onChange: (value: number) => void;
  onClick?: () => void;
  className?: ClassNameValue;
  outlineSecoundry?: boolean;
};

export function SharedDropdownInput({
  title,
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
            `${width ? width : "w-[150px]"} justify-between`,
            className
          )}
        >
          {value ? value : title && t(title)}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`${width ? width : "w-[300px]"} p-0`}
        style={{ width: popoverWidth ?? undefined }}
      >
        <Command>
          <CommandList>
            <CommandEmpty>{titleLoading && t(titleLoading)}</CommandEmpty>
            <CommandGroup>
              {data.map((num) => (
                <CommandItem
                  key={num}
                  value={num.toString()}
                  onSelect={() => {
                    onChange(num);
                    setOpen(false);
                  }}
                >
                  {num}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === num ? "opacity-100" : "opacity-0"
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
