import { Mail, MapPin, Phone, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { ResumeFormValues } from "@/types";

export function ResumePreview({ values, previewId = "resume-preview" }: { values: ResumeFormValues; previewId?: string }) {
  return (
    <div id={previewId} className="rounded-[32px] bg-white p-8 text-slate-900 shadow-2xl shadow-slate-950/10">
      <div className="flex flex-col gap-6">
        <div className="border-b border-slate-200 pb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">{values.personal.fullName}</h1>
              <p className="mt-2 text-base text-slate-600">{values.personal.role}</p>
            </div>
            <Badge className="gap-2 self-start bg-slate-900 text-white">
              <Sparkles className="h-3.5 w-3.5" />
              CareerForge AI Preview
            </Badge>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />{values.personal.email}</span>
            <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" />{values.personal.phone}</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" />{values.personal.location}</span>
          </div>
        </div>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Summary</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">{values.summary}</p>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Experience</h2>
          <div className="mt-4 space-y-5">
            {values.experience.map((item) => (
              <div key={item.id}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{item.role}</h3>
                    <p className="text-sm text-slate-600">{item.company}</p>
                  </div>
                  <p className="text-sm text-slate-500">{item.startDate} - {item.endDate}</p>
                </div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                  {item.bullets.map((bullet, index) => <li key={`${item.id}-${index}`}>{bullet}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Education</h2>
            <div className="mt-4 space-y-4 text-sm text-slate-700">
              {values.education.map((item) => (
                <div key={item.id}>
                  <p className="font-semibold">{item.degree}</p>
                  <p>{item.school}</p>
                  <p className="text-slate-500">{item.year}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {values.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
