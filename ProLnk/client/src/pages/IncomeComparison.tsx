import { useState } from "react";
import { Link } from "wouter";
import {
  DollarSign, TrendingUp, CheckCircle, XCircle, ChevronRight,
  Users, Zap, Shield, BarChart2, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Platform {
  name: string;
  highlight: boolean;
  keepRate: string;
  leadCost: string;
  networkIncome: string;
  passiveIncome: string;
  subscriptionFee: string;
  avgMonthly10: string;
  monthlyAt10Jobs: number;
}

const PLATFORMS: Platform[] = [
  {
    name: "ProLnk",
    highlight: true,
    keepRate: "60%",
    leadCost: "$0",
    networkIncome: "4-level cascade",
    passiveIncome: "Origination rights",
    subscriptionFee: "$149/mo (locked)",
    avgMonthly10: "$3,600",
    monthlyAt10Jobs: 3600,
  },
  {
    name: "Angi / HomeAdvisor",
    highlight: false,
    keepRate: "~60-70%",
    leadCost: "$15–80/lead",
    networkIncome: "None",
    passiveIncome: "None",
    subscriptionFee: "$299–499/mo",
    avgMonthly10: "$1,800",
    monthlyAt10Jobs: 1800,
  },
  {
    name: "Thumbtack",
    highlight: false,
    keepRate: "~65-75%",
    leadCost: "$8–60/lead",
    networkIncome: "None",
    passiveIncome: "None",
    subscriptionFee: "Pay-per-lead",
    avgMonthly10: "$2,100",
    monthlyAt10Jobs: 2100,
  },
  {
    name: "Traditional W-2",
    highlight: false,
    keepRate: "~45%",
    leadCost: "N/A",
    networkIncome: "None",
    passiveIncome: "None",
    subscriptionFee: "N/A",
    avgMonthly10: "$2,400",
    monthlyAt10Jobs: 2400,
  },
  {
    name: "Independent",
    highlight: false,
    keepRate: "85%",
    leadCost: "Self-funded",
    networkIncome: "None",
    passiveIncome: "None",
    subscriptionFee: "$0",
    avgMonthly10: "$2,900",
    monthlyAt10Jobs: 2900,
  },
];

const ROWS = [
  { key: "keepRate", label: "Keep rate" },
  { key: "leadCost", label: "Lead cost" },
  { key: "networkIncome", label: "Network income" },
  { key: "passiveIncome", label: "Passive income" },
  { key: "subscriptionFee", label: "Subscription fee" },
  { key: "avgMonthly10", label: "Avg/mo at 10 jobs" },
] as const;

const BAR_COLORS = ["#14B8A6", "#475569", "#64748B", "#6B7280", "#94A3B8"];

export default function IncomeComparison() {
  const [jobsPerMonth, setJobsPerMonth] = useState(10);

  const prolnkPerJob = 360;
  const ratios: Record<string, number> = {
    "ProLnk": 1.0,
    "Angi / HomeAdvisor": 0.5,
    "Thumbtack": 0.583,
    "Traditional W-2": 0.667,
    "Independent": 0.806,
  };

  const barMax = Math.max(...PLATFORMS.map(p => Math.round(p.monthlyAt10Jobs * (jobsPerMonth / 10))));

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-400 text-sm font-medium px-4 py-2 rounded-full border border-teal-500/20 mb-6">
            <DollarSign className="w-4 h-4" />
            Earning Potential
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Compare Your Earning Potential</h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">ProLnk vs. other options — real numbers, no marketing fluff</p>
        </div>

        {/* Advantages callout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {[
            { icon: XCircle, color: "text-teal-400", label: "No per-lead fees", desc: "Keep what you earn. Zero cost per lead, ever." },
            { icon: Users, color: "text-teal-400", label: "Earn on your network", desc: "4-level cascade — your recruits earn you passive income." },
            { icon: Shield, color: "text-teal-400", label: "Founding rate locked forever", desc: "Charter rate of $149/mo stays fixed as long as you're active." },
          ].map(card => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="rounded-2xl border border-teal-500/30 bg-teal-500/5 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  <p className="font-semibold text-white">{card.label}</p>
                </div>
                <p className="text-slate-400 text-sm">{card.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        <div className="mb-14 overflow-x-auto">
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-teal-400" /> Platform Comparison
          </h2>
          <div className="rounded-2xl border border-slate-700 overflow-hidden min-w-[700px]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0F1E35] border-b border-slate-700">
                  <th className="text-left px-5 py-4 text-slate-400 font-medium w-40">Feature</th>
                  {PLATFORMS.map(p => (
                    <th key={p.name} className={`text-center px-4 py-4 font-semibold text-sm ${p.highlight ? "text-teal-400 bg-teal-500/5" : "text-slate-300"}`}>
                      {p.highlight && <div className="text-xs text-teal-400/70 mb-1 font-normal">⭐ Best value</div>}
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, ri) => (
                  <tr key={row.key} className={`border-b border-slate-700/50 ${ri % 2 === 0 ? "bg-[#0A1628]" : "bg-[#0D1A2D]"}`}>
                    <td className="px-5 py-3.5 text-slate-400 font-medium">{row.label}</td>
                    {PLATFORMS.map(p => (
                      <td key={p.name} className={`text-center px-4 py-3.5 text-sm ${p.highlight ? "text-teal-400 font-semibold bg-teal-500/5" : "text-slate-300"}`}>
                        {p[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real numbers callout */}
        <div className="rounded-2xl border border-slate-700 bg-[#0F1E35] p-6 mb-14">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-slate-300 text-sm leading-relaxed">
              At <span className="text-white font-semibold">10 jobs/month averaging $5,000/job</span>:{" "}
              <span className="text-teal-400 font-semibold">ProLnk earns you $3,600/mo.</span>{" "}
              Angi charges $300+ in lead fees and keeps 30%. Thumbtack's per-lead model means you pay to compete — even when you don't win the job.
            </p>
          </div>
        </div>

        {/* Earnings simulator */}
        <div className="mb-14">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-400" /> Earnings Simulator
          </h2>
          <p className="text-slate-400 text-sm mb-6">How many jobs/month can you do?</p>

          <div className="rounded-2xl border border-slate-700 bg-[#0F1E35] p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-slate-300 text-sm font-medium">Jobs per month</label>
                <span className="text-teal-400 font-bold text-2xl">{jobsPerMonth}</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={jobsPerMonth}
                onChange={e => setJobsPerMonth(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-slate-700 accent-teal-500 cursor-pointer"
              />
              <div className="flex justify-between text-slate-500 text-xs mt-1">
                <span>1</span>
                <span>15</span>
                <span>30</span>
              </div>
            </div>

            {/* Bar chart */}
            <div className="space-y-3">
              {PLATFORMS.map((p, i) => {
                const earnings = Math.round(p.monthlyAt10Jobs * (jobsPerMonth / 10));
                const pct = barMax > 0 ? (earnings / barMax) * 100 : 0;
                return (
                  <div key={p.name} className="flex items-center gap-3">
                    <div className="w-36 text-right">
                      <span className={`text-xs font-medium ${p.highlight ? "text-teal-400" : "text-slate-400"}`}>{p.name}</span>
                    </div>
                    <div className="flex-1 h-8 bg-slate-800 rounded-lg overflow-hidden relative">
                      <div
                        className="h-full rounded-lg flex items-center px-3 transition-all duration-300"
                        style={{ width: `${pct}%`, backgroundColor: BAR_COLORS[i] }}
                      />
                    </div>
                    <div className={`w-20 text-sm font-semibold ${p.highlight ? "text-teal-400" : "text-slate-300"}`}>
                      ${earnings.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-5 justify-center">
          <Link href="/commission-calculator">
            <button className="flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium transition-colors">
              See Full Commission Calculator <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/apply">
            <Button className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-3 text-base font-semibold shadow-lg shadow-teal-500/25">
              Join ProLnk — Lock Your Rate <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
