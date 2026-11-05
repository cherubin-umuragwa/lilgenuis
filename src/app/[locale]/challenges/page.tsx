import { isValidLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { ChallengesClient } from "./ChallengesClient";
import type { Locale } from "@/types";

export default async function ChallengesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) redirect("/en/challenges");
  const locale = rawLocale as Locale;

  return <ChallengesClient locale={locale} />;
}
