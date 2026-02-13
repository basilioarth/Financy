import { Resolver, Query, Mutation, Arg, UseMiddleware, FieldResolver, Root } from "type-graphql";
import { TransactionInput } from "../dtos/transaction.dto";
import { IsAuth } from "../middlewares/auth.middleware";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { TransactionModel } from "../models/transaction.model";
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

    @Query(() => [TransactionModel])
    async listTransactions(
        @GqlUser() user: User
    ): Promise<TransactionModel[]> {
        return this.transactionService.listTransactions(user.id);
    };

    @FieldResolver(() => CategoryModel)
    async category(@Root() transaction: TransactionModel, @GqlUser() user: User): Promise<CategoryModel> {
        return this.categoryService.getCategoryById(transaction.categoryId, user.id);
    }

    @FieldResolver(() => UserModel)
    async author(@Root() transaction: TransactionModel): Promise<UserModel> {
        return this.userService.findUserById(transaction.authorId);
    }
}