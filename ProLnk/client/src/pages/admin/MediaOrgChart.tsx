import React from 'react';
import { useState } from "react";
import AdminLayout, { T, BADGE_GRADIENTS, FONT, MONO } from "@/components/AdminLayout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Network, Megaphone, TrendingUp, Camera, Building2, Bot, User,
  Plus, ChevronRight,
} from "lucide-react";

const CARD: React.CSSProperties = {
  backgroundColor: T.card,
  borderRadius: "12px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  padding: "20px 24px",
};

const LABEL: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: T.muted,
  fontFamily: FONT,
};

const tooltipStyle: React.CSSProperties = {
  backgroundColor: T.card,
  border: "none",
  borderRadius: "10px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
  color: T.text,
  fontFamily: FONT,
  fontSize: 12,
};

const axisStyle = { fill: T.muted, fontSize: 11, fontFamily: FONT };

const headcountTrend = [
  { month: "Nov", count: 3 },
  { month: "Dec", count: 5 },
  { month: "Jan", count: 7 },
  { month: "Feb", count: 9 },
  { month: "Mar", count: 11 },
  { month: "Apr", count: 12 },
];

interface OrgNode {
  name: string;
  role: string;
  initials: string;
  isAI: boolean;
  color: string;
  reports?: OrgNode[];
}

const ORG: OrgNode = {
  name: "Andrew Frakes",
  role: "CEO / Founder",
  initials: "AF",
  isAI: false,
  color: T.amber,
  reports: [
    {
      name: "AI Agent",
      role: "Media Director",
      initials: "MD",
      isAI: true,
      color: "#f97316",
      reports: [
        { name: "AI Agent", role: "Video Producer", initials: "VP", isAI: true, color: "#fb923c" },
        { name: "AI Agent", role: "Podcast Editor", initials: "PE", isAI: true, color: "#fb923c" },
        { name: "AI Agent", role: "Social Scheduler", initials: "SS", isAI: true, color: "#fb923c" },
      ],
    },
    {
      name: "AI Agent",
      role: "Ad Sales Lead",
      initials: "AS",
      isAI: true,
      color: "#3b82f6",
      reports: [
        { name: "AI Agent", role: "Advertiser Outreach", initials: "AO", isAI: true, color: "#60a5fa" },
        { name: "TBD", role: "Brand Partnerships", initials: "BP", isAI: false, color: "#60a5fa" },
        { name: "AI Agent", role: "Campaign Tracker", initials: "CT", isAI: true, color: "#60a5fa" },
      ],
    },
    {
      name: "AI Agent",
      role: "Content Lead",
      initials: "CL",
      isAI: true,
      color: "#ec4899",
      reports: [
        { name: "AI Agent", role: "Blog Writer", initials: "BW", isAI: true, color: "#f472b6" },
        { name: "TBD", role: "Graphic Designer", initials: "GD", isAI: false, color: "#f472b6" },
        { name: "AI Agent", role: "SEO Optimizer", initials: "SO", isAI: true, color: "#f472b6" },
        { name: "AI Agent", role: "Email Marketer", initials: "EM", isAI: true, color: "#f472b6" },
      ],
    },
  ],
};

const OPEN_POSITIONS = [
  { role: "Brand Partnerships Manager", dept: "Ad Sales", type: "Human" },
  { role: "Graphic Designer", dept: "Content", type: "Human" },
  { role: "Media Strategist", dept: "Media", type: "Human" },
];

function AvatarCircle({ initials, color, isAI }: { initials: string; color: string; isAI: boolean }) {
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: `${color}22`,
          border: `2px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 13,
          color,
        }}
      >
        {initials}
      </div>
      {isAI && (
        <div
          style={{
            position: "absolute",
            bottom: -2,
            right: -2,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#0d9488",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Bot style={{ width: 9, height: 9, color: "#fff" }} />
        </div>
      )}
    </div>
  );
}

function OrgCard({ node, isRoot = false }: { node: OrgNode; isRoot?: boolean }) {
  return (
    <div
      style={{
        backgroundColor: T.card,
        border: `1.5px solid ${isRoot ? node.color : T.border}`,
        borderRadius: "12px",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: isRoot ? `0 4px 20px ${node.color}33` : "0 1px 6px rgba(0,0,0,0.06)",
        minWidth: 200,
      }}
    >
      <AvatarCircle initials={node.initials} color={node.color} isAI={node.isAI} />
      <div>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 13, color: T.text }}>{node.name}</div>
        <div style={{ fontFamily: FONT, fontSize: 11, color: T.muted, marginTop: 1 }}>{node.role}</div>
        {node.isAI && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 3,
              marginTop: 4,
              background: "#0d948820",
              color: "#0d9488",
              fontSize: 10,
              fontWeight: 700,
              fontFamily: FONT,
              borderRadius: 4,
              padding: "1px 6px",
            }}
          >
            <Bot style={{ width: 9, height: 9 }} /> Agent-powered
          </span>
        )}
      </div>
    </div>
  );
}

function OrgLevel({ nodes }: { nodes: OrgNode[] }) {
  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
      {nodes.map((node) => (
        <div key={node.role} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          <OrgCard node={node} />
          {node.reports && node.reports.length > 0 && (
            <>
              <div style={{ width: 2, height: 20, background: T.border }} />
              <div style={{ display: "flex", gap: 16, position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "10%",
                    right: "10%",
                    height: 2,
                    background: T.border,
                  }}
                />
                {node.reports.map((child) => (
                  <div key={child.role} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 2, height: 18, background: T.border }} />
                    <OrgCard node={child} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default function MediaOrgChart() {
  const [selectedOpen, setSelectedOpen] = useState<number | null>(null);

  return (
    <AdminLayout>
      <div style={{ padding: "24px 32px 40px", fontFamily: FONT }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <Network style={{ width: 22, height: 22, color: T.amber }} />
            <h1 style={{ fontFamily: FONT, fontWeight: 800, fontSize: 22, color: T.text, margin: 0 }}>
              ProLnk Media — Org Chart
            </h1>
          </div>
          <p style={{ fontFamily: FONT, fontSize: 13, color: T.muted, margin: 0 }}>
            Team structure, role assignments, and AI agent coverage for ProLnk Media operations.
          </p>
        </div>

        {/* Team Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Total Roles", value: "12", icon: User, gradient: BADGE_GRADIENTS.blue },
            { label: "AI-Powered", value: "8", icon: Bot, gradient: BADGE_GRADIENTS.cyan },
            { label: "Human Roles", value: "4", icon: User, gradient: BADGE_GRADIENTS.green },
            { label: "Monthly Payroll", value: "$42K", icon: TrendingUp, gradient: BADGE_GRADIENTS.orange },
          ].map(({ label, value, icon: Icon, gradient }) => (
            <div key={label} style={{ ...CARD, paddingTop: 28, position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: -16,
                  left: 20,
                  width: 52,
                  height: 52,
                  borderRadius: "12px",
                  background: gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                }}
              >
                <Icon style={{ width: 22, height: 22, color: "#fff" }} />
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={LABEL}>{label}</div>
                <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 22, color: T.text }}>{value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Org Chart */}
        <div style={{ ...CARD, marginBottom: 28, overflowX: "auto" }}>
          <div style={{ ...LABEL, marginBottom: 20 }}>Organization Structure</div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
            <OrgCard node={ORG} isRoot />
            <div style={{ width: 2, height: 24, background: T.border }} />
            <div style={{ display: "flex", gap: 4, width: "80%", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "5%",
                  right: "5%",
                  height: 2,
                  background: T.border,
                }}
              />
            </div>
            {ORG.reports && <OrgLevel nodes={ORG.reports} />}
          </div>
        </div>

        {/* Bottom row: Headcount trend + Open positions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Headcount trend chart */}
          <div style={CARD}>
            <div style={{ ...LABEL, marginBottom: 16 }}>Headcount Growth (6 months)</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={headcountTrend} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
                <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: `${T.accent}11` }} />
                <Bar dataKey="count" fill={T.amber} radius={[6, 6, 0, 0]} name="Headcount" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Open positions */}
          <div style={CARD}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={LABEL}>Open Positions ({OPEN_POSITIONS.length})</div>
              <button
                style={{
                  background: BADGE_GRADIENTS.blue,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 14px",
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Plus style={{ width: 12, height: 12 }} /> Add Role
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {OPEN_POSITIONS.map((pos, i) => (
                <div
                  key={pos.role}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    background: T.bg,
                    borderRadius: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedOpen(selectedOpen === i ? null : i)}
                >
                  <div>
                    <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 13, color: T.text }}>{pos.role}</div>
                    <div style={{ fontFamily: FONT, fontSize: 11, color: T.muted }}>{pos.dept}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        background: pos.type === "Human" ? "#0D948822" : "#0d948822",
                        color: pos.type === "Human" ? T.blue : "#0d9488",
                        fontSize: 11,
                        fontWeight: 700,
                        fontFamily: FONT,
                        borderRadius: 6,
                        padding: "2px 8px",
                      }}
                    >
                      {pos.type}
                    </span>
                    <button
                      style={{
                        background: BADGE_GRADIENTS.green,
                        color: "#fff",
                        border: "none",
                        borderRadius: 7,
                        padding: "4px 12px",
                        fontFamily: FONT,
                        fontWeight: 700,
                        fontSize: 11,
                        cursor: "pointer",
                      }}
                    >
                      Post Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
