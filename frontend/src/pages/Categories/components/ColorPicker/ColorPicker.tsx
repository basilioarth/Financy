import { cn } from "@/lib/utils"

type ColorPickerPorps = {
    color: string,
    value: string,
    onPick: (value: string) => void
}

export function ColorPicker({ color, value, onPick }: ColorPickerPorps) {
    return (
        <div className={
            cn(
                "flex justify-center items-center border-[1px] border-gray-300 rounded-lg p-1 w-[50px] h-[30px] bg-transparent cursor-pointer",
                color === value && "border-brand-base bg-gray-100"
            )}
            onClick={() => onPick(color)}
        >
            <div className={
                cn(
                    "block w-full h-full rounded-sm",
                    color === "green" && "bg-green-base",
                    color === "blue" && "bg-blue-base",
                    color === "purple" && "bg-purple-base",
                    color === "pink" && "bg-pink-base",
                    color === "orange" && "bg-orange-base",
                    color === "red" && "bg-red-base",
                    color === "yellow" && "bg-yellow-base"
                )}
            ></div>
        </div>
    )
}