import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface FormFieldIconProps {
    icon: LucideIcon
    error: string
}

export const FormFieldIcon = ({ icon: Icon, error }: FormFieldIconProps) => {
    return (
        <Icon
            className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-brand-base",
                error && "text-danger"
            )}
        />
    )
}