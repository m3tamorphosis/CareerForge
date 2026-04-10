import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { JobTrackerManager } from "@/components/dashboard/job-tracker-manager";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/data";

export default async function JobTrackerPage() {
  const user = await requireUser();
  const applications = await prisma.jobApplication.findMany({ where: { userId: user.id }, orderBy: { updatedAt: "desc" } });

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
          <p className="text-sm font-medium text-accent">Job tracker</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Track every application with context</h1>
        </div>
      </div>
      <JobTrackerManager initialApplications={applications} />
    </div>
  );
}