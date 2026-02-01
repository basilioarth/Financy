import { LucideIcon } from "lucide-react";

type LabelCardProps = {
    icon: LucideIcon
    iconColor: string
    title: string
    description: string
}

export function LabelCard({ icon: Icon, iconColor, title, description }: LabelCardProps) {
    return (
        <div className="w-full min-h-[106px] flex justify-start items-start p-6 gap-4 bg-white border-[1px] border-gray-200 rounded-xl">
            <Icon className={iconColor + " h-8 w-8"} />
            <div className="flex flex-col justify-start items-start gap-2">
                <h1 className="font-bold text-[28px] leading-8 text-gray-800">{title}</h1>
                <span className="text-xs font-medium text-gray-500 uppercase">{description}</span>
            </div>
        </div>
    )
}