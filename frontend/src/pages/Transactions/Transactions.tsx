import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useLazyQuery } from "@apollo/client/react"
import { Transaction } from "@/types";
import { useGqlResponseHandler } from "@/hooks/useGqlResponseHandler";
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
        const formattedDate = format(date, 'dd/MM/yyyy', { locale: ptBR });

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
                            <TableHead>Valor</TableHead>
                            <TableHead className="text-right pr-6">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            transactions.map((transaction) => (
                                <TableRow>
                                    <TableCell className="text-left pl-6 text-base font-medium text-gray-800">{transaction.description}</TableCell>
                                    <TableCell className="text-sm text-gray-600">{formatDate(`${transaction.createdAt}`)}</TableCell>
                                    <TableCell>{transaction.category.title}</TableCell>
                                    <TableCell>{transaction.type}</TableCell>
                                    <TableCell className="text-right text-sm font-semibold text-gray-800">{formatBills(transaction.value, transaction.type)}</TableCell>
                                    <TableCell className="text-right pr-6">Deletar/Editar</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            }
        </div>
    )
}