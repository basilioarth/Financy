import { SearchX } from "lucide-react"

type NotFoundProps = {
    message: string
}

export const NotFound = ({ message }: NotFoundProps) => {
    return (
        <div className="w-full h-fit flex flex-col justify-center items-center p-8 gap-4 text-gray-500 bg-white border border-dashed border-gray-300 rounded-lg">
            <SearchX size={56} />
            <h2 className="text-lg">{message}</h2>
        </div>
    )
}