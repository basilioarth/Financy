import { User } from "@prisma/client";
import { prismaClient } from "../../prisma/prisma";
import { AuthInput, RefreshAuthInput } from "../dtos/auth.dto";
import { comparePassword } from "../utils/hash";
import { signJwt, verifyJwt, JwtPayload } from "../utils/jwt";
import { UserInput } from "../dtos/user.dto";
import { UserService } from "./user.service";

export class AuthService {

    private userService = new UserService();

    async login(data: AuthInput) {
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

    async register(data: UserInput) {
        const createdUser = await this.userService.createUser(data);

        return this.generateTokens(createdUser);
    }

    async refresh(data: RefreshAuthInput) {
        try {
            const payload = verifyJwt(data.refreshToken) as JwtPayload;

            const existingUser = await prismaClient.user.findUnique({
                where: {
                    email: payload.email
                }
            });

            if (!existingUser) throw new Error('Usuário não cadastrado!');

            return this.generateTokens(existingUser)
        } catch (error) {
            console.log("Erro ao fazer o refresh automático da autenticação!");
        }
    }

    generateTokens(user: User) {
        const token = signJwt({ fullName: user.fullName, email: user.email }, '1m'); // 15m
        const refreshToken = signJwt({ fullName: user.fullName, email: user.email }, '2m'); // 1d

        return { token, refreshToken, user };
    }
}