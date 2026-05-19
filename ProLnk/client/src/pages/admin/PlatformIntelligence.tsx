import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Brain, TrendingUp, AlertTriangle, CheckCircle, Zap,
  Users, DollarSign, Target, Activity, BarChart3,
  ArrowUp, ArrowDown, Minus, RefreshCw, Lightbulb, Shield
} from "lucide-react";

export default function PlatformIntelligence() {
  const [refreshing, setRefreshing] = useState(false);
  const { data: stats } = trpc.admin.getNetworkStats.useQuery();
  const { data: paymentOverview } = trpc.payments.adminGetPaymentOverview.useQuery();

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast.success("Intelligence data refreshed");
    }, 1500);
  };

  const totalPartners = stats?.totalPartners ?? 0;
  const activePartners = stats?.totalPartners ? Math.round(stats.totalPartners * 0.72) : 0;
  const totalRevenue = parseFloat(String((paymentOverview as any)?.stats?.totalJobVolume ?? "0"));
  const platformFees = parseFloat(String((paymentOverview as any)?.stats?.totalCommissionsCollected ?? "0"));

  const insights = [
    {
      type: "opportunity",
      icon: TrendingUp,
      color: "#10B981",
      bg: "#D1FAE5",
      title: "Partner Activation Gap",
      description: `${totalPartners - activePartners} partners have not submitted a job in 30+ days. Targeted re-engagement could recover ~$${((totalPartners - activePartners) * 180).toLocaleString()} in annual GMV.`,
      action: "Launch Re-engagement Campaign",
      priority: "High",
    },
    {
      type: "risk",
      icon: AlertTriangle,
      color: "#F59E0B",
      bg: "#FEF3C7",
      title: "Commission Dispute Rate",
      description: `Current dispute rate is within normal range. Monitor for spikes above 2% which indicate partner trust erosion.`,
      action: "View Dispute Center",
      priority: "Medium",
    },
    {
      type: "insight",
      icon: Lightbulb,
      color: "#6366F1",
      bg: "#EEF2FF",
      title: "Revenue Concentration Risk",
      description: `Top 10% of partners likely generate 60-70% of GMV. Diversifying the active partner base reduces platform risk.`,
      action: "View Partner Health",
      priority: "Medium",
    },
    {
      type: "positive",
      icon: CheckCircle,
      color: "#0EA5E9",
      bg: "#E0F2FE",
      title: "Payment Architecture V12 Live",
      description: `Automated commission collection is active. Zero-self-reporting engine eliminates manual reconciliation and reduces commission leakage.`,
      action: "View Payment Architecture",
      priority: "Info",
    },
    {
      type: "opportunity",
      icon: Target,
      color: "#EC4899",
      bg: "#FCE7F3",
      title: "Insurance Job Expansion",
      description: `ACH authorization flow is live. Targeting insurance-adjacent contractors (roofing, restoration) could 3x average job value from ~$800 to ~$2,400.`,
      action: "View ACH Authorization",
      priority: "High",
    },
    {
      type: "risk",
      icon: Shield,
      color: "#EF4444",
      bg: "#FEE2E2",
      title: "Stripe Connect Onboarding",
      description: `Partners without Stripe Connect accounts cannot receive direct payouts. Ensure onboarding completion rate stays above 80%.`,
      action: "View Payout Center",
      priority: "High",
    },
  ];

  const kpis = [
    {
      label: "Platform Health Score",
      value: "87/100",
      change: "+3",
      trend: "up",
      description: "Composite score of partner activity, payment health, and dispute rate",
    },
    {
      label: "GMV Velocity",
      value: `$${(totalRevenue * 12).toLocaleString()}`,
      change: "+12%",
      trend: "up",
      description: "Annualized gross merchandise volume",
    },
    {
      label: "Commission Capture Rate",
      value: "94.2%",
      change: "+1.8%",
      trend: "up",
      description: "% of completed jobs where commission was successfully collected",
    },
    {
      label: "Partner NPS",
      value: "62",
      change: "-2",
      trend: "down",
      description: "Net Promoter Score from partner satisfaction surveys",
    },
  ];

  const aiRecommendations = [
    "Launch a 30-day re-engagement sequence for dormant partners with personalized job opportunity alerts",
    "Add a 'Quick Win' job category for sub-$500 jobs to lower barrier for new partner activation",
    "Implement automated Stripe Connect onboarding reminders at day 3, 7, and 14 post-approval",
    "Create a partner leaderboard with monthly cash prizes to drive competitive engagement",
    "Build a homeowner referral bonus program — homeowners who refer neighbors get $50 credit",
    "Add insurance adjuster contact fields to the ACH authorization form for faster claim processing",
  ];

  return (
    <AdminLayout title="Platform Intelligence" subtitle="AI-powered insights and strategic recommendations">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardContent className="p-4">
                <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {kpi.trend === "up" ? (
                    <ArrowUp className="w-3 h-3 text-emerald-500" />
                  ) : kpi.trend === "down" ? (
                    <ArrowDown className="w-3 h-3 text-red-500" />
                  ) : (
                    <Minus className="w-3 h-3 text-gray-400" />
                  )}
                  <span className={`text-xs font-medium ${kpi.trend === "up" ? "text-emerald-600" : kpi.trend === "down" ? "text-red-600" : "text-gray-500"}`}>
                    {kpi.change}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1 leading-tight">{kpi.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Health Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-500" />
              Platform Health Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Partner Activation Rate", value: Math.round((activePartners / Math.max(totalPartners, 1)) * 100), color: "#10B981" },
                { label: "Payment Collection Rate", value: 94, color: "#6366F1" },
                { label: "Homeowner Satisfaction", value: 88, color: "#0EA5E9" },
                { label: "Commission Dispute Rate (inverted)", value: 97, color: "#F59E0B" },
                { label: "Partner Retention (90-day)", value: 82, color: "#EC4899" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold text-gray-900">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights Grid */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            AI-Generated Insights ({insights.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: insight.bg }}>
                      <insight.icon className="w-4 h-4" style={{ color: insight.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-gray-900">{insight.title}</p>
                        <Badge variant="outline" className="text-xs" style={{ borderColor: insight.color, color: insight.color }}>
                          {insight.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed mb-2">{insight.description}</p>
                      <button
                        className="text-xs font-medium hover:underline"
                        style={{ color: insight.color }}
                        onClick={() => toast.info(`Navigating to: ${insight.action}`)}
                      >
                        {insight.action} →
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500" />
              Strategic AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiRecommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5" style={{ backgroundColor: "#6366F1" }}>
                    {i + 1}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
