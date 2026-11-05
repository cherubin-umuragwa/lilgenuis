import { isValidLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { DashboardClient } from "./DashboardClient";
import type { Locale } from "@/types";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) redirect("/en/dashboard");
  const locale = rawLocale as Locale;

  return <DashboardClient locale={locale} />;
}
