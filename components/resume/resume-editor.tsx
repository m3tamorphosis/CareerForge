"use client";

import { Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDeferredValue, useState, useTransition } from "react";

import { saveResumeAction } from "@/app/dashboard/actions";
import { ResumePreview } from "@/components/resume/resume-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { exportResumeToPDF } from "@/lib/exportResumeToPDF";
import { cn } from "@/lib/utils";
import type { ResumeFormValues } from "@/types";

const bulletActions = ["improve", "shorten", "professionalize", "achievement-focused"] as const;

const fieldClass =
  "h-10 rounded-xl border-white/7 bg-slate-950/45 px-3.5 text-sm text-slate-100 shadow-none placeholder:text-slate-500 focus-visible:border-sky-400/40 focus-visible:ring-2 focus-visible:ring-sky-400/10";
const textareaClass =
  "rounded-xl border-white/7 bg-slate-950/45 px-3.5 py-3 text-sm leading-6 text-slate-100 shadow-none placeholder:text-slate-500 focus-visible:border-sky-400/40 focus-visible:ring-2 focus-visible:ring-sky-400/10 resize-y";

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

function EditorSection({ eyebrow, title, description, actions, children, className }: SectionProps) {
  return (
    <section className={cn("space-y-5 border-t border-white/6 pt-8 first:border-t-0 first:pt-0", className)}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          {eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300/85">{eyebrow}</p> : null}
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-white">{title}</h2>
          {description ? <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}

function Field({ label, hint, className, children }: { label: string; hint?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">{label}</Label>
      {children}
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

function ExperienceRole({
  item,
  index,
  values,
  aiLoadingKey,
  setAiLoadingKey,
  setMessage,
  updateExperience,
  onRemove,
}: {
  item: ResumeFormValues["experience"][number];
  index: number;
  values: ResumeFormValues;
  aiLoadingKey: string | null;
  setAiLoadingKey: (value: string | null) => void;
  setMessage: (value: string) => void;
  updateExperience: (index: number, field: keyof ResumeFormValues["experience"][number], value: string | string[]) => void;
  onRemove: () => void;
}) {
  return (
    <motion.div
      layout
      className="rounded-[22px] bg-white/[0.025] px-4 py-4 ring-1 ring-white/6 backdrop-blur-sm"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Experience item</p>
          <p className="mt-1 text-sm text-slate-300">Structure the role first, then tighten the evidence beneath it.</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 rounded-full px-3 text-xs text-slate-400 hover:bg-white/[0.05] hover:text-slate-100"
          onClick={onRemove}
        >
          <Trash2 className="mr-1.5 h-3.5 w-3.5" />
          Remove role
        </Button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Field label="Company" className="xl:col-span-2">
          <Input className={fieldClass} value={item.company} onChange={(e) => updateExperience(index, "company", e.target.value)} />
        </Field>
        <Field label="Role" className="xl:col-span-2">
          <Input className={fieldClass} value={item.role} onChange={(e) => updateExperience(index, "role", e.target.value)} />
        </Field>
        <Field label="Start date">
          <Input className={fieldClass} value={item.startDate} onChange={(e) => updateExperience(index, "startDate", e.target.value)} />
        </Field>
        <Field label="End date">
          <Input className={fieldClass} value={item.endDate} onChange={(e) => updateExperience(index, "endDate", e.target.value)} />
        </Field>
      </div>

      <div className="mt-6 space-y-3 border-t border-white/6 pt-4">
        {item.bullets.map((bullet, bulletIndex) => {
          const key = `${item.id}-${bulletIndex}`;
          return (
            <div key={key} className="space-y-2.5 rounded-2xl bg-slate-950/28 px-3 py-3 ring-1 ring-white/5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Bullet {bulletIndex + 1}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {bulletActions.map((action) => (
                    <Button
                      key={action}
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-7 rounded-full border border-white/6 bg-white/[0.03] px-3 text-[11px] font-medium capitalize text-slate-300 hover:bg-white/[0.06]"
                      disabled={aiLoadingKey === `${key}-${action}`}
                      onClick={async () => {
                        setAiLoadingKey(`${key}-${action}`);
                        setMessage("");
                        const response = await fetch("/api/ai/resume-bullets", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ bullet, action, role: item.role || values.personal.role }),
                        });
                        const data = await response.json();
                        setAiLoadingKey(null);

                        if (!response.ok) {
                          setMessage(data.error ?? "Unable to improve bullet.");
                          return;
                        }

                        const nextBullets = [...item.bullets];
                        nextBullets[bulletIndex] = data.suggestion.trim();
                        updateExperience(index, "bullets", nextBullets);
                        setMessage(`AI ${action} applied.`);
                      }}
                    >
                      {aiLoadingKey === `${key}-${action}` ? <Loader2 className="h-3 w-3 animate-spin" /> : action}
                    </Button>
                  ))}
                </div>
              </div>
              <Textarea
                className={cn(textareaClass, "min-h-[88px] bg-transparent")}
                value={bullet}
                onChange={(e) => {
                  const nextBullets = [...item.bullets];
                  nextBullets[bulletIndex] = e.target.value;
                  updateExperience(index, "bullets", nextBullets);
                }}
              />
            </div>
          );
        })}

        <div className="pt-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 rounded-full px-3 text-xs text-slate-300 hover:bg-white/[0.05]"
            onClick={() => updateExperience(index, "bullets", [...item.bullets, ""])}
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add bullet
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function ResumeEditor({ initialData, resumeId }: { initialData: ResumeFormValues; resumeId?: string }) {
  const router = useRouter();
  const [values, setValues] = useState<ResumeFormValues>(initialData);
  const deferredValues = useDeferredValue(values);
  const [isPending, startTransition] = useTransition();
  const [aiLoadingKey, setAiLoadingKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const updateExperience = (index: number, field: keyof ResumeFormValues["experience"][number], value: string | string[]) => {
    setValues((current) => {
      const next = [...current.experience];
      next[index] = { ...next[index], [field]: value };
      return { ...current, experience: next };
    });
  };

  const updateEducation = (index: number, field: keyof ResumeFormValues["education"][number], value: string) => {
    setValues((current) => {
      const next = [...current.education];
      next[index] = { ...next[index], [field]: value };
      return { ...current, education: next };
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
      <div className="space-y-6">
        <section className="rounded-[28px] border border-white/7 bg-slate-950/55 px-6 py-6 shadow-[0_20px_70px_rgba(2,6,23,0.26)] backdrop-blur-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300/85">Resume Builder</p>
              <h1 className="mt-2 text-[1.9rem] font-semibold tracking-tight text-white">Build a cleaner, sharper narrative.</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Edit the substance here, keep the structure light, and export a recruiter-ready document without dragging the app UI into the final output.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="accent"
                disabled={isPending}
                className="h-10 rounded-xl px-4.5 shadow-[0_12px_28px_rgba(14,165,233,0.18)]"
                onClick={() => {
                  setMessage("");
                  startTransition(async () => {
                    try {
                      const result = await saveResumeAction({ id: resumeId, values });
                      setMessage("Resume saved successfully.");
                      if (!resumeId) {
                        router.push(`/dashboard/resumes/${result.id}`);
                      }
                      router.refresh();
                    } catch (error) {
                      setMessage(error instanceof Error ? error.message : "Unable to save resume.");
                    }
                  });
                }}
              >
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Save resume
              </Button>
              <Button
                variant="outline"
                className="h-10 rounded-xl border-white/7 bg-white/[0.03] px-4.5 text-slate-200 hover:bg-white/[0.05]"
                onClick={async () => {
                  setMessage("");
                  try {
                    await exportResumeToPDF(values, `${values.title || "careerforge-resume"}.pdf`);
                    setMessage("PDF exported successfully.");
                  } catch (error) {
                    setMessage(error instanceof Error ? error.message : "Unable to export resume.");
                  }
                }}
              >
                Export PDF
              </Button>
            </div>
          </div>
          {message ? <p className="mt-4 text-sm text-slate-400">{message}</p> : null}
        </section>

        <div className="rounded-[28px] border border-white/6 bg-white/[0.025] px-6 py-6 shadow-[0_16px_50px_rgba(2,6,23,0.16)] backdrop-blur-sm">
          <div className="space-y-8">
            <EditorSection
              eyebrow="Identity"
              title="Core details"
              description="Keep the top of the resume clear, calm, and instantly scannable."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Resume title" className="md:col-span-2">
                  <Input className={fieldClass} value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })} />
                </Field>
                <Field label="Full name">
                  <Input className={fieldClass} value={values.personal.fullName} onChange={(e) => setValues({ ...values, personal: { ...values.personal, fullName: e.target.value } })} />
                </Field>
                <Field label="Target role">
                  <Input className={fieldClass} value={values.personal.role} onChange={(e) => setValues({ ...values, personal: { ...values.personal, role: e.target.value } })} />
                </Field>
                <Field label="Email">
                  <Input className={fieldClass} type="email" value={values.personal.email} onChange={(e) => setValues({ ...values, personal: { ...values.personal, email: e.target.value } })} />
                </Field>
                <Field label="Phone">
                  <Input className={fieldClass} value={values.personal.phone} onChange={(e) => setValues({ ...values, personal: { ...values.personal, phone: e.target.value } })} />
                </Field>
                <Field label="Location">
                  <Input className={fieldClass} value={values.personal.location} onChange={(e) => setValues({ ...values, personal: { ...values.personal, location: e.target.value } })} />
                </Field>
                <Field label="Website">
                  <Input className={fieldClass} value={values.personal.website} onChange={(e) => setValues({ ...values, personal: { ...values.personal, website: e.target.value } })} />
                </Field>
                <Field label="Professional summary" className="md:col-span-2">
                  <Textarea className={cn(textareaClass, "min-h-[132px]")} value={values.summary} onChange={(e) => setValues({ ...values, summary: e.target.value })} />
                </Field>
              </div>
            </EditorSection>

            <EditorSection
              eyebrow="Narrative"
              title="Experience"
              description="Treat each role like an edited story: compact structure, crisp bullets, and fast AI assistance when you need it."
              actions={
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 rounded-xl border-white/7 bg-white/[0.03] px-4 text-slate-200 hover:bg-white/[0.05]"
                  onClick={() =>
                    setValues((current) => ({
                      ...current,
                      experience: [
                        ...current.experience,
                        { id: crypto.randomUUID(), company: "", role: "", startDate: "", endDate: "", bullets: [""] },
                      ],
                    }))
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add role
                </Button>
              }
            >
              <div className="space-y-4">
                {values.experience.map((item, index) => (
                  <ExperienceRole
                    key={item.id}
                    item={item}
                    index={index}
                    values={values}
                    aiLoadingKey={aiLoadingKey}
                    setAiLoadingKey={setAiLoadingKey}
                    setMessage={setMessage}
                    updateExperience={updateExperience}
                    onRemove={() =>
                      setValues((current) => ({
                        ...current,
                        experience: current.experience.filter((entry) => entry.id !== item.id),
                      }))
                    }
                  />
                ))}
              </div>
            </EditorSection>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <EditorSection
                eyebrow="Credentials"
                title="Education"
                description="Keep credentials concise and neatly stacked."
                actions={
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 rounded-full px-3 text-xs text-slate-300 hover:bg-white/[0.05]"
                    onClick={() =>
                      setValues((current) => ({
                        ...current,
                        education: [...current.education, { id: crypto.randomUUID(), school: "", degree: "", year: "" }],
                      }))
                    }
                  >
                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                    Add
                  </Button>
                }
                className="border-t-0 pt-0"
              >
                <div className="space-y-3">
                  {values.education.map((item, index) => (
                    <div key={item.id} className="rounded-[20px] bg-white/[0.025] px-4 py-4 ring-1 ring-white/6">
                      <div className="grid gap-3">
                        <Field label="School">
                          <Input className={fieldClass} value={item.school} onChange={(e) => updateEducation(index, "school", e.target.value)} />
                        </Field>
                        <Field label="Degree">
                          <Input className={fieldClass} value={item.degree} onChange={(e) => updateEducation(index, "degree", e.target.value)} />
                        </Field>
                        <Field label="Year">
                          <Input className={fieldClass} value={item.year} onChange={(e) => updateEducation(index, "year", e.target.value)} />
                        </Field>
                      </div>
                    </div>
                  ))}
                </div>
              </EditorSection>

              <EditorSection
                eyebrow="Keywords"
                title="Skills"
                description="Keep the list recruiter-readable and easy to regroup later."
                className="border-t-0 pt-0"
              >
                <Field label="Core skills" hint="Example: TypeScript, Next.js, PostgreSQL, Product Strategy">
                  <Textarea
                    className={cn(textareaClass, "min-h-[242px]")}
                    value={values.skills.join(", ")}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        skills: e.target.value.split(",").map((skill) => skill.trim()).filter(Boolean),
                      })
                    }
                  />
                </Field>
              </EditorSection>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 xl:sticky xl:top-6 xl:self-start">
        <Card className="overflow-hidden border-white/7 bg-slate-950/45 shadow-[0_18px_60px_rgba(2,6,23,0.24)]">
          <CardHeader className="border-b border-white/6 pb-4">
            <CardTitle className="text-lg text-white">Live preview</CardTitle>
            <CardDescription className="text-slate-400">A document surface that stays closely aligned with the exported PDF.</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-5">
            <ResumePreview values={deferredValues} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
