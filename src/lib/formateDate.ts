export function formatDate(dateString: string, locale: string) {
  const date = new Date(dateString);

  const day = date.toLocaleDateString(locale, { day: "2-digit" });
  const month = date.toLocaleDateString(locale, { month: "short" });
  const year = date.toLocaleDateString(locale, { year: "numeric" });

  return `${day}-${month}-${year}`;
}
