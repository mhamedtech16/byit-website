export const priceArray = () => {
  //  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
  const PriceArr = [];
  for (let i = 1; i <= 150; i++) {
    PriceArr.push(i * 1000000);
  }
  return PriceArr;
};

export const minPrice = Math.min.apply(null, priceArray());

export const maxPrice = Math.max.apply(null, priceArray());

export const currencyFormat = (amount: number) => {
  return Number(amount)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
    .split(".00");
};

export const pricePerLangauge = (number: number | undefined, lang: string) => {
  const num = Intl.NumberFormat(lang == "ar" ? "ar-EG" : "en-EG").format(
    number ?? 0
  );
  return num;
};

export const englishToArabicDigits = (str: string, lang: string) => {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return lang === "ar"
    ? str.replace(/\d/g, (d: string) => arabicDigits[parseInt(d, 10)])
    : str;
};
export const formatAmount = (price: string | number | bigint): string => {
  const numericPrice = typeof price === "string" ? Number(price) : price;

  if (isNaN(Number(numericPrice))) {
    throw new Error("Invalid price: Unable to format the value.");
  }

  return new Intl.NumberFormat("en-IN").format(numericPrice);
};
