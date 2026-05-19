import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText, Download, ChevronDown, ChevronRight,
  TrendingUp, Users, DollarSign, Target, Globe,
  Shield, Zap, BarChart3, Building2, Lightbulb,
  CheckSquare, Square, AlertTriangle, CheckCircle,
  Calendar, Flag, Layers
} from "lucide-react";

const SUMMARY_STATS = [
  { label: "TAM", value: "$600B", sub: "US Home Services" },
  { label: "SAM", value: "$120B", sub: "Referral-Addressable" },
  { label: "Break-even", value: "500 Pros", sub: "$74.5K MRR" },
  { label: "Net Margin", value: "85%", sub: "At 10K pros" },
  { label: "LTV:CAC", value: "14.4×", sub: "Unit economics" },
  { label: "Pre-Seed Ask", value: "$750K", sub: "SAFE, $8M cap" },
];

const GTM_TIMELINE = [
  {
    phase: "Phase 1″,
    label: "DFW Launch",
    period: "Months 1–6 (May–Oct 2026)",
    color: "#22c55e",
    goals: [
      "Fill Charter tier (25 spots) and open Founding tier (100 spots)",
      "Activate Home Health Vault for 10,000+ DFW homes",
      "Deploy all 47 AI agents — autonomous ops from day one",
      "Reach 500 active partners → breakeven at $74.5K MRR",
      "Complete SAFE round: $750K at $8M cap",
    ],
    kpi: "500 partners / $74.5K MRR",
  },
  {
    phase: "Phase 2″,
    label: "Texas Expansion",
    period: "Months 7–18 (Nov 2026–Apr 2027)",
    color: "#3b82f6″,
    goals: [
      "Expand to Houston, Austin, San Antonio",
      "Hire 3 market managers (1 per city)",
      "Scale to 2,125 total founding partners (all tiers filled)",
      "Launch Stripe commission payouts and automated 1099 flow",
      "Raise Seed round: $3M at $15M cap",
    ],
    kpi: "2,125 partners / $316K MRR",
  },
  {
    phase: "Phase 3″,
    label: "National Rollout",
    period: "Months 19–36 (May 2027–Apr 2028)",
    color: "#a855f7″,
    goals: [
      "Expand to Phoenix, Atlanta, Denver, Nashville, Charlotte",
      "FSM platform integrations (Jobber, HCP, ServiceTitan)",
      "Scale to 5,000 active partners",
      "Home Health Vault at 1M+ properties",
      "Series A: $10M+ at $50M+ valuation",
    ],
    kpi: "5,000 partners / $745K MRR",
  },
];

const FINANCIALS = [
  { metric: "Active Partners", y1: "2,125″, y2: "5,000", y3: "10,000" },
  { metric: "Monthly MRR (Subscription)", y1: "$316K", y2: "$745K", y3: "$1.49M" },
  { metric: "Annual Subscription Revenue", y1: "$3.8M", y2: "$8.9M", y3: "$17.9M" },
  { metric: "Match/Commission Revenue", y1: "$420K", y2: "$1.2M", y3: "$3.8M" },
  { metric: "Total ARR", y1: "$4.2M", y2: "$10.1M", y3: "$21.7M" },
  { metric: "Gross Margin", y1: "78%", y2: "82%", y3: "85%" },
  { metric: "EBITDA", y1: "$820K", y2: "$3.1M", y3: "$8.9M" },
  { metric: "Headcount", y1: "8 FTEs", y2: "22 FTEs", y3: "45 FTEs" },
];

const COMPETITIVE = [
  { name: "Angi / HomeAdvisor", model: "Pay-per-lead", price: "$50–200/lead", network: false, aiMatch: false, dataAsset: false, incomeStreams: 0, verdict: "Commoditized leads. High cost, low conversion." },
  { name: "Thumbtack", model: "Bidding marketplace", price: "$15–90/lead", network: false, aiMatch: false, dataAsset: false, incomeStreams: 0, verdict: "Race to bottom. No retention mechanics." },
  { name: "HomeAdvisor (Yelp)", model: "Review platform", price: "Ad-based", network: false, aiMatch: false, dataAsset: false, incomeStreams: 0, verdict: "Passive. No active referral mechanism." },
  { name: "Neighborly", model: "Franchise network", price: "Franchise fee", network: true, aiMatch: false, dataAsset: false, incomeStreams: 1, verdict: "Slow expansion, capital-intensive, franchise lock-in." },
  { name: "ProLnk", model: "Network economy", price: "$149/mo locked", network: true, aiMatch: true, dataAsset: true, incomeStreams: 5, verdict: "Structural retention, data moat, AI compound effect.", isUs: true },
];

const RISK_MATRIX = [
  { risk: "Partner churn before network effects", probability: "Medium", impact: "High", mitigation: "90-day trial, 5-stream lock-in, founding price guarantee" },
  { risk: "AI false positives erode trust", probability: "Medium", impact: "High", mitigation: "75%+ confidence threshold, human review queue, opt-out" },
  { risk: "FSM platform (Jobber) builds competing feature", probability: "Low", impact: "High", mitigation: "Deep integration makes us additive; patent pending" },
  { risk: "Commission circumvention (pros go direct)", probability: "Medium", impact: "Medium", mitigation: "Stripe Connect verification, clawback clause in partner agreement" },
  { risk: "Regulatory / contractor licensing", probability: "Low", impact: "Medium", mitigation: "Automated license/COI verification via third-party API" },
  { risk: "Homeowner privacy (photo analysis)", probability: "Low", impact: "Medium", mitigation: "Explicit consent, AES-256 encryption, no PII in AI pipeline" },
  { risk: "Capital constraints (runway)", probability: "Medium", impact: "High", mitigation: "Break-even at 500 pros; aggressive for AI startup credits ($1.55M available)" },
  { risk: "Key person dependency (single founder)", probability: "Medium", impact: "High", mitigation: "Board formation, advisory hires, operations documented in AI agents" },
  { risk: "Market timing (recession risk)", probability: "Low", impact: "Medium", mitigation: "Home services is recession-resilient; repair always needed" },
];

const MILESTONES = [
  { id: "m1″, label: "Platform launched, waitlist live", done: true, date: "May 2026" },
  { id: "m2″, label: "Charter tier (25 spots) filled", done: true, date: "May 2026" },
  { id: "m3″, label: "TrustyPro AI scan system live", done: true, date: "May 2026" },
  { id: "m4″, label: "47 AI agents deployed (autonomous ops)", done: true, date: "May 2026" },
  { id: "m5″, label: "Home Health Vault: 10,000 DFW homes", done: false, date: "Jun 2026" },
  { id: "m6″, label: "Founding tier (100 spots) filled", done: false, date: "Jul 2026" },
  { id: "m7″, label: "500 active partners — breakeven", done: false, date: "Sep 2026" },
  { id: "m8″, label: "SAFE close: $750K at $8M cap", done: false, date: "Oct 2026" },
  { id: "m9″, label: "Stripe payouts + 1099 automation live", done: false, date: "Oct 2026" },
  { id: "m10″, label: "2,125 founding partners (all tiers filled)", done: false, date: "Mar 2027" },
  { id: "m11″, label: "Texas market expansion (3 cities)", done: false, date: "Apr 2027" },
  { id: "m12″, label: "Seed round: $3M at $15M cap", done: false, date: "May 2027" },
];

function ProbBadge({ level }: { level: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    Low: { bg: "#22c55e18″, color: "#22c55e" },
    Medium: { bg: "#f59e0b18″, color: "#f59e0b" },
    High: { bg: "#ef444418″, color: "#ef4444" },
  };
  const c = colors[level] || colors.Medium;
  return <span style={{ fontSize: 11, fontWeight: 700, background: c.bg, color: c.color, borderRadius: 4, padding: "2px 8px" }}>{level}</span>;
}

export default function BusinessPlan() {
  const [activeTab, setActiveTab] = useState<"summary" | "gtm" | "financials" | "competitive" | "risks" | "milestones">("summary");
  const [milestones, setMilestones] = useState(MILESTONES);
  const [expandedRisk, setExpandedRisk] = useState<number | null>(null);

  function toggleMilestone(id: string) {
    setMilestones(ms => ms.map(m => m.id === id ? { ...m, done: !m.done } : m));
  }

  function handleExport() {
    window.print();
  }

  const doneCount = milestones.filter(m => m.done).length;
  const tabs = [
    { id: "summary", label: "Executive Summary", icon: Lightbulb },
    { id: "gtm", label: "Go-to-Market", icon: Calendar },
    { id: "financials", label: "Financials", icon: BarChart3 },
    { id: "competitive", label: "Competitive", icon: Shield },
    { id: "risks", label: "Risk Matrix", icon: AlertTriangle },
    { id: "milestones", label: "Milestones", icon: Flag },
  ] as const;

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3″>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2″>
              <FileText className="w-6 h-6 text-teal-400″ />
              ProLnk Business Plan
            </h1>
            <p className="text-slate-400 text-sm mt-1″>Internal — Confidential</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30″>Pre-Seed Stage</Badge>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30″>$750K Ask</Badge>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30″>{doneCount}/{milestones.length} Milestones</Badge>
            <Button onClick={handleExport} className="bg-teal-600 hover:bg-teal-700 text-white gap-2 text-sm">
              <Download className="w-4 h-4″ /> Export PDF
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6″>
          {SUMMARY_STATS.map(s => (
            <Card key={s.label} className="bg-slate-800/50 border-slate-700″>
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-teal-400″>{s.value}</div>
                <div className="text-xs text-slate-300 font-semibold mt-1″>{s.label}</div>
                <div className="text-xs text-slate-500″>{s.sub}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tab Nav */}
        <div className="flex gap-1 mb-6 flex-wrap border-b border-slate-700 pb-0″>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors border-b-2 ${
                  active
                    ? "text-teal-300 border-teal-400 bg-slate-800/50″
                    : "text-slate-500 border-transparent hover:text-slate-300 hover:border-slate-600″
                }`}
              >
                <Icon className="w-4 h-4″ /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Executive Summary */}
        {activeTab === "summary" && (
          <div className="space-y-6″>
            <Card className="bg-slate-800/50 border-slate-700″>
              <CardContent className="p-6″>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2″>
                  <Lightbulb className="w-5 h-5 text-yellow-400″ /> Executive Summary
                </h2>
                <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                  <p>
                    <strong className="text-white">ProLnk</strong> is an AI-powered home services network that transforms the $600B home services market's broken referral infrastructure into a self-sustaining network economy. The platform combines two brands: <strong className="text-green-400″>ProLnk</strong> (the professional partner network) and <strong className="text-blue-400″>TrustyPro</strong> (the homeowner platform with the Home Health Vault), connected by AI-powered lead matching and a proprietary 5-stream income model.
                  </p>
                  <p>
                    <strong className="text-white">The Problem:</strong> Home service contractors spend 15–30% of revenue on marketing with declining ROI. Homeowners can't find trusted professionals. No platform owns the full relationship — and no one has built a durable data moat around the 140M homes in the US.
                  </p>
                  <p>
                    <strong className="text-white">The Solution:</strong> ProLnk's Network Income System gives every partner 5 independent income streams — direct commissions (12–70%), a 4-level network cascade, recurring subscription overrides, homeowner lead fees, and permanent origination rights tied to homes in the Vault. This creates structural retention: once a partner’s earnings compound across the network, switching becomes economically irrational.
                  </p>
                  <p>
                    <strong className="text-white">The Moat:</strong> The Home Health Vault targets 50M+ US homes as a permanent property data asset. Structural health records, AI visual scans, and maintenance history — locked to the property, not the user. After 500K scans, the model becomes an uncopyable competitive advantage.
                  </p>
                  <p>
                    <strong className="text-white">Traction:</strong> Platform is live as of May 2026. Charter tier open. 800K+ DFW homes mapped across 93 trade categories. 47 autonomous AI agents handle 80% of platform operations from day one. Break-even at 500 active partners ($74.5K MRR). Pre-seed ask: $750K SAFE at $8M cap.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6″>
              <Card className="bg-slate-800/50 border-slate-700″>
                <CardContent className="p-6″>
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2″>
                    <DollarSign className="w-4 h-4 text-green-400″ /> Revenue Model
                  </h3>
                  <div className="space-y-3″>
                    {[
                      { stream: "Subscription SaaS", detail: "$149/mo × active partners", pct: "65%" },
                      { stream: "Match Commissions", detail: "12–70% per closed job", pct: "25%" },
                      { stream: "Network Overrides", detail: "Cascade up to 4 levels", pct: "7%" },
                      { stream: "Data & Origination", detail: "Vault origination rights", pct: "3%" },
                    ].map(r => (
                      <div key={r.stream} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0″>
                        <div>
                          <div className="text-sm font-semibold text-slate-200″>{r.stream}</div>
                          <div className="text-xs text-slate-500″>{r.detail}</div>
                        </div>
                        <span className="text-sm font-bold text-teal-400″>{r.pct}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700″>
                <CardContent className="p-6″>
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2″>
                    <Target className="w-4 h-4 text-red-400″ /> Investment Ask
                  </h3>
                  <div className="space-y-3″>
                    {[
                      { item: "Instrument", value: "SAFE Note" },
                      { item: "Amount", value: "$750K" },
                      { item: "Valuation Cap", value: "$8M pre-money" },
                      { item: "Discount", value: "20% on Seed" },
                      { item: "Runway", value: "18 months" },
                      { item: "Use of Funds", value: "GTM (40%), Eng (30%), Ops (20%), G&A (10%)" },
                    ].map(r => (
                      <div key={r.item} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0″>
                        <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">{r.item}</span>
                        <span className="text-sm font-semibold text-slate-200″>{r.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Go-to-Market */}
        {activeTab === "gtm" && (
          <div className="space-y-5″>
            <h2 className="text-lg font-bold text-white flex items-center gap-2″>
              <Calendar className="w-5 h-5 text-blue-400″ /> 36-Month Go-to-Market Roadmap
            </h2>
            {GTM_TIMELINE.map((phase, i) => (
              <Card key={phase.phase} className="bg-slate-800/50 border-slate-700″>
                <CardContent className="p-6″>
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-4″>
                    <div className="flex items-center gap-3″>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-black" style={{ background: phase.color }}>
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-base font-bold text-white">{phase.phase}: {phase.label}</div>
                        <div className="text-xs text-slate-500″>{phase.period}</div>
                      </div>
                    </div>
                    <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ background: `${phase.color}18`, color: phase.color }}>
                      Target: {phase.kpi}
                    </span>
                  </div>
                  <ul className="space-y-2″>
                    {phase.goals.map(g => (
                      <li key={g} className="flex items-start gap-2 text-sm text-slate-300″>
                        <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0″ style={{ color: phase.color }} />
                        {g}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Financials */}
        {activeTab === "financials" && (
          <div className="space-y-6″>
            <h2 className="text-lg font-bold text-white flex items-center gap-2″>
              <BarChart3 className="w-5 h-5 text-teal-400″ /> Financial Projections
            </h2>
            <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-900/50″>
                      <th className="text-left px-5 py-3 text-slate-400 font-semibold text-xs uppercase tracking-wide">Metric</th>
                      <th className="text-right px-5 py-3 text-green-400 font-semibold text-xs uppercase tracking-wide">Year 1</th>
                      <th className="text-right px-5 py-3 text-blue-400 font-semibold text-xs uppercase tracking-wide">Year 2</th>
                      <th className="text-right px-5 py-3 text-purple-400 font-semibold text-xs uppercase tracking-wide">Year 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FINANCIALS.map((row, i) => (
                      <tr key={row.metric} className={`border-b border-slate-700/50 ${i % 2 === 0 ? "" : "bg-slate-900/30"} ${row.metric.includes("Total") || row.metric.includes("EBITDA") ? "font-bold" : ""}`}>
                        <td className={`px-5 py-3 ${row.metric.includes("Total") || row.metric.includes("EBITDA") ? "text-white" : "text-slate-300"}`}>{row.metric}</td>
                        <td className={`px-5 py-3 text-right ${row.metric.includes("Total") || row.metric.includes("EBITDA") ? "text-green-400" : "text-slate-300"}`}>{row.y1}</td>
                        <td className={`px-5 py-3 text-right ${row.metric.includes("Total") || row.metric.includes("EBITDA") ? "text-blue-400" : "text-slate-300"}`}>{row.y2}</td>
                        <td className={`px-5 py-3 text-right ${row.metric.includes("Total") || row.metric.includes("EBITDA") ? "text-purple-400" : "text-slate-300"}`}>{row.y3}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <p className="text-xs text-slate-600 text-center">
              Based on $149/mo subscription × active partner count. Year 1 = Founding tiers filled (2,125 partners). Match revenue assumes 6 jobs/partner/year at 12% blended take rate.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4″>
              {[
                { scenario: "Bear Case", desc: "500 partners, low match rate", arr: "$840K ARR", action: "Extend runway via subscription-only model", color: "#ef4444″ },
                { scenario: "Base Case", desc: "2,125 founders + match volume", arr: "$4.2M ARR", action: "Raise Seed at $15M cap, expand Texas", color: "#f59e0b" },
                { scenario: "Bull Case", desc: "5,000 partners, high conversion", arr: "$12M ARR", action: "Skip Seed, go direct to Series A", color: "#22c55e" },
              ].map(s => (
                <Card key={s.scenario} className="bg-slate-800/50 border-slate-700″>
                  <CardContent className="p-5″>
                    <div className="text-sm font-bold mb-1″ style={{ color: s.color }}>{s.scenario}</div>
                    <div className="text-xs text-slate-500 mb-3″>{s.desc}</div>
                    <div className="text-xl font-bold text-white mb-2″>{s.arr}</div>
                    <div className="text-xs text-slate-400″>{s.action}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Competitive */}
        {activeTab === "competitive" && (
          <div className="space-y-6″>
            <h2 className="text-lg font-bold text-white flex items-center gap-2″>
              <Shield className="w-5 h-5 text-purple-400″ /> Competitive Landscape
            </h2>
            <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-900/50″>
                      {["Platform", "Model", "Price", "Network Effect", "AI Match", "Data Asset", "Income Streams", "Verdict"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-slate-400 font-semibold text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPETITIVE.map(co => (
                      <tr key={co.name} className={`border-b border-slate-700/50 ${co.isUs ? "bg-green-500/5 border-green-500/20" : ""}`}>
                        <td className={`px-4 py-3 font-semibold whitespace-nowrap ${co.isUs ? "text-green-400" : "text-slate-200"}`}>{co.name}</td>
                        <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{co.model}</td>
                        <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{co.price}</td>
                        <td className="px-4 py-3 text-center">
                          {co.network ? <CheckCircle className="w-4 h-4 text-green-400 mx-auto" /> : <span className="text-slate-600 text-xs">—</span>}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {co.aiMatch ? <CheckCircle className="w-4 h-4 text-green-400 mx-auto" /> : <span className="text-slate-600 text-xs">—</span>}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {co.dataAsset ? <CheckCircle className="w-4 h-4 text-green-400 mx-auto" /> : <span className="text-slate-600 text-xs">—</span>}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-bold ${co.incomeStreams >= 5 ? "text-green-400" : "text-slate-500"}`}>{co.incomeStreams}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-xs max-w-[180px]">{co.verdict}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4″>
              {[
                { title: "Why We Win", icon: Zap, color: "text-green-400″, points: ["5-stream income model creates structural lock-in — rational economics prevent churn", "AI feedback loop compounds: more jobs → better model → better matches → more retention", "Home Health Vault builds permanent data moat tied to 50M+ properties, not users", "Patent-pending network income system protects core IP from replication"] },
                { title: "Nearest Threat", icon: AlertTriangle, color: "text-yellow-400″, points: ["Jobber could add referral features — mitigated by deep integration making us additive", "Thumbtack could add income streams — but lacks the Vault data asset and AI layer", "New entrant would need 3+ years to match our data moat and agent infrastructure", "Our biggest risk is execution speed, not competition"] },
              ].map(card => {
                const Icon = card.icon;
                return (
                  <Card key={card.title} className="bg-slate-800/50 border-slate-700″>
                    <CardContent className="p-5″>
                      <h3 className={`text-sm font-bold mb-3 flex items-center gap-2 ${card.color}`}>
                        <Icon className="w-4 h-4″ /> {card.title}
                      </h3>
                      <ul className="space-y-2″>
                        {card.points.map(p => (
                          <li key={p} className="text-sm text-slate-300 flex items-start gap-2″>
                            <ChevronRight className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${card.color}`} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Risk Matrix */}
        {activeTab === "risks" && (
          <div className="space-y-5″>
            <div className="flex items-center justify-between flex-wrap gap-2″>
              <h2 className="text-lg font-bold text-white flex items-center gap-2″>
                <AlertTriangle className="w-5 h-5 text-red-400″ /> Risk Matrix
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500″>
                <span className="flex items-center gap-1″><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Low</span>
                <span className="flex items-center gap-1″><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" /> Medium</span>
                <span className="flex items-center gap-1″><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> High</span>
              </div>
            </div>
            <div className="space-y-2″>
              {RISK_MATRIX.map((risk, i) => (
                <Card key={risk.risk} className="bg-slate-800/50 border-slate-700 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-700/30 transition-colors"
                    onClick={() => setExpandedRisk(expandedRisk === i ? null : i)}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0″>
                      <div className="flex items-center gap-2 flex-shrink-0″>
                        <ProbBadge level={risk.probability} />
                        <ProbBadge level={risk.impact} />
                      </div>
                      <span className="text-sm font-medium text-slate-200 truncate">{risk.risk}</span>
                    </div>
                    {expandedRisk === i ? <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0″ /> : <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                  </button>
                  {expandedRisk === i && (
                    <div className="px-4 pb-4 border-t border-slate-700″>
                      <div className="mt-3 text-xs text-slate-400 uppercase tracking-wide font-semibold mb-2″>Mitigation</div>
                      <p className="text-sm text-slate-300 leading-relaxed">{risk.mitigation}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2″>
              {[
                { label: "Low Probability", count: RISK_MATRIX.filter(r => r.probability === "Low").length, color: "text-green-400 bg-green-500/10 border-green-500/20″ },
                { label: "Medium Probability", count: RISK_MATRIX.filter(r => r.probability === "Medium").length, color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20″ },
                { label: "High Impact", count: RISK_MATRIX.filter(r => r.impact === "High").length, color: "text-red-400 bg-red-500/10 border-red-500/20″ },
              ].map(s => (
                <div key={s.label} className={`rounded-lg border p-4 text-center ${s.color}`}>
                  <div className="text-2xl font-bold">{s.count}</div>
                  <div className="text-xs mt-1 opacity-70″>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Milestones */}
        {activeTab === "milestones" && (
          <div className="space-y-5″>
            <div className="flex items-center justify-between flex-wrap gap-2″>
              <h2 className="text-lg font-bold text-white flex items-center gap-2″>
                <Flag className="w-5 h-5 text-teal-400″ /> Milestones Tracker
              </h2>
              <div className="text-sm text-slate-400″>
                <span className="text-teal-400 font-bold">{doneCount}</span> / {milestones.length} complete
              </div>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-2″>
              <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${(doneCount / milestones.length) * 100}%` }} />
            </div>
            <div className="space-y-2″>
              {milestones.map(m => (
                <div
                  key={m.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                    m.done ? "bg-green-500/5 border-green-500/20″ : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                  }`}
                  onClick={() => toggleMilestone(m.id)}
                >
                  {m.done
                    ? <CheckSquare className="w-5 h-5 text-green-400 flex-shrink-0″ />
                    : <Square className="w-5 h-5 text-slate-500 flex-shrink-0″ />
                  }
                  <span className={`flex-1 text-sm ${m.done ? "text-green-300 line-through opacity-70" : "text-slate-200"}`}>{m.label}</span>
                  <span className="text-xs text-slate-500 flex-shrink-0″>{m.date}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-600 text-center pt-2″>Click a milestone to toggle its completion status.</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 p-4 bg-slate-800/30 rounded-lg border border-slate-700 text-center">
          <p className="text-slate-500 text-xs">
            Confidential and proprietary information of ProLnk Inc. Unauthorized disclosure is prohibited.
            Last updated: May 2026 · Contact: <a href="mailto:andrew@lit-ventures.com" className="text-teal-400″>andrew@lit-ventures.com</a>
          </p>
        </div>

      </div>
    </AdminLayout>
  );
}
