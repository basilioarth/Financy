import { Skeleton } from "@/components/Skeleton";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react"

interface BigNumbersCardProps {
    icon: LucideIcon,
    iconColor: string,
    title: string,
    value: string,
    loading: boolean
}

export const BigNumbersCard = ({ icon: Icon, iconColor, title, value, loading }: BigNumbersCardProps) => {
    const iconBackground = `text-${iconColor}`;

    return (
        <div className="flex flex-col justify-start w-full h-auto gap-4 p-6 bg-white border-[1px] border-gray-200 rounded-xl">
            <div className="flex justify-start items-center gap-3">
                <Icon className={cn(
                    iconBackground,
                    "h-5 w-5"
                )} />
                <span className="text-xs font-medium text-gray-500 uppercase">{title}</span>
            </div>
            <span className="text-[28px] leading-8 font-bold text-gray-800 uppercase">{loading ? <Skeleton className="w-[120px] h-8" /> : value}</span>
        </div>
    )
}