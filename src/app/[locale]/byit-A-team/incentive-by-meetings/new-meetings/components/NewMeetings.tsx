"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { CheckCircle2Icon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { routes } from "@/_lib/routes";
import { newMeetingsFormSchema } from "@/_utils/validation";
import { newMeetingsApi } from "@/Apis/Auth";
import { AlertDialogDemo } from "@/components/Alret";
import { CountryDropdown } from "@/components/CountryCodeDropdown";
import { FormDropdownInput } from "@/components/form/FormDropdownInput";
import { FormTextInput } from "@/components/form/FormTextInput";
import ModalDemo from "@/components/Modal";
import { colors } from "@/constants/colors";
import { useDevelopersAndProjects } from "@/hooks/useDevelopersAndProjects";
import { useIsRTL } from "@/hooks/useRTL";
import { Button } from "@/shadcn/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { DropdownCountry, NewMeetingsRequest } from "@/types/User";

type NewMeetingsFormValues = z.infer<typeof newMeetingsFormSchema>;

const whatsappNumber = "201119377823";

export default function NewMeetings() {
  const router = useRouter();
  const t = useTranslations("NewMeetings");
  const [selectedCountry, setSelectedCountry] =
    useState<DropdownCountry | null>(null);

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const isRTL = useIsRTL();
  const locale = useLocale();

  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { setClsosingFormUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | undefined>("");

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

  const form = useForm<NewMeetingsFormValues>({
    resolver: zodResolver(newMeetingsFormSchema),
    defaultValues: {
      developer: "",
      project: "",
      clientName: "",
      clientPhone: "",
      salesName: "",
      salesPhone: "",
      countryCode: selectedCountry?.countryCode ?? "+20", // Default to Egypt
      uploadFile: undefined,
    },
  });

  // ===== Effect to fetch projects when developer changes =====
  useEffect(() => {
    const developerId = Number(form.watch("developer"));

    form.setValue("project", "");

    if (developerId) {
      fetchProjects(developerId, 1, true);
    } else {
      fetchProjects(undefined, 1, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("developer")]);

  const onSubmit = useCallback(
    async (values: NewMeetingsFormValues) => {
      const payload: NewMeetingsRequest = {
        developer:
          typeof values.developer === "string"
            ? Number(values.developer)
            : values.developer,

        project:
          typeof values.project === "string"
            ? Number(values.project)
            : values.project,

        clientName: values.clientName,
        clientPhone: values.clientPhone,
        clientCountry: selectedCountry?.id ?? 0, // من الـ CountryDropdown

        salesName: values.salesName,
        salesPhone: values.salesPhone,
        salesCountry: selectedCountry?.id ?? 0, // من الـ CountryDropdown
        uploadFile: values.uploadFile,
      };

      setLoading(true);
      setErrorMsg("");
      try {
        const response = await newMeetingsApi(payload, locale);

        if (!response?.data) {
          throw new Error("Invalid response from server");
        }

        if (response?.data) {
          setClsosingFormUser(response.data);
          form.reset({
            developer: "",
            project: "",
            clientName: "",
            clientPhone: "",
            salesName: "",
            salesPhone: "",
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
    [selectedCountry?.id, locale, setClsosingFormUser, form]
  );

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">
        {t("newMeetings")}
      </h1>
      {errorMsg && (
        <h3 className={cn("text-red-500 text-center font-medium mb-4")}>
          {errorMsg}
        </h3>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Developer Dropdown */}
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
            className="text-primary border-primary hover:bg-primary hover:text-white bg-white"
            hasMore={devPages > devPage}
            onLoadMore={(page) => fetchDevelopers(page, false)}
            page={devPage}
            loadingMore={devLoading}
            onClick={() => fetchDevelopers(1, true)}
          />

          {/* Projects Dropdown (from API) */}
          <FormDropdownInput
            form={form}
            name="project"
            label="project"
            title="selectProject"
            titleSearch="searchProject"
            titleLoading="projectLoading"
            translate="ClosingForm"
            className="text-primary border-primary hover:bg-primary hover:text-white bg-white"
            outlineSecoundry
            data={projects}
            width="w-full"
            hasMore={projectPages > projectPage}
            onLoadMore={(page) =>
              fetchProjects(Number(form.watch("developer")), page, false)
            }
            page={projectPage}
            loadingMore={projectsLoading}
          />

          {/* Client Info */}
          <FormTextInput
            form={form}
            name="clientName"
            label="clientName"
            placeholder="clientName"
            translate="ClosingForm"
            type="text"
            className="text-primary border-primary bg-white"
          />

          {/* Client Number + Country Code */}
          <Label
            className={cn(
              "text-primary mb-2",
              form.formState.errors.clientPhone && "text-red-500 mb-2"
            )}
          >
            {t("clientPhone")}
          </Label>
          <div className="flex">
            <CountryDropdown
              onChange={(country) => {
                setSelectedCountry(country);
              }}
              slim={true}
              disabled={false}
              placeholder="Code"
              className="border-primary"
            />
            <FormTextInput
              form={form}
              name="clientPhone"
              placeholder="clientPhone"
              translate="ClosingForm"
              type="tel"
              className={cn(
                "text-primary border-primary bg-white",
                isRTL ? "text-right rounded-r-none" : "text-left rounded-l-none"
              )}
            />
          </div>

          <FormTextInput
            form={form}
            name="salesName"
            label="developerSalesName"
            placeholder="developerSalesName"
            translate="ClosingForm"
            type="text"
            className="text-primary border-primary bg-white"
          />

          {/* Sales Number + Country Code */}
          <Label
            className={cn(
              "text-primary mb-2",
              form.formState.errors.salesPhone && "text-red-500 mb-2"
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
              className="border-primary"
            />
            <FormTextInput
              form={form}
              name="salesPhone"
              placeholder="developerSalesNumber"
              translate="ClosingForm"
              type="tel"
              className={cn(
                "text-primary border-primary bg-white",
                isRTL ? "text-right rounded-r-none" : "text-left rounded-l-none"
              )}
            />
          </div>

          <Button
            type="button"
            className="text-primary border-dashed border-primary bg-white hover:bg-gray-300 border-1 w-full"
            onClick={() => setOpenModal(true)}
          >
            {t("verficationMethod")}
          </Button>
          <p className="text-primary">PDF, JPG, JPEG, PNG</p>
          {fileName && <p className="text-primary">({fileName})</p>}

          <ModalDemo isOpen={openModal} onClose={() => setOpenModal(false)}>
            <h1 className="text-center text-primary font-semibold">
              {t("verficationMethod")}
            </h1>
            <div className="p-16 space-y-7">
              {/* File Upload */}
              <FormField
                control={form.control}
                name="uploadFile"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        ref={(el) => {
                          field.ref(el);
                          fileInputRef.current = el;
                        }}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        name={field.name}
                        className="text-primary border-dashed border-primary border-2 cursor-pointer"
                        placeholder="Upload File"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                          setFileName(file?.name);
                          setOpenModal(false);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Button send to whatsApp */}
              <Link
                href={`https://wa.me/${whatsappNumber}/?text=Hi, محتاج احدد معاد لميتنج علي؟ Zoom`}
                target="_blank"
              >
                <Button type="button" className="w-full">
                  {t("sendToWhatsapp")}
                </Button>
              </Link>
            </div>
          </ModalDemo>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary text-white hover:bg-primary/80"
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
          title="success"
          action="ok"
          translate="NewMeetings"
          onAction={() => router.push(routes.IncentiveByMeetings)}
          contentClassName="items-center justify-center gap-10"
          headerClassName="items-center"
          actionClassName="px-20 text-lg"
          icon={<CheckCircle2Icon size={50} color={colors.primary} />}
        />
      )}
    </div>
  );
}
