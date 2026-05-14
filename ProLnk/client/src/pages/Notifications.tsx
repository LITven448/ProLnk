import React, { useState } from "react";
import { Link } from "wouter";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import {
  Bell, CheckCircle, DollarSign, Info, Clock, RefreshCw,
  Network, Lightbulb, Zap, ArrowRight, UserPlus, Eye,
  ExternalLink, Star, Trophy, CloudLightning, Briefcase,
  X, CheckCheck, Volume2, VolumeX, Settings,
} from "lucide-react";

type NotifType = "leads" | "commission" | "network" | "system" | "tips" | "review" | "tier" | "storm" | "job";
type FilterKey = "all" | "unread" | NotifType;

interface Notification {
  id: string;
  numId: number;
  type: NotifType;
  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
  pinned?: boolean;
  actionLabel?: string;
  actionHref?: string;
  meta?: string;
  urgent?: boolean;
}

function classifyEvent(eventType: string): NotifType {
  if (eventType.includes("lead") || eventType.includes("match") || eventType.includes("new_lead")) return "leads";
  if (eventType.includes("commission") || eventType.includes("payout") || eventType.includes("earn")) return "commission";
  if (eventType.includes("referral") || eventType.includes("network") || eventType.includes("tier")) return "network";
  if (eventType.includes("review")) return "review";
  if (eventType.includes("storm") || eventType.includes("weather")) return "storm";
  if (eventType.includes("job")) return "job";
  if (eventType.includes("tip") || eventType.includes("suggest")) return "tips";
  return "system";
}

const TYPE_CONFIG: Record<NotifType, {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  label: string;
  actionIcon: React.ReactNode;
}> = {
  leads: {
    icon: <Zap className="w-4 h-4" />,
    iconBg: "rgba(34,197,94,0.15)", iconColor: "#22c55e",
    badgeBg: "rgba(34,197,94,0.1)", badgeText: "#22c55e",
    label: "New Lead", actionIcon: <Eye className="w-3 h-3" />,
  },
  commission: {
    icon: <DollarSign className="w-4 h-4" />,
    iconBg: "rgba(245,230,66,0.15)", iconColor: "#F5E642",
    badgeBg: "rgba(245,230,66,0.1)", badgeText: "#F5E642",
    label: "Commission", actionIcon: <ArrowRight className="w-3 h-3" />,
  },
  review: {
    icon: <Star className="w-4 h-4" />,
    iconBg: "rgba(251,191,36,0.15)", iconColor: "#fbbf24",
    badgeBg: "rgba(251,191,36,0.1)", badgeText: "#fbbf24",
    label: "Review", actionIcon: <Eye className="w-3 h-3" />,
  },
  tier: {
    icon: <Trophy className="w-4 h-4" />,
    iconBg: "rgba(139,92,246,0.15)", iconColor: "#8b5cf6",
    badgeBg: "rgba(139,92,246,0.1)", badgeText: "#8b5cf6",
    label: "Tier Upgrade", actionIcon: <ArrowRight className="w-3 h-3" />,
  },
  storm: {
    icon: <CloudLightning className="w-4 h-4" />,
    iconBg: "rgba(245,158,11,0.15)", iconColor: "#f59e0b",
    badgeBg: "rgba(245,158,11,0.1)", badgeText: "#f59e0b",
    label: "Storm Alert", actionIcon: <ExternalLink className="w-3 h-3" />,
  },
  job: {
    icon: <Briefcase className="w-4 h-4" />,
    iconBg: "rgba(16,185,129,0.15)", iconColor: "#10b981",
    badgeBg: "rgba(16,185,129,0.1)", badgeText: "#10b981",
    label: "Job", actionIcon: <Eye className="w-3 h-3" />,
  },
  network: {
    icon: <Network className="w-4 h-4" />,
    iconBg: "rgba(59,130,246,0.15)", iconColor: "#3b82f6",
    badgeBg: "rgba(59,130,246,0.1)", badgeText: "#3b82f6",
    label: "Network", actionIcon: <UserPlus className="w-3 h-3" />,
  },
  system: {
    icon: <Info className="w-4 h-4" />,
    iconBg: "rgba(107,114,128,0.15)", iconColor: "#9ca3af",
    badgeBg: "rgba(107,114,128,0.1)", badgeText: "#9ca3af",
    label: "System", actionIcon: <ExternalLink className="w-3 h-3" />,
  },
  tips: {
    icon: <Lightbulb className="w-4 h-4" />,
    iconBg: "rgba(245,158,11,0.15)", iconColor: "#f59e0b",
    badgeBg: "rgba(245,158,11,0.1)", badgeText: "#f59e0b",
    label: "Tip", actionIcon: <ArrowRight className="w-3 h-3" />,
  },
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

const TRIAL_END = new Date(Date.now() + 90 * 86400000).toLocaleDateString("en-US", {
  month: "long", day: "numeric", year: "numeric",
});

const STATIC_NOTIFICATIONS: Notification[] = [
  {
    id: "static-storm",
    numId: -10,
    type: "storm",
    title: "Storm Alert — Severe weather near Austin 78701",
    body: "Hail expected tonight. 12 leads auto-queued in your service area. Respond within 2 hours to lock jobs before redistribution.",
    timestamp: new Date(Date.now() - 4 * 60000),
    read: false,
    urgent: true,
    actionLabel: "View Storm Leads",
    actionHref: "/storm-alert",
  },
  {
    id: "static-lead-hvac",
    numId: -5,
    type: "leads",
    title: "New lead available — HVAC replacement (78701)",
    body: "Homeowner needs full AC replacement. Est. $2,400–$3,200. 4 pros notified — respond fast.",
    timestamp: new Date(Date.now() - 12 * 60000),
    read: false,
    urgent: true,
    meta: "$2,400–$3,200 est.",
    actionLabel: "View Lead",
    actionHref: "/leads",
  },
  {
    id: "static-commission",
    numId: -7,
    type: "commission",
    title: "Commission paid — $147.00",
    body: "Your L1 override from Jason K.'s completed roofing job has been credited. Payout processes June 1.",
    timestamp: new Date(Date.now() - 2 * 3600000),
    read: false,
    meta: "$147.00 credited",
    actionLabel: "View Earnings",
    actionHref: "/earnings",
  },
  {
    id: "static-review",
    numId: -8,
    type: "review",
    title: "New 5-star review from David H.",
    body: "\"Marcus was punctual, professional, and explained every step. Highly recommend!\"",
    timestamp: new Date(Date.now() - 5 * 3600000),
    read: false,
    meta: "★★★★★",
    actionLabel: "View Profile",
    actionHref: "/profile",
  },
  {
    id: "static-tier",
    numId: -9,
    type: "tier",
    title: "Tier upgrade earned — Founding Partner",
    body: "You've reached Founding Partner. Commission rate now 25% on direct matches + increased override rates.",
    timestamp: new Date(Date.now() - 24 * 3600000),
    read: false,
    meta: "25% commission rate",
    actionLabel: "View Tier",
    actionHref: "/dashboard",
  },
  {
    id: "static-job",
    numId: -11,
    type: "job",
    title: "Job confirmed — Plumbing #1042 with Maria S.",
    body: "Thursday, May 15 at 10am. Address: 512 Oak St, Austin TX 78702. Homeowner has left gate access instructions.",
    timestamp: new Date(Date.now() - 30 * 3600000),
    read: true,
    actionLabel: "View Job",
    actionHref: "/jobs",
  },
  {
    id: "static-network-join",
    numId: -6,
    type: "network",
    title: "John D. joined your network",
    body: "John signed up as an L1 partner using your referral link. You earn 7% on every job commission he generates — forever.",
    timestamp: new Date(Date.now() - 36 * 3600000),
    read: true,
    meta: "+7% override (L1)",
    actionLabel: "View Network",
    actionHref: "/network",
  },
  {
    id: "static-signature-tip",
    numId: -3,
    type: "tips",
    title: "Tip: Add your referral link to your email signature",
    body: "Every email you send is a passive recruiting moment. Pros who sign up become your L1 network, earning you 7% forever.",
    timestamp: new Date(Date.now() - 2 * 86400000),
    read: true,
    pinned: true,
    actionLabel: "Copy Referral Link",
    actionHref: "/referrals",
  },
  {
    id: "static-welcome",
    numId: -1,
    type: "system",
    title: "Welcome to ProLnk!",
    body: "Your founding partner account is active. Explore your dashboard, log your first job, and start building your network.",
    timestamp: new Date(Date.now() - 3 * 86400000),
    read: true,
    pinned: true,
    actionLabel: "Go to Dashboard",
    actionHref: "/dashboard",
  },
  {
    id: "static-trial",
    numId: -2,
    type: "system",
    title: "Your 90-day free trial starts today",
    body: `Full access to all founding network features. No credit card required until ${TRIAL_END}.`,
    timestamp: new Date(Date.now() - 3 * 86400000 - 60000),
    read: true,
    pinned: true,
  },
];

const FILTER_TABS: { key: FilterKey; label: string; icon?: React.ReactNode }[] = [
  { key: "all",        label: "All" },
  { key: "unread",     label: "Unread" },
  { key: "leads",      label: "Leads",     icon: <Zap className="w-3 h-3" /> },
  { key: "storm",      label: "Storm",     icon: <CloudLightning className="w-3 h-3" /> },
  { key: "commission", label: "Payments",  icon: <DollarSign className="w-3 h-3" /> },
  { key: "review",     label: "Reviews",   icon: <Star className="w-3 h-3" /> },
  { key: "tier",       label: "Tier",      icon: <Trophy className="w-3 h-3" /> },
  { key: "job",        label: "Jobs",      icon: <Briefcase className="w-3 h-3" /> },
  { key: "network",    label: "Network",   icon: <Network className="w-3 h-3" /> },
  { key: "system",     label: "System" },
];

export default function Notifications() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [unreadIds, setUnreadIds] = useState<Set<string>>(new Set());
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [soundEnabled, setSoundEnabled] = useState(true);

  const { data: events, isLoading, refetch } = trpc.activityLog.getRecent.useQuery({ limit: 60 });
  const { data: alerts } = trpc.partnerAlerts.getAlerts.useQuery();

  const dynamicNotifications: Notification[] = [
    ...(alerts ?? []).map((a: any): Notification => ({
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
      .map((e): Notification => ({
        id: `event-${e.id}`,
        numId: e.id,
        type: classifyEvent(e.eventType) as NotifType,
        title: e.eventType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        body: e.description,
        timestamp: new Date(e.createdAt),
        read: readIds.has(`event-${e.id}`),
      })),
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const baseNotifications: Notification[] = [
    ...STATIC_NOTIFICATIONS.map((n) => ({
      ...n,
      read: readIds.has(n.id) ? true : unreadIds.has(n.id) ? false : n.read,
    })),
    ...dynamicNotifications,
  ].filter((n) => !dismissed.has(n.id));

  const markRead = (id: string) => setReadIds((prev) => new Set([...prev, id]));
  const markUnread = (id: string) => {
    setUnreadIds((prev) => new Set([...prev, id]));
    setReadIds((prev) => { const s = new Set(prev); s.delete(id); return s; });
  };
  const dismiss = (id: string) => setDismissed((prev) => new Set([...prev, id]));
  const markAllRead = () => setReadIds(new Set(baseNotifications.map((n) => n.id)));
  const clearAll = () => setDismissed(new Set(baseNotifications.map((n) => n.id)));

  const unreadCount = baseNotifications.filter((n) => !n.read).length;

  const typeCounts: Partial<Record<FilterKey, number>> = {};
  for (const n of baseNotifications) {
    if (!n.read) {
      typeCounts[n.type as FilterKey] = (typeCounts[n.type as FilterKey] ?? 0) + 1;
    }
  }

  const displayed = baseNotifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  const urgentCount = displayed.filter((n) => n.urgent && !n.read).length;

  return (
    <PartnerLayout>
      <div className="space-y-5 max-w-3xl">

        {/* Header */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center relative"
              style={{ background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.2)" }}
            >
              <Bell className="w-5 h-5" style={{ color: "#2dd4bf" }} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Notifications</h1>
              <p className="text-sm text-gray-400">
                {unreadCount > 0 ? `${unreadCount} unread${urgentCount > 0 ? ` · ${urgentCount} urgent` : ""}` : "All caught up"}
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSoundEnabled((p) => !p)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: "rgba(255,255,255,0.06)", color: soundEnabled ? "#2dd4bf" : "#9ca3af", border: "1px solid rgba(255,255,255,0.1)" }}
              title={soundEnabled ? "Mute notification sounds" : "Enable notification sounds"}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              Sound
            </button>
            <Link href="/notification-preferences">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
                style={{ background: "rgba(255,255,255,0.06)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Settings className="w-3.5 h-3.5" /> Settings
              </span>
            </Link>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: "rgba(255,255,255,0.06)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={
                unreadCount > 0
                  ? { background: "rgba(45,212,191,0.1)", color: "#2dd4bf", border: "1px solid rgba(45,212,191,0.25)" }
                  : { background: "rgba(255,255,255,0.03)", color: "#4b5563", border: "1px solid rgba(255,255,255,0.06)", cursor: "default" }
              }
            >
              <CheckCheck className="w-3.5 h-3.5" /> Mark all read
            </button>
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              <X className="w-3.5 h-3.5" /> Clear all
            </button>
          </div>
        </div>

        {/* Urgent banner */}
        {urgentCount > 0 && (
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)" }}
          >
            <CloudLightning size={18} style={{ color: "#f59e0b" }} className="flex-shrink-0" />
            <p className="text-sm font-semibold" style={{ color: "#f59e0b" }}>
              {urgentCount} urgent notification{urgentCount !== 1 ? "s" : ""} require your attention
            </p>
          </div>
        )}

        {/* Filter bar */}
        <div className="flex gap-1.5 flex-wrap">
          {FILTER_TABS.map((f) => {
            const active = filter === f.key;
            const count = f.key === "all"
              ? unreadCount
              : f.key === "unread"
                ? unreadCount
                : typeCounts[f.key as FilterKey] ?? 0;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={
                  active
                    ? { background: "#2dd4bf", color: "#0A1628" }
                    : { background: "rgba(255,255,255,0.06)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)" }
                }
              >
                {f.icon}
                {f.label}
                {count > 0 && (
                  <span
                    className="w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={active ? { background: "#0A1628", color: "#2dd4bf" } : { background: "#ef4444", color: "#fff" }}
                  >
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Unread section */}
        {filter === "all" && unreadCount > 0 && (
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">
            Unread — {unreadCount}
          </p>
        )}

        {/* Notification list */}
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-xl p-4 animate-pulse"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl flex-shrink-0" style={{ background: "rgba(255,255,255,0.08)" }} />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 rounded w-1/3" style={{ background: "rgba(255,255,255,0.08)" }} />
                    <div className="h-3 rounded w-2/3" style={{ background: "rgba(255,255,255,0.05)" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div className="rounded-2xl p-12 text-center"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <Bell className="w-10 h-10 mx-auto mb-3" style={{ color: "rgba(255,255,255,0.12)" }} />
            <p className="text-gray-400 font-medium text-sm mb-1">No notifications</p>
            <p className="text-xs text-gray-600">Activity will appear here as you use the platform.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {displayed.map((n) => {
              const cfg = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.system;
              const isUnread = !n.read;
              return (
                <div
                  key={n.id}
                  className="relative flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all group"
                  onClick={() => isUnread ? markRead(n.id) : undefined}
                  style={{
                    background: isUnread
                      ? n.urgent
                        ? "rgba(245,158,11,0.06)"
                        : "rgba(255,255,255,0.06)"
                      : "rgba(255,255,255,0.025)",
                    border: isUnread
                      ? n.urgent
                        ? "1px solid rgba(245,158,11,0.3)"
                        : "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Unread pip */}
                  {isUnread && (
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                      style={{ background: n.urgent ? "#f59e0b" : "#2dd4bf" }} />
                  )}

                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: cfg.iconBg, color: cfg.iconColor }}
                  >
                    {cfg.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap min-w-0">
                        <p className={`text-sm font-semibold ${isUnread ? "text-white" : "text-gray-400"}`}>
                          {n.title}
                        </p>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{ background: cfg.badgeBg, color: cfg.badgeText }}
                        >
                          {cfg.label}
                        </span>
                        {n.urgent && isUnread && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)" }}>
                            Urgent
                          </span>
                        )}
                        {n.pinned && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{ background: "rgba(45,212,191,0.1)", color: "#2dd4bf" }}>
                            Pinned
                          </span>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                        <Clock className="w-3 h-3" />
                        {timeAgo(n.timestamp)}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed">{n.body}</p>

                    {(n.meta || n.actionLabel) && (
                      <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
                        {n.meta ? (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-lg"
                            style={{ background: cfg.iconBg, color: cfg.iconColor }}>
                            {n.meta}
                          </span>
                        ) : <span />}
                        {n.actionLabel && n.actionHref && (
                          <Link href={n.actionHref}>
                            <span
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                              style={{ background: cfg.iconBg, color: cfg.iconColor, border: `1px solid ${cfg.iconColor}33` }}
                            >
                              {cfg.actionIcon}
                              {n.actionLabel}
                            </span>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Per-item actions (revealed on hover) */}
                  <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    {isUnread ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); markRead(n.id); }}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); markUnread(n.id); }}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                        title="Mark as unread"
                      >
                        <Bell className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                      className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                      title="Dismiss"
                    >
                      <X className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Read section divider */}
        {filter === "all" && displayed.some((n) => n.read) && displayed.some((n) => !n.read) && (
          <div className="flex items-center gap-3 pt-2">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
            <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest">Read</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
