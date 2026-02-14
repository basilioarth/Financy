import { Field } from "@/components/ui/field";

interface FormFiledContainerProps {
    children: React.ReactNode
}

export const FormFiledContainer = ({ children }: FormFiledContainerProps) => {
    return (
        <Field className="gap-2 group font-inter">
            {children}
        </Field>
    )
}