interface FormFiledContentProps {
    children: React.ReactNode
}

export const FormFieldContent = ({ children }: FormFiledContentProps) => {
    return (
        <div className="relative">
            {children}
        </div>
    )
}