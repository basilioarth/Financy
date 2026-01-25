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
                    <Field className="gap-2">
                        <FieldLabel className="text-sm leading-5 text-gray-700">Nome completo</FieldLabel>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input placeholder="Seu nome completo"></Input>
                        </div>
                    </Field>

                    <Field className="gap-2">
                        <FieldLabel className="text-sm leading-5 text-gray-700">E-mail</FieldLabel>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input type="email" placeholder="mail@exemplo.com"></Input>
                        </div>
                    </Field>

                    <Field className="gap-2">
                        <FieldLabel className="text-sm leading-5 text-gray-700">Senha</FieldLabel>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input type={showPassword ? "text" : "password"} placeholder="Digite sua senha" className="pr-10"></Input>
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
                    <Button>
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