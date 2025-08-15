"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import {useEffect, useRef, useState} from "react";

const LANG_LABELS = {
    en: "EN", pl: "PL", fr: "FR", ua: "UA", it: "IT",  de: "De",
    es: "Es"
};

export const FLAG_EMOJIS = {
    en: "🇬🇧",
    pl: "🇵🇱",
    fr: "🇫🇷",
    ua: "🇺🇦",
    it: "🇮🇹",
    de: "🇩🇪",
    es: "🇪🇸"
};

const WORK_HOURS = "Mon-Fri: 09:00–18:00";
const PHONE = "+38 (044) 123-45-67";

export default function Header() {
    const { lang, setLang, langs } = useLanguage();
    const [open, setOpen] = useState(false);
    const langButtonRef = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (
                langButtonRef.current &&
                !langButtonRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    return (
        <header className="w-full border-b bg-white sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-6">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-700 tracking-tight whitespace-nowrap">
                    System<span className="text-gray-900">Medicals</span>
                </Link>

                {/* Center Info */}
                <div className="hidden md:flex flex-col items-center flex-1">
                    <div className="flex gap-4 items-center">
                        <span className="text-gray-600 text-sm flex items-center gap-1">
                            <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                            {WORK_HOURS}
                        </span>
                        <span className="text-gray-600 text-sm flex items-center gap-1">
                            <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92V19a2 2 0 01-2.18 2A19.72 19.72 0 013 5.18 2 2 0 015 3h2.09a2 2 0 012 1.72c.09.81.18 1.67.29 2.56A2 2 0 019.62 9.1L8 10.72c1.57 3.13 4.09 5.65 7.22 7.22l1.62-1.62a2 2 0 012.86.38c.89.11 1.75.2 2.56.29A2 2 0 0122 16.92z" />
                            </svg>
                            <a href={`tel:${PHONE.replace(/[^+\d]/g, '')}`} className="hover:text-blue-600 transition">{PHONE}</a>
                        </span>
                    </div>
                </div>

                {/* Menu + Controls */}
                <div className="flex items-center gap-3">
                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                            Home
                        </Link>
                        <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
                            Contact
                        </Link>
                    </nav>

                    {/* Language dropdown */}
                    <div className="relative ml-2" ref={langButtonRef}>
                        <button
                            className="flex items-center px-3 py-1 rounded-lg border bg-gray-50 hover:bg-gray-100 transition font-semibold text-gray-700 gap-2"
                            onClick={() => setOpen((v) => !v)}
                            type="button"
                        >
                            <Globe className="w-4 h-4" />
                            <span className="text-sm">{FLAG_EMOJIS[lang]} {LANG_LABELS[lang]}</span>
                            <svg className="w-3 h-3 ml-1 opacity-50" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                        {open && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-xl z-20">
                                {langs.map(l => (
                                    <button
                                        key={l}
                                        onClick={() => {
                                            setLang(l);
                                            setOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-2 px-4 py-2 text-left text-sm rounded-lg
                                    ${lang === l ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}
                                `}
                                    >
                                        <span>{FLAG_EMOJIS[l]}</span> <span>{LANG_LABELS[l]}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Login */}
                    <Link href="/login">
                        <Button className="ml-2">Login</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}