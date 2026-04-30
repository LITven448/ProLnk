import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { CloudLightning, AlertTriangle, Zap } from "lucide-react";

const SEVERITY_COLORS: Record<string, string> = { low: "bg-blue-100 text-blue-700", medium: "bg-amber-100 text-amber-700", high: "bg-orange-100 text-orange-700", extreme: "bg-red-100 text-red-700" };

export default function StormWatch() {
  const { data, isLoading } = trpc.adminExtras.getStormWatchData.useQuery();
  const events = data?.events ?? [];
  const stats = data?.stats;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Storm Watch</h1>
          <p className="text-muted-foreground">Weather events, affected areas, and auto-generated leads</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card className={stats?.activeEvents ? "border-red-300" : ""}><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><AlertTriangle className="h-4 w-4 text-red-500" /><span className="text-sm text-muted-foreground">Active Events</span></div><div className={`text-3xl font-bold ${stats?.activeEvents ? "text-red-600" : ""}`}>{stats?.activeEvents ?? 0}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><CloudLightning className="h-4 w-4 text-blue-500" /><span className="text-sm text-muted-foreground">Total Events</span></div><div className="text-3xl font-bold">{stats?.totalEvents ?? 0}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><Zap className="h-4 w-4 text-amber-500" /><span className="text-sm text-muted-foreground">Leads Generated</span></div><div className="text-3xl font-bold">{stats?.totalLeads ?? 0}</div></CardContent></Card>
        </div>
        <Card>
          <CardHeader><CardTitle>Storm Event Log</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            {!isLoading && events.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                <CloudLightning className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <div>No storm events recorded yet.</div>
                <div className="text-sm mt-1">Events are auto-detected by the Storm Agent when severe weather hits DFW.</div>
              </div>
            )}
            <div className="space-y-3">
              {events.map((e: any) => (
                <div key={e.id} className="border rounded-lg p-4 hover:bg-muted/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold capitalize">{e.eventType?.replace(/_/g, " ")} — {e.affectedCity ?? "DFW Area"}</div>
                      <div className="text-sm text-muted-foreground mt-0.5">{e.detectedAt ? new Date(e.detectedAt).toLocaleString() : ""}{e.affectedZips && ` · Zips: ${e.affectedZips}`}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={SEVERITY_COLORS[e.severity] ?? "bg-gray-100 text-gray-700"}>{e.severity}</Badge>
                      <Badge className={e.status === "active" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}>{e.status}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2 text-sm text-muted-foreground"><span>{e.leadsGenerated ?? 0} leads generated</span><span>{e.opportunityCount ?? 0} opportunities</span></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
