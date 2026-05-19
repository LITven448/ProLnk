import React from 'react';
import { useState } from "react";
import AdminLayout, { T, BADGE_GRADIENTS, FONT } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell,
} from "recharts";
import { DollarSign, Megaphone, TrendingUp, Percent, Plus } from "lucide-react";

const METRIC_CARDS = [
  { label: "Monthly Ad Revenue",  value: "$8,400″,  delta: "+12%",  color: T.green,  gradient: BADGE_GRADIENTS.green,  icon: DollarSign },
  { label: "Active Advertisers",  value: "12″,      delta: "+3",    color: T.blue,   gradient: BADGE_GRADIENTS.blue,   icon: Megaphone },
  { label: "Avg CPM",             value: "$4.20″,   delta: "+$0.30",color: T.accent, gradient: BADGE_GRADIENTS.cyan,   icon: TrendingUp },
  { label: "Fill Rate",           value: "78%",     delta: "+5%",   color: T.amber,  gradient: BADGE_GRADIENTS.orange, icon: Percent },
];

const REVENUE_BY_FORMAT = [
  { name: "Banner Ads",        value: 42, color: T.accent },
  { name: "Featured Listings", value: 31, color: T.blue },
  { name: "Sponsored Content", value: 18, color: T.purple },
  { name: "Newsletter",        value: 9,  color: T.amber },
];

const MONTHLY_REVENUE = [
  { month: "Dec", revenue: 4200 },
  { month: "Jan", revenue: 5100 },
  { month: "Feb", revenue: 6300 },
  { month: "Mar", revenue: 7100 },
  { month: "Apr", revenue: 7800 },
  { month: "May", revenue: 8400 },
];

const ADVERTISERS = [
  { name: "HomeShield Pro",     type: "Banner Ad",       spend: "$1,200″, impressions: "284K", ctr: "2.1%",  status: "Active" },
  { name: "QuickLoan Co.",      type: "Featured Listing",spend: "$950″,   impressions: "226K", ctr: "3.4%",  status: "Active" },
  { name: "BuildRight Tools",  type: "Sponsored Content",spend: "$800″,   impressions: "190K", ctr: "1.8%",  status: "Active" },
  { name: "EnergyAudit Inc.",  type: "Newsletter",       spend: "$600″,   impressions: "75K",  ctr: "4.2%",  status: "Active" },
  { name: "SafeLock Security", type: "Banner Ad",        spend: "$750″,   impressions: "178K", ctr: "2.7%",  status: "Active" },
  { name: "GreenHVAC Supply",  type: "Featured Listing", spend: "$680″,   impressions: "162K", ctr: "2.9%",  status: "Active" },
  { name: "PoolCare Direct",   type: "Banner Ad",        spend: "$540″,   impressions: "128K", ctr: "1.5%",  status: "Paused" },
  { name: "RoofMaster LLC",    type: "Sponsored Content",spend: "$480″,   impressions: "114K", ctr: "2.2%",  status: "Active" },
];

const PLACEMENTS = [
  { placement: "Homepage Hero",    impressions: "98K",  clicks: "2,058″,  revenue: "$2,450" },
  { placement: "Sidebar (All)",    impressions: "186K", clicks: "2,790″,  revenue: "$1,860" },
  { placement: "Email Newsletter", impressions: "75K",  clicks: "3,150″,  revenue: "$1,875" },
  { placement: "SMS Alerts",       impressions: "42K",  clicks: "2,310″,  revenue: "$1,260" },
  { placement: "Partner Directory",impressions: "62K",  clicks: "1,240″,  revenue: "$930" },
];

const CARD: React.CSSProperties = {
  background: T.surface,
  borderRadius: 16,
  border: `1px solid ${T.border}`,
  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  fontFamily: FONT,
};

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Active: { bg: "#F0FAF0″, color: T.green },
  Paused: { bg: "#FFF8E6″, color: T.amber },
};

export default function MediaRevenue() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <AdminLayout>
      <div style={{ background: T.bg, minHeight: "100vh", padding: "24px 32px", fontFamily: FONT }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: BADGE_GRADIENTS.orange, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Megaphone style={{ color: "#fff", width: 20, height: 20 }} />
            </div>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: T.text, margin: 0 }}>Media Revenue</h1>
              <p style={{ fontSize: 13, color: T.muted, margin: 0 }}>Advertising & sponsored placement analytics</p>
            </div>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            style={{ background: BADGE_GRADIENTS.blue, color: "#fff", border: "none", borderRadius: 10, gap: 6 }}
          >
            <Plus style={{ width: 16, height: 16 }} /> Add Advertiser
          </Button>
        </div>

        {/* Metric cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 24 }}>
          {METRIC_CARDS.map(m => {
            const Icon = m.icon;
            return (
              <div key={m.label} style={{ ...CARD, padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: m.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon style={{ color: "#fff", width: 20, height: 20 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.green, background: "#F0FAF0″, padding: "3px 8px", borderRadius: 20 }}>{m.delta}</span>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: T.text }}>{m.value}</div>
                  <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{m.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, marginBottom: 24 }}>

          {/* Monthly revenue bar chart */}
          <div style={{ ...CARD, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 20 }}>Monthly Revenue (6-Month Trend)</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MONTHLY_REVENUE} margin={{ top: 0, right: 4, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3″ stroke={T.border} vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: T.muted }} />
                <YAxis tick={{ fontSize: 11, fill: T.muted }} tickFormatter={v => `$${(v/1000).toFixed(1)}K`} />
                <Tooltip
                  formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
                  contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12 }}
                  cursor={{ fill: T.accentBg }}
                />
                <Bar dataKey="revenue" fill={T.accent} radius={[6, 6, 0, 0]} name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by format donut */}
          <div style={{ ...CARD, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 16 }}>Revenue by Format</div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={REVENUE_BY_FORMAT} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {REVENUE_BY_FORMAT.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip
                  formatter={(v: number) => [`${v}%`, ""]}
                  contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
              {REVENUE_BY_FORMAT.map(s => (
                <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: T.text, flex: 1 }}>{s.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active advertisers table */}
        <div style={{ ...CARD, padding: 0, overflow: "hidden", marginBottom: 24 }}>
          <div style={{ padding: "20px 24px 12px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>Active Advertisers</div>
            <span style={{ fontSize: 12, color: T.muted }}>{ADVERTISERS.length} total</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: T.bg }}>
                {["Advertiser", "Ad Type", "Monthly Spend", "Impressions", "CTR", "Status"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ADVERTISERS.map((row, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: T.text }}>{row.name}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: T.muted }}>{row.type}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: T.green }}>{row.spend}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: T.text }}>{row.impressions}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: T.blue, fontWeight: 700 }}>{row.ctr}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: STATUS_STYLE[row.status].bg, color: STATUS_STYLE[row.status].color }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Performance by placement */}
        <div style={{ ...CARD, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px 12px", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>Performance by Placement</div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: T.bg }}>
                {["Placement", "Impressions", "Clicks", "Revenue"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLACEMENTS.map((row, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: T.text }}>{row.placement}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: T.muted }}>{row.impressions}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: T.blue, fontWeight: 600 }}>{row.clicks}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: T.green }}>{row.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
}
