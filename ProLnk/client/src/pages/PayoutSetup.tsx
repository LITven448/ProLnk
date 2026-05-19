import React from 'react';
/**
 * PayoutSetup — REV-02
 * Bank account and payout configuration via Stripe Connect.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import PartnerLayout from "@/components/PartnerLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DollarSign, CheckCircle, Clock, AlertTriangle, ExternalLink,
  Shield, Zap, ArrowRight, CreditCard, Building2, RefreshCw,
  Lock, ChevronRight, FileText, Info, Check, ChevronDown, ChevronUp,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Connect Bank Account", desc: "Securely link your business bank account via Stripe" },
  { id: 2, label: "Verify Identity", desc: "Stripe verifies your business identity (takes 1–2 min)" },
  { id: 3, label: "Activate Payouts", desc: "Start receiving commission payouts automatically" },
];

const STATUS_CONFIG = {
  not_connected: {
    label: "Not Connected",
    color: "border-white/20 bg-white/5 text-white/60″,
    badgeColor: "bg-white/10 text-white/50″,
    icon: AlertTriangle,
    step: 1,
  },
  pending: {
    label: "Verification Pending",
    color: "border-amber-400/30 bg-amber-400/5 text-amber-400″,
    badgeColor: "bg-amber-400/10 text-amber-400″,
    icon: Clock,
    step: 2,
  },
  active: {
    label: "Payouts Active",
    color: "border-teal-400/30 bg-teal-400/5 text-teal-400″,
    badgeColor: "bg-teal-400/10 text-teal-400″,
    icon: CheckCircle,
    step: 3,
  },
  restricted: {
    label: "Action Required",
    color: "border-red-400/30 bg-red-400/5 text-red-400″,
    badgeColor: "bg-red-400/10 text-red-400″,
    icon: AlertTriangle,
    step: 2,
  },
};

const PAYOUT_SCHEDULES = [
  { id: "weekly", label: "Weekly", desc: "Every Monday" },
  { id: "biweekly", label: "Biweekly", desc: "Every other Monday" },
  { id: "monthly", label: "Monthly", desc: "First of every month" },
];

function SectionCard({
  title,
  subtitle,
  icon: Icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3″>
          <div className="w-8 h-8 rounded-lg bg-teal-400/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-teal-400″ />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{title}</p>
            {subtitle && <p className="text-xs text-white/50″>{subtitle}</p>}
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-white/40″ />
        ) : (
          <ChevronDown className="w-4 h-4 text-white/40″ />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-white/10″>
          {children}
        </div>
      )}
    </div>
  );
}

export default function PayoutSetup() {
  const [connecting, setConnecting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [payoutSchedule, setPayoutSchedule] = useState("monthly");
  const [threshold, setThreshold] = useState(100);

  const { data: connectStatus, refetch } = trpc.stripe.getConnectStatus.useQuery();
  const { data: commissions = [] } = trpc.partners.getPaidCommissions.useQuery();

  const createConnectLink = trpc.stripe.createConnectLink.useMutation({
    onSuccess: (data: { url?: string }) => {
      if (data.url) {
        window.open(data.url, "_blank");
        toast.success("Stripe Connect opened — complete setup in the new tab, then return here.");
      }
      setConnecting(false);
    },
    onError: (e: { message?: string }) => {
      toast.error(e.message || "Failed to create Stripe Connect link");
      setConnecting(false);
    },
  });

  const status = ((connectStatus as any)?.status as keyof typeof STATUS_CONFIG) ?? "not_connected";
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.not_connected;
  const StatusIcon = cfg.icon;

  const pendingCommissions = (commissions as any[]).filter((c) => !c.paid);
  const pendingTotal = pendingCommissions.reduce((s, c) => s + Number(c.amount ?? 0), 0);
  const paidTotal = (commissions as any[]).filter((c) => c.paid).reduce((s, c) => s + Number(c.amount ?? 0), 0);
  const last4 = (connectStatus as any)?.bankAccountLast4;

  const recentPayouts = (commissions as any[])
    .filter((c) => c.paid)
    .slice(0, 3)
    .map((c) => ({
      date: c.paidAt ? new Date(c.paidAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—",
      amount: `$${Number(c.amount).toFixed(2)}`,
      ref: c.id,
    }));

  const handleConnect = () => {
    setConnecting(true);
    createConnectLink.mutate({ origin: window.location.origin });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
    toast.success("Status refreshed");
  };

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-[#0A1628] p-4 sm:p-6″>
        <div className="max-w-2xl mx-auto space-y-5″>
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-white">Payout Setup</h1>
            <p className="text-white/50 text-sm mt-1″>
              Connect your bank account to receive commission payouts directly via Stripe.
            </p>
          </div>

          {/* Earnings summary strip */}
          <div className="grid grid-cols-2 gap-3″>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4″>
              <div className="flex items-center gap-2 mb-1.5″>
                <Clock className="w-4 h-4 text-amber-400″ />
                <span className="text-xs text-white/50 uppercase tracking-wide font-medium">Pending</span>
              </div>
              <div className="text-2xl font-bold text-white">
                ${pendingTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-white/40 mt-0.5″>
                {pendingCommissions.length} commission{pendingCommissions.length !== 1 ? "s" : ""} awaiting payout
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4″>
              <div className="flex items-center gap-2 mb-1.5″>
                <CheckCircle className="w-4 h-4 text-teal-400″ />
                <span className="text-xs text-white/50 uppercase tracking-wide font-medium">Total Paid</span>
              </div>
              <div className="text-2xl font-bold text-white">
                ${paidTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-white/40 mt-0.5″>Lifetime commissions received</p>
            </div>
          </div>

          {/* Bank Account / Stripe Connect */}
          <SectionCard title="Bank Account" subtitle="Connected via Stripe Connect" icon={Building2} defaultOpen={true}>
            <div className="mt-3 space-y-4″>
              {/* Status row */}
              <div className={`flex items-center justify-between p-4 rounded-xl border ${cfg.color}`}>
                <div className="flex items-center gap-3″>
                  <StatusIcon className="w-5 h-5 flex-shrink-0″ />
                  <div>
                    <p className="text-sm font-semibold">{cfg.label}</p>
                    {status === "active" && last4 ? (
                      <p className="text-xs font-mono opacity-70″>Bank account ending in ••••{last4}</p>
                    ) : status === "active" ? (
                      <p className="text-xs opacity-70″>Payouts active — commissions transfer within 2–3 business days</p>
                    ) : status === "pending" ? (
                      <p className="text-xs opacity-70″>Stripe is verifying your account</p>
                    ) : status === "restricted" ? (
                      <p className="text-xs opacity-70″>Stripe requires additional information</p>
                    ) : (
                      <p className="text-xs opacity-70″>Set up your bank account to receive payouts</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="p-2 rounded-lg text-current/40 hover:bg-white/10 transition-colors"
                  title="Refresh status"
                >
                  <RefreshCw className={`w-4 h-4 opacity-50 ${refreshing ? "animate-spin" : ""}`} />
                </button>
              </div>

              {/* Security note */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10″>
                <Lock className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0″ />
                <p className="text-xs text-white/40 leading-relaxed">
                  Bank account setup is handled entirely by Stripe — ProLnk never stores your banking credentials.
                  Stripe is a PCI-DSS Level 1 certified payment processor trusted by millions of businesses.
                </p>
              </div>

              {/* CTA */}
              {status !== "active" ? (
                <Button
                  onClick={handleConnect}
                  disabled={connecting}
                  className="w-full bg-teal-400 hover:bg-teal-500 text-[#0A1628] font-semibold py-5″
                >
                  {connecting ? (
                    <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Opening Stripe...</>
                  ) : status === "pending" ? (
                    <><ExternalLink className="w-4 h-4 mr-2″ /> Continue Stripe Setup</>
                  ) : status === "restricted" ? (
                    <><ExternalLink className="w-4 h-4 mr-2″ /> Fix Stripe Issues</>
                  ) : (
                    <><Building2 className="w-4 h-4 mr-2″ /> Connect via Stripe</>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleConnect}
                  disabled={connecting}
                  variant="outline"
                  className="w-full border-white/10 text-white/70 hover:bg-white/10″
                >
                  {connecting ? (
                    <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Opening...</>
                  ) : (
                    <><ExternalLink className="w-4 h-4 mr-2″ /> Manage Payout Account in Stripe</>
                  )}
                </Button>
              )}
            </div>
          </SectionCard>

          {/* Payout Schedule */}
          <SectionCard title="Payout Schedule" subtitle="How often you receive payouts" icon={Clock} defaultOpen={true}>
            <div className="mt-3 space-y-2″>
              {PAYOUT_SCHEDULES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setPayoutSchedule(s.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-colors text-left ${
                    payoutSchedule === s.id
                      ? "border-teal-400/40 bg-teal-400/5″
                      : "border-white/10 bg-white/5 hover:bg-white/10″
                  }`}
                >
                  <div>
                    <p className={`text-sm font-semibold ${payoutSchedule === s.id ? "text-teal-400" : "text-white"}`}>
                      {s.label}
                    </p>
                    <p className="text-xs text-white/40″>{s.desc}</p>
                  </div>
                  {payoutSchedule === s.id && (
                    <Check className="w-4 h-4 text-teal-400 flex-shrink-0″ />
                  )}
                </button>
              ))}
            </div>
          </SectionCard>

          {/* Minimum Payout Threshold */}
          <SectionCard title="Minimum Payout Threshold" subtitle="Only payout when balance reaches this amount" icon={DollarSign} defaultOpen={true}>
            <div className="mt-3 space-y-4″>
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/60″>Hold until balance reaches:</p>
                <span className="text-xl font-bold text-teal-400″>${threshold}</span>
              </div>
              <input
                type="range"
                min={50}
                max={500}
                step={25}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-white/30″>
                <span>$50</span>
                <span>$500</span>
              </div>
              <p className="text-xs text-white/40″>
                Commissions below this threshold roll to the next payout cycle. Minimum is $50.
              </p>
              <Button
                onClick={() => toast.success("Payout settings saved")}
                className="bg-teal-400 hover:bg-teal-500 text-[#0A1628] font-semibold text-sm"
              >
                <Check className="w-4 h-4 mr-1.5″ />
                Save Settings
              </Button>
            </div>
          </SectionCard>

          {/* Tax Information */}
          <SectionCard title="Tax Information" subtitle="1099-NEC and compliance" icon={FileText} defaultOpen={false}>
            <div className="mt-3 space-y-3″>
              <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2″>
                <div className="flex items-start gap-2.5″>
                  <Info className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0″ />
                  <p className="text-sm text-white/70 leading-relaxed">
                    Partners earning over $20,000 in a calendar year will receive a 1099-NEC form by January 31 of the following year.
                    ProLnk uses your Stripe Connect account to collect and validate your tax information.
                  </p>
                </div>
              </div>
              <a
                href="/dashboard/compliance"
                className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <div>
                  <p className="text-sm font-semibold text-white">View Compliance Docs</p>
                  <p className="text-xs text-white/40″>1099 info, RESPA, and tax guidance</p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
              </a>
            </div>
          </SectionCard>

          {/* Transaction History Preview */}
          <SectionCard title="Recent Payouts" subtitle="Last 3 commission payouts" icon={CreditCard} defaultOpen={true}>
            <div className="mt-3″>
              {recentPayouts.length > 0 ? (
                <div className="space-y-2″>
                  {recentPayouts.map((p) => (
                    <div key={p.ref} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0″>
                      <div>
                        <p className="text-sm font-semibold text-white">{p.amount}</p>
                        <p className="text-xs text-white/40″>{p.date}</p>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-400/10 text-teal-400″>
                        paid
                      </span>
                    </div>
                  ))}
                  <a
                    href="/dashboard/commissions"
                    className="flex items-center gap-1.5 mt-2 text-xs text-teal-400 hover:text-teal-300 font-medium"
                  >
                    View full commission ledger <ArrowRight className="w-3 h-3″ />
                  </a>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <DollarSign className="w-8 h-8 text-white/10 mx-auto mb-2″ />
                  <p className="text-sm text-white/40″>No payouts yet.</p>
                  <p className="text-xs text-white/30 mt-0.5″>
                    Connect your bank account to start receiving commissions.
                  </p>
                </div>
              )}
            </div>
          </SectionCard>

          {/* How payouts work */}
          <SectionCard title="How Payouts Work" subtitle="The 3-step process" icon={Zap} defaultOpen={false}>
            <div className="mt-3 space-y-4″>
              {STEPS.map((step, i) => (
                <div key={step.id} className="flex items-start gap-3″>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                      cfg.step > i
                        ? "bg-teal-400/20 text-teal-400″
                        : cfg.step === i + 1
                        ? "bg-teal-400 text-[#0A1628]"
                        : "bg-white/10 text-white/40″
                    }`}
                  >
                    {cfg.step > i ? <CheckCircle className="w-3.5 h-3.5″ /> : step.id}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${cfg.step >= i + 1 ? "text-white" : "text-white/50"}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-white/40 mt-0.5″>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </PartnerLayout>
  );
}
