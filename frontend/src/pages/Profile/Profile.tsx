import { FormField } from "@/components/FormField"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import { useAuthStore } from "@/stores/auth"
import { LogOut, Mail, User } from "lucide-react"
import { useState } from "react"
import { useGqlResponseHandler } from "@/hooks/useGqlResponseHandler"
import { formatFullUserNameToAvatar } from "@/utils/textsFormatter"

export function Profile() {
    const { user, logout, updateUser } = useAuthStore()
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState(user?.fullName || "")
    const handleGqlResponse = useGqlResponseHandler();

    const handleUpdateUserInfos = async () => {
        try {
            const updateUserMutate = await updateUser({
                fullName: fullName
            })
            if (updateUserMutate) {
                handleGqlResponse({ type: "success", message: "Usuário atualizado com sucesso!", callBack: () => { } })
            }
        } catch (error: any) {
            handleGqlResponse({ type: "error", message: `${error}`, callBack: () => { } })
        }
    }

    const handleLogout = () => {
        setLoading(true);

        logout()

        setLoading(false);
    }

    return (
        <div className="flex flex-col justify-center items-center gap-8">
            <div
                className="w-[448px] h-fit flex flex-col px-8 py-8 justify-center align-center bg-white border border-gray-200 rounded-xl gap-8"
            >
                <div className="flex flex-col justify-center items-center gap-6">
                    <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-gray-300 text-gray-800 font-medium text-2xl">
                            {formatFullUserNameToAvatar(user?.fullName)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center items-center p-0 m-0 gap-1">
                        <strong className="text-xl font-semibold text-gray-800">{user?.fullName}</strong>
                        <span className="text-base text-gray-500">{user?.email}</span>
                    </div>
                </div>

                <div className="w-full flex items-center py-2 px-0">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <div className="flex-1 border-t border-gray-200"></div>
                </div>

                <FieldGroup className="gap-4">
                    <FormField.Container>
                        <FormField.Label label="Nome completo" error="" />
                        <FormField.Content>
                            <FormField.Icon icon={User} error="" />
                            <FormField.GenericInput
                                type="text"
                                placeholder=""
                                value={fullName}
                                onChangeValue={(value) => setFullName(value)}
                                hasIcon={true}
                                disabled={loading}
                            />
                        </FormField.Content>
                    </FormField.Container>

                    <FormField.Container>
                        <FormField.Label label="E-mail" error="" />
                        <FormField.Content>
                            <FormField.Icon icon={Mail} error="" />
                            <FormField.GenericInput
                                type="email"
                                placeholder=""
                                value={user ? user.email : ""}
                                onChangeValue={() => { }}
                                hasIcon={true}
                                disabled={true}
                            />
                        </FormField.Content>
                        <FormField.Description description="O e-mail não pode ser alterado" />
                    </FormField.Container>
                </FieldGroup>

                <div className="flex flex-col justify-center items-center gap-4">
                    <Button
                        onClick={() => handleUpdateUserInfos()}
                    >
                        Salvar alterações
                    </Button>
                    <div className="flex flex-col justify-center items-center gap-4 w-full">
                        <Button variant="labelButtonSecondary" onClick={() => handleLogout()}>
                            <LogOut className="text-danger" /> Sair da conta
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}