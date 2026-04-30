import { useState } from "react";

const steps = [
  {
    id: 1,
    icon: "",
    label: "Job Photo Taken",
    actor: "Referring Pro",
    actorLabel: "Referring Partner",
    actorColor: "#0ea5e9",
    description: "A lawn care tech finishes mowing and takes before/after photos for the customer record -- same as always.",
    detail: "No extra work. Photos are already part of the job completion workflow.",
    bg: "from-sky-900 to-sky-800",
    border: "border-sky-500",
  },
  {
    id: 2,
    icon: "[BOT]",
    label: "AI Scans the Photo",
    actor: "ProLnk AI",
    actorLabel: "ProLnk Platform",
    actorColor: "#14b8a6",
    description: "ProLnk's AI analyzes the photo and detects opportunities -- a fence that needs staining, drainage issues, a cracked driveway.",
    detail: "ProLnk AI identifies 50+ opportunity types across all home service trades -- from aging HVAC systems to fence damage, drainage issues, and more.",
    bg: "from-teal-900 to-teal-800",
    border: "border-[#0A1628]/40",
  },
  {
    id: 3,
    icon: "",
    label: "Lead Routed to Partner",
    actor: "ProLnk",
    actorLabel: "ProLnk Platform",
    actorColor: "#14b8a6",
    description: "ProLnk matches the detected opportunity to the best-fit partner in the network and routes the qualified lead automatically.",
    detail: "Matching considers trade category, geography, tier, and historical performance score.",
    bg: "from-teal-900 to-teal-800",
    border: "border-[#0A1628]/40",
  },
  {
    id: 4,
    icon: "",
    label: "Deal Sent to Homeowner",
    actor: "Homeowner",
    actorLabel: "Customer",
    actorColor: "#f59e0b",
    description: "The homeowner receives a job completion notification with before/after photos -- plus a bundled offer from the matched partner.",
    detail: "Delivered at the moment of highest trust: right after their service is complete.",
    bg: "from-amber-900 to-amber-800",
    border: "border-amber-400",
  },
  {
    id: 5,
    icon: "",
    label: "Receiving Pro Closes the Job",
    actor: "Receiving Pro",
    actorLabel: "Receiving Partner",
    actorColor: "#a78bfa",
    description: "The fence company, HVAC tech, or pest control pro closes the job. They pay a single referral fee -- far cheaper than any paid ad.",
    detail: "Example: $2,500 fence job  Receiving Pro pays 11% referral fee ($275 total).",
    bg: "from-violet-900 to-violet-800",
    border: "border-violet-400",
  },
  {
    id: 6,
    icon: "[MONEY]",
    label: "Commission Split",
    actor: "Split",
    actorLabel: "Everyone Wins",
    actorColor: "#22c55e",
    description: "The referral fee is split: Referring Pro earns a commission for the photo they already took. ProLnk keeps a platform fee. Receiving Pro got a qualified lead at near-zero CAC.",
    detail: "Referring Pro: 6% ($150)  ProLnk: 5% ($125)  Receiving Pro nets: $2,225",
    bg: "from-green-900 to-green-800",
    border: "border-green-400",
  },
];

const parties = [
  {
    name: "Referring Pro",
    label: "Referring Partner",
    color: "#0ea5e9",
    bg: "bg-sky-900/50",
    border: "border-sky-500",
    icon: "",
    role: "Takes the job photo. Earns referral commission.",
    example: "Lawn care company, pest control, pool service",
    earns: "6% of closed job value",
    pays: "Nothing -- earns passively",
  },
  {
    name: "ProLnk",
    label: "Platform",
    color: "#14b8a6",
    bg: "bg-teal-900/50",
    border: "border-[#0A1628]/40",
    icon: "",
    role: "Detects opportunity, routes lead, manages communications.",
    example: "AI analysis + referral network",
    earns: "5% platform fee + monthly subscription",
    pays: "Referring Pro's commission from the referral fee",
  },
  {
    name: "Receiving Pro",
    label: "Receiving Partner",
    color: "#a78bfa",
    bg: "bg-violet-900/50",
    border: "border-violet-400",
    icon: "",
    role: "Receives the qualified lead. Closes the job. Pays referral fee.",
    example: "Fence company, HVAC, plumber, roofer",
    earns: "New job revenue at near-zero CAC",
    pays: "11% referral fee on closed job value",
  },
  {
    name: "Homeowner",
    label: "Customer",
    color: "#f59e0b",
    bg: "bg-amber-900/50",
    border: "border-amber-400",
    icon: "",
    role: "Receives job completion notification + bundled deal.",
    example: "Any homeowner who had a service done",
    earns: "Trusted, vetted pros. No cold calls. No scams.",
    pays: "Normal job price -- no hidden fees to homeowners",
  },
];

export function ProLnkFlowInfographic() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [activeParty, setActiveParty] = useState<string | null>(null);

  return (
    <div className="w-full bg-[#050d1a] rounded-2xl overflow-hidden border border-slate-800 font-sans">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-800 bg-gradient-to-r from-[#050d1a] to-[#0a1628]">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl"></span>
          <h2 className="text-white text-xl font-bold tracking-tight">How ProLnk Works</h2>
        </div>
        <p className="text-slate-400 text-sm">Every job photo becomes a qualified lead. Every closed job generates a commission. Zero extra work.</p>
      </div>

      {/* Flow Steps */}
      <div className="px-8 py-6">
        <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-widest mb-4">The 6-Step Flow</h3>
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-sky-500 via-teal-400 to-green-400 opacity-30 hidden md:block" />

          <div className="space-y-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`relative flex gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  activeStep === step.id
                    ? `${step.border} bg-white/5`
                    : "border-slate-800 hover:border-slate-600 bg-slate-900/30"
                }`}
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              >
                {/* Step number + icon */}
                <div className="flex-shrink-0 flex flex-col items-center gap-1">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 bg-slate-900"
                    style={{ borderColor: step.actorColor }}
                  >
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-500">#{step.id}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-white font-semibold text-sm">{step.label}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: step.actorColor + "22", color: step.actorColor }}
                    >
                      {step.actorLabel}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                  {activeStep === step.id && (
                    <div className="mt-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-slate-300 text-xs leading-relaxed">{step.detail}</p>
                    </div>
                  )}
                </div>

                {/* Expand indicator */}
                <div className="flex-shrink-0 self-center">
                  <span className="text-slate-600 text-lg">{activeStep === step.id ? "" : ""}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commission Example */}
      <div className="px-8 py-6 border-t border-slate-800 bg-slate-900/50">
        <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-widest mb-4">Live Example -- $2,500 Fence Job</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="p-4 rounded-xl bg-sky-900/30 border border-sky-800">
            <div className="text-sky-400 text-xs font-semibold uppercase tracking-wide mb-1">Referring Pro Earns</div>
            <div className="text-white text-2xl font-bold">$150</div>
            <div className="text-sky-300 text-xs mt-1">6% referral commission</div>
            <div className="text-slate-500 text-xs mt-1">For a photo they already took</div>
          </div>
          <div className="p-4 rounded-xl bg-teal-900/30 border border-teal-800">
            <div className="text-[#0A1628]/70 text-xs font-semibold uppercase tracking-wide mb-1">ProLnk Earns</div>
            <div className="text-white text-2xl font-bold">$125</div>
            <div className="text-teal-300 text-xs mt-1">5% platform fee</div>
            <div className="text-slate-500 text-xs mt-1">Plus monthly subscription</div>
          </div>
          <div className="p-4 rounded-xl bg-violet-900/30 border border-violet-800">
            <div className="text-violet-400 text-xs font-semibold uppercase tracking-wide mb-1">Receiving Pro Pays</div>
            <div className="text-white text-2xl font-bold">$275</div>
            <div className="text-violet-300 text-xs mt-1">11% total referral fee</div>
            <div className="text-slate-500 text-xs mt-1">Nets $2,225 on the job</div>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-green-900/20 border border-green-800/50">
          <p className="text-green-300 text-xs">
            <span className="font-semibold">vs. Angi/HomeAdvisor:</span> Receiving Pro would pay $80-$200 per <span className="italic">unqualified</span> lead with no guarantee of closing. ProLnk charges $275 only on a <span className="font-semibold">closed $2,500 job</span> -- a qualified, completed transaction.
          </p>
        </div>
      </div>

      {/* Party Cards */}
      <div className="px-8 py-6 border-t border-slate-800">
        <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-widest mb-4">The Four Parties -- Click to Explore</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {parties.map((party) => (
            <div
              key={party.name}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                activeParty === party.name
                  ? `${party.border} ${party.bg}`
                  : "border-slate-800 bg-slate-900/30 hover:border-slate-600"
              }`}
              onClick={() => setActiveParty(activeParty === party.name ? null : party.name)}
            >
              <div className="text-2xl mb-2">{party.icon}</div>
              <div className="text-white font-bold text-sm">{party.name}</div>
              <div className="text-xs mt-0.5" style={{ color: party.color }}>{party.label}</div>
              {activeParty === party.name && (
                <div className="mt-3 space-y-2">
                  <p className="text-slate-400 text-xs leading-relaxed">{party.role}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Earns:</span>
                      <span className="text-green-400 font-medium">{party.earns}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Pays:</span>
                      <span className="text-slate-300">{party.pays}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs italic">{party.example}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer tagline */}
      <div className="px-8 py-4 border-t border-slate-800 bg-gradient-to-r from-teal-900/20 to-sky-900/20">
        <p className="text-center text-slate-400 text-sm">
          <span className="text-white font-semibold">Patent Pending.</span> The first AI upsell engine built for home service businesses.{" "}
          <span className="text-[#0A1628]/70 font-medium">Every job photo becomes a lead.</span>
        </p>
      </div>
    </div>
  );
}
