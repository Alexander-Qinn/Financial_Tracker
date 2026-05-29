import { AuthBrandPanel } from "@/components/auth/auth-brand-panel";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh">
      <AuthBrandPanel />
      <div className="flex flex-1 flex-col bg-background">{children}</div>
    </div>
  );
}
