import MainPageCard from "@/components/main-page-card";
import FeaturedProductsGrid from "@/components/featured-products-grid";

export default function Main() {
    return (
        <main className="w-full max-w-6xl mx-auto px-4 py-12">
            <section className="text-center mb-16">
             <MainPageCard />
            </section>
            <section className="text-center mb-16">
                <FeaturedProductsGrid />
            </section>

        </main>
    )

}