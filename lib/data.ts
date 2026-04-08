import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { DashboardStats, ResumeFormValues } from "@/types";

export async function requireUser() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  return session.user;
}

export async function getDashboardData(userId: string) {
  const [resumes, coverLetters, applications, usage] = await Promise.all([
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
  ]);

  const stats: DashboardStats = {
    resumes: resumes.length,
    coverLetters: coverLetters.length,
    activeApplications: applications.filter((item) => item.status !== "REJECTED").length,
    interviews: applications.filter((item) => item.status === "INTERVIEW").length,
  };

  return { resumes, coverLetters, applications, usage, stats };
}

export async function getResumeById(userId: string, id: string) {
  return prisma.resume.findFirst({
    where: { userId, id },
  });
}

export function parseResume(record: {
  title: string;
  summary: string;
  personal: unknown;
  experience: unknown;
  education: unknown;
  skills: unknown;
}): ResumeFormValues {
  return {
    title: record.title,
    summary: record.summary,
    personal: record.personal as ResumeFormValues["personal"],
    experience: record.experience as ResumeFormValues["experience"],
    education: record.education as ResumeFormValues["education"],
    skills: record.skills as ResumeFormValues["skills"],
  };
}
