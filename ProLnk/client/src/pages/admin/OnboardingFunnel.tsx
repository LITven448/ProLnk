import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function OnboardingFunnel() {
  const { data, isLoading } = trpc.adminExtras.getOnboardingFunnel.useQuery();
  const stages = data?.stages ?? [];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Onboarding Funnel</h1>
          <p className="text-muted-foreground">Partner application to active status conversion funnel</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><Clock className="h-4 w-4 text-amber-500" /><span className="text-sm text-muted-foreground">Pending Review</span></div><div className="text-3xl font-bold text-amber-600">{data?.pending ?? 0}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><CheckCircle className="h-4 w-4 text-green-500" /><span className="text-sm text-muted-foreground">Approved</span></div><div className="text-3xl font-bold text-green-600">{stages.find((s: any) => s.label === "Approved")?.count ?? 0}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><XCircle className="h-4 w-4 text-red-500" /><span className="text-sm text-muted-foreground">Rejected</span></div><div className="text-3xl font-bold text-red-600">{data?.rejected ?? 0}</div></CardContent></Card>
        </div>
        <Card>
          <CardHeader><CardTitle>Funnel Stages</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            <div className="space-y-4">
              {stages.map((stage: any, i: number) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{stage.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{stage.count.toLocaleString()}</span>
                      <Badge className="bg-blue-100 text-blue-700">{stage.pct}%</Badge>
                    </div>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${stage.pct}%` }} />
                  </div>
                </div>
              ))}
              {stages.length === 0 && !isLoading && <div className="py-8 text-center text-muted-foreground">No data yet.</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
