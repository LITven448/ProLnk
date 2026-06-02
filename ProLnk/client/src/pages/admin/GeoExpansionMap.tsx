import React from 'react';
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  MapPin, Users, Home, Zap, AlertTriangle,
  CheckCircle, Clock, TrendingUp, Plus,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

type MarketStatus = "Active" | "Ready to Launch" | "Needs Pros";

interface CityMarket {
  city: string;
  proCount: number;
  homeownerCount: number;
  coveragePct: number;
  status: MarketStatus;
  topTrade: string;
  demand: number;
}

const CITIES: CityMarket[] = [
  { city: "Dallas",      proCount: 87,  homeownerCount: 612, coveragePct: 92, status: "Active",           topTrade: "HVAC",       demand: 98 },
  { city: "Fort Worth",  proCount: 61,  homeownerCount: 431, coveragePct: 88, status: "Active",           topTrade: "Plumbing",   demand: 91 },
  { city: "Plano",       proCount: 44,  homeownerCount: 298, coveragePct: 79, status: "Active",           topTrade: "Electrical", demand: 85 },
  { city: "Frisco",      proCount: 28,  homeownerCount: 241, coveragePct: 68, status: "Ready to Launch",  topTrade: "HVAC",       demand: 82 },
  { city: "McKinney",    proCount: 19,  homeownerCount: 196, coveragePct: 55, status: "Ready to Launch",  topTrade: "Roofing",    demand: 79 },
  { city: "Allen",       proCount: 12,  homeownerCount: 164, coveragePct: 42, status: "Needs Pros",       topTrade: "HVAC",       demand: 74 },
  { city: "Denton",      proCount: 8,   homeownerCount: 147, coveragePct: 31, status: "Needs Pros",       topTrade: "Plumbing",   demand: 70 },
  { city: "Irving",      proCount: 22,  homeownerCount: 183, coveragePct: 61, status: "Ready to Launch",  topTrade: "Electrical", demand: 77 },
  { city: "Arlington",   proCount: 34,  homeownerCount: 259, coveragePct: 73, status: "Active",           topTrade: "HVAC",       demand: 80 },
  { city: "Garland",     proCount: 6,   homeownerCount: 129, coveragePct: 24, status: "Needs Pros",       topTrade: "Roofing",    demand: 66 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<MarketStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  "Active":           { label: "Active",           color: "#34d399", bg: "#34d39920", icon: CheckCircle },
  "Ready to Launch":  { label: "Ready to Launch",  color: "#60a5fa", bg: "#60a5fa20", icon: Clock },
  "Needs Pros":       { label: "Needs Pros",        color: "#f59e0b", bg: "#f59e0b20", icon: AlertTriangle },
};

// Sort by demand gap (homeowners with fewer pros = higher priority)
const PRIORITY_LIST = [...CITIES]
  .filter((c) => c.status !== "Active")
  .sort((a, b) => (b.homeownerCount / (b.proCount || 1)) - (a.homeownerCount / (a.proCount || 1)));

// ─── Sub-components ───────────────────────────────────────────────────────────

interface CityCardProps {
  city: CityMarket;
}

function CityCard({ city }: CityCardProps) {
  const cfg = STATUS_CONFIG[city.status];
  const StatusIcon = cfg.icon;
  const ratio = city.proCount ? (city.homeownerCount / city.proCount).toFixed(1) : "∞";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-teal-700 flex-shrink-0" />
          <span className="font-semibold text-gray-900">{city.city}</span>
        </div>
        <span
          className="flex items-center gap-1 text-xs px-2 py-1 rounded-full font-semibold"
          style={{ color: cfg.color, background: cfg.bg }}
        >
          <StatusIcon className="w-3 h-3" />
          {cfg.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-100/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Users className="w-3 h-3 text-teal-700" />
            <span className="text-xs text-gray-500">Pros</span>
          </div>
          <span className="text-xl font-bold text-gray-900">{city.proCount}</span>
        </div>
        <div className="bg-gray-100/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Home className="w-3 h-3 text-blue-400" />
            <span className="text-xs text-gray-500">Homeowners</span>
          </div>
          <span className="text-xl font-bold text-gray-900">{city.homeownerCount}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">Coverage</span>
          <span className="font-semibold text-gray-900">{city.coveragePct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${city.coveragePct}%`,
              background: city.coveragePct >= 75 ? "#34d399" : city.coveragePct >= 50 ? "#60a5fa" : "#f59e0b",
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Top trade: <span className="text-gray-700">{city.topTrade}</span></span>
          <span>{ratio} HOs/pro</span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GeoExpansionMap() {
  const [filter, setFilter] = useState<"All" | MarketStatus>("All");

  const filtered = filter === "All" ? CITIES : CITIES.filter((c) => c.status === filter);

  const totalPros = CITIES.reduce((s, c) => s + c.proCount, 0);
  const totalHOs  = CITIES.reduce((s, c) => s + c.homeownerCount, 0);
  const activeCount = CITIES.filter((c) => c.status === "Active").length;
  const needsProCount = CITIES.filter((c) => c.status === "Needs Pros").length;

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#F8FAFC] p-6 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-teal-700" />
              Geo Expansion Map
            </h1>
            <p className="text-gray-500 mt-1 text-sm">Market readiness across DFW — 10 cities tracked</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-gray-900 text-sm font-semibold transition-colors">
            <Plus className="w-4 h-4" />
            Launch New Market
          </button>
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Pros",          value: totalPros.toString(),   icon: Users,        color: "#2dd4bf" },
            { label: "Total Homeowners",    value: totalHOs.toString(),    icon: Home,         color: "#60a5fa" },
            { label: "Active Markets",      value: `${activeCount}/10`,    icon: CheckCircle,  color: "#34d399" },
            { label: "Markets Need Pros",   value: needsProCount.toString(), icon: AlertTriangle, color: "#f59e0b" },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">{k.label}</span>
                <k.icon className="w-4 h-4" style={{ color: k.color }} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{k.value}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Show:</span>
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            {(["All", "Active", "Ready to Launch", "Needs Pros"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filter === f ? "bg-teal-500 text-gray-900" : "bg-white text-gray-500 hover:bg-gray-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* City Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((city) => (
            <CityCard key={city.city} city={city} />
          ))}
        </div>

        {/* Priority List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-gray-900 font-semibold text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-700" />
              Priority: High Demand, Low Supply
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Cities with the most homeowner demand relative to pro count</p>
          </div>
          <div className="divide-y divide-gray-200/50">
            {PRIORITY_LIST.map((city, i) => {
              const cfg = STATUS_CONFIG[city.status];
              const StatusIcon = cfg.icon;
              const gap = city.homeownerCount - city.proCount * 5;
              return (
                <div key={city.city} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                  <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-700 flex-shrink-0">
                    {i + 1}
                  </span>
                  <MapPin className="w-4 h-4 text-teal-700 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{city.city}</span>
                      <span
                        className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full"
                        style={{ color: cfg.color, background: cfg.bg }}
                      >
                        <StatusIcon className="w-2.5 h-2.5" />
                        {cfg.label}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {city.homeownerCount} homeowners · only {city.proCount} pros · {city.topTrade} demand
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-amber-700">+{Math.max(0, gap)} gap</div>
                    <div className="text-xs text-gray-500">demand vs supply</div>
                  </div>
                  <button className="ml-2 text-xs px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-700 hover:bg-teal-500/30 font-semibold transition-colors whitespace-nowrap">
                    Recruit Pros
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
