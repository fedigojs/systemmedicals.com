'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteProduct, getAllProducts} from "@/lib/productCrud";

export default function ProductListPage() {
    const queryClient = useQueryClient();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });

    const { mutate: handleDelete, isLoading: isDeleting } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
        },
        onError: (error) => {
            alert(error.message || "Ошибка удаления");
        },
    });

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Products</h2>
                <Link href="/admin/products/create">
                    <Button>Create Product</Button>
                </Link>
            </div>
            <table className="w-full border">
                <thead>
                <tr className="bg-muted">
                    <th className="text-left p-2 w-28">Image</th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2 w-24">Quantity</th>
                    <th className="text-left p-2 w-24">Price</th>
                    <th className="text-left p-2 w-24">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="text-gray-400 p-4">No products found</td>
                    </tr>
                ) : (
                    products.map(product =>
                        <tr key={product.id} className="border-b">
                            <td className="p-2 align-middle">
                                {product.main_image_url ? (
                                    <img
                                        src={product.main_image_url}
                                        alt={product.name?.en || "No name"}
                                        className="w-16 h-16 object-cover rounded shadow"
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded text-xs text-gray-400">
                                        No Image
                                    </div>
                                )}
                            </td>
                            <td className="p-2 align-middle font-medium">{product.name?.en || "No name"}</td>
                            <td className="p-2 align-middle text-center">{product.quantity}</td>
                            <td className="p-2 align-middle text-center">{product.price}</td>
                            <td className="p-2 align-middle">
                                <div className="flex gap-2 justify-end">
                                    <Link href={`/admin/products/edit/${product.id}`}>
                                        <Button size="sm" variant="secondary">Edit</Button>
                                    </Link>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => {
                                            if (window.confirm("Delete this product?")) {
                                                handleDelete(product.id);
                                            }
                                        }}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? "Deleting..." : "Delete"}
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </div>
    );
}