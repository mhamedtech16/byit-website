"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { CheckCircle2Icon, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginSchema } from "@/_utils/validation";
import { loginApi } from "@/Apis/v1/Auth";
import { colors } from "@/constants/colors";
import { useAutoCloseDialog } from "@/hooks/useAutoCloseDialog";
import { useIsRTL } from "@/hooks/useRTL";
import { Button } from "@/shadcn/components/ui/button";
import { Form } from "@/shadcn/components/ui/form";
import { Label } from "@/shadcn/components/ui/label";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { DropdownCountry, LoginRequestValues } from "@/types/User";

import { AlertDialogDemo } from "./Alret";
import { CountryDropdown } from "./CountryCodeDropdown";
import { FormPasswordInput } from "./form/FormPasswordInput";
import { FormTextInput } from "./form/FormTextInput";

type LoginFormValues = z.infer<typeof loginSchema>;

type Props = {
  toggleMode: () => void;
  CloseModal: () => void;
};
export default function LoginPage({ toggleMode, CloseModal }: Props) {
  const t = useTranslations("Auth");
  const isRTL = useIsRTL();
  const { setcurrentUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const locale = useLocale();
  const { openDialog } = useAutoCloseDialog(
    setOpenAlertDialog,
    2000,
    CloseModal
  );
  const [selectedCountry, setSelectedCountry] =
    useState<DropdownCountry | null>(null);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
      countryCode: selectedCountry?.phone_code || "+20", // Default to Egypt
    },
  });

  const onSubmitLogin = useCallback(
    async (values: LoginRequestValues) => {
      setLoading(true);
      setErrorMsg(""); // Reset error before trying

      try {
        const res = await loginApi(values, locale);

        if (!res?.data) {
          throw new Error("Invalid response from server");
        }

        if (res.data) {
          setcurrentUser(res.data);
          form.reset();
          openDialog();
        }
      } catch (err) {
        if (isAxiosError(err)) {
          const status = err?.response?.status;
          const apiMsg = err?.response?.data?.errors?.msg?.[0]?.msg;

          if (status === 401) {
            setErrorMsg(t("Incorrect Login Data"));
          } else if (apiMsg) {
            setErrorMsg(apiMsg);
          } else {
            setErrorMsg(t("An unexpected error occurred"));
          }
        }
      } finally {
        setLoading(false);
      }
    },
    [locale, setcurrentUser, form, openDialog, t] // dependencies
  );

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{t("login")}</h1>
      {errorMsg && (
        <h3 className={cn("text-red-500 text-center font-medium mb-4")}>
          {errorMsg}
        </h3>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitLogin)} className="space-y-5">
          {/* {Input Phone Number} */}
          <Label
            className={cn(
              "mb-2",
              form.formState.errors.phone && "text-red-500"
            )}
          >
            {t("phoneNumber")}
          </Label>
          <div className="flex">
            <CountryDropdown
              onChange={(country) => {
                setSelectedCountry(country);
              }}
              slim={true}
              disabled={false}
              placeholder="Code"
            />
            <FormTextInput
              form={form}
              name="phone"
              placeholder="phoneNumber"
              type="tel"
              inputMode="tel"
              onChange
              translate="Auth"
              className={cn(
                isRTL ? "text-right rounded-r-none" : "text-left rounded-l-none"
              )}
            />
          </div>

          <FormPasswordInput
            form={form}
            name="password"
            label="password"
            placeholder="password"
            translate="Auth"
          />

          <Button
            type="submit"
            className="w-full"
            onSubmit={form.handleSubmit(onSubmitLogin)}
            disabled={form.formState.isSubmitting}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
              </span>
            ) : (
              t("login")
            )}
          </Button>
        </form>
      </Form>
      <div className="items-center justify-center mt-4">
        <p className="text-center">
          {t("dontHaveAccount")}
          <Button
            className="p-0 bg-white h-0 text-primary underline"
            onClick={toggleMode}
          >
            {t("signup")}
          </Button>
        </p>
      </div>

      {openAlertDialog && (
        <AlertDialogDemo
          open={openAlertDialog}
          title="welcomeBack"
          translate="Auth"
          contentClassName="items-center justify-center gap-10"
          headerClassName="items-center"
          actionClassName="px-20 text-lg"
          icon={<CheckCircle2Icon size={50} color={colors.primary} />}
        />
      )}
    </div>
  );
}
