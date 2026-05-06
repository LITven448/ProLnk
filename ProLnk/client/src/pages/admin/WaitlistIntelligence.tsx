/**
 * Admin Waitlist Intelligence Dashboard
 * Smart activation center for the TrustyPro homeowner waitlist.
 * Features: live analytics, region grouping, referral leaderboard, bulk invite, household insights.
 */
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Users, MapPin, Star, Zap, TrendingUp, Send, Copy, BarChart3,
  Home, Heart, Baby, PawPrint, DollarSign, Clock, Trophy, RefreshCw,
  ChevronDown, ChevronUp, Eye, CheckCircle, Mail, Download
} from "lucide-react";

const ACCENT = "#00B5B8";
const NAVY = "#1e3a5f";

const URGENCY_LABELS: Record<string, string> = {
  urgent: "Urgent",
  soon: "Soon",
  planning: "Planning",
  exploring: "Exploring",
};
const MOTIVATION_LABELS: Record<string, string> = {
  maintenance: "Maintenance",
  selling_soon: "Selling Soon",
  renovation: "Renovation",
  insurance: "Insurance",
  investment: "Investment",
  new_homeowner: "New Homeowner",
  other: "Other",
};

function StatCard({ icon: Icon, label, value, sub, color = ACCENT }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
      </div>
      <p className="text-3xl font-black text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

function BarRow({ label, value, max, color = ACCENT }: { label: string; value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-600 w-28 shrink-0 truncate">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
        <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold text-gray-700 w-8 text-right">{value}</span>
    </div>
  );
}

function VaultBadge({ label, value, color = '#6366f1' }: { label: string; value?: string | number | null; color?: string }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex flex-col bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5 min-w-0">
      <span className="text-xs text-gray-400 font-medium truncate">{label}</span>
      <span className="text-xs font-bold truncate" style={{ color }}>{String(value)}</span>
    </div>
  );
}

function HomeHealthVault({ r }: { r: any }) {
  const features = [
    r.hasSolarPanels && 'Solar Panels',
    r.hasEvCharger && 'EV Charger',
    r.hasWaterSoftener && 'Water Softener',
    r.hasGenerator && 'Generator',
    r.hasPool && 'Pool',
    r.hasBasement && 'Basement',
    r.hasAttic && 'Attic',
  ].filter(Boolean) as string[];
  return (
    <tr>
      <td colSpan={7} className="px-5 pb-4 pt-0 bg-indigo-50/40">
        <div className="border border-indigo-100 rounded-xl p-4 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center"><Home className="w-3.5 h-3.5 text-white" /></div>
            <p className="text-sm font-bold text-indigo-900">Home Health Vault</p>
            <span className="text-xs text-indigo-400">{r.address}, {r.city}, {r.state} {r.zipCode}</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            <div className="bg-indigo-50 rounded-xl p-3">
              <p className="text-xs font-bold text-indigo-700 mb-2">🏠 Roof</p>
              <div className="space-y-1">
                <VaultBadge label="Material" value={r.roofMaterial} color="#4f46e5" />
                <VaultBadge label="Age" value={r.roofAgeYears != null ? `${r.roofAgeYears} yrs` : null} color="#4f46e5" />
                <VaultBadge label="Last Inspection" value={r.roofLastInspectionYear} color="#4f46e5" />
                {r.roofKnownIssues && <div className="text-xs text-red-600 bg-red-50 rounded px-2 py-1 mt-1">⚠ {r.roofKnownIssues}</div>}
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-xs font-bold text-blue-700 mb-2">❄️ HVAC</p>
              <div className="space-y-1">
                <VaultBadge label="Type" value={r.hvacType} color="#2563eb" />
                <VaultBadge label="Brand" value={r.hvacBrand} color="#2563eb" />
                <VaultBadge label="Age" value={r.hvacAgeYears != null ? `${r.hvacAgeYears} yrs` : null} color="#2563eb" />
                <VaultBadge label="Filter" value={r.hvacFilterSize} color="#2563eb" />
                <VaultBadge label="Units" value={r.hvacNumUnits} color="#2563eb" />
                <VaultBadge label="Last Service" value={r.hvacLastServiceYear} color="#2563eb" />
              </div>
            </div>
            <div className="bg-orange-50 rounded-xl p-3">
              <p className="text-xs font-bold text-orange-700 mb-2">🔥 Water & Electrical</p>
              <div className="space-y-1">
                <VaultBadge label="Water Heater" value={r.waterHeaterType} color="#ea580c" />
                <VaultBadge label="WH Brand" value={r.waterHeaterBrand} color="#ea580c" />
                <VaultBadge label="WH Age" value={r.waterHeaterAgeYears != null ? `${r.waterHeaterAgeYears} yrs` : null} color="#ea580c" />
                <VaultBadge label="Panel Amps" value={r.electricalPanelAmps} color="#ea580c" />
                <VaultBadge label="Panel Age" value={r.electricalPanelAgeYears != null ? `${r.electricalPanelAgeYears} yrs` : null} color="#ea580c" />
                {r.electricalKnownIssues && <div className="text-xs text-red-600 bg-red-50 rounded px-2 py-1 mt-1">⚠ {r.electricalKnownIssues}</div>}
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-3">
              <p className="text-xs font-bold text-green-700 mb-2">🔧 Plumbing & Insurance</p>
              <div className="space-y-1">
                <VaultBadge label="Plumbing" value={r.plumbingMaterial} color="#16a34a" />
                {r.plumbingKnownLeaks && <div className="text-xs text-red-600 bg-red-50 rounded px-2 py-1">⚠ Known leaks</div>}
                <VaultBadge label="Insurance" value={r.insuranceCarrier} color="#16a34a" />
                <VaultBadge label="Renewal" value={r.insurancePolicyRenewalMonth} color="#16a34a" />
                {r.hasHomeWarranty && <VaultBadge label="Warranty" value={r.homeWarrantyProvider || 'Yes'} color="#16a34a" />}
                {r.homeWarrantyExpiration && <VaultBadge label="Expires" value={r.homeWarrantyExpiration} color="#16a34a" />}
              </div>
            </div>
          </div>
          {features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {features.map(f => <span key={f} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">{f}</span>)}
            </div>
          )}
          {(r.estimatedImprovementValue || r.lastHomeInspectionYear || r.knownIssues) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {r.estimatedImprovementValue && <span className="text-xs text-gray-600 bg-gray-100 rounded px-2 py-1">Est. Improvements: <strong>{r.estimatedImprovementValue}</strong></span>}
              {r.lastHomeInspectionYear && <span className="text-xs text-gray-600 bg-gray-100 rounded px-2 py-1">Last Inspection: <strong>{r.lastHomeInspectionYear}</strong></span>}
              {r.knownIssues && <span className="text-xs text-red-600 bg-red-50 rounded px-2 py-1">Known Issues: {r.knownIssues}</span>}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function WaitlistIntelligence() {
  const [expandedMarket, setExpandedMarket] = useState<string | null>(null);
  const [invitingMarket, setInvitingMarket] = useState<string | null>(null);
  const [inviteLimit, setInviteLimit] = useState(50);
  const [expandedVault, setExpandedVault] = useState<number | null>(null);

  const { data: analytics, isLoading, refetch } = trpc.waitlist.getWaitlistAnalytics.useQuery(undefined, {
    refetchInterval: 30000,
  });
  const { data: homeWaitlist } = trpc.waitlist.getHomeWaitlist.useQuery({ status: "all", limit: 500 });
  const { data: totalCount } = trpc.waitlist.getHomeWaitlistCount.useQuery();

  const bulkInvite = trpc.waitlist.bulkInviteByMarket.useMutation({
    onSuccess: (data) => {
      toast.success(`Invited ${data.invited} homeowners in ${invitingMarket}!`);
      setInvitingMarket(null);
      refetch();
    },
    onError: (e) => toast.error(e.message || "Invite failed"),
  });

  // Compute household insights from raw waitlist data
  const households = homeWaitlist ?? [];
  const withKids = households.filter((h: any) => (h.numKids ?? 0) > 0).length;
  const withPets = households.filter((h: any) => (h.numPets ?? 0) > 0).length;
  const married = households.filter((h: any) => h.maritalStatus === "married" || h.maritalStatus === "partnered").length;
  const firstTime = households.filter((h: any) => h.isFirstTimeHomeowner).length;
  const urgentCount = households.filter((h: any) => h.urgencyLevel === "urgent").length;
  const invitedCount = households.filter((h: any) => h.status === "invited").length;
  const pendingCount = households.filter((h: any) => h.status === "pending").length;

  // Group by market for the region view
  const marketGroups = (analytics?.byMarket ?? []).reduce((acc: Record<string, number>, m: any) => {
    acc[m.market ?? "Unknown"] = m.count;
    return acc;
  }, {} as Record<string, number>);
  const maxMarketCount = Math.max(...(Object.values(marketGroups) as number[]), 1);

  // Top referrers
  const topReferrers = analytics?.topReferrers ?? [];

  // Recent signups
  const recentSignups = analytics?.recentSignups ?? [];

  // ZIP density
  const byZip = analytics?.byZip ?? [];

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Waitlist Intelligence</h1>
            <p className="text-sm text-gray-500 mt-1">TrustyPro Homeowner Waitlist — Activation Command Center</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const rows = households.map((h: any) => ({
                  name: `${h.firstName ?? ''} ${h.lastName ?? ''}`.trim(),
                  email: h.email ?? '',
                  phone: h.phone ?? '',
                  address: h.address ?? '',
                  city: h.city ?? '',
                  state: h.state ?? '',
                  zip: h.zipCode ?? '',
                  propertyType: h.propertyType ?? '',
                  sqft: h.squareFootage ?? '',
                  yearBuilt: h.yearBuilt ?? '',
                  beds: h.bedrooms ?? '',
                  baths: h.bathrooms ?? '',
                  roofMaterial: h.roofMaterial ?? '',
                  roofAge: h.roofAge ?? '',
                  roofLastInspection: h.roofLastInspection ?? '',
                  roofKnownIssues: h.roofKnownIssues ?? '',
                  hvacBrand: h.hvacBrand ?? '',
                  hvacAge: h.hvacAge ?? '',
                  hvacFilterSize: h.hvacFilterSize ?? '',
                  hvacNumUnits: h.hvacNumUnits ?? '',
                  hvacLastService: h.hvacLastService ?? '',
                  waterHeaterType: h.waterHeaterType ?? '',
                  waterHeaterAge: h.waterHeaterAge ?? '',
                  waterHeaterBrand: h.waterHeaterBrand ?? '',
                  electricalPanelSize: h.electricalPanelSize ?? '',
                  electricalPanelAge: h.electricalPanelAge ?? '',
                  electricalKnownIssues: h.electricalKnownIssues ?? '',
                  plumbingMaterial: h.plumbingMaterial ?? '',
                  plumbingKnownLeaks: h.plumbingKnownLeaks ?? '',
                  insuranceCarrier: h.insuranceCarrier ?? '',
                  insurancePolicyRenewal: h.insurancePolicyRenewal ?? '',
                  homeWarranty: h.hasHomeWarranty ? 'Yes' : 'No',
                  warrantyProvider: h.homeWarrantyProvider ?? '',
                  warrantyExpiration: h.homeWarrantyExpiration ?? '',
                  urgency: h.urgencyLevel ?? '',
                  motivation: h.motivation ?? '',
                  referralCode: h.referralCode ?? '',
                  referralCount: h.referralCount ?? 0,
                  status: h.status ?? '',
                  signupDate: h.createdAt ? new Date(h.createdAt).toLocaleDateString() : '',
                }));
                const headers = Object.keys(rows[0] || {});
                const csv = [headers.join(','), ...rows.map((r: any) => headers.map(h => `"${String(r[h]).replace(/"/g, '""')}"`).join(','))].join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = `trustypro-waitlist-${new Date().toISOString().slice(0,10)}.csv`;
                a.click(); URL.revokeObjectURL(url);
                toast.success(`Exported ${rows.length} homeowner records`);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-teal-200 bg-teal-50 text-sm text-teal-700 hover:bg-teal-100 transition-colors"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-green-700">{totalCount?.count ?? 0} on waitlist</span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-400">Loading intelligence data...</div>
          </div>
        ) : (
          <>
            {/* KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard icon={Users} label="Total Signups" value={totalCount?.count ?? 0} sub="All time" color={ACCENT} />
              <StatCard icon={Clock} label="Pending" value={pendingCount} sub="Awaiting invite" color="#f59e0b" />
              <StatCard icon={Send} label="Invited" value={invitedCount} sub="Launch emails sent" color="#10b981" />
              <StatCard icon={Zap} label="Urgent Need" value={urgentCount} sub="Need help now" color="#ef4444" />
            </div>

            {/* Household Insights Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard icon={Baby} label="Have Kids" value={withKids} sub={`${households.length > 0 ? Math.round((withKids/households.length)*100) : 0}% of signups`} color="#8b5cf6" />
              <StatCard icon={PawPrint} label="Have Pets" value={withPets} sub={`${households.length > 0 ? Math.round((withPets/households.length)*100) : 0}% of signups`} color="#f97316" />
              <StatCard icon={Heart} label="Married/Partnered" value={married} sub={`${households.length > 0 ? Math.round((married/households.length)*100) : 0}% of signups`} color="#ec4899" />
              <StatCard icon={Home} label="First-Time Owners" value={firstTime} sub={`${households.length > 0 ? Math.round((firstTime/households.length)*100) : 0}% of signups`} color="#06b6d4" />
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Region Breakdown + Bulk Invite */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-50">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-500" />
                    <h2 className="font-bold text-gray-900">Launch Markets</h2>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Click a market to bulk-invite homeowners</p>
                </div>
                <div className="p-5 space-y-3">
                  {Object.entries(marketGroups).length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-8">No market data yet</p>
                  ) : (
                    Object.entries(marketGroups)
                      .sort((a, b) => (b[1] as number) - (a[1] as number))
                      .map(([market, count]) => {
                        const countNum = count as number;
                        return (
                        <div key={market} className="border border-gray-100 rounded-xl overflow-hidden">
                          <button
                            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                            onClick={() => setExpandedMarket(expandedMarket === market ? null : market)}
                          >
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-sm font-semibold text-gray-800">{market || "Unknown"}</span>
                                <span className="text-xs font-bold text-gray-600">{countNum} homeowners</span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                <div className="h-1.5 rounded-full" style={{ width: `${Math.round((countNum / maxMarketCount) * 100)}%`, backgroundColor: ACCENT }} />
                              </div>
                            </div>
                            {expandedMarket === market ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                          </button>
                          {expandedMarket === market && (
                            <div className="px-4 pb-4 bg-gray-50 border-t border-gray-100">
                              <p className="text-xs text-gray-500 mt-3 mb-3">
                                Send launch invitations to the top <strong>{Math.min(countNum, inviteLimit)}</strong> pending homeowners in {market}, sorted by priority score.
                              </p>
                              <div className="flex items-center gap-3 mb-3">
                                <label className="text-xs text-gray-600">Invite up to:</label>
                                <input
                                  type="number"
                                  min={1}
                                  max={500}
                                  value={inviteLimit}
                                  onChange={e => setInviteLimit(Math.max(1, Math.min(500, parseInt(e.target.value) || 50)))}
                                  className="w-20 border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center outline-none focus:ring-2 focus:ring-indigo-300"
                                />
                                <span className="text-xs text-gray-400">homeowners</span>
                              </div>
                              <Button
                                onClick={() => {
                                  setInvitingMarket(market);
                                  bulkInvite.mutate({ market, limit: inviteLimit, origin: window.location.origin });
                                }}
                                disabled={bulkInvite.isPending && invitingMarket === market}
                                className="w-full text-white text-sm"
                                style={{ backgroundColor: ACCENT }}
                              >
                                {bulkInvite.isPending && invitingMarket === market ? (
                                  "Sending invites..."
                                ) : (
                                  <><Send className="w-4 h-4 mr-1.5" /> Invite {market} Homeowners</>
                                )}
                              </Button>
                            </div>
                          )}
                        </div>
                        );
                      })
                  )}
                </div>
              </div>

              {/* Motivation & Urgency breakdown */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-purple-500" />
                    <h2 className="font-bold text-gray-900">Primary Motivation</h2>
                  </div>
                  <div className="space-y-2.5">
                    {(analytics?.byMotivation ?? []).map((m: any) => (
                      <BarRow
                        key={m.motivation}
                        label={MOTIVATION_LABELS[m.motivation] ?? m.motivation}
                        value={m.count}
                        max={Math.max(...(analytics?.byMotivation ?? []).map((x: any) => x.count), 1)}
                        color="#8b5cf6"
                      />
                    ))}
                    {(analytics?.byMotivation ?? []).length === 0 && (
                      <p className="text-xs text-gray-400 text-center py-4">No data yet</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <h2 className="font-bold text-gray-900">Urgency Level</h2>
                  </div>
                  <div className="space-y-2.5">
                    {(analytics?.byUrgency ?? []).map((u: any) => (
                      <BarRow
                        key={u.urgency}
                        label={URGENCY_LABELS[u.urgency] ?? u.urgency}
                        value={u.count}
                        max={Math.max(...(analytics?.byUrgency ?? []).map((x: any) => x.count), 1)}
                        color="#f97316"
                      />
                    ))}
                    {(analytics?.byUrgency ?? []).length === 0 && (
                      <p className="text-xs text-gray-400 text-center py-4">No data yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Referral Leaderboard */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-8">
              <div className="p-5 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <h2 className="font-bold text-gray-900">Referral Leaderboard</h2>
                  <span className="text-xs text-gray-400 ml-1">Top advocates driving organic growth</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Rank</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Homeowner</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Email</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Referral Code</th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Referrals</th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Priority Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topReferrers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center text-gray-400 py-8 text-sm">No referrals yet — share the waitlist link!</td>
                      </tr>
                    ) : (
                      topReferrers.map((r: any, i: number) => (
                        <tr key={r.referralCode} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-1">
                              {i === 0 && <Trophy className="w-4 h-4 text-amber-500" />}
                              {i === 1 && <Trophy className="w-4 h-4 text-gray-400" />}
                              {i === 2 && <Trophy className="w-4 h-4 text-amber-700" />}
                              <span className="font-bold text-gray-700">#{i + 1}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 font-medium text-gray-800">{r.name}</td>
                          <td className="px-5 py-3 text-gray-500">{r.email}</td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-1.5">
                              <code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono text-indigo-600">{r.code}</code>
                              <button
                                onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/waitlist/homeowner?ref=${r.code}`); toast.success("Referral link copied!"); }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <Badge className="bg-green-100 text-green-700 border-0">{r.referrals}</Badge>
                          </td>
                          <td className="px-5 py-3 text-right font-bold text-indigo-600">{r.score}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ZIP Code Density */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-5 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-500" />
                  <h2 className="font-bold text-gray-900">ZIP Code Density</h2>
                  <span className="text-xs text-gray-400 ml-1">Neighborhoods heating up — top 30 ZIP codes</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">ZIP Code</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">City</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">State</th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Signups</th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Heat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {byZip.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center text-gray-400 py-8 text-sm">No ZIP data yet — signups will appear here</td>
                      </tr>
                    ) : (
                      byZip.map((z: any, i: number) => {
                        const maxZip = byZip[0]?.count ?? 1;
                        const pct = Math.round((z.count / maxZip) * 100);
                        return (
                          <tr key={z.zip} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-1.5">
                                {i < 3 && <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />}
                                <code className="font-mono font-bold text-gray-800">{z.zip}</code>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-gray-600">{z.city || '—'}</td>
                            <td className="px-5 py-3 text-gray-500">{z.state || '—'}</td>
                            <td className="px-5 py-3 text-right font-bold text-teal-600">{z.count}</td>
                            <td className="px-5 py-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div className="h-full rounded-full bg-teal-400 transition-all" style={{ width: `${pct}%` }} />
                                </div>
                                <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Signups */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-5 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <h2 className="font-bold text-gray-900">Recent Signups</h2>
                  <span className="text-xs text-gray-400 ml-1">Last 20 homeowners</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Name</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Location</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Market</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Projects</th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Score</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSignups.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center text-gray-400 py-8 text-sm">No signups yet</td>
                      </tr>
                    ) : (
                      recentSignups.flatMap((r: any) => {
                        const projects = typeof r.desiredProjects === 'string'
                          ? JSON.parse(r.desiredProjects || '[]')
                          : (r.desiredProjects ?? []);
                        const isExpanded = expandedVault === r.id;
                        const hasVaultData = r.roofMaterial || r.hvacBrand || r.hvacType || r.waterHeaterType || r.electricalPanelAmps || r.plumbingMaterial || r.insuranceCarrier;
                        return [
                          <tr
                            key={r.id}
                            className={`border-b border-gray-50 transition-colors cursor-pointer ${ isExpanded ? 'bg-indigo-50/60' : 'hover:bg-gray-50' }`}
                            onClick={() => setExpandedVault(isExpanded ? null : r.id)}
                          >
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2">
                                <div>
                                  <p className="font-medium text-gray-800">{r.firstName} {r.lastName}</p>
                                  <p className="text-xs text-gray-400">{r.email}</p>
                                </div>
                                {hasVaultData && (
                                  <span className="ml-1 px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded text-xs font-semibold" title="Has Home Health Vault data">🏠</span>
                                )}
                              </div>
                            </td>
                            <td className="px-5 py-3 text-gray-600 text-xs">{r.city}, {r.state} {r.zipCode}</td>
                            <td className="px-5 py-3">
                              {r.launchMarket ? (
                                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">{r.launchMarket}</span>
                              ) : <span className="text-gray-300 text-xs">—</span>}
                            </td>
                            <td className="px-5 py-3">
                              <div className="flex flex-wrap gap-1">
                                {projects.slice(0, 2).map((p: string) => (
                                  <span key={p} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{p}</span>
                                ))}
                                {projects.length > 2 && (
                                  <span className="text-xs text-gray-400">+{projects.length - 2}</span>
                                )}
                              </div>
                            </td>
                            <td className="px-5 py-3 text-right font-bold text-indigo-600">{r.priorityScore}</td>
                            <td className="px-5 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                r.status === 'invited' ? 'bg-blue-100 text-blue-700' :
                                r.status === 'approved' ? 'bg-green-100 text-green-700' :
                                r.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>{r.status}</span>
                            </td>
                            <td className="px-5 py-3 text-xs text-gray-400">
                              <div className="flex items-center gap-1">
                                {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—"}
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-indigo-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-300" />}
                              </div>
                            </td>
                          </tr>,
                          isExpanded ? <HomeHealthVault key={`vault-${r.id}`} r={r} /> : null,
                        ].filter(Boolean);
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
