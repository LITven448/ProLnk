import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import {
  User,
  Wrench,
  MapPin,
  Link2,
  CreditCard,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Star,
  Zap,
  Shield,
  Building2,
  Phone,
  Mail,
  Camera,
  Tag,
  Search,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

const STORAGE_KEY = "prolnk_onboarding_v1″;

const STEPS = [
  { id: 1, label: "Profile", icon: User, color: "#2dd4bf", bg: "rgba(45,212,191,0.12)" },
  { id: 2, label: "Trade", icon: Wrench, color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  { id: 3, label: "Service Area", icon: MapPin, color: "#38bdf8″, bg: "rgba(56,189,248,0.12)" },
  { id: 4, label: "FSM Setup", icon: Link2, color: "#fb923c", bg: "rgba(251,146,60,0.12)" },
  { id: 5, label: "Payment", icon: CreditCard, color: "#4ade80″, bg: "rgba(74,222,128,0.12)" },
];

const TRADE_OPTIONS = [
  { emoji: "🔧", name: "Plumbing", desc: "Pipes, fixtures, water heaters" },
  { emoji: "⚡", name: "Electrical", desc: "Wiring, panels, outlets" },
  { emoji: "❄️", name: "HVAC", desc: "Heating, cooling, ventilation" },
  { emoji: "🏠", name: "Roofing", desc: "Repairs, replacement, gutters" },
  { emoji: "🪟", name: "Windows & Doors", desc: "Install, repair, weatherize" },
  { emoji: "🖌️", name: "Painting", desc: "Interior & exterior" },
  { emoji: "🌿", name: "Landscaping", desc: "Lawn, garden, irrigation" },
  { emoji: "🏗️", name: "General Contracting", desc: "Remodeling, additions" },
  { emoji: "🚪", name: "Handyman", desc: "General repairs & maintenance" },
  { emoji: "🛁", name: "Bathrooms", desc: "Remodel, tile, fixtures" },
  { emoji: "🍳", name: "Kitchen Remodel", desc: "Cabinets, countertops, tile" },
  { emoji: "🪵", name: "Flooring", desc: "Hardwood, tile, carpet" },
  { emoji: "🔐", name: "Security Systems", desc: "Cameras, alarms, access" },
  { emoji: "☀️", name: "Solar", desc: "Panels, storage, EV charging" },
  { emoji: "🧹", name: "Cleaning", desc: "Residential & commercial" },
];

const FSM_PLATFORMS = [
  { id: "servicetitan", name: "ServiceTitan", logo: "ST" },
  { id: "jobber", name: "Jobber", logo: "JB" },
  { id: "housecallpro", name: "Housecall Pro", logo: "HC" },
  { id: "fieldedge", name: "FieldEdge", logo: "FE" },
  { id: "kickserv", name: "Kickserv", logo: "KS" },
  { id: "workiz", name: "Workiz", logo: "WZ" },
  { id: "other", name: "Other / Manual", logo: "—" },
  { id: "none", name: "I don't use one yet", logo: "✕" },
];

interface OnboardingData {
  displayName: string;
  businessName: string;
  phone: string;
  email: string;
  bio: string;
  trade: string;
  yearsExp: string;
  serviceCity: string;
  serviceZip: string;
  radiusMiles: number;
  fsmPlatform: string;
  fsmApiKey: string;
  paymentMethod: string;
  bankLast4: string;
}

const EMPTY: OnboardingData = {
  displayName: "",
  businessName: "",
  phone: "",
  email: "",
  bio: "",
  trade: "",
  yearsExp: "",
  serviceCity: "",
  serviceZip: "",
  radiusMiles: 20,
  fsmPlatform: "",
  fsmApiKey: "",
  paymentMethod: "",
  bankLast4: "",
};

function loadSaved(): Partial<OnboardingData> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveDraft(data: OnboardingData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

function clearDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

function ConfettiPiece({ delay, x }: { delay: number; x: number }) {
  const colors = ["#2dd4bf", "#a78bfa", "#fb923c", "#38bdf8″, "#4ade80", "#f472b6", "#fbbf24"];
  const color = colors[Math.floor(x * colors.length) % colors.length];
  const size = 6 + Math.floor(x * 6);
  const rotation = Math.floor(x * 360);
  return (
    <div
      className="absolute top-0 pointer-events-none"
      style={{
        left: `${x * 100}%`,
        animation: `confetti-fall ${1.5 + delay}s ease-in forwards`,
        animationDelay: `${delay * 0.3}s`,
        opacity: 0,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          background: color,
          borderRadius: x > 0.5 ? "50%" : "2px",
          transform: `rotate(${rotation}deg)`,
        }}
      />
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    delay: i * 0.05,
    x: (i * 0.618033988749895) % 1,
  }));

  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(300px) rotate(720deg); opacity: 0; }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50″>
        {pieces.map((p) => (
          <ConfettiPiece key={p.id} delay={p.delay} x={p.x} />
        ))}
      </div>
    </>
  );
}

function StepCard({ children, title, subtitle, icon: Icon, color, bg }: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  color: string;
  bg: string;
}) {
  return (
    <div
      className="rounded-2xl p-6″
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-start gap-4 mb-6″>
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0″ style={{ background: bg }}>
          <Icon size={20} style={{ color }} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <p className="text-sm" style={{ color: "#6b7280″ }}>{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5″ style={{ color: "#9ca3af" }}>
        {label} {required && <span style={{ color: "#2dd4bf" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({
  value, onChange, placeholder, type = "text",
}: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(45,212,191,0.4)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
    />
  );
}

function SkipButton({ onSkip, label = "Skip for now" }: { onSkip: () => void; label?: string }) {
  return (
    <button
      onClick={onSkip}
      className="text-xs underline underline-offset-2 transition-opacity hover:opacity-80″
      style={{ color: "#4b5563″ }}
    >
      {label}
    </button>
  );
}

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tradeSearch, setTradeSearch] = useState("");
  const [form, setForm] = useState<OnboardingData>({ ...EMPTY, ...loadSaved() });
  const completedSteps = useRef(new Set<number>());

  const update = (key: keyof OnboardingData, value: string | number) => {
    const next = { ...form, [key]: value };
    setForm(next);
    saveDraft(next);
  };

  const markComplete = (s: number) => {
    completedSteps.current.add(s);
  };

  const goNext = () => {
    markComplete(step);
    if (step < 5) setStep((s) => s + 1);
    else handleFinish();
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const handleFinish = () => {
    clearDraft();
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setLocation("/dashboard");
    }, 2500);
  };

  const canProceed = () => {
    if (step === 1) return form.displayName.length >= 2 && form.email.includes("@");
    if (step === 2) return form.trade.length > 0;
    if (step === 3) return form.serviceCity.length >= 2;
    return true;
  };

  const filteredTrades = tradeSearch.trim()
    ? TRADE_OPTIONS.filter(
        (t) =>
          t.name.toLowerCase().includes(tradeSearch.toLowerCase()) ||
          t.desc.toLowerCase().includes(tradeSearch.toLowerCase())
      )
    : TRADE_OPTIONS;

  const progressPct = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A1628″ }}>
      {showConfetti && <Confetti />}

      {/* Header */}
      <header
        className="px-6 py-4 flex items-center justify-between sticky top-0 z-30″
        style={{ background: "rgba(10,22,40,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}
      >
        <span className="text-lg font-black tracking-tight" style={{ color: "#2dd4bf" }}>ProLnk</span>
        <span className="text-xs" style={{ color: "#4b5563″ }}>
          {completedSteps.current.size > 0 && `${completedSteps.current.size} of ${STEPS.length} steps saved`}
        </span>
      </header>

      {/* Progress bar */}
      <div className="px-6 pt-4 pb-2″>
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-3″>
            {STEPS.map((s) => {
              const done = completedSteps.current.has(s.id) || step > s.id;
              const active = step === s.id;
              const Icon = s.icon;
              return (
                <div key={s.id} className="flex flex-col items-center gap-1″>
                  <div
                    className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-300″
                    style={{
                      background: done ? s.bg : active ? s.bg : "rgba(255,255,255,0.04)",
                      border: `2px solid ${active ? s.color : done ? s.color + "60" : "transparent"}`,
                      boxShadow: active ? `0 0 12px ${s.color}40` : "none",
                    }}
                  >
                    {done ? (
                      <CheckCircle size={15} style={{ color: s.color }} />
                    ) : (
                      <Icon size={15} style={{ color: active ? s.color : "#374151″ }} />
                    )}
                  </div>
                  <span
                    className="text-xs font-medium hidden sm:block"
                    style={{ color: active ? s.color : done ? "#6b7280″ : "#374151" }}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="relative h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="absolute h-full rounded-full transition-all duration-500″
              style={{ width: `${progressPct}%`, background: `linear-gradient(90deg, #2dd4bf, #a78bfa)` }}
            />
          </div>
          <p className="text-xs mt-2 text-right" style={{ color: "#4b5563″ }}>
            Step {step} of {STEPS.length}
          </p>
        </div>
      </div>

      {/* Welcome banner (step 1 only) */}
      {step === 1 && (
        <div className="px-6 mb-2″>
          <div
            className="max-w-lg mx-auto rounded-2xl p-4 flex items-start gap-3″
            style={{ background: "rgba(45,212,191,0.08)", border: "1px solid rgba(45,212,191,0.2)" }}
          >
            <Sparkles size={18} style={{ color: "#2dd4bf", flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="text-sm font-bold text-white">Welcome to ProLnk!</p>
              <p className="text-xs mt-0.5″ style={{ color: "#9ca3af" }}>
                Let's set up your account in 5 quick steps. Your progress saves automatically.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex items-start justify-center px-4 py-4 pb-24″>
        <div className="w-full max-w-lg space-y-4″>

          {/* Step 1 — Profile */}
          {step === 1 && (
            <StepCard
              title="Set up your profile"
              subtitle="This is what homeowners and partners see"
              icon={User}
              color="#2dd4bf"
              bg="rgba(45,212,191,0.12)"
            >
              <div className="space-y-4″>
                {/* Avatar placeholder */}
                <div className="flex items-center gap-4″>
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ background: "rgba(45,212,191,0.1)", border: "2px dashed rgba(45,212,191,0.3)" }}
                  >
                    <Camera size={22} style={{ color: "#2dd4bf" }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Profile photo</p>
                    <p className="text-xs mt-0.5″ style={{ color: "#6b7280" }}>Optional — you can add one later</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3″>
                  <Field label="Display Name" required>
                    <TextInput
                      value={form.displayName}
                      onChange={(v) => update("displayName", v)}
                      placeholder="Jane Smith"
                    />
                  </Field>
                  <Field label="Business Name">
                    <TextInput
                      value={form.businessName}
                      onChange={(v) => update("businessName", v)}
                      placeholder="Smith Plumbing"
                    />
                  </Field>
                </div>

                <Field label="Email" required>
                  <TextInput
                    value={form.email}
                    onChange={(v) => update("email", v)}
                    placeholder="you@yourbusiness.com"
                    type="email"
                  />
                </Field>

                <Field label="Phone">
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2″ style={{ color: "#4b5563" }} />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="(214) 555-0100″
                      className="w-full pl-9 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    />
                  </div>
                </Field>

                <Field label="One-line bio">
                  <textarea
                    value={form.bio}
                    onChange={(e) => update("bio", e.target.value)}
                    placeholder="e.g. Licensed master plumber with 12 years in DFW. Fast, reliable, fair."
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none resize-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </Field>
              </div>
            </StepCard>
          )}

          {/* Step 2 — Trade */}
          {step === 2 && (
            <StepCard
              title="What's your trade?"
              subtitle="Pick your primary service — you'll get leads matched to this"
              icon={Wrench}
              color="#a78bfa"
              bg="rgba(167,139,250,0.12)"
            >
              <div className="space-y-4″>
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <Search size={14} style={{ color: "#6b7280″ }} />
                  <input
                    value={tradeSearch}
                    onChange={(e) => setTradeSearch(e.target.value)}
                    placeholder="Search trades..."
                    className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1″>
                  {filteredTrades.map((t) => {
                    const selected = form.trade === t.name;
                    return (
                      <button
                        key={t.name}
                        onClick={() => update("trade", t.name)}
                        className="flex items-center gap-2 p-3 rounded-xl text-left transition-all"
                        style={{
                          background: selected ? "rgba(167,139,250,0.15)" : "rgba(255,255,255,0.03)",
                          border: `1px solid ${selected ? "rgba(167,139,250,0.5)" : "rgba(255,255,255,0.07)"}`,
                          boxShadow: selected ? "0 0 10px rgba(167,139,250,0.15)" : "none",
                        }}
                      >
                        <span className="text-xl flex-shrink-0″>{t.emoji}</span>
                        <div className="min-w-0″>
                          <p className="text-xs font-bold truncate" style={{ color: selected ? "#a78bfa" : "#e5e7eb" }}>
                            {t.name}
                          </p>
                          <p className="text-xs truncate" style={{ color: "#4b5563″ }}>{t.desc}</p>
                        </div>
                        {selected && <CheckCircle size={13} style={{ color: "#a78bfa", marginLeft: "auto", flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </div>

                <Field label="Years in business">
                  <select
                    value={form.yearsExp}
                    onChange={(e) => update("yearsExp", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: form.yearsExp ? "#fff" : "#4b5563″,
                    }}
                  >
                    <option value="" disabled style={{ background: "#0A1628″ }}>Select years</option>
                    {["Under 1 year", "1–2 years", "3–5 years", "6–10 years", "11–20 years", "20+ years"].map((v) => (
                      <option key={v} value={v} style={{ background: "#0A1628″ }}>{v}</option>
                    ))}
                  </select>
                </Field>

                <div
                  className="p-3 rounded-xl flex items-center gap-3″
                  style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.15)" }}
                >
                  <Tag size={14} style={{ color: "#a78bfa", flexShrink: 0 }} />
                  <p className="text-xs" style={{ color: "#d1d5db" }}>
                    You can add secondary trades from your profile settings later.
                  </p>
                </div>
              </div>
            </StepCard>
          )}

          {/* Step 3 — Service Area */}
          {step === 3 && (
            <StepCard
              title="Where do you work?"
              subtitle="We'll only send you leads within your service area"
              icon={MapPin}
              color="#38bdf8″
              bg="rgba(56,189,248,0.12)"
            >
              <div className="space-y-4″>
                <div className="grid grid-cols-2 gap-3″>
                  <Field label="Primary City" required>
                    <TextInput
                      value={form.serviceCity}
                      onChange={(v) => update("serviceCity", v)}
                      placeholder="Dallas"
                    />
                  </Field>
                  <Field label="ZIP Code">
                    <TextInput
                      value={form.serviceZip}
                      onChange={(v) => update("serviceZip", v)}
                      placeholder="75201″
                    />
                  </Field>
                </div>

                <Field label={`Service Radius: ${form.radiusMiles} miles`}>
                  <div className="mt-2″>
                    <input
                      type="range"
                      min={5}
                      max={75}
                      step={5}
                      value={form.radiusMiles}
                      onChange={(e) => update("radiusMiles", Number(e.target.value))}
                      className="w-full"
                      style={{ accentColor: "#38bdf8″ }}
                    />
                    <div className="flex justify-between text-xs mt-1″ style={{ color: "#4b5563" }}>
                      <span>5 mi</span>
                      <span>40 mi</span>
                      <span>75 mi</span>
                    </div>
                  </div>
                </Field>

                {/* Radius tiers */}
                <div className="grid grid-cols-3 gap-2″>
                  {[
                    { mi: 15, label: "Local", color: "#4ade80″ },
                    { mi: 30, label: "Regional", color: "#38bdf8″ },
                    { mi: 50, label: "Wide Net", color: "#a78bfa" },
                  ].map(({ mi, label, color }) => (
                    <button
                      key={mi}
                      onClick={() => update("radiusMiles", mi)}
                      className="py-2 rounded-xl text-center transition-all"
                      style={{
                        background: form.radiusMiles === mi ? `${color}18` : "rgba(255,255,255,0.03)",
                        border: `1px solid ${form.radiusMiles === mi ? color + "50" : "rgba(255,255,255,0.07)"}`,
                        color: form.radiusMiles === mi ? color : "#6b7280″,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {mi}mi — {label}
                    </button>
                  ))}
                </div>

                <div
                  className="flex items-start gap-2 p-3 rounded-xl"
                  style={{ background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.15)" }}
                >
                  <Zap size={13} style={{ color: "#38bdf8″, flexShrink: 0, marginTop: 1 }} />
                  <p className="text-xs" style={{ color: "#9ca3af" }}>
                    Most DFW partners set 20 miles — enough volume to stay busy without wasting drive time.
                  </p>
                </div>
              </div>
            </StepCard>
          )}

          {/* Step 4 — FSM Connection */}
          {step === 4 && (
            <StepCard
              title="Connect your field management tool"
              subtitle="Sync your schedule and dispatch leads automatically"
              icon={Link2}
              color="#fb923c"
              bg="rgba(251,146,60,0.12)"
            >
              <div className="space-y-4″>
                <div className="grid grid-cols-2 gap-2″>
                  {FSM_PLATFORMS.map((p) => {
                    const selected = form.fsmPlatform === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => update("fsmPlatform", p.id)}
                        className="flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                        style={{
                          background: selected ? "rgba(251,146,60,0.12)" : "rgba(255,255,255,0.03)",
                          border: `1px solid ${selected ? "rgba(251,146,60,0.4)" : "rgba(255,255,255,0.07)"}`,
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0″
                          style={{
                            background: selected ? "rgba(251,146,60,0.2)" : "rgba(255,255,255,0.05)",
                            color: selected ? "#fb923c" : "#6b7280″,
                          }}
                        >
                          {p.logo}
                        </div>
                        <span
                          className="text-xs font-semibold truncate"
                          style={{ color: selected ? "#fb923c" : "#e5e7eb" }}
                        >
                          {p.name}
                        </span>
                        {selected && <CheckCircle size={12} style={{ color: "#fb923c", marginLeft: "auto", flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </div>

                {form.fsmPlatform && form.fsmPlatform !== "none" && form.fsmPlatform !== "other" && (
                  <Field label="API Key / Integration Token">
                    <TextInput
                      value={form.fsmApiKey}
                      onChange={(v) => update("fsmApiKey", v)}
                      placeholder="Paste your API key here"
                    />
                    <p className="text-xs mt-1″ style={{ color: "#4b5563" }}>
                      Found in your platform Settings → Integrations → API Keys
                    </p>
                  </Field>
                )}

                <div
                  className="p-3 rounded-xl flex items-start gap-2″
                  style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.15)" }}
                >
                  <Building2 size={13} style={{ color: "#fb923c", flexShrink: 0, marginTop: 1 }} />
                  <p className="text-xs" style={{ color: "#9ca3af" }}>
                    FSM connection lets ProLnk auto-dispatch leads when you're available. You can set this up
                    later from Settings → Integrations.
                  </p>
                </div>
              </div>
            </StepCard>
          )}

          {/* Step 5 — Payment Setup */}
          {step === 5 && (
            <StepCard
              title="Set up payouts"
              subtitle="How should we send your commission earnings?"
              icon={CreditCard}
              color="#4ade80″
              bg="rgba(74,222,128,0.12)"
            >
              <div className="space-y-4″>
                <div className="grid grid-cols-3 gap-2″>
                  {[
                    { id: "ach", label: "Bank Transfer", sub: "ACH, 2-3 days", emoji: "🏦" },
                    { id: "instant", label: "Instant Pay", sub: "Debit card, 30 min", emoji: "⚡" },
                    { id: "check", label: "Paper Check", sub: "Mail, 7-10 days", emoji: "📬" },
                  ].map((m) => {
                    const selected = form.paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => update("paymentMethod", m.id)}
                        className="flex flex-col items-center p-3 rounded-xl transition-all"
                        style={{
                          background: selected ? "rgba(74,222,128,0.12)" : "rgba(255,255,255,0.03)",
                          border: `1px solid ${selected ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.07)"}`,
                        }}
                      >
                        <span className="text-xl mb-1″>{m.emoji}</span>
                        <p className="text-xs font-bold text-center" style={{ color: selected ? "#4ade80″ : "#e5e7eb" }}>
                          {m.label}
                        </p>
                        <p className="text-xs text-center mt-0.5″ style={{ color: "#4b5563" }}>{m.sub}</p>
                      </button>
                    );
                  })}
                </div>

                {form.paymentMethod && (
                  <Field label="Account last 4 digits">
                    <TextInput
                      value={form.bankLast4}
                      onChange={(v) => update("bankLast4″, v.slice(0, 4))}
                      placeholder="1234″
                    />
                  </Field>
                )}

                {/* Earnings preview */}
                <div
                  className="p-4 rounded-xl"
                  style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)" }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-3″ style={{ color: "#4ade80", opacity: 0.7 }}>
                    Estimated monthly earnings
                  </p>
                  {[
                    { label: "10 matched jobs @ $350 avg", value: "$3,500 revenue" },
                    { label: "Charter tier commission (25%)", value: "+$875″ },
                    { label: "Referred 3 pros × $149/mo (12%)", value: "+$53/mo recurring" },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center py-1.5 border-b last:border-0″
                      style={{ borderColor: "rgba(255,255,255,0.05)" }}
                    >
                      <span className="text-xs" style={{ color: "#9ca3af" }}>{label}</span>
                      <span className="text-xs font-bold" style={{ color: "#4ade80″ }}>{value}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5 mt-3″>
                    <Star size={11} style={{ color: "#fbbf24″ }} />
                    <p className="text-xs font-bold text-white">$928/mo at Charter tier</p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-2 p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <Shield size={13} style={{ color: "#6b7280″, flexShrink: 0, marginTop: 1 }} />
                  <p className="text-xs" style={{ color: "#6b7280″ }}>
                    Full payment setup happens at account activation. No bank details stored here.
                    Payouts process monthly on the 1st.
                  </p>
                </div>
              </div>
            </StepCard>
          )}

          {/* Nav */}
          <div className="flex items-center justify-between pt-2″>
            <button
              onClick={goBack}
              disabled={step === 1}
              className="flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "rgba(255,255,255,0.05)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <ChevronLeft size={15} /> Back
            </button>

            <div className="flex items-center gap-3″>
              {/* Skip is available for steps 4 and 5 */}
              {(step === 4 || step === 5) && (
                <SkipButton onSkip={goNext} />
              )}
              <button
                onClick={goNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: canProceed() ? "linear-gradient(135deg, #2dd4bf, #38bdf8)" : "rgba(255,255,255,0.06)",
                  color: canProceed() ? "#0A1628″ : "#4b5563",
                }}
              >
                {step === 5 ? (
                  <>
                    <Sparkles size={15} /> Complete Setup
                  </>
                ) : (
                  <>
                    Continue <ChevronRight size={15} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Completion overlay */}
      {showConfetti && (
        <div
          className="fixed inset-0 flex items-center justify-center z-40″
          style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(4px)" }}
        >
          <div className="text-center">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4″
              style={{ background: "rgba(45,212,191,0.15)", border: "2px solid rgba(45,212,191,0.3)" }}
            >
              <Sparkles size={36} style={{ color: "#2dd4bf" }} />
            </div>
            <p className="text-2xl font-black text-white mb-1″>You're all set!</p>
            <p className="text-sm" style={{ color: "#6b7280″ }}>Taking you to your dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
}
