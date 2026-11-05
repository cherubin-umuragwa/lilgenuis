import { isValidLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { RegisterClient } from "./RegisterClient";
import type { Locale } from "@/types";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) redirect("/en/register");
  const locale = rawLocale as Locale;

  return <RegisterClient locale={locale} />;
}
