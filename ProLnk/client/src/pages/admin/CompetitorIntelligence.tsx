import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, AlertCircle, TrendingUp, Shield, DollarSign, Users, Star, Zap } from "lucide-react";

interface Competitor {
  name: string;
  model: string;
  partnerFee: string;
  homeownerFee: string;
  commissionModel: string;
  strengths: string[];
  weaknesses: string[];
  prolnkAdvantage: string;
  threatLevel: "Low" | "Medium" | "High";
  marketShare: number;
}

const COMPETITORS: Competitor[] = [
  {
    name: "Angi (formerly Angie's List)",
    model: "Lead marketplace — contractors pay per lead",
    partnerFee: "$15–$80 per lead",
    homeownerFee: "Free",
    commissionModel: "Pay-per-lead, no commission on job value",
    strengths: ["Massive brand recognition", "Huge homeowner database", "Broad service categories"],
    weaknesses: ["Low lead quality (shared leads)", "No job completion verification", "No automated commission", "High churn from contractors", "No partner tier system"],
    prolnkAdvantage: "ProLnk uses verified job completion + automated V12 commission — partners only pay when they actually earn, not per lead gamble",
    threatLevel: "High",
    marketShare: 28,
  },
  {
    name: "Thumbtack",
    model: "Lead marketplace — pros pay to send quotes",
    partnerFee: "$3–$50 per quote sent",
    homeownerFee: "Free",
    commissionModel: "Pay-per-quote, no revenue share",
    strengths: ["Strong mobile UX", "Instant booking flow", "Wide service coverage"],
    weaknesses: ["Quote fatigue for pros", "No referral network", "No recurring revenue for pros", "No tier/loyalty system", "No insurance job flow"],
    prolnkAdvantage: "ProLnk's referral network creates compounding income — partners earn from their network, not just their own jobs",
    threatLevel: "High",
    marketShare: 18,
  },
  {
    name: "Jobber",
    model: "FSM software — subscription for field service businesses",
    partnerFee: "$49–$249/mo subscription",
    homeownerFee: "N/A",
    commissionModel: "No commission model — pure SaaS",
    strengths: ["Excellent job management", "Invoicing and scheduling", "Strong integrations"],
    weaknesses: ["No lead generation", "No homeowner marketplace", "No referral income", "No commission automation"],
    prolnkAdvantage: "ProLnk integrates WITH Jobber (not against it) — partners use Jobber for ops and ProLnk for lead income",
    threatLevel: "Low",
    marketShare: 8,
  },
  {
    name: "Housecall Pro",
    model: "FSM software + some marketing tools",
    partnerFee: "$65–$169/mo",
    homeownerFee: "N/A",
    commissionModel: "No commission model",
    strengths: ["Good mobile app", "Customer communication tools", "Review generation"],
    weaknesses: ["No referral income", "No homeowner marketplace", "No automated commission", "Limited to existing customer base"],
    prolnkAdvantage: "ProLnk adds a new revenue stream ON TOP of what Housecall Pro provides — additive, not competitive",
    threatLevel: "Low",
    marketShare: 7,
  },
  {
    name: "ServiceTitan",
    model: "Enterprise FSM — large contractor businesses",
    partnerFee: "$398+/mo",
    homeownerFee: "N/A",
    commissionModel: "No commission model",
    strengths: ["Enterprise-grade features", "Deep analytics", "Franchise support"],
    weaknesses: ["Extremely expensive", "Complex onboarding", "No lead marketplace", "No referral income model"],
    prolnkAdvantage: "ProLnk targets the 95% of contractors ServiceTitan prices out — accessible, mobile-first, income-generating",
    threatLevel: "Low",
    marketShare: 5,
  },
  {
    name: "HomeAdvisor (Angi Leads)",
    model: "Lead marketplace — same as Angi",
    partnerFee: "$15–$100 per lead",
    homeownerFee: "Free",
    commissionModel: "Pay-per-lead",
    strengths: ["Large homeowner base", "Instant lead delivery"],
    weaknesses: ["Shared leads (same lead sold to 3-5 pros)", "No job verification", "No commission automation", "High contractor dissatisfaction"],
    prolnkAdvantage: "ProLnk's exclusive lead routing means partners compete on quality, not speed — one partner per opportunity",
    threatLevel: "Medium",
    marketShare: 15,
  },
  {
    name: "Porch",
    model: "Home services marketplace + moving services",
    partnerFee: "Varies by service",
    homeownerFee: "Free",
    commissionModel: "Revenue share on some services",
    strengths: ["Moving + home services bundle", "Lowe's partnership"],
    weaknesses: ["Weak contractor loyalty", "No tier system", "No referral network", "Limited to moving-adjacent services"],
    prolnkAdvantage: "ProLnk's partner tier system creates loyalty and income growth — Porch has no equivalent retention mechanism",
    threatLevel: "Low",
    marketShare: 4,
  },
  {
    name: "Yelp for Business",
    model: "Review platform + lead ads",
    partnerFee: "$300–$1,000+/mo for ads",
    homeownerFee: "Free",
    commissionModel: "No commission — pure advertising",
    strengths: ["Massive review database", "Local SEO authority", "Consumer trust"],
    weaknesses: ["No job completion tracking", "No commission automation", "Expensive ads with low ROI", "No partner network"],
    prolnkAdvantage: "ProLnk generates organic referrals through the partner network — no ad spend required for partners to grow",
    threatLevel: "Medium",
    marketShare: 9,
  },
];

const FEATURE_MATRIX = [
  { feature: "Automated Commission Collection", prolnk: true, angi: false, thumbtack: false, jobber: false },
  { feature: "Partner Referral Network Income", prolnk: true, angi: false, thumbtack: false, jobber: false },
  { feature: "Partner Tier / Loyalty System", prolnk: true, angi: false, thumbtack: false, jobber: false },
  { feature: "Insurance Job ACH Flow", prolnk: true, angi: false, thumbtack: false, jobber: false },
  { feature: "Homeowner Card-on-File Charging", prolnk: true, angi: false, thumbtack: false, jobber: false },
  { feature: "Zero Self-Reporting Commission", prolnk: true, angi: false, thumbtack: false, jobber: false },
  { feature: "AI Home Scan + Lead Generation", prolnk: true, angi: false, thumbtack: false, jobber: false },
  { feature: "Exclusive (Non-Shared) Leads", prolnk: true, angi: false, thumbtack: false, jobber: false },
  { feature: "FSM Software Integration", prolnk: true, angi: false, thumbtack: false, jobber: true },
  { feature: "Homeowner Portal (TrustyPro)", prolnk: true, angi: false, thumbtack: false, jobber: false },
  { feature: "Before/After AI Photo Generation", prolnk: true, angi: false, thumbtack: false, jobber: false },
  { feature: "Patent-Protected Architecture", prolnk: true, angi: false, thumbtack: false, jobber: false },
];

export default function CompetitorIntelligence() {
  const threatColors = { Low: "#10B981", Medium: "#F59E0B", High: "#EF4444" };
  const threatBg = { Low: "#D1FAE5", Medium: "#FEF3C7", High: "#FEE2E2" };

  return (
    <AdminLayout title="Competitor Intelligence" subtitle="Competitive landscape analysis and ProLnk differentiation map">
      <div className="space-y-6">
        {/* Market Share Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              Market Share Landscape
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {COMPETITORS.map(c => (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 w-40 truncate flex-shrink-0">{c.name}</span>
                  <Progress value={c.marketShare} className="flex-1 h-2" />
                  <span className="text-xs font-semibold text-gray-700 w-8 text-right">{c.marketShare}%</span>
                  <Badge className="text-xs w-16 justify-center" style={{ backgroundColor: threatBg[c.threatLevel], color: threatColors[c.threatLevel], border: "none" }}>
                    {c.threatLevel}
                  </Badge>
                </div>
              ))}
              <div className="flex items-center gap-3 pt-2 border-t">
                <span className="text-xs font-bold text-indigo-700 w-40 flex-shrink-0">ProLnk (Target)</span>
                <Progress value={6} className="flex-1 h-2" />
                <span className="text-xs font-bold text-indigo-700 w-8 text-right">6%</span>
                <Badge className="text-xs w-16 justify-center bg-indigo-100 text-indigo-700 border-none">Target</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Differentiation Matrix */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              Feature Differentiation Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 text-gray-600 font-medium text-xs">Feature</th>
                    <th className="text-center py-2 px-3 text-indigo-700 font-bold text-xs">ProLnk</th>
                    <th className="text-center py-2 px-3 text-gray-500 font-medium text-xs">Angi</th>
                    <th className="text-center py-2 px-3 text-gray-500 font-medium text-xs">Thumbtack</th>
                    <th className="text-center py-2 px-3 text-gray-500 font-medium text-xs">Jobber</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {FEATURE_MATRIX.map(row => (
                    <tr key={row.feature} className="hover:bg-gray-50">
                      <td className="py-2 pr-4 text-xs text-gray-700">{row.feature}</td>
                      <td className="text-center py-2 px-3">
                        {row.prolnk ? <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                      </td>
                      <td className="text-center py-2 px-3">
                        {row.angi ? <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                      </td>
                      <td className="text-center py-2 px-3">
                        {row.thumbtack ? <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                      </td>
                      <td className="text-center py-2 px-3">
                        {row.jobber ? <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">ProLnk leads on 11 of 12 differentiating features. The one shared feature (FSM integration) is intentional — we integrate with Jobber, not compete with it.</p>
          </CardContent>
        </Card>

        {/* Competitor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMPETITORS.map(c => (
            <Card key={c.name} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{c.name}</h3>
                    <p className="text-xs text-gray-500">{c.model}</p>
                  </div>
                  <Badge className="text-xs flex-shrink-0" style={{ backgroundColor: threatBg[c.threatLevel], color: threatColors[c.threatLevel], border: "none" }}>
                    {c.threatLevel} Threat
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-gray-400 mb-0.5">Partner Cost</p>
                    <p className="font-semibold text-gray-800">{c.partnerFee}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-gray-400 mb-0.5">Commission</p>
                    <p className="font-semibold text-gray-800 truncate">{c.commissionModel}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-500" /> Strengths
                    </p>
                    <ul className="space-y-0.5">
                      {c.strengths.slice(0, 2).map(s => (
                        <li key={s} className="text-xs text-gray-500">• {s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
                      <XCircle className="w-3 h-3 text-red-400" /> Weaknesses
                    </p>
                    <ul className="space-y-0.5">
                      {c.weaknesses.slice(0, 2).map(w => (
                        <li key={w} className="text-xs text-gray-500">• {w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100">
                  <p className="text-xs font-semibold text-indigo-700 mb-0.5 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> ProLnk Advantage
                  </p>
                  <p className="text-xs text-indigo-600 leading-relaxed">{c.prolnkAdvantage}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Strategic Summary */}
        <Card className="border-indigo-200 bg-indigo-50">
          <CardContent className="p-5">
            <h3 className="text-sm font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-indigo-600" />
              Strategic Summary: Why ProLnk Wins
            </h3>
            <div className="space-y-2">
              {[
                "No competitor has automated commission collection tied to job completion — this is ProLnk's core patent-protected moat",
                "The referral network income model creates compounding earnings that lead marketplaces cannot replicate",
                "FSM integrations (Jobber, Housecall Pro, ServiceTitan) make ProLnk additive, not competitive — reducing churn risk",
                "TrustyPro's homeowner portal creates a two-sided marketplace that Angi/Thumbtack cannot match without a full rebuild",
                "The V12 payment architecture (ACH for insurance jobs + card-on-file for standard jobs) covers the full job type spectrum",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-xs text-indigo-800 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
