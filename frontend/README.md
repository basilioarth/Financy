# 🖥️ Financy Frontend

Este é o frontend da aplicação Financy, construído com React, TypeScript, Vite e estilizado com Tailwind CSS.

## 📂 Arquitetura de diretórios

A estrutura de pastas do projeto está organizada da seguinte forma:

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── stores/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env
├── .env.example
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🛠️ Pré-requisitos
- [Node.js](https://nodejs.org/en/download) (v18 ou superior recomendado)
- Backend do Financy rodando paralelamente e acessível.

## ⚙️ Configurações

1. **Navegue até o diretório do projeto:**
   ```bash
   cd Financy/frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto, seguindo o exemplo do arquivo `.env.example`.

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Pronto! A aplicação estará disponível em: http://localhost:5173.

5. **(Opcional) Gere versão de build para produção:**
   ```bash
   npm run build
   ```

## 📘 Funcionalidades e Regras

Assim como na API, temos as seguintes funcionalidades e regras:

- [X]  O usuário pode criar uma conta e fazer login
- [X]  O usuário pode ver e gerenciar apenas as transações e categorias criadas por ele
- [X]  Deve ser possível criar uma transação
- [X]  Deve ser possível deletar uma transação
- [X]  Deve ser possível editar uma transação
- [X]  Deve ser possível listar todas as transações
- [X]  Deve ser possível criar uma categoria
- [X]  Deve ser possível deletar uma categoria
- [X]  Deve ser possível editar uma categoria
- [X]  Deve ser possível listar todas as categorias
