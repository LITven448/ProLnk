import React from 'react';
import { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  Search, Star, MapPin, Briefcase, Clock, TrendingUp,
  CheckCircle, Filter, ChevronDown, Users, Send,
  ArrowRight, BadgeCheck,
} from "lucide-react";

const TRADE_OPTIONS = [
  "All Trades",
  "HVAC",
  "Roofing",
  "Electrical",
  "Plumbing",
  "General Contractor",
  "Painting",
  "Flooring",
  "Landscaping",
];

const LOCATION_OPTIONS = [
  "All Locations",
  "Dallas, TX",
  "Plano, TX",
  "Frisco, TX",
  "McKinney, TX",
  "Irving, TX",
  "Garland, TX",
  "Allen, TX",
];

const MIN_JOBS_OPTIONS = ["Any", "10+", "25+", "50+", "100+"];
const MIN_RATING_OPTIONS = ["Any Rating", "4.0+", "4.5+", "4.8+"];

const CONTRACTORS = [
  {
    id: 1,
    name: "Lone Star HVAC Services",
    contact: "Carlos Mendoza",
    trade: "HVAC",
    location: "Plano, TX",
    rating: 4.9,
    reviews: 87,
    jobsCompleted: 134,
    bidWinRate: 68,
    responseTime: "< 2 hrs",
    verified: true,
    tags: ["Commercial Multi-Family", "Chiller Systems", "Emergency Response"],
  },
  {
    id: 2,
    name: "Apex Roofing & Restoration",
    contact: "Marcus Trevino",
    trade: "Roofing",
    location: "Garland, TX",
    rating: 4.8,
    reviews: 112,
    jobsCompleted: 198,
    bidWinRate: 54,
    responseTime: "< 4 hrs",
    verified: true,
    tags: ["TPO/EPDM", "Insurance Claims", "HOA Experience"],
  },
  {
    id: 3,
    name: "Premier Electrical Group",
    contact: "Diana Robles",
    trade: "Electrical",
    location: "Irving, TX",
    rating: 4.7,
    reviews: 64,
    jobsCompleted: 89,
    bidWinRate: 61,
    responseTime: "< 3 hrs",
    verified: true,
    tags: ["3-Phase Industrial", "Permit Pull", "Panel Upgrades"],
  },
  {
    id: 4,
    name: "Keystone Plumbing Solutions",
    contact: "Ray Hutchinson",
    trade: "Plumbing",
    location: "Frisco, TX",
    rating: 4.6,
    reviews: 43,
    jobsCompleted: 57,
    bidWinRate: 49,
    responseTime: "< 6 hrs",
    verified: false,
    tags: ["Grease Traps", "Backflow", "Multi-Location"],
  },
  {
    id: 5,
    name: "Summit General Contracting",
    contact: "James Kowalski",
    trade: "General Contractor",
    location: "McKinney, TX",
    rating: 4.9,
    reviews: 156,
    jobsCompleted: 242,
    bidWinRate: 71,
    responseTime: "< 2 hrs",
    verified: true,
    tags: ["Property Management", "Multi-Family", "Recurring Contracts"],
  },
  {
    id: 6,
    name: "Precision Interiors & Paint",
    contact: "Sarah Nguyen",
    trade: "Painting",
    location: "Allen, TX",
    rating: 4.8,
    reviews: 78,
    jobsCompleted: 103,
    bidWinRate: 58,
    responseTime: "< 4 hrs",
    verified: true,
    tags: ["Elastomeric", "Office Parks", "Scaffolding Certified"],
  },
  {
    id: 7,
    name: "FloorMasters DFW",
    contact: "Tony Albright",
    trade: "Flooring",
    location: "Dallas, TX",
    rating: 4.5,
    reviews: 29,
    jobsCompleted: 38,
    bidWinRate: 44,
    responseTime: "< 8 hrs",
    verified: false,
    tags: ["LVP", "Carpet Tile", "Corporate HQ"],
  },
  {
    id: 8,
    name: "Greenscape Commercial Landscaping",
    contact: "Elena Vásquez",
    trade: "Landscaping",
    location: "Frisco, TX",
    rating: 4.7,
    reviews: 61,
    jobsCompleted: 74,
    bidWinRate: 62,
    responseTime: "< 4 hrs",
    verified: true,
    tags: ["ISA Arborist", "Irrigation", "HOA Communities"],
  },
];

const LOGO_COLORS = [
  { bg: "rgba(245,158,11,0.18)", color: "#F59E0B" },
  { bg: "rgba(99,102,241,0.18)", color: "#818cf8″ },
  { bg: "rgba(34,197,94,0.18)", color: "#4ade80″ },
  { bg: "rgba(239,68,68,0.18)", color: "#f87171″ },
  { bg: "rgba(14,165,233,0.18)", color: "#38bdf8″ },
  { bg: "rgba(168,85,247,0.18)", color: "#c084fc" },
  { bg: "rgba(251,146,60,0.18)", color: "#fb923c" },
  { bg: "rgba(20,184,166,0.18)", color: "#2dd4bf" },
];

function getLogoStyle(id: number) {
  return LOGO_COLORS[id % LOGO_COLORS.length];
}

function getInitials(name: string) {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + (words[words.length > 2 ? 2 : 1][0])).toUpperCase();
}

function parseMinJobs(option: string): number {
  if (option === "Any") return 0;
  return parseInt(option.replace(/\D/g, ""), 10) || 0;
}

function parseMinRating(option: string): number {
  if (option === "Any Rating") return 0;
  return parseFloat(option.replace(/[^0-9.]/g, "")) || 0;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5″>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-white/20"}`}
        />
      ))}
    </div>
  );
}

function InviteModal({
  contractor,
  onClose,
}: {
  contractor: (typeof CONTRACTORS)[0];
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [message, setMessage] = useState("");
  const logoStyle = getLogoStyle(contractor.id);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4″
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-md rounded-2xl border overflow-hidden"
        style={{ backgroundColor: "#0D1F3C", borderColor: "rgba(245,158,11,0.3)" }}
      >
        <div
          className="flex items-center gap-3 px-6 py-4 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0″
            style={{ backgroundColor: logoStyle.bg, color: logoStyle.color }}
          >
            {getInitials(contractor.name)}
          </div>
          <div className="flex-1 min-w-0″>
            <p className="text-white font-bold text-sm truncate">{contractor.name}</p>
            <p className="text-xs mt-0.5″ style={{ color: "rgba(255,255,255,0.4)" }}>
              {contractor.trade} · {contractor.location}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white/70 transition-colors text-lg font-light leading-none"
          >
            ✕
          </button>
        </div>

        {sent ? (
          <div className="p-8 text-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4″
              style={{ backgroundColor: "rgba(34,197,94,0.12)" }}
            >
              <CheckCircle className="w-7 h-7 text-emerald-400″ />
            </div>
            <h3 className="text-white font-bold text-lg mb-2″>Invite Sent!</h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              {contractor.contact} will be notified about your job. Expect a response within {contractor.responseTime}.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl text-sm font-bold text-[#0A1628]"
              style={{ backgroundColor: "#F59E0B" }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-6 space-y-4″>
            <div>
              <label
                className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Job Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. HVAC Overhaul — 50-Unit Complex"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="Briefly describe the project scope, budget range, and timeline..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none resize-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-bold text-[#0A1628] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#F59E0B" }}
            >
              <Send className="w-4 h-4″ />
              Send Invite to Bid
            </button>
            <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
              Invites open Q3 2026 — we'll notify {contractor.contact} when bidding goes live.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function ContractorCard({ contractor }: { contractor: (typeof CONTRACTORS)[0] }) {
  const [inviting, setInviting] = useState(false);
  const logoStyle = getLogoStyle(contractor.id);

  return (
    <>
      {inviting && (
        <InviteModal contractor={contractor} onClose={() => setInviting(false)} />
      )}
      <div
        className="rounded-2xl p-6 border transition-all hover:border-amber-500/30 flex flex-col gap-4″
        style={{
          backgroundColor: "rgba(255,255,255,0.04)",
          borderColor: "rgba(255,255,255,0.1)",
        }}
      >
        {/* Header row */}
        <div className="flex items-start gap-3″>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold flex-shrink-0″
            style={{ backgroundColor: logoStyle.bg, color: logoStyle.color }}
          >
            {getInitials(contractor.name)}
          </div>
          <div className="flex-1 min-w-0″>
            <div className="flex items-center gap-1.5 flex-wrap mb-0.5″>
              <h3 className="text-white font-bold text-sm leading-tight">{contractor.name}</h3>
              {contractor.verified && (
                <BadgeCheck className="w-4 h-4 flex-shrink-0″ style={{ color: "#38bdf8" }} />
              )}
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              {contractor.contact}
            </p>
          </div>
        </div>

        {/* Meta pills */}
        <div className="flex flex-wrap gap-2″>
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border"
            style={{
              backgroundColor: "rgba(245,158,11,0.08)",
              borderColor: "rgba(245,158,11,0.25)",
              color: "#F59E0B",
            }}
          >
            <Briefcase className="w-3 h-3″ />
            {contractor.trade}
          </span>
          <span
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)" }}
          >
            <MapPin className="w-3 h-3″ />
            {contractor.location}
          </span>
          <span
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)" }}
          >
            <Clock className="w-3 h-3″ />
            {contractor.responseTime}
          </span>
        </div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-3 gap-3 py-4 border-y"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="text-center">
            <p className="text-white font-bold text-base">{contractor.jobsCompleted}</p>
            <p className="text-xs mt-0.5″ style={{ color: "rgba(255,255,255,0.35)" }}>Jobs Done</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-base" style={{ color: "#4ade80″ }}>
              {contractor.bidWinRate}%
            </p>
            <p className="text-xs mt-0.5″ style={{ color: "rgba(255,255,255,0.35)" }}>Win Rate</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-0.5″>
              <StarRating rating={contractor.rating} />
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              {contractor.rating} ({contractor.reviews})
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5″>
          {contractor.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => setInviting(true)}
          className="w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90″
          style={{
            backgroundColor: "rgba(245,158,11,0.12)",
            color: "#F59E0B",
            border: "1px solid rgba(245,158,11,0.25)",
          }}
        >
          <Send className="w-4 h-4″ />
          Invite to Bid
        </button>
      </div>
    </>
  );
}

export default function ExchangeContractors() {
  const [search, setSearch] = useState("");
  const [tradeFilter, setTradeFilter] = useState("All Trades");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [minJobsFilter, setMinJobsFilter] = useState("Any");
  const [minRatingFilter, setMinRatingFilter] = useState("Any Rating");

  const filtered = useMemo(() => {
    return CONTRACTORS.filter((c) => {
      const q = search.toLowerCase();
      if (q && !c.name.toLowerCase().includes(q) && !c.trade.toLowerCase().includes(q) && !c.contact.toLowerCase().includes(q)) return false;
      if (tradeFilter !== "All Trades" && c.trade !== tradeFilter) return false;
      if (locationFilter !== "All Locations" && c.location !== locationFilter) return false;
      if (c.jobsCompleted < parseMinJobs(minJobsFilter)) return false;
      if (c.rating < parseMinRating(minRatingFilter)) return false;
      return true;
    });
  }, [search, tradeFilter, locationFilter, minJobsFilter, minRatingFilter]);

  const hasFilters =
    search ||
    tradeFilter !== "All Trades" ||
    locationFilter !== "All Locations" ||
    minJobsFilter !== "Any" ||
    minRatingFilter !== "Any Rating";

  const clearFilters = () => {
    setSearch("");
    setTradeFilter("All Trades");
    setLocationFilter("All Locations");
    setMinJobsFilter("Any");
    setMinRatingFilter("Any Rating");
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0A1628″, fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 max-w-6xl mx-auto">
        <Link href="/">
          <span className="text-white font-bold text-lg tracking-tight cursor-pointer">ProLnk</span>
        </Link>
        <div className="flex items-center gap-4″>
          <Link href="/exchange/jobs">
            <span className="text-sm cursor-pointer transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
              Browse Jobs
            </span>
          </Link>
          <Link href="/exchange/home">
            <span className="text-sm cursor-pointer transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
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
        COMING Q3 2026 &nbsp;·&nbsp; PREVIEW CONTRACTOR DIRECTORY &nbsp;·&nbsp; DFW LAUNCH
      </div>

      {/* Page Header */}
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
              <Users className="w-3.5 h-3.5″ />
              Contractor Directory
            </div>
            <div className="flex items-center gap-3 mb-2″>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Find Contractors</h1>
              <span
                className="hidden md:inline-flex items-center px-3 py-1 rounded-full text-sm font-bold"
                style={{ backgroundColor: "rgba(245,158,11,0.15)", color: "#F59E0B" }}
              >
                {CONTRACTORS.length} Listed
              </span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-sm max-w-xl">
              Browse verified commercial contractors across DFW. Filter by trade, location, jobs completed, and rating — then invite the right fit to bid on your job.
            </p>
          </div>
          <div className="flex items-center gap-2″>
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
              style={{ backgroundColor: "rgba(14,165,233,0.1)", color: "#38bdf8″, border: "1px solid rgba(14,165,233,0.2)" }}
            >
              <BadgeCheck className="w-3.5 h-3.5″ />
              Verified badge = license confirmed
            </div>
          </div>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="max-w-6xl mx-auto px-6 pb-8″>
        <div
          className="flex flex-wrap gap-3 items-center p-4 rounded-2xl border"
          style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4″
              style={{ color: "rgba(255,255,255,0.35)" }}
            />
            <input
              type="text"
              placeholder="Search contractor name or trade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none"
              style={{
                backgroundColor: "rgba(255,255,255,0.07)",
                borderColor: "rgba(255,255,255,0.15)",
                color: "#fff",
              }}
            />
          </div>

          <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            <Filter className="w-4 h-4″ />
          </div>

          {/* Trade filter */}
          <div className="relative">
            <select
              value={tradeFilter}
              onChange={(e) => setTradeFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 rounded-xl text-sm font-medium border cursor-pointer outline-none"
              style={{
                backgroundColor: "rgba(255,255,255,0.07)",
                borderColor: "rgba(255,255,255,0.15)",
                color: tradeFilter === "All Trades" ? "rgba(255,255,255,0.5)" : "#fff",
              }}
            >
              {TRADE_OPTIONS.map((o) => (
                <option key={o} value={o} style={{ backgroundColor: "#0D1F3C" }}>{o}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgba(255,255,255,0.4)" }} />
          </div>

          {/* Location filter */}
          <div className="relative">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 rounded-xl text-sm font-medium border cursor-pointer outline-none"
              style={{
                backgroundColor: "rgba(255,255,255,0.07)",
                borderColor: "rgba(255,255,255,0.15)",
                color: locationFilter === "All Locations" ? "rgba(255,255,255,0.5)" : "#fff",
              }}
            >
              {LOCATION_OPTIONS.map((o) => (
                <option key={o} value={o} style={{ backgroundColor: "#0D1F3C" }}>{o}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgba(255,255,255,0.4)" }} />
          </div>

          {/* Min jobs filter */}
          <div className="relative">
            <select
              value={minJobsFilter}
              onChange={(e) => setMinJobsFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 rounded-xl text-sm font-medium border cursor-pointer outline-none"
              style={{
                backgroundColor: "rgba(255,255,255,0.07)",
                borderColor: "rgba(255,255,255,0.15)",
                color: minJobsFilter === "Any" ? "rgba(255,255,255,0.5)" : "#fff",
              }}
            >
              {MIN_JOBS_OPTIONS.map((o) => (
                <option key={o} value={o} style={{ backgroundColor: "#0D1F3C" }}>Min Jobs: {o}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgba(255,255,255,0.4)" }} />
          </div>

          {/* Min rating filter */}
          <div className="relative">
            <select
              value={minRatingFilter}
              onChange={(e) => setMinRatingFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 rounded-xl text-sm font-medium border cursor-pointer outline-none"
              style={{
                backgroundColor: "rgba(255,255,255,0.07)",
                borderColor: "rgba(255,255,255,0.15)",
                color: minRatingFilter === "Any Rating" ? "rgba(255,255,255,0.5)" : "#fff",
              }}
            >
              {MIN_RATING_OPTIONS.map((o) => (
                <option key={o} value={o} style={{ backgroundColor: "#0D1F3C" }}>{o}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgba(255,255,255,0.4)" }} />
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-xs px-3 py-2 rounded-lg transition-colors"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Clear
            </button>
          )}

          <span className="ml-auto text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            {filtered.length} contractor{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* Contractor Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-16″>
        {filtered.length === 0 ? (
          <div
            className="text-center py-16 rounded-2xl border"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <p className="text-white/40 text-sm mb-3″>No contractors match your filters.</p>
            <button onClick={clearFilters} className="text-amber-400 text-sm underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4″>
            {filtered.map((c) => (
              <ContractorCard key={c.id} contractor={c} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
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
            <TrendingUp className="w-6 h-6 text-amber-400″ />
          </div>
          <h2 className="text-white font-bold text-xl mb-2″>Are you a contractor?</h2>
          <p className="text-sm mb-5″ style={{ color: "rgba(255,255,255,0.5)" }}>
            Get listed in the directory and start receiving invites from property managers, HOAs, and GCs before bidding opens in Q3 2026.
          </p>
          <Link href="/signup/pro">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#0A1628] transition-all hover:opacity-90″
              style={{ backgroundColor: "#F59E0B" }}
            >
              Apply as a Contractor <ArrowRight className="w-4 h-4″ />
            </button>
          </Link>
        </div>
      </section>

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
