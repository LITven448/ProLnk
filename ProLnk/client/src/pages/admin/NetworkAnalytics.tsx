import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { TrendingUp, Users, Award, BarChart3 } from "lucide-react";

const TIER_COLORS: Record<string, string> = {
  charter: "#E8A020",
  founding: "#3B82F6",
  level3: "#10B981",
  level4: "#8B5CF6",
};

const TIER_CAPS: Record<string, number> = {
  charter: 25,
  founding: 125,
  level3: 525,
  level4: 2125,
};

export default function NetworkAnalytics() {
  const { data: allPros } = trpc.waitlistAdmin.getProWaitlist.useQuery({ status: "all", limit: 2125 });
  const { data: leaderboard } = trpc.proWaitlist.getLeaderboard.useQuery();

  const pros = allPros || [];
  const total = pros.length;
  
  // Tier breakdown
  const tierCounts = pros.reduce((acc: Record<string, number>, p: any) => {
    const tier = p.tier || "waitlist";
    acc[tier] = (acc[tier] || 0) + 1;
    return acc;
  }, {});

  // Top referrers from our data
  const topReferrers = [...pros]
    .filter((p: any) => (p.referralCount || 0) > 0)
    .sort((a: any, b: any) => (b.referralCount || 0) - (a.referralCount || 0))
    .slice(0, 10);

  // Cities
  const cities = pros.reduce((acc: Record<string, number>, p: any) => {
    const city = p.primaryCity || "Unknown";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});
  const topCities = Object.entries(cities).sort((a, b) => b[1] - a[1]).slice(0, 8);

  return (
    <AdminLayout title="Network Analytics" subtitle="Founding network growth and referral metrics">
      <div className="p-6 space-y-6">

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Signups", value: total, icon: Users, color: "#0A1628" },
            { label: "Spots Remaining", value: Math.max(0, 2125 - total), icon: TrendingUp, color: "#10B981" },
            { label: "Total Referrals Made", value: pros.reduce((s: number, p: any) => s + (p.referralCount || 0), 0), icon: Award, color: "#E8A020" },
            { label: "Avg Referrals/Member", value: total > 0 ? (pros.reduce((s: number, p: any) => s + (p.referralCount || 0), 0) / total).toFixed(1) : "0", icon: BarChart3, color: "#3B82F6" },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">{stat.label}</span>
                <stat.icon style={{ width: 16, height: 16, color: stat.color }} />
              </div>
              <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Tier fill progress */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Tier Fill Progress</h3>
          <div className="space-y-4">
            {Object.entries(TIER_CAPS).map(([tier, cap]) => {
              const count = tierCounts[tier] || 0;
              const pct = Math.min(100, Math.round((count / cap) * 100));
              const tierName = { charter: "Charter Member", founding: "Founding Member", level3: "Level 3 Partner", level4: "Level 4 Partner" }[tier] || tier;
              return (
                <div key={tier}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium" style={{ color: TIER_COLORS[tier] }}>{tierName}</span>
                    <span className="text-gray-500">{count} / {cap} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, background: TIER_COLORS[tier] }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top referrers */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Top Referrers</h3>
            {topReferrers.length === 0 ? (
              <p className="text-gray-400 text-sm">No referrals yet</p>
            ) : (
              <div className="space-y-3">
                {topReferrers.map((pro: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{pro.firstName} {(pro.lastName || "")[0]}.</span>
                      <span className="text-xs text-gray-500 ml-2">{pro.businessType} · {pro.primaryCity}</span>
                    </div>
                    <span className="text-sm font-bold text-green-600">{pro.referralCount} refs</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top cities */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Top Cities</h3>
            <div className="space-y-2">
              {topCities.map(([city, count]) => (
                <div key={city} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{city}</span>
                  <span className="text-sm font-semibold text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
