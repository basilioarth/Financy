import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner"
import { useRef } from "react";

type ResponseType = "success" | "error" | "warning";

type HandleResponseProps = {
    type: ResponseType,
    message: string,
    callBack: () => void
}

export const useGqlResponseHandler = () => {
    const { refreshToken, refresh, logout } = useAuthStore();
    const isRefreshing = useRef(false);

    const handleGqlResponse = async ({ type, message, callBack }: HandleResponseProps) => {
        switch (type) {
            case "error":
                if (message.includes("Usuário não autenticado")) {
                    // Previne múltiplas tentativas simultâneas de refresh:
                    if (isRefreshing.current) {
                        return;
                    }

                    isRefreshing.current = true;

                    try {
                        let positiveResponse = await refresh({ refreshToken })

                        if (!positiveResponse) {
                            throw new Error
                        }

                        console.log("Callback chamada")
                        callBack()
                    } catch (error) {
                        console.error(`Erro ao fazer o refresh automático da autenticação: ${error}`)
                        logout()
                        toast.warning("Sua sessão expirou. Por favor, faça login novamente");
                    } finally {
                        isRefreshing.current = false;
                    }
                } else if (!message.includes("The operation was aborted")) {
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

    return handleGqlResponse
}