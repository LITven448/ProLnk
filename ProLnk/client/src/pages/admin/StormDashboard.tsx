import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  CloudLightning, RefreshCw, Zap, MapPin, Users, AlertTriangle,
  Clock, CheckCircle, Wind, Droplets, Thermometer, Bell, BarChart3,
  TrendingUp, Activity, Radio, Settings, ArrowUpRight, Eye,
} from "lucide-react";

const TOMORROW_API_KEY = import.meta.env.VITE_TOMORROW_IO_API_KEY as string | undefined;

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

const DFW_ZONES = [
  { name: "Dallas Core", lat: 32.7767, lon: -96.797, zip: "75201″ },
  { name: "Fort Worth", lat: 32.7555, lon: -97.3308, zip: "76101″ },
  { name: "Plano / Collin Co.", lat: 33.0198, lon: -96.6989, zip: "75023″ },
  { name: "Arlington", lat: 32.7357, lon: -97.1081, zip: "76010″ },
  { name: "Denton Co.", lat: 33.2148, lon: -97.1331, zip: "76201″ },
];

interface ZoneWeather {
  zone: typeof DFW_ZONES[number];
  windSpeed: number;
  temp: number;
  precipProb: number;
  precipIntensity: number;
  weatherCode: number;
  loading: boolean;
  threatLevel: "Clear" | "Watch" | "Warning" | "Extreme";
}

const MOCK_ZONE_DATA: Omit<ZoneWeather, "zone" | "loading">[] = [
  { windSpeed: 52, temp: 78, precipProb: 90, precipIntensity: 4.2, weatherCode: 8000, threatLevel: "Extreme" },
  { windSpeed: 44, temp: 76, precipProb: 80, precipIntensity: 2.8, weatherCode: 8000, threatLevel: "Warning" },
  { windSpeed: 38, temp: 74, precipProb: 65, precipIntensity: 1.5, weatherCode: 4201, threatLevel: "Warning" },
  { windSpeed: 28, temp: 75, precipProb: 45, precipIntensity: 0.8, weatherCode: 4001, threatLevel: "Watch" },
  { windSpeed: 18, temp: 72, precipProb: 25, precipIntensity: 0.1, weatherCode: 1001, threatLevel: "Clear" },
];

const THREAT_STYLE: Record<string, { border: string; bg: string; badge: string; dot: string }> = {
  Extreme: { border: "border-red-500/60″, bg: "bg-red-500/10", badge: "bg-red-600 text-white", dot: "bg-red-500" },
  Warning: { border: "border-amber-500/40″, bg: "bg-amber-500/8", badge: "bg-amber-500 text-black", dot: "bg-amber-500" },
  Watch: { border: "border-yellow-400/30″, bg: "bg-yellow-500/5", badge: "bg-yellow-400 text-black", dot: "bg-yellow-400" },
  Clear: { border: "border-white/10″, bg: "bg-white/3", badge: "bg-teal-600 text-white", dot: "bg-teal-400" },
};

const NOTIFICATION_RULES = [
  { id: 1, condition: "Wind > 50mph", action: "Push notify all Roofing pros within 25mi", enabled: true, trades: ["Roofing"] },
  { id: 2, condition: "Hail confirmed", action: "Push notify Roofing + Windows pros", enabled: true, trades: ["Roofing", "Windows"] },
  { id: 3, condition: "Flash Flood watch issued", action: "Push notify Plumbing + Water Damage pros", enabled: true, trades: ["Plumbing", "Water Damage"] },
  { id: 4, condition: "Temp drops >30°F in 2hrs", action: "Push notify HVAC pros within 40mi", enabled: false, trades: ["HVAC"] },
  { id: 5, condition: "Thunderstorm + wind >40mph", action: "Push notify Tree Removal pros within 20mi", enabled: true, trades: ["Tree Removal"] },
];

const RESPONSE_ANALYTICS = [
  { storm: "May 8 Supercell", date: "May 8″, leadsGen: 412, accepted: 387, passed: 25, avgResponseMin: 4.2, revenue: "$1.4M" },
  { storm: "Apr 23 Hail Event", date: "Apr 23″, leadsGen: 287, accepted: 261, passed: 26, avgResponseMin: 6.8, revenue: "$980K" },
  { storm: "Apr 11 Flash Flood", date: "Apr 11″, leadsGen: 156, accepted: 139, passed: 17, avgResponseMin: 8.1, revenue: "$520K" },
  { storm: "Mar 29 Tornado Watch", date: "Mar 29″, leadsGen: 203, accepted: 190, passed: 13, avgResponseMin: 3.7, revenue: "$712K" },
  { storm: "Mar 14 Ice Storm", date: "Mar 14″, leadsGen: 318, accepted: 295, passed: 23, avgResponseMin: 5.4, revenue: "$1.1M" },
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

function getThreatLevel(windSpeed: number, precipIntensity: number, weatherCode: number): ZoneWeather["threatLevel"] {
  if (windSpeed > 50 || precipIntensity > 3.5 || weatherCode === 8000 && windSpeed > 40) return "Extreme";
  if (windSpeed > 35 || precipIntensity > 2) return "Warning";
  if (windSpeed > 20 || precipIntensity > 0.5) return "Watch";
  return "Clear";
}

function useZoneWeather(): ZoneWeather[] {
  const [zones, setZones] = useState<ZoneWeather[]>(
    DFW_ZONES.map((zone, i) => ({ zone, ...MOCK_ZONE_DATA[i], loading: false }))
  );

  useEffect(() => {
    if (!TOMORROW_API_KEY) return;
    DFW_ZONES.forEach((zone, i) => {
      const url = `https://api.tomorrow.io/v4/timelines?location=${zone.lat},${zone.lon}&fields=temperature,precipitationProbability,windSpeed,weatherCode,precipitationIntensity&timesteps=current&units=imperial&apikey=${TOMORROW_API_KEY}`;
      fetch(url)
        .then(r => r.json())
        .then(json => {
          const vals = json?.data?.timelines?.[0]?.intervals?.[0]?.values;
          if (!vals) return;
          const wind = vals.windSpeed ?? 0;
          const precip = vals.precipitationIntensity ?? 0;
          const code = vals.weatherCode ?? 1000;
          setZones(prev => {
            const next = [...prev];
            next[i] = {
              zone,
              windSpeed: Math.round(wind),
              temp: Math.round(vals.temperature ?? 0),
              precipProb: vals.precipitationProbability ?? 0,
              precipIntensity: precip,
              weatherCode: code,
              threatLevel: getThreatLevel(wind, precip, code),
              loading: false,
            };
            return next;
          });
        })
        .catch(() => {});
    });
  }, []);

  return zones;
}

function ZoneTile({ zone }: { zone: ZoneWeather }) {
  const style = THREAT_STYLE[zone.threatLevel];
  return (
    <div className={`rounded-xl border p-4 transition-all ${style.border} ${style.bg}`}>
      <div className="flex items-start justify-between mb-3″>
        <div>
          <p className="text-sm font-bold text-white">{zone.zone.name}</p>
          <p className="text-[10px] text-gray-500″>ZIP {zone.zone.zip}</p>
        </div>
        <div className="flex items-center gap-1.5″>
          <div className={`w-2 h-2 rounded-full animate-pulse ${style.dot}`} />
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${style.badge}`}>{zone.threatLevel}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2″>
        <div className="text-center">
          <div className="flex items-center justify-center gap-0.5 mb-0.5″>
            <Thermometer className="w-3 h-3 text-amber-400″ />
          </div>
          <p className="text-sm font-bold text-white">{zone.temp}°F</p>
          <p className="text-[9px] text-gray-500″>Temp</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-0.5 mb-0.5″>
            <Wind className={`w-3 h-3 ${zone.windSpeed > 40 ? "text-red-400" : "text-blue-400"}`} />
          </div>
          <p className={`text-sm font-bold ${zone.windSpeed > 40 ? "text-red-400" : "text-white"}`}>{zone.windSpeed}mph</p>
          <p className="text-[9px] text-gray-500″>Wind</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-0.5 mb-0.5″>
            <Droplets className="w-3 h-3 text-blue-400″ />
          </div>
          <p className="text-sm font-bold text-white">{zone.precipProb}%</p>
          <p className="text-[9px] text-gray-500″>Precip</p>
        </div>
      </div>
    </div>
  );
}

export default function StormDashboard() {
  const [selectedState, setSelectedState] = useState("TX");
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [lastRunResult, setLastRunResult] = useState<{ eventsProcessed: number; leadsGenerated: number; propertiesAffected: number; affectedZips?: string[] } | null>(null);
  const [notifRules, setNotifRules] = useState(NOTIFICATION_RULES);
  const [activeTab, setActiveTab] = useState<"overview" | "alerts" | "notifications" | "analytics">("overview");

  const zones = useZoneWeather();

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

  const extremeZones = zones.filter(z => z.threatLevel === "Extreme").length;
  const warningZones = zones.filter(z => z.threatLevel === "Warning").length;

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: Activity },
    { id: "alerts" as const, label: "Live Alerts", icon: AlertTriangle },
    { id: "notifications" as const, label: "Notification Rules", icon: Bell },
    { id: "analytics" as const, label: "Response Analytics", icon: BarChart3 },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6″>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3″>
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <CloudLightning className="w-6 h-6 text-orange-500″ />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Storm Tracking Dashboard</h1>
              <p className="text-sm text-muted-foreground">NOAA + Tomorrow.io → real-time lead generation engine</p>
            </div>
          </div>
          <div className="flex items-center gap-3″>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-24″>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {US_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button
              onClick={() => triggerScan.mutate({ state: selectedState })}
              disabled={triggerScan.isPending}
              className="bg-orange-500 hover:bg-orange-600 text-white gap-2″
            >
              {triggerScan.isPending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4″ />}
              {triggerScan.isPending ? "Scanning..." : "Run Storm Scan"}
            </Button>
          </div>
        </div>

        {/* Scan result banner */}
        {lastRunResult && (
          <div className="flex items-center gap-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3″>
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0″ />
            <p className="text-sm text-green-800 dark:text-green-300 font-medium">
              Scan complete — {lastRunResult.eventsProcessed} events · {lastRunResult.leadsGenerated} leads · {lastRunResult.propertiesAffected} properties
              {lastRunResult.affectedZips?.length ? ` · ${lastRunResult.affectedZips.length} zip codes` : ""}
            </p>
            <button className="ml-auto text-green-600 text-xs hover:underline" onClick={() => setLastRunResult(null)}>Dismiss</button>
          </div>
        )}

        {/* KPI strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4″>
          {[
            { label: "Total Events", value: stats?.totalEvents ?? 0, icon: CloudLightning, color: "text-orange-500″, sub: "all time" },
            { label: "Leads Generated", value: stats?.totalLeads ?? 0, icon: Zap, color: "text-yellow-500″, sub: "from storms" },
            { label: "Affected Properties", value: stats?.totalProperties ?? 0, icon: MapPin, color: "text-blue-500″, sub: "properties flagged" },
            { label: "Last Scan", value: formatLastScan(stats?.lastScanAt), icon: Clock, color: "text-green-500″, sub: "auto-runs every 15m" },
          ].map(s => (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-3″>
                <s.icon className={`w-8 h-8 ${s.color} flex-shrink-0`} />
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-[10px] text-muted-foreground/60″>{s.sub}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Zone threat summary */}
        {(extremeZones > 0 || warningZones > 0) && (
          <div className={`flex items-center gap-3 rounded-lg px-4 py-3 border ${extremeZones > 0 ? "bg-red-500/10 border-red-500/30" : "bg-amber-500/10 border-amber-500/30"}`}>
            <Radio className={`w-4 h-4 flex-shrink-0 ${extremeZones > 0 ? "text-red-400 animate-pulse" : "text-amber-400"}`} />
            <p className="text-sm font-medium">
              {extremeZones > 0 && <span className="text-red-400 font-bold">{extremeZones} zone{extremeZones > 1 ? "s" : ""} at Extreme threat. </span>}
              {warningZones > 0 && <span className="text-amber-400″>{warningZones} zone{warningZones > 1 ? "s" : ""} under Warning. </span>}
              <span className="text-muted-foreground">Storm lead queue is active.</span>
            </p>
          </div>
        )}

        {affectedZipCount > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 rounded-lg px-4 py-2″>
            <MapPin className="w-4 h-4 text-orange-400″ />
            <span><strong className="text-foreground">{affectedZipCount}</strong> ZIP codes in storm-affected areas</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab.id
                  ? "border-orange-500 text-orange-500″
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4″ />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === "overview" && (
          <div className="space-y-6″>
            {/* 5-Zone Weather Tiles */}
            <div>
              <div className="flex items-center justify-between mb-3″>
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2″>
                  <Eye className="w-4 h-4 text-blue-400″ />
                  Live DFW Zone Conditions
                  {TOMORROW_API_KEY ? <span className="text-xs text-teal-400 font-normal">· Tomorrow.io live</span> : <span className="text-xs text-gray-500 font-normal">· Demo data</span>}
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3″>
                {zones.map((zone, i) => <ZoneTile key={i} zone={zone} />)}
              </div>
            </div>

            {/* Events grid */}
            <div className="grid grid-cols-2 gap-6″>
              <Card>
                <CardHeader className="pb-3″>
                  <CardTitle className="text-base flex items-center gap-2″>
                    <AlertTriangle className="w-4 h-4 text-orange-500″ />
                    Live NOAA — {selectedState}
                    <Button variant="ghost" size="sm" onClick={() => refetchPreview()} className="ml-auto h-7 px-2″>
                      <RefreshCw className="w-3 h-3″ />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 max-h-72 overflow-y-auto">
                  {!preview || preview.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8″>No active alerts for {selectedState}</p>
                  ) : preview.map((alert: any) => (
                    <div key={alert.id} className="p-3 rounded-lg border bg-card space-y-1″>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{alert.eventType}</span>
                        <Badge className={`text-xs ${SEVERITY_COLOR[alert.severity] ?? "bg-gray-500 text-white"}`}>{alert.severity}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2″>{alert.headline}</p>
                      {alert.areas[0] && <p className="text-xs text-blue-400″>{alert.areas[0]}</p>}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3″>
                  <CardTitle className="text-base flex items-center gap-2″>
                    <CloudLightning className="w-4 h-4 text-orange-500″ />
                    Processed Storm Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 max-h-72 overflow-y-auto">
                  {eventsLoading ? (
                    <p className="text-sm text-muted-foreground text-center py-8″>Loading...</p>
                  ) : !events || events.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8″>No events yet. Run a scan to start.</p>
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
                      <div className="flex items-center gap-3 mt-1″>
                        <span className="text-xs text-muted-foreground flex items-center gap-1″>
                          <Zap className="w-3 h-3″ />{evt.leadsGenerated} leads
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1″>
                          <MapPin className="w-3 h-3″ />{evt.propertiesAffected} properties
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
          </div>
        )}

        {/* Alerts tab */}
        {activeTab === "alerts" && (
          <div className="space-y-4″>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3″>
              {zones.map((zone, i) => <ZoneTile key={i} zone={zone} />)}
            </div>
            <Card>
              <CardHeader className="pb-3″>
                <CardTitle className="text-base flex items-center gap-2″>
                  <AlertTriangle className="w-4 h-4 text-orange-500″ />
                  Active Storm Alerts
                  <Button variant="ghost" size="sm" onClick={() => refetchPreview()} className="ml-auto h-7 px-2″>
                    <RefreshCw className="w-3 h-3″ />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2″>
                {!preview || preview.length === 0 ? (
                  <div className="py-12 text-center">
                    <CloudLightning className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3″ />
                    <p className="text-sm text-muted-foreground">No active severe weather alerts for {selectedState}</p>
                  </div>
                ) : preview.map((alert: any) => (
                  <div key={alert.id} className={`p-4 rounded-xl border ${SEVERITY_COLOR[alert.severity] ? "border-orange-500/30 bg-orange-500/5" : "border-border"}`}>
                    <div className="flex items-center justify-between mb-2″>
                      <span className="font-semibold">{alert.eventType}</span>
                      <Badge className={`text-xs ${SEVERITY_COLOR[alert.severity] ?? "bg-gray-500 text-white"}`}>{alert.severity}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.headline}</p>
                    {alert.areas?.[0] && <p className="text-xs text-blue-400 mt-1″>{alert.areas[0]}</p>}
                    <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                      <span>Onset: {alert.onset ? new Date(alert.onset).toLocaleString() : "Active"}</span>
                      <span>Expires: {alert.expires ? new Date(alert.expires).toLocaleString() : "TBD"}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Notification Rules tab */}
        {activeTab === "notifications" && (
          <div className="space-y-4″>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Automatic Notification Rules</h2>
                <p className="text-sm text-muted-foreground">When conditions are met, these rules fire push notifications to pros automatically</p>
              </div>
              <Badge variant="outline">{notifRules.filter(r => r.enabled).length} of {notifRules.length} active</Badge>
            </div>
            <div className="space-y-3″>
              {notifRules.map(rule => (
                <Card key={rule.id} className={rule.enabled ? "border-orange-500/20″ : ""}>
                  <CardContent className="p-4″>
                    <div className="flex items-start justify-between gap-4″>
                      <div className="flex-1″>
                        <div className="flex items-center gap-2 mb-1″>
                          <Bell className={`w-4 h-4 ${rule.enabled ? "text-orange-400" : "text-muted-foreground"}`} />
                          <span className="font-semibold text-sm">{rule.condition}</span>
                          {rule.enabled && <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
                        </div>
                        <p className="text-sm text-muted-foreground ml-6″>→ {rule.action}</p>
                        <div className="flex gap-1.5 mt-2 ml-6″>
                          {rule.trades.map(t => (
                            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20″>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0″>
                        <span className={`text-xs font-medium ${rule.enabled ? "text-green-400" : "text-muted-foreground"}`}>
                          {rule.enabled ? "Enabled" : "Disabled"}
                        </span>
                        <button
                          onClick={() => setNotifRules(prev => prev.map(r => r.id === rule.id ? { ...r, enabled: !r.enabled } : r))}
                          className={`w-10 h-6 rounded-full transition-colors relative ${rule.enabled ? "bg-orange-500" : "bg-muted"}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${rule.enabled ? "right-1" : "left-1"}`} />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="p-4 rounded-xl border border-dashed border-border text-center">
              <Settings className="w-5 h-5 text-muted-foreground mx-auto mb-2″ />
              <p className="text-sm text-muted-foreground">Add custom notification rule</p>
              <Button variant="outline" size="sm" className="mt-2″ onClick={() => toast.info("Custom rule builder — coming soon")}>
                + Add Rule
              </Button>
            </div>
          </div>
        )}

        {/* Response Analytics tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6″>
            <div className="grid grid-cols-3 gap-4″>
              {[
                {
                  label: "Avg Response Time",
                  value: `${(RESPONSE_ANALYTICS.reduce((a, s) => a + s.avgResponseMin, 0) / RESPONSE_ANALYTICS.length).toFixed(1)}m`,
                  icon: Clock,
                  color: "text-green-400″,
                  sub: "median across last 5 storms",
                },
                {
                  label: "Acceptance Rate",
                  value: `${Math.round((RESPONSE_ANALYTICS.reduce((a, s) => a + s.accepted, 0) / RESPONSE_ANALYTICS.reduce((a, s) => a + s.leadsGen, 0)) * 100)}%`,
                  icon: TrendingUp,
                  color: "text-teal-400″,
                  sub: "leads accepted vs passed",
                },
                {
                  label: "Total Storm Revenue",
                  value: "$4.7M",
                  icon: ArrowUpRight,
                  color: "text-amber-400″,
                  sub: "estimated from last 5 events",
                },
              ].map(s => (
                <Card key={s.label}>
                  <CardContent className="p-4″>
                    <div className="flex items-center gap-2 mb-1″>
                      <s.icon className={`w-4 h-4 ${s.color}`} />
                      <span className="text-xs text-muted-foreground">{s.label}</span>
                    </div>
                    <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5″>{s.sub}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader className="pb-3″>
                <CardTitle className="text-base flex items-center gap-2″>
                  <BarChart3 className="w-4 h-4 text-orange-400″ />
                  Storm Response Performance — Last 5 Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-xs text-muted-foreground">
                        <th className="text-left pb-3 pr-4″>Storm Event</th>
                        <th className="text-right pb-3 pr-4″>Leads Gen.</th>
                        <th className="text-right pb-3 pr-4″>Accepted</th>
                        <th className="text-right pb-3 pr-4″>Passed</th>
                        <th className="text-right pb-3 pr-4″>Acceptance</th>
                        <th className="text-right pb-3 pr-4″>Avg Response</th>
                        <th className="text-right pb-3″>Est. Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RESPONSE_ANALYTICS.map((row, i) => {
                        const rate = Math.round((row.accepted / row.leadsGen) * 100);
                        return (
                          <tr key={i} className="border-b border-border/50 hover:bg-accent/50″>
                            <td className="py-3 pr-4″>
                              <p className="font-semibold">{row.storm}</p>
                              <p className="text-xs text-muted-foreground">{row.date}, 2026</p>
                            </td>
                            <td className="py-3 pr-4 text-right font-bold">{row.leadsGen.toLocaleString()}</td>
                            <td className="py-3 pr-4 text-right text-green-500 font-medium">{row.accepted.toLocaleString()}</td>
                            <td className="py-3 pr-4 text-right text-muted-foreground">{row.passed}</td>
                            <td className="py-3 pr-4 text-right">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${rate > 90 ? "bg-green-500/15 text-green-400" : rate > 80 ? "bg-teal-500/15 text-teal-400" : "bg-yellow-500/15 text-yellow-400"}`}>
                                {rate}%
                              </span>
                            </td>
                            <td className="py-3 pr-4 text-right">
                              <span className={`font-medium ${row.avgResponseMin < 5 ? "text-green-400" : row.avgResponseMin < 8 ? "text-amber-400" : "text-red-400"}`}>
                                {row.avgResponseMin}m
                              </span>
                            </td>
                            <td className="py-3 text-right font-bold text-amber-400″>{row.revenue}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mini bar chart */}
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">Leads Generated per Storm</p>
                  <div className="space-y-2″>
                    {RESPONSE_ANALYTICS.map((row, i) => {
                      const maxLeads = Math.max(...RESPONSE_ANALYTICS.map(r => r.leadsGen));
                      const pct = (row.leadsGen / maxLeads) * 100;
                      return (
                        <div key={i} className="flex items-center gap-3″>
                          <span className="text-xs text-muted-foreground w-32 truncate">{row.storm.split("—")[0].trim()}</span>
                          <div className="flex-1 bg-muted/40 rounded-full h-2″>
                            <div
                              className="bg-gradient-to-r from-orange-500 to-amber-400 h-2 rounded-full transition-all duration-700″
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold w-10 text-right">{row.leadsGen}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Storm Leads panel (when event selected) */}
        {selectedEventId && leads && activeTab === "overview" && (
          <Card>
            <CardHeader className="pb-3″>
              <CardTitle className="text-base flex items-center gap-2″>
                <Users className="w-4 h-4 text-blue-500″ />
                Storm Leads — Event #{selectedEventId}
                <Badge variant="outline" className="ml-2″>{leads.length} leads</Badge>
                <button className="ml-auto text-xs text-muted-foreground hover:text-foreground" onClick={() => setSelectedEventId(null)}>Close</button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-muted-foreground text-xs">
                      <th className="text-left pb-2 pr-4″>Address</th>
                      <th className="text-left pb-2 pr-4″>Trade</th>
                      <th className="text-left pb-2 pr-4″>Priority</th>
                      <th className="text-left pb-2 pr-4″>Status</th>
                      <th className="text-left pb-2″>Dispatched To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.slice(0, 50).map((lead: any) => (
                      <tr key={lead.id} className="border-b border-border/50 hover:bg-accent/50″>
                        <td className="py-2 pr-4 font-medium">{lead.address}, {lead.city}</td>
                        <td className="py-2 pr-4 capitalize">{(lead.tradeCategory ?? "").replace(/_/g, " ")}</td>
                        <td className="py-2 pr-4″>
                          <Badge className={lead.priority === "critical" ? "bg-red-700 text-white" : lead.priority === "high" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700″}>
                            {lead.priority}
                          </Badge>
                        </td>
                        <td className="py-2 pr-4″><Badge variant="outline">{lead.status}</Badge></td>
                        <td className="py-2 text-muted-foreground">{lead.partnerName ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {leads.length > 50 && <p className="text-xs text-muted-foreground mt-2″>Showing 50 of {leads.length} leads</p>}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
