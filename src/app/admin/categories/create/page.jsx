import {Suspense} from "react";
import CategoryCreate from "@/components/create-category";

export default function CreateCategoryPage() {
    return (
        <Suspense>
                <CategoryCreate/>
        </Suspense>
    );
}