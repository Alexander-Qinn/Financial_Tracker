import { Landmark } from "lucide-react";

export function AuthBrandPanel() {
  return (
    <div className="relative hidden min-h-svh flex-col justify-center overflow-hidden bg-[#0a1628] px-12 py-16 lg:flex lg:w-1/2 lg:px-16 xl:px-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center_left,rgba(30,58,95,0.5)_0%,transparent_70%)]"
        aria-hidden
      />

      <div className="relative z-10 max-w-md space-y-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
            <Landmark className="size-5 text-white" strokeWidth={1.5} />
          </div>
          <span className="text-xl font-semibold tracking-tight text-white">
            Financial OS
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white xl:text-4xl">
            Precision in every transaction.
          </h1>
          <p className="text-base leading-relaxed text-slate-400">
            The analytical financial operating system designed for clarity,
            trust, and high-density data management.
          </p>
        </div>
      </div>
    </div>
  );
}
