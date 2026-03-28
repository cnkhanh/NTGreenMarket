"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded border-0 text-sm font-medium whitespace-nowrap transition-all duration-[150ms] ease-default outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /* Primary — Red fill, brand gradient on hover (via .btn-primary CSS class) */
        primary:
          "btn-primary min-h-[44px] px-6 py-3 active:brightness-90",
        /* Secondary — Red border inset; gray offset on hover */
        secondary:
          "min-h-[44px] px-6 py-3 shadow-[inset_0_0_0_1.5px_var(--color-primary)] text-primary bg-transparent cursor-pointer transition-shadow hover:bg-primary/5 hover:shadow-[inset_0_0_0_1.5px_var(--color-primary),4px_4px_0px_0px_var(--color-gray-200)] active:bg-primary/10",
        /* Ghost — gray border only; gray offset bg on hover */
        ghost:
          "min-h-[44px] px-6 py-3 shadow-[inset_0_0_0_1.5px_var(--color-gray-400)] text-gray-700 bg-transparent cursor-pointer transition-shadow hover:bg-gray-50 hover:shadow-[inset_0_0_0_1.5px_var(--color-gray-400),4px_4px_0px_0px_var(--color-gray-200)] active:bg-gray-200",
        /* Success — Market Green fill; amber offset shadow on hover */
        success:
          "min-h-[44px] px-6 py-3 bg-accent text-white cursor-pointer transition-shadow hover:brightness-110 hover:shadow-[4px_4px_0px_0px_#F4AD33] active:brightness-90",
        /* Destructive — dark red fill; purple offset shadow on hover */
        destructive:
          "min-h-[44px] px-6 py-3 bg-primary-dark text-white cursor-pointer transition-shadow hover:bg-primary hover:shadow-[4px_4px_0px_0px_var(--color-secondary)] active:brightness-90",
        /* Icon-only (no label) */
        icon: "size-11 p-0 cursor-pointer",
      },
      size: {
        default: "",
        sm: "min-h-[36px] px-4 py-2 text-xs",
        lg: "min-h-[52px] px-8 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <span>{children}</span>
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
