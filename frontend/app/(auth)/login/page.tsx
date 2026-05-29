import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in — Financial OS",
  description: "Sign in to your Financial OS account",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <LoginForm />
    </main>
  );
}
