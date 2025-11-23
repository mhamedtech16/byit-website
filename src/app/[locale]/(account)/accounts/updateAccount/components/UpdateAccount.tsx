"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2Icon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { routes } from "@/_lib/routes";
import { updateAccountSchema } from "@/_utils/validation";
import { updateAccountApi } from "@/Apis/Auth";
import AccountMenu from "@/components/AccountMenu";
import { AlertDialogDemo } from "@/components/Alret";
import { CountryDropdown } from "@/components/CountryCodeDropdown";
import { FormDropdownInput } from "@/components/form/FormDropdownInput";
import { FormTextInput } from "@/components/form/FormTextInput";
import MobileNavigationSelect from "@/components/ui/MobileNavigationSelect";
import { Sidebar } from "@/components/ui/Sidebar";
import { colors } from "@/constants/colors";
import useFetch from "@/hooks/useFetch";
import { useMobile } from "@/hooks/useMobile";
import { useIsRTL } from "@/hooks/useRTL";
import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent } from "@/shadcn/components/ui/card";
import { Form } from "@/shadcn/components/ui/form";
import { Label } from "@/shadcn/components/ui/label";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { DropdownCountry, UpdateAccountRequest } from "@/types/User";

type UpdateFormValues = z.infer<typeof updateAccountSchema>;

const yearsExperienceOptions = [
  {
    id: 1,
    name: "0 - 6 Months",
    name_en: "0 - 6 Months",
    name_ar: "٠ - ٦ شهور",
  },
  { id: 2, name: "1 Years", name_en: "1 Year", name_ar: "سنة واحدة" },
  { id: 3, name: "2 Years", name_en: "2 Years", name_ar: "سنتان" },
  { id: 4, name: "3 Years", name_en: "3 Years", name_ar: "ثلاث سنوات" },
  {
    id: 5,
    name: "4+ Years",
    name_en: "4+ Years",
    name_ar: "أكثر من أربع سنوات",
  },
];

export default function UpdateAccount() {
  const t = useTranslations("UpdateAccount");
  const { currentUser, setcurrentUser, hasHydrated } = useAuthStore();
  const isRTL = useIsRTL();
  const router = useRouter();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const locale = useLocale();
  const isMobile = useMobile();
  const { cities } = useFetch();
  const [selectedCountry, setSelectedCountry] =
    useState<DropdownCountry | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<UpdateFormValues>({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: {
      fullname: currentUser?.user.fullname || "",
      email: currentUser?.user.email || "",
      city:
        currentUser?.user?.city?.name || currentUser?.user?.city?.name_en || "",
      yearsExperience: currentUser?.user.yearsExperience || "",
      countryCode: selectedCountry?.countryCode ?? "+20",
      phone: currentUser?.user.phone || "",
    },
  });

  const onSubmit = useCallback(
    async (values: UpdateFormValues) => {
      setLoading(true);
      try {
        if (!currentUser) return;

        const userId = currentUser?.user.id;
        const token = currentUser?.token;
        const lang = locale;

        const payload: UpdateAccountRequest = {
          ...values,
          fullname: values.fullname ?? "",
          email: values.email ?? "",
          yearsExperience: values.yearsExperience ?? "",
          country: selectedCountry?.id ?? 0,
          type: "ISP",
        };

        const res = await updateAccountApi(payload, lang, userId, token);
        if (res) {
          setcurrentUser(res.data);
          setOpenAlertDialog(true);
        }

        setErrorMsg("");
      } catch (error) {
        console.error(error);
        setErrorMsg("Something went wrong while updating");
      } finally {
        setLoading(false);
      }
    },
    [
      currentUser,
      locale,
      selectedCountry,
      setcurrentUser,
      setOpenAlertDialog,
      setErrorMsg,
      setLoading,
    ]
  );

  if (!hasHydrated) return null;

  return (
    <div
      className={cn(
        isMobile
          ? "flex w-screen bg-slate-50 relative"
          : "flex min-h-screen w-screen p-16 bg-slate-50"
      )}
    >
      {isMobile ? (
        <div className="absolute w-full z-50">
          <MobileNavigationSelect
            label="settings"
            options={[
              { label: t("account"), value: routes.AccountDetails },
              { label: t("changePassword"), value: routes.ChangePassword },
              { label: t("updateAccount"), value: routes.UpdateAccount },
              { label: t("deleteAccount"), value: "delete" },
            ]}
          />
        </div>
      ) : (
        <Sidebar label="settings">
          <AccountMenu />
        </Sidebar>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(isMobile ? "flex-1 p-6 mt-10" : "flex-1 p-10")}
      >
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
            {errorMsg && (
              <h3 className={cn("text-red-500 text-center font-medium mb-4")}>
                {errorMsg}
              </h3>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormTextInput
                  form={form}
                  name="fullname"
                  label="fullName"
                  type="text"
                  placeholder="fullName"
                  translate="Auth"
                />

                <FormTextInput
                  form={form}
                  name="email"
                  label="email"
                  type="email"
                  placeholder="email"
                  translate="Auth"
                />

                <Label className={cn("mb-2.5", errorMsg && "text-red-600")}>
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
                      isRTL
                        ? "text-right rounded-r-none"
                        : "text-left rounded-l-none"
                    )}
                  />
                </div>

                {/* {Dropdown Input State} */}
                <FormDropdownInput
                  form={form}
                  name="city"
                  label="state"
                  title="State"
                  data={cities}
                  cityYears
                  city
                  width="w-full"
                  translate="Auth"
                  className={cn(form.formState.errors.city && "border-red-400")}
                />

                {/* {Dropdown Input Years Experience} */}
                <FormDropdownInput
                  form={form}
                  name="yearsExperience"
                  label="yearsExperience"
                  title="Years Experience"
                  cityYears
                  data={yearsExperienceOptions}
                  width="w-full"
                  translate="Auth"
                  className={cn(
                    form.formState.errors.yearsExperience && "border-red-400"
                  )}
                />

                {/* Submit Button */}
                <div className="flex items-center justify-center w-52">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t("submitting")}
                      </span>
                    ) : (
                      t("submit")
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>

      {openAlertDialog && (
        <AlertDialogDemo
          open={openAlertDialog}
          title="success"
          action="ok"
          translate="UpdateAccount"
          onAction={() => router.push(routes.Home)}
          contentClassName="items-center justify-center gap-10"
          headerClassName="items-center"
          actionClassName="px-30 text-lg"
          icon={<CheckCircle2Icon size={50} color={colors.primary} />}
        />
      )}
    </div>
  );
}
