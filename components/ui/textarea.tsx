import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[140px] w-full rounded-2xl border border-input bg-background/70 px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/10",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
