import { FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { Eraser } from "lucide-react";

interface FormFiledLabelProps {
    label: string
    error: string
    hasCleanOption?: boolean
    handleClearInput?: () => void
}

export const FormFiledLabel = ({ label, error, hasCleanOption = false, handleClearInput }: FormFiledLabelProps) => {
    return (
        <FieldLabel
            className={cn(
                "text-sm leading-5 text-gray-700 group-focus-within:text-brand-base",
                hasCleanOption && "flex justify-between items-center",
                error && "text-danger"
            )}
        >
            {label}
            {(hasCleanOption && handleClearInput) &&
                <Eraser
                    className="h-4 w-4 cursor-pointer text-gray-700 hover:text-danger transition-colors duration-200"
                    onClick={handleClearInput}
                />
            }
        </FieldLabel>
    )
}