'use client'

import {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {supabase} from "@/lib/supabaseClient";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Switch} from "@/components/ui/switch";

// Utils for working with jsonb fields as object
function emptyJsonb() {
    return {};
}

export default function CategoryCreatePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const parentId = searchParams.get("parent") || null;

    // State for each field
    const [name, setName] = useState({en: ""});
    const [description, setDescription] = useState({en: ""});
    const [slug, setSlug] = useState("");
    const [level, setLevel] = useState(0);
    const [sortOrder, setSortOrder] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [seoTitle, setSeoTitle] = useState(emptyJsonb());
    const [seoDescription, setSeoDescription] = useState(emptyJsonb());
    const [seoKeywords, setSeoKeywords] = useState(emptyJsonb());
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        await supabase.from("categories").insert([{
            name,
            description,
            slug,
            parent_id: parentId,
            level: Number(level),
            sort_order: Number(sortOrder),
            is_active: isActive,
            seo_title: seoTitle,
            seo_description: seoDescription,
            seo_keywords: seoKeywords
        }]);
        setLoading(false);
        router.push("/admin/categories");
    };

    return (
        <div className="w-fill p-8">
            <h1 className="text-2xl font-bold mb-4">Create Category</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="font-medium">Name (EN)</label>
                    <Input value={name.en} onChange={e => setName({...name, en: e.target.value})} required/>
                </div>
                <div>
                    <label className="font-medium">Description (EN)</label>
                    <Textarea value={description.en}
                              onChange={e => setDescription({...description, en: e.target.value})}/>
                </div>
                <div>
                    <label className="font-medium">Slug</label>
                    <Input value={slug} onChange={e => setSlug(e.target.value)}/>
                </div>
                <div>
                    <label className="font-medium">Level</label>
                    <Input type="number" value={level} onChange={e => setLevel(e.target.value)}/>
                </div>
                <div>
                    <label className="font-medium">Sort Order</label>
                    <Input type="number" value={sortOrder} onChange={e => setSortOrder(e.target.value)}/>
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-medium">Active</label>
                    <Switch checked={isActive} onCheckedChange={setIsActive}/>
                </div>
                <div>
                    <label className="font-medium">SEO Title (EN)</label>
                    <Input value={seoTitle.en || ""}
                           onChange={e => setSeoTitle({...seoTitle, en: e.target.value})}/>
                </div>
                <div>
                    <label className="font-medium">SEO Description (EN)</label>
                    <Textarea value={seoDescription.en || ""}
                              onChange={e => setSeoDescription({...seoDescription, en: e.target.value})}/>
                </div>
                <div>
                    <label className="font-medium">SEO Keywords (EN, comma separated)</label>
                    <Input value={seoKeywords.en || ""}
                           onChange={e => setSeoKeywords({...seoKeywords, en: e.target.value})}/>
                </div>
                <Button type="submit" disabled={loading} className="mt-2">
                    {loading ? "Saving..." : "Create Category"}
                </Button>
            </form>
        </div>
    );
}