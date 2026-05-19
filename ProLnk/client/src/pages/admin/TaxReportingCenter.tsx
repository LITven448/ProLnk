import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FileText, DollarSign, AlertTriangle, CheckCircle, Clock,
  Download, Eye, Send, Info, TrendingUp,
} from "lucide-react";

const THRESHOLD_PARTNERS = [
  { name: "Marcus W.",    ytd: 5840,  status: "filed",     requires: true  },
  { name: "Sarah J.",     ytd: 4210,  status: "pending",   requires: true  },
  { name: "Tony R.",      ytd: 3780,  status: "pending",   requires: true  },
  { name: "Dana H.",      ytd: 2990,  status: "pending",   requires: true  },
  { name: "Kevin L.",     ytd: 2450,  status: "pending",   requires: true  },
  { name: "Priya S.",     ytd: 1870,  status: "pending",   requires: true  },
  { name: "James C.",     ytd: 1210,  status: "not-filed", requires: true  },
  { name: "Tina M.",      ytd: 820,   status: "not-filed", requires: true  },
  { name: "Chris B.",     ytd: 430,   status: "n/a",       requires: false },
  { name: "Angela F.",    ytd: 210,   status: "n/a",       requires: false },
];

const QUARTERLY = [
  { label: "Q1″, amount: 47000,  projected: false },
  { label: "Q2″, amount: 83000,  projected: false },
  { label: "Q3″, amount: 112000, projected: true  },
  { label: "Q4″, amount: 140000, projected: true  },
];

const CHECKLIST = [
  { ok: true,  label: "W-9 collection enabled",           note: null },
  { ok: true,  label: "$600 threshold tracking",          note: null },
  { ok: false, label: "SSN verification",                 note: "Action required" },
  { ok: true,  label: "State filings auto-calculated",    note: null },
];

function fmt(n: number) {
  return "$" + n.toLocaleString();
}

export default function TaxReportingCenter() {
  const requiring = THRESHOLD_PARTNERS.filter(p => p.requires).length;
  const filed     = THRESHOLD_PARTNERS.filter(p => p.status === "filed").length;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6″>

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3″>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0″
              style={{ background: "linear-gradient(135deg, #F5E64225, #FBB14025)" }}
            >
              <FileText className="w-6 h-6″ style={{ color: "#F5E642" }} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Tax Reporting Center</h1>
              <p className="text-sm text-muted-foreground mt-0.5″>1099 compliance and partner tax management</p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="border-yellow-400/50 text-yellow-300 px-3 py-1 text-xs font-bold"
          >
            Powered by Tax1099
          </Badge>
        </div>

        {/* ── 2025 Status ────────────────────────────────────────────────────── */}
        <Card className="border border-border">
          <CardHeader className="pb-3″>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="w-4 h-4 text-yellow-400″ />
              2025 Filing Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5″>
              <div className="text-center p-4 rounded-xl" style={{ background: "#ffffff08″ }}>
                <div className="text-3xl font-black text-white">{requiring}</div>
                <div className="text-sm text-muted-foreground mt-1″>Partners requiring 1099</div>
              </div>
              <div className="text-center p-4 rounded-xl" style={{ background: "#ffffff08″ }}>
                <div className="text-3xl font-black" style={{ color: "#82D616″ }}>{filed}</div>
                <div className="text-sm text-muted-foreground mt-1″>Forms filed</div>
              </div>
              <div className="text-center p-4 rounded-xl" style={{ background: "#ffffff08″ }}>
                <div className="text-3xl font-black text-red-400″>Jan 31</div>
                <div className="text-sm text-muted-foreground mt-1″>Deadline — 2026</div>
              </div>
            </div>
            <div className="space-y-1.5″>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Filing progress</span>
                <span>{filed} of {requiring}</span>
              </div>
              <Progress
                value={(filed / requiring) * 100}
                className="h-2″
              />
            </div>
          </CardContent>
        </Card>

        {/* ── Threshold Tracker + Filing Actions ─────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6″>

          <div className="xl:col-span-2″>
            <Card className="border border-border">
              <CardHeader className="pb-3″>
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  Top Earners — Threshold Tracker
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0″>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-4 text-xs font-bold text-muted-foreground">Partner</th>
                        <th className="text-right py-2 px-4 text-xs font-bold text-muted-foreground">YTD Earnings</th>
                        <th className="py-2 px-4 text-xs font-bold text-muted-foreground">Threshold ($600)</th>
                        <th className="text-center py-2 px-4 text-xs font-bold text-muted-foreground">1099 Required</th>
                        <th className="text-center py-2 px-4 text-xs font-bold text-muted-foreground">Form Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {THRESHOLD_PARTNERS.map((p, i) => {
                        const pct = Math.min((p.ytd / 600) * 100, 100);
                        return (
                          <tr key={p.name} className="border-b border-border/50 hover:bg-muted/20″>
                            <td className="py-2.5 px-4 font-medium text-white">{p.name}</td>
                            <td className="py-2.5 px-4 text-right font-mono text-sm">{fmt(p.ytd)}</td>
                            <td className="py-2.5 px-4″>
                              <div className="flex items-center gap-2″>
                                <Progress value={pct} className="h-1.5 flex-1″ />
                                <span className="text-xs text-muted-foreground w-14 text-right">
                                  {fmt(Math.min(p.ytd, 600))} / $600
                                </span>
                              </div>
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              {p.requires
                                ? <Badge variant="outline" className="border-red-500/50 text-red-400 text-xs">Yes</Badge>
                                : <span className="text-xs text-muted-foreground">No</span>}
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              {p.status === "filed"
                                ? <Badge variant="outline" className="border-green-500/50 text-green-400 text-xs">Filed</Badge>
                                : p.status === "pending"
                                ? <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 text-xs">Pending</Badge>
                                : p.status === "not-filed"
                                ? <Badge variant="outline" className="border-red-500/50 text-red-400 text-xs">Not Filed</Badge>
                                : <span className="text-xs text-muted-foreground">—</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filing Actions */}
          <div className="space-y-4″>
            <Card className="border border-border">
              <CardHeader className="pb-3″>
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  Filing Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3″>
                <Button
                  className="w-full gap-2″
                  disabled
                  variant="outline"
                >
                  <FileText className="h-4 w-4″ />
                  Generate All 1099s
                  <Badge variant="outline" className="text-xs ml-auto border-muted-foreground/30 text-muted-foreground">
                    Opens Jan 1
                  </Badge>
                </Button>
                <Button className="w-full gap-2″ variant="outline">
                  <Eye className="h-4 w-4″ />
                  Preview Forms
                </Button>
                <Button className="w-full gap-2″ variant="outline">
                  <Download className="h-4 w-4″ />
                  Export for Manual Filing
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader className="pb-2″>
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  W-9 Campaign
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3″>
                  Send a bulk W-9 request to all partners who haven't yet submitted their tax information.
                </p>
                <Button className="w-full gap-2″ size="sm" style={{ background: "#F5E642", color: "#0A1628" }}>
                  <Send className="h-3.5 w-3.5″ />
                  Collect W-9 (Bulk)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ── Quarterly Summary ──────────────────────────────────────────────── */}
        <div>
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3″>
            Quarterly Partner Payouts — 2025
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4″>
            {QUARTERLY.map((q) => (
              <Card key={q.label} className="border border-border">
                <CardContent className="pt-4 pb-4″>
                  <div className="flex items-center justify-between mb-1″>
                    <span className="text-xs font-bold text-muted-foreground">{q.label}</span>
                    {q.projected && (
                      <Badge variant="outline" className="text-xs border-blue-500/40 text-blue-400″>Proj.</Badge>
                    )}
                  </div>
                  <div className="text-xl font-black text-white">{fmt(q.amount)}</div>
                  <div className="text-xs text-muted-foreground mt-0.5″>total payouts</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ── Compliance Checklist ───────────────────────────────────────────── */}
        <Card className="border border-border">
          <CardHeader className="pb-3″>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Compliance Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5″>
              {CHECKLIST.map((item) => (
                <div key={item.label} className="flex items-center gap-3″>
                  {item.ok
                    ? <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0″ />
                    : <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0″ />}
                  <span className="text-sm text-foreground/90″>{item.label}</span>
                  {item.note && (
                    <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 text-xs ml-auto">
                      {item.note}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Info Banner ────────────────────────────────────────────────────── */}
        <div
          className="flex items-start gap-3 p-4 rounded-xl border"
          style={{ background: "#00D4FF10″, borderColor: "#00D4FF30" }}
        >
          <Info className="h-4 w-4 flex-shrink-0 mt-0.5″ style={{ color: "#00D4FF" }} />
          <p className="text-sm" style={{ color: "#7eb8d4″ }}>
            Tax1099 files directly with the IRS. Partners receive digital + mailed copies. FATCA reporting included.
          </p>
        </div>

      </div>
    </AdminLayout>
  );
}
