import { redirect } from "next/navigation";

import { SignUpForm } from "@/components/auth-signup-form";
import { auth } from "@/lib/auth";

export default async function SignUpPage() {
  const session = await auth();
  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return <SignUpForm />;
}
