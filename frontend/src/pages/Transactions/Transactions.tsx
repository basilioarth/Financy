import { useEffect, useState } from "react";
import { CircleArrowDown, CircleArrowUp, Plus, SquarePen, Trash } from "lucide-react";
import { useLazyQuery } from "@apollo/client/react"
import { Category, Transaction } from "@/types";
import { useGqlResponseHandler } from "@/hooks/useGqlResponseHandler";
import { getIconByName } from "@/hooks/useIcons"
import { LIST_ALL_TRANSACTIONS } from "@/lib/graphql/queries/Transaction";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CategoryIconContainer } from "../Categories/components/CategoryIconContainer";
import { cn } from "@/lib/utils";
import { TransactionDialog } from "./components/TransactionDialog";
import { formatDate } from "@/utils/datesFormatter";
import { LIST_ALL_CATEGORIES } from "@/lib/graphql/queries/Category";
import { DeleteDialog } from "@/components/DeleteDialog";
import { apolloClient } from "@/lib/graphql/apollo";
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transaction";
import { formatCurrencyValue } from "@/utils/currencyFormatter";
import { format } from 'date-fns';
import { ptBR } from "date-fns/locale";
import { TransactionFilters } from "./components/TransactionFilters";
import { useQueryStates, parseAsString } from 'nuqs';

export function Transactions() {
    const [searchParams] = useQueryStates({
        description: parseAsString.withDefault(''),
        type: parseAsString.withDefault(''),
        category: parseAsString.withDefault(''),
        period: parseAsString.withDefault('')
    });
    const { description, type, category, period } = searchParams;

    const handleGqlResponse = useGqlResponseHandler();
    const [dateFilter, setDateFilter] = useState<Date>();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [listAllTransactions, { }] = useLazyQuery<{ listTransactions: Transaction[] }>(
        LIST_ALL_TRANSACTIONS, { fetchPolicy: "network-only" }
    );
    const [listAllCategories, { }] = useLazyQuery<{ listCategories: Category[] }>(
        LIST_ALL_CATEGORIES, { fetchPolicy: "network-only" }
    );

    const handleChangePeriodFilter = (date: Date) => {
        setDateFilter(date);
        const formattedDateToPeriod = format(date, "LLLL '/' yyyy", { locale: ptBR }).replace(/^(.)/, c => c.toUpperCase());
    }

    const fetchTransactions = async () => {
        setLoading(true);

        try {
            const result = await listAllTransactions();

            if (result.error) {
                throw result.error
            }

            if (result.data) {
                setTransactions(result.data.listTransactions)
            }
        } catch (err) {
            console.error(err);
            handleGqlResponse({ type: "error", message: `${err}`, callBack: fetchTransactions });
        }

        setLoading(false);
    }

    const fetchCategories = async () => {
        setLoading(true);

        try {
            const result = await listAllCategories();

            if (result.error) {
                throw result.error
            }

            if (result.data) {
                setAvailableCategories(result.data.listCategories)
            }
        } catch (err) {
            console.error(err);
            handleGqlResponse({ type: "error", message: `${err}`, callBack: fetchCategories });
        }

        setLoading(false);
    }

    const handleDeleteTransaction = async (id: string) => {
        setLoading(true);

        try {
            await apolloClient.mutate<{ data: { deleteTransaction: boolean } }, { deleteTransactionId: string }>({
                mutation: DELETE_TRANSACTION,
                variables: {
                    deleteTransactionId: id
                }
            })

            handleGqlResponse({ type: "success", message: "Transação deletada com sucesso!", callBack: () => { } })
            fetchTransactions();
        } catch (error) {
            console.error(error);
            handleGqlResponse({ type: "error", message: `${error}`, callBack: () => handleDeleteTransaction(id) })
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        fetchTransactions()
        console.log("Filtros atualizados:")
        console.log(`Description: ${description}`)
        console.log(`Type: ${type}`)
        console.log(`Category: ${category}`)
        console.log(`Period: ${period}`)
    }, [description, type, category, period])

    return (
        <div className="flex flex-col m-0 p-0 gap-8">
            <header className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-800">Transações</h1>
                    <span className="text-md leading-6 text-gray-600">Gerencie todas as suas transações financeiras</span>
                </div>
                <TransactionDialog
                    availableCategories={availableCategories}
                    refetch={fetchTransactions}
                >
                    <Button className="w-fit py-2 px-3 gap-2">
                        <Plus /> Nova transação
                    </Button>
                </TransactionDialog>
            </header>
            <TransactionFilters availableCategories={availableCategories} />
            {transactions.length !== 0 &&
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left pl-6">Descrição</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                            <TableHead className="text-right pr-6">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="text-left pl-6 text-base font-medium text-gray-800 flex justify-start items-center gap-4">
                                        <CategoryIconContainer
                                            name=""
                                            value={transaction.category.color}
                                            type="icon"
                                            color={transaction.category.color}
                                            icon={getIconByName(transaction.category.iconName)}
                                            onChooseIcon={() => { }}
                                        />
                                        {transaction.description}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        {formatDate(`${transaction.date}`, "yy")}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="tagButton" size="tag" className={cn(
                                            (transaction.category.color === "green") && "bg-green-light text-green-dark",
                                            (transaction.category.color === "blue") && "bg-blue-light text-blue-dark",
                                            (transaction.category.color === "purple") && "bg-purple-light text-purple-dark",
                                            (transaction.category.color === "pink") && "bg-pink-light text-pink-dark",
                                            (transaction.category.color === "red") && "bg-red-light text-red-dark",
                                            (transaction.category.color === "orange") && "bg-orange-light text-orange-dark",
                                            (transaction.category.color === "yellow") && "bg-yellow-light text-yellow-dark",
                                        )}>
                                            {transaction.category.title}
                                        </Button>
                                    </TableCell>
                                    <TableCell className={cn(
                                        "flex justify-center items-center gap-2 font-medium",
                                        transaction.type === "Entrada" && "text-green-dark",
                                        transaction.type === "Saída" && "text-red-dark"
                                    )}>
                                        {transaction.type === "Entrada" ?
                                            <CircleArrowUp className="text-green-base h-4 w-4" />
                                            :
                                            <CircleArrowDown className="text-red-base h-4 w-4" />
                                        }
                                        {transaction.type}
                                    </TableCell>
                                    <TableCell className="text-right text-sm font-semibold text-gray-800">
                                        {transaction.type == "Saída" ? `- ${formatCurrencyValue(transaction.value)}` : formatCurrencyValue(transaction.value)}
                                    </TableCell>
                                    <TableCell className="text-right pr-6 flex justify-end items-center gap-2">
                                        <DeleteDialog
                                            title={`Excluir transação: ${transaction.description}`}
                                            description="Tem certeza de que quer excluir essa transação? Esta ação não poderá ser desfeita!"
                                            handleConfirmDeletion={() => handleDeleteTransaction(transaction.id)}
                                        >
                                            <Button variant="iconButton" size="icon" className="text-danger">
                                                <Trash />
                                            </Button>
                                        </DeleteDialog>
                                        <TransactionDialog
                                            transaction={transaction}
                                            availableCategories={availableCategories}
                                            refetch={fetchTransactions}
                                        >
                                            <Button variant="iconButton" size="icon">
                                                <SquarePen />
                                            </Button>
                                        </TransactionDialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            }
        </div>
    )
}