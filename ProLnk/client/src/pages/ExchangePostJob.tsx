import type React from "react";
import { useState } from "react";
import { Link } from "wouter";
import {
  Briefcase, CheckCircle, ArrowRight, Building2,
} from "lucide-react";

const TRADE_CATEGORIES = [
  "HVAC",
  "Roofing",
  "Electrical",
  "Plumbing",
  "Landscaping",
  "General Contractor",
  "Painting",
  "Flooring",
  "Structural",
  "Other",
];

const BUDGET_RANGES = [
  "Under $5,000",
  "$5,000 – $25,000",
  "$25,000 – $100,000",
  "$100,000+",
  "Monthly contract",
];

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "12px",
  fontSize: "14px",
  color: "#fff",
  backgroundColor: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.15)",
  outline: "none",
  boxSizing: "border-box" as const,
};

const labelStyle = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "rgba(255,255,255,0.5)",
  marginBottom: "6px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

export default function ExchangePostJob() {
  const [form, setForm] = useState({
    title: "",
    tradeCategory: "",
    description: "",
    budgetRange: "",
    city: "",
    state: "TX",
    zip: "",
    startDate: "",
    bidDeadline: "",
    contactEmail: "",
    notifyWhenLive: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof typeof form, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 700);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#0A1628",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 max-w-6xl mx-auto">
        <Link href="/">
          <span className="text-white font-bold text-lg tracking-tight cursor-pointer">
            ProLnk
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/exchange/jobs">
            <span
              className="text-sm cursor-pointer transition-colors"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Browse Jobs
            </span>
          </Link>
          <Link href="/exchange">
            <span
              className="text-sm cursor-pointer transition-colors"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Exchange Home
            </span>
          </Link>
        </div>
      </nav>

      {/* Coming Soon Banner */}
      <div
        className="text-center py-2.5 text-xs font-semibold tracking-wider"
        style={{ backgroundColor: "#F59E0B", color: "#0A1628" }}
      >
        COMING Q3 2026 &nbsp;·&nbsp; WE'RE BUILDING THE BIDDING SYSTEM NOW &nbsp;·&nbsp; SUBMIT YOUR JOB EARLY
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-12 pb-20">
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
            Post a Commercial Job
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Post a Job</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Submit your commercial project now. When bidding goes live in Q3
            2026, verified trade professionals will be able to submit competitive
            bids directly to you.
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
            <h2 className="text-white font-bold text-2xl mb-2">
              Job Submitted for Review
            </h2>
            <p
              className="text-sm mb-6"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              We've received your job posting. Our team will review it and list
              it on the Exchange. When bidding opens in Q3 2026, we'll notify
              you and your project will be live to verified commercial
              contractors.
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
                  style={{
                    borderColor: "rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  Exchange Home
                </button>
              </Link>
            </div>
          </div>
        ) : (
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

              {/* Trade Category */}
              <div>
                <label style={labelStyle}>Trade Category</label>
                <div className="relative">
                  <select
                    required
                    value={form.tradeCategory}
                    onChange={(e) => set("tradeCategory", e.target.value)}
                    style={{
                      ...inputStyle,
                      appearance: "none",
                      cursor: "pointer",
                      color: form.tradeCategory ? "#fff" : "rgba(255,255,255,0.35)",
                    }}
                  >
                    <option value="" disabled style={{ backgroundColor: "#0D1F3C" }}>
                      Select a trade
                    </option>
                    {TRADE_CATEGORIES.map((t) => (
                      <option key={t} value={t} style={{ backgroundColor: "#0D1F3C" }}>
                        {t}
                      </option>
                    ))}
                  </select>
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

              {/* Budget Range */}
              <div>
                <label style={labelStyle}>Budget Range</label>
                <div className="relative">
                  <select
                    required
                    value={form.budgetRange}
                    onChange={(e) => set("budgetRange", e.target.value)}
                    style={{
                      ...inputStyle,
                      appearance: "none",
                      cursor: "pointer",
                      color: form.budgetRange ? "#fff" : "rgba(255,255,255,0.35)",
                    }}
                  >
                    <option value="" disabled style={{ backgroundColor: "#0D1F3C" }}>
                      Select a range
                    </option>
                    {BUDGET_RANGES.map((r) => (
                      <option key={r} value={r} style={{ backgroundColor: "#0D1F3C" }}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

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
                    style={{
                      ...inputStyle,
                      colorScheme: "dark",
                    }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Bid Deadline</label>
                  <input
                    type="date"
                    value={form.bidDeadline}
                    onChange={(e) => set("bidDeadline", e.target.value)}
                    style={{
                      ...inputStyle,
                      colorScheme: "dark",
                    }}
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
                  backgroundColor: form.notifyWhenLive
                    ? "rgba(245,158,11,0.07)"
                    : "rgba(255,255,255,0.03)",
                  borderColor: form.notifyWhenLive
                    ? "rgba(245,158,11,0.3)"
                    : "rgba(255,255,255,0.1)",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.notifyWhenLive}
                  onChange={(e) => set("notifyWhenLive", e.target.checked)}
                  className="mt-0.5 accent-amber-400"
                />
                <div>
                  <p className="text-sm font-semibold text-white">
                    Notify me when bidding is live
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    We'll email you when Exchange launches in Q3 2026 so you can
                    start receiving bids right away.
                  </p>
                </div>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-[#0A1628] transition-all hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ backgroundColor: "#F59E0B" }}
              >
                {submitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit for Review <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p
                className="text-xs text-center"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Coming Q3 2026 — We're building the bidding system now. Your job
                will be listed when the platform launches.
              </p>
            </div>
          </form>
        )}
      </div>

      {/* Footer */}
      <div
        className="border-t text-center py-8 text-xs"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.25)",
        }}
      >
        &copy; 2026 ProLnk &mdash; ProLnk Exchange is a separate commercial
        network from the residential platform.
      </div>
    </div>
  );
}
