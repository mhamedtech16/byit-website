"use client";

import { useTranslations } from "next-intl";
import CurrencyInput from "react-currency-input-field";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/components/ui/form";
import { cn } from "@/shadcn/lib/utils";

interface FormCurrencyInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  decimalsLimit?: number;
  className?: string;
  prefix?: string;
  translate?: string;
  intlConfig?: {
    locale: string;
    currency?: string;
  };
}

export function FormCurrencyInput<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  decimalsLimit = 2,
  className,
  intlConfig,
  translate,
}: FormCurrencyInputProps<T>) {
  const t = useTranslations(translate);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">{t(label)}</FormLabel>
          <FormControl>
            <CurrencyInput
              id={name}
              placeholder={t(placeholder)}
              decimalsLimit={decimalsLimit}
              intlConfig={intlConfig}
              onValueChange={(value) => field.onChange(value ?? "")}
              className={cn(
                "file:text-foreground placeholder:text-muted-foreground text-white selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
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
