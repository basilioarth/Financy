import { Resolver, Mutation, Arg } from "type-graphql";
import { AuthInput, AuthOutput } from "../dtos/auth.dto";
import { UserInput } from "../dtos/user.dto";
import { AuthService } from "../services/auth.service";

@Resolver()
export class AuthResolver {
    private authService = new AuthService();

    @Mutation(() => AuthOutput)
    async login(
        @Arg('data', () => AuthInput) data: AuthInput
    ): Promise<AuthOutput> {
        return this.authService.login(data);
    }

    @Mutation(() => AuthOutput)
    async register(
        @Arg('data', () => UserInput) data: UserInput
    ): Promise<AuthOutput> {
        return this.authService.register(data);
    }
}