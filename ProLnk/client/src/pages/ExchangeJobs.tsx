import React from 'react';
import { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  Briefcase, MapPin, DollarSign, Clock, Filter, ChevronDown,
  ArrowRight, Building2, Users, Bell, Zap, CheckCircle, X,
  TrendingUp, Eye, Bookmark, BookmarkCheck, ArrowUpDown,
} from "lucide-react";
import { trpc } from "../lib/trpc";

const TRADE_CATEGORIES = [
  "All Trades",
  "HVAC",
  "Roofing",
  "Electrical",
  "Plumbing",
  "Landscaping",
  "General Contractor",
  "Painting",
  "Flooring",
  "Structural",
];

const PROJECT_SIZES = [
  "All Sizes",
  "Under $5K",
  "$5K–$25K",
  "$25K–$100K",
  "$100K+",
];

const URGENCY_OPTIONS = ["All", "Urgent", "Active", "Ongoing"];

const SORT_OPTIONS = [
  "Newest",
  "Highest Budget",
  "Most Bids",
  "Closing Soon",
] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

const TIMELINE_OPTIONS = [
  "1 week",
  "2 weeks",
  "1 month",
  "Custom",
];

const SEED_JOBS = [
  {
    id: 1,
    title: "HVAC System Overhaul — 50-Unit Apartment Complex",
    posterType: "Synergy Property Group",
    location: "Plano, TX",
    budget: "$45,000–$65,000″,
    deadline: "Bid by May 25, 2026″,
    trade: "HVAC",
    size: "$25K–$100K",
    description:
      "Full HVAC replacement across a 50-unit complex. New air handlers, condensers, and ductwork inspection required. Licensed HVAC contractor with commercial multifamily experience mandatory. All units must be completed within a 4-week window with minimal tenant disruption.",
    urgency: "Urgent",
    applicants: 3,
    postedDaysAgo: 0,
    views: 14,
    distanceMiles: 8.2,
  },
  {
    id: 2,
    title: "Strip Mall Roof Replacement — 14,000 sq ft",
    posterType: "Pinnacle Commercial Real Estate",
    location: "Garland, TX",
    budget: "$95,000–$130,000″,
    deadline: "Bid by Jun 1, 2026″,
    trade: "Roofing",
    size: "$100K+",
    description:
      "Full tear-off and TPO membrane installation on a 7-tenant strip mall. Drainage system upgrade included. Work must be phased to keep tenants operational. Class-A commercial roofing license required. Bid includes 10-year workmanship warranty.",
    urgency: "Active",
    applicants: 5,
    postedDaysAgo: 4,
    views: 87,
    distanceMiles: 22.7,
  },
  {
    id: 3,
    title: "Electrical Panel Upgrade — Industrial Warehouse",
    posterType: "DFW Logistics Partners",
    location: "Irving, TX",
    budget: "$28,000–$42,000″,
    deadline: "Bid by May 31, 2026″,
    trade: "Electrical",
    size: "$25K–$100K",
    description:
      "Upgrade 400A main panel to 800A 3-phase service for new equipment installation. Requires load calculations, permit pull, and inspection coordination with Oncor. Master electrician on-site throughout project. 180,000 sq ft facility, weekend work acceptable.",
    urgency: "Urgent",
    applicants: 2,
    postedDaysAgo: 0,
    views: 31,
    distanceMiles: 15.4,
  },
  {
    id: 4,
    title: "Plumbing Retrofit — 12-Location Restaurant Chain",
    posterType: "Frontier Eats Group",
    location: "DFW Metro",
    budget: "$6,500–$9,000 per location",
    deadline: "Bid by Jun 10, 2026″,
    trade: "Plumbing",
    size: "$5K–$25K",
    description:
      "Grease trap replacement and backflow preventer installation across 12 quick-service restaurant locations in DFW. Must be completed during non-operational hours (10PM–6AM). Commercial plumbing license required. Contractor handles permitting at each location.",
    urgency: "Active",
    applicants: 7,
    postedDaysAgo: 5,
    views: 112,
    distanceMiles: 5.1,
  },
  {
    id: 5,
    title: "Commercial Exterior Painting — Office Park",
    posterType: "Riverview Holdings LLC",
    location: "Allen, TX",
    budget: "$38,000–$52,000″,
    deadline: "Bid by Jun 20, 2026″,
    trade: "Painting",
    size: "$25K–$100K",
    description:
      "Exterior repaint for a 4-building Class-B office park totaling 96,000 sq ft of facade. Surface prep, primer, and 2-coat elastomeric finish. Color match to existing scheme. OSHA-compliant scaffolding and lift equipment required. Phased completion over 6 weeks.",
    urgency: "Active",
    applicants: 4,
    postedDaysAgo: 7,
    views: 65,
    distanceMiles: 19.3,
  },
  {
    id: 6,
    title: "Multi-Property Maintenance Contract — 8 Communities",
    posterType: "Keystone Property Management",
    location: "North DFW",
    budget: "$22,000/mo",
    deadline: "Ongoing",
    trade: "General Contractor",
    size: "$100K+",
    description:
      "Full-service maintenance and repair contract for 8 multifamily communities totaling 1,400 units across Frisco, McKinney, and Prosper. 24-hour emergency response required. Services include plumbing, HVAC filter changes, appliance repair, make-ready turns, and common area upkeep.",
    urgency: "Ongoing",
    applicants: 11,
    postedDaysAgo: 10,
    views: 203,
    distanceMiles: 31.8,
  },
  {
    id: 7,
    title: "Commercial Roof Replacement — 8,000 sq ft Clubhouse",
    posterType: "Lakewood HOA Board",
    location: "McKinney, TX",
    budget: "$85,000–$120,000″,
    deadline: "Bid by Jun 15, 2026″,
    trade: "Roofing",
    size: "$100K+",
    description:
      "Full tear-off and replacement of flat commercial roof on a 12-unit HOA clubhouse and attached structures. TPO membrane preferred. Certified roofing contractors only. Project must complete before July 4th community events.",
    urgency: "Active",
    applicants: 6,
    postedDaysAgo: 3,
    views: 48,
    distanceMiles: 27.5,
  },
  {
    id: 8,
    title: "Flooring Replacement — Corporate HQ, 3 Floors",
    posterType: "Meridian Capital Group",
    location: "Richardson, TX",
    budget: "$55,000–$72,000″,
    deadline: "Bid by Jun 5, 2026″,
    trade: "Flooring",
    size: "$25K–$100K",
    description:
      "LVP and carpet tile replacement across 3 floors (42,000 sq ft total) of a corporate headquarters. Phased installation to keep one floor operational at all times. Asbestos abatement completed — clean start. Commercial flooring contractor with office space experience required.",
    urgency: "Active",
    applicants: 4,
    postedDaysAgo: 6,
    views: 77,
    distanceMiles: 11.9,
  },
  {
    id: 9,
    title: "Multi-Building Landscaping — 200-Unit Complex",
    posterType: "Summit Property Group",
    location: "Frisco, TX",
    budget: "$8,000/mo",
    deadline: "Ongoing",
    trade: "Landscaping",
    size: "$5K–$25K",
    description:
      "Monthly landscape maintenance for a 200-unit apartment complex across 18 acres. Includes mowing, edging, irrigation management, seasonal color rotations, and light tree work. 12-month contract with renewal option. ISA-certified arborist on retainer preferred.",
    urgency: "Ongoing",
    applicants: 9,
    postedDaysAgo: 12,
    views: 156,
    distanceMiles: 24.6,
  },
];

function hoursUntilDeadline(deadlineStr: string): number | null {
  if (!deadlineStr || deadlineStr === "Ongoing") return null;
  const stripped = deadlineStr.replace(/^Bid by\s*/i, "");
  const ts = Date.parse(stripped);
  if (isNaN(ts)) return null;
  const diff = ts - Date.now();
  return diff > 0 ? Math.floor(diff / 3600000) : 0;
}

const LOGO_COLORS = [
  { bg: "rgba(245,158,11,0.18)", color: "#F59E0B" },
  { bg: "rgba(99,102,241,0.18)", color: "#818cf8″ },
  { bg: "rgba(34,197,94,0.18)", color: "#4ade80″ },
  { bg: "rgba(239,68,68,0.18)", color: "#f87171″ },
  { bg: "rgba(14,165,233,0.18)", color: "#38bdf8″ },
  { bg: "rgba(168,85,247,0.18)", color: "#c084fc" },
  { bg: "rgba(251,146,60,0.18)", color: "#fb923c" },
];

function getLogoColor(name: string) {
  const idx = name.charCodeAt(0) % LOGO_COLORS.length;
  return LOGO_COLORS[idx];
}

function getInitials(name: string) {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length > 2 ? 2 : 1][0]).toUpperCase();
}

function CompanyLogo({ name, size = 40 }: { name: string; size?: number }) {
  const { bg, color } = getLogoColor(name);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        backgroundColor: bg,
        color,
        fontWeight: 700,
        fontSize: size * 0.35,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        letterSpacing: "0.03em",
        border: `1px solid ${color}30`,
      }}
    >
      {getInitials(name)}
    </div>
  );
}

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-4 pr-10 py-2.5 rounded-xl text-sm font-medium border cursor-pointer outline-none"
        style={{
          backgroundColor: "rgba(255,255,255,0.07)",
          borderColor: "rgba(255,255,255,0.15)",
          color: value === options[0] ? "rgba(255,255,255,0.5)" : "#fff",
        }}
      >
        {options.map((o) => (
          <option key={o} value={o} style={{ backgroundColor: "#0D1F3C" }}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
        style={{ color: "rgba(255,255,255,0.4)" }}
      />
    </div>
  );
}

const URGENCY_STYLES: Record<string, { bg: string; color: string; icon?: boolean }> = {
  Urgent: { bg: "rgba(239,68,68,0.12)", color: "#f87171″, icon: true },
  Active: { bg: "rgba(34,197,94,0.12)", color: "#4ade80″ },
  Ongoing: { bg: "rgba(99,102,241,0.15)", color: "#818cf8″ },
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  fontSize: "14px",
  color: "#fff",
  backgroundColor: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.15)",
  outline: "none",
  boxSizing: "border-box",
};

function BidModal({
  job,
  onClose,
  onSuccess,
}: {
  job: (typeof SEED_JOBS)[0];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");

  const submitBid = trpc.exchange.publicSubmitBid.useMutation({
    onSuccess: () => {
      onSuccess();
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullMessage = `Proposed Price: $${price}\nTimeline: ${timeline}\n\n${message}`;
    submitBid.mutate({ jobId: job.id, jobTitle: job.title, name, email, message: fullMessage });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4″
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-lg rounded-2xl border overflow-hidden"
        style={{ backgroundColor: "#0D1F3C", borderColor: "rgba(245,158,11,0.3)" }}
      >
        {/* Modal Header */}
        <div
          className="flex items-center gap-3 px-6 py-4 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <CompanyLogo name={job.posterType} size={36} />
          <div className="flex-1 min-w-0″>
            <h3 className="text-white font-bold text-sm leading-tight truncate">
              {job.title}
            </h3>
            <p className="text-xs mt-0.5″ style={{ color: "rgba(255,255,255,0.4)" }}>
              {job.posterType} &middot; {job.location}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-lg p-1 transition-colors hover:bg-white/10″
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <X className="w-5 h-5″ />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4″>
          {/* Name + Email row */}
          <div className="grid grid-cols-2 gap-3″>
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
                Email
              </label>
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Price + Timeline row */}
          <div className="grid grid-cols-2 gap-3″>
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
                Your Proposed Price ($)
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4″
                  style={{ color: "rgba(255,255,255,0.35)" }}
                />
                <input
                  type="number"
                  required
                  min={0}
                  placeholder="0″
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: "34px" }}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
                Timeline
              </label>
              <div className="relative">
                <select
                  required
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  style={{
                    ...inputStyle,
                    appearance: "none",
                    cursor: "pointer",
                    color: timeline ? "#fff" : "rgba(255,255,255,0.35)",
                    paddingRight: "34px",
                  }}
                >
                  <option value="" disabled style={{ backgroundColor: "#0D1F3C" }}>Select</option>
                  {TIMELINE_OPTIONS.map((t) => (
                    <option key={t} value={t} style={{ backgroundColor: "#0D1F3C" }}>{t}</option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
              Message to Poster
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe your experience, approach, and why you're the right fit for this project..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {submitBid.error && (
            <p className="text-xs text-red-400″>{submitBid.error.message || "Submission failed. Please try again."}</p>
          )}

          <button
            type="submit"
            disabled={submitBid.isPending}
            className="w-full py-3 rounded-xl text-sm font-bold text-[#0A1628] transition-all hover:opacity-90 disabled:opacity-60″
            style={{ backgroundColor: "#F59E0B" }}
          >
            {submitBid.isPending ? "Submitting..." : "Submit Bid"}
          </button>
          <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
            Bidding opens Q3 2026 — we'll follow up when it’s live.
          </p>
        </form>
      </div>
    </div>
  );
}

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-xl shadow-2xl"
      style={{ backgroundColor: "#10b981″, color: "#fff", fontWeight: 600, fontSize: "14px", minWidth: "280px" }}
    >
      <CheckCircle className="w-5 h-5 flex-shrink-0″ />
      <span>{message}</span>
      <button onClick={onDone} className="ml-auto opacity-70 hover:opacity-100″>
        <X className="w-4 h-4″ />
      </button>
    </div>
  );
}

function JobCard({
  job,
  onBidSubmitted,
  saved,
  onToggleSave,
}: {
  job: (typeof SEED_JOBS)[0];
  onBidSubmitted: () => void;
  saved: boolean;
  onToggleSave: () => void;
}) {
  const [expressed, setExpressed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const urgencyStyle = URGENCY_STYLES[job.urgency] ?? URGENCY_STYLES.Active;
  const hoursLeft = hoursUntilDeadline(job.deadline);
  const isNewLead = job.postedDaysAgo === 0;

  const postedLabel =
    job.postedDaysAgo === 0
      ? "Today"
      : job.postedDaysAgo === 1
      ? "1 day ago"
      : `${job.postedDaysAgo} days ago`;

  return (
    <>
      {showModal && (
        <BidModal
          job={job}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setExpressed(true);
            setShowToast(true);
            onBidSubmitted();
          }}
        />
      )}
      {showToast && (
        <Toast
          message="Your bid has been submitted! The poster will be in touch."
          onDone={() => setShowToast(false)}
        />
      )}
      <div
        className="rounded-2xl p-6 border transition-all hover:border-amber-500/30 overflow-hidden relative"
        style={{
          backgroundColor: "rgba(255,255,255,0.04)",
          borderColor: isNewLead
            ? "rgba(34,197,94,0.25)"
            : job.urgency === "Urgent"
            ? "rgba(239,68,68,0.2)"
            : "rgba(255,255,255,0.1)",
        }}
      >
        {/* Left border accent */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
          style={{
            backgroundColor: isNewLead
              ? "#4ade80″
              : job.urgency === "Urgent"
              ? "#ef4444″
              : job.urgency === "Active"
              ? "#f59e0b"
              : "#6366f1″,
          }}
        />

        {/* Top row: logo + title + badges */}
        <div className="flex items-start gap-3 mb-3″>
          <CompanyLogo name={job.posterType} size={42} />
          <div className="flex-1 min-w-0″>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              {isNewLead && (
                <span
                  className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full animate-pulse"
                  style={{ backgroundColor: "rgba(34,197,94,0.2)", color: "#4ade80″ }}
                >
                  ● New Lead
                </span>
              )}
              <span
                className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: urgencyStyle.bg, color: urgencyStyle.color }}
              >
                {urgencyStyle.icon && <Zap className="w-3 h-3″ />}
                {job.urgency}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full border"
                style={{
                  borderColor: "rgba(245,158,11,0.3)",
                  color: "#F59E0B",
                  backgroundColor: "rgba(245,158,11,0.08)",
                }}
              >
                {job.trade}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {job.size}
              </span>
            </div>
            <h3 className="text-white font-bold text-base leading-tight">
              {job.title}
            </h3>
          </div>

          {/* Right side: countdown + stats */}
          <div className="flex-shrink-0 text-right hidden sm:flex flex-col items-end gap-1.5″>
            {hoursLeft !== null && hoursLeft <= 168 && (
              <span
                className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "rgba(239,68,68,0.15)", color: "#f87171″ }}
              >
                <Clock className="w-3 h-3″ />
                {hoursLeft < 1 ? "Closing now" : `${hoursLeft}h left`}
              </span>
            )}
            <div
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)" }}
            >
              <Users className="w-3.5 h-3.5″ />
              {job.applicants} applicant{job.applicants !== 1 ? "s" : ""}
            </div>
            <div
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}
            >
              <Eye className="w-3 h-3″ />
              {job.views} viewed
            </div>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              Posted {postedLabel}
            </span>
          </div>
        </div>

        <p
          className="text-sm leading-relaxed mb-4″
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {job.description}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5″>
          <div className="flex items-center gap-1.5″>
            <Building2
              className="w-3.5 h-3.5 flex-shrink-0″
              style={{ color: "rgba(255,255,255,0.35)" }}
            />
            <span className="text-xs truncate" style={{ color: "rgba(255,255,255,0.5)" }}>
              {job.posterType}
            </span>
          </div>
          <div className="flex items-center gap-1.5″>
            <MapPin
              className="w-3.5 h-3.5 flex-shrink-0″
              style={{ color: "rgba(255,255,255,0.35)" }}
            />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              {job.location}
              {job.distanceMiles != null && (
                <span className="ml-1.5 text-xs font-medium" style={{ color: "#F59E0B" }}>
                  · {job.distanceMiles} mi away
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-1.5″>
            <DollarSign
              className="w-3.5 h-3.5 flex-shrink-0″
              style={{ color: "rgba(255,255,255,0.35)" }}
            />
            <span className="text-xs font-semibold text-white">{job.budget}</span>
          </div>
          <div className="flex items-center gap-1.5″>
            <Clock
              className="w-3.5 h-3.5 flex-shrink-0″
              style={{ color: "rgba(255,255,255,0.35)" }}
            />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              {job.deadline}
            </span>
          </div>
        </div>

        {/* Mobile: applicants + views + posted */}
        <div className="flex items-center gap-3 mb-4 sm:hidden flex-wrap">
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
          >
            <Users className="w-3.5 h-3.5″ />
            {job.applicants} applicant{job.applicants !== 1 ? "s" : ""}
          </span>
          <span
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}
          >
            <Eye className="w-3 h-3″ />
            {job.views} viewed
          </span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            Posted {postedLabel}
          </span>
        </div>

        <div className="flex items-center gap-3″>
          <button
            onClick={() => !expressed && setShowModal(true)}
            disabled={expressed}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all inline-flex items-center justify-center gap-2″
            style={{
              backgroundColor: expressed
                ? "rgba(34,197,94,0.12)"
                : "rgba(245,158,11,0.15)",
              color: expressed ? "#4ade80″ : "#F59E0B",
              border: `1px solid ${expressed ? "rgba(34,197,94,0.25)" : "rgba(245,158,11,0.3)"}`,
              cursor: expressed ? "default" : "pointer",
            }}
          >
            {expressed ? (
              <>
                <CheckCircle className="w-4 h-4″ />
                Bid Submitted — We'll Follow Up
              </>
            ) : (
              <>Quick Apply — Submit Bid</>
            )}
          </button>
          <button
            onClick={onToggleSave}
            title={saved ? "Remove from saved" : "Save job"}
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110″
            style={{
              backgroundColor: saved ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${saved ? "rgba(245,158,11,0.35)" : "rgba(255,255,255,0.12)"}`,
              color: saved ? "#F59E0B" : "rgba(255,255,255,0.4)",
            }}
          >
            {saved ? <BookmarkCheck className="w-4 h-4″ /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </>
  );
}

function MyBidsBar({ activeBids, awaitingResponse }: { activeBids: number; awaitingResponse: number }) {
  return (
    <div
      className="max-w-6xl mx-auto px-6 mb-6″
    >
      <div
        className="flex flex-wrap items-center gap-4 px-5 py-4 rounded-2xl border"
        style={{
          backgroundColor: "rgba(245,158,11,0.06)",
          borderColor: "rgba(245,158,11,0.2)",
        }}
      >
        <div className="flex items-center gap-2″>
          <TrendingUp className="w-4 h-4 text-amber-400″ />
          <span className="text-sm font-bold text-white">Your Active Bids</span>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2″>
            <span
              className="text-lg font-bold"
              style={{ color: "#F59E0B" }}
            >
              {activeBids}
            </span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              active
            </span>
          </div>
          <div
            className="w-px h-4 hidden sm:block"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
          />
          <div className="flex items-center gap-2″>
            <span
              className="text-lg font-bold"
              style={{ color: "#818cf8″ }}
            >
              {awaitingResponse}
            </span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              awaiting response
            </span>
          </div>
        </div>
        <Link href="/exchange/my-bids">
          <button
            className="ml-auto flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            style={{
              color: "#F59E0B",
              backgroundColor: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.2)",
            }}
          >
            <Eye className="w-3.5 h-3.5″ />
            Manage Bids
          </button>
        </Link>
      </div>
    </div>
  );
}

function parseBudgetMax(budget: string): number {
  const nums = budget.replace(/[^0-9,]/g, " ").trim().split(/\s+/).map((n) => Number(n.replace(/,/g, "")));
  return nums.length > 0 ? Math.max(...nums.filter(Boolean)) : 0;
}

export default function ExchangeJobs() {
  const [tradeFilter, setTradeFilter] = useState("All Trades");
  const [sizeFilter, setSizeFilter] = useState("All Sizes");
  const [urgencyFilter, setUrgencyFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("Newest");
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());
  const [myBidsCount, setMyBidsCount] = useState(0);

  const toggleSave = (id: number) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const base = SEED_JOBS.filter((j) => {
      if (tradeFilter !== "All Trades" && j.trade !== tradeFilter) return false;
      if (sizeFilter !== "All Sizes" && j.size !== sizeFilter) return false;
      if (urgencyFilter !== "All" && j.urgency !== urgencyFilter) return false;
      if (cityFilter && !j.location.toLowerCase().includes(cityFilter.toLowerCase())) return false;
      return true;
    });

    return [...base].sort((a, b) => {
      if (sortBy === "Newest") return a.postedDaysAgo - b.postedDaysAgo;
      if (sortBy === "Highest Budget") return parseBudgetMax(b.budget) - parseBudgetMax(a.budget);
      if (sortBy === "Most Bids") return b.applicants - a.applicants;
      if (sortBy === "Closing Soon") {
        const ha = hoursUntilDeadline(a.deadline) ?? Infinity;
        const hb = hoursUntilDeadline(b.deadline) ?? Infinity;
        return ha - hb;
      }
      return 0;
    });
  }, [tradeFilter, sizeFilter, urgencyFilter, cityFilter, sortBy]);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#0A1628″,
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
        <div className="flex items-center gap-4″>
          <Link href="/exchange">
            <span
              className="text-sm cursor-pointer transition-colors"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Exchange Home
            </span>
          </Link>
          <Link href="/exchange/post">
            <button
              className="px-4 py-2 rounded-xl text-sm font-semibold text-[#0A1628] transition-all hover:opacity-90″
              style={{ backgroundColor: "#F59E0B" }}
            >
              Post a Job
            </button>
          </Link>
        </div>
      </nav>

      {/* Coming Soon Banner */}
      <div
        className="text-center py-2.5 text-xs font-semibold tracking-wider"
        style={{ backgroundColor: "#F59E0B", color: "#0A1628″ }}
      >
        COMING Q3 2026 &nbsp;·&nbsp; JOIN THE WAITLIST TO BE FIRST &nbsp;·&nbsp; PREVIEW LISTINGS BELOW
      </div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-8″>
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border"
              style={{
                backgroundColor: "rgba(245,158,11,0.1)",
                color: "#F59E0B",
                borderColor: "rgba(245,158,11,0.3)",
              }}
            >
              <Briefcase className="w-3.5 h-3.5″ />
              ProLnk Exchange — Commercial Work Network
            </div>
            <div className="flex items-center gap-3 mb-2″>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Commercial Job Board
              </h1>
              <span
                className="hidden md:inline-flex items-center px-3 py-1 rounded-full text-sm font-bold"
                style={{ backgroundColor: "rgba(245,158,11,0.15)", color: "#F59E0B" }}
              >
                {SEED_JOBS.length} Jobs
              </span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-sm">
              High-value contracts from property managers, HOAs, and GCs across DFW.
              <span className="ml-1″ style={{ color: "#F59E0B" }}>
                Bidding opens Q3 2026.
              </span>
            </p>
            <div className="flex items-center gap-4 mt-4″>
              <div className="flex items-center gap-1.5″>
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(239,68,68,0.12)", color: "#f87171″ }}
                >
                  <Zap className="w-3 h-3″ /> Urgent
                </span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>— deadline within 2 weeks</span>
              </div>
              <div className="flex items-center gap-1.5″>
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(99,102,241,0.15)", color: "#818cf8″ }}
                >
                  Ongoing
                </span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>— recurring contract</span>
              </div>
            </div>
          </div>
          <Link href="/exchange/post">
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#0A1628] transition-all hover:scale-105″
              style={{
                backgroundColor: "#F59E0B",
                boxShadow: "0 4px 20px rgba(245,158,11,0.3)",
              }}
            >
              Post a Job <ArrowRight className="w-4 h-4″ />
            </button>
          </Link>
        </div>
      </section>

      {/* My Bids Bar — shown when user has submitted at least one bid */}
      {myBidsCount > 0 && (
        <MyBidsBar activeBids={myBidsCount} awaitingResponse={myBidsCount} />
      )}

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-6 pb-6″>
        <div
          className="flex flex-wrap gap-3 items-center p-4 rounded-2xl border"
          style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="flex items-center gap-2 mr-1″
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <Filter className="w-4 h-4″ />
            <span className="text-xs font-medium">Filter</span>
          </div>
          <FilterDropdown
            label="Trade"
            options={TRADE_CATEGORIES}
            value={tradeFilter}
            onChange={setTradeFilter}
          />
          <FilterDropdown
            label="Size"
            options={PROJECT_SIZES}
            value={sizeFilter}
            onChange={setSizeFilter}
          />
          <FilterDropdown
            label="Urgency"
            options={URGENCY_OPTIONS}
            value={urgencyFilter}
            onChange={setUrgencyFilter}
          />
          <input
            type="text"
            placeholder="City (e.g. Plano)"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm border outline-none"
            style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              borderColor: "rgba(255,255,255,0.15)",
              color: "#fff",
              minWidth: "160px",
            }}
          />
          {(tradeFilter !== "All Trades" ||
            sizeFilter !== "All Sizes" ||
            urgencyFilter !== "All" ||
            cityFilter) && (
            <button
              onClick={() => {
                setTradeFilter("All Trades");
                setSizeFilter("All Sizes");
                setUrgencyFilter("All");
                setCityFilter("");
              }}
              className="text-xs px-3 py-2 rounded-lg transition-colors"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Clear
            </button>
          )}
          <div className="ml-auto flex items-center gap-2″>
            <ArrowUpDown className="w-3.5 h-3.5″ style={{ color: "rgba(255,255,255,0.4)" }} />
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none pl-3 pr-8 py-2 rounded-xl text-xs font-medium border cursor-pointer outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o} value={o} style={{ backgroundColor: "#0D1F3C" }}>{o}</option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                style={{ color: "rgba(255,255,255,0.4)" }}
              />
            </div>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              {filtered.length} job{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* Job Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-12″>
        {filtered.length === 0 ? (
          <div
            className="text-center py-16 rounded-2xl border"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <p className="text-white/40 text-sm">No jobs match your filters.</p>
            <button
              onClick={() => {
                setTradeFilter("All Trades");
                setSizeFilter("All Sizes");
                setCityFilter("");
              }}
              className="mt-3 text-amber-400 text-sm underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4″>
            {filtered.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onBidSubmitted={() => setMyBidsCount((n) => n + 1)}
                saved={savedJobs.has(job.id)}
                onToggleSave={() => toggleSave(job.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Waitlist CTA */}
      <section className="max-w-2xl mx-auto px-6 pb-20 text-center">
        <div
          className="rounded-2xl p-8 border"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            borderColor: "rgba(245,158,11,0.25)",
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4″
            style={{ backgroundColor: "rgba(245,158,11,0.12)" }}
          >
            <Bell className="w-6 h-6 text-amber-400″ />
          </div>
          <h2 className="text-white font-bold text-xl mb-2″>
            Bidding opens Q3 2026
          </h2>
          <p
            className="text-sm mb-5″
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Get early access to submit bids before the platform opens to the
            public. First 100 commercial contractors get founding-member rates.
          </p>
          <Link href="/exchange">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#0A1628] transition-all hover:opacity-90″
              style={{ backgroundColor: "#F59E0B" }}
            >
              Join the Waitlist <ArrowRight className="w-4 h-4″ />
            </button>
          </Link>
        </div>
      </section>

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

      {/* Floating Post a Job FAB */}
      <Link href="/exchange/post-job">
        <button
          className="fixed bottom-7 right-7 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-sm font-bold text-[#0A1628] shadow-2xl transition-all hover:scale-105 active:scale-95″
          style={{
            backgroundColor: "#F59E0B",
            boxShadow: "0 8px 32px rgba(245,158,11,0.45)",
          }}
        >
          <Briefcase className="w-4 h-4″ />
          Post a Job
        </button>
      </Link>
    </div>
  );
}
