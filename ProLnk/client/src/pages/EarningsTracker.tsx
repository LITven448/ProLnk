import PageLoadingSkeleton from "@/components/PageLoadingSkeleton";
import { useState, useMemo } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  DollarSign, TrendingUp, Calendar, Download, ChevronDown, ChevronUp,
  CheckCircle, Clock, Loader2, BarChart2, AlertTriangle, Award, Banknote, ExternalLink, RefreshCw,
  Send
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from "recharts";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const STATUS_COLORS: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function EarningsTracker() {
  const { user } = useAuth();
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");
  const [payoutDialogOpen, setPayoutDialogOpen] = useState(false);
  const [payoutNote, setPayoutNote] = useState("");
  const { data: myJobs, isLoading: jobsLoading } = trpc.partners.getMyJobs.useQuery();
  const { data: commissions, isLoading: commLoading } = trpc.partners.getPaidCommissions.useQuery();
  const { data: profileData } = trpc.partners.getMyProfile.useQuery();
  const { data: stripeStatus, refetch: refetchStripe } = trpc.stripe.getConnectStatus.useQuery();
  const { data: payoutRequests, refetch: refetchPayouts } = trpc.payments.getMyPayoutRequests.useQuery();
  const requestPayout = trpc.payments.requestPayout.useMutation({
    onSuccess: () => {
      toast.success("Payout request submitted! Admin will review within 1-2 business days.");
      setPayoutDialogOpen(false);
      setPayoutNote("");
      refetchPayouts();
    },
    onError: (e) => toast.error(e.message),
  });
  const createConnectLink = trpc.stripe.createConnectLink.useMutation({
    onSuccess: (data) => { window.open(data.url, "_blank"); },
    onError: (e) => toast.error(e.message),
  });
  const verifyConnect = trpc.stripe.verifyConnectAccount.useMutation({
    onSuccess: () => { refetchStripe(); toast.success("Payout account verified!"); },
    onError: (e) => toast.error(e.message),
  });

  const isLoading = jobsLoading || commLoading;

  // Tier config
  const TIER_CONFIG: Record<string, { label: string; cap: number | null; keepRate: number; color: string }> = {
    scout:      { label: "Scout",      cap: 500,  keepRate: 0.40, color: "bg-gray-100 text-gray-700" },
    pro:        { label: "Pro",        cap: null, keepRate: 0.55, color: "bg-blue-100 text-blue-700" },
    crew:       { label: "Crew",       cap: null, keepRate: 0.65, color: "bg-purple-100 text-purple-700" },
    company:    { label: "Company",    cap: null, keepRate: 0.72, color: "bg-amber-100 text-amber-700" },
    enterprise: { label: "Enterprise", cap: null, keepRate: 0.78, color: "bg-[#0A1628]/10 text-[#0A1628]" },
  };
  const partnerTier = (profileData?.partner as any)?.tier ?? "scout";
  const tierInfo = TIER_CONFIG[partnerTier] ?? TIER_CONFIG.scout;

  // Aggregate earnings from commissions (paid = boolean)
  const totalEarned = useMemo(() => {
    if (!commissions) return 0;
    return commissions.filter((c: any) => c.paid).reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
  }, [commissions]);

  const pendingEarnings = useMemo(() => {
    if (!commissions) return 0;
    return commissions.filter((c: any) => !c.paid).reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
  }, [commissions]);

  // Monthly chart data from commissions
  const chartData = useMemo(() => {
    if (!commissions) return [];
    const months: Record<string, number> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      months[key] = 0;
    }
    commissions.forEach((c: any) => {
      if (!c.paid) return;
      const d = new Date(c.createdAt);
      const key = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      if (key in months) months[key] += Number(c.amount ?? 0);
    });
    return Object.entries(months).map(([month, amount]) => ({ month, amount }));
  }, [commissions]);

  const jobsThisMonth = useMemo(() => {
    if (!myJobs) return 0;
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    return myJobs.filter((j: any) => new Date(j.loggedAt) >= start).length;
  }, [myJobs]);

  const handleExport = () => {
    if (!commissions || commissions.length === 0) {
      toast.error("No earnings data to export");
      return;
    }
    const rows = [
      ["Date", "Commission Type", "Status", "Amount"],
      ...commissions.map((c: any) => [
        new Date(c.createdAt).toLocaleDateString(),
        (c.commissionType ?? "Commission").replace(/_/g, " "),
        c.paid ? "Paid" : "Pending",
        `$${Number(c.amount ?? 0).toFixed(2)}`,
      ]),
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `earnings-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Earnings exported to CSV");
  };

  if (isLoading) return <PartnerLayout><PageLoadingSkeleton /></PartnerLayout>;
  return (
    <PartnerLayout>
    <div className="bg-gray-50 min-h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Earnings Tracker</h1>
            <p className="text-xs text-gray-500">Your commission history</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Tier badge */}
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${tierInfo.color}`}>
            <Award className="w-3 h-3" />
            {tierInfo.label}
          </span>
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Commission cap reset countdown */}
      {(() => {
        const now = new Date();
        const resetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const daysLeft = Math.ceil((resetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        const tierCap = TIER_CONFIG[partnerTier]?.cap;
        const monthlyEarned = Number(profileData?.partner?.monthlyCommissionEarned ?? 0);
        const capPct = tierCap ? Math.min(100, Math.round((monthlyEarned / tierCap) * 100)) : 0;
        return (
          <div className="mx-4 mt-3 bg-white rounded-xl border border-gray-100 shadow-sm p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-blue-500" />
                Monthly Cap Resets in {daysLeft} day{daysLeft !== 1 ? "s" : ""}
              </span>
              <span className="text-xs text-gray-400">{new Date(resetDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            </div>
            {tierCap ? (
              <>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>${monthlyEarned.toFixed(2)} earned this month</span>
                  <span>${tierCap} cap</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${capPct >= 90 ? "bg-red-500" : capPct >= 70 ? "bg-amber-500" : "bg-green-500"}`}
                    style={{ width: `${capPct}%` }}
                  />
                </div>
                {capPct >= 80 && (
                  <p className="text-xs text-amber-700 mt-1.5">
                    {capPct >= 100 ? "Cap reached — upgrade to Pro to keep earning" : `${100 - capPct}% of cap remaining this month`}
                  </p>
                )}
              </>
            ) : (
              <p className="text-xs text-green-600">No monthly cap — unlimited earnings on {TIER_CONFIG[partnerTier]?.label ?? partnerTier} tier</p>
            )}
          </div>
        );
      })()}

      {/* Scout cap warning */}
      {partnerTier === "scout" && totalEarned > 400 && (
        <div className="mx-4 mt-3 flex items-start gap-2.5 p-3 bg-amber-50 border border-amber-200 rounded-xl">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-800">
              Approaching Scout Tier Cap -- ${totalEarned.toFixed(0)} of $500/mo earned
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              Scout tier earns up to $500/month in commissions. Upgrade to Pro ($29/mo) to remove the cap and keep 55% of every commission.
            </p>
          </div>
        </div>
      )}

      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium">Total Earned</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {isLoading ? "..." : `$${totalEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-500" /> Paid commissions
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium">Pending</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {isLoading ? "..." : `$${pendingEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <Clock className="w-3 h-3 text-yellow-500" /> Awaiting payout
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium">Jobs This Month</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {isLoading ? "..." : jobsThisMonth}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-blue-500" /> Logged this month
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium">Total Jobs</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">
              {isLoading ? "..." : (myJobs?.length ?? 0)}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <BarChart2 className="w-3 h-3 text-purple-500" /> All time
            </p>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" /> Monthly Earnings
            </h2>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            </div>
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(v: number) => [`$${v.toFixed(2)}`, "Earnings"]} />
                <Area type="monotone" dataKey="amount" stroke="#10B981" fill="url(#earningsGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
              No earnings data yet
            </div>
          )}
        </div>

        {/* Stripe Connect Payout Setup */}
        <div className={`bg-white rounded-xl border shadow-sm p-4 ${
          stripeStatus?.status === "active" ? "border-green-200" : "border-amber-200"
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Banknote className="w-4 h-4 text-green-600" /> Payout Account
            </h2>
            {stripeStatus?.status === "active" && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Active
              </span>
            )}
            {stripeStatus?.status === "pending" && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Pending
              </span>
            )}
            {(!stripeStatus?.status || stripeStatus?.status === "not_connected") && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700">Not Connected</span>
            )}
          </div>
          {stripeStatus?.status === "active" ? (
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-600">
                Bank account ending in <strong>{stripeStatus.bankLast4 ?? "----"}</strong> is connected. Commissions are paid automatically.
              </p>
              <Button variant="ghost" size="sm" onClick={() => verifyConnect.mutate()} className="ml-auto shrink-0">
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          ) : stripeStatus?.status === "pending" ? (
            <div className="space-y-2">
              <p className="text-xs text-gray-600">Your Stripe account is pending verification. Complete onboarding to activate payouts.</p>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => createConnectLink.mutate({ origin: window.location.origin })} disabled={createConnectLink.isPending} className="gap-1.5">
                  <ExternalLink className="w-3 h-3" /> Continue Onboarding
                </Button>
                <Button variant="outline" size="sm" onClick={() => verifyConnect.mutate()} disabled={verifyConnect.isPending}>
                  <RefreshCw className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-gray-600">Connect your bank account to receive automatic commission payouts via Stripe.</p>
              <Button size="sm" onClick={() => createConnectLink.mutate({ origin: window.location.origin })} disabled={createConnectLink.isPending} className="gap-1.5 bg-green-600 hover:bg-green-700 text-white">
                {createConnectLink.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Banknote className="w-3 h-3" />}
                Connect Bank Account
              </Button>
            </div>
          )}
        </div>

        {/* Request Payout */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Send className="w-4 h-4 text-blue-500" /> Request Payout
            </h2>
          </div>
          {pendingEarnings > 0 ? (
            <div className="space-y-3">
              <p className="text-xs text-gray-600">
                You have <span className="font-semibold text-yellow-700">${pendingEarnings.toFixed(2)}</span> in pending commissions. Submit a request and admin will process it within 1-2 business days.
              </p>
              <Button
                size="sm"
                onClick={() => setPayoutDialogOpen(true)}
                disabled={stripeStatus?.status !== "active"}
                className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-3 h-3" /> Request Payout
              </Button>
              {stripeStatus?.status !== "active" && (
                <p className="text-xs text-amber-600">Connect your bank account above before requesting a payout.</p>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-400">No pending balance to request.</p>
          )}
          {payoutRequests && payoutRequests.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold text-gray-600">Recent Requests</p>
              {payoutRequests.slice(0, 5).map((r: any) => (
                <div key={r.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-xs text-gray-700">${Number(r.requestedAmount).toFixed(2)}</p>
                    <p className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    r.status === "paid" ? "bg-green-100 text-green-700" :
                    r.status === "approved" ? "bg-blue-100 text-blue-700" :
                    r.status === "rejected" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payout Request Dialog */}
        <Dialog open={payoutDialogOpen} onOpenChange={setPayoutDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Payout</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <p className="text-sm text-gray-600">
                Requesting payout of your pending balance: <span className="font-bold text-gray-900">${pendingEarnings.toFixed(2)}</span>
              </p>
              <Textarea
                placeholder="Optional note to admin (e.g. preferred timing, bank details update)"
                value={payoutNote}
                onChange={(e) => setPayoutNote(e.target.value)}
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPayoutDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={() => requestPayout.mutate({ requestedAmount: pendingEarnings, note: payoutNote || undefined })}
                disabled={requestPayout.isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {requestPayout.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Request"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Commission History */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Commission History</h2>
          {isLoading ? (
            <div className="flex items-center justify-center h-20">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            </div>
          ) : commissions && commissions.length > 0 ? (
            <div className="space-y-2">
              {commissions.slice(0, 20).map((c: any) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {(c.commissionType ?? "Commission").replace(/_/g, " ").replace(/\b\w/g, (ch: string) => ch.toUpperCase())}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.paid ? STATUS_COLORS.paid : STATUS_COLORS.pending}`}>
                      {c.paid ? "Paid" : "Pending"}
                    </span>
                    <span className={`text-sm font-bold ${c.paid ? "text-green-600" : "text-yellow-600"}`}>
                      ${Number(c.amount ?? 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <DollarSign className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No commissions yet</p>
              <p className="text-xs text-gray-400 mt-1">Log jobs and refer customers to start earning</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </PartnerLayout>
  );
}
