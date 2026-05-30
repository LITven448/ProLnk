import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  CheckCircle, ArrowRight, ArrowLeft, Crown, Star,
  Zap, Users, DollarSign, TrendingUp, Shield, ChevronRight,
  Lock, Sparkles,
} from "lucide-react";
import { toast } from "sonner";

// ── Tier Config ────────────────────────────────────────────────────────────────
const TIERS = [
  {
    id: "waitlist",
    label: "Waitlist",
    color: "#6b7280",
    bg: "rgba(107,114,128,0.10)",
    border: "rgba(107,114,128,0.30)",
    icon: Shield,
    slots: 0,
    price: 0,
    jobRate: 0,
    subRate: 0,
    description: "You're on the waitlist but not yet a partner.",
  },
  {
    id: "charter",
    label: "Charter Member",
    color: "#F5C518",
    bg: "rgba(245,197,24,0.10)",
    border: "rgba(245,197,24,0.35)",
    icon: Crown,
    slots: 25,
    price: 149,
    jobRate: 7,
    subRate: 12,
    description: "Top 25 founding spots. Maximum network leverage.",
    benefits: [
      "7% job override on L1 recruits",
      "12% subscription override on L1 recruits",
      "4/2/1% cascading overrides L2–L4",
      "$149/mo locked forever",
      "60% direct job commission keep",
      "Charter badge + lifetime origination rights",
      "1.5% home origination override",
      "Priority lead routing",
      "Founding member Discord access",
    ],
  },
  {
    id: "founding",
    label: "Founding Member",
    color: "#2DD4BF",
    bg: "rgba(45,212,191,0.10)",
    border: "rgba(45,212,191,0.35)",
    icon: Star,
    slots: 100,
    price: 149,
    jobRate: 7,
    subRate: 12,
    description: "Founding partner status — same $149/mo locked rate.",
    benefits: [
      "7% job override on L1 recruits",
      "12% subscription override on L1 recruits",
      "4/2/1% cascading overrides L2–L4",
      "$149/mo locked forever",
      "60% direct job commission keep",
      "Founding badge + origination rights",
      "1.5% home origination override",
      "Priority lead routing",
    ],
  },
  {
    id: "level3",
    label: "L3 Partner",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.10)",
    border: "rgba(167,139,250,0.35)",
    icon: TrendingUp,
    slots: 400,
    price: 149,
    jobRate: 7,
    subRate: 12,
    description: "Network partner with full override access.",
    benefits: [
      "7% job override on L1 recruits",
      "12% subscription override on L1 recruits",
      "4/2/1% cascading overrides L2–L4",
      "$149/mo locked rate",
      "60% direct job commission keep",
      "1.5% home origination override",
    ],
  },
  {
    id: "level4",
    label: "L4 Partner",
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.10)",
    border: "rgba(96,165,250,0.35)",
    icon: Zap,
    slots: 1600,
    price: 149,
    jobRate: 7,
    subRate: 12,
    description: "Entry-level network partner. Same locked rate.",
    benefits: [
      "7% job override on L1 recruits",
      "12% subscription override on L1 recruits",
      "4/2/1% cascading overrides L2–L4",
      "$149/mo locked rate",
      "60% direct job commission keep",
    ],
  },
];

const TIER_ORDER = ["waitlist", "level4", "level3", "founding", "charter"];

function tierRank(id: string) {
  return TIER_ORDER.indexOf(id);
}

function nextTier(current: string) {
  const rank = tierRank(current);
  if (rank <= 0) return TIERS.find(t => t.id === "level4")!;
  const nextId = TIER_ORDER[rank + 1];
  return TIERS.find(t => t.id === nextId) ?? null;
}

function currentTierConfig(id: string) {
  return TIERS.find(t => t.id === id) ?? TIERS[0];
}

// ── Confetti ──────────────────────────────────────────────────────────────────
const CONFETTI_COLORS = ["#F5C518", "#2DD4BF", "#A78BFA", "#60A5FA", "#34D399", "#F97316"];

function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 1.2}s`,
    duration: `${1.5 + Math.random() * 1.5}s`,
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map(p => (
        <div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: p.left,
            top: "-12px",
            width: p.size,
            height: p.size,
            background: p.color,
            animation: `confettiFall ${p.duration} ${p.delay} ease-in forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ── Benefits Comparison Table ─────────────────────────────────────────────────
function BenefitsComparison({ current, next }: { current: typeof TIERS[0]; next: typeof TIERS[0] }) {
  const allBenefits = Array.from(new Set([
    ...(current.benefits ?? []),
    ...(next.benefits ?? []),
  ]));

  const hasCurrent = (b: string) => (current.benefits ?? []).includes(b);
  const hasNext    = (b: string) => (next.benefits    ?? []).includes(b);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.10)" }}
    >
      <div className="grid grid-cols-3">
        <div className="p-3 text-xs font-bold text-gray-500 uppercase tracking-wider" style={{ background: "rgba(255,255,255,0.03)" }}>Benefit</div>
        <div
          className="p-3 text-xs font-bold text-center"
          style={{ background: `${current.color}10`, color: current.color }}
        >
          {current.label}
        </div>
        <div
          className="p-3 text-xs font-bold text-center"
          style={{ background: `${next.color}10`, color: next.color }}
        >
          {next.label}
        </div>
      </div>
      {allBenefits.map((b, i) => (
        <div
          key={b}
          className="grid grid-cols-3"
          style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent", borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="p-3 text-xs text-gray-400">{b}</div>
          <div className="p-3 flex items-center justify-center">
            {hasCurrent(b)
              ? <CheckCircle size={14} style={{ color: current.color }} />
              : <span className="text-gray-700 text-xs">—</span>
            }
          </div>
          <div className="p-3 flex items-center justify-center">
            {hasNext(b)
              ? <CheckCircle size={14} style={{ color: next.color }} />
              : <span className="text-gray-700 text-xs">—</span>
            }
          </div>
        </div>
      ))}
    </div>
  );
}

// ── FAQ Items ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What happens to my current commission rate when I upgrade?",
    a: "Your commission rate stays the same — all tiers keep 60% of direct job earnings. Upgrading unlocks a higher tier badge, more network override levels, and origination rights.",
  },
  {
    q: "Do I pay more when I upgrade?",
    a: "No. All founding members pay $149/mo — the same locked rate regardless of tier. Upgrading gives you more benefits at the same price.",
  },
  {
    q: "What are origination rights?",
    a: "When a homeowner you originally brought onto the platform closes a job — even years from now — you earn 1.5% of the platform fee permanently. Charter and Founding tiers unlock this.",
  },
  {
    q: "When does my new tier take effect?",
    a: "Immediately upon confirmation. Your badge updates instantly and new override structures apply to all future transactions.",
  },
  {
    q: "Can I downgrade later?",
    a: "There's no reason to. All tiers cost $149/mo. But if you cancel, you exit the founding cohort and cannot rejoin at the locked rate.",
  },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden cursor-pointer select-none"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-center justify-between gap-3 p-4">
        <p className="text-sm font-semibold text-white">{q}</p>
        <span className="shrink-0 text-gray-400 text-lg leading-none">{open ? "−" : "+"}</span>
      </div>
      {open && (
        <div className="px-4 pb-4 pt-0">
          <p className="text-sm text-gray-400 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ── Step Indicator ────────────────────────────────────────────────────────────
function StepDot({ n, active, done }: { n: number; active: boolean; done: boolean }) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
      style={{
        background: done ? "#2DD4BF" : active ? "rgba(45,212,191,0.20)" : "rgba(255,255,255,0.06)",
        border: active ? "2px solid #2DD4BF" : done ? "none" : "2px solid rgba(255,255,255,0.10)",
        color: done || active ? (done ? "#0A1628" : "#2DD4BF") : "#6b7280",
      }}
    >
      {done ? <CheckCircle size={14} /> : n}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function TierUpgradeFlow() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [confirmed, setConfirmed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const { data: partner } = trpc.partners.getMyProfile.useQuery();
  const currentTierId = (partner as any)?.partner?.tier ?? "waitlist";
  const current = currentTierConfig(currentTierId);
  const next = nextTier(currentTierId);

  const handleConfirm = useCallback(() => {
    setShowConfetti(true);
    setConfirmed(true);
    setTimeout(() => setShowConfetti(false), 4000);
    toast.success("Tier upgrade submitted!", { description: "Your new tier is being applied." });
  }, []);

  const STEP_LABELS = ["Current Tier", "Benefits", "Payment", "Confirm"];

  if (confirmed) {
    const tier = next ?? current;
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#0A1628" }}
      >
        {showConfetti && <Confetti />}
        <div className="text-center max-w-lg">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: `${tier.color}20`, border: `2px solid ${tier.color}` }}
          >
            <tier.icon size={36} style={{ color: tier.color }} />
          </div>
          <h1 className="text-4xl font-black text-white mb-3">You're Upgraded!</h1>
          <p className="text-lg text-gray-300 mb-1">
            Welcome to{" "}
            <span className="font-bold" style={{ color: tier.color }}>{tier.label}</span>
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Your new tier badge and override structure are active immediately.
          </p>

          <div
            className="rounded-2xl p-5 mb-8"
            style={{ background: `${tier.color}10`, border: `1px solid ${tier.color}30` }}
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { icon: DollarSign, label: "Job Override", value: `${tier.jobRate}% L1` },
                { icon: Users,      label: "Sub Override", value: `${tier.subRate}% L1` },
                { icon: Lock,       label: "Locked Rate",  value: "$149/mo" },
              ].map(item => (
                <div key={item.label}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{ background: `${tier.color}20` }}
                  >
                    <item.icon size={18} style={{ color: tier.color }} />
                  </div>
                  <p className="text-sm font-bold text-white">{item.value}</p>
                  <p className="text-[10px] text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => navigate("/dashboard/partner-home")}
              className="px-8 py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: "#2DD4BF", color: "#0A1628" }}
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => { setConfirmed(false); setStep(1); }}
              className="px-8 py-3 rounded-xl text-sm font-bold border transition-opacity hover:opacity-90"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: "white" }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!next) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A1628" }}>
        <div className="text-center">
          <Crown size={40} style={{ color: "#F5C518" }} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">You're at the top</h2>
          <p className="text-gray-400 text-sm mb-6">You're already a Charter Member — the highest tier in ProLnk.</p>
          <Link href="/dashboard/partner-home">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold" style={{ background: "#2DD4BF", color: "#0A1628" }}>
              Dashboard <ChevronRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0A1628" }}>
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Sparkles size={22} style={{ color: "#2DD4BF" }} />
              Tier Upgrade
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Unlock {next.label} — same $149/mo locked rate, more benefits
            </p>
          </div>
          <button
            onClick={() => step > 1 ? setStep((step - 1) as 1 | 2 | 3 | 4) : navigate("/dashboard/partner-home")}
            className="flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-80"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <ArrowLeft size={14} />
            {step > 1 ? "Back" : "Dashboard"}
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-10">
          {STEP_LABELS.map((label, i) => {
            const n = i + 1;
            const isActive = step === n;
            const isDone = step > n;
            return (
              <div key={label} className="flex items-center gap-0 flex-1">
                <div className="flex flex-col items-center gap-1.5">
                  <StepDot n={n} active={isActive} done={isDone} />
                  <span className="text-[10px] font-semibold" style={{ color: isActive ? "#2DD4BF" : isDone ? "#2DD4BF" : "#4B5563" }}>
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div
                    className="flex-1 h-px mx-1 mb-5"
                    style={{ background: isDone ? "rgba(45,212,191,0.5)" : "rgba(255,255,255,0.08)" }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ── STEP 1: Current tier summary + qualify ── */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="text-center mb-2">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
                style={{ background: `${next.color}18`, color: next.color, border: `1px solid ${next.color}40` }}
              >
                <CheckCircle size={12} />
                You qualify for {next.label}
              </div>
              <h2 className="text-2xl font-bold text-white">You're Ready to Upgrade</h2>
              <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
                Upgrading from <span style={{ color: current.color }}>{current.label}</span> to{" "}
                <span style={{ color: next.color }}>{next.label}</span> unlocks additional benefits
                at the same $149/mo locked rate.
              </p>
            </div>

            {/* Current tier card */}
            <div
              className="rounded-2xl p-6"
              style={{ background: current.bg, border: `2px solid ${current.border}` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${current.color}20` }}>
                  <current.icon size={20} style={{ color: current.color }} />
                </div>
                <div>
                  <p className="font-bold text-white">{current.label}</p>
                  <p className="text-xs text-gray-400">Your current tier</p>
                </div>
              </div>
              <p className="text-sm text-gray-300">{current.description}</p>
              {current.benefits && (
                <ul className="mt-3 space-y-1.5">
                  {current.benefits.slice(0, 4).map(b => (
                    <li key={b} className="flex items-start gap-2 text-xs text-gray-400">
                      <CheckCircle size={12} style={{ color: current.color, marginTop: 1, flexShrink: 0 }} />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.15)" }} />
                <ArrowRight size={18} className="rotate-90" style={{ color: "#2DD4BF" }} />
                <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.15)" }} />
              </div>
            </div>

            {/* Next tier card */}
            <div
              className="rounded-2xl p-6"
              style={{ background: next.bg, border: `2px solid ${next.border}` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${next.color}20` }}>
                  <next.icon size={20} style={{ color: next.color }} />
                </div>
                <div>
                  <p className="font-bold text-white">{next.label}</p>
                  <p className="text-xs" style={{ color: next.color }}>{next.slots} total spots</p>
                </div>
                <span
                  className="ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `${next.color}20`, color: next.color }}
                >
                  NEXT TIER
                </span>
              </div>
              <p className="text-sm text-gray-300">{next.description}</p>
              {next.benefits && (
                <ul className="mt-3 space-y-1.5">
                  {next.benefits.slice(0, 4).map(b => (
                    <li key={b} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle size={12} style={{ color: next.color, marginTop: 1, flexShrink: 0 }} />
                      {b}
                    </li>
                  ))}
                  {next.benefits.length > 4 && (
                    <li className="text-xs text-gray-500 pl-5">+{next.benefits.length - 4} more benefits</li>
                  )}
                </ul>
              )}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: "#2DD4BF", color: "#0A1628" }}
            >
              See Full Benefits Comparison <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* ── STEP 2: Benefits comparison ── */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="text-center mb-2">
              <h2 className="text-2xl font-bold text-white mb-2">What Changes When You Upgrade</h2>
              <p className="text-gray-400 text-sm">Side-by-side comparison of your current and next tier</p>
            </div>

            <BenefitsComparison current={current} next={next} />

            {/* Income projection */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.20)" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#2DD4BF" }}>
                Income Impact (10 active L1 recruits)
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: current.label, tier: current },
                  { label: next.label,    tier: next },
                ].map(({ label, tier }) => {
                  const jobOverride = 10 * 8 * (800 * 0.12) * (tier.jobRate / 100);
                  const subOverride = 10 * 149 * (tier.subRate / 100);
                  const total = Math.round(jobOverride + subOverride);
                  return (
                    <div
                      key={label}
                      className="rounded-xl p-4 text-center"
                      style={{ background: `${tier.color}0A`, border: `1px solid ${tier.color}25` }}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: tier.color }}>{label}</p>
                      <p className="text-2xl font-bold text-white">${total.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">/mo est. override</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">Common Questions</h3>
              {FAQS.map(faq => <FAQ key={faq.q} q={faq.q} a={faq.a} />)}
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: "#2DD4BF", color: "#0A1628" }}
            >
              Continue to Payment <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* ── STEP 3: Payment ── */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="text-center mb-2">
              <h2 className="text-2xl font-bold text-white mb-2">Payment</h2>
              <p className="text-gray-400 text-sm">Your rate is locked — no increase, ever.</p>
            </div>

            {/* Price box */}
            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: "rgba(45,212,191,0.08)", border: "2px solid rgba(45,212,191,0.30)" }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <Lock size={16} style={{ color: "#2DD4BF" }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#2DD4BF" }}>
                  Founding Rate — Locked Forever
                </span>
              </div>
              <p className="text-6xl font-black text-white mt-2">$149</p>
              <p className="text-gray-400 text-sm mt-1">/mo — same rate you're already on</p>
              <p className="text-xs text-gray-500 mt-2">Upgrade costs nothing extra. Same subscription, more benefits.</p>
            </div>

            {/* What's included */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Included in {next.label}</p>
              <ul className="space-y-2">
                {(next.benefits ?? []).map(b => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <CheckCircle size={14} style={{ color: next.color, marginTop: 2, flexShrink: 0 }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantee */}
            <div
              className="rounded-xl p-4 flex items-start gap-3"
              style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.20)" }}
            >
              <Shield size={16} style={{ color: "#34D399", flexShrink: 0, marginTop: 1 }} />
              <p className="text-xs text-gray-300">
                <span className="font-bold text-white">No risk. </span>
                This is an upgrade within your existing $149/mo membership.
                No new charges, no new contracts. Cancel your membership anytime.
              </p>
            </div>

            <button
              onClick={() => setStep(4)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: "#2DD4BF", color: "#0A1628" }}
            >
              Review & Confirm <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* ── STEP 4: Confirmation ── */}
        {step === 4 && (
          <div className="space-y-5">
            <div className="text-center mb-2">
              <h2 className="text-2xl font-bold text-white mb-2">Confirm Your Upgrade</h2>
              <p className="text-gray-400 text-sm">Review your new tier and confirm to activate</p>
            </div>

            {/* Summary card */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: `2px solid ${next.color}50` }}
            >
              <div className="p-5" style={{ background: `${next.color}10` }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${next.color}20` }}>
                    <next.icon size={24} style={{ color: next.color }} />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{next.label}</p>
                    <p className="text-xs" style={{ color: next.color }}>Activates immediately</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-2xl font-black text-white">$149</p>
                    <p className="text-[10px] text-gray-400">/mo locked</p>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-2" style={{ background: "rgba(255,255,255,0.02)" }}>
                {(next.benefits ?? []).slice(0, 5).map(b => (
                  <div key={b} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle size={13} style={{ color: next.color, marginTop: 2, flexShrink: 0 }} />
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Change summary */}
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Summary of Changes</p>
              <div className="flex items-center gap-3 text-sm">
                <span style={{ color: current.color }}>{current.label}</span>
                <ArrowRight size={14} className="text-gray-500" />
                <span style={{ color: next.color }}>{next.label}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                No price change · Same $149/mo · New tier badge active immediately
              </p>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: next.color, color: "#0A1628" }}
            >
              <Sparkles size={16} />
              Confirm Upgrade to {next.label}
            </button>
            <p className="text-[10px] text-gray-600 text-center">
              By confirming, you agree your tier badge updates immediately. No additional payment required.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
