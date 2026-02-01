import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type CategoryIconContainerProps = {
    value: string
    name: string
    backgroundColor: string
    icon: LucideIcon
    iconColor: string
    containerWidth: string
    containerHeight: string
    containerSize?: string
    iconWidth: string
    iconHeight: string
    isAnActionButton?: boolean
    onChooseIcon: (value: string) => void
}

export function CategoryIconContainer({ value, name, backgroundColor, icon: Icon, iconColor, containerWidth, containerHeight, containerSize, iconWidth, iconHeight, isAnActionButton = false, onChooseIcon }: CategoryIconContainerProps) {
    return (
        <div
            className={cn(
                `bg-${backgroundColor} w-${containerWidth} h-${containerHeight} rounded-lg flex justify-center items-center`,
                containerSize && `size-${containerSize}`,
                (isAnActionButton) && "border-[1px] border-gray-300 rounded-lg cursor-pointer",
                (isAnActionButton && value == name) && "border-brand-base bg-gray-100 text-gray-600"
            )}
            onClick={() => onChooseIcon(name)}
        >
            <Icon className={`text-${iconColor} w-${iconWidth} h-${iconHeight}`} />
        </div>
    )
}