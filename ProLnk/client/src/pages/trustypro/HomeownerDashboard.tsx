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
} from "lucide-react";
import { motion } from "framer-motion";

const TEAL = "#00B5B8";
const TEAL_LIGHT = "#E0F7F7";
const BG = "#F7FFFE";

const PLACEHOLDER_USER = { name: "Sarah" };

const QUICK_ACTIONS = [
  {
    icon: Camera,
    label: "Scan My Home",
    desc: "AI photo analysis to spot maintenance needs",
    href: "/trustypro/scan",
    color: TEAL,
    bg: TEAL_LIGHT,
  },
  {
    icon: Heart,
    label: "My Home Health Score",
    desc: "View your property's full health breakdown",
    href: "/trustypro/home-health",
    color: "#10B981",
    bg: "#D1FAE5",
  },
  {
    icon: Users,
    label: "Find a Pro",
    desc: "Browse verified, background-checked professionals",
    href: "/trustypro/pros",
    color: "#6366F1",
    bg: "#EEF2FF",
  },
  {
    icon: FileText,
    label: "My Documents",
    desc: "Invoices, warranties, and project records",
    href: "/my-home/documents",
    color: "#F59E0B",
    bg: "#FEF3C7",
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
