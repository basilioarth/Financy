import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export const FormFieldAction = () => {
    return (
        <div className="flex w-full items-center justify-between text-sm mt-4">
            <div className="flex gap-2">
                <Checkbox />
                <span className="text-gray-700">Lembrar-me</span>
            </div>
            <Button variant="linkActivated" size="link">Recuperar senha</Button>
        </div>
    )
}