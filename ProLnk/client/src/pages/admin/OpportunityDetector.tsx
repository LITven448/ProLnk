import React from 'react';
import { useState, useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Zap, MapPin, DollarSign, TrendingUp, CloudLightning, Thermometer,
  Home, AlertTriangle, Leaf, Eye, Rocket, Settings, ToggleLeft, ToggleRight,
  BarChart3, Users, Clock, CheckCircle, ChevronRight, Target, Wind
} from "lucide-react";

type TriggerType = "weather_event" | "hvac_season" | "roof_aging" | "appliance_recall" | "storm_aftermath" | "seasonal_demand";
type Status = "new" | "launched" | "monitoring" | "closed";

interface Opportunity {
  id: string;
  zip: string;
  city: string;
  state: string;
  type: TriggerType;
  title: string;
  description: string;
  estimatedLeads: number;
  proCount: number;
  estimatedRevenue: number;
  detectedAt: string;
  status: Status;
  urgency: "critical" | "high" | "medium" | "low";
}

const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-001″,
    zip: "77002″,
    city: "Houston",
    state: "TX",
    type: "storm_aftermath",
    title: "Post-storm roofing surge",
    description: "Hail storm on May 10 impacted ~8,400 homes. Insurance claims spiking. Estimated 600+ roof assessments needed in next 30 days.",
    estimatedLeads: 620,
    proCount: 14,
    estimatedRevenue: 186000,
    detectedAt: "2026-05-11T06:30:00Z",
    status: "launched",
    urgency: "critical",
  },
  {
    id: "opp-002″,
    zip: "78756″,
    city: "Austin",
    state: "TX",
    type: "hvac_season",
    title: "Summer HVAC tune-up window",
    description: "Temperatures forecast to exceed 95°F within 2 weeks. Historically 3x normal HVAC service demand. 1,200 homes in area without recent service.",
    estimatedLeads: 340,
    proCount: 22,
    estimatedRevenue: 102000,
    detectedAt: "2026-05-12T09:00:00Z",
    status: "new",
    urgency: "high",
  },
  {
    id: "opp-003″,
    zip: "75208″,
    city: "Dallas",
    state: "TX",
    type: "roof_aging",
    title: "Aging roof cohort — Oak Cliff",
    description: "Home Health Vault data shows 892 homes in this ZIP with roofs 15+ years old. Average replacement value $9,200. Prime outreach window before summer storms.",
    estimatedLeads: 280,
    proCount: 18,
    estimatedRevenue: 258000,
    detectedAt: "2026-05-10T14:15:00Z",
    status: "monitoring",
    urgency: "high",
  },
  {
    id: "opp-004″,
    zip: "78249″,
    city: "San Antonio",
    state: "TX",
    type: "appliance_recall",
    title: "GE water heater recall — 3 ZIP codes",
    description: "CPSC recall issued for GE ProPlus 50-gal models (2018–2020). Estimated 1,100 affected units in area. Homeowners eligible for replacement credit.",
    estimatedLeads: 190,
    proCount: 9,
    estimatedRevenue: 95000,
    detectedAt: "2026-05-09T11:00:00Z",
    status: "new",
    urgency: "critical",
  },
  {
    id: "opp-005″,
    zip: "77063″,
    city: "Houston",
    state: "TX",
    type: "seasonal_demand",
    title: "Spring landscaping surge",
    description: "Google Trends show 180% spike in lawn care searches. 2,100 homeowners in network without landscaping service in 12+ months.",
    estimatedLeads: 410,
    proCount: 31,
    estimatedRevenue: 82000,
    detectedAt: "2026-05-08T08:45:00Z",
    status: "launched",
    urgency: "medium",
  },
  {
    id: "opp-006″,
    zip: "77079″,
    city: "Houston",
    state: "TX",
    type: "weather_event",
    title: "Freeze pipe damage follow-up",
    description: "January freeze event caused ~1,400 reports of pipe damage in western Houston. Q2 repair window is underway — 30% have not yet scheduled fixes.",
    estimatedLeads: 155,
    proCount: 12,
    estimatedRevenue: 69750,
    detectedAt: "2026-05-07T13:20:00Z",
    status: "monitoring",
    urgency: "medium",
  },
  {
    id: "opp-007″,
    zip: "78704″,
    city: "Austin",
    state: "TX",
    type: "seasonal_demand",
    title: "Pool season open / prep demand",
    description: "Pool opening requests spike May–June. 680 homes with pools registered in Vault with no pool service recorded in last 8 months.",
    estimatedLeads: 220,
    proCount: 8,
    estimatedRevenue: 44000,
    detectedAt: "2026-05-06T10:00:00Z",
    status: "new",
    urgency: "medium",
  },
  {
    id: "opp-008″,
    zip: "78702″,
    city: "Austin",
    state: "TX",
    type: "roof_aging",
    title: "East Austin — 20+ year roof cohort",
    description: "Vault shows 430 homes built 2000–2004 with original roofs. High density area, easy for pros to batch multiple jobs per route.",
    estimatedLeads: 145,
    proCount: 11,
    estimatedRevenue: 133400,
    detectedAt: "2026-05-05T16:30:00Z",
    status: "closed",
    urgency: "low",
  },
];

const TRIGGER_CONFIG: Record<TriggerType, { label: string; icon: React.ReactNode; color: string; bgColor: string }> = {
  weather_event:    { label: "Weather Event",     icon: <CloudLightning className="w-4 h-4″ />, color: "text-blue-400",   bgColor: "bg-blue-500/20" },
  hvac_season:      { label: "HVAC Season",        icon: <Thermometer className="w-4 h-4″ />,    color: "text-orange-400", bgColor: "bg-orange-500/20" },
  roof_aging:       { label: "Roof Aging",          icon: <Home className="w-4 h-4″ />,            color: "text-amber-400",  bgColor: "bg-amber-500/20" },
  appliance_recall: { label: "Appliance Recall",   icon: <AlertTriangle className="w-4 h-4″ />,  color: "text-red-400",    bgColor: "bg-red-500/20" },
  storm_aftermath:  { label: "Storm Aftermath",    icon: <Wind className="w-4 h-4″ />,            color: "text-purple-400", bgColor: "bg-purple-500/20" },
  seasonal_demand:  { label: "Seasonal Demand",    icon: <Leaf className="w-4 h-4″ />,            color: "text-green-400",  bgColor: "bg-green-500/20" },
};

const URGENCY_STYLES = {
  critical: "bg-red-500/20 text-red-400 border-red-500/30″,
  high:     "bg-orange-500/20 text-orange-400 border-orange-500/30″,
  medium:   "bg-yellow-500/20 text-yellow-400 border-yellow-500/30″,
  low:      "bg-slate-500/20 text-slate-400 border-slate-500/30″,
};

const STATUS_STYLES: Record<Status, string> = {
  new:        "bg-teal-500/20 text-teal-400″,
  launched:   "bg-green-500/20 text-green-400″,
  monitoring: "bg-blue-500/20 text-blue-400″,
  closed:     "bg-slate-500/20 text-slate-400″,
};

type AutoTriggerKey = TriggerType;
const DEFAULT_AUTO_TRIGGERS: Record<AutoTriggerKey, boolean> = {
  weather_event:    true,
  storm_aftermath:  true,
  hvac_season:      true,
  roof_aging:       false,
  appliance_recall: true,
  seasonal_demand:  false,
};

export default function OpportunityDetector() {
  const [opps, setOpps] = useState(MOCK_OPPORTUNITIES);
  const [filterType, setFilterType] = useState<TriggerType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");
  const [autoTriggers, setAutoTriggers] = useState(DEFAULT_AUTO_TRIGGERS);
  const [launchTarget, setLaunchTarget] = useState<Opportunity | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const filtered = useMemo(() => {
    return opps.filter((o) => {
      const matchType = filterType === "all" || o.type === filterType;
      const matchStatus = filterStatus === "all" || o.status === filterStatus;
      return matchType && matchStatus;
    }).sort((a, b) => {
      const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    });
  }, [opps, filterType, filterStatus]);

  const totalRevenue = opps.filter((o) => o.status !== "closed").reduce((s, o) => s + o.estimatedRevenue, 0);
  const totalLeads = opps.filter((o) => o.status !== "closed").reduce((s, o) => s + o.estimatedLeads, 0);
  const launched = opps.filter((o) => o.status === "launched").length;
  const critical = opps.filter((o) => o.urgency === "critical" && o.status === "new").length;

  function launchCampaign(id: string) {
    setOpps((prev) => prev.map((o) => o.id === id ? { ...o, status: "launched" } : o));
    toast.success(`Campaign launched for ${opps.find((o) => o.id === id)?.title}`);
    setLaunchTarget(null);
  }

  function toggleAutoTrigger(key: AutoTriggerKey) {
    setAutoTriggers((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success(`Auto-trigger ${autoTriggers[key] ? "disabled" : "enabled"} for ${TRIGGER_CONFIG[key].label}`);
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3″>
          <div className="flex items-center gap-3″>
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-400″ />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Opportunity Detector</h1>
              <p className="text-sm text-slate-400″>Storm events, aging assets, seasonal demand — auto-detected and ready to launch</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0F1E35] border border-slate-700 text-slate-400 hover:border-teal-500/50 text-sm transition-colors"
          >
            <Settings className="w-4 h-4″ /> Auto-Trigger Rules
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4″>
          {[
            { label: "Est. Revenue Pipeline", value: `$${(totalRevenue / 1000).toFixed(0)}K`, icon: <DollarSign className="w-4 h-4 text-amber-400″ />, color: "text-amber-400", bg: "bg-amber-500/10" },
            { label: "Est. Leads Available", value: totalLeads.toLocaleString(), icon: <Target className="w-4 h-4 text-teal-400″ />, color: "text-teal-400", bg: "bg-teal-500/10" },
            { label: "Active Campaigns", value: launched, icon: <Rocket className="w-4 h-4 text-green-400″ />, color: "text-green-400", bg: "bg-green-500/10" },
            { label: "Critical (Unactioned)", value: critical, icon: <AlertTriangle className="w-4 h-4 text-red-400″ />, color: "text-red-400", bg: "bg-red-500/10" },
          ].map((s) => (
            <div key={s.label} className={`rounded-xl p-4 border border-slate-700 ${s.bg}`}>
              <div className="flex items-center gap-2 mb-2″>{s.icon}<span className="text-xs text-slate-400">{s.label}</span></div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Trigger type breakdown */}
        <div className="bg-[#0F1E35] rounded-xl border border-slate-700 p-5″>
          <div className="flex items-center gap-2 mb-4″>
            <BarChart3 className="w-4 h-4 text-slate-400″ />
            <span className="text-sm font-semibold text-white">Active Trigger Sources</span>
          </div>
          <div className="flex flex-wrap gap-2″>
            {Object.entries(TRIGGER_CONFIG).map(([key, cfg]) => {
              const count = opps.filter((o) => o.type === (key as TriggerType) && o.status !== "closed").length;
              if (!count) return null;
              return (
                <button
                  key={key}
                  onClick={() => setFilterType(filterType === key ? "all" : key as TriggerType)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    filterType === key
                      ? `${cfg.bgColor} ${cfg.color} border-current`
                      : "bg-slate-700/40 text-slate-400 border-slate-700 hover:border-slate-500″
                  }`}
                >
                  {cfg.icon}
                  {cfg.label}
                  <span className={`px-1.5 py-0.5 rounded-full ${filterType === key ? "bg-white/20" : "bg-slate-600"} text-xs`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {(["all", "new", "launched", "monitoring", "closed"] as (Status | "all")[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                filterStatus === s ? "bg-teal-500 text-white" : "bg-[#0F1E35] border border-slate-700 text-slate-400 hover:border-teal-500/50″
              }`}
            >
              {s}
            </button>
          ))}
          <span className="text-xs text-slate-500 ml-2″>{filtered.length} opportunities</span>
        </div>

        {/* Opportunity cards */}
        <div className="space-y-3″>
          {filtered.length === 0 ? (
            <div className="bg-[#0F1E35] rounded-xl border border-slate-700 p-12 text-center">
              <Zap className="w-12 h-12 text-slate-600 mx-auto mb-3″ />
              <p className="text-slate-400″>No opportunities match your filters</p>
            </div>
          ) : filtered.map((opp) => {
            const trigCfg = TRIGGER_CONFIG[opp.type];
            return (
              <div key={opp.id} className="bg-[#0F1E35] rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
                <div className="p-4″>
                  <div className="flex items-start gap-4 flex-wrap">
                    {/* Trigger icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${trigCfg.bgColor} ${trigCfg.color}`}>
                      {trigCfg.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0″>
                      <div className="flex items-center gap-2 flex-wrap mb-1″>
                        <span className="text-white font-semibold">{opp.title}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${URGENCY_STYLES[opp.urgency]}`}>
                          {opp.urgency}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[opp.status]}`}>
                          {opp.status}
                        </span>
                        {autoTriggers[opp.type] && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20″>
                            auto-trigger on
                          </span>
                        )}
                      </div>

                      <p className="text-slate-400 text-xs leading-relaxed mb-2″>{opp.description}</p>

                      <div className="flex flex-wrap gap-4 text-xs">
                        <span className="flex items-center gap-1 text-slate-300″>
                          <MapPin className="w-3 h-3 text-slate-500″ /> {opp.zip} — {opp.city}, {opp.state}
                        </span>
                        <span className="flex items-center gap-1 text-teal-400 font-medium">
                          <Target className="w-3 h-3″ /> {opp.estimatedLeads} est. leads
                        </span>
                        <span className="flex items-center gap-1 text-slate-300″>
                          <Users className="w-3 h-3 text-slate-500″ /> {opp.proCount} pros in area
                        </span>
                        <span className="flex items-center gap-1 text-amber-400 font-medium">
                          <DollarSign className="w-3 h-3″ /> ${opp.estimatedRevenue.toLocaleString()} est. revenue
                        </span>
                        <span className="flex items-center gap-1 text-slate-400″>
                          <Clock className="w-3 h-3″ /> Detected {new Date(opp.detectedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center gap-2 shrink-0 self-center">
                      {opp.status === "new" && (
                        <button
                          onClick={() => setLaunchTarget(opp)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-white text-xs font-semibold transition-colors"
                        >
                          <Rocket className="w-3.5 h-3.5″ /> Launch Campaign
                        </button>
                      )}
                      {opp.status === "launched" && (
                        <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-500/20 text-green-400 text-xs font-semibold border border-green-500/30″>
                          <CheckCircle className="w-3.5 h-3.5″ /> Launched
                        </div>
                      )}
                      {opp.status === "monitoring" && (
                        <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-semibold border border-blue-500/30″>
                          <Eye className="w-3.5 h-3.5″ /> Monitoring
                        </div>
                      )}
                      {opp.status === "closed" && (
                        <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-500/20 text-slate-400 text-xs font-semibold border border-slate-500/30″>
                          Closed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Launch confirmation */}
        <Dialog open={!!launchTarget} onOpenChange={() => setLaunchTarget(null)}>
          <DialogContent className="max-w-md bg-[#0A1628] border border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2″>
                <Rocket className="w-5 h-5 text-teal-400″ />
                Launch Campaign
              </DialogTitle>
            </DialogHeader>
            {launchTarget && (
              <div className="space-y-4 py-2″>
                <div className="bg-[#0F1E35] rounded-lg p-4 border border-slate-700 space-y-2 text-sm">
                  <div className="text-white font-semibold">{launchTarget.title}</div>
                  <div className="text-slate-400 text-xs">{launchTarget.description}</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="bg-[#0F1E35] rounded-lg p-3 border border-slate-700″>
                    <div className="text-teal-400 font-bold text-lg">{launchTarget.estimatedLeads}</div>
                    <div className="text-slate-400 text-xs">Est. Leads</div>
                  </div>
                  <div className="bg-[#0F1E35] rounded-lg p-3 border border-slate-700″>
                    <div className="text-slate-300 font-bold text-lg">{launchTarget.proCount}</div>
                    <div className="text-slate-400 text-xs">Pros Notified</div>
                  </div>
                  <div className="bg-[#0F1E35] rounded-lg p-3 border border-slate-700″>
                    <div className="text-amber-400 font-bold text-lg">${(launchTarget.estimatedRevenue / 1000).toFixed(0)}K</div>
                    <div className="text-slate-400 text-xs">Est. Revenue</div>
                  </div>
                </div>
                <div className="text-xs text-slate-400 bg-teal-500/10 border border-teal-500/20 rounded-lg p-3″>
                  This will send targeted outreach to <strong className="text-white">{launchTarget.proCount} matched pros</strong> and queue homeowner match requests in the <strong className="text-white">{launchTarget.zip}</strong> area.
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" className="border-slate-600 text-slate-400″ onClick={() => setLaunchTarget(null)}>Cancel</Button>
              <Button className="bg-teal-500 hover:bg-teal-400 text-white" onClick={() => launchTarget && launchCampaign(launchTarget.id)}>
                <Rocket className="w-4 h-4 mr-2″ /> Launch Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Auto-trigger settings */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="max-w-lg bg-[#0A1628] border border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2″>
                <Settings className="w-5 h-5 text-teal-400″ />
                Auto-Trigger Rules
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2″>
              <p className="text-xs text-slate-400″>When auto-trigger is ON for a type, campaigns launch automatically. When OFF, opportunities appear in the queue for manual review.</p>
              {(Object.keys(TRIGGER_CONFIG) as TriggerType[]).map((key) => {
                const cfg = TRIGGER_CONFIG[key];
                const isOn = autoTriggers[key];
                return (
                  <div key={key} className="flex items-center justify-between p-3 bg-[#0F1E35] rounded-lg border border-slate-700″>
                    <div className="flex items-center gap-3″>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cfg.bgColor} ${cfg.color}`}>
                        {cfg.icon}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{cfg.label}</div>
                        <div className="text-slate-500 text-xs">{isOn ? "Auto-launches campaigns" : "Manual approval required"}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleAutoTrigger(key)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isOn ? "bg-teal-500/20 text-teal-400 border border-teal-500/30″ : "bg-slate-700/50 text-slate-400 border border-slate-600"
                      }`}
                    >
                      {isOn ? <ToggleRight className="w-4 h-4″ /> : <ToggleLeft className="w-4 h-4" />}
                      {isOn ? "On" : "Off"}
                    </button>
                  </div>
                );
              })}
            </div>
            <DialogFooter>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white w-full" onClick={() => { setShowSettings(false); toast.success("Auto-trigger settings saved"); }}>
                Save Settings
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
