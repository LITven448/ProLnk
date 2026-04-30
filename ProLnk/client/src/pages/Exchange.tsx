import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link } from "wouter";
import PartnerLayout from "@/components/PartnerLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase, Plus, Search, Filter, MapPin, Clock, DollarSign,
  ChevronRight, Star, Shield, Zap, ArrowRight, X, Check,
  Building2, Home, Wrench, Paintbrush, Hammer, Leaf, Droplets,
  Plug, Wind, Package, SlidersHorizontal, TrendingUp, Users,
  ChevronDown, ChevronUp, Eye, Send, Award, Info
} from "lucide-react";

// --- Types --------------------------------------------------------------------
type JobMode = "find" | "post";
type JobType = "residential" | "commercial";
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
  totalValue: number;
  brokerMargin: number; // percentage
  postedBy: string;
  postedByTier: string;
  postedAt: string;
  deadline: string;
  bids: number;
  status: "open" | "awarded" | "closed";
  isNew?: boolean;
  isCommercial?: boolean;
  clientName?: string;
  scopeItems?: string[];
}

// --- Demo Data ----------------------------------------------------------------
const DEMO_JOBS: ExchangeJob[] = [
  {
    id: 1,
    title: "AT&T Stadium -- Exterior Pressure Wash & Sealant",
    description: "Full exterior pressure washing of the stadium concourse, parking structure, and entry plazas. Includes sealant application on all concrete surfaces. Access to loading dock provided.",
    type: "commercial",
    trade: "Pressure Washing",
    location: "Arlington, TX",
    totalValue: 48000,
    brokerMargin: 10,
    postedBy: "Apex Commercial Services",
    postedByTier: "Enterprise",
    postedAt: "2 hours ago",
    deadline: "Apr 15, 2026",
    bids: 3,
    status: "open",
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
    title: "PepsiCo Campus -- Break Room & Lobby Renovation",
    description: "Interior renovation of 3 break rooms and the main lobby. Scope includes flooring replacement (LVP), ceiling tile replacement, painting, and lighting fixtures. Commercial-grade materials required.",
    type: "commercial",
    trade: "Flooring",
    location: "Plano, TX",
    totalValue: 62000,
    brokerMargin: 12,
    postedBy: "Apex Commercial Services",
    postedByTier: "Enterprise",
    postedAt: "5 hours ago",
    deadline: "Apr 30, 2026",
    bids: 5,
    status: "open",
    isCommercial: true,
    clientName: "PepsiCo North America HQ",
    scopeItems: [
      "3 break rooms -- LVP flooring (approx. 2,400 sq ft total)",
      "Main lobby -- polished concrete overlay",
      "Ceiling tile replacement throughout",
      "Full repaint -- corporate color standards",
      "LED lighting upgrade",
    ],
  },
  {
    id: 3,
    title: "Luxury Home -- Full Roof Replacement",
    description: "Complete tear-off and replacement of a 4,200 sq ft residential roof. Homeowner has selected Owens Corning Duration shingles in Estate Gray. Existing decking in good condition.",
    type: "residential",
    trade: "Roofing",
    location: "Frisco, TX",
    totalValue: 18500,
    brokerMargin: 8,
    postedBy: "DFW Home Pros",
    postedByTier: "Company",
    postedAt: "1 day ago",
    deadline: "Apr 10, 2026",
    bids: 7,
    status: "open",
    isNew: false,
    scopeItems: [
      "4,200 sq ft tear-off and replacement",
      "Owens Corning Duration -- Estate Gray",
      "Ridge vent installation",
      "Ice & water shield at all valleys",
      "Haul away and disposal included",
    ],
  },
  {
    id: 4,
    title: "New Build -- Full Electrical Rough-In",
    description: "Electrical rough-in for a 3,800 sq ft new construction home in Prosper. Plans available. Panel is 200A. Builder requires licensed master electrician on-site.",
    type: "residential",
    trade: "Electrical",
    location: "Prosper, TX",
    totalValue: 22000,
    brokerMargin: 9,
    postedBy: "Lone Star Builders",
    postedByTier: "Crew",
    postedAt: "2 days ago",
    deadline: "Apr 20, 2026",
    bids: 4,
    status: "open",
    scopeItems: [
      "200A main panel installation",
      "Full rough-in -- 3,800 sq ft",
      "EV charger rough-in (2-car garage)",
      "Outdoor GFCI circuits (front + back)",
      "Licensed master electrician required",
    ],
  },
  {
    id: 5,
    title: "Office Complex -- HVAC System Replacement",
    description: "Replace 4 aging rooftop HVAC units at a 3-story office building. Units are 5-ton each. Building is occupied -- work must be performed nights and weekends.",
    type: "commercial",
    trade: "HVAC",
    location: "McKinney, TX",
    totalValue: 85000,
    brokerMargin: 11,
    postedBy: "Apex Commercial Services",
    postedByTier: "Enterprise",
    postedAt: "3 days ago",
    deadline: "May 1, 2026",
    bids: 2,
    status: "open",
    isCommercial: true,
    clientName: "Collin County Office Park",
    scopeItems: [
      "4x 5-ton rooftop units (Carrier or Trane)",
      "Crane rental included in scope",
      "Nights/weekends only -- building occupied",
      "New ductwork connections at each unit",
      "Full commissioning and balancing",
    ],
  },
  {
    id: 6,
    title: "Residential -- Interior Paint (Whole Home)",
    description: "Full interior repaint of a 2,800 sq ft home in Allen. Walls, ceilings, trim, and doors. Homeowner has selected Sherwin-Williams Alabaster throughout.",
    type: "residential",
    trade: "Painting",
    location: "Allen, TX",
    totalValue: 8200,
    brokerMargin: 15,
    postedBy: "DFW Home Pros",
    postedByTier: "Company",
    postedAt: "4 days ago",
    deadline: "Apr 8, 2026",
    bids: 9,
    status: "open",
    scopeItems: [
      "2,800 sq ft -- walls, ceilings, trim, doors",
      "Sherwin-Williams Alabaster throughout",
      "2-coat application",
      "Furniture protection included",
      "Touch-up visit 30 days after completion",
    ],
  },
];

const TRADE_ICONS: Record<string, React.ElementType> = {
  Roofing: Home,
  Electrical: Plug,
  Plumbing: Droplets,
  HVAC: Wind,
  Flooring: Package,
  Painting: Paintbrush,
  Landscaping: Leaf,
  Concrete: Hammer,
  Fencing: Shield,
  General: Wrench,
  Drywall: Hammer,
  Insulation: Package,
  Windows: Home,
  Gutters: Droplets,
  "Pressure Washing": Droplets,
};

const TIER_COLORS: Record<string, string> = {
  Scout: "text-slate-600 bg-slate-100",
  Pro: "text-[#0A1628] bg-[#0A1628]/10",
  Crew: "text-indigo-700 bg-indigo-100",
  Company: "text-amber-700 bg-amber-100",
  Enterprise: "text-white bg-slate-800",
};

// --- Commission Calculator Component -----------------------------------------
function CommissionCalculator({ jobValue, onClose }: { jobValue: number; onClose: () => void }) {
  const [margin, setMargin] = useState(10);
  const platformFee = 0.08; // 8% of broker commission

  const brokerEarnings = jobValue * (margin / 100);
  const subReceives = jobValue - brokerEarnings;
  const prolnkFee = brokerEarnings * platformFee;
  const netBrokerEarnings = brokerEarnings - prolnkFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}>
          <div>
            <h3 className="text-white font-bold text-lg">Commission Calculator</h3>
            <p className="text-amber-400 text-sm mt-0.5">Job Value: ${jobValue.toLocaleString()}</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slider */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Your Broker Margin</span>
            <span className="text-2xl font-bold" style={{ color: "#D97706" }}>{margin}%</span>
          </div>
          <input
            type="range"
            min={3}
            max={25}
            value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #D97706 0%, #D97706 ${((margin - 3) / 22) * 100}%, #E5E7EB ${((margin - 3) / 22) * 100}%, #E5E7EB 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>3% (attract bids fast)</span>
            <span>25% (max margin)</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="px-6 pb-6 space-y-3">
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
              <span className="text-sm text-gray-600">Total Job Value</span>
              <span className="font-bold text-gray-900">${jobValue.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <span className="text-sm text-gray-600">Sub Contractor Receives</span>
              <span className="font-semibold text-gray-700">${subReceives.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <span className="text-sm text-gray-600">Your Gross Commission</span>
              <span className="font-semibold text-gray-700">${brokerEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <span className="text-sm text-gray-600">ProLnk Platform Fee (8%)</span>
              <span className="font-semibold text-red-500">${prolnkFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t-2 border-amber-200 bg-amber-50">
              <span className="text-sm font-bold text-amber-800">Your Net Earnings</span>
              <span className="text-xl font-bold text-amber-700">${netBrokerEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center">
            Drag the slider to see how your margin affects earnings and bid attractiveness.
          </p>

          <Button
            className="w-full text-white font-semibold"
            style={{ backgroundColor: "#D97706" }}
            onClick={onClose}
          >
            Got It -- Use This Margin
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- Post a Job Modal ---------------------------------------------------------
function PostJobModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [jobType, setJobType] = useState<JobType>("residential");
  const [trade, setTrade] = useState<TradeCategory | "">("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [jobValue, setJobValue] = useState(10000);
  const [margin, setMargin] = useState(10);
  const [deadline, setDeadline] = useState("");
  const [posted, setPosted] = useState(false);

  const brokerEarnings = jobValue * (margin / 100);
  const subReceives = jobValue - brokerEarnings;
  const prolnkFee = brokerEarnings * 0.08;
  const netEarnings = brokerEarnings - prolnkFee;

  const trades: TradeCategory[] = [
    "Roofing", "Electrical", "Plumbing", "HVAC", "Flooring",
    "Painting", "Landscaping", "Concrete", "Fencing", "General",
    "Drywall", "Insulation", "Windows", "Gutters", "Pressure Washing",
  ];

  if (posted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#FEF3C7" }}>
            <Check className="w-8 h-8" style={{ color: "#D97706" }} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Job Posted to Exchange!</h3>
          <p className="text-gray-500 text-sm mb-2">Your job package is now live on the ProLnk Exchange board. Verified partners in your trade category will see it immediately.</p>
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 mb-6 text-left">
            <p className="text-xs font-semibold text-amber-800 mb-1">Your Earnings Summary</p>
            <p className="text-sm text-amber-700">At {margin}% margin on a ${jobValue.toLocaleString()} job, you'll net <strong>${netEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> when the sub completes the work.</p>
          </div>
          <Button className="w-full text-white font-semibold" style={{ backgroundColor: "#D97706" }} onClick={onClose}>
            View on Exchange Board
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between flex-shrink-0" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}>
          <div>
            <h3 className="text-white font-bold text-lg">Post a Job to Exchange</h3>
            <p className="text-amber-400 text-sm mt-0.5">Step {step} of 3</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex px-6 pt-4 gap-2 flex-shrink-0">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="flex-1 h-1.5 rounded-full transition-all"
              style={{ backgroundColor: s <= step ? "#D97706" : "#E5E7EB" }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {step === 1 && (
            <>
              <h4 className="font-semibold text-gray-900">Job Details</h4>

              {/* Job Type */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Job Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {(["residential", "commercial"] as JobType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setJobType(t)}
                      className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        jobType === t ? "border-amber-500 bg-amber-50 text-amber-800" : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {t === "residential" ? <Home className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trade Category */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Trade Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {trades.map((t) => {
                    const Icon = TRADE_ICONS[t] ?? Wrench;
                    return (
                      <button
                        key={t}
                        onClick={() => setTrade(t)}
                        className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border-2 text-xs font-medium transition-all ${
                          trade === t ? "border-amber-500 bg-amber-50 text-amber-800" : "border-gray-100 text-gray-500 hover:border-gray-200"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Full Roof Replacement -- 4,200 sq ft"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Location</label>
                <input
                  type="text"
                  placeholder="City, TX"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h4 className="font-semibold text-gray-900">Scope & Timeline</h4>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Job Description & Scope</label>
                <textarea
                  rows={5}
                  placeholder="Describe the full scope of work, materials specified, access requirements, and any special conditions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Total Job Value</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                  <input
                    type="number"
                    value={jobValue}
                    onChange={(e) => setJobValue(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h4 className="font-semibold text-gray-900">Set Your Commission</h4>
              <p className="text-sm text-gray-500">Drag the slider to set your broker margin. A lower margin attracts more bids faster. A higher margin maximizes your earnings.</p>

              <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-amber-800">Your Broker Margin</span>
                  <span className="text-3xl font-bold text-amber-700">{margin}%</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={25}
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer mb-3"
                  style={{
                    background: `linear-gradient(to right, #D97706 0%, #D97706 ${((margin - 3) / 22) * 100}%, #fde68a ${((margin - 3) / 22) * 100}%, #fde68a 100%)`,
                  }}
                />
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Job Value</span>
                    <span className="font-semibold text-gray-900">${jobValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sub Contractor Receives</span>
                    <span className="font-semibold text-gray-700">${subReceives.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Your Gross Commission</span>
                    <span className="font-semibold text-gray-700">${brokerEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">ProLnk Fee (8%)</span>
                    <span className="font-semibold text-red-500">${prolnkFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t-2 border-amber-300 pt-2 mt-2">
                    <span className="font-bold text-amber-800">Your Net Earnings</span>
                    <span className="text-xl font-bold text-amber-700">${netEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-sm space-y-1">
                <p className="font-semibold text-gray-700 mb-2">Job Summary</p>
                <p className="text-gray-500"><span className="font-medium text-gray-700">Type:</span> {jobType.charAt(0).toUpperCase() + jobType.slice(1)}</p>
                <p className="text-gray-500"><span className="font-medium text-gray-700">Trade:</span> {trade || "Not selected"}</p>
                <p className="text-gray-500"><span className="font-medium text-gray-700">Title:</span> {title || "Untitled"}</p>
                <p className="text-gray-500"><span className="font-medium text-gray-700">Location:</span> {location || "Not specified"}</p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button
              className="flex-1 text-white font-semibold"
              style={{ backgroundColor: "#D97706" }}
              onClick={() => setStep(step + 1)}
            >
              Continue <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              className="flex-1 text-white font-semibold"
              style={{ backgroundColor: "#D97706" }}
              onClick={() => setPosted(true)}
            >
              Post to Exchange <Send className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Job Card -----------------------------------------------------------------
function JobCard({ job, onCalc }: { job: ExchangeJob; onCalc: (v: number) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [bid, setBid] = useState(false);
  const TradeIcon = TRADE_ICONS[job.trade] ?? Wrench;
  const subReceives = job.totalValue * (1 - job.brokerMargin / 100);
  const yourEarnings = job.totalValue * (job.brokerMargin / 100) * 0.92; // after ProLnk fee

  return (
    <div
      className={`rounded-2xl border-2 overflow-hidden transition-all ${
        job.isCommercial ? "border-amber-200 bg-white" : "border-gray-100 bg-white"
      } hover:shadow-lg`}
    >
      {/* Commercial badge bar */}
      {job.isCommercial && (
        <div className="px-5 py-2 flex items-center gap-2" style={{ background: "linear-gradient(90deg, #1a1a2e, #2d2d5e)" }}>
          <Building2 className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Commercial</span>
          {job.clientName && <span className="text-xs text-white/60 ml-1"> {job.clientName}</span>}
        </div>
      )}

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: job.isCommercial ? "#FEF3C7" : "#F0FDFA" }}
            >
              <TradeIcon
                className="w-5 h-5"
                style={{ color: job.isCommercial ? "#D97706" : "#0D9488" }}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-gray-900 text-sm leading-tight">{job.title}</h3>
                {job.isNew && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: "#D97706" }}>NEW</span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin className="w-3 h-3" /> {job.location}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" /> {job.postedAt}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Users className="w-3 h-3" /> {job.bids} bids
                </span>
              </div>
            </div>
          </div>

          {/* Value */}
          <div className="text-right flex-shrink-0">
            <p className="text-xl font-bold text-gray-900">${job.totalValue.toLocaleString()}</p>
            <p className="text-xs text-gray-400">job value</p>
          </div>
        </div>

        {/* Earnings preview */}
        <div className="rounded-xl p-3 mb-3 flex items-center gap-4" style={{ backgroundColor: "#FFFBEB" }}>
          <div className="flex-1">
            <p className="text-xs text-amber-700 font-semibold mb-0.5">You Earn (broker fee)</p>
            <p className="text-lg font-bold text-amber-700">${yourEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="w-px h-8 bg-amber-200" />
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-0.5">Sub Receives</p>
            <p className="text-base font-semibold text-gray-700">${subReceives.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="w-px h-8 bg-amber-200" />
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-0.5">Margin Set</p>
            <p className="text-base font-semibold text-gray-700">{job.brokerMargin}%</p>
          </div>
          <button
            onClick={() => onCalc(job.totalValue)}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-300 text-amber-700 hover:bg-amber-100 transition-colors"
          >
            <SlidersHorizontal className="w-3 h-3" /> Adjust
          </button>
        </div>

        {/* Posted by */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
            {job.postedBy.charAt(0)}
          </div>
          <span className="text-xs text-gray-500">Posted by <strong className="text-gray-700">{job.postedBy}</strong></span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${TIER_COLORS[job.postedByTier] ?? "text-gray-600 bg-gray-100"}`}>
            {job.postedByTier}
          </span>
          <Link href="/dashboard/exchange/profile">
            <span className="flex items-center gap-1 text-xs font-semibold text-[#0A1628] hover:text-[#0A1628] cursor-pointer transition-colors">
              <Eye className="w-3 h-3" /> Profile
            </span>
          </Link>
          <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
            <Clock className="w-3 h-3" /> Deadline: {job.deadline}
          </span>
        </div>

        {/* Expandable scope */}
        {job.scopeItems && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-semibold text-[#0A1628] hover:text-[#0A1628] transition-colors mb-3"
          >
            <Eye className="w-3.5 h-3.5" />
            {expanded ? "Hide" : "View"} Full Scope
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}

        {expanded && job.scopeItems && (
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Scope of Work</p>
            <ul className="space-y-1.5">
              {job.scopeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-3.5 h-3.5 text-[#0A1628] flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action row */}
        <div className="flex gap-2">
          {bid ? (
            <div className="flex-1 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold" style={{ backgroundColor: "#ECFDF5", color: "#059669" }}>
              <Check className="w-4 h-4" /> Bid Submitted -- You'll be notified if awarded
            </div>
          ) : (
            <>
              <Button
                className="flex-1 text-white font-semibold text-sm"
                style={{ backgroundColor: "#D97706" }}
                onClick={() => setBid(true)}
              >
                Submit Bid <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                <Info className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Main Exchange Page -------------------------------------------------------
export default function Exchange() {
  const [mode, setMode] = useState<JobMode>("find");
  const [typeFilter, setTypeFilter] = useState<"all" | JobType>("all");
  const [tradeFilter, setTradeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);
  const [calcValue, setCalcValue] = useState<number | null>(null);

  // Real backend data — falls back to DEMO_JOBS when DB is empty
  const { data: liveJobs } = trpc.exchange.listJobs.useQuery({});
  const postJobMutation = trpc.exchange.postJob.useMutation({
    onSuccess: () => { toast.success("Job posted to the Exchange!"); setShowPostModal(false); },
    onError: (err) => toast.error(err.message || "Failed to post job"),
  });
  const submitBidMutation = trpc.exchange.submitBid.useMutation({
    onSuccess: () => toast.success("Bid submitted!"),
    onError: (err) => toast.error(err.message || "Failed to submit bid"),
  });
  // Merge live jobs with demo jobs (live jobs take priority when DB has data)
  const allJobs: ExchangeJob[] = useMemo(() => {
    if (liveJobs && liveJobs.length > 0) {
      return liveJobs.map(j => ({
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
        deadline: j.deadline ? new Date(j.deadline).toLocaleDateString() : "Open",
        bids: j.bidsCount,
        status: j.status as "open" | "awarded" | "closed",
        isNew: Date.now() - new Date(j.createdAt).getTime() < 86400000,
        isCommercial: j.isCommercial === true,
        clientName: j.clientName || undefined,
        scopeItems: j.scopeItems || [],
      }));
    }
    return DEMO_JOBS;
  }, [liveJobs]);
  const filteredJobs = useMemo(() => {
    return allJobs.filter((j) => {
      if (typeFilter !== "all" && j.type !== typeFilter) return false;
      if (tradeFilter !== "all" && j.trade !== tradeFilter) return false;
      if (searchQuery && !j.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !j.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [typeFilter, tradeFilter, searchQuery]);

  const totalGMV = allJobs.reduce((s, j) => s + j.totalValue, 0);
  const commercialJobs = allJobs.filter((j) => j.isCommercial).length;
  const avgMargin = allJobs.length > 0 ? Math.round(allJobs.reduce((s, j) => s + j.brokerMargin, 0) / allJobs.length) : 0;

  return (
    <PartnerLayout>
      {/* -- Mode Toggle Header ------------------------------------------- */}
      <div
        className="rounded-2xl p-5 mb-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
      >
        {/* Decorative glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #D97706, transparent)", transform: "translate(30%, -30%)" }}
        />

        <div className="flex items-center justify-between flex-wrap gap-4 relative">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">ProLnk Exchange</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">BETA</span>
            </div>
            <h1 className="text-white text-2xl font-bold">Job Board & Broker Exchange</h1>
            <p className="text-white/60 text-sm mt-1">Post jobs. Find work. Earn broker commissions. No tools required.</p>
          </div>

          {/* Mode toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
            <button
              onClick={() => setMode("find")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                mode === "find"
                  ? "bg-amber-500 text-white shadow-lg"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Search className="w-4 h-4" /> Find Jobs
            </button>
            <button
              onClick={() => setMode("post")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                mode === "post"
                  ? "bg-amber-500 text-white shadow-lg"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Plus className="w-4 h-4" /> Post a Job
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-white/10">
          {[
            { label: "Open Jobs", value: allJobs.length.toString(), icon: Briefcase },
            { label: "Total GMV", value: `$${(totalGMV / 1000).toFixed(0)}K`, icon: TrendingUp },
            { label: "Avg Margin", value: `${avgMargin}%`, icon: DollarSign },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* -- Post Mode --------------------------------------------------- */}
      {mode === "post" && (
        <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 p-10 text-center mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#FEF3C7" }}>
            <Plus className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Post a Job Package</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
            Have a job you want to broker out? Post it to the Exchange, set your commission margin, and let verified ProLnk partners bid on it. You earn the broker fee -- no tools, no crew, no liability.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-6">
            {[
              { label: "Set your margin", desc: "3-25% of job value" },
              { label: "Verified subs only", desc: "Licensed & insured" },
              { label: "You earn on close", desc: "Platform handles payout" },
            ].map((f) => (
              <div key={f.label} className="text-center">
                <p className="text-xs font-bold text-amber-800">{f.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
              </div>
            ))}
          </div>
          <Button
            className="text-white font-semibold px-8 py-3 text-base"
            style={{ backgroundColor: "#D97706" }}
            onClick={() => setShowPostModal(true)}
          >
            <Plus className="w-5 h-5 mr-2" /> Post a Job Now
          </Button>
        </div>
      )}

      {/* -- Find Mode -- Filters ------------------------------------------ */}
      {mode === "find" && (
        <>
          <div className="flex flex-wrap gap-3 mb-5">
            {/* Search */}
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Type filter */}
            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
              {(["all", "residential", "commercial"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    typeFilter === t ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {/* Trade filter */}
            <select
              value={tradeFilter}
              onChange={(e) => setTradeFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
            >
              <option value="all">All Trades</option>
              {Array.from(new Set(allJobs.map((j) => j.trade))).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Showing <strong className="text-gray-900">{filteredJobs.length}</strong> open jobs
              {typeFilter !== "all" && `  ${typeFilter}`}
              {tradeFilter !== "all" && `  ${tradeFilter}`}
            </p>
            <button
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors"
              onClick={() => setShowPostModal(true)}
            >
              <Plus className="w-3.5 h-3.5" /> Post a Job
            </button>
          </div>

          {/* Job cards */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} onCalc={(v) => setCalcValue(v)} />
            ))}
            {filteredJobs.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No jobs match your filters</p>
                <p className="text-sm mt-1">Try adjusting the trade or type filter</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Modals */}
      {showPostModal && <PostJobModal onClose={() => setShowPostModal(false)} />}
      {calcValue !== null && <CommissionCalculator jobValue={calcValue} onClose={() => setCalcValue(null)} />}
    </PartnerLayout>
  );
}
