import { prismaClient } from "../../prisma/prisma";
import { TransactionInput } from "../dtos/transaction.dto";

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

    async listTransactions(authenticatedUserId: string) {
        return prismaClient.transaction.findMany({
            where: {
                authorId: authenticatedUserId
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