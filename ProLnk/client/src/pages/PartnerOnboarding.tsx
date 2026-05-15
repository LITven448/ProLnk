import React from 'react';
import { useState } from "react";
import { useLocation } from "wouter";
import {
  CheckCircle,
  Circle,
  ChevronRight,
  User,
  Camera,
  MapPin,
  Shield,
  CreditCard,
  Bell,
  Rocket,
  AlertCircle,
  Clock,
  Zap,
  Star,
} from "lucide-react";

interface ProfileStep {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>;
  critical: boolean;
  route: string;
  iconColor: string;
  iconBg: string;
}

const ACTIVATION_STEPS: ProfileStep[] = [
  {
    id: "trade",
    label: "Trade verified",
    description: "Confirm your primary trade and license details",
    icon: Shield,
    critical: true,
    route: "/settings/trade",
    iconColor: "#38bdf8",
    iconBg: "rgba(56,189,248,0.12)",
  },
  {
    id: "photo",
    label: "Profile photo added",
    description: "Partners with photos win 40% more jobs",
    icon: Camera,
    critical: false,
    route: "/settings/profile",
    iconColor: "#a78bfa",
    iconBg: "rgba(167,139,250,0.12)",
  },
  {
    id: "service_area",
    label: "Service area set",
    description: "Define your city and radius so we route leads correctly",
    icon: MapPin,
    critical: true,
    route: "/settings/service-area",
    iconColor: "#fb923c",
    iconBg: "rgba(251,146,60,0.12)",
  },
  {
    id: "payment",
    label: "Payout method connected",
    description: "Add a bank account or debit card to receive commissions",
    icon: CreditCard,
    critical: true,
    route: "/settings/payment",
    iconColor: "#4ade80",
    iconBg: "rgba(74,222,128,0.12)",
  },
  {
    id: "notifications",
    label: "Notification preferences",
    description: "Set how you get alerted for new leads (SMS, email, push)",
    icon: Bell,
    critical: false,
    route: "/settings/notifications",
    iconColor: "#fbbf24",
    iconBg: "rgba(251,191,36,0.12)",
  },
];

function useCompletedSteps() {
  const saved = (() => {
    try {
      const raw = localStorage.getItem("prolnk_activation_steps");
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  })();

  const [completed, setCompleted] = useState<string[]>(saved);

  const toggle = (id: string) => {
    const next = completed.includes(id) ? completed.filter((x) => x !== id) : [...completed, id];
    setCompleted(next);
    try {
      localStorage.setItem("prolnk_activation_steps", JSON.stringify(next));
    } catch {}
  };

  return { completed, toggle };
}

export default function PartnerOnboarding() {
  const [, setLocation] = useLocation();
  const { completed, toggle } = useCompletedSteps();

  const criticalSteps = ACTIVATION_STEPS.filter((s) => s.critical);
  const criticalDone = criticalSteps.filter((s) => completed.includes(s.id)).length;
  const totalDone = ACTIVATION_STEPS.filter((s) => completed.includes(s.id)).length;
  const allCriticalDone = criticalDone === criticalSteps.length;
  const completionPct = Math.round((totalDone / ACTIVATION_STEPS.length) * 100);

  const stepsUntilFirst = criticalSteps.filter((s) => !completed.includes(s.id)).length;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A1628" }}>
      {/* Header */}
      <header
        className="px-6 py-4 flex items-center justify-between sticky top-0 z-20"
        style={{
          background: "rgba(10,22,40,0.95)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span className="text-lg font-black tracking-tight" style={{ color: "#2dd4bf" }}>ProLnk</span>
        <button
          onClick={() => setLocation("/dashboard")}
          className="text-xs hover:opacity-80 transition-opacity"
          style={{ color: "#4b5563" }}
        >
          Skip for now →
        </button>
      </header>

      <div className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-lg space-y-5">

          {/* Hero block */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.2)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#2dd4bf", opacity: 0.7 }}>
                  Account Activation
                </p>
                <h1 className="text-2xl font-black text-white">Complete your profile</h1>
                <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>
                  {allCriticalDone
                    ? "All critical steps done — you're ready to go live!"
                    : `You're ${stepsUntilFirst} step${stepsUntilFirst !== 1 ? "s" : ""} from your first lead`}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                    <circle
                      cx="32"
                      cy="32"
                      r="27"
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={`${(completionPct / 100) * 169.6} 169.6`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-black text-white">{completionPct}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                {
                  label: "Steps done",
                  value: `${totalDone}/${ACTIVATION_STEPS.length}`,
                  color: "#2dd4bf",
                },
                {
                  label: "Critical steps",
                  value: `${criticalDone}/${criticalSteps.length}`,
                  color: allCriticalDone ? "#4ade80" : "#fb923c",
                },
                {
                  label: "Est. leads/wk",
                  value: allCriticalDone ? "5–12" : "0",
                  color: allCriticalDone ? "#4ade80" : "#4b5563",
                },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-lg font-black" style={{ color }}>{value}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline / checklist */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#6b7280" }}>
              Activation checklist
            </p>
            <div className="space-y-3">
              {ACTIVATION_STEPS.map((step, i) => {
                const done = completed.includes(step.id);
                const Icon = step.icon;
                const isLast = i === ACTIVATION_STEPS.length - 1;

                return (
                  <div key={step.id} className="relative">
                    {/* Connecting line */}
                    {!isLast && (
                      <div
                        className="absolute left-5 top-11 w-0.5 h-4"
                        style={{ background: done ? "rgba(45,212,191,0.3)" : "rgba(255,255,255,0.06)" }}
                      />
                    )}

                    <div
                      className="flex items-center gap-3 p-3 rounded-xl transition-all"
                      style={{
                        background: done ? "rgba(45,212,191,0.05)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${done ? "rgba(45,212,191,0.2)" : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: done ? "rgba(45,212,191,0.12)" : step.iconBg }}
                      >
                        {done ? (
                          <CheckCircle size={18} style={{ color: "#2dd4bf" }} />
                        ) : (
                          <Icon size={18} style={{ color: step.iconColor }} />
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p
                            className="text-sm font-semibold"
                            style={{
                              color: done ? "#9ca3af" : "#e5e7eb",
                              textDecoration: done ? "line-through" : "none",
                            }}
                          >
                            {step.label}
                          </p>
                          {step.critical && !done && (
                            <span
                              className="text-xs px-1.5 py-0.5 rounded font-bold"
                              style={{
                                background: "rgba(251,146,60,0.15)",
                                color: "#fb923c",
                                border: "1px solid rgba(251,146,60,0.25)",
                              }}
                            >
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: "#4b5563" }}>
                          {step.description}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggle(step.id)}
                          className="p-1 transition-opacity hover:opacity-70"
                          title={done ? "Mark incomplete" : "Mark complete"}
                        >
                          {done ? (
                            <CheckCircle size={18} style={{ color: "#2dd4bf" }} />
                          ) : (
                            <Circle size={18} style={{ color: "#374151" }} />
                          )}
                        </button>
                        <button
                          onClick={() => setLocation(step.route)}
                          className="p-1.5 rounded-lg transition-all hover:opacity-80"
                          style={{ background: "rgba(255,255,255,0.06)" }}
                        >
                          <ChevronRight size={14} style={{ color: "#6b7280" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What's missing callout */}
          {!allCriticalDone && (
            <div
              className="rounded-2xl p-4 flex items-start gap-3"
              style={{ background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.2)" }}
            >
              <AlertCircle size={16} style={{ color: "#fb923c", flexShrink: 0, marginTop: 1 }} />
              <div>
                <p className="text-sm font-bold text-white">Missing required steps</p>
                <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>
                  Complete the <span style={{ color: "#fb923c" }}>Required</span> steps above to receive leads.
                  Your account is active but leads won't be assigned until these are done.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {criticalSteps
                    .filter((s) => !completed.includes(s.id))
                    .map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setLocation(s.route)}
                        className="text-xs px-2.5 py-1 rounded-full font-semibold hover:opacity-80 transition-opacity"
                        style={{
                          background: "rgba(251,146,60,0.15)",
                          color: "#fb923c",
                          border: "1px solid rgba(251,146,60,0.3)",
                        }}
                      >
                        {s.label} →
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Activation CTA */}
          {allCriticalDone ? (
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(74,222,128,0.15)" }}
                >
                  <Rocket size={18} style={{ color: "#4ade80" }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Ready to go live!</p>
                  <p className="text-xs" style={{ color: "#6b7280" }}>All required steps are complete</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { emoji: "⚡", label: "First lead", sub: "Usually within 48h" },
                  { emoji: "💰", label: "Commission", sub: "Paid 1st of month" },
                  { emoji: "🏆", label: "Tier", sub: "Charter locked in" },
                ].map(({ emoji, label, sub }) => (
                  <div
                    key={label}
                    className="rounded-xl p-2 text-center"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    <span className="text-lg">{emoji}</span>
                    <p className="text-xs font-bold text-white mt-0.5">{label}</p>
                    <p className="text-xs" style={{ color: "#4b5563" }}>{sub}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setLocation("/dashboard")}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: "#4ade80", color: "#0A1628" }}
              >
                <Zap size={16} /> Activate My Account
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Timeline estimate */}
              <div
                className="rounded-xl p-4 flex items-center gap-3"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <Clock size={16} style={{ color: "#6b7280", flexShrink: 0 }} />
                <div>
                  <p className="text-xs font-semibold text-white">
                    ~{stepsUntilFirst * 5} minutes to activate
                  </p>
                  <p className="text-xs" style={{ color: "#4b5563" }}>
                    Complete {stepsUntilFirst} more step{stepsUntilFirst !== 1 ? "s" : ""} to start receiving leads
                  </p>
                </div>
              </div>

              {/* Pro benefit tease */}
              <div
                className="rounded-xl p-4 flex items-start gap-3"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <Star size={14} style={{ color: "#fbbf24", flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p className="text-xs font-semibold text-white">Charter partner benefits locked in</p>
                  <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                    25% commission rate · $149/mo rate locked · Priority lead routing · 4-level network override
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  const nextStep = ACTIVATION_STEPS.find((s) => !completed.includes(s.id));
                  if (nextStep) setLocation(nextStep.route);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #2dd4bf, #38bdf8)", color: "#0A1628" }}
              >
                Continue Setup <ChevronRight size={15} />
              </button>

              <button
                onClick={() => setLocation("/dashboard")}
                className="w-full py-3 rounded-xl text-xs font-semibold transition-opacity hover:opacity-70"
                style={{ color: "#4b5563", background: "transparent", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                Finish later — go to dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
