export const dynamic = "force-dynamic";

import { Suspense } from "react";
import CategoryCreate from "@/components/create-category";

export default function Page() {
    return (
        <Suspense>
            <CategoryCreate />
        </Suspense>
    );
}