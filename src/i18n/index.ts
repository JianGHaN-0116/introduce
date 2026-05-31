import zh from "./zh";
import en from "./en";

export type Lang = "zh" | "en";

type DeepString<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends readonly string[]
    ? string[]
    : DeepString<T[K]>;
};

export type Translations = DeepString<typeof en>;

export const translations: Record<Lang, Translations> = { zh, en };

export function getTranslation(lang: Lang): Translations {
  return translations[lang];
}
