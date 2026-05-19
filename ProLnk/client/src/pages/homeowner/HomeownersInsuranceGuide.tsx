import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Shield, CheckCircle, XCircle, AlertTriangle, Home, Umbrella,
  DollarSign, FileText, ChevronRight, Info, Star,
} from "lucide-react";

const CHECKLIST_ITEMS = [
  { id: "dwelling", label: "Dwelling coverage = 100% replacement cost (not market value)" },
  { id: "windHail", label: "Separate wind/hail deductible — and I know the exact dollar amount" },
  { id: "foundation", label: "Foundation coverage (many standard HO-3 policies exclude this)" },
  { id: "flood", label: "Flood insurance (separate NFIP or private policy — required in DFW flood zones)" },
  { id: "warranty", label: "Home warranty (separate from insurance — covers mechanical failure)" },
  { id: "scheduled", label: "Scheduled items rider for jewelry, art, electronics over $1,500" },
];

const EXCLUSION_CARDS = [
  {
    icon: <Home className="w-6 h-6 text-red-400" />,
    title: "Foundation Damage",
    desc: "Standard HO-3 excludes earth movement and soil settling. Texas expansive clay soils make this a $20K+ risk. Requires a separate endorsement or standalone policy.",
    color: "border-red-200 bg-red-50",
  },
  {
    icon: <Umbrella className="w-6 h-6 text-blue-400" />,
    title: "Flood Damage",
    desc: "No standard homeowner policy covers flood. NFIP policies average $700–$1,200/yr in DFW. With 100-year flood events happening every 5 years now, this is not optional.",
    color: "border-blue-200 bg-blue-50",
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
    title: "Mechanical Breakdown",
    desc: "Your HVAC, water heater, and appliances failing from normal wear is not a covered event. That\u2019s what home warranties cover — a $400–$700/yr separate product.",
    color: "border-amber-200 bg-amber-50",
  },
  {
    icon: <DollarSign className="w-6 h-6 text-violet-400" />,
    title: "Matching Materials",
    desc: "After hail damage, insurers may replace only damaged sections — not the full roof — leaving you with mismatched shingles. Ask for a matching endorsement.",
    color: "border-violet-200 bg-violet-50",
  },
];

const CLAIMS_RULES = [
  { do: true, text: "Document damage with photos and video before touching anything" },
  { do: true, text: "Call your insurer within 24 hours — late reporting can void coverage" },
  { do: true, text: "Get your own independent estimate from a licensed contractor" },
  { do: true, text: "Request a public adjuster if the insurer\u2019s offer seems low (they work on contingency)" },
  { do: false, text: "Never make permanent repairs before the adjuster inspects — you may forfeit the claim" },
  { do: false, text: "Never sign an assignment of benefits (AOB) with a contractor before your insurer approves it" },
];

const DISCOUNTS = [
  { label: "Security system (monitored)", amount: "5–15%" },
  { label: "Storm shutters or impact windows", amount: "8–20%" },
  { label: "New roof (Class 4 impact-resistant shingles)", amount: "20–40%" },
  { label: "Non-smoker household", amount: "2–5%" },
  { label: "Loyalty (3+ years with same carrier)", amount: "3–8%" },
  { label: "Multi-policy bundle (home + auto)", amount: "10–25%" },
  { label: "Smart home devices (leak sensors, smart smoke detectors)", amount: "3–8%" },
  { label: "Claim-free for 5+ years", amount: "5–10%" },
];

export default function HomeownersInsuranceGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white">
        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0D1F3C] to-[#112244]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.12),transparent_60%)]" />
          <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold mb-6">
              <Shield className="w-3.5 h-3.5" /> DFW Insurance Guide
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
              DFW Homeowners Insurance —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                What You\u2019re Probably Missing
              </span>
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl leading-relaxed mb-6">
              The average DFW homeowner pays{" "}
              <strong className="text-white">$3,240/year</strong> — 65% above the
              national average — primarily because of hail. Yet most are still
              underinsured in the ways that hurt most.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { stat: "$3,240", label: "Avg DFW annual premium" },
                { stat: "65%", label: "Above national average" },
                { stat: "1–2%", label: "Typical wind/hail deductible" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-black text-blue-300 mb-1">{s.stat}</div>
                  <div className="text-slate-400 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The 1% Rule callout */}
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h2 className="text-lg font-black text-amber-200 mb-2">
                  The 1% Rule — and why it matters
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  Most DFW homeowners assume their deductible is $1,000. It\u2019s not.
                  Wind and hail deductibles are typically{" "}
                  <strong className="text-white">1–2% of your home\u2019s insured value</strong>{" "}
                  — calculated separately from your all-peril deductible.
                </p>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-sm text-slate-300">
                    <strong className="text-white">Example:</strong> Home insured at{" "}
                    <strong className="text-amber-300">$485,000</strong> with a{" "}
                    <strong className="text-amber-300">1% wind/hail deductible</strong> means you
                    owe <strong className="text-amber-300">$4,850</strong> out-of-pocket before
                    insurance pays a single dollar on that hail claim — not the $1,000 you
                    expected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Coverage Checklist */}
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-black mb-2">Coverage Checklist</h2>
            <p className="text-slate-400 text-sm">
              Check off each item you\u2019ve confirmed in your current policy.{" "}
              <span className="text-blue-300">{checkedCount}/{CHECKLIST_ITEMS.length} confirmed</span>
            </p>
            <div className="w-full bg-white/10 rounded-full h-2 mt-3">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(checkedCount / CHECKLIST_ITEMS.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="space-y-3">
            {CHECKLIST_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                  checked[item.id]
                    ? "border-green-400/40 bg-green-500/10"
                    : "border-white/10 bg-white/5 hover:bg-white/8"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    checked[item.id]
                      ? "border-green-400 bg-green-500/30"
                      : "border-white/30"
                  }`}
                >
                  {checked[item.id] && <CheckCircle className="w-4 h-4 text-green-400" />}
                </div>
                <span className={`text-sm font-medium ${checked[item.id] ? "text-green-200" : "text-slate-300"}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Coverage Gap Cards */}
        <div className="bg-[#0D1F3C] border-y border-white/10">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-2xl md:text-3xl font-black mb-2">
              What Standard HO-3 Policies Typically Exclude
            </h2>
            <p className="text-slate-400 text-sm mb-8">
              These are the gaps that cost DFW homeowners the most.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXCLUSION_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{card.icon}</div>
                    <div>
                      <h3 className="font-bold text-white mb-1.5">{card.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Claims Dos and Don'ts */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-black mb-2">Claims Do\u2019s and Don\u2019ts</h2>
          <p className="text-slate-400 text-sm mb-8">
            The wrong move after a storm can void your claim or cut your payout in half.
          </p>
          <div className="space-y-3">
            {CLAIMS_RULES.map((rule, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 p-4 rounded-xl border ${
                  rule.do
                    ? "border-green-400/20 bg-green-500/5"
                    : "border-red-400/20 bg-red-500/5"
                }`}
              >
                {rule.do ? (
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <span className="text-sm text-slate-300">{rule.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Discount Checklist */}
        <div className="bg-[#0D1F3C] border-y border-white/10">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-2xl md:text-3xl font-black mb-2">8 Discounts to Ask About</h2>
            <p className="text-slate-400 text-sm mb-8">
              Many DFW homeowners leave 20–40% savings on the table by not asking.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOUNTS.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{d.label}</span>
                  </div>
                  <span className="text-xs font-bold text-blue-300 whitespace-nowrap ml-3">
                    {d.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-400/20 rounded-2xl p-8 md:p-12">
            <FileText className="w-10 h-10 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-black mb-3">
              Review Your Coverage Before the Next Storm
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
              ProLnk connects you with licensed contractors who document their work — so
              your Home Health Vault has the verified records insurers require when you file.
            </p>
            <a
              href="/home-waitlist"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm transition-colors"
            >
              Get Free Quotes + Vault Access <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
