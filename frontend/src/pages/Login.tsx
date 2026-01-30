import { FormLayout } from "@/components/FormLayout"
import { FormField } from "@/components/FormField"
import { UserRoundPlus, Mail, Lock } from "lucide-react"
import { useState } from "react";

export function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (e: any) => {
        console.log("Login");
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
            submitButtonTo="/"
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