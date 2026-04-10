import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { DashboardStats, ResumeFormValues, ResumeProjectItem } from "@/types";

export async function requireUser() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  return session.user;
}

export async function getDashboardData(userId: string) {
  const [resumes, coverLetters, applications, usage, resumeCount, coverLetterCount, activeApplicationsCount, interviewsCount] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 4,
    }),
    prisma.coverLetter.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 3,
    }),
    prisma.jobApplication.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.userUsage.findUnique({ where: { userId } }),
    prisma.resume.count({ where: { userId } }),
    prisma.coverLetter.count({ where: { userId } }),
    prisma.jobApplication.count({ where: { userId, status: { not: "REJECTED" } } }),
    prisma.jobApplication.count({ where: { userId, status: "INTERVIEW" } }),
  ]);

  const stats: DashboardStats = {
    resumes: resumeCount,
    coverLetters: coverLetterCount,
    activeApplications: activeApplicationsCount,
    interviews: interviewsCount,
  };

  return { resumes, coverLetters, applications, usage, stats };
}

export async function getResumeById(userId: string, id: string) {
  return prisma.resume.findFirst({
    where: { userId, id },
  });
}

type StoredSkillsPayload =
  | string[]
  | {
      items?: string[];
      projects?: ResumeProjectItem[];
      certifications?: string[];
      references?: string[];
    };

export function parseResume(record: {
  title: string;
  summary: string;
  personal: unknown;
  experience: unknown;
  education: unknown;
  skills: unknown;
}): ResumeFormValues {
  const skillsPayload = record.skills as StoredSkillsPayload;
  const isLegacySkillsArray = Array.isArray(skillsPayload);

  return {
    title: record.title,
    summary: record.summary,
    personal: record.personal as ResumeFormValues["personal"],
    experience: record.experience as ResumeFormValues["experience"],
    education: record.education as ResumeFormValues["education"],
    skills: isLegacySkillsArray ? skillsPayload : skillsPayload?.items ?? [],
    projects: isLegacySkillsArray ? [] : skillsPayload?.projects ?? [],
    certifications: isLegacySkillsArray ? [] : skillsPayload?.certifications ?? [],
    references: isLegacySkillsArray ? [] : skillsPayload?.references ?? [],
  };
}