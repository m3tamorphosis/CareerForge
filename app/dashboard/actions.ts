"use server";

import { ApplicationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { coverLetterSchema, jobApplicationSchema, resumeSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";

async function getActionUserId() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session.user.id;
}

async function ensureUsage(userId: string) {
  return prisma.userUsage.upsert({
    where: { userId },
    update: { lastActiveAt: new Date() },
    create: { userId },
  });
}

export async function saveResumeAction(input: { id?: string; values: unknown }) {
  const userId = await getActionUserId();
  const values = resumeSchema.parse(input.values);
  const slugBase = slugify(values.title);
  const slug = input.id ? slugBase : `${slugBase}-${Date.now()}`;

  const resume = input.id
    ? await prisma.resume.update({
        where: { id: input.id },
        data: {
          title: values.title,
          slug,
          summary: values.summary,
          personal: values.personal,
          experience: values.experience,
          education: values.education,
          skills: values.skills,
        },
      })
    : await prisma.resume.create({
        data: {
          title: values.title,
          slug,
          summary: values.summary,
          personal: values.personal,
          experience: values.experience,
          education: values.education,
          skills: values.skills,
          userId,
        },
      });

  await ensureUsage(userId);
  if (!input.id) {
    await prisma.userUsage.update({ where: { userId }, data: { resumesCreated: { increment: 1 } } });
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/resumes");
  revalidatePath(`/dashboard/resumes/${resume.id}`);
  return { success: true, id: resume.id };
}

export async function deleteResumeAction(id: string) {
  const userId = await getActionUserId();
  await prisma.resume.deleteMany({ where: { id, userId } });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/resumes");
  return { success: true };
}

export async function saveCoverLetterAction(input: { id?: string; values: unknown; content: string }) {
  const userId = await getActionUserId();
  const values = coverLetterSchema.parse(input.values);

  const coverLetter = input.id
    ? await prisma.coverLetter.update({
        where: { id: input.id },
        data: {
          role: values.role,
          company: values.company,
          tone: values.tone,
          jobDetails: values.jobDescription,
          content: input.content,
        },
      })
    : await prisma.coverLetter.create({
        data: {
          role: values.role,
          company: values.company,
          tone: values.tone,
          jobDetails: values.jobDescription,
          content: input.content,
          userId,
        },
      });

  await ensureUsage(userId);
  if (!input.id) {
    await prisma.userUsage.update({ where: { userId }, data: { coverLettersCreated: { increment: 1 } } });
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/cover-letters");
  return { success: true, id: coverLetter.id };
}

export async function saveJobApplicationAction(input: { id?: string; values: unknown }) {
  const userId = await getActionUserId();
  const values = jobApplicationSchema.parse(input.values);

  await prisma.jobApplication.upsert({
    where: {
      id: input.id ?? "",
    },
    update: {
      company: values.company,
      role: values.role,
      status: values.status as ApplicationStatus,
      appliedDate: values.appliedDate ? new Date(values.appliedDate) : null,
      link: values.link || null,
      notes: values.notes || null,
    },
    create: {
      company: values.company,
      role: values.role,
      status: values.status as ApplicationStatus,
      appliedDate: values.appliedDate ? new Date(values.appliedDate) : null,
      link: values.link || null,
      notes: values.notes || null,
      userId,
    },
  }).catch(async () => {
    await prisma.jobApplication.create({
      data: {
        company: values.company,
        role: values.role,
        status: values.status as ApplicationStatus,
        appliedDate: values.appliedDate ? new Date(values.appliedDate) : null,
        link: values.link || null,
        notes: values.notes || null,
        userId,
      },
    });
  });

  await ensureUsage(userId);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/job-tracker");
  return { success: true };
}

export async function deleteJobApplicationAction(id: string) {
  const userId = await getActionUserId();
  await prisma.jobApplication.deleteMany({ where: { id, userId } });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/job-tracker");
  return { success: true };
}
