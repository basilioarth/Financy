# 🗄️Financy Backend

Este é o backend da aplicação Financy, construído com Node.js, GraphQL (Apollo Server), Typescript e Prisma.

## 📂 Arquitetura dos Diretórios

A estrutura de pastas do projeto está organizada da seguinte forma:

```
backend/
├── prisma/
├── src/
│   ├── dtos/
│   ├── graphql/
│   ├── middlewares/
│   ├── models/
│   ├── resolvers/
│   ├── services/
│   ├── utils/
│   └── index.ts
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
├── prisma.config.ts
├── README.md
├── schema.graphql
└── tsconfig.json
```

## 🛠️ Pré-requisitos
- [Node.js](https://nodejs.org/en/download) (v18 ou superior recomendado)

## ⚙️ Configurações

1. **Navegue até o diretório do projeto:**
   ```bash
   cd Financy/backend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto, seguindo o exemplo do arquivo `.env.example`. 

4. **Execute as migrações do banco de dados:**
   Para criar ou atualizar as tabelas do banco de dados com base no schema do Prisma:
   ```bash
   npm run migrate
   ```

## 🚀 Iniciando a Aplicação

Para iniciar a aplicação, execute o seguinte comando:

   ```bash
   npm run dev
   ```

Pronto! A API do GraphQL estará disponível em: http://localhost:4000/graphql.

## 📘 Funcionalidades e Regras

- [x] O usuário pode criar uma conta e fazer login
- [x] O usuário pode ver e gerenciar apenas as transações e categorias criadas por ele
- [x] Deve ser possível criar uma transação
- [x] Deve ser possível deletar uma transação
- [x] Deve ser possível editar uma transação
- [x] Deve ser possível listar todas as transações
- [x] Deve ser possível criar uma categoria
- [x] Deve ser possível deletar uma categoria
- [x] Deve ser possível editar uma categoria
- [x] Deve ser possível listar todas as categorias