import type React from "react";
import { useState, useRef } from "react";
import { Link } from "wouter";
import {
  Briefcase, CheckCircle, ArrowRight, Building2,
  MapPin, DollarSign, Clock, Zap, Users, Eye,
  Upload, X, Image, ChevronDown,
} from "lucide-react";
import { trpc } from "../lib/trpc";
import { SERVICE_CATEGORIES, TIER_LABELS } from "../data/serviceCategories";

const URGENCY_OPTIONS = [
  { value: "flexible", label: "Flexible", description: "No rush, planning ahead", color: "#818cf8" },
  { value: "within_2_weeks", label: "Within 2 Weeks", description: "Need it soon", color: "#F59E0B" },
  { value: "asap", label: "ASAP", description: "Within a few days", color: "#fb923c" },
  { value: "emergency", label: "Emergency", description: "Urgent / immediate", color: "#f87171" },
];

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

const LOGO_COLORS = [
  { bg: "rgba(245,158,11,0.18)", color: "#F59E0B" },
  { bg: "rgba(99,102,241,0.18)", color: "#818cf8" },
  { bg: "rgba(34,197,94,0.18)", color: "#4ade80" },
  { bg: "rgba(239,68,68,0.18)", color: "#f87171" },
  { bg: "rgba(14,165,233,0.18)", color: "#38bdf8" },
];

function getLogoColor(name: string) {
  if (!name) return LOGO_COLORS[0];
  const idx = name.charCodeAt(0) % LOGO_COLORS.length;
  return LOGO_COLORS[idx];
}

function getInitials(name: string) {
  if (!name.trim()) return "?";
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length > 2 ? 2 : 1][0]).toUpperCase();
}

function formatBudget(val: number): string {
  if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
  return `$${val.toLocaleString()}`;
}

function BudgetSlider({
  min, max, value, onChange, label,
}: {
  min: number; max: number; value: number;
  onChange: (v: number) => void; label: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label style={labelStyle}>{label}</label>
        <span className="text-sm font-bold text-amber-400">{formatBudget(value)}</span>
      </div>
      <div className="relative h-5 flex items-center">
        <div
          className="absolute inset-x-0 h-1.5 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        />
        <div
          className="absolute left-0 h-1.5 rounded-full"
          style={{ width: `${pct}%`, backgroundColor: "#F59E0B" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={min < 5000 ? 500 : 5000}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-x-0 w-full opacity-0 cursor-pointer h-5"
          style={{ zIndex: 2 }}
        />
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-amber-400 bg-[#0A1628]"
          style={{ left: `calc(${pct}% - 8px)`, zIndex: 1 }}
        />
      </div>
    </div>
  );
}

function PhotoUploadArea({
  photos,
  onAdd,
  onRemove,
}: {
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
    <div>
      <label style={labelStyle}>Photos (up to 5)</label>
      <div className="space-y-3">
        {photos.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {photos.map((file, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Photo ${idx + 1}`}
                  className="w-16 h-16 object-cover rounded-xl border"
                  style={{ borderColor: "rgba(255,255,255,0.15)" }}
                />
                <button
                  type="button"
                  onClick={() => onRemove(idx)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: "#ef4444", color: "#fff" }}
                >
                  <X className="w-3 h-3" />
                </button>
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
            className="flex flex-col items-center justify-center gap-2 py-6 rounded-xl border-2 border-dashed cursor-pointer transition-all"
            style={{
              borderColor: dragging ? "#F59E0B" : "rgba(255,255,255,0.15)",
              backgroundColor: dragging ? "rgba(245,158,11,0.06)" : "rgba(255,255,255,0.03)",
            }}
          >
            <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.4)" }}>
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">
                {dragging ? "Drop photos here" : "Click or drag photos here"}
              </span>
            </div>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              {photos.length}/5 photos · JPG, PNG, WEBP
            </span>
          </div>
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
    </div>
  );
}

function JobPreview({
  title, description, categoryName, budgetMin, budgetMax,
  city, state, bidDeadline, urgency, photoCount,
}: {
  title: string; description: string; categoryName: string;
  budgetMin: number; budgetMax: number; city: string;
  state: string; bidDeadline: string; urgency: string; photoCount: number;
}) {
  const isEmpty = !title && !description && !categoryName;
  const { bg, color } = getLogoColor(title || "P");
  const posterName = "Your Company";

  const deadlineLabel = bidDeadline
    ? `Bid by ${new Date(bidDeadline + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
    : "Open";

  const locationLabel = [city, state].filter(Boolean).join(", ") || "Your Location";

  const urgencyOption = URGENCY_OPTIONS.find((u) => u.value === urgency);
  const budgetLabel =
    budgetMin > 0 && budgetMax > 0
      ? `${formatBudget(budgetMin)} – ${formatBudget(budgetMax)}`
      : budgetMin > 0
      ? `From ${formatBudget(budgetMin)}`
      : "Budget TBD";

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Eye className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#F59E0B" }}>
          Live Preview
        </span>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          — how your job will appear
        </span>
      </div>

      <div
        className="rounded-2xl p-5 border transition-all"
        style={{
          backgroundColor: "rgba(255,255,255,0.04)",
          borderColor: isEmpty ? "rgba(255,255,255,0.08)" : "rgba(245,158,11,0.2)",
          opacity: isEmpty ? 0.5 : 1,
        }}
      >
        {isEmpty ? (
          <div className="text-center py-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            >
              <Briefcase className="w-5 h-5" style={{ color: "rgba(255,255,255,0.3)" }} />
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
              Start filling out the form to see your listing preview
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-3 mb-3">
              <div
                style={{
                  width: 40, height: 40, borderRadius: 10, backgroundColor: bg, color,
                  fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0, border: `1px solid ${color}30`,
                }}
              >
                {getInitials(posterName)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  {urgencyOption && (
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${urgencyOption.color}1a`,
                        color: urgencyOption.color,
                      }}
                    >
                      {urgency === "emergency" && <Zap className="w-3 h-3" />}
                      {urgencyOption.label}
                    </span>
                  )}
                  {categoryName && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border"
                      style={{
                        borderColor: "rgba(245,158,11,0.3)",
                        color: "#F59E0B",
                        backgroundColor: "rgba(245,158,11,0.08)",
                      }}
                    >
                      {categoryName}
                    </span>
                  )}
                </div>
                <h3 className="text-white font-bold text-sm leading-tight">
                  {title || (
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>
                      Your job title will appear here
                    </span>
                  )}
                </h3>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1">
                <div
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)" }}
                >
                  <Users className="w-3 h-3" />
                  0 applicants
                </div>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Posted today</span>
              </div>
            </div>

            {description && (
              <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                {description.length > 160 ? description.slice(0, 160) + "…" : description}
              </p>
            )}

            {photoCount > 0 && (
              <div
                className="flex items-center gap-1.5 mb-3 text-xs"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <Image className="w-3.5 h-3.5" />
                {photoCount} photo{photoCount !== 1 ? "s" : ""} attached
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3 h-3 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} />
                <span className="text-xs truncate" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {posterName}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{locationLabel}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-3 h-3 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} />
                <span className="text-xs font-semibold text-white">{budgetLabel}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{deadlineLabel}</span>
              </div>
            </div>

            <div
              className="w-full py-2 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5"
              style={{
                backgroundColor: "rgba(245,158,11,0.1)",
                color: "#F59E0B",
                border: "1px solid rgba(245,158,11,0.25)",
              }}
            >
              <Zap className="w-3 h-3" />
              Post Job Free — Founding Member
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const GROUPED_CATEGORIES = ([1, 2, 3, 4, 5] as const).map((tier) => ({
  tier,
  label: TIER_LABELS[tier],
  items: SERVICE_CATEGORIES.filter((c) => c.tier === tier),
}));

export default function ExchangePostJob() {
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

  const postJobMutation = trpc.exchange.publicPostJob.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const set = (field: keyof typeof form, value: string | boolean | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const selectedCategory = SERVICE_CATEGORIES.find((c) => c.id === form.tradeCategory);

  const budgetRangeLabel =
    form.budgetMin > 0 && form.budgetMax > 0
      ? `${formatBudget(form.budgetMin)} – ${formatBudget(form.budgetMax)}`
      : "";

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
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0A1628", fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 max-w-6xl mx-auto">
        <Link href="/">
          <span className="text-white font-bold text-lg tracking-tight cursor-pointer">ProLnk</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/exchange/jobs">
            <span className="text-sm cursor-pointer transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
              Browse Jobs
            </span>
          </Link>
          <Link href="/exchange">
            <span className="text-sm cursor-pointer transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
              Exchange Home
            </span>
          </Link>
        </div>
      </nav>

      {/* Founding Member Banner */}
      <div
        className="text-center py-2.5 text-xs font-semibold tracking-wider"
        style={{ backgroundColor: "#F59E0B", color: "#0A1628" }}
      >
        FOUNDING MEMBERS POST FREE &nbsp;·&nbsp; BIDDING OPENS Q3 2026 &nbsp;·&nbsp; SUBMIT YOUR JOB EARLY
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-20">
        {/* Header */}
        <div className="mb-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border"
            style={{
              backgroundColor: "rgba(245,158,11,0.1)",
              color: "#F59E0B",
              borderColor: "rgba(245,158,11,0.3)",
            }}
          >
            <Building2 className="w-3.5 h-3.5" />
            Post a Job
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Post a Job Free</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Founding members post jobs for free, forever. When bidding goes live in Q3 2026,
            verified pros will submit competitive bids directly to you.
          </p>
        </div>

        {submitted ? (
          <div
            className="rounded-2xl p-10 border text-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              borderColor: "rgba(245,158,11,0.3)",
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "rgba(245,158,11,0.12)" }}
            >
              <CheckCircle className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-white font-bold text-2xl mb-2">Job Submitted for Review</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              Your job posting is live. When bidding opens in Q3 2026, we'll notify you and pros
              will be able to submit bids directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/exchange/jobs">
                <button
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-[#0A1628]"
                  style={{ backgroundColor: "#F59E0B" }}
                >
                  Browse Other Jobs
                </button>
              </Link>
              <Link href="/exchange">
                <button
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold border transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
                >
                  Exchange Home
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div
                className="rounded-2xl p-7 border space-y-5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                {/* Job Title */}
                <div>
                  <label style={labelStyle}>Job Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4-Unit Apartment HVAC Replacement"
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                    style={inputStyle}
                  />
                </div>

                {/* Job Category — 93 categories grouped by tier */}
                <div>
                  <label style={labelStyle}>Job Category</label>
                  <div className="relative">
                    <select
                      required
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
                        Select a category
                      </option>
                      {GROUPED_CATEGORIES.map(({ tier, label, items }) => (
                        <optgroup
                          key={tier}
                          label={`── ${label} ──`}
                          style={{ backgroundColor: "#0D1F3C", color: "rgba(255,255,255,0.4)" }}
                        >
                          {items.map((c) => (
                            <option key={c.id} value={c.id} style={{ backgroundColor: "#0D1F3C" }}>
                              {c.icon} {c.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    />
                  </div>
                  {selectedCategory && (
                    <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {selectedCategory.description}
                    </p>
                  )}
                </div>

                {/* Urgency */}
                <div>
                  <label style={labelStyle}>Urgency</label>
                  <div className="grid grid-cols-2 gap-2">
                    {URGENCY_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => set("urgency", opt.value)}
                        className="flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-xl border text-left transition-all"
                        style={{
                          borderColor:
                            form.urgency === opt.value
                              ? `${opt.color}60`
                              : "rgba(255,255,255,0.1)",
                          backgroundColor:
                            form.urgency === opt.value
                              ? `${opt.color}12`
                              : "rgba(255,255,255,0.03)",
                        }}
                      >
                        <span
                          className="text-xs font-bold"
                          style={{ color: form.urgency === opt.value ? opt.color : "rgba(255,255,255,0.7)" }}
                        >
                          {opt.label}
                        </span>
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                          {opt.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range — dual sliders */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label style={{ ...labelStyle, marginBottom: 0 }}>Budget Range</label>
                    <span className="text-xs font-bold text-amber-400">
                      {formatBudget(form.budgetMin)} – {formatBudget(form.budgetMax)}
                    </span>
                  </div>
                  <div className="space-y-4 p-4 rounded-xl border" style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.03)" }}>
                    <BudgetSlider
                      label="Minimum"
                      min={0}
                      max={500000}
                      value={form.budgetMin}
                      onChange={(v) => set("budgetMin", Math.min(v, form.budgetMax - 1000))}
                    />
                    <BudgetSlider
                      label="Maximum"
                      min={0}
                      max={500000}
                      value={form.budgetMax}
                      onChange={(v) => set("budgetMax", Math.max(v, form.budgetMin + 1000))}
                    />
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label style={labelStyle}>Project Description</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe the scope of work, number of units, specs, or any special requirements..."
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                {/* Photo Upload */}
                <PhotoUploadArea
                  photos={photos}
                  onAdd={(files) => setPhotos((prev) => [...prev, ...files].slice(0, 5))}
                  onRemove={(idx) => setPhotos((prev) => prev.filter((_, i) => i !== idx))}
                />

                {/* Location */}
                <div>
                  <label style={labelStyle}>Location</label>
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      style={{ ...inputStyle, gridColumn: "span 1" }}
                    />
                    <input
                      type="text"
                      required
                      placeholder="State"
                      value={form.state}
                      onChange={(e) => set("state", e.target.value)}
                      maxLength={2}
                      style={inputStyle}
                    />
                    <input
                      type="text"
                      required
                      placeholder="ZIP"
                      value={form.zip}
                      onChange={(e) => set("zip", e.target.value)}
                      maxLength={5}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Desired Start Date</label>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => set("startDate", e.target.value)}
                      style={{ ...inputStyle, colorScheme: "dark" }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Bid Deadline</label>
                    <input
                      type="date"
                      value={form.bidDeadline}
                      onChange={(e) => set("bidDeadline", e.target.value)}
                      style={{ ...inputStyle, colorScheme: "dark" }}
                    />
                  </div>
                </div>

                {/* Contact Email */}
                <div>
                  <label style={labelStyle}>Contact Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={form.contactEmail}
                    onChange={(e) => set("contactEmail", e.target.value)}
                    style={inputStyle}
                  />
                </div>

                {/* Notify checkbox */}
                <label
                  className="flex items-start gap-3 cursor-pointer rounded-xl p-4 border transition-colors"
                  style={{
                    backgroundColor: form.notifyWhenLive ? "rgba(245,158,11,0.07)" : "rgba(255,255,255,0.03)",
                    borderColor: form.notifyWhenLive ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.1)",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.notifyWhenLive}
                    onChange={(e) => set("notifyWhenLive", e.target.checked)}
                    className="mt-0.5 accent-amber-400"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">Notify me when bidding is live</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                      We'll email you when Exchange launches in Q3 2026 so you can start receiving bids right away.
                    </p>
                  </div>
                </label>

                {postJobMutation.error && (
                  <p className="text-xs text-red-400 text-center">
                    {postJobMutation.error.message || "Submission failed. Please try again."}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={postJobMutation.isPending}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-[#0A1628] transition-all hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ backgroundColor: "#F59E0B" }}
                >
                  {postJobMutation.isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      Post Job Free <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
                  Founding members post free, forever — bidding opens Q3 2026.
                </p>
              </div>
            </form>

            {/* Live Preview — sticky on desktop */}
            <div className="lg:sticky lg:top-8">
              <JobPreview
                title={form.title}
                description={form.description}
                categoryName={selectedCategory?.name ?? ""}
                budgetMin={form.budgetMin}
                budgetMax={form.budgetMax}
                city={form.city}
                state={form.state}
                bidDeadline={form.bidDeadline}
                urgency={form.urgency}
                photoCount={photos.length}
              />

              {/* Tip box */}
              <div
                className="mt-5 rounded-xl p-4 border"
                style={{
                  backgroundColor: "rgba(245,158,11,0.05)",
                  borderColor: "rgba(245,158,11,0.15)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Tips for more bids
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {[
                    "Add photos to get 3× more bids",
                    "Include square footage or unit count",
                    "Mention license requirements upfront",
                    "Specify start date flexibility",
                    "Note if weekend work is acceptable",
                  ].map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                      <span className="text-amber-500 mt-0.5">·</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="border-t text-center py-8 text-xs"
        style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)" }}
      >
        &copy; 2026 ProLnk &mdash; ProLnk Exchange is a separate commercial network from the residential platform.
      </div>
    </div>
  );
}
