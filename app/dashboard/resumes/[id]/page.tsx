import { notFound } from "next/navigation";

import { ResumeEditor } from "@/components/resume/resume-editor";
import { getResumeById, parseResume, requireUser } from "@/lib/data";

export default async function ResumeEditPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const resume = await getResumeById(user.id, id);

  if (!resume) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-accent">Resume editor</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{resume.title}</h1>
      </div>
      <ResumeEditor initialData={parseResume(resume)} resumeId={resume.id} />
    </div>
  );
}
