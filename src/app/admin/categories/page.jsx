import {CategoryTree} from "@/components/category-tree";
import AdminAuthGuard from "@/components/admin-auth-guard";

export default function CategoriesAdminPage() {
    return (
        <AdminAuthGuard>
            <div className="p-8">
                <CategoryTree/>
            </div>
        </ AdminAuthGuard>
    );
}