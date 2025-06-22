import {Button} from "@/components/ui/button";
import Link from "next/link"

export default function MainPageCard() {

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Link href="/category/stomatology">
                <div
                    className="rounded-xl p-6 flex items-center justify-between bg-cyan-600 text-white hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="max-w-[60%]">
                        <h3 className="text-2xl font-bold mb-2">Stomatology</h3>
                            <p className="text-sm mb-4">Catalog of medical equipment at great prices</p>
                            <Button variant="outline" className="bg-white text-cyan-700 hover:bg-gray-100">
                                View
                            </Button>
                    </div>
                    {/*<img src="/promo/equipment.png" alt="Оборудование" className="w-28 md:w-36 object-contain"/>*/}
                </div>
            </Link>

            <Link href="/category/general-medicine">
                <div
                    className="rounded-xl p-6 flex items-center justify-between bg-yellow-300 text-slate-900 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="max-w-[60%]">
                        <h3 className="text-2xl font-bold mb-2">General Medicine</h3>
                        <p className="text-sm mb-4">Catalog of medical equipment at great prices</p>
                        <Button variant="outline" className="bg-white text-yellow-800 hover:bg-yellow-100">
                            View
                        </Button>
                    </div>
                    {/*<img src="/promo/disposables.png" alt="Расходники" className="w-28 md:w-36 object-contain"/>*/}
                </div>
            </Link>
        </section>
);

}