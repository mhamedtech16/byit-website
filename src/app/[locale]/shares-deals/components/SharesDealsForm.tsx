"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { CheckCircle2Icon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { routes } from "@/_lib/routes";
import { sharesProperties } from "@/_utils/validation";
import { sharesDealFormApi } from "@/Apis/Auth";
import { AlertDialogDemo } from "@/components/Alret";
import { CountryDropdown } from "@/components/CountryCodeDropdown";
import { FormDropdownInputNumbers } from "@/components/form/FormDropdownInputNumbers";
import { FormSharesDropdown } from "@/components/form/FormSharesDropdown";
import { FormTextInput } from "@/components/form/FormTextInput";
import { colors } from "@/constants/colors";
import { useIsRTL } from "@/hooks/useRTL";
import { useSharedProperties } from "@/hooks/useSharedProperties";
import { pricePerLangauge } from "@/lib/PriceArray";
import { Button } from "@/shadcn/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { DropdownCountry, SharesDealRequest } from "@/types/User";

type SharesPropertiesValues = z.infer<typeof sharesProperties>;

export default function SharesDealsForm() {
  const router = useRouter();
  const t = useTranslations("ClosingForm");
  const [selectedCountry, setSelectedCountry] =
    useState<DropdownCountry | null>(null);
  const { vendors } = useSharedProperties();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const isRTL = useIsRTL();
  const locale = useLocale();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const { setSharesDeal } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [shareOptions, setShareOptions] = useState<
    { id: number; name: string }[]
  >([]);

  const form = useForm<SharesPropertiesValues>({
    resolver: zodResolver(sharesProperties),
    defaultValues: {
      sharedProperty: "",
      sharesCount: "",
      clientName: "",
      //   sharesValue: 0,
      developerSalesName: "",
      developerSalesNumber: "",
      value: 0,
      countryCode: selectedCountry?.countryCode ?? "+20", // Default to Egypt
      uploadFile: undefined, // File input will be handled separately
    },
  });

  const selectedProjectId = form.watch("sharedProperty");
  const selectedSharesCount = form.watch("sharesCount");

  useEffect(() => {
    if (!selectedProjectId || !vendors) return;

    const selectedProject = vendors.find(
      (item) => item.id === Number(selectedProjectId)
    );

    if (selectedProject) {
      const options = Array.from(
        { length: selectedProject.availableShares },
        (_, i) => ({
          id: i + 1,
          name: String(i + 1),
        })
      );
      setShareOptions(options);

      const count = Number(form.getValues("sharesCount"));
      if (count) {
        const total = count * selectedProject.sharePrice;
        form.setValue("value", total);
      }
    } else {
      setShareOptions([]);
      form.setValue("value", 0);
    }
  }, [selectedProjectId, vendors, form]);

  useEffect(() => {
    if (!selectedProjectId || !vendors) return;

    const selectedProject = vendors.find(
      (item) => item.id === Number(selectedProjectId)
    );

    if (selectedProject) {
      const count = Number(selectedSharesCount);
      if (count) {
        const total = count * selectedProject.sharePrice;
        form.setValue("value", total);
      } else {
        form.setValue("value", 0);
      }
    }
  }, [selectedSharesCount, selectedProjectId, vendors, form]);

  const onSubmit = useCallback(
    async (values: SharesPropertiesValues) => {
      const payload: SharesDealRequest = {
        ...values,
        type: "SHARING",
        sharesCount:
          typeof values.sharesCount === "string"
            ? Number(values.sharesCount)
            : values.sharesCount,
        sharedProperty:
          typeof values.sharedProperty === "string"
            ? Number(values.sharedProperty)
            : values.sharedProperty,
        value:
          typeof values.value === "string"
            ? Number(values.value)
            : values.value,
        salesCountry: selectedCountry?.id ?? 0,
        clientCountry: 50,
        uploadFile: values.uploadFile,
      };

      setLoading(true);
      setErrorMsg("");
      try {
        const response = await sharesDealFormApi(payload, locale);

        if (!response?.data) {
          throw new Error("Invalid response from server");
        }

        if (response?.data) {
          setSharesDeal(response.data);
          form.reset({
            sharedProperty: "",
            sharesCount: "",
            clientName: "",
            // sharesValue: 0,
            developerSalesName: "",
            developerSalesNumber: "",
            value: 0,
            uploadFile: undefined,
          });

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }

        setOpenAlertDialog(true);
      } catch (err) {
        if (isAxiosError(err)) {
          const msg = err.response?.data?.errors?.msg?.[0]?.msg;
          if (msg) {
            setErrorMsg(msg);
          }
        }
      } finally {
        setLoading(false);
      }
    },
    [selectedCountry?.id, locale, setSharesDeal, form]
  );

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">{t("closeForm")}</h1>
      {errorMsg && (
        <h3 className={cn("text-red-500 text-center font-medium mb-4")}>
          {errorMsg}
        </h3>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormSharesDropdown
            form={form}
            name="sharedProperty"
            label="shareProperties"
            title="selectShareProperties"
            titleSearch="searchShareProperties"
            titleLoading="loadingShareProperties"
            data={vendors}
            width="w-full"
            translate="ClosingForm"
            outlineSecoundry
            className="text-white"
          />
          <FormDropdownInputNumbers
            form={form}
            name="sharesCount"
            label="sharesCount"
            title="sharesCount"
            data={shareOptions}
            width="w-full"
            translate="ClosingForm"
            className="text-white"
            outlineSecoundry
          />
          <FormTextInput
            form={form}
            name="value"
            label="sharesValue"
            placeholder="sharesValue"
            translate="ClosingForm"
            value={pricePerLangauge(form.watch("value"), locale)}
            type="text"
            readonly
            disabled
            className="text-white"
          />
          <FormTextInput
            form={form}
            name="clientName"
            label="clientName"
            placeholder="clientName"
            translate="ClosingForm"
            type="text"
            className="text-white"
          />

          <FormTextInput
            form={form}
            name="developerSalesName"
            label="developerSalesName"
            placeholder="developerSalesName"
            translate="ClosingForm"
            type="text"
            className="text-white"
          />
          {/* Merged Country Code + Sales Number */}
          <Label
            className={cn(
              "text-white mb-2",
              form.formState.errors.developerSalesNumber && "text-red-500 mb-2"
            )}
          >
            {t("developerSalesNumber")}
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
              name="developerSalesNumber"
              placeholder="developerSalesNumber"
              translate="ClosingForm"
              type="tel"
              onChange
              className={cn(
                "text-white",
                isRTL ? "text-right rounded-r-none" : "text-left rounded-l-none"
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="uploadFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  {t("uploadTheReservationForm")}
                </FormLabel>
                <FormControl>
                  <Input
                    ref={(el) => {
                      field.ref(el); // still register with RHF
                      fileInputRef.current = el; // store in your ref
                    }}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    name={field.name}
                    className="text-white border-dashed"
                    placeholder="Upload File"
                    aria-placeholder="Upload File"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <p className="text-white">PDF JPG JPEG PNG</p>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-white text-primary hover:bg-gray-200"
            onSubmit={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
              </span>
            ) : (
              t("submit")
            )}
          </Button>
        </form>
      </Form>

      {openAlertDialog && (
        <AlertDialogDemo
          open={openAlertDialog}
          title="dealClosed"
          action="ok"
          translate="ClosingForm"
          onAction={() => router.push(routes.Home)}
          contentClassName="items-center justify-center gap-10"
          headerClassName="items-center"
          actionClassName="px-20 text-lg"
          icon={<CheckCircle2Icon size={50} color={colors.primary} />}
        />
      )}
    </div>
  );
}
