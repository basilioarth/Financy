import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        labelButtonPrimary:
          "bg-brand-base shadow-none text-white hover:bg-brand-dark disabled:opacity-50",
        labelButtonSecondary:
          "bg-white shadow-none text-gray-700 border border-gray-300 hover:bg-gray-200 disabled:opacity-50",
        iconButton:
          "bg-white shadow-none text-gray-700 border border-gray-300 hover:bg-gray-200 disabled:opacity-50",
        paginationButton:
          "bg-white shadow-none text-gray-700 border border-gray-300 hover:bg-gray-200 active:bg-brand-base active:text-white disabled:opacity-50 cursor-pointer",
        linkActivated:
          "bg-transparent shadow-none text-brand-base hover:underline",
        linkDeactivated:
          "bg-transparent shadow-none text-gray-600 hover:text-brand-base hover:underline",
        tabActivated:
          "bg-transparent shadow-none text-brand-base",
        tabDeactivated:
          "bg-transparent shadow-none text-gray-600 hover:text-brand-base",
        tagButton:
          "shadow-none px-3 py-1 rounded-full",
        typeIncome:
          "bg-transparent shadow-none text-green-dark",
        typeOutcome:
          "bg-transparent shadow-none text-red-dark",
        typeSelectOption:
          "bg-transparent gap-3 flex items-center justify-center",
        // destructive:
        //   "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        // outline:
        //   "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        // secondary:
        //   "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        label: "text-base h-12 w-full px-4 py-3 rounded-lg",
        icon: "h-8 w-8 px-2 py-2 rounded-lg",
        pagination: "h-8 w-8 px-2 py-2 rounded-lg",
        link: "text-sm leading-5 h-5 w-auto p-0 rounded-0",
        tab: "text-sm leading-5 h-5 w-auto p-0 rounded-0",
        tag: "text-sm font-medium",
        type: "text-sm leading-5 h-5 w-auto p-0 rounded-0",
        select: "w-full text-base leading-[18px] text-gray-600"
        // sm: "h-8 rounded-md px-3 text-xs",
        // lg: "h-10 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "labelButtonPrimary",
      size: "label",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
