import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-2xl border border-input bg-background/70 px-4 text-sm placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/10",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
