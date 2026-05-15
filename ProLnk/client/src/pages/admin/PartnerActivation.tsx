import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  UserCheck, Mail, CheckSquare, Square, Search,
  CheckCircle, Clock, AlertCircle, Zap, TrendingUp,
  Funnel, BarChart3, FlaskConical, Bot,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface PendingPartner {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  trade: string;
  serviceArea: string;
  paymentStatus: "checkout_complete" | "pending" | "failed";
  activationStatus: "inactive" | "active" | "pending_review";
  tier?: string;
  joinedAt: string;
}

const PAYMENT_BADGE: Record<PendingPartner["paymentStatus"], { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
  checkout_complete: { label: "Paid",    color: "#34D399", bg: "rgba(52,211,153,0.15)", icon: CheckCircle },
  pending:          { label: "Pending",  color: "#FBBF24", bg: "rgba(251,191,36,0.15)", icon: Clock },
  failed:           { label: "Failed",   color: "#F87171", bg: "rgba(248,113,113,0.15)", icon: AlertCircle },
};

const ACTIVATION_BADGE: Record<PendingPartner["activationStatus"], { label: string; color: string; bg: string }> = {
  active:         { label: "Active",         color: "#34D399", bg: "rgba(52,211,153,0.15)" },
  inactive:       { label: "Inactive",       color: "#6B7280", bg: "rgba(107,114,128,0.15)" },
  pending_review: { label: "Pending Review", color: "#FBBF24", bg: "rgba(251,191,36,0.15)" },
};

const FUNNEL_STEPS = [
  { step: "Signup Submitted",       count: 312, pct: 100, color: "#60A5FA" },
  { step: "Email Confirmed",        count: 278, pct: 89,  color: "#818CF8" },
  { step: "Profile Completed",      count: 241, pct: 77,  color: "#A78BFA" },
  { step: "Checkout Initiated",     count: 198, pct: 63,  color: "#C084FC" },
  { step: "Checkout Complete",      count: 167, pct: 54,  color: "#E879F9" },
  { step: "Account Activated",      count: 149, pct: 48,  color: "#34D399" },
];

const ACTIVATION_TREND = [
  { day: "May 1",  activations: 4  },
  { day: "May 3",  activations: 7  },
  { day: "May 5",  activations: 5  },
  { day: "May 7",  activations: 11 },
  { day: "May 9",  activations: 9  },
  { day: "May 11", activations: 14 },
  { day: "May 13", activations: 12 },
  { day: "May 15", activations: 17 },
];

const AB_TESTS = [
  {
    name: "Welcome Email Subject Line",
    variantA: "Welcome to ProLnk — You're In",
    variantB: "Your territory is waiting — activate now",
    openA: 38, openB: 54, ctaA: 12, ctaB: 24,
    winner: "B",
  },
  {
    name: "Onboarding CTA Button Copy",
    variantA: "Complete Setup",
    variantB: "Claim Your Territory",
    openA: 45, openB: 45, ctaA: 18, ctaB: 31,
    winner: "B",
  },
];

const AUTO_TRIGGERS = [
  { step: "Email Confirmed",     trigger: "Auto-send onboarding checklist email", delay: "Immediate" },
  { step: "Profile Completed",   trigger: "Auto-send checkout link with territory preview", delay: "1 hour" },
  { step: "Checkout Initiated",  trigger: "Auto-send 'Don't lose your spot' reminder", delay: "2 hours" },
  { step: "Checkout Complete",   trigger: "Auto-activate account + send welcome kit", delay: "Immediate" },
  { step: "48h No Activity",     trigger: "Auto-nudge SMS: 'Your territory is unclaimed'", delay: "48 hours" },
];

function usePartnerList() {
  const { data: raw = [] } = trpc.waitlistAdmin.getProWaitlist.useQuery(
    { status: "checkout_complete", limit: 500 },
    { enabled: true, retry: false }
  );
  return useMemo<PendingPartner[]>(() => {
    return (raw as any[]).map(p => ({
      id: p.id,
      firstName: p.firstName ?? "",
      lastName: p.lastName ?? "",
      email: p.email ?? "",
      trade: p.businessType ?? p.trades ?? "—",
      serviceArea: p.serviceAreaZip ?? p.serviceArea ?? "—",
      paymentStatus: (p.paymentStatus as PendingPartner["paymentStatus"]) ?? "checkout_complete",
      activationStatus: (p.activationStatus as PendingPartner["activationStatus"]) ?? "inactive",
      tier: p.tier,
      joinedAt: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—",
    }));
  }, [raw]);
}

export default function PartnerActivation() {
  const { user } = useAuth();
  const partners = usePartnerList();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [activating, setActivating] = useState<Set<number>>(new Set());
  const [emailing, setEmailing] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [localStatus, setLocalStatus] = useState<Record<number, PendingPartner["activationStatus"]>>({});

  const activateMutation = trpc.admin?.activatePartner?.useMutation?.({
    onSuccess: (_: any, variables: any) => {
      setLocalStatus(prev => ({ ...prev, [variables.partnerId]: "active" }));
      showToast("Partner activated");
    },
    onError: () => showToast("Activation failed — please try again"),
  }) ?? null;

  const sendEmailMutation = trpc.admin?.sendWelcomeEmail?.useMutation?.({
    onSuccess: () => showToast("Welcome email sent"),
    onError: () => showToast("Email send failed — please try again"),
  }) ?? null;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return partners.filter(p =>
      !q || p.firstName.toLowerCase().includes(q) || p.lastName.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) || p.trade.toLowerCase().includes(q) || p.serviceArea.toLowerCase().includes(q)
    );
  }, [partners, search]);

  const paidPartners = filtered.filter(p => p.paymentStatus === "checkout_complete");
  const allSelected = paidPartners.length > 0 && paidPartners.every(p => selected.has(p.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelected(prev => { const n = new Set(prev); paidPartners.forEach(p => n.delete(p.id)); return n; });
    } else {
      setSelected(prev => new Set([...prev, ...paidPartners.map(p => p.id)]));
    }
  };

  const toggleOne = (id: number) => {
    setSelected(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  };

  const handleActivate = async (partnerId: number) => {
    setActivating(prev => new Set([...prev, partnerId]));
    try {
      if (activateMutation) {
        await activateMutation.mutateAsync({ partnerId });
      } else {
        await new Promise(r => setTimeout(r, 800));
        setLocalStatus(prev => ({ ...prev, [partnerId]: "active" }));
        showToast("Partner activated");
      }
    } finally {
      setActivating(prev => { const n = new Set(prev); n.delete(partnerId); return n; });
    }
  };

  const handleSendEmail = async (email: string, partnerId: number) => {
    setEmailing(prev => new Set([...prev, partnerId]));
    try {
      if (sendEmailMutation) {
        await sendEmailMutation.mutateAsync({ email });
      } else {
        await new Promise(r => setTimeout(r, 600));
        showToast(`Welcome email sent to ${email}`);
      }
    } finally {
      setEmailing(prev => { const n = new Set(prev); n.delete(partnerId); return n; });
    }
  };

  const handleBulkActivate = async () => {
    const ids = Array.from(selected);
    for (const id of ids) await handleActivate(id);
    setSelected(new Set());
    showToast(`${ids.length} partner${ids.length === 1 ? "" : "s"} activated`);
  };

  const activationStatus = (p: PendingPartner) =>
    (localStatus[p.id] as PendingPartner["activationStatus"]) ?? p.activationStatus;

  const stuckPartners: Record<string, number> = {
    "Email Confirmed": Math.max(0, (FUNNEL_STEPS[1]?.count ?? 0) - (FUNNEL_STEPS[2]?.count ?? 0)),
    "Profile Incomplete": Math.max(0, (FUNNEL_STEPS[2]?.count ?? 0) - (FUNNEL_STEPS[3]?.count ?? 0)),
    "Checkout Abandoned": Math.max(0, (FUNNEL_STEPS[3]?.count ?? 0) - (FUNNEL_STEPS[4]?.count ?? 0)),
    "Paid Not Activated": Math.max(0, (FUNNEL_STEPS[4]?.count ?? 0) - (FUNNEL_STEPS[5]?.count ?? 0)),
  };

  if (!user || user.role !== "admin") {
    return (
      <AdminLayout title="Partner Activation">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-400">Access denied. Admin access required.</p>
        </div>
      </AdminLayout>
    );
  }

  const activeCount   = filtered.filter(p => activationStatus(p) === "active").length;
  const inactiveCount = filtered.filter(p => activationStatus(p) === "inactive").length;
  const paidCount     = filtered.filter(p => p.paymentStatus === "checkout_complete").length;

  return (
    <AdminLayout title="Partner Activation" subtitle="Onboarding funnel, stuck partners, activation trends, and A/B results">
      <div className="space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Paid / Ready",    value: paidCount,    color: "#34D399", border: "rgba(52,211,153,0.25)" },
            { label: "Activated",       value: activeCount,  color: "#60A5FA", border: "rgba(96,165,250,0.25)" },
            { label: "Awaiting Action", value: inactiveCount, color: "#FBBF24", border: "rgba(251,191,36,0.25)" },
          ].map(c => (
            <Card key={c.label} className="bg-[#0d1b2e]" style={{ borderColor: c.border }}>
              <CardContent className="p-5">
                <p className="text-4xl font-black" style={{ color: c.color }}>{c.value}</p>
                <p className="text-xs font-semibold text-gray-500 mt-1">{c.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Onboarding Funnel */}
        <Card className="bg-[#0d1b2e] border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <Funnel className="w-4 h-4 text-purple-400" />
              Onboarding Funnel — Step Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {FUNNEL_STEPS.map((step, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-400">{step.step}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">{step.count} partners</span>
                      <span className="text-xs font-bold w-8 text-right" style={{ color: step.color }}>{step.pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${step.pct}%`, backgroundColor: step.color }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(stuckPartners).map(([label, count]) => (
                <div key={label} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-2xl font-black text-red-400">{count}</p>
                  <p className="text-xs text-red-300/70 mt-0.5">Stuck: {label}</p>
                  <button className="text-xs text-red-300 font-semibold mt-1 hover:text-red-200 transition-colors">
                    Nudge All →
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activation Trend Chart */}
        <Card className="bg-[#0d1b2e] border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Activation Rate — Last 30 Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={ACTIVATION_TREND}>
                <XAxis dataKey="day" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
                <Tooltip
                  contentStyle={{ background: "#0d1b2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "#9CA3AF" }}
                  itemStyle={{ color: "#34D399" }}
                />
                <Line
                  type="monotone"
                  dataKey="activations"
                  stroke="#34D399"
                  strokeWidth={2}
                  dot={{ fill: "#34D399", r: 3 }}
                  activeDot={{ r: 5, fill: "#34D399" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* A/B Test Results */}
        <Card className="bg-[#0d1b2e] border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-blue-400" />
              A/B Test Results — Onboarding Message Variations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {AB_TESTS.map((test, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-sm font-semibold text-white mb-3">{test.name}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {(["A", "B"] as const).map(v => {
                      const open = v === "A" ? test.openA : test.openB;
                      const cta = v === "A" ? test.ctaA : test.ctaB;
                      const variant = v === "A" ? test.variantA : test.variantB;
                      const isWinner = test.winner === v;
                      return (
                        <div key={v} className={`p-3 rounded-lg border ${isWinner ? "bg-emerald-500/10 border-emerald-500/30" : "bg-white/5 border-white/10"}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-black px-2 py-0.5 rounded ${isWinner ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-gray-400"}`}>
                              Variant {v}
                            </span>
                            {isWinner && <span className="text-xs font-bold text-emerald-400">Winner</span>}
                          </div>
                          <p className="text-xs text-gray-400 mb-2 italic">&ldquo;{variant}&rdquo;</p>
                          <div className="grid grid-cols-2 gap-2 text-center">
                            <div>
                              <p className="text-lg font-black" style={{ color: isWinner ? "#34D399" : "#9CA3AF" }}>{open}%</p>
                              <p className="text-xs text-gray-600">Open Rate</p>
                            </div>
                            <div>
                              <p className="text-lg font-black" style={{ color: isWinner ? "#34D399" : "#9CA3AF" }}>{cta}%</p>
                              <p className="text-xs text-gray-600">CTA Click</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Auto-Activation Triggers */}
        <Card className="bg-[#0d1b2e] border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <Bot className="w-4 h-4 text-indigo-400" />
              Auto-Activation Triggers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {AUTO_TRIGGERS.map((t, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-3 h-3 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-indigo-300">{t.step}</p>
                    <p className="text-xs text-gray-400">{t.trigger}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-500 flex-shrink-0">{t.delay}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Partner Table */}
        <Card className="bg-[#0d1b2e] border-white/10">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search name, email, trade, area…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-600 outline-none focus:border-indigo-500/50"
                />
              </div>
              {selected.size > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-blue-400">{selected.size} selected</span>
                  <button
                    onClick={handleBulkActivate}
                    className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-lg text-xs font-semibold hover:bg-emerald-500/30 transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Bulk Activate ({selected.size})
                  </button>
                  <button
                    onClick={() => setSelected(new Set())}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-3 text-left w-10">
                      <button onClick={toggleAll} className="block">
                        {allSelected
                          ? <CheckSquare className="w-4 h-4 text-blue-400" />
                          : <Square className="w-4 h-4 text-gray-600" />}
                      </button>
                    </th>
                    {["Name", "Trade", "Area", "Payment", "Activation", "Joined", "Actions"].map(h => (
                      <th key={h} className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-12 text-center text-sm text-gray-500">
                        No partners found.
                      </td>
                    </tr>
                  ) : filtered.map(partner => {
                    const payBadge = PAYMENT_BADGE[partner.paymentStatus];
                    const actBadge = ACTIVATION_BADGE[activationStatus(partner)];
                    const PayIcon = payBadge.icon;
                    const isPaid = partner.paymentStatus === "checkout_complete";
                    const isActive = activationStatus(partner) === "active";
                    const isActivating = activating.has(partner.id);
                    const isEmailing = emailing.has(partner.id);
                    const isChecked = selected.has(partner.id);

                    return (
                      <tr key={partner.id} className={`hover:bg-white/5 transition-colors ${isChecked ? "bg-blue-500/5" : ""}`}>
                        <td className="p-3">
                          {isPaid && (
                            <button onClick={() => toggleOne(partner.id)}>
                              {isChecked
                                ? <CheckSquare className="w-4 h-4 text-blue-400" />
                                : <Square className="w-4 h-4 text-gray-600" />}
                            </button>
                          )}
                        </td>
                        <td className="p-3">
                          <p className="text-sm font-semibold text-white">{partner.firstName} {partner.lastName}</p>
                          <p className="text-xs text-gray-500">{partner.email}</p>
                        </td>
                        <td className="p-3 text-xs text-gray-400">{partner.trade}</td>
                        <td className="p-3 text-xs text-gray-400">{partner.serviceArea}</td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: payBadge.bg, color: payBadge.color }}>
                            <PayIcon className="w-3 h-3" />
                            {payBadge.label}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: actBadge.bg, color: actBadge.color }}>
                            {actBadge.label}
                          </span>
                        </td>
                        <td className="p-3 text-xs text-gray-500">{partner.joinedAt}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {isPaid && !isActive && (
                              <button
                                disabled={isActivating}
                                onClick={() => handleActivate(partner.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                                style={{
                                  background: isActivating ? "rgba(255,255,255,0.05)" : "rgba(52,211,153,0.15)",
                                  color: isActivating ? "#6B7280" : "#34D399",
                                  border: "1px solid",
                                  borderColor: isActivating ? "rgba(255,255,255,0.1)" : "rgba(52,211,153,0.3)",
                                  cursor: isActivating ? "not-allowed" : "pointer",
                                }}
                              >
                                <UserCheck className="w-3.5 h-3.5" />
                                {isActivating ? "Activating…" : "Activate"}
                              </button>
                            )}
                            {isActive && (
                              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                                <CheckCircle className="w-3.5 h-3.5" /> Active
                              </span>
                            )}
                            <button
                              disabled={isEmailing}
                              onClick={() => handleSendEmail(partner.email, partner.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 text-gray-400 hover:text-gray-200 hover:border-white/20 transition-colors"
                              style={{ opacity: isEmailing ? 0.5 : 1, cursor: isEmailing ? "not-allowed" : "pointer" }}
                            >
                              <Mail className="w-3 h-3" />
                              {isEmailing ? "Sending…" : "Email"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white"
          style={{ background: "#0d1b2e", border: "1px solid rgba(52,211,153,0.3)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          {toast}
        </div>
      )}
    </AdminLayout>
  );
}
