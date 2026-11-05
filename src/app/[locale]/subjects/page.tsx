import { isValidLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { SubjectsClient } from "./SubjectsClient";
import type { Locale } from "@/types";

export default async function SubjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) redirect("/en/subjects");
  const locale = rawLocale as Locale;

  return <SubjectsClient locale={locale} />;
}
