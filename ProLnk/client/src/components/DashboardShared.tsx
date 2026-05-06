/**
 * DashboardShared.tsx
 * Shared design tokens, components, and utilities for the 7 executive dashboards.
 * Dark-mode, data-rich aesthetic inspired by premium SaaS analytics platforms.
 */
import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

// ─── Design Tokens ────────────────────────────────────────────────────────────

export const D = {
  // Backgrounds
  bg:        "#0D0F14",
  surface:   "#13161E",
  card:      "#1A1E2A",
  cardHover: "#1F2435",
  border:    "#252A3A",
  borderHi:  "#2E3450",

  // Text
  text:      "#F0F2FF",
  muted:     "#8B91A8",
  dim:       "#555B72",

  // Brand colors
  cyan:      "#00D4FF",
  green:     "#00E676",
  amber:     "#FFB300",
  red:       "#FF4444",
  purple:    "#A855F7",
  pink:      "#EC4899",
  blue:      "#3B82F6",
  teal:      "#14B8A6",
  orange:    "#F97316",
  lime:      "#84CC16",

  // Gradients
  gradCyan:   "linear-gradient(135deg, #00D4FF22, #00D4FF44)",
  gradGreen:  "linear-gradient(135deg, #00E67622, #00E67644)",
  gradAmber:  "linear-gradient(135deg, #FFB30022, #FFB30044)",
  gradRed:    "linear-gradient(135deg, #FF444422, #FF444444)",
  gradPurple: "linear-gradient(135deg, #A855F722, #A855F744)",
  gradBlue:   "linear-gradient(135deg, #3B82F622, #3B82F644)",
};

export const DFONT = "'Inter', system-ui, sans-serif";

// ─── Metric Card ─────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: number;   // positive = up, negative = down, 0 = flat
  color?: string;
  icon?: ReactNode;
  gradient?: string;
  sparkline?: number[];
}

export function MetricCard({ label, value, sub, trend, color = D.cyan, icon, gradient, sparkline }: MetricCardProps) {
  const trendColor = trend == null ? D.muted : trend > 0 ? D.green : trend < 0 ? D.red : D.amber;
  const TrendIcon = trend == null ? null : trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
  const maxSpark = sparkline ? Math.max(...sparkline, 1) : 1;

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5 flex flex-col gap-3 transition-all cursor-default"
      style={{
        background: gradient ?? `linear-gradient(135deg, ${color}08, ${color}18)`,
        border: `1px solid ${color}30`,
      }}
    >
      {/* Glow orb */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none"
        style={{ backgroundColor: color }}
      />

      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: D.muted }}>{label}</span>
        {icon && (
          <div
            className="flex items-center justify-center w-9 h-9 rounded-xl"
            style={{ background: `${color}20`, color }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <div>
        <p className="text-3xl font-black tracking-tight" style={{ color: D.text }}>{value}</p>
        {sub && <p className="text-xs mt-0.5" style={{ color: D.muted }}>{sub}</p>}
      </div>

      {/* Trend */}
      {TrendIcon && trend != null && (
        <div className="flex items-center gap-1.5">
          <TrendIcon className="w-3.5 h-3.5" style={{ color: trendColor }} />
          <span className="text-xs font-semibold" style={{ color: trendColor }}>
            {Math.abs(trend)}% vs last month
          </span>
        </div>
      )}

      {/* Mini sparkline */}
      {sparkline && (
        <div className="flex items-end gap-0.5 h-8">
          {sparkline.map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm transition-all"
              style={{
                height: `${(v / maxSpark) * 100}%`,
                backgroundColor: i === sparkline.length - 1 ? color : `${color}50`,
                minHeight: 2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-base font-bold" style={{ color: D.text }}>{title}</h2>
        {subtitle && <p className="text-xs mt-0.5" style={{ color: D.muted }}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ─── Data Table ───────────────────────────────────────────────────────────────

interface TableRow {
  [key: string]: string | number | ReactNode;
}

export function DataTable({ columns, rows, accentCol }: {
  columns: { key: string; label: string; align?: "left" | "right" | "center" }[];
  rows: TableRow[];
  accentCol?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${D.border}` }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: `1px solid ${D.border}`, backgroundColor: D.surface }}>
            {columns.map(col => (
              <th
                key={col.key}
                className="px-4 py-3 text-xs font-bold uppercase tracking-widest"
                style={{ color: D.muted, textAlign: col.align ?? "left" }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                borderBottom: i < rows.length - 1 ? `1px solid ${D.border}` : "none",
                backgroundColor: i % 2 === 0 ? D.card : D.surface,
              }}
            >
              {columns.map(col => (
                <td
                  key={col.key}
                  className="px-4 py-3"
                  style={{
                    color: col.key === accentCol ? D.cyan : D.text,
                    textAlign: col.align ?? "left",
                    fontWeight: col.key === accentCol ? 600 : 400,
                  }}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────

export function BarChart({ data, color = D.cyan, height = 120 }: {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
}) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <span className="text-[10px]" style={{ color: D.muted }}>{d.value.toLocaleString()}</span>
          <div
            className="w-full rounded-t-md transition-all"
            style={{
              height: `${(d.value / max) * (height - 28)}px`,
              background: `linear-gradient(180deg, ${color}, ${color}80)`,
              minHeight: 4,
            }}
          />
          <span className="text-[10px] text-center truncate w-full" style={{ color: D.muted }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Donut Chart ──────────────────────────────────────────────────────────────

export function DonutChart({ segments, size = 100 }: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const r = 40;
  const cx = 50;
  const cy = 50;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const arcs = segments.map(seg => {
    const pct = seg.value / total;
    const dash = pct * circumference;
    const arc = { ...seg, dash, offset, pct };
    offset += dash;
    return arc;
  });

  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={D.border} strokeWidth="12" />
        {arcs.map((arc, i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={arc.color}
            strokeWidth="12"
            strokeDasharray={`${arc.dash} ${circumference - arc.dash}`}
            strokeDashoffset={-arc.offset}
            transform="rotate(-90 50 50)"
            strokeLinecap="round"
          />
        ))}
        <text x="50" y="54" textAnchor="middle" fontSize="14" fontWeight="bold" fill={D.text}>
          {total.toLocaleString()}
        </text>
      </svg>
      <div className="flex flex-col gap-1.5">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-xs" style={{ color: D.muted }}>{seg.label}</span>
            <span className="text-xs font-semibold ml-auto" style={{ color: D.text }}>{seg.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

export function StatusBadge({ status }: { status: "active" | "pending" | "inactive" | "error" | "success" | "warning" | string }) {
  const map: Record<string, { color: string; bg: string }> = {
    active:   { color: D.green,  bg: `${D.green}20` },
    success:  { color: D.green,  bg: `${D.green}20` },
    pending:  { color: D.amber,  bg: `${D.amber}20` },
    warning:  { color: D.amber,  bg: `${D.amber}20` },
    inactive: { color: D.muted,  bg: `${D.muted}20` },
    error:    { color: D.red,    bg: `${D.red}20` },
  };
  const style = map[status] ?? { color: D.cyan, bg: `${D.cyan}20` };
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize"
      style={{ color: style.color, backgroundColor: style.bg }}
    >
      {status}
    </span>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

export function ProgressBar({ value, max = 100, color = D.cyan, label, showPct = true }: {
  value: number;
  max?: number;
  color?: string;
  label?: string;
  showPct?: boolean;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="flex flex-col gap-1.5">
      {(label || showPct) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs" style={{ color: D.muted }}>{label}</span>}
          {showPct && <span className="text-xs font-semibold" style={{ color: D.text }}>{pct.toFixed(0)}%</span>}
        </div>
      )}
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: D.border }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}80, ${color})` }}
        />
      </div>
    </div>
  );
}

// ─── Activity Feed Item ───────────────────────────────────────────────────────

export function ActivityItem({ time, message, type = "info", icon }: {
  time: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
  icon?: ReactNode;
}) {
  const color = type === "success" ? D.green : type === "warning" ? D.amber : type === "error" ? D.red : D.cyan;
  return (
    <div className="flex items-start gap-3 py-2.5" style={{ borderBottom: `1px solid ${D.border}` }}>
      <div
        className="flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 mt-0.5"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {icon ?? <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs leading-relaxed" style={{ color: D.text }}>{message}</p>
        <p className="text-[10px] mt-0.5" style={{ color: D.dim }}>{time}</p>
      </div>
    </div>
  );
}

// ─── Dashboard Card Wrapper ───────────────────────────────────────────────────

export function DCard({ children, className = "", style = {} }: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl p-5 ${className}`}
      style={{ backgroundColor: D.card, border: `1px solid ${D.border}`, ...style }}
    >
      {children}
    </div>
  );
}
