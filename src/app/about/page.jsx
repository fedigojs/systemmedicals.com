// Server Component is fine; switch to "use client" if you prefer.
import { supabase } from "@/lib/supabaseClient";

// pick language (basic example)
const FALLBACK_LANG = "en";

async function getAbout() {
    const { data, error } = await supabase
        .from("about_page")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1);
    if (error) throw error;
    return data?.[0] ?? null;
}

export default async function AboutPage() {
    const row = await getAbout();
    const description = row?.description || {};
    const html = description[FALLBACK_LANG] || ""; // swap to your i18n language resolver

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6">About us</h1>
            {html ? (
                <article
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            ) : (
                <p className="text-muted-foreground">No content yet.</p>
            )}
        </div>
    );
}