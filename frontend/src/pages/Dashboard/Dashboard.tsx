import { ChevronRight, CircleArrowDown, CircleArrowUp, Plus, Wallet } from "lucide-react";
import { BigNumbersCard } from "./components/BigNumbersCard";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useLazyQuery } from "@apollo/client/react";
import { BigNumbers, Category, Transaction } from "@/types";
import { GET_BIG_NUMBERS, LIST_RECENT_TRANSACTIONS } from "@/lib/graphql/queries/Transaction";
import { useEffect, useState } from "react";
import { useGqlResponseHandler } from "@/hooks/useGqlResponseHandler";
import { CategoryIconContainer } from "../Categories/components/CategoryIconContainer";
import { getIconByName } from "@/hooks/useIcons"
import { formatDate, formatPeriod, transformDateToPeriod } from "@/utils/datesFormatter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatCurrencyValue } from "@/utils/currencyFormatter";
import { LIST_ALL_CATEGORIES } from "@/lib/graphql/queries/Category";
import { TransactionDialog } from "../Transactions/components/TransactionDialog";

interface BigNumbersInput {
    month: number
    year: number
}

export function Dashboard() {
    const [loading, setLoading] = useState<boolean>(false);
    const [bigNumbers, setBigNumbers] = useState<BigNumbers>({
        totalBalance: 0,
        monthRecipes: 0,
        monthExpenses: 0
    })
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const handleGqlResponse = useGqlResponseHandler();

    const [getBigNumbers, { }] = useLazyQuery<{ getBigNumbers: BigNumbers }, { data: BigNumbersInput }>(
        GET_BIG_NUMBERS, { fetchPolicy: "network-only" }
    );
    const [listRecentTransactions, { }] = useLazyQuery<{ listRecentTransactions: Transaction[] }>(
        LIST_RECENT_TRANSACTIONS, { fetchPolicy: "network-only" }
    );
    const [listAllCategories, { }] = useLazyQuery<{ listCategories: Category[] }>(
        LIST_ALL_CATEGORIES, { fetchPolicy: "network-only" }
    );

    const formatBalanceTransaction = (transactions: Transaction[]): string => {
        const listOfIncomeTransactions = transactions.filter((transaction) => transaction.type == "Entrada")
        const listOfOutcomeTransactions = transactions.filter((transaction) => transaction.type == "Saída")

        let totalOfIncomeTransactions = 0;
        for (let i = 0; i < listOfIncomeTransactions.length; i++) {
            totalOfIncomeTransactions += listOfIncomeTransactions[i].value
        }

        let totalOfOutcomeTransacitons = 0;
        for (let i = 0; i < listOfOutcomeTransactions.length; i++) {
            totalOfOutcomeTransacitons += listOfOutcomeTransactions[i].value
        }

        const balanceTransaction = totalOfIncomeTransactions - totalOfOutcomeTransacitons

        return balanceTransaction < 0 ? `- ${formatCurrencyValue(balanceTransaction * (-1))}` : formatCurrencyValue(balanceTransaction)
    }

    const fetchBigNumbers = async () => {
        setLoading(true);

        try {
            let currentDate = new Date();
            let currentPeriod = transformDateToPeriod(currentDate);
            let { month, year } = formatPeriod(currentPeriod);

            const result = await getBigNumbers({
                variables: {
                    data: {
                        month: month ?? 0,
                        year: year ?? 2026
                    }
                }
            });
            if (result.error) {
                throw result.error
            }

            if (result.data) {
                setBigNumbers(result.data.getBigNumbers)
            }
        } catch (err) {
            console.error(err);
            handleGqlResponse({ type: "error", message: `${err}`, callBack: fetchRecentTransactions });
        }

        setLoading(false);
    }

    const fetchRecentTransactions = async () => {
        setLoading(true);

        try {
            const result = await listRecentTransactions();

            console.log(result);

            if (result.error) {
                throw result.error
            }

            if (result.data) {
                setRecentTransactions(result.data.listRecentTransactions)
            }
        } catch (err) {
            console.error(err);
            handleGqlResponse({ type: "error", message: `${err}`, callBack: fetchRecentTransactions });
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
                setCategories(result.data.listCategories)
            }
        } catch (err) {
            console.error(err);
            handleGqlResponse({ type: "error", message: `${err}`, callBack: fetchCategories });
        }

        setLoading(false);
    }

    const fetchDashBoardDatas = async () => {
        fetchBigNumbers()
        fetchRecentTransactions()
        fetchCategories()
    }

    useEffect(() => {
        fetchDashBoardDatas()
    }, [])

    return (
        <div className="flex flex-col m-0 p-0 gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BigNumbersCard
                    icon={Wallet}
                    iconColor="purple-base"
                    title="saldo total"
                    value={bigNumbers.totalBalance >= 0 ? `${formatCurrencyValue(bigNumbers.totalBalance)}` : `- ${formatCurrencyValue(bigNumbers.totalBalance)}`}
                />
                <BigNumbersCard
                    icon={CircleArrowUp}
                    iconColor="brand-base"
                    title="receitas do mês"
                    value={`${formatCurrencyValue(bigNumbers.monthRecipes)}`}
                />
                <BigNumbersCard
                    icon={CircleArrowDown}
                    iconColor="red-base"
                    title="despesas do mês"
                    value={`${formatCurrencyValue(bigNumbers.monthExpenses)}`}
                />
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead colSpan={2} className="text-left pl-6 uppercase">transações recentes</TableHead>
                                <TableHead colSpan={1} className="text-right pr-3 text-sm font-medium text-brand-base">
                                    <a href="/transactions" className="flex justify-end items-center gap-1">
                                        Ver todas
                                        <ChevronRight className="h-5 w-5" />
                                    </a>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                recentTransactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell className="text-left pl-6 flex justify-start items-center gap-4">
                                            <CategoryIconContainer
                                                name=""
                                                value={transaction.category.color}
                                                type="icon"
                                                color={transaction.category.color}
                                                icon={getIconByName(transaction.category.iconName)}
                                                onChooseIcon={() => { }}
                                            />
                                            <div className="flex flex-col items-start">
                                                <span className="text-base font-medium text-gray-800">{transaction.description}</span>
                                                <span className="text-sm text-gray-600">{formatDate(`${transaction.date}`, "yy")}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">
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
                                        <TableCell className="flex justify-end items-center gap-2 pr-6 text-sm font-semibold text-gray-800">
                                            {transaction.type == "Saída"
                                                ?
                                                `- ${formatCurrencyValue(transaction.value)}`
                                                :
                                                `+ ${formatCurrencyValue(transaction.value)}`
                                            }
                                            {transaction.type === "Entrada"
                                                ?
                                                <CircleArrowUp className="text-green-base h-4 w-4" />
                                                :
                                                <CircleArrowDown className="text-red-base h-4 w-4" />
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                        <TransactionDialog
                            availableCategories={categories}
                            refetch={fetchDashBoardDatas}
                        >
                            <TableFooter className="py-5 px-6 cursor-pointer bg-transparent text-brand-base hover:bg-brand-base hover:text-white transition-colors duration-200">
                                <TableRow>
                                    <TableCell colSpan={4}>

                                        <div className="flex justify-center items-center text-sm font-medium gap-1">
                                            <Plus className="h-5 2-5" />
                                            <span>Nova transação</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </TransactionDialog>
                    </Table>
                </div>
                <div className="col-span-1">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead colSpan={2} className="text-left pl-6 uppercase">categorias</TableHead>
                                <TableHead colSpan={1} className="text-right pr-3 text-sm font-medium text-brand-base">
                                    <a href="/categories" className="flex justify-end items-center gap-1">
                                        Gerenciar
                                        <ChevronRight className="h-5 w-5" />
                                    </a>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell className="text-left pl-6 flex justify-start items-center gap-4">
                                            <Button variant="tagButton" size="tag" className={cn(
                                                (category.color === "green") && "bg-green-light text-green-dark",
                                                (category.color === "blue") && "bg-blue-light text-blue-dark",
                                                (category.color === "purple") && "bg-purple-light text-purple-dark",
                                                (category.color === "pink") && "bg-pink-light text-pink-dark",
                                                (category.color === "red") && "bg-red-light text-red-dark",
                                                (category.color === "orange") && "bg-orange-light text-orange-dark",
                                                (category.color === "yellow") && "bg-yellow-light text-yellow-dark",
                                            )}>
                                                {category.title}
                                            </Button>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">
                                            {category.transactions.length === 1 ? `${category.transactions.length} item` : `${category.transactions.length} itens`}
                                        </TableCell>
                                        <TableCell className="flex justify-end items-center gap-2 pr-6 text-sm font-semibold text-gray-800">
                                            {formatBalanceTransaction(category.transactions)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}