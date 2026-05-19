import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Users, Trophy, AlertTriangle, TrendingUp, Star, ChevronDown, ChevronUp, Search, Filter, RefreshCw, Info, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "wouter";

const TIER_COLORS: Record<string, string> = { bronze: "#CD7F32", silver: "#A8A9AD", gold: "#D4AF37" };
const TIER_THRESHOLDS = { bronze: 0, silver: 10, gold: 25 };

function computeHealthScore(partner: any): number {
  let score = 0;
  const jobs = partner.jobCount ?? 0;
  const opps = partner.opportunitiesGenerated ?? 0;
  const refs = partner.referralCount ?? 0;
  // Jobs logged (max 40 pts)
  score += Math.min(40, jobs * 4);
  // Opportunities generated (max 30 pts)
  score += Math.min(30, opps * 3);
  // Referrals sent (max 30 pts)
  score += Math.min(30, refs * 3);
  return Math.min(100, score);
}

function HealthBar({ score }: { score: number }) {
  const color = score >= 70 ? "#10B981" : score >= 40 ? "#F59E0B" : "#EF4444";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#1E3A5F" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-mono w-7 text-right" style={{ color }}>{score}</span>
    </div>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const color = TIER_COLORS[tier] ?? "#00B5B8";
  return (
    <span className="text-xs font-heading px-2 py-0.5 rounded-full uppercase" style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}>
      {tier}
    </span>
  );
}

function TierProgress({ referralCount }: { referralCount: number }) {
  const toGold = Math.max(0, 25 - referralCount);
  const toSilver = Math.max(0, 10 - referralCount);
  const pct = referralCount >= 25 ? 100 : referralCount >= 10 ? ((referralCount - 10) / 15) * 100 : (referralCount / 10) * 100;
  const nextTier = referralCount >= 25 ? "Gold" : referralCount >= 10 ? "Gold" : "Silver";
  const needed = referralCount >= 25 ? 0 : referralCount >= 10 ? toGold : toSilver;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1" style={{ color: "#7B809A" }}>
        <span>Tier Progress</span>
        {needed > 0 && <span style={{ color: "#00B5B8" }}>{needed} to {nextTier}</span>}
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#1E3A5F" }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #CD7F32, #A8A9AD, #D4AF37)" }} />
      </div>
    </div>
  );
}

// PPS score bar component
function PPSBar({ score, partnerId }: { score: number | null; partnerId: number }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { data: breakdown } = trpc.admin.getPartnerPriorityScore.useQuery(
    { partnerId },
    { enabled: showTooltip }
  );
  const s = score ?? 0;
  const color = s >= 80 ? "#10B981" : s >= 50 ? "#F59E0B" : "#EF4444";
  return (
    <div className="relative flex items-center gap-2" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#1E3A5F", minWidth: 48 }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, s)}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-mono w-7 text-right" style={{ color }}>{s}</span>
      <Info className="w-3 h-3 cursor-help" style={{ color: "#7B809A" }} />
      {showTooltip && (
        <div className="absolute left-0 top-6 z-50 w-64 rounded-xl border p-3 shadow-xl text-xs" style={{ backgroundColor: "#0A1628", borderColor: "#E9ECEF" }}>
          <p className="font-semibold text-gray-800 mb-2">PPS Breakdown</p>
          {breakdown ? (
            <div className="space-y-1.5">
              {[
                { label: "Tier", value: breakdown.tier, max: 30 },
                { label: "Close Rate", value: breakdown.closeRate, max: 20 },
                { label: "Accept Rate", value: breakdown.acceptanceRate, max: 15 },
                { label: "Photos", value: breakdown.photoScore, max: 15 },
                { label: "Reviews", value: breakdown.reviewScore, max: 10 },
                { label: "Referrals", value: breakdown.networkReferrals, max: 5 },
                { label: "Response Speed", value: breakdown.responseSpeed, max: 5 },
                { label: "Founding Bonus", value: breakdown.foundingBonus, max: 5 },
              ].map(sig => (
                <div key={sig.label} className="flex items-center gap-2">
                  <span className="w-28 truncate" style={{ color: "#9CA3AF" }}>{sig.label}</span>
                  <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#1E3A5F" }}>
                    <div className="h-full rounded-full" style={{ width: `${(sig.value / sig.max) * 100}%`, backgroundColor: "#00B5B8" }} />
                  </div>
                  <span className="w-10 text-right font-mono" style={{ color: "#00B5B8" }}>{sig.value}/{sig.max}</span>
                </div>
              ))}
              <div className="border-t pt-1.5 mt-1.5 flex justify-between" style={{ borderColor: "#E9ECEF" }}>
                <span style={{ color: "#7B809A" }}>Total PPS</span>
                <span className="font-bold" style={{ color: "#00B5B8" }}>{breakdown.total}/105</span>
              </div>
            </div>
          ) : (
            <p style={{ color: "#7B809A" }}>Loading breakdown...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function PartnerIntelligence() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"health" | "referrals" | "jobs" | "commission" | "pps">("health");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [recalculating, setRecalculating] = useState(false);

  const { data: partners, isLoading, refetch } = trpc.admin.getAllPartners.useQuery();
  const recalcMutation = trpc.admin.recalculatePartnerScores.useMutation({
    onSuccess: (result) => {
      toast.success(`PPS recalculated for ${result.updated} partners`);
      setRecalculating(false);
      refetch();
    },
    onError: () => {
      toast.error("Recalculation failed");
      setRecalculating(false);
    },
  });

  const handleRecalculate = () => {
    setRecalculating(true);
    recalcMutation.mutate();
  };

  const filtered = (partners ?? [])
    .filter((p: any) =>
      p.businessName.toLowerCase().includes(search.toLowerCase()) ||
      p.businessType.toLowerCase().includes(search.toLowerCase())
    )
    .map((p: any) => ({ ...p, healthScore: computeHealthScore(p) }))
    .sort((a: any, b: any) => {
      if (sortBy === "health") return b.healthScore - a.healthScore;
      if (sortBy === "referrals") return (b.referralCount ?? 0) - (a.referralCount ?? 0);
      if (sortBy === "jobs") return (b.jobCount ?? 0) - (a.jobCount ?? 0);
      if (sortBy === "commission") return Number(b.commissionOwed ?? 0) - Number(a.commissionOwed ?? 0);
      if (sortBy === "pps") return (b.priorityScore ?? 0) - (a.priorityScore ?? 0);
      return 0;
    });

  const top5 = [...filtered].sort((a: any, b: any) => (b.referralCount ?? 0) - (a.referralCount ?? 0)).slice(0, 5);
  const churnRisk = filtered.filter((p: any) => p.healthScore < 30);

  const tierDist = { bronze: 0, silver: 0, gold: 0 };
  filtered.forEach((p: any) => { tierDist[p.tier as keyof typeof tierDist] = (tierDist[p.tier as keyof typeof tierDist] ?? 0) + 1; });

  return (
    <AdminLayout title="Partner Intelligence" subtitle="Health scores, tier progression, and churn risk">
      {/* Summary row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Partners", value: filtered.length, icon: Users, color: "#00B5B8" },
          { label: "Gold Tier", value: tierDist.gold, icon: Trophy, color: "#D4AF37" },
          { label: "Churn Risk", value: churnRisk.length, icon: AlertTriangle, color: "#EF4444" },
          { label: "Avg Health Score", value: filtered.length ? Math.round(filtered.reduce((s: number, p: any) => s + p.healthScore, 0) / filtered.length) : 0, icon: TrendingUp, color: "#10B981" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border p-4" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
              <span className="text-xs" style={{ color: "#7B809A" }}>{s.label}</span>
            </div>
            <div className="font-heading text-3xl" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        {/* Leaderboard */}
        <div className="rounded-xl border p-5" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-4 h-4" style={{ color: "#D4AF37" }} />
            <h3 className="font-bold text-[#344767] text-base">Top Performers</h3>
          </div>
          <div className="space-y-3">
            {top5.length === 0 && <p className="text-xs text-center py-4" style={{ color: "#7B809A" }}>No partners yet</p>}
            {top5.map((p: any, i: number) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-heading flex-shrink-0" style={{
                  backgroundColor: i === 0 ? "#D4AF3720" : i === 1 ? "#A8A9AD20" : i === 2 ? "#CD7F3220" : "#1E3A5F",
                  color: i === 0 ? "#D4AF37" : i === 1 ? "#A8A9AD" : i === 2 ? "#CD7F32" : "#4A6FA5",
                }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{p.businessName}</div>
                  <div className="text-xs" style={{ color: "#7B809A" }}>{p.referralCount ?? 0} referrals</div>
                </div>
                <TierBadge tier={p.tier} />
              </div>
            ))}
          </div>
        </div>

        {/* Tier distribution */}
        <div className="rounded-xl border p-5" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
          <h3 className="font-bold text-[#344767] text-base mb-4">Tier Distribution</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.entries(tierDist).map(([tier, count]) => ({ tier: tier.charAt(0).toUpperCase() + tier.slice(1), count }))} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" vertical={false} />
                <XAxis dataKey="tier" tick={{ fill: "#7B809A", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#7B809A", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #E9ECEF", borderRadius: 8, color: "#fff" }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="#00B5B8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {Object.entries(tierDist).map(([tier, count]) => (
              <div key={tier} className="rounded-lg p-2 text-center" style={{ backgroundColor: "#0A1628" }}>
                <div className="font-heading text-lg" style={{ color: TIER_COLORS[tier] }}>{count}</div>
                <div className="text-xs capitalize" style={{ color: "#7B809A" }}>{tier}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Churn risk */}
        <div className="rounded-xl border p-5" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4" style={{ color: "#EF4444" }} />
            <h3 className="font-bold text-[#344767] text-base">Churn Risk</h3>
          </div>
          {churnRisk.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Star className="w-8 h-8 mb-2" style={{ color: "#10B981" }} />
              <p className="text-sm font-medium text-gray-800">All partners healthy</p>
              <p className="text-xs mt-1" style={{ color: "#7B809A" }}>No churn risk detected</p>
            </div>
          ) : (
            <div className="space-y-2">
              {churnRisk.slice(0, 5).map((p: any) => (
                <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-lg" style={{ backgroundColor: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">{p.businessName}</div>
                    <div className="text-xs" style={{ color: "#7B809A" }}>Health: {p.healthScore}/100</div>
                  </div>
                  <TierBadge tier={p.tier} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Partner table */}
      <div className="rounded-xl border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
        <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: "#E9ECEF" }}>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#7B809A" }} />
            <Input
              placeholder="Search partners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm border-0 text-gray-800 placeholder:text-slate-500"
              style={{ backgroundColor: "#0A1628" }}
            />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={handleRecalculate}
              disabled={recalculating}
              className="h-8 text-xs gap-1.5 border-0"
              style={{ backgroundColor: "rgba(0,181,184,0.1)", color: "#00B5B8" }}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${recalculating ? "animate-spin" : ""}`} />
              {recalculating ? "Recalculating..." : "Recalculate All Scores"}
            </Button>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: "#7B809A" }}>
            <Filter className="w-3.5 h-3.5" />
            Sort:
            {(["health", "referrals", "jobs", "commission", "pps"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className="px-2 py-1 rounded capitalize transition-colors"
                style={{
                  backgroundColor: sortBy === s ? "rgba(0,181,184,0.15)" : "transparent",
                  color: sortBy === s ? "#00B5B8" : "#4A6FA5",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #1E3A5F" }}>
                {["Partner", "Type", "Tier", "Health", "PPS", "Referrals", "Jobs", "Commission Owed", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: "#7B809A" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-sm" style={{ color: "#7B809A" }}>Loading partners...</td></tr>
              )}
              {!isLoading && filtered.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-sm" style={{ color: "#7B809A" }}>No partners found</td></tr>
              )}
              {filtered.map((p: any) => (
                <>
                  <tr
                    key={p.id}
                    className="border-b cursor-pointer transition-colors hover:bg-white/3"
                    style={{ borderColor: "#E9ECEF" }}
                    onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{p.businessName}</div>
                      <div className="text-xs" style={{ color: "#7B809A" }}>{p.contactEmail}</div>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#9CA3AF" }}>{p.businessType}</td>
                    <td className="px-4 py-3"><TierBadge tier={p.tier} /></td>
                    <td className="px-4 py-3 w-32"><HealthBar score={p.healthScore} /></td>
                    <td className="px-4 py-3 w-36"><PPSBar score={p.priorityScore ?? null} partnerId={p.id} /></td>
                    <td className="px-4 py-3 font-bold text-[#344767]">{p.referralCount ?? 0}</td>
                    <td className="px-4 py-3 font-bold text-[#344767]">{p.jobCount ?? 0}</td>
                    <td className="px-4 py-3 font-heading" style={{ color: "#10B981" }}>${Number(p.commissionOwed ?? 0).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      {expandedId === p.id ? <ChevronUp className="w-4 h-4" style={{ color: "#7B809A" }} /> : <ChevronDown className="w-4 h-4" style={{ color: "#7B809A" }} />}
                    </td>
                  </tr>
                  {expandedId === p.id && (
                    <tr key={`${p.id}-exp`} style={{ backgroundColor: "#0A1628" }}>
                      <td colSpan={9} className="px-6 py-4">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <div className="text-xs mb-1" style={{ color: "#7B809A" }}>Service Area</div>
                            <div className="text-sm text-gray-800">{p.serviceArea}</div>
                          </div>
                          <div>
                            <div className="text-xs mb-1" style={{ color: "#7B809A" }}>Contact</div>
                            <div className="text-sm text-gray-800">{p.contactPhone}</div>
                          </div>
                          <div>
                            <div className="text-xs mb-1" style={{ color: "#7B809A" }}>Opportunities Generated</div>
                            <div className="text-sm font-heading" style={{ color: "#8B5CF6" }}>{p.opportunitiesGenerated ?? 0}</div>
                          </div>
                          <div>
                            <TierProgress referralCount={p.referralCount ?? 0} />
                          </div>
                          <div className="col-span-2 lg:col-span-4 pt-2 border-t flex justify-end" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                            <Link href={`/admin/partners/${p.id}/report`}>
                              <Button size="sm" className="gap-1.5 bg-[#00B5B8] hover:bg-[#009a9d] text-white">
                                <FileText className="w-3.5 h-3.5" /> Export Performance Report
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
