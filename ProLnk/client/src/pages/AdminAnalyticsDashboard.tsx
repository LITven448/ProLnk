import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { TrendingUp, BarChart3, PieChart, LineChart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ConversionFunnel {
  source: string;
  totalVisits: number;
  completedSignups: number;
  abandonedForms: number;
  conversionRate: number;
  averageTimeToComplete: number;
}

export default function AdminAnalyticsDashboard() {
  const { user } = useAuth();
  const [selectedDays, setSelectedDays] = useState(30);

  const { data: metrics, isLoading: metricsLoading } = trpc.analytics.getMetrics.useQuery();
  const { data: funnels, isLoading: funnelsLoading } = trpc.analytics.getConversionFunnels.useQuery();
  const { data: trends, isLoading: trendsLoading } = trpc.analytics.getSignupTrends.useQuery({ days: selectedDays });

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600">Access denied. Admin access required.</p>
      </div>
    );
  }

  const sourceNames: Record<string, string> = {
    pro_waitlist: "Pro Waitlist",
    trustypro_7step: "TrustyPro (7-Step)",
    trustypro_simple: "TrustyPro (Simple)",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Analytics Dashboard</h1>
          <p className="text-slate-600">Waitlist conversion metrics and trends</p>
        </div>

        {/* Key Metrics Grid */}
        {!metricsLoading && metrics && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-600">Total Signups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{metrics.totalSignups}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-600 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> Avg Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {Math.round(metrics.averageFormCompletionTime / 1000)}s
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-600">Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">{metrics.referralConversions}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-600">SMS Opt-in Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{metrics.smsOptInRate.toFixed(1)}%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-600">License Upload Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{metrics.licenseUploadRate.toFixed(1)}%</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Conversion Funnels */}
        {!funnelsLoading && funnels && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Conversion Funnels by Source
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Form Source</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-slate-900">Total Visits</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-slate-900">Completions</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-slate-900">Abandonments</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-slate-900">Conversion %</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-slate-900">Avg Time (s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funnels.map((funnel: ConversionFunnel) => (
                      <tr key={funnel.source} className="border-b hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium">
                          {sourceNames[funnel.source] || funnel.source}
                        </td>
                        <td className="px-6 py-4 text-center text-sm">{funnel.totalVisits}</td>
                        <td className="px-6 py-4 text-center text-sm font-semibold text-green-600">
                          {funnel.completedSignups}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-red-600">{funnel.abandonedForms}</td>
                        <td className="px-6 py-4 text-center text-sm font-bold">
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded">
                            {funnel.conversionRate.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-sm">
                          {(funnel.averageTimeToComplete / 1000).toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Signup Trends */}
        {!trendsLoading && trends && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  Signup Trends (Last {selectedDays} Days)
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={selectedDays === 7 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDays(7)}
                  >
                    7D
                  </Button>
                  <Button
                    variant={selectedDays === 30 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDays(30)}
                  >
                    30D
                  </Button>
                  <Button
                    variant={selectedDays === 90 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDays(90)}
                  >
                    90D
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-slate-900">Date</th>
                      <th className="px-6 py-3 text-center font-semibold text-slate-900">Pro Waitlist</th>
                      <th className="px-6 py-3 text-center font-semibold text-slate-900">TrustyPro 7-Step</th>
                      <th className="px-6 py-3 text-center font-semibold text-slate-900">TrustyPro Simple</th>
                      <th className="px-6 py-3 text-center font-semibold text-slate-900">Daily Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(trends) &&
                      trends
                        .reduce(
                          (acc: any, item: any) => {
                            const existing = acc.find((x: any) => x.date === item.date);
                            if (existing) {
                              existing[item.source] = item.count;
                            } else {
                              acc.push({
                                date: item.date,
                                pro_waitlist: 0,
                                trustypro_7step: 0,
                                trustypro_simple: 0,
                                [item.source]: item.count,
                              });
                            }
                            return acc;
                          },
                          [] as any[]
                        )
                        .map((row: any) => (
                          <tr key={row.date} className="border-b hover:bg-slate-50">
                            <td className="px-6 py-4">{new Date(row.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-center">{row.pro_waitlist || 0}</td>
                            <td className="px-6 py-4 text-center">{row.trustypro_7step || 0}</td>
                            <td className="px-6 py-4 text-center">{row.trustypro_simple || 0}</td>
                            <td className="px-6 py-4 text-center font-bold">
                              {(row.pro_waitlist || 0) + (row.trustypro_7step || 0) + (row.trustypro_simple || 0)}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
              {(!trends || trends.length === 0) && (
                <p className="text-center text-slate-500 py-8">No data available for the selected period</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
