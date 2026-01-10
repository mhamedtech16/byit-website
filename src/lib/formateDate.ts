import dayjs from "dayjs";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(localeData);

export function formatDate(dateString: string, locale: string) {
  const date = new Date(dateString);

  const day = date.toLocaleDateString(locale, { day: "2-digit" });
  const month = date.toLocaleDateString(locale, { month: "short" });
  const year = date.toLocaleDateString(locale, { year: "numeric" });

  return `${day}-${month}-${year}`;
}

export const getMonthRange = (monthYear: string, locale: string) => {
  const localeDataObj = dayjs.localeData();
  const months = localeDataObj.months();

  const monthMap = months.reduce((acc, name, index) => {
    acc[name] = index;
    return acc;
  }, {} as Record<string, number>);

  const [monthText, year] = monthYear.trim().split(/\s+/);
  const monthIndex = monthMap[monthText];

  const baseDate = dayjs(`${year}-${monthIndex + 1}-01`).locale(locale);

  return {
    startDate: baseDate.startOf("month").format("YYYY-MM-DD"),
    endDate: baseDate.endOf("month").format("YYYY-MM-DD"),
  };
};
