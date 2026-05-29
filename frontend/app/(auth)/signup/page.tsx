import type { Metadata } from "next";

import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create account — Financial OS",
  description: "Create your Financial OS account",
};

export default function SignupPage() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <SignupForm />
    </main>
  );
}
