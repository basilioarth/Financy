import { MiddlewareFn } from "type-graphql";
import { GraphqlContext } from "../graphql/context";

export const IsAuth: MiddlewareFn<GraphqlContext> = async (
    { context },
    next
) => {
    console.log("Chegou no middleware")
    if (!context.user) throw new Error('Usuário não autenticado!');

    return next();
}