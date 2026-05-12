import { useState } from "react";
import { Link } from "wouter";
import {
  Briefcase, MapPin, DollarSign, Clock, Filter, ChevronDown,
  ArrowRight, Building2, Users, Bell,
} from "lucide-react";

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

const SEED_JOBS = [
  {
    id: 1,
    title: "4-Unit Apartment HVAC Replacement",
    posterType: "Property Manager",
    location: "Plano, TX",
    budget: "$45,000",
    deadline: "Bid by May 30",
    trade: "HVAC",
    size: "$25K–$100K",
    description:
      "Full system replacement across 4 residential units. Includes new air handlers, condensers, and ductwork inspection. All units must be completed within a 3-week window.",
    urgency: "Active",
  },
  {
    id: 2,
    title: "Commercial Roof Replacement — 8,000 sq ft",
    posterType: "HOA",
    location: "McKinney, TX",
    budget: "$120,000",
    deadline: "Bid by Jun 15",
    trade: "Roofing",
    size: "$100K+",
    description:
      "Full tear-off and replacement of flat commercial roof on a 12-unit HOA clubhouse and attached structures. TPO membrane preferred. Certified roofing contractors only.",
    urgency: "Active",
  },
  {
    id: 3,
    title: "Multi-building Landscaping Contract",
    posterType: "Property Manager",
    location: "Frisco, TX",
    budget: "$8,000/mo",
    deadline: "Ongoing",
    trade: "Landscaping",
    size: "$5K–$25K",
    description:
      "Monthly landscape maintenance for a 200-unit apartment complex. Includes mowing, edging, irrigation management, seasonal color rotations, and light tree work. 12-month contract.",
    urgency: "Ongoing",
  },
];

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

function JobCard({ job }: { job: (typeof SEED_JOBS)[0] }) {
  const [expressed, setExpressed] = useState(false);

  return (
    <div
      className="rounded-2xl p-6 border transition-all hover:border-amber-500/30"
      style={{
        backgroundColor: "rgba(255,255,255,0.04)",
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor:
                  job.urgency === "Ongoing"
                    ? "rgba(99,102,241,0.15)"
                    : "rgba(34,197,94,0.12)",
                color: job.urgency === "Ongoing" ? "#818cf8" : "#4ade80",
              }}
            >
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
          </div>
          <h3 className="text-white font-bold text-base leading-tight">
            {job.title}
          </h3>
        </div>
      </div>

      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        {job.description}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="flex items-center gap-1.5">
          <Building2
            className="w-3.5 h-3.5 flex-shrink-0"
            style={{ color: "rgba(255,255,255,0.35)" }}
          />
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            {job.posterType}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin
            className="w-3.5 h-3.5 flex-shrink-0"
            style={{ color: "rgba(255,255,255,0.35)" }}
          />
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            {job.location}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <DollarSign
            className="w-3.5 h-3.5 flex-shrink-0"
            style={{ color: "rgba(255,255,255,0.35)" }}
          />
          <span className="text-xs font-semibold text-white">{job.budget}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock
            className="w-3.5 h-3.5 flex-shrink-0"
            style={{ color: "rgba(255,255,255,0.35)" }}
          />
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            {job.deadline}
          </span>
        </div>
      </div>

      <button
        onClick={() => setExpressed(true)}
        disabled={expressed}
        className="w-full py-2.5 rounded-xl text-sm font-bold transition-all"
        style={{
          backgroundColor: expressed
            ? "rgba(34,197,94,0.12)"
            : "rgba(245,158,11,0.15)",
          color: expressed ? "#4ade80" : "#F59E0B",
          border: `1px solid ${expressed ? "rgba(34,197,94,0.25)" : "rgba(245,158,11,0.3)"}`,
        }}
      >
        {expressed ? "Interest Expressed — We'll Follow Up" : "Express Interest"}
      </button>
    </div>
  );
}

export default function ExchangeJobs() {
  const [tradeFilter, setTradeFilter] = useState("All Trades");
  const [sizeFilter, setSizeFilter] = useState("All Sizes");
  const [cityFilter, setCityFilter] = useState("");

  const filtered = SEED_JOBS.filter((j) => {
    if (tradeFilter !== "All Trades" && j.trade !== tradeFilter) return false;
    if (sizeFilter !== "All Sizes" && j.size !== sizeFilter) return false;
    if (
      cityFilter &&
      !j.location.toLowerCase().includes(cityFilter.toLowerCase())
    )
      return false;
    return true;
  });

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
              className="px-4 py-2 rounded-xl text-sm font-semibold text-[#0A1628] transition-all hover:opacity-90"
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
        style={{ backgroundColor: "#F59E0B", color: "#0A1628" }}
      >
        COMING Q3 2026 &nbsp;·&nbsp; JOIN THE WAITLIST TO BE FIRST &nbsp;·&nbsp; PREVIEW LISTINGS BELOW
      </div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-8">
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
              <Briefcase className="w-3.5 h-3.5" />
              ProLnk Exchange — Job Board
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Commercial Jobs
            </h1>
            <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-sm">
              High-value contracts from property managers, HOAs, and GCs across DFW.
              <span className="ml-1" style={{ color: "#F59E0B" }}>
                Bidding opens Q3 2026.
              </span>
            </p>
          </div>
          <Link href="/exchange/post">
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#0A1628] transition-all hover:scale-105"
              style={{
                backgroundColor: "#F59E0B",
                boxShadow: "0 4px 20px rgba(245,158,11,0.3)",
              }}
            >
              Post a Job <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-6 pb-6">
        <div
          className="flex flex-wrap gap-3 items-center p-4 rounded-2xl border"
          style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="flex items-center gap-2 mr-1"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <Filter className="w-4 h-4" />
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
            cityFilter) && (
            <button
              onClick={() => {
                setTradeFilter("All Trades");
                setSizeFilter("All Sizes");
                setCityFilter("");
              }}
              className="text-xs px-3 py-2 rounded-lg transition-colors"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Clear
            </button>
          )}
          <span
            className="ml-auto text-xs"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            {filtered.length} job{filtered.length !== 1 ? "s" : ""} shown
          </span>
        </div>
      </section>

      {/* Job Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
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
          <div className="flex flex-col gap-4">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
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
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "rgba(245,158,11,0.12)" }}
          >
            <Bell className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="text-white font-bold text-xl mb-2">
            Bidding opens Q3 2026
          </h2>
          <p
            className="text-sm mb-5"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Get early access to submit bids before the platform opens to the
            public. First 100 commercial contractors get founding-member rates.
          </p>
          <Link href="/exchange">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#0A1628] transition-all hover:opacity-90"
              style={{ backgroundColor: "#F59E0B" }}
            >
              Join the Waitlist <ArrowRight className="w-4 h-4" />
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
    </div>
  );
}
