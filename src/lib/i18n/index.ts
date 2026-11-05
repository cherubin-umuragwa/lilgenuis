import type { Translation } from "@/types";

export type Locale = "en" | "fr";

export const defaultLocale: Locale = "en";

export const supportedLocales: Locale[] = ["en", "fr"];

export async function getTranslations(locale: Locale): Promise<Translation> {
  if (locale === "fr") {
    const mod = await import("@/content/translations/fr");
    return mod.default as Translation;
  }
  const mod = await import("@/content/translations/en");
  return mod.default as Translation;
}

/**
 * Look up a dot-notation key inside a Translation object.
 * Optionally replace {variable} placeholders.
 */
export function t(
  translations: Translation,
  key: string,
  replacements?: Record<string, string>
): string {
  const parts = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- traversal of nested object
  let current: any = translations;

  for (const part of parts) {
    if (current === null || current === undefined) return key;
    current = current[part];
  }

  if (typeof current !== "string") return key;

  if (replacements) {
    return Object.entries(replacements).reduce(
      (str, [placeholder, value]) =>
        str.replace(new RegExp(`\\{${placeholder}\\}`, "g"), value),
      current
    );
  }

  return current;
}

export function isValidLocale(locale: string): locale is Locale {
  return supportedLocales.includes(locale as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  if (isValidLocale(segment)) return segment;
  return defaultLocale;
}
