import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import {
  Bell, CheckCircle, AlertTriangle, Info, Trophy, X,
  Zap, DollarSign, TrendingUp, Clock, Star, Gift, ArrowRight
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

// --- Alert severity config ----------------------------------------------------
const SEVERITY_CONFIG = {
  info:      { icon: <Info size={16} />,          bg: "bg-blue-50",    border: "border-blue-100",   text: "text-blue-700",    badge: "bg-blue-100 text-blue-700" },
  warning:   { icon: <AlertTriangle size={16} />, bg: "bg-amber-50",   border: "border-amber-100",  text: "text-amber-700",   badge: "bg-amber-100 text-amber-700" },
  success:   { icon: <CheckCircle size={16} />,   bg: "bg-green-50",   border: "border-green-100",  text: "text-green-700",   badge: "bg-green-100 text-green-700" },
  milestone: { icon: <Trophy size={16} />,         bg: "bg-purple-50",  border: "border-purple-100", text: "text-purple-700",  badge: "bg-purple-100 text-purple-700" },
};

// --- Alert type  CTA ---------------------------------------------------------
const ALERT_CTA: Record<string, { label: string; href: string }> = {
  pending_leads:    { label: "View Leads", href: "/dashboard/leads" },
  tier_upgrade:     { label: "View Tier Progress", href: "/dashboard/tier" },
  tier_progress:    { label: "View Tier Progress", href: "/dashboard/tier" },
  payout_ready:     { label: "View Commissions", href: "/dashboard/commissions" },
  milestone_10jobs: { label: "View Analytics", href: "/dashboard/analytics" },
  milestone_25jobs: { label: "View Analytics", href: "/dashboard/analytics" },
  milestone_5refs:  { label: "Send More Referrals", href: "/dashboard/referrals" },
};

// --- Demo alerts for empty state ----------------------------------------------
const DEMO_ALERTS = [
  {
    id: -1, alertType: "milestone_10jobs", severity: "milestone",
    title: "[SUCCESS] 10 Jobs Milestone!",
    body: "You just logged your 10th job on ProLnk. You're in the top 20% of active partners.",
    isRead: false, createdAt: new Date(Date.now() - 2 * 60_000),
  },
  {
    id: -2, alertType: "pending_leads", severity: "warning",
    title: "2 leads waiting for your response",
    body: "You have 2 inbound leads that need a response. Respond within 48 hours to maintain your response rate.",
    isRead: false, createdAt: new Date(Date.now() - 15 * 60_000),
  },
  {
    id: -3, alertType: "payout_ready", severity: "success",
    title: "$142 ready for payout",
    body: "Your commission balance has reached the $100 minimum payout threshold. Your next payout will be processed on the 1st of the month.",
    isRead: false, createdAt: new Date(Date.now() - 45 * 60_000),
  },
  {
    id: -4, alertType: "tier_progress", severity: "info",
    title: "4 jobs from Silver tier",
    body: "Silver tier unlocks higher commission rates and priority lead routing. Keep logging jobs to level up.",
    isRead: true, createdAt: new Date(Date.now() - 3 * 3_600_000),
  },
  {
    id: -5, alertType: "milestone_5refs", severity: "success",
    title: "[LINK] 5 Referrals Sent!",
    body: "You've sent 5 referrals to the network. Partners who send 10+ referrals earn 40% more in commissions.",
    isRead: true, createdAt: new Date(Date.now() - 24 * 3_600_000),
  },
];

function timeAgo(date: Date | string): string {
  const d = new Date(date);
  const diff = Date.now() - d.getTime();
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return d.toLocaleDateString();
}

export default function PerformanceAlerts() {
  const [, navigate] = useLocation();
  const { data: alerts, isLoading, refetch } = trpc.partnerAlerts.getAlerts.useQuery();
  const markRead = trpc.partnerAlerts.markRead.useMutation({ onSuccess: () => refetch() });
  const dismiss = trpc.partnerAlerts.dismiss.useMutation({ onSuccess: () => refetch() });

  const [dismissed, setDismissed] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<"all" | "unread" | "milestone">("all");

  const isLive = alerts && alerts.length > 0;
  const displayAlerts = (isLive ? alerts : DEMO_ALERTS) as Array<{
    id: number; alertType: string; severity: string; title: string; body: string; isRead: boolean; createdAt: Date | string;
  }>;

  const visible = displayAlerts.filter(a => {
    if (dismissed.has(a.id)) return false;
    if (filter === "unread") return !a.isRead;
    if (filter === "milestone") return a.severity === "milestone";
    return true;
  });

  const unreadCount = displayAlerts.filter(a => !a.isRead && !dismissed.has(a.id)).length;

  const handleDismiss = (id: number) => {
    setDismissed(prev => new Set(Array.from(prev).concat(id)));
    if (id > 0) dismiss.mutate({ alertId: id });
    toast.success("Alert dismissed");
  };

  const handleMarkRead = (id: number) => {
    if (id > 0) markRead.mutate({ alertId: id });
    toast.success("Marked as read");
  };

  return (
    <PartnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5E642]/10 flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-[#0A1628]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Performance Alerts</h1>
              <p className="text-sm text-gray-500">Smart notifications about your account and milestones</p>
            </div>
          </div>
          {!isLive && <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">Demo Data</Badge>}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          {[
            { id: "all" as const, label: "All Alerts", count: displayAlerts.filter(a => !dismissed.has(a.id)).length },
            { id: "unread" as const, label: "Unread", count: unreadCount },
            { id: "milestone" as const, label: "Milestones", count: displayAlerts.filter(a => a.severity === "milestone" && !dismissed.has(a.id)).length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === tab.id
                  ? "bg-[#0A1628]/10 text-[#0A1628]"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  filter === tab.id ? "bg-[#0A1628]/20 text-teal-800" : "bg-gray-100 text-gray-500"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Alert list */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
            <Bell size={16} className="animate-pulse" /> Loading alerts...
          </div>
        ) : visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-100">
            <CheckCircle size={32} className="mb-2 opacity-30" />
            <p className="text-sm font-medium">You're all caught up!</p>
            <p className="text-xs mt-1">No alerts match your current filter.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map(alert => {
              const cfg = SEVERITY_CONFIG[alert.severity as keyof typeof SEVERITY_CONFIG] ?? SEVERITY_CONFIG.info;
              const cta = ALERT_CTA[alert.alertType];
              return (
                <div
                  key={alert.id}
                  className={`${cfg.bg} ${cfg.border} border rounded-2xl p-4 transition-all ${!alert.isRead ? "shadow-sm" : "opacity-75"}`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${cfg.text} bg-white/60`}>
                      {cfg.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-semibold ${cfg.text}`}>{alert.title}</span>
                        {!alert.isRead && (
                          <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                        )}
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium capitalize ${cfg.badge}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{alert.body}</p>
                      <div className="flex items-center gap-3 mt-2.5 flex-wrap">
                        {cta && (
                          <Link href={cta.href}>
                            <span className={`text-xs font-semibold flex items-center gap-1 ${cfg.text} hover:underline cursor-pointer`}>
                              {cta.label} <ArrowRight size={11} />
                            </span>
                          </Link>
                        )}
                        {!alert.isRead && (
                          <button
                            onClick={() => handleMarkRead(alert.id)}
                            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            Mark read
                          </button>
                        )}
                        <span className="text-xs text-gray-400 ml-auto">{timeAgo(alert.createdAt)}</span>
                      </div>
                    </div>

                    {/* Dismiss */}
                    <button
                      onClick={() => handleDismiss(alert.id)}
                      className="p-1 rounded-lg text-gray-300 hover:text-gray-500 hover:bg-white/60 transition-colors shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Alert preferences section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={16} className="text-gray-500" />
            <p className="text-sm font-semibold text-gray-900">Alert Preferences</p>
          </div>
          <div className="space-y-3">
            {[
              { label: "Inbound lead alerts", desc: "Get notified when you receive a new lead", icon: <Zap size={14} className="text-purple-500" />, enabled: true },
              { label: "Commission milestones", desc: "Celebrate when you hit payout thresholds", icon: <DollarSign size={14} className="text-green-500" />, enabled: true },
              { label: "Tier upgrade notifications", desc: "Know when you qualify for the next tier", icon: <TrendingUp size={14} className="text-blue-500" />, enabled: true },
              { label: "Response time warnings", desc: "Alert when a lead is about to expire", icon: <Clock size={14} className="text-amber-500" />, enabled: true },
              { label: "Milestone celebrations", desc: "Celebrate job and referral milestones", icon: <Trophy size={14} className="text-purple-500" />, enabled: true },
            ].map(pref => (
              <div key={pref.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center">{pref.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{pref.label}</p>
                    <p className="text-xs text-gray-400">{pref.desc}</p>
                  </div>
                </div>
                <div
                  className={`w-9 h-5 rounded-full transition-colors cursor-pointer ${pref.enabled ? "bg-[#0A1628]" : "bg-gray-200"}`}
                  onClick={() => navigate("/dashboard/notification-preferences")}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm mt-0.5 transition-transform ${pref.enabled ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">Email and SMS notifications require Resend + Twilio credentials to be configured.</p>
        </div>
      </div>
    </PartnerLayout>
  );
}
