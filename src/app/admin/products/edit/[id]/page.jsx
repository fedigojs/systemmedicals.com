import ProductForm from "@/components/product-form";
import {Suspense} from "react";

export default async function Page({params}) {
    const resolvedParams = await params;
    console.log(resolvedParams);
    return (
        <Suspense>
            <ProductForm id={params.id}/>
        </Suspense>
    );
}