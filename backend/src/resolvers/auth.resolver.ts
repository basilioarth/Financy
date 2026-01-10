import { Resolver, Mutation, Arg } from "type-graphql";
import { LoginInput } from "../dtos/input/auth.input";
import { AuthOutput } from "../dtos/output/auth.output";
import { CreateUserInput } from "../dtos/input/user.input";
import { AuthService } from "../services/auth.service";

@Resolver()
export class AuthResolver {
    private authService = new AuthService();

    @Mutation(() => AuthOutput)
    async login(
        @Arg('data', () => LoginInput) data: LoginInput
    ): Promise<AuthOutput> {
        return this.authService.login(data);
    }

    @Mutation(() => AuthOutput)
    async register(
        @Arg('data', () => CreateUserInput) data: CreateUserInput
    ): Promise<AuthOutput> {
        return this.authService.register(data);
    }
}