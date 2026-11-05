import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { isValidLocale, getTranslations, supportedLocales } from "@/lib/i18n";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    redirect("/en");
  }

  const locale = rawLocale as Locale;

  // Pre-load translations (available to children via props or context if needed)
  await getTranslations(locale);

  return (
    <>
      <Suspense fallback={<div className="h-16 bg-white border-b border-gray-100" />}>
        <Navbar locale={locale} />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
