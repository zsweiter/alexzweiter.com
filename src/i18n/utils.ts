import { ui, defaultLang, languages } from "./ui";

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
        const rawPath = path !== '/' ? path.replace(/\/$/, "") : '/'; // Remove trailing slash
        if (locale === defaultLang) return rawPath;
        return `/${locale}${rawPath}`.replace(/\/$/, "");
    };
};

const stripLocale = (pathname: string) => {
    const segments = pathname.split('/');
    const first = segments[1];

    if (first in languages) {
        return '/' + segments.slice(2).join('/');
    }

    return pathname;
}

export const computeCurrentLocale = (path: URL, lang: string) => {
    const pathname = stripLocale(path.pathname);

    return useLocalePath(lang as any)(pathname).replace(/\/$/, "");
};

export const isSameLocalePath = (url: URL, lang: string) => {
    const localePath = useLocalePath(lang as any);

    return (path: string) => {
        return localePath(path) === localePath(url.pathname);
    };
};

export const getLocaleParams = () => {
    const paths = Object.keys(languages)
        .filter(a => a !== defaultLang)
        .map(page => {
            return {
                params: {
                    locale: page
                }
            };
        });

    return paths;
};
