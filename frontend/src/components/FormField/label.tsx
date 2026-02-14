import { FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

interface FormFiledLabelProps {
    label: string
    error: string
}

export const FormFiledLabel = ({ label, error }: FormFiledLabelProps) => {
    return (
        <FieldLabel
            className={cn(
                "text-sm leading-5 text-gray-700 group-focus-within:text-brand-base",
                error && "text-danger"
            )}
        >
            {label}
        </FieldLabel>
    )
}