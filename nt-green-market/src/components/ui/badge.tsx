import { cn } from "@/lib/utils"

const badgeVariants: Record<string, string> = {
  /* ─── Role badges ─────────────────────────────────── */
  buyer:   "bg-info/15 text-info border-info/30",
  seller:  "bg-accent/15 text-accent border-accent/30",
  admin:   "bg-secondary/15 text-secondary border-secondary/30",

  /* ─── Order status badges ─────────────────────────── */
  pending:   "bg-warning/15 text-warning border-warning/30",
  confirmed: "bg-accent/15 text-accent border-accent/30",
  ready:     "bg-info/15 text-info border-info/30",
  completed: "bg-gray-500/15 text-gray-500 border-gray-500/30",
  cancelled: "bg-error/15 text-error border-error/30",

  /* ─── Generic ─────────────────────────────────────── */
  default: "bg-gray-200 text-gray-700 border-gray-200",
}

type BadgeVariant = keyof typeof badgeVariants

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium",
        badgeVariants[variant] ?? badgeVariants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge, type BadgeVariant }
