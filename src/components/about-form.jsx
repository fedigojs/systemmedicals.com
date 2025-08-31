"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RichTextEditor from "@/components/reach-text-editor"; // if you have shadcn Tabs

// Your labels; tweak as needed
const LANG_LABELS = {
    en: "English", pl: "Polski", fr: "Français", ua: "Українська", it: "Italiano", de: "Deutsch", es: "Español"
};
// Languages you support
const LANGS = ["en", "pl", "fr", "ua", "it", "de", "es"];

export default function AboutForm() {
    const [activeLang, setActiveLang] = useState("en");
    const [form, setForm] = useState({
        id: null,
        description: {}, // { en: "<p>...</p>", uk: "...", ... }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Load (latest) one row
    useEffect(() => {
        let ignore = false;
        (async () => {
            const { data, error } = await supabase
                .from("about_page")
                .select("*")
                .order("updated_at", { ascending: false })
                .limit(1);
            if (!ignore) {
                if (!error && data?.[0]) {
                    setForm({
                        id: data[0].id ?? null,
                        description: data[0].description ?? {},
                    });
                }
                setLoading(false);
            }
        })();
        return () => { ignore = true; };
    }, []);

    const description = useMemo(() => {
        // ensure all langs exist (empty string default)
        const d = { ...form.description };
        for (const l of LANGS) if (d[l] == null) d[l] = "";
        return d;
    }, [form.description]);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            id: form.id || undefined,               // insert if null
            description: description,               // JSONB
        };

        const { data, error } = await supabase
            .from("about_page")
            .upsert([payload], { onConflict: "id" })
            .select()
            .single();

        setSaving(false);

        if (error) {
            alert("Failed to save. Try again.");
            return;
        }
        setForm((prev) => ({ ...prev, id: data.id ?? prev.id }));
        alert("About content updated!");
    };

    if (loading) return <div className="text-sm text-muted-foreground">Loading…</div>;

    return (
        <form onSubmit={handleSave} className="space-y-6">
            {/* Language switch */}
            <Tabs value={activeLang} onValueChange={setActiveLang} className="w-full">
                <TabsList className="mb-4">
                    {LANGS.map((l) => (
                        <TabsTrigger key={l} value={l}>
                            {LANG_LABELS[l] || l.toUpperCase()}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Editor for the active language */}
                <div className="space-y-2">
                    <Label className="font-medium">
                        Description ({LANG_LABELS[activeLang] || activeLang.toUpperCase()})
                    </Label>

                    <RichTextEditor
                        value={description[activeLang]}
                        onChange={(val) =>
                            setForm((prev) => ({
                                ...prev,
                                description: { ...description, [activeLang]: val },
                            }))
                        }
                        langKey={activeLang}
                    />
                </div>
            </Tabs>

            <div>
                <Button type="submit" disabled={saving}>
                    {saving ? "Saving…" : "Save changes"}
                </Button>
            </div>
        </form>
    );
}