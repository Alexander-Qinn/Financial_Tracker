import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forgot password — Financial OS",
  description: "Reset your Financial OS password",
};

export default function ForgotPasswordPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Password reset
        </h1>
        <p className="text-sm text-muted-foreground">
          Password reset is not implemented yet. This page is a placeholder for
          a future release.
        </p>
        <Link
          href="/login"
          className="inline-block text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Back to sign in
        </Link>
      </div>
    </main>
  );
}
