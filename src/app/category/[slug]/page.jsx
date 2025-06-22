"use client"

import {useEffect, useState} from "react"
import {useParams} from "next/navigation"
import {getAllProducts} from "@/lib/productCrud"
import {getAllCategories} from "@/lib/categoryCrud"
import {Card, CardContent, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import Link from "next/link"

export default function CategoryPage() {
    const params = useParams()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState(null)

    useEffect(() => {
        const slug = params.slug

        const loadData = async () => {
            try {
                const categories = await getAllCategories()
                const matchedCategory = categories.find(cat => cat.slug?.en === slug)
                setCategory(matchedCategory)
                if (!matchedCategory) return

                const allProducts = await getAllProducts()
                const filtered = allProducts.filter(
                    (product) => product.category_id === matchedCategory.id
                )
                setProducts(filtered)
            } catch (error) {
                console.error("Download error:", error)
            }
        }

        if (slug) {
            loadData()
        }
    }, [params.slug])

    if (!category) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                Category do not found
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">
                {category.name?.en || "No Name"}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`}>
                        <Card key={product.id} className="hover:shadow-lg transition-shadow">
                            <img
                                src={product.main_image_url || "/placeholder.jpg"}
                                alt={product.name?.en || "Product image"}
                                className="w-full h-48 object-cover rounded-t-xl"
                            />
                            <CardContent className="p-4">
                                <CardTitle>{product.name?.en || "No Name"}</CardTitle>
                                <p className="text-muted-foreground mt-2">
                                    {product.price} грн
                                </p>
                                <Button className="mt-4 w-full">View</Button>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}