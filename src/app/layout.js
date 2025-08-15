import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {cookies} from "next/headers";
import {NextIntlClientProvider} from "next-intl";
import {LanguageProvider} from "@/context/LanguageContext";
import {Providers} from "@/app/provider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SUPPORTED = ["en","pl","fr","ua","it","de","es"];
const DEFAULT_LOCALE = "en";

export const metadata = {
    title: "SystemMedicals — Dental & Medical Equipment Store",
    description:
        "Buy certified dental and general medical equipment at great prices. SystemMedicals offers a wide selection of high-quality devices and supplies for clinics, hospitals, and private practices. Official warranty, fast delivery, and best prices guaranteed.",
    openGraph: { title: "SystemMedicals — Dental & Medical Equipment Store", type: "website", locale: "en_US" }
};

export default async function RootLayout({children}) {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
    const locale = SUPPORTED.includes(cookieLocale ?? "") ? cookieLocale : DEFAULT_LOCALE;
    const messages = (await import(`@/messages/${locale}.json`).catch(() => null))?.default || {};

    return (
        <html lang={locale} suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            <LanguageProvider>
                <Providers>{children}</Providers>
            </LanguageProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
