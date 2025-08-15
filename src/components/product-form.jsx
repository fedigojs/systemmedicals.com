'use client';
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Switch} from "@/components/ui/switch";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createProduct, updateProduct, getProductById, upsertProductCategories, getProductWithCategories
} from "@/lib/productCrud";
import {getAllCategories} from "@/lib/categoryCrud";
import {slugify} from "@/lib/utils";
import {supabase} from "@/lib/supabaseClient";
import {ProductImagesEditor} from "@/components/product-image-editor";
import dynamic from 'next/dynamic';
import {MultiSelect} from "@/components/multi-select";

const RichTextEditor = dynamic(() => import('@/components/reach-text-editor'), {
    ssr: false,
});

const langs = ["en", "pl", "fr", "ua", "it", "de", "es"];

const LANG_LABELS = {
    en: "English", pl: "Polski", fr: "Français", ua: "Українська", it: "Italiano", de: "Deutsch", es: "Español"
};

function emptyJsonb() {
    return langs.reduce((obj, l) => ({...obj, [l]: ''}), {});
}

export default function ProductForm({id}) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [images, setImages] = useState([]);
    const [name, setName] = useState(emptyJsonb());
    const [description, setDescription] = useState(emptyJsonb());
    const [slug, setSlug] = useState(emptyJsonb());
    const [seoTitle, setSeoTitle] = useState(emptyJsonb());
    const [seoDescription, setSeoDescription] = useState(emptyJsonb());
    const [seoKeywords, setSeoKeywords] = useState(emptyJsonb());
    const [activeLang, setActiveLang] = useState(langs[0]);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [categoryIds, setCategoryIds] = useState([]);
    const [isFeatured, setIsFeatured] = useState(false);

    // Для редактирования — загрузить продукт
    useEffect(() => {
        if (id) {
            setLoading(true);
            // Загружаем и сам продукт, и его категории параллельно
            Promise.all([getProductById(id), getProductWithCategories(id)])
                .then(([product, categoriesIds]) => {
                    setName(product.name || emptyJsonb());
                    setDescription(product.description || emptyJsonb());
                    setSlug(product.slug || emptyJsonb());
                    setSeoTitle(product.seo_title || emptyJsonb());
                    setSeoDescription(product.seo_description || emptyJsonb());
                    setSeoKeywords(product.seo_keywords || emptyJsonb());
                    setPrice(product.price || 0);
                    setQuantity(product.quantity || 0);
                    setIsActive(product.is_active ?? true);
                    setImages(product.images || []);
                    setCategoryIds(categoriesIds || []);
                    setIsFeatured(product.is_featured ?? false);
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    useEffect(() => {
        setSlug((prev) => ({
            ...prev, [activeLang]: slugify(name[activeLang]),
        }));
    }, [name[activeLang], activeLang]);

    const {data: categories = []} = useQuery({
        queryKey: ['categories'], queryFn: getAllCategories,
    });

    // добавление и редактирование
    const mutation = useMutation({
        mutationFn: async (data) => {
            if (id) {
                return await updateProduct(id, data);
            } else {
                return await createProduct(data);
            }
        }, onSuccess: async (product) => {
            await upsertProductCategories(product.id, categoryIds);
            queryClient.invalidateQueries({queryKey: ['products']});
            router.push('/admin/products');
        }, onError: (error) => {
            alert('Ошибка сохранения: ' + error.message);
        },
    });

    // загрузка картинки в Supabase
    async function handleUploadImage(file) {
        if (!file) return '';
        const filename = `${Date.now()}_${file.name}`;
        const {error} = await supabase.storage
            .from('products')
            .upload(filename, file);
        if (error) throw error;
        const {
            data: {publicUrl},
        } = supabase.storage.from('products').getPublicUrl(filename);
        return publicUrl;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        let url = imageUrl;
        if (imageFile) {
            url = await handleUploadImage(imageFile);
        }
        mutation.mutate({
            name,
            description,
            slug,
            seo_title: seoTitle,
            seo_description: seoDescription,
            seo_keywords: seoKeywords,
            price,
            quantity,

            images,
            main_image_url: images[0]?.url || null,
            is_active: isActive,
            is_featured: isFeatured,
        });
        setLoading(false);
    }

    return (<div className="w-full max-w-6xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">{id ? "Edit Product" : "Create Product"}</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <div className="flex gap-2 mb-2">
                        {langs.map(lng => (<button key={lng} type="button"
                                                   className={`px-3 py-1 rounded ${activeLang === lng ? "bg-gray-800 text-white" : "bg-gray-200"}`}
                                                   onClick={() => setActiveLang(lng)}
                            >{LANG_LABELS[lng]}</button>))}
                    </div>
                    <label className="font-medium">Name ({LANG_LABELS[activeLang]})</label>
                    <Input value={name[activeLang]} onChange={e => setName({...name, [activeLang]: e.target.value})}
                           required/>
                </div>
                <div>
                    <label className="font-medium">Description ({LANG_LABELS[activeLang]})</label>
                    <RichTextEditor
                        value={description[activeLang]}
                        onChange={(val) => setDescription({...description, [activeLang]: val})}
                        langKey={activeLang}
                    />
                </div>
                <div>
                    <label className="font-medium">Slug ({LANG_LABELS[activeLang]})</label>
                    <Input value={slug[activeLang]}
                           onChange={e => setSlug({...slug, [activeLang]: slugify(e.target.value)})}/>
                </div>
                <div>
                    <label className="font-medium">SEO Title ({LANG_LABELS[activeLang]})</label>
                    <Input value={seoTitle[activeLang]}
                           onChange={e => setSeoTitle({...seoTitle, [activeLang]: e.target.value})}/>
                </div>
                <div>
                    <label className="font-medium">SEO Description ({LANG_LABELS[activeLang]})</label>
                    <Textarea value={seoDescription[activeLang]}
                              onChange={e => setSeoDescription({...seoDescription, [activeLang]: e.target.value})}/>
                </div>
                <div>
                    <label className="font-medium">SEO Keywords ({LANG_LABELS[activeLang]})</label>
                    <Input value={seoKeywords[activeLang]}
                           onChange={e => setSeoKeywords({...seoKeywords, [activeLang]: e.target.value})}/>
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="font-medium">Price</label>
                        <Input type="string" value={price} onChange={e => setPrice(Number(e.target.value) || 0)}/>
                    </div>
                    <div className="flex-1">
                        <label className="font-medium">Quantity</label>
                        <Input type="string" value={quantity} onChange={e => setQuantity(Number(e.target.value) || 0)}/>
                    </div>
                </div>
                <div>
                    <label className="font-medium">Category</label>
                    <MultiSelect
                        options={categories.map(cat => ({
                            label: cat.name?.en || "No name", value: cat.id
                        }))}
                        value={categoryIds}
                        onChange={setCategoryIds}
                        placeholder="Select categories..."
                    />
                </div>
                <div>
                    <label className="font-medium">Product Images</label>
                    <ProductImagesEditor images={images} onChange={setImages}/>
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-medium">Show on Main Page</label>
                    <Switch checked={isFeatured} onCheckedChange={setIsFeatured}/>
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-medium">Active</label>
                    <Switch checked={isActive} onCheckedChange={setIsActive}/>
                </div>
                <Button type="submit" disabled={loading || mutation.isPending} className="mt-2">
                    {loading || mutation.isPending ? "Saving..." : (id ? "Save" : "Create Product")}
                </Button>
            </form>
        </div>);
}
