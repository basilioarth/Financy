import { create } from "zustand"
import { persist } from "zustand/middleware"
import { apolloClient } from "@/lib/graphql/apollo"
import type { User, UserInput, AuthInput } from '@/types'
import { REGISTER } from '@/lib/graphql/mutations/Register'
import { LOGIN } from '@/lib/graphql/mutations/Login'

type RegisterMutationData = {
    register: {
        token: string
        refreshToken: string
        user: User
    }
}

type LoginMutationData = {
    login: {
        token: string
        refreshToken: string
        user: User
    }
}

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    signup: (data: UserInput) => Promise<boolean>
    login: (data: AuthInput) => Promise<boolean>
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: async (loginData: AuthInput) => {
                try {
                    const { data } = await apolloClient.mutate<LoginMutationData, { data: AuthInput }>({
                        mutation: LOGIN,
                        variables: {
                            data: {
                                email: loginData.email,
                                password: loginData.password
                            }
                        }
                    })

                    if (data?.login) {
                        const { user, token } = data.login
                        set({
                            user: {
                                id: user.id,
                                fullName: user.fullName,
                                email: user.email,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                            },
                            token,
                            isAuthenticated: true
                        })
                        return true
                    }
                    return false
                } catch (error) {
                    console.log("Erro ao fazer o login")
                    throw error
                }
            },
            signup: async (registerData: UserInput) => {
                try {
                    const { data } = await apolloClient.mutate<
                        RegisterMutationData,
                        { data: UserInput }
                    >({
                        mutation: REGISTER,
                        variables: {
                            data: {
                                fullName: registerData.fullName,
                                email: registerData.email,
                                password: registerData.password
                            }
                        }
                    })

                    if (data?.register) {
                        const { token, user } = data.register
                        set({
                            user: {
                                id: user.id,
                                fullName: user.fullName,
                                email: user.email,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                            },
                            token,
                            isAuthenticated: true
                        })
                        return true
                    }
                    return false
                } catch (error) {
                    console.log("Erro ao fazer o cadastro")
                    throw error
                }
            },
            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false
                })
                apolloClient.clearStore()
            },
        }),
        {
            name: 'auth-storage'
        }
    )
)