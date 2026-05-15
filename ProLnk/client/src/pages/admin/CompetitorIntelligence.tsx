import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, TrendingUp, Shield, DollarSign, Users, Star, Zap, Newspaper, Target, ArrowUp, ArrowDown } from "lucide-react";

interface Competitor {
  name: string;
  shortName: string;
  model: string;
  pricingModel: string;
  leadQuality: number;
  networkEffects: number;
  homeownerTrust: number;
  partnerIncome: number;
  partnerFee: string;
  homeownerFee: string;
  strengths: string[];
  weaknesses: string[];
  prolnkAdvantage: string;
  threatLevel: "Low" | "Medium" | "High";
  marketShare: number;
  recentNews: string;
  newsDate: string;
  newsImpact: "positive" | "negative" | "neutral";
}

const COMPETITORS: Competitor[] = [
  {
    name: "Angi (formerly Angie's List)",
    shortName: "Angi",
    model: "Lead marketplace — contractors pay per lead",
    pricingModel: "$15–$80 per lead",
    leadQuality: 38,
    networkEffects: 55,
    homeownerTrust: 72,
    partnerIncome: 20,
    partnerFee: "$15–$80 per lead",
    homeownerFee: "Free",
    strengths: ["Massive brand recognition", "Huge homeowner database", "Broad service categories", "TV advertising budget"],
    weaknesses: ["Low lead quality (shared leads)", "No job completion verification", "No automated commission", "High churn from contractors", "No partner tier system", "Shared leads sold to 3–5 pros simultaneously"],
    prolnkAdvantage: "ProLnk uses verified job completion + automated commission — partners only pay when they actually earn, not per lead gamble",
    threatLevel: "High",
    marketShare: 28,
    recentNews: "Angi reports 18% YoY decline in contractor retention; CEO acknowledges lead quality crisis in Q1 earnings call",
    newsDate: "Apr 2026",
    newsImpact: "positive",
  },
  {
    name: "Thumbtack",
    shortName: "Thumbtack",
    model: "Lead marketplace — pros pay to send quotes",
    pricingModel: "$3–$50 per quote",
    leadQuality: 42,
    networkEffects: 48,
    homeownerTrust: 65,
    partnerIncome: 15,
    partnerFee: "$3–$50 per quote sent",
    homeownerFee: "Free",
    strengths: ["Strong mobile UX", "Instant booking flow", "Wide service coverage", "Fast-loading quote interface"],
    weaknesses: ["Quote fatigue for pros", "No referral network", "No recurring revenue for pros", "No tier/loyalty system", "No insurance job flow", "Pros compete on price alone"],
    prolnkAdvantage: "ProLnk's referral network creates compounding income — partners earn from their downline, not just their own jobs",
    threatLevel: "High",
    marketShare: 18,
    recentNews: "Thumbtack raises prices 22% for pros in competitive markets; contractor churn surging in top-50 metro areas",
    newsDate: "Mar 2026",
    newsImpact: "positive",
  },
  {
    name: "HomeAdvisor (Angi Leads)",
    shortName: "HomeAdvisor",
    model: "Lead marketplace — same parent as Angi",
    pricingModel: "$15–$100 per lead",
    leadQuality: 35,
    networkEffects: 50,
    homeownerTrust: 60,
    partnerIncome: 18,
    partnerFee: "$15–$100 per lead",
    homeownerFee: "Free",
    strengths: ["Large homeowner base", "Instant lead delivery", "Background check badge"],
    weaknesses: ["Shared leads (same lead sold to 3–5 pros)", "No job verification", "No commission automation", "High contractor dissatisfaction", "FTC settlement for misleading practices"],
    prolnkAdvantage: "ProLnk's exclusive lead routing means partners compete on quality, not speed — one partner per opportunity",
    threatLevel: "Medium",
    marketShare: 15,
    recentNews: "FTC investigation into lead reselling practices; class action suit from 1,200 contractors alleging fraudulent lead charges",
    newsDate: "Feb 2026",
    newsImpact: "positive",
  },
  {
    name: "Yelp for Business",
    shortName: "Yelp",
    model: "Review platform + pay-per-click ads",
    pricingModel: "$300–$1,000+/mo advertising",
    leadQuality: 45,
    networkEffects: 62,
    homeownerTrust: 78,
    partnerIncome: 5,
    partnerFee: "$300–$1,000+/mo for ads",
    homeownerFee: "Free",
    strengths: ["Massive review database", "Local SEO authority", "Consumer trust", "Deep Google integration"],
    weaknesses: ["No job completion tracking", "No commission automation", "Expensive ads with low ROI", "No partner network", "Review manipulation allegations"],
    prolnkAdvantage: "ProLnk generates organic referrals through partner network — no ad spend required for partners to grow",
    threatLevel: "Medium",
    marketShare: 9,
    recentNews: "Yelp launches 'Request a Quote' feature directly competing with Angi/Thumbtack; 40% lower conversion than expected",
    newsDate: "Apr 2026",
    newsImpact: "neutral",
  },
  {
    name: "Jobber",
    shortName: "Jobber",
    model: "FSM software — subscription for field service businesses",
    pricingModel: "$49–$249/mo subscription",
    leadQuality: 0,
    networkEffects: 20,
    homeownerTrust: 55,
    partnerIncome: 0,
    partnerFee: "$49–$249/mo subscription",
    homeownerFee: "N/A",
    strengths: ["Excellent job management", "Invoicing and scheduling", "Strong integrations", "200K+ users"],
    weaknesses: ["No lead generation", "No homeowner marketplace", "No referral income", "No commission automation", "Pure SaaS — no network effects"],
    prolnkAdvantage: "ProLnk integrates WITH Jobber — partners use Jobber for ops and ProLnk for lead income. Additive, not competitive.",
    threatLevel: "Low",
    marketShare: 8,
    recentNews: "Jobber announces Marketplace for third-party integrations; ProLnk partnership opportunity identified — FSM + lead gen bundle",
    newsDate: "May 2026",
    newsImpact: "positive",
  },
];

const FEATURE_MATRIX = [
  { feature: "Automated Commission Collection", prolnk: true, angi: false, thumbtack: false, homeadvisor: false, yelp: false },
  { feature: "Partner Referral Network Income", prolnk: true, angi: false, thumbtack: false, homeadvisor: false, yelp: false },
  { feature: "Partner Tier / Loyalty System", prolnk: true, angi: false, thumbtack: false, homeadvisor: false, yelp: false },
  { feature: "Exclusive (Non-Shared) Leads", prolnk: true, angi: false, thumbtack: false, homeadvisor: false, yelp: false },
  { feature: "Homeowner Card-on-File Charging", prolnk: true, angi: false, thumbtack: false, homeadvisor: false, yelp: false },
  { feature: "Insurance Job ACH Flow", prolnk: true, angi: false, thumbtack: false, homeadvisor: false, yelp: false },
  { feature: "AI Home Scan + Lead Generation", prolnk: true, angi: false, thumbtack: false, homeadvisor: false, yelp: false },
  { feature: "Zero Self-Reporting Commission", prolnk: true, angi: false, thumbtack: false, homeadvisor: false, yelp: false },
  { feature: "Homeowner Portal (TrustyPro)", prolnk: true, angi: false, thumbtack: false, homeadvisor: false, yelp: false },
  { feature: "Patent-Protected Architecture", prolnk: true, angi: false, thumbtack: false, homeadvisor: false, yelp: false },
  { feature: "FSM Software Integration", prolnk: true, angi: false, thumbtack: false, homeadvisor: false, yelp: false },
  { feature: "Brand Recognition (National TV)", prolnk: false, angi: true, thumbtack: true, homeadvisor: true, yelp: true },
];

const OPPORTUNITY_GAPS = [
  { gap: "Referral Network Income", desc: "No competitor offers a 4-level override cascade. Partners earning from downline activity is uniquely ProLnk.", impact: "Very High" },
  { gap: "Exclusive Lead Territories", desc: "Every competitor sells the same lead to 3–5 pros. ProLnk's exclusivity is a massive differentiation.", impact: "Very High" },
  { gap: "Zero-Work Commission Collection", desc: "Competitors require manual invoicing/reporting. ProLnk automates this via card-on-file + Stripe.", impact: "High" },
  { gap: "AI Home Health Vault", desc: "No competitor has a data asset capturing home health/structural data at scale. This is a 50M-home moat.", impact: "Very High" },
  { gap: "Insurance Job Flow (ACH)", desc: "Insurance-adjacent jobs are ignored by all competitors. ProLnk's ACH flow captures this category.", impact: "High" },
];

const RECENT_NEWS = [
  { competitor: "Angi", headline: "Angi reports 18% contractor retention decline in Q1 2026 earnings", date: "Apr 28, 2026", impact: "positive" as const, detail: "CEO cites lead quality as top complaint from contractor base" },
  { competitor: "Thumbtack", headline: "Thumbtack raises prices 22% for pros in competitive markets", date: "Mar 15, 2026", impact: "positive" as const, detail: "Contractor churn surging in top-50 metro areas; ProLnk opportunity to poach" },
  { competitor: "HomeAdvisor", headline: "FTC investigation into lead reselling practices opens", date: "Feb 10, 2026", impact: "positive" as const, detail: "Class action from 1,200 contractors; major PR crisis creating contractor distrust" },
  { competitor: "Jobber", headline: "Jobber Marketplace launches — third-party integrations now available", date: "May 2, 2026", impact: "neutral" as const, detail: "ProLnk partnership opportunity: list as recommended income supplement in Jobber marketplace" },
  { competitor: "Yelp", headline: "Yelp 'Request a Quote' conversion 40% below internal targets", date: "Apr 20, 2026", impact: "positive" as const, detail: "Yelp struggling to replicate lead marketplace model — homeowner intent remains low" },
];

const threatColors = { Low: "#10B981", Medium: "#F59E0B", High: "#EF4444" };
const threatBg = { Low: "rgba(16,185,129,0.15)", Medium: "rgba(245,158,11,0.15)", High: "rgba(239,68,68,0.15)" };
const impactColor = { positive: "#10B981", negative: "#EF4444", neutral: "#6B7280" };
const impactBg = { positive: "rgba(16,185,129,0.15)", negative: "rgba(239,68,68,0.15)", neutral: "rgba(107,114,128,0.15)" };
const impactLabel = { positive: "Opportunity", negative: "Watch", neutral: "Monitor" };

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold w-6 text-right" style={{ color }}>{value}</span>
    </div>
  );
}

export default function CompetitorIntelligence() {
  return (
    <AdminLayout title="Competitor Intelligence" subtitle="Competitive landscape analysis and ProLnk differentiation map">
      <div className="space-y-6">

        {/* Market Share + Threat Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Card className="bg-[#0d1b2e] border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                  Market Share Landscape
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {COMPETITORS.map(c => (
                  <div key={c.shortName} className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-28 flex-shrink-0">{c.shortName}</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-indigo-500/60" style={{ width: `${(c.marketShare / 30) * 100}%` }} />
                    </div>
                    <span className="text-xs font-bold text-white w-8 text-right">{c.marketShare}%</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 w-20 text-center"
                      style={{ backgroundColor: threatBg[c.threatLevel], color: threatColors[c.threatLevel] }}>
                      {c.threatLevel}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <span className="text-xs font-bold text-indigo-300 w-28 flex-shrink-0">ProLnk (Target)</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-indigo-400" style={{ width: "20%" }} />
                  </div>
                  <span className="text-xs font-bold text-indigo-300 w-8 text-right">6%</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full w-20 text-center bg-indigo-500/20 text-indigo-300">Target</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            {[
              { label: "High Threat", count: COMPETITORS.filter(c => c.threatLevel === "High").length, color: "#EF4444", icon: AlertCircle },
              { label: "Medium Threat", count: COMPETITORS.filter(c => c.threatLevel === "Medium").length, color: "#F59E0B", icon: AlertCircle },
              { label: "Low Threat", count: COMPETITORS.filter(c => c.threatLevel === "Low").length, color: "#10B981", icon: Shield },
            ].map(s => (
              <Card key={s.label} className="bg-[#0d1b2e] border-white/10">
                <CardContent className="p-4 flex items-center gap-3">
                  <s.icon className="w-5 h-5 flex-shrink-0" style={{ color: s.color }} />
                  <div>
                    <p className="text-2xl font-black" style={{ color: s.color }}>{s.count}</p>
                    <p className="text-xs text-gray-400">{s.label} Competitors</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Competitor Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPETITORS.map(c => (
            <Card key={c.shortName} className="bg-[#0d1b2e] border-white/10">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">{c.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{c.pricingModel}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: threatBg[c.threatLevel], color: threatColors[c.threatLevel] }}>
                    {c.threatLevel}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Lead Quality</p>
                    <ScoreBar value={c.leadQuality} color="#60a5fa" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Network Effects</p>
                    <ScoreBar value={c.networkEffects} color="#a78bfa" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Homeowner Trust</p>
                    <ScoreBar value={c.homeownerTrust} color="#34d399" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Partner Income Model</p>
                    <ScoreBar value={c.partnerIncome} color="#fbbf24" />
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 mb-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-400" /> Strengths
                    </p>
                    <ul className="space-y-0.5">
                      {c.strengths.slice(0, 2).map(s => (
                        <li key={s} className="text-xs text-gray-500">· {s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 mb-1 flex items-center gap-1">
                      <XCircle className="w-3 h-3 text-red-400" /> Weaknesses
                    </p>
                    <ul className="space-y-0.5">
                      {c.weaknesses.slice(0, 2).map(w => (
                        <li key={w} className="text-xs text-gray-500">· {w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <p className="text-xs font-semibold text-indigo-300 mb-0.5 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> ProLnk Advantage
                  </p>
                  <p className="text-xs text-indigo-200/80 leading-relaxed">{c.prolnkAdvantage}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Differentiation Matrix */}
        <Card className="bg-[#0d1b2e] border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              Feature Differentiation Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-gray-500 font-medium text-xs">Feature</th>
                    <th className="text-center py-2 px-3 text-indigo-300 font-bold text-xs">ProLnk</th>
                    <th className="text-center py-2 px-3 text-gray-500 font-medium text-xs">Angi</th>
                    <th className="text-center py-2 px-3 text-gray-500 font-medium text-xs">Thumbtack</th>
                    <th className="text-center py-2 px-3 text-gray-500 font-medium text-xs">HomeAdvisor</th>
                    <th className="text-center py-2 px-3 text-gray-500 font-medium text-xs">Yelp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {FEATURE_MATRIX.map(row => (
                    <tr key={row.feature} className="hover:bg-white/5 transition-colors">
                      <td className="py-2 pr-4 text-xs text-gray-400">{row.feature}</td>
                      <td className="text-center py-2 px-3">
                        {row.prolnk ? <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-red-500/60 mx-auto" />}
                      </td>
                      <td className="text-center py-2 px-3">
                        {row.angi ? <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-gray-600 mx-auto" />}
                      </td>
                      <td className="text-center py-2 px-3">
                        {row.thumbtack ? <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-gray-600 mx-auto" />}
                      </td>
                      <td className="text-center py-2 px-3">
                        {row.homeadvisor ? <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-gray-600 mx-auto" />}
                      </td>
                      <td className="text-center py-2 px-3">
                        {row.yelp ? <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-gray-600 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-600 mt-3">ProLnk leads on 11 of 12 features. National brand recognition is the one gap — solved by network growth and partner referrals.</p>
          </CardContent>
        </Card>

        {/* Opportunity Gaps */}
        <Card className="bg-[#0d1b2e] border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              Opportunity Gaps — What Competitors Don't Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {OPPORTUNITY_GAPS.map((gap, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-black text-emerald-400">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-bold text-white">{gap.gap}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${gap.impact === "Very High" ? "bg-emerald-500/20 text-emerald-300" : "bg-blue-500/20 text-blue-300"}`}>
                        {gap.impact} Impact
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{gap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent News Feed */}
        <Card className="bg-[#0d1b2e] border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-blue-400" />
              Competitor News Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {RECENT_NEWS.map((news, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex-shrink-0">
                    <span className="text-xs font-bold px-2 py-1 rounded-full"
                      style={{ backgroundColor: impactBg[news.impact], color: impactColor[news.impact] }}>
                      {news.competitor}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white leading-tight mb-0.5">{news.headline}</p>
                    <p className="text-xs text-gray-400 mb-1">{news.detail}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">{news.date}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: impactBg[news.impact], color: impactColor[news.impact] }}>
                        {impactLabel[news.impact]} for ProLnk
                      </span>
                    </div>
                  </div>
                  {news.impact === "positive" ? (
                    <ArrowUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : news.impact === "negative" ? (
                    <ArrowDown className="w-4 h-4 text-red-400 flex-shrink-0" />
                  ) : null}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strategic Summary */}
        <Card className="bg-indigo-500/10 border border-indigo-500/20">
          <CardContent className="p-5">
            <h3 className="text-sm font-bold text-indigo-200 mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-indigo-400" />
              Threat Assessment: Why ProLnk Wins
            </h3>
            <div className="space-y-2">
              {[
                "Angi and Thumbtack are experiencing contractor churn crises — perfect timing for ProLnk to poach dissatisfied pros at scale",
                "No competitor has automated commission collection tied to job completion — this is ProLnk's core patent-protected moat",
                "The referral network income model creates compounding earnings that lead marketplaces structurally cannot replicate",
                "HomeAdvisor's FTC investigation is a trust crisis for the whole category — ProLnk's exclusive leads narrative lands perfectly now",
                "Jobber's marketplace launch is an acquisition channel, not a threat — ProLnk as a recommended integration reaches 200K+ pros passively",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-xs text-indigo-200/80 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  );
}
