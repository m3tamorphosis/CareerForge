import Link from "next/link";

import { EmptyState } from "@/components/dashboard/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/data";

export default async function ResumesPage() {
  const user = await requireUser();
  const resumes = await prisma.resume.findMany({ where: { userId: user.id }, orderBy: { updatedAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-accent">Resumes</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Your resume workspaces</h1>
        </div>
        <Button asChild variant="accent"><Link href="/dashboard/resumes/new">Create resume</Link></Button>
      </div>

      {resumes.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {resumes.map((resume) => (
            <Card key={resume.id}>
              <CardHeader>
                <CardTitle>{resume.title}</CardTitle>
                <CardDescription>Updated {new Date(resume.updatedAt).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-muted-foreground">{resume.summary}</p>
                <Button asChild className="mt-6" variant="outline"><Link href={`/dashboard/resumes/${resume.id}`}>Open editor</Link></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="Your workspace is clean" description="Create a resume to start building tailored application assets with AI assistance and export-ready formatting." cta="Create resume" href="/dashboard/resumes/new" />
      )}
    </div>
  );
}
