import { useEffect, useState } from "react"
import { Plus, Tag, ArrowUpDown } from "lucide-react"
import { useLazyQuery } from "@apollo/client/react"
import { LIST_ALL_CATEGORIES } from "@/lib/graphql/queries/Category"
import { Button } from "@/components/ui/button"
import { getIconByName } from "@/hooks/useIcons"
import { Category } from "@/types"
import { LabelCard } from "./components/LabelCard"
import { CategoryCard } from "./components/CategoryCard"
import { useGqlResponseHandler } from "@/hooks/useGqlResponseHandler"
import { NotFound } from "@/components/NotFound"
import { CategoryDialog } from "./components/CategoryDialog"

export function Categories() {
    const handleGqlResponse = useGqlResponseHandler();
    const [categories, setCategories] = useState<Category[]>([])
    const [mostUsedCategory, setMostUsedCategory] = useState<Category>({ id: "", title: "Nenhuma", code: "", author: { email: "", fullName: "" }, color: "", description: "", iconName: "undefined", transactions: [] });
    const [listAllCategories, { }] = useLazyQuery<{ listCategories: Category[] }>(
        LIST_ALL_CATEGORIES, { fetchPolicy: "network-only" }
    );

    const countTotalTransactionsAmount = () => {
        const arrayOfTransactionsAmount = categories.map((category) => category.transactions.length)
        const totalTransactionsAmount = arrayOfTransactionsAmount.reduce((acumulator, currentValue) => acumulator + currentValue, 0)

        return totalTransactionsAmount
    }

    const calculeMostUsedCategory = (categories: Category[]) => {
        let max = -1;

        categories.forEach((category) => {
            if (category.transactions.length > max) {
                setMostUsedCategory(category)
                max = category.transactions.length
            }
        });
    }

    const handleFetchCategories = async () => {
        try {
            const result = await listAllCategories();

            if (result.error) {
                throw result.error
            }

            if (result.data) {
                console.log(result.data.listCategories)
                setCategories(result.data.listCategories)
                calculeMostUsedCategory(result.data.listCategories)
            }
        } catch (err) {
            console.error(err);
            handleGqlResponse({ type: "error", message: `${err}`, callBack: handleFetchCategories });
        }
    }

    useEffect(() => {
        handleFetchCategories();
    }, [])

    return (
        <div className="flex flex-col m-0 p-0 gap-8">
            <header className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
                    <span className="text-md leading-6 text-gray-600">Organize suas transações por categorias</span>
                </div>
                <CategoryDialog
                    refetch={handleFetchCategories}
                >
                    <Button className="w-fit py-2 px-3 gap-2">
                        <Plus /> Nova categoria
                    </Button>
                </CategoryDialog>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <LabelCard
                    icon={Tag}
                    iconColor="text-gray-700"
                    title={`${categories.length}`}
                    description="total de categorias"
                />
                <LabelCard
                    icon={ArrowUpDown}
                    iconColor="text-purple-base"
                    title={`${countTotalTransactionsAmount()}`}
                    description="total de transações"
                />
                <LabelCard
                    icon={getIconByName(mostUsedCategory.iconName)}
                    iconColor={mostUsedCategory.color === "" ? "text-gray-400" : `text-${mostUsedCategory.color}-base`}
                    title={mostUsedCategory.title}
                    description="categoria mais utilizada"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            refetch={handleFetchCategories}
                        />
                    ))
                }
            </div>
            {categories.length === 0 && (
                <NotFound message="Nenhuma categoria encontrada" />
            )}
        </div>
    )
}