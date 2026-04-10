import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ResumeEditor } from "@/components/resume/resume-editor";
import { Button } from "@/components/ui/button";
import { defaultResume } from "@/lib/constants";

export default function NewResumePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Button asChild variant="ghost" className="h-9 w-fit rounded-full border border-white/8 bg-white/[0.03] px-3 text-slate-200 hover:bg-white/[0.06] hover:text-white">
          <Link href="/dashboard/resumes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div>
          <p className="text-sm font-medium text-accent">Resume builder</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Create a fresh resume</h1>
        </div>
      </div>
      <ResumeEditor initialData={defaultResume} />
    </div>
  );
}