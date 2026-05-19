import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import {
  TrendingUp, AlertTriangle, DollarSign, Users, Zap, Newspaper,
  ChevronRight, ArrowUpRight, MapPin, Star, BarChart2, Thermometer,
} from "lucide-react";
import { Link } from "wouter";

interface NewsItem {
  title: string;
  summary: string;
  tag: string;
  tagColor: string;
  date: string;
}

interface AlertCard {
  icon: typeof TrendingUp;
  iconColor: string;
  bg: string;
  border: string;
  title: string;
  detail: string;
}

interface TradeDemand {
  trade: string;
  leads: number;
  isYours: boolean;
}

const ALERTS: AlertCard[] = [
  {
    icon: TrendingUp,
    iconColor: "text-teal-400",
    bg: "bg-teal-900/20",
    border: "border-teal-700/30",
    title: "HVAC demand up 34% in ZIP 75034 this week",
    detail: "Storm prep season starting — homeowners scheduling pre-season tune-ups early.",
  },
  {
    icon: AlertTriangle,
    iconColor: "text-amber-400",
    bg: "bg-amber-900/20",
    border: "border-amber-700/30",
    title: "3 new competitors joined DFW HVAC this month",
    detail: "Pricing pressure watch — monitor your close rate and consider adding a free diagnostic offer.",
  },
  {
    icon: DollarSign,
    iconColor: "text-emerald-400",
    bg: "bg-emerald-900/20",
    border: "border-emerald-700/30",
    title: "Homeowner avg budget for HVAC in ZIP 75034: $4,200",
    detail: "Up 8% YoY — homeowners are spending more; your premium pricing is well-positioned.",
  },
];

const TRADE_DEMAND: TradeDemand[] = [
  { trade: "HVAC", leads: 127, isYours: true },
  { trade: "Plumbing", leads: 98, isYours: false },
  { trade: "Roofing", leads: 84, isYours: false },
  { trade: "Electrical", leads: 72, isYours: false },
  { trade: "Painting", leads: 61, isYours: false },
  { trade: "Landscaping", leads: 55, isYours: false },
  { trade: "General", leads: 43, isYours: false },
];

const NEWS: NewsItem[] = [
  {
    title: "Texas Energy Code update requires higher-efficiency HVAC for new builds",
    summary: "Effective Sept 2026, all new residential HVAC installs must meet SEER2 15.2 minimum. Existing replacements follow standard rules.",
    tag: "Regulation",
    tagColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    date: "May 13",
  },
  {
    title: "NOAA forecasts hotter-than-normal summer for DFW through August",
    summary: "Temperatures expected to average 2–4°F above seasonal norms. Pre-season maintenance demand expected to spike in late May.",
    tag: "Weather",
    tagColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    date: "May 12",
  },
  {
    title: "New AC efficiency standards take effect Jan 2027 — plan your inventory now",
    summary: "R-22 systems will require authorized handling. R-410A units become restricted. R-32 and R-454B systems are the transition targets.",
    tag: "Standards",
    tagColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    date: "May 10",
  },
  {
    title: "Federal tax credits for heat pumps extended through 2032",
    summary: "Homeowners can claim up to $2,000 for qualifying heat pump installs. Great upsell conversation starter for replacement jobs.",
    tag: "Tax Credits",
    tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    date: "May 8",
  },
];

export default function MarketIntelligenceFeed() {
  const [activeTrade, setActiveTrade] = useState("HVAC");

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-sm mb-2">
              <BarChart2 className="w-4 h-4" />
              <span>Partner Dashboard — Market Intelligence</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Market Intelligence</h1>
            <p className="text-slate-400 mt-1">What's happening in your market right now</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400">DFW — ZIP 75034</span>
            <span className="text-xs bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full">Live</span>
          </div>
        </div>

        {/* Today's Highlights */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-teal-400" />
            Today's Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ALERTS.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className={`rounded-xl border ${a.border} ${a.bg} p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${a.iconColor}`} />
                    <span className={`text-xs font-semibold ${a.iconColor}`}>Alert</span>
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">{a.title}</p>
                  <p className="text-xs text-slate-400">{a.detail}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Competitor Intelligence */}
        <div className="rounded-2xl bg-[#111D35] border border-slate-700/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Competitor Intelligence — HVAC in ZIP 75034
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {[
              { label: "Competitors in Area", value: "8", color: "text-orange-400" },
              { label: "Their Avg Rate", value: "$142/hr", color: "text-slate-200" },
              { label: "Your Rate", value: "$155/hr", color: "text-teal-400" },
              { label: "Your Premium", value: "+9%", color: "text-emerald-400" },
            ].map((m) => (
              <div key={m.label} className="bg-slate-800/40 rounded-xl p-4 text-center">
                <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
                <p className="text-xs text-slate-400 mt-1">{m.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 p-3 bg-emerald-900/20 border border-emerald-700/30 rounded-xl">
            <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <p className="text-sm text-slate-200">
              Your rating <strong className="text-white">4.8</strong> vs. area average{" "}
              <strong className="text-slate-300">4.4</strong>.{" "}
              <span className="text-emerald-300">Your premium is justified — keep collecting reviews.</span>
            </p>
          </div>
        </div>

        {/* Lead Demand by Trade */}
        <div className="rounded-2xl bg-[#111D35] border border-slate-700/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            Lead Demand by Trade — This Month
          </h2>
          <p className="text-xs text-slate-400 mb-4">Leads available in your DFW service area</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={TRADE_DEMAND} layout="vertical" margin={{ left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis type="category" dataKey="trade" tick={{ fill: "#94a3b8", fontSize: 12 }} width={75} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                formatter={(v: number) => [`${v} leads`, "Volume"]}
              />
              <Bar dataKey="leads" radius={[0, 4, 4, 0]}>
                {TRADE_DEMAND.map((entry) => (
                  <Cell
                    key={entry.trade}
                    fill={entry.isYours ? "#14b8a6" : "#334155"}
                    fillOpacity={entry.isYours ? 1 : 0.6}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-400 mt-2 text-center">
            <span className="inline-block w-3 h-3 rounded-sm bg-teal-500 mr-1 align-middle" />
            Highlighted = your trade (HVAC)
          </p>
        </div>

        {/* Seasonal Trends */}
        <div className="rounded-2xl bg-[#111D35] border border-slate-700/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-orange-400" />
            Seasonal Trends
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              { label: "Historical May avg", value: "127", sub: "HVAC leads in ZIP", color: "text-teal-400" },
              { label: "April actuals", value: "89", sub: "HVAC leads", color: "text-slate-300" },
              { label: "Expected increase", value: "+43%", sub: "vs. last month", color: "text-emerald-400" },
            ].map((s) => (
              <div key={s.label} className="bg-slate-800/40 rounded-xl p-4 text-center">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="p-3 bg-teal-900/20 border border-teal-700/30 rounded-xl">
            <p className="text-sm text-teal-200">
              May historically = <strong>127 HVAC leads</strong> in your ZIP.
              April had 89. Expect <strong>43% more leads</strong> this month — make sure your availability calendar is open.
            </p>
          </div>
        </div>

        {/* News Feed */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-slate-400" />
            Industry News
          </h2>
          <div className="space-y-3">
            {NEWS.map((n, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#111D35] border border-slate-700/50 hover:border-slate-600 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-xs border px-2 py-0.5 rounded-full ${n.tagColor}`}>{n.tag}</span>
                    <span className="text-xs text-slate-500">{n.date}</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{n.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{n.summary}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </div>

        {/* Rate Adjustment CTA */}
        <div className="rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-600/50 p-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-semibold text-white">Your rates vs. market</p>
            <p className="text-xs text-slate-400 mt-0.5">You charge $155/hr — 9% above the DFW average. Consider your positioning.</p>
          </div>
          <Link href="/partner/settings">
            <a className="flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
              Adjust my rates
              <ChevronRight className="w-4 h-4" />
            </a>
          </Link>
        </div>

      </div>
    </div>
  );
}
