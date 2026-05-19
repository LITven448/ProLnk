import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";
import {
  Users, TrendingUp, DollarSign, Heart, Mail, MessageSquare, Plus, X,
  Edit, Pause, Play, Activity, Award
} from "lucide-react";
import { toast } from "sonner";

const METRICS = [
  { label: "30-Day Retention", value: "97.9%", sub: "+0.4% vs last month", icon: Activity, color: "text-emerald-400″, bg: "bg-emerald-500/10" },
  { label: "60-Day Retention", value: "94.2%", sub: "+1.1% vs last month", icon: TrendingUp, color: "text-teal-400″, bg: "bg-teal-500/10" },
  { label: "90-Day Retention", value: "91.8%", sub: "-0.3% vs last month", icon: Users, color: "text-blue-400″, bg: "bg-blue-500/10" },
  { label: "Avg Partner LTV", value: "$2,847″, sub: "$238/mo avg", icon: DollarSign, color: "text-amber-400", bg: "bg-amber-500/10" },
];

const CAMPAIGNS = [
  {
    id: 1, name: "Re-engagement: 14-day inactive",
    trigger: "No jobs in 14 days", channel: "Email", status: "active",
    lastSent: 84, openRate: 61, cta: "View available jobs",
  },
  {
    id: 2, name: "Milestone celebration: First 5 jobs",
    trigger: "Partner completes 5th job", channel: "SMS", status: "active",
    lastSent: 147, openRate: 94, cta: "Claim your reward",
  },
  {
    id: 3, name: "Monthly tips: All active partners",
    trigger: "1st of each month, all active", channel: "Email", status: "active",
    lastSent: 1240, openRate: 72, cta: "Read the guide",
  },
  {
    id: 4, name: "Win-back: 30-day lapsed",
    trigger: "No activity for 30 days", channel: "Email+SMS", status: "active",
    lastSent: 23, openRate: 44, cta: "Come back — jobs waiting",
  },
];

const COHORT_DATA = [
  { day: "Day 1″,  jan: 100, feb: 100, mar: 100 },
  { day: "Day 7″,  jan: 99.1, feb: 99.4, mar: 99.6 },
  { day: "Day 14″, jan: 98.2, feb: 98.7, mar: 99.0 },
  { day: "Day 30″, jan: 97.4, feb: 97.9, mar: 98.2 },
  { day: "Day 45″, jan: 95.6, feb: 96.1, mar: 96.8 },
  { day: "Day 60″, jan: 93.8, feb: 94.2, mar: 95.1 },
  { day: "Day 75″, jan: 92.1, feb: 93.0, mar: 93.7 },
  { day: "Day 90″, jan: 91.2, feb: 91.8, mar: 92.4 },
];

const CHANNEL_STYLES: Record<string, string> = {
  Email: "bg-blue-500/20 text-blue-400″,
  SMS: "bg-emerald-500/20 text-emerald-400″,
  "Email+SMS": "bg-purple-500/20 text-purple-400″,
};

const EMPTY_FORM = { trigger: "", channel: "Email", message: "" };

export default function RetentionCampaigns() {
  const [paused, setPaused] = useState<Set<number>>(new Set());
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  function togglePause(id: number) {
    setPaused(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.success("Campaign resumed");
      } else {
        next.add(id);
        toast.success("Campaign paused");
      }
      return next;
    });
  }

  return (
    <AdminLayout title="Retention Campaigns" subtitle="Keep your best partners">

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6″>
        {METRICS.map(m => (
          <div key={m.label} className="rounded-xl border border-white/10 p-4 bg-[#0D1F3C]">
            <div className={`p-1.5 rounded-lg ${m.bg} w-fit mb-3`}>
              <m.icon className={`w-4 h-4 ${m.color}`} />
            </div>
            <div className="text-xs text-slate-400 mb-1″>{m.label}</div>
            <div className={`text-2xl font-bold ${m.color}`}>{m.value}</div>
            <div className="text-xs text-slate-500 mt-1″>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Partner saves highlight */}
      <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-900/20 to-[#0D1F3C] p-4 mb-6 flex items-center gap-4″>
        <div className="p-2 rounded-lg bg-emerald-500/20 flex-shrink-0″>
          <Heart className="w-5 h-5 text-emerald-400″ />
        </div>
        <div>
          <div className="font-bold text-white text-sm">This month: 4 partners re-engaged via automated campaigns.</div>
          <div className="text-xs text-slate-400 mt-0.5″>Revenue saved: <span className="text-emerald-400 font-semibold">$4,280</span></div>
        </div>
        <div className="ml-auto">
          <Button onClick={() => setShowCreate(true)} className="gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm">
            <Plus className="w-4 h-4″ /> New Campaign
          </Button>
        </div>
      </div>

      {/* Campaign Cards */}
      <h2 className="text-sm font-bold text-white mb-3″>Active Campaigns</h2>
      <div className="space-y-4 mb-8″>
        {CAMPAIGNS.map(c => {
          const isPaused = paused.has(c.id);
          const ChannelIcon = c.channel === "SMS" ? MessageSquare : Mail;
          return (
            <div key={c.id} className={`rounded-xl border p-4 bg-[#0D1F3C] ${isPaused ? "border-amber-500/30 opacity-70" : "border-white/10"}`}>
              <div className="flex items-start justify-between gap-4″>
                <div className="flex-1 min-w-0″>
                  <div className="flex items-center gap-2 flex-wrap mb-2″>
                    <span className="font-semibold text-white text-sm">{c.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isPaused ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                      {isPaused ? "Paused" : "Active"}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${CHANNEL_STYLES[c.channel]}`}>
                      <ChannelIcon className="w-2.5 h-2.5″ /> {c.channel}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mb-3″>
                    Trigger: <span className="text-slate-300″>{c.trigger}</span>
                  </div>
                  <div className="flex items-center gap-5 flex-wrap">
                    <div>
                      <div className="text-xs text-slate-500 mb-1″>Last Sent</div>
                      <div className="text-sm font-bold text-white">{c.lastSent.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1″>{c.channel === "SMS" ? "Click Rate" : "Open Rate"}</div>
                      <div className="flex items-center gap-2″>
                        <div className="w-24 bg-white/5 rounded-full h-1.5″>
                          <div
                            className={`h-1.5 rounded-full ${c.openRate >= 70 ? "bg-emerald-400" : c.openRate >= 50 ? "bg-teal-400" : "bg-amber-400"}`}
                            style={{ width: `${c.openRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-white">{c.openRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0″>
                  <Button
                    size="sm" variant="outline"
                    className="h-7 text-xs border-white/10 text-slate-300 hover:text-white gap-1″
                    onClick={() => toast.info("Edit campaign (coming soon)")}
                  >
                    <Edit className="w-3 h-3″ /> Edit
                  </Button>
                  <Button
                    size="sm" variant="outline"
                    className={`h-7 text-xs border-white/10 gap-1 ${isPaused ? "text-emerald-400 hover:text-emerald-300" : "text-amber-400 hover:text-amber-300"}`}
                    onClick={() => togglePause(c.id)}
                  >
                    {isPaused ? <Play className="w-3 h-3″ /> : <Pause className="w-3 h-3" />}
                    {isPaused ? "Resume" : "Pause"}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Retention Cohort Chart */}
      <div className="rounded-xl border border-white/10 p-5 bg-[#0D1F3C] mb-6″>
        <div className="flex items-center gap-2 mb-1″>
          <Award className="w-4 h-4 text-teal-400″ />
          <h2 className="text-sm font-bold text-white">90-Day Retention Curves — 2026 Cohorts</h2>
        </div>
        <p className="text-xs text-slate-400 mb-5″>Partner retention rate over first 90 days by signup cohort</p>
        <div className="h-64″>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={COHORT_DATA} margin={{ top: 4, right: 16, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3″ stroke="#1E3A5F" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[88, 101]} tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0D1F3C", border: "1px solid #1E3A5F", borderRadius: 8, color: "#fff" }}
                formatter={(value: number) => [`${value.toFixed(1)}%`]}
              />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94A3B8″ }} />
              <Line type="monotone" dataKey="jan" name="Jan Cohort" stroke="#3B82F6″ strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="feb" name="Feb Cohort" stroke="#00B5B8″ strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="mar" name="Mar Cohort" stroke="#10B981″ strokeWidth={2} dot={false} strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4″ style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
          <div className="rounded-2xl border border-white/10 bg-[#0D1F3C] w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-white/10″>
              <div className="flex items-center gap-2″>
                <Plus className="w-5 h-5 text-teal-400″ />
                <h2 className="font-bold text-white">New Retention Campaign</h2>
              </div>
              <button onClick={() => setShowCreate(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5″ />
              </button>
            </div>
            <div className="p-5 space-y-4″>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1″>Trigger Condition *</label>
                <Input
                  value={form.trigger}
                  onChange={e => setForm({ ...form, trigger: e.target.value })}
                  className="bg-[#0A1628] border-white/10 text-white focus:border-teal-500″
                  placeholder="e.g., No jobs in 14 days"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1″>Channel</label>
                <select
                  value={form.channel}
                  onChange={e => setForm({ ...form, channel: e.target.value })}
                  className="w-full border border-white/10 rounded-lg px-3 py-2 text-sm bg-[#0A1628] text-white focus:outline-none focus:ring-2 focus:ring-teal-500″
                >
                  <option value="Email">Email</option>
                  <option value="SMS">SMS</option>
                  <option value="Email+SMS">Email + SMS</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1″>Message Template *</label>
                <Textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="bg-[#0A1628] border-white/10 text-white focus:border-teal-500″
                  placeholder="Write your message to partners..."
                  rows={4}
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-white/10″>
              <Button variant="outline" onClick={() => setShowCreate(false)} className="border-white/10 text-slate-300 hover:text-white">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (!form.trigger || !form.message) { toast.error("Trigger and message are required"); return; }
                  toast.success("Campaign created and scheduled");
                  setShowCreate(false);
                  setForm({ ...EMPTY_FORM });
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Create Campaign
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
