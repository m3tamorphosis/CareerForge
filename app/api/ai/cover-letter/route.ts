import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { generateText } from "@/lib/gemini";
import { coverLetterSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const values = coverLetterSchema.parse(body);

    const prompt = `Write a polished, tailored cover letter for the following job application.
Role: ${values.role}
Company: ${values.company}
Tone: ${values.tone}
Job Description:
${values.jobDescription}

Requirements:
- Keep it to 3 short paragraphs.
- Make it credible, specific, and modern.
- Include a clear value proposition.
- Do not use generic filler.
- Return only the cover letter text.`;

    const content = await generateText(prompt);
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to generate cover letter." }, { status: 400 });
  }
}
