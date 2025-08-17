"use client"
import {useTranslations} from 'next-intl';

export default function SubcategoryFilter({
                                              subcategories,
                                              selectedSub,
                                              onSelectSub,
                                          }) {
    const t = useTranslations();

    return (
        <aside className="w-56 flex-shrink-0">
            <div className="font-bold mb-3 text-lg">{t('category.subcategories')}</div>
            <ul className="space-y-2">
                <li>
                    <button
                        className={`w-full text-left rounded px-3 py-2 hover:bg-gray-100 ${!selectedSub ? "bg-gray-200 font-semibold" : ""}`}
                        onClick={() => onSelectSub(null)}
                    >
                        {t('category.all_products')}
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