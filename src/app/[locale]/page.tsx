import { AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/landing/HeroSection";
import { SubjectPreviewSection } from "@/components/landing/SubjectPreviewSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturedActivitiesSection } from "@/components/landing/FeaturedActivitiesSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { CTASection } from "@/components/landing/CTASection";
import { isValidLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import type { Locale } from "@/types";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) redirect("/en");
  const locale = rawLocale as Locale;

  return (
    <AnimatePresence>
      <div>
        <HeroSection locale={locale} />
        <SubjectPreviewSection locale={locale} />
        <HowItWorksSection />
        <FeaturedActivitiesSection locale={locale} />
        <BenefitsSection />
        <CTASection locale={locale} />
      </div>
    </AnimatePresence>
  );
}
