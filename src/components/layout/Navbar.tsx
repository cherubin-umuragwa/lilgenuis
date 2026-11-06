"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LilGeniusLogo } from "@/components/characters/MascotSVG";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/lib/utils/routes";
import type { Locale } from "@/types";

interface NavbarProps {
  locale: Locale;
}

export function Navbar({ locale }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const oppositeLocale: Locale = locale === "en" ? "fr" : "en";
  const langSwitchHref = pathname.replace(`/${locale}`, `/${oppositeLocale}`);

  const links = [
    { href: ROUTES.home(locale),       label: locale === "fr" ? "Accueil"  : "Home" },
    { href: ROUTES.subjects(locale),   label: locale === "fr" ? "Matières" : "Subjects" },
    { href: ROUTES.explore(locale),    label: locale === "fr" ? "Explorer" : "Explore" },
    { href: ROUTES.challenges(locale), label: locale === "fr" ? "Défis"    : "Challenges" },
    { href: ROUTES.about(locale),      label: locale === "fr" ? "À propos" : "About" },
  ];

  function isActive(href: string) {
    if (href === `/${locale}` || href === `/${locale}/`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 px-4 pt-3">
      {/* Single compact bar with border-radius */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href={ROUTES.home(locale)}
          aria-label="LilGenius home"
          className="flex items-center gap-2 shrink-0"
        >
          <LilGeniusLogo size={32} />
          <span className="font-heading font-bold text-lg text-primary">LilGenius</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1 flex-1 justify-center" role="list">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-bold transition-all",
                  isActive(href)
                    ? "bg-primary text-white"
                    : "text-text hover:text-primary hover:bg-primary/10"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <Link
            href={langSwitchHref}
            className="px-3 py-1.5 rounded-full border-2 border-primary/20 text-primary text-xs font-bold hover:bg-primary/10 transition"
          >
            {oppositeLocale.toUpperCase()}
          </Link>
          <Link
            href={ROUTES.login(locale)}
            className="px-3 py-1.5 rounded-full border-2 border-text/20 text-text text-sm font-bold hover:bg-gray-100 transition"
          >
            {locale === "fr" ? "Connexion" : "Login"}
          </Link>
          <Link
            href={ROUTES.onboarding(locale)}
            className="px-4 py-1.5 bg-coral text-white rounded-full text-sm font-bold hover:brightness-110 transition shadow-sm"
          >
            {locale === "fr" ? "Commencer" : "Get Started"}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1.5 rounded-xl hover:bg-gray-100 transition"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="max-w-6xl mx-auto mt-2 bg-white rounded-2xl shadow-lg px-4 py-3"
          >
            <ul className="flex flex-col gap-1" role="list">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={cn(
                      "block px-4 py-2 rounded-full text-sm font-bold transition-colors",
                      isActive(href)
                        ? "bg-primary text-white"
                        : "text-text hover:bg-primary/10 hover:text-primary"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
              <Link
                href={langSwitchHref}
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-full border-2 border-primary/20 text-primary text-sm font-bold"
              >
                {oppositeLocale.toUpperCase()}
              </Link>
              <Link
                href={ROUTES.onboarding(locale)}
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2 bg-coral text-white rounded-full text-sm font-bold"
              >
                {locale === "fr" ? "Commencer" : "Get Started"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
