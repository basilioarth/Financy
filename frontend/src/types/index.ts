export interface User {
    id: string
    fullName: string
    email: string
    password?: string
    createdAt?: string
    updatedAt?: string
}

export interface UserInput {
    fullName: string
    email: string
    password: string
}

export interface Author {
    email: string
    fullName: string
}

export interface AuthInput {
    email: string
    password: string
}

export interface RefreshInput {
    refreshToken: string | null
}

export interface UpdateUserInput {
    fullName: string
}

export interface Transaction {
    type: string
    description: string
    date: string
    value: string
    category: {
        title: string
        description: string
    }
    author: Author
}

export interface Category {
    id: string
    code: string
    title: string
    description: string
    iconName: string
    color: string
    author: Author
    transactions: Transaction[]
}

export interface CategoryInput {
    title: string
    description: string
    iconName: string,
    color: string
}