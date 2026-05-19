import React from 'react';
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  CloudLightning, AlertTriangle, Zap, MapPin, Wind, Droplets,
  Play, ToggleLeft, ToggleRight, Home, Wrench, TreePine, Waves,
  BarChart3, ArrowUpRight, Radio, Clock, CheckCircle, RefreshCw,
  Thermometer, Activity,
} from "lucide-react";

const SEVERITY_COLORS: Record<string, { badge: string; border: string; bg: string }> = {
  extreme: { badge: "bg-red-600 text-white", border: "border-red-500/50″, bg: "bg-red-500/8" },
  high: { badge: "bg-orange-500 text-white", border: "border-orange-500/40″, bg: "bg-orange-500/8" },
  medium: { badge: "bg-amber-500 text-black", border: "border-amber-400/30″, bg: "bg-amber-500/6" },
  low: { badge: "bg-blue-600 text-white", border: "border-blue-500/20″, bg: "bg-blue-500/5" },
};

const GRID_ZONES = [
  { id: "n-dallas", label: "N Dallas", zip: "75252″, threat: "extreme", temp: 79, wind: 58, precip: 92, type: "Thunderstorm" },
  { id: "downtown", label: "Downtown", zip: "75201″, threat: "extreme", temp: 78, wind: 52, precip: 88, type: "Thunderstorm" },
  { id: "ne-dallas", label: "NE Dallas", zip: "75243″, threat: "high", temp: 77, wind: 44, precip: 75, type: "Heavy Rain" },
  { id: "plano", label: "Plano", zip: "75023″, threat: "high", temp: 76, wind: 41, precip: 70, type: "Heavy Rain" },
  { id: "frisco", label: "Frisco", zip: "75034″, threat: "medium", temp: 75, wind: 32, precip: 55, type: "Rain" },
  { id: "ft-worth", label: "Fort Worth", zip: "76101″, threat: "high", temp: 77, wind: 46, precip: 80, type: "Thunderstorm" },
  { id: "arlington", label: "Arlington", zip: "76010″, threat: "medium", temp: 76, wind: 30, precip: 48, type: "Rain" },
  { id: "irving", label: "Irving", zip: "75038″, threat: "medium", temp: 75, wind: 28, precip: 42, type: "Drizzle" },
  { id: "garland", label: "Garland", zip: "75040″, threat: "high", temp: 77, wind: 43, precip: 72, type: "Heavy Rain" },
  { id: "denton", label: "Denton", zip: "76201″, threat: "low", temp: 73, wind: 18, precip: 22, type: "Partly Cloudy" },
  { id: "mckinney", label: "McKinney", zip: "75069″, threat: "medium", temp: 74, wind: 25, precip: 38, type: "Cloudy" },
  { id: "mansfield", label: "Mansfield", zip: "76063″, threat: "low", temp: 74, wind: 16, precip: 18, type: "Clear" },
];

const THREAT_GRID: Record<string, string> = {
  extreme: "bg-red-600/20 border-red-500/60 hover:border-red-400″,
  high: "bg-orange-600/12 border-orange-500/40 hover:border-orange-400″,
  medium: "bg-amber-500/10 border-amber-400/30 hover:border-amber-300″,
  low: "bg-teal-500/8 border-teal-500/20 hover:border-teal-400″,
};

const THREAT_DOT: Record<string, string> = {
  extreme: "bg-red-500″,
  high: "bg-orange-500″,
  medium: "bg-amber-400″,
  low: "bg-teal-400″,
};

const ACTIVE_CELLS = [
  {
    id: 1,
    name: "DFW Supercell Alpha",
    type: "Severe Thunderstorm",
    severity: "extreme" as const,
    zips: ["75201″, "75252", "75243", "75040"],
    trades: ["Roofing", "Water Damage", "HVAC"],
    wind: 58,
    hail: "1.5 in",
    movement: "NE at 28mph",
    eta: "Impact now — 3hrs",
  },
  {
    id: 2,
    name: "Tarrant County Line Storm",
    type: "Wind + Heavy Rain",
    severity: "high" as const,
    zips: ["76101″, "76010", "76063"],
    trades: ["Roofing", "Tree Removal", "HVAC"],
    wind: 46,
    hail: "None",
    movement: "E at 22mph",
    eta: "Peak in 1.5hrs",
  },
  {
    id: 3,
    name: "Collin County Rain Band",
    type: "Flash Flood Watch",
    severity: "medium" as const,
    zips: ["75023″, "75034", "75069"],
    trades: ["Plumbing", "Water Damage", "Foundation"],
    wind: 28,
    hail: "None",
    movement: "S at 15mph",
    eta: "Ongoing — 6hrs",
  },
];

interface RoutingRule {
  trade: string;
  radius: number;
  icon: React.ReactNode;
  autoDispatch: boolean;
  minSeverity: string;
}

const ROUTING_RULES_DEFAULT: RoutingRule[] = [
  { trade: "HVAC", radius: 50, icon: <Wrench className="w-4 h-4 text-red-400″ />, autoDispatch: true, minSeverity: "medium" },
  { trade: "Roofing", radius: 30, icon: <Home className="w-4 h-4 text-amber-400″ />, autoDispatch: true, minSeverity: "medium" },
  { trade: "Tree Removal", radius: 20, icon: <TreePine className="w-4 h-4 text-green-400″ />, autoDispatch: true, minSeverity: "high" },
  { trade: "Water Damage", radius: 25, icon: <Waves className="w-4 h-4 text-blue-400″ />, autoDispatch: false, minSeverity: "medium" },
  { trade: "Plumbing", radius: 35, icon: <Droplets className="w-4 h-4 text-cyan-400″ />, autoDispatch: false, minSeverity: "high" },
];

const HISTORICAL = [
  { name: "May 8 Supercell", date: "May 8″, type: "Thunderstorm", severity: "extreme" as const, leads: 412, accepted: 387, revenue: "$1.4M", acceptRate: 94 },
  { name: "Apr 23 Hail Event", date: "Apr 23″, type: "Hail + Wind", severity: "high" as const, leads: 287, accepted: 261, revenue: "$980K", acceptRate: 91 },
  { name: "Apr 11 Flash Flood", date: "Apr 11″, type: "Flash Flood", severity: "medium" as const, leads: 156, accepted: 139, revenue: "$520K", acceptRate: 89 },
  { name: "Mar 29 Tornado Watch", date: "Mar 29″, type: "Tornado Risk", severity: "extreme" as const, leads: 203, accepted: 190, revenue: "$712K", acceptRate: 94 },
  { name: "Mar 14 Ice Storm", date: "Mar 14″, type: "Ice + Freeze", severity: "high" as const, leads: 318, accepted: 295, revenue: "$1.1M", acceptRate: 93 },
  { name: "Feb 28 Hail", date: "Feb 28″, type: "Hail", severity: "medium" as const, leads: 124, accepted: 108, revenue: "$398K", acceptRate: 87 },
  { name: "Feb 12 Freeze", date: "Feb 12″, type: "Hard Freeze", severity: "high" as const, leads: 271, accepted: 248, revenue: "$890K", acceptRate: 92 },
  { name: "Jan 30 Ice Storm", date: "Jan 30″, type: "Ice + Wind", severity: "extreme" as const, leads: 344, accepted: 322, revenue: "$1.2M", acceptRate: 94 },
  { name: "Jan 18 Wind", date: "Jan 18″, type: "High Wind", severity: "medium" as const, leads: 98, accepted: 84, revenue: "$305K", acceptRate: 86 },
  { name: "Jan 3 Freeze", date: "Jan 3″, type: "Freeze", severity: "high" as const, leads: 188, accepted: 174, revenue: "$638K", acceptRate: 93 },
];

interface SimResult {
  stormType: string;
  affectedZones: number;
  estimatedLeads: number;
  notifiedPros: number;
  projectedRevenue: string;
  tradeBreakdown: { trade: string; leads: number }[];
}

function runSimulation(cellId: number): SimResult {
  const cell = ACTIVE_CELLS.find(c => c.id === cellId) ?? ACTIVE_CELLS[0];
  const base = cell.severity === "extreme" ? 380 : cell.severity === "high" ? 220 : 110;
  return {
    stormType: cell.type,
    affectedZones: cell.zips.length,
    estimatedLeads: base + Math.floor(Math.random() * 50),
    notifiedPros: Math.floor(base * 2.4),
    projectedRevenue: `$${(base * 3200 / 1000).toFixed(0)}K`,
    tradeBreakdown: cell.trades.map((t, i) => ({
      trade: t,
      leads: Math.floor(base * ([0.4, 0.35, 0.25][i] ?? 0.2)),
    })),
  };
}

export default function StormWatch() {
  const { data, isLoading } = trpc.adminExtras.getStormWatchData.useQuery();
  const events = data?.events ?? [];
  const stats = data?.stats;

  const [routingRules, setRoutingRules] = useState<RoutingRule[]>(ROUTING_RULES_DEFAULT);
  const [simCell, setSimCell] = useState<number>(1);
  const [simResult, setSimResult] = useState<SimResult | null>(null);
  const [simRunning, setSimRunning] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  function toggleDispatch(trade: string) {
    setRoutingRules(prev => prev.map(r => r.trade === trade ? { ...r, autoDispatch: !r.autoDispatch } : r));
  }

  function handleSimulate() {
    setSimRunning(true);
    setSimResult(null);
    setTimeout(() => {
      setSimResult(runSimulation(simCell));
      setSimRunning(false);
      toast.success("Simulation complete");
    }, 1400);
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6″>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2″>
              <Radio className="w-6 h-6 text-orange-400″ />
              Storm Watch
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5″>Zone threat map · Active cells · Auto-dispatch routing · Historical performance</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 font-medium">{ACTIVE_CELLS.filter(c => c.severity === "extreme").length} Extreme</span>
            <span>·</span>
            <span className="text-orange-400 font-medium">{ACTIVE_CELLS.filter(c => c.severity === "high").length} Warning</span>
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4″>
          {[
            { label: "Active Events", value: stats?.activeEvents ?? ACTIVE_CELLS.length, icon: AlertTriangle, color: "text-red-500″ },
            { label: "Total Events", value: stats?.totalEvents ?? HISTORICAL.length, icon: CloudLightning, color: "text-blue-400″ },
            { label: "Leads Generated", value: stats?.totalLeads ?? HISTORICAL.reduce((a, s) => a + s.leads, 0).toLocaleString(), icon: Zap, color: "text-amber-400″ },
            { label: "Avg Acceptance", value: `${Math.round(HISTORICAL.reduce((a, s) => a + s.acceptRate, 0) / HISTORICAL.length)}%`, icon: CheckCircle, color: "text-green-400″ },
          ].map(s => (
            <Card key={s.label} className={s.label === "Active Events" && (stats?.activeEvents ?? ACTIVE_CELLS.length) > 0 ? "border-red-500/30″ : ""}>
              <CardContent className="pt-5 pb-4″>
                <div className="flex items-center gap-2 mb-1″>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
                <div className={`text-3xl font-bold ${s.label === "Active Events" && (stats?.activeEvents ?? 0) > 0 ? "text-red-500" : ""}`}>{s.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Zone threat map grid + Active cells — side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6″>
          {/* Zone Map */}
          <Card>
            <CardHeader className="pb-3″>
              <CardTitle className="text-base flex items-center gap-2″>
                <MapPin className="w-4 h-4 text-blue-400″ />
                DFW Zone Threat Map
                <div className="ml-auto flex items-center gap-3 text-xs">
                  {[["extreme","red"],["high","orange"],["medium","amber"],["low","teal"]].map(([level, color]) => (
                    <span key={level} className="flex items-center gap-1″>
                      <span className={`w-2 h-2 rounded-full bg-${color}-500`} />
                      <span className="text-muted-foreground capitalize">{level}</span>
                    </span>
                  ))}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2″>
                {GRID_ZONES.map(zone => (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone.id === selectedZone ? null : zone.id)}
                    className={`rounded-xl border p-2.5 text-left transition-all cursor-pointer ${THREAT_GRID[zone.threat]} ${selectedZone === zone.id ? "ring-2 ring-white/30" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-1.5″>
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 animate-pulse ${THREAT_DOT[zone.threat]}`} />
                      <span className="text-[9px] text-gray-500″>{zone.zip}</span>
                    </div>
                    <p className="text-xs font-bold text-white leading-tight mb-1″>{zone.label}</p>
                    <p className="text-[9px] text-gray-400 mb-1.5″>{zone.type}</p>
                    <div className="flex items-center gap-1″>
                      <Wind className={`w-3 h-3 ${zone.wind > 40 ? "text-red-400" : "text-blue-400"}`} />
                      <span className={`text-[10px] font-semibold ${zone.wind > 40 ? "text-red-400" : "text-gray-300"}`}>{zone.wind}mph</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected zone detail */}
              {selectedZone && (() => {
                const z = GRID_ZONES.find(g => g.id === selectedZone)!;
                const style = SEVERITY_COLORS[z.threat];
                return (
                  <div className={`mt-3 rounded-xl border p-4 ${style.border} ${style.bg}`}>
                    <div className="flex items-center justify-between mb-2″>
                      <p className="font-semibold">{z.label} — ZIP {z.zip}</p>
                      <Badge className={`text-xs ${style.badge}`}>{z.threat.toUpperCase()}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div><Thermometer className="w-4 h-4 text-amber-400 mx-auto mb-0.5″ /><p className="font-bold">{z.temp}°F</p><p className="text-xs text-muted-foreground">Temp</p></div>
                      <div><Wind className="w-4 h-4 text-blue-400 mx-auto mb-0.5″ /><p className={`font-bold ${z.wind > 40 ? "text-red-400" : ""}`}>{z.wind}mph</p><p className="text-xs text-muted-foreground">Wind</p></div>
                      <div><Droplets className="w-4 h-4 text-blue-400 mx-auto mb-0.5″ /><p className="font-bold">{z.precip}%</p><p className="text-xs text-muted-foreground">Precip</p></div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>

          {/* Active Storm Cells */}
          <Card>
            <CardHeader className="pb-3″>
              <CardTitle className="text-base flex items-center gap-2″>
                <CloudLightning className="w-4 h-4 text-orange-400″ />
                Active Storm Cells
                <Badge className="ml-auto bg-red-600 text-white text-xs">{ACTIVE_CELLS.length} active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3″>
              {ACTIVE_CELLS.map(cell => {
                const style = SEVERITY_COLORS[cell.severity];
                return (
                  <div key={cell.id} className={`rounded-xl border p-4 ${style.border} ${style.bg}`}>
                    <div className="flex items-start justify-between mb-2″>
                      <div>
                        <p className="font-semibold text-sm">{cell.name}</p>
                        <p className="text-xs text-muted-foreground">{cell.type} · {cell.movement}</p>
                      </div>
                      <Badge className={`text-xs ${style.badge}`}>{cell.severity.toUpperCase()}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-2″>
                      <div className="flex items-center gap-1″>
                        <Wind className="w-3 h-3 text-blue-400″ />
                        <span className="text-muted-foreground">Wind:</span>
                        <span className={`font-medium ${cell.wind > 40 ? "text-red-400" : ""}`}>{cell.wind}mph</span>
                      </div>
                      <div className="flex items-center gap-1″>
                        <Activity className="w-3 h-3 text-amber-400″ />
                        <span className="text-muted-foreground">Hail:</span>
                        <span className="font-medium">{cell.hail}</span>
                      </div>
                      <div className="flex items-center gap-1 col-span-2″>
                        <Clock className="w-3 h-3 text-teal-400″ />
                        <span className="text-muted-foreground">{cell.eta}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {cell.zips.slice(0, 4).map(z => (
                        <span key={z} className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-gray-300″>{z}</span>
                      ))}
                      <span className="text-[10px] text-muted-foreground">·</span>
                      {cell.trades.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20″>{t}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Lead Routing Rules + Simulation — side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6″>
          {/* Routing Rules */}
          <Card>
            <CardHeader className="pb-3″>
              <CardTitle className="text-base flex items-center gap-2″>
                <Zap className="w-4 h-4 text-yellow-400″ />
                Lead Routing Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3″>
              {routingRules.map(rule => (
                <div key={rule.trade} className={`rounded-xl border p-3.5 transition-all ${rule.autoDispatch ? "border-amber-500/20 bg-amber-500/5" : "border-border"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5″>
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0″>
                        {rule.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{rule.trade}</p>
                        <p className="text-xs text-muted-foreground">{rule.radius}mi radius · min {rule.minSeverity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2″>
                      <span className={`text-xs font-medium ${rule.autoDispatch ? "text-green-400" : "text-muted-foreground"}`}>
                        {rule.autoDispatch ? "Auto" : "Manual"}
                      </span>
                      <button onClick={() => toggleDispatch(rule.trade)} className="text-muted-foreground hover:text-foreground transition-colors">
                        {rule.autoDispatch
                          ? <ToggleRight className="w-6 h-6 text-green-400″ />
                          : <ToggleLeft className="w-6 h-6″ />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground pt-1″>Auto-dispatch routes leads immediately when storm severity meets the trade's threshold. Manual requires admin approval.</p>
            </CardContent>
          </Card>

          {/* Simulation */}
          <Card>
            <CardHeader className="pb-3″>
              <CardTitle className="text-base flex items-center gap-2″>
                <Play className="w-4 h-4 text-teal-400″ />
                Run Simulation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4″>
              <div>
                <p className="text-sm text-muted-foreground mb-2″>Select a storm cell to simulate:</p>
                <div className="space-y-2″>
                  {ACTIVE_CELLS.map(cell => {
                    const style = SEVERITY_COLORS[cell.severity];
                    return (
                      <label key={cell.id} className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-all ${simCell === cell.id ? `${style.border} ${style.bg}` : "border-border hover:border-muted-foreground/30"}`}>
                        <input
                          type="radio"
                          name="sim-cell"
                          value={cell.id}
                          checked={simCell === cell.id}
                          onChange={() => setSimCell(cell.id)}
                          className="w-4 h-4 accent-orange-500″
                        />
                        <div className="flex-1″>
                          <p className="text-sm font-semibold">{cell.name}</p>
                          <p className="text-xs text-muted-foreground">{cell.type} · {cell.zips.length} ZIP codes</p>
                        </div>
                        <Badge className={`text-xs ${style.badge}`}>{cell.severity}</Badge>
                      </label>
                    );
                  })}
                </div>
              </div>

              <Button
                onClick={handleSimulate}
                disabled={simRunning}
                className="w-full bg-teal-600 hover:bg-teal-500 text-white gap-2″
              >
                {simRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4″ />}
                {simRunning ? "Running Simulation..." : "Run Simulation"}
              </Button>

              {simResult && (
                <div className="rounded-xl border border-teal-500/30 bg-teal-500/5 p-4 space-y-3″>
                  <div className="flex items-center gap-2 mb-1″>
                    <CheckCircle className="w-4 h-4 text-teal-400″ />
                    <p className="text-sm font-semibold text-teal-300″>Simulation Results — {simResult.stormType}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3″>
                    {[
                      { label: "Affected Zones", value: simResult.affectedZones, color: "text-orange-400″ },
                      { label: "Est. Leads", value: simResult.estimatedLeads, color: "text-amber-400″ },
                      { label: "Pros Notified", value: simResult.notifiedPros, color: "text-blue-400″ },
                      { label: "Proj. Revenue", value: simResult.projectedRevenue, color: "text-green-400″ },
                    ].map(item => (
                      <div key={item.label} className="rounded-lg bg-white/5 p-2.5 text-center">
                        <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5″>{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 font-medium">Trade Breakdown:</p>
                    {simResult.tradeBreakdown.map(t => (
                      <div key={t.trade} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0″>
                        <span className="text-foreground">{t.trade}</span>
                        <span className="font-bold text-amber-400″>{t.leads} leads</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Historical Storm Performance */}
        <Card>
          <CardHeader className="pb-3″>
            <CardTitle className="text-base flex items-center gap-2″>
              <BarChart3 className="w-4 h-4 text-orange-400″ />
              Historical Storm Performance — Last 10 Events
              <div className="ml-auto flex items-center gap-4 text-xs text-muted-foreground">
                <span>Total leads: <strong className="text-foreground">{HISTORICAL.reduce((a, h) => a + h.leads, 0).toLocaleString()}</strong></span>
                <span>Total revenue: <strong className="text-amber-400″>~$7.7M</strong></span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-8 text-center text-muted-foreground animate-pulse">Loading storm history...</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-xs text-muted-foreground">
                        <th className="text-left pb-3 pr-4″>Storm Event</th>
                        <th className="text-left pb-3 pr-4″>Type</th>
                        <th className="text-left pb-3 pr-4″>Severity</th>
                        <th className="text-right pb-3 pr-4″>Leads</th>
                        <th className="text-right pb-3 pr-4″>Accepted</th>
                        <th className="text-right pb-3 pr-4″>Rate</th>
                        <th className="text-right pb-3″>Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(events.length > 0 ? events : HISTORICAL).map((row: any, i: number) => {
                        const isReal = events.length > 0;
                        const name = isReal ? `${row.eventType?.replace(/_/g, " ")} — ${row.affectedCity ?? "DFW"}` : row.name;
                        const type = isReal ? row.eventType : row.type;
                        const severity = isReal ? row.severity : row.severity;
                        const leads = isReal ? (row.leadsGenerated ?? 0) : row.leads;
                        const accepted = isReal ? Math.round(leads * 0.92) : row.accepted;
                        const rate = leads > 0 ? Math.round((accepted / leads) * 100) : 0;
                        const revenue = isReal ? `$${Math.round(leads * 3200 / 1000)}K` : row.revenue;
                        const rowStyle = SEVERITY_COLORS[severity] ?? SEVERITY_COLORS.low;
                        return (
                          <tr key={i} className="border-b border-border/50 hover:bg-accent/50″>
                            <td className="py-3 pr-4″>
                              <p className="font-medium">{name}</p>
                              <p className="text-xs text-muted-foreground">{isReal ? new Date(row.detectedAt ?? row.createdAt).toLocaleDateString() : `${row.date}, 2026`}</p>
                            </td>
                            <td className="py-3 pr-4 text-muted-foreground text-xs">{type}</td>
                            <td className="py-3 pr-4″>
                              <Badge className={`text-xs ${rowStyle.badge}`}>{severity}</Badge>
                            </td>
                            <td className="py-3 pr-4 text-right font-bold">{Number(leads).toLocaleString()}</td>
                            <td className="py-3 pr-4 text-right text-green-500″>{Number(accepted).toLocaleString()}</td>
                            <td className="py-3 pr-4 text-right">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${rate >= 92 ? "bg-green-500/15 text-green-400" : rate >= 88 ? "bg-teal-500/15 text-teal-400" : "bg-yellow-500/15 text-yellow-400"}`}>
                                {rate}%
                              </span>
                            </td>
                            <td className="py-3 text-right font-bold text-amber-400″>{revenue}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Spark bars */}
                <div className="mt-5 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">Leads per Event</p>
                  <div className="space-y-1.5″>
                    {HISTORICAL.slice(0, 8).map((row, i) => {
                      const max = Math.max(...HISTORICAL.map(h => h.leads));
                      const pct = (row.leads / max) * 100;
                      const sStyle = SEVERITY_COLORS[row.severity];
                      return (
                        <div key={i} className="flex items-center gap-3″>
                          <span className="text-xs text-muted-foreground w-28 truncate">{row.name.split(" ").slice(0, 2).join(" ")}</span>
                          <div className="flex-1 bg-muted/30 rounded-full h-2″>
                            <div className={`h-2 rounded-full transition-all duration-700 ${row.severity === "extreme" ? "bg-red-500" : row.severity === "high" ? "bg-orange-500" : "bg-amber-400"}`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs font-bold w-8 text-right">{row.leads}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
