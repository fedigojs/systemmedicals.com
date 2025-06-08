'use client'

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteCategory, getAllCategories} from "@/lib/categoryCrud";
import CategoryRow from "@/components/category-row";

function buildTree(categories) {
    const map = {};
    categories.forEach(cat => map[cat.id] = {...cat, children: []});
    const tree = [];
    categories.forEach(cat => {
        if (cat.parent_id) {
            map[cat.parent_id]?.children.push(map[cat.id]);
        } else {
            tree.push(map[cat.id]);
        }
    });
    return tree;
}

export default function CategoryListPage() {

    const queryClient = useQueryClient();

    const {data: categories = []} = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]});
        },
        onError: (error) => {
            alert("Ошибка удаления: " + error.message);
        }
    });

    function handleDelete(id) {
        if (!confirm("Delete this category?")) return;
        deleteMutation.mutate(id);
    }

    const tree = buildTree(categories);

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Categories</h2>
                <Link href="/admin/categories/create">
                    <Button>Create Category</Button>
                </Link>
            </div>
            <table className="w-full border">
                <thead>
                <tr className="bg-muted">
                    <th className="w-1/3 text-left p-2">Name</th>
                    <th className="w-1/3 text-left p-2">Slug</th>
                    <th className="w-1 text-left p-2">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {tree.length === 0 ? (
                    <tr>
                        <td colSpan={3} className="text-gray-400 p-4">No categories found</td>
                    </tr>
                ) : (
                    tree.map(cat =>
                        <CategoryRow key={cat.id} category={cat} onDelete={handleDelete}/>
                    )
                )}
                </tbody>
            </table>
        </div>
    );
}