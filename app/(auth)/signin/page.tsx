import { redirect } from "next/navigation";

import { SignInForm } from "@/components/auth-signin-form";
import { auth } from "@/lib/auth";

export default async function SignInPage() {
  const session = await auth();
  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return <SignInForm />;
}
