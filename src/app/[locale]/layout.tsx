import { dir } from "i18next";
import { NextIntlClientProvider } from "next-intl";

import HydrationGate from "@/_utils/HydrationGate";
import Footer from "@/components/Footer";
// eslint-disable-next-line import/order
import { NavigationMenuDemo } from "@/components/Navigation";
import "../../lib/FontIcons";
import "./globals.css";

import ScrollUpButton from "@/components/ScrollUpButton";
import { isLocale } from "@/lib/isLocale";
import { siteConfig } from "@/lib/siteConfig";

import OnlineGuard from "./RootLayout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const locales = isLocale(locale) ? locale : "en"; // هنا مضمونة
  const config = siteConfig[locales];

  return {
    title: {
      default: config.name,
      template: `%s | ${config.name}`,
    },
    description: config.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <NextIntlClientProvider>
            <HydrationGate>
              <OnlineGuard>
                <NavigationMenuDemo />
                <main className="pt-[11vmin] flex-1">
                  {children}
                  <ScrollUpButton />
                </main>
                <Footer />
              </OnlineGuard>
            </HydrationGate>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
