import {
    LucideIcon,
    Utensils,
    Ticket,
    PiggyBank,
    ShoppingCart,
    BriefcaseBusiness,
    HeartPulse,
    CarFront,
    ToolCase,
    PawPrint,
    House,
    Gift,
    Dumbbell,
    BookOpen,
    BaggageClaim,
    Mailbox,
    ReceiptText,
    CircleQuestionMark,
} from "lucide-react";

type CategoryIcon = {
    name: string
    icon: LucideIcon,
}

export const availableIcons: CategoryIcon[] = [
    {
        name: "briefcase-business",
        icon: BriefcaseBusiness
    },
    {
        name: "car-front",
        icon: CarFront
    },
    {
        name: "heart-pulse",
        icon: HeartPulse
    },
    {
        name: "piggy-bank",
        icon: PiggyBank
    },
    {
        name: "shopping-cart",
        icon: ShoppingCart
    },
    {
        name: "ticket",
        icon: Ticket
    },
    {
        name: "tool-case",
        icon: ToolCase
    },
    {
        name: "utensils",
        icon: Utensils
    },
    {
        name: "paw-print",
        icon: PawPrint
    },
    {
        name: "house",
        icon: House
    },
    {
        name: "gift",
        icon: Gift
    },
    {
        name: "dumbbell",
        icon: Dumbbell
    },
    {
        name: "book-open",
        icon: BookOpen
    },
    {
        name: "baggage-claim",
        icon: BaggageClaim
    },
    {
        name: "mailbox",
        icon: Mailbox
    },
    {
        name: "receipt-text",
        icon: ReceiptText
    },
    {
        name: "undefined",
        icon: CircleQuestionMark
    }
]

export const getIconByName = (name: string): LucideIcon => {
    return availableIcons.filter((availableIcon) => availableIcon.name == name)[0].icon;
}