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

import { SharesPropertiesDropDown } from "../SharesPropertiesDropDown";

type Option = {
  id: string;
  project_en_name: string;
  project_ar_name: string;
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
};

export function FormSharesDropdown<T extends FieldValues>({
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
  outlineSecoundry,
}: FormDropdownInputProps<T>) {
  const t = useTranslations(translate);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={className}>{t(label)}</FormLabel>
          <FormControl>
            <SharesPropertiesDropDown
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
              translate={translate}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
