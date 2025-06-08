'use client'

import {
    Tabs, TabsList, TabsTrigger, TabsContent,
} from "@/components/ui/tabs";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Switch} from "@/components/ui/switch";
import {slugify} from "@/lib/utils";

const langs = ["en", "pl", "fr"];
const LANG_LABELS = {
    en: "English",
    pl: "Polski",
    fr: "Français",
};
import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import {createCategory, getAllCategories, getCategoryById, updateCategory} from "@/lib/categoryCrud";
import {LoadingSpinner} from "@/components/loading-spiner";


function emptyJsonb() {
    return langs.reduce((obj, l) => ({...obj, [l]: ""}), {});
}

export default function CategoryCreate({id}) {
    const isEdit = Boolean(id);
    const router = useRouter();
    const queryClient = useQueryClient();
    const [activeLang, setActiveLang] = useState(langs[0]);

    const [name, setName] = useState(emptyJsonb());
    const [description, setDescription] = useState(emptyJsonb());
    const [slug, setSlug] = useState(emptyJsonb());
    const [seoTitle, setSeoTitle] = useState(emptyJsonb());
    const [seoDescription, setSeoDescription] = useState(emptyJsonb());
    const [seoKeywords, setSeoKeywords] = useState(emptyJsonb());
    const [parentId, setParentId] = useState(null);
    const [sortOrder, setSortOrder] = useState(0);
    const [isActive, setIsActive] = useState(true);

    const {data: initialCategory, isLoading: isInitialLoading} = useQuery({
        queryKey: ["category", id],
        queryFn: () => getCategoryById(id),
        enabled: isEdit,
    });

    useEffect(() => {
        if (isEdit && initialCategory) {
            setName(initialCategory.name || emptyJsonb());
            setDescription(initialCategory.description || emptyJsonb());
            setSlug(initialCategory.slug || emptyJsonb());
            setSeoTitle(initialCategory.seo_title || emptyJsonb());
            setSeoDescription(initialCategory.seo_description || emptyJsonb());
            setSeoKeywords(initialCategory.seo_keywords || emptyJsonb());
            setParentId(initialCategory.parent_id || null);
            setSortOrder(initialCategory.sort_order || 0);
            setIsActive(initialCategory.is_active ?? true);
        }
    }, [isEdit, initialCategory]);

    useEffect(() => {
        setSlug((prev) => ({
            ...prev,
            [activeLang]: slugify(name[activeLang])
        }));
    }, [name[activeLang], activeLang]);

    const {data: categories = [], isLoading, isError} = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });


    const createMutation = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]});
            router.push("/admin/categories");
        },
        onError: (error) => {
            alert("Error saving category: " + error.message);
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({id, ...data}) => updateCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]});
            router.push("/admin/categories");
        },
        onError: (error) => {
            alert("Error updating category: " + error.message);
        }
    });

    const handleSortOrderChange = (e) => setSortOrder(Number(e.target.value) || 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name,
            description,
            slug,
            parent_id: parentId || null,
            sort_order: sortOrder,
            is_active: isActive,
            seo_title: seoTitle,
            seo_description: seoDescription,
            seo_keywords: seoKeywords
        };
        if (isEdit) {
            updateMutation.mutate({id, ...data});
        } else {
            createMutation.mutate(data);
        }
    };

    if (isEdit && isInitialLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen w-full">
                <LoadingSpinner className="w-12 h-12 text-gray-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full p-8">
            <h1 className="text-2xl font-bold mb-4">{isEdit ? "Edit Category" : "Create Category"}</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <Tabs defaultValue={langs[0]} value={activeLang} onValueChange={setActiveLang}>
                    <TabsList>
                        {langs.map((lng) => (
                            <TabsTrigger key={lng} value={lng}>
                                {LANG_LABELS[lng]}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {langs.map((lng) => (
                        <TabsContent key={lng} value={lng}>
                            <div className="space-y-4">
                                <div>
                                    <label className="font-medium">Name ({LANG_LABELS[lng]})</label>
                                    <Input
                                        value={name[lng]}
                                        onChange={e => setName({...name, [lng]: e.target.value})}
                                        required={lng === langs[0]}
                                    />
                                </div>
                                <div>
                                    <label className="font-medium">Description ({LANG_LABELS[lng]})</label>
                                    <Textarea
                                        value={description[lng]}
                                        onChange={e => setDescription({...description, [lng]: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="font-medium">Slug ({LANG_LABELS[lng]})</label>
                                    <Input
                                        value={slug[lng] || ""}
                                        onChange={e => setSlug({
                                            ...slug,
                                            [lng]: slugify(e.target.value)
                                        })}
                                    />
                                </div>
                                <div>
                                    <label className="font-medium">SEO Title ({LANG_LABELS[lng]})</label>
                                    <Input
                                        value={seoTitle[lng] || ""}
                                        onChange={e => setSeoTitle({...seoTitle, [lng]: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="font-medium">SEO Description ({LANG_LABELS[lng]})</label>
                                    <Textarea
                                        value={seoDescription[lng] || ""}
                                        onChange={e => setSeoDescription({...seoDescription, [lng]: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="font-medium">SEO Keywords ({LANG_LABELS[lng]}, comma
                                        separated)</label>
                                    <Input
                                        value={seoKeywords[lng] || ""}
                                        onChange={e => setSeoKeywords({...seoKeywords, [lng]: e.target.value})}
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
                <div className="flex items-center gap-2">
                    <label className="font-medium">Active</label>
                    <Switch checked={isActive} onCheckedChange={setIsActive}/>
                </div>
                <div>
                    <label className="font-medium">Parent Category</label>
                    <select
                        className="border rounded px-2 py-1 w-full"
                        value={parentId || ""}
                        onChange={e => setParentId(e.target.value || null)}
                    >
                        <option value="">Main category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name[activeLang] || cat.name["en"] || "Without name"}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="font-medium">Sort Order</label>
                    <Input
                        type="number"
                        value={sortOrder}
                        onChange={handleSortOrderChange}
                        min={0}
                    />
                </div>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="mt-2">
                    {isEdit
                        ? updateMutation.isPending ? "Saving..." : "Save Changes"
                        : createMutation.isPending ? "Saving..." : "Create Category"}
                </Button>
            </form>
        </div>
    );
}