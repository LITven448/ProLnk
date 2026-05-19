import { useState, useEffect } from "react";
import { Link } from "wouter";
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
  Hammer,
  PaintBucket,
  CheckSquare,
} from "lucide-react";

const SCORE_CATEGORIES = [
  { id: "hvac", label: "HVAC", icon: Wind, score: 62, color: "#f59e0b", pendingIssues: 1 },
  { id: "plumbing", label: "Plumbing", icon: Droplets, score: 79, color: "#3b82f6″, pendingIssues: 0 },
  { id: "electrical", label: "Electrical", icon: Zap, score: 85, color: "#10b981″, pendingIssues: 0 },
  { id: "roofing", label: "Roofing", icon: Home, score: 88, color: "#10b981″, pendingIssues: 0 },
  { id: "interior", label: "Interior", icon: Wrench, score: 70, color: "#0891b2″, pendingIssues: 2 },
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
  },
  {
    name: "Interior water stain — master bath ceiling",
    category: "Interior",
    severity: "moderate" as const,
    description: "Possible slow leak from upstairs plumbing. Monitor for expansion.",
    estimatedCost: "$200–$800″,
    tradeType: "Plumbing",
  },
  {
    name: "Cracked caulk around tub surround",
    category: "Interior",
    severity: "low" as const,
    description: "Minor seal failure — reseal to prevent moisture intrusion.",
    estimatedCost: "$50–$150″,
    tradeType: "General Contractor",
  },
];

const SCHEDULE_NEXT_30 = [
  {
    title: "Spring HVAC Tune-Up",
    daysUntil: 3,
    desc: "Replace filters and schedule annual AC inspection before summer heat.",
    urgency: "high" as const,
    icon: Wind,
    estimatedCost: "$89–$149″,
  },
  {
    title: "Lawn Fertilization",
    daysUntil: 8,
    desc: "Spring fertilizer application to establish healthy root growth.",
    urgency: "medium" as const,
    icon: Leaf,
    estimatedCost: "$60–$120″,
  },
  {
    title: "Gutter Cleaning",
    daysUntil: 14,
    desc: "Clear spring debris to prevent water damage and foundation issues.",
    urgency: "medium" as const,
    icon: Home,
    estimatedCost: "$100–$200″,
  },
  {
    title: "Exterior Paint Touch-Up",
    daysUntil: 22,
    desc: "Seal any cracking paint before summer UV exposure accelerates damage.",
    urgency: "low" as const,
    icon: PaintBucket,
    estimatedCost: "$200–$600″,
  },
];

const RECENT_PRO_VISITS = [
  {
    proName: "Apex HVAC Solutions",
    proInitials: "AH",
    trade: "HVAC",
    date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
    jobSummary: "Annual AC tune-up & filter replacement",
    rating: 5,
    invoiceAmount: "$129″,
    status: "completed" as const,
    color: "#0891b2″,
  },
  {
    proName: "Summit Roofing Co.",
    proInitials: "SR",
    trade: "Roofing",
    date: new Date(Date.now() - 34 * 24 * 60 * 60 * 1000),
    jobSummary: "Shingle inspection & minor repair — 3 shingles replaced",
    rating: 5,
    invoiceAmount: "$285″,
    status: "completed" as const,
    color: "#10b981″,
  },
  {
    proName: "Clear Flow Plumbing",
    proInitials: "CF",
    trade: "Plumbing",
    date: new Date(Date.now() - 51 * 24 * 60 * 60 * 1000),
    jobSummary: "Kitchen faucet replacement & drain cleaning",
    rating: 4,
    invoiceAmount: "$210″,
    status: "completed" as const,
    color: "#6366f1″,
  },
];

const NEARBY_PROS = [
  { name: "Apex HVAC Solutions", trade: "HVAC", rating: 4.9, reviews: 212, distance: "2.1 mi", verified: true, avatar: "AH", color: "#0891b2″ },
  { name: "Clear Flow Plumbing", trade: "Plumbing", rating: 4.8, reviews: 178, distance: "3.4 mi", verified: true, avatar: "CF", color: "#6366f1″ },
  { name: "Summit Roofing Co.", trade: "Roofing", rating: 4.7, reviews: 304, distance: "4.0 mi", verified: true, avatar: "SR", color: "#10b981″ },
];

const severityMap = {
  urgent: { label: "Urgent", bg: "bg-red-900/30″, border: "border-red-700/50", text: "text-red-400", dot: "bg-red-500" },
  moderate: { label: "Schedule", bg: "bg-amber-900/30″, border: "border-amber-700/50", text: "text-amber-400", dot: "bg-amber-500" },
  low: { label: "Monitor", bg: "bg-yellow-900/20″, border: "border-yellow-700/40", text: "text-yellow-400", dot: "bg-yellow-500" },
};

const urgencyStyles = {
  high: { bar: "bg-red-500″, label: "text-red-400", badge: "bg-red-900/40 text-red-400 border border-red-700/40" },
  medium: { bar: "bg-amber-500″, label: "text-amber-400", badge: "bg-amber-900/40 text-amber-400 border border-amber-700/40" },
  low: { bar: "bg-teal-500″, label: "text-teal-400", badge: "bg-teal-900/30 text-teal-400 border border-teal-700/40" },
};

function formatLastScan(date: Date | null): string {
  if (!date) return "Never scanned";
  const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return "Scanned today";
  if (days === 1) return "Scanned yesterday";
  return `Scanned ${days} days ago`;
}

function formatScanDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function ScoreRing({ score, animated }: { score: number; animated: boolean }) {
  const radius = 72;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = animated ? circumference - (score / 100) * circumference : circumference;
  const color =
    score >= 80 ? "#10b981″ :
    score >= 60 ? "#0891b2″ :
    score >= 40 ? "#f59e0b" : "#ef4444″;
  const label =
    score >= 80 ? "Great Shape" :
    score >= 60 ? "Fair — Action Needed" :
    "Needs Attention";

  const glowColor =
    score >= 80 ? "0 0 40px rgba(16,185,129,0.35)" :
    score >= 60 ? "0 0 40px rgba(8,145,178,0.35)" : "0 0 40px rgba(245,158,11,0.35)";

  return (
    <div className="flex flex-col items-center gap-3″>
      <div className="relative flex items-center justify-center" style={{ width: 176, height: 176 }}>
        <svg
          className="absolute inset-0″
          viewBox="0 0 168 168″
          style={{ transform: "rotate(-90deg)", filter: animated ? `drop-shadow(${glowColor})` : "none" }}
        >
          <circle
            cx="84″ cy="84" r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="84″ cy="84" r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </svg>
        <div className="text-center z-10″>
          <p className="text-5xl font-black leading-none" style={{ color }}>{score}</p>
          <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">/ 100</p>
          <p className="text-sm font-bold mt-2″ style={{ color }}>{label}</p>
        </div>
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5″>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className="w-3 h-3″
          style={{ color: s <= rating ? "#fbbf24″ : "#374151", fill: s <= rating ? "#fbbf24" : "none" }}
        />
      ))}
    </div>
  );
}

export default function HomeHealthDashboard() {
  const [animated, setAnimated] = useState(false);
  const [shareHovered, setShareHovered] = useState(false);
  const [scheduleModal, setScheduleModal] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <nav className="sticky top-0 z-50 bg-[#0A1628]/95 backdrop-blur-sm border-b border-slate-800 px-4 py-3″>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2″>
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center">
              <Home className="w-4 h-4 text-teal-400″ />
            </div>
            <span className="text-sm font-bold text-white">Home Health</span>
          </div>
          <div className="flex items-center gap-2″>
            <Link href="/trustypro/book">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-400 border border-teal-500/30 hover:bg-teal-500/30 transition-colors">
                <Hammer className="w-3.5 h-3.5″ />
                Get Quote
              </button>
            </Link>
            <Link href="/trustypro/scan">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-400 text-[#0A1628] hover:bg-teal-300 transition-colors">
                <Camera className="w-3.5 h-3.5″ />
                Scan Home
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6″>
        <div>
          <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-1″>TrustyPro</p>
          <h1 className="text-2xl font-black text-white">Your Home at a Glance</h1>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <p className="text-sm text-slate-400″>123 Maple St, Frisco TX 75035</p>
            <span className="text-xs font-medium text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700″>
              {formatLastScan(LAST_SCAN)}
            </span>
          </div>
        </div>

        {/* Health Score Card — larger animated gauge */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6″>
            <Shield className="w-4 h-4 text-teal-400″ />
            <p className="font-bold text-white">Home Health Score</p>
            <span className="ml-auto text-xs font-semibold text-slate-500 bg-slate-700 px-2 py-0.5 rounded-full">BETA</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8″>
            <ScoreRing score={HEALTH_SCORE} animated={animated} />

            <div className="flex-1 w-full space-y-3″>
              {SCORE_CATEGORIES.map(({ label, score, icon: Icon, color, pendingIssues }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5″>
                    <div className="flex items-center gap-1.5″>
                      <Icon className="w-3.5 h-3.5″ style={{ color }} />
                      <span className="text-xs font-semibold text-slate-300″>{label}</span>
                      {pendingIssues > 0 && (
                        <span className="text-xs font-bold text-white px-1.5 py-0.5 rounded-full leading-none bg-red-500″>
                          {pendingIssues}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold" style={{ color }}>{score}/100</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: animated ? `${score}%` : "0%",
                        backgroundColor: color,
                        transitionDelay: "300ms",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center gap-2″>
            <TrendingUp className="w-4 h-4 text-emerald-400″ />
            <p className="text-xs text-slate-400″>
              Score improved <strong className="text-emerald-400″>+6 pts</strong> since your last scan.
            </p>
            <Link href="/trustypro/scan" className="ml-auto">
              <span className="text-xs font-semibold text-teal-400 hover:text-teal-300″>Rescan →</span>
            </Link>
          </div>
        </div>

        {/* Schedule Maintenance — next 30 days */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-5″>
            <div className="flex items-center gap-2″>
              <Calendar className="w-4 h-4 text-teal-400″ />
              <p className="font-bold text-white">Schedule Maintenance</p>
              <span className="text-xs font-semibold text-slate-500 bg-slate-700 px-2 py-0.5 rounded-full">Next 30 days</span>
            </div>
            <span className="text-xs font-bold text-red-400 bg-red-900/30 border border-red-700/40 px-2 py-0.5 rounded-full">
              1 urgent
            </span>
          </div>

          <div className="space-y-3″>
            {SCHEDULE_NEXT_30.map(({ title, daysUntil, desc, urgency, icon: Icon, estimatedCost }) => {
              const styles = urgencyStyles[urgency];
              return (
                <div
                  key={title}
                  className="flex items-start gap-3 p-4 rounded-xl bg-slate-700/40 border border-slate-700/60 hover:border-teal-500/30 transition-colors group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-teal-500/20 transition-colors">
                    <Icon className="w-4 h-4 text-slate-300 group-hover:text-teal-400 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0″>
                    <div className="flex items-start justify-between gap-2 mb-0.5″>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${styles.badge}`}>
                        {daysUntil === 0 ? "Today" : `${daysUntil}d`}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2″>{desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500″>{estimatedCost}</span>
                      <Link href="/trustypro/book">
                        <button className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1″>
                          Schedule <ArrowRight className="w-3 h-3″ />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Pro Activity */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-5″>
            <div className="flex items-center gap-2″>
              <CheckSquare className="w-4 h-4 text-teal-400″ />
              <p className="font-bold text-white">Recent Pro Activity</p>
            </div>
            <Link href="/trustypro/jobs">
              <span className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1″>
                View All <ChevronRight className="w-3.5 h-3.5″ />
              </span>
            </Link>
          </div>

          <div className="space-y-3″>
            {RECENT_PRO_VISITS.map((visit) => (
              <div
                key={visit.proName}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-700/60 bg-slate-700/30 hover:border-teal-500/30 transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0″
                  style={{ background: `linear-gradient(135deg, ${visit.color}, ${visit.color}99)` }}
                >
                  {visit.proInitials}
                </div>
                <div className="flex-1 min-w-0″>
                  <div className="flex items-center gap-1.5 mb-0.5″>
                    <p className="text-sm font-semibold text-white truncate">{visit.proName}</p>
                    <Shield className="w-3 h-3 text-emerald-400 shrink-0″ />
                  </div>
                  <p className="text-xs text-slate-400 mb-1 leading-snug">{visit.jobSummary}</p>
                  <div className="flex items-center gap-2″>
                    <StarRating rating={visit.rating} />
                    <span className="text-xs text-slate-500″>·</span>
                    <span className="text-xs text-slate-500″>{formatScanDate(visit.date)}</span>
                  </div>
                </div>
                <div className="text-right shrink-0″>
                  <p className="text-sm font-bold text-teal-400″>{visit.invoiceAmount}</p>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded-full">
                    Done
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Link href="/trustypro/book">
            <button className="w-full mt-4 py-3 rounded-xl text-sm font-bold text-[#0A1628] bg-teal-400 hover:bg-teal-300 transition-colors flex items-center justify-center gap-2″>
              <Hammer className="w-4 h-4″ />
              Get a Quote for Your Next Project
            </button>
          </Link>
        </div>

        {/* Recent Scans */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4″>
            <div className="flex items-center gap-2″>
              <ScanLine className="w-4 h-4 text-teal-400″ />
              <p className="font-bold text-white">Recent Scans</p>
            </div>
            <Link href="/trustypro/scan">
              <span className="text-xs font-semibold text-teal-400 hover:text-teal-300″>New Scan</span>
            </Link>
          </div>

          <div className="space-y-3″>
            {RECENT_SCANS.map((scan) => {
              const scoreDelta = scan.scoreTo - scan.scoreFrom;
              const deltaColor = scan.improved ? "#10b981″ : "#ef4444";
              return (
                <div key={scan.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-700/60 bg-slate-700/30 hover:border-teal-500/30 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0″>
                    <Camera className="w-4 h-4 text-teal-400″ />
                  </div>
                  <div className="flex-1 min-w-0″>
                    <p className="text-sm font-semibold text-white truncate">{scan.room}</p>
                    <div className="flex items-center gap-2 mt-0.5″>
                      <span className="text-xs text-slate-500″>{formatScanDate(scan.date)}</span>
                      <span className="text-xs text-slate-600″>·</span>
                      <span className="text-xs font-semibold text-slate-400″>
                        {scan.issuesFound} issue{scan.issuesFound !== 1 ? "s" : ""}
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
                    <p className="text-xs text-slate-500″>{scan.scoreFrom} → {scan.scoreTo}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Issues */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4″>
            <div className="flex items-center gap-2″>
              <AlertCircle className="w-4 h-4 text-red-400″ />
              <p className="font-bold text-white">Top Issues Detected</p>
            </div>
            <span className="text-xs font-bold text-red-400 bg-red-900/30 border border-red-700/40 px-2 py-0.5 rounded-full">
              {PENDING_ISSUES.length} found
            </span>
          </div>

          <div className="space-y-3″>
            {PENDING_ISSUES.map((issue, i) => {
              const sev = severityMap[issue.severity];
              return (
                <div key={i} className={`rounded-xl border p-4 ${sev.bg} ${sev.border}`}>
                  <div className="flex items-start justify-between gap-3 mb-1″>
                    <div className="flex items-center gap-2″>
                      <span className={`w-2 h-2 rounded-full shrink-0 mt-0.5 ${sev.dot}`} />
                      <p className="text-sm font-bold text-white">{issue.name}</p>
                    </div>
                    <span className={`text-xs font-semibold whitespace-nowrap ${sev.text}`}>{sev.label}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 ml-4″>{issue.description}</p>
                  <div className="flex items-center justify-between gap-2 ml-4″>
                    <span className="text-xs text-slate-500″>🔧 {issue.tradeType} · {issue.estimatedCost}</span>
                    <Link href={`/trustypro/book?service=${encodeURIComponent(issue.tradeType)}`}>
                      <button className={`flex items-center gap-1.5 text-xs font-bold text-white px-3 py-1.5 rounded-full transition-opacity hover:opacity-90 whitespace-nowrap ${issue.severity === "urgent" ? "bg-red-500" : "bg-teal-500"}`}>
                        Book a Pro
                        <ArrowRight className="w-3 h-3″ />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Quick-Actions */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4″>
            <Wrench className="w-4 h-4 text-teal-400″ />
            <p className="font-bold text-white">Schedule a Pro by Category</p>
          </div>
          <div className="grid grid-cols-1 gap-2″>
            {SCORE_CATEGORIES.map(({ id, label, icon: Icon, score, color, pendingIssues }) => (
              <div
                key={id}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-700/60 bg-slate-700/30 hover:border-teal-500/30 transition-colors"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0″
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon className="w-4 h-4″ style={{ color }} />
                </div>
                <div className="flex-1 min-w-0″>
                  <div className="flex items-center gap-1.5″>
                    <p className="text-sm font-semibold text-white">{label}</p>
                    {pendingIssues > 0 && (
                      <span className="text-xs font-bold text-red-400 bg-red-900/30 border border-red-700/40 px-1.5 py-0 rounded-full">
                        {pendingIssues}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5″>
                    <div className="w-16 bg-slate-600 rounded-full h-1 overflow-hidden">
                      <div className="h-1 rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
                    </div>
                    <span className="text-xs text-slate-500″>{score}/100</span>
                  </div>
                </div>
                <button
                  className="shrink-0 text-xs font-semibold text-[#0A1628] bg-teal-400 hover:bg-teal-300 px-3 py-1.5 rounded-full transition-colors"
                  onClick={() => setScheduleModal(id)}
                >
                  Get a Pro
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Pros */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4″>
            <div className="flex items-center gap-2″>
              <Shield className="w-4 h-4 text-teal-400″ />
              <p className="font-bold text-white">Verified Pros Near You</p>
            </div>
            <Link href="/trustypro/pros">
              <span className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1″>
                See All <ChevronRight className="w-3.5 h-3.5″ />
              </span>
            </Link>
          </div>

          <div className="space-y-3″>
            {NEARBY_PROS.map(({ name, trade, rating, reviews, distance, verified, avatar, color }) => (
              <div key={name} className="flex items-center gap-3 p-3 rounded-xl border border-slate-700/60 bg-slate-700/30 hover:border-teal-500/30 transition-colors cursor-pointer">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0″
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
                >
                  {avatar}
                </div>
                <div className="flex-1 min-w-0″>
                  <div className="flex items-center gap-1.5″>
                    <p className="text-sm font-semibold text-white truncate">{name}</p>
                    {verified && <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0″ />}
                  </div>
                  <p className="text-xs text-slate-500″>{trade} · {distance}</p>
                </div>
                <div className="text-right shrink-0″>
                  <div className="flex items-center gap-0.5 justify-end">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400″ />
                    <span className="text-sm font-bold text-white">{rating}</span>
                  </div>
                  <p className="text-xs text-slate-500″>{reviews} reviews</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance Discount Banner */}
        <div className="rounded-2xl p-5 border border-orange-700/40 bg-orange-900/20″>
          <div className="flex items-start gap-3″>
            <div className="w-10 h-10 rounded-xl bg-orange-800/40 flex items-center justify-center shrink-0″>
              <Lock className="w-5 h-5 text-orange-400″ />
            </div>
            <div className="flex-1″>
              <p className="text-sm font-bold text-orange-300 mb-1″>Share for Insurance Discount</p>
              <p className="text-xs text-orange-400/80 mb-3″>
                Share your verified Home Health Score with participating insurers and qualify for up to{" "}
                <strong className="text-orange-300″>12% off your annual premium</strong>.
              </p>
              <button
                className="flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
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
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4″
          onClick={() => setScheduleModal(null)}
        >
          <div
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const cat = SCORE_CATEGORIES.find((c) => c.id === scheduleModal);
              const label = cat?.label ?? scheduleModal;
              return (
                <>
                  <h3 className="text-lg font-black text-white mb-1″>Schedule a {label} Pro</h3>
                  <p className="text-sm text-slate-400 mb-5″>
                    Join the waitlist and we'll match you with a background-checked, insured {label} professional in your area.
                  </p>
                  <Link href={`/trustypro/book?service=${encodeURIComponent(label ?? "")}`} onClick={() => setScheduleModal(null)}>
                    <button className="w-full text-[#0A1628] font-bold py-3 rounded-xl mb-2 bg-teal-400 hover:bg-teal-300 transition-colors">
                      Get a Quote — It's Free
                    </button>
                  </Link>
                </>
              );
            })()}
            <button
              onClick={() => setScheduleModal(null)}
              className="w-full text-sm text-slate-500 hover:text-slate-300 py-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
