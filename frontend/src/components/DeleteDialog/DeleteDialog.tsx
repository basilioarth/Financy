import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type DeleteDialogProps = {
    title: string
    description: string
    children: React.ReactNode
    handleConfirmDeletion: () => void
}

export const DeleteDialog = ({ title, description, children, handleConfirmDeletion }: DeleteDialogProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="font-inter">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <div className="flex w-full p-0 m-0 justify-between items-center gap-12">
                            <Button onClick={() => setIsOpen(false)} variant="labelButtonSecondary">
                                Cancelar
                            </Button>
                            <Button onClick={() => handleConfirmDeletion()} className="bg-red-base hover:bg-red-dark">
                                Deletar
                            </Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}