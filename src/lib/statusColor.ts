export function getStatusColor(status: string) {
  const s = status.toLowerCase();

  if (s === "pending") return "text-orange-500";
  if (s === "accepted") return "text-green-600";
  if (s === "rejected") return "text-red-600";

  return "text-gray-500"; // default
}
