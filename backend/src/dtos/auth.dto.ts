import { Field, InputType, ObjectType } from "type-graphql";
import { UserModel } from "../models/user.model";

@InputType()
export class AuthInput {
    @Field(() => String)
    email!: string;

    @Field(() => String)
    password!: string;
}

@InputType()
export class RefreshAuthInput {
    @Field(() => String)
    refreshToken!: string
}

@ObjectType()
export class AuthOutput {
    @Field(() => String)
    token!: string

    @Field(() => String)
    refreshToken!: string

    @Field(() => UserModel)
    user!: UserModel
}