"use client";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/productCrud";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext"; // Импортируем хук!

export default function FeaturedProductsGrid() {
    const [products, setProducts] = useState([]);
    const { lang } = useLanguage(); // <-- вызывать ХУК здесь!

    useEffect(() => {
        getAllProducts().then(all => {
            const featured = all
                .filter(p => p.is_featured)
                .sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
            setProducts(featured);
        });
    }, []);

    if (products.length === 0) {
        return <div className="text-muted-foreground text-center">No featured products yet.</div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
                <Link
                    key={product.id}
                    href={`/product/${product.slug?.[lang] || product.slug?.en || product.id}`}
                    className="block border rounded-lg shadow hover:shadow-lg transition overflow-hidden max-w-xs w-full mx-auto"
                >
                    <img
                        src={product.main_image_url || "/placeholder.jpg"}
                        alt={product.name?.[lang] || product.name?.en || "Product image"}
                        className="w-full h-48 object-cover bg-gray-100"
                    />
                    <div className="p-4 flex flex-col items-start">
                        <div className="font-bold text-lg mb-1">{product.name?.[lang] || product.name?.en || "No name"}</div>
                        <div className="text-muted-foreground mb-2">{product.price} €</div>
                        <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                            View
                        </button>
                    </div>
                </Link>
            ))}
        </div>
    );
}