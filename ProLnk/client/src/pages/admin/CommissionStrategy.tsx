import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { DollarSign } from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(n ?? 0));
}

export default function CommissionStrategy() {
  const { data, isLoading } = trpc.adminExtras.getCommissionBreakdown.useQuery();
  const tiers = data ?? [];
  const chartData = tiers.map((t: any) => ({ tier: t.tier, platformFees: Number(t.platformFees), referralCommissions: Number(t.referralCommissions), prolinkNet: Number(t.prolinkNet) }));
  const totalPaid = tiers.reduce((s: number, t: any) => s + Number(t.totalPaid), 0);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Commission Strategy</h1>
          <p className="text-muted-foreground">Commission breakdown by partner tier</p>
        </div>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><DollarSign className="h-4 w-4 text-green-500" /><span className="text-sm text-muted-foreground">Total Commissions Paid</span></div><div className="text-3xl font-bold text-green-600">{fmt(totalPaid)}</div></CardContent></Card>
        {chartData.length > 0 && (
          <Card>
            <CardHeader><CardTitle>Commission by Tier</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="tier" /><YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} /><Tooltip formatter={(v: number) => fmt(v)} /><Bar dataKey="platformFees" fill="#3b82f6" name="Platform Fees" /><Bar dataKey="referralCommissions" fill="#f59e0b" name="Referral Commissions" /><Bar dataKey="prolinkNet" fill="#10b981" name="ProLnk Net" /></BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader><CardTitle>Tier Breakdown</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b text-muted-foreground"><th className="text-left py-2">Tier</th><th className="text-right py-2">Partners</th><th className="text-right py-2">Platform Fees</th><th className="text-right py-2">Referral Comm.</th><th className="text-right py-2">ProLnk Net</th><th className="text-right py-2">Avg per Partner</th></tr></thead>
                <tbody>
                  {tiers.map((t: any) => (
                    <tr key={t.tier} className="border-b hover:bg-muted/20">
                      <td className="py-2"><Badge>{t.tier}</Badge></td>
                      <td className="py-2 text-right">{t.partnerCount}</td>
                      <td className="py-2 text-right text-blue-600">{fmt(t.platformFees)}</td>
                      <td className="py-2 text-right text-amber-600">{fmt(t.referralCommissions)}</td>
                      <td className="py-2 text-right text-green-600 font-semibold">{fmt(t.prolinkNet)}</td>
                      <td className="py-2 text-right">{fmt(t.avgPaid)}</td>
                    </tr>
                  ))}
                  {tiers.length === 0 && !isLoading && <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No commission data yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
