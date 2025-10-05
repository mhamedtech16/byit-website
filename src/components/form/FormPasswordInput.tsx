"use client";

import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import { useIsRTL } from "@/hooks/useRTL";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { cn } from "@/shadcn/lib/utils";

type FormPasswordInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  translate?: string;
};

export function FormPasswordInput<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  translate,
}: FormPasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isRTL = useIsRTL();
  const t = useTranslations(translate);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t(label)}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={t(placeholder)}
                {...field}
              />
            </FormControl>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none",
                isRTL ? "left-2" : "right-2"
              )}
              tabIndex={-1}
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
