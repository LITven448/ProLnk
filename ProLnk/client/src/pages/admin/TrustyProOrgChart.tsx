import React from 'react';
import AdminLayout, { T, BADGE_GRADIENTS, FONT, MONO } from "@/components/AdminLayout";
import {
  Network, Shield, Camera, Home, Brain, Star, Bot, User, ArrowRight,
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

interface Department {
  name: string;
  head: string;
  initials: string;
  color: string;
  icon: React.ElementType;
  responsibilities: string[];
  keyMetric: { label: string; value: string };
  agents: string[];
  members: { name: string; role: string; isAI: boolean }[];
  handoffsTo: string[];
}

const DEPARTMENTS: Department[] = [
  {
    name: "Scan Operations",
    head: "AI Agent",
    initials: "SO",
    color: "#0d9488″,
    icon: Camera,
    responsibilities: ["Photo capture workflows", "AI scan quality control", "Defect detection pipeline"],
    keyMetric: { label: "Scans / Month", value: "341″ },
    agents: ["Photo Analysis Agent", "Quality Control Agent"],
    members: [
      { name: "AI Agent", role: "Scan Coordinator", isAI: true },
      { name: "AI Agent", role: "Photo Analyst", isAI: true },
      { name: "TBD", role: "Field Supervisor", isAI: false },
    ],
    handoffsTo: ["Pro Success", "AI Research"],
  },
  {
    name: "Pro Success",
    head: "AI Agent",
    initials: "PS",
    color: T.blue,
    icon: Shield,
    responsibilities: ["Pro onboarding & activation", "Retention programs", "Performance coaching"],
    keyMetric: { label: "Pro Retention", value: "94%" },
    agents: ["Onboarding Agent", "Retention Optimizer"],
    members: [
      { name: "AI Agent", role: "Onboarding Specialist", isAI: true },
      { name: "TBD", role: "Account Manager", isAI: false },
      { name: "AI Agent", role: "Performance Coach", isAI: true },
    ],
    handoffsTo: ["Homeowner Engagement"],
  },
  {
    name: "Homeowner Engagement",
    head: "AI Agent",
    initials: "HE",
    color: T.amber,
    icon: Home,
    responsibilities: ["Homeowner onboarding", "Lead quality management", "Satisfaction tracking"],
    keyMetric: { label: "Satisfaction", value: "4.9★" },
    agents: ["Lead Scorer", "Feedback Collector"],
    members: [
      { name: "AI Agent", role: "Lead Qualifier", isAI: true },
      { name: "AI Agent", role: "Survey Analyst", isAI: true },
      { name: "TBD", role: "Customer Success", isAI: false },
    ],
    handoffsTo: ["Pro Success"],
  },
  {
    name: "AI Research",
    head: "AI Agent",
    initials: "AR",
    color: T.purple,
    icon: Brain,
    responsibilities: ["Model training & fine-tuning", "Scan accuracy improvements", "New detection capabilities"],
    keyMetric: { label: "Model Accuracy", value: "97.3%" },
    agents: ["Predictive Modeler", "Recommendation Engine"],
    members: [
      { name: "AI Agent", role: "ML Engineer", isAI: true },
      { name: "AI Agent", role: "Data Scientist", isAI: true },
      { name: "TBD", role: "AI Researcher", isAI: false },
    ],
    handoffsTo: ["Scan Operations"],
  },
];

const PLATFORM_STATS = [
  { label: "Active Pros", value: "147″, icon: Shield, gradient: BADGE_GRADIENTS.blue },
  { label: "Homeowners Served", value: "2,840″, icon: Home, gradient: BADGE_GRADIENTS.green },
  { label: "Avg Rating", value: "4.8★", icon: Star, gradient: BADGE_GRADIENTS.orange },
  { label: "AI Roles", value: "9 / 12″, icon: Bot, gradient: BADGE_GRADIENTS.cyan },
];

function AvatarCircle({ initials, color, isAI }: { initials: string; color: string; isAI: boolean }) {
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: `${color}22`,
          border: `2px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 12,
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
            width: 15,
            height: 15,
            borderRadius: "50%",
            background: "#0d9488″,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Bot style={{ width: 8, height: 8, color: "#fff" }} />
        </div>
      )}
    </div>
  );
}

function DeptCard({ dept }: { dept: Department }) {
  const Icon = dept.icon;
  return (
    <div
      style={{
        backgroundColor: T.card,
        border: `1.5px solid ${dept.color}55`,
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header band */}
      <div
        style={{
          background: `${dept.color}18`,
          borderBottom: `1px solid ${dept.color}33`,
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            background: dept.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon style={{ width: 18, height: 18, color: "#fff" }} />
        </div>
        <div>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 14, color: T.text }}>{dept.name}</div>
          <div style={{ fontFamily: FONT, fontSize: 11, color: T.muted }}>Head: {dept.head}</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontFamily: FONT, fontSize: 10, color: T.muted }}>{dept.keyMetric.label}</div>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 18, color: dept.color }}>
            {dept.keyMetric.value}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Responsibilities */}
        <div>
          <div style={{ ...LABEL, marginBottom: 6 }}>Responsibilities</div>
          {dept.responsibilities.map((r) => (
            <div
              key={r}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: FONT,
                fontSize: 12,
                color: T.text,
                marginBottom: 3,
              }}
            >
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: dept.color, flexShrink: 0 }} />
              {r}
            </div>
          ))}
        </div>

        {/* Team members */}
        <div>
          <div style={{ ...LABEL, marginBottom: 8 }}>Team</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {dept.members.map((m) => (
              <div
                key={m.role}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "6px 10px",
                  background: T.bg,
                  borderRadius: 8,
                }}
              >
                <AvatarCircle
                  initials={m.name === "TBD" ? "?" : m.role.slice(0, 2).toUpperCase()}
                  color={m.isAI ? "#0d9488″ : T.blue}
                  isAI={m.isAI}
                />
                <div>
                  <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 12, color: T.text }}>{m.role}</div>
                  <div style={{ fontFamily: FONT, fontSize: 10, color: T.muted }}>{m.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agents */}
        <div>
          <div style={{ ...LABEL, marginBottom: 6 }}>AI Agents</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {dept.agents.map((a) => (
              <span
                key={a}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  background: "#0d948818″,
                  color: "#0d9488″,
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: FONT,
                  borderRadius: 6,
                  padding: "3px 8px",
                }}
              >
                <Bot style={{ width: 10, height: 10 }} /> {a}
              </span>
            ))}
          </div>
        </div>

        {/* Handoffs */}
        <div>
          <div style={{ ...LABEL, marginBottom: 6 }}>Handoffs To</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {dept.handoffsTo.map((h) => (
              <span
                key={h}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  background: `${dept.color}18`,
                  color: dept.color,
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: FONT,
                  borderRadius: 6,
                  padding: "3px 8px",
                }}
              >
                <ArrowRight style={{ width: 10, height: 10 }} /> {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrustyProOrgChart() {
  return (
    <AdminLayout>
      <div style={{ padding: "24px 32px 40px", fontFamily: FONT }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <Network style={{ width: 22, height: 22, color: "#0d9488″ }} />
            <h1 style={{ fontFamily: FONT, fontWeight: 800, fontSize: 22, color: T.text, margin: 0 }}>
              TrustyPro — Org Chart
            </h1>
          </div>
          <p style={{ fontFamily: FONT, fontSize: 13, color: T.muted, margin: 0 }}>
            Department structure, AI agent assignments, and team metrics for TrustyPro division.
          </p>
        </div>

        {/* Platform stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {PLATFORM_STATS.map(({ label, value, icon: Icon, gradient }) => (
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

        {/* CEO card */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <div
            style={{
              backgroundColor: T.card,
              border: `2px solid ${T.amber}`,
              borderRadius: "14px",
              padding: "16px 28px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              boxShadow: `0 4px 20px ${T.amber}33`,
            }}
          >
            <AvatarCircle initials="AF" color={T.amber} isAI={false} />
            <div>
              <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 15, color: T.text }}>Andrew Frakes</div>
              <div style={{ fontFamily: FONT, fontSize: 12, color: T.muted }}>CEO / Founder — TrustyPro Division</div>
            </div>
          </div>
        </div>

        {/* Connector */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <div style={{ width: 2, height: 20, background: T.border }} />
        </div>

        {/* Department cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {DEPARTMENTS.map((dept) => (
            <DeptCard key={dept.name} dept={dept} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
