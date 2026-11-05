import { isValidLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { LoginClient } from "./LoginClient";
import type { Locale } from "@/types";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) redirect("/en/login");
  const locale = rawLocale as Locale;

  return <LoginClient locale={locale} />;
}
