"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function ContactsForm() {
    const [form, setForm] = useState({
        id: null,
        email: "",
        phone: "",
        address: "",
        map_embed_url: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Load last saved row
    useEffect(() => {
        let ignore = false;
        (async () => {
            const { data, error } = await supabase
                .from("contacts")
                .select("*")
                .order("updated_at", { ascending: false })
                .limit(1);

            if (!ignore) {
                if (!error && data?.[0]) {
                    setForm({
                        id: data[0].id ?? null,
                        email: data[0].email ?? "",
                        phone: data[0].phone ?? "",
                        address: data[0].address ?? "",
                        map_embed_url: data[0].map_embed_url ?? "",
                    });
                }
                setLoading(false);
            }
        })();
        return () => { ignore = true; };
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);

        const payload = {
            id: form.id || undefined,         // insert if null
            email: form.email || null,
            phone: form.phone || null,
            address: form.address || null,
            map_embed_url: form.map_embed_url || null,
        };

        const { data, error } = await supabase
            .from("contacts")
            .upsert([payload], { onConflict: "id" })
            .select()
            .single();

        setSaving(false);

        if (error) {
            alert("Failed to save. Try again.");
            return;
        }

        setForm((prev) => ({ ...prev, id: data.id ?? prev.id }));
        alert("Contacts updated!");
    }

    if (loading) return <div className="text-sm text-muted-foreground">Loading…</div>;

    const hasMap = Boolean(form.map_embed_url);
    const mapSrc = form.map_embed_url || (form.address
        ? `https://www.google.com/maps?q=${encodeURIComponent(form.address)}&output=embed`
        : "");

    return (
        <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-2">
            {/* Left: fields */}
            <div className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="hello@mysite.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            type="text"
                            placeholder="+1 555-123-4567"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        type="text"
                        placeholder="221B Baker Street, London"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                </div>

                <Separator />

                <div className="space-y-2">
                    <Label htmlFor="map_embed_url">Google Maps embed URL</Label>
                    <Input
                        id="map_embed_url"
                        type="text"
                        placeholder="https://www.google.com/maps/embed?pb=..."
                        value={form.map_embed_url}
                        onChange={(e) => setForm({ ...form, map_embed_url: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                        Google Maps → Share → Embed a map → copy iframe <code>src</code>.
                    </p>
                </div>

                <div>
                    <Button type="submit" disabled={saving}>
                        {saving ? "Saving…" : "Save changes"}
                    </Button>
                </div>
            </div>

            {/* Right: map preview */}
            <div className="md:sticky md:top-24 h-[380px] w-[550px] rounded-lg border overflow-hidden">
                {mapSrc ? (
                    <iframe
                        title="Map preview"
                        src={mapSrc}
                        width="100%"
                        height="100%"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        Map not configured. Paste an embed URL or fill Address.
                    </div>
                )}
            </div>
        </form>
    );
}