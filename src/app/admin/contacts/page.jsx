"use client";

import ContactsForm from "@/components/contacts-form";

export default function AdminContactsPage() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-2">Contacts settings</h1>
            <p className="text-sm text-muted-foreground mb-8">
                Edit public contact info and Google Maps embed.
            </p>

            <ContactsForm />
        </div>
    );
}