import { FieldDescription } from "@/components/ui/field";

interface FormFieldDescriptionProps {
    description: string
}

export const FormFieldDescription = ({ description }: FormFieldDescriptionProps) => {
    return (
        <FieldDescription className="text-xs leading-4 text-gray-500">
            {description}
        </FieldDescription>
    )
}