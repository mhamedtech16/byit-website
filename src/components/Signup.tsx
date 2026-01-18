"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { CheckCircle2Icon, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signupSchema } from "@/_utils/validation";
import { confirmLoginCodeApi, signupApi } from "@/Apis/v1/Auth";
import { colors } from "@/constants/colors";
import { useAutoCloseDialog } from "@/hooks/useAutoCloseDialog";
import useFetch from "@/hooks/useFetch";
import { useIsRTL } from "@/hooks/useRTL";
import { Button } from "@/shadcn/components/ui/button";
import { Form } from "@/shadcn/components/ui/form";
import { Label } from "@/shadcn/components/ui/label";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { DropdownCountry, SignUpRequest } from "@/types/User";

import { AlertDialogDemo } from "./Alret";
import { CountryDropdown } from "./CountryCodeDropdown";
import { FormDropdownInput } from "./form/FormDropdownInput";
import { FormPasswordInput } from "./form/FormPasswordInput";
import { FormTextInput } from "./form/FormTextInput";

const yearsExperienceOptions = [
  {
    id: 1,
    name_en: "0 - 6 Months",
    name_ar: "٠ - ٦ شهور",
    name: "0 - 6 Months",
  },
  { id: 2, name_en: "1 Year", name_ar: "سنة واحدة", name: "1 Year" },
  { id: 3, name_en: "2 Years", name_ar: "سنتان", name: "2 Years" },
  { id: 4, name_en: "3 Years", name_ar: "ثلاث سنوات", name: "3 Years" },
  {
    id: 5,
    name_en: "4+ Years",
    name_ar: "أكثر من أربع سنوات",
    name: "4+ Years",
  },
];

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignUpPage({
  toggleMode,
  CloseModal,
}: {
  toggleMode: () => void;
  CloseModal: () => void;
}) {
  const t = useTranslations("Auth");
  const isRTL = useIsRTL();
  const locale = useLocale();
  const { setcurrentUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { cities } = useFetch();
  const { openDialog } = useAutoCloseDialog(
    setOpenAlertDialog,
    2000,
    CloseModal
  );

  const [selectedCountry, setSelectedCountry] =
    useState<DropdownCountry | null>(null);
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      yearsExperience: "",
      city: "",
      phone: "",
      countryCode: selectedCountry?.phone_code ?? "+20", // Default to Egypt
    },
    mode: "onBlur",
  });

  const onSubmit = useCallback(
    async (values: SignupFormValues) => {
      const payload: SignUpRequest = {
        ...values,
        type: "ISP",
        country: selectedCountry?.id ?? 0,
      };

      setLoading(true);
      setErrorMsg("");

      try {
        const response = await signupApi(payload, locale);

        if (!response?.data) {
          throw new Error("Invalid response from server");
        }
        if (response) {
          const loginCodeAPI = {
            phone: response?.data?.user?.phone ?? "",
            country: selectedCountry?.id ?? 0,
            verifycode: "0000",
          };
          const responseCode = await confirmLoginCodeApi(loginCodeAPI, locale);

          if (responseCode?.data?.token) {
            setcurrentUser(responseCode.data);
            form.reset();
            openDialog();
          }
        }
      } catch (err) {
        if (isAxiosError(err)) {
          const status = err?.response?.status;
          const msg = err?.response?.data?.errors?.msg?.[0]?.msg;
          if (status === 401) {
            setErrorMsg("Incorrect Login Data");
          } else if (msg) {
            setErrorMsg(msg);
          }
        }
      } finally {
        setLoading(false);
      }
    },
    [selectedCountry?.id, locale, setcurrentUser, form, openDialog]
  );

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{t("signup")}</h1>
      {errorMsg && (
        <h3 className={cn("text-red-500 text-center font-medium mb-4")}>
          {errorMsg}
        </h3>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* {Input Full Name} */}
          <FormTextInput
            form={form}
            name="fullname"
            label="fullName"
            placeholder="fullName"
            translate="Auth"
          />

          {/* {Input Email} */}
          <FormTextInput
            form={form}
            name="email"
            label="email"
            placeholder="email"
            type="email"
            translate="Auth"
          />

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

          {/* {Dropdown Input State} */}
          <FormDropdownInput
            form={form}
            name="city"
            label="state"
            title="selectState"
            titleSearch="searchState"
            titleLoading="stateLoading"
            data={cities}
            cityYears
            city
            width="w-full"
            translate="Auth"
            className={cn(form.formState.errors.city && "border-red-400")}
          />

          {/* {Input Password & Confirm Password} */}
          <FormPasswordInput
            form={form}
            name="password"
            label="password"
            placeholder="password"
            translate="Auth"
          />
          <FormPasswordInput
            form={form}
            name="confirmPassword"
            label="confirmPassword"
            placeholder="confirmPassword"
            translate="Auth"
          />

          {/* {Dropdown Input Years Experience} */}
          <FormDropdownInput
            form={form}
            name="yearsExperience"
            label="yearsExperience"
            title="yearsExperience"
            titleSearch="search"
            cityYears
            data={yearsExperienceOptions}
            width="w-full"
            translate="Auth"
            className={cn(
              form.formState.errors.yearsExperience && "border-red-400"
            )}
          />

          <Button
            type="submit"
            className="w-full"
            onSubmit={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
              </span>
            ) : (
              t("createAccount")
            )}
          </Button>
        </form>
      </Form>

      <div className="flex-row items-center justify-center mt-4">
        <div>
          <p className="text-center">
            {t("doHaveAccount")}
            <Button
              className="p-0 bg-white h-0 text-primary underline"
              onClick={toggleMode}
            >
              {t("login")}
            </Button>
          </p>
        </div>
      </div>
      {openAlertDialog && (
        <AlertDialogDemo
          open={openAlertDialog}
          title="accountCreated"
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
