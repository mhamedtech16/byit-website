"use client";

import { useParams } from "next/navigation";

import { SkeletonLoading } from "@/components/SkeletonComponent";
import usePropertiesDetails from "@/hooks/usePropertiesDetails";
import { useAuthStore } from "@/store/authStore";

import PropertyDetailsListItem from "../components/PropertyDetailsListItem";

const PropertyDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuthStore();
  const { property, loading, error } = usePropertiesDetails(
    currentUser,
    Number(id)
  );

  if (loading) {
    return <SkeletonLoading />;
  }

  if (error) {
    return error;
  }

  return (
    <>
      <PropertyDetailsListItem item={property} />
    </>
  );
};

export default PropertyDetails;
