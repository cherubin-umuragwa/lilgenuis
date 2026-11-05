import { isValidLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { AboutClient } from "./AboutClient";
import type { Locale } from "@/types";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) redirect("/en/about");
  const locale = rawLocale as Locale;
  void locale;

  return <AboutClient />;
}
