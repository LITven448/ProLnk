import { useState, useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Brain, Zap, MapPin, DollarSign, TrendingUp, Clock, Shield, CheckCircle,
  XCircle, AlertTriangle, Sliders, ChevronDown, ChevronUp, BarChart3, User,
  Home, Star, Search, Filter, RefreshCw, Activity,
} from "lucide-react";

function scoreColor(score: number) {
  if (score >= 75) return "text-green-400″;
  if (score >= 50) return "text-yellow-400″;
  if (score >= 30) return "text-orange-400″;
  return "text-red-400″;
}

function scoreBg(score: number) {
  if (score >= 75) return "bg-green-500/10 border-green-500/30″;
  if (score >= 50) return "bg-yellow-500/10 border-yellow-500/30″;
  if (score >= 30) return "bg-orange-500/10 border-orange-500/30″;
  return "bg-red-500/10 border-red-500/30″;
}

function scoreLabel(score: number) {
  if (score >= 75) return "Auto-Accept";
  if (score >= 50) return "Review";
  return "Auto-Reject";
}

function scoreBadge(score: number) {
  if (score >= 75) return "bg-green-500/20 text-green-400 border border-green-500/30″;
  if (score >= 50) return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30″;
  return "bg-red-500/20 text-red-400 border border-red-500/30″;
}

const MOCK_LEADS = [
  {
    id: "lead-001″,
    homeowner: "Patricia Nguyen",
    address: "4821 Lavaca St, Austin TX 78756″,
    trade: "Roofing",
    description: "Full roof replacement after hail damage — 2,400 sq ft home",
    budget: 8000,
    urgency: "high",
    receivedAt: "2026-05-13T14:23:00Z",
    verifiedEmail: true,
    verifiedPhone: true,
    verifiedAddress: true,
    pastJobs: 4,
    reviewsGiven: 4,
    avgRating: 4.9,
    score: 91,
    components: { verification: 28, budget: 25, urgency: 20, history: 18 },
    status: "accepted",
    predictedCompletion: 94,
    overrideScore: null as number | null,
  },
  {
    id: "lead-002″,
    homeowner: "Marcus Webb",
    address: "9023 Westheimer Rd, Houston TX 77063″,
    trade: "HVAC",
    description: "AC not cooling — needs full system replacement before summer",
    budget: 4500,
    urgency: "high",
    receivedAt: "2026-05-13T11:05:00Z",
    verifiedEmail: true,
    verifiedPhone: true,
    verifiedAddress: false,
    pastJobs: 2,
    reviewsGiven: 2,
    avgRating: 4.5,
    score: 84,
    components: { verification: 22, budget: 22, urgency: 20, history: 20 },
    status: "accepted",
    predictedCompletion: 88,
    overrideScore: null as number | null,
  },
  {
    id: "lead-003″,
    homeowner: "Sandra Kowalski",
    address: "1567 Oak Cliff Blvd, Dallas TX 75208″,
    trade: "Electrical",
    description: "Panel upgrade from 100A to 200A for EV charger installation",
    budget: 2800,
    urgency: "medium",
    receivedAt: "2026-05-12T16:40:00Z",
    verifiedEmail: true,
    verifiedPhone: false,
    verifiedAddress: true,
    pastJobs: 6,
    reviewsGiven: 5,
    avgRating: 4.3,
    score: 72,
    components: { verification: 20, budget: 18, urgency: 12, history: 22 },
    status: "review",
    predictedCompletion: 79,
    overrideScore: null as number | null,
  },
  {
    id: "lead-004″,
    homeowner: "Derek Harmon",
    address: "1204 Barton Springs Rd, Austin TX 78704″,
    trade: "Plumbing",
    description: "Water heater replacement — existing is 14 years old, leaking",
    budget: 1200,
    urgency: "high",
    receivedAt: "2026-05-12T09:15:00Z",
    verifiedEmail: true,
    verifiedPhone: true,
    verifiedAddress: true,
    pastJobs: 12,
    reviewsGiven: 11,
    avgRating: 4.9,
    score: 88,
    components: { verification: 28, budget: 14, urgency: 20, history: 26 },
    status: "accepted",
    predictedCompletion: 97,
    overrideScore: null as number | null,
  },
  {
    id: "lead-005″,
    homeowner: "Jerome Batiste",
    address: "3341 NW Loop 1604, San Antonio TX 78249″,
    trade: "Landscaping",
    description: "Lawn care and irrigation system check — not urgent",
    budget: 400,
    urgency: "low",
    receivedAt: "2026-05-11T13:30:00Z",
    verifiedEmail: true,
    verifiedPhone: false,
    verifiedAddress: false,
    pastJobs: 1,
    reviewsGiven: 0,
    avgRating: 0,
    score: 42,
    components: { verification: 10, budget: 8, urgency: 4, history: 20 },
    status: "review",
    predictedCompletion: 44,
    overrideScore: null as number | null,
  },
  {
    id: "lead-006″,
    homeowner: "Tiffany Odom",
    address: "7820 Briar Forest Dr, Houston TX 77079″,
    trade: "Painting",
    description: "Interior repaint — 3 rooms, no set timeline",
    budget: 200,
    urgency: "low",
    receivedAt: "2026-05-10T08:45:00Z",
    verifiedEmail: false,
    verifiedPhone: false,
    verifiedAddress: false,
    pastJobs: 0,
    reviewsGiven: 0,
    avgRating: 0,
    score: 22,
    components: { verification: 0, budget: 4, urgency: 4, history: 14 },
    status: "rejected",
    predictedCompletion: 21,
    overrideScore: null as number | null,
  },
  {
    id: "lead-007″,
    homeowner: "Calvin Moore",
    address: "560 Brickell Ave, Austin TX 78703″,
    trade: "Solar",
    description: "Solar panel installation — 3,000 sq ft home, net metering eligible",
    budget: 28000,
    urgency: "medium",
    receivedAt: "2026-05-09T15:20:00Z",
    verifiedEmail: true,
    verifiedPhone: true,
    verifiedAddress: true,
    pastJobs: 3,
    reviewsGiven: 3,
    avgRating: 4.7,
    score: 95,
    components: { verification: 28, budget: 30, urgency: 12, history: 25 },
    status: "accepted",
    predictedCompletion: 91,
    overrideScore: null as number | null,
  },
  {
    id: "lead-008″,
    homeowner: "Brenda Castillo",
    address: "2218 Brazos St, Houston TX 77002″,
    trade: "Fencing",
    description: "6-foot privacy fence, 200 linear feet",
    budget: 3600,
    urgency: "medium",
    receivedAt: "2026-05-08T10:10:00Z",
    verifiedEmail: true,
    verifiedPhone: false,
    verifiedAddress: true,
    pastJobs: 0,
    reviewsGiven: 0,
    avgRating: 0,
    score: 55,
    components: { verification: 18, budget: 18, urgency: 12, history: 7 },
    status: "review",
    predictedCompletion: 58,
    overrideScore: null as number | null,
  },
];

const HISTORICAL_ACCURACY = [
  { range: "90-100″, predicted: 93, actual: 91, count: 28 },
  { range: "75-89″, predicted: 82, actual: 79, count: 47 },
  { range: "50-74″, predicted: 62, actual: 54, count: 61 },
  { range: "0-49″, predicted: 38, actual: 32, count: 34 },
];

const RECENT_DECISIONS = [
  { homeowner: "Patricia Nguyen", trade: "Roofing", score: 91, outcome: "Auto-Accept", time: "2m ago" },
  { homeowner: "Marcus Webb", trade: "HVAC", score: 84, outcome: "Auto-Accept", time: "3h ago" },
  { homeowner: "Sandra Kowalski", trade: "Electrical", score: 72, outcome: "Review Queue", time: "7h ago" },
  { homeowner: "Derek Harmon", trade: "Plumbing", score: 88, outcome: "Auto-Accept", time: "1d ago" },
  { homeowner: "Jerome Batiste", trade: "Landscaping", score: 42, outcome: "Review Queue", time: "2d ago" },
  { homeowner: "Tiffany Odom", trade: "Painting", score: 22, outcome: "Auto-Reject", time: "3d ago" },
  { homeowner: "Calvin Moore", trade: "Solar", score: 95, outcome: "Auto-Accept", time: "4d ago" },
  { homeowner: "Brenda Castillo", trade: "Fencing", score: 55, outcome: "Review Queue", time: "5d ago" },
  { homeowner: "Rick Alvarez", trade: "Plumbing", score: 38, outcome: "Auto-Reject", time: "5d ago" },
  { homeowner: "Janet Wu", trade: "HVAC", score: 78, outcome: "Auto-Accept", time: "6d ago" },
];

type FilterType = "all" | "accepted" | "review" | "rejected";

const SIMULATOR_DEFAULTS = {
  verification: 22,
  budget: 20,
  urgency: 15,
  history: 18,
};

export default function LeadScoring() {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [overrideTarget, setOverrideTarget] = useState<typeof MOCK_LEADS[0] | null>(null);
  const [overrideValue, setOverrideValue] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [simValues, setSimValues] = useState(SIMULATOR_DEFAULTS);
  const [rescoring, setRescoring] = useState(false);
  const [rescoreProgress, setRescoreProgress] = useState(0);

  const simulatedScore = Math.min(100, simValues.verification + simValues.budget + simValues.urgency + simValues.history);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const q = search.toLowerCase();
      const matchSearch = !search || l.homeowner.toLowerCase().includes(q) || l.trade.toLowerCase().includes(q) || l.address.toLowerCase().includes(q);
      const effectiveScore = l.overrideScore ?? l.score;
      const matchFilter =
        filter === "all" ||
        (filter === "accepted" && effectiveScore >= 75) ||
        (filter === "review" && effectiveScore >= 50 && effectiveScore < 75) ||
        (filter === "rejected" && effectiveScore < 50);
      return matchSearch && matchFilter;
    }).sort((a, b) => (b.overrideScore ?? b.score) - (a.overrideScore ?? a.score));
  }, [leads, filter, search]);

  const allScores = leads.map((l) => l.overrideScore ?? l.score);
  const avgScore = Math.round(allScores.reduce((s, n) => s + n, 0) / allScores.length);
  const autoAccept = leads.filter((l) => (l.overrideScore ?? l.score) >= 75).length;
  const needsReview = leads.filter((l) => { const s = l.overrideScore ?? l.score; return s >= 50 && s < 75; }).length;
  const autoReject = leads.filter((l) => (l.overrideScore ?? l.score) < 50).length;

  function applyOverride() {
    const val = parseInt(overrideValue);
    if (!overrideTarget || isNaN(val) || val < 0 || val > 100) {
      toast.error("Enter a score between 0 and 100″);
      return;
    }
    setLeads((prev) => prev.map((l) => l.id === overrideTarget.id ? { ...l, overrideScore: val } : l));
    toast.success(`Score overridden to ${val} for ${overrideTarget.homeowner}`);
    setOverrideTarget(null);
    setOverrideValue("");
  }

  function clearOverride(id: string) {
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, overrideScore: null } : l));
    toast.success("Override cleared");
  }

  function batchRescore() {
    if (rescoring) return;
    setRescoring(true);
    setRescoreProgress(0);
    const total = leads.length;
    let done = 0;
    const interval = setInterval(() => {
      done += 1;
      setRescoreProgress(Math.round((done / total) * 100));
      if (done >= total) {
        clearInterval(interval);
        setLeads(prev => prev.map(l => ({ ...l, overrideScore: null })));
        setRescoring(false);
        setRescoreProgress(0);
        toast.success(`Re-scored ${total} leads with latest AI model`);
      }
    }, 200);
  }

  function updateSim(field: keyof typeof SIMULATOR_DEFAULTS, value: number) {
    setSimValues(prev => ({ ...prev, [field]: value }));
  }

  const SIM_FIELDS: { key: keyof typeof SIMULATOR_DEFAULTS; label: string; max: number }[] = [
    { key: "verification", label: "Verification", max: 30 },
    { key: "budget", label: "Budget", max: 30 },
    { key: "urgency", label: "Urgency", max: 20 },
    { key: "history", label: "History", max: 20 },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3″>
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-purple-400″ />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Lead Scoring</h1>
            <p className="text-sm text-slate-400″>Every lead scored 0–100 with breakdown, routing rules, and override capability</p>
          </div>
          <div className="ml-auto flex items-center gap-3″>
            <button
              onClick={batchRescore}
              disabled={rescoring}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-400 text-sm font-medium border border-purple-500/25 transition-colors disabled:opacity-60″
            >
              <RefreshCw className={`w-4 h-4 ${rescoring ? "animate-spin" : ""}`} />
              {rescoring ? `Re-scoring... ${rescoreProgress}%` : "Batch Re-score"}
            </button>
          </div>
        </div>

        {rescoring && (
          <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4″>
            <div className="flex items-center justify-between mb-2″>
              <span className="text-sm text-purple-400 font-semibold">Re-scoring {leads.length} leads...</span>
              <span className="text-sm text-purple-300 font-bold">{rescoreProgress}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-700″>
              <div
                className="h-full rounded-full bg-purple-500 transition-all duration-200″
                style={{ width: `${rescoreProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4″>
          {[
            { label: "Avg Score", value: avgScore, icon: <Brain className="w-4 h-4 text-purple-400″ />, color: "text-purple-400", bg: "bg-purple-500/10" },
            { label: "Auto-Accept (75+)", value: autoAccept, icon: <CheckCircle className="w-4 h-4 text-green-400″ />, color: "text-green-400", bg: "bg-green-500/10" },
            { label: "Needs Review (50-74)", value: needsReview, icon: <AlertTriangle className="w-4 h-4 text-yellow-400″ />, color: "text-yellow-400", bg: "bg-yellow-500/10" },
            { label: "Auto-Reject (<50)", value: autoReject, icon: <XCircle className="w-4 h-4 text-red-400″ />, color: "text-red-400", bg: "bg-red-500/10" },
          ].map((s) => (
            <div key={s.label} className={`rounded-xl p-4 border border-slate-700 ${s.bg}`}>
              <div className="flex items-center gap-2 mb-2″>{s.icon}<span className="text-xs text-slate-400">{s.label}</span></div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6″>
          <div className="bg-[#0F1E35] rounded-xl border border-slate-700 p-5″>
            <div className="flex items-center gap-2 mb-1″>
              <Sliders className="w-4 h-4 text-purple-400″ />
              <span className="text-sm font-semibold text-white">Live Score Simulator</span>
            </div>
            <p className="text-xs text-slate-500 mb-5″>Adjust sliders to preview how component values affect the total score</p>
            <div className="space-y-4″>
              {SIM_FIELDS.map(({ key, label, max }) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5″>
                    <span className="text-xs text-slate-400″>{label}</span>
                    <span className={`text-xs font-bold ${scoreColor(Math.round((simValues[key] / max) * 100))}`}>
                      {simValues[key]}/{max}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={max}
                    value={simValues[key]}
                    onChange={(e) => updateSim(key, parseInt(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: simulatedScore >= 75 ? "#22c55e" : simulatedScore >= 50 ? "#eab308″ : "#ef4444" }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-slate-700 flex items-center justify-between">
              <span className="text-sm text-slate-300 font-semibold">Simulated Score</span>
              <div className="flex items-center gap-3″>
                <div className={`text-3xl font-black ${scoreColor(simulatedScore)}`}>{simulatedScore}</div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${scoreBadge(simulatedScore)}`}>
                  {scoreLabel(simulatedScore)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#0F1E35] rounded-xl border border-slate-700 p-5″>
            <div className="flex items-center gap-2 mb-1″>
              <Activity className="w-4 h-4 text-teal-400″ />
              <span className="text-sm font-semibold text-white">Recent Decisions</span>
            </div>
            <p className="text-xs text-slate-500 mb-4″>Last 10 leads scored and routed</p>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {RECENT_DECISIONS.map((d, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-[#0A1628] border border-slate-700/50″>
                  <div className={`text-lg font-black w-9 text-center shrink-0 ${scoreColor(d.score)}`}>{d.score}</div>
                  <div className="flex-1 min-w-0″>
                    <div className="flex items-center gap-2″>
                      <span className="text-white text-xs font-semibold truncate">{d.homeowner}</span>
                      <span className="text-slate-500 text-xs shrink-0″>{d.trade}</span>
                    </div>
                    <span className={`text-xs font-medium ${
                      d.outcome === "Auto-Accept" ? "text-green-400″
                      : d.outcome === "Review Queue" ? "text-yellow-400″
                      : "text-red-400″
                    }`}>{d.outcome}</span>
                  </div>
                  <span className="text-xs text-slate-600 shrink-0″>{d.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#0F1E35] rounded-xl border border-slate-700 p-5″>
          <div className="flex items-center gap-2 mb-4″>
            <BarChart3 className="w-4 h-4 text-slate-400″ />
            <span className="text-sm font-semibold text-white">Score Distribution</span>
          </div>
          <div className="flex gap-2 items-end h-20″>
            {[
              { range: "0-24″, count: leads.filter((l) => (l.overrideScore ?? l.score) < 25).length, color: "bg-red-500/60" },
              { range: "25-49″, count: leads.filter((l) => { const s = l.overrideScore ?? l.score; return s >= 25 && s < 50; }).length, color: "bg-orange-500/60" },
              { range: "50-74″, count: leads.filter((l) => { const s = l.overrideScore ?? l.score; return s >= 50 && s < 75; }).length, color: "bg-yellow-500/60" },
              { range: "75-100″, count: leads.filter((l) => (l.overrideScore ?? l.score) >= 75).length, color: "bg-green-500/60" },
            ].map((b) => {
              const maxCount = Math.max(1, leads.length);
              const pct = Math.round((b.count / maxCount) * 100);
              return (
                <div key={b.range} className="flex-1 flex flex-col items-center gap-1″>
                  <span className="text-xs text-slate-400″>{b.count}</span>
                  <div className={`w-full rounded-t-md ${b.color}`} style={{ height: `${Math.max(4, pct * 0.7)}px` }} />
                  <span className="text-xs text-slate-500″>{b.range}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#0F1E35] rounded-xl border border-slate-700 p-5″>
          <div className="flex items-center gap-2 mb-3″>
            <Sliders className="w-4 h-4 text-teal-400″ />
            <span className="text-sm font-semibold text-white">Routing Rules</span>
          </div>
          <div className="flex flex-wrap gap-3″>
            {[
              { label: "Score ≥ 75″, action: "Auto-Accept → Broadcast to top 5 matched pros", color: "border-green-500/30 bg-green-500/10 text-green-300" },
              { label: "Score 50–74″, action: "Review Queue → Admin approval before routing", color: "border-yellow-500/30 bg-yellow-500/10 text-yellow-300" },
              { label: "Score < 50″, action: "Auto-Reject → Homeowner sent onboarding tips", color: "border-red-500/30 bg-red-500/10 text-red-300" },
            ].map((r) => (
              <div key={r.label} className={`flex-1 min-w-52 rounded-lg p-3 border text-sm ${r.color}`}>
                <div className="font-semibold">{r.label}</div>
                <div className="text-xs mt-0.5 opacity-80″>{r.action}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-52″>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400″ />
            <input
              className="w-full bg-[#0F1E35] border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500″
              placeholder="Search homeowner, trade, address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1″>
            {(["all", "accepted", "review", "rejected"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  filter === f ? "bg-teal-500 text-white" : "bg-[#0F1E35] border border-slate-700 text-slate-400 hover:border-teal-500/50″
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3″>
          {filtered.map((lead) => {
            const effectiveScore = lead.overrideScore ?? lead.score;
            const expanded = expandedId === lead.id;
            return (
              <div key={lead.id} className={`rounded-xl border transition-all ${scoreBg(effectiveScore)}`}>
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer"
                  onClick={() => setExpandedId(expanded ? null : lead.id)}
                >
                  <div className="flex-shrink-0 text-center w-16″>
                    <div className={`text-3xl font-black ${scoreColor(effectiveScore)}`}>{effectiveScore}</div>
                    <div className={`text-xs font-medium ${scoreColor(effectiveScore)}`}>{scoreLabel(effectiveScore)}</div>
                    {lead.overrideScore !== null && (
                      <div className="text-xs text-slate-400 mt-0.5″>overridden</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0″>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-semibold">{lead.homeowner}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${scoreBadge(effectiveScore)}`}>
                        {scoreLabel(effectiveScore)}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-slate-600/50 text-slate-300″>{lead.trade}</span>
                    </div>
                    <div className="text-slate-400 text-xs mt-0.5 truncate">{lead.description}</div>
                    <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-slate-400″>
                      <span className="flex items-center gap-1″><MapPin className="w-3 h-3" />{lead.address}</span>
                      <span className="flex items-center gap-1″><DollarSign className="w-3 h-3" />${lead.budget.toLocaleString()} budget</span>
                      <span className="flex items-center gap-1″><Clock className="w-3 h-3" />{new Date(lead.receivedAt).toLocaleDateString()}</span>
                      <span className={`capitalize font-medium ${lead.urgency === "high" ? "text-red-400" : lead.urgency === "medium" ? "text-yellow-400" : "text-slate-400"}`}>
                        {lead.urgency} urgency
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0″>
                    <button
                      onClick={(e) => { e.stopPropagation(); setOverrideTarget(lead); setOverrideValue(String(effectiveScore)); }}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-xs border border-purple-500/20 transition-colors"
                    >
                      <Sliders className="w-3 h-3″ /> Override
                    </button>
                    {lead.overrideScore !== null && (
                      <button
                        onClick={(e) => { e.stopPropagation(); clearOverride(lead.id); }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs border border-red-500/20 transition-colors"
                      >
                        <XCircle className="w-3 h-3″ /> Clear
                      </button>
                    )}
                    {expanded ? <ChevronUp className="w-4 h-4 text-slate-400″ /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {expanded && (
                  <div className="border-t border-slate-700/50 p-4 space-y-4″>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3″>
                      {[
                        { label: "Verification", score: lead.components.verification, max: 30, desc: `Email ${lead.verifiedEmail ? "✓" : "✗"} · Phone ${lead.verifiedPhone ? "✓" : "✗"} · Address ${lead.verifiedAddress ? "✓" : "✗"}` },
                        { label: "Budget", score: lead.components.budget, max: 30, desc: `$${lead.budget.toLocaleString()} requested` },
                        { label: "Urgency", score: lead.components.urgency, max: 20, desc: `${lead.urgency} priority` },
                        { label: "History", score: lead.components.history, max: 20, desc: `${lead.pastJobs} past jobs · ${lead.avgRating > 0 ? lead.avgRating + "★ avg" : "no ratings"}` },
                      ].map((c) => (
                        <div key={c.label} className="bg-[#0A1628] rounded-lg p-3 border border-slate-700″>
                          <div className="flex items-center justify-between mb-1″>
                            <span className="text-xs text-slate-400″>{c.label}</span>
                            <span className={`text-sm font-bold ${scoreColor(Math.round((c.score / c.max) * 100))}`}>{c.score}/{c.max}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-700 mb-2″>
                            <div
                              className={`h-full rounded-full ${c.score / c.max >= 0.7 ? "bg-green-500" : c.score / c.max >= 0.4 ? "bg-yellow-500" : "bg-red-500"}`}
                              style={{ width: `${(c.score / c.max) * 100}%` }}
                            />
                          </div>
                          <div className="text-xs text-slate-500″>{c.desc}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2″>
                        <TrendingUp className="w-4 h-4 text-teal-400″ />
                        <span className="text-slate-300″>Predicted completion rate: </span>
                        <span className={`font-bold ${scoreColor(lead.predictedCompletion)}`}>{lead.predictedCompletion}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-[#0F1E35] rounded-xl border border-slate-700 p-5″>
          <div className="flex items-center gap-2 mb-4″>
            <TrendingUp className="w-4 h-4 text-teal-400″ />
            <span className="text-sm font-semibold text-white">Historical Scoring Accuracy</span>
            <span className="text-xs text-slate-400 ml-auto">Last 90 days · 170 scored leads</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700″>
                  <th className="text-left py-2 text-xs text-slate-400 font-semibold uppercase tracking-wide">Score Range</th>
                  <th className="text-center py-2 text-xs text-slate-400 font-semibold uppercase tracking-wide">Leads</th>
                  <th className="text-center py-2 text-xs text-slate-400 font-semibold uppercase tracking-wide">Predicted Completion</th>
                  <th className="text-center py-2 text-xs text-slate-400 font-semibold uppercase tracking-wide">Actual Completion</th>
                  <th className="text-center py-2 text-xs text-slate-400 font-semibold uppercase tracking-wide">Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50″>
                {HISTORICAL_ACCURACY.map((row) => {
                  const accuracy = Math.round((1 - Math.abs(row.predicted - row.actual) / row.predicted) * 100);
                  return (
                    <tr key={row.range} className="hover:bg-slate-700/20″>
                      <td className="py-2.5 font-semibold text-white">{row.range}</td>
                      <td className="py-2.5 text-center text-slate-300″>{row.count}</td>
                      <td className="py-2.5 text-center text-slate-300″>{row.predicted}%</td>
                      <td className="py-2.5 text-center text-slate-300″>{row.actual}%</td>
                      <td className="py-2.5 text-center">
                        <span className={`font-bold ${accuracy >= 90 ? "text-green-400" : accuracy >= 80 ? "text-yellow-400" : "text-red-400"}`}>
                          {accuracy}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <Dialog open={!!overrideTarget} onOpenChange={() => { setOverrideTarget(null); setOverrideValue(""); }}>
          <DialogContent className="max-w-sm bg-[#0A1628] border border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2″>
                <Sliders className="w-5 h-5 text-purple-400″ />
                Override Score
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2″>
              <div className="text-sm text-slate-300″>
                Setting manual score for <span className="text-white font-semibold">{overrideTarget?.homeowner}</span>
              </div>
              <div className="text-xs text-slate-400″>
                AI score: <span className={`font-bold ${scoreColor(overrideTarget?.score ?? 0)}`}>{overrideTarget?.score}</span>
                {overrideTarget?.overrideScore !== null && (
                  <> · Current override: <span className="text-purple-400 font-bold">{overrideTarget?.overrideScore}</span></>
                )}
              </div>
              <input
                type="number"
                min="0″
                max="100″
                className="w-full bg-[#0F1E35] border border-slate-700 rounded-lg px-3 py-2 text-white text-lg text-center font-bold focus:outline-none focus:ring-1 focus:ring-purple-500″
                placeholder="0–100″
                value={overrideValue}
                onChange={(e) => setOverrideValue(e.target.value)}
              />
              <div className="text-xs text-slate-500″>
                ≥75 = Auto-Accept · 50–74 = Review · &lt;50 = Auto-Reject
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-slate-600 text-slate-400″ onClick={() => { setOverrideTarget(null); setOverrideValue(""); }}>Cancel</Button>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white" onClick={applyOverride}>Apply Override</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
