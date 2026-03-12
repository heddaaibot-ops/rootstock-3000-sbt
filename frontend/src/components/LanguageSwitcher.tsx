'use client';

import React from 'react';
import { useI18n } from '@/i18n/provider';
import { locales, localeNames } from '@/i18n/config';
import type { Locale } from '@/i18n/config';

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-2 bg-rsk-gray border border-rsk-orange/30 rounded-lg p-1">
      {locales.map((lang) => (
        <button
          key={lang}
          onClick={() => setLocale(lang as Locale)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            locale === lang
              ? 'bg-rsk-orange text-white'
              : 'text-gray-400 hover:text-rsk-light'
          }`}
        >
          {localeNames[lang as Locale]}
        </button>
      ))}
    </div>
  );
};
