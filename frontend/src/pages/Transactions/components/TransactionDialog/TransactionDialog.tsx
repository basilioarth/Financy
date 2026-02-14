import { useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Category, Transaction } from "@/types"
import { FieldGroup } from "@/components/ui/field"
import { FormField } from "@/components/FormField"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/utils/datesFormatter"
import { CircleArrowDown, CircleArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

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

    const handleSubmit = () => {
        setLoading(true);

        console.log(formData)
        clearInputs();
        refetch();

        setLoading(false);
    }

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
                                    value={formatDate(formData.date.toISOString(), "yyyy")}
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
                    <Button onClick={() => handleSubmit()}>
                        Salvar
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}