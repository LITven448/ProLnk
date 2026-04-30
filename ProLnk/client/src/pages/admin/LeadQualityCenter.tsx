import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Target, TrendingUp, DollarSign } from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(n ?? 0));
}

export default function LeadQualityCenter() {
  const { data, isLoading } = trpc.adminExtras.getLeadQualityStats.useQuery();
  const overall = data?.overall;
  const byCategory = data?.byCategory ?? [];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Lead Quality Center</h1>
          <p className="text-muted-foreground">Conversion rates and lead quality by service category</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><Target className="h-4 w-4 text-blue-500" /><span className="text-sm text-muted-foreground">Total Leads</span></div><div className="text-3xl font-bold">{(overall?.total ?? 0).toLocaleString()}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><TrendingUp className="h-4 w-4 text-green-500" /><span className="text-sm text-muted-foreground">Conversion Rate</span></div><div className="text-3xl font-bold text-green-600">{overall?.conversionRate ?? 0}%</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><DollarSign className="h-4 w-4 text-purple-500" /><span className="text-sm text-muted-foreground">Avg Lead Value</span></div><div className="text-3xl font-bold">{fmt(overall?.avgValue ?? 0)}</div></CardContent></Card>
        </div>
        <Card>
          <CardHeader><CardTitle>By Service Category</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b text-muted-foreground"><th className="text-left py-2">Category</th><th className="text-right py-2">Total</th><th className="text-right py-2">Converted</th><th className="text-right py-2">Expired</th><th className="text-right py-2">Conv. Rate</th><th className="text-right py-2">Avg Value</th></tr></thead>
                <tbody>
                  {byCategory.map((c: any) => {
                    const rate = c.totalLeads > 0 ? Math.round((c.converted / c.totalLeads) * 100) : 0;
                    return (
                      <tr key={c.serviceType} className="border-b hover:bg-muted/20">
                        <td className="py-2 font-medium capitalize">{c.serviceType ?? "Unknown"}</td>
                        <td className="py-2 text-right">{c.totalLeads}</td>
                        <td className="py-2 text-right text-green-600">{c.converted}</td>
                        <td className="py-2 text-right text-red-500">{c.expired}</td>
                        <td className="py-2 text-right"><Badge className={rate >= 30 ? "bg-green-100 text-green-700" : rate >= 15 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}>{rate}%</Badge></td>
                        <td className="py-2 text-right">{fmt(c.avgValue ?? 0)}</td>
                      </tr>
                    );
                  })}
                  {byCategory.length === 0 && !isLoading && <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No lead data yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
