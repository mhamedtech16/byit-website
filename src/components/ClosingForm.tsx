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
import { closingFormSchema } from "@/_utils/validation";
import { dealsFormApi, uploadFile } from "@/Apis/v2/usePostApis";
import { colors } from "@/constants/colors";
import { useDevelopersAndProjects } from "@/hooks/useDevelopersAndProjects";
import { useIsRTL } from "@/hooks/useRTL";
import { useVendors } from "@/hooks/useVendors";
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
import { Partners, Projects } from "@/types/PropertiesV2";
import { DealsFormRequest, DropdownCountry } from "@/types/User";

import { AlertDialogDemo } from "./Alret";
import { CountryDropdown } from "./CountryCodeDropdown";
import { FormCurrencyInput } from "./form/FormCurrencyInput";
import { FormDropdownInput } from "./form/FormDropdownInput";
import { FormTextInput } from "./form/FormTextInput";

const OTHER_PROJECT = {
  id: "Other",
  en_name: "Other",
  ar_name: "أخرى",
};

type DealsFormValidation = z.infer<typeof closingFormSchema>;

export default function ClosingForm() {
  const router = useRouter();
  const t = useTranslations("ClosingForm");
  const [selectedCountry, setSelectedCountry] =
    useState<DropdownCountry | null>(null);

  const {
    partners,
    setPartners,
    partnerLoading,
    partnerPage,
    partnerPages,
    fetchPartners,
  } = useVendors();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const isRTL = useIsRTL();
  const locale = useLocale();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const { setClsosingFormUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const {
    developers,
    devPage,
    devPages,
    devLoading,
    fetchDevelopers,

    projects,
    setProjects,
    projectPage,
    projectPages,
    projectsLoading,

    fetchProjects,
  } = useDevelopersAndProjects();

  const form = useForm<DealsFormValidation>({
    resolver: zodResolver(closingFormSchema),
    defaultValues: {
      developer_text: "",
      project_text: "",
      developer: "",
      project: "",
      partner: "",
      client_name: "",
      unit_code: "",
      salesperson_name: "",
      salesperson_phone: "",
      price: "",
      sales_country_code: selectedCountry?.countryCode ?? "+20",
      image: "",
    },
  });

  const selectedProjectId = form.watch("project");
  const proName = selectedProjectId === "Other";

  useEffect(() => {
    if (!selectedProjectId) {
      setPartners([]);
      return;
    }

    const project = projects.find((p) => p.id === selectedProjectId);

    if (selectedProjectId === "Other") {
      // fetchPartners(1, true, 10);
      setPartners(partners);
    } else if (project && (project as Projects).partners) {
      const mappedVendors = project.partners.map((partner: Partners) => ({
        id: partner.id,
        en_name: partner.en_name,
        ar_name: partner.ar_name,
      }));

      setPartners(mappedVendors);
    }

    form.setValue("partner", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProjectId, projects, form]);

  const selectedDeveloperId = form.watch("developer");
  const devName = selectedDeveloperId === "Other";

  // ===== Effect to fetch projects when developer changes =====
  useEffect(() => {
    if (!selectedDeveloperId) {
      setProjects([]);
      setPartners([]);
      form.setValue("project", "");
      form.setValue("partner", "");
      return;
    }

    if (selectedDeveloperId === "Other") {
      setProjects([OTHER_PROJECT]);
      form.setValue("project", "");
      form.setValue("partner", "");
      setPartners([]);
      return;
    }

    if (selectedDeveloperId && selectedDeveloperId !== "Other") {
      fetchProjects(selectedDeveloperId, 1, true);
      form.setValue("project", "");
      form.setValue("partner", "");
      setPartners([]);
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDeveloperId]);

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
    async (values: DealsFormValidation) => {
      const payload: DealsFormRequest = {
        ...values,
        type: "Contracted",
        developer_text:
          values.developer === "Other" ? values.developer_text || "" : "",
        project_text:
          values.project === "Other" ? values.project_text || "" : "",
        partner: values.partner,
        project: values.project === "Other" ? "" : values.project || "",
        developer: values.developer === "Other" ? "" : values.developer || "",
        price:
          typeof values.price === "string"
            ? Number(values.price)
            : values.price,
        salesperson_name: values.salesperson_name,
        salesperson_phone: values.sales_country_code + values.salesperson_phone,
        image: uploadedFileUrl ?? undefined,
      };
      setLoading(true);
      setErrorMsg("");
      try {
        const response = await dealsFormApi(payload, locale);

        if (!response?.data) {
          throw new Error("Invalid response from server");
        }

        if (response?.data) {
          setClsosingFormUser(response.data);
          form.reset({
            developer_text: "",
            project_text: "",
            developer: "",
            project: "",
            partner: "",
            client_name: "",
            unit_code: "",
            salesperson_name: "",
            sales_country_code: "",
            salesperson_phone: "",
            price: "",
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
    [uploadedFileUrl, locale, setClsosingFormUser, form]
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
          {/* Developer Dropdown */}
          {devName ? (
            <FormTextInput
              form={form}
              name="developer_text"
              label="developer"
              placeholder="developer"
              translate="ClosingForm"
              type="text"
              className="text-white selection:bg-black"
            />
          ) : (
            <FormDropdownInput
              form={form}
              name="developer"
              label="developer"
              title="selectDeveloper"
              titleSearch="searchDeveloper"
              titleLoading="developerLoading"
              data={developers}
              width="w-full"
              translate="ClosingForm"
              outlineSecoundry
              className="text-white"
              hasMore={devPages > devPage}
              onLoadMore={(page) => fetchDevelopers(page, false, 10)}
              page={devPage}
              loadingMore={devLoading}
              onClick={() => fetchDevelopers(1, true, 20)}
            />
          )}

          {/* Projects Dropdown (from API) */}
          {proName ? (
            <FormTextInput
              form={form}
              name="project_text"
              label="project"
              placeholder="project"
              translate="ClosingForm"
              type="text"
              className="text-white selection:bg-black"
            />
          ) : (
            <FormDropdownInput
              form={form}
              name="project"
              label="project"
              title="selectProject"
              titleSearch="searchProject"
              titleLoading="projectLoading"
              translate="ClosingForm"
              className="text-white"
              outlineSecoundry
              data={projects}
              disabled={!selectedDeveloperId}
              width="w-full"
              hasMore={projectPages > projectPage}
              onLoadMore={(page) =>
                fetchProjects(form.watch("developer"), page, false)
              }
              page={projectPage}
              loadingMore={projectsLoading}
            />
          )}

          {/* Vendor Dropdown */}
          <FormDropdownInput
            form={form}
            name="partner"
            label="partner"
            title="selectPartner"
            titleSearch="searchPartner"
            titleLoading="partnerLoading"
            data={partners}
            disabled={!selectedProjectId}
            width="w-full"
            translate="ClosingForm"
            className="text-white"
            outlineSecoundry
            hasMore={
              selectedProjectId !== "Other" && partnerPages > partnerPage
            }
            onLoadMore={(page) => fetchPartners(page, 10)}
            page={partnerPage}
            loadingMore={partnerLoading}
            onClick={() => fetchPartners(1, 10)}
          />

          {/* Client Info */}
          <FormTextInput
            form={form}
            name="client_name"
            label="clientName"
            placeholder="clientName"
            translate="ClosingForm"
            type="text"
            className="text-white selection:bg-black"
          />
          <FormTextInput
            form={form}
            name="unit_code"
            label="unitCode"
            placeholder="unitCode"
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

          {/* Deal Value */}
          <FormCurrencyInput
            form={form}
            name="price"
            placeholder="dealValue"
            decimalsLimit={2}
            label="dealValue"
            translate="ClosingForm"
          />

          {/* File Upload */}
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-white text-primary hover:bg-gray-200"
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

      {/* Success Dialog */}
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
