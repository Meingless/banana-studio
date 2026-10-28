import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { initialLanguage, LANGUAGE_STORAGE_KEY, translate, validLanguage } from './messages';
import type { Language, MessageKey } from './messages';
type I18n = { language: Language; setLanguage: (value: Language) => void; t: (key: MessageKey, values?: Record<string, string | number>) => string };
const Context = createContext<I18n | null>(null);
function storage(): Storage | undefined { try { return typeof window === 'undefined' ? undefined : window.localStorage; } catch { return undefined; } }
export function I18nProvider({children}: {children: React.ReactNode}) {
  const [language, updateLanguage] = useState<Language>(() => initialLanguage(storage(), typeof navigator === 'undefined' ? 'en' : navigator.language));
  const setLanguage = useCallback((value: Language) => {
    if (!validLanguage(value)) return;
    updateLanguage(value);
    try { storage()?.setItem(LANGUAGE_STORAGE_KEY, value); } catch { /* Language still works in memory. */ }
  }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  useEffect(() => {
    const sync = (event: StorageEvent) => { if (event.key === LANGUAGE_STORAGE_KEY && validLanguage(event.newValue)) updateLanguage(event.newValue); };
    window.addEventListener('storage', sync); return () => window.removeEventListener('storage', sync);
  }, []);
  const t = useCallback((key: MessageKey, values?: Record<string, string | number>) => translate(language, key, values), [language]);
  const value = useMemo(() => ({language, setLanguage, t}), [language, setLanguage, t]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useI18n(): I18n {
  const value = useContext(Context);
  if (!value) throw new Error('useI18n requires I18nProvider');
  return value;
}
