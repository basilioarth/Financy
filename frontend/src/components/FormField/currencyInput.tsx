import { Input } from "@/components/ui/input"
import { formatCurrencyValue } from "@/utils/currencyFormatter"

interface FormFieldCurrencyInputProps {
    placeholder: string
    value: number
    disabled: boolean
    onChangeValue: (value: number) => void
}

export const FormFieldCurrencyInput = ({ placeholder, value, disabled, onChangeValue }: FormFieldCurrencyInputProps) => {
    const handleChangeValue = (value: string) => {
        // Remove all non-digit characters
        const digitsOnly = value.replace(/\D/g, "");

        if (digitsOnly === "") {
            onChangeValue(0)
        } else {
            // Convert to number (cents)
            const numericValue = parseInt(digitsOnly, 10) / 100;

            onChangeValue(numericValue)
        }
    }

    return (
        <Input
            type="text"
            placeholder={placeholder}
            value={formatCurrencyValue(value)}
            onChange={(e) => handleChangeValue(e.target.value)}
            disabled={disabled}
        />
    )
}