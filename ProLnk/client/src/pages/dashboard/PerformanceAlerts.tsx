import { useState, type ElementType, type ReactNode } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Clock, CheckCircle, Briefcase, Award, Lightbulb,
  AlertTriangle, TrendingUp, TrendingDown, Minus, ChevronRight,
  Flame, Users, Zap, ArrowRight, Trophy,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const RESPONSE_TARGET_HOURS = 2;

const PRO_TIPS = [
  {
    title: "Respond within 2 hours",
    detail:
      "Pros who respond within 2 hours win 3× more jobs. Set a phone notification so you never miss a new lead.",
    icon: Clock,
    color: "#3b82f6",
  },
  {
    title: "Accept more jobs to climb tiers",
    detail:
      "Tier upgrades are gated by completed jobs. Accepting even one extra job per week adds 52 jobs annually — enough to jump tiers.",
    icon: Award,
    color: "#F5E642",
  },
  {
    title: "Document every job for origination rights",
    detail:
      "Upload a photo after every job. You earn 1.5% of every future platform fee at that address — permanently.",
    icon: Briefcase,
    color: "#22c55e",
  },
];

const TIER_JOB_THRESHOLDS = [
  { label: "Founding", jobs: 0 },
  { label: "Level 3", jobs: 100 },
  { label: "Level 2", jobs: 300 },
  { label: "Charter", jobs: 700 },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type AlertSeverity = "red" | "amber" | "green";

interface PerformanceAlert {
  id: string;
  severity: AlertSeverity;
  icon: ElementType;
  title: string;
  detail: string;
  actionLabel?: string;
  actionHref?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function trendIcon(value: number, target: number, lowerIsBetter = false) {
  const good = lowerIsBetter ? value <= target : value >= target;
  if (good) return <TrendingUp size={14} style={{ color: "#22c55e" }} />;
  if (Math.abs(value - target) / target < 0.15)
    return <Minus size={14} style={{ color: "#f59e0b" }} />;
  return <TrendingDown size={14} style={{ color: "#ef4444" }} />;
}

function statusColor(good: boolean, borderline: boolean) {
  if (good) return "#22c55e";
  if (borderline) return "#f59e0b";
  return "#ef4444";
}

const SEVERITY_PALETTE: Record<AlertSeverity, { bg: string; border: string; icon: string; badge: string }> = {
  red: {
    bg: "rgba(239,68,68,0.07)",
    border: "rgba(239,68,68,0.25)",
    icon: "#ef4444",
    badge: "rgba(239,68,68,0.15)",
  },
  amber: {
    bg: "rgba(245,158,11,0.07)",
    border: "rgba(245,158,11,0.25)",
    icon: "#f59e0b",
    badge: "rgba(245,158,11,0.15)",
  },
  green: {
    bg: "rgba(34,197,94,0.07)",
    border: "rgba(34,197,94,0.25)",
    icon: "#22c55e",
    badge: "rgba(34,197,94,0.15)",
  },
};

const SEVERITY_LABELS: Record<AlertSeverity, string> = {
  red: "Urgent",
  amber: "Heads Up",
  green: "Nice Work",
};

// ─── Alert Card ───────────────────────────────────────────────────────────────

function AlertCard({ alert }: { alert: PerformanceAlert }) {
  const p = SEVERITY_PALETTE[alert.severity];
  const Icon = alert.icon;
  return (
    <div
      className="flex items-start gap-4 p-4 rounded-xl"
      style={{ background: p.bg, border: `1px solid ${p.border}` }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: p.badge }}
      >
        <Icon size={17} style={{ color: p.icon }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <p className="text-sm font-bold text-white">{alert.title}</p>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: p.badge, color: p.icon }}
          >
            {SEVERITY_LABELS[alert.severity]}
          </span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">{alert.detail}</p>
        {alert.actionLabel && alert.actionHref && (
          <Link href={alert.actionHref}>
            <span
              className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
              style={{ background: p.badge, color: p.icon, border: `1px solid ${p.border}` }}
            >
              <ArrowRight size={12} />
              {alert.actionLabel}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

// ─── Metric Row ───────────────────────────────────────────────────────────────

function MetricRow({
  label,
  value,
  detail,
  icon: Icon,
  color,
  trend,
}: {
  label: string;
  value: string;
  detail: string;
  icon: ElementType;
  color: string;
  trend: ReactNode;
}) {
  return (
    <div
      className="flex items-center gap-4 px-4 py-3.5 rounded-xl"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18` }}
      >
        <Icon size={17} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
        <p className="text-sm font-bold text-white mt-0.5">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5 leading-snug">{detail}</p>
      </div>
      <div className="flex-shrink-0">{trend}</div>
    </div>
  );
}

// ─── Weekly Summary Card ──────────────────────────────────────────────────────

function WeeklySummary({
  jobs,
  recruits,
  commissionEst,
  tierProgress,
}: {
  jobs: number;
  recruits: number;
  commissionEst: number;
  tierProgress: number;
}) {
  const stats = [
    { label: "Jobs This Week", value: jobs.toString(), icon: Briefcase, color: "#22c55e" },
    { label: "New Recruits", value: recruits.toString(), icon: Users, color: "#3b82f6" },
    { label: "Est. Commissions", value: `$${commissionEst.toFixed(0)}`, icon: Zap, color: "#F5E642" },
    { label: "Tier Progress", value: `${tierProgress}%`, icon: Trophy, color: "#f59e0b" },
  ];
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(245,230,66,0.12)" }}
        >
          <TrendingUp size={16} style={{ color: "#F5E642" }} />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Weekly Performance</p>
          <p className="text-xs text-gray-500">This week at a glance</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl p-3.5"
            style={{ background: `${color}0d`, border: `1px solid ${color}22` }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon size={13} style={{ color }} />
              <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color }}>{label}</p>
            </div>
            <p className="text-xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PerformanceAlerts() {
  const { user, isAuthenticated } = useAuth();
  const email = user?.email ?? "";
  const [tipsExpanded, setTipsExpanded] = useState(true);

  const { data: status } = trpc.proWaitlist.getWaitlistStatus.useQuery(
    { email },
    { enabled: isAuthenticated && !!email }
  );

  const jobsThisMonth: number = 0;
  const jobsLastMonth: number = 0;
  const acceptanceRate: number = 0;
  const avgResponseHours: number = 0;

  const currentTierIdx =
    status?.tier === "charter" ? 3
    : status?.tier === "founding" ? 1
    : status?.tier === "level3" ? 2
    : 0;
  const nextTierEntry = TIER_JOB_THRESHOLDS[currentTierIdx + 1];
  const jobsToNextTier = nextTierEntry
    ? Math.max(0, nextTierEntry.jobs - jobsThisMonth)
    : null;

  const responseGood = avgResponseHours === 0 || avgResponseHours <= RESPONSE_TARGET_HOURS;
  const responseBorderline = avgResponseHours > RESPONSE_TARGET_HOURS && avgResponseHours <= 4;
  const responseColor = statusColor(responseGood, responseBorderline);

  const acceptGood = acceptanceRate >= 70;
  const acceptBorderline = acceptanceRate >= 50 && acceptanceRate < 70;
  const acceptColor = statusColor(acceptGood, acceptBorderline);

  const jobsUp = jobsThisMonth >= jobsLastMonth;

  const ALERTS: PerformanceAlert[] = [
    {
      id: "lead-expiry",
      severity: "red",
      icon: Flame,
      title: "Lead expires in 4 hours",
      detail: "A homeowner in your area (HVAC service, $800–$1,200 est.) has not received a response. If unclaimed it will be reassigned to the next pro in queue.",
      actionLabel: "View Lead Now",
      actionHref: "/leads",
    },
    {
      id: "tier-upgrade",
      severity: "amber",
      icon: Award,
      title: "You're 2 jobs away from Tier 3 (35% keep rate)",
      detail: "Log 2 more completed jobs this month to unlock Level 3 status. That's a 15 percentage-point jump in your keep rate — worth ~$150/mo at current volume.",
      actionLabel: "Log a Job",
      actionHref: "/job-log",
    },
    {
      id: "network-momentum",
      severity: "green",
      icon: Users,
      title: "3 new recruits this week — network momentum high",
      detail: "Your referral link has converted 3 new Founding Partners this week. Combined L1 override earnings are projected at $126/mo once they start logging jobs.",
      actionLabel: "View My Network",
      actionHref: "/network",
    },
  ];

  const urgentCount = ALERTS.filter(a => a.severity === "red").length;

  return (
    <div className="min-h-screen" style={{ background: "#0A1628" }}>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white">Performance Alerts</h1>
            <p className="text-gray-400 text-sm mt-1">
              Your key metrics and what to act on this month.
            </p>
          </div>
          {urgentCount > 0 && (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}
            >
              <AlertTriangle size={12} />
              {urgentCount} urgent {urgentCount === 1 ? "alert" : "alerts"}
            </div>
          )}
        </div>

        {/* Alert banner — only if anything is off-target */}
        {(!responseGood || !acceptGood) && (
          <div
            className="rounded-2xl px-4 py-3.5 flex items-start gap-3"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.25)",
            }}
          >
            <AlertTriangle size={18} style={{ color: "#ef4444" }} className="flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-300 leading-snug">
              One or more metrics are below target. Review the details below and take action this week.
            </p>
          </div>
        )}

        {/* Active Alerts */}
        <div
          className="rounded-2xl p-5 space-y-3"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Active Alerts</p>
          {ALERTS.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>

        {/* Weekly Summary */}
        <WeeklySummary
          jobs={jobsThisMonth}
          recruits={3}
          commissionEst={126}
          tierProgress={Math.min(100, nextTierEntry ? Math.round((jobsThisMonth / nextTierEntry.jobs) * 100) : 100)}
        />

        {/* Metrics */}
        <div
          className="rounded-2xl p-5 space-y-3"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">This Month</p>

          <MetricRow
            label="Avg Lead Response Time"
            value={
              avgResponseHours === 0
                ? "No leads yet"
                : `${avgResponseHours.toFixed(1)} hours`
            }
            detail={`Target: under ${RESPONSE_TARGET_HOURS} hours — fastest pros win 3× more jobs`}
            icon={Clock}
            color={responseColor}
            trend={trendIcon(avgResponseHours, RESPONSE_TARGET_HOURS, true)}
          />

          <MetricRow
            label="Lead Acceptance Rate"
            value={acceptanceRate === 0 ? "No leads yet" : `${acceptanceRate}%`}
            detail="You've accepted 0% of leads this month — target: 70%+"
            icon={CheckCircle}
            color={acceptColor}
            trend={trendIcon(acceptanceRate, 70)}
          />

          <MetricRow
            label="Jobs Completed"
            value={`${jobsThisMonth} jobs`}
            detail={
              jobsLastMonth === 0
                ? "First month — log your first job to start tracking"
                : jobsUp
                ? `Up from ${jobsLastMonth} last month — keep the momentum`
                : `Down from ${jobsLastMonth} last month — push to close more this week`
            }
            icon={Briefcase}
            color={jobsUp || jobsThisMonth > 0 ? "#22c55e" : "#f59e0b"}
            trend={
              jobsLastMonth === 0 ? (
                <Minus size={14} style={{ color: "#6b7280" }} />
              ) : (
                trendIcon(jobsThisMonth, jobsLastMonth)
              )
            }
          />

          {nextTierEntry && (
            <MetricRow
              label="Tier Progress"
              value={
                jobsToNextTier === 0
                  ? `${nextTierEntry.label} unlocked!`
                  : `${jobsToNextTier} more jobs to ${nextTierEntry.label}`
              }
              detail={`Reach ${nextTierEntry.jobs} completed jobs to unlock higher commission rates`}
              icon={Award}
              color="#F5E642"
              trend={<ChevronRight size={14} style={{ color: "#F5E642" }} />}
            />
          )}

          {!nextTierEntry && (
            <MetricRow
              label="Tier Progress"
              value="Charter — max tier"
              detail="You are at the highest founding network rank. Maximum override depth active."
              icon={Award}
              color="#22c55e"
              trend={<TrendingUp size={14} style={{ color: "#22c55e" }} />}
            />
          )}
        </div>

        {/* Pro Tips */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <button
            type="button"
            onClick={() => setTipsExpanded((p) => !p)}
            className="w-full flex items-center justify-between mb-1"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(245,230,66,0.12)" }}
              >
                <Lightbulb size={16} style={{ color: "#F5E642" }} />
              </div>
              <p className="text-sm font-bold text-white">Pro Tips</p>
            </div>
            <span className="text-xs text-gray-500">{tipsExpanded ? "hide" : "show"}</span>
          </button>
          <p className="text-xs text-gray-500 mb-4 pl-[2.625rem]">
            Three actions to improve your numbers this week.
          </p>

          {tipsExpanded && (
            <div className="space-y-3">
              {PRO_TIPS.map(({ title, detail, icon: Icon, color }) => (
                <div
                  key={title}
                  className="flex gap-3 p-3.5 rounded-xl"
                  style={{ background: `${color}0d`, border: `1px solid ${color}22` }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${color}18` }}
                  >
                    <Icon size={15} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/job-log">
            <span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
              style={{ background: "#F5E642", color: "#0A1628" }}
            >
              <Briefcase size={15} />
              Log a Job
            </span>
          </Link>
          <Link href="/dashboard">
            <span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "#d1d5db",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Back to Dashboard <ChevronRight size={14} />
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}
