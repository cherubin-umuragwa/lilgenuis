"use client";

import { useState, useEffect } from "react";
import type { Translation } from "@/types";
import type { Locale } from "@/lib/i18n";
import { getTranslations, t as translate } from "@/lib/i18n";

interface UseTranslationsReturn {
  t: (key: string, replacements?: Record<string, string>) => string;
  translations: Translation;
  locale: Locale;
}

export function useTranslations(locale: Locale): UseTranslationsReturn {
  const [translations, setTranslations] = useState<Translation>({});

  useEffect(() => {
    getTranslations(locale).then(setTranslations);
  }, [locale]);

  const t = (key: string, replacements?: Record<string, string>): string => {
    return translate(translations, key, replacements);
  };

  return { t, translations, locale };
}
