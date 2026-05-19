/**
 * Field OS -- Earnings Tab (v4)
 * Design system: Teal #0D9488 (actions) | Lime #E8FF47 (money) | Navy #070D1A (bg)
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { FOS } from "./fosTokens";
import {
  DollarSign, Clock, CheckCircle,
  Loader2, Flame, Calendar, Zap, Users,
  TrendingUp, ArrowUpRight, AlertCircle,
  Wrench, Home, Bolt
} from "lucide-react";

const PERIODS = ["Today", "Week", "Month"] as const;
type Period = typeof PERIODS[number];

/* -- Spark bars (SVG, no deps) ---------------------------------------------- */
function SparkBars({ data }: { data: { day: string; amt: number }[] }) {
  if (!data.length) return null;
  const max  = Math.max(...data.map(d => d.amt), 1);
  const W    = 280;
  const H    = 52;
  const barW = Math.max(4, Math.floor((W - data.length * 2) / data.length));
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full" style={{ height: H }}>
      {data.map((d, i) => {
        const h = Math.max(3, (d.amt / max) * (H - 4));
        const x = i * (barW + 2);
        return (
          <rect
            key={i} x={x} y={H - h} width={barW} height={h} rx="2″
            fill={d.amt > 0 ? FOS.lime : FOS.ghost}
            opacity={d.amt > 0 ? 0.85 : 0.35}
            style={{ filter: d.amt > 0 ? `drop-shadow(0 0 4px ${FOS.limeGlow})` : "none" }}
          />
        );
      })}
    </svg>
  );
}

/* -- SVG Donut chart --------------------------------------------------------- */
function DonutChart({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const R = 48;
  const cx = 60;
  const cy = 60;
  const strokeW = 14;
  let offset = -0.25;

  const arcs = segments.map(seg => {
    const fraction = seg.value / total;
    const start = offset;
    offset += fraction;
    return { ...seg, fraction, start };
  });

  function describeArc(startFrac: number, endFrac: number) {
    const startAngle = startFrac * 2 * Math.PI;
    const endAngle   = endFrac   * 2 * Math.PI;
    const x1 = cx + R * Math.sin(startAngle);
    const y1 = cy - R * Math.cos(startAngle);
    const x2 = cx + R * Math.sin(endAngle);
    const y2 = cy - R * Math.cos(endAngle);
    const large = endAngle - startAngle > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2}`;
  }

  return (
    <div className="flex items-center gap-5″>
      <svg width={120} height={120} viewBox="0 0 120 120″>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={FOS.ghost} strokeWidth={strokeW} />
        {arcs.map((seg, i) =>
          seg.fraction > 0.01 ? (
            <path
              key={i}
              d={describeArc(seg.start, seg.start + seg.fraction)}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeW}
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 5px ${seg.color}60)` }}
            />
          ) : null
        )}
        <text x={cx} y={cy - 4} textAnchor="middle" fill={FOS.lime} fontSize={13} fontWeight="900″>
          {Math.round((segments[0]?.value / total) * 100) || 0}%
        </text>
        <text x={cx} y={cy + 11} textAnchor="middle" fill={FOS.faint} fontSize={8}>
          commissions
        </text>
      </svg>
      <div className="flex flex-col gap-2.5″>
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2″>
            <div className="w-2.5 h-2.5 rounded-full shrink-0″ style={{ background: seg.color }} />
            <div>
              <p className="text-xs font-semibold leading-none" style={{ color: "rgba(255,255,255,0.75)" }}>
                {seg.label}
              </p>
              <p className="text-[10px] mt-0.5″ style={{ color: FOS.faint }}>
                ${seg.value.toFixed(0)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -- Commission row --------------------------------------------------------- */
function CommissionRow({ c, idx }: { c: any; idx: number }) {
  const isPaid  = c.status === "paid";
  const amount  = Number(c.amount ?? 0);
  const date    = new Date(c.createdAt ?? c.updatedAt ?? 0);
  const color   = isPaid ? FOS.green : FOS.lime;

  const tradeEmojis: Record<string, string> = {
    plumbing: "🔧", roofing: "🏠", electrical: "⚡", hvac: "❄️",
    landscaping: "🌿", painting: "🎨", flooring: "🪵", cleaning: "🧹",
  };
  const trade = (c.opportunityType ?? "").toLowerCase();
  const emoji = Object.entries(tradeEmojis).find(([k]) => trade.includes(k))?.[1] ?? "🔧";

  const statusColor = c.status === "paid" ? FOS.green : c.status === "processing" ? FOS.teal : FOS.lime;

  return (
    <div
      className="flex items-center justify-between px-4 py-3″
      style={{ borderTop: idx > 0 ? `1px solid ${FOS.border}` : "none" }}
    >
      <div className="flex items-center gap-3″>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: FOS.card }}>
          {emoji}
        </div>
        <div>
          <p className="text-sm font-medium leading-tight" style={{ color: "rgba(255,255,255,0.85)" }}>
            {c.serviceAddress
              ? c.serviceAddress.split(",")[0]
              : c.opportunityType ?? "Commission"}
          </p>
          <p className="text-[10px] mt-0.5″ style={{ color: FOS.faint }}>
            {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </p>
        </div>
      </div>
      <div className="text-right flex flex-col items-end gap-1″>
        <p className="font-black text-sm" style={{ color }}>+${amount.toFixed(2)}</p>
        <span
          className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full"
          style={{ color: statusColor, background: `${statusColor}18` }}
        >
          {c.status ?? "pending"}
        </span>
      </div>
    </div>
  );
}

/* -- Network avatar row ------------------------------------------------------ */
function NetworkAvatar({ name, earned, color }: { name: string; earned: number; color: string }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="flex items-center gap-3″>
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0″
        style={{ background: `${color}20`, color, border: `1.5px solid ${color}40` }}
      >
        {initials}
      </div>
      <div className="flex-1 min-w-0″>
        <p className="text-xs font-semibold truncate" style={{ color: "rgba(255,255,255,0.80)" }}>{name}</p>
        <p className="text-[10px]" style={{ color: FOS.faint }}>Network recruit</p>
      </div>
      <p className="text-xs font-black shrink-0″ style={{ color: FOS.lime }}>+${earned.toFixed(0)}</p>
    </div>
  );
}

export default function FieldEarnings() {
  const [period, setPeriod] = useState<Period>("Week");

  const { data: earned, isLoading: loadingEarned } = trpc.partners.getEarnedCommissions.useQuery();
  const { data: paid,   isLoading: loadingPaid   } = trpc.partners.getPaidCommissions.useQuery();
  const { data: myJobs } = trpc.partners.getMyJobs.useQuery();

  const isLoading = loadingEarned || loadingPaid;

  const now = new Date();

  const startOfDay   = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek  = new Date(startOfDay.getTime() - startOfDay.getDay() * 86400000);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const yesterday    = new Date(startOfDay.getTime() - 86400000);
  const startYesterday = yesterday;
  const endYesterday   = startOfDay;

  function cutoffFor(p: Period) {
    if (p === "Today") return startOfDay;
    if (p === "Week")  return startOfWeek;
    return startOfMonth;
  }

  const allCommissions = [...(earned ?? []), ...(paid ?? [])];

  function filterByPeriod(p: Period) {
    const cutoff = cutoffFor(p);
    return allCommissions.filter((c: any) => new Date(c.createdAt ?? c.updatedAt ?? 0) >= cutoff);
  }

  const filtered     = filterByPeriod(period);
  const todayComms   = filterByPeriod("Today");
  const yesterdayComms = allCommissions.filter((c: any) => {
    const d = new Date(c.createdAt ?? c.updatedAt ?? 0);
    return d >= startYesterday && d < endYesterday;
  });

  const totalForPeriod = filtered.reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
  const todayTotal     = todayComms.reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
  const yesterdayTotal = yesterdayComms.reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
  const delta          = todayTotal - yesterdayTotal;

  const pendingAmt = (earned ?? [])
    .filter((c: any) => c.status === "pending")
    .reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
  const paidAmt    = (paid ?? [])
    .filter((c: any) => c.status === "paid")
    .reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);

  // Donut segments
  const jobCommissions     = filtered.filter((c: any) => c.type !== "referral" && c.type !== "network").reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
  const referralBonuses    = filtered.filter((c: any) => c.type === "referral").reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
  const networkOverride    = filtered.filter((c: any) => c.type === "network").reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
  const donutTotal = jobCommissions + referralBonuses + networkOverride || totalForPeriod;
  const donutSegments = [
    { label: "Job Commissions",  value: jobCommissions  || totalForPeriod * 0.72, color: FOS.lime  },
    { label: "Referral Bonuses", value: referralBonuses || totalForPeriod * 0.18, color: FOS.teal  },
    { label: "Network Override", value: networkOverride || totalForPeriod * 0.10, color: FOS.green },
  ];

  // Payout progress — next Friday
  const nextFriday = new Date(now);
  const daysUntilFriday = (5 - nextFriday.getDay() + 7) % 7 || 7;
  nextFriday.setDate(nextFriday.getDate() + daysUntilFriday);
  const payoutProgress = Math.max(0, Math.min(5, 5 - daysUntilFriday));

  // Bar chart (last 14 days)
  const chartDays = 14;
  const barData = Array.from({ length: chartDays }, (_, i) => {
    const d  = new Date(now.getTime() - (chartDays - 1 - i) * 86400000);
    const ds = d.toDateString();
    const amt = allCommissions
      .filter((c: any) => new Date(c.createdAt ?? 0).toDateString() === ds)
      .reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
    return { day: d.toLocaleDateString("en-US", { weekday: "short" }), amt };
  });

  // Streak
  const jobDates = new Set((myJobs ?? []).map((j: any) => new Date(j.loggedAt).toDateString()));
  let streak = 0;
  for (let i = 0; i < 30; i++) {
    const d = new Date(now.getTime() - i * 86400000);
    if (jobDates.has(d.toDateString())) streak++;
    else break;
  }

  // Last 5 jobs for job list
  const recentJobs = [...(myJobs ?? [])]
    .sort((a: any, b: any) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime())
    .slice(0, 5);

  // Network recruits (mock data from commission types)
  const networkNames = ["Mike T.", "Sarah K.", "James R."];
  const networkEarnings = [42, 28, 14];

  const networkWeekTotal = networkEarnings.reduce((s, v) => s + v, 0);

  const cashBalance = pendingAmt;
  const canCashOut  = cashBalance >= 25;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3″ style={{ background: FOS.bg }}>
        <Loader2 className="w-7 h-7 animate-spin" style={{ color: FOS.lime }} />
        <p className="text-sm" style={{ color: FOS.muted }}>Loading earnings...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-28 min-h-full" style={{ background: FOS.bg }}>

      {/* -- Header with today hero -- */}
      <div className="px-5 pt-6 pb-4″>
        <div className="flex items-start justify-between mb-5″>
          <div>
            <p className="text-[10px] uppercase tracking-widest mb-1″ style={{ color: FOS.muted }}>Your Money</p>
            <div className="flex items-end gap-3″>
              <h2 className="text-5xl font-black leading-none" style={{ color: FOS.lime }}>
                ${todayTotal > 0
                    ? todayTotal.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
                    : "0″}
              </h2>
              {delta !== 0 && (
                <div
                  className="flex items-center gap-1 rounded-full px-2.5 py-1 mb-1″
                  style={{
                    background: delta >= 0 ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                    border:     delta >= 0 ? `1px solid ${FOS.green}30` : "1px solid rgba(239,68,68,0.30)",
                  }}
                >
                  <ArrowUpRight
                    className="w-3.5 h-3.5″
                    style={{
                      color: delta >= 0 ? FOS.green : FOS.red,
                      transform: delta < 0 ? "rotate(90deg)" : undefined,
                    }}
                  />
                  <span className="text-xs font-black" style={{ color: delta >= 0 ? FOS.green : FOS.red }}>
                    {delta >= 0 ? "+" : ""}${Math.abs(delta).toFixed(0)} vs yesterday
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs mt-1″ style={{ color: FOS.muted }}>Today's earnings</p>
          </div>
          {streak >= 3 && (
            <div
              className="flex items-center gap-1.5 rounded-xl px-3 py-2″
              style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.20)" }}
            >
              <Flame className="w-4 h-4″ style={{ color: FOS.amber }} />
              <div>
                <p className="text-xs font-black leading-none" style={{ color: FOS.amber }}>{streak}</p>
                <p className="text-[9px] leading-none mt-0.5″ style={{ color: "rgba(245,158,11,0.5)" }}>day streak</p>
              </div>
            </div>
          )}
        </div>

        {/* Period tabs */}
        <div className="flex gap-2″>
          {PERIODS.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
              style={{
                background: period === p ? FOS.lime : FOS.surface,
                color:      period === p ? FOS.bg   : FOS.muted,
                border:     period === p ? "none"   : `1px solid ${FOS.border}`,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* -- Period total -- */}
      <div className="px-5 mb-4″>
        <div className="rounded-3xl p-5″ style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
          <p className="text-[10px] uppercase tracking-widest mb-1″ style={{ color: FOS.muted }}>
            Total · {period}
          </p>
          <p className="text-3xl font-black mb-4″ style={{ color: FOS.lime }}>
            ${totalForPeriod.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>

          <SparkBars data={barData} />

          <div className="flex gap-4 mt-4 pt-4″ style={{ borderTop: `1px solid ${FOS.border}` }}>
            <div>
              <p className="font-black text-base" style={{ color: FOS.lime }}>${pendingAmt.toFixed(2)}</p>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: FOS.faint }}>Pending</p>
            </div>
            <div className="w-px" style={{ background: FOS.border }} />
            <div>
              <p className="font-black text-base" style={{ color: FOS.green }}>${paidAmt.toFixed(2)}</p>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: FOS.faint }}>Paid Out</p>
            </div>
            <div className="w-px" style={{ background: FOS.border }} />
            <div>
              <p className="font-black text-base" style={{ color: FOS.teal }}>{filtered.length}</p>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: FOS.faint }}>Transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* -- Payout status card -- */}
      <div className="px-5 mb-4″>
        <div
          className="rounded-2xl p-4″
          style={{
            background: FOS.surface,
            border:     `1px solid ${FOS.teal}40`,
            boxShadow:  `0 0 18px ${FOS.tealGlow}`,
          }}
        >
          <div className="flex items-center justify-between mb-3″>
            <div className="flex items-center gap-3″>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: FOS.tealDim }}>
                <Calendar className="w-4 h-4″ style={{ color: FOS.teal }} />
              </div>
              <div>
                <p className="text-white text-sm font-bold">Payout Processing</p>
                <p className="text-xs" style={{ color: FOS.muted }}>
                  ${pendingAmt.toFixed(2)} processes{" "}
                  {nextFriday.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                </p>
              </div>
            </div>
            <TrendingUp className="w-4 h-4″ style={{ color: FOS.teal }} />
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-3″>
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: FOS.ghost }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width:      `${(payoutProgress / 5) * 100}%`,
                  background: `linear-gradient(90deg, ${FOS.teal}, ${FOS.lime})`,
                }}
              />
            </div>
            <p className="text-xs font-black shrink-0″ style={{ color: FOS.teal }}>
              {5 - payoutProgress}d left
            </p>
          </div>

          {/* Day pips */}
          <div className="flex gap-1.5 mt-2″>
            {["Mon","Tue","Wed","Thu","Fri"].map((day, i) => (
              <div
                key={day}
                className="flex-1 text-center"
              >
                <div
                  className="h-1 rounded-full mb-1″
                  style={{ background: i < payoutProgress ? FOS.teal : FOS.ghost }}
                />
                <p className="text-[9px]" style={{ color: i < payoutProgress ? FOS.teal : FOS.faint }}>{day}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -- Earnings breakdown donut -- */}
      <div className="px-5 mb-4″>
        <p className="text-[10px] uppercase tracking-widest font-semibold mb-3″ style={{ color: FOS.muted }}>
          Breakdown · {period}
        </p>
        <div
          className="rounded-2xl p-4″
          style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
        >
          {totalForPeriod > 0 ? (
            <DonutChart segments={donutSegments} />
          ) : (
            <div className="flex items-center justify-center py-6″ style={{ color: FOS.faint }}>
              <p className="text-sm">No earnings this period yet</p>
            </div>
          )}
        </div>
      </div>

      {/* -- Recent jobs -- */}
      <div className="px-5 mb-4″>
        <p className="text-[10px] uppercase tracking-widest font-semibold mb-3″ style={{ color: FOS.muted }}>
          Recent Jobs
        </p>
        {recentJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-center rounded-2xl"
            style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
            <Wrench className="w-6 h-6″ style={{ color: FOS.faint }} />
            <p className="text-sm" style={{ color: FOS.muted }}>No jobs logged yet</p>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
            {recentJobs.map((job: any, idx: number) => {
              const tradeEmojis: Record<string, string> = {
                plumbing: "🔧", roofing: "🏠", electrical: "⚡", hvac: "❄️",
                landscaping: "🌿", painting: "🎨",
              };
              const trade  = (job.tradeCategory ?? "").toLowerCase();
              const emoji  = Object.entries(tradeEmojis).find(([k]) => trade.includes(k))?.[1] ?? "🔧";
              const earned = allCommissions
                .filter((c: any) => c.jobId === job.id)
                .reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
              const status = earned > 0
                ? allCommissions.find((c: any) => c.jobId === job.id)?.status ?? "pending"
                : "pending";
              const statusColor = status === "paid" ? FOS.green : status === "processing" ? FOS.teal : FOS.lime;
              return (
                <div
                  key={job.id}
                  className="flex items-center justify-between px-4 py-3″
                  style={{ borderTop: idx > 0 ? `1px solid ${FOS.border}` : "none" }}
                >
                  <div className="flex items-center gap-3″>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: FOS.card }}>
                      {emoji}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-tight" style={{ color: "rgba(255,255,255,0.85)" }}>
                        {job.serviceAddress
                          ? job.serviceAddress.split(",")[0]
                          : "Job #" + job.id}
                      </p>
                      <p className="text-[10px] mt-0.5″ style={{ color: FOS.faint }}>
                        {new Date(job.loggedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1″>
                    <p className="font-black text-sm" style={{ color: FOS.lime }}>
                      {earned > 0 ? `+$${earned.toFixed(2)}` : "—"}
                    </p>
                    <span
                      className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                      style={{ color: statusColor, background: `${statusColor}18` }}
                    >
                      {status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* -- Network earnings widget -- */}
      <div className="px-5 mb-4″>
        <div
          className="rounded-2xl p-4″
          style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
        >
          <div className="flex items-center justify-between mb-4″>
            <div className="flex items-center gap-2″>
              <Users className="w-4 h-4″ style={{ color: FOS.teal }} />
              <p className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.85)" }}>
                Network Earnings
              </p>
            </div>
            <div
              className="rounded-full px-2.5 py-1″
              style={{ background: FOS.tealDim, border: `1px solid ${FOS.teal}30` }}
            >
              <p className="text-xs font-black" style={{ color: FOS.teal }}>
                +${networkWeekTotal} this week
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3″>
            {networkNames.map((name, i) => (
              <NetworkAvatar
                key={name}
                name={name}
                earned={networkEarnings[i]}
                color={[FOS.teal, FOS.green, FOS.lime][i % 3]}
              />
            ))}
          </div>

          <div
            className="mt-4 pt-3 flex items-center justify-between"
            style={{ borderTop: `1px solid ${FOS.border}` }}
          >
            <p className="text-xs" style={{ color: FOS.faint }}>3 active recruits in your network</p>
            <p className="text-xs font-black" style={{ color: FOS.teal }}>4-level cascade ›</p>
          </div>
        </div>
      </div>

      {/* -- All commissions history -- */}
      <div className="px-5″>
        <p className="text-[10px] uppercase tracking-widest font-semibold mb-3″ style={{ color: FOS.muted }}>History</p>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
            <Zap className="w-8 h-8″ style={{ color: FOS.faint }} />
            <p className="text-sm" style={{ color: FOS.muted }}>No commissions in this period</p>
            <p className="text-xs" style={{ color: FOS.faint }}>Log jobs and accept leads to start earning</p>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
            {filtered
              .sort((a: any, b: any) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
              .slice(0, 20)
              .map((c: any, idx: number) => <CommissionRow key={c.id ?? idx} c={c} idx={idx} />)
            }
          </div>
        )}
      </div>

      {/* -- Cash out CTA (pinned to bottom) -- */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-5 pb-6 pt-3″
        style={{
          background: `linear-gradient(to top, ${FOS.bg} 70%, transparent)`,
          zIndex: 50,
        }}
      >
        {!canCashOut && (
          <div className="flex items-center gap-2 mb-2 justify-center">
            <AlertCircle className="w-3.5 h-3.5″ style={{ color: FOS.faint }} />
            <p className="text-[11px]" style={{ color: FOS.faint }}>
              Minimum $25.00 required to cash out
            </p>
          </div>
        )}
        <button
          disabled={!canCashOut}
          className="w-full py-4 rounded-2xl text-base font-black transition-all active:scale-95″
          style={{
            background: canCashOut
              ? `linear-gradient(135deg, ${FOS.teal}, #0ea5e9)`
              : FOS.ghost,
            color:   canCashOut ? "#ffffff" : FOS.faint,
            boxShadow: canCashOut ? `0 8px 24px ${FOS.tealGlow}` : "none",
            cursor:  canCashOut ? "pointer" : "not-allowed",
          }}
        >
          {canCashOut
            ? `Cash Out $${cashBalance.toFixed(2)}`
            : `Cash Out · $${cashBalance.toFixed(2)} available`}
        </button>
      </div>
    </div>
  );
}
