import { Button } from "@/components/ui/button"
import { Trash, SquarePen, LucideIcon } from "lucide-react"
import { CategoryIconContainer } from "../CategoryIconContainer"

export type CategoryCardProps = {
    icon: LucideIcon
    iconColor: string
    backgroundColor: string
    labelColor: string
    title: string
    description: string
    itemsAmount: string
}

export function CategoryCard({ icon: Icon, iconColor, backgroundColor, labelColor, title, description, itemsAmount }: CategoryCardProps) {
    return (
        <div className="w-full h-[226px] flex flex-col justify-between items-start p-6 bg-white border-[1px] border-gray-200 rounded-xl">
            <div className="w-full h-fit flex justify-between items-start">
                <CategoryIconContainer
                    value={iconColor}
                    name=""
                    backgroundColor={backgroundColor}
                    icon={Icon}
                    iconColor={iconColor}
                    containerWidth="10"
                    containerHeight="10"
                    iconWidth="4"
                    iconHeight="4"
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
                <span className={`bg-${backgroundColor} text-${labelColor} px-3 py-1 rounded-full text-sm font-medium`}>{title}</span>
                <span className="text-sm text-gray-600">{itemsAmount}</span>
            </div>
        </div>
    )
}