import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className
}: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Helper to determine which pages to show
    const getVisiblePages = () => {
        if (totalPages <= 5) return pages;

        if (currentPage <= 3) return [1, 2, 3, 4, 5];
        if (currentPage >= totalPages - 2) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

        return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    };

    const visiblePages = getVisiblePages();

    return (
        <div className={cn("flex justify-end items-center gap-2", className)}>
            <Button
                variant="paginationButton"
                size="icon"
                className="h-8 w-8 p-0"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="h-4 w-4 text-gray-700" />
            </Button>

            {visiblePages.map((page) => (
                <Button
                    key={page}
                    variant="paginationButton"
                    size="icon"
                    className={cn(
                        "h-8 w-8",
                        currentPage === page && "bg-brand-base text-white hover:bg-brand-base hover:text-white"
                    )}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Button>
            ))}

            <Button
                variant="paginationButton"
                size="icon"
                className="h-8 w-8 p-0"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="h-4 w-4 text-gray-700" />
            </Button>
        </div>
    );
}
