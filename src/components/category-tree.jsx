'use client'
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function buildTree(categories) {
    const map = {};
    categories.forEach(cat => map[cat.id] = { ...cat, children: [] });
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

function CategoryNode({ category, level = 0 }) {
    return (
        <div style={{ marginLeft: level * 20 }} className="mb-2">
            <Card className="p-2 flex items-center justify-between">
                <span>{category.name?.en || category.name?.ru || "No name"}</span>
                <div className="flex gap-2">
                    <Link href={`/admin/categories/create?parent=${category.id}`}>
                        <Button variant="outline" size="sm">Add Subcategory</Button>
                    </Link>
                    <Link href={`/admin/categories/edit/${category.id}`}>
                        <Button variant="secondary" size="sm">Edit</Button>
                    </Link>
                </div>
            </Card>
            {category.children && category.children.map(child =>
                <CategoryNode key={child.id} category={child} level={level + 1} />
            )}
        </div>
    )
}

export function CategoryTree() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        supabase.from('categories').select('*').then(({ data }) => {
            setCategories(buildTree(data || []));
        });
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Categories</h2>
                <Link href="/admin/categories/create">
                    <Button>Create Category</Button>
                </Link>
            </div>
            {categories.length === 0 ? (
                <div className="text-gray-400">No categories found</div>
            ) : (
                categories.map(category =>
                    <CategoryNode key={category.id} category={category} />
                )
            )}
        </div>
    );
}