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

@InputType()
export class TransactionFilters {
    @Field(() => String, { nullable: true })
    description?: string

    @Field(() => String, { nullable: true })
    type?: string

    @Field(() => String, { nullable: true })
    categoryId?: string

    @Field(() => Number, { nullable: true })
    month?: number

    @Field(() => Number, { nullable: true })
    year?: number
}