"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { TopHeader } from "@/components/layout/top-header";
import { useUIStore } from "@/store/ui-store";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <div className="flex min-h-svh bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopHeader onMenuClick={toggleSidebar} />
        <main className="flex-1 space-y-6 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
