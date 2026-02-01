import { Button } from "@/components/ui/button"
import { Plus, Tag, ArrowUpDown, Utensils, Ticket, PiggyBank, ShoppingCart, BriefcaseBusiness, HeartPulse, CarFront, ToolCase } from "lucide-react"
import { LabelCard } from "./components/LabelCard"
import { CategoryCard, type CategoryCardProps } from "./components/CategoryCard"

export function Categories() {
    const categoryList: CategoryCardProps[] = [
        {
            icon: Utensils,
            iconColor: "text-blue-base",
            backgroundColor: "bg-blue-light",
            labelColor: "text-blue-dark",
            title: "Alimentação",
            description: "Restaurantes, delivery e refeições",
            itemsAmount: "12 itens"
        },
        {
            icon: Ticket,
            iconColor: "text-pink-base",
            backgroundColor: "bg-pink-light",
            labelColor: "text-pink-dark",
            title: "Entretenimento",
            description: "Cinema, jogos e lazer",
            itemsAmount: "2 itens"
        },
        {
            icon: PiggyBank,
            iconColor: "text-green-base",
            backgroundColor: "bg-green-light",
            labelColor: "text-green-dark",
            title: "Investimento",
            description: "Aplicações e retornos financeiros",
            itemsAmount: "1 item"
        },
        {
            icon: ShoppingCart,
            iconColor: "text-orange-base",
            backgroundColor: "bg-orange-light",
            labelColor: "text-orange-dark",
            title: "Mercado",
            description: "Compras de supermercado e mantimentos",
            itemsAmount: "3 itens"
        },
        {
            icon: BriefcaseBusiness,
            iconColor: "text-green-base",
            backgroundColor: "bg-green-light",
            labelColor: "text-green-dark",
            title: "Salário",
            description: "Renda mensal e bonificações",
            itemsAmount: "3 itens"
        },
        {
            icon: HeartPulse,
            iconColor: "text-red-base",
            backgroundColor: "bg-red-light",
            labelColor: "text-red-dark",
            title: "Saúde",
            description: "Medicamentos, consultas e exames",
            itemsAmount: "0 itens"
        },
        {
            icon: CarFront,
            iconColor: "text-purple-base",
            backgroundColor: "bg-purple-light",
            labelColor: "text-purple-dark",
            title: "Transporte",
            description: "Gasolina, transporte público e viagens",
            itemsAmount: "8 itens"
        },
        {
            icon: ToolCase,
            iconColor: "text-yellow-base",
            backgroundColor: "bg-yellow-light",
            labelColor: "text-yellow-dark",
            title: "Utilidades",
            description: "Energia, água, internet e telefone",
            itemsAmount: "7 itens"
        }
    ]

    return (
        <div className="flex flex-col m-0 p-0 gap-8">
            <header className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
                    <span className="text-md leading-6 text-gray-600">Organize suas transações por categorias</span>
                </div>
                <Button className="w-fit py-2 px-3 gap-2">
                    <Plus /> Nova categoria
                </Button>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <LabelCard
                    icon={Tag}
                    iconColor="text-gray-700"
                    title="8"
                    description="total de categorias"
                />
                <LabelCard
                    icon={ArrowUpDown}
                    iconColor="text-purple-base"
                    title="27"
                    description="total de transações"
                />
                <LabelCard
                    icon={Utensils}
                    iconColor="text-blue-base"
                    title="Alimentação"
                    description="categoria mais utilizada"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    categoryList.map((category) => (
                        <CategoryCard
                            icon={category.icon}
                            iconColor={category.iconColor}
                            backgroundColor={category.backgroundColor}
                            labelColor={category.labelColor}
                            title={category.title}
                            description={category.description}
                            itemsAmount={category.itemsAmount}
                        />
                    ))
                }
            </div>
        </div>
    )
}