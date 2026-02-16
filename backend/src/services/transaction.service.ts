import { prismaClient } from "../../prisma/prisma";
import { TransactionFilters, TransactionInput } from "../dtos/transaction.dto";

export class TransactionService {

    async createTransaction(data: TransactionInput, authenticatedUserId: string) {
        return prismaClient.transaction.create({
            data: {
                type: data.type,
                description: data.description,
                date: data.date,
                value: data.value,
                categoryId: data.categoryId,
                authorId: authenticatedUserId
            }
        });
    }

    async listTransactions(
        authenticatedUserId: string,
        filters: TransactionFilters
    ) {
        // Construir o objeto where dinamicamente
        const where: any = {
            authorId: authenticatedUserId
        };

        // Filtro por descrição (busca parcial, case-insensitive)
        if (filters.description) {
            where.description = {
                contains: filters.description
            };
        }

        // Filtro por tipo (exato)
        if (filters.type) {
            where.type = filters.type;
        }

        // Filtro por categoria (exato, por ID)
        if (filters.categoryId) {
            where.categoryId = filters.categoryId;
        }

        // Filtro por período (mês e ano)
        if (filters.month && filters.year) {
            // Data de início: primeiro dia do mês às 00:00:00
            const startDate = new Date(filters.year, filters.month - 1, 1);

            // Data de fim: primeiro dia do próximo mês às 00:00:00
            const endDate = new Date(filters.year, filters.month, 1);

            where.date = {
                gte: startDate, // Maior ou igual à data de início
                lt: endDate     // Menor que a data de fim
            };
        }

        return prismaClient.transaction.findMany({
            where,
            orderBy: {
                date: 'desc'
            }
        });
    }

    async getTransactionById(id: string, authenticatedUserId: string) {
        const transaction = await prismaClient.transaction.findUnique({
            where: {
                id: id,
                authorId: authenticatedUserId
            }
        });

        if (!transaction) throw new Error('Transação não cadastrada!');

        return transaction;
    }

    async getTransactionByCategoryId(categoryId: string, authenticatedUserId: string) {
        return await prismaClient.transaction.findMany({
            where: {
                categoryId: categoryId,
                authorId: authenticatedUserId
            }
        });
    }

    async updateTransactionById(id: string, data: TransactionInput, authenticatedUserId: string) {

        const existingTransaction = await prismaClient.transaction.findUnique({
            where: {
                id: id,
                authorId: authenticatedUserId
            }
        });

        if (!existingTransaction) throw new Error('Transação não cadastrada!');

        return prismaClient.transaction.update({
            where: {
                id: id,
                authorId: authenticatedUserId
            },
            data: {
                type: data.type,
                description: data.description,
                date: data.date,
                value: data.value,
                categoryId: data.categoryId,
                authorId: authenticatedUserId
            }
        });
    }

    async deleteTransactionById(id: string, authenticatedUserId: string) {
        const foundTransaction = await prismaClient.transaction.findUnique({
            where: {
                id: id,
                authorId: authenticatedUserId
            }
        });

        if (!foundTransaction) throw new Error('Transação não cadastrada!');

        return prismaClient.transaction.delete({
            where: {
                id: id,
                authorId: authenticatedUserId
            }
        });
    }
}