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
  skillGroups: ResumeSkillGroup[];
  experience: ResumeFormValues["experience"];
  projects: ResumeProjectItem[];
  education: ResumeFormValues["education"];
  certifications: string[];
};

function pickSkillCategory(skill: string) {
  const value = skill.toLowerCase();

  if (/(javascript|typescript|python|java|go|rust|php|ruby|c\+\+|c#|sql)/.test(value)) return "Languages";
  if (/(react|next|tailwind|css|html|frontend|figma|redux|vue|svelte)/.test(value)) return "Frontend";
  if (/(node|express|backend|graphql|rest|api|server|auth)/.test(value)) return "Backend";
  if (/(postgres|mysql|mongodb|prisma|database|supabase|firebase|redis)/.test(value)) return "Databases";
  if (/(openai|gemini|rag|embedding|vector|llm|ai|ml)/.test(value)) return "AI/ML";
  return "Tools";
}

function groupSkills(skills: string[]) {
  const bucketOrder = ["Languages", "Frontend", "Backend", "Databases", "AI/ML", "Tools"];
  const buckets = new Map<string, string[]>();

  for (const skill of skills) {
    const category = pickSkillCategory(skill);
    const current = buckets.get(category) ?? [];
    current.push(skill);
    buckets.set(category, current);
  }

  return bucketOrder
    .filter((category) => buckets.has(category))
    .map((category) => ({ category, items: buckets.get(category) ?? [] }));
}

export function normalizeResumeForPDF(values: ResumeFormValues): ResumePDFData {
  const extra = values as ResumeFormValues & {
    projects?: ResumeProjectItem[];
    certifications?: string[];
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
    skillGroups: extra.skillGroups?.length ? extra.skillGroups : groupSkills(values.skills),
    experience: values.experience,
    projects: extra.projects ?? [],
    education: values.education,
    certifications: extra.certifications ?? [],
  };
}
