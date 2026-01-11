import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { buildSchema } from 'type-graphql';
import { buildContext } from './graphql/context';
import { UserResolver } from './resolvers/user.resolver';
import { AuthResolver } from './resolvers/auth.resolver';
import { CategoryResolver } from './resolvers/category.resolver';
import { TransactionResolver } from './resolvers/transaction.resolver';

async function bootstrap() {
    const app = express();

    // Configuração do CORS
    app.use(cors({
        origin: 'http://localhost:5173', // URL do frontend
        credentials: true, // Permite envio de cookies/credenciais
    }));

    const schema = await buildSchema({
        resolvers: [
            UserResolver,
            AuthResolver,
            CategoryResolver,
            TransactionResolver
        ],
        validate: false,
        emitSchemaFile: './schema.graphql',
    });

    const server = new ApolloServer({
        schema,
    });

    await server.start();

    app.use('/graphql', express.json(), expressMiddleware(server, {
        context: buildContext
    }));

    app.listen(4000, () => {
        console.log('Servidor iniciado em http://localhost:4000/graphql');
    });
}

bootstrap();