"use client";

import { Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { useDeferredValue, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { saveResumeAction } from "@/app/dashboard/actions";
import { ResumePreview } from "@/components/resume/resume-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { exportElementToPdf } from "@/lib/pdf";
import type { ResumeFormValues } from "@/types";

const bulletActions = ["improve", "shorten", "professionalize", "achievement-focused"] as const;

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
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Resume workspace</CardTitle>
            <CardDescription>Shape the story, tune each bullet, and export a polished PDF when you are ready.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label>Resume title</Label>
                <Input value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Full name</Label>
                <Input value={values.personal.fullName} onChange={(e) => setValues({ ...values, personal: { ...values.personal, fullName: e.target.value } })} />
              </div>
              <div className="space-y-2">
                <Label>Target role</Label>
                <Input value={values.personal.role} onChange={(e) => setValues({ ...values, personal: { ...values.personal, role: e.target.value } })} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={values.personal.email} onChange={(e) => setValues({ ...values, personal: { ...values.personal, email: e.target.value } })} />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={values.personal.phone} onChange={(e) => setValues({ ...values, personal: { ...values.personal, phone: e.target.value } })} />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={values.personal.location} onChange={(e) => setValues({ ...values, personal: { ...values.personal, location: e.target.value } })} />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input value={values.personal.website} onChange={(e) => setValues({ ...values, personal: { ...values.personal, website: e.target.value } })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Professional summary</Label>
              <Textarea value={values.summary} onChange={(e) => setValues({ ...values, summary: e.target.value })} className="min-h-[120px]" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Experience</h3>
                  <p className="text-sm text-muted-foreground">Turn responsibilities into sharp, outcome-oriented bullets.</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
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
              </div>

              {values.experience.map((item, index) => (
                <motion.div key={item.id} layout className="space-y-4 rounded-[28px] border border-border/70 bg-muted/40 p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input value={item.company} onChange={(e) => updateExperience(index, "company", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Input value={item.role} onChange={(e) => updateExperience(index, "role", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Start date</Label>
                      <Input value={item.startDate} onChange={(e) => updateExperience(index, "startDate", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>End date</Label>
                      <Input value={item.endDate} onChange={(e) => updateExperience(index, "endDate", e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {item.bullets.map((bullet, bulletIndex) => {
                      const key = `${item.id}-${bulletIndex}`;
                      return (
                        <div key={key} className="rounded-3xl border border-border/70 bg-background/80 p-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <Label>Bullet {bulletIndex + 1}</Label>
                            <div className="flex flex-wrap gap-2">
                              {bulletActions.map((action) => (
                                <Button
                                  key={action}
                                  type="button"
                                  size="sm"
                                  variant="ghost"
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
                                  {aiLoadingKey === `${key}-${action}` ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : action}
                                </Button>
                              ))}
                            </div>
                          </div>
                          <Textarea
                            className="mt-3 min-h-[90px]"
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
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => updateExperience(index, "bullets", [...item.bullets, ""])}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add bullet
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setValues((current) => ({
                          ...current,
                          experience: current.experience.filter((entry) => entry.id !== item.id),
                        }))
                      }
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove role
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Education</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setValues((current) => ({
                        ...current,
                        education: [...current.education, { id: crypto.randomUUID(), school: "", degree: "", year: "" }],
                      }))
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />Add
                  </Button>
                </div>
                {values.education.map((item, index) => (
                  <div key={item.id} className="rounded-[28px] border border-border/70 bg-muted/40 p-4">
                    <div className="space-y-3">
                      <div className="space-y-2"><Label>School</Label><Input value={item.school} onChange={(e) => updateEducation(index, "school", e.target.value)} /></div>
                      <div className="space-y-2"><Label>Degree</Label><Input value={item.degree} onChange={(e) => updateEducation(index, "degree", e.target.value)} /></div>
                      <div className="space-y-2"><Label>Year</Label><Input value={item.year} onChange={(e) => updateEducation(index, "year", e.target.value)} /></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Skills</Label>
                <Textarea
                  className="min-h-[220px]"
                  value={values.skills.join(", ")}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      skills: e.target.value.split(",").map((skill) => skill.trim()).filter(Boolean),
                    })
                  }
                />
                <p className="text-xs text-muted-foreground">Separate each skill with a comma.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="accent"
                disabled={isPending}
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
                onClick={async () => {
                  const element = document.getElementById("resume-preview");
                  if (!element) return;
                  await exportElementToPdf(element, `${values.title || "careerforge-resume"}.pdf`);
                }}
              >
                Export to PDF
              </Button>
            </div>
            {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 xl:sticky xl:top-6 xl:self-start">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Live preview</CardTitle>
            <CardDescription>Your polished output updates as you refine each section.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResumePreview values={deferredValues} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
