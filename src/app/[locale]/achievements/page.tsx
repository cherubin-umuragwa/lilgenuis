import { isValidLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { AchievementsClient } from "./AchievementsClient";
import type { Locale } from "@/types";

export default async function AchievementsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) redirect("/en/achievements");
  const locale = rawLocale as Locale;

  return <AchievementsClient locale={locale} />;
}
