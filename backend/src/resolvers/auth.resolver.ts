import { Resolver, Mutation, Arg } from "type-graphql";
import { AuthInput, AuthOutput, RefreshAuthInput } from "../dtos/auth.dto";
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

    @Mutation(() => AuthOutput)
    async refresh(
        @Arg('data', () => RefreshAuthInput) data: RefreshAuthInput
    ): Promise<AuthOutput | null> {
        return this.authService.refresh(data);
    }
}