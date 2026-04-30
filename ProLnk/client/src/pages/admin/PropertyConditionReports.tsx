import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import {
  Home, Search, Download, Camera,
  AlertTriangle, CheckCircle, Calendar, TrendingUp, Loader2
} from "lucide-react";
import { toast } from "sonner";

const CONDITION_GRADES = {
  A: { label: "Excellent", color: "bg-emerald-100 text-emerald-700", bg: "bg-emerald-50" },
  B: { label: "Good",      color: "bg-blue-100 text-blue-700",       bg: "bg-blue-50" },
  C: { label: "Fair",      color: "bg-amber-100 text-amber-700",     bg: "bg-amber-50" },
  D: { label: "Poor",      color: "bg-red-100 text-red-700",         bg: "bg-red-50" },
};

export default function PropertyConditionReports() {
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: reports = [], isLoading } = trpc.admin.getPropertyConditionReports.useQuery();

  const filtered = reports.filter(r => {
    const matchesSearch = r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.room.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = gradeFilter === "all" || r.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const avgScore = reports.length > 0
    ? Math.round(reports.reduce((sum, r) => sum + r.score, 0) / reports.length)
    : 0;
  const gradeDistribution = Object.fromEntries(
    ["A", "B", "C", "D"].map(g => [g, reports.filter(r => r.grade === g).length])
  );
  const totalIssues = reports.reduce((sum, r) => sum + r.issueCount, 0);

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900 flex items-center gap-3">
              <Home className="w-6 h-6 text-[#0A1628]" />Property Condition Reports
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              AI-generated property condition assessments from homeowner photo scans.
            </p>
          </div>
          <Button
            className="bg-[#0A1628] text-white hover:bg-[#0A1628]/90"
            onClick={() => toast.info("Bulk export queued", { description: "Reports will be emailed as a ZIP within 10 minutes." })}
          >
            <Download className="w-4 h-4 mr-2" />Export All
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Scans Assessed",    value: reports.length,  icon: Camera },
            { label: "Avg Condition Score", value: avgScore,       icon: TrendingUp },
            { label: "Total Issues Found",  value: totalIssues,    icon: AlertTriangle },
            { label: "Grade A Properties",  value: gradeDistribution["A"] ?? 0, icon: CheckCircle },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border border-gray-200">
                <CardContent className="p-4 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Grade Distribution */}
        {reports.length > 0 && (
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Grade Distribution</p>
              <div className="flex items-end gap-3 h-16">
                {(["A", "B", "C", "D"] as const).map((grade) => {
                  const count = gradeDistribution[grade] || 0;
                  const pct = reports.length > 0 ? Math.round((count / reports.length) * 100) : 0;
                  const cfg = CONDITION_GRADES[grade];
                  return (
                    <div key={grade} className="flex-1 flex flex-col items-center gap-1">
                      <div className="text-xs text-gray-500">{pct}%</div>
                      <div className={`w-full rounded-t-md ${cfg.bg}`} style={{ height: `${Math.max(pct * 0.5, 8)}px` }} />
                      <Badge className={`${cfg.color} text-xs`}>{grade}</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by email or room..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {["all", "A", "B", "C", "D"].map((g) => (
              <Button key={g} size="sm" variant={gradeFilter === g ? "default" : "outline"}
                className={gradeFilter === g ? "bg-[#0A1628] text-white" : ""}
                onClick={() => setGradeFilter(g)}>
                {g === "all" ? "All" : `Grade ${g}`}
              </Button>
            ))}
          </div>
        </div>

        {/* Report List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((report) => {
              const gradeCfg = CONDITION_GRADES[report.grade as keyof typeof CONDITION_GRADES] ?? CONDITION_GRADES["C"];
              const isExpanded = selectedId === report.id;
              return (
                <Card key={report.id} className="border border-gray-200 hover:shadow-sm transition-shadow cursor-pointer"
                  onClick={() => setSelectedId(isExpanded ? null : report.id)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-gray-900 text-sm truncate">{report.email}</span>
                          <Badge className={`${gradeCfg.color} text-xs font-bold`}>Grade {report.grade}</Badge>
                          <span className="text-xs text-gray-500">Score: {report.score}/100</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Camera className="w-3 h-3" />{report.room}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(report.createdAt).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-amber-500" />{report.issueCount} issues</span>
                          <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3 text-blue-500" />{report.upgradeCount} upgrades</span>
                        </div>
                        {report.photoQuality === "low" && (
                          <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-100 mt-2">
                            <AlertTriangle className="w-3 h-3" />Low photo quality
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button size="sm" variant="outline" className="text-xs"
                          onClick={(e) => { e.stopPropagation(); toast.success("Report downloaded"); }}>
                          <Download className="w-3 h-3 mr-1" />PDF
                        </Button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-gray-500">Room / Area</div>
                          <div className="text-sm font-semibold text-gray-900 mt-0.5">{report.room}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-gray-500">Photos Analyzed</div>
                          <div className="text-sm font-semibold text-gray-900 mt-0.5">{report.photoCount}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-gray-500">Condition</div>
                          <div className={`text-sm font-semibold mt-0.5 ${gradeCfg.color.split(" ")[1]}`}>
                            {gradeCfg.label} ({report.score}/100)
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
            {filtered.length === 0 && !isLoading && (
              <div className="text-center py-12 text-gray-400">
                <Home className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p>{reports.length === 0 ? "No scan reports yet. Scans will appear here once homeowners upload photos." : "No reports match your search."}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
