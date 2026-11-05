import { isValidLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { ProfilePage } from "@/components/profile/ProfilePage";
import type { Locale } from "@/types";

export default async function ProfileRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) redirect("/en/profile");
  const locale = rawLocale as Locale;

  return <ProfilePage locale={locale} />;
}
