import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const values = signUpSchema.parse(body);

    const existing = await prisma.user.findUnique({ where: { email: values.email } });
    if (existing) {
      return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
    }

    const password = await hash(values.password, 10);

    const user = await prisma.user.create({
      data: {
        name: values.name,
        email: values.email,
        password,
        usage: { create: {} },
      },
    });

    return NextResponse.json({ id: user.id, success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      const issue = error.issues[0];
      return NextResponse.json(
        {
          error: issue?.message ?? "Please check your details and try again.",
          field: issue?.path?.[0] ?? null,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to register account." }, { status: 400 });
  }
}
