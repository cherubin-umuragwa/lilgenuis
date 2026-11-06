"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
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

  const leftLinks = [
    { href: ROUTES.home(locale),     label: locale === "fr" ? "Accueil"  : "Home" },
    { href: ROUTES.subjects(locale), label: locale === "fr" ? "Matières" : "Subjects" },
    { href: ROUTES.explore(locale),  label: locale === "fr" ? "Explorer" : "Explore" },
    { href: ROUTES.dashboard(locale),label: "Dashboard" },
  ];

  const rightLinks = [
    { href: ROUTES.challenges(locale), label: locale === "fr" ? "Défis"     : "Challenges" },
    { href: ROUTES.about(locale),      label: locale === "fr" ? "À propos"  : "About" },
    { href: ROUTES.parents(locale),    label: locale === "fr" ? "Parents"   : "Parents" },
    { href: ROUTES.teachers(locale),   label: locale === "fr" ? "Enseignants" : "Teachers" },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  function isActive(href: string) {
    if (href === `/${locale}` || href === `/${locale}/`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">

      {/* ── Top utility bar ── */}
      <div className="bg-text text-white text-xs font-body px-6 py-1.5 flex items-center justify-between">
        <span className="text-white/60">
          {locale === "fr" ? "Apprendre. Jouer. Découvrir. Créer." : "Learn. Play. Discover. Create."}
        </span>
        <div className="flex items-center gap-3">
          <Link
            href={langSwitchHref}
            className="font-bold text-white/70 hover:text-white transition-colors"
          >
            {oppositeLocale.toUpperCase()}
          </Link>
          <Link
            href={ROUTES.login(locale)}
            className="bg-coral text-white font-bold px-4 py-1 rounded-full hover:brightness-110 transition"
          >
            {locale === "fr" ? "Mon Compte" : "My Account"}
          </Link>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="hidden md:block w-full bg-white"
      >
        <div className="max-w-screen-xl mx-auto px-6 flex items-center h-20">

          {/* Left links */}
          <ul className="flex items-center gap-1 flex-1" role="list">
            {leftLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-bold transition-all",
                    isActive(href)
                      ? "bg-primary text-white shadow-md"
                      : "text-text hover:text-primary hover:bg-primary/10"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Centered oversized logo ── */}
          <Link
            href={ROUTES.home(locale)}
            aria-label="LilGenius home"
            className="flex flex-col items-center mx-6 shrink-0 group"
          >
            <motion.div
              whileHover={{ scale: 1.07 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              className="flex flex-col items-center"
            >
              {/* Logo badge — breaks above the nav bar */}
              <div className="relative -mt-10 w-20 h-20 rounded-full bg-white border-4 border-primary shadow-xl flex items-center justify-center">
                <LilGeniusLogo size={52} />
              </div>
              {/* Brand name below badge */}
              <span className="mt-1 font-heading font-bold text-base text-primary tracking-wide">
                LilGenius
              </span>
            </motion.div>
          </Link>

          {/* Right links + actions */}
          <ul className="flex items-center gap-1 flex-1 justify-end" role="list">
            {rightLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-bold transition-all",
                    isActive(href)
                      ? "bg-primary text-white shadow-md"
                      : "text-text hover:text-primary hover:bg-primary/10"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* Divider */}
            <li aria-hidden className="w-px h-5 bg-gray-200 mx-2" />

            {/* Get Started CTA */}
            <li>
              <Link
                href={ROUTES.onboarding(locale)}
                className="px-5 py-2.5 bg-coral text-white rounded-full text-sm font-bold shadow-md shadow-coral/30 hover:brightness-110 transition-all whitespace-nowrap"
              >
                {locale === "fr" ? "Commencer" : "Get Started"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Search strip below main nav */}
        <div className="border-t border-gray-100 px-6 py-2">
          <div className="max-w-screen-xl mx-auto">
            <div className="relative w-full max-w-lg">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text/40 pointer-events-none" />
              <input
                type="search"
                placeholder={locale === "fr" ? "Rechercher des leçons, sujets, défis..." : "Search lessons, subjects, challenges..."}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm text-text placeholder:text-text/40 focus:outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile nav ── */}
      <nav
        role="navigation"
        aria-label="Mobile navigation"
        className="md:hidden bg-white border-t border-gray-100"
      >
        <div className="flex items-center justify-between px-4 h-16">
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded-2xl hover:bg-gray-100 transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link href={ROUTES.home(locale)} className="flex items-center gap-2">
            <LilGeniusLogo size={34} />
            <span className="font-heading font-bold text-lg text-primary">LilGenius</span>
          </Link>

          {/* Get Started */}
          <Link
            href={ROUTES.onboarding(locale)}
            className="px-4 py-2 bg-coral text-white rounded-full text-xs font-bold"
          >
            {locale === "fr" ? "Commencer" : "Get Started"}
          </Link>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden border-t border-gray-100 bg-white shadow-lg"
            >
              {/* Mobile search */}
              <div className="px-4 pt-3 pb-1">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40" />
                  <input
                    type="search"
                    placeholder={locale === "fr" ? "Rechercher..." : "Search..."}
                    className="w-full pl-8 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <ul className="flex flex-col p-3 gap-0.5" role="list">
                {allLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive(href) ? "page" : undefined}
                      className={cn(
                        "block px-4 py-2.5 rounded-full text-sm font-bold transition-colors",
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

              <div className="px-4 pb-4 flex gap-2 border-t border-gray-100 pt-3">
                <Link
                  href={langSwitchHref}
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-full border-2 border-primary/30 text-primary text-sm font-bold"
                >
                  {oppositeLocale.toUpperCase()}
                </Link>
                <Link
                  href={ROUTES.login(locale)}
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2 bg-coral text-white rounded-full text-sm font-bold"
                >
                  {locale === "fr" ? "Mon Compte" : "My Account"}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
