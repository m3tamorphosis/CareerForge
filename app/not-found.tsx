import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-accent">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-4 text-muted-foreground">That page does not exist in this workspace yet. Head back home or jump into the dashboard.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild variant="outline"><Link href="/">Home</Link></Button>
          <Button asChild variant="accent"><Link href="/dashboard">Dashboard</Link></Button>
        </div>
      </div>
    </main>
  );
}
