import { useState, useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Users, Home as HomeIcon, CheckCircle, Mail, Search,
  Download, Zap, Star, Filter, ToggleLeft, ToggleRight,
  Clock, XCircle, ChevronDown,
} from "lucide-react";

const MOCK_PROS = [
  { id: 1, name: "Marcus Tillman",     trade: "Plumbing",    zip: "30301", date: "2026-05-01", status: "Pending",   score: 91 },
  { id: 2, name: "Sarah Chen",         trade: "Electrical",  zip: "30302", date: "2026-05-02", status: "Approved",  score: 88 },
  { id: 3, name: "Dave Kowalski",      trade: "HVAC",        zip: "94101", date: "2026-05-03", status: "Pending",   score: 85 },
  { id: 4, name: "Lisa Monroe",        trade: "Roofing",     zip: "33101", date: "2026-05-03", status: "Waitlisted",score: 72 },
  { id: 5, name: "James Okafor",       trade: "Plumbing",    zip: "10001", date: "2026-05-04", status: "Approved",  score: 94 },
  { id: 6, name: "Priya Desai",        trade: "Electrical",  zip: "60601", date: "2026-05-05", status: "Rejected",  score: 41 },
  { id: 7, name: "Tom Reyes",          trade: "HVAC",        zip: "77001", date: "2026-05-06", status: "Pending",   score: 87 },
  { id: 8, name: "Angela Brooks",      trade: "Landscaping", zip: "85001", date: "2026-05-07", status: "Pending",   score: 79 },
  { id: 9, name: "Kevin Stanton",      trade: "Plumbing",    zip: "98101", date: "2026-05-08", status: "Approved",  score: 90 },
  { id: 10, name: "Diane Castellano",  trade: "Roofing",     zip: "02101", date: "2026-05-09", status: "Waitlisted",score: 68 },
];

const MOCK_HOMEOWNERS = [
  { id: 1,  name: "Carol Finley",      city: "Atlanta, GA",       service: "Plumbing",    date: "2026-05-01", status: "Pending",   score: 88 },
  { id: 2,  name: "Robert Hughes",     city: "Dallas, TX",        service: "HVAC",        date: "2026-05-02", status: "Approved",  score: 92 },
  { id: 3,  name: "Maria Santos",      city: "Miami, FL",         service: "Electrical",  date: "2026-05-03", status: "Pending",   score: 75 },
  { id: 4,  name: "Brian Park",        city: "Chicago, IL",       service: "Roofing",     date: "2026-05-04", status: "Approved",  score: 85 },
  { id: 5,  name: "Nancy Owens",       city: "Phoenix, AZ",       service: "Landscaping", date: "2026-05-05", status: "Pending",   score: 70 },
  { id: 6,  name: "Derek Wallace",     city: "Seattle, WA",       service: "Plumbing",    date: "2026-05-06", status: "Waitlisted",score: 63 },
  { id: 7,  name: "Tamara Knox",       city: "Houston, TX",       service: "HVAC",        date: "2026-05-07", status: "Approved",  score: 96 },
  { id: 8,  name: "Philip Garrett",    city: "Los Angeles, CA",   service: "Electrical",  date: "2026-05-08", status: "Pending",   score: 81 },
  { id: 9,  name: "Susan Weiss",       city: "Denver, CO",        service: "Roofing",     date: "2026-05-09", status: "Rejected",  score: 38 },
  { id: 10, name: "Antonio Jimenez",   city: "San Antonio, TX",   service: "Plumbing",    date: "2026-05-10", status: "Pending",   score: 77 },
];

const STATUS_CLASSES: Record<string, string> = {
  Pending:    "bg-amber-500/20 text-amber-300 border border-amber-500/40",
  Approved:   "bg-teal-500/20 text-teal-300 border border-teal-500/40",
  Rejected:   "bg-red-500/20 text-red-400 border border-red-500/40",
  Waitlisted: "bg-slate-500/20 text-slate-300 border border-slate-500/40",
};

const SCORE_COLOR = (s: number) =>
  s >= 85 ? "text-teal-400" : s >= 70 ? "text-amber-400" : "text-red-400";

const TRADES = ["All Trades", "Plumbing", "Electrical", "HVAC", "Roofing", "Landscaping"];

export default function WaitlistManagerNew() {
  const [tab, setTab] = useState<"pro" | "homeowner">("pro");
  const [search, setSearch] = useState("");
  const [tradeFilter, setTradeFilter] = useState("All Trades");
  const [statusFilter, setStatusFilter] = useState("all");
  const [scoreMin, setScoreMin] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [autoApprove, setAutoApprove] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [proRows, setProRows] = useState(MOCK_PROS.map(r => ({ ...r })));
  const [homeRows, setHomeRows] = useState(MOCK_HOMEOWNERS.map(r => ({ ...r })));

  const rows = tab === "pro" ? proRows : homeRows;

  const filtered = useMemo(() => {
    return rows.filter(r => {
      const nameMatch = !search || r.name.toLowerCase().includes(search.toLowerCase());
      const tradeMatch = tradeFilter === "All Trades" || ("trade" in r ? r.trade === tradeFilter : ("service" in r ? r.service === tradeFilter : true));
      const statusMatch = statusFilter === "all" || r.status.toLowerCase() === statusFilter;
      const scoreMatch = r.score >= scoreMin;
      return nameMatch && tradeMatch && statusMatch && scoreMatch;
    });
  }, [rows, search, tradeFilter, statusFilter, scoreMin]);

  const topFive = useMemo(() => [...rows].sort((a, b) => b.score - a.score).slice(0, 5), [rows]);
  const autoCount = rows.filter(r => r.score > 85 && r.status === "Pending").length;

  const toggleSelect = (id: number) => {
    setSelected(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const selectAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map(r => r.id)));
    }
  };

  const applyStatusToSelected = (newStatus: string) => {
    const setter = tab === "pro" ? setProRows : setHomeRows;
    setter(prev => prev.map(r => selected.has(r.id) ? { ...r, status: newStatus } : r));
    toast.success(`${selected.size} applicant(s) marked as ${newStatus}`);
    setSelected(new Set());
  };

  const applyStatusToRow = (id: number, newStatus: string) => {
    const setter = tab === "pro" ? setProRows : setHomeRows;
    setter(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    toast.success(`Applicant ${newStatus.toLowerCase()}`);
  };

  const fastTrack = (id: number) => {
    const setter = tab === "pro" ? setProRows : setHomeRows;
    setter(prev => prev.map(r => r.id === id ? { ...r, status: "Approved" } : r));
    toast.success("Fast-tracked to Approved");
  };

  const exportCSV = () => {
    toast.success("CSV export triggered (mock)");
  };

  const proTotal = proRows.length;
  const homeTotal = homeRows.length;
  const approvedToday = [...proRows, ...homeRows].filter(r => r.status === "Approved" && r.date === "2026-05-14").length || 7;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-teal-400" />
              Waitlist Manager
            </h1>
            <p className="text-gray-400 text-sm mt-1">Manage pro and homeowner waitlist applicants</p>
          </div>
          <Button onClick={exportCSV} variant="outline" className="border-gray-600 text-gray-300 hover:text-white gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Pro Waitlist",        value: proTotal,     icon: Users,      color: "text-teal-400",   bg: "bg-teal-500/10" },
            { label: "Homeowner Waitlist",   value: homeTotal,    icon: HomeIcon,   color: "text-indigo-400", bg: "bg-indigo-500/10" },
            { label: "Approved Today",       value: approvedToday,icon: CheckCircle,color: "text-green-400",  bg: "bg-green-500/10" },
            { label: "Email Open Rate",      value: "68%",        icon: Mail,       color: "text-purple-400", bg: "bg-purple-500/10" },
          ].map((s, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-gray-400 text-xs">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Auto-approve toggle */}
        <div className="flex items-center gap-3 p-3 bg-gray-800 border border-gray-700 rounded-xl w-fit">
          <button onClick={() => { setAutoApprove(v => !v); toast.success(autoApprove ? "Auto-approve disabled" : "Auto-approve enabled"); }} className="flex items-center gap-2">
            {autoApprove
              ? <ToggleRight className="w-5 h-5 text-teal-400" />
              : <ToggleLeft className="w-5 h-5 text-gray-500" />}
          </button>
          <span className="text-sm text-gray-300">Auto-approve applicants scoring &gt;85</span>
          <span className="text-xs bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full">{autoCount} eligible</span>
        </div>

        {/* Priority Queue */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="border-b border-gray-700 pb-3">
            <CardTitle className="text-white text-sm font-semibold flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" /> Priority Queue — Top 5 by Score
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-700">
              {topFive.map((r, i) => (
                <div key={r.id} className="flex items-center gap-3 px-4 py-2.5">
                  <span className="text-gray-600 text-xs w-4">{i + 1}</span>
                  <div className="flex-1 text-sm text-white font-medium">{r.name}</div>
                  {"trade" in r && <span className="text-gray-400 text-xs hidden md:block">{r.trade}</span>}
                  <span className={`text-sm font-bold ${SCORE_COLOR(r.score)}`}>{r.score}</span>
                  <Badge className={STATUS_CLASSES[r.status]}>{r.status}</Badge>
                  {r.status === "Pending" && (
                    <Button size="sm" onClick={() => fastTrack(r.id)} className="bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-white text-xs gap-1 h-7">
                      <Zap className="w-3 h-3" /> Fast-track
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-800 p-1 rounded-xl border border-gray-700 w-fit">
          {(["pro", "homeowner"] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setSelected(new Set()); }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"}`}>
              {t === "pro" ? "Pro Waitlist" : "Homeowner Waitlist"}
            </button>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            <Input placeholder="Search name..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 bg-gray-800 border-gray-700 text-white placeholder-gray-500" />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(v => !v)}
            className="border-gray-600 text-gray-300 hover:text-white gap-2">
            <Filter className="w-4 h-4" /> Filters <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-3 p-4 bg-gray-800 border border-gray-700 rounded-xl">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Trade / Service</label>
              <select value={tradeFilter} onChange={e => setTradeFilter(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500">
                {TRADES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Status</label>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500">
                {["all", "pending", "approved", "rejected", "waitlisted"].map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Min Score: {scoreMin}</label>
              <input type="range" min={0} max={100} value={scoreMin} onChange={e => setScoreMin(Number(e.target.value))}
                className="w-32 accent-teal-400 mt-1" />
            </div>
            <Button variant="ghost" size="sm" onClick={() => { setTradeFilter("All Trades"); setStatusFilter("all"); setScoreMin(0); }}
              className="text-gray-400 hover:text-white self-end">Clear</Button>
          </div>
        )}

        {/* Bulk actions */}
        {selected.size > 0 && (
          <div className="flex items-center gap-3 p-3 bg-teal-900/40 border border-teal-500/40 rounded-xl">
            <span className="text-teal-300 text-sm font-semibold">{selected.size} selected</span>
            <Button size="sm" onClick={() => applyStatusToSelected("Approved")} className="bg-teal-500 text-white hover:bg-teal-600 gap-1 text-xs h-7">
              <CheckCircle className="w-3 h-3" /> Approve All
            </Button>
            <Button size="sm" onClick={() => applyStatusToSelected("Rejected")} variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10 gap-1 text-xs h-7">
              <XCircle className="w-3 h-3" /> Reject All
            </Button>
            <Button size="sm" onClick={exportCSV} variant="outline" className="border-gray-600 text-gray-300 gap-1 text-xs h-7">
              <Download className="w-3 h-3" /> Export
            </Button>
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 gap-1 text-xs h-7">
              <Mail className="w-3 h-3" /> Send Email
            </Button>
          </div>
        )}

        {/* Table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="border-b border-gray-700 pb-3 flex-row items-center justify-between">
            <CardTitle className="text-white text-sm font-semibold">{filtered.length} applicants</CardTitle>
            <button onClick={selectAll} className="text-xs text-teal-400 hover:underline">
              {selected.size === filtered.length && filtered.length > 0 ? "Deselect All" : "Select All"}
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700 text-left">
                    <th className="px-4 py-2 text-gray-500 font-medium w-8"></th>
                    <th className="px-4 py-2 text-gray-500 font-medium">Name</th>
                    <th className="px-4 py-2 text-gray-500 font-medium hidden md:table-cell">
                      {tab === "pro" ? "Trade" : "Service"}
                    </th>
                    <th className="px-4 py-2 text-gray-500 font-medium hidden lg:table-cell">
                      {tab === "pro" ? "ZIP" : "Location"}
                    </th>
                    <th className="px-4 py-2 text-gray-500 font-medium hidden md:table-cell">Applied</th>
                    <th className="px-4 py-2 text-gray-500 font-medium">Status</th>
                    <th className="px-4 py-2 text-gray-500 font-medium">Score</th>
                    <th className="px-4 py-2 text-gray-500 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filtered.map(r => (
                    <tr key={r.id} className={`hover:bg-gray-700/30 transition-colors ${selected.has(r.id) ? "bg-teal-900/10" : ""}`}>
                      <td className="px-4 py-3">
                        <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggleSelect(r.id)}
                          className="accent-teal-400 w-3.5 h-3.5" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-400 text-xs font-bold shrink-0">
                            {r.name[0]}
                          </div>
                          <span className="text-white font-medium">{r.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400 hidden md:table-cell">
                        {"trade" in r ? r.trade : r.service}
                      </td>
                      <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">
                        {"zip" in r ? r.zip : r.city}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell flex items-center gap-1">
                        <Clock className="w-3 h-3 inline mr-0.5" />{r.date}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={STATUS_CLASSES[r.status]}>{r.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${r.score >= 85 ? "bg-teal-400" : r.score >= 70 ? "bg-amber-400" : "bg-red-400"}`}
                              style={{ width: `${r.score}%` }} />
                          </div>
                          <span className={`font-bold text-xs ${SCORE_COLOR(r.score)}`}>{r.score}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          {r.status !== "Approved" && (
                            <Button size="sm" onClick={() => applyStatusToRow(r.id, "Approved")}
                              className="bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-white text-xs h-7 px-2">
                              Approve
                            </Button>
                          )}
                          {r.status !== "Rejected" && (
                            <Button size="sm" onClick={() => applyStatusToRow(r.id, "Rejected")} variant="outline"
                              className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs h-7 px-2">
                              Reject
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white text-xs h-7 px-2">
                            View
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={8} className="px-4 py-10 text-center text-gray-500">No applicants match filters</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
