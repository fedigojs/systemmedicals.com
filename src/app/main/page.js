import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import MainPageCard from "@/components/main-page-card";

export default function Main() {
    return (
        <main className="w-full max-w-6xl mx-auto px-4 py-12">
            {/* Hero */}
            <section className="text-center mb-16">
             <MainPageCard />
            </section>

            {/* Product Highlights */}
            {/*<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">*/}
            {/*    {products.map((product) => (*/}
            {/*        <Card key={product.id} className="hover:shadow-lg transition-shadow">*/}
            {/*            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-xl" />*/}
            {/*            <CardContent className="p-4">*/}
            {/*                <CardTitle>{product.name}</CardTitle>*/}
            {/*                <p className="text-muted-foreground mt-2">{product.price}</p>*/}
            {/*                <Button className="mt-4 w-full">Add to Cart</Button>*/}
            {/*            </CardContent>*/}
            {/*        </Card>*/}
            {/*    ))}*/}
            {/*</section>*/}
        </main>
    )


  // return (
  //     <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
  //       <h1 className="text-4xl font-bold mb-4 text-blue-700">SystemMedicals</h1>
  //       <div className="flex items-center gap-3 mb-4">
  //         <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></span>
  //         <span className="text-xl text-gray-700">Development in progress</span>
  //       </div>
  //       <p className="text-lg text-gray-500 mb-2">The site is currently under development.</p>
  //       <p className="text-base text-gray-400">Everything will be ready soon 🚀</p>
  //     </div>
  // );
}