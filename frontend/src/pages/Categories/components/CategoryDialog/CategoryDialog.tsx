import { FormField } from "@/components/FormField"
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
import { availableColors } from "@/hooks/useColors"
import { Category, CategoryInput } from "@/types"
import { ColorPicker } from "../ColorPicker"
import { availableIcons } from "@/hooks/useIcons"
import { CategoryIconContainer } from "../CategoryIconContainer"
import { useState } from "react"
import { apolloClient } from "@/lib/graphql/apollo"
import { CREATE_CATEGORY } from "@/lib/graphql/mutations/Category"
import { useGqlResponseHandler } from "@/hooks/useGqlResponseHandler"
import { OperationVariables, ApolloClient } from "@apollo/client"

type CategoryDialogProps = {
    category?: Category
    children: React.ReactNode
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloClient.QueryResult<{
        listCategories: Category[];
    }>>
}

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

export const CategoryDialog = ({ category, children, refetch }: CategoryDialogProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleGqlResponse = useGqlResponseHandler();

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
            handleGqlResponse({ type: "error", message: `${error}` })
        }

        clearInputs();
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
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
                            availableIcon.name !== "undefined" &&
                            <CategoryIconContainer
                                key={availableIcon.name}
                                name={availableIcon.name}
                                value={formData.iconName}
                                type="button"
                                icon={availableIcon.icon}
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