import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { CheckCircle, Circle, DollarSign, Clock } from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(Number(n ?? 0) / 100);
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-gray-100 text-gray-600",
  scheduled: "bg-blue-100 text-blue-700",
  charged: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
};

export default function MilestoneTracker() {
  const { data: deals } = trpc.homeowner.getMyDeals.useQuery();
  const activeDeals = (deals ?? []).filter((d: any) => d.status === "active" || d.status === "completed");
  const [selectedId, setSelectedId] = useState<number>(0);
  const dealId = selectedId || (activeDeals[0]?.id ?? 0);

  const { data: rawData, isLoading } = trpc.payments.getMilestonesForDeal.useQuery(
    { dealId },
    { enabled: dealId > 0 }
  );

  const milestones: any[] = rawData && !Array.isArray(rawData) ? (rawData as any).milestones ?? [] : [];
  const selectedDeal = activeDeals.find((d: any) => d.id === dealId);
  const totalPaid = milestones.filter((m: any) => m.status === "paid").reduce((s: number, m: any) => s + Number(m.amountCents ?? 0), 0);
  const totalRemaining = milestones.filter((m: any) => m.status !== "paid").reduce((s: number, m: any) => s + Number(m.amountCents ?? 0), 0);

  return (
    <HomeownerLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Milestone Tracker</h1>
          <p className="text-muted-foreground">Track payment milestones for your active jobs</p>
        </div>

        {activeDeals.length > 1 && (
          <Select value={String(dealId)} onValueChange={v => setSelectedId(Number(v))}>
            <SelectTrigger className="w-full max-w-sm">
              <SelectValue placeholder="Select a job…" />
            </SelectTrigger>
            <SelectContent>
              {activeDeals.map((d: any) => (
                <SelectItem key={d.id} value={String(d.id)}>
                  {d.serviceType ?? "Job"} — {(d as any).proName ?? "Pro"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {dealId > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Paid</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{fmt(totalPaid)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-muted-foreground">Remaining</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-600">{fmt(totalRemaining)}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDeal ? `${(selectedDeal as any).serviceType ?? "Job"} — ${(selectedDeal as any).proName ?? "Pro"}` : "Payment Milestones"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading && <div className="py-8 text-center text-muted-foreground">Loading milestones…</div>}
                {!isLoading && milestones.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground">
                    No payment milestones set up for this job yet.
                  </div>
                )}
                <div className="space-y-3">
                  {milestones.map((m: any, i: number) => (
                    <div key={m.id ?? i} className="flex items-center gap-4 border rounded-lg p-4">
                      <div className="flex-shrink-0">
                        {m.status === "paid" ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <Circle className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium capitalize">{m.milestoneType?.replace(/_/g, " ") ?? `Milestone ${i + 1}`}</div>
                        {m.milestoneLabel && <div className="text-sm text-muted-foreground">{m.milestoneLabel}</div>}
                        {m.scheduledAt && <div className="text-xs text-muted-foreground mt-0.5">Due: {new Date(m.scheduledAt).toLocaleDateString()}</div>}
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{fmt(m.amountCents ?? 0)}</div>
                        <Badge className={STATUS_COLORS[m.status] ?? "bg-gray-100 text-gray-600"}>{m.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeDeals.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <DollarSign className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
              <div className="text-muted-foreground">No active jobs with payment milestones.</div>
              <div className="text-sm text-muted-foreground mt-1">Milestones are set up when you hire a pro for a job.</div>
            </CardContent>
          </Card>
        )}
      </div>
    </HomeownerLayout>
  );
}
