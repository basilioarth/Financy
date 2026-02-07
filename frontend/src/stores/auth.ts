import { create } from "zustand"
import { persist } from "zustand/middleware"
import { apolloClient } from "@/lib/graphql/apollo"
import type { User, UserInput, AuthInput, RefreshInput, UpdateUserInput } from '@/types'
import { REGISTER } from '@/lib/graphql/mutations/Register'
import { LOGIN } from '@/lib/graphql/mutations/Login'
import { REFRESH } from "@/lib/graphql/mutations/Refresh"
import { UPDATE_USER } from "@/lib/graphql/mutations/UpdateUser"

type LoginMutationData = {
    login: {
        token: string
        refreshToken: string
        user: User
    }
}

type RegisterMutationData = {
    register: {
        token: string
        refreshToken: string
        user: User
    }
}

type RefreshMutationData = {
    refresh: {
        token: string
        refreshToken: string
        user: User
    }
}

type UpdateUserMutationData = {
    updateUser: User
}

interface AuthState {
    user: User | null
    token: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    signup: (data: UserInput) => Promise<boolean>
    login: (data: AuthInput) => Promise<boolean>
    refresh: (data: RefreshInput) => Promise<boolean>
    logout: () => void
    updateUser: (data: UpdateUserInput) => Promise<boolean>
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            refreshToken: null,
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
                        const { user, token, refreshToken } = data.login
                        set({
                            user: {
                                id: user.id,
                                fullName: user.fullName,
                                email: user.email,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                            },
                            token,
                            refreshToken,
                            isAuthenticated: true
                        })
                        return true
                    }
                    return false
                } catch (error) {
                    console.error("Erro ao fazer o login")
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
                        const { user, token, refreshToken } = data.register
                        set({
                            user: {
                                id: user.id,
                                fullName: user.fullName,
                                email: user.email,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                            },
                            token,
                            refreshToken,
                            isAuthenticated: true
                        })
                        return true
                    }
                    return false
                } catch (error) {
                    console.error("Erro ao fazer o cadastro")
                    throw error
                }
            },
            refresh: async (refreshData: RefreshInput) => {
                try {
                    const { data } = await apolloClient.mutate<
                        RefreshMutationData,
                        { data: RefreshInput }
                    >({
                        mutation: REFRESH,
                        variables: {
                            data: {
                                refreshToken: refreshData.refreshToken
                            }
                        }
                    })

                    if (data?.refresh) {
                        const { user, token, refreshToken } = data.refresh
                        set({
                            user: {
                                id: user.id,
                                fullName: user.fullName,
                                email: user.email,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                            },
                            token,
                            refreshToken,
                            isAuthenticated: true
                        })
                        return true
                    }
                    return false
                } catch (error) {
                    throw error
                }
            },
            updateUser: async (updateUserData: UpdateUserInput) => {
                try {
                    const { data } = await apolloClient.mutate<
                        UpdateUserMutationData,
                        { data: UpdateUserInput }
                    >({
                        mutation: UPDATE_USER,
                        variables: {
                            data: {
                                fullName: updateUserData.fullName
                            }
                        }
                    })

                    console.log("AQUIIIIIII")

                    if (data?.updateUser) {
                        const updatedUser = data.updateUser
                        console.log(updatedUser)
                        set({
                            user: {
                                id: updatedUser.id,
                                fullName: updatedUser.fullName,
                                email: updatedUser.email,
                                createdAt: updatedUser.createdAt,
                                updatedAt: updatedUser.updatedAt
                            }
                        })
                        return true
                    }
                    return false
                } catch (error) {
                    throw error
                }
            },
            logout: () => {
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
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