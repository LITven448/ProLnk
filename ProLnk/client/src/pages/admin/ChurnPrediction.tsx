import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { AlertTriangle, TrendingDown } from "lucide-react";

const RISK_COLORS: Record<string, string> = { high: "bg-red-100 text-red-700", medium: "bg-amber-100 text-amber-700", low: "bg-green-100 text-green-700" };

export default function ChurnPrediction() {
  const { data, isLoading } = trpc.adminExtras.getChurnRisk.useQuery();
  const partners = data?.partners ?? [];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Churn Prediction</h1>
          <p className="text-muted-foreground">Partners at risk of going inactive based on activity signals</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-red-200"><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><AlertTriangle className="h-4 w-4 text-red-500" /><span className="text-sm text-muted-foreground">High Risk</span></div><div className="text-3xl font-bold text-red-600">{data?.highRisk ?? 0}</div></CardContent></Card>
          <Card className="border-amber-200"><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><TrendingDown className="h-4 w-4 text-amber-500" /><span className="text-sm text-muted-foreground">Medium Risk</span></div><div className="text-3xl font-bold text-amber-600">{data?.mediumRisk ?? 0}</div></CardContent></Card>
        </div>
        <Card>
          <CardHeader><CardTitle>Risk Assessment</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b text-muted-foreground"><th className="text-left py-2">Partner</th><th className="text-left py-2">Tier</th><th className="text-right py-2">Risk</th><th className="text-right py-2">Score</th><th className="text-right py-2">Days Inactive</th><th className="text-right py-2">Jobs</th></tr></thead>
                <tbody>
                  {partners.filter((p: any) => p.riskLevel !== "low").map((p: any) => (
                    <tr key={p.id} className="border-b hover:bg-muted/20">
                      <td className="py-2 font-medium">{p.businessName}</td>
                      <td className="py-2"><Badge>{p.tier}</Badge></td>
                      <td className="py-2 text-right"><Badge className={RISK_COLORS[p.riskLevel]}>{p.riskLevel}</Badge></td>
                      <td className="py-2 text-right font-mono">{p.riskScore}</td>
                      <td className="py-2 text-right">{p.daysSince < 999 ? `${p.daysSince}d` : "Never active"}</td>
                      <td className="py-2 text-right">{p.jobsLogged}</td>
                    </tr>
                  ))}
                  {partners.filter((p: any) => p.riskLevel !== "low").length === 0 && !isLoading && <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No at-risk partners. Great sign!</td></tr>}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
