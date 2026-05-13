import React, { useState } from "react";
import { Link } from "wouter";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import {
  Bell, CheckCircle, DollarSign, Info,
  Clock, RefreshCw, Network, Lightbulb, PartyPopper, Zap,
  ArrowRight, UserPlus, Eye, ExternalLink,
} from "lucide-react";

type NotifType = "leads" | "commission" | "network" | "system" | "tips";
type FilterKey = "all" | NotifType;

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
}

function classifyEvent(eventType: string): NotifType {
  if (eventType.includes("lead") || eventType.includes("match") || eventType.includes("referral_lead") || eventType.includes("new_lead")) return "leads";
  if (eventType.includes("commission") || eventType.includes("payout") || eventType.includes("earn")) return "commission";
  if (eventType.includes("referral") || eventType.includes("refer") || eventType.includes("network") || eventType.includes("tier")) return "network";
  if (eventType.includes("tip") || eventType.includes("suggest") || eventType.includes("hint")) return "tips";
  return "system";
}

function classifyAlert(alertType: string): NotifType {
  if (alertType.includes("lead") || alertType.includes("match") || alertType.includes("new_lead")) return "leads";
  if (alertType.includes("commission") || alertType.includes("earn") || alertType.includes("payout")) return "commission";
  if (alertType.includes("network") || alertType.includes("referral") || alertType.includes("tier")) return "network";
  if (alertType.includes("tip")) return "tips";
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
    iconBg: "rgba(34,197,94,0.15)",
    iconColor: "#22c55e",
    badgeBg: "rgba(34,197,94,0.1)",
    badgeText: "#22c55e",
    label: "Lead",
    actionIcon: <Eye className="w-3 h-3" />,
  },
  commission: {
    icon: <DollarSign className="w-4 h-4" />,
    iconBg: "rgba(245,230,66,0.15)",
    iconColor: "#F5E642",
    badgeBg: "rgba(245,230,66,0.1)",
    badgeText: "#F5E642",
    label: "Commission",
    actionIcon: <ArrowRight className="w-3 h-3" />,
  },
  network: {
    icon: <Network className="w-4 h-4" />,
    iconBg: "rgba(59,130,246,0.15)",
    iconColor: "#3b82f6",
    badgeBg: "rgba(59,130,246,0.1)",
    badgeText: "#3b82f6",
    label: "Network",
    actionIcon: <UserPlus className="w-3 h-3" />,
  },
  system: {
    icon: <Info className="w-4 h-4" />,
    iconBg: "rgba(107,114,128,0.15)",
    iconColor: "#9ca3af",
    badgeBg: "rgba(107,114,128,0.1)",
    badgeText: "#9ca3af",
    label: "System",
    actionIcon: <ExternalLink className="w-3 h-3" />,
  },
  tips: {
    icon: <Lightbulb className="w-4 h-4" />,
    iconBg: "rgba(245,158,11,0.15)",
    iconColor: "#f59e0b",
    badgeBg: "rgba(245,158,11,0.1)",
    badgeText: "#f59e0b",
    label: "Tips",
    actionIcon: <ArrowRight className="w-3 h-3" />,
  },
};

const FILTER_EMPTY: Record<FilterKey, string> = {
  all: "No notifications yet. Activity will appear here as you use the platform.",
  leads: "No lead notifications yet. Leads assigned to you will appear here.",
  commission: "No commission notifications yet. Start earning to see commission notifications.",
  network: "No network notifications yet. Invite pros to see your network grow.",
  system: "No system notifications right now.",
  tips: "No tips yet. Check back soon for personalized suggestions.",
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
    id: "static-welcome",
    numId: -1,
    type: "system",
    title: "Welcome to ProLnk!",
    body: "Your founding partner account is active. Explore your dashboard, log your first job, and start building your network to unlock income streams.",
    timestamp: new Date(),
    read: false,
    pinned: true,
    actionLabel: "Go to Dashboard",
    actionHref: "/dashboard",
  },
  {
    id: "static-trial",
    numId: -2,
    type: "system",
    title: "Your 90-day free trial starts today",
    body: `You have full access to all founding network features. No credit card required until ${TRIAL_END}. You'll receive a reminder before your trial ends.`,
    timestamp: new Date(Date.now() - 60000),
    read: false,
    pinned: true,
  },
  {
    id: "static-lead-hvac",
    numId: -5,
    type: "leads",
    title: "New homeowner in your area needs HVAC service",
    body: "Estimated job value: $800–$1,200. Homeowner in 78701 submitted a request 12 minutes ago. 3 other pros have been notified — respond fast.",
    timestamp: new Date(Date.now() - 720000),
    read: false,
    meta: "$800–$1,200 est.",
    actionLabel: "View Lead",
    actionHref: "/leads",
  },
  {
    id: "static-network-join",
    numId: -6,
    type: "network",
    title: "John D. joined your network",
    body: "John signed up as an L1 partner using your referral link. You'll earn 7% on every job commission he generates — forever.",
    timestamp: new Date(Date.now() - 3600000),
    read: false,
    meta: "+7% override (L1)",
    actionLabel: "View Network",
    actionHref: "/network",
  },
  {
    id: "static-commission",
    numId: -7,
    type: "commission",
    title: "Commission credited — $84.00",
    body: "Your L1 override from John D.'s completed HVAC job has been credited to your account. Payout processes on the 1st of next month.",
    timestamp: new Date(Date.now() - 7200000),
    read: false,
    meta: "$84.00 credited",
    actionLabel: "View Earnings",
    actionHref: "/earnings",
  },
  {
    id: "static-signature-tip",
    numId: -3,
    type: "tips",
    title: "Tip: Add your referral link to your email signature",
    body: "Every time you email a client or vendor, your referral link is right there. Pros who click and sign up become your L1 network — earning you 7% on every job commission, forever.",
    timestamp: new Date(Date.now() - 120000),
    read: false,
    pinned: true,
    actionLabel: "Copy Referral Link",
    actionHref: "/referrals",
  },
];

export default function Notifications() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const { data: events, isLoading, refetch } = trpc.activityLog.getRecent.useQuery({ limit: 60 });
  const { data: alerts } = trpc.partnerAlerts.getAlerts.useQuery();

  const dynamicNotifications: Notification[] = [
    ...(alerts ?? []).map((a: any): Notification => ({
      id: `alert-${a.id}`,
      numId: a.id,
      type: classifyAlert(a.alertType),
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
        type: classifyEvent(e.eventType),
        title: e.eventType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        body: e.description,
        timestamp: new Date(e.createdAt),
        read: readIds.has(`event-${e.id}`),
      })),
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const allNotifications: Notification[] = [
    ...STATIC_NOTIFICATIONS.map((n) => ({ ...n, read: readIds.has(n.id) })),
    ...dynamicNotifications,
  ];

  const markRead = (id: string) => {
    setReadIds((prev) => new Set(Array.from(prev).concat(id)));
  };

  const markAllRead = () => {
    setReadIds(new Set(allNotifications.map((n) => n.id)));
  };

  const unreadCount = allNotifications.filter((n) => !n.read).length;

  const FILTER_TABS: { key: FilterKey; label: string; count?: number }[] = [
    { key: "all", label: "All", count: unreadCount > 0 ? unreadCount : undefined },
    { key: "leads", label: "Leads", count: allNotifications.filter(n => !n.read && n.type === "leads").length || undefined },
    { key: "network", label: "Network", count: allNotifications.filter(n => !n.read && n.type === "network").length || undefined },
    { key: "system", label: "System" },
    { key: "commission", label: "Commissions" },
    { key: "tips", label: "Tips" },
  ];

  const displayed = allNotifications.filter((n) => {
    if (filter === "all") return true;
    return n.type === filter;
  });

  return (
    <PartnerLayout>
      <div className="space-y-6 max-w-3xl">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center relative"
              style={{ background: "rgba(245,230,66,0.1)", border: "1px solid rgba(245,230,66,0.2)" }}
            >
              <Bell className="w-5 h-5" style={{ color: "#F5E642" }} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Notifications</h1>
              <p className="text-sm text-gray-400">
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => refetch()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: "rgba(255,255,255,0.06)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
            <button
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={
                unreadCount > 0
                  ? { background: "rgba(245,230,66,0.1)", color: "#F5E642", border: "1px solid rgba(245,230,66,0.25)" }
                  : { background: "rgba(255,255,255,0.03)", color: "#4b5563", border: "1px solid rgba(255,255,255,0.06)", cursor: "default" }
              }
            >
              <CheckCircle className="w-3.5 h-3.5" /> Mark all read
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex gap-2 flex-wrap">
          {FILTER_TABS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
                style={
                  active
                    ? { background: "#F5E642", color: "#0A1628" }
                    : { background: "rgba(255,255,255,0.06)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)" }
                }
              >
                {f.label}
                {f.count != null && f.count > 0 && (
                  <span
                    className="w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={active ? { background: "#0A1628", color: "#F5E642" } : { background: "#ef4444", color: "#fff" }}
                  >
                    {f.count > 9 ? "9+" : f.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Notification list */}
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl p-4 animate-pulse"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
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
          <div
            className="rounded-2xl p-12 text-center"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Bell className="w-10 h-10 mx-auto mb-3" style={{ color: "rgba(255,255,255,0.12)" }} />
            <p className="text-gray-400 font-medium text-sm mb-1">
              {filter === "all" ? "No notifications" : `No ${filter} notifications`}
            </p>
            <p className="text-xs text-gray-600 max-w-xs mx-auto">{FILTER_EMPTY[filter]}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {displayed.map((n) => {
              const cfg = TYPE_CONFIG[n.type];
              const isUnread = !n.read;
              return (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className="flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all"
                  style={{
                    background: isUnread
                      ? n.pinned
                        ? "rgba(245,230,66,0.06)"
                        : "rgba(255,255,255,0.06)"
                      : "rgba(255,255,255,0.03)",
                    border: isUnread
                      ? n.pinned
                        ? "1px solid rgba(245,230,66,0.2)"
                        : "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: cfg.iconBg, color: cfg.iconColor }}
                  >
                    {n.pinned && n.id === "static-welcome"
                      ? <PartyPopper className="w-4 h-4" style={{ color: cfg.iconColor }} />
                      : cfg.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap min-w-0">
                        <p className={`text-sm font-semibold ${isUnread ? "text-white" : "text-gray-400"}`}>
                          {n.title}
                          {isUnread && (
                            <span
                              className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full align-middle"
                              style={{ background: "#F5E642" }}
                            />
                          )}
                        </p>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{ background: cfg.badgeBg, color: cfg.badgeText }}
                        >
                          {cfg.label}
                        </span>
                        {n.pinned && (
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{ background: "rgba(245,230,66,0.1)", color: "#F5E642" }}
                          >
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

                    {/* Meta + Action row */}
                    {(n.meta || n.actionLabel) && (
                      <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
                        {n.meta ? (
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-lg"
                            style={{ background: cfg.iconBg, color: cfg.iconColor }}
                          >
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
