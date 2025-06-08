import ProductForm from "@/components/product-form";
import {Suspense} from "react";

export default function ProductCreatePage() {
    return (
        <Suspense>
            <ProductForm/>
        </Suspense>
    );
}