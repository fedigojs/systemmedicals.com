import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function CategoryRow({category, level = 0, onDelete}) {
    return (
        <>
            <tr>
                <td style={{paddingLeft: `${8 + level * 32}px`}}>
                    {level > 0 && <span className="mr-2">↳</span>}
                    {category.name?.en || category.name?.pl || category.name?.fr || "No name"}
                </td>
                <td className="pl-2">{category.slug?.en || ""}</td>
                <td>
                    <div className="flex justify-end">
                        <Link href={`/admin/categories/edit/${category.id}`}>
                            <Button className="mx-2 my-1" size="sm" variant="secondary">Edit</Button>
                        </Link>
                        <Button
                            className="mx-2 my-1"
                            size="sm"
                            variant="destructive"
                            onClick={() => onDelete(category.id)}
                        >Delete</Button>
                    </div>
                </td>
            </tr>
            {category.children?.map(child =>
                <CategoryRow key={child.id} category={child} level={level + 1} onDelete={onDelete}/>
            )}
        </>
    )
}
