"use client";

import { Check } from "lucide-react";
import * as React from "react";
import Flag from "react-flagkit";

import { useMobile } from "@/hooks/useMobile";
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

type Option = {
  id: string; // country code (e.g. "US")
  name: string; // e.g. "EN"
};

type Props = {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  width?: string;
};

export default function LanguageDropdown({
  options,
  value,
  onChange,
  width,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = React.useState<number | null>(null);
  const isMobile = useMobile();

  React.useEffect(() => {
    if (buttonRef.current) {
      setPopoverWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  const selected = options.find((opt) => opt.name === value);
  const languageLabel =
    selected?.name === "EN"
      ? "English"
      : selected?.name === "AR"
      ? "العربية"
      : selected?.name;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant={isMobile ? "languageFlagMobile" : "languageFlag"}
          size={isMobile ? "languageFlagMobile" : "languageFlag"}
          role="combobox"
          aria-expanded={open}
          className={cn("justify-center items-center", width || "w-[48px]")}
        >
          {isMobile ? (
            <div className="flex gap-2 items-center">
              {selected?.id && <Flag country={selected.id} size={24} />}
              {languageLabel}
            </div>
          ) : (
            <>{selected?.id && <Flag country={selected.id} size={24} />}</>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="center"
        className="p-0 shadow-md rounded-xl border bg-white"
        style={{
          width: popoverWidth ?? "auto",
          minWidth: Math.max(popoverWidth ?? 0, 120),
        }}
      >
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  onSelect={() => {
                    onChange(option.name);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 py-2"
                >
                  <Flag country={option.id} size={20} />
                  <span className="font-semibold">{option.name}</span>
                  <Check
                    className={cn(
                      "ml-auto transition-opacity",
                      value === option.name ? "opacity-100" : "opacity-0"
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
