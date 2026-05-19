import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  DollarSign, TrendingDown, Home, CreditCard, Wrench,
  Calculator, ChevronRight, CheckCircle, AlertTriangle, Info,
  Clock, Percent, BarChart2,
} from "lucide-react";

interface FinancingOption {
  rank: number;
  name: string;
  rate: string;
  icon: typeof DollarSign;
  color: string;
  bg: string;
  border: string;
  best: string;
  pros: string[];
  cons: string[];
  badge?: string;
}

interface DecisionScenario {
  scenario: string;
  amount: string;
  recommended: string;
  reason: string;
  icon: typeof Home;
}

const OPTIONS: FinancingOption[] = [
  {
    rank: 1,
    name: "Cash",
    rate: "0% interest",
    icon: DollarSign,
    color: "text-emerald-400",
    bg: "bg-emerald-900/20",
    border: "border-emerald-700/40",
    best: "Small jobs under $5K",
    pros: ["No interest ever", "Instant approval", "No credit check", "Negotiating leverage with contractors"],
    cons: ["Depletes savings", "Opportunity cost", "Limited by available funds"],
  },
  {
    rank: 2,
    name: "HELOC",
    rate: "Prime + 0.5% (~8.25%)",
    icon: Home,
    color: "text-blue-400",
    bg: "bg-blue-900/20",
    border: "border-blue-700/40",
    best: "Ongoing renovations",
    pros: ["Draw only what you need", "Interest-only payments option", "Revolving credit line", "Tax-deductible interest (consult CPA)"],
    cons: ["Variable rate risk", "$100–500 setup cost", "Home as collateral", "Requires 15–20% equity"],
    badge: "Most Popular",
  },
  {
    rank: 3,
    name: "Home Equity Loan",
    rate: "7.8% fixed",
    icon: BarChart2,
    color: "text-purple-400",
    bg: "bg-purple-900/20",
    border: "border-purple-700/40",
    best: "Single large project $10K–$50K",
    pros: ["Fixed rate — predictable payments", "Lump sum disbursement", "Potentially tax-deductible", "Lower rate than personal loan"],
    cons: ["Home as collateral", "Closing costs 2–5%", "Full interest from day one", "2–4 week approval time"],
  },
  {
    rank: 4,
    name: "Personal Loan",
    rate: "8–15% depending on credit",
    icon: CreditCard,
    color: "text-orange-400",
    bg: "bg-orange-900/20",
    border: "border-orange-700/40",
    best: "Medium jobs — quick approval needed",
    pros: ["No home equity required", "Fast approval (1–3 days)", "No collateral", "Fixed payments"],
    cons: ["Higher rate than HE options", "Lower limits ($25K typical max)", "Based on credit score", "Shorter terms"],
  },
  {
    rank: 5,
    name: "Contractor Financing",
    rate: "0% promo (then 26–29%)",
    icon: Wrench,
    color: "text-red-400",
    bg: "bg-red-900/20",
    border: "border-red-700/40",
    best: "Last resort — read the fine print",
    pros: ["0% intro period (6–18 months)", "Instant approval at signing", "No separate application", "Convenient for small add-ons"],
    cons: ["Balloon payments if not paid in time", "26–29% deferred interest", "Contractor markup often included", "Aggressive sales tactics"],
  },
];

const SCENARIOS: DecisionScenario[] = [
  {
    scenario: "Roof replacement — $12,000",
    amount: "$12,000",
    recommended: "Home Equity Loan",
    reason: "Large single project with fixed cost — lock in 7.8% and pay over 10 years ($120/mo).",
    icon: Home,
  },
  {
    scenario: "Kitchen remodel — $35,000 over 8 months",
    amount: "$35,000",
    recommended: "HELOC",
    reason: "Draw funds as needed during construction. Only pay interest on what you've drawn.",
    icon: Wrench,
  },
  {
    scenario: "HVAC emergency — $6,500",
    amount: "$6,500",
    recommended: "Personal Loan",
    reason: "Fast approval, no equity required. Pay it off in 24 months at ~$295/mo.",
    icon: TrendingDown,
  },
  {
    scenario: "Paint + minor repairs — $2,800",
    amount: "$2,800",
    recommended: "Cash",
    reason: "Small enough to pay out of pocket. No interest, no paperwork, negotiate a better rate.",
    icon: DollarSign,
  },
  {
    scenario: "Bathroom remodel — $18,000",
    amount: "$18,000",
    recommended: "Home Equity Loan",
    reason: "Fixed project, fixed cost. Borrow exactly what you need at a predictable monthly payment.",
    icon: CheckCircle,
  },
];

export default function RenovationFinancingGuide() {
  const [loanAmount, setLoanAmount] = useState(15000);
  const [rate, setRate] = useState(7.8);
  const [termYears, setTermYears] = useState(10);

  const monthlyRate = rate / 100 / 12;
  const numPayments = termYears * 12;
  const monthlyPayment = monthlyRate === 0
    ? loanAmount / numPayments
    : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  const totalPaid = monthlyPayment * numPayments;
  const totalInterest = totalPaid - loanAmount;

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white">
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

          {/* Header */}
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-sm mb-2">
              <DollarSign className="w-4 h-4" />
              <span>Financing Guide</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Renovation Financing</h1>
            <p className="text-slate-400 mt-1">Pay for improvements the smart way</p>
            <div className="mt-4 p-4 rounded-xl bg-blue-900/20 border border-blue-700/30 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-200">
                With DFW home equity averaging <strong className="text-white">$180K+</strong>, most homeowners
                have excellent HELOC options. Use this guide to pick the right tool for your project.
              </p>
            </div>
          </div>

          {/* Current Rates Banner */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#111D35] border border-slate-700/50 text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Today's avg HELOC rate — DFW</p>
              <p className="text-2xl font-bold text-teal-400">8.25%</p>
              <p className="text-xs text-slate-500">Variable, Prime + 0.5%</p>
            </div>
            <div className="p-4 rounded-xl bg-[#111D35] border border-slate-700/50 text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Home Equity Loan avg — DFW</p>
              <p className="text-2xl font-bold text-purple-400">7.8%</p>
              <p className="text-xs text-slate-500">Fixed rate</p>
            </div>
          </div>

          {/* Financing Options */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Percent className="w-5 h-5 text-teal-400" />
              Your Financing Options — Ranked by Cost
            </h2>
            <div className="space-y-4">
              {OPTIONS.map((opt) => {
                const Icon = opt.icon;
                return (
                  <div key={opt.name} className={`rounded-xl border ${opt.border} ${opt.bg} p-5`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${opt.color}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{opt.name}</span>
                            {opt.badge && (
                              <span className="text-xs bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full">
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          <p className={`text-sm font-medium ${opt.color}`}>{opt.rate}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-slate-400">Best for</p>
                        <p className="text-sm text-slate-200">{opt.best}</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-emerald-400 font-medium mb-1">Pros</p>
                        <ul className="space-y-1">
                          {opt.pros.map((p) => (
                            <li key={p} className="text-xs text-slate-300 flex items-center gap-1.5">
                              <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-red-400 font-medium mb-1">Cons</p>
                        <ul className="space-y-1">
                          {opt.cons.map((c) => (
                            <li key={c} className="text-xs text-slate-300 flex items-center gap-1.5">
                              <AlertTriangle className="w-3 h-3 text-red-500 flex-shrink-0" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calculator */}
          <div className="rounded-xl bg-[#111D35] border border-slate-700/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-teal-400" />
              Monthly Payment Calculator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Loan Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full bg-[#0A1628] border border-slate-600 rounded-lg pl-7 pr-3 py-2 text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Annual Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full bg-[#0A1628] border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Term (years)</label>
                <select
                  value={termYears}
                  onChange={(e) => setTermYears(Number(e.target.value))}
                  className="w-full bg-[#0A1628] border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {[1, 2, 3, 5, 7, 10, 15, 20, 30].map((y) => (
                    <option key={y} value={y}>{y} years</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-teal-900/20 border border-teal-700/30 rounded-xl p-4 text-center">
                <p className="text-xs text-slate-400 mb-1">Monthly Payment</p>
                <p className="text-2xl font-bold text-teal-400">${monthlyPayment.toFixed(0)}</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-4 text-center">
                <p className="text-xs text-slate-400 mb-1">Total Interest</p>
                <p className="text-2xl font-bold text-orange-400">${totalInterest.toFixed(0)}</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-4 text-center">
                <p className="text-xs text-slate-400 mb-1">Total Paid</p>
                <p className="text-2xl font-bold text-white">${totalPaid.toFixed(0)}</p>
              </div>
            </div>
          </div>

          {/* Decision Tree */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-400" />
              When Each Option Makes Sense
            </h2>
            <div className="space-y-3">
              {SCENARIOS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.scenario} className="flex items-start gap-4 p-4 rounded-xl bg-[#111D35] border border-slate-700/50">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-teal-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-white text-sm">{s.scenario}</span>
                        <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full">
                          {s.recommended}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{s.reason}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-xl bg-gradient-to-r from-teal-900/40 to-blue-900/40 border border-teal-700/30 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Get a Project Quote First</h3>
              <p className="text-sm text-slate-400 mt-0.5">Know your exact cost before financing. Get 3 quotes from vetted DFW pros.</p>
            </div>
            <a
              href="/homeowner/request-pro"
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex-shrink-0"
            >
              Get Free Quotes
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
