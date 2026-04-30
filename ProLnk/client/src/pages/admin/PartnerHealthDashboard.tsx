import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Heart, AlertTriangle, CheckCircle, Search } from "lucide-react";

export default function PartnerHealthDashboard() {
  const { data, isLoading } = trpc.adminExtras.getPartnerHealth.useQuery();
  const [search, setSearch] = useState("");
  const partners = (data?.partners ?? []).filter((p: any) => !search || p.businessName?.toLowerCase().includes(search.toLowerCase()));

  const healthBg = (score: number) => score >= 70 ? "bg-green-100 text-green-700" : score >= 40 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700";

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Partner Health Dashboard</h1>
          <p className="text-muted-foreground">Activity, engagement, and health scoring for all approved partners</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><CheckCircle className="h-4 w-4 text-green-500" /><span className="text-sm text-muted-foreground">Healthy (70+)</span></div><div className="text-3xl font-bold text-green-600">{data?.healthy ?? 0}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><AlertTriangle className="h-4 w-4 text-red-500" /><span className="text-sm text-muted-foreground">At Risk (&lt;40)</span></div><div className="text-3xl font-bold text-red-600">{data?.atRisk ?? 0}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><Heart className="h-4 w-4 text-blue-500" /><span className="text-sm text-muted-foreground">Total Partners</span></div><div className="text-3xl font-bold">{data?.total ?? 0}</div></CardContent></Card>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Partner Health Scores</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Search partners…" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b text-muted-foreground"><th className="text-left py-2 px-3">Partner</th><th className="text-left py-2 px-3">Tier</th><th className="text-right py-2 px-3">Health</th><th className="text-right py-2 px-3">Jobs</th><th className="text-right py-2 px-3">Referrals</th><th className="text-right py-2 px-3">Rating</th><th className="text-right py-2 px-3">Last Active</th></tr></thead>
                <tbody>
                  {partners.map((p: any) => (
                    <tr key={p.id} className="border-b hover:bg-muted/20">
                      <td className="py-2 px-3 font-medium">{p.businessName}</td>
                      <td className="py-2 px-3"><Badge>{p.tier}</Badge></td>
                      <td className="py-2 px-3 text-right"><Badge className={healthBg(p.healthScore)}>{p.healthScore}</Badge></td>
                      <td className="py-2 px-3 text-right">{p.jobsLogged}</td>
                      <td className="py-2 px-3 text-right">{p.referralCount}</td>
                      <td className="py-2 px-3 text-right">{Number(p.avgRating).toFixed(1)}</td>
                      <td className="py-2 px-3 text-right text-muted-foreground">{p.daysSinceLastJob < 999 ? `${p.daysSinceLastJob}d ago` : "Never"}</td>
                    </tr>
                  ))}
                  {partners.length === 0 && !isLoading && <tr><td colSpan={7} className="py-8 text-center text-muted-foreground">No partners found.</td></tr>}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
