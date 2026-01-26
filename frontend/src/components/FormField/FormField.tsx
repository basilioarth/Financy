import { cn } from "@/lib/utils";
import {
    Field,
    FieldLabel,
    FieldDescription
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LucideIcon, EyeClosed, Eye } from "lucide-react";

interface FormField {
    type: string
    label: string
    placeholder: string
    value: string
    description?: string,
    onChangeValue: (value: string) => void
    icon: LucideIcon
    error: string
    hidden?: boolean
    onChangeVisibility?: (value: boolean) => void
}

export function FormField({
    type,
    label,
    placeholder,
    value,
    description,
    onChangeValue,
    icon: Icon,
    error,
    hidden,
    onChangeVisibility
}: FormField) {
    return (
        <Field className="gap-2 group">
            <FieldLabel
                className={cn(
                    "text-sm leading-5 text-gray-700 group-focus-within:text-brand-base",
                    error && "text-danger"
                )}
            >
                {label}
            </FieldLabel>
            <div className="relative">
                <Icon
                    className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-brand-base",
                        error && "text-danger"
                    )}
                />
                <Input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChangeValue(e.target.value)}
                    className={cn(type == "password" && "pr-10")}
                />
                {
                    (onChangeVisibility) && (
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
                    )
                }
            </div>
            {description && <FieldDescription className="text-xs leading-4 text-gray-500">{description}</FieldDescription>}
        </Field>
    )
}