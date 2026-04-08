export type ResumePersonal = {
  fullName: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  website: string;
};

export type ResumeExperienceItem = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  bullets: string[];
};

export type ResumeEducationItem = {
  id: string;
  school: string;
  degree: string;
  year: string;
};

export type ResumeFormValues = {
  title: string;
  summary: string;
  personal: ResumePersonal;
  experience: ResumeExperienceItem[];
  education: ResumeEducationItem[];
  skills: string[];
};

export type DashboardStats = {
  resumes: number;
  coverLetters: number;
  activeApplications: number;
  interviews: number;
};
