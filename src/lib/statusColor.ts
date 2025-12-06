export function getStatusColor(status: string | undefined) {
  const s = status?.toLowerCase();

  if (s === "pending") return "text-orange-500";
  if (s === "accepted") return "text-green-600";
  if (s === "rejected") return "text-red-600";
  if (s === "no-answer") return "text-gray-600";
  if (s === "following") return "text-orange-500";
  if (s === "sale-done") return "text-green-600";
  if (s === "not-qualified") return "text-red-600";

  return "text-gray-500"; // default
}
