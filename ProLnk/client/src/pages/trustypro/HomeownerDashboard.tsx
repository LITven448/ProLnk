import { useLocation } from "wouter";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import {
  Camera,
  Heart,
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
} from "lucide-react";
import { motion } from "framer-motion";

const TEAL = "#00B5B8";
const TEAL_LIGHT = "#E0F7F7";
const BG = "#F7FFFE";
const NAVY = "#1e3a5f";
const CYAN = "#0891b2";

const PLACEHOLDER_USER = {
  name: "Sarah",
  address: "4821 Maple Ridge Dr",
  city: "Frisco",
  state: "TX",
  zip: "75034",
  photoCount: 0,
};

const QUICK_ACTIONS = [
  {
    icon: MessageSquare,
    label: "Request a Quote",
    desc: "Get bids from vetted pros for any project",
    href: "/trustypro/pros",
    color: NAVY,
    bg: "#EFF6FF",
  },
  {
    icon: Upload,
    label: "Upload a Photo",
    desc: "AI scans your home for maintenance needs",
    href: "/trustypro/scan",
    color: CYAN,
    bg: TEAL_LIGHT,
  },
  {
    icon: ShieldCheck,
    label: "Check Insurance",
    desc: "Verify a pro's license and coverage",
    href: "/trustypro/pros",
    color: "#10B981",
    bg: "#D1FAE5",
  },
  {
    icon: History,
    label: "View History",
    desc: "All repairs, photos, and invoices logged",
    href: "/my-home/documents",
    color: "#F59E0B",
    bg: "#FEF3C7",
  },
];

const RECENT_ACTIVITY = [
  {
    icon: Wrench,
    iconColor: "#10B981",
    iconBg: "#D1FAE5",
    title: "HVAC annual service completed",
    subtitle: "Apex HVAC Solutions · 3 days ago",
    tag: "Completed",
    tagColor: "#10B981",
    tagBg: "#D1FAE5",
  },
  {
    icon: Camera,
    iconColor: CYAN,
    iconBg: TEAL_LIGHT,
    title: "AI scan detected gutter debris",
    subtitle: "Photo uploaded · 1 week ago",
    tag: "Action Needed",
    tagColor: "#F59E0B",
    tagBg: "#FEF3C7",
  },
  {
    icon: FileText,
    iconColor: "#6366F1",
    iconBg: "#EEF2FF",
    title: "Roof inspection invoice saved",
    subtitle: "Summit Roofing Co. · 2 weeks ago",
    tag: "Logged",
    tagColor: "#6366F1",
    tagBg: "#EEF2FF",
  },
  {
    icon: AlertTriangle,
    iconColor: "#EF4444",
    iconBg: "#FEE2E2",
    title: "Water heater approaching end of life",
    subtitle: "Proactive alert · Estimated 18 months",
    tag: "Plan Ahead",
    tagColor: "#EF4444",
    tagBg: "#FEE2E2",
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
    color: "#6366F1",
  },
  {
    avatar: "SR",
    name: "Summit Roofing Co.",
    trade: "Roofing & Gutters",
    rating: 4.7,
    reviews: 304,
    verified: true,
    color: "#10B981",
  },
];

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
          <div className="flex items-center gap-3">
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

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold" style={{ color: TEAL }}>Good morning</p>
          <h1 className="text-3xl font-black text-gray-900 mt-1">
            Welcome back, {PLACEHOLDER_USER.name}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Your home is protected by the TrustyPro network.
          </p>
        </motion.div>

        {/* Your Home */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="bg-white rounded-2xl border p-6 flex flex-col md:flex-row items-start md:items-center gap-6"
          style={{ borderColor: "#E5E7EB" }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${CYAN} 100%)` }}
          >
            <Home className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Your Home</p>
            <p className="text-lg font-black text-gray-900 truncate">{PLACEHOLDER_USER.address}</p>
            <p className="text-sm text-gray-500">
              {PLACEHOLDER_USER.city}, {PLACEHOLDER_USER.state} {PLACEHOLDER_USER.zip}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={() => navigate("/trustypro/scan")}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: CYAN }}
            >
              <Upload className="w-4 h-4" />
              {PLACEHOLDER_USER.photoCount === 0 ? "Upload First Photo" : "Upload Photos"}
            </button>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold" style={{ backgroundColor: PLACEHOLDER_USER.photoCount > 0 ? "#D1FAE5" : "#FEF3C7", color: PLACEHOLDER_USER.photoCount > 0 ? "#059669" : "#D97706" }}>
              {PLACEHOLDER_USER.photoCount > 0 ? (
                <><CheckCircle className="w-4 h-4" /> AI Analysis: Ready</>
              ) : (
                <><Clock className="w-4 h-4" /> AI Analysis: Upload to start</>
              )}
            </div>
          </div>
        </motion.section>

        {/* Home Health Score */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-6 border cursor-pointer hover:shadow-md transition-shadow"
          style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0c2444 100%)`, borderColor: `${NAVY}40` }}
          onClick={() => navigate("/trustypro/home-health")}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">Home Health Score</p>
              <div className="flex items-end gap-3">
                <span className="text-7xl font-black text-white leading-none">0</span>
                <div className="pb-1">
                  <span className="text-blue-300 text-sm">/100</span>
                  <p className="text-yellow-300 text-xs font-semibold mt-1">Upload photos to improve your score</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Roof & Gutters", "HVAC", "Plumbing", "Electrical", "Foundation", "Interior"].map((sys) => (
                  <div key={sys} className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs text-blue-200 mb-1.5">{sys}</p>
                    <div className="h-1 bg-white/10 rounded-full">
                      <div className="h-full w-0 bg-blue-400 rounded-full" />
                    </div>
                    <p className="text-xs text-blue-300 mt-1">Not scanned</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); navigate("/trustypro/scan"); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white flex-shrink-0 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: CYAN }}
            >
              <Upload className="w-4 h-4" /> Upload Photos
            </button>
          </div>
        </motion.section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <action.icon className="w-5 h-5" style={{ color: action.color }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{action.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{action.desc}</p>
                </div>
                <div className="flex items-center gap-1 mt-auto">
                  <span className="text-xs font-semibold" style={{ color: action.color }}>
                    Open
                  </span>
                  <ChevronRight className="w-3 h-3" style={{ color: action.color }} />
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Recent Activity
            </h2>
            <button
              onClick={() => navigate("/my-home/documents")}
              className="text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
              style={{ color: TEAL }}
            >
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.07 }}
                className="bg-white rounded-2xl px-5 py-4 border flex items-center gap-4"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: item.iconBg }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.subtitle}</p>
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ color: item.tagColor, backgroundColor: item.tagBg }}
                >
                  {item.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Find a Pro */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="rounded-2xl p-6 border flex flex-col md:flex-row items-start md:items-center gap-5"
          style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0c2444 100%)`, borderColor: `${NAVY}40` }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "rgba(8,145,178,0.25)" }}
          >
            <Users className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">Find a Pro</p>
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
              Browse Pros <ArrowRight className="w-4 h-4" />
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Recently Active Pros
            </h2>
            <button
              onClick={() => navigate("/trustypro/pros")}
              className="text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
              style={{ color: TEAL }}
            >
              Browse All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {RECENTLY_ACTIVE_PROS.map((pro, i) => (
              <motion.div
                key={pro.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className="bg-white rounded-2xl p-5 border flex flex-col gap-3"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${pro.color}, ${pro.color}99)` }}
                  >
                    {pro.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{pro.name}</p>
                    <p className="text-xs text-gray-500">{pro.trade}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-gray-700">{pro.rating}</span>
                    <span className="text-xs text-gray-400">({pro.reviews})</span>
                  </div>
                  {pro.verified && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: TEAL_LIGHT }}>
                      <CheckCircle className="w-3 h-3" style={{ color: TEAL }} />
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
          className="rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-5"
          style={{ backgroundColor: TEAL_LIGHT, border: `1.5px solid ${TEAL}30` }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: TEAL }}
          >
            <Award className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4" style={{ color: TEAL }} />
              <span className="text-sm font-black text-gray-900">TrustyPro Certified Network</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every pro in your matches has passed our 7-point verification: license check, background screen, insurance confirmation, reference review, and more. You never see an unverified name.
            </p>
          </div>
          <button
            onClick={() => navigate("/trustypro/pros")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity flex-shrink-0"
            style={{ backgroundColor: TEAL }}
          >
            Browse Pros <ArrowRight className="w-4 h-4" />
          </button>
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
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: TEAL_LIGHT }}
          >
            <Home className="w-7 h-7" style={{ color: TEAL }} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Home Health Vault</p>
            <h3 className="text-base font-black text-gray-900">Your Home's Living Record</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Every repair, upgrade, and inspection — permanently logged. See your full health score and upcoming maintenance recommendations.
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </motion.section>

      </div>
    </div>
  );
}
