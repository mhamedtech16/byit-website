"use client";

import { History, SlashIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "use-intl";

import { routes } from "@/_lib/routes";
import {
  createFeedbackApi,
  deleteFeedbackApi,
  updateFeedbackApi,
} from "@/Apis/Auth";
import useGetApis from "@/Apis/useGetApis";
import { FeedbackList } from "@/components/FeedbackList";
import { LeadList } from "@/components/LeadList";
import ModalDemo from "@/components/Modal";
import { SkeletonLoading } from "@/components/SkeletonComponent";
import useCampaigns from "@/hooks/useCampagin";
import useLeads from "@/hooks/useLeads";
import { useIsRTL } from "@/hooks/useRTL";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/shadcn/components/ui/breadcrumb";
import { Button } from "@/shadcn/components/ui/button";
import { Label } from "@/shadcn/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shadcn/components/ui/radio-group";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { useAuthStore } from "@/store/authStore";
import { Feedback, Leads } from "@/types/Campaigns";
import { CreateFeedback } from "@/types/User";

export default function CampaignLeadsPage() {
  const { currentUser } = useAuthStore();
  const isRTL = useIsRTL();
  const locale = useLocale();
  const params = useParams();
  const t = useTranslations();
  const { campaignId } = params;
  const router = useRouter();

  // Get Leads
  const { leads: apiLeads, loading } = useLeads(
    currentUser,
    Number(campaignId)
  );
  const [leads, setLeads] = useState<Leads[] | null>(apiLeads);
  ///

  // Get Campiagns
  const { campaigns } = useCampaigns(currentUser);

  // Loading feedback
  const [loadingFeedback, setLoadingFeedBack] = useState(false);

  // Delete Feedback by ID
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Edit Mode for Edit feedback
  const [editMode, setEditMode] = useState(false);

  // Get Current feedback ID
  const [currentFeedbackId, setCurrentFeedbackId] = useState<
    number | undefined
  >(undefined);

  // Error Message if user not fill the form
  const [errorMessage, setErrorMessage] = useState("");

  // Open Feedback Form
  const [openFeedbackForm, setOpenFeedbackForm] = useState(false);

  // Open Feedback List
  const [openFeedback, setOpenFeedback] = useState(false);

  // Feedback Textarea and stauts Radio button
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  ////

  // Get Lead by ID
  const [selectedLeadId, setSelectedLeadId] = useState<number | undefined>(
    undefined
  );

  // Call API get Feedback
  const { getFeedbackApi } = useGetApis();

  // Feedbacks Array to set it in feedback list page
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  // Select Campiagn By ID to get Lead if he is Joined
  const campaign = campaigns?.find((c) => c.id === Number(campaignId));

  // Check if the Lead has SALE-DONE or not
  const saleDone = selectedLeadId
    ? leads?.find((l) => l.id === selectedLeadId)?.status === "SALE-DONE"
    : false;

  // console.log(createFeedbackApi([], "ar", id));
  // console.log(feedbacks);
  const shouldShowSkeleton = loading && (!leads || leads.length === 0);

  useEffect(() => {
    setLeads(apiLeads);
  }, [apiLeads]);

  // Get Lead ID
  useEffect(() => {
    if (selectedLeadId) {
      const selected = leads?.find((l) => l.id === selectedLeadId);
      setStatus(selected?.status);
    }
  }, [selectedLeadId, leads]);
  console.log("selected lead id", selectedLeadId);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handleBack = () => {
      router.replace(routes.LeadGenration.Root);
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [router]);

  // Create Feedback
  const addFeedback = useCallback(
    async (id: number | undefined) => {
      const payload: CreateFeedback = {
        notes: feedback,
        status: status,
      };
      setErrorMessage("");
      console.log("Succes");

      createFeedbackApi(payload, locale, id)
        .then(() => {
          if (feedback !== "" && status !== "") {
            setLeads((prev: Leads[] | null) => {
              if (!prev) return prev;

              return prev.map((lead) =>
                lead.id === selectedLeadId ? { ...lead, status } : lead
              );
            });
            setOpenFeedbackForm(false);
            setFeedback("");
            setStatus("");
          }
        })
        .catch(() => setErrorMessage(t("feedback_status_required")));
    },
    [feedback, locale, selectedLeadId, status, t]
  );

  // (Edit, Update) Feedback
  const editFeedback = useCallback(
    async (id: number | undefined) => {
      const payload: CreateFeedback = {
        notes: feedback,
        status: status,
      };
      setErrorMessage("");
      console.log("Succes");

      updateFeedbackApi(payload, locale, id)
        .then(() => {
          if (feedback !== "" && status !== "") {
            setFeedbacks((prev: Feedback[]) => {
              if (!prev) return prev;

              return prev.map((f) =>
                f.id === currentFeedbackId
                  ? {
                      ...f,
                      status,
                      notes: feedback,
                      createdAt: new Date().toLocaleString(locale, {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }),
                    }
                  : f
              );
            });
            setOpenFeedbackForm(false);
            setFeedback("");
            setStatus("");
          }
        })
        .catch(() => setErrorMessage(t("feedback_status_required")));
    },
    [currentFeedbackId, feedback, locale, status, t]
  );

  // Delete Feedback By ID
  const deleteFeedback = useCallback(async (id: number | undefined) => {
    if (!id) return;
    setDeletingId(id);

    await deleteFeedbackApi(id)
      .then((res) => {
        if (res) {
          setFeedbacks((prev) => prev.filter((f) => f.id !== id));
        }
      })
      .catch((err) => err)
      .finally(() => {
        setDeletingId(null);
      });
  }, []);

  // Open Edit Mode Feedback to edit the feedback form
  const openEditFeedback = (id: number | undefined) => {
    setEditMode(true);

    const selected = feedbacks.find((f) => f.id === id);
    setCurrentFeedbackId(selected?.id);
    setFeedback(selected?.notes || "");
    setStatus(selected?.status || "");

    setOpenFeedbackForm(true);
  };

  // Get Feedbacks
  const getFeedbacks = useCallback(
    async (id: number | undefined) => {
      setOpenFeedback(true);
      setLoadingFeedBack(true);
      getFeedbackApi(currentUser, id)
        .then((res) => setFeedbacks(res.data.data))
        .catch((err) => console.log(err))
        .finally(() => {
          setLoadingFeedBack(false);
        });
    },
    [currentUser, getFeedbackApi]
  );

  if (shouldShowSkeleton) return <SkeletonLoading />;
  if (loadingFeedback) return <SkeletonLoading />;

  return (
    <div>
      <div className="flex items-center mb-6">
        {/* Breadcrumb for leads when the user inside feedbacks */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-2xl font-bold">
                {`${isRTL ? campaign?.name_ar : campaign?.name_en}`}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <SlashIcon />
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => setOpenFeedback(false)}
                className={`text-2xl font-bold  cursor-pointer ${
                  !openFeedback
                    ? "text-2xl font-bold text-orangeApp"
                    : " text-primary"
                } ${isRTL ? "mr-1" : "ml-1"}`}
              >
                {`${t("my_leads_title")}`}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {openFeedback && (
              <>
                <SlashIcon />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={() => getFeedbacks(selectedLeadId)}
                    className={`text-2xl font-bold ml-1 cursor-pointer ${
                      openFeedback
                        ? " text-orangeApp"
                        : "bg-gray-200 text-primary"
                    } ${isRTL ? "mr-1" : "ml-1"}`}
                  >
                    {`${t("feedback_list")}`}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <>
        {leads?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
            {campaign?.isJoined ? (
              <>
                <History size={100} className="text-app-gray mb-4" />
                <p className="text-red-500 font-semibold text-2xl text-center">
                  {t("no_leads_found")}
                </p>
              </>
            ) : (
              <>
                <p className="text-red-500 font-semibold text-2xl text-center">
                  {t("not_joined_campaign")}
                </p>
                <Button
                  className="bg-primary text-white"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${campaign?.whatsappNumber}`,
                      "_blank"
                    )
                  }
                >
                  {t("join")}
                </Button>
              </>
            )}
          </div>
        ) : (
          <>
            {openFeedback ? (
              <>
                {feedbacks.length === 0 ? (
                  <div className="flex flex-col justify-center items-center h-[60vh] space-y-6">
                    <History size={100} className="text-app-gray mb-4" />
                    <p className="text-red-500 font-semibold text-2xl text-center">
                      {t("noFeedbacks")}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {feedbacks?.map((f) => (
                      <FeedbackList
                        key={f.id}
                        notes={f.notes}
                        status={f.status}
                        createAt={f.createdAt}
                        isDeleting={deletingId === f.id}
                        updateFeedback={() => openEditFeedback(f.id)}
                        deleteFeedback={() => deleteFeedback(f.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {leads?.map((lead) => (
                  <LeadList
                    key={lead.id}
                    name={lead.fullname}
                    phone={lead.phone}
                    status={lead.status}
                    onAddFeedback={() => {
                      setSelectedLeadId(lead.id);
                      setOpenFeedbackForm(true);
                    }}
                    openFeedback={() => {
                      getFeedbacks(lead.id);
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </>

      <ModalDemo
        isOpen={openFeedbackForm}
        onClose={() => {
          setOpenFeedbackForm(false);
          setEditMode(false);
          setCurrentFeedbackId(undefined);
          setSelectedLeadId(undefined);
          setFeedback("");
          setStatus("");
        }}
      >
        <div className="p-6 space-y-6 w-full max-w-md">
          <h2 className="text-xl font-bold text-center">
            {t("write_feedback")}
          </h2>

          <p className="text-red-500">{errorMessage}</p>
          {/* Textarea for Feedback */}
          <Textarea
            rows={4}
            placeholder={t("feedback_placeholder")}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={saleDone}
          />

          {/* Radio Group for Status Selection */}
          <Label>{t("status")}</Label>
          <RadioGroup
            value={status}
            onValueChange={(value) => setStatus(value)}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  disabled={saleDone}
                  value="PENDING"
                  id="PENDING"
                />
                <Label htmlFor="NO-ANSWER">{t("new")}</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  disabled={saleDone}
                  value="NO-ANSWER"
                  id="NO-ANSWER"
                />
                <Label htmlFor="NO-ANSWER">{t("no_answer")}</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SALE-DONE" id="SALE-DONE" />
                <Label htmlFor="SALE-DONE">{t("sale_done")}</Label>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  disabled={saleDone}
                  value="FOLLOWING"
                  id="FOLLOWING"
                />
                <Label htmlFor="FOLLOWING">{t("following")}</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  disabled={saleDone}
                  value="NOT-QUALIFIED"
                  id="NOT-QUALIFIED"
                />
                <Label htmlFor="NOT-QUALIFIED">{t("not_qualified")}</Label>
              </div>
            </div>
          </RadioGroup>
          {saleDone && (
            <p className="text-red-700 font-medium text-sm">
              {t("feedback_blocked_sale_done")}
            </p>
          )}
          {/* Buttons */}
          <div className="flex gap-3 justify-center pt-2">
            <Button
              className="bg-orangeApp hover:bg-orangeApp/80 text-white"
              onClick={() =>
                editMode
                  ? editFeedback(currentFeedbackId)
                  : addFeedback(selectedLeadId)
              }
              disabled={saleDone}
            >
              {t("submit")}
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpenFeedbackForm(false)}
            >
              {t("cancel")}
            </Button>
          </div>
        </div>
      </ModalDemo>
    </div>
  );
}
