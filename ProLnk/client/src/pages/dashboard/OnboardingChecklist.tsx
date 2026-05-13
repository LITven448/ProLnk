import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  CheckCircle2, Circle, ChevronRight, Rocket, Shield, CreditCard,
  User, Users, Briefcase, DollarSign, Clock, ArrowRight, Trophy
} from "lucide-react";

const STORAGE_KEY = "prolnk_onboarding_v2";

interface Step {
  id: string;
  title: string;
  cta: string;
  href: string;
  timeEstimate: string;
  whyItMatters: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  alwaysComplete?: boolean;
}

const STEPS: Step[] = [
  {
    id: "spot",
    title: "Reserve your spot",
    cta: "Done",
    href: "#",
    timeEstimate: "Complete",
    whyItMatters: "You're in — your founding partner position is locked.",
    icon: Trophy,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.3)",
    alwaysComplete: true,
  },
  {
    id: "license",
    title: "Verify your license",
    cta: "Upload your contractor license",
    href: "/dashboard/profile",
    timeEstimate: "5 min",
    whyItMatters: "Verified pros get priority lead routing and higher trust scores.",
    icon: Shield,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.3)",
  },
  {
    id: "payout",
    title: "Set up payout",
    cta: "Add bank account for payouts",
    href: "/dashboard/payout-setup",
    timeEstimate: "3 min",
    whyItMatters: "Commission earnings can't be released without a connected bank account.",
    icon: CreditCard,
    color: "#F5E642",
    bg: "rgba(245,230,66,0.12)",
    border: "rgba(245,230,66,0.3)",
  },
  {
    id: "profile",
    title: "Complete profile",
    cta: "Add photo, bio, and service details",
    href: "/dashboard/profile",
    timeEstimate: "10 min",
    whyItMatters: "Pros with complete profiles get 3x more lead matches.",
    icon: User,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.3)",
  },
  {
    id: "invite",
    title: "Share your link",
    cta: "Invite your first 3 colleagues",
    href: "/dashboard/referral",
    timeEstimate: "2 min",
    whyItMatters: "Each referral earns you a 7% override on their job commissions — forever.",
    icon: Users,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.3)",
  },
  {
    id: "first_job",
    title: "Log first job",
    cta: "Complete your first job through ProLnk",
    href: "/job-log",
    timeEstimate: "5 min",
    whyItMatters: "Your job history builds your reputation and unlocks higher-value leads.",
    icon: Briefcase,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.12)",
    border: "rgba(6,182,212,0.3)",
  },
  {
    id: "first_override",
    title: "Earn first override",
    cta: "Watch your first passive income arrive",
    href: "/dashboard/partner-home",
    timeEstimate: "Automatic",
    whyItMatters: "Once your referred pros log jobs, your override income starts flowing.",
    icon: DollarSign,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.3)",
  },
];

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

function estimateDaysLeft(completedCount: number): number {
  const remaining = STEPS.length - completedCount;
  if (remaining <= 1) return 0;
  if (remaining <= 3) return 1;
  return Math.ceil(remaining * 0.5);
}

export default function OnboardingChecklist() {
  const [completed, setCompleted] = useState<Set<string>>(loadCompleted);

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

  const completedCount = completed.size;
  const totalSteps = STEPS.length;
  const progressPct = Math.round((completedCount / totalSteps) * 100);
  const daysLeft = estimateDaysLeft(completedCount);
  const allDone = completedCount === totalSteps;

  return (
    <div className="min-h-screen" style={{ background: "#0A1628" }}>
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(245,230,66,0.12)", border: "1px solid rgba(245,230,66,0.25)" }}
          >
            <Rocket size={22} style={{ color: "#F5E642" }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Partner Activation Checklist</h1>
            <p className="text-sm text-gray-400 mt-0.5">Complete these steps to go fully live on ProLnk.</p>
          </div>
        </div>

        {/* Progress Banner */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: allDone
              ? "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))"
              : "linear-gradient(135deg, rgba(245,230,66,0.1), rgba(10,22,40,0))",
            border: allDone ? "1px solid rgba(34,197,94,0.35)" : "1px solid rgba(245,230,66,0.25)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Progress</p>
              <p className="text-2xl font-bold text-white">{completedCount} of {totalSteps} steps complete</p>
            </div>
            {!allDone && (
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-0.5 flex items-center gap-1 justify-end">
                  <Clock size={11} />
                  Est. time to activation
                </p>
                <p className="text-lg font-bold" style={{ color: "#F5E642" }}>
                  {daysLeft === 0 ? "Almost there!" : `~${daysLeft} day${daysLeft > 1 ? "s" : ""}`}
                </p>
              </div>
            )}
            {allDone && (
              <span
                className="px-3 py-1.5 rounded-full text-sm font-bold"
                style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.35)" }}
              >
                Fully Active
              </span>
            )}
          </div>

          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progressPct}%`,
                background: allDone
                  ? "linear-gradient(90deg, #22c55e, #16a34a)"
                  : "linear-gradient(90deg, #F5E642, #d4af00)",
              }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {STEPS.map((step, idx) => {
            const done = step.alwaysComplete ? true : completed.has(step.id);
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="rounded-2xl p-5 transition-all"
                style={{
                  background: done ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.04)",
                  border: done
                    ? "1px solid rgba(255,255,255,0.06)"
                    : `1px solid ${step.border}`,
                  opacity: done ? 0.75 : 1,
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Step number / check */}
                  <button
                    onClick={() => toggle(step.id, step.alwaysComplete)}
                    className="flex-shrink-0 mt-0.5 transition-transform hover:scale-105"
                    aria-label={done ? "Mark incomplete" : "Mark complete"}
                  >
                    {done ? (
                      <CheckCircle2 size={22} style={{ color: "#22c55e" }} />
                    ) : (
                      <Circle size={22} className="text-gray-600" />
                    )}
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
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-600 font-semibold">Step {idx + 1}</span>
                      {done && (
                        <span className="text-xs font-semibold" style={{ color: "#22c55e" }}>Done</span>
                      )}
                    </div>
                    <p className={`font-bold text-base ${done ? "line-through text-gray-500" : "text-white"}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{step.whyItMatters}</p>

                    {!done && (
                      <div className="flex items-center gap-3 mt-3">
                        <Link href={step.href}>
                          <span
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-90"
                            style={{ background: step.color === "#F5E642" ? "#F5E642" : step.bg, color: step.color === "#F5E642" ? "#0A1628" : step.color, border: `1px solid ${step.border}` }}
                          >
                            {step.cta}
                            <ChevronRight size={12} />
                          </span>
                        </Link>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock size={11} />
                          {step.timeEstimate}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion CTA */}
        {allDone ? (
          <div
            className="rounded-2xl p-6 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(10,22,40,0))",
              border: "1px solid rgba(34,197,94,0.3)",
            }}
          >
            <CheckCircle2 size={32} style={{ color: "#22c55e" }} className="mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">You're fully activated!</h3>
            <p className="text-sm text-gray-400 mb-4">
              Your profile is live, payouts are ready, and your network is growing. Go earn.
            </p>
            <Link href="/dashboard/partner-home">
              <span
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: "#22c55e", color: "#fff" }}
              >
                Go to Dashboard <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        ) : (
          <div
            className="rounded-2xl p-4 flex items-center gap-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex-1">
              <p className="text-xs text-gray-500">
                Need help? Visit the <Link href="/resources"><span className="text-yellow-400 hover:underline cursor-pointer">Resource Center</span></Link> or contact support.
              </p>
            </div>
            <Link href="/dashboard/partner-home">
              <span className="text-xs font-semibold flex items-center gap-1" style={{ color: "#F5E642" }}>
                Dashboard <ChevronRight size={11} />
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
