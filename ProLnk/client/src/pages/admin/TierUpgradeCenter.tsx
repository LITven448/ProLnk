import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowUpCircle, Star, Trophy, Zap, Crown, CheckCircle, Send, Users, TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

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
  New: "bg-slate-500/20 text-slate-400″,
  Rising: "bg-blue-500/20 text-blue-400″,
  Pro: "bg-teal-500/20 text-teal-400″,
  Elite: "bg-purple-500/20 text-purple-400″,
  Legend: "bg-yellow-500/20 text-yellow-400″,
};

const TIER_PIE_COLORS: Record<Tier, string> = {
  New: "#94A3B8″,
  Rising: "#60A5FA",
  Pro: "#2DD4BF",
  Elite: "#A78BFA",
  Legend: "#FBBF24″,
};

const TIER_ICON_COMPS = {
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

const NEAR_THRESHOLD: { id: number; name: string; trade: string; currentTier: Tier; jobsCompleted: number; jobsNeeded: number; jobsLeft: number }[] = [
  { id: 11, name: "Kai Nakamura", trade: "HVAC", currentTier: "New", jobsCompleted: 8, jobsNeeded: 10, jobsLeft: 2 },
  { id: 12, name: "Priya Sharma", trade: "Plumbing", currentTier: "Rising", jobsCompleted: 48, jobsNeeded: 50, jobsLeft: 2 },
  { id: 13, name: "Darnell Brooks", trade: "Electrical", currentTier: "Pro", jobsCompleted: 97, jobsNeeded: 100, jobsLeft: 3 },
  { id: 14, name: "Sofia Mendez", trade: "Roofing", currentTier: "Rising", jobsCompleted: 49, jobsNeeded: 50, jobsLeft: 1 },
  { id: 15, name: "James Whitfield", trade: "General", currentTier: "Pro", jobsCompleted: 98, jobsNeeded: 100, jobsLeft: 2 },
  { id: 16, name: "Yolanda Pierce", trade: "HVAC", currentTier: "Elite", jobsCompleted: 497, jobsNeeded: 500, jobsLeft: 3 },
  { id: 17, name: "Marcus Cole", trade: "Electrical", currentTier: "New", jobsCompleted: 9, jobsNeeded: 10, jobsLeft: 1 },
  { id: 18, name: "Nina Torres", trade: "Plumbing", currentTier: "Rising", jobsCompleted: 47, jobsNeeded: 50, jobsLeft: 3 },
  { id: 19, name: "Andre Webb", trade: "General", currentTier: "Pro", jobsCompleted: 99, jobsNeeded: 100, jobsLeft: 1 },
  { id: 20, name: "Leila Osei", trade: "Roofing", currentTier: "New", jobsCompleted: 8, jobsNeeded: 10, jobsLeft: 2 },
];

const MONTHLY_UPGRADES = [
  { month: "Dec", upgrades: 4 },
  { month: "Jan", upgrades: 7 },
  { month: "Feb", upgrades: 5 },
  { month: "Mar", upgrades: 11 },
  { month: "Apr", upgrades: 9 },
  { month: "May", upgrades: 14 },
];

const CELEBRATION_LOG = [
  { name: "Frank Okafor", from: "Pro" as Tier, to: "Elite" as Tier, date: "May 12″ },
  { name: "Christine Lee", from: "Rising" as Tier, to: "Pro" as Tier, date: "May 10″ },
  { name: "Aisha Patel", from: "New" as Tier, to: "Rising" as Tier, date: "May 8″ },
  { name: "Roberto Vega", from: "New" as Tier, to: "Rising" as Tier, date: "May 7″ },
  { name: "Devon Clarke", from: "New" as Tier, to: "Rising" as Tier, date: "May 5″ },
];

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
  const [nudgedIds, setNudgedIds] = useState<Set<number>>(new Set());

  const eligible = pros.filter(isEligible);
  const inProgress = pros.filter((p) => !isEligible(p));

  const tierCounts = TIER_ORDER.reduce<Record<Tier, number>>((acc, t) => {
    acc[t] = pros.filter((p) => p.currentTier === t).length;
    return acc;
  }, {} as Record<Tier, number>);

  const pieData = TIER_ORDER.filter(t => tierCounts[t] > 0).map(t => ({
    name: t,
    value: tierCounts[t],
    color: TIER_PIE_COLORS[t],
  }));

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

  function nudge(id: number, name: string) {
    setNudgedIds(prev => new Set(prev).add(id));
    toast.success(`Nudge sent to ${name}!`);
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 bg-[#0A1628] min-h-screen">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2″>
              <Trophy className="h-6 w-6 text-teal-400″ />
              Tier Upgrade Center
            </h1>
            <p className="text-slate-400 mt-1″>Pros who have hit job count thresholds for their next tier</p>
          </div>
          <Button
            onClick={sendAllInvites}
            className="bg-teal-600 hover:bg-teal-500 text-white"
          >
            <Send className="h-4 w-4 mr-2″ />
            Send All Upgrade Invites ({eligible.filter((p) => !p.inviteSent).length})
          </Button>
        </div>

        {/* Tier Distribution Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3″>
          {TIER_ORDER.map((tier) => {
            const Icon = TIER_ICON_COMPS[tier];
            return (
              <Card key={tier} className="bg-slate-800/60 border-slate-700″>
                <CardContent className="pt-4 pb-3″>
                  <div className="flex items-center gap-1.5 mb-2″>
                    <Icon className="h-3.5 w-3.5 text-slate-400″ />
                    <span className="text-xs text-slate-400″>{tier}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{tierCounts[tier]}</div>
                  <Badge className={`mt-1 text-[10px] border-0 ${TIER_COLORS[tier]}`}>{tier}</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6″>
          {/* Donut Chart - Tier Distribution */}
          <Card className="bg-slate-800/60 border-slate-700″>
            <CardHeader className="pb-2″>
              <CardTitle className="text-white text-sm font-semibold">Tier Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1E293B", border: "1px solid #334155″, color: "#F8FAFC", borderRadius: 8 }}
                    formatter={(val: number, name: string) => [`${val} pros`, name]}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 11, color: "#94A3B8″ }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bar Chart - Monthly Upgrades */}
          <Card className="bg-slate-800/60 border-slate-700″>
            <CardHeader className="pb-2″>
              <CardTitle className="text-white text-sm font-semibold flex items-center gap-2″>
                <TrendingUp className="h-4 w-4 text-teal-400″ /> Monthly Upgrades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={MONTHLY_UPGRADES} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <XAxis dataKey="month" tick={{ fill: "#94A3B8″, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94A3B8″, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1E293B", border: "1px solid #334155″, color: "#F8FAFC", borderRadius: 8 }}
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  />
                  <Bar dataKey="upgrades" fill="#2DD4BF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Pipeline - Near Threshold */}
        <div>
          <div className="flex items-center gap-2 mb-3″>
            <TrendingUp className="h-4 w-4 text-amber-400″ />
            <h2 className="text-white font-semibold">Upgrade Pipeline — 1–3 Jobs from Next Tier</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3″>
            {NEAR_THRESHOLD.filter(p => p.jobsLeft <= 3).slice(0, 5).map(p => {
              const next = nextTier(p.currentTier);
              const pct = Math.round((p.jobsCompleted / p.jobsNeeded) * 100);
              const isNudged = nudgedIds.has(p.id);
              return (
                <Card key={p.id} className="bg-slate-800/60 border-amber-700/40 border">
                  <CardContent className="pt-4 pb-3″>
                    <div className="flex items-start justify-between mb-2″>
                      <div>
                        <p className="font-semibold text-white text-sm">{p.name}</p>
                        <p className="text-xs text-slate-400″>{p.trade}</p>
                      </div>
                      <Badge className="bg-amber-500/20 text-amber-400 border-0 text-[10px]">{p.jobsLeft} left</Badge>
                    </div>
                    <div className="flex items-center gap-1.5 mb-2″>
                      <Badge className={`text-[10px] border-0 ${TIER_COLORS[p.currentTier]}`}>{p.currentTier}</Badge>
                      <ArrowUpCircle className="h-3 w-3 text-teal-400″ />
                      {next && <Badge className={`text-[10px] border-0 ${TIER_COLORS[next]}`}>{next}</Badge>}
                    </div>
                    <Progress value={pct} className="h-1 mb-3 bg-slate-700 [&>div]:bg-amber-400″ />
                    <Button
                      size="sm"
                      className="w-full h-7 text-xs bg-amber-600 hover:bg-amber-500 text-white"
                      disabled={isNudged}
                      onClick={() => nudge(p.id, p.name)}
                    >
                      {isNudged ? "Nudge Sent ✓" : "Nudge"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Partners Near Threshold Table */}
        <div>
          <div className="flex items-center gap-2 mb-3″>
            <Users className="h-4 w-4 text-slate-400″ />
            <h2 className="text-white font-semibold">All Partners Near Threshold</h2>
          </div>
          <Card className="bg-slate-800/60 border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700″>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Partner</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Trade</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Current Tier</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Progress</th>
                  <th className="text-center px-4 py-3 text-slate-400 font-medium">Jobs Left</th>
                </tr>
              </thead>
              <tbody>
                {NEAR_THRESHOLD.map(p => {
                  const pct = Math.round((p.jobsCompleted / p.jobsNeeded) * 100);
                  return (
                    <tr key={p.id} className="border-b border-slate-700/50 last:border-0″>
                      <td className="px-4 py-3 text-white font-medium">{p.name}</td>
                      <td className="px-4 py-3 text-slate-400″>{p.trade}</td>
                      <td className="px-4 py-3″>
                        <Badge className={`text-[10px] border-0 ${TIER_COLORS[p.currentTier]}`}>{p.currentTier}</Badge>
                      </td>
                      <td className="px-4 py-3″>
                        <div className="flex items-center gap-2″>
                          <Progress value={pct} className="h-1.5 w-24 bg-slate-700 [&>div]:bg-teal-400″ />
                          <span className="text-xs text-slate-400″>{pct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs font-bold ${p.jobsLeft <= 1 ? "text-teal-400" : p.jobsLeft <= 2 ? "text-amber-400" : "text-slate-300"}`}>
                          {p.jobsLeft}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Celebration Log */}
        <div>
          <div className="flex items-center gap-2 mb-3″>
            <Trophy className="h-4 w-4 text-yellow-400″ />
            <h2 className="text-white font-semibold">Recent Tier Upgrades 🎉</h2>
          </div>
          <div className="space-y-2″>
            {CELEBRATION_LOG.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700″>
                <span className="text-lg">🎉</span>
                <div className="flex-1″>
                  <span className="text-white font-semibold text-sm">{item.name}</span>
                  <span className="text-slate-400 text-sm"> upgraded </span>
                  <Badge className={`text-[10px] border-0 ${TIER_COLORS[item.from]}`}>{item.from}</Badge>
                  <span className="text-slate-400 text-sm mx-1″>→</span>
                  <Badge className={`text-[10px] border-0 ${TIER_COLORS[item.to]}`}>{item.to}</Badge>
                </div>
                <span className="text-xs text-slate-500″>{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        {eligible.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3″>
              <CheckCircle className="h-4 w-4 text-teal-400″ />
              <h2 className="text-white font-semibold">Ready to Upgrade ({eligible.length})</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4″>
              {eligible.map((pro) => {
                const next = nextTier(pro.currentTier);
                const NextIcon = next ? TIER_ICON_COMPS[next] : Crown;
                return (
                  <Card key={pro.id} className="bg-slate-800/60 border-teal-700/40 border">
                    <CardContent className="pt-5 pb-4″>
                      <div className="flex items-start justify-between mb-3″>
                        <div>
                          <p className="font-semibold text-white">{pro.name}</p>
                          <p className="text-xs text-slate-400″>{pro.trade} · ⭐ {pro.rating}</p>
                        </div>
                        {pro.inviteSent
                          ? <Badge className="bg-emerald-500/20 text-emerald-400 border-0 text-xs">Sent</Badge>
                          : <Badge className="bg-teal-500/20 text-teal-400 border-0 text-xs">Ready</Badge>
                        }
                      </div>
                      <div className="flex items-center gap-2 mb-3″>
                        <Badge className={`text-xs border-0 ${TIER_COLORS[pro.currentTier]}`}>{pro.currentTier}</Badge>
                        <ArrowUpCircle className="h-3.5 w-3.5 text-teal-400″ />
                        {next && <Badge className={`text-xs border-0 ${TIER_COLORS[next]}`}>{next}</Badge>}
                      </div>
                      <div className="mb-1 flex justify-between text-xs text-slate-400″>
                        <span>{pro.jobsCompleted} jobs completed</span>
                        <span>Target: {pro.jobsNeeded}</span>
                      </div>
                      <Progress value={100} className="h-1.5 mb-4 bg-slate-700 [&>div]:bg-teal-400″ />
                      <Button
                        size="sm"
                        className="w-full bg-teal-600 hover:bg-teal-500 text-white h-8″
                        disabled={pro.inviteSent || sending === pro.id}
                        onClick={() => sendInvite(pro.id)}
                      >
                        {sending === pro.id ? (
                          <span className="flex items-center gap-1.5″><span className="animate-spin">⟳</span> Sending…</span>
                        ) : pro.inviteSent ? (
                          <span className="flex items-center gap-1.5″><CheckCircle className="h-3.5 w-3.5" /> Invite Sent</span>
                        ) : (
                          <span className="flex items-center gap-1.5″><NextIcon className="h-3.5 w-3.5" /> Send Upgrade Invite</span>
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
            <div className="flex items-center gap-2 mb-3″>
              <Users className="h-4 w-4 text-slate-400″ />
              <h2 className="text-white font-semibold">In Progress ({inProgress.length})</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4″>
              {inProgress.map((pro) => {
                const next = nextTier(pro.currentTier);
                const pct = Math.min(100, Math.round((pro.jobsCompleted / pro.jobsNeeded) * 100));
                return (
                  <Card key={pro.id} className="bg-slate-800/40 border-slate-700″>
                    <CardContent className="pt-5 pb-4″>
                      <div className="flex items-start justify-between mb-3″>
                        <div>
                          <p className="font-semibold text-white">{pro.name}</p>
                          <p className="text-xs text-slate-400″>{pro.trade} · ⭐ {pro.rating}</p>
                        </div>
                        <Badge className="bg-slate-700 text-slate-300 border-0 text-xs">{pct}%</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-3″>
                        <Badge className={`text-xs border-0 ${TIER_COLORS[pro.currentTier]}`}>{pro.currentTier}</Badge>
                        <ArrowUpCircle className="h-3.5 w-3.5 text-slate-500″ />
                        {next && <Badge className={`text-xs border-0 ${TIER_COLORS[next]}`}>{next}</Badge>}
                      </div>
                      <div className="mb-1 flex justify-between text-xs text-slate-400″>
                        <span>{pro.jobsCompleted} / {pro.jobsNeeded} jobs</span>
                        <span>{pro.jobsNeeded - pro.jobsCompleted} remaining</span>
                      </div>
                      <Progress value={pct} className="h-1.5 bg-slate-700 [&>div]:bg-slate-500″ />
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
