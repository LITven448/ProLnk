import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { MapPin } from "lucide-react";

export default function GeoExpansionMap() {
  const { data, isLoading } = trpc.adminExtras.getGeoExpansionData.useQuery();
  const areas = data ?? [];
  const maxPartners = Math.max(...areas.map((a: any) => Number(a.partnerCount)), 1);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Geo Expansion Map</h1>
          <p className="text-muted-foreground">Partner density and coverage by service area across DFW</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card><CardContent className="pt-6"><div className="text-sm text-muted-foreground mb-1">Coverage Areas</div><div className="text-3xl font-bold">{areas.length}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="text-sm text-muted-foreground mb-1">Total Partners Mapped</div><div className="text-3xl font-bold">{areas.reduce((s: number, a: any) => s + Number(a.partnerCount), 0)}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="text-sm text-muted-foreground mb-1">Total Jobs in Areas</div><div className="text-3xl font-bold">{areas.reduce((s: number, a: any) => s + Number(a.totalJobs), 0)}</div></CardContent></Card>
        </div>
        <Card>
          <CardHeader><CardTitle>Coverage by Area</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            <div className="space-y-3">
              {areas.map((area: any) => {
                const pct = Math.round((Number(area.partnerCount) / maxPartners) * 100);
                const density = Number(area.partnerCount) >= 5 ? "high" : Number(area.partnerCount) >= 2 ? "medium" : "low";
                return (
                  <div key={area.serviceArea}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-muted-foreground" /><span className="text-sm font-medium">{area.serviceArea}</span></div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">{area.partnerCount} partners · {area.totalJobs} jobs</span>
                        <Badge className={density === "high" ? "bg-green-100 text-green-700" : density === "medium" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}>{density}</Badge>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} /></div>
                  </div>
                );
              })}
              {areas.length === 0 && !isLoading && <div className="py-8 text-center text-muted-foreground">No geographic data yet. Partners need to set their service areas.</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
