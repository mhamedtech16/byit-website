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
import { sharesPropertiesSchema } from "@/_utils/validation";
import { sharesUnitFormApi, uploadFile } from "@/Apis/v2/usePostApis";
import { AlertDialogDemo } from "@/components/Alret";
import { CountryDropdown } from "@/components/CountryCodeDropdown";
import { FormDropdownInputNumbers } from "@/components/form/FormDropdownInputNumbers";
import { FormSharesDropdown } from "@/components/form/FormSharesDropdown";
import { FormTextInput } from "@/components/form/FormTextInput";
import { colors } from "@/constants/colors";
import { useIsRTL } from "@/hooks/useRTL";
import { useShareUnit } from "@/hooks/useShareUnit";
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
import { DropdownCountry, SharesUnitRequest } from "@/types/User";

type SharesUnitValidation = z.infer<typeof sharesPropertiesSchema>;

export default function SharesDealsForm() {
  const router = useRouter();
  const t = useTranslations("ClosingForm");
  const [selectedCountry, setSelectedCountry] =
    useState<DropdownCountry | null>(null);
  const { shareUnit } = useShareUnit();
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
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<SharesUnitValidation>({
    resolver: zodResolver(sharesPropertiesSchema),
    defaultValues: {
      shared_unit: "",
      shared_count: "",
      client_name: "",
      salesperson_name: "",
      salesperson_phone: "",
      sales_country_code: selectedCountry?.countryCode ?? "+20",
      value: 0,
      salesperson_country: selectedCountry?.name ?? "Egypt", // Default to Egypt
      image: "",
    },
  });

  const selectedProjectId = form.watch("shared_unit");
  const selectedSharesCount = form.watch("shared_count");

  useEffect(() => {
    if (!selectedProjectId || !shareUnit) return;

    const selectedProject = shareUnit.find(
      (item) => item.id === selectedProjectId
    );

    if (selectedProject) {
      const options = Array.from(
        { length: selectedProject.available_shares },
        (_, i) => ({
          id: i + 1,
          name: String(i + 1),
        })
      );
      setShareOptions(options);

      const count = Number(form.getValues("shared_count"));
      if (count) {
        const total = count * selectedProject.share_price;
        form.setValue("value", total);
      }
    } else {
      setShareOptions([]);
      form.setValue("value", 0);
    }
  }, [selectedProjectId, shareUnit, form]);

  useEffect(() => {
    if (!selectedProjectId || !shareUnit) return;

    const selectedProject = shareUnit.find(
      (item) => item.id === selectedProjectId
    );

    if (selectedProject) {
      const count = Number(selectedSharesCount);
      if (count) {
        const total = count * selectedProject.share_price;
        form.setValue("value", total);
      } else {
        form.setValue("value", 0);
      }
    }
  }, [selectedSharesCount, selectedProjectId, shareUnit, form]);

  const addFile = useCallback(async (file: File | undefined) => {
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadFile(file);
      setUploadedFileUrl(res.data.message.file_url);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }, []);

  const onSubmit = useCallback(
    async (values: SharesUnitValidation) => {
      const payload: SharesUnitRequest = {
        ...values,
        client_name: values.client_name,
        shared_count:
          typeof values.shared_count === "string"
            ? Number(values.shared_count)
            : values.shared_count,
        shared_unit: values.shared_unit,
        salesperson_name: values.salesperson_name,
        salesperson_phone: values.sales_country_code + values.salesperson_phone,
        salesperson_country: values.salesperson_country,
        image: uploadedFileUrl || "",
      };

      setLoading(true);
      setErrorMsg("");
      try {
        const response = await sharesUnitFormApi(payload);

        if (!response?.data) {
          throw new Error("Invalid response from server");
        }

        if (response?.data) {
          setSharesDeal(response.data);
          form.reset({
            shared_unit: "",
            shared_count: "",
            client_name: "",
            salesperson_name: "",
            salesperson_phone: "",
            salesperson_country: "",
            sales_country_code: "",
            value: 0,
            image: "",
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
    [uploadedFileUrl, setSharesDeal, form]
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
            name="shared_unit"
            label="shareProperties"
            title="selectShareProperties"
            titleSearch="searchShareProperties"
            titleLoading="loadingShareProperties"
            data={shareUnit}
            width="w-full"
            translate="ClosingForm"
            outlineSecoundry
            className="text-white"
          />
          <FormDropdownInputNumbers
            form={form}
            name="shared_count"
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
            name="client_name"
            label="clientName"
            placeholder="clientName"
            translate="ClosingForm"
            type="text"
            className="text-white"
          />

          <FormTextInput
            form={form}
            name="salesperson_name"
            label="developerSalesName"
            placeholder="developerSalesName"
            translate="ClosingForm"
            type="text"
            className="text-white"
          />
          {/* Sales Number + Country Code */}
          <Label
            className={cn(
              "text-white mb-2",
              form.formState.errors.salesperson_phone && "text-red-500 mb-2"
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
              name="salesperson_phone"
              placeholder="developerSalesNumber"
              translate="ClosingForm"
              type="tel"
              className={cn(
                "text-white",
                isRTL ? "text-right rounded-r-none" : "text-left rounded-l-none"
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  {t("uploadTheReservationForm")}
                </FormLabel>
                <FormControl>
                  <Input
                    ref={(el) => {
                      field.ref(el);
                      fileInputRef.current = el;
                    }}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    name={field.name}
                    className="text-white border-dashed"
                    placeholder="Upload File"
                    onChange={async (e) => addFile(e.target.files?.[0])}
                  />
                </FormControl>
                <p className="text-white">PDF JPG JPEG PNG</p>
                {uploading && <p>Uplaoding...</p>}
                {uploadedFileUrl && <p>{uploadedFileUrl}</p>}
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
