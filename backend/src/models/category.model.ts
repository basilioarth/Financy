import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { TransactionModel } from "./transaction.model";

@ObjectType()
export class CategoryModel {
    @Field(() => ID)
    id!: string

    @Field(() => String)
    title!: string

    @Field(() => String)
    description?: string

    @Field(() => String)
    iconName!: string

    @Field(() => String)
    colorHexCode!: string

    @Field(() => GraphQLISODateTime)
    createdAt!: Date

    @Field(() => GraphQLISODateTime)
    updatedAt!: Date

    @Field(() => [TransactionModel], { nullable: true })
    transactions?: TransactionModel[]
}