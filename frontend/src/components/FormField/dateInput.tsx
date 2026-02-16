import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FormFieldDateInputProps {
    placeholder: string
    value: string
    disabled: boolean
    date: Date
    mode: string
    hasSelectionChavron: boolean
    onChangeValue: (value: Date | undefined) => void
}

export const FormFieldDateInput = ({ placeholder, value, disabled, date, mode, hasSelectionChavron, onChangeValue }: FormFieldDateInputProps) => {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="p-0 m-0 relative">
                    <Input
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        disabled={disabled}
                        className="cursor-pointer caret-transparent"
                        readOnly
                    />
                    {hasSelectionChavron &&
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700"
                        >
                            {open ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </button>
                    }
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                {mode === "month-year" ?
                    <Calendar
                        mode="single"
                        captionLayout="dropdown"
                        onMonthChange={(e) => onChangeValue(e)}
                        defaultMonth={date}
                        className="bg-white font-inter text-sm"
                        locale={ptBR}
                        disabled={true}
                    />
                    :
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(e) => onChangeValue(e)}
                        defaultMonth={date}
                        className="bg-white font-inter text-sm"
                        locale={ptBR}
                    />
                }
            </PopoverContent>
        </Popover>
    )
}