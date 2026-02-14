import { useEffect, useState } from "react";
import { CircleArrowDown, CircleArrowUp, Plus, SquarePen, Trash } from "lucide-react";
import { useLazyQuery } from "@apollo/client/react"
import { Transaction } from "@/types";
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
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CategoryIconContainer } from "../Categories/components/CategoryIconContainer";
import { cn } from "@/lib/utils";

export function Transactions() {
    const handleGqlResponse = useGqlResponseHandler();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [listAllTransactions, { }] = useLazyQuery<{ listTransactions: Transaction[] }>(
        LIST_ALL_TRANSACTIONS, { fetchPolicy: "network-only" }
    );

    const fetchTransactions = async () => {
        try {
            const result = await listAllTransactions();

            if (result.error) {
                throw result.error
            }

            if (result.data) {
                console.log(result.data.listTransactions)
                setTransactions(result.data.listTransactions)
            }
        } catch (err) {
            console.error(err);
            handleGqlResponse({ type: "error", message: `${err}`, callBack: fetchTransactions });
        }
    }

    const formatDate = (originalDate: string): string => {
        const date = parseISO(originalDate);
        const formattedDate = format(date, 'dd/MM/yy', { locale: ptBR });

        return formattedDate
    }

    const formatBills = (originalValue: number, type: string): string => {
        if (type === "Saída") {
            return `- R$ ${originalValue}`
        } else {
            return `R$ ${originalValue}`
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

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
                                <TableRow>
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
                                        {formatDate(`${transaction.createdAt}`)}
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
                                        {formatBills(transaction.value, transaction.type)}
                                    </TableCell>
                                    <TableCell className="text-right pr-6 flex justify-end items-center gap-2">
                                        <Button variant="iconButton" size="icon" className="text-danger">
                                            <Trash />
                                        </Button>
                                        <Button variant="iconButton" size="icon">
                                            <SquarePen />
                                        </Button>
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