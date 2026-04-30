import os

base = "/home/ubuntu/duke-partners/client/src/pages/admin"

pages = {}

pages["PayoutHistory.tsx"] = '''import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { DollarSign } from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(Number(n ?? 0));
}

const TYPE_COLORS: Record<string, string> = {
  platform_fee: "bg-blue-100 text-blue-700",
  referral_commission: "bg-amber-100 text-amber-700",
  prolink_net: "bg-green-100 text-green-700",
};

export default function PayoutHistory() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = trpc.adminExtras.getPayoutHistory.useQuery({ page, limit: 50 });
  const payouts = data?.payouts ?? [];
  const total = data?.total ?? 0;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Payout History</h1>
          <p className="text-muted-foreground">All paid commissions — {total.toLocaleString()} total records</p>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-3">Partner</th>
                    <th className="text-left px-4 py-3">Type</th>
                    <th className="text-left px-4 py-3">Service</th>
                    <th className="text-right px-4 py-3">Amount</th>
                    <th className="text-right px-4 py-3">Job Value</th>
                    <th className="text-right px-4 py-3">Paid At</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">Loading…</td></tr>}
                  {!isLoading && payouts.length === 0 && <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No payouts yet.</td></tr>}
                  {payouts.map((p: any) => (
                    <tr key={p.id} className="border-b hover:bg-muted/20">
                      <td className="px-4 py-3">
                        <div className="font-medium">{p.partnerName ?? "—"}</div>
                        {p.partnerTier && <Badge className="text-xs mt-0.5">{p.partnerTier}</Badge>}
                      </td>
                      <td className="px-4 py-3"><Badge className={TYPE_COLORS[p.commissionType] ?? "bg-gray-100 text-gray-700"}>{p.commissionType?.replace(/_/g, " ")}</Badge></td>
                      <td className="px-4 py-3 text-muted-foreground">{p.serviceType ?? "—"}</td>
                      <td className="px-4 py-3 text-right font-semibold text-green-600">{fmt(p.amount)}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{p.jobValue ? fmt(p.jobValue) : "—"}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{p.paidAt ? new Date(p.paidAt).toLocaleDateString() : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Page {page} of {Math.ceil(total / 50) || 1}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
            <Button variant="outline" size="sm" disabled={page * 50 >= total} onClick={() => setPage(p => p + 1)}>Next</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
'''

pages["NPSSurveyManager.tsx"] = '''import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export default function NPSSurveyManager() {
  const { data, isLoading } = trpc.adminExtras.getNpsSurveys.useQuery({ limit: 100 });
  const stats = data?.stats;
  const surveys = data?.surveys ?? [];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">NPS Survey Manager</h1>
          <p className="text-muted-foreground">Net Promoter Score tracking and homeowner feedback</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card><CardContent className="pt-6"><div className="text-sm text-muted-foreground mb-1">NPS Score</div><div className={`text-3xl font-bold ${(stats?.npsScore ?? 0) >= 50 ? "text-green-600" : (stats?.npsScore ?? 0) >= 0 ? "text-amber-600" : "text-red-600"}`}>{stats?.npsScore ?? 0}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="text-sm text-muted-foreground mb-1">Total Responses</div><div className="text-3xl font-bold">{stats?.total ?? 0}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-1 text-sm text-green-600 mb-1"><ThumbsUp className="h-3 w-3" /> Promoters</div><div className="text-3xl font-bold text-green-600">{stats?.promoters ?? 0}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-1 text-sm text-red-500 mb-1"><ThumbsDown className="h-3 w-3" /> Detractors</div><div className="text-3xl font-bold text-red-500">{stats?.detractors ?? 0}</div></CardContent></Card>
        </div>
        <Card>
          <CardHeader><CardTitle>Recent Responses</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            {!isLoading && surveys.length === 0 && <div className="py-8 text-center text-muted-foreground">No survey responses yet.</div>}
            <div className="space-y-3">
              {surveys.map((s: any) => (
                <div key={s.id} className="border rounded-lg p-4 hover:bg-muted/20">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium">{s.homeownerName ?? "Anonymous"}</div>
                      {s.partnerName && <div className="text-sm text-muted-foreground">Partner: {s.partnerName}</div>}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`text-lg font-bold ${s.score >= 9 ? "text-green-600" : s.score >= 7 ? "text-amber-600" : "text-red-600"}`}>{s.score}/10</div>
                      <Badge className={s.score >= 9 ? "bg-green-100 text-green-700" : s.score >= 7 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}>{s.score >= 9 ? "Promoter" : s.score >= 7 ? "Passive" : "Detractor"}</Badge>
                    </div>
                  </div>
                  {s.comment && <p className="text-sm text-muted-foreground mt-2 italic">"{s.comment}"</p>}
                  <div className="text-xs text-muted-foreground mt-2">{s.completedAt ? new Date(s.completedAt).toLocaleDateString() : ""}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
'''

pages["OnboardingFunnel.tsx"] = '''import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function OnboardingFunnel() {
  const { data, isLoading } = trpc.adminExtras.getOnboardingFunnel.useQuery();
  const stages = data?.stages ?? [];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Onboarding Funnel</h1>
          <p className="text-muted-foreground">Partner application to active status conversion funnel</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><Clock className="h-4 w-4 text-amber-500" /><span className="text-sm text-muted-foreground">Pending Review</span></div><div className="text-3xl font-bold text-amber-600">{data?.pending ?? 0}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><CheckCircle className="h-4 w-4 text-green-500" /><span className="text-sm text-muted-foreground">Approved</span></div><div className="text-3xl font-bold text-green-600">{stages.find((s: any) => s.label === "Approved")?.count ?? 0}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><XCircle className="h-4 w-4 text-red-500" /><span className="text-sm text-muted-foreground">Rejected</span></div><div className="text-3xl font-bold text-red-600">{data?.rejected ?? 0}</div></CardContent></Card>
        </div>
        <Card>
          <CardHeader><CardTitle>Funnel Stages</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            <div className="space-y-4">
              {stages.map((stage: any, i: number) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{stage.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{stage.count.toLocaleString()}</span>
                      <Badge className="bg-blue-100 text-blue-700">{stage.pct}%</Badge>
                    </div>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${stage.pct}%` }} />
                  </div>
                </div>
              ))}
              {stages.length === 0 && !isLoading && <div className="py-8 text-center text-muted-foreground">No data yet.</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
'''

pages["PartnerHealthDashboard.tsx"] = '''import AdminLayout from "@/components/AdminLayout";
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
'''

pages["TierUpgradeCenter.tsx"] = '''import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { ArrowUpCircle, CheckCircle } from "lucide-react";

export default function TierUpgradeCenter() {
  const { data, isLoading } = trpc.adminExtras.getTierUpgradeCandidates.useQuery();
  const candidates = data?.candidates ?? [];
  const ready = candidates.filter((c: any) => c.readyToUpgrade);
  const notReady = candidates.filter((c: any) => !c.readyToUpgrade);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Tier Upgrade Center</h1>
          <p className="text-muted-foreground">Partners who qualify for tier upgrades based on jobs and referrals</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-green-200"><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><CheckCircle className="h-4 w-4 text-green-500" /><span className="text-sm text-muted-foreground">Ready to Upgrade</span></div><div className="text-3xl font-bold text-green-600">{data?.readyCount ?? 0}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><ArrowUpCircle className="h-4 w-4 text-blue-500" /><span className="text-sm text-muted-foreground">Total Candidates</span></div><div className="text-3xl font-bold">{data?.totalCandidates ?? 0}</div></CardContent></Card>
        </div>
        {ready.length > 0 && (
          <Card className="border-green-200">
            <CardHeader><CardTitle className="text-green-700">Ready for Upgrade</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ready.map((p: any) => (
                  <div key={p.id} className="flex items-center justify-between border rounded-lg p-3 bg-green-50">
                    <div>
                      <div className="font-medium">{p.businessName}</div>
                      <div className="text-sm text-muted-foreground">{p.tier} → <span className="font-semibold text-green-700">{p.thresholds.nextTier}</span> · {p.jobsLogged} jobs · {p.referralCount} referrals</div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Eligible</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader><CardTitle>In Progress</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            <div className="space-y-3">
              {notReady.slice(0, 30).map((p: any) => (
                <div key={p.id} className="flex items-center justify-between border rounded-lg p-3">
                  <div>
                    <div className="font-medium">{p.businessName}</div>
                    <div className="text-sm text-muted-foreground">{p.tier} → {p.thresholds.nextTier}</div>
                  </div>
                  <div className="text-sm text-right">
                    <div className={p.jobsMet ? "text-green-600" : "text-muted-foreground"}>{p.jobsMet ? "✓" : "✗"} {p.jobsLogged}/{p.thresholds.jobs} jobs</div>
                    <div className={p.referralsMet ? "text-green-600" : "text-muted-foreground"}>{p.referralsMet ? "✓" : "✗"} {p.referralCount}/{p.thresholds.referrals} referrals</div>
                  </div>
                </div>
              ))}
              {notReady.length === 0 && !isLoading && <div className="py-8 text-center text-muted-foreground">No candidates yet.</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
'''

pages["TaskManager.tsx"] = '''import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { AlertTriangle, Clock, Users, DollarSign, CheckSquare } from "lucide-react";

const ICONS: Record<string, any> = { applications: Users, disputes: AlertTriangle, inactive: Clock, payouts: DollarSign };
const PRIORITY_COLORS: Record<string, string> = { high: "bg-red-100 text-red-700", medium: "bg-amber-100 text-amber-700", low: "bg-blue-100 text-blue-700" };

export default function TaskManager() {
  const { data: tasks, isLoading } = trpc.adminExtras.getAdminTasks.useQuery();

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Task Manager</h1>
          <p className="text-muted-foreground">Action items derived from live platform data</p>
        </div>
        {isLoading && <div className="py-8 text-center text-muted-foreground">Loading tasks…</div>}
        {!isLoading && (tasks?.length ?? 0) === 0 && (
          <Card><CardContent className="py-12 text-center"><CheckSquare className="h-12 w-12 text-green-500 mx-auto mb-3" /><div className="text-lg font-semibold text-green-700">All clear!</div><div className="text-muted-foreground">No pending action items right now.</div></CardContent></Card>
        )}
        <div className="space-y-3">
          {(tasks ?? []).map((task: any) => {
            const Icon = ICONS[task.type] ?? CheckSquare;
            return (
              <Card key={task.id} className={task.priority === "high" ? "border-red-200" : "border-amber-200"}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${task.priority === "high" ? "text-red-500" : "text-amber-500"}`} />
                      <div>
                        <div className="font-semibold">{task.title}</div>
                        <div className="text-sm text-muted-foreground">{task.count} item{task.count !== 1 ? "s" : ""} need attention</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={PRIORITY_COLORS[task.priority]}>{task.priority}</Badge>
                      <Link href={task.href}><Button size="sm" variant="outline">View</Button></Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
'''

pages["LeadQualityCenter.tsx"] = '''import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Target, TrendingUp, DollarSign } from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(n ?? 0));
}

export default function LeadQualityCenter() {
  const { data, isLoading } = trpc.adminExtras.getLeadQualityStats.useQuery();
  const overall = data?.overall;
  const byCategory = data?.byCategory ?? [];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Lead Quality Center</h1>
          <p className="text-muted-foreground">Conversion rates and lead quality by service category</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><Target className="h-4 w-4 text-blue-500" /><span className="text-sm text-muted-foreground">Total Leads</span></div><div className="text-3xl font-bold">{(overall?.total ?? 0).toLocaleString()}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><TrendingUp className="h-4 w-4 text-green-500" /><span className="text-sm text-muted-foreground">Conversion Rate</span></div><div className="text-3xl font-bold text-green-600">{overall?.conversionRate ?? 0}%</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><DollarSign className="h-4 w-4 text-purple-500" /><span className="text-sm text-muted-foreground">Avg Lead Value</span></div><div className="text-3xl font-bold">{fmt(overall?.avgValue ?? 0)}</div></CardContent></Card>
        </div>
        <Card>
          <CardHeader><CardTitle>By Service Category</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b text-muted-foreground"><th className="text-left py-2">Category</th><th className="text-right py-2">Total</th><th className="text-right py-2">Converted</th><th className="text-right py-2">Expired</th><th className="text-right py-2">Conv. Rate</th><th className="text-right py-2">Avg Value</th></tr></thead>
                <tbody>
                  {byCategory.map((c: any) => {
                    const rate = c.totalLeads > 0 ? Math.round((c.converted / c.totalLeads) * 100) : 0;
                    return (
                      <tr key={c.serviceType} className="border-b hover:bg-muted/20">
                        <td className="py-2 font-medium capitalize">{c.serviceType ?? "Unknown"}</td>
                        <td className="py-2 text-right">{c.totalLeads}</td>
                        <td className="py-2 text-right text-green-600">{c.converted}</td>
                        <td className="py-2 text-right text-red-500">{c.expired}</td>
                        <td className="py-2 text-right"><Badge className={rate >= 30 ? "bg-green-100 text-green-700" : rate >= 15 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}>{rate}%</Badge></td>
                        <td className="py-2 text-right">{fmt(c.avgValue ?? 0)}</td>
                      </tr>
                    );
                  })}
                  {byCategory.length === 0 && !isLoading && <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No lead data yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
'''

pages["ChurnPrediction.tsx"] = '''import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { AlertTriangle, TrendingDown } from "lucide-react";

const RISK_COLORS: Record<string, string> = { high: "bg-red-100 text-red-700", medium: "bg-amber-100 text-amber-700", low: "bg-green-100 text-green-700" };

export default function ChurnPrediction() {
  const { data, isLoading } = trpc.adminExtras.getChurnRisk.useQuery();
  const partners = data?.partners ?? [];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Churn Prediction</h1>
          <p className="text-muted-foreground">Partners at risk of going inactive based on activity signals</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-red-200"><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><AlertTriangle className="h-4 w-4 text-red-500" /><span className="text-sm text-muted-foreground">High Risk</span></div><div className="text-3xl font-bold text-red-600">{data?.highRisk ?? 0}</div></CardContent></Card>
          <Card className="border-amber-200"><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><TrendingDown className="h-4 w-4 text-amber-500" /><span className="text-sm text-muted-foreground">Medium Risk</span></div><div className="text-3xl font-bold text-amber-600">{data?.mediumRisk ?? 0}</div></CardContent></Card>
        </div>
        <Card>
          <CardHeader><CardTitle>Risk Assessment</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b text-muted-foreground"><th className="text-left py-2">Partner</th><th className="text-left py-2">Tier</th><th className="text-right py-2">Risk</th><th className="text-right py-2">Score</th><th className="text-right py-2">Days Inactive</th><th className="text-right py-2">Jobs</th></tr></thead>
                <tbody>
                  {partners.filter((p: any) => p.riskLevel !== "low").map((p: any) => (
                    <tr key={p.id} className="border-b hover:bg-muted/20">
                      <td className="py-2 font-medium">{p.businessName}</td>
                      <td className="py-2"><Badge>{p.tier}</Badge></td>
                      <td className="py-2 text-right"><Badge className={RISK_COLORS[p.riskLevel]}>{p.riskLevel}</Badge></td>
                      <td className="py-2 text-right font-mono">{p.riskScore}</td>
                      <td className="py-2 text-right">{p.daysSince < 999 ? `${p.daysSince}d` : "Never active"}</td>
                      <td className="py-2 text-right">{p.jobsLogged}</td>
                    </tr>
                  ))}
                  {partners.filter((p: any) => p.riskLevel !== "low").length === 0 && !isLoading && <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No at-risk partners. Great sign!</td></tr>}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
'''

pages["GeoExpansionMap.tsx"] = '''import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { MapPin } from "lucide-react";

export default function GeoExpansionMap() {
  const { data, isLoading } = trpc.adminExtras.getGeoExpansionData.useQuery();
  const areas = data ?? [];
  const maxPartners = Math.max(...areas.map((a: any) => Number(a.partnerCount)), 1);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Geo Expansion Map</h1>
          <p className="text-muted-foreground">Partner density and coverage by service area across DFW</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card><CardContent className="pt-6"><div className="text-sm text-muted-foreground mb-1">Coverage Areas</div><div className="text-3xl font-bold">{areas.length}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="text-sm text-muted-foreground mb-1">Total Partners Mapped</div><div className="text-3xl font-bold">{areas.reduce((s: number, a: any) => s + Number(a.partnerCount), 0)}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="text-sm text-muted-foreground mb-1">Total Jobs in Areas</div><div className="text-3xl font-bold">{areas.reduce((s: number, a: any) => s + Number(a.totalJobs), 0)}</div></CardContent></Card>
        </div>
        <Card>
          <CardHeader><CardTitle>Coverage by Area</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            <div className="space-y-3">
              {areas.map((area: any) => {
                const pct = Math.round((Number(area.partnerCount) / maxPartners) * 100);
                const density = Number(area.partnerCount) >= 5 ? "high" : Number(area.partnerCount) >= 2 ? "medium" : "low";
                return (
                  <div key={area.serviceArea}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-muted-foreground" /><span className="text-sm font-medium">{area.serviceArea}</span></div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">{area.partnerCount} partners · {area.totalJobs} jobs</span>
                        <Badge className={density === "high" ? "bg-green-100 text-green-700" : density === "medium" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}>{density}</Badge>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} /></div>
                  </div>
                );
              })}
              {areas.length === 0 && !isLoading && <div className="py-8 text-center text-muted-foreground">No geographic data yet. Partners need to set their service areas.</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
'''

pages["FranchiseTerritories.tsx"] = '''import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(n ?? 0));
}

export default function FranchiseTerritories() {
  const { data, isLoading } = trpc.adminExtras.getFranchiseTerritoryData.useQuery();
  const territories = data ?? [];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Franchise Territories</h1>
          <p className="text-muted-foreground">Partners with defined zip code territories and their coverage</p>
        </div>
        <Card>
          <CardHeader><CardTitle>Territory Assignments</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b text-muted-foreground"><th className="text-left py-2">Partner</th><th className="text-left py-2">Tier</th><th className="text-right py-2">Zip Codes</th><th className="text-right py-2">Max Allowed</th><th className="text-right py-2">Jobs</th><th className="text-right py-2">Revenue</th></tr></thead>
                <tbody>
                  {territories.map((t: any) => {
                    let zipCount = 0;
                    try { zipCount = JSON.parse(t.serviceZipCodes ?? "[]").length; } catch {}
                    return (
                      <tr key={t.id} className="border-b hover:bg-muted/20">
                        <td className="py-2 font-medium">{t.businessName}</td>
                        <td className="py-2"><Badge>{t.tier}</Badge></td>
                        <td className="py-2 text-right font-mono">{zipCount}</td>
                        <td className="py-2 text-right text-muted-foreground">{t.maxZipCodes ?? "—"}</td>
                        <td className="py-2 text-right">{t.jobsLogged}</td>
                        <td className="py-2 text-right text-green-600">{fmt(t.totalCommissionEarned)}</td>
                      </tr>
                    );
                  })}
                  {territories.length === 0 && !isLoading && <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No partners have defined zip code territories yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
'''

pages["StormWatch.tsx"] = '''import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { CloudLightning, AlertTriangle, Zap } from "lucide-react";

const SEVERITY_COLORS: Record<string, string> = { low: "bg-blue-100 text-blue-700", medium: "bg-amber-100 text-amber-700", high: "bg-orange-100 text-orange-700", extreme: "bg-red-100 text-red-700" };

export default function StormWatch() {
  const { data, isLoading } = trpc.adminExtras.getStormWatchData.useQuery();
  const events = data?.events ?? [];
  const stats = data?.stats;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Storm Watch</h1>
          <p className="text-muted-foreground">Weather events, affected areas, and auto-generated leads</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card className={stats?.activeEvents ? "border-red-300" : ""}><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><AlertTriangle className="h-4 w-4 text-red-500" /><span className="text-sm text-muted-foreground">Active Events</span></div><div className={`text-3xl font-bold ${stats?.activeEvents ? "text-red-600" : ""}`}>{stats?.activeEvents ?? 0}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><CloudLightning className="h-4 w-4 text-blue-500" /><span className="text-sm text-muted-foreground">Total Events</span></div><div className="text-3xl font-bold">{stats?.totalEvents ?? 0}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><Zap className="h-4 w-4 text-amber-500" /><span className="text-sm text-muted-foreground">Leads Generated</span></div><div className="text-3xl font-bold">{stats?.totalLeads ?? 0}</div></CardContent></Card>
        </div>
        <Card>
          <CardHeader><CardTitle>Storm Event Log</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            {!isLoading && events.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                <CloudLightning className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <div>No storm events recorded yet.</div>
                <div className="text-sm mt-1">Events are auto-detected by the Storm Agent when severe weather hits DFW.</div>
              </div>
            )}
            <div className="space-y-3">
              {events.map((e: any) => (
                <div key={e.id} className="border rounded-lg p-4 hover:bg-muted/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold capitalize">{e.eventType?.replace(/_/g, " ")} — {e.affectedCity ?? "DFW Area"}</div>
                      <div className="text-sm text-muted-foreground mt-0.5">{e.detectedAt ? new Date(e.detectedAt).toLocaleString() : ""}{e.affectedZips && ` · Zips: ${e.affectedZips}`}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={SEVERITY_COLORS[e.severity] ?? "bg-gray-100 text-gray-700"}>{e.severity}</Badge>
                      <Badge className={e.status === "active" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}>{e.status}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2 text-sm text-muted-foreground"><span>{e.leadsGenerated ?? 0} leads generated</span><span>{e.opportunityCount ?? 0} opportunities</span></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
'''

pages["SeasonalCampaigns.tsx"] = '''import AdminLayout from "@/components/AdminLayout";
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
'''

pages["CommissionStrategy.tsx"] = '''import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { DollarSign } from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(n ?? 0));
}

export default function CommissionStrategy() {
  const { data, isLoading } = trpc.adminExtras.getCommissionBreakdown.useQuery();
  const tiers = data ?? [];
  const chartData = tiers.map((t: any) => ({ tier: t.tier, platformFees: Number(t.platformFees), referralCommissions: Number(t.referralCommissions), prolinkNet: Number(t.prolinkNet) }));
  const totalPaid = tiers.reduce((s: number, t: any) => s + Number(t.totalPaid), 0);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Commission Strategy</h1>
          <p className="text-muted-foreground">Commission breakdown by partner tier</p>
        </div>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-2 mb-1"><DollarSign className="h-4 w-4 text-green-500" /><span className="text-sm text-muted-foreground">Total Commissions Paid</span></div><div className="text-3xl font-bold text-green-600">{fmt(totalPaid)}</div></CardContent></Card>
        {chartData.length > 0 && (
          <Card>
            <CardHeader><CardTitle>Commission by Tier</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="tier" /><YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} /><Tooltip formatter={(v: number) => fmt(v)} /><Bar dataKey="platformFees" fill="#3b82f6" name="Platform Fees" /><Bar dataKey="referralCommissions" fill="#f59e0b" name="Referral Commissions" /><Bar dataKey="prolinkNet" fill="#10b981" name="ProLnk Net" /></BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader><CardTitle>Tier Breakdown</CardTitle></CardHeader>
          <CardContent>
            {isLoading && <div className="py-8 text-center text-muted-foreground">Loading…</div>}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b text-muted-foreground"><th className="text-left py-2">Tier</th><th className="text-right py-2">Partners</th><th className="text-right py-2">Platform Fees</th><th className="text-right py-2">Referral Comm.</th><th className="text-right py-2">ProLnk Net</th><th className="text-right py-2">Avg per Partner</th></tr></thead>
                <tbody>
                  {tiers.map((t: any) => (
                    <tr key={t.tier} className="border-b hover:bg-muted/20">
                      <td className="py-2"><Badge>{t.tier}</Badge></td>
                      <td className="py-2 text-right">{t.partnerCount}</td>
                      <td className="py-2 text-right text-blue-600">{fmt(t.platformFees)}</td>
                      <td className="py-2 text-right text-amber-600">{fmt(t.referralCommissions)}</td>
                      <td className="py-2 text-right text-green-600 font-semibold">{fmt(t.prolinkNet)}</td>
                      <td className="py-2 text-right">{fmt(t.avgPaid)}</td>
                    </tr>
                  ))}
                  {tiers.length === 0 && !isLoading && <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No commission data yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
'''

for filename, content in pages.items():
    path = os.path.join(base, filename)
    with open(path, "w") as f:
        f.write(content)
    print(f"Written: {filename}")

print("All admin pages written successfully.")
