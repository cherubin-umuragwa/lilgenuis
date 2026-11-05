import React from "react";
import Link from "next/link";
import { LilGeniusLogo } from "@/components/characters/MascotSVG";
import { ROUTES } from "@/lib/utils/routes";
import type { Locale } from "@/types";

interface FooterProps {
  locale: Locale;
}

const currentYear = new Date().getFullYear();

export function Footer({ locale }: FooterProps) {
  const learn = [
    { label: "Subjects", href: ROUTES.subjects(locale) },
    { label: "Explore", href: ROUTES.explore(locale) },
    { label: "Dashboard", href: ROUTES.dashboard(locale) },
    { label: "Daily Challenges", href: ROUTES.challenges(locale) },
  ];

  const info = [
    { label: "About LilGenius", href: ROUTES.about(locale) },
    { label: "For Parents", href: ROUTES.parents(locale) },
    { label: "For Teachers", href: ROUTES.teachers(locale) },
  ];

  const account = [
    { label: "Log In", href: ROUTES.login(locale) },
    { label: "Get Started", href: ROUTES.onboarding(locale) },
  ];

  return (
    <footer className="bg-text text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href={ROUTES.home(locale)}
              className="flex items-center gap-2 font-heading font-bold text-xl text-white"
              aria-label="LilGenius home"
            >
              <LilGeniusLogo size={32} className="brightness-200" />
              LilGenius
            </Link>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Learn. Play. Discover. Create.
            </p>
            <p className="mt-2 text-sm text-white/50 leading-relaxed max-w-xs">
              An interactive educational universe for children aged 6–12, built
              for families across Africa and the world.
            </p>

            {/* Language selector */}
            <div className="mt-4 flex items-center gap-2">
              <Link
                href={ROUTES.home("en")}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
                  locale === "en"
                    ? "border-white/60 text-white bg-white/10"
                    : "border-white/20 text-white/60 hover:text-white hover:border-white/40"
                }`}
                aria-current={locale === "en" ? "true" : undefined}
              >
                EN
              </Link>
              <Link
                href={ROUTES.home("fr")}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
                  locale === "fr"
                    ? "border-white/60 text-white bg-white/10"
                    : "border-white/20 text-white/60 hover:text-white hover:border-white/40"
                }`}
                aria-current={locale === "fr" ? "true" : undefined}
              >
                FR
              </Link>
            </div>
          </div>

          {/* Learn column */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white/60 mb-4">
              Learn
            </h3>
            <ul className="space-y-2" role="list">
              {learn.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/75 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info column */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white/60 mb-4">
              Info
            </h3>
            <ul className="space-y-2" role="list">
              {info.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/75 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account column */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white/60 mb-4">
              Account
            </h3>
            <ul className="space-y-2" role="list">
              {account.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/75 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            &copy; {currentYear} LilGenius. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Designed for children across Africa and the world.
          </p>
        </div>
      </div>
    </footer>
  );
}
