import {supabase} from "@/lib/supabaseClient";

export async function getAllProducts() {
    const {data, error} = await supabase.from("products").select("*");
    if (error) throw error;
    return data;
}

export async function getProductById(id) {
    const {data, error} = await supabase.from("products").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
}

export async function createProduct(data) {
    const {data: inserted, error} = await supabase.from("products").insert([data]).select().single();
    if (error) throw error;
    return inserted;
}

export async function updateProduct(id, data) {
    const {data: updated, error} = await supabase.from("products").update(data).eq("id", id).select().single();
    if (error) throw error;
    return updated;
}

export async function deleteProduct(id) {
    const {error} = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
}