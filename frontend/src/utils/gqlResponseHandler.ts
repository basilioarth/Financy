import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner"

type ResponseType = "success" | "error" | "warning";

type HandleResponseProps = {
    type: ResponseType,
    message: string
}

export const handleGqlResponse = ({ type, message }: HandleResponseProps) => {
    const { refreshToken, refresh, logout } = useAuthStore();

    switch (type) {
        case "error":
            console.log("ERROR")
            console.log(message)
            if (message.includes("Usuário não autenticado")) {
                try {
                    refresh({ refreshToken })
                } catch (error) {
                    console.log(`Erro ao fazer o refresh automático da autenticação: ${error}`)
                    logout()
                    toast.warning("Sua sessão expirou. Por favor, faça login novamente");
                }
            } else {
                toast.error(message)
            }
            break
        case "success":
            toast.success(message)
            break
        case "warning":
            toast.warning(message)
            break
        default:
            toast.info(message)
    }
}