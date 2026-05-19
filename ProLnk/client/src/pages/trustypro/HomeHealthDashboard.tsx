import { useState } from "react";
import { Link } from "wouter";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import {
  Home,
  Camera,
  Shield,
  Star,
  ChevronRight,
  Calendar,
  CheckCircle,
  AlertCircle,
  Wrench,
  Droplets,
  Wind,
  Leaf,
  Share2,
  ArrowRight,
  Clock,
  TrendingUp,
  TrendingDown,
  Lock,
  Zap,
  ScanLine,
} from "lucide-react";

const PRIMARY = "#1e3a5f";
const ACCENT = "#0891b2″;
const ACCENT_LIGHT = "#e0f2fe";
const BG = "#f8fafc";

const SCORE_CATEGORIES = [
  { id: "hvac", label: "HVAC", icon: Wind, score: 62, color: "#f59e0b", pendingIssues: 1 },
  { id: "plumbing", label: "Plumbing", icon: Droplets, score: 79, color: "#3b82f6″, pendingIssues: 0 },
  { id: "electrical", label: "Electrical", icon: Zap, score: 85, color: "#10b981″, pendingIssues: 0 },
  { id: "roofing", label: "Roofing", icon: Home, score: 88, color: "#10b981″, pendingIssues: 0 },
  { id: "interior", label: "Interior", icon: Wrench, score: 70, color: ACCENT, pendingIssues: 2 },
] as const;

const HEALTH_SCORE = Math.round(
  SCORE_CATEGORIES.reduce((sum, c) => sum + c.score, 0) / SCORE_CATEGORIES.length
);

const LAST_SCAN: Date | null = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

const RECENT_SCANS = [
  {
    id: "scan-3″,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    room: "Master Bathroom",
    issuesFound: 2,
    scoreFrom: 45,
    scoreTo: 67,
    improved: true,
  },
  {
    id: "scan-2″,
    date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    room: "Kitchen & Living Room",
    issuesFound: 4,
    scoreFrom: 72,
    scoreTo: 45,
    improved: false,
  },
  {
    id: "scan-1″,
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    room: "Exterior Front",
    issuesFound: 1,
    scoreFrom: 68,
    scoreTo: 72,
    improved: true,
  },
];

const PENDING_ISSUES = [
  {
    name: "HVAC filter replacement overdue",
    category: "HVAC",
    severity: "urgent" as const,
    description: "Detected during last scan — filter appears clogged, reducing airflow efficiency by ~30%.",
    estimatedCost: "$20–$60″,
    tradeType: "HVAC",
    scanDate: "Never",
  },
  {
    name: "Interior water stain — master bath ceiling",
    category: "Interior",
    severity: "moderate" as const,
    description: "Possible slow leak from upstairs plumbing. Monitor for expansion.",
    estimatedCost: "$200–$800″,
    tradeType: "Plumbing",
    scanDate: "Never",
  },
  {
    name: "Cracked caulk around tub surround",
    category: "Interior",
    severity: "low" as const,
    description: "Minor seal failure — reseal to prevent moisture intrusion.",
    estimatedCost: "$50–$150″,
    tradeType: "General Contractor",
    scanDate: "Never",
  },
];

const MAINTENANCE_ITEMS = [
  {
    title: "Spring HVAC Tune-Up",
    due: "Due this month",
    desc: "Replace filters and schedule annual AC inspection before summer heat.",
    urgency: "high",
    icon: Wind,
  },
  {
    title: "Gutter Cleaning",
    due: "Due in 3 weeks",
    desc: "Clear spring debris to prevent water damage and foundation issues.",
    urgency: "medium",
    icon: Home,
  },
  {
    title: "Exterior Paint Touch-Up",
    due: "Due in 6 weeks",
    desc: "Seal any cracking paint before summer UV exposure accelerates damage.",
    urgency: "low",
    icon: Wrench,
  },
  {
    title: "Lawn Fertilization",
    due: "Due in 2 weeks",
    desc: "Spring fertilizer application to establish healthy root growth.",
    urgency: "low",
    icon: Leaf,
  },
];

const NEARBY_PROS = [
  { name: "Apex HVAC Solutions", trade: "HVAC", rating: 4.9, reviews: 212, distance: "2.1 mi", verified: true, avatar: "AH" },
  { name: "Clear Flow Plumbing", trade: "Plumbing", rating: 4.8, reviews: 178, distance: "3.4 mi", verified: true, avatar: "CF" },
  { name: "Summit Roofing Co.", trade: "Roofing", rating: 4.7, reviews: 304, distance: "4.0 mi", verified: true, avatar: "SR" },
];

const severityMap = {
  urgent: { label: "🔴 Urgent", bg: "bg-red-50″, border: "border-red-200", text: "text-red-700" },
  moderate: { label: "🟠 Schedule Service", bg: "bg-amber-50″, border: "border-amber-200", text: "text-amber-700" },
  low: { label: "🟡 Monitor", bg: "bg-yellow-50″, border: "border-yellow-200", text: "text-yellow-700" },
};

function formatLastScan(date: Date | null): string {
  if (!date) return "Last scan: Never";
  const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return "Last scan: Today";
  if (days === 1) return "Last scan: Yesterday";
  return `Last scan: ${days} days ago`;
}

function formatScanDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function ScoreRing({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#10b981″ : score >= 60 ? ACCENT : "#f59e0b";

  return (
    <div className="relative flex items-center justify-center w-36 h-36″>
      <svg className="absolute inset-0″ viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="60″ cy="60" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="60″
          cy="60″
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10″
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="text-center z-10″>
        <p className="text-4xl font-black" style={{ color }}>{score}</p>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">/ 100</p>
      </div>
    </div>
  );
}

function UrgencyDot({ urgency }: { urgency: string }) {
  const map: Record<string, string> = {
    high: "bg-red-500″,
    medium: "bg-amber-400″,
    low: "bg-green-400″,
  };
  return <span className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${map[urgency] ?? "bg-gray-300"}`} />;
}

export default function HomeHealthDashboard() {
  const [shareHovered, setShareHovered] = useState(false);
  const [scheduleModal, setScheduleModal] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100 px-4 py-3″>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/trustypro">
            <TrustyProLogo className="h-7″ />
          </Link>
          <div className="flex items-center gap-3″>
            <Link href="/trustypro/scan">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-opacity hover:opacity-90″
                style={{ backgroundColor: ACCENT }}
              >
                <Camera className="w-3.5 h-3.5″ />
                Scan Home
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6″>
        {/* Header */}
        <div>
          <p className="text-sm font-semibold mb-1″ style={{ color: ACCENT }}>Home Health Dashboard</p>
          <h1 className="text-2xl font-black text-gray-900″>Your Home at a Glance</h1>
          <div className="flex items-center gap-3 mt-1″>
            <p className="text-sm text-gray-500″>123 Maple St, Frisco TX 75035</p>
            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {formatLastScan(LAST_SCAN)}
            </span>
          </div>
        </div>

        {/* Health Score Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6″>
          <div className="flex items-center gap-2 mb-4″>
            <Shield className="w-4 h-4″ style={{ color: ACCENT }} />
            <p className="font-bold text-gray-900″>Home Health Score</p>
            <span className="ml-auto text-xs font-semibold text-gray-400″>BETA</span>
          </div>

          <div className="flex items-center gap-6″>
            <div className="flex flex-col items-center gap-1″>
              <ScoreRing score={HEALTH_SCORE} />
              <p className="text-xs font-bold text-center" style={{ color: HEALTH_SCORE >= 80 ? "#10b981″ : HEALTH_SCORE >= 60 ? ACCENT : "#f59e0b" }}>
                {HEALTH_SCORE >= 80 ? "Great Shape" : HEALTH_SCORE >= 60 ? "Fair — Action Needed" : "Needs Attention"}
              </p>
            </div>
            <div className="flex-1 space-y-3″>
              {SCORE_CATEGORIES.map(({ label, score, icon: Icon, color, pendingIssues }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1″>
                    <div className="flex items-center gap-1.5″>
                      <Icon className="w-3.5 h-3.5″ style={{ color }} />
                      <span className="text-xs font-medium text-gray-600″>{label}</span>
                      {pendingIssues > 0 && (
                        <span className="text-xs font-bold text-white px-1.5 py-0.5 rounded-full leading-none" style={{ backgroundColor: "#ef4444″ }}>
                          {pendingIssues}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold" style={{ color }}>{score}/100</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${score}%`, backgroundColor: color, transition: "width 0.8s ease" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2″>
            <TrendingUp className="w-4 h-4 text-green-500″ />
            <p className="text-xs text-gray-500″>
              Score improved <strong className="text-green-600″>+6 pts</strong> since your last scan. Scan again to update.
            </p>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6″>
          <div className="flex items-center justify-between mb-4″>
            <div className="flex items-center gap-2″>
              <ScanLine className="w-4 h-4″ style={{ color: ACCENT }} />
              <p className="font-bold text-gray-900″>Recent Scans</p>
            </div>
            <Link href="/trustypro/scan">
              <span className="text-xs font-semibold hover:underline" style={{ color: ACCENT }}>New Scan</span>
            </Link>
          </div>

          {RECENT_SCANS.length === 0 ? (
            <div className="text-center py-6″>
              <Camera className="w-10 h-10 text-gray-200 mx-auto mb-2″ />
              <p className="text-sm font-semibold text-gray-500″>No scans yet</p>
              <p className="text-xs text-gray-400 mt-1″>Upload photos to get your first AI home report</p>
              <Link href="/trustypro/scan">
                <button
                  className="mt-4 text-xs font-bold text-white px-4 py-2 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                >
                  Scan Now — It's Free
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3″>
              {RECENT_SCANS.map((scan) => {
                const scoreDelta = scan.scoreTo - scan.scoreFrom;
                const deltaColor = scan.improved ? "#10b981″ : "#ef4444";
                return (
                  <div key={scan.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-sky-100 hover:bg-sky-50/30 transition-colors">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0″
                      style={{ backgroundColor: `${ACCENT}20` }}
                    >
                      <Camera className="w-4 h-4″ style={{ color: ACCENT }} />
                    </div>
                    <div className="flex-1 min-w-0″>
                      <p className="text-sm font-semibold text-gray-900 truncate">{scan.room}</p>
                      <div className="flex items-center gap-2 mt-0.5″>
                        <span className="text-xs text-gray-400″>{formatScanDate(scan.date)}</span>
                        <span className="text-xs text-gray-300″>·</span>
                        <span className="text-xs font-semibold text-gray-600″>
                          {scan.issuesFound} issue{scan.issuesFound !== 1 ? "s" : ""} found
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0″>
                      <div className="flex items-center gap-1 justify-end">
                        {scan.improved
                          ? <TrendingUp className="w-3.5 h-3.5″ style={{ color: deltaColor }} />
                          : <TrendingDown className="w-3.5 h-3.5″ style={{ color: deltaColor }} />}
                        <span className="text-sm font-black" style={{ color: deltaColor }}>
                          {scan.improved ? "+" : ""}{scoreDelta}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400″>{scan.scoreFrom} → {scan.scoreTo}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top Issues — with Book a Pro CTA per issue */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6″>
          <div className="flex items-center justify-between mb-4″>
            <div className="flex items-center gap-2″>
              <AlertCircle className="w-4 h-4 text-red-500″ />
              <p className="font-bold text-gray-900″>Top Issues Detected</p>
            </div>
            <span className="text-xs font-bold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: "#ef4444″ }}>
              {PENDING_ISSUES.length} found
            </span>
          </div>

          {PENDING_ISSUES.length === 0 ? (
            <div className="text-center py-6″>
              <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2″ />
              <p className="text-sm font-semibold text-gray-600″>No pending issues</p>
              <p className="text-xs text-gray-400 mt-1″>Run a scan to check for issues</p>
            </div>
          ) : (
            <div className="space-y-3″>
              {PENDING_ISSUES.slice(0, 3).map((issue, i) => {
                const sev = severityMap[issue.severity];
                return (
                  <div key={i} className={`rounded-xl border p-4 ${sev.bg} ${sev.border}`}>
                    <div className="flex items-start justify-between gap-3 mb-1″>
                      <p className="text-sm font-bold text-gray-900″>{issue.name}</p>
                      <span className={`text-xs font-semibold whitespace-nowrap ${sev.text}`}>{sev.label}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3″>{issue.description}</p>
                    <div className="flex items-center justify-between gap-2″>
                      <span className="text-xs text-gray-500″>🔧 {issue.tradeType} · {issue.estimatedCost}</span>
                      <Link href={`/trustypro/waitlist?service=${encodeURIComponent(issue.tradeType)}`}>
                        <button
                          className="flex items-center gap-1.5 text-xs font-bold text-white px-3 py-1.5 rounded-full transition-opacity hover:opacity-90 whitespace-nowrap"
                          style={{ backgroundColor: issue.severity === "urgent" ? "#dc2626″ : PRIMARY }}
                        >
                          <span>Book a Pro</span>
                          <ArrowRight className="w-3 h-3″ />
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
              {PENDING_ISSUES.length > 3 && (
                <p className="text-xs text-center text-gray-400 pt-1″>
                  +{PENDING_ISSUES.length - 3} more issues — run a new scan to see all
                </p>
              )}
            </div>
          )}
        </div>

        {/* Category Quick-Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6″>
          <div className="flex items-center gap-2 mb-4″>
            <Wrench className="w-4 h-4″ style={{ color: ACCENT }} />
            <p className="font-bold text-gray-900″>Schedule a Pro by Category</p>
          </div>
          <div className="grid grid-cols-1 gap-2″>
            {SCORE_CATEGORIES.map(({ id, label, icon: Icon, score, color, pendingIssues }) => (
              <div
                key={id}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-sky-100 hover:bg-sky-50/30 transition-colors"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0″
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon className="w-4 h-4″ style={{ color }} />
                </div>
                <div className="flex-1 min-w-0″>
                  <div className="flex items-center gap-1.5″>
                    <p className="text-sm font-semibold text-gray-900″>{label}</p>
                    {pendingIssues > 0 && (
                      <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-1.5 py-0 rounded-full">
                        {pendingIssues} issue{pendingIssues > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5″>
                    <div className="w-16 bg-gray-100 rounded-full h-1 overflow-hidden">
                      <div className="h-1 rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
                    </div>
                    <span className="text-xs text-gray-400″>{score}/100</span>
                  </div>
                </div>
                <button
                  className="shrink-0 text-xs font-semibold text-white px-3 py-1.5 rounded-full transition-opacity hover:opacity-90″
                  style={{ backgroundColor: ACCENT }}
                  onClick={() => setScheduleModal(id)}
                >
                  Get a Pro
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6″>
          <div className="flex items-center justify-between mb-4″>
            <div className="flex items-center gap-2″>
              <Camera className="w-4 h-4″ style={{ color: ACCENT }} />
              <p className="font-bold text-gray-900″>Documentation Status</p>
            </div>
            <Link href="/trustypro/scan">
              <span className="text-xs font-semibold hover:underline" style={{ color: ACCENT }}>Add Photos</span>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4″>
            <div className="text-center p-3 rounded-xl" style={{ backgroundColor: ACCENT_LIGHT }}>
              <p className="text-2xl font-black" style={{ color: ACCENT }}>14</p>
              <p className="text-xs text-gray-500 mt-0.5″>Photos</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-indigo-50″>
              <p className="text-2xl font-black text-indigo-600″>5</p>
              <p className="text-xs text-gray-500 mt-0.5″>Rooms</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-amber-50″>
              <p className="text-2xl font-black text-amber-600″>2</p>
              <p className="text-xs text-gray-500 mt-0.5″>Systems</p>
            </div>
          </div>

          <div className="space-y-2″>
            {[
              { label: "Exterior Front", done: true },
              { label: "Kitchen", done: true },
              { label: "Living Room", done: true },
              { label: "Master Bedroom", done: false },
              { label: "Garage / Utility", done: false },
            ].map(({ label, done }) => (
              <div key={label} className="flex items-center gap-2.5″>
                {done
                  ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0″ />
                  : <AlertCircle className="w-4 h-4 text-gray-300 shrink-0″ />}
                <span className={`text-sm ${done ? "text-gray-700" : "text-gray-400"}`}>{label}</span>
                {!done && <span className="ml-auto text-xs text-gray-400″>Not documented</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Maintenance */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6″>
          <div className="flex items-center gap-2 mb-4″>
            <Calendar className="w-4 h-4″ style={{ color: ACCENT }} />
            <p className="font-bold text-gray-900″>Maintenance Timeline</p>
            <span className="ml-auto text-xs font-semibold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: "#ef4444″ }}>
              1 urgent
            </span>
          </div>

          <div className="space-y-3″>
            {MAINTENANCE_ITEMS.map(({ title, due, desc, urgency, icon: Icon }) => (
              <div key={title} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <UrgencyDot urgency={urgency} />
                <div className="flex-1 min-w-0″>
                  <div className="flex items-center justify-between mb-0.5″>
                    <p className="text-sm font-semibold text-gray-900″>{title}</p>
                    <div className="flex items-center gap-1 shrink-0 ml-2″>
                      <Clock className="w-3 h-3 text-gray-400″ />
                      <span className="text-xs text-gray-400 whitespace-nowrap">{due}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500″>{desc}</p>
                </div>
                <Icon className="w-4 h-4 text-gray-400 shrink-0 mt-0.5″ />
              </div>
            ))}
          </div>
        </div>

        {/* AI Scan CTA */}
        <div
          className="rounded-2xl p-6 text-white overflow-hidden relative"
          style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%)` }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 bg-white -translate-y-8 translate-x-8″ />
          <div className="relative z-10″>
            <div className="flex items-center gap-2 mb-2″>
              <Camera className="w-5 h-5 text-sky-200″ />
              <p className="text-sm font-semibold text-sky-200″>AI Home Scan</p>
            </div>
            <h2 className="text-xl font-black mb-2″>Scan Your Home for Hidden Issues</h2>
            <p className="text-sm text-sky-100 mb-4″>
              Our AI analyzes your photos to detect water damage, structural concerns, and deferred maintenance — in seconds.
            </p>
            <Link href="/trustypro/scan">
              <button
                className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90″
                style={{ color: PRIMARY }}
              >
                <Camera className="w-4 h-4″ />
                Start Scan
                <ArrowRight className="w-4 h-4″ />
              </button>
            </Link>
          </div>
        </div>

        {/* Verified Pros Near You */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6″>
          <div className="flex items-center justify-between mb-4″>
            <div className="flex items-center gap-2″>
              <Shield className="w-4 h-4″ style={{ color: ACCENT }} />
              <p className="font-bold text-gray-900″>Verified Pros Near You</p>
            </div>
            <Link href="/trustypro/pros">
              <span className="text-xs font-semibold flex items-center gap-1 hover:underline" style={{ color: ACCENT }}>
                See All <ChevronRight className="w-3.5 h-3.5″ />
              </span>
            </Link>
          </div>

          <div className="space-y-3″>
            {NEARBY_PROS.map(({ name, trade, rating, reviews, distance, verified, avatar }) => (
              <div key={name} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-sky-100 hover:bg-sky-50/30 transition-colors cursor-pointer">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0″
                  style={{ backgroundColor: ACCENT }}
                >
                  {avatar}
                </div>
                <div className="flex-1 min-w-0″>
                  <div className="flex items-center gap-1.5″>
                    <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
                    {verified && <Shield className="w-3.5 h-3.5 text-green-500 shrink-0″ />}
                  </div>
                  <p className="text-xs text-gray-400″>{trade} · {distance}</p>
                </div>
                <div className="text-right shrink-0″>
                  <div className="flex items-center gap-0.5 justify-end">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400″ />
                    <span className="text-sm font-bold text-gray-800″>{rating}</span>
                  </div>
                  <p className="text-xs text-gray-400″>{reviews} reviews</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/trustypro/waitlist">
            <button
              className="w-full mt-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors hover:text-white"
              style={{ borderColor: ACCENT, color: ACCENT }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = ACCENT)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              Request a Pro for Your Project
            </button>
          </Link>
        </div>

        {/* Insurance Discount Banner */}
        <div
          className="rounded-2xl p-5 border"
          style={{ backgroundColor: "#fff7ed", borderColor: "#fed7aa" }}
        >
          <div className="flex items-start gap-3″>
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0″>
              <Lock className="w-5 h-5 text-orange-500″ />
            </div>
            <div className="flex-1″>
              <p className="text-sm font-bold text-orange-900 mb-1″>Share for Insurance Discount</p>
              <p className="text-xs text-orange-700 mb-3″>
                Homeowners who share their verified Home Health Score with participating insurers may qualify for up to <strong>12% off their annual premium</strong>. TrustyPro partners with select carriers to make this seamless — your data stays private.
              </p>
              <button
                className="flex items-center gap-1.5 text-xs font-semibold text-orange-700 hover:text-orange-900 transition-colors"
                onMouseEnter={() => setShareHovered(true)}
                onMouseLeave={() => setShareHovered(false)}
              >
                <Share2 className={`w-3.5 h-3.5 transition-transform ${shareHovered ? "scale-110" : ""}`} />
                Learn About the Insurance Partner Program
                <ChevronRight className="w-3.5 h-3.5″ />
              </button>
            </div>
          </div>
        </div>

        <div className="h-6″ />
      </div>

      {scheduleModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4″ onClick={() => setScheduleModal(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            {(() => {
              const cat = SCORE_CATEGORIES.find(c => c.id === scheduleModal);
              const label = cat?.label ?? scheduleModal;
              return (
                <>
                  <h3 className="text-lg font-black text-gray-900 mb-1″>Schedule a {label} Pro</h3>
                  <p className="text-sm text-gray-500 mb-5″>Join the waitlist and we'll match you with a background-checked, insured {label} professional in your area.</p>
                  <Link href={`/trustypro/waitlist?service=${encodeURIComponent(label)}`} onClick={() => setScheduleModal(null)}>
                    <button
                      className="w-full text-white font-bold py-3 rounded-xl mb-2 transition-opacity hover:opacity-90″
                      style={{ backgroundColor: ACCENT }}
                    >
                      Join Waitlist — It's Free
                    </button>
                  </Link>
                </>
              );
            })()}
            <button onClick={() => setScheduleModal(null)} className="w-full text-sm text-gray-400 hover:text-gray-600 py-2″>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
