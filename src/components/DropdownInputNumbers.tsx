"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { ClassNameValue } from "tailwind-merge";

import { Button } from "@/shadcn/components/ui/button";
import {
  Command,
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
  data: { id: number; name: string }[];
  width?: string;
  value?: number;
  onChange: (value: number) => void;
  className?: ClassNameValue;
  outlineSecoundry?: boolean;
};

export function DropdownInputNumbers({
  title,
  data,
  width,
  onChange,
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
          {value ? data.find((item) => item.id === value)?.name : t(title)}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`${width ? width : "w-[300px]"} p-0`}
        style={{ width: popoverWidth ?? undefined }}
      >
        <Command>
          <CommandList>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    onChange(item.id);
                    setOpen(false);
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.id ? "opacity-100" : "opacity-0"
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
