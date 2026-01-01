export type Language = "en" | "zh";

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export interface Translations {
  [key: string]: any;
}
