import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { isValidLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import type { Locale } from "@/types";

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) redirect("/en/onboarding");
  const locale = rawLocale as Locale;

  return <OnboardingWizard locale={locale} />;
}
