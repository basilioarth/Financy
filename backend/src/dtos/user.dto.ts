import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
    @Field(() => String)
    fullName!: string

    @Field(() => String)
    email!: string

    @Field(() => String)
    password!: string;
}

@InputType()
export class UpdateUserInput {
    @Field(() => String)
    fullName!: string
}