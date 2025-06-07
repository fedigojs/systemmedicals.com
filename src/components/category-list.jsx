'use client'
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card } from "@/components/ui/card";

// Converts flat array to a tree structure
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

// Renders single category node with its children
function CategoryNode({ category, level = 0 }) {
    return (
        <div style={{ marginLeft: level * 20 }} className="mb-2">
            <Card className="p-2 flex items-center justify-between">
                <span>{category.name}</span>
                {/* TODO: Add buttons for "Add subcategory", "Edit", "Delete" here */}
            </Card>
            {category.children && category.children.map(child =>
                <CategoryNode key={child.id} category={child} level={level + 1} />
            )}
        </div>
    )
}

export function CategoryList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch all categories from Supabase
        supabase.from('categories').select('*').then(({ data }) => {
            setCategories(buildTree(data || []));
        });
    }, []);

    return (
        <div>
            <h2 className="font-bold mb-2">Categories & Subcategories</h2>
            {categories.map(category =>
                <CategoryNode key={category.id} category={category} />
            )}
        </div>
    );
}