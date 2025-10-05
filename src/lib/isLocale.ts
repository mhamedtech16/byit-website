type Locale = "ar" | "en";

export function isLocale(value: string): value is Locale {
  return ["ar", "en"].includes(value);
}
