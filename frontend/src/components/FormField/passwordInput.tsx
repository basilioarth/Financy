import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Eye, EyeClosed } from "lucide-react"

interface FormFieldPasswordInputProps {
    type: string
    placeholder: string
    value: string
    hasIcon: boolean
    disabled: boolean
    hidden: boolean
    onChangeValue: (value: string) => void
    onChangeVisibility: (value: boolean) => void
}

export const FormFieldPasswordInput = ({ type, placeholder, value, hasIcon, disabled, hidden, onChangeValue, onChangeVisibility }: FormFieldPasswordInputProps) => {
    return (
        <>
            <Input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChangeValue(e.target.value)}
                className={cn("pr-10", hasIcon && "pl-10")}
                disabled={disabled}
            />
            <button
                type="button"
                onClick={() => onChangeVisibility(!hidden)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700"
            >
                {hidden ? (
                    <Eye className="h-4 w-4" />
                ) : (
                    <EyeClosed className="h-4 w-4" />
                )}
            </button>
        </>
    )
}