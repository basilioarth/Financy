import { User, Mail, Lock, LogIn } from "lucide-react"
import { useState } from "react"
import { FormLayout } from "@/components/FormLayout"
import { FormField } from "@/components/FormField"
import { validateName, validateEmail, validatePassword } from "@/components/FormField/utils"
import { useAuthStore } from "@/stores/auth"
import { toast } from "sonner"

export function Signup() {
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
                toast.success("Cadastro realizado com sucesso!")
            }
        } catch (error: any) {
            toast.error("Erro ao realizar o cadastro")
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
            <FormField
                type="text"
                label="Nome completo"
                placeholder="Seu nome completo"
                value={formData.name}
                onChangeValue={(value) => handleChange("name", value)}
                icon={User}
                error={formDataErros.name}
            />

            <FormField
                type="email"
                label="E-mail"
                placeholder="mail@example.com"
                value={formData.email}
                onChangeValue={(value) => handleChange("email", value)}
                icon={Mail}
                error={formDataErros.email}
            />

            <FormField
                type={showPassword ? "text" : "password"}
                label="Senha"
                placeholder="Digite sua senha"
                value={formData.password}
                description="A senha deve ter no mínimo 8 caracteres"
                onChangeValue={(value) => handleChange("password", value)}
                icon={Lock}
                error={formDataErros.password}
                hidden={showPassword}
                onChangeVisibility={(value) => setShowPassword(value)}
            />
        </FormLayout>
    )
}