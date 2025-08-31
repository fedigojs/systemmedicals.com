import {supabase} from "@/lib/supabaseClient";

export async function fetchContacts() {
    const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1);
    if (error) throw error;
    return data;
}