"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Bell } from "lucide-react";
import { LilGeniusLogo } from "@/components/characters/MascotSVG";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/lib/utils/routes";
import type { Locale } from "@/types";

interface NavbarProps {
  locale: Locale;
}

function buildLinks(locale: Locale) {
  return [
    { href: ROUTES.home(locale), label: locale === "fr" ? "Accueil" : "Home" },
    { href: ROUTES.subjects(locale), label: locale === "fr" ? "Matières" : "Subjects" },
    { href: ROUTES.explore(locale), label: locale === "fr" ? "Explorer" : "Explore" },
    { href: ROUTES.dashboard(locale), label: "Dashboard" },
    { href: ROUTES.challenges(locale), label: locale === "fr" ? "Défis" : "Challenges" },
    { href: ROUTES.about(locale), label: locale === "fr" ? "À propos" : "About" },
  ];
}

export function Navbar({ locale }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const links = buildLinks(locale);

  const oppositeLocale: Locale = locale === "en" ? "fr" : "en";
  const langSwitchHref = pathname.replace(`/${locale}`, `/${oppositeLocale}`);

  // Split links: 3 left, 3 right (logo sits in the middle)
  const leftLinks = links.slice(0, 3);
  const rightLinks = links.slice(3);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* ── Top utility bar ─────────────────────────────────────────── */}
      <div className="hidden md:flex items-center justify-between px-8 py-1.5 bg-white border-b border-gray-100">
        {/* Left: tagline */}
        <p className="text-xs text-text/50 font-body">
          {locale === "fr"
            ? "Apprendre. Jouer. Découvrir. Créer."
            : "Learn. Play. Discover. Create."}
        </p>

        {/* Right: language + My Account */}
        <div className="flex items-center gap-2">
          <Link
            href={langSwitchHref}
            className="text-xs font-bold text-text/60 hover:text-primary transition-colors px-2 py-0.5 rounded-full border border-gray-200 hover:border-primary"
          >
            {oppositeLocale.toUpperCase()}
          </Link>
          <Link
            href={ROUTES.login(locale)}
            className="text-xs font-bold text-white bg-coral px-3 py-1 rounded-full hover:brightness-105 transition"
          >
            {locale === "fr" ? "Mon Compte" : "My Account"}
          </Link>
        </div>
      </div>

      {/* ── Main nav row ─────────────────────────────────────────────── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-16 md:h-20 gap-2">

          {/* ── Mobile: hamburger left, logo center, bell right ── */}
          <div className="flex md:hidden items-center justify-between w-full">
            <button
              className="p-2 rounded-2xl hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={22} className="text-text" /> : <Menu size={22} className="text-text" />}
            </button>

            <Link href={ROUTES.home(locale)} aria-label="LilGenius home" className="flex items-center gap-2">
              <LilGeniusLogo size={36} />
              <span className="font-heading font-bold text-xl text-primary">LilGenius</span>
            </Link>

            <Link
              href={ROUTES.login(locale)}
              className="text-xs font-bold text-white bg-coral px-3 py-1.5 rounded-full"
            >
              {locale === "fr" ? "Compte" : "Account"}
            </Link>
          </div>

          {/* ── Desktop: search | left links | logo | right links | get-started ── */}
          <div className="hidden md:flex items-center w-full gap-2">

            {/* Search button */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2.5 rounded-full bg-gray-100 hover:bg-primary/10 text-text/60 hover:text-primary transition-colors shrink-0"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Left nav links */}
            <ul className="flex items-center gap-1 flex-1 justify-end" role="list">
              {leftLinks.map(({ href, label }) => {
                const isActive =
                  href === `/${locale}` || href === `/${locale}/`
                    ? pathname === `/${locale}` || pathname === `/${locale}/`
                    : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "px-3 py-2 rounded-full text-sm font-bold transition-colors whitespace-nowrap",
                        isActive
                          ? "bg-primary text-white"
                          : "text-text hover:bg-primary/10 hover:text-primary"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Logo — centered, oversized, breaks out vertically */}
            <Link
              href={ROUTES.home(locale)}
              aria-label="LilGenius home"
              className="shrink-0 flex flex-col items-center mx-4 relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-lg border-4 border-primary/20 flex items-center justify-center -mt-4">
                  <LilGeniusLogo size={44} />
                </div>
                <span className="font-heading font-bold text-lg text-primary leading-tight mt-0.5">
                  LilGenius
                </span>
              </motion.div>
            </Link>

            {/* Right nav links */}
            <ul className="flex items-center gap-1 flex-1 justify-start" role="list">
              {rightLinks.map(({ href, label }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "px-3 py-2 rounded-full text-sm font-bold transition-colors whitespace-nowrap",
                        isActive
                          ? "bg-primary text-white"
                          : "text-text hover:bg-primary/10 hover:text-primary"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right actions: notifications + Get Started */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={ROUTES.dashboard(locale)}
                className="p-2.5 rounded-full bg-gray-100 hover:bg-primary/10 text-text/60 hover:text-primary transition-colors"
                aria-label="Notifications"
              >
                <Bell size={18} />
              </Link>
              <Link
                href={ROUTES.onboarding(locale)}
                className="px-5 py-2 bg-coral text-white rounded-full text-sm font-bold hover:brightness-105 transition shadow-md shadow-coral/30 whitespace-nowrap"
              >
                {locale === "fr" ? "Commencer" : "Get Started"}
              </Link>
            </div>
          </div>
        </div>

        {/* Search bar dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block overflow-hidden pb-3"
            >
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40" />
                <input
                  type="search"
                  placeholder={locale === "fr" ? "Rechercher des leçons, sujets..." : "Search lessons, subjects..."}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border-2 border-primary/20 bg-gray-50 text-sm text-text placeholder:text-text/40 focus:outline-none focus:border-primary transition-colors"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Mobile dropdown menu ──────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <ul className="flex flex-col p-4 gap-1" role="list">
              {links.map(({ href, label }) => {
                const isActive =
                  href === `/${locale}` || href === `/${locale}/`
                    ? pathname === `/${locale}` || pathname === `/${locale}/`
                    : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "block px-4 py-2.5 rounded-full text-sm font-bold transition-colors",
                        isActive
                          ? "bg-primary text-white"
                          : "text-text hover:bg-primary/10 hover:text-primary"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2 border-t border-gray-100 flex items-center gap-2">
                <Link
                  href={langSwitchHref}
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center px-3 py-2 rounded-full border-2 border-primary/30 text-primary text-sm font-bold"
                >
                  {oppositeLocale.toUpperCase()}
                </Link>
                <Link
                  href={ROUTES.onboarding(locale)}
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center px-4 py-2 bg-coral text-white rounded-full text-sm font-bold"
                >
                  {locale === "fr" ? "Commencer" : "Get Started"}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
