import { isValidLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { ExploreClient } from "./ExploreClient";
import type { Locale } from "@/types";

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) redirect("/en/explore");
  const locale = rawLocale as Locale;

  return <ExploreClient locale={locale} />;
}
