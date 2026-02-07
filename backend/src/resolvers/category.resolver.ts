import { Resolver, Query, Mutation, Arg, UseMiddleware, FieldResolver, Root } from "type-graphql";
import { CategoryModel } from "../models/category.model";
import { CategoryService } from "../services/category.service";
import { CategoryInput } from "../dtos/category.dto";
import { IsAuth } from "../middlewares/auth.middleware";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";
import { UserModel } from "../models/user.model";
import { TransactionModel } from "../models/transaction.model";
import { UserService } from "../services/user.service";
import { TransactionService } from "../services/transaction.service";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
    private categoryService = new CategoryService();
    private userService = new UserService();
    private transactionService = new TransactionService();

    @Mutation(() => CategoryModel)
    async createCategory(
        @Arg('data', () => CategoryInput) data: CategoryInput,
        @GqlUser() user: User
    ): Promise<CategoryModel> {
        return this.categoryService.createCategory(data, user.id);
    }

    @Mutation(() => CategoryModel)
    async updateCategory(
        @Arg('id', () => String) id: string,
        @Arg('data', () => CategoryInput) data: CategoryInput,
        @GqlUser() user: User
    ): Promise<CategoryModel> {
        return this.categoryService.updateCategory(id, data, user.id);
    }

    @Mutation(() => Boolean)
    async deleteCategory(
        @Arg('id', () => String) id: string,
        @GqlUser() user: User
    ): Promise<Boolean> {
        await this.categoryService.deleteCategoryById(id, user.id);

        return true;
    }

    @Query(() => CategoryModel)
    async getCategory(
        @Arg('id', () => String) id: string,
        @GqlUser() user: User
    ): Promise<CategoryModel> {
        return this.categoryService.getCategoryById(id, user.id);
    }

    @Query(() => [CategoryModel])
    async listCategories(
        @GqlUser() user: User
    ): Promise<CategoryModel[]> {
        return this.categoryService.listCategories(user.id);
    };

    @FieldResolver(() => UserModel)
    async author(@Root() category: CategoryModel): Promise<UserModel> {
        return this.userService.findUserById(category.authorId);
    }

    @FieldResolver(() => TransactionModel)
    async transactions(
        @Root() category: CategoryModel,
        @GqlUser() user: User
    ): Promise<TransactionModel[]> {
        return this.transactionService.getTransactionByCategoryId(category.id, user.id)
    }
}