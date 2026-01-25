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

export interface AuthInput {
    email: string
    password: string
}