export default function SubcategoryFilter({
                                              subcategories,
                                              selectedSub,
                                              onSelectSub,
                                          }) {
    return (
        <aside className="w-56 flex-shrink-0">
            <div className="font-bold mb-3 text-lg">Subcategories</div>
            <ul className="space-y-2">
                <li>
                    <button
                        className={`w-full text-left rounded px-3 py-2 hover:bg-gray-100 ${!selectedSub ? "bg-gray-200 font-semibold" : ""}`}
                        onClick={() => onSelectSub(null)}
                    >
                        All products
                    </button>
                </li>
                {subcategories.map((sub) => (
                    <li key={sub.id}>
                        <button
                            className={`w-full text-left rounded px-3 py-2 hover:bg-gray-100 ${selectedSub === sub.id ? "bg-gray-200 font-semibold" : ""}`}
                            onClick={() => onSelectSub(sub.id)}
                        >
                            {sub.name?.en || "No Name"}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    )
}