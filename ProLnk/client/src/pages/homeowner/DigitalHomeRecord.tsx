import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Home,
  FileText,
  Wrench,
  Droplets,
  Zap,
  Wind,
  Leaf,
  Shield,
  Download,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Calendar,
  Clock,
  Star,
  ChevronRight,
  Package,
} from "lucide-react";

type Tab = "overview" | "systems" | "history" | "documents" | "warranties";

const SYSTEMS = [
  {
    name: "HVAC",
    icon: Wind,
    lastService: "3 months ago",
    status: "ok",
    age: "8 yrs",
    note: "Filter replaced Feb 2026",
  },
  {
    name: "Plumbing",
    icon: Droplets,
    lastService: "1 year ago",
    status: "warn",
    age: "11 yrs",
    note: "Minor slow drain in master bath",
  },
  {
    name: "Roof",
    icon: Home,
    lastService: "2 years ago",
    status: "warn",
    age: "11 yrs",
    note: "Shingle wear detected on south face",
  },
  {
    name: "Electrical",
    icon: Zap,
    lastService: "Unknown",
    status: "unknown",
    age: "11 yrs",
    note: "No inspection on record",
  },
  {
    name: "Foundation",
    icon: Shield,
    lastService: "6 months ago",
    status: "ok",
    age: "11 yrs",
    note: "No movement detected",
  },
  {
    name: "Appliances",
    icon: Package,
    lastService: "Varies",
    status: "ok",
    age: "4 tracked",
    note: "Refrigerator, Washer, Dryer, Dishwasher",
  },
  {
    name: "Windows",
    icon: Home,
    lastService: "Unknown",
    status: "unknown",
    age: "11 yrs",
    note: "No seal inspection on record",
  },
  {
    name: "Landscaping",
    icon: Leaf,
    lastService: "1 month ago",
    status: "ok",
    age: "Ongoing",
    note: "Spring service completed Apr 2026",
  },
];

const TIMELINE = [
  { year: "2015", event: "Home Built", detail: "New construction — 4BR/3BA, 2,400 sqft", type: "milestone" },
  { year: "2016", event: "Permit Pulled", detail: "Deck addition permit — Collin County #2016-04812", type: "permit" },
  { year: "2019", event: "Roof Replaced", detail: "Full re-roof after hail damage, 30-yr architectural shingles", type: "repair" },
  { year: "2021", event: "Property Sale", detail: "Previous owner sold; current ownership began", type: "sale" },
  { year: "2023", event: "HVAC Upgraded", detail: "Lennox 16 SEER system installed — $8,400", type: "upgrade" },
  { year: "2025", event: "Foundation Inspection", detail: "Professional pier inspection — no action required", type: "inspection" },
];

const DOCUMENTS = [
  { name: "Original Purchase Agreement.pdf", size: "2.1 MB", date: "Sep 2021" },
  { name: "Roof Warranty Certificate.pdf", size: "640 KB", date: "Aug 2019" },
  { name: "HVAC Install Receipt.pdf", size: "180 KB", date: "Jun 2023" },
  { name: "HOA Rules & Regulations.pdf", size: "4.3 MB", date: "Jan 2022" },
  { name: "Foundation Inspection Report.pdf", size: "1.2 MB", date: "Mar 2025" },
  { name: "Pool Permit.pdf", size: "420 KB", date: "May 2022" },
  { name: "Survey Plat.pdf", size: "3.8 MB", date: "Sep 2021" },
];

const WARRANTIES = [
  { item: "Roof (30-yr Arch)", expires: "Aug 2049", status: "active" },
  { item: "HVAC Unit", expires: "Jun 2033", status: "active" },
  { item: "Foundation Warranty", expires: "Sep 2031", status: "active" },
  { item: "Kitchen Appliances", expires: "Dec 2026", status: "expiring" },
];

function StatusIcon({ status }: { status: string }) {
  if (status === "ok") return <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />;
  if (status === "warn") return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
  return <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />;
}

function HealthRing({ score = 78 }: { score?: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  const color = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";
  return (
    <div className="relative flex items-center justify-center" style={{ width: 72, height: 72 }}>
      <svg width={72} height={72} className="-rotate-90">
        <circle cx={36} cy={36} r={r} fill="none" stroke="#1e3a5f" strokeWidth={6} />
        <circle
          cx={36}
          cy={36}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-base font-bold text-white">{score}</span>
        <span className="block text-xs text-slate-400 leading-none">score</span>
      </div>
    </div>
  );
}

const TAB_LIST: { key: Tab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "systems", label: "Systems" },
  { key: "history", label: "History" },
  { key: "documents", label: "Documents" },
  { key: "warranties", label: "Warranties" },
];

export default function DigitalHomeRecord() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white px-4 py-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Digital Home Record</h1>
            <p className="text-slate-400 text-sm mt-1">
              Your home's complete history, docs, and vitals in one place
            </p>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 text-sm font-medium hover:bg-teal-500/20 transition-colors whitespace-nowrap">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>

        {/* Property Overview Card */}
        <div className="bg-[#0F2040] rounded-2xl border border-white/5 p-5 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0">
              <Home className="w-6 h-6 text-teal-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white">1234 Oak Creek Dr, Frisco TX 75034</p>
              <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-400">
                <span>Built <strong className="text-slate-300">2015</strong></span>
                <span>·</span>
                <span><strong className="text-slate-300">2,400</strong> sqft</span>
                <span>·</span>
                <span><strong className="text-slate-300">4</strong> BD / <strong className="text-slate-300">3</strong> BA</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs text-slate-400">Last scan: <strong className="text-slate-300">May 12, 2026</strong></span>
              </div>
            </div>
            <HealthRing score={78} />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 mb-6">
          {TAB_LIST.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                tab === t.key
                  ? "bg-teal-500 text-white"
                  : "bg-[#0F2040] text-slate-400 border border-white/10 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {tab === "overview" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Wrench, label: "Last 3 Services", value: "HVAC, Landscaping, Foundation", color: "text-teal-400" },
                { icon: AlertTriangle, label: "Open Issues", value: "2", color: "text-amber-400" },
                { icon: Clock, label: "Warranties Expiring", value: "1 within 12 mo", color: "text-red-400" },
                { icon: FileText, label: "Documents Stored", value: "7 files", color: "text-purple-400" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="bg-[#0F2040] rounded-xl p-4 border border-white/5">
                  <Icon className={`w-4 h-4 ${color} mb-2`} />
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-teal-900/30 to-emerald-900/30 border border-teal-500/20 rounded-xl p-4 flex items-center gap-3">
              <Star className="w-5 h-5 text-teal-400 shrink-0" />
              <p className="text-sm text-teal-200">
                Your home record is <strong className="text-teal-400">74% complete</strong>. Add electrical and window inspection history to improve your score.
              </p>
            </div>
          </div>
        )}

        {/* Systems Tab */}
        {tab === "systems" && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SYSTEMS.map((sys) => {
              const Icon = sys.icon;
              return (
                <div key={sys.name} className="bg-[#0F2040] rounded-xl border border-white/5 p-4 hover:border-teal-500/20 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-teal-400 shrink-0" />
                      <span className="font-semibold text-white text-sm">{sys.name}</span>
                    </div>
                    <StatusIcon status={sys.status} />
                  </div>
                  <p className="text-xs text-slate-500 mb-0.5">Age: {sys.age}</p>
                  <p className="text-xs text-slate-400 mb-0.5">Last: {sys.lastService}</p>
                  <p className="text-xs text-slate-500 mb-3 truncate">{sys.note}</p>
                  <button className="w-full py-1.5 rounded-lg bg-teal-500/10 text-teal-400 text-xs font-medium border border-teal-500/20 hover:bg-teal-500/20 transition-colors">
                    Schedule Service
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* History Tab */}
        {tab === "history" && (
          <div className="relative">
            <div className="absolute left-[42px] top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-6">
              {TIMELINE.map((event) => (
                <div key={event.year + event.event} className="flex gap-4">
                  <div className="flex flex-col items-center shrink-0 w-20">
                    <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-teal-400" />
                    </div>
                    <span className="text-xs text-slate-500 mt-1 font-mono">{event.year}</span>
                  </div>
                  <div className="bg-[#0F2040] rounded-xl border border-white/5 p-4 flex-1 min-w-0 mb-2">
                    <p className="font-semibold text-white text-sm">{event.event}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{event.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {tab === "documents" && (
          <div className="space-y-2">
            {DOCUMENTS.map((doc) => (
              <div
                key={doc.name}
                className="flex items-center gap-3 bg-[#0F2040] rounded-xl border border-white/5 p-4 hover:border-teal-500/20 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-teal-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{doc.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{doc.size} · Added {doc.date}</p>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                  <Download className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            ))}
            <button className="w-full mt-4 py-3 rounded-xl border border-dashed border-teal-500/30 text-teal-400 text-sm font-medium hover:bg-teal-500/5 transition-colors">
              + Upload Document
            </button>
          </div>
        )}

        {/* Warranties Tab */}
        {tab === "warranties" && (
          <div className="space-y-3">
            {WARRANTIES.map((w) => (
              <div
                key={w.item}
                className="flex items-center justify-between bg-[#0F2040] rounded-xl border border-white/5 p-4 hover:border-teal-500/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Shield
                    className={`w-5 h-5 shrink-0 ${w.status === "expiring" ? "text-amber-400" : "text-emerald-400"}`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{w.item}</p>
                    <p className="text-xs text-slate-400">Expires {w.expires}</p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                    w.status === "expiring"
                      ? "bg-amber-900/40 text-amber-400 border-amber-700/50"
                      : "bg-emerald-900/40 text-emerald-400 border-emerald-700/50"
                  }`}
                >
                  {w.status === "expiring" ? "Expiring Soon" : "Active"}
                </span>
              </div>
            ))}
            <button className="w-full mt-4 py-3 rounded-xl border border-dashed border-teal-500/30 text-teal-400 text-sm font-medium hover:bg-teal-500/5 transition-colors">
              + Add Warranty
            </button>
          </div>
        )}
      </div>
    </HomeownerLayout>
  );
}
