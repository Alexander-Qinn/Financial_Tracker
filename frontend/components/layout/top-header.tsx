"use client";

import { Bell, CircleHelp, Menu, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TopHeaderProps = {
  onMenuClick: () => void;
};

export function TopHeader({ onMenuClick }: TopHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </Button>

      <div className="relative max-w-xl flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="h-10 pl-9"
          placeholder="Search commands, entities, or amounts"
          aria-label="Search commands, entities, or amounts"
        />
      </div>

      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <span className="relative">
            <Bell className="size-4" />
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-destructive" />
          </span>
        </Button>
        <Button variant="ghost" size="icon" aria-label="Help">
          <CircleHelp className="size-4" />
        </Button>
        <Avatar className="size-8">
          <AvatarFallback className="bg-muted text-xs font-medium">U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
