import { isValidLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { ParentsClient } from "./ParentsClient";
import type { Locale } from "@/types";

export default async function ParentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) redirect("/en/parents");
  const locale = rawLocale as Locale;

  return <ParentsClient locale={locale} />;
}
