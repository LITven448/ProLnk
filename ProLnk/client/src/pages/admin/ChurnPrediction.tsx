import { useState, useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertTriangle, TrendingDown, DollarSign, Users,
  Mail, Phone, CheckCircle, Download, Search,
} from "lucide-react";
import { toast } from "sonner";

interface AtRiskPro {
  id: number;
  name: string;
  trade: string;
  lastActive: string;
  jobsLast30: number;
  riskScore: number;
  monthlyRevenue: number;
  status: "active" | "resolved";
}

const MOCK_PROS: AtRiskPro[] = [
  { id: 1, name: "Marcus Webb", trade: "HVAC", lastActive: "2026-04-01", jobsLast30: 0, riskScore: 94, monthlyRevenue: 480, status: "active" },
  { id: 2, name: "Sandra Kowalski", trade: "Plumbing", lastActive: "2026-04-08", jobsLast30: 1, riskScore: 87, monthlyRevenue: 210, status: "active" },
  { id: 3, name: "Derek Fontaine", trade: "Electrical", lastActive: "2026-04-15", jobsLast30: 2, riskScore: 78, monthlyRevenue: 320, status: "active" },
  { id: 4, name: "Tia Nguyen", trade: "Roofing", lastActive: "2026-04-19", jobsLast30: 1, riskScore: 72, monthlyRevenue: 150, status: "active" },
  { id: 5, name: "Carl Simmons", trade: "General", lastActive: "2026-04-22", jobsLast30: 3, riskScore: 61, monthlyRevenue: 195, status: "active" },
  { id: 6, name: "Priya Mehta", trade: "HVAC", lastActive: "2026-04-25", jobsLast30: 4, riskScore: 55, monthlyRevenue: 360, status: "active" },
  { id: 7, name: "James O'Brien", trade: "Plumbing", lastActive: "2026-04-28", jobsLast30: 5, riskScore: 48, monthlyRevenue: 275, status: "active" },
  { id: 8, name: "Lauren Chu", trade: "Electrical", lastActive: "2026-04-30", jobsLast30: 6, riskScore: 42, monthlyRevenue: 390, status: "active" },
  { id: 9, name: "Bobby Trask", trade: "Roofing", lastActive: "2026-05-02", jobsLast30: 7, riskScore: 35, monthlyRevenue: 220, status: "active" },
  { id: 10, name: "Nadia Flores", trade: "General", lastActive: "2026-05-04", jobsLast30: 8, riskScore: 28, monthlyRevenue: 140, status: "active" },
  { id: 11, name: "Tony Ruiz", trade: "HVAC", lastActive: "2026-05-05", jobsLast30: 9, riskScore: 22, monthlyRevenue: 415, status: "active" },
  { id: 12, name: "Gwen Hartley", trade: "Plumbing", lastActive: "2026-05-06", jobsLast30: 10, riskScore: 15, monthlyRevenue: 300, status: "active" },
];

const TRADES = ["All Trades", "HVAC", "Plumbing", "Electrical", "Roofing", "General"];
const RISK_LEVELS = ["All Risk Levels", "High (>70)", "Medium (30-70)", "Low (<30)"];

function riskBadge(score: number) {
  if (score > 70) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-red-500/20 text-red-400">{score}</span>;
  if (score >= 30) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-yellow-500/20 text-yellow-400">{score}</span>;
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-400">{score}</span>;
}

function riskLabel(score: number) {
  if (score > 70) return <Badge className="bg-red-500/20 text-red-400 border-0">High</Badge>;
  if (score >= 30) return <Badge className="bg-yellow-500/20 text-yellow-400 border-0">Medium</Badge>;
  return <Badge className="bg-emerald-500/20 text-emerald-400 border-0">Low</Badge>;
}

export default function ChurnPrediction() {
  const [pros, setPros] = useState<AtRiskPro[]>(MOCK_PROS);
  const [search, setSearch] = useState("");
  const [tradeFilter, setTradeFilter] = useState("All Trades");
  const [riskFilter, setRiskFilter] = useState("All Risk Levels");

  const filtered = useMemo(() => {
    return pros.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (tradeFilter !== "All Trades" && p.trade !== tradeFilter) return false;
      if (riskFilter === "High (>70)" && p.riskScore <= 70) return false;
      if (riskFilter === "Medium (30-70)" && (p.riskScore < 30 || p.riskScore > 70)) return false;
      if (riskFilter === "Low (<30)" && p.riskScore >= 30) return false;
      return true;
    });
  }, [pros, search, tradeFilter, riskFilter]);

  const active = filtered.filter((p) => p.status === "active");
  const highRisk = pros.filter((p) => p.riskScore > 70 && p.status === "active");
  const revenueAtRisk = highRisk.reduce((sum, p) => sum + p.monthlyRevenue, 0);
  const totalAtRisk = pros.filter((p) => p.riskScore >= 30 && p.status === "active");

  function handleAction(id: number, action: "email" | "call" | "resolve") {
    if (action === "resolve") {
      setPros((prev) => prev.map((p) => p.id === id ? { ...p, status: "resolved" } : p));
      toast.success("Marked as resolved");
    } else if (action === "email") {
      toast.success("Win-back email queued");
    } else {
      toast.success("Call scheduled for tomorrow 10am");
    }
  }

  function exportCSV() {
    const headers = ["Name", "Trade", "Last Active", "Jobs (30d)", "Risk Score", "Monthly Revenue", "Status"];
    const rows = filtered.map((p) => [p.name, p.trade, p.lastActive, p.jobsLast30, p.riskScore, `$${p.monthlyRevenue}`, p.status]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "churn-risk-export.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 bg-[#0A1628] min-h-screen">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingDown className="h-6 w-6 text-teal-400" />
              Churn Prediction
            </h1>
            <p className="text-slate-400 mt-1">Pros at risk of going inactive based on activity signals</p>
          </div>
          <Button onClick={exportCSV} variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:text-white">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="pt-5">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-slate-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Total At-Risk</span>
              </div>
              <div className="text-3xl font-bold text-white">{totalAtRisk.length}</div>
              <p className="text-xs text-slate-500 mt-1">Score 30 or above</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-red-900/40 border">
            <CardContent className="pt-5">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">High Risk</span>
              </div>
              <div className="text-3xl font-bold text-red-400">{highRisk.length}</div>
              <p className="text-xs text-slate-500 mt-1">Score above 70</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="pt-5">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="h-4 w-4 text-yellow-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Revenue at Risk</span>
              </div>
              <div className="text-3xl font-bold text-yellow-400">${revenueAtRisk.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1">Monthly from high-risk pros</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <CardTitle className="text-white text-lg">At-Risk Pros</CardTitle>
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <Input
                    placeholder="Search name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 h-8 w-44 bg-slate-900 border-slate-700 text-sm text-white placeholder:text-slate-500"
                  />
                </div>
                <Select value={tradeFilter} onValueChange={setTradeFilter}>
                  <SelectTrigger className="h-8 w-36 bg-slate-900 border-slate-700 text-sm text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    {TRADES.map((t) => (
                      <SelectItem key={t} value={t} className="text-slate-300">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="h-8 w-44 bg-slate-900 border-slate-700 text-sm text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    {RISK_LEVELS.map((r) => (
                      <SelectItem key={r} value={r} className="text-slate-300">{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="text-left py-2.5 pr-4">Pro</th>
                    <th className="text-left py-2.5 pr-4">Trade</th>
                    <th className="text-left py-2.5 pr-4">Last Active</th>
                    <th className="text-right py-2.5 pr-4">Jobs (30d)</th>
                    <th className="text-center py-2.5 pr-4">Risk</th>
                    <th className="text-center py-2.5 pr-4">Score</th>
                    <th className="text-right py-2.5">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {active.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-slate-500">No pros match current filters</td>
                    </tr>
                  )}
                  {active.map((pro) => (
                    <tr key={pro.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                      <td className="py-3 pr-4 font-medium text-white">{pro.name}</td>
                      <td className="py-3 pr-4 text-slate-300">{pro.trade}</td>
                      <td className="py-3 pr-4 text-slate-400">{pro.lastActive}</td>
                      <td className="py-3 pr-4 text-right text-slate-300">{pro.jobsLast30}</td>
                      <td className="py-3 pr-4 text-center">{riskLabel(pro.riskScore)}</td>
                      <td className="py-3 pr-4 text-center">{riskBadge(pro.riskScore)}</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-teal-400 hover:text-teal-300 hover:bg-teal-400/10"
                            onClick={() => handleAction(pro.id, "email")}
                          >
                            <Mail className="h-3 w-3 mr-1" />
                            Win-Back
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                            onClick={() => handleAction(pro.id, "call")}
                          >
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10"
                            onClick={() => handleAction(pro.id, "resolve")}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Resolve
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {pros.filter((p) => p.status === "resolved").length > 0 && (
                    <tr>
                      <td colSpan={7} className="pt-4 pb-1 text-xs text-slate-500 uppercase tracking-wider">
                        Resolved ({pros.filter((p) => p.status === "resolved").length})
                      </td>
                    </tr>
                  )}
                  {pros.filter((p) => p.status === "resolved").map((pro) => (
                    <tr key={`resolved-${pro.id}`} className="opacity-40">
                      <td className="py-2 pr-4 text-slate-400 line-through">{pro.name}</td>
                      <td className="py-2 pr-4 text-slate-500">{pro.trade}</td>
                      <td className="py-2 pr-4 text-slate-500">{pro.lastActive}</td>
                      <td className="py-2 pr-4 text-right text-slate-500">{pro.jobsLast30}</td>
                      <td className="py-2 pr-4 text-center"><Badge className="bg-slate-700 text-slate-400 border-0">Resolved</Badge></td>
                      <td className="py-2 pr-4 text-center text-slate-500">{pro.riskScore}</td>
                      <td className="py-2" />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
