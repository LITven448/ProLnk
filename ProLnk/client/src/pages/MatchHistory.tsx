import { useState, useMemo } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BarChart2, Search, Filter, Calendar, DollarSign, CheckCircle,
  XCircle, Clock, TrendingUp, RefreshCw, ChevronDown, ChevronUp,
} from "lucide-react";

type Outcome = "won" | "lost" | "pending";

type MatchRecord = {
  id: number;
  homeownerPartial: string;
  proName: string;
  trade: string;
  jobValue: number | null;
  date: string;
  outcome: Outcome;
};

const OUTCOME_CONFIG: Record<Outcome, { label: string; cls: string; icon: any }> = {
  won:     { label: "Won",     cls: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle },
  lost:    { label: "Lost",    cls: "bg-red-100 text-red-700 border-red-200",             icon: XCircle },
  pending: { label: "Pending", cls: "bg-amber-100 text-amber-700 border-amber-200",       icon: Clock },
};

const DATE_RANGES = [
  { label: "All time",   days: 0 },
  { label: "Last 7d",   days: 7 },
  { label: "Last 30d",  days: 30 },
  { label: "Last 90d",  days: 90 },
];

function outcomeFromStatus(status: string): Outcome {
  if (["converted", "closed", "accepted"].includes(status)) return "won";
  if (["declined", "expired"].includes(status)) return "lost";
  return "pending";
}

function maskName(name: string | null | undefined): string {
  if (!name) return "Homeowner";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].slice(0, 2) + "***";
  return parts[0] + " " + parts[parts.length - 1].charAt(0) + ".";
}

function maskAddress(addr: string | null | undefined): string {
  if (!addr) return "Service Area";
  const parts = addr.split(",");
  if (parts.length >= 2) return parts.slice(1).join(",").trim();
  return addr.slice(0, 6) + "... " + addr.split(",").pop()?.trim();
}

type SortKey = "date" | "jobValue" | "trade";
type SortDir = "asc" | "desc";

export default function MatchHistory() {
  const [search, setSearch] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState<Outcome | "all">("all");
  const [tradeFilter, setTradeFilter] = useState("all");
  const [daysFilter, setDaysFilter] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const { data: rawOpps = [], isLoading, refetch } = trpc.partners.getOutboundReferrals.useQuery(undefined, {
    refetchInterval: 60_000,
  });

  const matches: MatchRecord[] = useMemo(() => {
    return (rawOpps as any[]).map((o: any) => {
      const aiResult = o.aiAnalysisResult as any;
      const topOpp = aiResult?.opportunities?.[0];
      return {
        id: o.id,
        homeownerPartial: maskAddress(o.serviceAddress),
        proName: o.receivingPartnerName ?? "Unassigned",
        trade: o.opportunityType?.replace(/_/g, " ") ?? topOpp?.type ?? "General",
        jobValue: o.actualJobValue ? parseFloat(o.actualJobValue)
          : o.estimatedJobValue ? parseFloat(o.estimatedJobValue)
          : topOpp?.estimatedValue ?? null,
        date: o.createdAt ? new Date(o.createdAt).toISOString() : new Date().toISOString(),
        outcome: outcomeFromStatus(o.status ?? "pending"),
      };
    });
  }, [rawOpps]);

  const allTrades = useMemo(() => {
    const s = new Set(matches.map((m) => m.trade));
    return Array.from(s).sort();
  }, [matches]);

  const filtered = useMemo(() => {
    const cutoff = daysFilter > 0 ? Date.now() - daysFilter * 86400_000 : 0;
    return matches
      .filter((m) => {
        if (daysFilter > 0 && new Date(m.date).getTime() < cutoff) return false;
        if (outcomeFilter !== "all" && m.outcome !== outcomeFilter) return false;
        if (tradeFilter !== "all" && m.trade !== tradeFilter) return false;
        if (search) {
          const q = search.toLowerCase();
          if (
            !m.homeownerPartial.toLowerCase().includes(q) &&
            !m.proName.toLowerCase().includes(q) &&
            !m.trade.toLowerCase().includes(q)
          ) return false;
        }
        return true;
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortKey === "date") cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
        if (sortKey === "jobValue") cmp = (a.jobValue ?? 0) - (b.jobValue ?? 0);
        if (sortKey === "trade") cmp = a.trade.localeCompare(b.trade);
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [matches, search, outcomeFilter, tradeFilter, daysFilter, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <ChevronDown className="w-3 h-3 text-gray-300" />;
    return sortDir === "desc" ? <ChevronDown className="w-3 h-3 text-[#0A1628]" /> : <ChevronUp className="w-3 h-3 text-[#0A1628]" />;
  }

  const wonMatches = filtered.filter((m) => m.outcome === "won");
  const totalRevenue = wonMatches.reduce((sum, m) => sum + (m.jobValue ?? 0), 0);
  const convRate = filtered.length > 0 ? Math.round((wonMatches.length / filtered.length) * 100) : 0;
  const avgJobValue = wonMatches.length > 0
    ? wonMatches.reduce((s, m) => s + (m.jobValue ?? 0), 0) / wonMatches.length
    : 0;

  return (
    <PartnerLayout>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900 flex items-center gap-3">
              <BarChart2 className="w-6 h-6 text-[#0A1628]" />Match History
            </h1>
            <p className="text-sm text-gray-500 mt-1">All past job matches, outcomes, and revenue generated</p>
          </div>
          <button onClick={() => refetch()} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Total Matches",
              value: filtered.length,
              icon: BarChart2,
              color: "text-[#0A1628]",
              bg: "bg-[#0A1628]/5",
            },
            {
              label: "Conversion Rate",
              value: `${convRate}%`,
              icon: TrendingUp,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
            {
              label: "Avg Job Value",
              value: `$${avgJobValue.toFixed(0)}`,
              icon: DollarSign,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Total Revenue",
              value: `$${totalRevenue.toLocaleString()}`,
              icon: DollarSign,
              color: "text-amber-600",
              bg: "bg-amber-50",
            },
          ].map((stat) => (
            <Card key={stat.label} className={`border border-gray-200 ${stat.bg}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-xs text-gray-500">{stat.label}</span>
                </div>
                <p className={`text-2xl font-heading font-bold ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search homeowner location, pro, or trade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Date range */}
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {DATE_RANGES.map((r) => (
              <button
                key={r.label}
                onClick={() => setDaysFilter(r.days)}
                className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  daysFilter === r.days
                    ? "bg-[#0A1628] text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#0A1628]/30"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter chips row */}
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-4 h-4 text-gray-400" />

          {/* Outcome */}
          {(["all", "won", "lost", "pending"] as const).map((o) => (
            <button
              key={o}
              onClick={() => setOutcomeFilter(o)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                outcomeFilter === o
                  ? "bg-[#0A1628] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {o === "all" ? "All outcomes" : o}
            </button>
          ))}

          <div className="w-px h-4 bg-gray-200" />

          {/* Trade */}
          <button
            onClick={() => setTradeFilter("all")}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              tradeFilter === "all" ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All trades
          </button>
          {allTrades.map((t) => (
            <button
              key={t}
              onClick={() => setTradeFilter(t)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                tradeFilter === t ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Table */}
        <Card className="border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Homeowner
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Pro
                  </th>
                  <th
                    className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer hover:text-gray-800 select-none"
                    onClick={() => toggleSort("trade")}
                  >
                    <span className="flex items-center gap-1">Trade <SortIcon k="trade" /></span>
                  </th>
                  <th
                    className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer hover:text-gray-800 select-none"
                    onClick={() => toggleSort("jobValue")}
                  >
                    <span className="flex items-center justify-end gap-1">Job Value <SortIcon k="jobValue" /></span>
                  </th>
                  <th
                    className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer hover:text-gray-800 select-none"
                    onClick={() => toggleSort("date")}
                  >
                    <span className="flex items-center gap-1">Date <SortIcon k="date" /></span>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Outcome
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 6 }).map((_, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-4 bg-gray-100 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-16 text-center">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                        <BarChart2 className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-sm">No matches found for your current filters.</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((match) => {
                    const cfg = OUTCOME_CONFIG[match.outcome];
                    const OutcomeIcon = cfg.icon;
                    return (
                      <tr key={match.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-700 text-sm">{match.homeownerPartial}</td>
                        <td className="px-4 py-3 text-gray-700 text-sm font-medium">{match.proName}</td>
                        <td className="px-4 py-3">
                          <span className="capitalize text-sm text-gray-700">{match.trade}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {match.jobValue != null ? (
                            <span className="text-sm font-bold text-gray-900">${match.jobValue.toLocaleString()}</span>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                          {new Date(match.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={`${cfg.cls} flex items-center gap-1 w-fit border text-xs`}>
                            <OutcomeIcon className="w-3 h-3" />
                            {cfg.label}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {filtered.length > 0 && (
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-400">{filtered.length} records shown</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  {wonMatches.length} won
                </span>
                <span className="flex items-center gap-1">
                  <XCircle className="w-3 h-3 text-red-400" />
                  {filtered.filter((m) => m.outcome === "lost").length} lost
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {filtered.filter((m) => m.outcome === "pending").length} pending
                </span>
              </div>
            </div>
          )}
        </Card>
      </div>
    </PartnerLayout>
  );
}
