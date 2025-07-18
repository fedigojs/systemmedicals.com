"use client";
import { createContext, useContext, useState } from "react";

const langs = ["en", "pl", "fr", "ua", "it"];
const defaultLang = "en";

const LanguageContext = createContext({
    lang: defaultLang,
    setLang: () => {},
    langs,
});

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(defaultLang);

    return (
        <LanguageContext.Provider value={{ lang, setLang, langs }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);