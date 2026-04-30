import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Brain, Zap, MapPin, DollarSign, TrendingUp, Clock } from "lucide-react";

function scoreColor(score: number) {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
}

function scoreBg(score: number) {
  if (score >= 80) return "bg-green-500/20 border-green-500/30";
  if (score >= 60) return "bg-yellow-500/20 border-yellow-500/30";
  if (score >= 40) return "bg-orange-500/20 border-orange-500/30";
  return "bg-red-500/20 border-red-500/30";
}

function scoreLabel(score: number) {
  if (score >= 80) return "Hot Lead";
  if (score >= 60) return "Warm Lead";
  if (score >= 40) return "Lukewarm";
  return "Cold Lead";
}

// Deterministic AI score based on opportunity fields
function computeLeadScore(opp: {
  opportunityType: string;
  estimatedJobValue?: string | null;
  status: string;
  createdAt?: Date | null;
}): number {
  let score = 50;

  // Job value boost
  const val = Number(opp.estimatedJobValue ?? 0);
  if (val >= 5000) score += 25;
  else if (val >= 1000) score += 15;
  else if (val >= 500) score += 8;
  else if (val > 0) score += 3;

  // Opportunity type boost (high-value service categories)
  const highValue = ["pool", "hvac", "roofing", "solar", "remodel", "electrical", "plumbing"];
  const medValue = ["fence", "window", "landscaping", "tree", "pest", "pressure"];
  const typeLC = opp.opportunityType.toLowerCase();
  if (highValue.some((k) => typeLC.includes(k))) score += 20;
  else if (medValue.some((k) => typeLC.includes(k))) score += 10;

  // Recency boost
  if (opp.createdAt) {
    const hoursAgo = (Date.now() - new Date(opp.createdAt).getTime()) / 3600000;
    if (hoursAgo < 24) score += 10;
    else if (hoursAgo < 72) score += 5;
  }

  // Status penalty
  if (opp.status === "declined" || opp.status === "expired") score -= 20;

  return Math.max(0, Math.min(100, score));
}

export default function LeadScoring() {
  const { data: opps, isLoading } = trpc.admin.getAllOpportunities.useQuery();

  const scored = (opps ?? [])
    .map((o) => ({ ...o, score: computeLeadScore(o) }))
    .sort((a, b) => b.score - a.score);

  const avgScore = scored.length
    ? Math.round(scored.reduce((s, o) => s + o.score, 0) / scored.length)
    : 0;
  const hotLeads = scored.filter((o) => o.score >= 80).length;
  const coldLeads = scored.filter((o) => o.score < 40).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Lead Scoring</h1>
            <p className="text-sm text-slate-400">Every lead scored 0-100 based on job type, value, and recency</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Avg Score", value: avgScore, icon: <Brain className="w-4 h-4 text-purple-400" />, color: "text-purple-400" },
            { label: "Hot Leads (80+)", value: hotLeads, icon: <Zap className="w-4 h-4 text-green-400" />, color: "text-green-400" },
            { label: "Cold Leads (<40)", value: coldLeads, icon: <TrendingUp className="w-4 h-4 text-red-400" />, color: "text-red-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                {stat.icon}
                <span className="text-xs text-slate-400">{stat.label}</span>
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Lead list */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : scored.length === 0 ? (
          <div className="bg-slate-800 rounded-xl p-12 text-center">
            <Brain className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No leads to score yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {scored.map((opp) => (
              <div
                key={opp.id}
                className={`flex items-center gap-4 p-4 rounded-xl border ${scoreBg(opp.score)}`}
              >
                {/* Score ring */}
                <div className="flex-shrink-0 text-center w-16">
                  <p className={`text-3xl font-black ${scoreColor(opp.score)}`}>{opp.score}</p>
                  <p className={`text-xs font-medium ${scoreColor(opp.score)}`}>{scoreLabel(opp.score)}</p>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white capitalize">{opp.opportunityType.replace(/_/g, " ")}</p>
                  <div className="flex flex-wrap gap-3 mt-1">
                    {opp.serviceAddress && (
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <MapPin className="w-3 h-3" /> {opp.serviceAddress}
                      </span>
                    )}
                    {opp.estimatedJobValue && (
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <DollarSign className="w-3 h-3" /> ${Number(opp.estimatedJobValue).toLocaleString()} est.
                      </span>
                    )}
                    {opp.createdAt && (
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3" /> {new Date(opp.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status */}
                <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                  opp.status === "converted" ? "bg-green-500/20 text-green-400" :
                  opp.status === "accepted" ? "bg-teal-500/20 text-teal-400" :
                  opp.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-slate-600/50 text-slate-400"
                }`}>
                  {opp.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
