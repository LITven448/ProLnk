import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Award, Search, TrendingUp, CheckCircle, XCircle, ArrowDown, Star, Zap, Activity } from "lucide-react";

const LEVEL_META: Record<number, { name: string; cap: number; color: string; bg: string; border: string; accent: string }> = {
  1: { name: "Charter",  cap: 25,   color: "#FCD34D", bg: "rgba(252,211,77,0.12)",  border: "rgba(252,211,77,0.25)",  accent: "#F59E0B" },
  2: { name: "Founding", cap: 100,  color: "#60A5FA", bg: "rgba(96,165,250,0.12)",  border: "rgba(96,165,250,0.25)",  accent: "#3B82F6″ },
  3: { name: "L3″,       cap: 400,  color: "#A78BFA", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.25)", accent: "#7C3AED" },
  4: { name: "L4″,       cap: 1600, color: "#6EE7B7", bg: "rgba(110,231,183,0.12)", border: "rgba(110,231,183,0.25)", accent: "#10B981" },
};

const OVERRIDE_RATES: Record<number, { jobPct: string; subPct: string }> = {
  1: { jobPct: "7%",  subPct: "12%" },
  2: { jobPct: "4%",  subPct: "6%"  },
  3: { jobPct: "2%",  subPct: "3%"  },
  4: { jobPct: "1%",  subPct: "1.5%" },
};

const MOCK_TOP_EARNERS = [
  { name: "Marcus W.", level: 1, trade: "HVAC", monthly: 4820, downline: 18, jobs: 22 },
  { name: "Priya S.",  level: 1, trade: "Plumbing", monthly: 3940, downline: 14, jobs: 19 },
  { name: "Tyler B.",  level: 2, trade: "Electrical", monthly: 2710, downline: 31, jobs: 27 },
  { name: "Dana K.",   level: 1, trade: "Roofing", monthly: 2580, downline: 11, jobs: 15 },
  { name: "James O.",  level: 2, trade: "HVAC", monthly: 2340, downline: 24, jobs: 21 },
];

const MOCK_TOP_RECRUITERS = [
  { name: "Marcus W.", level: 1, recruitsThisMonth: 6, totalDownline: 18 },
  { name: "Tyler B.",  level: 2, recruitsThisMonth: 5, totalDownline: 31 },
  { name: "Sandra P.", level: 1, recruitsThisMonth: 4, totalDownline: 12 },
];

const MOCK_LEVEL_COUNTS = { 1: 19, 2: 63, 3: 187, 4: 412 };
const MOCK_PENDING_PAYOUT = 48240;

export default function NetworkOverview() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<number | "all">("all");

  const { data, isLoading } = trpc.network.adminGetNetworkOverview.useQuery(undefined, { retry: false });

  const pros = data?.pros ?? [];
  const byLevel = data?.byLevel ?? MOCK_LEVEL_COUNTS;
  const pendingPayout = data?.pendingPayoutTotal ?? MOCK_PENDING_PAYOUT;

  const totalPartners = Object.values(byLevel).reduce((a, b) => a + b, 0);
  const totalCap = 25 + 100 + 400 + 1600;
  const networkHealthScore = Math.round(
    ((byLevel[1] / 25) * 40) + ((byLevel[2] / 100) * 30) + ((byLevel[3] / 400) * 20) + ((byLevel[4] / 1600) * 10)
  );

  const filtered = pros.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !q || (p.businessName ?? "").toLowerCase().includes(q) || (p.email ?? "").toLowerCase().includes(q) || p.referralCode.toLowerCase().includes(q);
    const matchLevel = levelFilter === "all" || p.networkLevel === levelFilter;
    return matchSearch && matchLevel;
  });

  return (
    <AdminLayout title="Network Overview" subtitle="Partner network structure, income cascade, and tier health">
      <div className="space-y-6″>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4″>
          {([1, 2, 3, 4] as const).map(lvl => {
            const meta = LEVEL_META[lvl];
            const count = byLevel[lvl] ?? 0;
            const pct = Math.min(100, Math.round((count / meta.cap) * 100));
            return (
              <Card key={lvl} className="bg-[#0d1b2e] border-white/10″>
                <CardContent className="p-4″>
                  <div className="flex items-center justify-between mb-2″>
                    <p className="text-xs font-semibold" style={{ color: meta.color }}>{meta.name} Partner</p>
                    <span className="text-xs text-gray-500″>{count}/{meta.cap}</span>
                  </div>
                  <p className="text-3xl font-black mb-2″ style={{ color: meta.color }}>
                    {isLoading ? "—" : count}
                  </p>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: meta.color }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1″>{pct}% of cap filled</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Payout + Health Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4″>
          <Card className="bg-[#0d1b2e] border-white/10 md:col-span-2″>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3″>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-emerald-400″ />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Pending Payouts This Month</p>
                  <p className="text-xs text-gray-500″>Disbursed at end of month · $50 minimum threshold</p>
                </div>
              </div>
              <p className="text-3xl font-black text-emerald-400″>
                {isLoading ? "—" : `$${pendingPayout.toLocaleString()}`}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0d1b2e] border-white/10″>
            <CardContent className="p-4″>
              <div className="flex items-center gap-2 mb-2″>
                <Activity className="w-4 h-4 text-blue-400″ />
                <p className="text-sm font-semibold text-white">Network Health</p>
              </div>
              <div className="flex items-end gap-2″>
                <p className="text-4xl font-black text-blue-400″>{networkHealthScore}</p>
                <p className="text-xs text-gray-500 mb-1″>/100</p>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mt-2″>
                <div className="h-full rounded-full bg-blue-400 transition-all" style={{ width: `${networkHealthScore}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-1″>Based on tier fill rates</p>
            </CardContent>
          </Card>
        </div>

        {/* Network Tree Visualization */}
        <Card className="bg-[#0d1b2e] border-white/10″>
          <CardHeader className="pb-3″>
            <CardTitle className="text-sm text-white flex items-center gap-2″>
              <Users className="w-4 h-4 text-indigo-400″ />
              Network Tree — 4-Level Cascade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-0 py-2″>
              {([1, 2, 3, 4] as const).map((lvl, idx) => {
                const meta = LEVEL_META[lvl];
                const count = byLevel[lvl] ?? 0;
                const override = OVERRIDE_RATES[lvl];
                const widthPct = [20, 40, 65, 90][idx];
                return (
                  <div key={lvl} className="flex flex-col items-center w-full">
                    {idx > 0 && (
                      <div className="flex flex-col items-center">
                        <ArrowDown className="w-4 h-4 text-gray-600″ />
                        <div className="flex items-center gap-3 my-1″>
                          <span className="text-xs text-gray-500 font-mono">Job override → {OVERRIDE_RATES[lvl].jobPct}</span>
                          <span className="text-xs text-gray-500 font-mono">Sub override → {OVERRIDE_RATES[lvl].subPct}</span>
                        </div>
                      </div>
                    )}
                    <div
                      className="rounded-xl border flex items-center justify-between px-4 py-3 transition-all"
                      style={{
                        width: `${widthPct}%`,
                        backgroundColor: meta.bg,
                        borderColor: meta.border,
                      }}
                    >
                      <div className="flex items-center gap-2″>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.color }} />
                        <span className="text-xs font-bold" style={{ color: meta.color }}>
                          L{lvl} {meta.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-4″>
                        <span className="text-xs text-gray-400″>{count} / {meta.cap} spots</span>
                        <span className="text-xs font-mono font-bold" style={{ color: meta.color }}>
                          {override.jobPct} job · {override.subPct} sub
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10″>
              <p className="text-xs text-gray-400 text-center">
                Income flows <span className="text-white font-semibold">upward</span> through the cascade.
                A Charter (L1) partner earns overrides from all 4 levels below them.
                Total addressable network: <span className="text-white font-semibold">{totalCap.toLocaleString()} partners</span> · Currently filled: <span className="text-indigo-300 font-semibold">{totalPartners}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Top Earners + Top Recruiters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4″>
          <Card className="bg-[#0d1b2e] border-white/10″>
            <CardHeader className="pb-3″>
              <CardTitle className="text-sm text-white flex items-center gap-2″>
                <Star className="w-4 h-4 text-amber-400″ />
                Top Earners This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3″>
                {MOCK_TOP_EARNERS.map((e, i) => {
                  const meta = LEVEL_META[e.level];
                  return (
                    <div key={e.name} className="flex items-center gap-3″>
                      <span className="text-sm font-black text-gray-600 w-5″>#{i + 1}</span>
                      <div className="flex-1 min-w-0″>
                        <div className="flex items-center gap-2″>
                          <p className="text-sm font-semibold text-white truncate">{e.name}</p>
                          <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0″
                            style={{ backgroundColor: meta.bg, color: meta.color }}>
                            {meta.name}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500″>{e.trade} · {e.downline} downline · {e.jobs} jobs</p>
                      </div>
                      <p className="text-sm font-black text-emerald-400 flex-shrink-0″>${e.monthly.toLocaleString()}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0d1b2e] border-white/10″>
            <CardHeader className="pb-3″>
              <CardTitle className="text-sm text-white flex items-center gap-2″>
                <Zap className="w-4 h-4 text-emerald-400″ />
                Fastest Growing Recruiters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4″>
                {MOCK_TOP_RECRUITERS.map((r, i) => {
                  const meta = LEVEL_META[r.level];
                  return (
                    <div key={r.name}>
                      <div className="flex items-center justify-between mb-1″>
                        <div className="flex items-center gap-2″>
                          <span className="text-sm font-black text-gray-600″>#{i + 1}</span>
                          <p className="text-sm font-semibold text-white">{r.name}</p>
                          <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                            style={{ backgroundColor: meta.bg, color: meta.color }}>
                            {meta.name}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-emerald-400″>+{r.recruitsThisMonth} this month</p>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-400″ style={{ width: `${(r.recruitsThisMonth / 6) * 100}%` }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5″>{r.totalDownline} total downline</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20″>
                <p className="text-xs text-emerald-300 font-semibold mb-0.5″>Viral Coefficient</p>
                <p className="text-2xl font-black text-emerald-300″>1.8</p>
                <p className="text-xs text-emerald-300/60″>avg recruits per active partner</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partner Table */}
        <Card className="bg-[#0d1b2e] border-white/10″>
          <CardHeader className="pb-3″>
            <div className="flex flex-col sm:flex-row gap-3″>
              <div className="relative flex-1″>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500″ />
                <Input
                  placeholder="Search by name, email, or ref code..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-600″
                />
              </div>
              <div className="flex gap-1 flex-wrap">
                {(["all", 1, 2, 3, 4] as const).map(l => {
                  const meta = l !== "all" ? LEVEL_META[l] : null;
                  return (
                    <button
                      key={l}
                      onClick={() => setLevelFilter(l)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={
                        levelFilter === l
                          ? { backgroundColor: meta?.color ?? "#6366f1″, color: "#0a0f1e" }
                          : { backgroundColor: "rgba(255,255,255,0.05)", color: "#9CA3AF", border: "1px solid rgba(255,255,255,0.1)" }
                      }
                    >
                      {l === "all" ? "All" : `L${l} ${meta?.name}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0″>
            {isLoading ? (
              <div className="p-8 text-center text-sm text-gray-500″>Loading network data...</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-500″>No partners match your filters.</div>
            ) : (
              <div className="divide-y divide-white/5″>
                {filtered.map(pro => {
                  const meta = LEVEL_META[pro.networkLevel] ?? LEVEL_META[4];
                  return (
                    <div key={pro.userId} className="p-4 hover:bg-white/5 transition-colors">
                      <div className="flex items-start justify-between gap-3″>
                        <div className="flex-1 min-w-0″>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-white truncate">{pro.businessName}</p>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: meta.bg, color: meta.color }}>
                              L{pro.networkLevel} {meta.name}
                            </span>
                            {pro.subscriptionActive
                              ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0″ />
                              : <XCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0″ />}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5″>{pro.email} · Ref: <span className="font-mono text-gray-400">{pro.referralCode}</span></p>
                          <p className="text-xs text-gray-600 mt-0.5″>{pro.trade}</p>
                        </div>
                        <div className="text-right flex-shrink-0″>
                          <p className="text-sm font-black text-emerald-400″>${pro.monthlyIncome.toFixed(2)}</p>
                          <p className="text-xs text-gray-500″>this month</p>
                          <p className="text-xs text-gray-600 mt-1″>{pro.downlineCount} downline · {pro.jobsThisMonth} jobs</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
