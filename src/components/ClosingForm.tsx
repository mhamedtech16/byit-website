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
import { closingFormApi } from "@/Apis/Auth";
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
import {
  ClosignFormRequest,
  DropdownCountry,
  DropdownVendors,
} from "@/types/User";

import { AlertDialogDemo } from "./Alret";
import { CountryDropdown } from "./CountryCodeDropdown";
import { FormCurrencyInput } from "./form/FormCurrencyInput";
import { FormDropdownInput } from "./form/FormDropdownInput";
import { FormTextInput } from "./form/FormTextInput";
import ModalDemo from "./Modal";

type ClosingFormValues = z.infer<typeof closingFormSchema>;

export default function ClosingForm() {
  const router = useRouter();
  const t = useTranslations("ClosingForm");
  const [selectedCountry, setSelectedCountry] =
    useState<DropdownCountry | null>(null);

  const { vendors } = useVendors();
  const [part, setPart] = useState<DropdownVendors[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const isRTL = useIsRTL();
  const locale = useLocale();

  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const { setClsosingFormUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    developers,
    devPage,
    devPages,
    devLoading,
    fetchDevelopers,

    projects,
    projectPage,
    projectPages,
    projectsLoading,

    fetchProjects,
  } = useDevelopersAndProjects();

  const form = useForm<ClosingFormValues>({
    resolver: zodResolver(closingFormSchema),
    defaultValues: {
      developerName: "",
      projectName: "",
      developer: "",
      project: "",
      vendor: "",
      clientName: "",
      unitCode: "",
      developerSalesName: "",
      developerSalesNumber: "",
      dealValue: "",
      countryCode: selectedCountry?.countryCode ?? "+20", // Default to Egypt
      uploadFile: undefined,
    },
  });

  const devName = form.watch("developer");
  const isSelected = developers.find((el) => String(el.id) === String(devName));
  const isSelectedOther = isSelected?.name === "Other";

  const proName = form.watch("project");
  const isSelectedPro = projects.find((id) => id.id === proName);
  const isSelectedProOther = isSelectedPro?.name === "Other";

  const selectedProjectId = form.watch("project");

  const selectedProject = projects.find(
    (p) => String(p.id) === String(selectedProjectId),
  );

  useEffect(() => {
    if (isSelectedProOther) {
      setPart(vendors);
    } else {
      const filterd = vendors.filter((pv) =>
        selectedProject?.vendors.some(
          (v) => String(v.vendor) === String(pv.id),
        ),
      );
      setPart(filterd);
    }
  }, [isSelectedProOther, selectedProject?.vendors, vendors]);

  // ===== Effect to fetch projects when developer changes =====
  useEffect(() => {
    const developerId = Number(form.watch("developer"));
    form.setValue("project", "");

    if (developerId) {
      fetchProjects("", developerId, 1, true);
    } else {
      fetchProjects("", undefined, 1, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("developer")]);

  const onSubmit = useCallback(
    async (values: ClosingFormValues) => {
      const payload: ClosignFormRequest = {
        ...values,
        type: "CONTRACTED",
        developerName: isSelectedOther
          ? values.developerName
          : values.developerName,
        projectName: isSelectedProOther
          ? values.projectName
          : values.projectName,
        developer:
          typeof values.developer === "string"
            ? Number(values.developer)
            : values.developer,
        project:
          typeof values.project === "string"
            ? Number(values.project)
            : values.project,
        vendor:
          typeof values.vendor === "string"
            ? Number(values.vendor)
            : values.vendor,
        dealValue:
          typeof values.dealValue === "string"
            ? Number(values.dealValue)
            : values.dealValue,
        salesCountry: selectedCountry?.id ?? 0,
        clientCountry: 50,
        uploadFile: values.uploadFile,
      };

      setLoading(true);
      setErrorMsg("");
      try {
        const response = await closingFormApi(payload, locale);
        if (!response?.data) {
          throw new Error("Invalid response from server");
        }

        if (response?.data) {
          setClsosingFormUser(response.data);
          form.reset({
            developerName: "",
            projectName: "",
            developer: "",
            project: "",
            vendor: "",
            clientName: "",
            unitCode: "",
            developerSalesName: "",
            developerSalesNumber: "",
            dealValue: "",
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
    [
      selectedCountry?.id,
      isSelectedOther,
      isSelectedProOther,
      locale,
      setClsosingFormUser,
      form,
    ],
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

          {isSelectedOther ? (
            <FormTextInput
              form={form}
              name="developerName"
              label="developerName"
              placeholder="developerName"
              translate="ClosingForm"
              type="text"
              className="text-white"
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
              onLoadMore={(page, refresh, search) =>
                fetchDevelopers(page, refresh, search)
              }
              page={devPage}
              loadingMore={devLoading}
              onClick={() => fetchDevelopers(1, true, "")}
            />
          )}

          {/* Projects Dropdown (from API) */}
          {isSelectedProOther ? (
            <ModalDemo
              isOpen={isSelectedProOther}
              onClose={() => !isSelectedProOther}
            >
              <FormTextInput
                form={form}
                name="projectName"
                label="projectName"
                placeholder="projectName"
                translate="ClosingForm"
                type="text"
                className="text-white"
              />
            </ModalDemo>
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
              disabled={!isSelected}
              width="w-full"
              hasMore={projectPages > projectPage}
              onLoadMore={(page, refresh, search) =>
                fetchProjects(
                  search,
                  Number(form.watch("developer")),
                  page,
                  false,
                )
              }
              page={projectPage}
              loadingMore={projectsLoading}
            />
          )}

          {/* Vendor Dropdown */}
          <FormDropdownInput
            form={form}
            name="vendor"
            label="partner"
            title="selectPartner"
            titleSearch="searchPartner"
            titleLoading="partnerLoading"
            data={part}
            disabled={!isSelectedPro}
            width="w-full"
            translate="ClosingForm"
            className="text-white"
            outlineSecoundry
          />

          {/* Client Info */}
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
            name="unitCode"
            label="unitCode"
            placeholder="unitCode"
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

          {/* Sales Number + Country Code */}
          <Label
            className={cn(
              "text-white mb-2",
              form.formState.errors.developerSalesNumber && "text-red-500 mb-2",
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
              className={cn(
                "text-white",
                isRTL
                  ? "text-right rounded-r-none"
                  : "text-left rounded-l-none",
              )}
            />
          </div>

          {/* Deal Value */}
          <FormCurrencyInput
            form={form}
            name="dealValue"
            placeholder="dealValue"
            decimalsLimit={2}
            label="dealValue"
            translate="ClosingForm"
          />

          {/* File Upload */}
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
                      field.ref(el);
                      fileInputRef.current = el;
                    }}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    name={field.name}
                    className="text-white border-dashed"
                    placeholder="Upload File"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <p className="text-white">PDF JPG JPEG PNG</p>
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
