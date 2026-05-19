import { useState } from "react";
import {
  Briefcase, DollarSign, Clock, MapPin, TrendingUp,
  ChevronRight, Plus, Calendar, CheckCircle, AlertCircle,
  Hammer, BarChart3, Star, Zap,
} from "lucide-react";

const BIDS: { id: number; homeowner: string; address: string; service: string; bid: number; sentDate: string; daysWaiting: number }[] = [
  { id: 1, homeowner: "Sarah Mitchell", address: "4821 Oak Creek Dr", service: "HVAC System Replacement", bid: 4200, sentDate: "May 12″, daysWaiting: 3 },
  { id: 2, homeowner: "James Ortega", address: "917 Willow Bend Ln", service: "AC Unit Install", bid: 2800, sentDate: "May 11″, daysWaiting: 4 },
  { id: 3, homeowner: "Priya Nair", address: "3304 Cedar Hollow Rd", service: "Furnace Tune-Up", bid: 380, sentDate: "May 13″, daysWaiting: 2 },
];

const ACCEPTED: { id: number; address: string; service: string; startDate: string; value: number }[] = [
  { id: 4, address: "1102 Sunrise Blvd", service: "Mini-Split Installation", startDate: "May 18″, value: 3100 },
  { id: 5, address: "2245 Elm Park Ave", service: "HVAC Duct Cleaning", startDate: "May 20″, value: 650 },
];

const IN_PROGRESS: { id: number; address: string; service: string; pct: number; estCompletion: string; value: number }[] = [
  { id: 6, address: "788 Maple Ridge Ct", service: "Central AC Replacement", pct: 65, estCompletion: "May 16″, value: 5200 },
  { id: 7, address: "559 Birchwood Trail", service: "Heat Pump Install", pct: 30, estCompletion: "May 19″, value: 4400 },
];

const RECENT_WINS: { name: string; service: string; value: number; date: string }[] = [
  { name: "Carlos Rivera", service: "HVAC Replacement", value: 4800, date: "May 13″ },
  { name: "Angela Thompson", service: "AC Coil Cleaning", value: 290, date: "May 12″ },
  { name: "Ethan Brooks", service: "Thermostat Upgrade", value: 420, date: "May 11″ },
];

const BAR_DATA = [
  { label: "Bids Sent", value: 7840, color: "#334155″ },
  { label: "Accepted", value: 3750, color: "#00B5B8″ },
  { label: "In Progress", value: 9600, color: "#8B5CF6″ },
  { label: "Completed", value: 14200, color: "#10B981″ },
];

const MAX_BAR = 14200;

export default function JobPipeline() {
  const [followedUp, setFollowedUp] = useState<Set<number>>(new Set());

  const totalPipeline = BIDS.reduce((s, b) => s + b.bid, 0)
    + ACCEPTED.reduce((s, a) => s + a.value, 0)
    + IN_PROGRESS.reduce((s, j) => s + j.value, 0);

  function fmt(n: number) {
    return "$" + n.toLocaleString();
  }

  function handleFollowUp(id: number) {
    setFollowedUp(prev => new Set([...prev, id]));
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-white p-6″>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8″>
        <div>
          <h1 className="text-2xl font-bold text-white">Job Pipeline</h1>
          <p className="text-slate-400 text-sm mt-1″>Track bids, scheduled jobs, and active work</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-2″>
          <DollarSign className="w-4 h-4 text-emerald-400″ />
          <span className="text-emerald-300 font-semibold text-sm">{fmt(totalPipeline)} in active pipeline</span>
        </div>
      </div>

      {/* Win Rate Banner */}
      <div className="bg-[#0F2040] border border-cyan-500/20 rounded-xl px-5 py-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2″>
        <div className="flex items-center gap-3″>
          <TrendingUp className="w-5 h-5 text-cyan-400″ />
          <span className="text-white font-medium">You win <span className="text-cyan-300 font-bold">68%</span> of your bids</span>
          <span className="text-slate-400 text-sm">— above average (54%)</span>
        </div>
        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-1.5″>
          <Star className="w-3.5 h-3.5 text-amber-400″ />
          <span className="text-amber-300 text-xs">Jobs with photos win 2.3x more</span>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2″>
        {/* Bids Sent */}
        <div className="flex-1 min-w-[280px]">
          <div className="flex items-center gap-2 mb-3″>
            <div className="w-2 h-2 rounded-full bg-slate-400″ />
            <span className="text-slate-300 font-semibold text-sm uppercase tracking-wide">Bids Sent</span>
            <span className="ml-auto text-xs bg-slate-700 text-slate-300 rounded-full px-2 py-0.5″>{BIDS.length}</span>
          </div>
          <div className="flex flex-col gap-3″>
            {BIDS.map(bid => (
              <div key={bid.id} className="bg-[#0F2040] border border-slate-700/50 rounded-xl p-4″>
                <div className="flex items-start justify-between mb-2″>
                  <div>
                    <p className="text-white font-medium text-sm">{bid.homeowner}</p>
                    <div className="flex items-center gap-1 mt-0.5″>
                      <MapPin className="w-3 h-3 text-slate-500″ />
                      <p className="text-slate-500 text-xs">{bid.address}</p>
                    </div>
                  </div>
                  <span className="text-emerald-300 font-bold text-sm">{fmt(bid.bid)}</span>
                </div>
                <p className="text-slate-400 text-xs mb-3″>{bid.service}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-slate-500 text-xs">
                    <Clock className="w-3 h-3″ />
                    <span>Sent {bid.sentDate} · {bid.daysWaiting}d waiting</span>
                  </div>
                  <button
                    onClick={() => handleFollowUp(bid.id)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                      followedUp.has(bid.id)
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30″
                        : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20″
                    }`}
                  >
                    {followedUp.has(bid.id) ? "Sent ✓" : "Follow Up"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accepted */}
        <div className="flex-1 min-w-[280px]">
          <div className="flex items-center gap-2 mb-3″>
            <div className="w-2 h-2 rounded-full bg-cyan-400″ />
            <span className="text-slate-300 font-semibold text-sm uppercase tracking-wide">Accepted</span>
            <span className="ml-auto text-xs bg-cyan-500/20 text-cyan-300 rounded-full px-2 py-0.5″>{ACCEPTED.length}</span>
          </div>
          <div className="flex flex-col gap-3″>
            {ACCEPTED.map(job => (
              <div key={job.id} className="bg-[#0F2040] border border-cyan-500/20 rounded-xl p-4″>
                <div className="flex items-start justify-between mb-2″>
                  <div>
                    <div className="flex items-center gap-1″>
                      <MapPin className="w-3 h-3 text-slate-500″ />
                      <p className="text-white font-medium text-sm">{job.address}</p>
                    </div>
                    <p className="text-slate-400 text-xs mt-1″>{job.service}</p>
                  </div>
                  <span className="text-emerald-300 font-bold text-sm">{fmt(job.value)}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-xs mb-3″>
                  <Calendar className="w-3 h-3″ />
                  <span>Starts {job.startDate}</span>
                </div>
                <button className="w-full text-xs px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors flex items-center justify-center gap-1″>
                  View Details <ChevronRight className="w-3 h-3″ />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div className="flex-1 min-w-[280px]">
          <div className="flex items-center gap-2 mb-3″>
            <div className="w-2 h-2 rounded-full bg-violet-400″ />
            <span className="text-slate-300 font-semibold text-sm uppercase tracking-wide">In Progress</span>
            <span className="ml-auto text-xs bg-violet-500/20 text-violet-300 rounded-full px-2 py-0.5″>{IN_PROGRESS.length}</span>
          </div>
          <div className="flex flex-col gap-3″>
            {IN_PROGRESS.map(job => (
              <div key={job.id} className="bg-[#0F2040] border border-violet-500/20 rounded-xl p-4″>
                <div className="flex items-start justify-between mb-1″>
                  <div>
                    <div className="flex items-center gap-1″>
                      <MapPin className="w-3 h-3 text-slate-500″ />
                      <p className="text-white font-medium text-sm">{job.address}</p>
                    </div>
                    <p className="text-slate-400 text-xs mt-1″>{job.service}</p>
                  </div>
                  <span className="text-emerald-300 font-bold text-sm">{fmt(job.value)}</span>
                </div>
                <div className="flex items-center justify-between mb-1″>
                  <span className="text-violet-300 text-xs font-medium">{job.pct}% complete</span>
                  <span className="text-slate-500 text-xs">Est. done {job.estCompletion}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5 mb-3″>
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400″
                    style={{ width: `${job.pct}%` }}
                  />
                </div>
                <button className="w-full text-xs px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/30 hover:bg-violet-500/20 transition-colors flex items-center justify-center gap-1″>
                  <Hammer className="w-3 h-3″ /> Check In
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline Value Chart + Recent Wins */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8″>
        {/* Bar Chart */}
        <div className="bg-[#0F2040] border border-slate-700/50 rounded-xl p-5″>
          <div className="flex items-center gap-2 mb-5″>
            <BarChart3 className="w-4 h-4 text-cyan-400″ />
            <h3 className="text-white font-semibold text-sm">Pipeline Value This Month</h3>
          </div>
          <div className="flex flex-col gap-3″>
            {BAR_DATA.map(bar => (
              <div key={bar.label} className="flex items-center gap-3″>
                <span className="text-slate-400 text-xs w-24 shrink-0″>{bar.label}</span>
                <div className="flex-1 bg-slate-800 rounded-full h-5 relative overflow-hidden">
                  <div
                    className="h-5 rounded-full transition-all duration-700″
                    style={{ width: `${(bar.value / MAX_BAR) * 100}%`, backgroundColor: bar.color }}
                  />
                </div>
                <span className="text-white text-xs font-semibold w-16 text-right shrink-0″>{fmt(bar.value)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Wins */}
        <div className="bg-[#0F2040] border border-slate-700/50 rounded-xl p-5″>
          <div className="flex items-center gap-2 mb-4″>
            <CheckCircle className="w-4 h-4 text-emerald-400″ />
            <h3 className="text-white font-semibold text-sm">Recent Wins This Week</h3>
          </div>
          <div className="flex flex-col gap-3 mb-4″>
            {RECENT_WINS.map((win, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0″>
                <div>
                  <p className="text-white text-sm font-medium">{win.name}</p>
                  <p className="text-slate-400 text-xs">{win.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-300 font-bold text-sm">{fmt(win.value)}</p>
                  <p className="text-slate-500 text-xs">{win.date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-start gap-2″>
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5″ />
            <p className="text-amber-300 text-xs">Pro tip: Jobs with photos in your bid win 2.3x more often</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#0F2040] border border-slate-700/50 rounded-xl p-5″>
        <div className="flex items-center gap-2 mb-4″>
          <Zap className="w-4 h-4 text-cyan-400″ />
          <h3 className="text-white font-semibold text-sm">Quick Actions</h3>
        </div>
        <div className="flex flex-wrap gap-3″>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl font-medium text-sm transition-colors">
            <Plus className="w-4 h-4″ /> New Bid
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1A3050] hover:bg-[#1E3860] text-slate-200 border border-slate-600 rounded-xl font-medium text-sm transition-colors">
            <Calendar className="w-4 h-4″ /> Schedule Job
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1A3050] hover:bg-[#1E3860] text-slate-200 border border-slate-600 rounded-xl font-medium text-sm transition-colors">
            <CheckCircle className="w-4 h-4″ /> Log Completion
          </button>
        </div>
      </div>
    </div>
  );
}
