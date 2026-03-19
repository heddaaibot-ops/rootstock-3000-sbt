'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Locale } from './config';
import { defaultLocale } from './config';

import zhTranslations from './locales/zh.json';

const translations = {
  zh: zhTranslations,
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // Clear any old locale from localStorage and force Chinese
  useEffect(() => {
    localStorage.removeItem('locale');
    setLocaleState('zh');
  }, []);

  const setLocale = (newLocale: Locale) => {
    // Force Chinese only
    setLocaleState('zh');
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
