import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Award, Search, TrendingUp, CheckCircle, XCircle } from "lucide-react";

const LEVEL_NAMES: Record<number, string> = {
  1: "Charter Partner",
  2: "Founding Partner",
  3: "Growth Pro",
  4: "Standard Pro",
};

const LEVEL_COLORS: Record<number, string> = {
  1: "bg-amber-100 text-amber-800 border-amber-200",
  2: "bg-blue-100 text-blue-800 border-blue-200",
  3: "bg-purple-100 text-purple-800 border-purple-200",
  4: "bg-gray-100 text-gray-700 border-gray-200",
};

export default function NetworkOverview() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<number | "all">("all");

  const { data, isLoading } = trpc.network.adminGetNetworkOverview.useQuery();

  const filtered = (data?.pros ?? []).filter((p) => {
    const matchSearch = !search ||
      p.businessName.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase()) ||
      p.referralCode.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === "all" || p.networkLevel === levelFilter;
    return matchSearch && matchLevel;
  });

  return (
    <AdminLayout title="Network Overview" subtitle="Partner network structure and income">
      <div className="p-6 space-y-6">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Charter Partners", value: data?.byLevel[1] ?? 0, color: "text-amber-600", icon: Award },
            { label: "Founding Partners", value: data?.byLevel[2] ?? 0, color: "text-blue-600", icon: Users },
            { label: "Growth Pros", value: data?.byLevel[3] ?? 0, color: "text-purple-600", icon: TrendingUp },
            { label: "Standard Pros", value: data?.byLevel[4] ?? 0, color: "text-gray-600", icon: Users },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-1">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
              <p className={`text-2xl font-black ${s.color}`}>{isLoading ? "—" : s.value}</p>
            </div>
          ))}
        </div>

        {/* Pending payout */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Pending Payouts This Month</p>
              <p className="text-xs text-gray-500">Disbursed at end of month, $50 minimum threshold</p>
            </div>
          </div>
          <p className="text-2xl font-black text-green-600">
            {isLoading ? "—" : `$${(data?.pendingPayoutTotal ?? 0).toFixed(2)}`}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, or ref code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {(["all", 1, 2, 3, 4] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLevelFilter(l)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  levelFilter === l
                    ? "bg-[#0A1628] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                {l === "all" ? "All" : `L${l} ${LEVEL_NAMES[l]}`}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-800">
              {filtered.length} {filtered.length === 1 ? "Partner" : "Partners"}
            </p>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-sm text-gray-400">Loading network data...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-400">No partners match your filters.</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map((pro) => (
                <div key={pro.userId} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-gray-900 truncate">{pro.businessName}</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${LEVEL_COLORS[pro.networkLevel] ?? "bg-gray-100 text-gray-700"}`}>
                          L{pro.networkLevel} {LEVEL_NAMES[pro.networkLevel]}
                        </span>
                        {pro.subscriptionActive
                          ? <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                          : <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                        }
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{pro.email} · Ref: <span className="font-mono font-semibold">{pro.referralCode}</span></p>
                      <p className="text-xs text-gray-400 mt-0.5">{pro.trade}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-green-600">${pro.monthlyIncome.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">this month</p>
                      <p className="text-xs text-gray-500 mt-1">{pro.downlineCount} downline · {pro.jobsThisMonth} jobs/mo</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
