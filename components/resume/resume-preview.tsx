import { normalizeResumeForPDF } from "@/lib/resume-pdf";
import type { ResumeFormValues } from "@/types";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <div>
        <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#475569" }}>
          {title}
        </h2>
        <div className="mt-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
      </div>
      <div>{children}</div>
    </section>
  );
}

export function ResumePreview({ values, previewId = "resume-preview" }: { values: ResumeFormValues; previewId?: string }) {
  const resume = normalizeResumeForPDF(values);
  const contact = [resume.email, resume.phone, resume.location, resume.website, resume.github, resume.linkedin].filter(Boolean);

  return (
    <div id={previewId} className="rounded-[28px] bg-[#08101c] p-4 sm:p-6">
      <div
        className="mx-auto w-full max-w-[820px] bg-white px-7 py-8 sm:px-10 sm:py-10"
        style={{
          minHeight: "1120px",
          color: "#334155",
          boxShadow: "0 28px 80px rgba(2, 6, 23, 0.28)",
        }}
      >
        <div className="space-y-5">
          <header className="pb-1">
            <h1 className="text-[30px] font-bold leading-none tracking-[-0.02em]" style={{ color: "#0f172a" }}>
              {resume.name}
            </h1>
            <p className="mt-1.5 text-[15px] font-medium leading-6" style={{ color: "#334155" }}>
              {resume.role}
            </p>
            {contact.length ? (
              <p className="mt-2 text-[11.5px] leading-5" style={{ color: "#64748b" }}>
                {contact.join(" | ")}
              </p>
            ) : null}
          </header>

          <Section title="Summary">
            <p className="text-[11.5px] leading-[1.55]" style={{ color: "#334155" }}>
              {resume.summary}
            </p>
          </Section>

          {resume.skillGroups.length ? (
            <Section title="Technical Skills">
              <div className="grid gap-1.5">
                {resume.skillGroups.map((group) => (
                  <p key={group.category} className="grid grid-cols-[88px_1fr] gap-2 text-[11.5px] leading-[1.5]">
                    <span className="font-semibold" style={{ color: "#0f172a" }}>{group.category}:</span>
                    <span style={{ color: "#334155" }}>{group.items.join(", ")}</span>
                  </p>
                ))}
              </div>
            </Section>
          ) : null}

          {resume.experience.length ? (
            <Section title="Experience">
              <div className="space-y-4">
                {resume.experience.map((item) => (
                  <article key={item.id} className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <h3 className="text-[12.5px] font-semibold leading-[1.35]" style={{ color: "#0f172a" }}>{item.role}</h3>
                        <p className="text-[11.5px] leading-[1.45]" style={{ color: "#334155" }}>{item.company}</p>
                      </div>
                      <p className="shrink-0 text-[11px] whitespace-nowrap leading-[1.35]" style={{ color: "#64748b" }}>
                        {item.startDate} - {item.endDate}
                      </p>
                    </div>
                    <ul className="space-y-1 pl-4 text-[11.5px] leading-[1.5]" style={{ color: "#334155" }}>
                      {item.bullets.map((bullet, index) => (
                        <li key={`${item.id}-${index}`} className="list-disc marker:text-slate-400">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </Section>
          ) : null}

          {resume.projects.length ? (
            <Section title="Projects">
              <div className="space-y-4">
                {resume.projects.map((project) => (
                  <article key={project.id} className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-[12.5px] font-semibold leading-[1.35]" style={{ color: "#0f172a" }}>{project.name}</h3>
                      {project.link ? (
                        <p className="shrink-0 text-[11px] whitespace-nowrap leading-[1.35]" style={{ color: "#64748b" }}>
                          {project.link}
                        </p>
                      ) : null}
                    </div>
                    <p className="text-[11.5px] leading-[1.5]" style={{ color: "#334155" }}>{project.description}</p>
                    <p className="text-[11px] leading-[1.45]" style={{ color: "#64748b" }}>Tech Stack: {project.techStack}</p>
                  </article>
                ))}
              </div>
            </Section>
          ) : null}

          {resume.education.length ? (
            <Section title="Education">
              <div className="space-y-3">
                {resume.education.map((item) => (
                  <article key={item.id} className="flex items-baseline justify-between gap-4">
                    <div>
                      <h3 className="text-[12.5px] font-semibold leading-[1.35]" style={{ color: "#0f172a" }}>{item.degree}</h3>
                      <p className="text-[11.5px] leading-[1.45]" style={{ color: "#334155" }}>{item.school}</p>
                    </div>
                    <p className="shrink-0 text-[11px] whitespace-nowrap leading-[1.35]" style={{ color: "#64748b" }}>{item.year}</p>
                  </article>
                ))}
              </div>
            </Section>
          ) : null}

          {resume.certifications.length ? (
            <Section title="Certifications">
              <ul className="space-y-1 pl-4 text-[11.5px] leading-[1.5]" style={{ color: "#334155" }}>
                {resume.certifications.map((certification) => (
                  <li key={certification} className="list-disc marker:text-slate-400">{certification}</li>
                ))}
              </ul>
            </Section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
