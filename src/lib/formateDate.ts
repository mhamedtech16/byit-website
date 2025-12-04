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

function formatDatesAsYearMonthDay(dateString: Date, locale: string) {
  const date = new Date(dateString);

  const yearMonthDay = dayjs(date).locale(locale).utc().format("YYYY-MM-DD");

  return yearMonthDay;
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

  const startDate = new Date(Number(year), monthIndex, 1);
  const endDate = new Date(Number(year), monthIndex + 1, 0);

  return {
    startDate: formatDatesAsYearMonthDay(startDate, locale),
    endDate: formatDatesAsYearMonthDay(endDate, locale),
  };
};
