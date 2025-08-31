"use client";

import AboutForm from "@/components/about-form";

export default function AdminAboutPage() {
    return (
        <div className="w-full px-6 py-10">
            <h1 className="text-3xl font-bold mb-2">About page</h1>
            <p className="text-sm text-muted-foreground mb-8">
                Edit the public “About Us” content (per language).
            </p>

            <AboutForm />
        </div>
    );
}