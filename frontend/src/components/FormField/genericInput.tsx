import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FormFieldGenericInputProps {
    type: string
    placeholder: string
    value: string
    hasIcon: boolean
    disabled: boolean
    onChangeValue: (value: string) => void
}

export const FormFieldGenericInput = ({ type, placeholder, value, onChangeValue, hasIcon, disabled }: FormFieldGenericInputProps) => {
    return (
        <Input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
            className={cn(hasIcon && "pl-10")}
            disabled={disabled}
        />
    )
}