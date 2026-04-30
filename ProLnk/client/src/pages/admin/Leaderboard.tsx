import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Trophy, TrendingUp, DollarSign, Send, Star, Medal, Award, ExternalLink } from "lucide-react";

const TIER_COLORS: Record<string, string> = {
  founding: "bg-purple-100 text-purple-700 border-purple-200",
  platinum: "bg-slate-100 text-slate-700 border-slate-200",
  gold: "bg-yellow-100 text-yellow-700 border-yellow-200",
  silver: "bg-gray-100 text-gray-600 border-gray-200",
  bronze: "bg-orange-100 text-orange-700 border-orange-200",
};

const RANK_ICONS = [
  <Trophy className="w-5 h-5 text-yellow-500" />,
  <Medal className="w-5 h-5 text-slate-400" />,
  <Award className="w-5 h-5 text-orange-400" />,
];

type SortKey = "referralCount" | "jobsLogged" | "totalCommissionEarned" | "leadsCount";

export default function Leaderboard() {
  const { data: partners, isLoading } = trpc.admin.getAllPartners.useQuery();
  const [sortKey, setSortKey] = React.useState<SortKey>("referralCount");

  const sorted = React.useMemo(() => {
    if (!partners) return [];
    return [...partners]
      .filter((p) => p.status === "approved")
      .sort((a, b) => {
        if (sortKey === "totalCommissionEarned") {
          return (Number(b.totalCommissionEarned ?? 0)) - (Number(a.totalCommissionEarned ?? 0));
        }
        return (Number(b[sortKey] ?? 0)) - (Number(a[sortKey] ?? 0));
      });
  }, [partners, sortKey]);

  const tabs: { key: SortKey; label: string; icon: React.ReactNode }[] = [
    { key: "referralCount", label: "Referrals Sent", icon: <Send className="w-4 h-4" /> },
    { key: "jobsLogged", label: "Jobs Logged", icon: <TrendingUp className="w-4 h-4" /> },
    { key: "leadsCount", label: "Leads Received", icon: <Star className="w-4 h-4" /> },
    { key: "totalCommissionEarned", label: "Commissions Earned", icon: <DollarSign className="w-4 h-4" /> },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Partner Leaderboard</h1>
            <p className="text-sm text-slate-400">Ranked by performance across the ProLnk network</p>
          </div>
        </div>

        {/* Sort Tabs */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSortKey(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                sortKey === tab.key
                  ? "bg-teal-500 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Leaderboard */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-slate-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="bg-slate-800 rounded-xl p-12 text-center">
            <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No approved partners yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map((partner, index) => {
              const value =
                sortKey === "totalCommissionEarned"
                  ? `$${Number(partner.totalCommissionEarned ?? 0).toFixed(2)}`
                  : String(partner[sortKey] ?? 0);
              const tierClass = TIER_COLORS[partner.tier ?? "bronze"] ?? TIER_COLORS.bronze;

              return (
                <div
                  key={partner.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${index >= 3 ? "bg-slate-800 border-slate-700" : ""}`}
                  style={index < 3 ? {
                    backgroundColor: index === 0 ? "#ffd700" : index === 1 ? "#e5e4e2" : "#a97142",
                    borderColor: index === 0 ? "#e6c200" : index === 1 ? "#c8c7c5" : "#8a5c30",
                  } : undefined}
                >
                  {/* Rank */}
                  <div className="w-10 flex items-center justify-center flex-shrink-0">
                    {index < 3 ? RANK_ICONS[index] : (
                      <span className="text-slate-500 font-bold text-sm">#{index + 1}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: "#00B5B8" }}
                  >
                    {partner.businessName?.[0]?.toUpperCase() ?? "P"}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold truncate"
                      style={{ color: index === 0 ? "#ffffff" : index === 1 || index === 2 ? "#000000" : "#ffffff" }}
                    >{partner.businessName}</p>
                    <p
                      className="text-xs truncate"
                      style={{ color: index === 0 ? "#f8f7f7" : index === 1 || index === 2 ? "#000000" : undefined }}
                    >{partner.businessType}  {partner.serviceArea}</p>
                  </div>

                  {/* Tier badge */}
                  <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${tierClass}`}>
                    {partner.tier ?? "bronze"}
                  </span>

                  {/* Score */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-white">{value}</p>
                    <p className="text-xs text-slate-500">{tabs.find((t) => t.key === sortKey)?.label}</p>
                  </div>
                  {/* Profile link */}
                  <Link href={`/partner/${partner.id}`}>
                    <button
                      className="flex-shrink-0 p-1.5 rounded-lg transition-colors hover:bg-white/10"
                      title="View public profile"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

import React from "react";
