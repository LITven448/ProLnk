/**
 * PageLoadingSkeleton — a generic full-page skeleton shown while tRPC queries load.
 * Use inside any page that has isLoading state but no dedicated skeleton yet.
 *
 * Usage:
 *   if (isLoading) return <PageLoadingSkeleton />;
 *   if (isLoading) return <PageLoadingSkeleton rows={8} showHeader />;
 */
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  /** Number of content rows to render (default: 5) */
  rows?: number;
  /** Show a large header skeleton at the top (default: true) */
  showHeader?: boolean;
  /** Show a grid of card skeletons instead of rows (default: false) */
  cards?: boolean;
  /** Number of stat cards at the top (default: 0) */
  statCards?: number;
}

export default function PageLoadingSkeleton({
  rows = 5,
  showHeader = true,
  cards = false,
  statCards = 0,
}: Props) {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Header */}
      {showHeader && (
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
      )}

      {/* Stat cards */}
      {statCards > 0 && (
        <div className={`grid gap-4 grid-cols-2 md:grid-cols-${Math.min(statCards, 4)}`}>
          {Array.from({ length: statCards }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-4 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      )}

      {/* Card grid or row list */}
      {cards ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-4 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-8 w-24 mt-2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-4 flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-3/4" />
              </div>
              <Skeleton className="h-8 w-20 shrink-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
