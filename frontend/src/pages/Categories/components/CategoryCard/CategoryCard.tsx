import { Button } from "@/components/ui/button"
import { Trash, SquarePen, LucideIcon } from "lucide-react"
import { CategoryIconContainer } from "../CategoryIconContainer"
import { cn } from "@/lib/utils"

export type CategoryCardProps = {
    icon: LucideIcon
    color: string
    title: string
    description: string
    itemsAmount: number
}

const formattTransactionsAmount = (amount: number) => {
    return (amount == 1) ? `${amount} item` : `${amount} itens`;
}

export function CategoryCard({ icon: Icon, color, title, description, itemsAmount }: CategoryCardProps) {
    return (
        <div className="w-full h-[226px] flex flex-col justify-between items-start p-6 bg-white border-[1px] border-gray-200 rounded-xl">
            <div className="w-full h-fit flex justify-between items-start">
                <CategoryIconContainer
                    name=""
                    value={color}
                    type="icon"
                    color={color}
                    icon={Icon}
                    onChooseIcon={() => { }}
                />
                <div className="w-fit h-fit flex justify-center items-center gap-2">
                    <Button variant="iconButton" size="icon" className="text-danger">
                        <Trash />
                    </Button>
                    <Button variant="iconButton" size="icon">
                        <SquarePen />
                    </Button>
                </div>
            </div>

            <div className="flex flex-col justify-start items-start gap-1">
                <h1 className="text-base font-semibold text-gray-800">{title}</h1>
                <p className="p-0 m-0 text-sm text-gray-600">{description}</p>
            </div>

            <div className="w-full flex justify-between items-center">
                <span className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    color === "green" && "bg-green-light text-green-dark",
                    color === "blue" && "bg-blue-light text-blue-dark",
                    color === "purple" && "bg-purple-light text-purple-dark",
                    color === "pink" && "bg-pink-light text-pink-dark",
                    color === "red" && "bg-red-light text-red-dark",
                    color === "orange" && "bg-orange-light text-orange-dark",
                    color === "yellow" && "bg-yellow-light text-yellow-dark",
                )}>{title}</span>
                <span className="text-sm text-gray-600">{formattTransactionsAmount(itemsAmount)}</span>
            </div>
        </div>
    )
}