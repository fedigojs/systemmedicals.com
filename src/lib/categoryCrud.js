import {supabase} from "@/lib/supabaseClient";

export async function createCategory(data) {
    const { error, data: inserted } = await supabase
        .from("categories")
        .insert([data])
        .select()
        .single();

    if (error) throw error;
    return inserted;
}

export async function getCategoryById(id) {
    const { error, data } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
}

export async function getAllCategories({ activeOnly = false } = {}) {
    let query = supabase
        .from("categories")
        .select("*")
        .order("sort_order", { ascending: true });

    if (activeOnly) {
        query = query.eq("is_active", true);
    }

    const { error, data } = await query;
    if (error) throw error;
    return data;
}


export async function updateCategory(id, updatedFields) {
    const { error, data } = await supabase
        .from("categories")
        .update(updatedFields)
        .eq("id", id)
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function deleteCategory(id) {
    const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);
    if (error) throw error;
}