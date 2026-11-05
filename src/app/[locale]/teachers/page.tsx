import { isValidLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { TeachersClient } from "./TeachersClient";
import type { Locale } from "@/types";

export default async function TeachersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) redirect("/en/teachers");
  const locale = rawLocale as Locale;

  return <TeachersClient locale={locale} />;
}
