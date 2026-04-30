import AdminLayout from "@/components/AdminLayout";
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
