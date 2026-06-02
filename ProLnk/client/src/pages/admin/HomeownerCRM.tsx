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
  Download, MessageSquare, Activity, Calendar, Wrench, ThumbsUp, X,
  LayoutList, Columns, CheckSquare, Square, UserPlus, Zap,
} from "lucide-react";

function fmtDate(ts: string | null) {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function fmtCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function healthColor(score: number) {
  if (score >= 80) return "text-teal-700";
  if (score >= 60) return "text-yellow-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-600";
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

function HealthSparkline({ score }: { score: number }) {
  const segments = [
    Math.max(20, score - 15),
    Math.max(15, score - 22),
    Math.max(25, score - 8),
    Math.max(18, score - 18),
    Math.max(30, score - 5),
    score,
  ];
  const max = Math.max(...segments);
  return (
    <div className="flex items-end gap-0.5 h-5 w-12">
      {segments.map((v, i) => {
        const pct = Math.round((v / max) * 100);
        const isLast = i === segments.length - 1;
        const color = score >= 80 ? "bg-teal-400" : score >= 60 ? "bg-yellow-400" : score >= 40 ? "bg-orange-400" : "bg-red-400";
        return (
          <div
            key={i}
            className={`flex-1 rounded-sm ${isLast ? color : "bg-slate-600"}`}
            style={{ height: `${Math.max(20, pct)}%` }}
          />
        );
      })}
    </div>
  );
}

type PipelineStage = "New" | "Active" | "Completed" | "Churned";

const PIPELINE_STAGES: PipelineStage[] = ["New", "Active", "Completed", "Churned"];

function stagForHomeowner(h: { healthScore: number; jobsCompleted: number; lastService: string | null }): PipelineStage {
  if (h.healthScore >= 80 && h.jobsCompleted >= 5) return "Completed";
  if (h.healthScore >= 60) return "Active";
  if (h.healthScore < 40) return "Churned";
  return "New";
}

const STAGE_COLORS: Record<PipelineStage, string> = {
  New: "border-blue-500/40 bg-blue-500/5",
  Active: "border-teal-500/40 bg-teal-500/5",
  Completed: "border-green-500/40 bg-green-500/5",
  Churned: "border-red-500/40 bg-red-500/5",
};

const STAGE_BADGE: Record<PipelineStage, string> = {
  New: "bg-blue-500/20 text-blue-400",
  Active: "bg-teal-500/20 text-teal-700",
  Completed: "bg-green-500/20 text-green-700",
  Churned: "bg-red-500/20 text-red-600",
};

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
    recentActivity: [
      { date: "2026-04-28", event: "Job completed — HVAC tune-up with TexasHVAC", type: "job" },
      { date: "2026-04-20", event: "Left 5-star review for TexasHVAC", type: "review" },
      { date: "2026-04-10", event: "Opened email: Spring maintenance tips", type: "email" },
      { date: "2026-03-15", event: "New lead matched — Roof inspection", type: "lead" },
      { date: "2026-03-10", event: "Job completed — Roofing with RoofPro Austin", type: "job" },
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
    recentActivity: [
      { date: "2026-05-03", event: "Job completed — Roof replacement with HoustonRoof", type: "job" },
      { date: "2026-04-25", event: "Requested quote — HVAC inspection", type: "lead" },
      { date: "2026-04-12", event: "Pro confirmed for Roof appointment", type: "email" },
      { date: "2026-03-30", event: "Left 4-star review for Gulf Coast HVAC", type: "review" },
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
    recentActivity: [
      { date: "2026-01-14", event: "Job completed — Pool repair with Pool Masters", type: "job" },
      { date: "2026-01-05", event: "Opened email: Holiday service reminder", type: "email" },
      { date: "2025-12-20", event: "Re-engagement email sent", type: "email" },
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
    recentActivity: [
      { date: "2025-10-31", event: "Feedback email sent", type: "email" },
      { date: "2025-06-12", event: "Job cancelled — Electrical with Alamo Electric", type: "job" },
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
    recentActivity: [
      { date: "2025-01-29", event: "Welcome email sent", type: "email" },
      { date: "2024-12-15", event: "Job completed — Painting with FreshCoat Pros", type: "job" },
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
    recentActivity: [
      { date: "2026-05-09", event: "Job completed — Fence installation with Austin Fence Co", type: "job" },
      { date: "2026-05-01", event: "Left 5-star review for TexasHVAC", type: "review" },
      { date: "2026-04-30", event: "Appointment reminder sent via SMS", type: "email" },
      { date: "2026-04-15", event: "Job completed — HVAC with TexasHVAC", type: "job" },
      { date: "2026-04-01", event: "Opened email: April maintenance checklist", type: "email" },
    ],
  },
];

type FilterType = "all" | "active" | "inactive" | "high-value" | "at-risk";
type ViewMode = "table" | "kanban";

export default function HomeownerCRM() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [selectedHomeowner, setSelectedHomeowner] = useState<typeof MOCK_HOMEOWNERS[0] | null>(null);
  const [messageTarget, setMessageTarget] = useState<typeof MOCK_HOMEOWNERS[0] | null>(null);
  const [messageText, setMessageText] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

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

  function toggleSelect(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function clearSelection() {
    setSelectedIds(new Set());
  }

  const QUICK_FILTERS: { label: string; value: FilterType; color: string }[] = [
    { label: "All", value: "all", color: "" },
    { label: "Active", value: "active", color: "teal" },
    { label: "Inactive", value: "inactive", color: "slate" },
    { label: "High Value", value: "high-value", color: "amber" },
    { label: "At Risk", value: "at-risk", color: "red" },
  ];

  const activityIcon: Record<string, string> = {
    job: "🔧",
    review: "⭐",
    email: "📧",
    lead: "🎯",
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-teal-700" />
              Homeowner CRM
            </h1>
            <p className="text-gray-500 text-sm mt-1">Full homeowner lifecycle — history, health scores, and re-engagement</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 p-1 rounded-lg border border-gray-200 bg-[#F8FAFC]">
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${viewMode === "table" ? "bg-teal-500/20 text-teal-700" : "text-gray-500 hover:text-gray-800"}`}
              >
                <LayoutList className="w-3.5 h-3.5" /> Table
              </button>
              <button
                onClick={() => setViewMode("kanban")}
                className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${viewMode === "kanban" ? "bg-teal-500/20 text-teal-700" : "text-gray-500 hover:text-gray-800"}`}
              >
                <Columns className="w-3.5 h-3.5" /> Kanban
              </button>
            </div>
            <Button onClick={exportCSV} className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-700 border border-teal-500/30">
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Homeowners", value: MOCK_HOMEOWNERS.length, icon: <Users className="w-5 h-5 text-teal-700" />, color: "text-teal-700", bg: "bg-teal-500/10" },
            { label: "Total Revenue", value: fmtCurrency(totalSpend), icon: <DollarSign className="w-5 h-5 text-amber-700" />, color: "text-amber-700", bg: "bg-amber-500/10" },
            { label: "High Value (5k+)", value: highValue, icon: <Star className="w-5 h-5 text-yellow-400" />, color: "text-yellow-400", bg: "bg-yellow-500/10" },
            { label: "At Risk", value: atRisk, icon: <AlertTriangle className="w-5 h-5 text-red-600" />, color: "text-red-600", bg: "bg-red-500/10" },
          ].map((s) => (
            <div key={s.label} className={`rounded-xl p-4 border border-gray-200 ${s.bg}`}>
              <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-xs text-gray-500">{s.label}</span></div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              className="w-full bg-[#0F1E35] border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
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
                    ? "bg-teal-500 text-gray-900"
                    : "bg-[#0F1E35] border border-gray-200 text-gray-500 hover:border-teal-500/50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {selectedIds.size > 0 && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-teal-500/30 bg-teal-500/5">
            <span className="text-teal-700 text-sm font-semibold">{selectedIds.size} selected</span>
            <div className="flex gap-2 ml-2">
              <button
                onClick={() => { toast.success(`Email sent to ${selectedIds.size} homeowners`); clearSelection(); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/15 text-blue-400 text-xs font-medium border border-blue-500/25 hover:bg-blue-500/25 transition-colors"
              >
                <Mail className="w-3 h-3" /> Send Email
              </button>
              <button
                onClick={() => { toast.success(`Assigning pro to ${selectedIds.size} homeowners`); clearSelection(); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/15 text-violet-400 text-xs font-medium border border-violet-500/25 hover:bg-violet-500/25 transition-colors"
              >
                <UserPlus className="w-3 h-3" /> Assign Pro
              </button>
              <button
                onClick={() => { exportCSV(); clearSelection(); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-500/15 text-gray-500 text-xs font-medium border border-slate-500/25 hover:bg-slate-500/25 transition-colors"
              >
                <Download className="w-3 h-3" /> Export
              </button>
            </div>
            <button onClick={clearSelection} className="ml-auto text-gray-500 hover:text-gray-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {viewMode === "table" && (
          <div className="bg-[#0F1E35] rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 w-8">
                      <button
                        onClick={() => {
                          if (selectedIds.size === filtered.length) clearSelection();
                          else setSelectedIds(new Set(filtered.map(h => h.id)));
                        }}
                        className="text-gray-500 hover:text-teal-700 transition-colors"
                      >
                        {selectedIds.size === filtered.length && filtered.length > 0
                          ? <CheckSquare className="w-4 h-4" />
                          : <Square className="w-4 h-4" />
                        }
                      </button>
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Homeowner</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Homes</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Last Service</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Spend</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Health</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Join Date</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-4 py-12 text-center text-gray-500">No homeowners match your filters</td>
                    </tr>
                  ) : filtered.map((h) => (
                    <tr
                      key={h.id}
                      className={`hover:bg-gray-100/20 cursor-pointer transition-colors ${selectedIds.has(h.id) ? "bg-teal-500/5" : ""}`}
                      onClick={() => setSelectedHomeowner(h)}
                    >
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => toggleSelect(h.id)} className="text-gray-500 hover:text-teal-700 transition-colors">
                          {selectedIds.has(h.id) ? <CheckSquare className="w-4 h-4 text-teal-700" /> : <Square className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-700 font-bold text-sm shrink-0">
                            {h.name[0]}
                          </div>
                          <div>
                            <div className="text-gray-900 font-medium text-sm">{h.name}</div>
                            <div className="text-gray-500 text-xs">{h.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-gray-700 text-xs">
                          <MapPin className="w-3 h-3 text-gray-500" />
                          {h.city}, {h.state} {h.zip}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-gray-700 text-sm">
                          <Home className="w-3.5 h-3.5 text-gray-500" />
                          {h.homes}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{fmtDate(h.lastService)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-amber-700">{fmtCurrency(h.totalSpend)}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-lg font-black ${healthColor(h.healthScore)}`}>{h.healthScore}</span>
                            <HealthSparkline score={h.healthScore} />
                          </div>
                          <span className={`text-xs ${healthColor(h.healthScore)}`}>{healthLabel(h.healthScore)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{fmtDate(h.joinDate)}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); setMessageTarget(h); }}
                          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 text-xs transition-colors"
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
        )}

        {viewMode === "kanban" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PIPELINE_STAGES.map((stage) => {
              const stageItems = filtered.filter(h => stagForHomeowner(h) === stage);
              return (
                <div key={stage} className={`rounded-xl border p-4 ${STAGE_COLORS[stage]}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STAGE_BADGE[stage]}`}>{stage}</span>
                    <span className="text-xs text-gray-500">{stageItems.length}</span>
                  </div>
                  <div className="space-y-3">
                    {stageItems.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => setSelectedHomeowner(h)}
                        className="w-full text-left rounded-lg p-3 bg-[#F8FAFC] border border-gray-200 hover:border-teal-500/40 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-700 font-bold text-xs shrink-0">
                            {h.name[0]}
                          </div>
                          <span className="text-gray-900 text-xs font-semibold truncate">{h.name}</span>
                        </div>
                        <div className="text-gray-500 text-xs truncate">{h.city}, {h.state}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-amber-700 text-xs font-semibold">{fmtCurrency(h.totalSpend)}</span>
                          <div className="flex items-center gap-1">
                            <span className={`text-xs font-bold ${healthColor(h.healthScore)}`}>{h.healthScore}</span>
                            <HealthSparkline score={h.healthScore} />
                          </div>
                        </div>
                      </button>
                    ))}
                    {stageItems.length === 0 && (
                      <div className="text-xs text-gray-400 text-center py-4">No homeowners</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Dialog open={!!selectedHomeowner} onOpenChange={() => setSelectedHomeowner(null)}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-[#F8FAFC] border border-gray-200 text-gray-900">
            {selectedHomeowner && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-700 font-bold">
                      {selectedHomeowner.name[0]}
                    </div>
                    <div>
                      <div className="text-gray-900">{selectedHomeowner.name}</div>
                      <div className="text-sm text-gray-500 font-normal">{selectedHomeowner.address}, {selectedHomeowner.city}, {selectedHomeowner.state}</div>
                    </div>
                    <div className="ml-auto flex gap-2 flex-wrap">
                      {selectedHomeowner.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full text-xs font-medium bg-teal-500/20 text-teal-700">{t}</span>
                      ))}
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-5 py-2">
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: "Total Spend", value: fmtCurrency(selectedHomeowner.totalSpend), color: "text-amber-700" },
                      { label: "Jobs Done", value: selectedHomeowner.jobsCompleted, color: "text-teal-700" },
                      { label: "Health Score", value: selectedHomeowner.healthScore, color: healthColor(selectedHomeowner.healthScore) },
                      { label: "Avg Rating", value: selectedHomeowner.avgRating > 0 ? `${selectedHomeowner.avgRating} ★` : "—", color: "text-yellow-400" },
                    ].map((s) => (
                      <div key={s.label} className="bg-[#0F1E35] rounded-lg p-3 text-center border border-gray-200">
                        <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <Mail className="w-4 h-4 text-gray-500" />{selectedHomeowner.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <Phone className="w-4 h-4 text-gray-500" />{selectedHomeowner.phone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <Home className="w-4 h-4 text-gray-500" />{selectedHomeowner.homes} home{selectedHomeowner.homes > 1 ? "s" : ""} registered
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <Calendar className="w-4 h-4 text-gray-500" />Joined {fmtDate(selectedHomeowner.joinDate)}
                    </div>
                  </div>

                  {selectedHomeowner.prosUsed.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                        <Wrench className="w-4 h-4 text-teal-700" /> Pros Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedHomeowner.prosUsed.map((p) => (
                          <span key={p} className="px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-700">{p}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                      <Activity className="w-4 h-4 text-teal-700" /> Job History
                    </h3>
                    <div className="space-y-2">
                      {selectedHomeowner.jobHistory.map((job, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-[#0F1E35] rounded-lg border border-gray-200 text-sm">
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              job.status === "completed" ? "bg-teal-500/20 text-teal-700" : "bg-red-500/20 text-red-600"
                            }`}>{job.status}</span>
                            <div>
                              <div className="text-gray-900 font-medium">{job.trade}</div>
                              <div className="text-gray-500 text-xs">{job.pro}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-right">
                            <div>
                              <div className="text-amber-700 font-semibold">{fmtCurrency(job.amount)}</div>
                              <div className="text-gray-500 text-xs">{fmtDate(job.date)}</div>
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

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                      <Zap className="w-4 h-4 text-teal-700" /> Last 30 Days Activity
                    </h3>
                    <div className="relative pl-5 space-y-0">
                      {selectedHomeowner.recentActivity.map((a, i) => (
                        <div key={i} className="relative pb-3">
                          {i < selectedHomeowner.recentActivity.length - 1 && (
                            <div className="absolute left-[-12px] top-5 w-px h-full bg-gray-100" />
                          )}
                          <div className="flex items-start gap-3">
                            <span className="text-base leading-none mt-0.5 flex-shrink-0">{activityIcon[a.type] ?? "📌"}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-800 leading-snug">{a.event}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{fmtDate(a.date)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                      <MessageSquare className="w-4 h-4 text-teal-700" /> Recent Communications
                    </h3>
                    <div className="space-y-2">
                      {selectedHomeowner.communications.map((c, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-[#0F1E35] rounded-lg border border-gray-200 text-sm">
                          <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                            c.type === "email" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-700"
                          }`}>
                            {c.type === "email" ? <Mail className="w-3 h-3" /> : <Phone className="w-3 h-3" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-gray-900 font-medium truncate">{c.subject}</div>
                            <div className="text-gray-500 text-xs">{c.preview}</div>
                          </div>
                          <div className="text-gray-500 text-xs shrink-0">{fmtDate(c.date)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter className="gap-2">
                  <Button variant="outline" className="border-gray-300 text-gray-500" onClick={() => setSelectedHomeowner(null)}>Close</Button>
                  <Button
                    className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-700 border border-teal-500/30"
                    onClick={() => { setMessageTarget(selectedHomeowner); setSelectedHomeowner(null); }}
                  >
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={!!messageTarget} onOpenChange={() => { setMessageTarget(null); setMessageText(""); }}>
          <DialogContent className="max-w-md bg-[#F8FAFC] border border-gray-200 text-gray-900">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-teal-700" />
                Message {messageTarget?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="text-xs text-gray-500">Via email to <span className="text-teal-700">{messageTarget?.email}</span></div>
              <textarea
                className="w-full h-28 bg-[#0F1E35] border border-gray-200 rounded-lg p-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-gray-300 text-gray-500" onClick={() => { setMessageTarget(null); setMessageText(""); }}>Cancel</Button>
              <Button className="bg-teal-500 hover:bg-teal-600 text-gray-900" onClick={sendMessage}>
                <Send className="w-4 h-4 mr-2" /> Send
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
