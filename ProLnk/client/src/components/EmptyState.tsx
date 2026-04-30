/**
 * EmptyState — a consistent empty state component for all pages.
 * Shows an icon, title, description, and optional CTA button.
 *
 * Usage:
 *   <EmptyState icon={Briefcase} title="No jobs yet" description="Jobs you log will appear here." />
 *   <EmptyState icon={Star} title="No reviews" description="Reviews from homeowners will appear here."
 *     action={{ label: "Request a Review", onClick: () => navigate("/dashboard/reviews") }} />
 */
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary";
  };
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  size = "md",
}: EmptyStateProps) {
  const iconSize = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-16 h-16" : "w-12 h-12";
  const titleSize = size === "sm" ? "text-sm font-semibold" : size === "lg" ? "text-xl font-bold" : "text-base font-semibold";
  const padding = size === "sm" ? "py-8" : size === "lg" ? "py-20" : "py-12";

  return (
    <div className={cn("flex flex-col items-center justify-center text-center", padding, className)}>
      <div className="rounded-full bg-muted p-4 mb-4">
        <Icon className={cn(iconSize, "text-muted-foreground")} />
      </div>
      <p className={cn(titleSize, "text-foreground mb-1")}>{title}</p>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mt-1">{description}</p>
      )}
      {action && (
        <Button
          variant={action.variant ?? "default"}
          className="mt-4"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
