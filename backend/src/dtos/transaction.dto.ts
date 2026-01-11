import { Field, InputType, Float, GraphQLISODateTime } from "type-graphql";

@InputType()
export class TransactionInput {
    @Field(() => String)
    type!: string

    @Field(() => String)
    description!: string

    @Field(() => GraphQLISODateTime)
    date!: Date

    @Field(() => Float)
    value!: number

    @Field(() => String)
    categoryId!: string
}