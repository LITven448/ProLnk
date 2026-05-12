import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CloudLightning, RefreshCw, Zap, MapPin, Users, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";

const SEVERITY_COLOR: Record<string, string> = {
  Extreme: "bg-red-600 text-white",
  Severe: "bg-orange-500 text-white",
  Moderate: "bg-yellow-500 text-black",
  Minor: "bg-blue-500 text-white",
};

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

function formatLastScan(dateVal: string | null | undefined): string {
  if (!dateVal) return "Never";
  const d = new Date(dateVal);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  return d.toLocaleDateString();
}

export default function StormDashboard() {
  const [selectedState, setSelectedState] = useState("TX");
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [lastRunResult, setLastRunResult] = useState<{ eventsProcessed: number; leadsGenerated: number; propertiesAffected: number; affectedZips?: string[] } | null>(null);

  const { data: stats, refetch: refetchStats } = trpc.stormAgent.getStats.useQuery();
  const { data: events, refetch: refetchEvents, isLoading: eventsLoading } = trpc.stormAgent.listEvents.useQuery();
  const { data: preview, refetch: refetchPreview } = trpc.stormAgent.previewAlerts.useQuery({ state: selectedState });
  const { data: leads } = trpc.stormAgent.getEventLeads.useQuery(
    { stormEventId: selectedEventId! },
    { enabled: !!selectedEventId }
  );

  const triggerScan = trpc.stormAgent.triggerScan.useMutation({
    onSuccess: (result) => {
      setLastRunResult(result as any);
      toast.success(`Storm Scan Complete — ${result.eventsProcessed} events, ${result.leadsGenerated} leads, ${result.propertiesAffected} properties`);
      refetchStats();
      refetchEvents();
    },
    onError: () => toast.error("Scan failed"),
  });

  const affectedZipCount = lastRunResult
    ? (lastRunResult.affectedZips?.length ?? 0)
    : (events ?? []).reduce((acc: number, e: any) => {
        const zones = (() => { try { return JSON.parse(e.affectedZones ?? "[]"); } catch { return []; } })();
        return acc + zones.length;
      }, 0);

  return (
    <AdminLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-lg">
            <CloudLightning className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Storm Tracking Agent</h1>
            <p className="text-sm text-muted-foreground">NOAA weather alerts → emergency lead generation</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button
            onClick={() => triggerScan.mutate({ state: selectedState })}
            disabled={triggerScan.isPending}
            className="bg-orange-500 hover:bg-orange-600 text-white gap-2"
          >
            {triggerScan.isPending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            {triggerScan.isPending ? "Scanning..." : "Run Storm Scan Now"}
          </Button>
        </div>
      </div>

      {/* Last scan result banner */}
      {lastRunResult && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-800 font-medium">
            Scan complete — {lastRunResult.eventsProcessed} events processed · {lastRunResult.leadsGenerated} leads generated · {lastRunResult.propertiesAffected} properties affected
            {lastRunResult.affectedZips?.length ? ` · ${lastRunResult.affectedZips.length} zip codes` : ""}
          </p>
          <button className="ml-auto text-green-600 hover:text-green-800 text-xs" onClick={() => setLastRunResult(null)}>Dismiss</button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Events", value: stats?.totalEvents ?? 0, icon: CloudLightning, color: "text-orange-500" },
          { label: "Leads Generated", value: stats?.totalLeads ?? 0, icon: Zap, color: "text-yellow-500" },
          { label: "Properties Affected", value: stats?.totalProperties ?? 0, icon: MapPin, color: "text-blue-500" },
          { label: "Last Scan", value: formatLastScan(stats?.lastScanAt), icon: Clock, color: "text-green-500" },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <s.icon className={`w-8 h-8 ${s.color}`} />
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Affected Zip Codes summary */}
      {affectedZipCount > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 rounded-lg px-4 py-2">
          <MapPin className="w-4 h-4 text-orange-400" />
          <span><strong className="text-foreground">{affectedZipCount}</strong> zip codes currently in storm-affected areas across all tracked events</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Live NOAA Preview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              Live NOAA Alerts — {selectedState}
              <Button variant="ghost" size="sm" onClick={() => refetchPreview()} className="ml-auto h-7 px-2">
                <RefreshCw className="w-3 h-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-80 overflow-y-auto">
            {!preview || preview.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No active severe weather alerts for {selectedState}</p>
            ) : preview.map((alert: any) => (
              <div key={alert.id} className="p-3 rounded-lg border bg-card space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{alert.eventType}</span>
                  <Badge className={`text-xs ${SEVERITY_COLOR[alert.severity] ?? "bg-gray-500 text-white"}`}>
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{alert.headline}</p>
                {alert.areas[0] && <p className="text-xs text-blue-400">{alert.areas[0]}</p>}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Processed Events */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CloudLightning className="w-4 h-4 text-orange-500" />
              Processed Storm Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-80 overflow-y-auto">
            {eventsLoading ? (
              <p className="text-sm text-muted-foreground text-center py-8">Loading...</p>
            ) : !events || events.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No storm events processed yet. Run a scan to start.</p>
            ) : events.map((evt: any) => (
              <div
                key={evt.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedEventId === evt.id ? "border-orange-500 bg-orange-500/5" : "bg-card hover:bg-accent"}`}
                onClick={() => setSelectedEventId(evt.id === selectedEventId ? null : evt.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{evt.eventType}</span>
                  <Badge variant="outline" className="text-xs">{evt.status}</Badge>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Zap className="w-3 h-3" />{evt.leadsGenerated} leads
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{evt.propertiesAffected} properties
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {new Date(evt.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Storm Leads for selected event */}
      {selectedEventId && leads && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              Storm Leads — Event #{selectedEventId}
              <Badge variant="outline" className="ml-2">{leads.length} leads</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground text-xs">
                    <th className="text-left pb-2 pr-4">Address</th>
                    <th className="text-left pb-2 pr-4">Trade</th>
                    <th className="text-left pb-2 pr-4">Priority</th>
                    <th className="text-left pb-2 pr-4">Status</th>
                    <th className="text-left pb-2">Dispatched To</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.slice(0, 50).map((lead: any) => (
                    <tr key={lead.id} className="border-b border-border/50 hover:bg-accent/50">
                      <td className="py-2 pr-4 font-medium">{lead.address}, {lead.city}</td>
                      <td className="py-2 pr-4 capitalize">{(lead.tradeCategory ?? "").replace(/_/g, " ")}</td>
                      <td className="py-2 pr-4">
                        <Badge className={lead.priority === "high" ? "bg-red-500 text-white" : lead.priority === "critical" ? "bg-red-700 text-white" : "bg-gray-200 text-gray-700"}>
                          {lead.priority}
                        </Badge>
                      </td>
                      <td className="py-2 pr-4">
                        <Badge variant="outline">{lead.status}</Badge>
                      </td>
                      <td className="py-2 text-muted-foreground">{lead.partnerName ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {leads.length > 50 && (
                <p className="text-xs text-muted-foreground mt-2">Showing 50 of {leads.length} leads</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
    </AdminLayout>
  );
}
