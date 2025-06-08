import { Suspense } from "react";
import CategoryCreate from "@/components/create-category";

export default async function EditCategoryPage({ params }) {
    const resolvedParams = await params;
    return (
        <Suspense>
            <CategoryCreate id={resolvedParams.id}/>
        </Suspense>
    );
}