"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Landmark } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import {
  signupSchema,
  type SignupFormValues,
} from "@/lib/validations/auth";
import { cn } from "@/lib/utils";

function mapAuthError(message: string) {
  if (message.toLowerCase().includes("already registered")) {
    return "An account with this email already exists.";
  }
  return message;
}

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(data: SignupFormValues) {
    setAuthError(null);
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
        },
      },
    });

    if (error) {
      setAuthError(mapAuthError(error.message));
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-10 md:px-16 lg:max-w-lg lg:px-12 xl:px-16">
      <div className="mb-10 flex items-center gap-3 lg:hidden">
        <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted">
          <Landmark className="size-4 text-foreground" strokeWidth={1.5} />
        </div>
        <span className="text-lg font-semibold tracking-tight">
          Financial OS
        </span>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Create account
        </h2>
        <p className="text-sm text-muted-foreground">
          One email address can only be linked to a single account.
        </p>
      </div>

      <form
        className="mt-10 space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first_name">First name</Label>
            <Input
              id="first_name"
              autoComplete="given-name"
              placeholder="First name"
              aria-invalid={!!errors.first_name}
              {...register("first_name")}
            />
            {errors.first_name && (
              <p className="text-xs text-destructive" role="alert">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="last_name">Last name</Label>
            <Input
              id="last_name"
              autoComplete="family-name"
              placeholder="Last name"
              aria-invalid={!!errors.last_name}
              {...register("last_name")}
            />
            {errors.last_name && (
              <p className="text-xs text-destructive" role="alert">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone number"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-destructive" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a password"
              aria-invalid={!!errors.password}
              className={cn("pr-10", errors.password && "border-destructive")}
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm_password">Confirm password</Label>
          <Input
            id="confirm_password"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm your password"
            aria-invalid={!!errors.confirm_password}
            {...register("confirm_password")}
          />
          {errors.confirm_password && (
            <p className="text-xs text-destructive" role="alert">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        {authError && (
          <p className="text-sm text-destructive" role="alert">
            {authError}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="h-11 w-full rounded-md bg-foreground text-sm font-semibold uppercase tracking-wide text-background hover:bg-foreground/90"
        >
          Create account
        </Button>
      </form>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
