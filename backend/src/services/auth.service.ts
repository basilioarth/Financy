import { User } from "@prisma/client";
import { prismaClient } from "../../prisma/prisma";
import { LoginInput } from "../dtos/input/auth.input";
import { comparePassword } from "../utils/hash";
import { signJwt } from "../utils/jwt";
import { CreateUserInput } from "../dtos/input/user.input";
import { UserService } from "./user.service";

export class AuthService {
    private userService = new UserService();

    async login(data: LoginInput) {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (!existingUser) throw new Error('Usuário não cadastrado!');

        const compare = await comparePassword(data.password, existingUser.password);

        if (!compare) throw new Error('Senha inválida!');

        return this.generateTokens(existingUser);
    }

    async register(data: CreateUserInput) {
        const createdUser = await this.userService.createUser(data);

        return this.generateTokens(createdUser);
    }

    generateTokens(user: User) {
        const token = signJwt({ fullName: user.fullName, email: user.email }, '15m');
        const refreshToken = signJwt({ fullName: user.fullName, email: user.email }, '1d');

        return { token, refreshToken, user };
    }
}