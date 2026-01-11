import { prismaClient } from "../../prisma/prisma";
import { CategoryInput } from "../dtos/category.dto";

export class CategoryService {

    generateCategoryCode(title: string) {
        return title
            .toLowerCase()                                   // Converte para minúsculo
            .normalize('NFD')                                // Decompõe caracteres acentuados
            .replace(/[\u0300-\u036f]/g, '')                 // Remove os acentos
            .replace(/\s+/g, '');                            // Remove todos os espaços em branco
    }

    async createCategory(data: CategoryInput, authenticatedUserId: string) {
        const categoryCode = this.generateCategoryCode(data.title);

        const existingCategory = await prismaClient.category.findUnique({
            where: {
                code: categoryCode,
                authorId: authenticatedUserId
            }
        });

        if (existingCategory) throw new Error('Categoria já cadastrada!');

        return prismaClient.category.create({
            data: {
                title: data.title,
                code: categoryCode,
                description: data.description || "",
                iconName: data.iconName,
                colorHexCode: data.colorHexCode,
                authorId: authenticatedUserId
            }
        });
    }

    async listCategories(authenticatedUserId: string) {
        return prismaClient.category.findMany({
            where: {
                authorId: authenticatedUserId
            }
        });
    }

    async getCategoryByCode(code: string, authenticatedUserId: string) {
        const category = await prismaClient.category.findUnique({
            where: {
                code: code,
                authorId: authenticatedUserId
            }
        });

        if (!category) throw new Error('Categoria não cadastrada!');

        return category;
    }

    async findCategoryById(id: string, authenticatedUserId: string) {
        const category = await prismaClient.category.findUnique({
            where: {
                id: id,
                authorId: authenticatedUserId
            }
        });

        if (!category) throw new Error('Categoria não cadastrada!');

        return category;
    }

    async updateCategoryByCode(categoryCode: string, data: CategoryInput, authenticatedUserId: string) {
        const newCategoryCode = this.generateCategoryCode(data.title);

        const existingCategory = await prismaClient.category.findUnique({
            where: {
                code: categoryCode,
                authorId: authenticatedUserId
            }
        });

        if (!existingCategory) throw new Error('Categoria não cadastrada!');

        return prismaClient.category.update({
            where: {
                code: categoryCode,
                authorId: authenticatedUserId
            },
            data: {
                title: data.title,
                code: newCategoryCode,
                description: data.description || "",
                iconName: data.iconName,
                colorHexCode: data.colorHexCode,
                authorId: authenticatedUserId
            }
        });
    }

    async deleteCategoryByCode(categoryCode: string, authenticatedUserId: string) {
        const foundCategory = await prismaClient.category.findUnique({
            where: {
                code: categoryCode,
                authorId: authenticatedUserId
            }
        });

        if (!foundCategory) throw new Error('Categoria não cadastrada!');

        return prismaClient.category.delete({
            where: {
                code: categoryCode,
                authorId: authenticatedUserId
            }
        });
    }
}