import { LucideIcon } from "lucide-react"
import { Button } from "../ui/button"
import { FieldGroup } from "../ui/field"

interface FormLayoutProps {
    title: string
    description: string
    children: React.ReactNode
    submitButtonLabel: string
    disableSubmitButton: boolean
    onSubmit: (e: any) => void
    alternativeFlowLabel: string
    icon: LucideIcon
    navigateButtonLabel: string
}

export function FormLayout({
    title,
    description,
    children,
    submitButtonLabel,
    disableSubmitButton,
    onSubmit,
    alternativeFlowLabel,
    icon: Icon,
    navigateButtonLabel
}: FormLayoutProps) {
    return (
        <div className="flex flex-col justify-center items-center gap-8">
            <img
                src="/logo.svg"
                alt="Logo do Financy"
                className="w-auto h-8"
            />
            <div
                className="w-[448px] h-fit flex flex-col px-8 py-8 justify-center align-center bg-white border border-gray-200 rounded-xl gap-8"
            >
                <div className="flex flex-col justify-center items-center gap-1">
                    <strong className="text-xl leading-7 text-gray-800">{title}</strong>
                    <span className="leading-6 text-gray-600">{description}</span>
                </div>

                <FieldGroup className="gap-4">
                    {children}
                </FieldGroup>

                <div className="flex flex-col justify-center items-center gap-6">
                    <Button
                        disabled={disableSubmitButton}
                        onClick={(e) => onSubmit(e)}
                    >
                        {submitButtonLabel}
                    </Button>

                    <div className="w-full flex items-center gap-3 py-2 px-0">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="text-sm leading-5 text-gray-500">ou</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-4 w-full">
                        <span>{alternativeFlowLabel}</span>
                        <Button variant="labelButtonSecondary">
                            <Icon /> {navigateButtonLabel}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}