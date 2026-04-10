"use client";

import { useEffect, useRef, useState } from "react";

import { normalizeResumeForPDF } from "@/lib/resume-pdf";
import type { ResumeFormValues } from "@/types";

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

type ResumePreviewProps = {
  values: ResumeFormValues;
  previewId?: string;
  mode?: "panel" | "focus";
  zoomLevel?: number;
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <div>
        <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#000000" }}>
          {title}
        </h2>
        <div className="mt-1 h-px" style={{ backgroundColor: "#000000" }} />
      </div>
      <div>{children}</div>
    </section>
  );
}

function hasText(value?: string | null) {
  return Boolean(value?.trim());
}

export function ResumePreview({ values, previewId = "resume-preview", mode = "panel", zoomLevel = 1 }: ResumePreviewProps) {
  const resume = normalizeResumeForPDF(values);
  const contact = [resume.email, resume.phone, resume.location, resume.website, resume.github, resume.linkedin].filter((item) => hasText(item));
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [viewportHeight, setViewportHeight] = useState(mode === "focus" ? 820 : 900);
  const [scale, setScale] = useState(mode === "focus" ? 0.9 : 0.96);

  const summary = resume.summary?.trim() ?? "";
  const skills = resume.skills.filter((skill) => hasText(skill));
  const experience = resume.experience
    .map((item) => ({
      ...item,
      role: item.role?.trim() ?? "",
      company: item.company?.trim() ?? "",
      startDate: item.startDate?.trim() ?? "",
      endDate: item.endDate?.trim() ?? "",
      bullets: item.bullets.filter((bullet) => hasText(bullet)),
    }))
    .filter((item) => item.role || item.company || item.startDate || item.endDate || item.bullets.length);
  const projects = resume.projects
    .map((project) => ({
      ...project,
      name: project.name?.trim() ?? "",
      description: project.description?.trim() ?? "",
      techStack: project.techStack?.trim() ?? "",
      link: project.link?.trim() ?? "",
    }))
    .filter((project) => project.name || project.description || project.techStack || project.link);
  const education = resume.education
    .map((item) => ({
      ...item,
      degree: item.degree?.trim() ?? "",
      school: item.school?.trim() ?? "",
      year: item.year?.trim() ?? "",
    }))
    .filter((item) => item.degree || item.school || item.year);
  const certifications = resume.certifications.filter((item) => hasText(item));
  const hasHeader = hasText(resume.name) || hasText(resume.role) || contact.length;
  const hasContent = hasHeader || summary || skills.length || experience.length || projects.length || education.length || certifications.length;

  useEffect(() => {
    const element = shellRef.current;
    if (!element || typeof ResizeObserver === "undefined" || typeof window === "undefined") {
      return;
    }

    const updateLayout = () => {
      const width = element.clientWidth;
      const height = element.clientHeight || (mode === "focus" ? window.innerHeight * 0.82 : window.innerHeight * 0.9);
      const shellPadding = mode === "focus" ? 16 : 20;
      const usableWidth = Math.max(width - shellPadding * 2, 320);
      const usableHeight = Math.max(height - shellPadding * 2, mode === "focus" ? 360 : 420);
      const nextViewportHeight = Math.max(usableHeight, mode === "focus" ? 420 : 700);
      const widthScale = usableWidth / A4_WIDTH;
      const heightScale = usableHeight / A4_HEIGHT;
      const fitScale = Math.max(Math.min(widthScale, heightScale), mode === "focus" ? 0.52 : 0.68);
      const zoomedScale = fitScale * zoomLevel;
      const nextScale = Math.max(mode === "focus" ? 0.4 : 0.5, Math.min(zoomedScale, mode === "focus" ? 1.6 : 1.15));

      setViewportHeight(nextViewportHeight);
      setScale(nextScale);
    };

    updateLayout();

    const observer = new ResizeObserver(() => updateLayout());
    observer.observe(element);
    window.addEventListener("resize", updateLayout);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, [mode, zoomLevel]);

  const scaledWidth = A4_WIDTH * scale;
  const scaledHeight = A4_HEIGHT * scale;
  const stagePadding = mode === "focus" ? 16 : 20;
  const stageHeight = Math.max(viewportHeight, scaledHeight + stagePadding * 2);

  return (
    <div id={previewId} ref={shellRef} className="h-full w-full">
      <div className="relative w-full overflow-auto bg-transparent" style={{ height: `${viewportHeight}px`, maxHeight: "100%" }}>
        <div className="flex w-full justify-center" style={{ minHeight: `${stageHeight}px`, padding: `${stagePadding}px` }}>
          <div
            className="shrink-0"
            style={{
              width: `${scaledWidth}px`,
              height: `${scaledHeight}px`,
            }}
          >
            <div
              className="origin-top-left bg-white px-7 py-8 sm:px-10 sm:py-10"
              style={{
                width: `${A4_WIDTH}px`,
                minHeight: `${A4_HEIGHT}px`,
                color: "#334155",
                boxShadow: mode === "focus" ? "0 6px 18px rgba(2, 6, 23, 0.08)" : "0 4px 14px rgba(2, 6, 23, 0.08)",
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              {hasContent ? (
                <div className="space-y-5">
                  {hasHeader ? (
                    <header className="pb-1" style={{ textAlign: "center" }}>
                      {hasText(resume.name) ? (
                        <h1 className="text-[30px] font-bold leading-none tracking-[-0.02em]" style={{ color: "#000000" }}>
                          {resume.name}
                        </h1>
                      ) : null}
                      {hasText(resume.role) ? (
                        <p className="mt-1.5 text-[15px] font-medium leading-6" style={{ color: "#000000" }}>
                          {resume.role}
                        </p>
                      ) : null}
                      {contact.length ? (
                        <p className="mt-2 text-[11.5px] leading-5" style={{ color: "#000000" }}>
                          {contact.join(" | ")}
                        </p>
                      ) : null}
                    </header>
                  ) : null}

                  {summary ? (
                    <Section title="Summary">
                      <p className="text-[11.5px] leading-[1.55]" style={{ color: "#000000" }}>
                        {summary}
                      </p>
                    </Section>
                  ) : null}

                  {skills.length ? (
                    <Section title="Core Skills">
                      <div className="space-y-1">
                        {skills.map((skill) => (
                          <p key={skill} className="text-[11.5px] leading-[1.55]" style={{ color: "#000000" }}>
                            {skill}
                          </p>
                        ))}
                      </div>
                    </Section>
                  ) : null}

                  {experience.length ? (
                    <Section title="Experience">
                      <div className="space-y-4">
                        {experience.map((item) => (
                          <article key={item.id} className="space-y-1.5">
                            <div className="flex items-baseline justify-between gap-4">
                              <div>
                                {item.role ? <h3 className="text-[12.5px] font-semibold leading-[1.35]" style={{ color: "#000000" }}>{item.role}</h3> : null}
                                {item.company ? <p className="text-[11.5px] leading-[1.45]" style={{ color: "#000000" }}>{item.company}</p> : null}
                              </div>
                              {item.startDate || item.endDate ? (
                                <p className="shrink-0 text-[11px] whitespace-nowrap leading-[1.35]" style={{ color: "#000000" }}>
                                  {[item.startDate, item.endDate].filter(Boolean).join(" - ")}
                                </p>
                              ) : null}
                            </div>
                            {item.bullets.length ? (
                              <ul className="space-y-1 pl-4 text-[11.5px] leading-[1.5]" style={{ color: "#000000" }}>
                                {item.bullets.map((bullet, index) => (
                                  <li key={`${item.id}-${index}`} className="list-disc marker:text-black">
                                    {bullet}
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </article>
                        ))}
                      </div>
                    </Section>
                  ) : null}

                  {projects.length ? (
                    <Section title="Projects">
                      <div className="space-y-4">
                        {projects.map((project) => (
                          <article key={project.id} className="space-y-1.5">
                            <div className="flex items-baseline justify-between gap-4">
                              {project.name ? <h3 className="text-[12.5px] font-semibold leading-[1.35]" style={{ color: "#000000" }}>{project.name}</h3> : <span />}
                              {project.link ? (
                                <p className="shrink-0 text-[11px] whitespace-nowrap leading-[1.35]" style={{ color: "#000000" }}>
                                  {project.link}
                                </p>
                              ) : null}
                            </div>
                            {project.description ? <p className="text-[11.5px] leading-[1.5]" style={{ color: "#000000" }}>{project.description}</p> : null}
                            {project.techStack ? <p className="text-[11px] leading-[1.45]" style={{ color: "#000000" }}>Tech Stack: {project.techStack}</p> : null}
                          </article>
                        ))}
                      </div>
                    </Section>
                  ) : null}

                  {education.length ? (
                    <Section title="Education">
                      <div className="space-y-3">
                        {education.map((item) => (
                          <article key={item.id} className="flex items-baseline justify-between gap-4">
                            <div>
                              {item.degree ? <h3 className="text-[12.5px] font-semibold leading-[1.35]" style={{ color: "#000000" }}>{item.degree}</h3> : null}
                              {item.school ? <p className="text-[11.5px] leading-[1.45]" style={{ color: "#000000" }}>{item.school}</p> : null}
                            </div>
                            {item.year ? <p className="shrink-0 text-[11px] whitespace-nowrap leading-[1.35]" style={{ color: "#000000" }}>{item.year}</p> : null}
                          </article>
                        ))}
                      </div>
                    </Section>
                  ) : null}

                  {certifications.length ? (
                    <Section title="Certifications">
                      <ul className="space-y-1 pl-4 text-[11.5px] leading-[1.5]" style={{ color: "#000000" }}>
                        {certifications.map((certification) => (
                          <li key={certification} className="list-disc marker:text-black">{certification}</li>
                        ))}
                      </ul>
                    </Section>
                  ) : null}
                </div>
              ) : (
                <div className="flex h-full min-h-[calc(1123px-80px)] items-center justify-center text-center">
                  <div className="max-w-sm space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: "#000000" }}>
                      Live Preview
                    </p>
                    <p className="text-[15px] leading-7" style={{ color: "#000000" }}>
                      Start filling in your resume details and the document preview will update here in real time.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
