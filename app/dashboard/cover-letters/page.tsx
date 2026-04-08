import { CoverLetterStudio } from "@/components/dashboard/cover-letter-studio";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/data";

export default async function CoverLettersPage() {
  const user = await requireUser();
  const coverLetters = await prisma.coverLetter.findMany({ where: { userId: user.id }, orderBy: { updatedAt: "desc" } });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-accent">Cover letter generator</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Generate tailored drafts in minutes</h1>
      </div>
      <CoverLetterStudio initialLetters={coverLetters} />
    </div>
  );
}
