import Header from "@/components/header";
import Footer from "@/components/footer";
import {Suspense} from "react";


export default function MainLayout({children}) {
    return (<>
        <Suspense>
            <div className="min-h-screen flex flex-col">
            <Header/>
                <main className="flex-1">{children}</main>
            <Footer/>
            </div>
        </Suspense>
    </>);
}
