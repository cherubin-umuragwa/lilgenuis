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

interface NavLink {
  href: string;
  label: string;
}

function buildLinks(locale: Locale): NavLink[] {
  return [
    { href: ROUTES.home(locale), label: "Home" },
    { href: ROUTES.subjects(locale), label: "Subjects" },
    { href: ROUTES.explore(locale), label: "Explore" },
    { href: ROUTES.dashboard(locale), label: "Dashboard" },
    { href: ROUTES.challenges(locale), label: "Challenges" },
  ];
}

export function Navbar({ locale }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const links = buildLinks(locale);

  const oppositeLocale: Locale = locale === "en" ? "fr" : "en";
  const langSwitchHref = pathname.replace(`/${locale}`, `/${oppositeLocale}`);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
      >
        {/* Logo */}
        <Link
          href={ROUTES.home(locale)}
          className="flex items-center gap-2 font-heading font-bold text-xl text-primary"
          aria-label="LilGenius home"
        >
          <LilGeniusLogo size={34} />
          <span className="hidden sm:inline">LilGenius</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {links.map(({ href, label }) => {
            const isActive =
              href === `/${locale}`
                ? pathname === `/${locale}` || pathname === `/${locale}/`
                : pathname.startsWith(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "px-3 py-2 rounded-xl text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-text hover:bg-gray-100"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side: language + CTA */}
        <div className="hidden md:flex items-center gap-2">
          {/* Language switcher */}
          <Link
            href={langSwitchHref}
            className="px-3 py-1.5 rounded-xl border-2 border-primary/30 text-primary text-sm font-bold hover:bg-primary/10 transition-colors"
            aria-label={`Switch to ${oppositeLocale === "en" ? "English" : "French"}`}
          >
            {oppositeLocale.toUpperCase()}
          </Link>

          <Link
            href={ROUTES.onboarding(locale)}
            className="px-4 py-2 bg-primary text-white rounded-2xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <ul className="flex flex-col p-4 gap-1" role="list">
              {links.map(({ href, label }) => {
                const isActive =
                  href === `/${locale}`
                    ? pathname === `/${locale}` || pathname === `/${locale}/`
                    : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-text hover:bg-gray-100"
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
                  className="flex-1 text-center px-3 py-2 rounded-xl border-2 border-primary/30 text-primary text-sm font-bold"
                >
                  {oppositeLocale.toUpperCase()}
                </Link>
                <Link
                  href={ROUTES.onboarding(locale)}
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center px-4 py-2 bg-primary text-white rounded-2xl text-sm font-semibold"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
