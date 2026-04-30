/**
 * Field OS -- Earnings Tab (v3)
 * Design system: Teal #0D9488 (actions) | Lime #E8FF47 (money) | Navy #070D1A (bg)
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { FOS } from "./fosTokens";
import {
  DollarSign, Clock, CheckCircle2,
  Loader2, Flame, Calendar, Zap
} from "lucide-react";

const PERIODS = ["7D", "30D", "90D", "All"] as const;
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
            key={i} x={x} y={H - h} width={barW} height={h} rx="2"
            fill={d.amt > 0 ? FOS.lime : FOS.ghost}
            opacity={d.amt > 0 ? 0.85 : 0.35}
            style={{ filter: d.amt > 0 ? `drop-shadow(0 0 4px ${FOS.limeGlow})` : "none" }}
          />
        );
      })}
    </svg>
  );
}

/* -- Commission row --------------------------------------------------------- */
function CommissionRow({ c, idx }: { c: any; idx: number }) {
  const isPaid  = c.status === "paid";
  const amount  = Number(c.amount ?? 0);
  const date    = new Date(c.createdAt ?? c.updatedAt ?? 0);
  const color   = isPaid ? FOS.green : FOS.lime;
  return (
    <div
      className="flex items-center justify-between px-4 py-3"
      style={{ borderTop: idx > 0 ? `1px solid ${FOS.border}` : "none" }}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
          {isPaid
            ? <CheckCircle2 className="w-4 h-4" style={{ color: FOS.green }} />
            : <Clock        className="w-4 h-4" style={{ color: FOS.lime  }} />
          }
        </div>
        <div>
          <p className="text-sm font-medium leading-tight" style={{ color: "rgba(255,255,255,0.85)" }}>
            {c.opportunityType ?? "Commission"}
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: FOS.faint }}>
            {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-black text-sm" style={{ color }}>+${amount.toFixed(2)}</p>
        <p className="text-[9px] uppercase tracking-wider" style={{ color: FOS.faint }}>{c.status}</p>
      </div>
    </div>
  );
}

export default function FieldEarnings() {
  const [period, setPeriod] = useState<Period>("30D");

  const { data: earned, isLoading: loadingEarned } = trpc.partners.getEarnedCommissions.useQuery();
  const { data: paid,   isLoading: loadingPaid   } = trpc.partners.getPaidCommissions.useQuery();
  const { data: myJobs } = trpc.partners.getMyJobs.useQuery();

  const isLoading = loadingEarned || loadingPaid;

  const now        = new Date();
  const periodDays = period === "7D" ? 7 : period === "30D" ? 30 : period === "90D" ? 90 : 3650;
  const cutoff     = new Date(now.getTime() - periodDays * 86400000);

  const allCommissions = [...(earned ?? []), ...(paid ?? [])];
  const filtered       = allCommissions.filter((c: any) => {
    const d = new Date(c.createdAt ?? c.updatedAt ?? 0);
    return period === "All" || d >= cutoff;
  });

  const totalEarned = filtered.reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
  const pendingAmt  = (earned ?? []).filter((c: any) => c.status === "pending").reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
  const paidAmt     = (paid   ?? []).filter((c: any) => c.status === "paid"   ).reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);

  // Bar chart
  const chartDays = period === "7D" ? 7 : 30;
  const barData   = Array.from({ length: chartDays }, (_, i) => {
    const d   = new Date(now.getTime() - (chartDays - 1 - i) * 86400000);
    const ds  = d.toDateString();
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

  // Next Friday payout
  const nextFriday = new Date();
  const daysUntil  = (5 - nextFriday.getDay() + 7) % 7 || 7;
  nextFriday.setDate(nextFriday.getDate() + daysUntil);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3" style={{ background: FOS.bg }}>
        <Loader2 className="w-7 h-7 animate-spin" style={{ color: FOS.lime }} />
        <p className="text-sm" style={{ color: FOS.muted }}>Loading earnings...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-4 min-h-full" style={{ background: FOS.bg }}>

      {/* -- Header -- */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: FOS.muted }}>Your Money</p>
            <h2 className="text-white text-2xl font-black">Earnings</h2>
          </div>
          {streak >= 3 && (
            <div
              className="flex items-center gap-1.5 rounded-xl px-3 py-2"
              style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.20)" }}
            >
              <Flame className="w-4 h-4" style={{ color: "#F59E0B" }} />
              <div>
                <p className="text-xs font-black leading-none" style={{ color: "#F59E0B" }}>{streak}</p>
                <p className="text-[9px] leading-none mt-0.5" style={{ color: "rgba(245,158,11,0.5)" }}>day streak</p>
              </div>
            </div>
          )}
        </div>

        {/* Period pills */}
        <div className="flex gap-2">
          {PERIODS.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="flex-1 py-1.5 rounded-xl text-xs font-bold transition-all"
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

      {/* -- Hero total -- */}
      <div className="px-5 mb-5">
        <div className="rounded-3xl p-5" style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
          <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: FOS.muted }}>Total ({period})</p>
          <p className="text-4xl font-black mb-4" style={{ color: FOS.lime }}>
            ${totalEarned.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>

          <SparkBars data={barData} />

          {/* Sub-stats */}
          <div className="flex gap-4 mt-4 pt-4" style={{ borderTop: `1px solid ${FOS.border}` }}>
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

      {/* -- Next payout -- */}
      <div className="px-5 mb-5">
        <div
          className="rounded-2xl px-4 py-3.5 flex items-center justify-between"
          style={{ background: FOS.limeDim, border: `1px solid ${FOS.lime}20` }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: FOS.limeDim }}>
              <Calendar className="w-4 h-4" style={{ color: FOS.lime }} />
            </div>
            <div>
              <p className="text-white text-sm font-bold">Next Payout</p>
              <p className="text-xs" style={{ color: FOS.muted }}>
                {nextFriday.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-black text-base" style={{ color: FOS.lime }}>${pendingAmt.toFixed(2)}</p>
            <p className="text-[10px]" style={{ color: FOS.faint }}>estimated</p>
          </div>
        </div>
      </div>

      {/* -- Transaction history -- */}
      <div className="px-5">
        <p className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: FOS.muted }}>History</p>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
            <Zap className="w-8 h-8" style={{ color: FOS.faint }} />
            <p className="text-sm" style={{ color: FOS.muted }}>No commissions in this period</p>
            <p className="text-xs" style={{ color: FOS.faint }}>Log jobs and accept leads to start earning</p>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
            {filtered
              .sort((a: any, b: any) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
              .slice(0, 20)
              .map((c: any, idx: number) => <CommissionRow key={c.id} c={c} idx={idx} />)
            }
          </div>
        )}
      </div>
    </div>
  );
}
