import * as React from "react";

export type I18nVars = Record<string, string | number | boolean | null | undefined>;
export type I18nLocale = string;

export interface I18nMessages {
  [key: string]: string | I18nMessages;
}

export type I18nAllMessages = Record<I18nLocale, I18nMessages>;

function getByPath(messages: I18nMessages | undefined, key: string): string | undefined {
  if (!messages) return;
  const parts = key.split(".");
  let cur: any = messages;
  for (const p of parts) {
    if (!cur || typeof cur !== "object") return;
    cur = cur[p];
  }
  return typeof cur === "string" ? cur : undefined;
}

function format(template: string, vars?: I18nVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => {
    const v = vars[k];
    if (v === null || v === undefined) return "";
    return String(v);
  });
}

export type TranslateFn = (key: string, vars?: I18nVars) => string;

export type I18nContextValue = {
  locale: I18nLocale;
  fallbackLocale?: I18nLocale;
  setLocale: (locale: I18nLocale) => void;
  t: TranslateFn;
};

const I18nContext = React.createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  messages,
  defaultLocale = "en",
  locale: controlledLocale,
  fallbackLocale,
  onMissingKey,
}: {
  children: React.ReactNode;
  messages: I18nAllMessages;
  defaultLocale?: I18nLocale;
  locale?: I18nLocale;
  fallbackLocale?: I18nLocale;
  onMissingKey?: (key: string, info: { locale: string; fallbackLocale?: string }) => void;
}) {
  const [uncontrolledLocale, setUncontrolledLocale] = React.useState<I18nLocale>(defaultLocale);
  const locale = controlledLocale ?? uncontrolledLocale;
  const setLocale = React.useCallback(
    (next: I18nLocale) => {
      if (controlledLocale === undefined) setUncontrolledLocale(next);
    },
    [controlledLocale],
  );

  const t: TranslateFn = React.useCallback(
    (key: string, vars?: I18nVars) => {
      const msg =
        getByPath(messages?.[locale], key) ??
        (fallbackLocale ? getByPath(messages?.[fallbackLocale], key) : undefined);
      if (msg === undefined) {
        onMissingKey?.(key, { locale, fallbackLocale });
        return key;
      }
      return format(msg, vars);
    },
    [messages, locale, fallbackLocale, onMissingKey],
  );

  const value = React.useMemo<I18nContextValue>(
    () => ({
      locale,
      fallbackLocale,
      setLocale,
      t,
    }),
    [locale, fallbackLocale, setLocale, t],
  );

  return React.createElement(I18nContext.Provider, { value }, children);
}

export function useI18n(): I18nContextValue {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider />");
  return ctx;
}

export function useT(): TranslateFn {
  return useI18n().t;
}


