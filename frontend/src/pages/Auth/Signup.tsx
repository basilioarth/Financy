import { User, Mail, Lock, LogIn } from "lucide-react"
import { useState } from "react"
import { FormLayout } from "@/components/FormLayout"
import { FormField } from "@/components/FormField"
import { validateName, validateEmail, validatePassword } from "@/components/FormField/utils"
import { useAuthStore } from "@/stores/auth"
import { useGqlResponseHandler } from "@/hooks/useGqlResponseHandler"

export function Signup() {
    const handleGqlResponse = useGqlResponseHandler();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [formDataErros, setFormDataErros] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false)

    const signup = useAuthStore((state) => state.signup)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const signupMutate = await signup({
                fullName: formData.name,
                email: formData.email,
                password: formData.password,
            })
            if (signupMutate) {
                handleGqlResponse({ type: "success", message: 'Cadastro realizado com sucesso!', callBack: () => { } });
            }
        } catch (error: any) {
            handleGqlResponse({ type: "error", message: 'Erro ao realizar o cadastro', callBack: () => { } });
        } finally {
            setLoading(false)
        }
    }

    const isFormFullFilled = () => {
        return (formData.name != "" && formData.email != "" && formData.password != "")
    }

    const thereIsAnyError = () => {
        return formDataErros.name != "" || formDataErros.email != "" || formDataErros.password != ""
    }

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        let error = "";

        if (field == "name") {
            error = validateName(value);
        } else if (field == "email") {
            error = validateEmail(value);
        } else if (field == "password") {
            error = validatePassword(value);
        }

        setFormDataErros(prev => ({ ...prev, [field]: error }))
    }

    return (
        <FormLayout
            title="Criar conta"
            description="Comece a controlar suas finanças ainda hoje"
            submitButtonLabel="Cadastrar"
            disableSubmitButton={!isFormFullFilled() || thereIsAnyError()}
            onSubmit={(e) => handleSubmit(e)}
            alternativeFlowLabel="Já tem uma conta?"
            icon={LogIn}
            navigateButtonLabel="Fazer login"
            navigateButtonTo="/login"
        >
            <FormField.Container>
                <FormField.Label label="Nome completo" error={formDataErros.name} />
                <FormField.Content>
                    <FormField.Icon icon={User} error={formDataErros.name} />
                    <FormField.GenericInput
                        type="text"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChangeValue={(value) => handleChange("name", value)}
                        hasIcon={true}
                        disabled={loading}
                    />
                </FormField.Content>
            </FormField.Container>

            <FormField.Container>
                <FormField.Label label="E-mail" error={formDataErros.email} />
                <FormField.Content>
                    <FormField.Icon icon={Mail} error={formDataErros.email} />
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
                <FormField.Label label="Senha" error={formDataErros.password} />
                <FormField.Content>
                    <FormField.Icon icon={Lock} error={formDataErros.password} />
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
                <FormField.Description description="A senha deve ter no mínimo 8 caracteres" />
            </FormField.Container>
        </FormLayout>
    )
}