import { isValidLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { QuizPageClient } from "./QuizPageClient";
import type { Locale } from "@/types";

export const instant = false;

export default async function QuizPage({
  params,
}: {
  params: Promise<{ locale: string; subjectId: string; lessonId: string }>;
}) {
  const { locale: rawLocale, subjectId, lessonId } = await params;
  if (!isValidLocale(rawLocale)) redirect("/en/subjects");
  const locale = rawLocale as Locale;

  return (
    <QuizPageClient locale={locale} subjectId={subjectId} lessonId={lessonId} />
  );
}
