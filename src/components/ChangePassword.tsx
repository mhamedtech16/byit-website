"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { motion } from "framer-motion";
import { CheckCircle2Icon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { routes } from "@/_lib/routes";
import { updatePassowrdApi } from "@/Apis/Auth";
import { colors } from "@/constants/colors";
import { useMobile } from "@/hooks/useMobile";
import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent } from "@/shadcn/components/ui/card";
import { Form } from "@/shadcn/components/ui/form";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { UpdatePasswordRequest } from "@/types/User";

import { AlertDialogDemo } from "./Alret";
import { FormPasswordInput } from "./form/FormPasswordInput";
import MobileNavigationSelect from "./ui/MobileNavigationSelect";
import { Sidebar } from "./ui/Sidebar";

const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Old password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export default function ChangePassword() {
  const t = useTranslations("ChangePassword");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const { currentUser } = useAuthStore();
  const locale = useLocale();
  const isMobile = useMobile();
  const [statusMessage, setStatusMessage] = useState("");

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = useCallback(
    async (values: UpdatePasswordRequest) => {
      setLoading(true);
      setStatusMessage("");

      try {
        if (!currentUser) {
          setStatusMessage(t("unauthorized"));
          return;
        }

        const token = currentUser.token;
        const res = await updatePassowrdApi(values, locale, token);
        if (res) {
          setOpenAlertDialog(true);
          form.reset();
        }
      } catch (error) {
        let status = 0;

        if (isAxiosError(error)) {
          status = error.response?.status ?? 0;
        }

        if (status === 400) {
          setStatusMessage(t("incorrectOldPassword"));
        } else {
          setStatusMessage(t("error"));
        }
      } finally {
        setLoading(false);
      }
    },
    [currentUser, locale, t, form] // ✅ Dependencies
  );

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
        <Sidebar />
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(isMobile ? "flex-1 p-6 mt-10" : "flex-1 p-10")}
      >
        <Card className="">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">{t("title")}</h2>
            {statusMessage && (
              <h3 className={cn("text-red-500 text-center font-medium mb-4")}>
                {statusMessage}
              </h3>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Old Password */}
                <FormPasswordInput
                  form={form}
                  name="oldPassword"
                  label="oldPassword"
                  placeholder="oldPassword"
                  translate="ChangePassword"
                />

                {/* New Password */}
                <FormPasswordInput
                  form={form}
                  name="newPassword"
                  label="newPassword"
                  placeholder="newPassword"
                  translate="ChangePassword"
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
          translate="ChangePassword"
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
