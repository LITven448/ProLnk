import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield, TrendingUp, Users, Zap, CheckCircle, XCircle,
  Star, DollarSign, Clock, Target, AlertTriangle, BarChart3,
  MessageSquare, Gift, ArrowRight, Lightbulb, MapPin, Repeat2,
} from "lucide-react";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend } from "recharts";

const BARRIERS = [
  {
    barrier: "\"I already use ServiceTitan / Jobber -- I don't want another app\"",
    solution: "Zero new workflow. ProLnk connects silently to their existing software. They do nothing different.",
    status: "solved",
    icon: Zap,
  },
  {
    barrier: "\"I don't take photos on the job\"",
    solution: "CompanyCam integration means if they use CompanyCam (150K+ contractors do), photos auto-sync. For others, the ProLnk Mobile App is a 3-tap, 60-second flow.",
    status: "solved",
    icon: Shield,
  },
  {
    barrier: "\"I don't trust that referrals will actually come in\"",
    solution: "30-day ROI guarantee: if a partner doesn't receive at least 3 qualified inbound leads in their first 30 days, they get a full refund. No questions asked.",
    status: "action_needed",
    icon: Star,
  },
  {
    barrier: "\"$149/month is too expensive\"",
    solution: "The calculator shows a single closed job from a referral pays for 6+ months of the subscription. The math is undeniable — but it needs to be shown, not told.",
    status: "solved",
    icon: DollarSign,
  },
  {
    barrier: "\"What if my competitor joins and gets my leads?\"",
    solution: "Exclusive zip code territories per service category. One HVAC company per zip code. First to join owns that territory.",
    status: "action_needed",
    icon: Target,
  },
  {
    barrier: "\"I'm too busy to set this up\"",
    solution: "5-minute onboarding wizard. If they connect CompanyCam or Jobber, setup is 2 clicks. White-glove onboarding call included for Charter/Founding tiers.",
    status: "solved",
    icon: Clock,
  },
  {
    barrier: "\"What if the AI sends bad leads?\"",
    solution: "Partners rate every lead (thumbs up/down). After 3 bad leads, the AI retrains on their feedback. Quality improves automatically over time.",
    status: "in_progress",
    icon: BarChart3,
  },
  {
    barrier: "\"I don't want to share my customer photos with a third party\"",
    solution: "Photos are analyzed and immediately discarded. ProLnk stores only the opportunity signal (type, address, confidence score) — never the photo itself.",
    status: "action_needed",
    icon: Shield,
  },
];

const TRUST_SIGNALS = [
  { label: "Founding Partner Badge", desc: "First 100 partners get a permanent Founding Partner badge and locked-in pricing forever", enabled: true },
  { label: "30-Day ROI Guarantee", desc: "3 qualified leads in 30 days or full refund — no questions asked", enabled: false },
  { label: "Exclusive Territory Lock", desc: "First partner in a zip code per category owns that territory permanently", enabled: false },
  { label: "White-Glove Onboarding", desc: "1:1 setup call included for Charter and Founding tier partners", enabled: true },
  { label: "Partner Success Manager", desc: "Dedicated contact for the first 90 days to ensure activation", enabled: false },
  { label: "Live Network Stats on Landing Page", desc: "Show real-time partner count, leads generated, and commissions paid to build social proof", enabled: true },
];

const GROWTH_LEVERS = [
  { lever: "Referral Program", desc: "Partners earn $50 credit for every new partner they refer who activates", impact: 92, effort: 20, projectedMonthlySignups: "+38" },
  { lever: "Territory Scarcity Alerts", desc: "\"Only 2 HVAC spots left in your zip code\" — urgency-driven outreach", impact: 88, effort: 15, projectedMonthlySignups: "+29" },
  { lever: "First Lead Free", desc: "New partners get their first inbound lead free before billing starts", impact: 85, effort: 10, projectedMonthlySignups: "+24" },
  { lever: "Co-marketing with CompanyCam", desc: "ProLnk listed as a recommended integration in CompanyCam's marketplace", impact: 95, effort: 40, projectedMonthlySignups: "+55" },
  { lever: "Jobber App Marketplace", desc: "ProLnk listed in Jobber's app marketplace — passive inbound from 200K+ Jobber users", impact: 90, effort: 35, projectedMonthlySignups: "+47" },
  { lever: "DFW Trade Association Partnerships", desc: "Sponsor PHCC, ACCA, and NALP chapter meetings — speak to 50+ contractors at once", impact: 78, effort: 50, projectedMonthlySignups: "+22" },
];

const GROWTH_PROJECTION = [
  { month: "May",  current: 149, target: 200 },
  { month: "Jun",  current: 198, target: 320 },
  { month: "Jul",  current: 261, target: 480 },
  { month: "Aug",  current: 344, target: 650 },
  { month: "Sep",  current: 453, target: 850 },
  { month: "Oct",  current: 597, target: 1100 },
  { month: "Nov",  current: 786, target: 1400 },
  { month: "Dec",  current: 1035, target: 1800 },
];

const CHANNEL_ROI = [
  { channel: "Referral Program", cpa: 12, leads: 38, color: "#34D399" },
  { channel: "Trade Associations", cpa: 48, leads: 22, color: "#60A5FA" },
  { channel: "CompanyCam Partner", cpa: 31, leads: 55, color: "#A78BFA" },
  { channel: "Jobber Marketplace", cpa: 0, leads: 47, color: "#FBBF24" },
  { channel: "Direct Outbound", cpa: 67, leads: 18, color: "#F87171" },
];

const ZIP_SATURATION = [
  { zip: "75201 (Dallas)", category: "HVAC", spots: 1, filled: 1, pct: 100 },
  { zip: "75201 (Dallas)", category: "Plumbing", spots: 1, filled: 0, pct: 0 },
  { zip: "75202 (Dallas)", category: "HVAC", spots: 1, filled: 1, pct: 100 },
  { zip: "75203 (Dallas)", category: "Electrical", spots: 1, filled: 0, pct: 0 },
  { zip: "76001 (Arlington)", category: "HVAC", spots: 1, filled: 0, pct: 0 },
  { zip: "76002 (Arlington)", category: "Plumbing", spots: 1, filled: 1, pct: 100 },
  { zip: "75001 (Addison)", category: "Roofing", spots: 1, filled: 0, pct: 0 },
];

const statusConfig = {
  solved: { label: "Solved", color: "#34D399", bg: "rgba(52,211,153,0.15)" },
  action_needed: { label: "Action Needed", color: "#F87171", bg: "rgba(248,113,113,0.15)" },
  in_progress: { label: "In Progress", color: "#FBBF24", bg: "rgba(251,191,36,0.15)" },
};

export default function MassAdoption() {
  const [signals, setSignals] = useState(TRUST_SIGNALS);

  const toggleSignal = (idx: number) => {
    setSignals(prev => prev.map((s, i) => i === idx ? { ...s, enabled: !s.enabled } : s));
    toast.success("Trust signal updated");
  };

  const solved = BARRIERS.filter(b => b.status === "solved").length;
  const total = BARRIERS.length;
  const solvedPct = Math.round((solved / total) * 100);

  const viralCoeff = 1.8;

  return (
    <AdminLayout title="Mass Adoption Engine" subtitle="Eliminate every reason a home service operator would say no to ProLnk">
      <div className="space-y-6">

        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Barriers Solved", value: `${solved}/${total}`, pct: solvedPct, color: "#34D399" },
            { label: "Active Partners", value: "149", pct: 30, color: "#60A5FA" },
            { label: "Viral Coefficient", value: viralCoeff.toFixed(1), pct: viralCoeff * 50, color: "#A78BFA" },
            { label: "Avg CPA (All Channels)", value: "$32", pct: 68, color: "#FBBF24" },
          ].map(s => (
            <Card key={s.label} className="bg-[#0d1b2e] border-white/10">
              <CardContent className="p-4">
                <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                  <div className="h-full rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Growth Projections */}
        <Card className="bg-[#0d1b2e] border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              Growth Projection — Current Trajectory vs. Target
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={GROWTH_PROJECTION}>
                <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
                <Tooltip
                  contentStyle={{ background: "#0d1b2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "#9CA3AF" }}
                />
                <Legend wrapperStyle={{ fontSize: 11, color: "#9CA3AF" }} />
                <Line
                  type="monotone"
                  dataKey="current"
                  name="Current Trajectory"
                  stroke="#60A5FA"
                  strokeWidth={2}
                  dot={{ fill: "#60A5FA", r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Target (with Growth Levers)"
                  stroke="#34D399"
                  strokeWidth={2}
                  strokeDasharray="5 4"
                  dot={{ fill: "#34D399", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {[
                { label: "Break-even (500 pros)", by: "Jul 2026", color: "#FBBF24" },
                { label: "Target trajectory by EOY", value: "1,035 pros", color: "#60A5FA" },
                { label: "With levers activated", value: "1,800 pros", color: "#34D399" },
              ].map(s => (
                <div key={s.label} className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                  <p className="text-sm font-bold" style={{ color: s.color }}>{s.value ?? s.by}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Channel ROI + Viral Coefficient */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#0d1b2e] border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-amber-400" />
                Marketing Channel ROI — Cost per Acquisition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {CHANNEL_ROI.sort((a, b) => a.cpa - b.cpa).map(c => (
                  <div key={c.channel}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">{c.channel}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{c.leads} leads/mo</span>
                        <span className="text-xs font-bold" style={{ color: c.color }}>
                          {c.cpa === 0 ? "Free" : `$${c.cpa} CPA`}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(c.leads / 55) * 100}%`, backgroundColor: c.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0d1b2e] border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <Repeat2 className="h-4 w-4 text-purple-400" />
                Viral Coefficient
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 mb-4">
                <p className="text-6xl font-black text-purple-300">{viralCoeff}</p>
                <div className="mb-2">
                  <p className="text-sm font-semibold text-white">avg recruits per partner</p>
                  <p className="text-xs text-gray-500">K &gt; 1.0 = organic growth loop active</p>
                </div>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                <div className="h-full rounded-full bg-purple-400" style={{ width: `${Math.min(100, viralCoeff * 50)}%` }} />
              </div>
              <div className="space-y-2">
                {[
                  { label: "K &lt; 1.0", desc: "Network shrinks without paid acquisition", color: "#F87171" },
                  { label: "K = 1.0–1.5", desc: "Steady organic growth, needs fuel", color: "#FBBF24" },
                  { label: "K &gt; 1.5", desc: "Self-sustaining growth loop — you are here", color: "#34D399" },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-xs font-bold" style={{ color: s.color }}>{s.label}</span>
                    <span className="text-xs text-gray-500">{s.desc}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Growth Levers */}
        <Card className="bg-[#0d1b2e] border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              Growth Levers — Ranked by Impact vs. Effort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...GROWTH_LEVERS].sort((a, b) => (b.impact - b.effort) - (a.impact - a.effort)).map((lever, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-semibold text-white">{lever.lever}</p>
                        <span className="text-xs font-bold text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-full">
                          {lever.projectedMonthlySignups} signups/mo
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{lever.desc}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-xs text-gray-500">Impact: <span className="font-bold text-emerald-400">{lever.impact}</span></p>
                      <p className="text-xs text-gray-500">Effort: <span className="font-bold text-amber-400">{lever.effort}</span></p>
                      <p className="text-xs font-bold" style={{ color: lever.impact - lever.effort > 60 ? "#34D399" : "#FBBF24" }}>
                        Score: {lever.impact - lever.effort}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="flex justify-between mb-0.5">
                        <span className="text-xs text-gray-500">Impact</span>
                        <span className="text-xs text-emerald-400">{lever.impact}%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${lever.impact}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-0.5">
                        <span className="text-xs text-gray-500">Effort</span>
                        <span className="text-xs text-amber-400">{lever.effort}%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${lever.effort}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Objection Map */}
        <Card className="bg-[#0d1b2e] border-white/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-gray-400" />
                Objection Elimination Map
              </CardTitle>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-gray-400">
                  <CheckCircle className="h-3 w-3 text-emerald-400" />{solved} solved
                </span>
                <span className="flex items-center gap-1 text-gray-400">
                  <AlertTriangle className="h-3 w-3 text-amber-400" />{BARRIERS.filter(b => b.status === "in_progress").length} in progress
                </span>
                <span className="flex items-center gap-1 text-gray-400">
                  <XCircle className="h-3 w-3 text-red-400" />{BARRIERS.filter(b => b.status === "action_needed").length} need action
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-4">
              <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${solvedPct}%` }} />
            </div>
            <div className="space-y-3">
              {BARRIERS.map((item, idx) => {
                const Icon = item.icon;
                const status = statusConfig[item.status as keyof typeof statusConfig];
                return (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-300 italic">{item.barrier}</p>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: status.bg, color: status.color }}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{item.solution}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Market Saturation by ZIP */}
        <Card className="bg-[#0d1b2e] border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-400" />
              Market Saturation by ZIP Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {ZIP_SATURATION.map((z, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-36 flex-shrink-0">{z.zip}</span>
                  <span className="text-xs text-gray-500 w-24 flex-shrink-0">{z.category}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full"
                      style={{ width: `${z.pct}%`, backgroundColor: z.pct === 100 ? "#F87171" : "#34D399" }} />
                  </div>
                  <span className={`text-xs font-bold w-20 text-right ${z.pct === 100 ? "text-red-400" : "text-emerald-400"}`}>
                    {z.pct === 100 ? "FULL" : "Open"}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-3">Full territories create urgency for adjacent ZIPs — feature saturated ZIPs prominently on the landing page.</p>
          </CardContent>
        </Card>

        {/* Trust Signals */}
        <Card className="bg-[#0d1b2e] border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-400" />
              Trust Signal Activation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {signals.map((signal, idx) => (
              <div key={idx} className="flex items-start justify-between gap-4 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-start gap-2">
                  {signal.enabled
                    ? <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    : <XCircle className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />}
                  <div>
                    <p className="text-sm font-semibold text-white">{signal.label}</p>
                    <p className="text-xs text-gray-500">{signal.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSignal(idx)}
                  className="w-10 h-5 rounded-full flex-shrink-0 transition-colors relative"
                  style={{ backgroundColor: signal.enabled ? "#34D399" : "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
                    style={{ left: signal.enabled ? "calc(100% - 18px)" : "2px" }}
                  />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card className="bg-emerald-500/10 border border-emerald-500/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <ArrowRight className="h-4 w-4 text-emerald-400" />
              <p className="font-semibold text-emerald-200">Immediate Action Items (This Week)</p>
            </div>
            <div className="space-y-2">
              {[
                "Activate the 30-Day ROI Guarantee — this single trust signal removes the biggest barrier to first-time sign-ups",
                "Add exclusive territory language to the landing page — \"Only 1 HVAC partner per zip code\" creates urgency",
                "Register ProLnk on CompanyCam Marketplace — passive inbound from 150K+ contractors (zero CPA)",
                "Add a privacy statement to the photo upload flow — \"Photos analyzed and immediately discarded\"",
                "Launch the referral program with $50 credit — viral coefficient is already 1.8x, a reward will push it to 2.5x+",
              ].map((action, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-black text-emerald-300">{idx + 1}</span>
                  </div>
                  <p className="text-sm text-emerald-200/80">{action}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => toast.success("Action plan saved")}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-semibold hover:bg-emerald-500/30 transition-colors"
            >
              <Gift className="h-4 w-4" /> Activate All Trust Signals
            </button>
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  );
}
