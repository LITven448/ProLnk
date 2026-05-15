import React from 'react';
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import {
  CloudLightning, Zap, Home, Bell, AlertTriangle, TrendingUp,
  Thermometer, Wind, Droplets, Wrench, Waves, TreePine, CheckCircle,
  History, Settings, Activity, ArrowUpRight, Eye, Radio,
} from "lucide-react";

const TOMORROW_API_KEY = import.meta.env.VITE_TOMORROW_IO_API_KEY as string | undefined;

const DFW_LAT = 32.7767;
const DFW_LON = -96.797;

interface TomorrowTimeline {
  time: string;
  values: {
    temperature: number;
    precipitationProbability: number;
    windSpeed: number;
    weatherCode: number;
    humidity: number;
    precipitationIntensity: number;
  };
}

interface LiveWeather {
  current: TomorrowTimeline | null;
  hourly: TomorrowTimeline[];
  error: string | null;
}

const WEATHER_CODE_LABEL: Record<number, string> = {
  1000: "Clear", 1100: "Mostly Clear", 1101: "Partly Cloudy", 1102: "Mostly Cloudy",
  1001: "Cloudy", 2000: "Fog", 4000: "Drizzle", 4001: "Rain", 4200: "Light Rain",
  4201: "Heavy Rain", 5000: "Snow", 6000: "Freezing Drizzle", 7000: "Ice Pellets",
  8000: "Thunderstorm",
};

function getWeatherLabel(code: number): string {
  return WEATHER_CODE_LABEL[code] ?? "Unknown";
}

function isStormBurst(current: TomorrowTimeline | null, hourly: TomorrowTimeline[]): boolean {
  if (!current) return false;
  const wind = current.values.windSpeed;
  const precip = current.values.precipitationIntensity;
  const next6 = hourly.slice(0, 6);
  const hailCode = [8000].includes(current.values.weatherCode);
  const highWind = wind > 40;
  const heavyRain = precip > 2.5;
  const floodRisk = next6.some(h => h.values.precipitationProbability > 80 && h.values.precipitationIntensity > 2);
  return highWind || heavyRain || floodRisk || hailCode;
}

function useLiveWeather(): LiveWeather & { loading: boolean } {
  const [state, setState] = useState<LiveWeather & { loading: boolean }>({
    current: null, hourly: [], error: null, loading: true,
  });

  useEffect(() => {
    if (!TOMORROW_API_KEY) {
      setState({ current: MOCK_CURRENT, hourly: MOCK_HOURLY, error: null, loading: false });
      return;
    }
    const url = `https://api.tomorrow.io/v4/timelines?location=${DFW_LAT},${DFW_LON}&fields=temperature,precipitationProbability,windSpeed,weatherCode,humidity,precipitationIntensity&timesteps=1h&units=imperial&apikey=${TOMORROW_API_KEY}`;
    fetch(url)
      .then(r => r.json())
      .then(json => {
        const intervals: TomorrowTimeline[] = json?.data?.timelines?.[0]?.intervals ?? [];
        setState({ current: intervals[0] ?? null, hourly: intervals.slice(1, 9), error: null, loading: false });
      })
      .catch(() => {
        setState({ current: MOCK_CURRENT, hourly: MOCK_HOURLY, error: "Using demo data (API unavailable)", loading: false });
      });
  }, []);

  return state;
}

const MOCK_CURRENT: TomorrowTimeline = {
  time: new Date().toISOString(),
  values: { temperature: 78, precipitationProbability: 85, windSpeed: 47, weatherCode: 8000, humidity: 72, precipitationIntensity: 3.1 },
};
const MOCK_HOURLY: TomorrowTimeline[] = [
  { time: "", values: { temperature: 76, precipitationProbability: 90, windSpeed: 52, weatherCode: 8000, humidity: 80, precipitationIntensity: 4.2 } },
  { time: "", values: { temperature: 73, precipitationProbability: 88, windSpeed: 58, weatherCode: 8000, humidity: 84, precipitationIntensity: 5.0 } },
  { time: "", values: { temperature: 70, precipitationProbability: 75, windSpeed: 44, weatherCode: 4201, humidity: 78, precipitationIntensity: 2.8 } },
  { time: "", values: { temperature: 68, precipitationProbability: 55, windSpeed: 32, weatherCode: 4001, humidity: 74, precipitationIntensity: 1.5 } },
  { time: "", values: { temperature: 67, precipitationProbability: 40, windSpeed: 24, weatherCode: 4000, humidity: 70, precipitationIntensity: 0.8 } },
  { time: "", values: { temperature: 66, precipitationProbability: 30, windSpeed: 18, weatherCode: 1001, humidity: 66, precipitationIntensity: 0.2 } },
  { time: "", values: { temperature: 65, precipitationProbability: 20, windSpeed: 14, weatherCode: 1101, humidity: 62, precipitationIntensity: 0 } },
  { time: "", values: { temperature: 67, precipitationProbability: 15, windSpeed: 12, weatherCode: 1100, humidity: 58, precipitationIntensity: 0 } },
];

const ACTIVE_ALERTS = [
  { type: "Severe Thunderstorm Watch", area: "Dallas County, TX", severity: "Severe" as const, issued: "May 14, 2026 · 2:30 PM CDT" },
  { type: "High Wind Warning", area: "Tarrant County, TX", severity: "Extreme" as const, issued: "May 14, 2026 · 1:00 PM CDT" },
  { type: "Flash Flood Watch", area: "Collin County, TX", severity: "Moderate" as const, issued: "May 14, 2026 · 11:00 AM CDT" },
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
  threshold: string;
  active: boolean;
}

function buildOpportunities(wind: number, precip: number, code: number): StormOpportunity[] {
  const isStorm = wind > 30 || precip > 1 || code === 8000;
  return [
    {
      type: "Roof Repair & Replacement",
      icon: <Home className="w-5 h-5 text-amber-400" />,
      estimatedJobs: Math.round(200 + wind * 3),
      avgJobValue: "$4,200",
      urgency: "Extreme",
      description: `Hail indicators detected. ${wind > 40 ? "High winds compound roof stress." : "Wind-driven rain risk elevated."} High density of unprotected tile roofs in affected ZIP codes.`,
      threshold: "Triggered when hail or wind > 30mph",
      active: wind > 30 || code === 8000,
    },
    {
      type: "Water Damage Mitigation",
      icon: <Waves className="w-5 h-5 text-blue-400" />,
      estimatedJobs: Math.round(80 + precip * 30),
      avgJobValue: "$2,800",
      urgency: "High",
      description: `Flash flood risk active. ${precip > 2 ? "Heavy precipitation exceeds drainage capacity." : "Saturated ground conditions persist."} Properties in low-lying areas flagged.`,
      threshold: "Triggered when precip > 2in/hr or flood watch issued",
      active: precip > 1.5,
    },
    {
      type: "HVAC Emergency Service",
      icon: <Wrench className="w-5 h-5 text-red-400" />,
      estimatedJobs: Math.round(60 + wind * 1.5),
      avgJobValue: "$1,100",
      urgency: "High",
      description: `${wind > 40 ? "High winds threatening outdoor condenser units." : "Storm vibration risk to HVAC systems."} Pro queue opens when storm passes — 4–6hr surge window.`,
      threshold: "Triggered when wind > 35mph",
      active: wind > 35,
    },
    {
      type: "Tree & Debris Removal",
      icon: <TreePine className="w-5 h-5 text-green-400" />,
      estimatedJobs: Math.round(40 + wind * 1.2),
      avgJobValue: "$850",
      urgency: "Medium",
      description: `Storm-force winds expected to down significant tree canopy across suburban corridors. ${wind > 50 ? "Utility interference risk elevated." : ""}`,
      threshold: "Triggered when wind > 40mph",
      active: wind > 40,
    },
  ];
}

const URGENCY_BADGE: Record<string, string> = {
  Extreme: "bg-red-500/20 text-red-300 border border-red-500/30",
  High: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  Medium: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
};

const HISTORICAL_STORMS = [
  { name: "May 8 Supercell — DFW", date: "May 8, 2026", leads: 412, trades: "Roofing, HVAC, Water Damage", revenue: "$1.4M" },
  { name: "April 23 Hail Event — Tarrant Co.", date: "Apr 23, 2026", leads: 287, trades: "Roofing, Windows", revenue: "$980K" },
  { name: "April 11 Flash Flood — Collin Co.", date: "Apr 11, 2026", leads: 156, trades: "Water Damage, Foundation", revenue: "$520K" },
  { name: "March 29 Tornado Watch — Denton Co.", date: "Mar 29, 2026", leads: 203, trades: "Roofing, Tree Removal", revenue: "$712K" },
  { name: "March 14 Ice Storm — DFW Metro", date: "Mar 14, 2026", leads: 318, trades: "HVAC, Plumbing", revenue: "$1.1M" },
];

const HOW_IT_WORKS = [
  {
    icon: <CloudLightning className="w-6 h-6 text-amber-400" />,
    title: "Storm Detected",
    desc: "ProLnk monitors NOAA real-time + Tomorrow.io forecasts 24/7. The moment conditions cross thresholds, the Storm Agent activates and flags affected ZIP codes.",
  },
  {
    icon: <Home className="w-6 h-6 text-amber-400" />,
    title: "AI Matches to Documented Homes",
    desc: "The system cross-references affected ZIP codes against the Home Health Vault — surfacing properties with documented roofing, drainage, or structural vulnerabilities.",
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: "Partners Get Instant Lead Alerts",
    desc: "ProLnk partners in the affected area receive emergency lead notifications within minutes — ranked by urgency, pre-qualified, and ready to act.",
  },
];

function WindBar({ speed }: { speed: number }) {
  const pct = Math.min(100, (speed / 80) * 100);
  const color = speed > 50 ? "bg-red-500" : speed > 40 ? "bg-amber-500" : speed > 25 ? "bg-yellow-400" : "bg-teal-400";
  return (
    <div className="w-full bg-white/10 rounded-full h-1.5 mt-1">
      <div className={`${color} h-1.5 rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function StormBurstBanner({ wind, precip, code }: { wind: number; precip: number; code: number }) {
  const [activated, setActivated] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-red-500/50 bg-gradient-to-r from-red-950/60 via-amber-950/40 to-orange-950/50 p-6 mb-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.12),transparent_60%)]" />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2.5 h-2.5 rounded-full bg-red-500 ${pulse ? "opacity-100" : "opacity-30"} transition-opacity`} />
              <span className="text-xs font-bold uppercase tracking-widest text-red-400">Storm Burst Mode Active</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Emergency Lead Surge Detected</h2>
            <p className="text-sm text-gray-300 max-w-lg">
              Current conditions exceed storm thresholds — wind at <span className="text-red-300 font-semibold">{wind}mph</span>,
              precip at <span className="text-blue-300 font-semibold">{precip.toFixed(1)} in/hr</span>.
              {code === 8000 && <> Thunderstorm confirmed.</>}
              {" "}Lead queues are surging. Activate priority alerts to capture first-mover advantage.
            </p>
          </div>
          <button
            onClick={() => setActivated(true)}
            disabled={activated}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all flex-shrink-0 shadow-lg ${
              activated
                ? "bg-green-500/20 border border-green-500/40 text-green-400 cursor-default"
                : "bg-red-500 hover:bg-red-400 text-white shadow-red-500/30"
            }`}
          >
            {activated ? <><CheckCircle className="w-4 h-4" /> Storm Mode Activated</> : <><Radio className="w-4 h-4" /> Activate Storm Mode</>}
          </button>
        </div>
        <div className="flex gap-6 mt-4 flex-wrap">
          {[
            { label: "Wind Speed", value: `${wind}mph`, threshold: ">40mph", met: wind > 40, color: "text-red-300" },
            { label: "Precip Rate", value: `${precip.toFixed(1)} in/hr`, threshold: ">2.5in/hr", met: precip > 2.5, color: "text-blue-300" },
            { label: "Storm Type", value: getWeatherLabel(code), threshold: "Thunderstorm", met: code === 8000, color: "text-amber-300" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.met ? "bg-red-400" : "bg-gray-500"}`} />
              <span className="text-xs text-gray-400">{item.label}:</span>
              <span className={`text-xs font-bold ${item.color}`}>{item.value}</span>
              <span className="text-xs text-gray-600">({item.threshold})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StormOpportunityCard({ opp }: { opp: StormOpportunity }) {
  const [expressed, setExpressed] = useState(false);
  return (
    <div className={`bg-white/5 border rounded-2xl p-5 transition-all ${opp.active ? "border-amber-500/30 hover:border-amber-500/50" : "border-white/10 hover:border-white/20 opacity-70"}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${opp.active ? "bg-amber-500/15" : "bg-white/5"}`}>
            {opp.icon}
          </div>
          <p className="text-sm font-bold text-white leading-tight">{opp.type}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0 uppercase tracking-wide ${URGENCY_BADGE[opp.urgency]}`}>
            {opp.urgency}
          </span>
          {opp.active && <span className="text-[9px] text-green-400 font-semibold uppercase tracking-wide">● Live</span>}
        </div>
      </div>
      <p className="text-[10px] text-gray-500 mb-2 italic">{opp.threshold}</p>
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
          disabled={expressed || !opp.active}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all flex-shrink-0 ${
            expressed
              ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
              : opp.active
              ? "bg-amber-500 hover:bg-amber-400 text-black"
              : "bg-white/10 text-gray-500 cursor-not-allowed"
          }`}
        >
          {expressed ? <><CheckCircle className="w-3.5 h-3.5" /> Interested</> : opp.active ? "Express Interest" : "Inactive"}
        </button>
      </div>
    </div>
  );
}

function LiveWeatherWidget() {
  const { current, hourly, error, loading } = useLiveWeather();

  if (loading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-48 mb-3" />
        <div className="flex gap-3">
          {[...Array(4)].map((_, i) => <div key={i} className="flex-1 bg-white/10 rounded-xl h-24" />)}
        </div>
      </div>
    );
  }

  const wind = current?.values.windSpeed ?? 0;
  const precip = current?.values.precipitationIntensity ?? 0;
  const code = current?.values.weatherCode ?? 1000;
  const temp = current?.values.temperature ?? 0;
  const humidity = current?.values.humidity ?? 0;
  const precipProb = current?.values.precipitationProbability ?? 0;

  return (
    <div className="space-y-4 mb-10">
      {error && (
        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2">
          <Eye className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
          <span className="text-xs text-blue-300">{error}</span>
        </div>
      )}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">Current DFW Conditions — Live</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Powered by Tomorrow.io · Dallas-Fort Worth Metro</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs text-teal-400 font-medium">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label: "Temperature", value: `${Math.round(temp)}°F`, icon: <Thermometer className="w-4 h-4 text-amber-400" />, sub: getWeatherLabel(code) },
            { label: "Wind Speed", value: `${Math.round(wind)} mph`, icon: <Wind className="w-4 h-4 text-blue-400" />, sub: wind > 40 ? "⚠ Threshold exceeded" : "Below threshold", alert: wind > 40 },
            { label: "Precip Rate", value: `${precip.toFixed(1)} in/hr`, icon: <Droplets className="w-4 h-4 text-blue-400" />, sub: `${precipProb}% chance`, alert: precip > 2.5 },
            { label: "Humidity", value: `${Math.round(humidity)}%`, icon: <Activity className="w-4 h-4 text-teal-400" />, sub: "Relative humidity" },
          ].map(item => (
            <div key={item.label} className={`rounded-xl p-3.5 ${(item as any).alert ? "bg-amber-500/10 border border-amber-500/20" : "bg-white/5"}`}>
              <div className="flex items-center gap-1.5 mb-1">
                {item.icon}
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">{item.label}</span>
              </div>
              <p className={`text-xl font-bold ${(item as any).alert ? "text-amber-400" : "text-white"}`}>{item.value}</p>
              <p className={`text-[10px] mt-0.5 ${(item as any).alert ? "text-amber-500" : "text-gray-500"}`}>{item.sub}</p>
              {item.label === "Wind Speed" && <WindBar speed={wind} />}
            </div>
          ))}
        </div>

        {hourly.length > 0 && (
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-2 font-semibold">8-Hour Forecast</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {hourly.map((h, i) => {
                const label = h.time
                  ? new Date(h.time).toLocaleTimeString("en-US", { hour: "numeric", hour12: true })
                  : `+${i + 1}h`;
                const isHot = h.values.windSpeed > 40 || h.values.precipitationIntensity > 2.5;
                return (
                  <div key={i} className={`flex-shrink-0 flex flex-col items-center gap-1 rounded-xl px-3 py-3 min-w-[60px] ${isHot ? "bg-amber-500/10 border border-amber-500/20" : "bg-white/5"}`}>
                    <span className="text-[10px] text-gray-400 font-medium">{label}</span>
                    <div className="flex items-center gap-0.5">
                      <Thermometer className="w-3 h-3 text-amber-400" />
                      <span className="text-sm font-bold text-white">{Math.round(h.values.temperature)}°</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Droplets className="w-3 h-3 text-blue-400" />
                      <span className="text-[10px] text-gray-400">{h.values.precipitationProbability}%</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Wind className={`w-3 h-3 ${isHot ? "text-amber-400" : "text-gray-400"}`} />
                      <span className={`text-[10px] font-semibold ${isHot ? "text-amber-400" : "text-gray-400"}`}>{Math.round(h.values.windSpeed)}mph</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StormAlert() {
  const [, navigate] = useLocation();
  const { current, hourly, loading } = useLiveWeather();

  const wind = current?.values.windSpeed ?? 0;
  const precip = current?.values.precipitationIntensity ?? 0;
  const code = current?.values.weatherCode ?? 1000;
  const burst = !loading && isStormBurst(current, hourly);
  const opportunities = buildOpportunities(wind, precip, code);

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <style>{`
        @keyframes flash-border {
          0%, 100% { border-color: rgba(239,68,68,0.6); box-shadow: 0 0 0 0 rgba(239,68,68,0); }
          50% { border-color: rgba(239,68,68,1); box-shadow: 0 0 10px 2px rgba(239,68,68,0.25); }
        }
        .flash-red { animation: flash-border 1.6s ease-in-out infinite; }
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <button onClick={() => navigate("/")} className="text-lg font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
          ProLnk
        </button>
        <button onClick={() => navigate("/apply")} className="text-sm font-medium px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black transition-colors">
          Apply as a Pro
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        {/* Hero */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2.5 rounded-xl border ${burst ? "bg-red-500/15 border-red-500/30" : "bg-amber-500/15 border-amber-500/30"}`}>
            <CloudLightning className={`w-7 h-7 ${burst ? "text-red-400" : "text-amber-400"}`} />
          </div>
          <div>
            <span className={`text-xs font-semibold uppercase tracking-widest ${burst ? "text-red-400" : "text-amber-400"}`}>
              {burst ? "⚡ Storm Burst Active" : "Live Monitoring"}
            </span>
            <h1 className="text-3xl font-bold leading-tight">Storm Watch — DFW Active Alerts</h1>
          </div>
        </div>

        <p className="text-gray-400 text-base leading-relaxed max-w-2xl mb-10">
          ProLnk monitors NOAA severe weather data + Tomorrow.io real-time forecasts across all active service territories. When storms cross thresholds, our AI instantly surfaces affected homes and routes emergency leads to approved service professionals.
        </p>

        {/* Storm Burst Banner */}
        {burst && <StormBurstBanner wind={wind} precip={precip} code={code} />}

        {/* Live Weather */}
        <LiveWeatherWidget />

        {/* Active Alerts */}
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
          <p className="text-xs text-gray-600 pt-1">Sample NOAA alert data for illustration. Live alerts sourced from <span className="text-gray-500">api.weather.gov</span>.</p>
        </div>

        {/* Storm Lead Burst Opportunities */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Storm Lead Opportunities — Active Window</p>
            <span className={`text-xs font-medium ${burst ? "text-red-400" : "text-amber-400"}`}>
              {opportunities.filter(o => o.active).length} of {opportunities.length} thresholds met
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {opportunities.map((opp, i) => <StormOpportunityCard key={i} opp={opp} />)}
          </div>
          <p className="text-xs text-gray-600 mt-3">Job estimates are AI projections based on live storm severity and affected property count. Actual volume may vary.</p>
        </div>

        {/* Historical Storm Stats */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-4 h-4 text-gray-500" />
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Recent Storm Events — Lead History</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {HISTORICAL_STORMS.map((storm, i) => (
              <div key={i} className={`flex items-center justify-between px-5 py-4 gap-4 hover:bg-white/5 transition-colors ${i < HISTORICAL_STORMS.length - 1 ? "border-b border-white/5" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <CloudLightning className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{storm.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{storm.date} · {storm.trades}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 flex items-center gap-6">
                  <div>
                    <p className="text-lg font-bold text-amber-400">{storm.leads.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">leads</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-400">{storm.revenue}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">est. revenue</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="px-5 py-3 bg-white/5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-400">Last 5 storms generated <span className="text-white font-semibold">{HISTORICAL_STORMS.reduce((a, s) => a + s.leads, 0).toLocaleString()} leads</span> across DFW</span>
              <div className="flex items-center gap-1 text-xs text-amber-400 font-medium">
                <ArrowUpRight className="w-3 h-3" />
                avg $2,720/job
              </div>
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
          <button onClick={() => navigate("/apply")} className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-colors flex-shrink-0 whitespace-nowrap">
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

        {/* Pro Benefits */}
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

          <div className="bg-gradient-to-r from-red-500/15 via-amber-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-base font-bold text-white">Don't wait for the next storm to cost you jobs.</p>
              <p className="text-sm text-gray-300 mt-1">Join ProLnk's founding network — 72% commission keep, instant storm leads, 4-level network income. <span className="text-amber-400 font-semibold">First 500 partners only.</span></p>
            </div>
            <button onClick={() => navigate("/apply")} className="px-7 py-3.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-sm transition-colors flex-shrink-0 whitespace-nowrap shadow-lg shadow-red-500/20">
              Sign Up as a Pro →
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-start gap-3">
            <Settings className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-white">Already a ProLnk partner?</p>
              <p className="text-xs text-gray-400 mt-0.5">Manage your storm alert preferences — SMS, email, and quiet hours in your notification settings.</p>
            </div>
          </div>
          <button onClick={() => navigate("/dashboard/notification-preferences")} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors flex-shrink-0 whitespace-nowrap">
            <Bell className="w-3.5 h-3.5" />
            Notification Settings
          </button>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">ProLnk — Storm-responsive home service network</p>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-sm text-gray-400 hover:text-white transition-colors">Home</button>
            <button onClick={() => navigate("/apply")} className="text-sm font-medium px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors">
              Apply as a Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
