"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getAllProductsWithCategories } from "@/lib/productCrud"
import { getAllCategories } from "@/lib/categoryCrud"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import SubcategoryFilter from "@/components/sub-category-filter"
import { useLanguage } from "@/context/LanguageContext"
import {useTranslations} from "next-intl";

export default function CategoryPage() {
    const t = useTranslations();
    const params = useParams()
    const { lang } = useLanguage();
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState(null)
    const [subcategories, setSubcategories] = useState([])
    const [selectedSub, setSelectedSub] = useState(null)

    useEffect(() => {
        const slug = params.slug;
        const loadData = async () => {
            try {
                const categories = await getAllCategories();
                const matchedCategory = categories.find(cat => cat.slug?.[lang] === slug || cat.slug?.en === slug);
                setCategory(matchedCategory);
                if (!matchedCategory) return;

                // Найти подкатегории
                const subcats = categories.filter(cat => cat.parent_id === matchedCategory.id);
                setSubcategories(subcats);

                // Загрузить все товары (с их категориями)
                const allProducts = await getAllProductsWithCategories();

                let filtered;
                if (selectedSub) {
                    filtered = allProducts.filter(product =>
                        product.category_ids.includes(selectedSub)
                    );
                } else {
                    const subIds = subcats.map(c => c.id);
                    filtered = allProducts.filter(product =>
                        product.category_ids.includes(matchedCategory.id) ||
                        product.category_ids.some(catId => subIds.includes(catId))
                    );
                }
                setProducts(filtered);
            } catch (error) {
                console.error("Download error:", error);
            }
        };

        loadData();
    }, [params.slug, selectedSub, lang]); // lang в зависимостях

    if (!category) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                Category not found
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Filter: full-width on mobile, sidebar on desktop */}
            <div className="mb-4 md:mb-0 md:w-64 md:shrink-0 md:sticky md:top-24">
                <SubcategoryFilter
                    subcategories={subcategories}
                    selectedSub={selectedSub}
                    onSelectSub={setSelectedSub}
                />
            </div>

            {/* Products */}
            <div className="flex-1">
                <h1 className="text-3xl font-bold mb-6 md:mb-8">
                    {category.name?.[lang] || category.name?.en || "No Name"}
                </h1>

                {/* denser grid on phones (optional) */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.slug?.[lang] || product.slug?.en || product.id}`}
                        >
                            <Card className="hover:shadow-lg transition-shadow">
                                <img
                                    src={product.main_image_url || "/placeholder.jpg"}
                                    alt={product.name?.[lang] || product.name?.en || "Product image"}
                                    className="w-full h-36 sm:h-44 md:h-48 object-cover rounded-t-xl"
                                    loading="lazy"
                                />
                                <CardContent className="p-3 sm:p-4">
                                    <CardTitle className="text-sm sm:text-base line-clamp-2">
                                        {product.name?.[lang] || product.name?.en || "No Name"}
                                    </CardTitle>
                                    <p className="text-muted-foreground mt-1 sm:mt-2">{product.price} €</p>
                                    <Button className="mt-3 w-full" size="sm">{t('button.view')}</Button>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}