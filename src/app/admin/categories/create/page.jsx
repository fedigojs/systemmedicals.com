import AdminAuthGuard from "@/components/admin-auth-guard";

export const dynamic = "force-dynamic";

import {Suspense} from "react";
import CategoryCreate from "@/components/create-category";

export default function Page() {
    return (
        <Suspense>
            <AdminAuthGuard>
                <CategoryCreate/>
            </AdminAuthGuard>
        </Suspense>
    );
}