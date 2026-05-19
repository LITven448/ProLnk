import { useLocation } from "wouter";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import {
  Camera,
  Users,
  FileText,
  Star,
  Shield,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Award,
  Home,
  Upload,
  ShieldCheck,
  History,
  MessageSquare,
  Wrench,
  AlertTriangle,
  Clock,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const TEAL = "#00B5B8″;
const TEAL_LIGHT = "#E0F7F7″;
const BG = "#F7FFFE";
const NAVY = "#1e3a5f";
const CYAN = "#0891b2″;

const PLACEHOLDER_USER = {
  name: "Sarah",
  address: "4821 Maple Ridge Dr",
  city: "Frisco",
  state: "TX",
  zip: "75034″,
  photoCount: 0,
  hasSetupProfile: false,
};

const QUICK_ACTIONS = [
  {
    icon: Camera,
    label: "Scan a New Room",
    desc: "AI scans your home for maintenance needs",
    href: "/trustypro/scan",
    color: CYAN,
    bg: TEAL_LIGHT,
  },
  {
    icon: AlertTriangle,
    label: "View Issues",
    desc: "See all detected issues and action items",
    href: "/trustypro/home-health",
    color: "#F59E0B",
    bg: "#FEF3C7″,
  },
  {
    icon: MessageSquare,
    label: "Book a Pro",
    desc: "Get bids from vetted, background-checked pros",
    href: "/trustypro/pros",
    color: NAVY,
    bg: "#EFF6FF",
  },
  {
    icon: BookOpen,
    label: "Home Documents",
    desc: "All repairs, photos, and invoices logged",
    href: "/my-home/documents",
    color: "#10B981″,
    bg: "#D1FAE5″,
  },
];

const RECENT_ACTIVITY = [
  {
    icon: Wrench,
    iconColor: "#10B981″,
    iconBg: "#D1FAE5″,
    title: "HVAC annual service completed",
    subtitle: "Apex HVAC Solutions · 3 days ago",
    tag: "Completed",
    tagColor: "#10B981″,
    tagBg: "#D1FAE5″,
  },
  {
    icon: Camera,
    iconColor: CYAN,
    iconBg: TEAL_LIGHT,
    title: "AI scan detected gutter debris",
    subtitle: "Photo uploaded · 1 week ago",
    tag: "Action Needed",
    tagColor: "#F59E0B",
    tagBg: "#FEF3C7″,
  },
  {
    icon: FileText,
    iconColor: "#6366F1″,
    iconBg: "#EEF2FF",
    title: "Roof inspection invoice saved",
    subtitle: "Summit Roofing Co. · 2 weeks ago",
    tag: "Logged",
    tagColor: "#6366F1″,
    tagBg: "#EEF2FF",
  },
  {
    icon: AlertTriangle,
    iconColor: "#EF4444″,
    iconBg: "#FEE2E2″,
    title: "Water heater approaching end of life",
    subtitle: "Proactive alert · Estimated 18 months",
    tag: "Plan Ahead",
    tagColor: "#EF4444″,
    tagBg: "#FEE2E2″,
  },
];

const RECENTLY_ACTIVE_PROS = [
  {
    avatar: "AH",
    name: "Apex HVAC Solutions",
    trade: "HVAC & Air Quality",
    rating: 4.9,
    reviews: 212,
    verified: true,
    color: TEAL,
  },
  {
    avatar: "CF",
    name: "Clear Flow Plumbing",
    trade: "Plumbing & Water",
    rating: 4.8,
    reviews: 178,
    verified: true,
    color: "#6366F1″,
  },
  {
    avatar: "SR",
    name: "Summit Roofing Co.",
    trade: "Roofing & Gutters",
    rating: 4.7,
    reviews: 304,
    verified: true,
    color: "#10B981″,
  },
];

function HealthScoreGauge({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const color = score >= 80 ? "#10B981″ : score >= 60 ? "#F59E0B" : score >= 40 ? "#F97316" : "#EF4444";
  const dashOffset = circumference - (score / 100) * circumference;
  const label = score >= 80 ? "Great Shape" : score >= 60 ? "Fair" : "Needs Attention";
  return (
    <div className="relative flex items-center justify-center w-36 h-36″>
      <svg className="absolute inset-0″ viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="60″ cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="9" />
        <circle
          cx="60″
          cy="60″
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="9″
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.4s ease" }}
        />
      </svg>
      <div className="text-center z-10″>
        <p className="text-4xl font-black text-white leading-none">{score}</p>
        <p className="text-xs text-blue-300 mt-0.5″>/100</p>
        <p className="text-xs font-semibold mt-1″ style={{ color }}>{label}</p>
      </div>
    </div>
  );
}

const isNewUser = !PLACEHOLDER_USER.hasSetupProfile;

export default function HomeownerDashboard() {
  const [, navigate] = useLocation();

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: BG, fontFamily: "'Inter', sans-serif" }}
    >
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm"
        style={{ borderColor: `${TEAL}20` }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <TrustyProLogo height={40} />
          <div className="flex items-center gap-3″>
            <button
              onClick={() => navigate("/trustypro/home-health")}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden sm:block"
            >
              Home Health
            </button>
            <button
              onClick={() => navigate("/trustypro/scan")}
              className="px-4 py-2 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: TEAL }}
            >
              New Scan
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10″>

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold" style={{ color: TEAL }}>Good morning</p>
          <h1 className="text-3xl font-black text-gray-900 mt-1″>
            Welcome back, {PLACEHOLDER_USER.name}
          </h1>
          <p className="text-gray-500 text-sm mt-1″>
            Your home is protected by the TrustyPro network.
          </p>
        </motion.div>

        {/* New User: Set Up Home Profile CTA */}
        {isNewUser && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.07 }}
            className="rounded-2xl p-6 border-2 flex flex-col md:flex-row items-start md:items-center gap-5″
            style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0c2444 100%)`, borderColor: `${TEAL}40` }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0″
              style={{ backgroundColor: "rgba(0,181,184,0.2)" }}
            >
              <Sparkles className="w-7 h-7″ style={{ color: TEAL }} />
            </div>
            <div className="flex-1″>
              <p className="text-xs font-bold uppercase tracking-widest mb-1″ style={{ color: TEAL }}>Get Started</p>
              <h3 className="text-lg font-black text-white">Set Up Your Home Profile</h3>
              <p className="text-sm text-blue-200 mt-1 leading-relaxed">
                Add your address, property details, and systems so TrustyPro can monitor your home's health, send maintenance alerts, and match you to the right pros.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
              <button
                onClick={() => navigate("/trustypro/property-setup")}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: TEAL }}
              >
                <Home className="w-4 h-4″ /> Set Up My Home <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.section>
        )}

        {/* Your Home */}
        {!isNewUser && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="bg-white rounded-2xl border p-6 flex flex-col md:flex-row items-start md:items-center gap-6″
          style={{ borderColor: "#E5E7EB" }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0″
            style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${CYAN} 100%)` }}
          >
            <Home className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0″>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1″>Your Home</p>
            <p className="text-lg font-black text-gray-900 truncate">{PLACEHOLDER_USER.address}</p>
            <p className="text-sm text-gray-500″>
              {PLACEHOLDER_USER.city}, {PLACEHOLDER_USER.state} {PLACEHOLDER_USER.zip}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={() => navigate("/trustypro/scan")}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: CYAN }}
            >
              <Upload className="w-4 h-4″ />
              {PLACEHOLDER_USER.photoCount === 0 ? "Upload First Photo" : "Upload Photos"}
            </button>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold" style={{ backgroundColor: PLACEHOLDER_USER.photoCount > 0 ? "#D1FAE5″ : "#FEF3C7", color: PLACEHOLDER_USER.photoCount > 0 ? "#059669" : "#D97706" }}>
              {PLACEHOLDER_USER.photoCount > 0 ? (
                <><CheckCircle className="w-4 h-4″ /> AI Analysis: Ready</>
              ) : (
                <><Clock className="w-4 h-4″ /> AI Analysis: Upload to start</>
              )}
            </div>
          </div>
        </motion.section>
        )}

        {/* Home Health Score — circular gauge or empty state */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-6 border cursor-pointer hover:shadow-md transition-shadow"
          style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0c2444 100%)`, borderColor: `${NAVY}40` }}
          onClick={() => navigate(isNewUser ? "/trustypro/property-setup" : "/trustypro/home-health")}
        >
          {isNewUser ? (
            <div className="flex flex-col md:flex-row items-center gap-6 py-2″>
              <div className="flex-shrink-0 flex flex-col items-center gap-2″>
                <p className="text-xs font-bold text-blue-300 uppercase tracking-widest">Home Health Score</p>
                <div className="relative flex items-center justify-center w-36 h-36″>
                  <svg className="absolute inset-0″ viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="60″ cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="9" />
                    <circle cx="60″ cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="9" strokeDasharray="326.7" strokeDashoffset="326.7" strokeLinecap="round" />
                  </svg>
                  <div className="text-center z-10″>
                    <p className="text-3xl font-black text-white/40 leading-none">—</p>
                    <p className="text-xs text-blue-300 mt-1″>No data yet</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-black text-white">No scans yet — take your first scan!</h3>
                <p className="text-sm text-blue-200 mt-2 leading-relaxed">
                  Set up your home profile and upload a photo so our AI can generate your Health Score and flag maintenance needs.
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("/trustypro/property-setup"); }}
                  className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: TEAL }}
                >
                  <Home className="w-4 h-4″ /> Set Up Home Profile
                </button>
              </div>
            </div>
          ) : (
          <div className="flex flex-col md:flex-row items-center gap-8″>
            {/* Circular gauge */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2″>
              <p className="text-xs font-bold text-blue-300 uppercase tracking-widest">Home Health Score</p>
              <HealthScoreGauge score={78} />
            </div>

            {/* System breakdown */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3″>
                {[
                  { label: "Roof & Gutters", pct: 82, color: "#10B981″ },
                  { label: "HVAC", pct: 91, color: "#10B981″ },
                  { label: "Plumbing", pct: 74, color: "#F59E0B" },
                  { label: "Electrical", pct: 88, color: "#10B981″ },
                  { label: "Foundation", pct: 60, color: "#F97316″ },
                  { label: "Interior", pct: 78, color: "#F59E0B" },
                ].map((sys) => (
                  <div key={sys.label} className="bg-white/10 rounded-xl p-3″>
                    <p className="text-xs text-blue-200 mb-1.5″>{sys.label}</p>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${sys.pct}%`, backgroundColor: sys.color }} />
                    </div>
                    <p className="text-xs font-bold mt-1″ style={{ color: sys.color }}>{sys.pct}/100</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); navigate("/trustypro/scan"); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white flex-shrink-0 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: CYAN }}
            >
              <Camera className="w-4 h-4″ /> New Scan
            </button>
          </div>
          )}
        </motion.section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4″>
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4″>
            {QUICK_ACTIONS.map((action, i) => (
              <motion.button
                key={action.label}
                onClick={() => navigate(action.href)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,181,184,0.12)" }}
                className="text-left bg-white rounded-2xl p-5 border flex flex-col gap-3 transition-shadow"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: action.bg }}
                >
                  <action.icon className="w-5 h-5″ style={{ color: action.color }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900″>{action.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{action.desc}</p>
                </div>
                <div className="flex items-center gap-1 mt-auto">
                  <span className="text-xs font-semibold" style={{ color: action.color }}>
                    Open
                  </span>
                  <ChevronRight className="w-3 h-3″ style={{ color: action.color }} />
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex items-center justify-between mb-4″>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Recent Activity
            </h2>
            <button
              onClick={() => navigate("/my-home/documents")}
              className="text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
              style={{ color: TEAL }}
            >
              View All <ArrowRight className="w-3 h-3″ />
            </button>
          </div>
          {isNewUser ? (
            <div
              className="bg-white rounded-2xl border flex flex-col items-center justify-center py-12 gap-4″
              style={{ borderColor: "#E5E7EB" }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "#E0F7F7″ }}
              >
                <Camera className="w-7 h-7″ style={{ color: TEAL }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-700″>No scans yet — take your first scan!</p>
                <p className="text-xs text-gray-400 mt-1″>Activity from scans, repairs, and AI alerts will appear here.</p>
              </div>
              <button
                onClick={() => navigate("/trustypro/scan")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: TEAL }}
              >
                <Camera className="w-4 h-4″ /> Start First Scan
              </button>
            </div>
          ) : (
          <div className="space-y-3″>
            {RECENT_ACTIVITY.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.07 }}
                className="bg-white rounded-2xl px-5 py-4 border flex items-center gap-4″
                style={{ borderColor: "#E5E7EB" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0″
                  style={{ backgroundColor: item.iconBg }}
                >
                  <item.icon className="w-5 h-5″ style={{ color: item.iconColor }} />
                </div>
                <div className="flex-1 min-w-0″>
                  <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5″>{item.subtitle}</p>
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0″
                  style={{ color: item.tagColor, backgroundColor: item.tagBg }}
                >
                  {item.tag}
                </span>
              </motion.div>
            ))}
          </div>
          )}
        </section>

        {/* Find a Pro */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="rounded-2xl p-6 border flex flex-col md:flex-row items-start md:items-center gap-5″
          style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0c2444 100%)`, borderColor: `${NAVY}40` }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0″
            style={{ backgroundColor: "rgba(8,145,178,0.25)" }}
          >
            <Users className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1″>
            <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1″>Find a Pro</p>
            <h3 className="text-lg font-black text-white">Ready to hire? Get matched now.</h3>
            <p className="text-sm text-blue-200 mt-1 leading-relaxed">
              Every pro is background-checked, licensed, and insured. AI matches you to the right trade for your job in hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={() => navigate("/trustypro/pros")}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: CYAN }}
            >
              Browse Pros <ArrowRight className="w-4 h-4″ />
            </button>
            <button
              onClick={() => navigate("/trustypro/waitlist")}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white border border-white/30 hover:bg-white/10 transition-colors"
            >
              Join Waitlist
            </button>
          </div>
        </motion.section>

        {/* Recently Active Pros */}
        <section>
          <div className="flex items-center justify-between mb-4″>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Recently Active Pros
            </h2>
            <button
              onClick={() => navigate("/trustypro/pros")}
              className="text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
              style={{ color: TEAL }}
            >
              Browse All <ArrowRight className="w-3 h-3″ />
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4″>
            {RECENTLY_ACTIVE_PROS.map((pro, i) => (
              <motion.div
                key={pro.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className="bg-white rounded-2xl p-5 border flex flex-col gap-3″
                style={{ borderColor: "#E5E7EB" }}
              >
                <div className="flex items-center gap-3″>
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0″
                    style={{ background: `linear-gradient(135deg, ${pro.color}, ${pro.color}99)` }}
                  >
                    {pro.avatar}
                  </div>
                  <div className="min-w-0″>
                    <p className="text-sm font-bold text-gray-900 truncate">{pro.name}</p>
                    <p className="text-xs text-gray-500″>{pro.trade}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1″>
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400″ />
                    <span className="text-xs font-bold text-gray-700″>{pro.rating}</span>
                    <span className="text-xs text-gray-400″>({pro.reviews})</span>
                  </div>
                  {pro.verified && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: TEAL_LIGHT }}>
                      <CheckCircle className="w-3 h-3″ style={{ color: TEAL }} />
                      <span className="text-xs font-semibold" style={{ color: TEAL }}>Verified</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TrustyPro Certified Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-5″
          style={{ backgroundColor: TEAL_LIGHT, border: `1.5px solid ${TEAL}30` }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0″
            style={{ backgroundColor: TEAL }}
          >
            <Award className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1″>
            <div className="flex items-center gap-2 mb-1″>
              <Shield className="w-4 h-4″ style={{ color: TEAL }} />
              <span className="text-sm font-black text-gray-900″>TrustyPro Certified Network</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every pro in your matches has passed our 7-point verification: license check, background screen, insurance confirmation, reference review, and more. You never see an unverified name.
            </p>
          </div>
          <button
            onClick={() => navigate("/trustypro/pros")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity flex-shrink-0″
            style={{ backgroundColor: TEAL }}
          >
            Browse Pros <ArrowRight className="w-4 h-4″ />
          </button>
        </motion.section>

        {/* Security Badge */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.55 }}
          className="rounded-2xl px-6 py-4 flex items-center gap-4″
          style={{ backgroundColor: "#F0FDF4″, border: "1.5px solid #BBF7D0" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0″
            style={{ backgroundColor: "#10B981″ }}
          >
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1″>
            <p className="text-sm font-black text-gray-900″>Your home is protected</p>
            <p className="text-xs text-gray-500 mt-0.5″>
              TrustyPro monitors your home health, verifies every pro, and keeps your records safe.
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: "#DCFCE7″ }}>
            <CheckCircle className="w-3.5 h-3.5″ style={{ color: "#10B981" }} />
            <span className="text-xs font-bold" style={{ color: "#059669″ }}>Active</span>
          </div>
        </motion.section>

        {/* Home Health teaser */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-2xl p-6 border flex flex-col md:flex-row items-start md:items-center gap-5 cursor-pointer hover:shadow-md transition-shadow"
          style={{ borderColor: "#E5E7EB" }}
          onClick={() => navigate("/trustypro/home-health")}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0″
            style={{ backgroundColor: TEAL_LIGHT }}
          >
            <Home className="w-7 h-7″ style={{ color: TEAL }} />
          </div>
          <div className="flex-1″>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1″>Home Health Vault</p>
            <h3 className="text-base font-black text-gray-900″>Your Home's Living Record</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Every repair, upgrade, and inspection — permanently logged. See your full health score and upcoming maintenance recommendations.
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0″ />
        </motion.section>

      </div>
    </div>
  );
}
