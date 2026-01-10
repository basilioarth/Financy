import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { CreateUserInput, UpdateUserInput } from "../dtos/input/user.input";

@Resolver(() => UserModel)
export class UserResolver {
    private userService = new UserService();

    @Mutation(() => UserModel)
    async createUser(
        @Arg('data', () => CreateUserInput) data: CreateUserInput
    ): Promise<UserModel> {
        return this.userService.createUser(data);
    }

    @Mutation(() => UserModel)
    async updateUser(
        @Arg('email', () => String) email: string,
        @Arg('data', () => UpdateUserInput) data: UpdateUserInput
    ): Promise<UserModel> {
        return this.userService.updateUserByEmail(email, data);
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