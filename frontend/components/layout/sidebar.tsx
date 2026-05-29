"use client";

import { Landmark, X } from "lucide-react";

import { SidebarNavItem } from "@/components/layout/sidebar-nav-item";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 lg:hidden",
          open ? "block" : "hidden",
        )}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-border bg-background transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Landmark className="size-4" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">Financial OS</p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Premium Financial Management
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X className="size-4" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem key={item.href} item={item} onNavigate={onClose} />
          ))}
        </nav>
      </aside>
    </>
  );
}
