import { useEffect, useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Author, Category, Transaction } from "@/types"
import { FieldGroup } from "@/components/ui/field"
import { FormField } from "@/components/FormField"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/utils/datesFormatter"
import { CircleArrowDown, CircleArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGqlResponseHandler } from "@/hooks/useGqlResponseHandler"
import { apolloClient } from "@/lib/graphql/apollo"
import { StringDecoder } from "string_decoder"
import { CREATE_TRANSACTION, UPDATE_TRANSACTION } from "@/lib/graphql/mutations/Transaction"

type TransactionDialogProps = {
    transaction?: Transaction
    availableCategories: Category[]
    children: React.ReactNode
    refetch: () => void
}

type TransactionInput = {
    type: string
    description: string
    date: Date
    value: number
    category: string
}

type CreateTransactionInput = {
    type: string
    description: string
    date: Date
    value: number
    categoryId: string
}

type CreateTransactionOutput = {
    id: string
    type: string
    description: string
    date: Date
    value: number
    category: Category
    author: Author
}

export function TransactionDialog({ transaction, availableCategories, children, refetch }: TransactionDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<TransactionInput>({
        type: "",
        description: "",
        date: new Date(),
        value: 0.0,
        category: ""
    });
    const handleGqlResponse = useGqlResponseHandler()

    const clearInputs = () => {
        setFormData(prev => ({ ...prev, ["type"]: "" }));
        setFormData(prev => ({ ...prev, ["description"]: "" }));
        setFormData(prev => ({ ...prev, ["date"]: new Date() }));
        setFormData(prev => ({ ...prev, ["value"]: 0.0 }));
        setFormData(prev => ({ ...prev, ["category"]: "" }));
    }

    const handleChangeType = (value: string) => {
        setFormData(prev => ({ ...prev, ["type"]: value }));
    }

    const handleChangeDesciption = (value: string) => {
        setFormData(prev => ({ ...prev, ["description"]: value }));
    }

    const handleChangeDate = (value: Date) => {
        setFormData(prev => ({ ...prev, ["date"]: value }));
    }

    const handleChangeValue = (value: number) => {
        setFormData(prev => ({ ...prev, ["value"]: value }));
    }

    const handleChangeCategory = (value: string) => {
        setFormData(prev => ({ ...prev, ["category"]: value }));
    }

    const getCategoryIdByTitle = (title: string) => {
        return availableCategories.filter((category) => category.title == title)[0]
    }

    const handleSubmit = async () => {
        setLoading(true);

        try {
            if (transaction) {
                await apolloClient.mutate<CreateTransactionOutput, { data: CreateTransactionInput, id: string }>({
                    mutation: UPDATE_TRANSACTION,
                    variables: {
                        data: {
                            type: formData.type,
                            description: formData.description,
                            date: formData.date,
                            value: formData.value,
                            categoryId: getCategoryIdByTitle(formData.category).id
                        },
                        id: transaction.id
                    }
                })

                handleGqlResponse({ type: "success", message: "Transação atualizada com sucesso!", callBack: () => { } })
            } else {
                await apolloClient.mutate<CreateTransactionOutput, { data: CreateTransactionInput }>({
                    mutation: CREATE_TRANSACTION,
                    variables: {
                        data: {
                            type: formData.type,
                            description: formData.description,
                            date: formData.date,
                            value: formData.value,
                            categoryId: getCategoryIdByTitle(formData.category).id
                        }
                    }
                })

                handleGqlResponse({ type: "success", message: "Transação criada com sucesso!", callBack: () => { } })
            }
            clearInputs();
            refetch();
        } catch (error) {
            console.error(error);
            handleGqlResponse({ type: "error", message: `${error}`, callBack: () => handleSubmit() })
        }

        setLoading(false);
    }

    const isFormFullFilled = () => {
        return (formData.type != "" && formData.description != "" && formData.value != 0.0 && formData.category != "")
    }

    useEffect(() => {
        if (isOpen && transaction) {
            setFormData({
                type: transaction.type,
                description: transaction.description,
                date: transaction.date,
                value: transaction.value,
                category: transaction.category.title
            })
        }
    }, [transaction, isOpen])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="font-inter">
                <DialogHeader>
                    <DialogTitle>{transaction ? "Editar trasação" : "Nova transação"}</DialogTitle>
                    <DialogDescription>Registre sua despesa ou receita</DialogDescription>
                </DialogHeader>
                <div className="flex p-2 border-[1px] border-gray-200 rounded-xl w-full min-h-[62px] justify-between">
                    <Button
                        variant="typeSelectOption"
                        size="select"
                        className={cn(formData.type === "Saída" &&
                            "bg-gray-100 border-[1px] border-red-base rounded-lg"
                        )}
                        onClick={() => handleChangeType("Saída")}
                    >
                        <CircleArrowDown
                            className={cn("h-4 w-4 text-gray-400",
                                formData.type === "Saída" && "text-red-base"
                            )}
                        />
                        <span className={cn(formData.type === "Saída" && "font-medium text-gray-800")}>Despesa</span>
                    </Button>
                    <Button
                        variant="typeSelectOption"
                        size="select"
                        className={cn(formData.type === "Entrada" &&
                            "bg-gray-100 border-[1px] border-green-base rounded-lg"
                        )}
                        onClick={() => handleChangeType("Entrada")}
                    >
                        <CircleArrowUp
                            className={cn("h-4 w-4 text-gray-400",
                                formData.type === "Entrada" && "text-green-base"
                            )}
                        />
                        <span className={cn(formData.type === "Entrada" && "font-medium text-gray-800")}>Receita</span>
                    </Button>
                </div>
                <FieldGroup className="gap-4">
                    <FormField.Container>
                        <FormField.Label label="Descrição" error="" />
                        <FormField.Content>
                            <FormField.GenericInput
                                type="text"
                                placeholder="Ex. Almoço no restaurante"
                                value={formData.description}
                                onChangeValue={(value) => { handleChangeDesciption(value) }}
                                hasIcon={false}
                                disabled={loading}
                            />
                        </FormField.Content>
                    </FormField.Container>
                    <div className="flex w-full justify-between items-center gap-4">
                        <FormField.Container>
                            <FormField.Label label="Data" error="" />
                            <FormField.Content>
                                <FormField.DateInput
                                    placeholder="Selecione"
                                    value={formData.date instanceof Date ? formatDate(formData.date.toISOString(), "yyyy") : formatDate(formData.date, "yyyy")}
                                    disabled={loading}
                                    date={formData.date}
                                    onChangeValue={(value) => { value instanceof Date && handleChangeDate(value) }}
                                />
                            </FormField.Content>
                        </FormField.Container>

                        <FormField.Container>
                            <FormField.Label label="Valor" error="" />
                            <FormField.Content>
                                <FormField.CurrencyInput
                                    placeholder="R$ 0,00"
                                    value={formData.value}
                                    disabled={loading}
                                    onChangeValue={(value) => { handleChangeValue(value) }}
                                />
                            </FormField.Content>
                        </FormField.Container>
                    </div>
                    <FormField.Container>
                        <FormField.Label label="Categoria" error="" />
                        <FormField.Content>
                            <FormField.DropDownInput
                                placeholder="Selecione"
                                value={formData.category}
                                disabled={loading}
                                options={availableCategories.map((category) => category.title)}
                                onChangeValue={(value) => { handleChangeCategory(value) }}
                            />
                        </FormField.Content>
                    </FormField.Container>
                </FieldGroup>
                <DialogClose asChild>
                    <Button onClick={() => handleSubmit()} disabled={loading || !isFormFullFilled()}>
                        Salvar
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}