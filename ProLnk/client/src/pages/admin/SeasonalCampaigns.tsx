import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell
} from "recharts";
import {
  Calendar, Plus, CloudLightning, Leaf, Snowflake, Sun, Wind, Target,
  Mail, TrendingUp, Users, CheckCircle, Clock, X, MapPin, Wrench, Zap, Droplets
} from "lucide-react";
import { toast } from "sonner";

const TRADE_ICONS: Record<string, any> = {
  HVAC: Wind, Roofing: Wrench, Landscaping: Leaf, Plumbing: Droplets,
  Electrical: Zap, "All Trades": Target,
};

const TRADE_COLORS: Record<string, string> = {
  HVAC: "#00B5B8", Roofing: "#F59E0B", Landscaping: "#10B981",
  Plumbing: "#3B82F6", Electrical: "#8B5CF6", "All Trades": "#EC4899",
};

const SEASON_COLORS: Record<string, string> = {
  Spring: "#10B981", Summer: "#F59E0B", Fall: "#F97316", Winter: "#3B82F6", "Year-Round": "#8B5CF6",
};

const CAMPAIGNS = [
  { id: 1, name: "HVAC Summer Prep", trade: "HVAC", season: "Spring", status: "active", startDate: "Apr 15", endDate: "Jun 1", leadsGenerated: 847, openRate: 38.2, clickRate: 12.4, message: "Get your AC ready before the heat hits. Schedule your tune-up today." },
  { id: 2, name: "Spring Roof Inspection", trade: "Roofing", season: "Spring", status: "active", startDate: "Mar 1", endDate: "May 31", leadsGenerated: 512, openRate: 31.7, clickRate: 9.8, message: "Winter is hard on roofs. Get a free inspection from a certified pro." },
  { id: 3, name: "Lawn Care Season Opener", trade: "Landscaping", season: "Spring", status: "active", startDate: "Mar 15", endDate: "Apr 30", leadsGenerated: 294, openRate: 29.4, clickRate: 8.1, message: "First mow of the season on us. Book a landscaping partner today." },
  { id: 4, name: "Winter Plumbing Guard", trade: "Plumbing", season: "Winter", status: "completed", startDate: "Nov 1", endDate: "Feb 28", leadsGenerated: 1104, openRate: 42.1, clickRate: 18.3, message: "Protect your pipes before the freeze. Emergency plumber response within 2hrs." },
  { id: 5, name: "Fall HVAC Tune-Up", trade: "HVAC", season: "Fall", status: "scheduled", startDate: "Sep 1", endDate: "Oct 31", leadsGenerated: 0, openRate: 0, clickRate: 0, message: "Get your heating system ready before the cold hits." },
];

const SEASON_CALENDAR = [
  { month: "Jan", seasons: ["Plumbing"], intensity: 3, label: "Freeze Risk" },
  { month: "Feb", seasons: ["Plumbing"], intensity: 2, label: "Pipe Watch" },
  { month: "Mar", seasons: ["Roofing", "Landscaping"], intensity: 4, label: "Spring Prep" },
  { month: "Apr", seasons: ["HVAC", "Roofing", "Landscaping"], intensity: 5, label: "Peak Spring" },
  { month: "May", seasons: ["HVAC", "Landscaping"], intensity: 4, label: "HVAC Season" },
  { month: "Jun", seasons: ["HVAC", "Electrical"], intensity: 5, label: "Summer Peak" },
  { month: "Jul", seasons: ["HVAC", "Electrical"], intensity: 5, label: "Max Heat" },
  { month: "Aug", seasons: ["HVAC", "Roofing"], intensity: 4, label: "Storm Season" },
  { month: "Sep", seasons: ["HVAC", "Landscaping"], intensity: 3, label: "Fall Prep" },
  { month: "Oct", seasons: ["Roofing", "Landscaping"], intensity: 4, label: "Fall Peak" },
  { month: "Nov", seasons: ["Plumbing", "Roofing"], intensity: 3, label: "Winter Prep" },
  { month: "Dec", seasons: ["Plumbing", "Electrical"], intensity: 2, label: "Holiday Rush" },
];

const MONTHLY_CHART = SEASON_CALENDAR.map(m => ({
  month: m.month,
  leads: m.intensity * 180 + Math.floor(Math.random() * 100),
  intensity: m.intensity,
}));

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400",
  scheduled: "bg-blue-500/20 text-blue-400",
  completed: "bg-slate-500/20 text-gray-500",
  paused: "bg-amber-500/20 text-amber-700",
};

const EMPTY_CAMPAIGN = {
  name: "", trade: "HVAC", season: "Spring", startDate: "", endDate: "",
  message: "", geoTarget: "", status: "scheduled",
};

export default function SeasonalCampaigns() {
  const [showCreate, setShowCreate] = useState(false);
  const [showStorm, setShowStorm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ ...EMPTY_CAMPAIGN });
  const [stormZip, setStormZip] = useState("");
  const [stormType, setStormType] = useState("hail");
  const [activeView, setActiveView] = useState<"campaigns" | "calendar">("campaigns");

  const { data: dbData } = trpc.adminExtras.getSeasonalCampaignStats.useQuery();
  const dbMonths = dbData ?? [];
  const hasDbData = dbMonths.length > 0;

  const chartData = hasDbData
    ? dbMonths.map((m: any) => ({ month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][(Number(m.month) - 1) % 12], leads: Number(m.leads), conversions: Number(m.conversions) }))
    : MONTHLY_CHART;

  const totalLeads = CAMPAIGNS.filter(c => c.status !== "scheduled").reduce((s, c) => s + c.leadsGenerated, 0);
  const activeCampaigns = CAMPAIGNS.filter(c => c.status === "active").length;
  const avgOpenRate = CAMPAIGNS.filter(c => c.openRate > 0).reduce((s, c) => s + c.openRate, 0) / Math.max(1, CAMPAIGNS.filter(c => c.openRate > 0).length);

  return (
    <AdminLayout title="Seasonal Campaigns" subtitle="Trade-specific seasonal marketing · Storm response · Campaign calendar">

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Leads Generated", value: totalLeads.toLocaleString(), icon: Target, color: "text-teal-700", bg: "bg-teal-500/10" },
          { label: "Active Campaigns", value: activeCampaigns, icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Avg Open Rate", value: `${avgOpenRate.toFixed(1)}%`, icon: Mail, color: "text-amber-700", bg: "bg-amber-500/10" },
          { label: "Scheduled (Upcoming)", value: CAMPAIGNS.filter(c => c.status === "scheduled").length, icon: Clock, color: "text-blue-400", bg: "bg-blue-500/10" },
        ].map(k => (
          <div key={k.label} className="rounded-xl border border-white/10 p-4 bg-[#0D1F3C]">
            <div className={`p-1.5 rounded-lg ${k.bg} w-fit mb-3`}>
              <k.icon className={`w-4 h-4 ${k.color}`} />
            </div>
            <div className="text-xs text-gray-500 mb-1">{k.label}</div>
            <div className={`text-2xl font-bold ${k.color}`}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Storm Response CTA */}
      <div className="rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-900/20 to-[#0D1F3C] p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20">
            <CloudLightning className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">Storm Season Response</div>
            <div className="text-xs text-gray-500 mt-0.5">Deploy emergency campaign to all partners in an affected area within minutes</div>
          </div>
        </div>
        <Button onClick={() => setShowStorm(true)} className="gap-2 bg-amber-600 hover:bg-amber-700 text-gray-900 text-sm flex-shrink-0">
          <CloudLightning className="w-4 h-4" /> Deploy Storm Alert
        </Button>
      </div>

      {/* Tab Toggle */}
      <div className="flex gap-1 mb-5 bg-[#0D1F3C] rounded-xl p-1 border border-white/10 w-fit">
        {(["campaigns", "calendar"] as const).map(v => (
          <button key={v} onClick={() => setActiveView(v)}
            className={`text-xs font-medium py-2 px-5 rounded-lg capitalize transition-all ${activeView === v ? "bg-teal-500/20 text-teal-700" : "text-gray-500 hover:text-gray-900"}`}>
            {v === "campaigns" ? "Active Campaigns" : "Season Calendar"}
          </button>
        ))}
      </div>

      {activeView === "campaigns" && (
        <div className="space-y-4">
          {/* Create button */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{CAMPAIGNS.length} campaigns total</span>
            <Button onClick={() => setShowCreate(true)} className="gap-2 bg-teal-600 hover:bg-teal-700 text-gray-900 text-sm">
              <Plus className="w-4 h-4" /> Create Campaign
            </Button>
          </div>

          {/* Campaign Cards */}
          {CAMPAIGNS.map(c => {
            const TradeIcon = TRADE_ICONS[c.trade] || Target;
            const tradeColor = TRADE_COLORS[c.trade] || "#00B5B8";
            const seasonColor = SEASON_COLORS[c.season] || "#10B981";
            return (
              <div key={c.id} className="rounded-xl border border-white/10 bg-[#0D1F3C] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: `${tradeColor}20` }}>
                      <TradeIcon className="w-5 h-5" style={{ color: tradeColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{c.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLES[c.status]}`}>{c.status}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${tradeColor}20`, color: tradeColor }}>{c.trade}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${seasonColor}20`, color: seasonColor }}>{c.season}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2 truncate">"{c.message}"</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {c.startDate} – {c.endDate}</span>
                        {c.leadsGenerated > 0 && <span className="flex items-center gap-1"><Target className="w-3 h-3" /> {c.leadsGenerated.toLocaleString()} leads</span>}
                        {c.openRate > 0 && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {c.openRate}% open</span>}
                        {c.clickRate > 0 && <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {c.clickRate}% click</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {c.status === "active" && (
                      <Button size="sm" variant="outline" className="h-7 text-xs border-white/10 text-gray-700 hover:text-gray-900" onClick={() => toast.success(`${c.name} paused`)}>Pause</Button>
                    )}
                    {c.status === "scheduled" && (
                      <Button size="sm" className="h-7 text-xs bg-teal-600 hover:bg-teal-700 text-gray-900" onClick={() => toast.success(`${c.name} launched`)}>Launch</Button>
                    )}
                  </div>
                </div>

                {/* Performance bar */}
                {c.leadsGenerated > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-3 pt-3 border-t border-white/5">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Leads Generated</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white/5 rounded-full h-1.5">
                          <div className="bg-teal-400 h-1.5 rounded-full" style={{ width: `${Math.min(100, (c.leadsGenerated / 1200) * 100)}%` }} />
                        </div>
                        <span className="text-xs font-medium text-gray-900">{c.leadsGenerated.toLocaleString()}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Open Rate</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white/5 rounded-full h-1.5">
                          <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${c.openRate}%` }} />
                        </div>
                        <span className="text-xs font-medium text-gray-900">{c.openRate}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Click Rate</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white/5 rounded-full h-1.5">
                          <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: `${c.clickRate * 3}%` }} />
                        </div>
                        <span className="text-xs font-medium text-gray-900">{c.clickRate}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeView === "calendar" && (
        <div className="space-y-4">
          {/* Season Legend */}
          <div className="flex flex-wrap gap-3">
            {Object.entries(TRADE_COLORS).map(([trade, color]) => {
              const Icon = TRADE_ICONS[trade] || Target;
              return (
                <div key={trade} className="flex items-center gap-1.5 text-xs text-gray-700">
                  <Icon className="w-3.5 h-3.5" style={{ color }} />
                  {trade}
                </div>
              );
            })}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {SEASON_CALENDAR.map((m, i) => {
              const isCurrentMonth = new Date().getMonth() === i;
              return (
                <div key={m.month} className={`rounded-xl border p-3 ${isCurrentMonth ? "border-teal-500/50 bg-teal-500/5" : "border-white/10 bg-[#0D1F3C]"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-bold ${isCurrentMonth ? "text-teal-700" : "text-gray-900"}`}>{m.month}</span>
                    {isCurrentMonth && <span className="text-xs px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-700">Now</span>}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">{m.label}</div>
                  <div className="flex flex-wrap gap-1">
                    {m.seasons.map(trade => {
                      const color = TRADE_COLORS[trade] || "#00B5B8";
                      const Icon = TRADE_ICONS[trade] || Target;
                      return (
                        <div key={trade} className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: `${color}20`, color }}>
                          <Icon className="w-2.5 h-2.5" />
                          <span>{trade}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-2">
                    {Array.from({ length: m.intensity }).map((_, j) => (
                      <div key={j} className="inline-block w-1.5 h-1.5 rounded-full mr-0.5" style={{ backgroundColor: m.intensity >= 5 ? "#F59E0B" : m.intensity >= 4 ? "#00B5B8" : "#64748B" }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lead Volume Chart */}
          <div className="rounded-xl border border-white/10 p-5 bg-[#0D1F3C]">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Monthly Lead Volume by Season</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#0D1F3C", border: "1px solid #1E3A5F", borderRadius: 8, color: "#fff" }} />
                  <Bar dataKey="leads" radius={[4, 4, 0, 0]} name="Leads">
                    {chartData.map((d: any, i: number) => {
                      const month = i;
                      const color = month >= 2 && month <= 4 ? "#10B981" : month >= 5 && month <= 7 ? "#F59E0B" : month >= 8 && month <= 9 ? "#F97316" : "#3B82F6";
                      return <Cell key={i} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-2 text-xs text-gray-500 justify-center">
              {[["Spring (Mar–May)", "#10B981"], ["Summer (Jun–Aug)", "#F59E0B"], ["Fall (Sep–Oct)", "#F97316"], ["Winter (Nov–Feb)", "#3B82F6"]].map(([label, color]) => (
                <span key={label} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: color }} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
          <div className="rounded-2xl border border-white/10 bg-[#0D1F3C] w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-teal-700" />
                <h2 className="font-bold text-gray-900">Create Campaign</h2>
              </div>
              <button onClick={() => setShowCreate(false)} className="text-gray-500 hover:text-gray-900"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Campaign Name *</label>
                <Input value={newCampaign.name} onChange={e => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="bg-[#F8FAFC] border-white/10 text-gray-900 focus:border-teal-500" placeholder="e.g., Summer HVAC Tune-Up Push" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Target Trade</label>
                  <select value={newCampaign.trade} onChange={e => setNewCampaign({ ...newCampaign, trade: e.target.value })}
                    className="w-full border border-white/10 rounded-lg px-3 py-2 text-sm bg-[#F8FAFC] text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    {Object.keys(TRADE_ICONS).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Season</label>
                  <select value={newCampaign.season} onChange={e => setNewCampaign({ ...newCampaign, season: e.target.value })}
                    className="w-full border border-white/10 rounded-lg px-3 py-2 text-sm bg-[#F8FAFC] text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    {["Spring", "Summer", "Fall", "Winter", "Year-Round"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
                  <Input type="date" value={newCampaign.startDate} onChange={e => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                    className="bg-[#F8FAFC] border-white/10 text-gray-900 focus:border-teal-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">End Date</label>
                  <Input type="date" value={newCampaign.endDate} onChange={e => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                    className="bg-[#F8FAFC] border-white/10 text-gray-900 focus:border-teal-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Message Template</label>
                <Textarea value={newCampaign.message} onChange={e => setNewCampaign({ ...newCampaign, message: e.target.value })}
                  className="bg-[#F8FAFC] border-white/10 text-gray-900 focus:border-teal-500"
                  placeholder="Get your AC ready before the heat hits. Schedule your tune-up today." rows={3} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Geo Targeting (zip codes or metro area)</label>
                <Input value={newCampaign.geoTarget} onChange={e => setNewCampaign({ ...newCampaign, geoTarget: e.target.value })}
                  className="bg-[#F8FAFC] border-white/10 text-gray-900 focus:border-teal-500" placeholder="e.g., DFW metro, 75001-75099" />
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500"><MapPin className="w-3 h-3" /> Leave blank to target all regions</div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-white/10">
              <Button variant="outline" onClick={() => setShowCreate(false)} className="border-white/10 text-gray-700 hover:text-gray-900">Cancel</Button>
              <Button
                onClick={() => {
                  if (!newCampaign.name) { toast.error("Campaign name is required"); return; }
                  toast.success(`Campaign "${newCampaign.name}" created`);
                  setShowCreate(false);
                  setNewCampaign({ ...EMPTY_CAMPAIGN });
                }}
                className="bg-teal-600 hover:bg-teal-700 text-gray-900"
              >
                Create Campaign
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Storm Alert Modal */}
      {showStorm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
          <div className="rounded-2xl border border-amber-500/40 bg-[#0D1F3C] w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <CloudLightning className="w-5 h-5 text-amber-700" />
                <h2 className="font-bold text-gray-900">Storm Season Response</h2>
              </div>
              <button onClick={() => setShowStorm(false)} className="text-gray-500 hover:text-gray-900"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="rounded-lg p-3 bg-amber-500/10 border border-amber-500/20">
                <p className="text-xs text-amber-700">This will immediately blast all partners in the targeted area with a storm response campaign and open your platform for emergency leads.</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Affected Zip Code(s) or Metro</label>
                <Input value={stormZip} onChange={e => setStormZip(e.target.value)}
                  className="bg-[#F8FAFC] border-white/10 text-gray-900 focus:border-amber-500" placeholder="e.g., 75001, 75002 or DFW" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Storm Type</label>
                <select value={stormType} onChange={e => setStormType(e.target.value)}
                  className="w-full border border-white/10 rounded-lg px-3 py-2 text-sm bg-[#F8FAFC] text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="hail">Hail Storm (Roofing priority)</option>
                  <option value="wind">High Winds (Roofing + Fencing)</option>
                  <option value="flood">Flash Flooding (Plumbing + Remediation)</option>
                  <option value="ice">Ice Storm (HVAC + Plumbing)</option>
                  <option value="general">General Severe Weather (All trades)</option>
                </select>
              </div>
              <div className="rounded-lg p-3 bg-[#F8FAFC] border border-white/5 text-xs text-gray-500">
                <strong className="text-gray-900">Preview message:</strong> "A severe storm has been detected in your area. ProLnk partners are standing by — respond to homeowner leads now. Claim available jobs before they're gone."
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-amber-500/20">
              <Button variant="outline" onClick={() => setShowStorm(false)} className="border-white/10 text-gray-700 hover:text-gray-900">Cancel</Button>
              <Button
                onClick={() => {
                  if (!stormZip) { toast.error("Zip code or metro area is required"); return; }
                  toast.success(`Storm alert deployed to all partners in ${stormZip}`);
                  setShowStorm(false);
                  setStormZip("");
                }}
                className="bg-amber-600 hover:bg-amber-700 text-gray-900 gap-2"
              >
                <CloudLightning className="w-4 h-4" /> Deploy Alert Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
