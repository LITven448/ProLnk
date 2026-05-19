import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Users, CheckCircle, Clock, TrendingDown, Zap,
  AlertTriangle, ChevronRight, Bell, Award,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const D = {
  bg: "#0D0F14",
  surface: "#13161E",
  card: "#1A1E2A",
  border: "#252A3A",
  text: "#F0F2FF",
  muted: "#8B91A8",
  dim: "#555B72",
  cyan: "#00D4FF",
  green: "#00E676",
  amber: "#FFB300",
  red: "#FF4444",
  blue: "#3B82F6",
  purple: "#A855F7",
  teal: "#14B8A6",
};

interface FunnelStage {
  label: string;
  count: number;
  drop: number | null;
  cr: string | null;
  color: string;
}

const FUNNEL: FunnelStage[] = [
  { label: "Applied", count: 412, drop: null, cr: null, color: D.blue },
  { label: "Approved", count: 287, drop: -30.3, cr: "69.7%", color: D.cyan },
  { label: "Profile Complete", count: 198, drop: -31.0, cr: "69.0%", color: D.teal },
  { label: "First Lead Accepted", count: 167, drop: -15.7, cr: "84.3%", color: D.green },
  { label: "First Job Done", count: 147, drop: -11.9, cr: "88.1%", color: "#00E676" },
];

interface OnboardingTask {
  task: string;
  rate: number;
  critical: boolean;
}

const ONBOARDING_TASKS: OnboardingTask[] = [
  { task: "Profile photo", rate: 94, critical: false },
  { task: "License upload", rate: 78, critical: true },
  { task: "Insurance upload", rate: 71, critical: true },
  { task: "Service area set", rate: 89, critical: false },
  { task: "Test lead accepted", rate: 67, critical: true },
  { task: "First job completed", rate: 51, critical: true },
  { task: "First review earned", rate: 44, critical: false },
  { task: "First recruit", rate: 22, critical: false },
];

const TIME_TO_FIRST_JOB = [
  { day: "1–2d", count: 12 },
  { day: "3–5d", count: 41 },
  { day: "6–10d", count: 29 },
  { day: "11–20d", count: 18 },
  { day: "21–30d", count: 11 },
  { day: "30d+", count: 8 },
];

interface StuckPartner {
  name: string;
  stage: string;
  days: number;
  missing: string;
}

const STUCK_PARTNERS: StuckPartner[] = [
  { name: "Marcus Thompson", stage: "Insurance upload", days: 12, missing: "Insurance certificate" },
  { name: "Priya Nair", stage: "Test lead accepted", days: 9, missing: "First lead acceptance" },
  { name: "Dave Kowalski", stage: "License upload", days: 14, missing: "Contractor license" },
  { name: "Sofia Ruiz", stage: "Service area set", days: 8, missing: "Coverage zone selection" },
  { name: "James Lee", stage: "Profile photo", days: 11, missing: "Profile photo upload" },
];

function taskColor(rate: number) {
  if (rate >= 85) return D.green;
  if (rate >= 65) return D.amber;
  return D.red;
}

function StuckBadge({ days }: { days: number }) {
  const color = days >= 12 ? D.red : D.amber;
  return (
    <span
      className="px-2 py-0.5 rounded-full text-xs font-bold"
      style={{ background: `${color}20`, color }}
    >
      {days}d stuck
    </span>
  );
}

export default function OnboardingReadiness() {
  const [nudged, setNudged] = useState<Set<string>>(new Set());

  function handleNudge(name: string) {
    setNudged(prev => new Set(prev).add(name));
  }

  const overallCR = Math.round((FUNNEL[FUNNEL.length - 1].count / FUNNEL[0].count) * 100);

  return (
    <AdminLayout>
      <div style={{ minHeight: "100vh", backgroundColor: D.bg, padding: "32px 24px", fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${D.cyan}20` }}>
              <CheckCircle className="w-5 h-5" style={{ color: D.cyan }} />
            </div>
            <div>
              <h1 className="text-2xl font-black" style={{ color: D.text }}>Onboarding Readiness</h1>
              <p className="text-sm" style={{ color: D.muted }}>From signup to first job</p>
            </div>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Applicants", value: "412", color: D.blue, icon: Users },
            { label: "Fully Onboarded", value: "147", color: D.green, icon: CheckCircle },
            { label: "End-to-End CR", value: `${overallCR}%`, color: D.cyan, icon: TrendingDown },
            { label: "Avg Days to First Job", value: "6.4d", color: D.amber, icon: Clock },
          ].map(kpi => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="rounded-2xl p-4"
                style={{ background: `linear-gradient(135deg, ${kpi.color}08, ${kpi.color}18)`, border: `1px solid ${kpi.color}30` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4" style={{ color: kpi.color }} />
                  <span className="text-xs" style={{ color: D.muted }}>{kpi.label}</span>
                </div>
                <p className="text-2xl font-black" style={{ color: kpi.color }}>{kpi.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Left 2 cols */}
          <div className="xl:col-span-2 space-y-6">

            {/* Funnel */}
            <div className="rounded-2xl overflow-hidden" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <div className="px-5 py-3" style={{ borderBottom: `1px solid ${D.border}`, background: D.surface }}>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: D.muted }}>Activation Funnel</span>
              </div>
              <div className="p-5 space-y-3">
                {FUNNEL.map((stage, i) => {
                  const maxW = FUNNEL[0].count;
                  const pct = (stage.count / maxW) * 100;
                  return (
                    <div key={stage.label}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold" style={{ color: D.dim }}>{i + 1}</span>
                          <span className="text-sm font-semibold" style={{ color: D.text }}>{stage.label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {stage.drop !== null && (
                            <span className="text-xs font-bold" style={{ color: D.red }}>{stage.drop}%</span>
                          )}
                          {stage.cr !== null && (
                            <span className="text-xs" style={{ color: D.muted }}>CR {stage.cr}</span>
                          )}
                          <span className="text-sm font-black" style={{ color: stage.color }}>{stage.count}</span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: D.surface }}>
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: stage.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Time to First Job Chart */}
            <div className="rounded-2xl p-5" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <h2 className="text-sm font-bold mb-1" style={{ color: D.text }}>Time to First Job</h2>
              <p className="text-xs mb-4" style={{ color: D.muted }}>Days from signup to first completed job — peak at 3–5 days</p>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={TIME_TO_FIRST_JOB} barSize={28}>
                  <XAxis dataKey="day" tick={{ fill: D.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: D.muted, fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip
                    contentStyle={{ background: D.surface, border: `1px solid ${D.border}`, borderRadius: 12, color: D.text, fontSize: 12 }}
                    cursor={{ fill: `${D.cyan}10` }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {TIME_TO_FIRST_JOB.map((entry, index) => (
                      <Cell key={index} fill={entry.day === "3–5d" ? D.cyan : `${D.cyan}50`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Stuck Partners */}
            <div className="rounded-2xl overflow-hidden" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <div className="px-5 py-3 flex items-center gap-2" style={{ borderBottom: `1px solid ${D.border}`, background: D.surface }}>
                <AlertTriangle className="w-4 h-4" style={{ color: D.amber }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: D.muted }}>Stuck Partners (&gt;7 days)</span>
              </div>
              <div className="divide-y" style={{ borderColor: D.border }}>
                {STUCK_PARTNERS.map(partner => (
                  <div key={partner.name} className="flex items-center gap-3 px-5 py-3.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black" style={{ background: `${D.amber}20`, color: D.amber }}>
                      {partner.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold" style={{ color: D.text }}>{partner.name}</p>
                      <p className="text-xs" style={{ color: D.muted }}>Stuck at: {partner.stage} — missing <span style={{ color: D.amber }}>{partner.missing}</span></p>
                    </div>
                    <StuckBadge days={partner.days} />
                    <button
                      onClick={() => handleNudge(partner.name)}
                      disabled={nudged.has(partner.name)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                      style={{
                        background: nudged.has(partner.name) ? `${D.green}20` : `${D.cyan}20`,
                        color: nudged.has(partner.name) ? D.green : D.cyan,
                        border: `1px solid ${nudged.has(partner.name) ? D.green : D.cyan}40`,
                        opacity: nudged.has(partner.name) ? 0.7 : 1,
                      }}
                    >
                      <Bell className="w-3 h-3" />
                      {nudged.has(partner.name) ? "Sent" : "Nudge"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Automation + Benchmark row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl p-4" style={{ background: `${D.blue}10`, border: `1px solid ${D.blue}30` }}>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4" style={{ color: D.blue }} />
                  <p className="text-sm font-bold" style={{ color: D.blue }}>Automation Status</p>
                </div>
                <p className="text-xs mb-2" style={{ color: D.muted }}>
                  Auto-email sent when partner hasn't uploaded docs after 3 days
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: D.muted }}>234 sent</span>
                  <span className="text-sm font-black" style={{ color: D.green }}>61% completion rate</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full" style={{ background: D.surface }}>
                  <div className="h-full rounded-full" style={{ width: "61%", background: D.green }} />
                </div>
              </div>

              <div className="rounded-2xl p-4" style={{ background: `${D.green}10`, border: `1px solid ${D.green}30` }}>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4" style={{ color: D.green }} />
                  <p className="text-sm font-bold" style={{ color: D.green }}>Benchmark</p>
                </div>
                <p className="text-xs" style={{ color: D.muted }}>
                  Partners who complete all 8 onboarding tasks earn
                </p>
                <p className="text-2xl font-black mt-1" style={{ color: D.green }}>4.1×</p>
                <p className="text-xs" style={{ color: D.muted }}>more in first 90 days</p>
              </div>
            </div>
          </div>

          {/* Right sidebar — task completion rates */}
          <div className="space-y-5">
            <div className="rounded-2xl overflow-hidden" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <div className="px-5 py-3" style={{ borderBottom: `1px solid ${D.border}`, background: D.surface }}>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: D.muted }}>Onboarding Task Completion</span>
              </div>
              <div className="p-4 space-y-4">
                {ONBOARDING_TASKS.map(t => {
                  const color = taskColor(t.rate);
                  return (
                    <div key={t.task}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold" style={{ color: D.text }}>{t.task}</span>
                          {t.critical && (
                            <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ background: `${D.red}20`, color: D.red, fontSize: 10 }}>
                              Required
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-black" style={{ color }}>{t.rate}%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: D.surface }}>
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${t.rate}%`, background: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl p-4" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <h2 className="text-sm font-bold mb-3" style={{ color: D.text }}>Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { label: "Email all stuck partners", color: D.amber },
                  { label: "Export onboarding CSV", color: D.cyan },
                  { label: "View activation cohort", color: D.purple },
                ].map(action => (
                  <button
                    key={action.label}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all hover:opacity-80"
                    style={{ background: `${action.color}15`, border: `1px solid ${action.color}30` }}
                  >
                    <span className="text-xs font-semibold" style={{ color: action.color }}>{action.label}</span>
                    <ChevronRight className="w-3.5 h-3.5" style={{ color: action.color }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
