import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Home, DollarSign, TrendingDown, CheckCircle, Circle,
  ChevronDown, ChevronUp, ExternalLink, AlertTriangle, Info,
} from "lucide-react";
import { toast } from "sonner";

const D = {
  bg: "#0D0F14″,
  surface: "#13161E",
  card: "#1A1E2A",
  border: "#252A3A",
  text: "#F0F2FF",
  muted: "#8B91A8″,
  dim: "#555B72″,
  cyan: "#00D4FF",
  green: "#00E676″,
  amber: "#FFB300″,
  red: "#FF4444″,
  blue: "#3B82F6″,
  teal: "#14B8A6″,
  purple: "#A855F7″,
};

const APPEAL_STEPS = [
  {
    num: 1,
    title: "Get a Comparative Market Analysis",
    body: "Request a free CMA from a local real estate agent or use Zillow/Redfin to pull recent sales data. You need homes that sold within the past 12 months within a half-mile radius.",
  },
  {
    num: 2,
    title: "Find Comparable Properties",
    body: "Identify 3–5 comps with similar square footage (±15%), year built (±10 years), lot size, and condition. Download the CAD records for each comp from the Collin Central Appraisal District.",
  },
  {
    num: 3,
    title: "File by May 15 Deadline",
    body: "Submit your protest online at collincad.org or by mail. You must protest before May 15 or 30 days after your appraisal notice, whichever is later. File even if you don't have all your evidence yet.",
  },
  {
    num: 4,
    title: "Attend Informal Hearing",
    body: "Meet with an appraiser (usually by phone or in person) and present your comps. Many protests are resolved here with a reduction. Bring your CMA, comp data, and any photos of issues.",
  },
  {
    num: 5,
    title: "Formal ARB Hearing if Needed",
    body: "If the informal hearing doesn't resolve it, request an Appraisal Review Board hearing. Present your evidence to a 3-member panel. You can also use a property tax consultant on contingency.",
  },
];

const EXEMPTIONS = [
  { label: "Homestead Exemption", status: "applied", savings: "~$1,900/yr", note: "20% off assessed value for primary residence" },
  { label: "Over-65 Exemption", status: "na", savings: "Up to $10K off", note: "Available at age 65+" },
  { label: "Disabled Veteran", status: "na", savings: "Up to 100% exemption", note: "Varies by disability rating" },
  { label: "Agricultural (1-d-1)", status: "na", savings: "Varies", note: "5+ acres actively farmed or ranched" },
];

export default function PropertyTaxGuide() {
  const [openStep, setOpenStep] = useState<number | null>(null);

  function toggleStep(num: number) {
    setOpenStep((prev) => (prev === num ? null : num));
  }

  return (
    <HomeownerLayout>
      <div className="space-y-8 max-w-4xl" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3″ style={{ color: D.text }}>
            <Home className="w-8 h-8″ style={{ color: D.teal }} />
            Property Tax Guide
          </h1>
          <p className="mt-1 text-sm" style={{ color: D.muted }}>Know what you owe and how to fight it</p>
        </div>

        {/* Tax Snapshot */}
        <div
          className="rounded-2xl p-6″
          style={{ background: `linear-gradient(135deg, ${D.teal}10, ${D.blue}10)`, border: `1px solid ${D.teal}30` }}
        >
          <div className="flex items-center gap-2 mb-4″>
            <Home className="w-5 h-5″ style={{ color: D.teal }} />
            <h2 className="text-lg font-bold" style={{ color: D.text }}>Your Tax Snapshot</h2>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${D.teal}22`, color: D.teal }}>Frisco TX 75034</span>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-6″>
            {[
              { label: "Assessed Value", value: "$462,000″, color: D.text },
              { label: "Tax Rate", value: "2.14%", color: D.amber },
              { label: "Annual Taxes", value: "$9,887″, color: D.red },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-xs uppercase tracking-wider font-semibold mb-1″ style={{ color: D.muted }}>{s.label}</p>
                <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4″>
            <div className="rounded-xl p-4″ style={{ background: D.card, border: `1px solid ${D.green}30` }}>
              <p className="text-xs font-semibold mb-1″ style={{ color: D.green }}>PAID</p>
              <p className="text-xl font-black" style={{ color: D.text }}>$4,943</p>
              <p className="text-xs" style={{ color: D.muted }}>1st installment paid</p>
            </div>
            <div className="rounded-xl p-4″ style={{ background: D.card, border: `1px solid ${D.amber}30` }}>
              <p className="text-xs font-semibold mb-1″ style={{ color: D.amber }}>DUE</p>
              <p className="text-xl font-black" style={{ color: D.text }}>$4,944</p>
              <p className="text-xs" style={{ color: D.muted }}>Due by Dec 31, 2026</p>
            </div>
          </div>
        </div>

        {/* Over-Assessed? */}
        <div className="rounded-2xl p-6″ style={{ background: D.card, border: `1px solid ${D.amber}30` }}>
          <div className="flex items-center gap-2 mb-5″>
            <AlertTriangle className="w-5 h-5″ style={{ color: D.amber }} />
            <h2 className="text-lg font-bold" style={{ color: D.text }}>Are You Over-Assessed?</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-5″>
            {[
              { label: "Your Assessed Value", value: "$462K", note: "CAD official", color: D.amber },
              { label: "Est. Market Value", value: "$485K", note: "Redfin/Zillow avg", color: D.blue },
              { label: "Neighborhood Avg Assessment", value: "$448K", note: "Similar homes nearby", color: D.teal },
            ].map((c) => (
              <div key={c.label} className="rounded-xl p-4 text-center" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
                <p className="text-xs font-semibold mb-2″ style={{ color: D.muted }}>{c.label}</p>
                <p className="text-2xl font-black" style={{ color: c.color }}>{c.value}</p>
                <p className="text-xs mt-1″ style={{ color: D.dim }}>{c.note}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-4 flex items-start gap-3″ style={{ background: `${D.amber}10`, border: `1px solid ${D.amber}30` }}>
            <Info className="w-5 h-5 mt-0.5 shrink-0″ style={{ color: D.amber }} />
            <div>
              <p className="font-semibold text-sm" style={{ color: D.amber }}>Your home may be over-assessed by $14,000</p>
              <p className="text-sm mt-0.5″ style={{ color: D.muted }}>An appeal could save you approximately <span className="font-bold" style={{ color: D.green }}>$299/year</span> in property taxes.</p>
            </div>
          </div>
        </div>

        {/* How to Appeal — Accordion */}
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${D.border}` }}>
          <div className="px-6 py-4″ style={{ background: D.card }}>
            <h2 className="text-lg font-bold" style={{ color: D.text }}>How to Appeal in 5 Steps</h2>
          </div>
          {APPEAL_STEPS.map((step) => {
            const isOpen = openStep === step.num;
            return (
              <div key={step.num} style={{ borderTop: `1px solid ${D.border}`, background: isOpen ? D.surface : D.card }}>
                <button
                  onClick={() => toggleStep(step.num)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
                >
                  <div className="flex items-center gap-4″>
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0″
                      style={{ background: `${D.teal}22`, color: D.teal }}
                    >
                      {step.num}
                    </span>
                    <span className="font-semibold text-sm" style={{ color: D.text }}>{step.title}</span>
                  </div>
                  {isOpen
                    ? <ChevronUp className="w-4 h-4 shrink-0″ style={{ color: D.muted }} />
                    : <ChevronDown className="w-4 h-4 shrink-0″ style={{ color: D.muted }} />
                  }
                </button>
                {isOpen && (
                  <div className="px-6 pb-5″>
                    <p className="text-sm leading-relaxed pl-11″ style={{ color: D.muted }}>{step.body}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Appeal Success Rate */}
        <div
          className="rounded-2xl p-5 flex items-center gap-4″
          style={{ background: `${D.green}10`, border: `1px solid ${D.green}30` }}
        >
          <TrendingDown className="w-8 h-8 shrink-0″ style={{ color: D.green }} />
          <div>
            <p className="font-bold" style={{ color: D.green }}>In Collin County, 67% of appeals result in a reduction</p>
            <p className="text-sm mt-0.5″ style={{ color: D.muted }}>Average savings: <span className="font-semibold" style={{ color: D.text }}>$312/year</span>. Most hearings take under 20 minutes.</p>
          </div>
        </div>

        {/* Exemptions Checker */}
        <div className="rounded-2xl p-6″ style={{ background: D.card, border: `1px solid ${D.border}` }}>
          <h2 className="text-lg font-bold mb-4″ style={{ color: D.text }}>Exemptions Checker</h2>
          <div className="space-y-3″>
            {EXEMPTIONS.map((ex) => (
              <div
                key={ex.label}
                className="flex items-start justify-between rounded-xl px-5 py-4″
                style={{ background: D.surface, border: `1px solid ${D.border}` }}
              >
                <div className="flex items-start gap-3″>
                  {ex.status === "applied"
                    ? <CheckCircle className="w-5 h-5 mt-0.5 shrink-0″ style={{ color: D.green }} />
                    : <Circle className="w-5 h-5 mt-0.5 shrink-0″ style={{ color: D.dim }} />
                  }
                  <div>
                    <p className="font-semibold text-sm" style={{ color: D.text }}>{ex.label}</p>
                    <p className="text-xs mt-0.5″ style={{ color: D.muted }}>{ex.note}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-4″>
                  <p className="text-xs font-semibold" style={{ color: ex.status === "applied" ? D.green : D.dim }}>
                    {ex.status === "applied" ? "✅ Applied" : "N/A"}
                  </p>
                  <p className="text-xs mt-0.5″ style={{ color: D.dim }}>{ex.savings}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Start My Appeal CTA */}
        <div
          className="rounded-2xl p-6″
          style={{ background: `linear-gradient(135deg, ${D.teal}10, ${D.cyan}08)`, border: `1px solid ${D.teal}40` }}
        >
          <h2 className="text-xl font-black mb-2″ style={{ color: D.text }}>Start My Appeal</h2>
          <p className="text-sm mb-4″ style={{ color: D.muted }}>
            File your protest at{" "}
            <a
              href="https://www.collincad.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline underline-offset-2″
              style={{ color: D.cyan }}
            >
              collincad.org <ExternalLink className="w-3 h-3″ />
            </a>
            . The deadline is May 15, 2026.
          </p>
          <div className="flex flex-wrap gap-3″>
            <a
              href="https://www.collincad.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: D.teal, color: "#0D0F14″ }}
            >
              <ExternalLink className="w-4 h-4″ />
              File at Collin CAD
            </a>
            <button
              onClick={() => toast.success("Building your appeal case — we'll reach out within 24 hours.")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: `${D.teal}22`, color: D.teal, border: `1px solid ${D.teal}44` }}
            >
              Help Me Build My Case
            </button>
          </div>
        </div>

      </div>
    </HomeownerLayout>
  );
}
