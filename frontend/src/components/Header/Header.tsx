import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/stores/auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Header() {
    const { user, logout, isAuthenticated } = useAuthStore()
    const location = useLocation()
    const navigate = useNavigate()
    const isDashboardPage = location.pathname === "/"
    const isTransactionsPage = location.pathname === "/transactions"
    const isCategoriesPage = location.pathname === "/categories"

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <div className="w-full px-12 py-4 bg-white border-b-[1px] border-b-gray-200">
            {isAuthenticated && (
                <div className="flex justify-between w-full items-center">
                    <img
                        src="/logo.svg"
                        alt="Logo do Financy"
                        className="w-auto h-6"
                    />
                    <div className="flex items-center gap-5">
                        <Link to="/">
                            <Button
                                size="tab"
                                variant={isDashboardPage ? "tabActivated" : "tabDeactivated"}
                                className={isDashboardPage ? "font-semibold" : ""}
                            >
                                Dashboard
                            </Button>
                        </Link>
                        <Link to="/transactions">
                            <Button
                                size="tab"
                                variant={isTransactionsPage ? "tabActivated" : "tabDeactivated"}
                                className={isTransactionsPage ? "font-semibold" : ""}
                            >
                                Transações
                            </Button>
                        </Link>
                        <Link to="/categories">
                            <Button
                                size="tab"
                                variant={isCategoriesPage ? "tabActivated" : "tabDeactivated"}
                                className={isCategoriesPage ? "font-semibold" : ""}
                            >
                                Categorias
                            </Button>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarFallback className="bg-gray-300 text-gray-800">
                                    {user?.fullName?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
