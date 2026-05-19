import React from 'react';
import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import {
  DollarSign, Download, Clock, TrendingUp, Calendar, ArrowRight, Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const NAV = "#0A1628″;
const NAV_CARD = "#0d1e38″;
const ACCENT = "#F5E642″;

const STATUS_COLORS: Record<string, string> = {
  paid: "bg-green-900/40 text-green-300″,
  pending: "bg-yellow-900/40 text-yellow-300″,
  processing: "bg-blue-900/40 text-blue-300″,
  cancelled: "bg-red-900/40 text-red-300″,
};

const TYPE_LABELS: Record<string, string> = {
  direct: "Direct Commission",
  network_override: "Network Override",
  subscription_override: "Subscription Override",
  origination: "Origination Right",
  referral: "Referral Bonus",
};

function SummaryCard({
  label,
  value,
  icon,
  accent = false,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        background: NAV_CARD,
        borderRadius: 14,
        padding: "20px 24px",
        border: accent ? `1px solid ${ACCENT}30` : "1px solid #1e2e4a",
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: accent ? ACCENT : "#64748b",
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 8,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {icon}
        {label}
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: accent ? ACCENT : "#fff",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function MonthlyBarChart({ commissions }: { commissions: Array<{ createdAt?: string | Date; amount?: string | number }> }) {
  const months: { label: string; key: string; total: number }[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: d.toLocaleDateString("en-US", { month: "short" }),
      key: `${d.getFullYear()}-${d.getMonth()}`,
      total: 0,
    });
  }
  for (const c of commissions) {
    if (!c.createdAt) continue;
    const d = new Date(c.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const bucket = months.find((m) => m.key === key);
    if (bucket) bucket.total += Number(c.amount ?? 0);
  }
  const max = Math.max(...months.map((m) => m.total), 1);
  const fmt = (n: number) =>
    n >= 1000
      ? `$${(n / 1000).toFixed(1)}k`
      : `$${n.toFixed(0)}`;

  return (
    <div
      style={{
        background: NAV_CARD,
        border: "1px solid #1e2e4a",
        borderRadius: 14,
        padding: 24,
        marginBottom: 28,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#94a3b8″,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 20,
        }}
      >
        Monthly Earnings — Last 6 Months
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120 }}>
        {months.map((m) => {
          const heightPct = max > 0 ? (m.total / max) * 100 : 0;
          const isEmpty = m.total === 0;
          return (
            <div
              key={m.key}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
            >
              <span style={{ fontSize: 10, color: isEmpty ? "#334155″ : ACCENT, fontWeight: 700 }}>
                {isEmpty ? "" : fmt(m.total)}
              </span>
              <div style={{ width: "100%", background: "#1e2e4a", borderRadius: 6, height: 80, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
                <div
                  style={{
                    width: "100%",
                    height: `${Math.max(heightPct, isEmpty ? 0 : 4)}%`,
                    background: isEmpty ? "#1e2e4a" : `linear-gradient(to top, ${ACCENT}, ${ACCENT}99)`,
                    borderRadius: 4,
                    transition: "height 0.4s ease",
                  }}
                />
              </div>
              <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>{m.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EarningsExplainer() {
  return (
    <div
      style={{
        background: NAV_CARD,
        border: "1px solid #1e2e4a",
        borderRadius: 14,
        padding: 24,
        marginTop: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "#94a3b8″,
          fontSize: 13,
          fontWeight: 700,
          marginBottom: 16,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        <Info style={{ width: 15, height: 15 }} />
        How earnings accumulate
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {[
          {
            stream: "Stream 1″,
            title: "Direct Commission",
            desc: "Earn 7–25% of the job value every time a job closes in your network, based on your tier.",
            color: "#22c55e",
          },
          {
            stream: "Stream 2″,
            title: "Network Override",
            desc: "Earn 7% on jobs logged by your direct recruits, 4% on their recruits, 2% on level 3, and 1% on level 4.",
            color: "#3b82f6″,
          },
          {
            stream: "Stream 3″,
            title: "Subscription Override",
            desc: "Earn 12% recurring on monthly subscriptions from pros you referred directly, 6%/3%/1.5% down each level.",
            color: ACCENT,
          },
        ].map((item) => (
          <div
            key={item.stream}
            style={{
              display: "flex",
              gap: 16,
              padding: "14px 16px",
              background: "#0A1628″,
              borderRadius: 10,
              border: "1px solid #1e2e4a",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: 7,
                borderRadius: 4,
                background: item.color,
              }}
            />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: item.color,
                    background: `${item.color}20`,
                    padding: "2px 8px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {item.stream}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0″ }}>
                  {item.title}
                </span>
              </div>
              <p style={{ fontSize: 12, color: "#64748b", marginTop: 6, lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <Link href="/commission-ledger">
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: ACCENT,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            View commission rates <ArrowRight style={{ width: 14, height: 14 }} />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function EarningsHistory() {
  const { user } = useAuth();
  const [filterType, setFilterType] = useState<string>("all");

  const { data: earned, isLoading } = trpc.partners.getEarnedCommissions.useQuery(undefined, {
    retry: false,
  });
  const { data: paid } = trpc.partners.getPaidCommissions.useQuery(undefined, {
    retry: false,
  });

  const allCommissions = earned ?? [];
  const paidCommissions = paid ?? [];

  const totalEarned = allCommissions.reduce((s, c) => s + Number((c as any).amount ?? 0), 0);
  const totalPaid = paidCommissions.reduce((s, c) => s + Number((c as any).amount ?? 0), 0);
  const totalPending = Math.max(0, totalEarned - totalPaid);

  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const thisMonth = allCommissions
    .filter((c) => new Date((c as any).createdAt ?? 0) >= thisMonthStart)
    .reduce((s, c) => s + Number((c as any).amount ?? 0), 0);

  const lastMonth = allCommissions
    .filter((c) => {
      const d = new Date((c as any).createdAt ?? 0);
      return d >= lastMonthStart && d < thisMonthStart;
    })
    .reduce((s, c) => s + Number((c as any).amount ?? 0), 0);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(n);

  function exportCsv() {
    if (!allCommissions.length) {
      toast.error("No earnings data to export");
      return;
    }
    const headers = ["Date", "Type", "Source", "Amount", "Status"];
    const rows = allCommissions.map((c: any) => [
      c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "",
      TYPE_LABELS[c.commissionType ?? ""] ?? (c.commissionType ?? ""),
      c.description ?? "",
      Number(c.amount ?? 0).toFixed(2),
      c.paid ? "paid" : "pending",
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prolnk-earnings-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported earnings to CSV");
  }

  const types = [...new Set(allCommissions.map((c: any) => c.commissionType ?? "").filter(Boolean))];

  const filtered = filterType === "all"
    ? allCommissions
    : allCommissions.filter((c: any) => (c.commissionType ?? "") === filterType);

  return (
    <PartnerLayout>
      <div
        style={{
          minHeight: "100vh",
          background: NAV,
          padding: "32px 24px",
          maxWidth: 860,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 28,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "#fff",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Earnings History
            </h1>
            {user && (
              <p style={{ color: "#64748b", fontSize: 13, marginTop: 6 }}>
                {(user as any).firstName ?? ""} {(user as any).lastName ?? ""}
              </p>
            )}
          </div>
          {allCommissions.length > 0 && (
            <Button
              onClick={exportCsv}
              style={{
                background: ACCENT,
                color: NAV,
                fontWeight: 700,
                border: "none",
                borderRadius: 8,
                padding: "10px 18px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              <Download style={{ width: 15, height: 15 }} />
              Export CSV
            </Button>
          )}
        </div>

        {/* Summary cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <SummaryCard
            label="Total Earned"
            value={fmt(totalEarned)}
            icon={<DollarSign style={{ width: 14, height: 14 }} />}
            accent
          />
          <SummaryCard
            label="Pending"
            value={fmt(totalPending)}
            icon={<Clock style={{ width: 14, height: 14 }} />}
          />
          <SummaryCard
            label="This Month"
            value={fmt(thisMonth)}
            icon={<Calendar style={{ width: 14, height: 14 }} />}
          />
          <SummaryCard
            label="Last Month"
            value={fmt(lastMonth)}
            icon={<TrendingUp style={{ width: 14, height: 14 }} />}
          />
        </div>

        {/* Monthly bar chart */}
        {allCommissions.length > 0 && (
          <MonthlyBarChart commissions={allCommissions} />
        )}

        {/* Commission type breakdown */}
        {allCommissions.length > 0 && (() => {
          const byType: Record<string, number> = {};
          for (const c of allCommissions) {
            const t = (c as any).commissionType ?? "other";
            byType[t] = (byType[t] ?? 0) + Number((c as any).amount ?? 0);
          }
          const grandTotal = Object.values(byType).reduce((s, v) => s + v, 0) || 1;
          const typeColors: Record<string, string> = {
            direct: "#22c55e",
            network_override: "#3b82f6″,
            subscription_override: ACCENT,
            origination: "#a855f7″,
          };
          return (
            <div style={{ background: NAV_CARD, border: "1px solid #1e2e4a", borderRadius: 14, padding: 24, marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8″, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
                Commission Type Breakdown
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {Object.entries(byType).map(([type, amount]) => {
                  const pct = Math.round((amount / grandTotal) * 100);
                  const color = typeColors[type] ?? "#64748b";
                  return (
                    <div key={type}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color: "#94a3b8″, fontWeight: 600 }}>
                          {TYPE_LABELS[type] ?? type}
                        </span>
                        <span style={{ fontSize: 12, color, fontWeight: 700 }}>
                          {fmt(amount)} · {pct}%
                        </span>
                      </div>
                      <div style={{ height: 6, background: "#1e2e4a", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3, transition: "width 0.4s ease" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Table / empty state */}
        <div
          style={{
            background: NAV_CARD,
            border: "1px solid #1e2e4a",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {/* Table header row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              borderBottom: "1px solid #1e2e4a",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <span style={{ color: "#94a3b8″, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Commission History
            </span>
            {types.length > 0 && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["all", ...types].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 6,
                      border: "none",
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                      background: filterType === t ? ACCENT : "#1e2e4a",
                      color: filterType === t ? NAV : "#94a3b8″,
                      textTransform: "capitalize",
                    }}
                  >
                    {t === "all" ? "All" : (TYPE_LABELS[t] ?? t)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isLoading ? (
            <div style={{ padding: "48px 24px", textAlign: "center", color: "#64748b", fontSize: 14 }}>
              Loading…
            </div>
          ) : allCommissions.length === 0 ? (
            <div style={{ padding: "40px 32px" }}>
              <div
                style={{
                  textAlign: "center",
                  maxWidth: 480,
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "#1e2e4a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <DollarSign style={{ width: 24, height: 24, color: ACCENT }} />
                </div>
                <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 700, margin: "0 0 8px" }}>
                  No earnings yet
                </h3>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                  Commissions appear here when jobs close in your network. Start
                  referring pros and logging jobs to build your earnings across 3
                  income streams.
                </p>
              </div>
              <EarningsExplainer />
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #1e2e4a" }}>
                      {["Date", "Type", "Source / Description", "Amount", "Status"].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "10px 16px",
                            textAlign: h === "Amount" || h === "Status" ? "right" : "left",
                            color: "#64748b",
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: "32px 16px", textAlign: "center", color: "#64748b", fontSize: 13 }}>
                          No results for this filter
                        </td>
                      </tr>
                    ) : (
                      filtered.map((c: any, i) => {
                        const isPaid = c.paid;
                        return (
                          <tr
                            key={c.id ?? i}
                            style={{ borderBottom: "1px solid #111d2e" }}
                          >
                            <td style={{ padding: "12px 16px", color: "#94a3b8″, whiteSpace: "nowrap" }}>
                              {c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                            </td>
                            <td style={{ padding: "12px 16px" }}>
                              <span
                                style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  padding: "3px 8px",
                                  borderRadius: 5,
                                  background: "#1e2e4a",
                                  color: "#94a3b8″,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {TYPE_LABELS[c.commissionType ?? ""] ?? (c.commissionType ?? "referral")}
                              </span>
                            </td>
                            <td style={{ padding: "12px 16px", color: "#cbd5e1″, maxWidth: 240 }}>
                              <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {c.description ?? "—"}
                              </span>
                            </td>
                            <td style={{ padding: "12px 16px", textAlign: "right", color: "#22c55e", fontWeight: 700, whiteSpace: "nowrap" }}>
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(c.amount ?? 0))}
                            </td>
                            <td style={{ padding: "12px 16px", textAlign: "right" }}>
                              <span
                                style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  padding: "3px 10px",
                                  borderRadius: 5,
                                  background: isPaid ? "rgba(34,197,94,0.15)" : "rgba(234,179,8,0.15)",
                                  color: isPaid ? "#4ade80″ : "#fbbf24",
                                }}
                              >
                                {isPaid ? "Paid" : "Pending"}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              {filtered.length > 0 && (
                <div
                  style={{
                    padding: "12px 20px",
                    borderTop: "1px solid #1e2e4a",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#64748b" }}>
                    {filtered.length} record{filtered.length !== 1 ? "s" : ""}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#22c55e" }}>
                    Total:{" "}
                    {fmt(filtered.reduce((s, c: any) => s + Number(c.amount ?? 0), 0))}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PartnerLayout>
  );
}
