import { Button } from "@/components/ui/button"
import { Plus, Tag, ArrowUpDown, Utensils, Ticket, PiggyBank, ShoppingCart, BriefcaseBusiness, HeartPulse, CarFront, ToolCase } from "lucide-react"
import { LabelCard } from "./components/LabelCard"
import { CategoryCard, type CategoryCardProps } from "./components/CategoryCard"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FieldGroup } from "@/components/ui/field"
import { FormField } from "@/components/FormField"
import { useState } from "react"
import { availableIcons } from "@/hooks/useIcons";
import { CategoryIconContainer } from "./components/CategoryIconContainer"
import { availableColors } from "@/hooks/useColors"
import { ColorPicker } from "./components/ColorPicker"

export function Categories() {
    const categoryList: CategoryCardProps[] = [
        {
            icon: Utensils,
            iconColor: "blue-base",
            backgroundColor: "blue-light",
            labelColor: "blue-dark",
            title: "Alimentação",
            description: "Restaurantes, delivery e refeições",
            itemsAmount: "12 itens"
        },
        {
            icon: Ticket,
            iconColor: "pink-base",
            backgroundColor: "pink-light",
            labelColor: "pink-dark",
            title: "Entretenimento",
            description: "Cinema, jogos e lazer",
            itemsAmount: "2 itens"
        },
        {
            icon: PiggyBank,
            iconColor: "green-base",
            backgroundColor: "green-light",
            labelColor: "green-dark",
            title: "Investimento",
            description: "Aplicações e retornos financeiros",
            itemsAmount: "1 item"
        },
        {
            icon: ShoppingCart,
            iconColor: "orange-base",
            backgroundColor: "orange-light",
            labelColor: "orange-dark",
            title: "Mercado",
            description: "Compras de supermercado e mantimentos",
            itemsAmount: "3 itens"
        },
        {
            icon: BriefcaseBusiness,
            iconColor: "green-base",
            backgroundColor: "green-light",
            labelColor: "green-dark",
            title: "Salário",
            description: "Renda mensal e bonificações",
            itemsAmount: "3 itens"
        },
        {
            icon: HeartPulse,
            iconColor: "red-base",
            backgroundColor: "red-light",
            labelColor: "red-dark",
            title: "Saúde",
            description: "Medicamentos, consultas e exames",
            itemsAmount: "0 itens"
        },
        {
            icon: CarFront,
            iconColor: "purple-base",
            backgroundColor: "purple-light",
            labelColor: "purple-dark",
            title: "Transporte",
            description: "Gasolina, transporte público e viagens",
            itemsAmount: "8 itens"
        },
        {
            icon: ToolCase,
            iconColor: "yellow-base",
            backgroundColor: "yellow-light",
            labelColor: "yellow-dark",
            title: "Utilidades",
            description: "Energia, água, internet e telefone",
            itemsAmount: "7 itens"
        }
    ]
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        iconName: "",
        color: ""
    });

    const clearInputs = () => {
        Object.keys(formData).forEach(key => {
            setFormData(prev => ({ ...prev, [key]: "" }));
        })
    }

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        console.log(formData.color)
    }

    const handleCreateNewCategory = () => {
        console.log(formData);
        clearInputs();
    }

    return (
        <Dialog>
            <div className="flex flex-col m-0 p-0 gap-8">
                <header className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
                        <span className="text-md leading-6 text-gray-600">Organize suas transações por categorias</span>
                    </div>
                    <DialogTrigger asChild>
                        <Button className="w-fit py-2 px-3 gap-2">
                            <Plus /> Nova categoria
                        </Button>
                    </DialogTrigger>
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
                                key={category.title}
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
            <DialogContent className="font-inter">
                <DialogHeader>
                    <DialogTitle>Nova categoria</DialogTitle>
                    <DialogDescription>Organize suas transações com categorias</DialogDescription>
                </DialogHeader>
                <FieldGroup className="gap-4">
                    <FormField
                        type="text"
                        label="Título"
                        placeholder="Ex. Alimentação"
                        value={formData.title}
                        onChangeValue={(value) => handleChange("title", value)}
                        error=""
                    />
                    <FormField
                        type="text"
                        label="Descrição"
                        placeholder="Descrição da categoria"
                        value={formData.description}
                        onChangeValue={(value) => handleChange("description", value)}
                        error=""
                        description="Opcional"
                    />
                </FieldGroup>
                <div className="flex flex-col justify-start items-start gap-2">
                    <h2 className="text-sm text-gray-700 font-medium">Ícone</h2>
                    <div className="grid grid-cols-8 gap-2">
                        {availableIcons.map((availableIcon) => (
                            <CategoryIconContainer
                                key={availableIcon.name}
                                name={availableIcon.name}
                                value={formData.iconName}
                                backgroundColor="transparent"
                                iconColor="gray-500"
                                icon={availableIcon.icon}
                                containerWidth="0"
                                containerHeight="0"
                                containerSize="[42px]"
                                iconWidth="5"
                                iconHeight="5"
                                isAnActionButton={true}
                                onChooseIcon={(value) => handleChange("iconName", value)}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-2">
                    <h2 className="text-sm text-gray-700 font-medium">Cor</h2>
                    <div className="grid grid-cols-7 gap-2">
                        {
                            availableColors.map((availableColor) => (
                                <ColorPicker
                                    key={availableColor}
                                    color={availableColor}
                                    value={formData.color}
                                    onPick={(value) => { handleChange("color", value) }}
                                />
                            ))
                        }
                    </div>
                </div>
                <DialogClose asChild>
                    <Button onClick={() => handleCreateNewCategory()}>
                        Salvar
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}