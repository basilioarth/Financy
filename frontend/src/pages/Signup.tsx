import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import { User, Mail, Lock, LogIn } from "lucide-react"
import { useState } from "react"
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
        <div className="flex flex-col justify-center items-center gap-8">
            <img
                src="/logo.svg"
                alt="Logo do Financy"
                className="w-auto h-8"
            />
            <div
                className="w-112 h-fit flex flex-col px-8 py-8 justify-center align-center bg-white border border-gray-200 rounded-xl gap-8"
            >
                <div className="flex flex-col justify-center items-center gap-1">
                    <strong className="text-xl leading-7 text-gray-800">Criar conta</strong>
                    <span className="leading-6 text-gray-600">Comece a controlar suas finanças ainda hoje</span>
                </div>

                <FieldGroup className="gap-4">
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
                </FieldGroup>

                <div className="flex flex-col justify-center items-center gap-6">
                    <Button
                        disabled={!isFormFullFilled() || thereIsAnyError()}
                        onClick={(e) => handleSubmit(e)}
                    >
                        Cadastrar
                    </Button>

                    <div className="w-full flex items-center gap-3 py-2 px-0">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="text-sm leading-5 text-gray-500">ou</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-4 w-full">
                        <span>Já tem uma conta?</span>
                        <Button variant="labelButtonSecondary">
                            <LogIn /> Fazer login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}