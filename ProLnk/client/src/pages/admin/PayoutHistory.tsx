import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { DollarSign } from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(Number(n ?? 0));
}

const TYPE_COLORS: Record<string, string> = {
  platform_fee: "bg-blue-100 text-blue-700",
  referral_commission: "bg-amber-100 text-amber-700",
  prolink_net: "bg-green-100 text-green-700",
};

export default function PayoutHistory() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = trpc.adminExtras.getPayoutHistory.useQuery({ page, limit: 50 });
  const payouts = data?.payouts ?? [];
  const total = data?.total ?? 0;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Payout History</h1>
          <p className="text-muted-foreground">All paid commissions — {total.toLocaleString()} total records</p>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-3">Partner</th>
                    <th className="text-left px-4 py-3">Type</th>
                    <th className="text-left px-4 py-3">Service</th>
                    <th className="text-right px-4 py-3">Amount</th>
                    <th className="text-right px-4 py-3">Job Value</th>
                    <th className="text-right px-4 py-3">Paid At</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">Loading…</td></tr>}
                  {!isLoading && payouts.length === 0 && <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No payouts yet.</td></tr>}
                  {payouts.map((p: any) => (
                    <tr key={p.id} className="border-b hover:bg-muted/20">
                      <td className="px-4 py-3">
                        <div className="font-medium">{p.partnerName ?? "—"}</div>
                        {p.partnerTier && <Badge className="text-xs mt-0.5">{p.partnerTier}</Badge>}
                      </td>
                      <td className="px-4 py-3"><Badge className={TYPE_COLORS[p.commissionType] ?? "bg-gray-100 text-gray-700"}>{p.commissionType?.replace(/_/g, " ")}</Badge></td>
                      <td className="px-4 py-3 text-muted-foreground">{p.serviceType ?? "—"}</td>
                      <td className="px-4 py-3 text-right font-semibold text-green-600">{fmt(p.amount)}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{p.jobValue ? fmt(p.jobValue) : "—"}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{p.paidAt ? new Date(p.paidAt).toLocaleDateString() : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Page {page} of {Math.ceil(total / 50) || 1}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
            <Button variant="outline" size="sm" disabled={page * 50 >= total} onClick={() => setPage(p => p + 1)}>Next</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
