import { Field, InputType } from "type-graphql";

@InputType()
export class CategoryInput {
    @Field(() => String)
    title!: string

    @Field(() => String)
    description!: string

    @Field(() => String)
    iconName!: string

    @Field(() => String)
    color!: string
}