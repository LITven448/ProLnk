import React from 'react';
import { useState, useRef, useMemo } from "react";
import { Link } from "wouter";
import {
  Briefcase, CheckCircle, ArrowRight, Building2,
  MapPin, DollarSign, Clock, Zap, Users, Eye,
  Upload, X, Image, ChevronDown, ArrowLeft,
  Home, Wrench, Plug, Wind, Droplets, Paintbrush,
  Hammer, Leaf, Shield, Package, Star, TrendingUp,
  AlertCircle, Check, Camera,
} from "lucide-react";
import { trpc } from "../lib/trpc";
import { SERVICE_CATEGORIES, TIER_LABELS } from "../data/serviceCategories";

// --- Constants ----------------------------------------------------------------
const URGENCY_OPTIONS = [
  { value: "flexible", label: "Flexible", description: "No rush, planning ahead", color: "#818cf8″ },
  { value: "within_2_weeks", label: "Within 2 Weeks", description: "Need it soon", color: "#F59E0B" },
  { value: "asap", label: "ASAP", description: "Within a few days", color: "#fb923c" },
  { value: "emergency", label: "Emergency", description: "Urgent / immediate", color: "#f87171″ },
];

const BUDGET_PRESETS = [
  { label: "Small", range: "$1K–$5K", min: 1000, max: 5000 },
  { label: "Mid", range: "$5K–$25K", min: 5000, max: 25000 },
  { label: "Large", range: "$25K–$100K", min: 25000, max: 100000 },
  { label: "Commercial", range: "$100K+", min: 100000, max: 500000 },
];

const POPULAR_CATEGORIES = [
  { id: "hvac", name: "HVAC", icon: Wind, color: "#38bdf8″ },
  { id: "plumbing", name: "Plumbing", icon: Droplets, color: "#60a5fa" },
  { id: "electrical", name: "Electrical", icon: Plug, color: "#fbbf24″ },
  { id: "roofing", name: "Roofing", icon: Home, color: "#a78bfa" },
  { id: "painting", name: "Painting", icon: Paintbrush, color: "#f472b6″ },
  { id: "flooring", name: "Flooring", icon: Package, color: "#34d399″ },
  { id: "landscaping", name: "Landscaping", icon: Leaf, color: "#4ade80″ },
  { id: "general", name: "General", icon: Wrench, color: "#94a3b8″ },
];

const GROUPED_CATEGORIES = ([1, 2, 3, 4, 5] as const).map((tier) => ({
  tier,
  label: TIER_LABELS[tier],
  items: SERVICE_CATEGORIES.filter((c) => c.tier === tier),
}));

const STEPS = [
  { id: 1, label: "Category", shortLabel: "Category" },
  { id: 2, label: "Job Details", shortLabel: "Details" },
  { id: 3, label: "Budget & Timeline", shortLabel: "Budget" },
  { id: 4, label: "Photos", shortLabel: "Photos" },
];

// --- Helpers ------------------------------------------------------------------
function formatBudget(val: number): string {
  if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
  return `$${val.toLocaleString()}`;
}

function getInstantEstimate(categoryId: string, description: string): { low: number; high: number; label: string } | null {
  const desc = description.toLowerCase();
  const estimates: Record<string, { low: number; high: number; label: string }> = {
    hvac: { low: 3500, high: 12000, label: "HVAC replacement" },
    plumbing: { low: 800, high: 8000, label: "Plumbing work" },
    electrical: { low: 1500, high: 15000, label: "Electrical work" },
    roofing: { low: 8000, high: 35000, label: "Roof replacement" },
    painting: { low: 2000, high: 12000, label: "Interior/exterior paint" },
    flooring: { low: 3000, high: 20000, label: "Flooring install" },
    landscaping: { low: 1500, high: 25000, label: "Landscaping" },
    general: { low: 2000, high: 30000, label: "General contracting" },
  };

  const match = estimates[categoryId];
  if (!match) return null;

  let multiplier = 1;
  if (desc.includes("commercial") || desc.includes("office") || desc.includes("warehouse")) multiplier = 3;
  else if (desc.includes("large") || desc.includes("full") || desc.includes("replace")) multiplier = 1.8;
  else if (desc.includes("repair") || desc.includes("small") || desc.includes("fix")) multiplier = 0.6;

  return {
    low: Math.round(match.low * multiplier / 500) * 500,
    high: Math.round(match.high * multiplier / 500) * 500,
    label: match.label,
  };
}

// --- Styles -------------------------------------------------------------------
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "12px",
  fontSize: "14px",
  color: "#fff",
  backgroundColor: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.15)",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "rgba(255,255,255,0.5)",
  marginBottom: "6px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

// --- Progress Bar -------------------------------------------------------------
function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-0″>
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center flex-1″>
          <div className="flex flex-col items-center flex-1″>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                step > s.id
                  ? "bg-teal-400 border-teal-400 text-[#0A1628]"
                  : step === s.id
                  ? "bg-teal-500/20 border-teal-400 text-teal-300″
                  : "bg-white/5 border-white/15 text-white/30″
              }`}
            >
              {step > s.id ? <Check className="w-4 h-4″ /> : s.id}
            </div>
            <span
              className={`text-xs mt-1 font-medium hidden sm:block ${
                step >= s.id ? "text-teal-400″ : "text-white/25"
              }`}
            >
              {s.shortLabel}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className="flex-1 h-0.5 mx-1 rounded-full transition-all"
              style={{ backgroundColor: step > s.id ? "#2dd4bf" : "rgba(255,255,255,0.1)" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// --- Budget Slider ------------------------------------------------------------
function BudgetSlider({
  min, max, value, onChange, label,
}: {
  min: number; max: number; value: number;
  onChange: (v: number) => void; label: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-2″>
        <label style={labelStyle}>{label}</label>
        <span className="text-sm font-bold text-teal-400″>{formatBudget(value)}</span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
        <div className="absolute left-0 h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: "#2dd4bf" }} />
        <input
          type="range"
          min={min}
          max={max}
          step={min < 5000 ? 500 : 5000}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-x-0 w-full opacity-0 cursor-pointer h-5″
          style={{ zIndex: 2 }}
        />
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-teal-400 bg-[#0A1628]"
          style={{ left: `calc(${pct}% - 8px)`, zIndex: 1 }}
        />
      </div>
    </div>
  );
}

// --- Photo Upload -------------------------------------------------------------
function PhotoUploadArea({ photos, onAdd, onRemove }: {
  photos: File[];
  onAdd: (files: File[]) => void;
  onRemove: (idx: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, 5 - photos.length);
    if (valid.length) onAdd(valid);
  };

  return (
    <div className="space-y-4″>
      {/* Tip banner */}
      <div className="flex items-start gap-3 rounded-xl px-4 py-3 border" style={{ backgroundColor: "rgba(45,212,191,0.07)", borderColor: "rgba(45,212,191,0.2)" }}>
        <Camera className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5″ />
        <div>
          <p className="text-sm font-semibold text-teal-300″>Photos get 3× more bids</p>
          <p className="text-xs text-white/40 mt-0.5″>Show the job site, any existing damage, or the scope area. Up to 5 photos.</p>
        </div>
      </div>

      {photos.length > 0 && (
        <div className="flex flex-wrap gap-3″>
          {photos.map((file, idx) => (
            <div key={idx} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`Photo ${idx + 1}`}
                className="w-20 h-20 object-cover rounded-xl border"
                style={{ borderColor: "rgba(45,212,191,0.3)" }}
              />
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: "#ef4444″, color: "#fff" }}
              >
                <X className="w-3 h-3″ />
              </button>
              <div className="absolute bottom-1 right-1 bg-black/60 rounded text-xs px-1 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
                {idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {photos.length < 5 && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-3 py-10 rounded-2xl border-2 border-dashed cursor-pointer transition-all"
          style={{
            borderColor: dragging ? "#2dd4bf" : "rgba(255,255,255,0.12)",
            backgroundColor: dragging ? "rgba(45,212,191,0.05)" : "rgba(255,255,255,0.02)",
          }}
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            <Upload className="w-5 h-5″ style={{ color: dragging ? "#2dd4bf" : "rgba(255,255,255,0.3)" }} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold" style={{ color: dragging ? "#2dd4bf" : "rgba(255,255,255,0.5)" }}>
              {dragging ? "Drop photos here" : "Click or drag photos here"}
            </p>
            <p className="text-xs mt-1″ style={{ color: "rgba(255,255,255,0.25)" }}>
              {photos.length}/5 photos · JPG, PNG, WEBP
            </p>
          </div>
        </div>
      )}

      {photos.length === 5 && (
        <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
          Maximum 5 photos reached
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

// --- Live Preview Card --------------------------------------------------------
function JobPreviewCard({ form, categoryName, photos }: {
  form: {
    title: string; description: string; urgency: string;
    budgetMin: number; budgetMax: number; city: string; state: string;
    bidDeadline: string;
  };
  categoryName: string;
  photos: File[];
}) {
  const urgencyOption = URGENCY_OPTIONS.find((u) => u.value === form.urgency);
  const budgetLabel =
    form.budgetMin > 0 && form.budgetMax > 0
      ? `${formatBudget(form.budgetMin)} – ${formatBudget(form.budgetMax)}`
      : "Budget TBD";
  const locationLabel = [form.city, form.state].filter(Boolean).join(", ") || "Your Location";
  const isEmpty = !form.title && !categoryName;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3″>
        <Eye className="w-4 h-4 text-teal-400″ />
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-400″>Live Preview</span>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>— how it will appear</span>
      </div>

      <div
        className="rounded-2xl p-5 border transition-all"
        style={{
          backgroundColor: "rgba(255,255,255,0.04)",
          borderColor: isEmpty ? "rgba(255,255,255,0.08)" : "rgba(45,212,191,0.2)",
          opacity: isEmpty ? 0.5 : 1,
        }}
      >
        {isEmpty ? (
          <div className="text-center py-8″>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3″ style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
              <Briefcase className="w-5 h-5″ style={{ color: "rgba(255,255,255,0.25)" }} />
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
              Fill in the form to see your listing preview
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2 mb-2″>
              {urgencyOption && (
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${urgencyOption.color}20`, color: urgencyOption.color }}
                >
                  {form.urgency === "emergency" && <Zap className="w-3 h-3″ />}
                  {urgencyOption.label}
                </span>
              )}
              {categoryName && (
                <span className="text-xs px-2 py-0.5 rounded-full border" style={{ borderColor: "rgba(45,212,191,0.3)", color: "#2dd4bf", backgroundColor: "rgba(45,212,191,0.08)" }}>
                  {categoryName}
                </span>
              )}
            </div>

            <h3 className="text-white font-bold text-sm leading-tight mb-3″>
              {form.title || <span style={{ color: "rgba(255,255,255,0.3)" }}>Your job title here</span>}
            </h3>

            {form.description && (
              <p className="text-xs leading-relaxed mb-3″ style={{ color: "rgba(255,255,255,0.5)" }}>
                {form.description.length > 140 ? form.description.slice(0, 140) + "…" : form.description}
              </p>
            )}

            {photos.length > 0 && (
              <div className="flex items-center gap-1.5 mb-3 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                <Image className="w-3.5 h-3.5″ />
                {photos.length} photo{photos.length !== 1 ? "s" : ""} attached
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5″ style={{ color: "rgba(255,255,255,0.45)" }}>
                <MapPin className="w-3 h-3 flex-shrink-0″ style={{ color: "rgba(255,255,255,0.3)" }} />
                {locationLabel}
              </div>
              <div className="flex items-center gap-1.5″>
                <DollarSign className="w-3 h-3 flex-shrink-0″ style={{ color: "rgba(255,255,255,0.3)" }} />
                <span className="font-semibold text-white">{budgetLabel}</span>
              </div>
              {form.bidDeadline && (
                <div className="flex items-center gap-1.5″ style={{ color: "rgba(255,255,255,0.45)" }}>
                  <Clock className="w-3 h-3 flex-shrink-0″ style={{ color: "rgba(255,255,255,0.3)" }} />
                  Bid by {new Date(form.bidDeadline + "T12:00:00″).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              )}
              <div className="flex items-center gap-1.5″ style={{ color: "rgba(255,255,255,0.45)" }}>
                <Users className="w-3 h-3 flex-shrink-0″ style={{ color: "rgba(255,255,255,0.3)" }} />
                0 applicants
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// --- Main Component -----------------------------------------------------------
export default function ExchangePostJob() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    tradeCategory: "",
    description: "",
    budgetMin: 5000,
    budgetMax: 25000,
    urgency: "flexible",
    city: "",
    state: "TX",
    zip: "",
    startDate: "",
    bidDeadline: "",
    contactEmail: "",
    notifyWhenLive: false,
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");

  const postJobMutation = trpc.exchange.publicPostJob.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const set = (field: keyof typeof form, value: string | boolean | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const selectedCategory = SERVICE_CATEGORIES.find((c) => c.id === form.tradeCategory);
  const popularCategorySelected = POPULAR_CATEGORIES.find((c) => c.id === form.tradeCategory);

  const budgetRangeLabel =
    form.budgetMin > 0 && form.budgetMax > 0
      ? `${formatBudget(form.budgetMin)} – ${formatBudget(form.budgetMax)}`
      : "";

  const instantEstimate = useMemo(
    () => getInstantEstimate(form.tradeCategory, form.description),
    [form.tradeCategory, form.description]
  );

  const validateStep = (s: number): string => {
    if (s === 1 && !form.tradeCategory) return "Please select a category to continue.";
    if (s === 2) {
      if (!form.title.trim()) return "Please enter a job title.";
      if (!form.description.trim()) return "Please describe the scope of work.";
      if (!form.city.trim()) return "Please enter the city.";
    }
    if (s === 3) {
      if (!form.contactEmail.trim()) return "Please enter a contact email.";
      if (!form.contactEmail.includes("@")) return "Please enter a valid email address.";
    }
    return "";
  };

  const goNext = () => {
    const err = validateStep(step);
    if (err) { setValidationError(err); return; }
    setValidationError("");
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setValidationError("");
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postJobMutation.mutate({
      title: form.title,
      tradeCategory: selectedCategory?.name ?? form.tradeCategory,
      description: form.description,
      budgetRange: budgetRangeLabel,
      city: form.city,
      state: form.state,
      zip: form.zip,
      startDate: form.startDate || undefined,
      bidDeadline: form.bidDeadline || undefined,
      contactEmail: form.contactEmail,
      notifyWhenLive: form.notifyWhenLive,
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A1628″, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 max-w-6xl mx-auto">
        <Link href="/">
          <span className="text-white font-bold text-lg tracking-tight cursor-pointer">ProLnk</span>
        </Link>
        <div className="flex items-center gap-4″>
          <Link href="/exchange/jobs">
            <span className="text-sm cursor-pointer text-white/40 hover:text-white transition-colors">Browse Jobs</span>
          </Link>
          <Link href="/exchange">
            <span className="text-sm cursor-pointer text-white/40 hover:text-white transition-colors">Exchange</span>
          </Link>
        </div>
      </nav>

      {/* Banner */}
      <div className="text-center py-2.5 text-xs font-semibold tracking-wider" style={{ backgroundColor: "#2dd4bf", color: "#0A1628″ }}>
        FOUNDING MEMBERS POST FREE &nbsp;·&nbsp; BIDDING OPENS Q3 2026 &nbsp;·&nbsp; SUBMIT YOUR JOB EARLY
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-10 pb-20″>
        {/* Header */}
        <div className="mb-8″>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border" style={{ backgroundColor: "rgba(45,212,191,0.1)", color: "#2dd4bf", borderColor: "rgba(45,212,191,0.3)" }}>
            <Building2 className="w-3.5 h-3.5″ />
            Post a Job
          </div>
          <h1 className="text-3xl font-bold text-white mb-2″>Post a Job Free</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Founding members post free, forever. Verified pros will submit competitive bids when Exchange launches Q3 2026.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl p-10 border text-center" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(45,212,191,0.3)" }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4″ style={{ backgroundColor: "rgba(45,212,191,0.12)" }}>
              <CheckCircle className="w-8 h-8 text-teal-400″ />
            </div>
            <h2 className="text-white font-bold text-2xl mb-2″>Job Submitted!</h2>
            <p className="text-sm mb-2″ style={{ color: "rgba(255,255,255,0.5)" }}>
              Your job posting is live. When bidding opens in Q3 2026, we'll notify you and pros will submit bids directly.
            </p>
            {instantEstimate && (
              <div className="inline-block rounded-xl px-5 py-3 border mb-6″ style={{ backgroundColor: "rgba(45,212,191,0.07)", borderColor: "rgba(45,212,191,0.2)" }}>
                <p className="text-xs text-teal-400/70 mb-1″>Estimated Budget Range</p>
                <p className="text-lg font-bold text-teal-300″>
                  {formatBudget(instantEstimate.low)} – {formatBudget(instantEstimate.high)}
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/exchange/jobs">
                <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-[#0A1628]" style={{ backgroundColor: "#2dd4bf" }}>
                  Browse Other Jobs
                </button>
              </Link>
              <Link href="/exchange">
                <button className="px-6 py-2.5 rounded-xl text-sm font-semibold border transition-colors" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}>
                  Exchange Home
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Form — 3/5 */}
            <div className="lg:col-span-3″>
              {/* Progress bar */}
              <div className="mb-8″>
                <ProgressBar step={step} total={STEPS.length} />
              </div>

              <div
                className="rounded-2xl p-6 border"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}
              >
                {/* Step title */}
                <div className="mb-6″>
                  <p className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1″>Step {step} of {STEPS.length}</p>
                  <h2 className="text-xl font-bold text-white">{STEPS[step - 1].label}</h2>
                </div>

                {/* --- Step 1: Category --- */}
                {step === 1 && (
                  <div className="space-y-5″>
                    <div>
                      <label style={labelStyle}>Popular Categories</label>
                      <div className="grid grid-cols-4 gap-2″>
                        {POPULAR_CATEGORIES.map(({ id, name, icon: Icon, color }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => set("tradeCategory", id)}
                            className="flex flex-col items-center gap-2 py-3 rounded-xl border-2 transition-all"
                            style={{
                              borderColor: form.tradeCategory === id ? `${color}60` : "rgba(255,255,255,0.08)",
                              backgroundColor: form.tradeCategory === id ? `${color}15` : "rgba(255,255,255,0.03)",
                            }}
                          >
                            <Icon className="w-5 h-5″ style={{ color: form.tradeCategory === id ? color : "rgba(255,255,255,0.35)" }} />
                            <span className="text-xs font-semibold" style={{ color: form.tradeCategory === id ? color : "rgba(255,255,255,0.5)" }}>
                              {name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>All 93+ Categories</label>
                      <div className="relative">
                        <select
                          value={form.tradeCategory}
                          onChange={(e) => set("tradeCategory", e.target.value)}
                          style={{
                            ...inputStyle,
                            appearance: "none",
                            cursor: "pointer",
                            paddingRight: "36px",
                            color: form.tradeCategory ? "#fff" : "rgba(255,255,255,0.35)",
                          }}
                        >
                          <option value="" disabled style={{ backgroundColor: "#0D1F3C" }}>
                            Browse all categories…
                          </option>
                          {GROUPED_CATEGORIES.map(({ tier, label, items }) => (
                            <optgroup key={tier} label={`── ${label} ──`} style={{ backgroundColor: "#0D1F3C", color: "rgba(255,255,255,0.4)" }}>
                              {items.map((c) => (
                                <option key={c.id} value={c.id} style={{ backgroundColor: "#0D1F3C" }}>
                                  {c.icon} {c.name}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgba(255,255,255,0.4)" }} />
                      </div>
                      {selectedCategory && (
                        <p className="text-xs mt-1.5″ style={{ color: "rgba(255,255,255,0.35)" }}>
                          {selectedCategory.description}
                        </p>
                      )}
                    </div>

                    {form.tradeCategory && (
                      <div className="flex items-center gap-3 rounded-xl px-4 py-3 border" style={{ backgroundColor: "rgba(45,212,191,0.07)", borderColor: "rgba(45,212,191,0.2)" }}>
                        <Check className="w-4 h-4 text-teal-400 flex-shrink-0″ />
                        <div>
                          <p className="text-sm font-semibold text-teal-300″>
                            {selectedCategory?.name ?? POPULAR_CATEGORIES.find((c) => c.id === form.tradeCategory)?.name ?? form.tradeCategory} selected
                          </p>
                          <p className="text-xs text-white/40″>You can change this anytime from step 1</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* --- Step 2: Job Details --- */}
                {step === 2 && (
                  <div className="space-y-5″>
                    <div>
                      <label style={labelStyle}>Job Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Full Roof Replacement — 4,200 sq ft Home"
                        value={form.title}
                        onChange={(e) => set("title", e.target.value)}
                        style={inputStyle}
                        autoFocus
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Urgency</label>
                      <div className="grid grid-cols-2 gap-2″>
                        {URGENCY_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => set("urgency", opt.value)}
                            className="flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-xl border text-left transition-all"
                            style={{
                              borderColor: form.urgency === opt.value ? `${opt.color}55` : "rgba(255,255,255,0.1)",
                              backgroundColor: form.urgency === opt.value ? `${opt.color}10` : "rgba(255,255,255,0.03)",
                            }}
                          >
                            <span className="text-xs font-bold" style={{ color: form.urgency === opt.value ? opt.color : "rgba(255,255,255,0.7)" }}>
                              {opt.label}
                            </span>
                            <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{opt.description}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Project Description</label>
                      <textarea
                        rows={4}
                        placeholder="Describe the scope of work, number of units, specs, or any special requirements..."
                        value={form.description}
                        onChange={(e) => set("description", e.target.value)}
                        style={{ ...inputStyle, resize: "vertical" }}
                      />
                      {form.description.length > 50 && instantEstimate && (
                        <div className="mt-2 flex items-center gap-2 text-xs rounded-lg px-3 py-2″ style={{ backgroundColor: "rgba(45,212,191,0.07)", color: "rgba(45,212,191,0.8)" }}>
                          <Zap className="w-3 h-3 flex-shrink-0″ />
                          <span>
                            AI estimate for this scope: <strong className="text-teal-300″>{formatBudget(instantEstimate.low)} – {formatBudget(instantEstimate.high)}</strong>
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label style={labelStyle}>Location</label>
                      <div className="grid grid-cols-3 gap-3″>
                        <input type="text" placeholder="City" value={form.city} onChange={(e) => set("city", e.target.value)} style={{ ...inputStyle, gridColumn: "span 1″ }} />
                        <input type="text" placeholder="State" value={form.state} onChange={(e) => set("state", e.target.value)} maxLength={2} style={inputStyle} />
                        <input type="text" placeholder="ZIP" value={form.zip} onChange={(e) => set("zip", e.target.value)} maxLength={5} style={inputStyle} />
                      </div>
                    </div>
                  </div>
                )}

                {/* --- Step 3: Budget & Timeline --- */}
                {step === 3 && (
                  <div className="space-y-5″>
                    {/* Budget presets */}
                    <div>
                      <label style={labelStyle}>Budget Preset</label>
                      <div className="grid grid-cols-4 gap-2″>
                        {BUDGET_PRESETS.map((preset) => {
                          const active = form.budgetMin === preset.min && form.budgetMax === preset.max;
                          return (
                            <button
                              key={preset.label}
                              type="button"
                              onClick={() => { set("budgetMin", preset.min); set("budgetMax", preset.max); }}
                              className="flex flex-col items-center gap-0.5 py-2.5 px-2 rounded-xl border text-center transition-all"
                              style={{
                                borderColor: active ? "rgba(45,212,191,0.4)" : "rgba(255,255,255,0.1)",
                                backgroundColor: active ? "rgba(45,212,191,0.1)" : "rgba(255,255,255,0.03)",
                              }}
                            >
                              <span className="text-xs font-bold" style={{ color: active ? "#2dd4bf" : "rgba(255,255,255,0.7)" }}>{preset.label}</span>
                              <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{preset.range}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Fine-tune sliders */}
                    <div className="space-y-4 p-4 rounded-xl border" style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.03)" }}>
                      <div className="flex items-center justify-between mb-1″>
                        <label style={{ ...labelStyle, marginBottom: 0 }}>Fine-Tune Range</label>
                        <span className="text-xs font-bold text-teal-400″>{formatBudget(form.budgetMin)} – {formatBudget(form.budgetMax)}</span>
                      </div>
                      <BudgetSlider label="Minimum" min={0} max={500000} value={form.budgetMin} onChange={(v) => set("budgetMin", Math.min(v, form.budgetMax - 1000))} />
                      <BudgetSlider label="Maximum" min={0} max={500000} value={form.budgetMax} onChange={(v) => set("budgetMax", Math.max(v, form.budgetMin + 1000))} />
                    </div>

                    {/* AI estimate comparison */}
                    {instantEstimate && (
                      <div className="flex items-start gap-3 rounded-xl px-4 py-3 border" style={{ backgroundColor: "rgba(45,212,191,0.05)", borderColor: "rgba(45,212,191,0.15)" }}>
                        <TrendingUp className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5″ />
                        <div>
                          <p className="text-xs font-semibold text-teal-300 mb-0.5″>AI Market Estimate</p>
                          <p className="text-xs text-white/50″>
                            Based on your category and description, typical bids run{" "}
                            <span className="text-teal-300 font-semibold">
                              {formatBudget(instantEstimate.low)} – {formatBudget(instantEstimate.high)}
                            </span>{" "}
                            for {instantEstimate.label}.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4″>
                      <div>
                        <label style={labelStyle}>Desired Start Date</label>
                        <input type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} style={{ ...inputStyle, colorScheme: "dark" }} />
                      </div>
                      <div>
                        <label style={labelStyle}>Bid Deadline</label>
                        <input type="date" value={form.bidDeadline} onChange={(e) => set("bidDeadline", e.target.value)} style={{ ...inputStyle, colorScheme: "dark" }} />
                      </div>
                    </div>

                    {/* Contact */}
                    <div>
                      <label style={labelStyle}>Contact Email</label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={form.contactEmail}
                        onChange={(e) => set("contactEmail", e.target.value)}
                        style={inputStyle}
                      />
                    </div>

                    {/* Notify */}
                    <label
                      className="flex items-start gap-3 cursor-pointer rounded-xl p-4 border transition-colors"
                      style={{
                        backgroundColor: form.notifyWhenLive ? "rgba(45,212,191,0.07)" : "rgba(255,255,255,0.03)",
                        borderColor: form.notifyWhenLive ? "rgba(45,212,191,0.3)" : "rgba(255,255,255,0.1)",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={form.notifyWhenLive}
                        onChange={(e) => set("notifyWhenLive", e.target.checked)}
                        className="mt-0.5″
                        style={{ accentColor: "#2dd4bf" }}
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">Notify me when bidding goes live</p>
                        <p className="text-xs mt-0.5″ style={{ color: "rgba(255,255,255,0.4)" }}>
                          We'll email you when Exchange launches Q3 2026 so you start receiving bids immediately.
                        </p>
                      </div>
                    </label>
                  </div>
                )}

                {/* --- Step 4: Photos --- */}
                {step === 4 && (
                  <div className="space-y-5″>
                    <PhotoUploadArea
                      photos={photos}
                      onAdd={(files) => setPhotos((prev) => [...prev, ...files].slice(0, 5))}
                      onRemove={(idx) => setPhotos((prev) => prev.filter((_, i) => i !== idx))}
                    />

                    {/* Summary */}
                    <div className="rounded-xl p-4 border space-y-2″ style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3″>Posting Summary</p>
                      {[
                        { label: "Category", value: selectedCategory?.name ?? form.tradeCategory },
                        { label: "Title", value: form.title },
                        { label: "Location", value: [form.city, form.state].filter(Boolean).join(", ") || "—" },
                        { label: "Budget", value: budgetRangeLabel || "—" },
                        { label: "Urgency", value: URGENCY_OPTIONS.find((u) => u.value === form.urgency)?.label ?? "—" },
                        { label: "Contact", value: form.contactEmail },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-start gap-2 text-sm">
                          <span className="text-white/30 w-20 flex-shrink-0″>{label}</span>
                          <span className="text-white/70 font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Validation error */}
                {validationError && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl px-4 py-3 bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0″ />
                    {validationError}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex gap-3 mt-6″>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-colors"
                      style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}
                    >
                      <ArrowLeft className="w-4 h-4″ /> Back
                    </button>
                  )}
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-[#0A1628] transition-all hover:opacity-90″
                      style={{ backgroundColor: "#2dd4bf" }}
                    >
                      Continue <ArrowRight className="w-4 h-4″ />
                    </button>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex-1″>
                      <button
                        type="submit"
                        disabled={postJobMutation.isPending}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-[#0A1628] transition-all hover:opacity-90 disabled:opacity-60″
                        style={{ backgroundColor: "#2dd4bf" }}
                      >
                        {postJobMutation.isPending ? "Submitting…" : <>Post Job Free <ArrowRight className="w-4 h-4″ /></>}
                      </button>
                    </form>
                  )}
                </div>

                {step === 4 && (
                  <p className="text-xs text-center mt-3″ style={{ color: "rgba(255,255,255,0.25)" }}>
                    Founding members post free, forever — bidding opens Q3 2026.
                  </p>
                )}
              </div>
            </div>

            {/* Right panel — 2/5 */}
            <div className="lg:col-span-2 lg:sticky lg:top-8 space-y-5″>
              <JobPreviewCard
                form={form}
                categoryName={selectedCategory?.name ?? POPULAR_CATEGORIES.find((c) => c.id === form.tradeCategory)?.name ?? ""}
                photos={photos}
              />

              {/* Tips */}
              <div className="rounded-xl p-4 border" style={{ backgroundColor: "rgba(45,212,191,0.04)", borderColor: "rgba(45,212,191,0.15)" }}>
                <div className="flex items-center gap-2 mb-3″>
                  <Star className="w-3.5 h-3.5 text-teal-400″ />
                  <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Tips for More Bids</span>
                </div>
                <ul className="space-y-2″>
                  {[
                    "Add photos to get 3× more bids",
                    "Include sq footage or unit count",
                    "Mention license requirements upfront",
                    "Specify start date flexibility",
                    "Note if weekend work is OK",
                  ].map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                      <span className="text-teal-500 mt-0.5″>·</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step guide */}
              <div className="rounded-xl p-4 border" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3″>What Happens Next</p>
                {[
                  "Your job is posted to Exchange immediately",
                  "Verified pros see it when bidding opens Q3″,
                  "You review bids and choose your sub",
                  "ProLnk handles escrow & payout",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 mb-2″>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5″ style={{ backgroundColor: "rgba(45,212,191,0.15)", color: "#2dd4bf" }}>
                      {i + 1}
                    </div>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t text-center py-8 text-xs" style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)" }}>
        &copy; 2026 ProLnk &mdash; ProLnk Exchange is a commercial sub-platform for licensed pros only.
      </div>
    </div>
  );
}
