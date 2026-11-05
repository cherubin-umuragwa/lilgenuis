import { isValidLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { SubjectDetailClient } from "./SubjectDetailClient";
import type { Locale } from "@/types";

export const instant = false;

export default async function SubjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; subjectId: string }>;
}) {
  const { locale: rawLocale, subjectId } = await params;
  if (!isValidLocale(rawLocale)) redirect("/en/subjects");
  const locale = rawLocale as Locale;

  return <SubjectDetailClient locale={locale} subjectId={subjectId} />;
}
