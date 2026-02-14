import { cn } from "@/lib/utils";
import {
    Field,
    FieldLabel,
    FieldDescription
} from "@/components/ui/field";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { LucideIcon, EyeClosed, Eye } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";

interface FormField {
    type: string
    label: string
    placeholder: string
    value: string
    date?: Date
    description?: string,
    action?: boolean,
    onChangeValue: (value: string | Date | undefined) => void
    icon?: LucideIcon
    error: string
    hidden?: boolean
    onChangeVisibility?: (value: boolean) => void
    disabled?: boolean
}

export function FormField({
    type,
    label,
    placeholder,
    value,
    date,
    description,
    action,
    onChangeValue,
    icon: Icon,
    error,
    hidden,
    onChangeVisibility,
    disabled
}: FormField) {
    return (
        <Field className="gap-2 group font-inter">
            <FieldLabel
                className={cn(
                    "text-sm leading-5 text-gray-700 group-focus-within:text-brand-base",
                    error && "text-danger"
                )}
            >
                {label}
            </FieldLabel>
            <div className="relative">
                {Icon && <Icon
                    className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-brand-base",
                        error && "text-danger"
                    )}
                />}
                {type == "date" && date ? (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Input
                                type="text"
                                placeholder="Selecione"
                                value={value}
                                disabled={disabled}
                                className="cursor-pointer"
                            />
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(e) => onChangeValue(e)}
                                defaultMonth={date}
                                className="bg-white font-inter text-sm"
                                locale={ptBR}
                            />
                        </PopoverContent>
                    </Popover>
                ) : (
                    <>
                        <Input
                            type={type}
                            placeholder={placeholder}
                            value={value}
                            onChange={(e) => onChangeValue(e.target.value)}
                            className={cn(Icon && "pl-10", type == "password" && "pr-10")}
                            disabled={disabled}
                        />
                        {onChangeVisibility && (
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
                        )}
                    </>
                )}
            </div>
            {description && <FieldDescription className="text-xs leading-4 text-gray-500">{description}</FieldDescription>}
            {action && (
                <div className="flex w-full items-center justify-between text-sm mt-4">
                    <div className="flex gap-2">
                        <Checkbox />
                        <span className="text-gray-700">Lembrar-me</span>
                    </div>
                    <Button variant="linkActivated" size="link">Recuperar senha</Button>
                </div>
            )
            }
        </Field >
    )
}