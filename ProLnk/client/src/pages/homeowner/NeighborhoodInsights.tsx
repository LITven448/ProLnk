import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin, TrendingUp, Home, AlertTriangle, Calendar,
  Zap, Share2, ChevronRight, DollarSign, Users,
  Wrench, Flame, Bell
} from "lucide-react";
import { Link } from "wouter";

const NEARBY_JOBS = [
  { desc: "Roof replacement", street: "Oak Creek Dr", dist: "0.3mi", trade: "Roofing", priceRange: "$8,200–$11,400", daysAgo: 1 },
  { desc: "HVAC emergency repair", street: "Clearwater Blvd", dist: "0.7mi", trade: "HVAC", priceRange: "$650–$900", daysAgo: 2 },
  { desc: "Foundation pier installation", street: "Maple Ridge Ln", dist: "1.1mi", trade: "Foundation", priceRange: "$4,500–$7,000", daysAgo: 3 },
  { desc: "Full plumbing repipe", street: "Lakeside Crossing", dist: "1.4mi", trade: "Plumbing", priceRange: "$3,200–$5,100", daysAgo: 4 },
  { desc: "Main panel upgrade", street: "Fairview Dr", dist: "1.8mi", trade: "Electrical", priceRange: "$2,800–$4,000", daysAgo: 5 },
];

const TRENDING = [
  { trade: "HVAC", count: 47 },
  { trade: "Plumbing", count: 31 },
  { trade: "Roofing", count: 28 },
  { trade: "Pest Control", count: 22 },
  { trade: "Foundation", count: 14 },
  { trade: "Electrical", count: 11 },
];

const TRADE_COLORS: Record<string, string> = {
  HVAC: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Plumbing: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Roofing: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Foundation: "bg-red-500/20 text-red-300 border-red-500/30",
  Electrical: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "Pest Control": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

function tradeBadge(trade: string) {
  const cls = TRADE_COLORS[trade] ?? "bg-slate-500/20 text-slate-300 border-slate-500/30";
  return <Badge className={`${cls} text-xs border`}>{trade}</Badge>;
}

export default function NeighborhoodInsights() {
  const [scheduleClicked, setScheduleClicked] = useState(false);

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] px-4 py-6 space-y-6 max-w-3xl mx-auto">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Neighborhood Insights</h1>
          <p className="text-slate-400 mt-1">See how your home compares to your neighbors</p>
        </div>

        {/* ZIP stats */}
        <Card className="bg-[#111C2D] border-slate-700">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-white font-semibold">Your Area — ZIP 75034 (Frisco)</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-800/60 rounded-xl p-3">
                <p className="text-slate-400 text-xs">Avg Home Value</p>
                <p className="text-white text-lg font-bold mt-0.5">$485,000</p>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-3">
                <p className="text-slate-400 text-xs">Avg Health Score</p>
                <p className="text-emerald-400 text-lg font-bold mt-0.5">74 / 100</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs mb-2">Most common issues in 75034</p>
            <div className="space-y-2">
              {[
                { label: "Foundation", pct: 34, color: "bg-red-500" },
                { label: "HVAC", pct: 28, color: "bg-blue-500" },
                { label: "Roofing", pct: 18, color: "bg-amber-500" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-slate-300 text-xs w-20">{item.label}</span>
                  <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                  <span className="text-slate-400 text-xs w-8 text-right">{item.pct}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent activity nearby */}
        <Card className="bg-[#111C2D] border-slate-700">
          <CardContent className="p-5">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" /> Recent Activity in Your Area
            </h3>
            <div className="space-y-3">
              {NEARBY_JOBS.map((job, i) => (
                <div key={i} className="flex items-start justify-between gap-3 py-2.5 border-b border-slate-700/50 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm">
                      <span className="font-medium">{job.desc}</span>
                      <span className="text-slate-400"> on {job.street}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {tradeBadge(job.trade)}
                      <span className="text-slate-500 text-xs flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5" /> {job.dist} away
                      </span>
                      <span className="text-slate-500 text-xs">{job.daysAgo}d ago</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 text-xs font-medium whitespace-nowrap">{job.priceRange}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Seasonal prep comparison */}
        <Card className="bg-blue-900/20 border-blue-700/40">
          <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-white font-semibold text-sm">Seasonal Prep Comparison</span>
              </div>
              <p className="text-slate-300 text-sm">
                <span className="text-white font-medium">8 of 12 neighbors</span> have scheduled their spring HVAC tune-up.
                <span className="text-amber-400 font-medium"> You haven't yet.</span>
              </p>
              <div className="mt-2 w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "67%" }} />
              </div>
              <p className="text-slate-500 text-xs mt-1">67% of neighbors prepared</p>
            </div>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-500 text-white whitespace-nowrap shrink-0"
              onClick={() => setScheduleClicked(true)}
            >
              {scheduleClicked ? "Requested!" : "Schedule Now"}
            </Button>
          </CardContent>
        </Card>

        {/* Recall alerts */}
        <Card className="bg-red-900/20 border-red-700/40">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-white font-medium text-sm">
                3 product recalls active in 75034
              </p>
              <p className="text-slate-400 text-xs mt-0.5">Includes HVAC components, electrical panels, and water heater valves.</p>
            </div>
            <Link href="/home-health-vault">
              <button className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 whitespace-nowrap">
                Check home <ChevronRight className="w-3 h-3" />
              </button>
            </Link>
          </CardContent>
        </Card>

        {/* Trending services */}
        <div>
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> Trending Services This Month
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {TRENDING.map(t => (
              <div key={t.trade} className={`shrink-0 px-3 py-2 rounded-xl border text-sm ${TRADE_COLORS[t.trade] ?? "bg-slate-700/40 text-slate-300 border-slate-600"}`}>
                <span className="font-medium">{t.trade}</span>
                <span className="ml-1.5 opacity-70">{t.count} jobs</span>
              </div>
            ))}
          </div>
        </div>

        {/* Share CTA */}
        <Card className="bg-gradient-to-br from-blue-900/40 to-violet-900/30 border-blue-700/40">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center shrink-0">
              <Share2 className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">Share Your Home Health</p>
              <p className="text-slate-400 text-xs mt-0.5">Earn $25 when a neighbor joins TrustyPro using your link</p>
            </div>
            <Link href="/homeowner/referral">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white text-xs shrink-0">
                Get Link
              </Button>
            </Link>
          </CardContent>
        </Card>

      </div>
    </HomeownerLayout>
  );
}
