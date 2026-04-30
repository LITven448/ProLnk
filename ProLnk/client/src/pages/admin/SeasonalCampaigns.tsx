import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Calendar } from "lucide-react";

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function SeasonalCampaigns() {
  const { data, isLoading } = trpc.adminExtras.getSeasonalCampaignStats.useQuery();
  const months = data ?? [];
  const chartData = months.map((m: any) => ({ name: MONTH_NAMES[(Number(m.month) - 1) % 12], leads: Number(m.leads), conversions: Number(m.conversions) }));
  const peakMonth = months.reduce((best: any, m: any) => Number(m.leads) > Number(best?.leads ?? 0) ? m : best, months[0]);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Seasonal Campaigns</h1>
          <p className="text-muted-foreground">Lead volume and conversion rates by month to plan seasonal campaigns</p>
        </div>
        {peakMonth && <Card className="border-blue-200 bg-blue-50"><CardContent className="pt-4"><div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-blue-600" /><span className="text-sm font-medium text-blue-700">Peak month: <strong>{peakMonth.monthName}</strong> with {Number(peakMonth.leads).toLocaleString()} leads</span></div></CardContent></Card>}
        {chartData.length > 0 ? (
          <Card>
            <CardHeader><CardTitle>Monthly Lead Volume</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="leads" fill="#3b82f6" name="Leads" /><Bar dataKey="conversions" fill="#10b981" name="Conversions" /></BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ) : <Card><CardContent className="py-12 text-center text-muted-foreground">{isLoading ? "Loading…" : "No seasonal data yet."}</CardContent></Card>}
        <Card>
          <CardHeader><CardTitle>Monthly Breakdown</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b text-muted-foreground"><th className="text-left py-2">Month</th><th className="text-right py-2">Leads</th><th className="text-right py-2">Conversions</th><th className="text-right py-2">Conv. Rate</th><th className="text-right py-2">Avg Value</th></tr></thead>
                <tbody>
                  {months.map((m: any) => {
                    const rate = Number(m.leads) > 0 ? Math.round((Number(m.conversions) / Number(m.leads)) * 100) : 0;
                    return (
                      <tr key={m.month} className="border-b hover:bg-muted/20">
                        <td className="py-2 font-medium">{m.monthName}</td>
                        <td className="py-2 text-right">{Number(m.leads).toLocaleString()}</td>
                        <td className="py-2 text-right text-green-600">{Number(m.conversions).toLocaleString()}</td>
                        <td className="py-2 text-right"><Badge className={rate >= 30 ? "bg-green-100 text-green-700" : rate >= 15 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"}>{rate}%</Badge></td>
                        <td className="py-2 text-right">${Number(m.avgValue ?? 0).toFixed(0)}</td>
                      </tr>
                    );
                  })}
                  {months.length === 0 && !isLoading && <tr><td colSpan={5} className="py-8 text-center text-muted-foreground">No data yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
