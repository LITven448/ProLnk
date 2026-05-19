import React from 'react';
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link } from "wouter";
import PartnerLayout from "@/components/PartnerLayout";
import { Button } from "@/components/ui/button";
import {
  Briefcase, Plus, Search, Filter, MapPin, Clock, DollarSign,
  ChevronRight, Star, Shield, Zap, ArrowRight, X, Check,
  Building2, Home, Wrench, Paintbrush, Hammer, Leaf, Droplets,
  Plug, Wind, Package, SlidersHorizontal, TrendingUp, Users,
  ChevronDown, ChevronUp, Eye, Send, Award, Info, Flame,
  AlertTriangle, Timer, ArrowUpDown, LayoutGrid, List,
} from "lucide-react";

// --- Types --------------------------------------------------------------------
type JobMode = "find" | "post";
type JobType = "residential" | "commercial";
type SortMode = "newest" | "budget-high" | "distance" | "urgency" | "bids-low";
type TradeCategory =
  | "Roofing" | "Electrical" | "Plumbing" | "HVAC" | "Flooring"
  | "Painting" | "Landscaping" | "Concrete" | "Fencing" | "General"
  | "Drywall" | "Insulation" | "Windows" | "Gutters" | "Pressure Washing";

interface ExchangeJob {
  id: number;
  title: string;
  description: string;
  type: JobType;
  trade: TradeCategory;
  location: string;
  distanceMiles?: number;
  totalValue: number;
  brokerMargin: number;
  postedBy: string;
  postedByTier: string;
  postedAt: string;
  hoursAgo?: number;
  deadline: string;
  daysUntilDeadline?: number;
  bids: number;
  status: "open" | "awarded" | "closed";
  urgency?: "low" | "medium" | "high" | "emergency";
  isNew?: boolean;
  isCommercial?: boolean;
  clientName?: string;
  scopeItems?: string[];
}

// --- Demo Data ----------------------------------------------------------------
const DEMO_JOBS: ExchangeJob[] = [
  {
    id: 1,
    title: "AT&T Stadium — Exterior Pressure Wash & Sealant",
    description: "Full exterior pressure washing of the stadium concourse, parking structure, and entry plazas. Includes sealant application on all concrete surfaces.",
    type: "commercial",
    trade: "Pressure Washing",
    location: "Arlington, TX",
    distanceMiles: 14,
    totalValue: 48000,
    brokerMargin: 10,
    postedBy: "Apex Commercial Services",
    postedByTier: "Enterprise",
    postedAt: "2 hours ago",
    hoursAgo: 2,
    deadline: "Apr 15, 2026",
    daysUntilDeadline: 4,
    bids: 3,
    status: "open",
    urgency: "high",
    isNew: true,
    isCommercial: true,
    clientName: "AT&T Stadium / Jerry World",
    scopeItems: [
      "Concourse Level A-D (approx. 180,000 sq ft)",
      "Parking Structure P1 & P2",
      "4 main entry plazas",
      "Sealant application on all concrete",
      "Weekend-only access required",
    ],
  },
  {
    id: 2,
    title: "PepsiCo Campus — Break Room & Lobby Renovation",
    description: "Interior renovation of 3 break rooms and the main lobby. Scope includes flooring replacement (LVP), ceiling tile replacement, painting, and lighting fixtures.",
    type: "commercial",
    trade: "Flooring",
    location: "Plano, TX",
    distanceMiles: 22,
    totalValue: 62000,
    brokerMargin: 12,
    postedBy: "Apex Commercial Services",
    postedByTier: "Enterprise",
    postedAt: "5 hours ago",
    hoursAgo: 5,
    deadline: "Apr 30, 2026",
    daysUntilDeadline: 19,
    bids: 5,
    status: "open",
    urgency: "medium",
    isCommercial: true,
    clientName: "PepsiCo North America HQ",
    scopeItems: [
      "3 break rooms — LVP flooring (approx. 2,400 sq ft total)",
      "Main lobby — polished concrete overlay",
      "Ceiling tile replacement throughout",
      "Full repaint — corporate color standards",
      "LED lighting upgrade",
    ],
  },
  {
    id: 3,
    title: "Luxury Home — Full Roof Replacement",
    description: "Complete tear-off and replacement of a 4,200 sq ft residential roof. Homeowner has selected Owens Corning Duration shingles in Estate Gray.",
    type: "residential",
    trade: "Roofing",
    location: "Frisco, TX",
    distanceMiles: 31,
    totalValue: 18500,
    brokerMargin: 8,
    postedBy: "DFW Home Pros",
    postedByTier: "Company",
    postedAt: "1 day ago",
    hoursAgo: 24,
    deadline: "Apr 10, 2026",
    daysUntilDeadline: 2,
    bids: 7,
    status: "open",
    urgency: "high",
    isNew: false,
    scopeItems: [
      "4,200 sq ft tear-off and replacement",
      "Owens Corning Duration — Estate Gray",
      "Ridge vent installation",
      "Ice & water shield at all valleys",
      "Haul away and disposal included",
    ],
  },
  {
    id: 4,
    title: "New Build — Full Electrical Rough-In",
    description: "Electrical rough-in for a 3,800 sq ft new construction home in Prosper. Plans available. Panel is 200A.",
    type: "residential",
    trade: "Electrical",
    location: "Prosper, TX",
    distanceMiles: 38,
    totalValue: 22000,
    brokerMargin: 9,
    postedBy: "Lone Star Builders",
    postedByTier: "Crew",
    postedAt: "2 days ago",
    hoursAgo: 48,
    deadline: "Apr 20, 2026",
    daysUntilDeadline: 9,
    bids: 4,
    status: "open",
    urgency: "medium",
    scopeItems: [
      "200A main panel installation",
      "Full rough-in — 3,800 sq ft",
      "EV charger rough-in (2-car garage)",
      "Outdoor GFCI circuits (front + back)",
      "Licensed master electrician required",
    ],
  },
  {
    id: 5,
    title: "Office Complex — HVAC System Replacement",
    description: "Replace 4 aging rooftop HVAC units at a 3-story office building. Units are 5-ton each. Work must be performed nights and weekends.",
    type: "commercial",
    trade: "HVAC",
    location: "McKinney, TX",
    distanceMiles: 27,
    totalValue: 85000,
    brokerMargin: 11,
    postedBy: "Apex Commercial Services",
    postedByTier: "Enterprise",
    postedAt: "3 days ago",
    hoursAgo: 72,
    deadline: "May 1, 2026",
    daysUntilDeadline: 20,
    bids: 2,
    status: "open",
    urgency: "low",
    isCommercial: true,
    clientName: "Collin County Office Park",
    scopeItems: [
      "4x 5-ton rooftop units (Carrier or Trane)",
      "Crane rental included in scope",
      "Nights/weekends only — building occupied",
      "New ductwork connections at each unit",
      "Full commissioning and balancing",
    ],
  },
  {
    id: 6,
    title: "Residential — Interior Paint (Whole Home)",
    description: "Full interior repaint of a 2,800 sq ft home in Allen. Walls, ceilings, trim, and doors. Sherwin-Williams Alabaster throughout.",
    type: "residential",
    trade: "Painting",
    location: "Allen, TX",
    distanceMiles: 19,
    totalValue: 8200,
    brokerMargin: 15,
    postedBy: "DFW Home Pros",
    postedByTier: "Company",
    postedAt: "4 days ago",
    hoursAgo: 96,
    deadline: "Apr 8, 2026",
    daysUntilDeadline: 1,
    bids: 9,
    status: "open",
    urgency: "emergency",
    scopeItems: [
      "2,800 sq ft — walls, ceilings, trim, doors",
      "Sherwin-Williams Alabaster throughout",
      "2-coat application",
      "Furniture protection included",
      "Touch-up visit 30 days after completion",
    ],
  },
  {
    id: 7,
    title: "Custom Deck & Patio Extension",
    description: "500 sq ft composite deck addition with pergola and outdoor lighting. Homeowner-supplied Trex decking.",
    type: "residential",
    trade: "General",
    location: "Southlake, TX",
    distanceMiles: 8,
    totalValue: 14500,
    brokerMargin: 10,
    postedBy: "Premier Home Works",
    postedByTier: "Crew",
    postedAt: "6 hours ago",
    hoursAgo: 6,
    deadline: "May 10, 2026",
    daysUntilDeadline: 29,
    bids: 1,
    status: "open",
    urgency: "low",
    isNew: true,
    scopeItems: [
      "500 sq ft Trex composite deck",
      "12×14 cedar pergola",
      "Low-voltage landscape lighting",
      "Privacy lattice panels",
    ],
  },
  {
    id: 8,
    title: "Retail Strip Mall — Full HVAC Upgrade",
    description: "12-unit retail strip. Replace all RTUs and add smart thermostats. Work to be done between 9pm–5am to avoid disruption to tenants.",
    type: "commercial",
    trade: "HVAC",
    location: "Garland, TX",
    distanceMiles: 16,
    totalValue: 120000,
    brokerMargin: 9,
    postedBy: "Apex Commercial Services",
    postedByTier: "Enterprise",
    postedAt: "1 hour ago",
    hoursAgo: 1,
    deadline: "Jun 1, 2026",
    daysUntilDeadline: 48,
    bids: 0,
    status: "open",
    urgency: "medium",
    isNew: true,
    isCommercial: true,
    clientName: "Garland Marketplace LLC",
    scopeItems: [
      "12 rooftop units — various tonnage",
      "Smart thermostat installation (Ecobee)",
      "Night-shift work required",
      "Permit coordination included",
    ],
  },
];

// --- Constants ----------------------------------------------------------------
const TRADE_CATEGORIES: { key: TradeCategory | "all"; label: string; icon: React.ElementType; color: string }[] = [
  { key: "all", label: "All Trades", icon: LayoutGrid, color: "#94a3b8" },
  { key: "HVAC", label: "HVAC", icon: Wind, color: "#38bdf8" },
  { key: "Plumbing", label: "Plumbing", icon: Droplets, color: "#60a5fa" },
  { key: "Electrical", label: "Electrical", icon: Plug, color: "#fbbf24" },
  { key: "Roofing", label: "Roofing", icon: Home, color: "#a78bfa" },
  { key: "Painting", label: "Painting", icon: Paintbrush, color: "#f472b6" },
  { key: "Flooring", label: "Flooring", icon: Package, color: "#34d399" },
  { key: "Landscaping", label: "Landscaping", icon: Leaf, color: "#4ade80" },
  { key: "Concrete", label: "Concrete", icon: Hammer, color: "#94a3b8" },
  { key: "Fencing", label: "Fencing", icon: Shield, color: "#fb923c" },
  { key: "Drywall", label: "Drywall", icon: Hammer, color: "#c084fc" },
  { key: "Windows", label: "Windows", icon: Home, color: "#67e8f9" },
  { key: "Gutters", label: "Gutters", icon: Droplets, color: "#93c5fd" },
  { key: "Pressure Washing", label: "Pressure Wash", icon: Droplets, color: "#6ee7b7" },
  { key: "General", label: "General", icon: Wrench, color: "#e2e8f0" },
];

const TRADE_ICONS: Record<string, React.ElementType> = {
  Roofing: Home, Electrical: Plug, Plumbing: Droplets, HVAC: Wind,
  Flooring: Package, Painting: Paintbrush, Landscaping: Leaf,
  Concrete: Hammer, Fencing: Shield, General: Wrench, Drywall: Hammer,
  Insulation: Package, Windows: Home, Gutters: Droplets, "Pressure Washing": Droplets,
};

const URGENCY_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  low: { label: "Flexible", color: "#64748b", bg: "rgba(100,116,139,0.15)", icon: Clock },
  medium: { label: "Soon", color: "#f59e0b", bg: "rgba(245,158,11,0.15)", icon: Timer },
  high: { label: "Urgent", color: "#f97316", bg: "rgba(249,115,22,0.15)", icon: AlertTriangle },
  emergency: { label: "Emergency", color: "#ef4444", bg: "rgba(239,68,68,0.15)", icon: Flame },
};

const TIER_COLORS: Record<string, string> = {
  Scout: "text-slate-400 bg-slate-800",
  Pro: "text-teal-400 bg-teal-900/40",
  Crew: "text-indigo-400 bg-indigo-900/40",
  Company: "text-amber-400 bg-amber-900/40",
  Enterprise: "text-white bg-slate-700",
};

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "budget-high", label: "Highest Budget" },
  { value: "distance", label: "Closest to Me" },
  { value: "urgency", label: "Most Urgent" },
  { value: "bids-low", label: "Fewest Bids" },
];

// --- Quick Bid Modal ----------------------------------------------------------
function BidModal({ job, onClose }: { job: ExchangeJob; onClose: () => void }) {
  const [amount, setAmount] = useState(
    Math.round(job.totalValue * (1 - job.brokerMargin / 100))
  );
  const [message, setMessage] = useState("");
  const [timeline, setTimeline] = useState("2 weeks");
  const [submitted, setSubmitted] = useState(false);

  const brokerEarnings = job.totalValue - amount;
  const prolnkFee = brokerEarnings * 0.08;
  const netBrokerEarnings = brokerEarnings - prolnkFee;
  const marginPct = Math.round((brokerEarnings / job.totalValue) * 100);

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
        <div className="bg-[#0D1F3C] border border-teal-500/30 rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-4">
            <Check className="w-7 h-7 text-teal-400" />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">Bid Submitted!</h3>
          <p className="text-white/50 text-sm mb-1">
            Your bid of <span className="text-white font-semibold">${amount.toLocaleString()}</span> is live.
          </p>
          <p className="text-white/40 text-xs mb-6">
            You'll be notified if the job is awarded to you. Broker earns <span className="text-teal-400 font-semibold">${netBrokerEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> net.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-sm font-bold text-[#0A1628] bg-teal-400 hover:bg-teal-300 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-[#0D1F3C] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between bg-gradient-to-r from-teal-900/60 to-[#0D1F3C] border-b border-white/10">
          <div>
            <p className="text-teal-400 text-xs font-bold uppercase tracking-wider mb-0.5">Quick Bid</p>
            <h3 className="text-white font-bold text-base leading-tight line-clamp-1">{job.title}</h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors ml-4 flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Job value context */}
          <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-3">
            <div>
              <p className="text-white/40 text-xs mb-0.5">Total Job Value</p>
              <p className="text-white font-bold text-lg">${job.totalValue.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-xs mb-0.5">Posted Margin</p>
              <p className="text-amber-400 font-bold text-lg">{job.brokerMargin}%</p>
            </div>
          </div>

          {/* Your bid (sub receives) */}
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              Your Bid — What Sub Receives
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-semibold">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Math.min(job.totalValue, Number(e.target.value))))}
                className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-teal-400/50"
              />
            </div>
            {/* Slider */}
            <div className="mt-2 px-1">
              <input
                type="range"
                min={Math.round(job.totalValue * 0.7)}
                max={Math.round(job.totalValue * 0.97)}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #2dd4bf 0%, #2dd4bf ${((amount - job.totalValue * 0.7) / (job.totalValue * 0.27)) * 100}%, rgba(255,255,255,0.1) ${((amount - job.totalValue * 0.7) / (job.totalValue * 0.27)) * 100}%, rgba(255,255,255,0.1) 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-white/30 mt-1">
                <span>High margin</span>
                <span>More competitive</span>
              </div>
            </div>
          </div>

          {/* Earnings preview */}
          <div className="rounded-xl bg-teal-900/20 border border-teal-500/25 px-4 py-3 grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-white/40 text-xs mb-1">You Earn (net)</p>
              <p className="text-teal-400 font-bold">${netBrokerEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Your Margin</p>
              <p className="text-white font-bold">{marginPct}%</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">ProLnk Fee</p>
              <p className="text-white/60 font-semibold">${prolnkFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              Estimated Timeline
            </label>
            <div className="grid grid-cols-4 gap-2">
              {["1 week", "2 weeks", "3 weeks", "1 month"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeline(t)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    timeline === t
                      ? "border-teal-500/60 bg-teal-500/15 text-teal-300"
                      : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/60"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              Message to Broker (optional)
            </label>
            <textarea
              rows={2}
              placeholder="Briefly describe your experience with this type of work..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-teal-400/50 resize-none"
            />
          </div>

          <button
            onClick={() => setSubmitted(true)}
            className="w-full py-3.5 rounded-xl text-sm font-bold text-[#0A1628] bg-teal-400 hover:bg-teal-300 transition-colors flex items-center justify-center gap-2"
          >
            Submit Bid — ${amount.toLocaleString()} <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-xs text-center text-white/25">
            Bidding is non-binding until you accept the award notification.
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Job Card (dark theme) ----------------------------------------------------
function JobCard({
  job,
  onBid,
}: {
  job: ExchangeJob;
  onBid: (job: ExchangeJob) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const TradeIcon = TRADE_ICONS[job.trade] ?? Wrench;
  const tradeConfig = TRADE_CATEGORIES.find((c) => c.key === job.trade);
  const urgencyConfig = job.urgency ? URGENCY_CONFIG[job.urgency] : null;
  const UrgencyIcon = urgencyConfig?.icon ?? Clock;

  const subReceives = job.totalValue * (1 - job.brokerMargin / 100);
  const netBrokerEarnings = job.totalValue * (job.brokerMargin / 100) * 0.92;

  const isDeadlineSoon = job.daysUntilDeadline !== undefined && job.daysUntilDeadline <= 3;

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-900/20 ${
      job.urgency === "emergency" ? "border-red-500/30 bg-[#0D1F3C]" :
      job.isNew ? "border-teal-500/30 bg-[#0D1F3C]" : "border-white/8 bg-[#0D1F3C]"
    }`}>
      {/* Commercial banner */}
      {job.isCommercial && (
        <div className="px-5 py-1.5 flex items-center gap-2 bg-gradient-to-r from-amber-900/50 to-[#0D1F3C] border-b border-amber-500/20">
          <Building2 className="w-3 h-3 text-amber-400" />
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Commercial</span>
          {job.clientName && <span className="text-xs text-amber-400/50 ml-1">· {job.clientName}</span>}
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border"
            style={{
              backgroundColor: `${tradeConfig?.color ?? "#94a3b8"}18`,
              borderColor: `${tradeConfig?.color ?? "#94a3b8"}30`,
            }}
          >
            <TradeIcon className="w-5 h-5" style={{ color: tradeConfig?.color ?? "#94a3b8" }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {job.isNew && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30">NEW</span>
              )}
              {urgencyConfig && (
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: urgencyConfig.bg, color: urgencyConfig.color }}
                >
                  <UrgencyIcon className="w-3 h-3" />
                  {urgencyConfig.label}
                </span>
              )}
              {isDeadlineSoon && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/25">
                  {job.daysUntilDeadline === 1 ? "1 day left" : `${job.daysUntilDeadline} days left`}
                </span>
              )}
            </div>
            <h3 className="font-bold text-white text-sm leading-tight">{job.title}</h3>
          </div>

          {/* Budget badge */}
          <div className="text-right flex-shrink-0">
            <div className="inline-block rounded-xl px-3 py-1.5 bg-white/5 border border-white/10">
              <p className="text-lg font-bold text-white">${job.totalValue >= 10000 ? `${(job.totalValue / 1000).toFixed(0)}K` : job.totalValue.toLocaleString()}</p>
              <p className="text-xs text-white/40 text-right">job value</p>
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4 text-xs text-white/40">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-teal-500/60" />
            {job.location}
            {job.distanceMiles !== undefined && (
              <span className="text-white/25 ml-1">· {job.distanceMiles} mi away</span>
            )}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {job.postedAt}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {job.bids === 0 ? "No bids yet" : `${job.bids} bid${job.bids !== 1 ? "s" : ""}`}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-500/50" />
            Deadline: {job.deadline}
          </span>
        </div>

        {/* Earnings preview */}
        <div className="rounded-xl p-3 mb-4 flex items-center gap-3 bg-teal-900/15 border border-teal-500/20">
          <div className="flex-1">
            <p className="text-xs text-teal-400/70 font-semibold mb-0.5">Broker Earns</p>
            <p className="text-base font-bold text-teal-300">${netBrokerEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="w-px h-7 bg-teal-500/20" />
          <div className="flex-1">
            <p className="text-xs text-white/40 mb-0.5">Sub Receives</p>
            <p className="text-sm font-semibold text-white/70">${subReceives.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="w-px h-7 bg-teal-500/20" />
          <div className="flex-1">
            <p className="text-xs text-white/40 mb-0.5">Margin</p>
            <p className="text-sm font-semibold text-amber-400">{job.brokerMargin}%</p>
          </div>
        </div>

        {/* Posted by */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/60">
            {job.postedBy.charAt(0)}
          </div>
          <span className="text-xs text-white/40">
            Posted by <strong className="text-white/70">{job.postedBy}</strong>
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${TIER_COLORS[job.postedByTier] ?? "text-white/50 bg-white/10"}`}>
            {job.postedByTier}
          </span>
        </div>

        {/* Expandable scope */}
        {job.scopeItems && job.scopeItems.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-semibold text-teal-400/70 hover:text-teal-400 transition-colors mb-3"
          >
            <Eye className="w-3.5 h-3.5" />
            {expanded ? "Hide" : "View"} Scope
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}

        {expanded && job.scopeItems && (
          <div className="rounded-xl bg-white/3 border border-white/8 p-4 mb-3">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-wide mb-2">Scope of Work</p>
            <ul className="space-y-1.5">
              {job.scopeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                  <Check className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action row */}
        <div className="flex gap-2">
          <button
            onClick={() => onBid(job)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-[#0A1628] bg-teal-400 hover:bg-teal-300 transition-colors"
          >
            Bid Now <Zap className="w-4 h-4" />
          </button>
          <button className="px-3.5 py-2.5 rounded-xl border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-all">
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Categories Sidebar -------------------------------------------------------
function CategoriesSidebar({
  selected,
  onSelect,
  counts,
}: {
  selected: string;
  onSelect: (key: string) => void;
  counts: Record<string, number>;
}) {
  return (
    <aside className="w-52 flex-shrink-0">
      <p className="text-xs font-bold text-white/30 uppercase tracking-wider mb-3 px-1">Categories</p>
      <nav className="space-y-0.5">
        {TRADE_CATEGORIES.map(({ key, label, icon: Icon, color }) => {
          const count = key === "all" ? Object.values(counts).reduce((a, b) => a + b, 0) : (counts[key] ?? 0);
          const isSelected = selected === key;
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all text-left ${
                isSelected
                  ? "bg-teal-500/15 border border-teal-500/30"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon
                className="w-4 h-4 flex-shrink-0"
                style={{ color: isSelected ? color : "rgba(255,255,255,0.35)" }}
              />
              <span className={isSelected ? "text-white" : "text-white/50"}>{label}</span>
              {count > 0 && (
                <span
                  className="ml-auto text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center"
                  style={{
                    backgroundColor: isSelected ? `${color}25` : "rgba(255,255,255,0.06)",
                    color: isSelected ? color : "rgba(255,255,255,0.35)",
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

// --- Main Exchange Page -------------------------------------------------------
export default function Exchange() {
  const [typeFilter, setTypeFilter] = useState<"all" | JobType>("all");
  const [tradeFilter, setTradeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [bidJob, setBidJob] = useState<ExchangeJob | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);

  const { data: liveJobs } = trpc.exchange.listJobs.useQuery({});

  const allJobs: ExchangeJob[] = useMemo(() => {
    if (liveJobs && liveJobs.length > 0) {
      return liveJobs.map((j) => ({
        id: j.id,
        title: j.title,
        description: j.description,
        type: j.jobType as JobType,
        trade: j.tradeCategory as TradeCategory,
        location: j.location,
        totalValue: Number(j.totalValue),
        brokerMargin: Number(j.brokerMargin),
        postedBy: j.postedByBusinessName || "Partner",
        postedByTier: j.postedByTier || "Pro",
        postedAt: new Date(j.createdAt).toLocaleDateString(),
        hoursAgo: Math.round((Date.now() - new Date(j.createdAt).getTime()) / 3600000),
        deadline: j.deadline ? new Date(j.deadline).toLocaleDateString() : "Open",
        daysUntilDeadline: j.deadline
          ? Math.round((new Date(j.deadline).getTime() - Date.now()) / 86400000)
          : undefined,
        bids: j.bidsCount,
        status: j.status as "open" | "awarded" | "closed",
        urgency: "medium" as const,
        isNew: Date.now() - new Date(j.createdAt).getTime() < 86400000,
        isCommercial: j.isCommercial === true,
        clientName: j.clientName || undefined,
        scopeItems: j.scopeItems || [],
      }));
    }
    return DEMO_JOBS;
  }, [liveJobs]);

  const tradeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const job of allJobs) {
      counts[job.trade] = (counts[job.trade] ?? 0) + 1;
    }
    return counts;
  }, [allJobs]);

  const filteredAndSorted = useMemo(() => {
    let jobs = allJobs.filter((j) => {
      if (typeFilter !== "all" && j.type !== typeFilter) return false;
      if (tradeFilter !== "all" && j.trade !== tradeFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!j.title.toLowerCase().includes(q) &&
            !j.location.toLowerCase().includes(q) &&
            !j.trade.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    const urgencyRank: Record<string, number> = { emergency: 4, high: 3, medium: 2, low: 1 };

    jobs = [...jobs].sort((a, b) => {
      switch (sortMode) {
        case "newest": return (a.hoursAgo ?? 999) - (b.hoursAgo ?? 999);
        case "budget-high": return b.totalValue - a.totalValue;
        case "distance": return (a.distanceMiles ?? 999) - (b.distanceMiles ?? 999);
        case "urgency": return (urgencyRank[b.urgency ?? "low"] ?? 0) - (urgencyRank[a.urgency ?? "low"] ?? 0);
        case "bids-low": return a.bids - b.bids;
        default: return 0;
      }
    });

    return jobs;
  }, [allJobs, typeFilter, tradeFilter, searchQuery, sortMode]);

  const totalGMV = allJobs.reduce((s, j) => s + j.totalValue, 0);
  const openJobs = allJobs.length;
  const avgMargin = allJobs.length > 0 ? Math.round(allJobs.reduce((s, j) => s + j.brokerMargin, 0) / allJobs.length) : 0;
  const newToday = allJobs.filter((j) => (j.hoursAgo ?? 999) < 24).length;

  const selectedSortLabel = SORT_OPTIONS.find((o) => o.value === sortMode)?.label ?? "Sort";

  return (
    <PartnerLayout>
      {/* Hero header */}
      <div
        className="rounded-2xl p-6 mb-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d2040 50%, #0a2535 100%)" }}
      >
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #2dd4bf, transparent)", transform: "translate(35%, -35%)" }}
        />

        <div className="flex items-start justify-between flex-wrap gap-4 relative">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Briefcase className="w-4 h-4 text-teal-400" />
              <span className="text-teal-400 text-xs font-bold uppercase tracking-widest">ProLnk Exchange</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/25">LIVE</span>
            </div>
            <h1 className="text-white text-2xl font-bold mb-1">Job Board & Broker Exchange</h1>
            <p className="text-white/50 text-sm">Find sub work. Post jobs. Earn broker commissions. No tools required.</p>
          </div>

          <Link href="/exchange/post">
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-[#0A1628] bg-teal-400 hover:bg-teal-300 transition-colors flex-shrink-0">
              <Plus className="w-4 h-4" /> Post a Job
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-5 pt-5 border-t border-white/8">
          {[
            { label: "Open Jobs", value: openJobs.toString() },
            { label: "Total GMV", value: `$${(totalGMV / 1000).toFixed(0)}K` },
            { label: "Avg Margin", value: `${avgMargin}%` },
            { label: "New Today", value: newToday.toString() },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Layout: sidebar + main */}
      <div className="flex gap-6">
        {/* Categories Sidebar */}
        <div className="hidden lg:block">
          <CategoriesSidebar
            selected={tradeFilter}
            onSelect={setTradeFilter}
            counts={tradeCounts}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Filters bar */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {/* Search */}
            <div className="relative flex-1 min-w-52">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search jobs, locations, trades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-teal-400/40"
              />
            </div>

            {/* Type filter */}
            <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
              {(["all", "residential", "commercial"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    typeFilter === t
                      ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {t === "all" ? "All" : t === "residential" ? "Residential" : "Commercial"}
                </button>
              ))}
            </div>

            {/* Mobile trade filter */}
            <select
              value={tradeFilter}
              onChange={(e) => setTradeFilter(e.target.value)}
              className="lg:hidden bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-400/40"
              style={{ colorScheme: "dark" }}
            >
              <option value="all" style={{ backgroundColor: "#0A1628" }}>All Trades</option>
              {TRADE_CATEGORIES.filter((c) => c.key !== "all").map(({ key, label }) => (
                <option key={key} value={key} style={{ backgroundColor: "#0A1628" }}>{label}</option>
              ))}
            </select>

            {/* Sort by */}
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white/60 hover:text-white transition-colors"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                {selectedSortLabel}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {showSortMenu && (
                <div className="absolute right-0 top-full mt-1.5 w-48 bg-[#0D1F3C] border border-white/15 rounded-xl shadow-xl z-20 py-1.5 overflow-hidden">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortMode(opt.value); setShowSortMenu(false); }}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left transition-colors ${
                        sortMode === opt.value
                          ? "text-teal-300 bg-teal-500/10"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {sortMode === opt.value && <Check className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />}
                      {sortMode !== opt.value && <span className="w-3.5 flex-shrink-0" />}
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Results header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-white/40">
              <span className="text-white font-semibold">{filteredAndSorted.length}</span> open job{filteredAndSorted.length !== 1 ? "s" : ""}
              {tradeFilter !== "all" && <span className="text-teal-400"> · {tradeFilter}</span>}
              {typeFilter !== "all" && <span className="text-teal-400"> · {typeFilter}</span>}
            </p>
            <span className="text-xs text-white/25">Sorted by {selectedSortLabel.toLowerCase()}</span>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            {filteredAndSorted.map((job) => (
              <JobCard key={job.id} job={job} onBid={(j) => setBidJob(j)} />
            ))}
            {filteredAndSorted.length === 0 && (
              <div className="text-center py-16 text-white/25">
                <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium text-white/40">No jobs match your filters</p>
                <p className="text-sm mt-1">Try a different category or clear your search</p>
                <button
                  onClick={() => { setTradeFilter("all"); setTypeFilter("all"); setSearchQuery(""); }}
                  className="mt-4 px-4 py-2 rounded-xl text-sm font-semibold text-teal-400 border border-teal-500/30 hover:bg-teal-500/10 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bid modal */}
      {bidJob && <BidModal job={bidJob} onClose={() => setBidJob(null)} />}

      {/* Click-away for sort menu */}
      {showSortMenu && (
        <div className="fixed inset-0 z-10" onClick={() => setShowSortMenu(false)} />
      )}
    </PartnerLayout>
  );
}
