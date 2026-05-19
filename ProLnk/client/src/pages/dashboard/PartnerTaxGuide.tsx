import { useState } from "react";
import {
  FileText,
  DollarSign,
  Calculator,
  CalendarDays,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Lightbulb,
  Car,
  Home,
  Wrench,
  Phone,
  Shield,
  GraduationCap,
  Tag,
  Megaphone,
} from "lucide-react";

const PLATFORM_INCOME = 14_847;
const SE_TAX_RATE = 0.153;
const SE_TAX = Math.round(PLATFORM_INCOME * SE_TAX_RATE);
const FED_STATE_TAX = 1_847;
const TOTAL_EST_TAX = SE_TAX + FED_STATE_TAX;

const QUARTERLY_DEADLINES = [
  { quarter: "Q1″, label: "Jan – Mar", due: "April 15, 2025", upcoming: false },
  { quarter: "Q2″, label: "Apr – May", due: "June 15, 2025", upcoming: false },
  { quarter: "Q3″, label: "Jun – Aug", due: "Sept 15, 2025", upcoming: true },
  { quarter: "Q4″, label: "Sep – Dec", due: "Jan 15, 2026", upcoming: true },
];

const DEDUCTIONS = [
  {
    icon: Car,
    label: "Vehicle mileage",
    detail: "3,240 miles × $0.67″,
    amount: 2_171,
    color: "#3B82F6″,
  },
  {
    icon: Home,
    label: "Home office",
    detail: "Dedicated workspace",
    amount: 420,
    color: "#14B8A6″,
  },
  {
    icon: Wrench,
    label: "Professional tools & equipment",
    detail: "Trade tools purchased",
    amount: 1_200,
    color: "#F97316″,
  },
  {
    icon: Phone,
    label: "Phone (business use %)",
    detail: "70% business allocation",
    amount: 840,
    color: "#A855F7″,
  },
  {
    icon: Shield,
    label: "Insurance premiums",
    detail: "Liability + commercial",
    amount: 780,
    color: "#00E676″,
  },
  {
    icon: GraduationCap,
    label: "Education & training",
    detail: "Courses, certifications",
    amount: 340,
    color: "#00D4FF",
  },
  {
    icon: Tag,
    label: "Platform fees (subscription)",
    detail: "$149 × 12 months",
    amount: 1_788,
    color: "#FFB300″,
  },
  {
    icon: Megaphone,
    label: "Marketing materials",
    detail: "Business cards, flyers",
    amount: 210,
    color: "#EC4899″,
  },
];

const TOTAL_DEDUCTIONS = DEDUCTIONS.reduce((sum, d) => sum + d.amount, 0);

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function PartnerTaxGuide() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A1628] text-white p-6″>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8″>
          <div className="flex items-center gap-3 mb-2″>
            <div
              className="p-2 rounded-xl"
              style={{ background: "linear-gradient(135deg, #00D4FF22, #00D4FF44)", border: "1px solid #00D4FF30″ }}
            >
              <FileText className="w-6 h-6″ style={{ color: "#00D4FF" }} />
            </div>
            <h1 className="text-3xl font-bold text-white">Tax Guide for ProLnk Partners</h1>
          </div>
          <p className="text-[#8B91A8] ml-14″>Keep more of what you earn</p>
        </div>

        {/* Key Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8″>
          <div
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #00E67608, #00E67618)", border: "1px solid #00E67630″ }}
          >
            <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full blur-2xl opacity-20 pointer-events-none" style={{ backgroundColor: "#00E676″ }} />
            <div className="flex items-center gap-2 mb-3″>
              <DollarSign className="w-4 h-4″ style={{ color: "#00E676" }} />
              <span className="text-[#8B91A8] text-sm">Your 2025 Platform Income</span>
            </div>
            <p className="text-3xl font-bold text-white">{fmt(PLATFORM_INCOME)}</p>
            <p className="text-[#8B91A8] text-xs mt-1″>Gross earnings via ProLnk</p>
          </div>

          <div
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #FF444408, #FF444418)", border: "1px solid #FF444430″ }}
          >
            <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full blur-2xl opacity-20 pointer-events-none" style={{ backgroundColor: "#FF4444″ }} />
            <div className="flex items-center gap-2 mb-3″>
              <TrendingDown className="w-4 h-4″ style={{ color: "#FF4444" }} />
              <span className="text-[#8B91A8] text-sm">Est. Self-Employment Tax</span>
            </div>
            <p className="text-3xl font-bold text-white">{fmt(SE_TAX)}</p>
            <p className="text-[#8B91A8] text-xs mt-1″>15.3% SE rate on net earnings</p>
          </div>

          <div
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #FFB30008, #FFB30018)", border: "1px solid #FFB30030″ }}
          >
            <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full blur-2xl opacity-20 pointer-events-none" style={{ backgroundColor: "#FFB300″ }} />
            <div className="flex items-center gap-2 mb-3″>
              <Calculator className="w-4 h-4″ style={{ color: "#FFB300" }} />
              <span className="text-[#8B91A8] text-sm">Est. Federal + State</span>
            </div>
            <p className="text-3xl font-bold text-white">{fmt(FED_STATE_TAX)}</p>
            <p className="text-[#8B91A8] text-xs mt-1″>Combined income tax estimate</p>
          </div>
        </div>

        {/* Total Tax Bill Banner */}
        <div
          className="rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4″
          style={{ background: "linear-gradient(135deg, #A855F710, #A855F720)", border: "1px solid #A855F730″ }}
        >
          <div className="flex items-center gap-3″>
            <AlertTriangle className="w-6 h-6 shrink-0″ style={{ color: "#A855F7" }} />
            <div>
              <p className="text-white font-semibold text-lg">Total Estimated Tax Bill</p>
              <p className="text-[#8B91A8] text-sm">SE tax + federal + state combined</p>
            </div>
          </div>
          <p className="text-4xl font-bold" style={{ color: "#A855F7″ }}>{fmt(TOTAL_EST_TAX)}</p>
        </div>

        {/* Quarterly Tax Calendar */}
        <div
          className="rounded-2xl p-6 mb-8″
          style={{ background: "#13161E", border: "1px solid #252A3A" }}
        >
          <div className="flex items-center gap-2 mb-5″>
            <CalendarDays className="w-5 h-5″ style={{ color: "#00D4FF" }} />
            <h2 className="text-white font-semibold text-lg">Quarterly Tax Payment Calendar</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3″>
            {QUARTERLY_DEADLINES.map((q) => (
              <div
                key={q.quarter}
                className="rounded-xl p-4 text-center"
                style={{
                  background: q.upcoming
                    ? "linear-gradient(135deg, #FFB30018, #FFB30030)"
                    : "#1A1E2A",
                  border: q.upcoming
                    ? "1px solid #FFB30050″
                    : "1px solid #252A3A",
                }}
              >
                <p
                  className="text-2xl font-bold mb-1″
                  style={{ color: q.upcoming ? "#FFB300″ : "#F0F2FF" }}
                >
                  {q.quarter}
                </p>
                <p className="text-[#8B91A8] text-xs mb-2″>{q.label}</p>
                <p
                  className="text-sm font-medium"
                  style={{ color: q.upcoming ? "#FFB300″ : "#8B91A8" }}
                >
                  {q.due}
                </p>
                {q.upcoming && (
                  <span
                    className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: "#FFB30030″, color: "#FFB300" }}
                  >
                    Upcoming
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="text-[#555B72] text-xs mt-4″>
            Pay by each deadline to avoid IRS underpayment penalties. Each quarterly payment should cover roughly {fmt(Math.round(TOTAL_EST_TAX / 4))}.
          </p>
        </div>

        {/* Deductions Tracker */}
        <div
          className="rounded-2xl p-6 mb-8″
          style={{ background: "#13161E", border: "1px solid #252A3A" }}
        >
          <div className="flex items-center gap-2 mb-5″>
            <TrendingDown className="w-5 h-5″ style={{ color: "#00E676" }} />
            <h2 className="text-white font-semibold text-lg">Deductions Tracker</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #252A3A" }}>
                  <th className="text-left py-3 px-2 text-[#8B91A8] text-xs font-medium uppercase tracking-wider">Deduction</th>
                  <th className="text-left py-3 px-2 text-[#8B91A8] text-xs font-medium uppercase tracking-wider hidden sm:table-cell">Detail</th>
                  <th className="text-right py-3 px-2 text-[#8B91A8] text-xs font-medium uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody>
                {DEDUCTIONS.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <tr
                      key={i}
                      onMouseEnter={() => setHoveredRow(i)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{
                        borderBottom: "1px solid #1A1E2A",
                        background: hoveredRow === i ? "#1A1E2A" : "transparent",
                        cursor: "default",
                        transition: "background 0.15s",
                      }}
                    >
                      <td className="py-3 px-2″>
                        <div className="flex items-center gap-2″>
                          <div
                            className="p-1.5 rounded-lg shrink-0″
                            style={{ background: `${d.color}15` }}
                          >
                            <Icon className="w-3.5 h-3.5″ style={{ color: d.color }} />
                          </div>
                          <span className="text-white text-sm">{d.label}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-[#8B91A8] text-sm hidden sm:table-cell">{d.detail}</td>
                      <td className="py-3 px-2 text-right">
                        <span className="text-white font-medium">{fmt(d.amount)}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: "2px solid #252A3A" }}>
                  <td className="py-4 px-2 font-bold text-white">Total Deductions</td>
                  <td className="hidden sm:table-cell" />
                  <td className="py-4 px-2 text-right">
                    <span className="text-2xl font-bold" style={{ color: "#00E676″ }}>{fmt(TOTAL_DEDUCTIONS)}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <p className="text-[#555B72] text-xs mt-4″>
            Keep receipts for all deductions. Track mileage with an app like MileIQ. Consult a CPA to confirm eligibility.
          </p>
        </div>

        {/* S-Corp Tip */}
        <div
          className="rounded-2xl p-5 mb-8 flex items-start gap-4″
          style={{ background: "linear-gradient(135deg, #00D4FF08, #00D4FF18)", border: "1px solid #00D4FF30″ }}
        >
          <Lightbulb className="w-6 h-6 shrink-0 mt-0.5″ style={{ color: "#00D4FF" }} />
          <div>
            <p className="text-white font-semibold mb-1″>Tax Saving Opportunity</p>
            <p className="text-[#8B91A8] text-sm">
              At your income level, forming an S-Corp could save{" "}
              <span className="text-white font-semibold">$2,400/year</span> in SE tax by splitting your
              income between wages and distributions. Most beneficial above $40K net self-employment income.
            </p>
          </div>
        </div>

        {/* Find a CPA CTA */}
        <div
          className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4″
          style={{ background: "#13161E", border: "1px solid #252A3A" }}
        >
          <div className="flex items-center gap-3″>
            <div
              className="p-2.5 rounded-xl shrink-0″
              style={{ background: "linear-gradient(135deg, #3B82F620, #3B82F630)", border: "1px solid #3B82F630″ }}
            >
              <CheckCircle className="w-5 h-5″ style={{ color: "#3B82F6" }} />
            </div>
            <div>
              <p className="text-white font-semibold">Find a CPA Who Gets Gig Work</p>
              <p className="text-[#8B91A8] text-sm">Browse CPAs who specialize in self-employed contractors and home service pros</p>
            </div>
          </div>
          <a
            href="https://www.nerdwallet.com/article/taxes/find-a-tax-professional"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap shrink-0 transition-all"
            style={{ background: "#3B82F6″, color: "#fff" }}
          >
            Find a CPA
            <ExternalLink className="w-3.5 h-3.5″ />
          </a>
        </div>

        <p className="text-[#555B72] text-xs mt-6 text-center">
          ProLnk does not provide tax or legal advice. This page is for informational purposes only.
          Consult a licensed CPA for advice specific to your situation.
        </p>
      </div>
    </div>
  );
}
