import { useState, type ReactNode } from "react";
import { Link } from "wouter";
import {
  Briefcase, DollarSign, Users, Clock, CheckCircle, XCircle,
  AlertCircle, ArrowRight, Building2, MapPin, TrendingUp,
} from "lucide-react";

type BidStatus = "pending" | "won" | "lost";

interface MyBid {
  id: number;
  jobTitle: string;
  company: string;
  location: string;
  trade: string;
  myBidAmount: number;
  competingBids: number;
  status: BidStatus;
  submittedDaysAgo: number;
  budget: string;
  awardedTo?: string;
}

const SEED_BIDS: MyBid[] = [
  {
    id: 1,
    jobTitle: "HVAC System Overhaul — 50-Unit Apartment Complex",
    company: "Synergy Property Group",
    location: "Plano, TX",
    trade: "HVAC",
    myBidAmount: 52000,
    competingBids: 3,
    status: "pending",
    submittedDaysAgo: 1,
    budget: "$45,000–$65,000″,
  },
  {
    id: 2,
    jobTitle: "Electrical Panel Upgrade — Industrial Warehouse",
    company: "DFW Logistics Partners",
    location: "Irving, TX",
    trade: "Electrical",
    myBidAmount: 36500,
    competingBids: 2,
    status: "won",
    submittedDaysAgo: 4,
    budget: "$28,000–$42,000″,
  },
  {
    id: 3,
    jobTitle: "Commercial Exterior Painting — Office Park",
    company: "Riverview Holdings LLC",
    location: "Allen, TX",
    trade: "Painting",
    myBidAmount: 47000,
    competingBids: 4,
    status: "lost",
    submittedDaysAgo: 8,
    budget: "$38,000–$52,000″,
    awardedTo: "DFW Paint Pros",
  },
  {
    id: 4,
    jobTitle: "Strip Mall Roof Replacement — 14,000 sq ft",
    company: "Pinnacle Commercial Real Estate",
    location: "Garland, TX",
    trade: "Roofing",
    myBidAmount: 112000,
    competingBids: 5,
    status: "pending",
    submittedDaysAgo: 2,
    budget: "$95,000–$130,000″,
  },
  {
    id: 5,
    jobTitle: "Plumbing Retrofit — 12-Location Restaurant Chain",
    company: "Frontier Eats Group",
    location: "DFW Metro",
    trade: "Plumbing",
    myBidAmount: 7800,
    competingBids: 7,
    status: "lost",
    submittedDaysAgo: 6,
    budget: "$6,500–$9,000 per location",
    awardedTo: "Metroplex Plumbing Co",
  },
  {
    id: 6,
    jobTitle: "Flooring Replacement — Corporate HQ, 3 Floors",
    company: "Meridian Capital Group",
    location: "Richardson, TX",
    trade: "Flooring",
    myBidAmount: 62000,
    competingBids: 4,
    status: "won",
    submittedDaysAgo: 9,
    budget: "$55,000–$72,000″,
  },
];

const STATUS_CONFIG: Record<
  BidStatus,
  { label: string; bg: string; color: string; icon: ReactNode; tab: string }
> = {
  pending: {
    label: "Awaiting Response",
    bg: "rgba(245,158,11,0.12)",
    color: "#F59E0B",
    icon: <AlertCircle className="w-3.5 h-3.5″ />,
    tab: "Pending",
  },
  won: {
    label: "Contract Awarded",
    bg: "rgba(34,197,94,0.12)",
    color: "#4ade80″,
    icon: <CheckCircle className="w-3.5 h-3.5″ />,
    tab: "Won",
  },
  lost: {
    label: "Not Selected",
    bg: "rgba(239,68,68,0.1)",
    color: "#f87171″,
    icon: <XCircle className="w-3.5 h-3.5″ />,
    tab: "Lost",
  },
};

type TabFilter = "All" | "Pending" | "Won" | "Lost";
const TABS: TabFilter[] = ["All", "Pending", "Won", "Lost"];

function BidRow({ bid }: { bid: MyBid }) {
  const cfg = STATUS_CONFIG[bid.status];
  const submittedLabel =
    bid.submittedDaysAgo === 0
      ? "Today"
      : bid.submittedDaysAgo === 1
      ? "Yesterday"
      : `${bid.submittedDaysAgo}d ago`;

  return (
    <div
      className="rounded-2xl p-5 border transition-all hover:border-white/20″
      style={{
        backgroundColor: "rgba(255,255,255,0.04)",
        borderColor:
          bid.status === "won"
            ? "rgba(34,197,94,0.2)"
            : bid.status === "lost"
            ? "rgba(239,68,68,0.12)"
            : "rgba(255,255,255,0.1)",
      }}
    >
      {/* Top row */}
      <div className="flex items-start gap-3 mb-3″>
        <div className="flex-1 min-w-0″>
          <div className="flex items-center gap-2 flex-wrap mb-1.5″>
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: cfg.bg, color: cfg.color }}
            >
              {cfg.icon}
              {cfg.label}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full border"
              style={{
                borderColor: "rgba(245,158,11,0.3)",
                color: "#F59E0B",
                backgroundColor: "rgba(245,158,11,0.08)",
              }}
            >
              {bid.trade}
            </span>
          </div>
          <h3 className="text-white font-bold text-sm leading-tight">{bid.jobTitle}</h3>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-white font-bold text-lg">
            ${bid.myBidAmount.toLocaleString()}
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            my bid
          </p>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-4 mb-3″>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
          <Building2 className="w-3.5 h-3.5 flex-shrink-0″ />
          {bid.company}
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
          <MapPin className="w-3.5 h-3.5 flex-shrink-0″ />
          {bid.location}
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
          <DollarSign className="w-3.5 h-3.5 flex-shrink-0″ />
          Budget: {bid.budget}
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
          <Users className="w-3.5 h-3.5 flex-shrink-0″ />
          {bid.competingBids} competing bid{bid.competingBids !== 1 ? "s" : ""}
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
          <Clock className="w-3.5 h-3.5 flex-shrink-0″ />
          Submitted {submittedLabel}
        </div>
      </div>

      {/* Lost: show who won */}
      {bid.status === "lost" && bid.awardedTo && (
        <div
          className="rounded-xl px-4 py-2.5 text-xs"
          style={{ backgroundColor: "rgba(239,68,68,0.07)", color: "rgba(255,255,255,0.5)" }}
        >
          Awarded to: <span className="font-semibold text-white/70″>{bid.awardedTo}</span>
        </div>
      )}

      {/* Won: highlight */}
      {bid.status === "won" && (
        <div
          className="rounded-xl px-4 py-2.5 text-xs font-semibold"
          style={{ backgroundColor: "rgba(34,197,94,0.08)", color: "#4ade80″ }}
        >
          You won this contract. ProLnk will reach out to coordinate.
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, color, icon }: { label: string; value: number; color: string; icon: ReactNode }) {
  return (
    <div
      className="rounded-2xl p-5 border flex items-center gap-4″
      style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0″
        style={{ backgroundColor: `${color}18` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs mt-0.5″ style={{ color: "rgba(255,255,255,0.45)" }}>{label}</p>
      </div>
    </div>
  );
}

export default function ExchangeMyBids() {
  const [tab, setTab] = useState<TabFilter>("All");

  const pending = SEED_BIDS.filter((b) => b.status === "pending");
  const won = SEED_BIDS.filter((b) => b.status === "won");
  const lost = SEED_BIDS.filter((b) => b.status === "lost");

  const displayed =
    tab === "All"
      ? SEED_BIDS
      : tab === "Pending"
      ? pending
      : tab === "Won"
      ? won
      : lost;

  const totalWonValue = won.reduce((s, b) => s + b.myBidAmount, 0);

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
          <Link href="/exchange">
            <span className="text-sm cursor-pointer transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
              Exchange Home
            </span>
          </Link>
          <Link href="/exchange/jobs">
            <span className="text-sm cursor-pointer transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
              Browse Jobs
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

      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-8″>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border"
          style={{
            backgroundColor: "rgba(245,158,11,0.1)",
            color: "#F59E0B",
            borderColor: "rgba(245,158,11,0.3)",
          }}
        >
          <Briefcase className="w-3.5 h-3.5″ />
          My Bids
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2″>Your Bid History</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          Track all bids you've submitted across the ProLnk Exchange.
        </p>
      </section>

      {/* Summary cards */}
      <section className="max-w-6xl mx-auto px-6 pb-8″>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3″>
          <SummaryCard
            label="Total Bids"
            value={SEED_BIDS.length}
            color="#818cf8″
            icon={<Briefcase className="w-5 h-5″ />}
          />
          <SummaryCard
            label="Awaiting Response"
            value={pending.length}
            color="#F59E0B"
            icon={<AlertCircle className="w-5 h-5″ />}
          />
          <SummaryCard
            label="Won Contracts"
            value={won.length}
            color="#4ade80″
            icon={<CheckCircle className="w-5 h-5″ />}
          />
          <div
            className="rounded-2xl p-5 border flex items-center gap-4″
            style={{ backgroundColor: "rgba(34,197,94,0.06)", borderColor: "rgba(34,197,94,0.2)" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0″
              style={{ backgroundColor: "rgba(34,197,94,0.15)" }}
            >
              <TrendingUp className="w-5 h-5 text-green-400″ />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">${(totalWonValue / 1000).toFixed(0)}K</p>
              <p className="text-xs mt-0.5″ style={{ color: "rgba(255,255,255,0.45)" }}>Total won value</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-6xl mx-auto px-6 pb-4″>
        <div
          className="flex items-center gap-1 p-1 rounded-2xl border w-fit"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}
        >
          {TABS.map((t) => {
            const count =
              t === "All"
                ? SEED_BIDS.length
                : t === "Pending"
                ? pending.length
                : t === "Won"
                ? won.length
                : lost.length;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  backgroundColor: tab === t ? "#F59E0B" : "transparent",
                  color: tab === t ? "#0A1628″ : "rgba(255,255,255,0.5)",
                }}
              >
                {t}
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                  style={{
                    backgroundColor: tab === t ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.08)",
                    color: tab === t ? "#0A1628″ : "rgba(255,255,255,0.5)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Bid rows */}
      <section className="max-w-6xl mx-auto px-6 pb-16″>
        {displayed.length === 0 ? (
          <div
            className="text-center py-16 rounded-2xl border"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-20 text-white" />
            <p className="text-white/40 text-sm">No bids in this category yet.</p>
            <Link href="/exchange/jobs">
              <button className="mt-4 text-amber-400 text-sm font-semibold underline inline-flex items-center gap-1″>
                Browse open jobs <ArrowRight className="w-3.5 h-3.5″ />
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4″>
            {displayed.map((bid) => (
              <BidRow key={bid.id} bid={bid} />
            ))}
          </div>
        )}
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
