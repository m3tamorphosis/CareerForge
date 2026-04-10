import type { ResumeFormValues, ResumeProjectItem, ResumeSkillGroup } from "@/types";

type ResumePDFData = {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  github?: string;
  linkedin?: string;
  summary: string;
  skills: string[];
  skillGroups: ResumeSkillGroup[];
  experience: ResumeFormValues["experience"];
  projects: ResumeProjectItem[];
  education: ResumeFormValues["education"];
  certifications: string[];
  references: string[];
};

export function normalizeResumeForPDF(values: ResumeFormValues): ResumePDFData {
  const extra = values as ResumeFormValues & {
    projects?: ResumeProjectItem[];
    certifications?: string[];
    references?: string[];
    skillGroups?: ResumeSkillGroup[];
  };

  return {
    name: values.personal.fullName,
    role: values.personal.role,
    email: values.personal.email,
    phone: values.personal.phone,
    location: values.personal.location,
    website: values.personal.website || undefined,
    github: values.personal.github || undefined,
    linkedin: values.personal.linkedin || undefined,
    summary: values.summary,
    skills: values.skills.map((skill) => skill.trim()).filter(Boolean),
    skillGroups: extra.skillGroups ?? [],
    experience: values.experience,
    projects: extra.projects ?? [],
    education: values.education,
    certifications: extra.certifications ?? [],
    references: extra.references ?? [],
  };
}
