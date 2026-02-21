import { Loader } from "lucide-react"

export const Loading = () => {
    return (
        <div className="w-full h-fit flex flex-col justify-center items-center p-8 gap-4 text-gray-500 bg-white border border-dashed border-gray-300 rounded-lg">
            <Loader className="text-gray-400 animate-spin" size={50} />
        </div>
    )
}