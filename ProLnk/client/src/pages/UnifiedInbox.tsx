/**
 * Unified Inbox — /dashboard/inbox
 * Aggregates all partner notifications: new leads, commission updates,
 * broadcast messages, system alerts, and dispute updates in one feed.
 */
import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell, DollarSign, Zap, AlertTriangle, MessageSquare,
  CheckCircle2, Clock, Search, Filter, RefreshCw, Inbox,
  TrendingUp, Shield, Star
} from "lucide-react";
import { Link } from "wouter";

type MessageType = "lead" | "commission" | "broadcast" | "system" | "dispute" | "achievement" | "review";

interface InboxItem {
  id: string;
  type: MessageType;
  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  priority: "high" | "normal" | "low";
}

const TYPE_CONFIG: Record<MessageType, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  lead:        { icon: Zap,          color: "#F59E0B", bg: "#FEF3C7", label: "New Lead" },
  commission:  { icon: DollarSign,   color: "#10B981", bg: "#D1FAE5", label: "Commission" },
  broadcast:   { icon: MessageSquare,color: "#6366F1", bg: "#EDE9FE", label: "Broadcast" },
  system:      { icon: Bell,         color: "#64748B", bg: "#F1F5F9", label: "System" },
  dispute:     { icon: AlertTriangle,color: "#EF4444", bg: "#FEE2E2", label: "Dispute" },
  achievement: { icon: Star,         color: "#8B5CF6", bg: "#EDE9FE", label: "Achievement" },
  review:      { icon: Shield,       color: "#0EA5E9", bg: "#E0F2FE", label: "Review" },
};

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function UnifiedInbox() {
  const [filter, setFilter] = useState<MessageType | "all">("all");
  const [search, setSearch] = useState("");
  const [readFilter, setReadFilter] = useState<"all" | "unread">("all");

  // Fetch real notifications from DB
  const { data: notifications, isLoading, refetch } = trpc.notifications.getMyNotifications.useQuery({ limit: 100 });
  const markAllRead = trpc.notifications.markAllRead.useMutation({ onSuccess: () => refetch() });
  const markRead = trpc.notifications.markRead.useMutation({ onSuccess: () => refetch() });

  // Transform DB notifications into InboxItem format
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawItems: InboxItem[] = (notifications ?? []).map((n: any) => {
    let meta: Record<string, string> = {};
    try { meta = JSON.parse(n.metadata ?? "{}"); } catch { /* ignore */ }

    const typeMap: Record<string, MessageType> = {
      lead: "lead", commission: "commission", broadcast: "broadcast",
      system: "system", dispute: "dispute", achievement: "achievement", review: "review",
    };

    return {
      id: String(n.id),
      type: (typeMap[n.type] ?? "system") as MessageType,
      title: n.title,
      body: n.message,
      timestamp: new Date(n.createdAt),
      read: n.isRead,
      actionUrl: meta.actionUrl,
      actionLabel: meta.actionLabel,
      priority: (meta.priority ?? "normal") as "high" | "normal" | "low",
    };
  });

  // Apply filters
  const filtered = rawItems.filter(item => {
    if (filter !== "all" && item.type !== filter) return false;
    if (readFilter === "unread" && item.read) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase()) &&
        !item.body.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const unreadCount = rawItems.filter(i => !i.read).length;

  return (
    <PartnerLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Inbox className="w-6 h-6 text-blue-600" />
              Inbox
              {unreadCount > 0 && (
                <Badge className="bg-blue-600 text-white text-xs">{unreadCount}</Badge>
              )}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">All your leads, commissions, and updates in one place</p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => markAllRead.mutate()}
                className="text-xs"
              >
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Mark all read
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              <RefreshCw className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search messages..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={readFilter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setReadFilter(prev => prev === "unread" ? "all" : "unread")}
              className="text-xs"
            >
              <Filter className="w-3 h-3 mr-1" />
              Unread only
            </Button>
          </div>
        </div>

        {/* Type tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {(["all", "lead", "commission", "broadcast", "system", "dispute", "achievement", "review"] as const).map(t => {
            const cfg = t === "all" ? null : TYPE_CONFIG[t];
            const count = t === "all" ? rawItems.length : rawItems.filter(i => i.type === t).length;
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  filter === t
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
              >
                {t === "all" ? "All" : cfg?.label} {count > 0 && <span className="ml-1 opacity-70">({count})</span>}
              </button>
            );
          })}
        </div>

        {/* Message list */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">
              {rawItems.length === 0 ? "Your inbox is empty" : "No messages match your filters"}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {rawItems.length === 0
                ? "New leads, commissions, and updates will appear here"
                : "Try adjusting your search or filter"}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(item => {
              const cfg = TYPE_CONFIG[item.type];
              const Icon = cfg.icon;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border transition-all hover:shadow-sm cursor-pointer ${
                    !item.read ? "border-blue-100 shadow-sm" : "border-gray-100"
                  }`}
                  onClick={() => !item.read && markRead.mutate({ ids: [Number(item.id)] })}
                >
                  <div className="p-4 flex gap-3">
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: cfg.bg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: cfg.color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-semibold ${!item.read ? "text-gray-900" : "text-gray-700"}`}>
                            {item.title}
                          </span>
                          {item.priority === "high" && (
                            <span className="text-[10px] font-bold uppercase tracking-wide text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                              Urgent
                            </span>
                          )}
                          {!item.read && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                          )}
                        </div>
                        <span className="text-xs text-gray-400 flex-shrink-0 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {timeAgo(item.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{item.body}</p>
                      {item.actionUrl && (
                        <Link href={item.actionUrl}>
                          <Button variant="outline" size="sm" className="mt-2 text-xs h-7">
                            {item.actionLabel ?? "View"}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats footer */}
        {rawItems.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex gap-6 text-center">
              <div className="flex-1">
                <p className="text-lg font-bold text-gray-900">{rawItems.length}</p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-blue-600">{unreadCount}</p>
                <p className="text-xs text-gray-500">Unread</p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-green-600">
                  {rawItems.filter(i => i.type === "commission").length}
                </p>
                <p className="text-xs text-gray-500">Commissions</p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-amber-600">
                  {rawItems.filter(i => i.type === "lead").length}
                </p>
                <p className="text-xs text-gray-500">Leads</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
