import { FormLayout } from "@/components/FormLayout"
import { FormField } from "@/components/FormField"
import { UserRoundPlus, Mail, Lock } from "lucide-react"
import { useState } from "react";
import { useAuthStore } from "@/stores/auth";
import { useGqlResponseHandler } from "@/hooks/useGqlResponseHandler";

export function Login() {
    const handleGqlResponse = useGqlResponseHandler();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const login = useAuthStore((state) => state.login)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await login({
                email: formData.email,
                password: formData.password,
            })

        } catch (error) {
            handleGqlResponse({ type: "error", message: 'Usuário ou senha inválidos! Por favor, tente novamente', callBack: () => { } });
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }

    return (
        <FormLayout
            title="Fazer login"
            description="Entre em sua conta para continuar"
            submitButtonLabel="Entrar"
            disableSubmitButton={false}
            onSubmit={(e) => handleSubmit(e)}
            alternativeFlowLabel="Ainda não tem uma conta?"
            icon={UserRoundPlus}
            navigateButtonLabel="Criar conta"
            navigateButtonTo="/signup"
        >
            <FormField
                type="email"
                label="E-mail"
                placeholder="mail@example.com"
                value={formData.email}
                onChangeValue={(value) => handleChange("email", value)}
                icon={Mail}
                error=""
            />

            <FormField
                type={showPassword ? "text" : "password"}
                label="Senha"
                placeholder="Digite sua senha"
                action={true}
                value={formData.password}
                onChangeValue={(value) => handleChange("password", value)}
                icon={Lock}
                error=""
                hidden={showPassword}
                onChangeVisibility={(value) => setShowPassword(value)}
            />
        </FormLayout>
    )
}