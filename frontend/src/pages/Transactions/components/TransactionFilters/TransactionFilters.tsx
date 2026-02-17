import { FormField } from "@/components/FormField"
import { Search } from "lucide-react"
import { useQueryState, parseAsString } from "nuqs"
import { Category } from "@/types";
import { useEffect, useState } from "react";
import { transformDateToPeriod } from "@/utils/datesFormatter";

interface TransactionFiltersProps {
    availableCategories: Category[]
}

export const TransactionFilters = ({ availableCategories }: TransactionFiltersProps) => {
    const [localDescription, setLocalDescription] = useState('');
    const [localDate, setLocalDate] = useState(new Date())

    const [descriptionFilter, setDescriptionFilter] = useQueryState('description', parseAsString.withDefault(''))
    const [typeFilter, setTypeFilter] = useQueryState('type', parseAsString.withDefault(''))
    const [categoryFilter, setCategoryFilter] = useQueryState('category', parseAsString.withDefault(''))
    const [periodFilter, setPeriodFilter] = useQueryState('period', parseAsString.withDefault(''))

    const handleChangePeriodFilter = (date: Date | string) => {
        if (date instanceof Date) {
            setLocalDate(date);

            const formattedDateToPeriod = transformDateToPeriod(date);
            setPeriodFilter(formattedDateToPeriod);
        } else {
            setPeriodFilter("");
        }
    }

    useEffect(() => {
        setLocalDescription(descriptionFilter);
    }, []);

    useEffect(() => {
        if (localDescription === "") {
            setDescriptionFilter("");
            return
        }

        const timer = setTimeout(() => {
            setDescriptionFilter(localDescription);
        }, 500);

        return () => clearTimeout(timer); // Limpar timeout anterior

    }, [localDescription]); // Executar sempre que localDescription mudar

    return (
        <div className="grid grid-cols-4 px-6 pt-5 pb-6 gap-4 bg-white border-[1px] border-gray-200 rounded-xl">
            <FormField.Container>
                <FormField.Label label="Buscar" error="" hasCleanOption={true} handleClearInput={() => setLocalDescription("")} />
                <FormField.Content>
                    <FormField.Icon icon={Search} error="" />
                    <FormField.GenericInput
                        type="text"
                        placeholder="Buscar por descrição"
                        value={localDescription} // ← State local
                        onChangeValue={setLocalDescription} // ← Atualiza state local imediatamente
                        hasIcon={true}
                        disabled={false}
                    />
                </FormField.Content>
            </FormField.Container>
            <FormField.Container>
                <FormField.Label label="Tipo" error="" hasCleanOption={true} handleClearInput={() => setTypeFilter("")} />
                <FormField.Content>
                    <FormField.DropDownInput
                        placeholder="Todos"
                        value={typeFilter}
                        disabled={false}
                        options={['Entrada', 'Saída']}
                        onChangeValue={(value) => { setTypeFilter(value) }}
                    />
                </FormField.Content>
            </FormField.Container>
            <FormField.Container>
                <FormField.Label label="Categoria" error="" hasCleanOption={true} handleClearInput={() => setCategoryFilter("")} />
                <FormField.Content>
                    <FormField.DropDownInput
                        placeholder="Todas"
                        value={categoryFilter}
                        disabled={false}
                        options={availableCategories.map((category) => category.title)}
                        onChangeValue={(value) => { setCategoryFilter(value) }}
                    />
                </FormField.Content>
            </FormField.Container>
            <FormField.Container>
                <FormField.Label label="Período" error="" hasCleanOption={true} handleClearInput={() => handleChangePeriodFilter("")} />
                <FormField.Content>
                    <FormField.DateInput
                        placeholder="Todos"
                        value={periodFilter}
                        disabled={false}
                        date={localDate}
                        mode="month-year"
                        hasSelectionChavron={true}
                        onChangeValue={(value) => { value instanceof Date && handleChangePeriodFilter(value) }}
                    />
                </FormField.Content>
            </FormField.Container>
        </div>
    )
}