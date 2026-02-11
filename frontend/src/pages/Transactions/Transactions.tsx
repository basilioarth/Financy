import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function Transactions() {
    return (
        <div className="flex flex-col m-0 p-0 gap-8">
            <header className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-800">Transações</h1>
                    <span className="text-md leading-6 text-gray-600">Gerencie todas as suas transações financeiras</span>
                </div>
                <Button className="w-fit py-2 px-3 gap-2">
                    <Plus /> Nova transação
                </Button>
            </header>
        </div>
    )
}