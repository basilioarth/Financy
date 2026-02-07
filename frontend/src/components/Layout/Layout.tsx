import { Toaster } from "sonner"
import { Header } from "@/components/Header"

interface LayoutProps {
    children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100 font-inter">
            <Header />
            <main className="mx-auto px-12 py-12">{children}</main>
            <Toaster />
        </div>
    )
}