import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  CheckCircle, Circle, ChevronRight, Rocket, Shield, CreditCard,
  User, Users, Briefcase, DollarSign, Clock, ArrowRight, Trophy,
  Camera, BookOpen, Star, MapPin,
} from "lucide-react";

const STORAGE_KEY = "prolnk_onboarding_v3";

type StepStatus = "complete" | "active" | "pending";

interface Step {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  timeEstimate: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  category: string;
  optional?: boolean;
  alwaysComplete?: boolean;
}

interface CategoryConfig {
  id: string;
  label: string;
  steps: Step[];
}

const ALL_STEPS: Step[] = [
  // Profile Setup
  {
    id: "spot",
    title: "Reserve your spot",
    description: "Your founding partner position is locked — you're ahead of thousands on the waitlist.",
    cta: "Done",
    href: "#",
    timeEstimate: "Complete",
    icon: Trophy,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.3)",
    category: "Profile Setup",
    alwaysComplete: true,
  },
  {
    id: "profile",
    title: "Complete your profile",
    description: "Pros with complete profiles get 3x more lead matches. Add photo, bio, and service details.",
    cta: "Complete profile",
    href: "/dashboard/profile",
    timeEstimate: "10 min",
    icon: User,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.3)",
    category: "Profile Setup",
  },
  {
    id: "photo",
    title: "Upload a profile photo",
    description: "A professional headshot increases trust and boosts response rates by 40%.",
    cta: "Upload photo",
    href: "/dashboard/profile",
    timeEstimate: "2 min",
    icon: Camera,
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.12)",
    border: "rgba(167,139,250,0.3)",
    category: "Profile Setup",
    optional: true,
  },
  {
    id: "service-area",
    title: "Set your service area",
    description: "Define your radius so ProLnk routes the right leads to you — not ones 2 hours away.",
    cta: "Set service area",
    href: "/dashboard/profile",
    timeEstimate: "3 min",
    icon: MapPin,
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.12)",
    border: "rgba(96,165,250,0.3)",
    category: "Profile Setup",
  },
  // Verification
  {
    id: "license",
    title: "Verify your license",
    description: "Verified pros get priority lead routing and a trust badge on their profile.",
    cta: "Upload contractor license",
    href: "/dashboard/profile",
    timeEstimate: "5 min",
    icon: Shield,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.3)",
    category: "Verification",
  },
  {
    id: "insurance",
    title: "Upload proof of insurance",
    description: "Insurance verification unlocks commercial leads and increases match value by 25%.",
    cta: "Upload COI",
    href: "/dashboard/profile",
    timeEstimate: "3 min",
    icon: Star,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.3)",
    category: "Verification",
    optional: true,
  },
  // First Earnings
  {
    id: "payout",
    title: "Set up payout",
    description: "Commission earnings can't be released without a connected bank account.",
    cta: "Add bank account",
    href: "/dashboard/payout-setup",
    timeEstimate: "3 min",
    icon: CreditCard,
    color: "#2dd4bf",
    bg: "rgba(45,212,191,0.12)",
    border: "rgba(45,212,191,0.3)",
    category: "First Earnings",
  },
  {
    id: "first_job",
    title: "Log your first job",
    description: "Your job history builds your reputation and unlocks higher-value leads.",
    cta: "Log a job",
    href: "/job-log",
    timeEstimate: "5 min",
    icon: Briefcase,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.12)",
    border: "rgba(6,182,212,0.3)",
    category: "First Earnings",
  },
  {
    id: "first_override",
    title: "Earn your first override",
    description: "Once your referred pros log jobs, passive override income starts flowing automatically.",
    cta: "View dashboard",
    href: "/dashboard/partner-home",
    timeEstimate: "Automatic",
    icon: DollarSign,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.3)",
    category: "First Earnings",
  },
  // Network Growth
  {
    id: "invite",
    title: "Share your referral link",
    description: "Each referral earns you a 7% override on their job commissions — forever.",
    cta: "Invite colleagues",
    href: "/dashboard/referral",
    timeEstimate: "2 min",
    icon: Users,
    color: "#fb923c",
    bg: "rgba(251,146,60,0.12)",
    border: "rgba(251,146,60,0.3)",
    category: "Network Growth",
  },
  {
    id: "learn",
    title: "Complete the Pro quick-start",
    description: "5-minute walkthrough covering lead matching, commission tiers, and the network income system.",
    cta: "Start quick-start",
    href: "/resources",
    timeEstimate: "5 min",
    icon: BookOpen,
    color: "#818cf8",
    bg: "rgba(129,140,248,0.12)",
    border: "rgba(129,140,248,0.3)",
    category: "Network Growth",
    optional: true,
  },
  {
    id: "first_recruit",
    title: "Recruit your first teammate",
    description: "Build your tier-1 override network. The sooner you start, the more you earn passively.",
    cta: "Send an invite",
    href: "/dashboard/referral",
    timeEstimate: "2 min",
    icon: Users,
    color: "#f472b6",
    bg: "rgba(244,114,182,0.12)",
    border: "rgba(244,114,182,0.3)",
    category: "Network Growth",
  },
];

const CATEGORIES: CategoryConfig[] = [
  { id: "Profile Setup", label: "Profile Setup", steps: ALL_STEPS.filter(s => s.category === "Profile Setup") },
  { id: "Verification", label: "Verification", steps: ALL_STEPS.filter(s => s.category === "Verification") },
  { id: "First Earnings", label: "First Earnings", steps: ALL_STEPS.filter(s => s.category === "First Earnings") },
  { id: "Network Growth", label: "Network Growth", steps: ALL_STEPS.filter(s => s.category === "Network Growth") },
];

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Profile Setup": User,
  "Verification": Shield,
  "First Earnings": DollarSign,
  "Network Growth": Users,
};

const CATEGORY_COLORS: Record<string, string> = {
  "Profile Setup": "#8b5cf6",
  "Verification": "#3b82f6",
  "First Earnings": "#2dd4bf",
  "Network Growth": "#fb923c",
};

function loadCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: string[] = raw ? JSON.parse(raw) : [];
    const set = new Set(parsed);
    set.add("spot");
    return set;
  } catch {
    return new Set(["spot"]);
  }
}

function saveCompleted(set: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
}

function getStepStatus(stepId: string, completed: Set<string>, allSteps: Step[], stepIndex: number): StepStatus {
  if (completed.has(stepId)) return "complete";
  const firstIncomplete = allSteps.findIndex(s => !completed.has(s.id));
  if (stepIndex === firstIncomplete) return "active";
  return "pending";
}

export default function OnboardingChecklist() {
  const [completed, setCompleted] = useState<Set<string>>(loadCompleted);
  const [skipped, setSkipped] = useState<Set<string>>(new Set());

  useEffect(() => {
    saveCompleted(completed);
  }, [completed]);

  const toggle = (id: string, alwaysComplete?: boolean) => {
    if (alwaysComplete) return;
    setCompleted(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      next.add("spot");
      return next;
    });
  };

  const skipStep = (id: string) => {
    setSkipped(prev => new Set(prev).add(id));
  };

  const completedCount = completed.size;
  const totalSteps = ALL_STEPS.length;
  const progressPct = Math.round((completedCount / totalSteps) * 100);
  const allDone = completedCount === totalSteps;

  const progressMessage = allDone
    ? "You're fully activated!"
    : progressPct >= 70
    ? "Almost there!"
    : progressPct >= 40
    ? "Great progress — keep going"
    : "Let's get you set up";

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(45,212,191,0.12)", border: "1px solid rgba(45,212,191,0.25)" }}
          >
            <Rocket size={22} className="text-teal-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Partner Activation Checklist</h1>
            <p className="text-sm text-slate-400 mt-0.5">Complete these steps to go fully live on ProLnk.</p>
          </div>
        </div>

        {/* ── UPGRADED: Progress Bar Header ── */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: allDone
              ? "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))"
              : progressPct >= 70
              ? "linear-gradient(135deg, rgba(45,212,191,0.12), rgba(10,22,40,0))"
              : "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(10,22,40,0))",
            border: allDone
              ? "1px solid rgba(34,197,94,0.35)"
              : progressPct >= 70
              ? "1px solid rgba(45,212,191,0.3)"
              : "1px solid rgba(139,92,246,0.25)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                {progressMessage}
              </p>
              <p className="text-2xl font-bold text-white">
                {completedCount} <span className="text-slate-500 text-lg font-normal">of {totalSteps} steps</span>
              </p>
            </div>
            <div className="text-right">
              {allDone ? (
                <span
                  className="px-3 py-1.5 rounded-full text-sm font-bold"
                  style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.35)" }}
                >
                  Fully Active
                </span>
              ) : (
                <>
                  <p
                    className="text-3xl font-black"
                    style={{ color: progressPct >= 70 ? "#2dd4bf" : "#a78bfa" }}
                  >
                    {progressPct}%
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 justify-end mt-0.5">
                    <Clock size={10} />
                    {totalSteps - completedCount} step{totalSteps - completedCount !== 1 ? "s" : ""} left
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 rounded-full overflow-hidden bg-slate-800 mt-3">
            <div
              className="h-full rounded-full transition-all duration-700 relative overflow-hidden"
              style={{
                width: `${progressPct}%`,
                background: allDone
                  ? "linear-gradient(90deg, #22c55e, #16a34a)"
                  : progressPct >= 70
                  ? "linear-gradient(90deg, #2dd4bf, #0d9488)"
                  : "linear-gradient(90deg, #8b5cf6, #7c3aed)",
              }}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>
          </div>

          {/* Category mini-progress pills */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {CATEGORIES.map(cat => {
              const catDone = cat.steps.filter(s => completed.has(s.id)).length;
              const catTotal = cat.steps.length;
              const catComplete = catDone === catTotal;
              const CatIcon = CATEGORY_ICONS[cat.id];
              return (
                <div
                  key={cat.id}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                  style={{
                    background: catComplete ? `${CATEGORY_COLORS[cat.id]}20` : "rgba(255,255,255,0.05)",
                    border: catComplete ? `1px solid ${CATEGORY_COLORS[cat.id]}40` : "1px solid rgba(255,255,255,0.08)",
                    color: catComplete ? CATEGORY_COLORS[cat.id] : "#64748b",
                  }}
                >
                  {catComplete
                    ? <CheckCircle size={10} />
                    : <CatIcon size={10} />
                  }
                  {cat.label} {catDone}/{catTotal}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Step categories ── */}
        {CATEGORIES.map((cat, catIdx) => {
          const CatIcon = CATEGORY_ICONS[cat.id];
          const catColor = CATEGORY_COLORS[cat.id];
          const catDone = cat.steps.filter(s => completed.has(s.id)).length;
          const catComplete = catDone === cat.steps.length;
          const globalIndexOffset = CATEGORIES.slice(0, catIdx).reduce((s, c) => s + c.steps.length, 0);

          return (
            <div key={cat.id} className="space-y-2">
              {/* Category header */}
              <div className="flex items-center gap-2 px-1">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: catComplete ? `${catColor}20` : "rgba(255,255,255,0.06)",
                    border: catComplete ? `1px solid ${catColor}40` : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: catComplete ? `0 0 10px ${catColor}30` : "none",
                  }}
                >
                  {catComplete
                    ? <CheckCircle size={13} style={{ color: catColor }} />
                    : <CatIcon size={13} style={{ color: catComplete ? catColor : "#475569" }} />
                  }
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: catComplete ? catColor : "#64748b" }}
                >
                  {cat.label}
                </span>
                {catComplete && (
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: `${catColor}15`, color: catColor }}
                  >
                    ✓ Done
                  </span>
                )}
                <div className="flex-1 h-px bg-slate-800 ml-1" />
                <span className="text-[10px] text-slate-600">{catDone}/{cat.steps.length}</span>
              </div>

              {/* Steps in category */}
              {cat.steps.map((step, localIdx) => {
                const globalIdx = globalIndexOffset + localIdx;
                const done = step.alwaysComplete ? true : completed.has(step.id);
                const isSkipped = skipped.has(step.id);
                const status: StepStatus = getStepStatus(step.id, completed, ALL_STEPS, globalIdx);
                const Icon = step.icon;
                const isActive = status === "active";

                if (isSkipped && !done) return null;

                return (
                  <div
                    key={step.id}
                    className="rounded-2xl p-5 transition-all"
                    style={{
                      background: done ? "rgba(255,255,255,0.02)" : isActive ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
                      border: isActive
                        ? `1px solid ${step.border}`
                        : done
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "1px solid rgba(255,255,255,0.06)",
                      borderLeft: isActive ? `3px solid ${step.color}` : undefined,
                      opacity: done ? 0.72 : 1,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Check toggle */}
                      <button
                        onClick={() => toggle(step.id, step.alwaysComplete)}
                        className="flex-shrink-0 mt-0.5 transition-transform hover:scale-105"
                        aria-label={done ? "Mark incomplete" : "Mark complete"}
                      >
                        {done
                          ? <CheckCircle size={22} className="text-green-400" />
                          : <Circle size={22} className="text-slate-600" />
                        }
                      </button>

                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: step.bg, border: `1px solid ${step.border}` }}
                      >
                        <Icon size={18} style={{ color: step.color }} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          {isActive && (
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide"
                              style={{ background: `${step.color}20`, color: step.color }}
                            >
                              Up next
                            </span>
                          )}
                          {step.optional && !done && (
                            <span className="text-[9px] font-semibold text-slate-600 uppercase tracking-wide">Optional</span>
                          )}
                          {done && (
                            <span className="text-[9px] font-bold text-green-400 uppercase tracking-wide">Done</span>
                          )}
                        </div>
                        <p className={`font-bold text-sm ${done ? "line-through text-slate-500" : "text-white"}`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{step.description}</p>

                        {!done && (
                          <div className="flex items-center gap-3 mt-3 flex-wrap">
                            <Link href={step.href}>
                              <span
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all hover:opacity-90"
                                style={{
                                  background: step.bg,
                                  color: step.color,
                                  border: `1px solid ${step.border}`,
                                }}
                              >
                                {step.cta}
                                <ChevronRight size={11} />
                              </span>
                            </Link>
                            <span className="flex items-center gap-1 text-xs text-slate-500">
                              <Clock size={10} />
                              {step.timeEstimate}
                            </span>
                            {step.optional && (
                              <button
                                className="text-xs text-slate-600 hover:text-slate-400 underline underline-offset-2 transition-colors"
                                onClick={() => skipStep(step.id)}
                              >
                                Skip for now
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Completion CTA */}
        {allDone ? (
          <div
            className="rounded-2xl p-6 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(10,22,40,0))",
              border: "1px solid rgba(34,197,94,0.3)",
            }}
          >
            <CheckCircle size={32} className="text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">You're fully activated!</h3>
            <p className="text-sm text-slate-400 mb-4">
              Your profile is live, payouts are ready, and your network is growing. Go earn.
            </p>
            <Link href="/dashboard/partner-home">
              <span
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 bg-green-500 text-white"
              >
                Go to Dashboard <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        ) : (
          <div
            className="rounded-2xl p-4 flex items-center gap-4 bg-slate-900 border border-slate-700"
          >
            <div className="flex-1">
              <p className="text-xs text-slate-500">
                Need help? Visit the{" "}
                <Link href="/resources">
                  <span className="text-teal-400 hover:underline cursor-pointer">Resource Center</span>
                </Link>{" "}
                or contact support.
              </p>
            </div>
            <Link href="/dashboard/partner-home">
              <span className="text-xs font-semibold flex items-center gap-1 text-teal-400">
                Dashboard <ChevronRight size={11} />
              </span>
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
