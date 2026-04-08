import { ResumeEditor } from "@/components/resume/resume-editor";
import { defaultResume } from "@/lib/constants";

export default function NewResumePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-accent">Resume builder</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Create a fresh resume</h1>
      </div>
      <ResumeEditor initialData={defaultResume} />
    </div>
  );
}
