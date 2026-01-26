import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { User, Mail, Lock, LogIn, EyeClosed, Eye } from "lucide-react"
import { useState } from "react"

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
        return formDataErros.email != "" || formDataErros.password != ""
    }

    const validateName = (name: string) => {
        if (!name) return "Nome é obrigatório";
        if (name.length < 3) return "Nome deve ter no mínimo 3 caracteres";
        return "";
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return "E-mail é obrigatório";
        if (!emailRegex.test(email)) return "E-mail inválido";
        return "";
    };

    const validatePassword = (password: string) => {
        if (!password) return "Senha é obrigatória";
        if (password.length < 8) return "A senha deve ter no mínimo 8 caracteres";
        return "";
    };

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

        console.log("Submit");
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
                    <Field className="gap-2 group">
                        <FieldLabel className={cn("text-sm leading-5 text-gray-700 group-focus-within:text-brand-base", formDataErros.name != "" ? "text-danger" : "")}>Nome completo</FieldLabel>
                        <div className="relative">
                            <User className={cn("absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-brand-base", formDataErros.name != "" ? "text-danger" : "")} />
                            <Input
                                type="text"
                                placeholder="Seu nome completo"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                            />
                        </div>
                    </Field>

                    <Field className="gap-2 group">
                        <FieldLabel className={cn("text-sm leading-5 text-gray-700 group-focus-within:text-brand-base", formDataErros.email != "" ? "text-danger" : "")}>E-mail</FieldLabel>
                        <div className="relative">
                            <Mail className={cn("absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-brand-base", formDataErros.email != "" ? "text-danger" : "")} />
                            <Input
                                type="email"
                                placeholder="mail@exemplo.com"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                        </div>
                    </Field>

                    <Field className="gap-2 group">
                        <FieldLabel className={cn("text-sm leading-5 text-gray-700 group-focus-within:text-brand-base", formDataErros.password != "" ? "text-danger" : "")}>Senha</FieldLabel>
                        <div className="relative">
                            <Lock className={cn("absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-brand-base", formDataErros.password != "" ? "text-danger" : "")} />
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Digite sua senha"
                                value={formData.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700"
                            >
                                {showPassword ? (
                                    <Eye className="h-4 w-4" />
                                ) : (
                                    <EyeClosed className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        <FieldDescription className="text-xs leading-4 text-gray-500">A senha deve ter no mínimo 8 caracteres</FieldDescription>
                    </Field>
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