import { useState } from "react";
import {
  DollarSign, Download, Share2, TrendingUp, FileText, Info,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const D = {
  bg: "#0A1628",
  surface: "#0F1E36",
  card: "#152540",
  border: "#1E3A5F",
  text: "#F0F4FF",
  muted: "#7B96BB",
  dim: "#3A5478",
  teal: "#14B8A6",
  green: "#00E676",
  amber: "#FFB300",
  red: "#FF5555",
  cyan: "#00D4FF",
};

type Period = "thisMonth" | "lastMonth" | "ytd" | "full2025";

const PERIOD_LABELS: Record<Period, string> = {
  thisMonth: "This Month",
  lastMonth: "Last Month",
  ytd: "YTD 2026",
  full2025: "Full 2025",
};

interface IncomeData {
  directCommission: number;
  networkL1: number;
  networkL2: number;
  subscriptionOverrides: number;
  bonuses: number;
  subscription: number;
  mileage: number;
  tools: number;
  phone: number;
}

const INCOME_BY_PERIOD: Record<Period, IncomeData> = {
  thisMonth: {
    directCommission: 3240, networkL1: 247, networkL2: 89,
    subscriptionOverrides: 178, bonuses: 50,
    subscription: 149, mileage: 340, tools: 89, phone: 70,
  },
  lastMonth: {
    directCommission: 2890, networkL1: 198, networkL2: 67,
    subscriptionOverrides: 145, bonuses: 0,
    subscription: 149, mileage: 295, tools: 0, phone: 70,
  },
  ytd: {
    directCommission: 14200, networkL1: 1040, networkL2: 412,
    subscriptionOverrides: 780, bonuses: 200,
    subscription: 745, mileage: 1480, tools: 340, phone: 350,
  },
  full2025: {
    directCommission: 38400, networkL1: 2890, networkL2: 1120,
    subscriptionOverrides: 2140, bonuses: 500,
    subscription: 1788, mileage: 3640, tools: 890, phone: 840,
  },
};

const YTD_MONTHLY = [
  { month: "Jan", net: 2100 },
  { month: "Feb", net: 2450 },
  { month: "Mar", net: 2890 },
  { month: "Apr", net: 3040 },
  { month: "May", net: 3156 },
];

function fmt(n: number, sign = false) {
  const s = Math.abs(n).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  if (sign && n < 0) return `-${s}`;
  return s;
}

function LineItem({
  label, value, color = D.text, sub,
}: {
  label: string; value: number; color?: string; sub?: boolean;
}) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: sub ? "7px 0 7px 16px" : "9px 0",
      borderBottom: `1px solid ${D.border}`,
    }}>
      <span style={{ color: sub ? D.muted : D.text, fontSize: sub ? 13 : 14 }}>{label}</span>
      <span style={{ color, fontWeight: sub ? 400 : 600, fontSize: sub ? 13 : 14 }}>
        {value < 0 ? `-${fmt(Math.abs(value))}` : fmt(value)}
      </span>
    </div>
  );
}

export default function IncomeStatement() {
  const [period, setPeriod] = useState<Period>("thisMonth");
  const [copied, setCopied] = useState(false);

  const d = INCOME_BY_PERIOD[period];

  const totalRevenue = d.directCommission + d.networkL1 + d.networkL2 + d.subscriptionOverrides + d.bonuses;
  const totalExpenses = d.subscription + d.mileage + d.tools + d.phone;
  const netIncome = totalRevenue - totalExpenses;
  const selfEmploymentTax = Math.round(netIncome * 0.153);
  const setAside = Math.round(netIncome * 0.22);

  function copyForCPA() {
    const text = [
      `ProLnk Income Statement — ${PERIOD_LABELS[period]}`,
      "",
      "REVENUE",
      `  Job commissions (direct): ${fmt(d.directCommission)}`,
      `  Network overrides (L1): ${fmt(d.networkL1)}`,
      `  Network overrides (L2): ${fmt(d.networkL2)}`,
      `  Subscription overrides: ${fmt(d.subscriptionOverrides)}`,
      `  Bonuses: ${fmt(d.bonuses)}`,
      `  Total Revenue: ${fmt(totalRevenue)}`,
      "",
      "EXPENSES",
      `  ProLnk subscription: -${fmt(d.subscription)}`,
      `  Vehicle mileage (est.): -${fmt(d.mileage)}`,
      `  Tools/equipment: -${fmt(d.tools)}`,
      `  Phone (business %): -${fmt(d.phone)}`,
      `  Total Expenses: -${fmt(totalExpenses)}`,
      "",
      `NET INCOME: ${fmt(netIncome)}`,
      "",
      `Estimated SE tax (15.3%): ${fmt(selfEmploymentTax)}`,
      `Recommended set-aside (22%): ${fmt(setAside)}`,
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function downloadPDF() {
    const content = `ProLnk Income Statement — ${PERIOD_LABELS[period]}\n\nRevenue: ${fmt(totalRevenue)}\nExpenses: -${fmt(totalExpenses)}\nNet Income: ${fmt(netIncome)}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prolnk-income-${period}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ background: D.bg, minHeight: "100vh", padding: "28px 16px", maxWidth: 700, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <FileText size={20} color={D.teal} />
            <h1 style={{ color: D.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Income Statement</h1>
          </div>
          <p style={{ color: D.muted, fontSize: 13, margin: 0 }}>Your business, by the numbers</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={downloadPDF}
            style={{
              background: D.surface, border: `1px solid ${D.border}`, borderRadius: 8,
              padding: "8px 14px", color: D.muted, fontSize: 13, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <Download size={14} /> PDF
          </button>
          <button
            onClick={copyForCPA}
            style={{
              background: copied ? D.green + "22" : D.surface,
              border: `1px solid ${copied ? D.green : D.border}`,
              borderRadius: 8, padding: "8px 14px",
              color: copied ? D.green : D.muted,
              fontSize: 13, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <Share2 size={14} /> {copied ? "Copied!" : "Share with CPA"}
          </button>
        </div>
      </div>

      {/* Period selector */}
      <div style={{
        display: "flex", gap: 6, marginBottom: 28,
        background: D.surface, borderRadius: 10, padding: 4, border: `1px solid ${D.border}`,
      }}>
        {(Object.entries(PERIOD_LABELS) as [Period, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setPeriod(key)}
            style={{
              flex: 1, padding: "8px 4px", borderRadius: 7, border: "none", cursor: "pointer",
              background: period === key ? D.teal : "transparent",
              color: period === key ? "#000" : D.muted,
              fontWeight: period === key ? 700 : 400, fontSize: 13, transition: "all 0.15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Revenue */}
      <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <h2 style={{ color: D.green, fontSize: 13, fontWeight: 700, letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>Revenue</h2>
        <LineItem label="Job commissions (direct)" value={d.directCommission} color={D.text} sub />
        <LineItem label="Network overrides (L1)" value={d.networkL1} color={D.text} sub />
        <LineItem label="Network overrides (L2)" value={d.networkL2} color={D.text} sub />
        <LineItem label="Subscription overrides" value={d.subscriptionOverrides} color={D.text} sub />
        <LineItem label="Bonuses" value={d.bonuses} color={D.text} sub />
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0" }}>
          <span style={{ color: D.text, fontWeight: 700, fontSize: 15 }}>Total Revenue</span>
          <span style={{ color: D.green, fontWeight: 700, fontSize: 15 }}>{fmt(totalRevenue)}</span>
        </div>
      </div>

      {/* Expenses */}
      <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <h2 style={{ color: D.amber, fontSize: 13, fontWeight: 700, letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>Expenses</h2>
        <LineItem label="ProLnk subscription" value={-d.subscription} color={D.text} sub />
        <LineItem label="Vehicle mileage (est.)" value={-d.mileage} color={D.text} sub />
        <LineItem label="Tools / equipment" value={-d.tools} color={D.text} sub />
        <LineItem label="Phone (business %)" value={-d.phone} color={D.text} sub />
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0" }}>
          <span style={{ color: D.text, fontWeight: 700, fontSize: 15 }}>Total Expenses</span>
          <span style={{ color: D.amber, fontWeight: 700, fontSize: 15 }}>-{fmt(totalExpenses)}</span>
        </div>
      </div>

      {/* Net income */}
      <div style={{
        background: `linear-gradient(135deg, ${D.teal}18, ${D.green}0a)`,
        border: `2px solid ${D.teal}55`, borderRadius: 14, padding: "20px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20,
      }}>
        <div>
          <p style={{ color: D.muted, fontSize: 13, margin: 0 }}>Net Income</p>
          <p style={{ color: D.dim, fontSize: 12, margin: "4px 0 0" }}>{PERIOD_LABELS[period]}</p>
        </div>
        <div style={{ color: D.teal, fontSize: 36, fontWeight: 800 }}>{fmt(netIncome)}</div>
      </div>

      {/* Tax estimate */}
      <div style={{
        background: "#1C1200", border: `1px solid ${D.amber}33`, borderRadius: 10,
        padding: "14px 18px", display: "flex", gap: 10, marginBottom: 28,
      }}>
        <Info size={17} color={D.amber} style={{ flexShrink: 0, marginTop: 1 }} />
        <div>
          <p style={{ color: D.amber, fontWeight: 600, fontSize: 13, margin: 0 }}>
            Estimated self-employment tax: {fmt(selfEmploymentTax)} (15.3%)
          </p>
          <p style={{ color: D.muted, fontSize: 13, margin: "4px 0 0" }}>
            Set aside 22% = {fmt(setAside)} to cover federal income + SE tax.
          </p>
        </div>
      </div>

      {/* YTD bar chart */}
      <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <h2 style={{ color: D.text, fontSize: 15, fontWeight: 600, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <TrendingUp size={15} color={D.cyan} /> Monthly Net Income — YTD
        </h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={YTD_MONTHLY} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={D.dim} />
            <XAxis dataKey="month" tick={{ fill: D.muted, fontSize: 12 }} />
            <YAxis tick={{ fill: D.muted, fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: D.surface, border: `1px solid ${D.border}`, borderRadius: 8 }}
              labelStyle={{ color: D.text }}
              formatter={(v: number) => [fmt(v), "Net Income"]}
            />
            <Bar dataKey="net" fill={D.teal} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Action row */}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={downloadPDF}
          style={{
            flex: 1, background: D.teal, color: "#000", fontWeight: 700, fontSize: 14,
            padding: "13px", borderRadius: 10, border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          <Download size={16} /> Download PDF
        </button>
        <button
          onClick={copyForCPA}
          style={{
            flex: 1, background: copied ? D.green + "22" : D.surface,
            color: copied ? D.green : D.muted,
            border: `1px solid ${copied ? D.green : D.border}`,
            fontWeight: 600, fontSize: 14, padding: "13px", borderRadius: 10, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          <Share2 size={16} /> {copied ? "Copied!" : "Share with CPA"}
        </button>
      </div>

    </div>
  );
}
