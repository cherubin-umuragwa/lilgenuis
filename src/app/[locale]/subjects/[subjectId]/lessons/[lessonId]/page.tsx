import { isValidLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { LessonPageClient } from "./LessonPageClient";
import type { Locale } from "@/types";

export const instant = false;

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: string; subjectId: string; lessonId: string }>;
}) {
  const { locale: rawLocale, subjectId, lessonId } = await params;
  if (!isValidLocale(rawLocale)) redirect("/en/subjects");
  const locale = rawLocale as Locale;

  return (
    <LessonPageClient locale={locale} subjectId={subjectId} lessonId={lessonId} />
  );
}
