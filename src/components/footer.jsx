"use client";

import Link from "next/link"
import {useTranslations} from 'next-intl';

export default function Footer() {
    const t = useTranslations();
    return (
        <footer className="bg-white border-t mt-20">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Brand / About */}
                <div>
                    <h2 className="text-xl font-bold text-blue-700">SystemMedicals</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                        {t('footer.quality_medical_equipment_for_professional')}
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="text-sm font-semibold mb-2">{t("footer.explore")}</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                        <li><Link href="/" className="hover:underline">{t("footer.home")}</Link></li>
                        <li><Link href="/about" className="hover:underline">{t("footer.about")}</Link></li>
                        <li><Link href="/contact" className="hover:underline">{t("footer.contact")}</Link></li>
                    </ul>
                </div>

                {/* Legal / Contact */}
                <div>
                    <h3 className="text-sm font-semibold mb-2">{t("footer.legal")}</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                        <li><Link href="/privacy" className="hover:underline">{t("footer.privacy_policy")}</Link></li>
                        <li><Link href="/terms" className="hover:underline">{t("footer.terms_of_service")}</Link></li>
                    </ul>
                </div>
            </div>

            <div className="border-t py-4 text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} SystemMedicals. All rights reserved.
            </div>
        </footer>
    )
}