"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/constants/navigation";

type SidebarNavItemProps = {
  item: NavItem;
  onNavigate?: () => void;
};

export function SidebarNavItem({ item, onNavigate }: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      <Icon className="size-4 shrink-0" strokeWidth={1.75} />
      <span>{item.label}</span>
      {isActive ? (
        <span
          className="absolute inset-y-2 right-0 w-0.5 rounded-full bg-primary"
          aria-hidden
        />
      ) : null}
    </Link>
  );
}
