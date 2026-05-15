import React from 'react';
/**
 * CompanyDashboard.tsx
 *
 * A single reusable template that renders all 7 executive dashboards
 * for a given company (ProLnk Residential, TrustyPro, or ProLnk Media).
 * Each company passes its own config object with brand colors, metrics, etc.
 */

import AdminLayout from "@/components/AdminLayout";
import {
  D, MetricCard, SectionHeader, DataTable, BarChart, DonutChart,
  DCard, ActivityItem, ProgressBar, StatusBadge,
} from "@/components/DashboardShared";
import {
  TrendingUp, Wrench, Target, HeadphonesIcon, BarChart3, Cpu,
  Users, DollarSign, Zap, CheckCircle, Activity, Bot,
  Camera, Mail, Shield, CloudLightning, Brain, Banknote,
  AlertTriangle, CreditCard, Receipt,
} from "lucide-react";

// ─── Company Config Type ──────────────────────────────────────────────────────

export interface CompanyDashboardConfig {
  name: string;
  tagline: string;
  color: string;
  accentColor: string;
  basePath: string; // e.g. "/admin/prolnk" or "/admin/tp" or "/admin/media"
  tab: "executive" | "operations" | "sales" | "marketing" | "support" | "financial" | "agents";
  metrics: {
    primary: { label: string; value: string; sub: string; trend: number }[];
    revenueData: number[];
    topItems: { label: string; value: string; color: string }[];
    activities: { time: string; type: "success" | "warning" | "info" | "error"; message: string }[];
    donut?: { label: string; value: number; color: string }[];
    barData?: { label: string; value: number }[];
    goals?: { label: string; value: number; max: number; color: string }[];
    table?: { columns: { key: string; label: string; align?: "right" | "left" }[]; rows: Record<string, any>[] };
  };
}

// ─── Tab Definitions ──────────────────────────────────────────────────────────

const TAB_ICONS: Record<string, React.ComponentType<any>> = {
  executive:  TrendingUp,
  operations: Wrench,
  sales:      Target,
  marketing:  Mail,
  support:    HeadphonesIcon,
  financial:  BarChart3,
  agents:     Cpu,
};

const TAB_LABELS: Record<string, string> = {
  executive:  "Executive",
  operations: "Operations",
  sales:      "Sales",
  marketing:  "Marketing",
  support:    "Support",
  financial:  "Financial",
  agents:     "AI Agents",
};

// ─── Sub-Tab Navigation ───────────────────────────────────────────────────────

function DashTabBar({ basePath, activeTab, color }: { basePath: string; activeTab: string; color: string }) {
  const tabs = ["executive", "operations", "sales", "marketing", "support", "financial", "agents"] as const;
  return (
    <div
      className="flex items-center gap-0 px-4 flex-shrink-0 overflow-x-auto"
      style={{ backgroundColor: D.card, borderBottom: `1px solid ${D.border}`, scrollbarWidth: "none" }}
    >
      {tabs.map(tab => {
        const Icon = TAB_ICONS[tab];
        const isActive = activeTab === tab;
        return (
          <a
            key={tab}
            href={`${basePath}/${tab}`}
            className="flex items-center gap-1.5 flex-shrink-0 px-3 py-3 text-sm font-medium transition-all whitespace-nowrap"
            style={{
              color: isActive ? color : D.muted,
              borderBottom: isActive ? `2px solid ${color}` : "2px solid transparent",
              marginBottom: "-1px",
              textDecoration: "none",
            }}
          >
            <Icon className="w-3.5 h-3.5" />
            {TAB_LABELS[tab]}
          </a>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CompanyDashboard({ config }: { config: CompanyDashboardConfig }) {
  const { name, tagline, color, accentColor, basePath, tab, metrics } = config;

  return (
    <AdminLayout title={`${name} — ${TAB_LABELS[tab]} Dashboard`} subtitle={tagline}>
      {/* Company-level tab bar */}
      <DashTabBar basePath={basePath} activeTab={tab} color={color} />

      <div className="p-6 space-y-6 overflow-y-auto" style={{ backgroundColor: D.bg, minHeight: "100%" }}>

        {/* ── Pre-Launch Banner ── */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: `${color}15`, border: `1px solid ${color}33` }}>
          <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color }} />
          <div>
            <span className="text-xs font-bold" style={{ color }}>Pre-Launch Mode</span>
            <span className="text-xs ml-2" style={{ color: D.muted }}>Data shown represents projections and targets. Live metrics will populate after launch.</span>
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.primary.map((m, i) => (
            <MetricCard
              key={m.label}
              label={m.label}
              value={m.value}
              sub={m.sub}
              trend={m.trend}
              color={[color, accentColor, D.amber, D.purple][i % 4]}
              sparkline={i === 0 ? metrics.revenueData : undefined}
              icon={[<TrendingUp className="w-4 h-4" />, <Users className="w-4 h-4" />, <DollarSign className="w-4 h-4" />, <Zap className="w-4 h-4" />][i % 4]}
            />
          ))}
        </div>

        {/* ── Main Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Bar Chart */}
          <DCard className="lg:col-span-2">
            <SectionHeader
              title={`${TAB_LABELS[tab]} Trend`}
              subtitle={`${name} — last 12 months`}
            />
            <BarChart
              data={(metrics.barData ?? metrics.revenueData.map((v, i) => ({
                label: ["J","F","M","A","M","J","J","A","S","O","N","D"][i],
                value: v,
              })))}
              color={color}
              height={150}
            />
          </DCard>

          {/* Donut / Breakdown */}
          {metrics.donut && (
            <DCard>
              <SectionHeader title="Breakdown" subtitle="By category" />
              <DonutChart size={110} segments={metrics.donut} />
              <div className="mt-4 space-y-2">
                {metrics.topItems.slice(0, 4).map(s => (
                  <div key={s.label} className="flex items-center justify-between py-1" style={{ borderBottom: `1px solid ${D.border}` }}>
                    <span className="text-xs" style={{ color: D.muted }}>{s.label}</span>
                    <span className="text-xs font-bold" style={{ color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </DCard>
          )}
        </div>

        {/* ── Goals + Activity ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Goals / Progress */}
          {metrics.goals && (
            <DCard>
              <SectionHeader title="Goals & Progress" subtitle="Current period targets" />
              <div className="space-y-4 mt-2">
                {metrics.goals.map(g => (
                  <ProgressBar key={g.label} label={g.label} value={g.value} max={g.max} color={g.color} />
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {metrics.topItems.slice(4).map(s => (
                  <div key={s.label} className="flex items-center justify-between py-1.5" style={{ borderBottom: `1px solid ${D.border}` }}>
                    <span className="text-sm" style={{ color: D.muted }}>{s.label}</span>
                    <span className="text-sm font-bold" style={{ color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </DCard>
          )}

          {/* Activity Feed */}
          <DCard>
            <SectionHeader title="Recent Activity" subtitle="Last 24 hours" />
            <div style={{ maxHeight: 300, overflowY: "auto" }}>
              {metrics.activities.map((a, i) => (
                <ActivityItem
                  key={i}
                  time={a.time}
                  type={a.type}
                  message={a.message}
                  icon={<Activity className="w-3.5 h-3.5" />}
                />
              ))}
            </div>
          </DCard>
        </div>

        {/* ── Data Table ── */}
        {metrics.table && (
          <DCard>
            <SectionHeader title="Detail View" subtitle={`${name} ${TAB_LABELS[tab]} records`} />
            <DataTable
              accentCol={metrics.table.columns[0]?.key}
              columns={metrics.table.columns}
              rows={metrics.table.rows}
            />
          </DCard>
        )}

      </div>
    </AdminLayout>
  );
}
