import { useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import PartnerLayout from "@/components/PartnerLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from "recharts";
import {
  ArrowLeft, Download, DollarSign, TrendingUp, TrendingDown,
  Loader2, BarChart3, CalendarClock, Zap,
} from "lucide-react";

const STREAM_COLORS = {
  stream1: "#0A1628″,
  stream2: "#00B5B8″,
  stream3: "#8B5CF6″,
  stream4: "#F59E0B",
};

const STREAM_LABELS: Record<string, string> = {
  stream1: "Direct Commission",
  stream2: "Network Override",
  stream3: "Subscription Override",
  stream4: "Homeowner Override",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type CommissionRecord = {
  amount?: number | string | null;
  commissionType?: string | null;
  createdAt?: Date | string | number | null;
};

function classifyStream(type: string | null | undefined): keyof typeof STREAM_COLORS {
  const t = (type ?? "").toLowerCase();
  if (t.includes("network") || t.includes("override") || t.includes("cascade")) return "stream2″;
  if (t.includes("subscription") || t.includes("recurring")) return "stream3″;
  if (t.includes("homeowner") || t.includes("origination")) return "stream4″;
  return "stream1″;
}

function buildMonthlyData(commissions: CommissionRecord[], year: number) {
  const rows: Record<string, { month: string; stream1: number; stream2: number; stream3: number; stream4: number; total: number }> = {};
  for (const m of MONTHS) {
    rows[m] = { month: m, stream1: 0, stream2: 0, stream3: 0, stream4: 0, total: 0 };
  }
  for (const c of commissions) {
    if (!c.createdAt) continue;
    const d = new Date(c.createdAt as string);
    if (d.getFullYear() !== year) continue;
    const m = MONTHS[d.getMonth()];
    const stream = classifyStream(c.commissionType);
    const amt = Number(c.amount ?? 0);
    rows[m][stream] += amt;
    rows[m].total += amt;
  }
  return Object.values(rows);
}

export default function EarningsHistory() {
  const { isAuthenticated, loading: authLoading } = useAuth();

  const { data: earnedCommissions, isLoading } = trpc.partners.getEarnedCommissions.useQuery(
    undefined, { enabled: isAuthenticated }
  );

  const currentYear = new Date().getFullYear();
  const priorYear = currentYear - 1;

  const currentYearData = useMemo(
    () => buildMonthlyData(earnedCommissions ?? [], currentYear),
    [earnedCommissions, currentYear]
  );
  const priorYearData = useMemo(
    () => buildMonthlyData(earnedCommissions ?? [], priorYear),
    [earnedCommissions, priorYear]
  );

  const currentYearTotal = useMemo(
    () => currentYearData.reduce((s, r) => s + r.total, 0),
    [currentYearData]
  );
  const priorYearTotal = useMemo(
    () => priorYearData.reduce((s, r) => s + r.total, 0),
    [priorYearData]
  );

  const yearOverYearPct = priorYearTotal > 0
    ? ((currentYearTotal - priorYearTotal) / priorYearTotal) * 100
    : null;

  const streamTotals = useMemo(() => {
    const totals = { stream1: 0, stream2: 0, stream3: 0, stream4: 0 };
    for (const row of currentYearData) {
      totals.stream1 += row.stream1;
      totals.stream2 += row.stream2;
      totals.stream3 += row.stream3;
      totals.stream4 += row.stream4;
    }
    return totals;
  }, [currentYearData]);

  const yoyComparisonData = useMemo(() => {
    return MONTHS.map((m, i) => ({
      month: m,
      [currentYear]: currentYearData[i].total,
      [priorYear]: priorYearData[i].total,
    }));
  }, [currentYearData, priorYearData, currentYear, priorYear]);

  const earnedThisMonth = useMemo(() => {
    const now = new Date();
    return (earnedCommissions ?? []).reduce((sum, c) => {
      if (!c.createdAt) return sum;
      const d = new Date(c.createdAt as string);
      if (d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()) {
        return sum + Number(c.amount ?? 0);
      }
      return sum;
    }, 0);
  }, [earnedCommissions]);

  const handleDownloadTaxSummary = () => {
    const allRows = [currentYear, priorYear].flatMap((yr) => {
      const data = yr === currentYear ? currentYearData : priorYearData;
      return data.map((r) => [
        yr,
        r.month,
        r.stream1.toFixed(2),
        r.stream2.toFixed(2),
        r.stream3.toFixed(2),
        r.stream4.toFixed(2),
        r.total.toFixed(2),
      ].join(","));
    });
    const csv = [
      "Year,Month,Direct Commission,Network Override,Subscription Override,Homeowner Override,Total",
      ...allRows,
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prolnk-tax-summary-${currentYear}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Tax summary downloaded");
  };

  if (authLoading || isLoading) {
    return (
      <PartnerLayout>
        <div className="flex items-center justify-center py-24″>
          <Loader2 className="w-8 h-8 animate-spin text-gray-300″ />
        </div>
      </PartnerLayout>
    );
  }

  const currentMonthIdx = new Date().getMonth();
  const monthsElapsed = currentMonthIdx + 1;
  const projectedAnnual = monthsElapsed > 0 ? (currentYearTotal / monthsElapsed) * 12 : 0;

  const nextPayoutDate = (() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1, 1);
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  })();

  return (
    <PartnerLayout>
      <div className="max-w-5xl mx-auto px-4 py-10″>
        {/* Back nav */}
        <Link href="/dashboard">
          <button className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4″ />
            Dashboard
          </button>
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-gray-900″>Earnings History</h1>
            <p className="text-gray-500 text-sm mt-1″>Monthly breakdown across all 4 income streams.</p>
          </div>
          <Button
            onClick={handleDownloadTaxSummary}
            variant="outline"
            className="gap-2 text-sm"
          >
            <Download className="w-4 h-4″ /> Download Tax Summary (CSV)
          </Button>
        </div>

        {/* YTD Summary + Next Payout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6″>
          {/* YTD Summary */}
          <div className="bg-gradient-to-br from-[#0A1628] to-[#1B4FD8] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4″>
              <DollarSign className="w-4 h-4 text-blue-300″ />
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Year-to-Date Summary</span>
            </div>
            <p className="text-4xl font-black mb-1″>${currentYearTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            <p className="text-sm text-blue-300 mb-4″>
              On pace for ${projectedAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })} this year
            </p>
            <div className="space-y-2″>
              {(Object.keys(STREAM_LABELS) as (keyof typeof STREAM_COLORS)[]).map((s) => (
                <div key={s} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2″>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STREAM_COLORS[s] === "#0A1628″ ? "#93c5fd" : STREAM_COLORS[s] }} />
                    <span className="text-blue-200 text-xs">{STREAM_LABELS[s]}</span>
                  </div>
                  <span className="font-semibold text-white text-xs">
                    ${streamTotals[s].toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    {currentYearTotal > 0 && (
                      <span className="text-blue-300 font-normal ml-1″>
                        ({((streamTotals[s] / currentYearTotal) * 100).toFixed(0)}%)
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Payout */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4″>
                <CalendarClock className="w-4 h-4 text-emerald-500″ />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Next Payout</span>
              </div>
              <p className="text-4xl font-black text-gray-900 mb-1″>
                ${earnedThisMonth.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="text-sm text-gray-400 mb-4″>Est. payout on {nextPayoutDate}</p>
            </div>
            <div className="space-y-2″>
              <div className="flex items-start gap-2 bg-emerald-50 rounded-xl p-3″>
                <Zap className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0″ />
                <p className="text-xs text-emerald-700 leading-relaxed">
                  <span className="font-semibold">Increase this amount:</span> Add 1 more recruit to unlock $149/mo in subscription overrides. Each job logged adds to your direct commission stack.
                </p>
              </div>
              <Link href="/dashboard/payout-history">
                <button className="w-full text-xs text-[#0A1628] font-semibold border border-[#0A1628]/20 rounded-xl py-2 hover:bg-[#0A1628]/5 transition-colors">
                  View Full Payout History →
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Year totals */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8″>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1″>
              {currentYear} Total
            </p>
            <p className="text-3xl font-black text-gray-900″>${currentYearTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1″>
              {priorYear} Total
            </p>
            <p className="text-3xl font-black text-gray-500″>${priorYearTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1″>Year-over-Year</p>
            {yearOverYearPct !== null ? (
              <div className="flex items-center gap-2″>
                {yearOverYearPct >= 0
                  ? <TrendingUp className="w-5 h-5 text-emerald-500″ />
                  : <TrendingDown className="w-5 h-5 text-red-400″ />}
                <p className={`text-3xl font-black ${yearOverYearPct >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {yearOverYearPct >= 0 ? "+" : ""}{yearOverYearPct.toFixed(1)}%
                </p>
              </div>
            ) : (
              <p className="text-xl font-bold text-gray-400″>No prior year data</p>
            )}
          </div>
        </div>

        {/* Monthly bar chart — last 12 months stacked by stream */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8″>
          <div className="flex items-center gap-3 mb-6″>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0A1628, #1B4FD8)" }}>
              <BarChart3 className="w-4.5 h-4.5 text-white" style={{ width: "1.125rem", height: "1.125rem" }} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-sm">{currentYear} Monthly Earnings</h2>
              <p className="text-xs text-gray-400″>Stacked by income stream</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={currentYearData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3″ stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12, padding: "10px 14px" }}
                formatter={(v: number, name: string) => [`$${Number(v).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, STREAM_LABELS[name] ?? name]}
                labelFormatter={(label) => {
                  const row = currentYearData.find((r) => r.month === label);
                  if (!row) return label;
                  return `${label} — Total: $${row.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
                }}
              />
              <Legend
                formatter={(value) => STREAM_LABELS[value] ?? value}
                wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
              />
              <Bar dataKey="stream1″ stackId="a" fill={STREAM_COLORS.stream1} radius={[0, 0, 0, 0]} />
              <Bar dataKey="stream2″ stackId="a" fill={STREAM_COLORS.stream2} />
              <Bar dataKey="stream3″ stackId="a" fill={STREAM_COLORS.stream3} />
              <Bar dataKey="stream4″ stackId="a" fill={STREAM_COLORS.stream4} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Year-over-year comparison line chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8″>
          <div className="flex items-center gap-3 mb-6″>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-purple-50″>
              <TrendingUp className="w-4.5 h-4.5 text-purple-600″ style={{ width: "1.125rem", height: "1.125rem" }} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-sm">Year-over-Year Comparison</h2>
              <p className="text-xs text-gray-400″>{currentYear} vs {priorYear}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={yoyComparisonData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3″ stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }}
                formatter={(v: number) => [`$${v.toFixed(0)}`]}
              />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
              <Line type="monotone" dataKey={String(currentYear)} stroke="#0A1628″ strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey={String(priorYear)} stroke="#D1D5DB" strokeWidth={1.5} strokeDasharray="5 4″ dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stream breakdown table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8″>
          <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-3″>
            <DollarSign className="w-4 h-4 text-gray-400″ />
            <h2 className="font-bold text-gray-900 text-sm">{currentYear} Stream Breakdown</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50″>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Month</th>
                  {(Object.keys(STREAM_LABELS) as (keyof typeof STREAM_LABELS)[]).map((s) => (
                    <th key={s} className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: STREAM_COLORS[s as keyof typeof STREAM_COLORS] }}>
                      {STREAM_LABELS[s]}
                    </th>
                  ))}
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50″>
                {currentYearData.map((row) => (
                  <tr key={row.month} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-700″>{row.month}</td>
                    <td className="px-4 py-3 text-right text-gray-600″>{row.stream1 > 0 ? `$${row.stream1.toFixed(0)}` : "—"}</td>
                    <td className="px-4 py-3 text-right text-gray-600″>{row.stream2 > 0 ? `$${row.stream2.toFixed(0)}` : "—"}</td>
                    <td className="px-4 py-3 text-right text-gray-600″>{row.stream3 > 0 ? `$${row.stream3.toFixed(0)}` : "—"}</td>
                    <td className="px-4 py-3 text-right text-gray-600″>{row.stream4 > 0 ? `$${row.stream4.toFixed(0)}` : "—"}</td>
                    <td className="px-5 py-3 text-right font-bold text-gray-900″>{row.total > 0 ? `$${row.total.toFixed(0)}` : "—"}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-200 bg-gray-50″>
                  <td className="px-5 py-3 font-bold text-gray-900″>Total</td>
                  <td className="px-4 py-3 text-right font-bold" style={{ color: STREAM_COLORS.stream1 }}>
                    ${streamTotals.stream1.toFixed(0)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold" style={{ color: STREAM_COLORS.stream2 }}>
                    ${streamTotals.stream2.toFixed(0)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold" style={{ color: STREAM_COLORS.stream3 }}>
                    ${streamTotals.stream3.toFixed(0)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold" style={{ color: STREAM_COLORS.stream4 }}>
                    ${streamTotals.stream4.toFixed(0)}
                  </td>
                  <td className="px-5 py-3 text-right font-black text-gray-900 text-base">
                    ${currentYearTotal.toFixed(0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tax summary CTA */}
        <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-slate-50 to-gray-50 p-6 flex flex-wrap items-center justify-between gap-4″>
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-1″>Tax Season Ready</h3>
            <p className="text-xs text-gray-500 max-w-sm">
              Download a complete CSV of your earnings by month and income stream for {currentYear} and {priorYear}.
              Share with your accountant for Schedule C or 1099 filings.
            </p>
          </div>
          <Button onClick={handleDownloadTaxSummary} className="gap-2 text-white" style={{ backgroundColor: "#0A1628″ }}>
            <Download className="w-4 h-4″ /> Download Tax Summary
          </Button>
        </div>
      </div>
    </PartnerLayout>
  );
}
