import { useState } from "react"
import { Plus, Tag, ArrowUpDown, Utensils, SearchX } from "lucide-react"
import { useQuery } from "@apollo/client/react"
import { LIST_ALL_CATEGORIES } from "@/lib/graphql/queries/Category"
import { apolloClient } from "@/lib/graphql/apollo"
import { CREATE_CATEGORY } from "@/lib/graphql/mutations/Category"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FieldGroup } from "@/components/ui/field"
import { FormField } from "@/components/FormField"
import { availableIcons, getIconByName } from "@/hooks/useIcons"
import { availableColors } from "@/hooks/useColors"
import { Category, CategoryInput } from "@/types"
import { LabelCard } from "./components/LabelCard"
import { CategoryCard } from "./components/CategoryCard"
import { CategoryIconContainer } from "./components/CategoryIconContainer"
import { ColorPicker } from "./components/ColorPicker"
import { useGqlResponseHandler } from "@/hooks/useGqlResponseHandler"
import { NotFound } from "@/components/NotFound"

type CreateCategoryInput = {
    id: string
    code: string
    title: string
    description: string
    iconName: string
    colorHexCode: string
    createdAt: string
    updatedAt: string
    author: {
        email: string
        fullName: string
    }
}

export function Categories() {
    const handleGqlResponse = useGqlResponseHandler();

    const { data, loading, error, refetch } = useQuery<{ listCategories: Category[] }>(
        LIST_ALL_CATEGORIES
    );
    error && handleGqlResponse({ type: "error", message: error.message });

    const categories = data?.listCategories ?? [];

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
    }

    const formattTransactionsAmount = (amount: number) => {
        return (amount == 1) ? `${amount} item` : `${amount} itens`;
    }

    const handleCreateNewCategory = async () => {
        try {
            await apolloClient.mutate<CreateCategoryInput, { data: CategoryInput }>({
                mutation: CREATE_CATEGORY,
                variables: {
                    data: {
                        title: formData.title,
                        description: formData.description,
                        iconName: formData.iconName,
                        colorHexCode: formData.color
                    }
                }
            });
            handleGqlResponse({ type: "success", message: "Categoria criada com sucesso!" })

            refetch();
        } catch (error) {
            console.error(error);
            handleGqlResponse({ type: "error", message: "Erro ao tentar criar categoria!" })
        }

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
                    {!loading &&
                        categories.map((category) => (
                            <CategoryCard
                                key={category.code}
                                icon={getIconByName(category.iconName)}
                                iconColor={`${category.colorHexCode}-base`}
                                backgroundColor={`${category.colorHexCode}-light`}
                                labelColor={`${category.colorHexCode}-dark`}
                                title={category.title}
                                description={category.description}
                                itemsAmount={formattTransactionsAmount(category.transactions.length)}
                            />
                        ))
                    }
                </div>
                {categories.length === 0 && (
                    <NotFound message="Nenhuma categoria encontrada" />
                )}
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