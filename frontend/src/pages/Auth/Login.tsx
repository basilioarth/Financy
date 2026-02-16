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
            <FormField.Container>
                <FormField.Label label="E-mail" error="" />
                <FormField.Content>
                    <FormField.Icon icon={Mail} error="" />
                    <FormField.GenericInput
                        type="email"
                        placeholder="mail@example.com"
                        value={formData.email}
                        onChangeValue={(value) => handleChange("email", value)}
                        hasIcon={true}
                        disabled={loading}
                    />
                </FormField.Content>
            </FormField.Container>

            <FormField.Container>
                <FormField.Label label="Senha" error="" />
                <FormField.Content>
                    <FormField.Icon icon={Lock} error="" />
                    <FormField.PasswordInput
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        value={formData.password}
                        hasIcon={true}
                        disabled={loading}
                        hidden={showPassword}
                        onChangeValue={(value) => handleChange("password", value)}
                        onChangeVisibility={(value) => setShowPassword(value)}
                    />
                </FormField.Content>
                <FormField.Action />
            </FormField.Container>
        </FormLayout>
    )
}