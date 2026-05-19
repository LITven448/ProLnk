import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  ChevronLeft, ChevronRight, DollarSign, TrendingUp, Calendar,
  LayoutGrid, BarChart3, Star,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS_LONG = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_LABELS_ALL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const ACCENT = "#2dd4bf";
const CARD_BG = "rgba(255,255,255,0.04)";
const BORDER = "1px solid rgba(255,255,255,0.08)";

type CommissionRecord = {
  amount?: number | string | null;
  createdAt?: Date | string | number | null;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toNum(v: number | string | null | undefined): number {
  if (v == null) return 0;
  const n = typeof v === "number" ? v : parseFloat(String(v));
  return isNaN(n) ? 0 : n;
}

function toDate(v: Date | string | number | null | undefined): Date | null {
  if (!v) return null;
  const d = new Date(v as string | number | Date);
  return isNaN(d.getTime()) ? null : d;
}

function buildDailyMap(
  commissions: CommissionRecord[],
  year: number,
  month: number,
): Map<number, { amount: number; jobs: number }> {
  const map = new Map<number, { amount: number; jobs: number }>();
  for (const c of commissions) {
    const d = toDate(c.createdAt);
    if (!d || d.getFullYear() !== year || d.getMonth() !== month) continue;
    const day = d.getDate();
    const prev = map.get(day) ?? { amount: 0, jobs: 0 };
    map.set(day, { amount: prev.amount + toNum(c.amount), jobs: prev.jobs + 1 });
  }
  return map;
}

function buildWeeklyData(
  commissions: CommissionRecord[],
  year: number,
  month: number,
): { week: string; amount: number }[] {
  const dailyMap = buildDailyMap(commissions, year, month);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: { week: string; amount: number }[] = [];
  for (let startDay = 1; startDay <= daysInMonth; startDay += 7) {
    const endDay = Math.min(startDay + 6, daysInMonth);
    let total = 0;
    for (let d = startDay; d <= endDay; d++) {
      total += dailyMap.get(d)?.amount ?? 0;
    }
    weeks.push({ week: `${startDay}-${endDay}`, amount: Math.round(total) });
  }
  return weeks;
}

function projectNextMonth(
  commissions: CommissionRecord[],
  year: number,
  month: number,
): number {
  const today = new Date();
  if (year !== today.getFullYear() || month !== today.getMonth()) return 0;

  const dailyMap = buildDailyMap(commissions, year, month);
  const earned = Array.from(dailyMap.values()).reduce((s, v) => s + v.amount, 0);
  const dayOfMonth = today.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  if (dayOfMonth === 0) return 0;
  const dailyAvg = earned / dayOfMonth;
  return Math.round(dailyAvg * daysInMonth * 1.05);
}

function heatmapColor(amount: number): string {
  if (amount <= 0) return "#1e293b";
  if (amount < 500) return "#134e4a";
  if (amount < 1000) return "#0f766e";
  return "#2dd4bf";
}

function buildHeatmapWeeks(
  year: number,
  month: number,
  dailyMap: Map<number, { amount: number; jobs: number }>,
): Array<Array<{ day: number | null; amount: number; jobs: number }>> {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const mondayOffset = firstDow === 0 ? 6 : firstDow - 1;

  const cells: Array<{ day: number | null; amount: number; jobs: number }> = [];
  for (let i = 0; i < mondayOffset; i++) cells.push({ day: null, amount: 0, jobs: 0 });
  for (let d = 1; d <= daysInMonth; d++) {
    const rec = dailyMap.get(d);
    cells.push({ day: d, amount: rec?.amount ?? 0, jobs: rec?.jobs ?? 0 });
  }
  while (cells.length % 7 !== 0) cells.push({ day: null, amount: 0, jobs: 0 });

  const weeks: Array<Array<{ day: number | null; amount: number; jobs: number }>> = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function buildCurrentWeekSparkline(
  dailyMap: Map<number, { amount: number; jobs: number }>,
  year: number,
  month: number,
): number[] {
  const today = new Date();
  const points: number[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (d.getFullYear() === year && d.getMonth() === month) {
      points.push(dailyMap.get(d.getDate())?.amount ?? 0);
    } else {
      points.push(0);
    }
  }
  return points;
}

function bestDayOfWeek(
  dailyMap: Map<number, { amount: number; jobs: number }>,
  year: number,
  month: number,
): { dayName: string; avg: number } | null {
  const dayTotals: Record<number, { total: number; count: number }> = {};
  for (const [day, rec] of dailyMap.entries()) {
    const dow = new Date(year, month, day).getDay();
    if (!dayTotals[dow]) dayTotals[dow] = { total: 0, count: 0 };
    dayTotals[dow].total += rec.amount;
    dayTotals[dow].count += 1;
  }
  let best: { dayName: string; avg: number } | null = null;
  for (const [dow, data] of Object.entries(dayTotals)) {
    const avg = data.total / data.count;
    if (!best || avg > best.avg) {
      best = { dayName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][Number(dow)], avg: Math.round(avg) };
    }
  }
  return best;
}

// ─── Sparkline SVG ────────────────────────────────────────────────────────────

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  const W = 140;
  const H = 36;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * W;
    const y = H - (v / max) * H;
    return `${x},${y}`;
  });
  const polyline = pts.join(" ");
  const area = `0,${H} ${polyline} ${W},${H}`;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#sparkGrad)" />
      <polyline points={polyline} fill="none" stroke="#2dd4bf" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {values.map((v, i) => (
        <circle
          key={i}
          cx={(i / (values.length - 1)) * W}
          cy={H - (v / max) * H}
          r="2.5"
          fill="#2dd4bf"
        />
      ))}
    </svg>
  );
}

// ─── Heatmap Cell ─────────────────────────────────────────────────────────────

function HeatCell({
  day,
  amount,
  jobs,
  isToday,
}: {
  day: number | null;
  amount: number;
  jobs: number;
  isToday: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  if (day === null) return <div className="aspect-square rounded" />;

  const bg = heatmapColor(amount);
  const ring = isToday ? "2px solid #2dd4bf" : "none";

  return (
    <div className="relative aspect-square group">
      <div
        className="w-full h-full rounded cursor-pointer transition-all duration-150 hover:scale-110"
        style={{ background: bg, outline: ring }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      {hovered && (
        <div
          className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1.5 rounded-lg text-xs whitespace-nowrap pointer-events-none"
          style={{
            background: "#0f172a",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#e2e8f0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          }}
        >
          <span className="font-bold text-teal-400">${Math.round(amount).toLocaleString()}</span>
          <span className="text-slate-400"> · {jobs} job{jobs !== 1 ? "s" : ""}</span>
        </div>
      )}
      <span
        className="absolute bottom-0.5 left-0 right-0 text-center text-[8px] font-semibold leading-none pointer-events-none"
        style={{ color: amount > 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)" }}
      >
        {day}
      </span>
    </div>
  );
}

// ─── Calendar Day Cell (legacy monthly view) ──────────────────────────────────

function DayCell({ day, amount, isToday }: { day: number; amount: number; isToday: boolean }) {
  const intensity = amount > 0 ? Math.min(1, amount / 200) : 0;
  const bg = amount > 0
    ? `rgba(45,212,191,${0.08 + intensity * 0.35})`
    : "rgba(255,255,255,0.02)";
  const border = isToday
    ? `1px solid ${ACCENT}`
    : amount > 0
    ? "1px solid rgba(45,212,191,0.25)"
    : "1px solid rgba(255,255,255,0.05)";

  return (
    <div
      className="rounded-lg flex flex-col items-center justify-center py-2 px-1 min-h-[56px]"
      style={{ background: bg, border }}
    >
      <span
        className="text-[10px] font-semibold"
        style={{ color: isToday ? ACCENT : "rgba(255,255,255,0.45)" }}
      >
        {day}
      </span>
      {amount > 0 && (
        <span
          className="text-[11px] font-bold mt-0.5 tabular-nums"
          style={{ color: ACCENT }}
        >
          ${amount < 1000 ? amount.toFixed(0) : `${(amount / 1000).toFixed(1)}k`}
        </span>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EarningsCalendar() {
  const { isAuthenticated } = useAuth();

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [mode, setMode] = useState<"monthly" | "weekly">("monthly");

  const { data: commissionData, isLoading } = trpc.partners.getEarnedCommissions.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const commissions: CommissionRecord[] = useMemo(() => {
    if (!commissionData) return [];
    if (Array.isArray(commissionData)) return commissionData as CommissionRecord[];
    if (Array.isArray((commissionData as { commissions?: CommissionRecord[] }).commissions)) {
      return (commissionData as { commissions: CommissionRecord[] }).commissions;
    }
    return [];
  }, [commissionData]);

  const dailyMap = useMemo(
    () => buildDailyMap(commissions, viewYear, viewMonth),
    [commissions, viewYear, viewMonth],
  );

  const weeklyData = useMemo(
    () => buildWeeklyData(commissions, viewYear, viewMonth),
    [commissions, viewYear, viewMonth],
  );

  const monthTotal = useMemo(
    () => Math.round(Array.from(dailyMap.values()).reduce((s, v) => s + v.amount, 0)),
    [dailyMap],
  );

  const projected = useMemo(
    () => projectNextMonth(commissions, viewYear, viewMonth),
    [commissions, viewYear, viewMonth],
  );

  const heatmapWeeks = useMemo(
    () => buildHeatmapWeeks(viewYear, viewMonth, dailyMap),
    [viewYear, viewMonth, dailyMap],
  );

  const sparklineValues = useMemo(
    () => buildCurrentWeekSparkline(dailyMap, viewYear, viewMonth),
    [dailyMap, viewYear, viewMonth],
  );

  const bestDay = useMemo(
    () => bestDayOfWeek(dailyMap, viewYear, viewMonth),
    [dailyMap, viewYear, viewMonth],
  );

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  const isCurrentMonth =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Earnings Calendar</h1>
            <p className="text-slate-400 text-sm mt-1">Daily and weekly earnings breakdown.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMode("monthly")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: mode === "monthly" ? "rgba(45,212,191,0.15)" : "rgba(255,255,255,0.04)",
                border: mode === "monthly" ? "1px solid rgba(45,212,191,0.4)" : BORDER,
                color: mode === "monthly" ? ACCENT : "#94a3b8",
              }}
            >
              <LayoutGrid size={13} />Monthly
            </button>
            <button
              onClick={() => setMode("weekly")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: mode === "weekly" ? "rgba(45,212,191,0.15)" : "rgba(255,255,255,0.04)",
                border: mode === "weekly" ? "1px solid rgba(45,212,191,0.4)" : BORDER,
                color: mode === "weekly" ? ACCENT : "#94a3b8",
              }}
            >
              <BarChart3 size={13} />Weekly
            </button>
          </div>
        </div>

        {/* Month navigator */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ChevronLeft size={18} className="text-slate-400" />
          </button>
          <span className="text-base font-bold text-white">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            disabled={isCurrentMonth}
            style={{ opacity: isCurrentMonth ? 0.3 : 1 }}
          >
            <ChevronRight size={18} className="text-slate-400" />
          </button>
        </div>

        {/* ── NEW: Heatmap ── */}
        <div className="rounded-2xl p-5 bg-slate-900 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={14} style={{ color: ACCENT }} />
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Earnings Heat Map</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm bg-slate-800" /> None
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ background: "#134e4a" }} /> $1–500
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ background: "#0f766e" }} /> $500–1k
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ background: "#2dd4bf" }} /> $1k+
              </span>
            </div>
          </div>

          {/* Day labels Mon–Sun */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAY_LABELS_LONG.map(d => (
              <div key={d} className="text-center text-[9px] font-semibold text-slate-600">{d}</div>
            ))}
          </div>

          {/* Heatmap weeks */}
          <div className="space-y-1">
            {heatmapWeeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-1">
                {week.map((cell, di) => (
                  <HeatCell
                    key={di}
                    day={cell.day}
                    amount={Math.round(cell.amount)}
                    jobs={cell.jobs}
                    isToday={isCurrentMonth && cell.day === today.getDate()}
                  />
                ))}
              </div>
            ))}
          </div>

          {monthTotal === 0 && !isLoading && (
            <p className="text-center text-xs text-slate-600 mt-4">No earnings recorded for this month yet.</p>
          )}
        </div>

        {/* ── NEW: Best Day Banner ── */}
        {bestDay && bestDay.avg > 0 && (
          <div
            className="rounded-2xl px-5 py-4 flex items-center gap-3"
            style={{
              background: "linear-gradient(135deg, rgba(45,212,191,0.12), rgba(45,212,191,0.04))",
              border: "1px solid rgba(45,212,191,0.25)",
            }}
          >
            <Star size={18} style={{ color: ACCENT }} className="flex-shrink-0" />
            <p className="text-sm text-white">
              Best day this month:{" "}
              <span style={{ color: ACCENT }} className="font-bold">{bestDay.dayName}</span>
              {" "}— avg{" "}
              <span style={{ color: ACCENT }} className="font-bold">${bestDay.avg.toLocaleString()}</span>
            </p>
          </div>
        )}

        {/* ── NEW: Sparkline this week ── */}
        {isCurrentMonth && (
          <div className="rounded-2xl p-5 bg-slate-900 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  This Week's Trend
                </p>
                <p className="text-xs text-slate-500">Daily earnings — last 7 days</p>
              </div>
              <Sparkline values={sparklineValues} />
            </div>
          </div>
        )}

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl p-5 bg-slate-900 border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={15} style={{ color: ACCENT }} />
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {isCurrentMonth ? "This Month" : `${MONTHS_SHORT[viewMonth]} ${viewYear}`}
              </p>
            </div>
            {isLoading ? (
              <div className="h-7 w-24 rounded-lg bg-white/5 animate-pulse" />
            ) : (
              <p className="text-2xl font-bold text-white">${monthTotal.toLocaleString()}</p>
            )}
          </div>

          <div className="rounded-2xl p-5 bg-slate-900 border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={15} style={{ color: isCurrentMonth ? "#22c55e" : ACCENT }} />
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {isCurrentMonth ? "Projected" : "Best Day"}
              </p>
            </div>
            {isLoading ? (
              <div className="h-7 w-24 rounded-lg bg-white/5 animate-pulse" />
            ) : isCurrentMonth ? (
              <>
                <p className="text-2xl font-bold text-green-400">${projected.toLocaleString()}</p>
                <p className="text-[10px] text-slate-600 mt-1">Based on current pace +5%</p>
              </>
            ) : (
              <>
                {(() => {
                  const best = Array.from(dailyMap.entries()).sort((a, b) => b[1].amount - a[1].amount)[0];
                  return best ? (
                    <>
                      <p className="text-2xl font-bold" style={{ color: ACCENT }}>
                        ${Math.round(best[1].amount).toLocaleString()}
                      </p>
                      <p className="text-[10px] text-slate-600 mt-1">
                        Day {best[0]} of {MONTHS_SHORT[viewMonth]}
                      </p>
                    </>
                  ) : (
                    <p className="text-2xl font-bold text-slate-600">—</p>
                  );
                })()}
              </>
            )}
          </div>
        </div>

        {/* Calendar or bar chart */}
        {mode === "monthly" ? (
          <div className="rounded-2xl p-5 bg-slate-900 border border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={14} style={{ color: ACCENT }} />
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Daily Earnings</p>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-1">
              {DAY_LABELS_ALL.map(d => (
                <div key={d} className="text-center text-[10px] font-semibold text-slate-600">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const rec = dailyMap.get(day);
                const amount = Math.round(rec?.amount ?? 0);
                const isToday = isCurrentMonth && day === today.getDate();
                return <DayCell key={day} day={day} amount={amount} isToday={isToday} />;
              })}
            </div>
            {monthTotal === 0 && !isLoading && (
              <p className="text-center text-xs text-slate-600 mt-4">No earnings recorded for this month yet.</p>
            )}
          </div>
        ) : (
          <div className="rounded-2xl p-5 bg-slate-900 border border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={14} style={{ color: ACCENT }} />
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Weekly Earnings</p>
            </div>
            {isLoading ? (
              <div className="h-48 rounded-xl bg-white/5 animate-pulse" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyData} barSize={36}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${v}`} />
                  <Tooltip
                    formatter={(v: number) => [`$${v.toLocaleString()}`, "Earnings"]}
                    contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff", fontSize: 12 }}
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  />
                  <Bar dataKey="amount" fill={ACCENT} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
