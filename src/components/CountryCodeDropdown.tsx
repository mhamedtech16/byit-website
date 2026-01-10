"use client";

import { CheckIcon, ChevronDown, Globe } from "lucide-react";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { CircleFlag } from "react-circle-flags";

import { useCountries } from "@/hooks/useCountries"; // ✅ NEW
import { useIsRTL } from "@/hooks/useRTL";
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
import { DropdownCountry } from "@/types/User";

type Props = {
  onChange?: (country: DropdownCountry) => void;
  disabled?: boolean;
  placeholder?: string;
  slim?: boolean;
  className?: string;
};

const CountryDropdownComponent = (
  {
    onChange,
    disabled = false,
    placeholder = "Select a country",
    slim = false,
    className,
    ...props
  }: Props,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const { countries } = useCountries();
  const isRTL = useIsRTL();
  const [open, setOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] =
    useState<DropdownCountry | null>(null);

  useEffect(() => {
    if (!selectedCountry && countries.length) {
      const defaultCountry = countries.find((c) => c.isoCode === "EGY");

      if (defaultCountry) {
        setSelectedCountry(defaultCountry);
        onChange?.(defaultCountry);
      }
    }
  }, [countries, selectedCountry, onChange]);

  const handleSelect = useCallback(
    (country: DropdownCountry) => {
      setSelectedCountry(country);
      onChange?.(country);
      setOpen(false);
    },
    [onChange]
  );

  const triggerClasses = cn(
    "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    slim === true && "w-30",
    isRTL ? "rounded-l-none" : "rounded-r-none",
    className
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        className={triggerClasses}
        disabled={disabled}
        {...props}
      >
        {selectedCountry ? (
          <div className="flex items-center justify-center flex-grow w-0 gap-2">
            <div className="flex items-center justify-center w-5 h-5 shrink-0 gap-1">
              {selectedCountry.isoCode && (
                <CircleFlag
                  countryCode={selectedCountry.isoCode
                    .slice(0, -1)
                    .toLowerCase()}
                  height={20}
                />
              )}
              <span className="text-gray-400 whitespace-nowrap">
                {selectedCountry.countryCode}
              </span>
            </div>
            {!slim && (
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {selectedCountry.name}
              </span>
            )}
          </div>
        ) : (
          <span>
            {!slim ? (
              placeholder
            ) : (
              <div className="flex items-center justify-center w-full gap-1.5">
                <Globe size={20} className="text-gray-400" />
                <span className="text-gray-400 whitespace-nowrap">Code</span>
              </div>
            )}
          </span>
        )}
        <ChevronDown size={16} className="text-gray-400" />
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        className="min-w-[--radix-popper-anchor-width] p-0"
      >
        <Command className="w-full max-h-[200px] sm:max-h-[270px]">
          <CommandList>
            <div className="sticky top-0 z-10 bg-popover">
              <CommandInput placeholder="Search country..." />
            </div>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((option, key) => (
                <CommandItem
                  className="flex items-center w-full gap-2"
                  key={key}
                  onSelect={() => handleSelect(option)}
                >
                  <div className="flex flex-grow w-0 space-x-2 overflow-hidden">
                    <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full">
                      {option.isoCode && (
                        <CircleFlag
                          countryCode={option.isoCode
                            .slice(0, -1)
                            .toLowerCase()}
                          height={20}
                        />
                      )}
                    </div>
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {isRTL ? option.name_ar : option.name_en}
                    </span>
                    <span className="overflow-hidden text-gray-400 whitespace-nowrap">
                      ({option.countryCode})
                    </span>
                  </div>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 shrink-0",
                      option.id === selectedCountry?.id
                        ? "opacity-100"
                        : "opacity-0"
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
};

CountryDropdownComponent.displayName = "CountryDropdownComponent";

export const CountryDropdown = forwardRef(CountryDropdownComponent);
