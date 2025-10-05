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

import { DropdownInputNumbers } from "../DropdownInputNumbers";

type Option = {
  id: number;
  name: string;
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

export function FormDropdownInputNumbers<T extends FieldValues>({
  form,
  name,
  label,
  title,
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
            <DropdownInputNumbers
              title={t(title)}
              data={data}
              outlineSecoundry={outlineSecoundry}
              width={width}
              {...field}
              className={cn(
                form.formState.errors[name] && "border-red-400",
                className
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
