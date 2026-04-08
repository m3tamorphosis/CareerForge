import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const session = await auth();
  const usage = session?.user?.id ? await prisma.userUsage.findUnique({ where: { userId: session.user.id } }) : null;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-accent">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Workspace preferences</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Current signed-in identity for this workspace.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div><p className="text-muted-foreground">Name</p><p className="font-medium">{session?.user?.name ?? "-"}</p></div>
            <div><p className="text-muted-foreground">Email</p><p className="font-medium">{session?.user?.email ?? "-"}</p></div>
            <div><p className="text-muted-foreground">Plan</p><Badge variant="secondary" className="mt-1">Free for now</Badge></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage snapshot</CardTitle>
            <CardDescription>Helpful until billing and plan enforcement are introduced.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Resumes</span><span className="font-medium">{usage?.resumesCreated ?? 0}</span></div>
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Cover letters</span><span className="font-medium">{usage?.coverLettersCreated ?? 0}</span></div>
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Bullet improvements</span><span className="font-medium">{usage?.bulletImprovements ?? 0}</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
