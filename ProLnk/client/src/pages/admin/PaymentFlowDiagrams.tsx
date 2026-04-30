/**
 * /admin/payment-flows — Payment Flow Diagrams
 * Visual diagrams for:
 * 1. Homeowner payment flow (card-on-file → milestone → partner payout)
 * 2. Insurance ACH debit flow (adjuster report → ACH pull → commission split)
 */
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard, Building2, User, Wrench, Shield, DollarSign,
  ArrowRight, ArrowDown, CheckCircle, Clock, Zap, FileText,
  ChevronDown, ChevronUp
} from "lucide-react";

// ─── Homeowner Payment Flow ───────────────────────────────────────────────────
const HOMEOWNER_STEPS = [
  {
    id: 1,
    actor: "Homeowner",
    icon: User,
    color: "#1B4FD8",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    action: "Accepts Deal",
    detail: "Homeowner reviews AI-generated deal and taps Accept. Card-on-file modal appears if no payment method is saved.",
    badge: "Trigger",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    actor: "ProLnk Platform",
    icon: Zap,
    color: "#7C3AED",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    action: "Initializes Job Payment",
    detail: "Creates jobPayment record with status 'pending'. Sets up milestone schedule based on job type (standard: 50% upfront / 50% on completion; insurance: 0% upfront / 100% post-adjuster).",
    badge: "Automated",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    id: 3,
    actor: "Stripe",
    icon: CreditCard,
    color: "#0891B2",
    bg: "#ECFEFF",
    border: "#A5F3FC",
    action: "Charges Upfront Milestone",
    detail: "Stripe charges the saved card for the upfront milestone amount. Payment Intent created with metadata linking to jobPayment ID and homeowner ID.",
    badge: "Payment",
    badgeColor: "bg-cyan-100 text-cyan-700",
  },
  {
    id: 4,
    actor: "Partner",
    icon: Wrench,
    color: "#059669",
    bg: "#ECFDF5",
    border: "#A7F3D0",
    action: "Completes Job",
    detail: "Partner marks job complete and uploads completion photos. System validates photo upload before allowing completion.",
    badge: "Fulfillment",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 5,
    actor: "Homeowner",
    icon: User,
    color: "#1B4FD8",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    action: "Confirms Completion",
    detail: "Homeowner receives notification and confirms job is complete. This triggers the final milestone charge.",
    badge: "Confirmation",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 6,
    actor: "Stripe",
    icon: CreditCard,
    color: "#0891B2",
    bg: "#ECFEFF",
    border: "#A5F3FC",
    action: "Charges Final Milestone",
    detail: "Stripe charges the remaining balance. Webhook fires payment_intent.succeeded → ProLnk updates jobPayment to 'completed'.",
    badge: "Payment",
    badgeColor: "bg-cyan-100 text-cyan-700",
  },
  {
    id: 7,
    actor: "ProLnk Platform",
    icon: Zap,
    color: "#7C3AED",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    action: "Calculates Commission Split",
    detail: "Platform calculates: Partner payout (job amount × partner rate), Referring Pro commission (job amount × 6%), ProLnk fee (remainder). Queues Stripe Connect transfers.",
    badge: "Automated",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    id: 8,
    actor: "Stripe Connect",
    icon: Building2,
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    action: "Transfers to Partners",
    detail: "Stripe Connect transfers funds to partner's connected account and referring pro's connected account. Transfers appear in partner dashboards within 2 business days.",
    badge: "Payout",
    badgeColor: "bg-amber-100 text-amber-700",
  },
];

// ─── Insurance ACH Flow ───────────────────────────────────────────────────────
const INSURANCE_STEPS = [
  {
    id: 1,
    actor: "Insurance Company",
    icon: Shield,
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FECACA",
    action: "Issues Adjuster Report",
    detail: "Insurance adjuster completes property assessment and issues settlement amount. Homeowner receives claim approval letter with approved amount.",
    badge: "External",
    badgeColor: "bg-red-100 text-red-700",
  },
  {
    id: 2,
    actor: "Partner",
    icon: Wrench,
    color: "#059669",
    bg: "#ECFDF5",
    border: "#A7F3D0",
    action: "Submits Completion Report",
    detail: "Partner uploads adjuster report PDF, enters final approved amount, and submits insurance job completion form. System validates the uploaded document.",
    badge: "Partner Action",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 3,
    actor: "ProLnk Platform",
    icon: Zap,
    color: "#7C3AED",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    action: "Validates & Approves",
    detail: "Admin reviews the adjuster report and approved amount. Once validated, platform creates ACH debit authorization for the insurance settlement amount.",
    badge: "Review",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    id: 4,
    actor: "Homeowner",
    icon: User,
    color: "#1B4FD8",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    action: "Authorizes ACH Debit",
    detail: "Homeowner receives notification with final amount and authorizes the ACH debit from their insurance settlement account. Digital signature captured.",
    badge: "Authorization",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 5,
    actor: "Stripe ACH",
    icon: Building2,
    color: "#0891B2",
    bg: "#ECFEFF",
    border: "#A5F3FC",
    action: "Initiates ACH Pull",
    detail: "Stripe initiates ACH debit from homeowner's bank account. ACH transfers take 3–5 business days to settle. Status tracked in real-time.",
    badge: "ACH Transfer",
    badgeColor: "bg-cyan-100 text-cyan-700",
  },
  {
    id: 6,
    actor: "Stripe",
    icon: CreditCard,
    color: "#0891B2",
    bg: "#ECFEFF",
    border: "#A5F3FC",
    action: "ACH Settles",
    detail: "ACH transfer settles. Webhook fires payment_intent.succeeded → ProLnk updates insurance job to 'payment_received'. Funds held in Stripe escrow.",
    badge: "Settlement",
    badgeColor: "bg-cyan-100 text-cyan-700",
  },
  {
    id: 7,
    actor: "ProLnk Platform",
    icon: Zap,
    color: "#7C3AED",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    action: "Splits Commission",
    detail: "Platform calculates insurance commission split: Partner payout (approved amount × partner rate), Referring Pro commission (approved amount × 6%), ProLnk fee (remainder).",
    badge: "Automated",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    id: 8,
    actor: "Stripe Connect",
    icon: Building2,
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    action: "Transfers to Partners",
    detail: "Stripe Connect transfers to partner and referring pro accounts. Insurance jobs typically have higher average values ($5k–$25k), making this the highest-value flow.",
    badge: "Payout",
    badgeColor: "bg-amber-100 text-amber-700",
  },
];

function FlowStep({ step, isLast }: { step: typeof HOMEOWNER_STEPS[0]; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = step.icon;

  return (
    <div className="flex gap-4">
      {/* Left: connector line */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border-2"
          style={{ background: step.bg, borderColor: step.border }}>
          <Icon className="w-5 h-5" style={{ color: step.color }} />
        </div>
        {!isLast && <div className="w-0.5 flex-1 mt-2 mb-0" style={{ background: step.border, minHeight: 24 }} />}
      </div>
      {/* Right: content */}
      <div className="flex-1 pb-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-bold text-gray-500">{step.actor}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${step.badgeColor}`}>{step.badge}</span>
            </div>
            <h3 className="text-sm font-bold text-gray-900">{step.action}</h3>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-gray-400 rounded-full bg-gray-100 px-2 py-0.5">
            {step.id}
          </div>
        </div>
        <button onClick={() => setExpanded(!expanded)}
          className="mt-1 text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors">
          {expanded ? "Hide detail" : "Show detail"}
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
        {expanded && (
          <p className="mt-2 text-xs text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3 border border-gray-100">
            {step.detail}
          </p>
        )}
      </div>
    </div>
  );
}

export default function PaymentFlowDiagrams() {
  const [activeFlow, setActiveFlow] = useState<"homeowner" | "insurance">("homeowner");

  return (
    <AdminLayout>
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Payment Flow Diagrams</h1>
        <p className="text-slate-400 text-sm">
          Visual step-by-step diagrams for the two primary payment flows in the ProLnk platform.
          These are patent-supporting documentation for the automated payment architecture.
        </p>
      </div>

      {/* Flow Selector */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveFlow("homeowner")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
            activeFlow === "homeowner"
              ? "bg-blue-600 border-blue-600 text-white"
              : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"
          }`}>
          <CreditCard className="w-4 h-4" />
          Homeowner Payment Flow
        </button>
        <button
          onClick={() => setActiveFlow("insurance")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
            activeFlow === "insurance"
              ? "bg-red-600 border-red-600 text-white"
              : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"
          }`}>
          <Shield className="w-4 h-4" />
          Insurance ACH Debit Flow
        </button>
      </div>

      {/* Flow Summary */}
      {activeFlow === "homeowner" ? (
        <Card className="bg-blue-950/30 border-blue-500/20">
          <CardContent className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Payment Method", value: "Card on File", icon: CreditCard, color: "text-blue-400" },
                { label: "Upfront Charge", value: "50% at Accept", icon: DollarSign, color: "text-emerald-400" },
                { label: "Final Charge", value: "50% at Completion", icon: CheckCircle, color: "text-amber-400" },
                { label: "Payout Speed", value: "2 Business Days", icon: Clock, color: "text-purple-400" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="text-center">
                  <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
                  <p className="text-sm font-bold text-white">{value}</p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-red-950/20 border-red-500/20">
          <CardContent className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Payment Method", value: "ACH Bank Debit", icon: Building2, color: "text-red-400" },
                { label: "Upfront Charge", value: "None (0%)", icon: DollarSign, color: "text-emerald-400" },
                { label: "ACH Settlement", value: "3–5 Business Days", icon: Clock, color: "text-amber-400" },
                { label: "Avg. Job Value", value: "$5k–$25k", icon: FileText, color: "text-purple-400" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="text-center">
                  <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
                  <p className="text-sm font-bold text-white">{value}</p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Flow Steps */}
      <Card className="bg-white border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            {activeFlow === "homeowner"
              ? <><CreditCard className="w-5 h-5 text-blue-600" /><h2 className="font-bold text-gray-900">Homeowner Card Payment Flow</h2></>
              : <><Shield className="w-5 h-5 text-red-600" /><h2 className="font-bold text-gray-900">Insurance ACH Debit Flow</h2></>
            }
            <Badge className="ml-auto text-xs bg-gray-100 text-gray-600 border-gray-200">
              {activeFlow === "homeowner" ? "8 Steps" : "8 Steps"}
            </Badge>
          </div>
          <div>
            {(activeFlow === "homeowner" ? HOMEOWNER_STEPS : INSURANCE_STEPS).map((step, i, arr) => (
              <FlowStep key={step.id} step={step} isLast={i === arr.length - 1} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Commission Split Reference */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardContent className="p-5">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-amber-400" />
            Commission Split Reference
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 text-slate-400 font-medium">Recipient</th>
                  <th className="text-right py-2 text-slate-400 font-medium">Standard Job</th>
                  <th className="text-right py-2 text-slate-400 font-medium">Insurance Job</th>
                  <th className="text-right py-2 text-slate-400 font-medium">Example ($10k job)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {[
                  { recipient: "Performing Partner", standard: "~82%", insurance: "~82%", example: "$8,200" },
                  { recipient: "Referring Pro Commission", standard: "6%", insurance: "6%", example: "$600" },
                  { recipient: "ProLnk Platform Fee", standard: "~12%", insurance: "~12%", example: "$1,200" },
                ].map((row) => (
                  <tr key={row.recipient}>
                    <td className="py-2 text-slate-300">{row.recipient}</td>
                    <td className="py-2 text-right text-emerald-400 font-semibold">{row.standard}</td>
                    <td className="py-2 text-right text-emerald-400 font-semibold">{row.insurance}</td>
                    <td className="py-2 text-right text-slate-400">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-slate-500 mt-3">
            * Partner rate varies by tier (Pro: 82%, Teams: 85%). ProLnk fee covers platform, AI analysis, and payment processing costs.
            Stripe processing fees (~2.9% + $0.30) are deducted from the platform fee, not passed to partners.
          </p>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  );
}
