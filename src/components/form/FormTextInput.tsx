"use client";

import { useTranslations } from "next-intl";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import { formatPhoneInput } from "@/_utils/formatPhoneInput";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";

type FormTextInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel" | "number";
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search"
    | undefined;
  onChange?: boolean;
  className?: string;
  translate?: string;
  readonly?: boolean;
  disabled?: boolean;
  value?: string | number;
};

export function FormTextInput<T extends FieldValues>({
  form,
  name,
  label,
  onChange,
  className,
  readonly,
  value,
  disabled,
  placeholder = "",
  inputMode,
  type = "text",
  translate,
}: FormTextInputProps<T>) {
  const t = useTranslations(translate);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && (
            <FormLabel className={className}>{label && t(label)}</FormLabel>
          )}
          <FormControl>
            {onChange ? (
              <Input
                readOnly={readonly}
                disabled={disabled}
                placeholder={t(placeholder)}
                type={type}
                {...field}
                value={value ?? field.value}
                onChange={(e) => {
                  const formatted = formatPhoneInput(e.target.value);
                  field.onChange(formatted);
                }}
                className={className}
                inputMode={inputMode}
              />
            ) : (
              <Input
                readOnly={readonly}
                disabled={disabled}
                placeholder={t(placeholder)}
                type={type}
                {...field}
                value={value ?? field.value}
                className={className}
                inputMode={inputMode}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
