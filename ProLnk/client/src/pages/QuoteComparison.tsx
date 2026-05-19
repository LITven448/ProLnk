import React from 'react';
import { useState } from "react";
import {
  Star, Clock, Shield, BadgeCheck, ArrowRight,
  CheckCircle, MessageCircle, RefreshCw, ChevronLeft, ChevronRight,
  Trophy, Zap, ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Badge = "best-value" | "fastest" | "most-trusted";

interface Quote {
  id: number;
  proName: string;
  trade: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  price: number;
  priceNote: string;
  timeline: string;
  responseTime: string;
  notes: string;
  badge: Badge;
  yearsExperience: number;
  jobsCompleted: number;
}

const MOCK_QUOTES: Quote[] = [
  {
    id: 1,
    proName: "Marcus Johnson",
    trade: "HVAC Specialist",
    avatar: "MJ",
    rating: 4.9,
    reviewCount: 312,
    price: 485,
    priceNote: "Parts + Labor included",
    timeline: "Tomorrow, 8am–12pm",
    responseTime: "3 min ago",
    notes:
      "I've diagnosed this exact issue on Carrier 2-ton units many times. Likely the capacitor or refrigerant recharge. I'll bring both and only charge for what's used.",
    badge: "best-value",
    yearsExperience: 14,
    jobsCompleted: 847,
  },
  {
    id: 2,
    proName: "Elena Torres",
    trade: "HVAC & Refrigeration",
    avatar: "ET",
    rating: 5.0,
    reviewCount: 189,
    price: 620,
    priceNote: "Includes 1-year parts warranty",
    timeline: "Today, 3–6pm",
    responseTime: "12 min ago",
    notes:
      "Available same-day. Factory-certified on Carrier systems. Price includes a full diagnostic report you keep for your records — great for resale.",
    badge: "fastest",
    yearsExperience: 9,
    jobsCompleted: 421,
  },
  {
    id: 3,
    proName: "Derek Okafor",
    trade: "HVAC Master Tech",
    avatar: "DO",
    rating: 4.8,
    reviewCount: 574,
    price: 510,
    priceNote: "2-year labor warranty",
    timeline: "Thu–Fri, flexible",
    responseTime: "1 hr ago",
    notes:
      "Third-generation HVAC tech, 22 years on the job. I don't rush. Every system I touch gets a full safety inspection at no extra charge.",
    badge: "most-trusted",
    yearsExperience: 22,
    jobsCompleted: 1340,
  },
];

const BADGE_CONFIG: Record<Badge, { label: string; icon: React.ReactNode; color: string; border: string; bg: string }> = {
  "best-value": {
    label: "Best Value",
    icon: <Trophy className="w-3.5 h-3.5" />,
    color: "text-amber-300",
    border: "border-amber-400/40",
    bg: "bg-amber-500/10",
  },
  fastest: {
    label: "Fastest",
    icon: <Zap className="w-3.5 h-3.5" />,
    color: "text-blue-300",
    border: "border-blue-400/40",
    bg: "bg-blue-500/10",
  },
  "most-trusted": {
    label: "Most Trusted",
    icon: <ThumbsUp className="w-3.5 h-3.5" />,
    color: "text-emerald-300",
    border: "border-emerald-400/40",
    bg: "bg-emerald-500/10",
  },
};

const COMPARISON_ROWS = [
  { label: "Price", key: "price" as const },
  { label: "Timeline", key: "timeline" as const },
  { label: "Rating", key: "rating" as const },
  { label: "Response time", key: "responseTime" as const },
  { label: "Experience", key: "yearsExperience" as const },
  { label: "Jobs completed", key: "jobsCompleted" as const },
];

function renderComparisonValue(quote: Quote, key: keyof Quote): React.ReactNode {
  if (key === "price") {
    return (
      <div>
        <span className="font-bold text-white text-base">${quote.price}</span>
        <p className="text-white/40 text-xs mt-0.5">{quote.priceNote}</p>
      </div>
    );
  }
  if (key === "rating") {
    return (
      <div className="flex items-center gap-1">
        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span className="text-white font-semibold text-sm">{quote.rating}</span>
        <span className="text-white/40 text-xs">({quote.reviewCount})</span>
      </div>
    );
  }
  if (key === "yearsExperience") return <span className="text-white/80 text-sm">{quote.yearsExperience} yrs</span>;
  if (key === "jobsCompleted") return <span className="text-white/80 text-sm">{quote.jobsCompleted.toLocaleString()}</span>;
  return <span className="text-white/80 text-sm">{String(quote[key])}</span>;
}

function ProCard({
  quote,
  onAccept,
  onRevision,
  onMessage,
  accepted,
}: {
  quote: Quote;
  onAccept: () => void;
  onRevision: () => void;
  onMessage: () => void;
  accepted: boolean;
}) {
  const badge = BADGE_CONFIG[quote.badge];

  return (
    <div
      className={`relative flex flex-col bg-white/5 border rounded-2xl overflow-hidden h-full transition-all duration-300 ${
        accepted
          ? "border-green-400/50 ring-2 ring-green-400/30"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      {/* Badge */}
      <div
        className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.border} border ${badge.color}`}
      >
        {badge.icon}
        {badge.label}
      </div>

      {/* Header */}
      <div className="p-5 pb-4 border-b border-white/10">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/40 border border-indigo-400/30 flex items-center justify-center flex-shrink-0">
            <span className="text-indigo-200 font-bold text-sm">{quote.avatar}</span>
          </div>
          <div className="min-w-0 pr-16">
            <p className="text-white font-bold text-base leading-tight">{quote.proName}</p>
            <p className="text-indigo-300 text-xs mt-0.5">{quote.trade}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-amber-300 font-semibold text-xs">{quote.rating}</span>
              <span className="text-white/40 text-xs">({quote.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Verified pills */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { icon: <BadgeCheck className="w-3 h-3" />, label: "Licensed" },
            { icon: <Shield className="w-3 h-3" />, label: "Insured" },
            { icon: <CheckCircle className="w-3 h-3" />, label: "Background checked" },
          ].map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs"
            >
              {p.icon}
              {p.label}
            </div>
          ))}
        </div>
      </div>

      {/* Price & timeline */}
      <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10">
        <div className="p-4">
          <p className="text-white/50 text-xs mb-1">Quoted price</p>
          <p className="text-white font-black text-2xl">${quote.price}</p>
          <p className="text-white/40 text-xs mt-0.5">{quote.priceNote}</p>
        </div>
        <div className="p-4">
          <p className="text-white/50 text-xs mb-1">Availability</p>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <p className="text-white font-semibold text-sm">{quote.timeline}</p>
          </div>
          <p className="text-white/40 text-xs mt-1">Responded {quote.responseTime}</p>
        </div>
      </div>

      {/* Notes */}
      <div className="p-4 flex-1">
        <p className="text-white/50 text-xs mb-2 uppercase tracking-wide font-medium">Pro's notes</p>
        <p className="text-white/70 text-sm leading-relaxed">{quote.notes}</p>
      </div>

      {/* Actions */}
      <div className="p-4 pt-0 space-y-2">
        {accepted ? (
          <div className="flex items-center justify-center gap-2 h-11 rounded-xl bg-green-600/20 border border-green-400/40 text-green-300 font-semibold text-sm">
            <CheckCircle className="w-4 h-4" />
            Quote Accepted!
          </div>
        ) : (
          <Button
            onClick={onAccept}
            className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm"
          >
            Accept Quote <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        )}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={onRevision}
            className="h-9 border-white/20 text-white/70 hover:text-white hover:border-white/40 text-xs font-medium bg-transparent"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Request Revision
          </Button>
          <Button
            variant="outline"
            onClick={onMessage}
            className="h-9 border-white/20 text-white/70 hover:text-white hover:border-white/40 text-xs font-medium bg-transparent"
          >
            <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
            Message Pro
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function QuoteComparison() {
  const [acceptedId, setAcceptedId] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmName, setConfirmName] = useState("");

  const handleAccept = (quote: Quote) => {
    setAcceptedId(quote.id);
    setConfirmName(quote.proName);
    setShowConfirm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRevision = (quote: Quote) => {
    alert(`Revision request sent to ${quote.proName}. They'll respond within 2 hours.`);
  };

  const handleMessage = (quote: Quote) => {
    alert(`Opening message thread with ${quote.proName}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">

        {/* Acceptance confirmation banner */}
        {showConfirm && (
          <div className="mb-8 flex items-start gap-3 bg-green-900/40 border border-green-400/40 rounded-2xl p-5">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-white font-bold text-base">Quote accepted — {confirmName} is confirmed!</p>
              <p className="text-white/60 text-sm mt-1">
                You'll receive a booking confirmation email within minutes. {confirmName} will reach out
                directly to finalize the schedule.
              </p>
            </div>
            <button
              onClick={() => setShowConfirm(false)}
              className="text-white/40 hover:text-white/70 text-xs ml-2 flex-shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <a href="/get-quotes" className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-sm mb-4 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to request
          </a>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Compare Your Quotes</h1>
          <p className="text-white/60 text-base">
            3 verified pros responded to your HVAC request in ZIP 75034. Review and pick the best fit.
          </p>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid grid-cols-3 gap-5 mb-10">
          {MOCK_QUOTES.map((q) => (
            <ProCard
              key={q.id}
              quote={q}
              accepted={acceptedId === q.id}
              onAccept={() => handleAccept(q)}
              onRevision={() => handleRevision(q)}
              onMessage={() => handleMessage(q)}
            />
          ))}
        </div>

        {/* Mobile: tabbed carousel */}
        <div className="md:hidden mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1.5">
              {MOCK_QUOTES.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setMobileIndex(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    i === mobileIndex
                      ? "bg-indigo-600 text-white"
                      : "bg-white/10 text-white/60 hover:bg-white/20"
                  }`}
                >
                  {q.proName.split(" ")[0]}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setMobileIndex((i) => Math.max(0, i - 1))}
                disabled={mobileIndex === 0}
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 disabled:opacity-30 hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileIndex((i) => Math.min(MOCK_QUOTES.length - 1, i + 1))}
                disabled={mobileIndex === MOCK_QUOTES.length - 1}
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 disabled:opacity-30 hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <ProCard
            quote={MOCK_QUOTES[mobileIndex]}
            accepted={acceptedId === MOCK_QUOTES[mobileIndex].id}
            onAccept={() => handleAccept(MOCK_QUOTES[mobileIndex])}
            onRevision={() => handleRevision(MOCK_QUOTES[mobileIndex])}
            onMessage={() => handleMessage(MOCK_QUOTES[mobileIndex])}
          />
        </div>

        {/* Side-by-side comparison table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10">
            <h2 className="text-white font-bold text-base">Side-by-Side Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-5 py-3 text-white/50 text-xs font-medium uppercase tracking-wide w-32">
                    Criteria
                  </th>
                  {MOCK_QUOTES.map((q) => {
                    const badge = BADGE_CONFIG[q.badge];
                    return (
                      <th key={q.id} className="text-left px-5 py-3">
                        <div>
                          <p className="text-white font-semibold text-sm">{q.proName.split(" ")[0]}</p>
                          <div
                            className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs ${badge.bg} ${badge.color} ${badge.border} border`}
                          >
                            {badge.icon}
                            {badge.label}
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, rowIdx) => (
                  <tr
                    key={row.key}
                    className={`border-b border-white/5 ${rowIdx % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                  >
                    <td className="px-5 py-3.5 text-white/50 text-xs font-medium">{row.label}</td>
                    {MOCK_QUOTES.map((q) => (
                      <td key={q.id} className="px-5 py-3.5">
                        {renderComparisonValue(q, row.key)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-6 flex items-center gap-2 justify-center">
          <Shield className="w-4 h-4 text-white/30" />
          <p className="text-white/30 text-xs text-center">
            All pros are licensed, insured, and background-checked before joining ProLnk.
            Payments are held in escrow until the job is complete.
          </p>
        </div>
      </div>
    </div>
  );
}
