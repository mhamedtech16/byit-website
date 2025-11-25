"use client";

import { History } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { routes } from "@/_lib/routes";
import { ClientCard } from "@/components/ClientCard";
import ModalDemo from "@/components/Modal";
import { SkeletonLoading } from "@/components/SkeletonComponent";
import useCampaigns from "@/hooks/useCampagin";
import useLeads from "@/hooks/useLeads";
import { useIsRTL } from "@/hooks/useRTL";
import { Button } from "@/shadcn/components/ui/button";
import { Label } from "@/shadcn/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shadcn/components/ui/radio-group";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { useAuthStore } from "@/store/authStore";

export default function CampaignLeadsPage() {
  const { currentUser } = useAuthStore();
  const isRTL = useIsRTL();
  const params = useParams();
  const { campaignId } = params;
  const router = useRouter();
  const { leads, loading } = useLeads(currentUser, Number(campaignId));
  const { campaigns } = useCampaigns(currentUser);

  const [openFeedback, setOpenFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("pending");

  const campaign = campaigns?.find((c) => c.id === Number(campaignId));

  const shouldShowSkeleton = loading && (!leads || leads.length === 0);

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

  if (shouldShowSkeleton) return <SkeletonLoading />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {`${isRTL ? campaign?.name_ar : campaign?.name_en} --> My Leads`}
      </h1>

      <>
        {leads?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
            {campaign?.isJoined ? (
              <>
                <History size={100} className="text-app-gray mb-4" />
                <p className="text-red-500 font-semibold text-2xl text-center">
                  No leads found for this campaign.
                </p>
              </>
            ) : (
              <>
                <p className="text-red-500 font-semibold text-2xl text-center">
                  Your not joined this campaign yet.
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
                  Join
                </Button>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {leads?.map((lead) => (
                <ClientCard
                  key={lead.id}
                  name={lead.fullname}
                  phone={lead.phone}
                  status={lead.status}
                  onAddFeedback={() => setOpenFeedback(true)}
                />
              ))}
            </div>
          </>
        )}
      </>

      <ModalDemo isOpen={openFeedback} onClose={() => setOpenFeedback(false)}>
        <div className="p-6 space-y-6 w-full max-w-md">
          <h2 className="text-xl font-bold text-center">Write Feedback</h2>

          {/* Textarea for Feedback */}
          <Textarea
            rows={4}
            placeholder="Write your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          {/* Radio Group for Status Selection */}
          <Label>Status</Label>
          <RadioGroup
            value={status}
            onValueChange={setStatus}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="pending" />
                <Label htmlFor="pending">New</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="interested" id="interested" />
                <Label htmlFor="interested">No Answer</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="done" id="done" />
                <Label htmlFor="done">Sale Done</Label>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-progress" id="in-progress" />
                <Label htmlFor="in-progress">Following</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="closed" id="closed" />
                <Label htmlFor="closed">Disqualified</Label>
              </div>
            </div>
          </RadioGroup>

          {/* Buttons */}
          <div className="flex gap-3 justify-center pt-2">
            <Button className="bg-orangeApp hover:bg-orangeApp/80 text-white">
              Submit
            </Button>
            <Button variant="outline" onClick={() => setOpenFeedback(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </ModalDemo>
    </div>
  );
}
