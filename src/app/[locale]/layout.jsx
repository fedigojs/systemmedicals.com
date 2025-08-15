import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {locales} from '@/i18n';
import {Geist, Geist_Mono} from "next/font/google";
import {Providers} from '@/app/provider';
import { LanguageProvider } from '@/context/LanguageContext';
import "../globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "SystemMedicals — Dental & Medical Equipment Store",
    description: "Buy certified dental and general medical equipment at great prices. SystemMedicals offers a wide selection of high-quality devices and supplies for clinics, hospitals, and private practices. Official warranty, fast delivery, and best prices guaranteed.",
    keywords: [
        "medical equipment",
        "dental equipment",
        "buy medical devices",
        "healthcare supplies",
        "hospital equipment",
        "clinic equipment",
        "systemmedicals",
        "best medical equipment",
        "fast delivery",
        "official warranty",
        "general medicine",
        "dental clinic supplies"
    ],
    openGraph: {
        title: "SystemMedicals — Dental & Medical Equipment Store",
        description: "Certified dental and general medical equipment. Fast delivery, best price, official warranty.",
        url: "https://systemmedicals.com/",
        siteName: "SystemMedicals",
        type: "website",
        locale: "en_US",
    }
};

export default async function LocaleLayout({children, params}) {
    const {locale} = await params;
    if (!locales.includes(locale)) notFound();

    // Load translations for the current locale
    const messages =
        (await import(`@/messages/${locale}.json`).catch(() => null))?.default || {};

    return (
        <html lang={locale}>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <LanguageProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <Providers>
                    {children}
                </Providers>
            </NextIntlClientProvider>
        </LanguageProvider>
        </body>
        </html>
    );
}
