import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign, AlertCircle, CheckCircle, Clock, CreditCard,
  RefreshCw, Zap, Shield, User, Calendar, XCircle,
  RotateCcw, Phone, Activity
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { toast } from "sonner";

const DAILY_PAYOUTS = [
  { day: "May 9", amount: 4820 },
  { day: "May 10", amount: 6140 },
  { day: "May 11", amount: 3900 },
  { day: "May 12", amount: 7280 },
  { day: "May 13", amount: 5560 },
  { day: "May 14", amount: 8940 },
  { day: "May 15", amount: 6200 },
];

const FAILED_PAYMENTS = [
  { id: "fp_001", partner: "Sunrise Plumbing Co.", amount: 1480, reason: "Card declined", date: "May 13", canRetry: true },
  { id: "fp_002", partner: "Metro Electrical", amount: 620, reason: "Insufficient funds", date: "May 12", canRetry: true },
  { id: "fp_003", partner: "Valley HVAC Services", amount: 3200, reason: "Bank account closed", date: "May 11", canRetry: false },
  { id: "fp_004", partner: "TopRoof Inc.", amount: 980, reason: "Card expired", date: "May 11", canRetry: false },
  { id: "fp_005", partner: "GreenLawn Pro", amount: 340, reason: "Insufficient funds", date: "May 10", canRetry: true },
];

const PENDING_PAYOUTS = [
  { name: "CoolBreeze Systems", amount: 2840, days: 1, method: "Stripe" },
  { name: "Precision Plumbing DFW", amount: 1620, days: 2, method: "ACH" },
  { name: "Spark Electric", amount: 980, days: 2, method: "Stripe" },
  { name: "Foundation Pros TX", amount: 4200, days: 3, method: "ACH" },
  { name: "Roof Masters Inc.", amount: 3100, days: 3, method: "ACH" },
  { name: "AllPro Pest Control", amount: 520, days: 4, method: "Stripe" },
  { name: "Elite Landscaping", amount: 740, days: 4, method: "Stripe" },
  { name: "ProPaint DFW", amount: 1280, days: 5, method: "ACH" },
];

function usd(n: number) {
  return `$${n.toLocaleString()}`;
}

export default function PaymentMonitorDashboard() {
  const [sweepConfirm, setSweepConfirm] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const [retried, setRetried] = useState<Set<string>>(new Set());

  function handleRetry(id: string, name: string) {
    setRetried(prev => new Set([...prev, id]));
    toast.success(`Retry queued for ${name}`);
  }

  function handleSweep() {
    if (!sweepConfirm) {
      setSweepConfirm(true);
      return;
    }
    setSweeping(true);
    setTimeout(() => {
      setSweeping(false);
      setSweepConfirm(false);
      toast.success("Payout sweep initiated — 8 partners queued");
    }, 1800);
  }

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">Payment Monitor</h1>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-1">Real-time payment health and payout operations</p>
          </div>
          <Button
            onClick={handleSweep}
            disabled={sweeping}
            className={`${sweepConfirm ? "bg-amber-600 hover:bg-amber-500" : "bg-blue-600 hover:bg-blue-500"} text-white`}
          >
            {sweeping ? (
              <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Running sweep…</>
            ) : sweepConfirm ? (
              <><Zap className="w-4 h-4 mr-2" /> Confirm Force Sweep</>
            ) : (
              <><Zap className="w-4 h-4 mr-2" /> Force Sweep Now</>
            )}
          </Button>
        </div>

        {/* Stripe status */}
        <Card className="bg-emerald-900/20 border-emerald-700/40">
          <CardContent className="p-3 flex items-center gap-3">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-emerald-300 text-sm font-medium">Stripe Live Mode Connected</span>
            <span className="text-slate-400 text-xs ml-auto">Last webhook: May 15, 2026 at 11:47am</span>
          </CardContent>
        </Card>

        {/* Health metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Payment Success Rate", value: "98.4%", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-900/20 border-emerald-700/40" },
            { label: "Failed This Week", value: "3", icon: XCircle, color: "text-red-400", bg: "bg-red-900/20 border-red-700/40" },
            { label: "Held Funds", value: "$12,400", icon: DollarSign, color: "text-amber-400", bg: "bg-amber-900/20 border-amber-700/40" },
            { label: "Next Payout Sweep", value: "Tonight 2:00 AM", icon: Clock, color: "text-blue-400", bg: "bg-blue-900/20 border-blue-700/40" },
          ].map(m => (
            <Card key={m.label} className={`${m.bg} border`}>
              <CardContent className="p-4 flex items-center gap-3">
                <m.icon className={`w-8 h-8 ${m.color} shrink-0`} />
                <div>
                  <div className="text-white font-bold text-sm">{m.value}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{m.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payout history chart */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" /> Daily Payout Volume (Last 7 Days)
            </h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={DAILY_PAYOUTS} barSize={28}>
                <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
                  labelStyle={{ color: "#f1f5f9", fontSize: 12 }}
                  formatter={(val: number) => [`$${val.toLocaleString()}`, "Paid out"]}
                />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {DAILY_PAYOUTS.map((_, i) => (
                    <Cell key={i} fill={i === DAILY_PAYOUTS.length - 1 ? "#3b82f6" : "#1e3a5f"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Failed payments */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-5">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" /> Failed Payments
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30 ml-auto">{FAILED_PAYMENTS.length} total</Badge>
            </h3>
            <div className="space-y-2">
              {FAILED_PAYMENTS.map(fp => (
                <div key={fp.id} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{fp.partner}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-red-400 text-xs">{fp.reason}</span>
                      <span className="text-slate-500 text-xs">{fp.date}</span>
                    </div>
                  </div>
                  <span className="text-white font-semibold text-sm">{usd(fp.amount)}</span>
                  <div className="flex gap-1.5 shrink-0">
                    {fp.canRetry && !retried.has(fp.id) ? (
                      <Button size="sm" variant="outline" className="h-7 text-xs bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                        onClick={() => handleRetry(fp.id, fp.partner)}>
                        <RotateCcw className="w-3 h-3 mr-1" /> Retry
                      </Button>
                    ) : retried.has(fp.id) ? (
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">Queued</Badge>
                    ) : null}
                    <Button size="sm" variant="outline" className="h-7 text-xs bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600">
                      <Phone className="w-3 h-3 mr-1" /> Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending payouts table */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-5">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> Pending Payouts
              <span className="text-slate-500 text-xs font-normal ml-auto">Awaiting next sweep</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 text-xs border-b border-slate-700">
                    <th className="text-left py-2 font-medium">Partner</th>
                    <th className="text-right py-2 font-medium">Amount</th>
                    <th className="text-right py-2 font-medium">Days Pending</th>
                    <th className="text-right py-2 font-medium">Method</th>
                  </tr>
                </thead>
                <tbody>
                  {PENDING_PAYOUTS.map((p, i) => (
                    <tr key={i} className="border-b border-slate-700/40 last:border-0 hover:bg-slate-700/20 transition-colors">
                      <td className="py-2.5 text-white">{p.name}</td>
                      <td className="py-2.5 text-right text-emerald-400 font-medium">{usd(p.amount)}</td>
                      <td className="py-2.5 text-right">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          p.days <= 2 ? "bg-emerald-500/20 text-emerald-400" : p.days <= 4 ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"
                        }`}>
                          {p.days}d
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <Badge className={`text-xs border ${
                          p.method === "Stripe"
                            ? "bg-violet-500/20 text-violet-300 border-violet-500/30"
                            : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                        }`}>
                          {p.method}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-slate-600 mt-1">
                    <td className="py-2.5 text-slate-400 text-xs">8 partners</td>
                    <td className="py-2.5 text-right text-white font-bold">
                      {usd(PENDING_PAYOUTS.reduce((s, p) => s + p.amount, 0))}
                    </td>
                    <td colSpan={2} />
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  );
}
