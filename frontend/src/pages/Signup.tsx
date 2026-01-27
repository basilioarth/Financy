import { User, Mail, Lock, LogIn } from "lucide-react"
import { useState } from "react"
import { FormLayout } from "@/components/FormLayout"
import { FormField } from "@/components/FormField"
import { validateName, validateEmail, validatePassword } from "@/components/FormField/utils"

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

    const handleSubmit = (e: any) => {
        e.preventDefault();

        console.log(formData.name);
        console.log(formData.email);
        console.log(formData.password);
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