"use client";

import { useEffect, useState } from "react";
import { fetchContacts } from "@/lib/contacts";
import {useTranslations} from "next-intl";

export default function ContactsPage() {
    const t = useTranslations();
    const [contacts, setContacts] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;
        (async () => {
            try {
                const rows = await fetchContacts(); // expect: [{...}]
                if (!ignore) {
                    setContacts(rows?.[0] ?? null);
                }
            } catch (e) {
                if (!ignore) setError("Failed to load contacts");
            }
        })();
        return () => { ignore = true; };
    }, []);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!contacts) return <p>Loading...</p>;

    const hasAddress = Boolean(contacts.address);
    const mapSrc = contacts.map_embed_url
        ? contacts.map_embed_url
        : hasAddress
            ? `https://www.google.com/maps?q=${encodeURIComponent(contacts.address)}&output=embed`
            : null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10">
            {/* Left */}
            <div>
                <h1 className="text-3xl font-bold mb-8">{t('contacts.contacts')}</h1>
                <p className="text-lg text-muted-foreground mb-4">
                    {t('contacts.for_inquiries_contact_us_at')}:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>{t('contacts.work_hours')}: {contacts.work_time || "—"}</li>
                    <li>
                        {t('contacts.email')}: {contacts.email ? <a className="underline" href={`mailto:${contacts.email}`}>{contacts.email}</a> : "—"}
                    </li>
                    <li>
                        {t('contacts.phone')}: {contacts.phone ? <a className="underline" href={`tel:${contacts.phone}`}>{contacts.phone}</a> : "—"}
                    </li>
                    <li>{t('contacts.address')}: {contacts.address || "—"}</li>
                </ul>
            </div>

            {/* Right — Google Map */}
            <div className="w-[750px] h-110">
                {mapSrc ? (
                    <iframe
                        title="Location map"
                        src={mapSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-xl border"
                    />
                ) : (
                    <div className="w-full h-full rounded-xl border flex items-center justify-center text-muted-foreground">
                        Map is not configured yet
                    </div>
                )}
            </div>
        </div>
    );
}