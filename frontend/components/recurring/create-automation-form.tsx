import { Plus, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RECURRING_CATEGORIES,
  RECURRING_FREQUENCIES,
} from "@/lib/constants/recurring-mock";
import { cn } from "@/lib/utils";

const selectClassName = cn(
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
);

export function CreateAutomationForm() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Plus className="size-4" />
          Create Automation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              $
            </span>
            <Input id="amount" className="pl-7" placeholder="0.00" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="merchant">Merchant</Label>
          <Input id="merchant" placeholder="e.g. Netflix" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select id="category" className={selectClassName} defaultValue="">
            <option value="" disabled>
              Select category...
            </option>
            {RECURRING_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <select id="frequency" className={selectClassName} defaultValue="Monthly">
            {RECURRING_FREQUENCIES.map((frequency) => (
              <option key={frequency} value={frequency}>
                {frequency}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>Date Range</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-xs text-muted-foreground">
                Start Date
              </Label>
              <Input id="start-date" type="date" defaultValue="2023-05-29" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-xs text-muted-foreground">
                End Date
              </Label>
              <Input id="end-date" type="date" defaultValue="2023-05-29" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="indefinite" />
          <Label htmlFor="indefinite" className="cursor-pointer font-normal text-muted-foreground">
            Runs indefinitely
          </Label>
        </div>

        <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
          <Save className="size-4" />
          Save Automation
        </Button>
      </CardContent>
    </Card>
  );
}
