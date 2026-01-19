import { ui, defaultLang } from "./ui";

type Locale = keyof typeof ui;
type TranslationKey = keyof (typeof ui)[typeof defaultLang];

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split("/");
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(locale: Locale) {
    return (key: TranslationKey): string => {
        return ui[locale]?.[key] ?? ui[defaultLang][key];
    };
}

export const useLocalePath = (locale: Locale) => {
    return (path: string) => {
        if (locale === defaultLang) return path;
        return `/${locale}${path}`;
    };
};

export const computeCurrentLocale = (path: URL, lang: string) => {
    return useLocalePath(lang as any)(path.pathname).replace(/\/$/, "");
};

export const isSameLocalePath = (url: URL, lang: string) => {
    const localePath = useLocalePath(lang as any);

    return (path: string) => {
        return localePath(path) === localePath(url.pathname);
    };
};
