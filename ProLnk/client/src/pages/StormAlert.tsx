import type React from "react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { CloudLightning, Zap, Home, Bell, AlertTriangle, TrendingUp, Thermometer, Wind, Droplets, Wrench, Waves, TreePine, CheckCircle2, History, Settings } from "lucide-react";

interface ForecastHour {
  time: string;
  temp: number;
  precipitationProbability: number;
  windSpeed: number;
}

interface WeatherData {
  forecast: ForecastHour[];
  alerts: { type: string; severity: string; startTime: string; endTime: string; location: string }[];
}

function useDFWWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/trpc/stormAgent.getWeatherForecast", {
      credentials: "include",
    })
      .then(r => r.json())
      .then(json => {
        const result = json?.result?.data;
        if (result) setData(result);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

const ACTIVE_ALERTS = [
  { type: "Severe Thunderstorm Watch", area: "Dallas County, TX", severity: "Severe", issued: "May 11, 2026 · 2:30 PM CDT" },
  { type: "High Wind Warning", area: "Tarrant County, TX", severity: "Extreme", issued: "May 11, 2026 · 1:00 PM CDT" },
  { type: "Flash Flood Watch", area: "Collin County, TX", severity: "Moderate", issued: "May 11, 2026 · 11:00 AM CDT" },
];

const SEVERITY_BADGE: Record<string, string> = {
  Extreme: "bg-red-500 text-white",
  Severe: "bg-amber-500 text-white",
  Moderate: "bg-yellow-400 text-black",
};

const SEVERITY_BORDER: Record<string, string> = {
  Extreme: "border-red-500/60",
  Severe: "border-amber-500/50",
  Moderate: "border-yellow-400/30",
};

const PRO_BENEFITS = [
  {
    icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
    title: "Instant Storm Trigger",
    desc: "The moment NOAA issues a severe weather alert in your ZIP, our AI auto-generates a lead list from affected properties — before storm chasers or competitors even know it hit.",
  },
  {
    icon: <Home className="w-5 h-5 text-amber-400" />,
    title: "HVAC & Roofing Get First Crack",
    desc: "HVAC and roofing pros are priority-routed on every storm event. Storm-damaged properties surface instantly — pre-qualified, address-verified, ranked by urgency.",
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-green-400" />,
    title: "Earn While You Sleep",
    desc: "Storm leads auto-assign to your queue 24/7. Wake up to a full job list after every weather event — no cold calls, no bidding wars. Just work.",
  },
];

interface StormOpportunity {
  type: string;
  icon: React.ReactNode;
  estimatedJobs: number;
  avgJobValue: string;
  urgency: "Extreme" | "High" | "Medium";
  description: string;
}

const STORM_OPPORTUNITIES: StormOpportunity[] = [
  {
    type: "Roof Repair & Replacement",
    icon: <Home className="w-5 h-5 text-amber-400" />,
    estimatedJobs: 340,
    avgJobValue: "$4,200",
    urgency: "Extreme",
    description: "Hail > 1\" diameter reported across Dallas County. High density of unprotected tile roofs in affected zip codes.",
  },
  {
    type: "Water Damage Mitigation",
    icon: <Waves className="w-5 h-5 text-blue-400" />,
    estimatedJobs: 180,
    avgJobValue: "$2,800",
    urgency: "High",
    description: "Flash flood watch for Collin County. Properties in low-lying areas with documented drainage issues flagged.",
  },
  {
    type: "HVAC Emergency Service",
    icon: <Wrench className="w-5 h-5 text-red-400" />,
    estimatedJobs: 120,
    avgJobValue: "$1,100",
    urgency: "High",
    description: "High wind warning — outdoor condenser units at risk. Pro queue opens when storm passes.",
  },
  {
    type: "Tree & Debris Removal",
    icon: <TreePine className="w-5 h-5 text-green-400" />,
    estimatedJobs: 95,
    avgJobValue: "$850",
    urgency: "Medium",
    description: "Storm-force winds expected to down significant tree canopy across Tarrant County suburbs.",
  },
];

const URGENCY_BADGE: Record<string, string> = {
  Extreme: "bg-red-500/20 text-red-300 border border-red-500/30",
  High: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  Medium: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
};

const HISTORICAL_STORMS = [
  { name: "May 8 Supercell — DFW", date: "May 8, 2026", leads: 412, trades: "Roofing, HVAC, Water Damage" },
  { name: "April 23 Hail Event — Tarrant Co.", date: "Apr 23, 2026", leads: 287, trades: "Roofing, Windows" },
  { name: "April 11 Flash Flood — Collin Co.", date: "Apr 11, 2026", leads: 156, trades: "Water Damage, Foundation" },
];

const HOW_IT_WORKS = [
  {
    icon: <CloudLightning className="w-6 h-6 text-amber-400" />,
    title: "Storm Detected",
    desc: "ProLnk monitors NOAA's real-time alert feed 24/7. The moment a severe weather event is issued for any active service area, the Storm Agent activates.",
  },
  {
    icon: <Home className="w-6 h-6 text-amber-400" />,
    title: "AI Matches to Documented Homes",
    desc: "The system cross-references affected zip codes against the Home Health Vault — surfacing properties with documented roofing, drainage, or structural vulnerabilities.",
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: "Partners Get Instant Lead Alerts",
    desc: "ProLnk partners in the affected area receive emergency lead notifications within minutes — ranked by urgency, pre-qualified, and ready to act.",
  },
];

function StormOpportunityCard({ opp }: { opp: StormOpportunity }) {
  const [expressed, setExpressed] = useState(false);
  return (
    <div className="bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
            {opp.icon}
          </div>
          <p className="text-sm font-bold text-white leading-tight">{opp.type}</p>
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0 uppercase tracking-wide ${URGENCY_BADGE[opp.urgency]}`}>
          {opp.urgency}
        </span>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed mb-4">{opp.description}</p>
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-4">
          <div>
            <p className="text-lg font-bold text-white">{opp.estimatedJobs}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">est. jobs</p>
          </div>
          <div>
            <p className="text-lg font-bold text-amber-400">{opp.avgJobValue}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">avg value</p>
          </div>
        </div>
        <button
          onClick={() => setExpressed(true)}
          disabled={expressed}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all flex-shrink-0 ${
            expressed
              ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
              : "bg-amber-500 hover:bg-amber-400 text-black"
          }`}
        >
          {expressed ? <><CheckCircle2 className="w-3.5 h-3.5" /> Interested</> : "Express Interest"}
        </button>
      </div>
    </div>
  );
}

function DFWWeatherWidget() {
  const { data, loading } = useDFWWeather();

  if (loading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-10 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-48 mb-3" />
        <div className="flex gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-1 bg-white/10 rounded-xl h-20" />
          ))}
        </div>
      </div>
    );
  }

  const hours = data?.forecast?.slice(0, 8) ?? [];
  const liveAlerts = data?.alerts ?? [];

  if (hours.length === 0 && liveAlerts.length === 0) return null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-10">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">Current DFW Weather — Live</p>
        <span className="text-xs text-gray-500">Powered by Tomorrow.io</span>
      </div>

      {liveAlerts.length > 0 && (
        <div className="space-y-2 mb-4">
          {liveAlerts.map((a, i) => (
            <div key={i} className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span className="text-xs font-semibold text-red-300">{a.type}</span>
              <span className="text-xs text-gray-400">· {a.location}</span>
            </div>
          ))}
        </div>
      )}

      {hours.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {hours.map((h, i) => {
            const label = new Date(h.time).toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
            return (
              <div key={i} className="flex-shrink-0 flex flex-col items-center gap-1 bg-white/5 rounded-xl px-3 py-3 min-w-[64px]">
                <span className="text-[10px] text-gray-400 font-medium">{label}</span>
                <div className="flex items-center gap-0.5">
                  <Thermometer className="w-3 h-3 text-amber-400" />
                  <span className="text-sm font-bold text-white">{h.temp}°</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <Droplets className="w-3 h-3 text-blue-400" />
                  <span className="text-[10px] text-gray-400">{h.precipitationProbability}%</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <Wind className="w-3 h-3 text-gray-400" />
                  <span className="text-[10px] text-gray-400">{h.windSpeed}mph</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function StormAlert() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      <style>{`
        @keyframes flash-border {
          0%, 100% { border-color: rgba(239,68,68,0.6); box-shadow: 0 0 0 0 rgba(239,68,68,0); }
          50% { border-color: rgba(239,68,68,1); box-shadow: 0 0 10px 2px rgba(239,68,68,0.25); }
        }
        .flash-red { animation: flash-border 1.6s ease-in-out infinite; }
      `}</style>
      {/* Nav bar */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <button onClick={() => navigate("/")} className="text-lg font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
          ProLnk
        </button>
        <button
          onClick={() => navigate("/apply")}
          className="text-sm font-medium px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black transition-colors"
        >
          Apply as a Pro
        </button>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30">
            <CloudLightning className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Live Monitoring</span>
            <h1 className="text-3xl font-bold leading-tight">Storm Watch — DFW Active Alerts</h1>
          </div>
        </div>

        <p className="text-gray-400 text-base leading-relaxed max-w-2xl mb-10">
          ProLnk monitors NOAA severe weather data in real time across all active service territories. When storms hit, our AI instantly surfaces affected homes and routes emergency leads to approved service professionals — so pros can respond in minutes, not days.
        </p>

        {/* Live Tomorrow.io weather widget */}
        <DFWWeatherWidget />

        {/* Active alerts */}
        <div className="space-y-3 mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Current NOAA Alerts — Texas</p>
          {ACTIVE_ALERTS.map((alert, i) => (
            <div
              key={i}
              className={`flex items-start justify-between gap-4 bg-white/5 border rounded-xl px-5 py-4 transition-colors ${
                alert.severity === "Extreme" ? "flash-red" : `border ${SEVERITY_BORDER[alert.severity] ?? "border-white/10"}`
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 animate-pulse ${alert.severity === "Extreme" ? "bg-red-500" : "bg-amber-400"}`} />
                <div>
                  <p className="text-sm font-semibold text-white">{alert.type}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{alert.area} · {alert.issued}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${SEVERITY_BADGE[alert.severity] ?? "bg-gray-600 text-white"}`}>
                {alert.severity}
              </span>
            </div>
          ))}
          <p className="text-xs text-gray-600 pt-1">Sample data for illustration. Live alerts sourced from <span className="text-gray-500">api.weather.gov</span>.</p>
        </div>

        {/* Storm Lead Opportunity Cards */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Storm Lead Opportunities — Active Window</p>
            <span className="text-xs text-amber-400 font-medium">4 opportunity types detected</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STORM_OPPORTUNITIES.map((opp, i) => (
              <StormOpportunityCard key={i} opp={opp} />
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-3">Job estimates are AI projections based on storm severity and affected property count. Actual volume may vary.</p>
        </div>

        {/* Historical Storm Stats */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-4 h-4 text-gray-500" />
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Recent Storm Events — Lead History</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {HISTORICAL_STORMS.map((storm, i) => (
              <div key={i} className={`flex items-center justify-between px-5 py-4 gap-4 ${i < HISTORICAL_STORMS.length - 1 ? "border-b border-white/5" : ""}`}>
                <div>
                  <p className="text-sm font-semibold text-white">{storm.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{storm.date} · {storm.trades}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-amber-400">{storm.leads.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">leads generated</p>
                </div>
              </div>
            ))}
            <div className="px-5 py-3 bg-white/5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-400">Last 3 storms generated a combined <span className="text-white font-semibold">855 leads</span> across DFW</span>
              <span className="text-xs text-amber-400 font-medium">avg $2,720 per job</span>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16">
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-base font-bold text-white">Are you a service professional?</p>
              <p className="text-sm text-gray-300 mt-0.5">Apply to ProLnk and get instant leads the moment storms hit your area. First 500 spots only.</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/apply")}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-colors flex-shrink-0 whitespace-nowrap"
          >
            Apply to ProLnk →
          </button>
        </div>

        {/* How It Works */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6">How It Works</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 rounded-full w-5 h-5 flex items-center justify-center">{i + 1}</span>
                  <p className="text-sm font-bold text-white">{step.title}</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Lead Auto-Generation section */}
        <div className="mt-16 mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-red-400">For Service Pros</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
            Every storm is a lead queue.<br />
            <span className="text-amber-400">ProLnk fills it automatically.</span>
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-xl">
            HVAC and roofing pros get first crack at storm-damaged properties through the AI lead system — ranked by urgency, pre-qualified, and delivered to your phone before you finish your morning coffee.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {PRO_BENEFITS.map((benefit, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <p className="text-sm font-bold text-white mb-1.5">{benefit.title}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Pro sign-up CTA */}
          <div className="bg-gradient-to-r from-red-500/15 via-amber-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-base font-bold text-white">Don't wait for the next storm to cost you jobs.</p>
              <p className="text-sm text-gray-300 mt-1">Join ProLnk's founding network — 72% commission keep, instant storm leads, 4-level network income. <span className="text-amber-400 font-semibold">First 500 partners only.</span></p>
            </div>
            <button
              onClick={() => navigate("/apply")}
              className="px-7 py-3.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-sm transition-colors flex-shrink-0 whitespace-nowrap shadow-lg shadow-red-500/20"
            >
              Sign Up as a Pro →
            </button>
          </div>
        </div>

        {/* Notification Preferences CTA */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-start gap-3">
            <Settings className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-white">Already a ProLnk partner?</p>
              <p className="text-xs text-gray-400 mt-0.5">Manage your storm alert preferences — SMS, email, and quiet hours in your notification settings.</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/dashboard/notification-preferences")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors flex-shrink-0 whitespace-nowrap"
          >
            <Bell className="w-3.5 h-3.5" />
            Notification Settings
          </button>
        </div>

        {/* Footer CTA */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">ProLnk — Storm-responsive home service network</p>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-sm text-gray-400 hover:text-white transition-colors">Home</button>
            <button
              onClick={() => navigate("/apply")}
              className="text-sm font-medium px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
            >
              Apply as a Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
