import React, { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Bell, CheckCircle, DollarSign, Send, Zap, Star, Info, Clock, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type NotifType = "lead" | "commission" | "tier" | "system" | "referral" | "alert";

function classifyEvent(eventType: string): NotifType {
  if (eventType.includes("lead") || eventType.includes("opportunity") || eventType.includes("inbound")) return "lead";
  if (eventType.includes("commission") || eventType.includes("payout") || eventType.includes("earn")) return "commission";
  if (eventType.includes("tier") || eventType.includes("upgrade") || eventType.includes("badge")) return "tier";
  if (eventType.includes("referral") || eventType.includes("refer")) return "referral";
  if (eventType.includes("alert") || eventType.includes("warn")) return "alert";
  return "system";
}

const TYPE_CONFIG: Record<NotifType, { icon: React.ReactNode; bg: string; text: string; label: string }> = {
  lead:       { icon: <Zap className="w-4 h-4" />,          bg: "bg-purple-50",  text: "text-purple-600", label: "Lead" },
  commission: { icon: <DollarSign className="w-4 h-4" />,   bg: "bg-green-50",   text: "text-green-600",  label: "Commission" },
  referral:   { icon: <Send className="w-4 h-4" />,         bg: "bg-blue-50",    text: "text-blue-600",   label: "Referral" },
  tier:       { icon: <Star className="w-4 h-4" />,         bg: "bg-yellow-50",  text: "text-yellow-600", label: "Tier" },
  alert:      { icon: <Zap className="w-4 h-4" />,          bg: "bg-orange-50",  text: "text-orange-600", label: "Alert" },
  system:     { icon: <Info className="w-4 h-4" />,         bg: "bg-gray-50",    text: "text-gray-500",   label: "System" },
};

function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function Notifications() {
  const [filter, setFilter] = useState<"all" | "unread" | NotifType>("all");
  const [readIds, setReadIds] = useState<Set<number>>(new Set());

  const { data: events, isLoading, refetch } = trpc.activityLog.getRecent.useQuery({ limit: 60 });
  const { data: alerts } = trpc.partnerAlerts.getAlerts.useQuery();

  // Build unified notification list from real DB sources
  const notifications = [
    ...(alerts ?? []).map((a: any) => ({
      id: `alert-${a.id}`,
      numId: a.id,
      type: classifyEvent(a.alertType) as NotifType,
      title: a.title,
      body: a.message,
      timestamp: new Date(a.createdAt),
      read: a.isRead === 1,
    })),
    ...(events ?? [])
      .filter((e) => e.actorRole === "system" || e.actorRole === "admin")
      .slice(0, 30)
      .map((e) => ({
        id: `event-${e.id}`,
        numId: e.id,
        type: classifyEvent(e.eventType) as NotifType,
        title: e.eventType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        body: e.description,
        timestamp: new Date(e.createdAt),
        read: readIds.has(e.id),
      })),
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const markAllRead = () => {
    const allEventIds = (events ?? []).map((e) => e.id);
    setReadIds(new Set(allEventIds));
  };

  const markRead = (numId: number, id: string) => {
    if (id.startsWith("event-")) {
      setReadIds((prev) => new Set(Array.from(prev).concat(numId)));
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const FILTER_TABS: { key: "all" | "unread" | NotifType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "lead", label: "Leads" },
    { key: "commission", label: "Commissions" },
    { key: "referral", label: "Referrals" },
    { key: "system", label: "System" },
  ];

  const displayed = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  return (
    <PartnerLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5E642]/10 flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-[#0A1628]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-500">{unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </Button>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllRead} className="gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> Mark all read
              </Button>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {FILTER_TABS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === f.key
                  ? "bg-[#0A1628] text-white shadow-sm"
                  : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {f.label}
              {f.key === "unread" && unreadCount > 0 && ` (${unreadCount})`}
            </button>
          ))}
        </div>

        {/* Notification list */}
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-gray-100 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-1/3" />
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Bell className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No notifications</p>
            <p className="text-sm text-gray-400 mt-1">
              {filter === "unread" ? "You're all caught up!" : "Activity will appear here as you use the platform"}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {displayed.map((n) => {
              const style = TYPE_CONFIG[n.type as NotifType] ?? TYPE_CONFIG.system;
              return (
                <div
                  key={n.id}
                  onClick={() => markRead(n.numId, n.id)}
                  className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    n.read
                      ? "bg-white border-gray-100 hover:border-gray-200"
                      : "bg-[#F5E642]/10/40 border-[#0A1628]/20 hover:border-[#0A1628]/30"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${style.bg} ${style.text}`}>
                    {style.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`text-sm font-semibold ${n.read ? "text-gray-700" : "text-gray-900"}`}>
                          {n.title}
                          {!n.read && <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[#0A1628] align-middle" />}
                        </p>
                        <Badge variant="outline" className="text-xs">{style.label}</Badge>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                        <Clock className="w-3 h-3" />
                        {timeAgo(n.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
