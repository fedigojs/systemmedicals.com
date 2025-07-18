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

export async function getProductBySlug(slug) {
    // Получаем все продукты (или только слаги, если их много)
    const { data: products, error } = await supabase
        .from("products")
        .select("*, slug");
    if (error) throw error;
    // Находим товар, у которого хотя бы один slug совпадает
    return products.find(p =>
        Object.values(p.slug || {}).includes(slug)
    );
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

export async function getProductWithCategories(id) {
    const { data, error } = await supabase
        .from("product_categories")
        .select("category_id")
        .eq("product_id", id);

    if (error) throw error;
    return data.map(d => d.category_id);
}

export async function upsertProductCategories(productId, categoryIds) {
    // Удаляем все старые связи
    await supabase.from("product_categories").delete().eq("product_id", productId);

    // Если нет категорий — не вставляем ничего
    if (!categoryIds || categoryIds.length === 0) return;

    // Вставляем новые связи
    const inserts = categoryIds.map(categoryId => ({
        product_id: productId,
        category_id: categoryId,
    }));

    const { error } = await supabase.from("product_categories").insert(inserts);
    if (error) throw error;
}

export async function getAllProductsWithCategories() {
    // Получить все товары
    const { data: products, error: error1 } = await supabase.from("products").select("*");
    if (error1) throw error1;
    // Получить все связи товар-категория
    const { data: rels, error: error2 } = await supabase.from("product_categories").select("*");
    if (error2) throw error2;
    // Собираем массив категорий для каждого товара
    const map = {};
    rels.forEach(rel => {
        if (!map[rel.product_id]) map[rel.product_id] = [];
        map[rel.product_id].push(rel.category_id);
    });
    // Добавляем category_ids в каждый продукт
    return products.map(p => ({
        ...p,
        category_ids: map[p.id] || [],
    }));
}