"use client";

import { useTranslations } from "next-intl";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/components/ui/form";
import { cn } from "@/shadcn/lib/utils";

import { CountryDropdown } from "../CountryDropdown";
import { DropdownInput } from "../DropdownInput";
import { YearsDropdown } from "../YearsDropdown";

type Option = {
  id: string | number;
  name: string;
  name_en: string;
  name_ar: string;
};

type FormDropdownInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  title: string;
  titleSearch?: string;
  titleLoading?: string;
  data: Option[];
  width?: string;
  className?: string;
  translate?: string;
  outlineSecoundry?: boolean;
  cityYears?: boolean;
  city?: boolean;
  onClick?: () => void;
  onChange?: (value: string | number) => void;
  hasMore?: boolean;
  onLoadMore?: (page: number, refresh: boolean, search: "") => void;
  page?: number;
  loadingMore?: boolean;
};

export function FormDropdownInput<T extends FieldValues>({
  form,
  name,
  label,
  title,
  titleSearch,
  titleLoading,
  data,
  width = "w-full",
  className,
  translate,
  city,
  cityYears,
  outlineSecoundry,
  onChange,
  onClick,
  hasMore,
  onLoadMore,
  page,
  loadingMore,
}: FormDropdownInputProps<T>) {
  const t = useTranslations(translate);

  if (cityYears) {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className={className}>{t(label)}</FormLabel>
            <FormControl>
              {city ? (
                <CountryDropdown
                  title={title}
                  titleSearch={titleSearch}
                  titleLoading={titleLoading}
                  data={data}
                  outlineSecoundry={outlineSecoundry}
                  width={width}
                  {...field}
                  className={cn(
                    form.formState.errors[name] && "border-red-400",
                    className
                  )}
                />
              ) : (
                <YearsDropdown
                  title={title}
                  titleSearch={titleSearch}
                  titleLoading={titleLoading}
                  data={data}
                  outlineSecoundry={outlineSecoundry}
                  width={width}
                  {...field}
                  className={cn(
                    form.formState.errors[name] && "border-red-400",
                    className
                  )}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  } else {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className={className}>{t(label)}</FormLabel>
            <FormControl>
              <DropdownInput
                title={title}
                titleSearch={titleSearch}
                titleLoading={titleLoading}
                data={data}
                translate={translate}
                outlineSecoundry={outlineSecoundry}
                width={width}
                {...field}
                onChange={onChange ? onChange : field.onChange}
                onClick={onClick}
                className={cn(
                  form.formState.errors[name] && "border-red-400",
                  className
                )}
                hasMore={hasMore}
                onLoadMore={onLoadMore}
                page={page}
                loadingMore={loadingMore}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
}
