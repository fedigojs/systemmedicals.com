"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getProductBySlug } from "@/lib/productCrud"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { BadgeCheck, ShieldCheck, Star, Truck, DollarSign } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/LanguageContext"
import {useTranslations} from 'next-intl';

function getShortTextFromHtml(html, maxLen = 300) {
    // Универсально для Next.js (можно прямо так)
    if (typeof window === "undefined") return ""; // SSR guard
    const div = document.createElement("div");
    div.innerHTML = html || "";
    const text = div.textContent || div.innerText || "";
    return text.trim().slice(0, maxLen) + (text.length > maxLen ? "…" : "");
}

export default function ProductPage() {
    const t = useTranslations();
    const params = useParams()
    const productSlug = params.slug
    const [product, setProduct] = useState(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const { lang } = useLanguage()


    useEffect(() => {
        const fetchProduct = async () => {
            const prod = await getProductBySlug(productSlug)
            setProduct(prod)
        }
        if (productSlug) fetchProduct()
    }, [productSlug])

    if (!product) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                Product not found
            </div>
        )
    }

    // ---- Обработка изображений ----
    let images = []
    try {
        if (Array.isArray(product.images)) {
            images = [...product.images]
        } else if (typeof product.images === "string") {
            images = JSON.parse(product.images || "[]")
        }
    } catch (e) {
        images = []
    }
    if (product.main_image_url && !images.find(img => img.url === product.main_image_url)) {
        images.unshift({ url: product.main_image_url })
    }
    images = images.filter(i => i && i.url)

    // ---- Мультиязычные поля ----
    const name = product.name?.[lang] || product.name?.en || "No Name"
    const short_description = product.short_description?.[lang] || product.short_description?.en || "No Description"
    const description = product.description?.[lang] || product.description?.en || "<p>No description</p>"
    const seoTitle = product.seo_title?.[lang] || product.seo_title?.en || ""
    const seoDescription = product.seo_description?.[lang] || product.seo_description?.en || ""
    const shortDescription = getShortTextFromHtml(short_description, 650)

    // Для будущего: категории и другие поля тоже можно делать по языку

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row gap-10">
                {/* ГАЛЕРЕЯ */}
                <div className="w-full md:w-[500px] flex flex-col items-center">
                    <div className="w-full bg-gray-50 rounded-2xl mb-4 flex justify-center items-center min-h-[380px] overflow-hidden">
                        <img
                            src={images[selectedImage]?.url || "/placeholder.jpg"}
                            alt={name}
                            className="max-h-[400px] object-contain"
                            style={{ maxWidth: "100%" }}
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                className={cn(
                                    "rounded-lg border-2 p-1 transition-all",
                                    idx === selectedImage
                                        ? "border-primary"
                                        : "border-gray-200 opacity-70 hover:opacity-100"
                                )}
                                onClick={() => setSelectedImage(idx)}
                                tabIndex={0}
                                style={{ width: 60, height: 60 }}
                            >
                                <img
                                    src={img.url || "/placeholder.jpg"}
                                    alt={img.name || `thumb-${idx}`}
                                    className="object-cover rounded w-full h-full"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* ИНФОРМАЦИЯ О ТОВАРЕ */}
                <div className="w-full md:flex-1 flex flex-col justify-start">
                    <Card className="shadow-none border-none">
                        <CardContent className="p-0">
                            <CardTitle className="text-3xl font-bold mb-4">
                                {name}
                            </CardTitle>
                            {/* Можно добавить мультиязычную цену/валюту, если потребуется */}
                            <div className="text-2xl font-bold mb-3 text-primary">{product.price} €</div>
                            <div className="mb-4 text-muted-foreground">
                                {typeof product.quantity === "number"
                                    ? `In stock: ${product.quantity}`
                                    : "Quantity: —"}
                            </div>
                            {/* --- ICONS ROW --- */}
                            <div className="flex flex-row gap-6 mb-4 justify-start items-center">
                                <ShieldCheck className="w-8 h-8 text-blue-600" title="Official Warranty" />
                                <BadgeCheck className="w-8 h-8 text-green-600" title="Certified Quality" />
                                <Star className="w-8 h-8 text-yellow-500" title="Top Seller" />
                                <Truck className="w-8 h-8 text-gray-600" title="Fast Delivery" />
                                <DollarSign className="w-8 h-8 text-indigo-600" title="Best Price" />
                            </div>
                            {/* --- SHORT DESCRIPTION --- */}
                            <div className="text-muted-foreground text-base mb-6 max-w-xl">
                                {shortDescription}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Separator className="my-8" />
            <div className="max-w-5xl mx-auto">
                <h2 className="text-xl font-semibold mb-3">
                    {t("product.product_description")}
                </h2>
                <div
                    className="text-muted-foreground leading-relaxed text-lg"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </div>
        </div>
    )
}