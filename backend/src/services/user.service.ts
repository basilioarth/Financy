import { prismaClient } from "../../prisma/prisma";
import { UserInput, UpdateUserInput } from "../dtos/user.dto";
import { hashPassword } from "../utils/hash";

export class UserService {

    async createUser(data: UserInput) {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (existingUser) throw new Error('E-mail já cadastrado!');

        const hash = await hashPassword(data.password);

        return prismaClient.user.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                password: hash
            }
        });
    }

    async listUsers() {
        return await prismaClient.user.findMany();
    }

    async getUserByEmail(email: string) {
        const user = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) throw new Error('Usuário não cadastrado!');

        return user;
    }

    async findUserById(id: string) {
        const user = await prismaClient.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user) throw new Error('Usuário não cadastrado!');

        return user;
    }

    async updateUserByEmail(email: string, data: UpdateUserInput) {
        const user = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) throw new Error('Usuário não cadastrado!');

        return prismaClient.user.update({
            where: {
                email: email
            },
            data: {
                fullName: data.fullName
            }
        });
    }

    async deleteUserByEmail(email: string) {
        const foundUser = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        });

        if (!foundUser) throw new Error('Usuário não cadastrado!');

        return prismaClient.user.delete({
            where: {
                email: email
            }
        });
    }
}