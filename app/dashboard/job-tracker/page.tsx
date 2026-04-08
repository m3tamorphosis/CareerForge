import { JobTrackerManager } from "@/components/dashboard/job-tracker-manager";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/data";

export default async function JobTrackerPage() {
  const user = await requireUser();
  const applications = await prisma.jobApplication.findMany({ where: { userId: user.id }, orderBy: { updatedAt: "desc" } });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-accent">Job tracker</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Track every application with context</h1>
      </div>
      <JobTrackerManager initialApplications={applications} />
    </div>
  );
}
