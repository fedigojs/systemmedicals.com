"use client";

import {createContext, useContext, useMemo} from "react";
import {useRouter} from "next/navigation";
import {useLocale} from "next-intl";

const LANGS = ["en", "pl", "fr", "ua", "it", "de", "es"];

const LanguageContext = createContext({
    lang: "en",
    setLang: () => {},
    langs: LANGS
});

export function LanguageProvider({children}) {
    const lang = useLocale();      // current locale resolved by next-intl
    const router = useRouter();

    const setLang = (nextLang) => {
        if (!nextLang || nextLang === lang) return;
        // Persist choice; next-intl middleware reads this cookie
        document.cookie = `NEXT_LOCALE=${nextLang}; Path=/; Max-Age=31536000; SameSite=Lax`;
        router.refresh(); // reload RSC tree -> provider picks new messages; URL stays same
    };

    const value = useMemo(() => ({lang, setLang, langs: LANGS}), [lang]);
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
