import { Resolver, Query, Mutation, Arg, UseMiddleware, FieldResolver, Root } from "type-graphql";
import { TransactionInput, TransactionFilters, BigNumbersInput } from "../dtos/transaction.dto";
import { IsAuth } from "../middlewares/auth.middleware";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { TransactionModel, PaginatedTransactions, BigNumbers } from "../models/transaction.model";
import { TransactionService } from "../services/transaction.service";
import { CategoryModel } from "../models/category.model";
import { CategoryService } from "../services/category.service";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
    private transactionService = new TransactionService();
    private userService = new UserService();
    private categoryService = new CategoryService();

    @Mutation(() => TransactionModel)
    async createTransaction(
        @Arg('data', () => TransactionInput) data: TransactionInput,
        @GqlUser() user: User
    ): Promise<TransactionModel> {
        return this.transactionService.createTransaction(data, user.id);
    }

    @Mutation(() => TransactionModel)
    async updateTransaction(
        @Arg('id', () => String) id: string,
        @Arg('data', () => TransactionInput) data: TransactionInput,
        @GqlUser() user: User
    ): Promise<TransactionModel> {
        return this.transactionService.updateTransactionById(id, data, user.id);
    }

    @Mutation(() => Boolean)
    async deleteTransaction(
        @Arg('id', () => String) id: string,
        @GqlUser() user: User
    ): Promise<Boolean> {
        await this.transactionService.deleteTransactionById(id, user.id);

        return true;
    }

    @Query(() => TransactionModel)
    async getTransaction(
        @Arg('id', () => String) id: string,
        @GqlUser() user: User
    ): Promise<TransactionModel> {
        return this.transactionService.getTransactionById(id, user.id);
    }

    @Query(() => PaginatedTransactions)
    async listTransactions(
        @GqlUser() user: User,
        @Arg('filters', () => TransactionFilters, { nullable: true }) filters?: TransactionFilters
    ): Promise<PaginatedTransactions> {
        return this.transactionService.listTransactions(user.id, filters || {});
    };

    @Query(() => [TransactionModel])
    async listRecentTransactions(
        @GqlUser() user: User
    ): Promise<TransactionModel[]> {
        return this.transactionService.listRecentTransactions(user.id);
    };

    @Query(() => BigNumbers)
    async getBigNumbers(
        @GqlUser() user: User,
        @Arg('data', () => BigNumbersInput) data: BigNumbersInput
    ): Promise<BigNumbers> {
        return this.transactionService.getBigNumbers(user.id, data.month, data.year)
    }

    @FieldResolver(() => CategoryModel)
    async category(@Root() transaction: TransactionModel, @GqlUser() user: User): Promise<CategoryModel> {
        return this.categoryService.getCategoryById(transaction.categoryId, user.id);
    }

    @FieldResolver(() => UserModel)
    async author(@Root() transaction: TransactionModel): Promise<UserModel> {
        return this.userService.findUserById(transaction.authorId);
    }
}