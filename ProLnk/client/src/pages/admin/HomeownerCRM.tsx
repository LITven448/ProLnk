import { useState, useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Users, Search, Mail, Phone, MapPin, Star, DollarSign, RefreshCw, Send,
  Eye, Clock, TrendingUp, ChevronRight, Home, Shield, AlertTriangle,
  Download, MessageSquare, Activity, Calendar, Wrench, ThumbsUp, X
} from "lucide-react";

function fmtDate(ts: string | null) {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function fmtCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function healthColor(score: number) {
  if (score >= 80) return "text-teal-400";
  if (score >= 60) return "text-yellow-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
}

function healthBg(score: number) {
  if (score >= 80) return "bg-teal-500/10 border-teal-500/30";
  if (score >= 60) return "bg-yellow-500/10 border-yellow-500/30";
  if (score >= 40) return "bg-orange-500/10 border-orange-500/30";
  return "bg-red-500/10 border-red-500/30";
}

function healthLabel(score: number) {
  if (score >= 80) return "Active";
  if (score >= 60) return "Engaged";
  if (score >= 40) return "At Risk";
  return "Dormant";
}

const MOCK_HOMEOWNERS = [
  {
    id: "ho-001",
    name: "Patricia Nguyen",
    email: "patricia.nguyen@gmail.com",
    phone: "(512) 334-8821",
    address: "4821 Lavaca St",
    city: "Austin",
    state: "TX",
    zip: "78756",
    homes: 2,
    joinDate: "2024-03-12",
    lastService: "2026-04-28",
    totalSpend: 8400,
    healthScore: 92,
    jobsCompleted: 7,
    prosUsed: ["RoofPro Austin", "TexasHVAC", "Austin Electric Co"],
    reviewsGiven: 5,
    avgRating: 4.8,
    tags: ["High Value", "Repeat"],
    communications: [
      { date: "2026-04-28", type: "email", subject: "Job complete: HVAC tune-up", preview: "Your technician has completed the job..." },
      { date: "2026-03-15", type: "sms", subject: "Match found for roof inspection", preview: "We found a top-rated pro near you..." },
      { date: "2026-02-01", type: "email", subject: "Welcome to ProLnk!", preview: "Your account is ready..." },
    ],
    jobHistory: [
      { date: "2026-04-28", trade: "HVAC", pro: "TexasHVAC", amount: 320, status: "completed", rating: 5 },
      { date: "2026-03-10", trade: "Roofing", pro: "RoofPro Austin", amount: 2800, status: "completed", rating: 5 },
      { date: "2025-11-20", trade: "Electrical", pro: "Austin Electric Co", amount: 950, status: "completed", rating: 4 },
      { date: "2025-09-05", trade: "Plumbing", pro: "AquaTech Plumbing", amount: 580, status: "completed", rating: 5 },
      { date: "2025-07-14", trade: "Landscaping", pro: "Green Thumb ATX", amount: 1200, status: "completed", rating: 5 },
    ],
  },
  {
    id: "ho-002",
    name: "Marcus Webb",
    email: "mwebb.home@outlook.com",
    phone: "(713) 882-4401",
    address: "9023 Westheimer Rd",
    city: "Houston",
    state: "TX",
    zip: "77063",
    homes: 1,
    joinDate: "2024-07-21",
    lastService: "2026-05-03",
    totalSpend: 14200,
    healthScore: 88,
    jobsCompleted: 12,
    prosUsed: ["HoustonRoof", "Gulf Coast HVAC", "Premier Plumbing HTX"],
    reviewsGiven: 9,
    avgRating: 4.6,
    tags: ["High Value", "Active"],
    communications: [
      { date: "2026-05-03", type: "email", subject: "Invoice ready: Roof replacement", preview: "Your job invoice is available..." },
      { date: "2026-04-12", type: "sms", subject: "Pro confirmed for tomorrow", preview: "Your appointment is confirmed..." },
    ],
    jobHistory: [
      { date: "2026-05-03", trade: "Roofing", pro: "HoustonRoof", amount: 6800, status: "completed", rating: 5 },
      { date: "2026-02-18", trade: "HVAC", pro: "Gulf Coast HVAC", amount: 1800, status: "completed", rating: 4 },
      { date: "2025-12-05", trade: "Plumbing", pro: "Premier Plumbing HTX", amount: 420, status: "completed", rating: 5 },
    ],
  },
  {
    id: "ho-003",
    name: "Sandra Kowalski",
    email: "sandrakowalski@yahoo.com",
    phone: "(214) 553-9917",
    address: "1567 Oak Cliff Blvd",
    city: "Dallas",
    state: "TX",
    zip: "75208",
    homes: 3,
    joinDate: "2023-11-05",
    lastService: "2026-01-14",
    totalSpend: 22100,
    healthScore: 71,
    jobsCompleted: 18,
    prosUsed: ["DFW Roofing", "North Texas HVAC", "Dallas Electrical", "Pool Masters"],
    reviewsGiven: 14,
    avgRating: 4.4,
    tags: ["High Value", "Multi-Home"],
    communications: [
      { date: "2026-01-14", type: "email", subject: "Pool repair complete", preview: "Pool Pro has finalized your job..." },
      { date: "2025-12-20", type: "email", subject: "Holiday service reminder", preview: "Don't forget your annual HVAC..." },
    ],
    jobHistory: [
      { date: "2026-01-14", trade: "Pool", pro: "Pool Masters", amount: 1400, status: "completed", rating: 4 },
      { date: "2025-10-02", trade: "HVAC", pro: "North Texas HVAC", amount: 2100, status: "completed", rating: 5 },
      { date: "2025-08-17", trade: "Roofing", pro: "DFW Roofing", amount: 9200, status: "completed", rating: 4 },
    ],
  },
  {
    id: "ho-004",
    name: "Jerome Batiste",
    email: "jerome.b@icloud.com",
    phone: "(210) 774-2298",
    address: "3341 NW Loop 1604",
    city: "San Antonio",
    state: "TX",
    zip: "78249",
    homes: 1,
    joinDate: "2025-04-18",
    lastService: "2025-10-31",
    totalSpend: 1850,
    healthScore: 44,
    jobsCompleted: 2,
    prosUsed: ["SA Plumbing Pro"],
    reviewsGiven: 1,
    avgRating: 3.0,
    tags: ["At Risk"],
    communications: [
      { date: "2025-10-31", type: "email", subject: "How was your experience?", preview: "We'd love to hear your feedback..." },
    ],
    jobHistory: [
      { date: "2025-10-31", trade: "Plumbing", pro: "SA Plumbing Pro", amount: 850, status: "completed", rating: 3 },
      { date: "2025-06-12", trade: "Electrical", pro: "Alamo Electric", amount: 1000, status: "cancelled", rating: null },
    ],
  },
  {
    id: "ho-005",
    name: "Tiffany Odom",
    email: "tiffany.odom.home@gmail.com",
    phone: "(832) 491-0034",
    address: "7820 Briar Forest Dr",
    city: "Houston",
    state: "TX",
    zip: "77079",
    homes: 1,
    joinDate: "2025-01-29",
    lastService: "2024-12-15",
    totalSpend: 320,
    healthScore: 28,
    jobsCompleted: 1,
    prosUsed: [],
    reviewsGiven: 0,
    avgRating: 0,
    tags: ["Dormant"],
    communications: [
      { date: "2025-01-29", type: "email", subject: "Welcome to ProLnk!", preview: "Your account is ready..." },
    ],
    jobHistory: [
      { date: "2024-12-15", trade: "Painting", pro: "FreshCoat Pros", amount: 320, status: "completed", rating: null },
    ],
  },
  {
    id: "ho-006",
    name: "Derek Harmon",
    email: "d.harmon.realty@gmail.com",
    phone: "(512) 601-7733",
    address: "1204 Barton Springs Rd",
    city: "Austin",
    state: "TX",
    zip: "78704",
    homes: 5,
    joinDate: "2023-08-14",
    lastService: "2026-05-09",
    totalSpend: 38600,
    healthScore: 97,
    jobsCompleted: 29,
    prosUsed: ["RoofPro Austin", "TexasHVAC", "Austin Electric Co", "Green Thumb ATX", "AquaTech Plumbing"],
    reviewsGiven: 25,
    avgRating: 4.9,
    tags: ["High Value", "VIP", "Multi-Home"],
    communications: [
      { date: "2026-05-09", type: "email", subject: "Job complete: Fence installation", preview: "Your job is complete..." },
      { date: "2026-04-30", type: "sms", subject: "Appointment reminder tomorrow", preview: "Your pro arrives at 9am..." },
    ],
    jobHistory: [
      { date: "2026-05-09", trade: "Fencing", pro: "Austin Fence Co", amount: 3200, status: "completed", rating: 5 },
      { date: "2026-04-15", trade: "HVAC", pro: "TexasHVAC", amount: 4100, status: "completed", rating: 5 },
      { date: "2026-03-01", trade: "Roofing", pro: "RoofPro Austin", amount: 12400, status: "completed", rating: 5 },
    ],
  },
];

type FilterType = "all" | "active" | "inactive" | "high-value" | "at-risk";

export default function HomeownerCRM() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedHomeowner, setSelectedHomeowner] = useState<typeof MOCK_HOMEOWNERS[0] | null>(null);
  const [messageTarget, setMessageTarget] = useState<typeof MOCK_HOMEOWNERS[0] | null>(null);
  const [messageText, setMessageText] = useState("");

  const filtered = useMemo(() => {
    return MOCK_HOMEOWNERS.filter((h) => {
      const q = search.toLowerCase();
      const matchSearch = !search ||
        h.name.toLowerCase().includes(q) ||
        h.email.toLowerCase().includes(q) ||
        h.address.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.zip.includes(q);

      const matchFilter =
        activeFilter === "all" ||
        (activeFilter === "active" && h.healthScore >= 70) ||
        (activeFilter === "inactive" && h.healthScore < 50) ||
        (activeFilter === "high-value" && h.totalSpend >= 5000) ||
        (activeFilter === "at-risk" && h.healthScore >= 30 && h.healthScore < 60);

      return matchSearch && matchFilter;
    }).sort((a, b) => b.totalSpend - a.totalSpend);
  }, [search, activeFilter]);

  const totalSpend = MOCK_HOMEOWNERS.reduce((s, h) => s + h.totalSpend, 0);
  const avgHealth = Math.round(MOCK_HOMEOWNERS.reduce((s, h) => s + h.healthScore, 0) / MOCK_HOMEOWNERS.length);
  const highValue = MOCK_HOMEOWNERS.filter((h) => h.totalSpend >= 5000).length;
  const atRisk = MOCK_HOMEOWNERS.filter((h) => h.healthScore < 60 && h.healthScore >= 30).length;

  function exportCSV() {
    const rows = [
      ["Name", "Email", "Phone", "City", "State", "ZIP", "Homes", "Jobs", "Total Spend", "Health Score", "Join Date", "Last Service"],
      ...MOCK_HOMEOWNERS.map((h) => [
        h.name, h.email, h.phone, h.city, h.state, h.zip,
        h.homes, h.jobsCompleted, h.totalSpend, h.healthScore, h.joinDate, h.lastService
      ])
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "homeowners_crm.csv";
    a.click();
    toast.success("CSV exported");
  }

  function sendMessage() {
    if (!messageText.trim()) return;
    toast.success(`Message sent to ${messageTarget?.name}`);
    setMessageText("");
    setMessageTarget(null);
  }

  const QUICK_FILTERS: { label: string; value: FilterType; color: string }[] = [
    { label: "All", value: "all", color: "" },
    { label: "Active", value: "active", color: "teal" },
    { label: "Inactive", value: "inactive", color: "slate" },
    { label: "High Value", value: "high-value", color: "amber" },
    { label: "At Risk", value: "at-risk", color: "red" },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-teal-400" />
              Homeowner CRM
            </h1>
            <p className="text-slate-400 text-sm mt-1">Full homeowner lifecycle — history, health scores, and re-engagement</p>
          </div>
          <Button onClick={exportCSV} className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 border border-teal-500/30">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Homeowners", value: MOCK_HOMEOWNERS.length, icon: <Users className="w-5 h-5 text-teal-400" />, color: "text-teal-400", bg: "bg-teal-500/10" },
            { label: "Total Revenue", value: fmtCurrency(totalSpend), icon: <DollarSign className="w-5 h-5 text-amber-400" />, color: "text-amber-400", bg: "bg-amber-500/10" },
            { label: "High Value (5k+)", value: highValue, icon: <Star className="w-5 h-5 text-yellow-400" />, color: "text-yellow-400", bg: "bg-yellow-500/10" },
            { label: "At Risk", value: atRisk, icon: <AlertTriangle className="w-5 h-5 text-red-400" />, color: "text-red-400", bg: "bg-red-500/10" },
          ].map((s) => (
            <div key={s.label} className={`rounded-xl p-4 border border-slate-700 ${s.bg}`}>
              <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-xs text-slate-400">{s.label}</span></div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              className="w-full bg-[#0F1E35] border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="Search name, email, address, ZIP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {QUICK_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === f.value
                    ? "bg-teal-500 text-white"
                    : "bg-[#0F1E35] border border-slate-700 text-slate-400 hover:border-teal-500/50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#0F1E35] rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Homeowner</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Location</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Homes</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Last Service</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Total Spend</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Health</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Join Date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-slate-500">No homeowners match your filters</td>
                  </tr>
                ) : filtered.map((h) => (
                  <tr
                    key={h.id}
                    className="hover:bg-slate-700/20 cursor-pointer transition-colors"
                    onClick={() => setSelectedHomeowner(h)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300 font-bold text-sm shrink-0">
                          {h.name[0]}
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">{h.name}</div>
                          <div className="text-slate-400 text-xs">{h.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-slate-300 text-xs">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {h.city}, {h.state} {h.zip}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-slate-300 text-sm">
                        <Home className="w-3.5 h-3.5 text-slate-500" />
                        {h.homes}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{fmtDate(h.lastService)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-amber-400">{fmtCurrency(h.totalSpend)}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className={`text-lg font-black ${healthColor(h.healthScore)}`}>{h.healthScore}</span>
                        <span className={`text-xs ${healthColor(h.healthScore)}`}>{healthLabel(h.healthScore)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{fmtDate(h.joinDate)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); setMessageTarget(h); }}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 text-xs transition-colors"
                      >
                        <MessageSquare className="w-3 h-3" /> Msg
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        <Dialog open={!!selectedHomeowner} onOpenChange={() => setSelectedHomeowner(null)}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0A1628] border border-slate-700 text-white">
            {selectedHomeowner && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300 font-bold">
                      {selectedHomeowner.name[0]}
                    </div>
                    <div>
                      <div className="text-white">{selectedHomeowner.name}</div>
                      <div className="text-sm text-slate-400 font-normal">{selectedHomeowner.address}, {selectedHomeowner.city}, {selectedHomeowner.state}</div>
                    </div>
                    <div className="ml-auto flex gap-2">
                      {selectedHomeowner.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full text-xs font-medium bg-teal-500/20 text-teal-300">{t}</span>
                      ))}
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-5 py-2">
                  {/* Quick stats */}
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: "Total Spend", value: fmtCurrency(selectedHomeowner.totalSpend), color: "text-amber-400" },
                      { label: "Jobs Done", value: selectedHomeowner.jobsCompleted, color: "text-teal-400" },
                      { label: "Health Score", value: selectedHomeowner.healthScore, color: healthColor(selectedHomeowner.healthScore) },
                      { label: "Avg Rating", value: selectedHomeowner.avgRating > 0 ? `${selectedHomeowner.avgRating} ★` : "—", color: "text-yellow-400" },
                    ].map((s) => (
                      <div key={s.label} className="bg-[#0F1E35] rounded-lg p-3 text-center border border-slate-700">
                        <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Contact info */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Mail className="w-4 h-4 text-slate-500" />{selectedHomeowner.email}
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Phone className="w-4 h-4 text-slate-500" />{selectedHomeowner.phone}
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Home className="w-4 h-4 text-slate-500" />{selectedHomeowner.homes} home{selectedHomeowner.homes > 1 ? "s" : ""} registered
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Calendar className="w-4 h-4 text-slate-500" />Joined {fmtDate(selectedHomeowner.joinDate)}
                    </div>
                  </div>

                  {/* Pros used */}
                  {selectedHomeowner.prosUsed.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1">
                        <Wrench className="w-4 h-4 text-teal-400" /> Pros Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedHomeowner.prosUsed.map((p) => (
                          <span key={p} className="px-2.5 py-1 rounded-full text-xs bg-slate-700/60 text-slate-300">{p}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Job history */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1">
                      <Activity className="w-4 h-4 text-teal-400" /> Job History
                    </h3>
                    <div className="space-y-2">
                      {selectedHomeowner.jobHistory.map((job, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-[#0F1E35] rounded-lg border border-slate-700 text-sm">
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              job.status === "completed" ? "bg-teal-500/20 text-teal-400" : "bg-red-500/20 text-red-400"
                            }`}>{job.status}</span>
                            <div>
                              <div className="text-white font-medium">{job.trade}</div>
                              <div className="text-slate-400 text-xs">{job.pro}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-right">
                            <div>
                              <div className="text-amber-400 font-semibold">{fmtCurrency(job.amount)}</div>
                              <div className="text-slate-500 text-xs">{fmtDate(job.date)}</div>
                            </div>
                            {job.rating && (
                              <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                <Star className="w-3.5 h-3.5" />{job.rating}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Communications */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1">
                      <MessageSquare className="w-4 h-4 text-teal-400" /> Recent Communications
                    </h3>
                    <div className="space-y-2">
                      {selectedHomeowner.communications.map((c, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-[#0F1E35] rounded-lg border border-slate-700 text-sm">
                          <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                            c.type === "email" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"
                          }`}>
                            {c.type === "email" ? <Mail className="w-3 h-3" /> : <Phone className="w-3 h-3" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-medium truncate">{c.subject}</div>
                            <div className="text-slate-400 text-xs">{c.preview}</div>
                          </div>
                          <div className="text-slate-500 text-xs shrink-0">{fmtDate(c.date)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter className="gap-2">
                  <Button variant="outline" className="border-slate-600 text-slate-400" onClick={() => setSelectedHomeowner(null)}>Close</Button>
                  <Button
                    className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 border border-teal-500/30"
                    onClick={() => { setMessageTarget(selectedHomeowner); setSelectedHomeowner(null); }}
                  >
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Message Dialog */}
        <Dialog open={!!messageTarget} onOpenChange={() => { setMessageTarget(null); setMessageText(""); }}>
          <DialogContent className="max-w-md bg-[#0A1628] border border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-teal-400" />
                Message {messageTarget?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="text-xs text-slate-400">Via email to <span className="text-teal-400">{messageTarget?.email}</span></div>
              <textarea
                className="w-full h-28 bg-[#0F1E35] border border-slate-700 rounded-lg p-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-slate-600 text-slate-400" onClick={() => { setMessageTarget(null); setMessageText(""); }}>Cancel</Button>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white" onClick={sendMessage}>
                <Send className="w-4 h-4 mr-2" /> Send
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
