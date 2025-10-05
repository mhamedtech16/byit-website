"use client";

import { Check } from "lucide-react";
import * as React from "react";
import Flag from "react-flagkit";

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
          variant="languageFlag"
          size="languageFlag"
          role="combobox"
          aria-expanded={open}
          className={`${width || "w-[120px]"} justify-center items-center`}
        >
          <span className="flex items-center gap-2">
            {selected?.id && <Flag country={selected.id} size={20} />}
            {languageLabel}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: popoverWidth ?? undefined }}
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
                >
                  <span className="flex items-center gap-2 font-bold">
                    <Flag country={option.id} size={20} />
                    {option.name}
                  </span>
                  <Check
                    className={cn(
                      "ml-auto",
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
