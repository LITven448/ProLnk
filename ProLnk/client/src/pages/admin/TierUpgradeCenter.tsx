import type React from "react";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowUpCircle, Star, Trophy, Zap, Crown, CheckCircle, Send, Users,
  TrendingUp, Bell,
} from "lucide-react";
import { toast } from "sonner";

type Tier = "New" | "Rising" | "Pro" | "Elite" | "Legend";

interface TierPro {
  id: number;
  name: string;
  trade: string;
  currentTier: Tier;
  jobsCompleted: number;
  jobsNeeded: number;
  rating: number;
  inviteSent: boolean;
}

const TIER_ORDER: Tier[] = ["New", "Rising", "Pro", "Elite", "Legend"];

const TIER_THRESHOLDS: Record<Tier, number> = {
  New: 10,
  Rising: 50,
  Pro: 100,
  Elite: 500,
  Legend: Infinity,
};

const TIER_COLORS: Record<Tier, string> = {
  New: "bg-slate-500/20 text-slate-400",
  Rising: "bg-blue-500/20 text-blue-400",
  Pro: "bg-teal-500/20 text-teal-400",
  Elite: "bg-purple-500/20 text-purple-400",
  Legend: "bg-yellow-500/20 text-yellow-400",
};

const TIER_ICONS: Record<Tier, React.ElementType> = {
  New: Zap,
  Rising: ArrowUpCircle,
  Pro: Star,
  Elite: Trophy,
  Legend: Crown,
};

const MOCK_PROS: TierPro[] = [
  { id: 1, name: "Maria Santos", trade: "HVAC", currentTier: "New", jobsCompleted: 10, jobsNeeded: 10, rating: 4.9, inviteSent: false },
  { id: 2, name: "Devon Clarke", trade: "Plumbing", currentTier: "New", jobsCompleted: 10, jobsNeeded: 10, rating: 4.7, inviteSent: false },
  { id: 3, name: "Aisha Patel", trade: "Electrical", currentTier: "Rising", jobsCompleted: 50, jobsNeeded: 50, rating: 4.8, inviteSent: false },
  { id: 4, name: "Roberto Vega", trade: "Roofing", currentTier: "Rising", jobsCompleted: 52, jobsNeeded: 50, rating: 4.6, inviteSent: false },
  { id: 5, name: "Christine Lee", trade: "General", currentTier: "Pro", jobsCompleted: 101, jobsNeeded: 100, rating: 4.9, inviteSent: false },
  { id: 6, name: "Frank Okafor", trade: "HVAC", currentTier: "Elite", jobsCompleted: 503, jobsNeeded: 500, rating: 5.0, inviteSent: false },
  { id: 7, name: "Wendy Park", trade: "Plumbing", currentTier: "New", jobsCompleted: 9, jobsNeeded: 10, rating: 4.5, inviteSent: false },
  { id: 8, name: "Tariq Hassan", trade: "Electrical", currentTier: "Rising", jobsCompleted: 47, jobsNeeded: 50, rating: 4.7, inviteSent: false },
  { id: 9, name: "Lisa Jordan", trade: "Roofing", currentTier: "Pro", jobsCompleted: 98, jobsNeeded: 100, rating: 4.4, inviteSent: false },
];

const NEAR_THRESHOLD_PROS = [
  { id: 1, name: "Wendy Park", trade: "Plumbing", currentTier: "New" as Tier, pct: 90 },
  { id: 2, name: "Tariq Hassan", trade: "Electrical", currentTier: "Rising" as Tier, pct: 94 },
  { id: 3, name: "Lisa Jordan", trade: "Roofing", currentTier: "Pro" as Tier, pct: 98 },
  { id: 4, name: "Marcus Reyes", trade: "HVAC", currentTier: "New" as Tier, pct: 85 },
  { id: 5, name: "Sophie Kim", trade: "Painting", currentTier: "Rising" as Tier, pct: 88 },
  { id: 6, name: "James Obinna", trade: "Electrical", currentTier: "Pro" as Tier, pct: 92 },
  { id: 7, name: "Cynthia Brooks", trade: "Landscaping", currentTier: "New" as Tier, pct: 80 },
  { id: 8, name: "Derek Tan", trade: "Plumbing", currentTier: "Rising" as Tier, pct: 96 },
  { id: 9, name: "Nadia Flores", trade: "General", currentTier: "Pro" as Tier, pct: 87 },
  { id: 10, name: "Alvin Wu", trade: "HVAC", currentTier: "Elite" as Tier, pct: 83 },
];

const UPGRADE_VELOCITY = [
  { month: "Dec", upgrades: 4 },
  { month: "Jan", upgrades: 7 },
  { month: "Feb", upgrades: 5 },
  { month: "Mar", upgrades: 9 },
  { month: "Apr", upgrades: 12 },
  { month: "May", upgrades: 8 },
];

const ONE_JOB_AWAY = [
  { id: 1, name: "Derek Tan", currentTier: "Rising" as Tier, trade: "Plumbing", jobsNeeded: 1 },
  { id: 2, name: "Lisa Jordan", currentTier: "Pro" as Tier, trade: "Roofing", jobsNeeded: 2 },
  { id: 3, name: "Tariq Hassan", currentTier: "Rising" as Tier, trade: "Electrical", jobsNeeded: 3 },
  { id: 4, name: "Wendy Park", currentTier: "New" as Tier, trade: "Plumbing", jobsNeeded: 1 },
  { id: 5, name: "James Obinna", currentTier: "Pro" as Tier, trade: "Electrical", jobsNeeded: 2 },
];

const CELEBRATION_LOG = [
  { id: 1, name: "Maria Santos", newTier: "Rising" as Tier, date: "May 12, 2026" },
  { id: 2, name: "Devon Clarke", newTier: "Rising" as Tier, date: "May 10, 2026" },
  { id: 3, name: "Aisha Patel", newTier: "Pro" as Tier, date: "May 8, 2026" },
  { id: 4, name: "Roberto Vega", newTier: "Pro" as Tier, date: "May 5, 2026" },
  { id: 5, name: "Christine Lee", newTier: "Elite" as Tier, date: "May 2, 2026" },
];

const TIER_DONUT_DATA: { tier: Tier; count: number; color: string }[] = [
  { tier: "New", count: 142, color: "#64748B" },
  { tier: "Rising", count: 87, color: "#3B82F6" },
  { tier: "Pro", count: 43, color: "#14B8A6" },
  { tier: "Elite", count: 18, color: "#A855F7" },
  { tier: "Legend", count: 4, color: "#EAB308" },
];

function DonutChart() {
  const total = TIER_DONUT_DATA.reduce((s, d) => s + d.count, 0);
  let cumulative = 0;
  const cx = 60, cy = 60, r = 48, stroke = 14;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="flex items-center gap-6">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {TIER_DONUT_DATA.map((d) => {
          const pct = d.count / total;
          const offset = circumference - pct * circumference;
          const rotation = (cumulative / total) * 360 - 90;
          cumulative += d.count;
          return (
            <circle
              key={d.tier}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={d.color}
              strokeWidth={stroke}
              strokeDasharray={`${pct * circumference} ${circumference}`}
              strokeDashoffset={0}
              transform={`rotate(${rotation} ${cx} ${cy})`}
              style={{ transition: "stroke-dasharray 0.3s" }}
            />
          );
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">{total}</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="8" fill="#94A3B8">total</text>
      </svg>
      <div className="space-y-1.5">
        {TIER_DONUT_DATA.map((d) => (
          <div key={d.tier} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-xs text-slate-300">{d.tier}</span>
            <span className="text-xs font-bold text-white ml-auto pl-3">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const BAR_MAX = Math.max(...UPGRADE_VELOCITY.map((d) => d.upgrades));

function nextTier(current: Tier): Tier | null {
  const idx = TIER_ORDER.indexOf(current);
  return idx < TIER_ORDER.length - 1 ? TIER_ORDER[idx + 1] : null;
}

function isEligible(pro: TierPro): boolean {
  return pro.jobsCompleted >= pro.jobsNeeded;
}

export default function TierUpgradeCenter() {
  const [pros, setPros] = useState<TierPro[]>(MOCK_PROS);
  const [sending, setSending] = useState<number | null>(null);
  const [nudgeSent, setNudgeSent] = useState<Set<number>>(new Set());

  const eligible = pros.filter(isEligible);
  const inProgress = pros.filter((p) => !isEligible(p));

  const tierCounts = TIER_ORDER.reduce<Record<Tier, number>>((acc, t) => {
    acc[t] = pros.filter((p) => p.currentTier === t).length;
    return acc;
  }, {} as Record<Tier, number>);

  function sendInvite(id: number) {
    setSending(id);
    setTimeout(() => {
      setPros((prev) => prev.map((p) => p.id === id ? { ...p, inviteSent: true } : p));
      setSending(null);
      toast.success("Upgrade invite sent!");
    }, 700);
  }

  function sendAllInvites() {
    const pending = eligible.filter((p) => !p.inviteSent);
    if (pending.length === 0) { toast.info("All invites already sent"); return; }
    setPros((prev) => prev.map((p) => isEligible(p) ? { ...p, inviteSent: true } : p));
    toast.success(`${pending.length} upgrade invites sent`);
  }

  function sendNudge(id: number, name: string) {
    setNudgeSent((prev) => new Set(prev).add(id));
    toast.success(`Motivational nudge sent to ${name}!`);
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 bg-[#0A1628] min-h-screen">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="h-6 w-6 text-teal-400" />
              Tier Upgrade Center
            </h1>
            <p className="text-slate-400 mt-1">Pros who have hit job count thresholds for their next tier</p>
          </div>
          <Button
            onClick={sendAllInvites}
            className="bg-teal-600 hover:bg-teal-500 text-white"
          >
            <Send className="h-4 w-4 mr-2" />
            Send All Upgrade Invites ({eligible.filter((p) => !p.inviteSent).length})
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {TIER_ORDER.map((tier) => {
            const Icon = TIER_ICONS[tier];
            return (
              <Card key={tier} className="bg-slate-800/60 border-slate-700">
                <CardContent className="pt-4 pb-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Icon className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs text-slate-400">{tier}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{tierCounts[tier]}</div>
                  <Badge className={`mt-1 text-[10px] border-0 ${TIER_COLORS[tier]}`}>{tier}</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ── Upgrade Pipeline: near threshold ─────────────────────────────── */}
        <Card className="bg-slate-800/60 border-amber-700/40 border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-white flex items-center gap-2">
              <Bell className="h-4 w-4 text-amber-400" />
              Upgrade Pipeline — Almost There
              <Badge className="bg-amber-500/20 text-amber-400 border-0 text-xs ml-auto">{ONE_JOB_AWAY.length} partners</Badge>
            </CardTitle>
            <p className="text-xs text-slate-400">Partners who are 1–3 jobs away from their next tier upgrade</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {ONE_JOB_AWAY.map((p) => {
              const next = nextTier(p.currentTier);
              return (
                <div key={p.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{p.name}</p>
                      <p className="text-xs text-slate-400">{p.trade}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`text-xs border-0 ${TIER_COLORS[p.currentTier]}`}>{p.currentTier}</Badge>
                    <ArrowUpCircle className="h-3 w-3 text-amber-400" />
                    {next && <Badge className={`text-xs border-0 ${TIER_COLORS[next]}`}>{next}</Badge>}
                    <span className="text-xs text-amber-400 font-bold w-20 text-right">
                      {p.jobsNeeded} job{p.jobsNeeded > 1 ? "s" : ""} away
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs border-amber-700/50 text-amber-400 hover:bg-amber-500/10"
                      disabled={nudgeSent.has(p.id)}
                      onClick={() => sendNudge(p.id, p.name)}
                    >
                      {nudgeSent.has(p.id) ? "Sent ✓" : "Nudge"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* ── Tier Distribution + Upgrade Velocity ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-teal-400" />
                Tier Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DonutChart />
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                Upgrade Velocity — Last 6 Months
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 h-28">
                {UPGRADE_VELOCITY.map((d) => (
                  <div key={d.month} className="flex flex-col items-center flex-1 gap-1">
                    <span className="text-xs font-bold text-white">{d.upgrades}</span>
                    <div
                      className="w-full rounded-t bg-teal-500/80 transition-all"
                      style={{ height: `${(d.upgrades / BAR_MAX) * 72}px` }}
                    />
                    <span className="text-[10px] text-slate-400">{d.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Upgrade Eligibility Table ─────────────────────────────────── */}
        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-white flex items-center gap-2">
              <Star className="h-4 w-4 text-purple-400" />
              Upgrade Eligibility — Partners Near Threshold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {NEAR_THRESHOLD_PROS.map((p) => {
                const next = nextTier(p.currentTier);
                return (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="w-28 truncate text-sm text-white">{p.name}</div>
                    <span className="text-xs text-slate-400 w-20 truncate">{p.trade}</span>
                    <Badge className={`text-xs border-0 ${TIER_COLORS[p.currentTier]} w-16 justify-center`}>{p.currentTier}</Badge>
                    <div className="flex-1 flex items-center gap-2">
                      <Progress value={p.pct} className="h-2 flex-1 bg-slate-700 [&>div]:bg-teal-400" />
                      <span className="text-xs text-slate-300 w-9 text-right">{p.pct}%</span>
                    </div>
                    {next && (
                      <div className="flex items-center gap-1 w-24">
                        <ArrowUpCircle className="h-3 w-3 text-teal-400" />
                        <Badge className={`text-[10px] border-0 ${TIER_COLORS[next]}`}>{next}</Badge>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* ── Celebration Log ───────────────────────────────────────────── */}
        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-white flex items-center gap-2">
              \u{1F389} Recent Tier Upgrades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {CELEBRATION_LOG.map((entry) => {
                const Icon = TIER_ICONS[entry.newTier];
                return (
                  <div key={entry.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-900/50">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">\u{1F38A}</span>
                      <div>
                        <p className="text-sm font-medium text-white">{entry.name}</p>
                        <p className="text-xs text-slate-400">{entry.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs">upgraded to</span>
                      <Badge className={`text-xs border-0 ${TIER_COLORS[entry.newTier]} flex items-center gap-1`}>
                        <Icon className="h-3 w-3" />
                        {entry.newTier}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {eligible.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-4 w-4 text-teal-400" />
              <h2 className="text-white font-semibold">Ready to Upgrade ({eligible.length})</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {eligible.map((pro) => {
                const next = nextTier(pro.currentTier);
                const NextIcon = next ? TIER_ICONS[next] : Crown;
                return (
                  <Card key={pro.id} className="bg-slate-800/60 border-teal-700/40 border">
                    <CardContent className="pt-5 pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-white">{pro.name}</p>
                          <p className="text-xs text-slate-400">{pro.trade} · ⭐ {pro.rating}</p>
                        </div>
                        {pro.inviteSent
                          ? <Badge className="bg-emerald-500/20 text-emerald-400 border-0 text-xs">Sent</Badge>
                          : <Badge className="bg-teal-500/20 text-teal-400 border-0 text-xs">Ready</Badge>
                        }
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={`text-xs border-0 ${TIER_COLORS[pro.currentTier]}`}>{pro.currentTier}</Badge>
                        <ArrowUpCircle className="h-3.5 w-3.5 text-teal-400" />
                        {next && <Badge className={`text-xs border-0 ${TIER_COLORS[next]}`}>{next}</Badge>}
                      </div>
                      <div className="mb-1 flex justify-between text-xs text-slate-400">
                        <span>{pro.jobsCompleted} jobs completed</span>
                        <span>Target: {pro.jobsNeeded}</span>
                      </div>
                      <Progress value={100} className="h-1.5 mb-4 bg-slate-700 [&>div]:bg-teal-400" />
                      <Button
                        size="sm"
                        className="w-full bg-teal-600 hover:bg-teal-500 text-white h-8"
                        disabled={pro.inviteSent || sending === pro.id}
                        onClick={() => sendInvite(pro.id)}
                      >
                        {sending === pro.id ? (
                          <span className="flex items-center gap-1.5"><span className="animate-spin">⟳</span> Sending…</span>
                        ) : pro.inviteSent ? (
                          <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> Invite Sent</span>
                        ) : (
                          <span className="flex items-center gap-1.5"><NextIcon className="h-3.5 w-3.5" /> Send Upgrade Invite</span>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {inProgress.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4 text-slate-400" />
              <h2 className="text-white font-semibold">In Progress ({inProgress.length})</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgress.map((pro) => {
                const next = nextTier(pro.currentTier);
                const pct = Math.min(100, Math.round((pro.jobsCompleted / pro.jobsNeeded) * 100));
                return (
                  <Card key={pro.id} className="bg-slate-800/40 border-slate-700">
                    <CardContent className="pt-5 pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-white">{pro.name}</p>
                          <p className="text-xs text-slate-400">{pro.trade} · ⭐ {pro.rating}</p>
                        </div>
                        <Badge className="bg-slate-700 text-slate-300 border-0 text-xs">{pct}%</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={`text-xs border-0 ${TIER_COLORS[pro.currentTier]}`}>{pro.currentTier}</Badge>
                        <ArrowUpCircle className="h-3.5 w-3.5 text-slate-500" />
                        {next && <Badge className={`text-xs border-0 ${TIER_COLORS[next]}`}>{next}</Badge>}
                      </div>
                      <div className="mb-1 flex justify-between text-xs text-slate-400">
                        <span>{pro.jobsCompleted} / {pro.jobsNeeded} jobs</span>
                        <span>{pro.jobsNeeded - pro.jobsCompleted} remaining</span>
                      </div>
                      <Progress value={pct} className="h-1.5 bg-slate-700 [&>div]:bg-slate-500" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
