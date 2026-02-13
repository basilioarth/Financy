import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { UserInput, UpdateUserInput } from "../dtos/user.dto";
import { IsAuth } from "../middlewares/auth.middleware";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";

@Resolver(() => UserModel)
export class UserResolver {
    private userService = new UserService();

    @Mutation(() => UserModel)
    async createUser(
        @Arg('data', () => UserInput) data: UserInput
    ): Promise<UserModel> {
        return this.userService.createUser(data);
    }

    @Mutation(() => UserModel)
    @UseMiddleware(IsAuth)
    async updateUser(
        @GqlUser() user: User,
        @Arg('data', () => UpdateUserInput) data: UpdateUserInput
    ): Promise<UserModel> {
        return this.userService.updateUserByEmail(user.email, data);
    }

    @Mutation(() => Boolean)
    async deleteUser(
        @Arg('email', () => String) email: string
    ): Promise<Boolean> {
        await this.userService.deleteUserByEmail(email);

        return true;
    }

    @Query(() => UserModel)
    async getUser(
        @Arg('email', () => String) email: string
    ): Promise<UserModel> {
        return this.userService.getUserByEmail(email);
    }

    @Query(() => [UserModel])
    async listUsers(): Promise<UserModel[]> {
        return this.userService.listUsers();
    };
}