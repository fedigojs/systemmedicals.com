import ProductForm from "@/components/product-form";
import {Suspense} from "react";

export default async function Page({params}) {
    return (
        <Suspense>
            <ProductForm id={params.id}/>
        </Suspense>
    );
}