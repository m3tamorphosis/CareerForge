import type { ResumeFormValues } from "@/types";
import { normalizeResumeForPDF } from "@/lib/resume-pdf";

type ResumePDFProps = {
  values: ResumeFormValues;
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="resume-pdf-section">
      <div className="resume-pdf-section-heading">{title}</div>
      <div className="resume-pdf-section-rule" />
      <div className="resume-pdf-section-body">{children}</div>
    </section>
  );
}

export function ResumePDF({ values }: ResumePDFProps) {
  const resume = normalizeResumeForPDF(values);
  const contact = [resume.email, resume.phone, resume.location, resume.website, resume.github, resume.linkedin].filter(Boolean);

  return (
    <div className="resume-pdf-shell">
      <article className="resume-pdf-page">
        <header className="resume-pdf-header" style={{ textAlign: "center" }}>
          <h1 className="resume-pdf-name">{resume.name}</h1>
          <p className="resume-pdf-role">{resume.role}</p>
          {contact.length ? <p className="resume-pdf-contact">{contact.join(" | ")}</p> : null}
        </header>

        <Section title="Summary">
          <p className="resume-pdf-summary">{resume.summary}</p>
        </Section>

        {resume.skillGroups.length ? (
          <Section title="Technical Skills">
            <div className="resume-pdf-skill-groups">
              {resume.skillGroups.map((group) => (
                <p key={group.category} className="resume-pdf-skill-line">
                  <span className="resume-pdf-skill-label">{group.category}:</span>
                  <span className="resume-pdf-skill-value">{group.items.join(", ")}</span>
                </p>
              ))}
            </div>
          </Section>
        ) : null}

        {resume.experience.length ? (
          <Section title="Experience">
            <div className="resume-pdf-stack">
              {resume.experience.map((item) => (
                <article key={item.id} className="resume-pdf-entry resume-pdf-avoid-break">
                  <div className="resume-pdf-entry-top">
                    <div className="resume-pdf-entry-main">
                      <h3 className="resume-pdf-entry-title">{item.role}</h3>
                      <p className="resume-pdf-entry-company">{item.company}</p>
                    </div>
                    <p className="resume-pdf-entry-date">{item.startDate} - {item.endDate}</p>
                  </div>
                  <ul className="resume-pdf-bullets">
                    {item.bullets.map((bullet, index) => (
                      <li key={`${item.id}-${index}`}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Section>
        ) : null}

        {resume.projects.length ? (
          <Section title="Projects">
            <div className="resume-pdf-stack">
              {resume.projects.map((project) => (
                <article key={project.id} className="resume-pdf-entry resume-pdf-avoid-break">
                  <div className="resume-pdf-entry-top">
                    <div className="resume-pdf-entry-main">
                      <h3 className="resume-pdf-entry-title">{project.name}</h3>
                      <p className="resume-pdf-project-description">{project.description}</p>
                    </div>
                    {project.link ? <p className="resume-pdf-entry-date">{project.link}</p> : null}
                  </div>
                  <p className="resume-pdf-project-stack">Tech Stack: {project.techStack}</p>
                </article>
              ))}
            </div>
          </Section>
        ) : null}

        {resume.education.length ? (
          <Section title="Education">
            <div className="resume-pdf-stack">
              {resume.education.map((item) => (
                <article key={item.id} className="resume-pdf-entry resume-pdf-avoid-break">
                  <div className="resume-pdf-entry-top">
                    <div className="resume-pdf-entry-main">
                      <h3 className="resume-pdf-entry-title">{item.degree}</h3>
                      <p className="resume-pdf-entry-company">{item.school}</p>
                    </div>
                    <p className="resume-pdf-entry-date">{item.year}</p>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        ) : null}

        {resume.certifications.length ? (
          <Section title="Certifications">
            <ul className="resume-pdf-bullets resume-pdf-certifications">
              {resume.certifications.map((certification) => (
                <li key={certification}>{certification}</li>
              ))}
            </ul>
          </Section>
        ) : null}
      </article>
    </div>
  );
}


