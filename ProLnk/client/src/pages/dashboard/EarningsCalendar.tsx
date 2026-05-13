import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  ChevronLeft, ChevronRight, DollarSign, TrendingUp, Calendar,
  LayoutGrid, BarChart3,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const ACCENT = "#00B5B8";
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
): Map<number, number> {
  const map = new Map<number, number>();
  for (const c of commissions) {
    const d = toDate(c.createdAt);
    if (!d || d.getFullYear() !== year || d.getMonth() !== month) continue;
    const day = d.getDate();
    map.set(day, (map.get(day) ?? 0) + toNum(c.amount));
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
      total += dailyMap.get(d) ?? 0;
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
  const earned = Array.from(dailyMap.values()).reduce((s, v) => s + v, 0);
  const dayOfMonth = today.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  if (dayOfMonth === 0) return 0;
  const dailyAvg = earned / dayOfMonth;
  return Math.round(dailyAvg * daysInMonth * 1.05);
}

// ─── Calendar Day Cell ────────────────────────────────────────────────────────

function DayCell({ day, amount, isToday }: { day: number; amount: number; isToday: boolean }) {
  const intensity = amount > 0 ? Math.min(1, amount / 200) : 0;
  const bg = amount > 0
    ? `rgba(0,181,184,${0.08 + intensity * 0.35})`
    : "rgba(255,255,255,0.02)";
  const border = isToday
    ? `1px solid ${ACCENT}`
    : amount > 0
    ? "1px solid rgba(0,181,184,0.25)"
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
    () => Math.round(Array.from(dailyMap.values()).reduce((s, v) => s + v, 0)),
    [dailyMap],
  );

  const projected = useMemo(
    () => projectNextMonth(commissions, viewYear, viewMonth),
    [commissions, viewYear, viewMonth],
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
    <div className="min-h-screen" style={{ background: "#0A1628" }}>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Earnings Calendar</h1>
            <p className="text-gray-400 text-sm mt-1">
              Daily and weekly earnings breakdown.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMode("monthly")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: mode === "monthly" ? `${ACCENT}20` : "rgba(255,255,255,0.04)",
                border: mode === "monthly" ? `1px solid ${ACCENT}50` : BORDER,
                color: mode === "monthly" ? ACCENT : "#9ca3af",
              }}
            >
              <LayoutGrid size={13} />
              Monthly
            </button>
            <button
              onClick={() => setMode("weekly")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: mode === "weekly" ? `${ACCENT}20` : "rgba(255,255,255,0.04)",
                border: mode === "weekly" ? `1px solid ${ACCENT}50` : BORDER,
                color: mode === "weekly" ? ACCENT : "#9ca3af",
              }}
            >
              <BarChart3 size={13} />
              Weekly
            </button>
          </div>
        </div>

        {/* Month navigator */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ChevronLeft size={18} style={{ color: "#9ca3af" }} />
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
            <ChevronRight size={18} style={{ color: "#9ca3af" }} />
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-4">
          <div
            className="rounded-2xl p-5"
            style={{ background: CARD_BG, border: BORDER }}
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={15} style={{ color: ACCENT }} />
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                {isCurrentMonth ? "This Month" : `${MONTHS[viewMonth]} ${viewYear}`}
              </p>
            </div>
            {isLoading ? (
              <div className="h-7 w-24 rounded-lg bg-white/5 animate-pulse" />
            ) : (
              <p className="text-2xl font-bold text-white">
                ${monthTotal.toLocaleString()}
              </p>
            )}
          </div>

          <div
            className="rounded-2xl p-5"
            style={{ background: CARD_BG, border: BORDER }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={15} style={{ color: isCurrentMonth ? "#22c55e" : ACCENT }} />
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                {isCurrentMonth ? "Projected" : "Best Day"}
              </p>
            </div>
            {isLoading ? (
              <div className="h-7 w-24 rounded-lg bg-white/5 animate-pulse" />
            ) : isCurrentMonth ? (
              <>
                <p className="text-2xl font-bold" style={{ color: "#22c55e" }}>
                  ${projected.toLocaleString()}
                </p>
                <p className="text-[10px] text-gray-600 mt-1">
                  Based on current pace +5%
                </p>
              </>
            ) : (
              <>
                {(() => {
                  const bestDay = Array.from(dailyMap.entries()).sort((a, b) => b[1] - a[1])[0];
                  return bestDay ? (
                    <>
                      <p className="text-2xl font-bold" style={{ color: ACCENT }}>
                        ${Math.round(bestDay[1]).toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-600 mt-1">
                        Day {bestDay[0]} of {MONTHS[viewMonth]}
                      </p>
                    </>
                  ) : (
                    <p className="text-2xl font-bold text-gray-600">—</p>
                  );
                })()}
              </>
            )}
          </div>
        </div>

        {/* Calendar or bar chart */}
        {mode === "monthly" ? (
          <div
            className="rounded-2xl p-5"
            style={{ background: CARD_BG, border: BORDER }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={14} style={{ color: ACCENT }} />
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Daily Earnings
              </p>
            </div>
            {/* Day labels */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {DAY_LABELS.map(d => (
                <div key={d} className="text-center text-[10px] font-semibold text-gray-600">
                  {d}
                </div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for offset */}
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const amount = Math.round(dailyMap.get(day) ?? 0);
                const isToday =
                  isCurrentMonth && day === today.getDate();
                return (
                  <DayCell
                    key={day}
                    day={day}
                    amount={amount}
                    isToday={isToday}
                  />
                );
              })}
            </div>
            {monthTotal === 0 && !isLoading && (
              <p className="text-center text-xs text-gray-600 mt-4">
                No earnings recorded for this month yet.
              </p>
            )}
          </div>
        ) : (
          <div
            className="rounded-2xl p-5"
            style={{ background: CARD_BG, border: BORDER }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={14} style={{ color: ACCENT }} />
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Weekly Earnings
              </p>
            </div>
            {isLoading ? (
              <div className="h-48 rounded-xl bg-white/5 animate-pulse" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyData} barSize={36}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tick={{ fill: "#6b7280", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `$${v}`}
                  />
                  <Tooltip
                    formatter={(v: number) => [`$${v.toLocaleString()}`, "Earnings"]}
                    contentStyle={{
                      background: "#0D1F38",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 8,
                      color: "#fff",
                      fontSize: 12,
                    }}
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
