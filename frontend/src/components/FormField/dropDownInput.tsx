import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"


interface FormFieldDropDownInputProps {
    placeholder: string
    value: string
    disabled: boolean
    options: string[]
    onChangeValue: (value: string) => void
}

export const FormFieldDropDownInput = ({ placeholder, value, disabled, options, onChangeValue }: FormFieldDropDownInputProps) => {
    const [showingOptions, setShowingOptions] = useState(false);

    return (
        <div onClick={() => setShowingOptions(!showingOptions)} className="relative">
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                className={"pr-10 cursor-pointer caret-transparent"}
                disabled={disabled}
            />
            <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700"
            >
                {showingOptions ? (
                    <ChevronUp className="h-4 w-4" />
                ) : (
                    <ChevronDown className="h-4 w-4" />
                )}
            </button>
            {showingOptions &&
                <div className="absolute w-full bg-white rounded-xl max-h-[200px] overflow-y-scroll overflow-x-clip z-50">
                    {
                        options.map((option) => (
                            <div
                                className="flex flex-start items-center p-4 m-0 font-inter text-base text-black hover:bg-gray-100 cursor-pointer"
                                onClick={() => onChangeValue(option)}
                            >
                                <span>{option}</span>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}