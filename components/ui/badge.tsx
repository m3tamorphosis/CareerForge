import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", {
  variants: {
    variant: {
      default: "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950",
      secondary: "bg-secondary text-secondary-foreground",
      success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
      warning: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
      danger: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
      outline: "border border-border bg-background text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
