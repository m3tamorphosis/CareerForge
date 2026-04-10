import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const [usage, resumeCount, coverLetterCount] = userId
    ? await Promise.all([
        prisma.userUsage.findUnique({ where: { userId } }),
        prisma.resume.count({ where: { userId } }),
        prisma.coverLetter.count({ where: { userId } }),
      ])
    : [null, 0, 0];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Button asChild variant="ghost" className="h-9 w-fit rounded-full border border-white/8 bg-white/[0.03] px-3 text-slate-200 hover:bg-white/[0.06] hover:text-white">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div>
          <p className="text-sm font-medium text-accent">Settings</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Workspace preferences</h1>
        </div>
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
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Resumes</span><span className="font-medium">{resumeCount}</span></div>
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Cover letters</span><span className="font-medium">{coverLetterCount}</span></div>
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Bullet improvements</span><span className="font-medium">{usage?.bulletImprovements ?? 0}</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}