import { Resolver, Query } from "type-graphql";

@Resolver()
export class UserResolver {
    @Query(() => String)
    async initialQuery() {
        return "First Query";
    }
}