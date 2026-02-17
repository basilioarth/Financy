import { Field, GraphQLISODateTime, ID, ObjectType, Float } from "type-graphql";
import { CategoryModel } from "./category.model";
import { UserModel } from "./user.model";

@ObjectType()
export class TransactionModel {
    @Field(() => ID)
    id!: string

    @Field(() => String)
    type!: string

    @Field(() => String)
    description!: string

    @Field(() => GraphQLISODateTime)
    date!: Date

    @Field(() => Float)
    value!: number

    @Field(() => GraphQLISODateTime)
    createdAt!: Date

    @Field(() => GraphQLISODateTime)
    updatedAt!: Date

    @Field(() => String)
    categoryId!: string

    @Field(() => CategoryModel, { nullable: true })
    category?: CategoryModel

    @Field(() => String)
    authorId!: string

    @Field(() => UserModel, { nullable: true })
    author?: UserModel
}

@ObjectType()
export class PaginatedTransactions {
    @Field(() => [TransactionModel])
    items!: TransactionModel[]

    @Field(() => Number)
    totalCount!: number
}

@ObjectType()
export class BigNumbers {
    @Field(() => Number)
    totalBalance!: number

    @Field(() => Number)
    monthRecipes!: number

    @Field(() => Number)
    monthExpenses!: number
}