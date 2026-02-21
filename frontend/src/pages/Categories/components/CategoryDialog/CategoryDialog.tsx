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
import { useState, useEffect } from "react"
import { apolloClient } from "@/lib/graphql/apollo"
import { CREATE_CATEGORY, UPDATE_CATEGORY } from "@/lib/graphql/mutations/Category"
import { useGqlResponseHandler } from "@/hooks/useGqlResponseHandler"

type CategoryDialogProps = {
    category?: Category
    children: React.ReactNode
    refetch: () => void
}

type CreateCategoryOutput = {
    id: string
    code: string
    title: string
    description: string
    iconName: string
    color: string
    createdAt: string
    updatedAt: string
    author: {
        email: string
        fullName: string
    }
}

type UpdateCategoryOutput = {
    id: string
    code: string
    title: string
    description: string
    iconName: string
    color: string
    createdAt: string
    updatedAt: string
    author: {
        email: string
        fullName: string
    }
}

export const CategoryDialog = ({ category, children, refetch }: CategoryDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = async () => {
        setLoading(true);

        try {
            if (category) {
                await apolloClient.mutate<UpdateCategoryOutput, { data: CategoryInput, updateCategoryId: string }>({
                    mutation: UPDATE_CATEGORY,
                    variables: {
                        data: {
                            title: formData.title,
                            description: formData.description,
                            iconName: formData.iconName,
                            color: formData.color
                        },
                        updateCategoryId: category.id
                    }
                })

                handleGqlResponse({ type: "success", message: "Categoria atualizada com sucesso!", callBack: () => { } })
            } else {
                await apolloClient.mutate<CreateCategoryOutput, { data: CategoryInput }>({
                    mutation: CREATE_CATEGORY,
                    variables: {
                        data: {
                            title: formData.title,
                            description: formData.description,
                            iconName: formData.iconName,
                            color: formData.color
                        }
                    }
                });

                handleGqlResponse({ type: "success", message: "Categoria criada com sucesso!", callBack: () => { } })
            }
            clearInputs();
            refetch();
        } catch (error) {
            console.error(error);
            handleGqlResponse({ type: "error", message: `${error}`, callBack: handleSubmit })
        }

        setLoading(false);
    }

    useEffect(() => {
        if (isOpen && category) {
            setFormData({
                title: category.title,
                description: category.description,
                iconName: category.iconName,
                color: category.color
            })
        }
    }, [category, isOpen])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="font-inter">
                <DialogHeader>
                    <DialogTitle>{category ? "Editar categoria" : "Nova categoria"}</DialogTitle>
                    <DialogDescription>Organize suas transações com categorias</DialogDescription>
                </DialogHeader>
                <FieldGroup className="gap-4">
                    <FormField.Container>
                        <FormField.Label label="Título" error="" />
                        <FormField.Content>
                            <FormField.GenericInput
                                type="text"
                                placeholder="Ex. Alimentação"
                                value={formData.title}
                                onChangeValue={(value) => handleChange("title", value)}
                                hasIcon={false}
                                disabled={loading}
                            />
                        </FormField.Content>
                    </FormField.Container>

                    <FormField.Container>
                        <FormField.Label label="Descrição" error="" />
                        <FormField.Content>
                            <FormField.GenericInput
                                type="text"
                                placeholder="Descrição da categoria"
                                value={formData.description}
                                onChangeValue={(value) => handleChange("description", value)}
                                hasIcon={false}
                                disabled={loading}
                            />
                        </FormField.Content>
                        <FormField.Description description="Opcional" />
                    </FormField.Container>
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
                    <Button onClick={() => handleSubmit()}>
                        Salvar
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}