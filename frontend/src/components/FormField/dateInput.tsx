import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";

interface FormFieldDateInputProps {
    placeholder: string
    value: string
    disabled: boolean
    date: Date
    onChangeValue: (value: Date | undefined) => void
}

export const FormFieldDateInput = ({ placeholder, value, disabled, date, onChangeValue }: FormFieldDateInputProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    className="cursor-pointer caret-transparent"
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
    )
}