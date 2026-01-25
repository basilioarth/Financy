interface LayoutProps {
    children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100">
            <main className="mx-auto px-12 py-12 font-inter">{children}</main>
        </div>
    )
}