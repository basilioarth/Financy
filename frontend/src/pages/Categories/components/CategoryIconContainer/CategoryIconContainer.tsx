import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type CategoryIconContainerProps = {
    name: string
    value: string
    type: "button" | "icon"
    color?: string
    icon: LucideIcon
    isAnActionButton?: boolean
    onChooseIcon: (value: string) => void
}

export function CategoryIconContainer({ value, name, icon: Icon, type, color, isAnActionButton = false, onChooseIcon }: CategoryIconContainerProps) {
    return (
        <div
            className={cn(
                "rounded-lg flex justify-center items-center",
                type === "button" && "bg-transparent w-[42px] h-[42px]",
                (type === "icon" && color === "green") && "bg-green-light w-10 h-10",
                (type === "icon" && color === "blue") && "bg-blue-light w-10 h-10",
                (type === "icon" && color === "purple") && "bg-purple-light w-10 h-10",
                (type === "icon" && color === "pink") && "bg-pink-light w-10 h-10",
                (type === "icon" && color === "red") && "bg-red-light w-10 h-10",
                (type === "icon" && color === "orange") && "bg-orange-light w-10 h-10",
                (type === "icon" && color === "yellow") && "bg-yellow-light w-10 h-10",
                (isAnActionButton) && "border-[1px] border-gray-300 rounded-lg cursor-pointer",
                (isAnActionButton && value == name) && "border-brand-base bg-gray-100 text-gray-600"
            )}
            onClick={() => onChooseIcon(name)}
        >
            <Icon className={cn(
                type === "button" && "text-gray-500 w-5 h-5",
                (type === "icon" && color === "green") && "text-green-base w-4 h-4",
                (type === "icon" && color === "blue") && "text-blue-base w-4 h-4",
                (type === "icon" && color === "purple") && "text-purple-base w-4 h-4",
                (type === "icon" && color === "pink") && "text-pink-base w-4 h-4",
                (type === "icon" && color === "red") && "text-red-base w-4 h-4",
                (type === "icon" && color === "orange") && "text-orange-base w-4 h-4",
                (type === "icon" && color === "yellow") && "text-yellow-base w-4 h-4",
            )} />
        </div>
    )
}