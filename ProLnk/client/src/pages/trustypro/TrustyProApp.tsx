import { useLocation } from "wouter";
import {
  Smartphone,
  Search,
  Award,
  Star,
  ChevronRight,
  Shield,
  ArrowRight,
  Zap,
  CheckCircle,
  LayoutDashboard,
  ImageIcon,
  MessageSquare,
  UserCircle,
  HelpCircle,
  ScanLine,
  BadgeCheck,
  Users,
} from "lucide-react";

const PURPLE = "#8B5CF6";
const PURPLE_DARK = "#7C3AED";
const GREEN = "#10B981";
const BG = "#0A0F1E";
const CARD_BG = "#111827";
const BORDER = "#1F2937";

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: ScanLine,
    color: PURPLE,
    title: "Scan homes with AI",
    description:
      "Use the TrustyPro camera tool to document your work site before and after. Our AI identifies 50+ issue types across every major home system in seconds.",
  },
  {
    step: "02",
    icon: BadgeCheck,
    color: GREEN,
    title: "Get TrustyPro certified",
    description:
      "Pass our 7-point verification: license check, background screen, insurance confirmation, reference review, and on-site quality assessment. Build your Trust Score.",
  },
  {
    step: "03",
    icon: Users,
    color: "#06B6D4",
    title: "Connect with homeowners",
    description:
      "Receive AI-matched leads based on your trade, service area, and availability. Homeowners are pre-qualified and ready to book — no cold calls, no bidding wars.",
  },
];

const NAV_CARDS = [
  {
    icon: Search,
    label: "Lead Search",
    description: "Browse and accept matched homeowner leads",
    path: "/trustypro/leads",
    color: PURPLE,
    badge: "7 new",
  },
  {
    icon: ImageIcon,
    label: "My Projects",
    description: "Build your portfolio with before & after photos",
    path: "/trustypro/gallery",
    color: GREEN,
    badge: null,
  },
  {
    icon: Award,
    label: "Trust Score",
    description: "Track your verified score and ranking",
    path: "/trustypro/partner-dashboard",
    color: "#F59E0B",
    badge: "84",
  },
  {
    icon: Star,
    label: "Reviews",
    description: "Manage homeowner reviews and ratings",
    path: "/trustypro/reviews",
    color: "#F59E0B",
    badge: null,
  },
  {
    icon: UserCircle,
    label: "Profile",
    description: "Update your trade info, service area, and credentials",
    path: "/trustypro/profile",
    color: "#06B6D4",
    badge: null,
  },
];

const TRUST_FACTORS = [
  { label: "License verified", done: true },
  { label: "Background check", done: true },
  { label: "Insurance confirmed", done: true },
  { label: "3+ project photos", done: false },
  { label: "5+ homeowner reviews", done: false },
];

export default function TrustyProApp() {
  const [, navigate] = useLocation();

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: BG, fontFamily: "'Inter', sans-serif" }}
    >
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 65%)",
          zIndex: 0,
        }}
      />

      <nav
        className="relative z-30 sticky top-0 border-b backdrop-blur-sm"
        style={{ backgroundColor: "rgba(10,15,30,0.95)", borderColor: BORDER }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DARK})` }}
            >
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-black text-white leading-tight tracking-tight">
                TrustyPro™
              </p>
              <p className="text-xs text-gray-500 leading-none">Service Professional</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/trustypro/partner-dashboard")}
              className="hidden sm:flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </button>
            <button
              onClick={() => navigate("/trustypro/partner-dashboard")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: PURPLE }}
            >
              My Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6"
            style={{
              backgroundColor: `${PURPLE}20`,
              color: PURPLE,
              border: `1px solid ${PURPLE}30`,
            }}
          >
            <Zap className="w-3.5 h-3.5" />
            TrustyPro Service Professional Network
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5 tracking-tight">
            Your entire service business,
            <br />
            <span style={{ color: PURPLE }}>powered by AI leads.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Get matched with pre-qualified homeowners, build your portfolio, grow your Trust Score,
            and manage your entire book of business in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/trustypro/partner-dashboard")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: PURPLE }}
            >
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/trustypro/leads")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-colors border"
              style={{ color: "#D1D5DB", borderColor: BORDER, backgroundColor: CARD_BG }}
            >
              <Search className="w-4 h-4" /> Browse Leads
            </button>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 pb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NAV_CARDS.map((card) => (
              <button
                key={card.path}
                onClick={() => navigate(card.path)}
                className="text-left rounded-2xl border p-5 transition-all hover:border-purple-500/40 group flex flex-col gap-3"
                style={{ backgroundColor: CARD_BG, borderColor: BORDER }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${card.color}20` }}
                  >
                    <card.icon className="w-5 h-5" style={{ color: card.color }} />
                  </div>
                  {card.badge && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${card.color}20`, color: card.color }}
                    >
                      {card.badge}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-white group-hover:text-purple-300 transition-colors">
                    {card.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-snug">{card.description}</p>
                </div>
                <div className="flex items-center gap-1" style={{ color: card.color }}>
                  <span className="text-xs font-semibold">Open</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}

            <button
              onClick={() => {}}
              className="text-left rounded-2xl border border-dashed p-5 transition-all hover:border-purple-500/40 group flex flex-col items-center justify-center gap-2 min-h-[140px]"
              style={{ borderColor: "#374151", backgroundColor: "transparent" }}
            >
              <Smartphone className="w-8 h-8 text-gray-600" />
              <p className="text-sm font-bold text-gray-500">Download App</p>
              <p className="text-xs text-gray-600 text-center">iOS &amp; Android — Q3 2026</p>
            </button>
          </div>
        </section>

        <section
          className="border-y py-16"
          style={{ borderColor: BORDER, backgroundColor: "#0D1424" }}
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: PURPLE }}>
                How It Works
              </p>
              <h2 className="text-2xl font-black text-white">
                Three steps to your first TrustyPro lead
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 relative">
              <div
                className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px"
                style={{
                  background: `linear-gradient(90deg, ${PURPLE}40, ${GREEN}40)`,
                }}
              />
              {HOW_IT_WORKS.map((step, i) => (
                <div
                  key={step.step}
                  className="rounded-2xl border p-6 flex flex-col gap-4"
                  style={{ backgroundColor: CARD_BG, borderColor: BORDER }}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}20` }}
                    >
                      <step.icon className="w-6 h-6" style={{ color: step.color }} />
                    </div>
                    <span
                      className="text-2xl font-black"
                      style={{ color: `${step.color}40` }}
                    >
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="md:hidden flex items-center justify-center mt-1">
                      <ChevronRight className="w-4 h-4 text-gray-600 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="rounded-2xl border p-6"
              style={{ backgroundColor: CARD_BG, borderColor: BORDER }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: PURPLE }}>
                Your Trust Score Checklist
              </p>
              <div className="space-y-3">
                {TRUST_FACTORS.map((factor) => (
                  <div key={factor.label} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: factor.done ? `${GREEN}20` : "#1F2937",
                        border: `1px solid ${factor.done ? GREEN : "#374151"}`,
                      }}
                    >
                      {factor.done ? (
                        <CheckCircle className="w-3 h-3" style={{ color: GREEN }} />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-600" />
                      )}
                    </div>
                    <span
                      className="text-sm"
                      style={{ color: factor.done ? "#D1D5DB" : "#6B7280" }}
                    >
                      {factor.label}
                    </span>
                    {factor.done ? (
                      <span
                        className="ml-auto text-xs font-semibold"
                        style={{ color: GREEN }}
                      >
                        Complete
                      </span>
                    ) : (
                      <span className="ml-auto text-xs font-semibold text-gray-600">
                        Pending
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/trustypro/partner-dashboard")}
                className="mt-5 w-full py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                style={{ backgroundColor: PURPLE }}
              >
                View Full Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div
              className="rounded-2xl border p-6 flex flex-col justify-between"
              style={{
                background: `linear-gradient(135deg, ${PURPLE}15 0%, #0D1424 60%)`,
                borderColor: `${PURPLE}30`,
              }}
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PURPLE }}>
                  Network Stats
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Verified TrustyPros", value: "312", icon: Shield, color: GREEN },
                    { label: "Homeowners matched", value: "4,800+", icon: Users, color: "#06B6D4" },
                    { label: "Avg Trust Score", value: "78/100", icon: Award, color: "#F59E0B" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${s.color}20` }}
                      >
                        <s.icon className="w-4 h-4" style={{ color: s.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-black text-white">{s.value}</p>
                        <p className="text-xs text-gray-500">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="mt-6 pt-5 border-t flex items-center justify-between"
                style={{ borderColor: BORDER }}
              >
                <p className="text-xs text-gray-400">Need help?</p>
                <button
                  onClick={() => navigate("/help")}
                  className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-80"
                  style={{ color: PURPLE }}
                >
                  <HelpCircle className="w-3.5 h-3.5" /> Contact Support
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer
          className="border-t py-8"
          style={{ borderColor: BORDER, backgroundColor: "#0D1424" }}
        >
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DARK})` }}
              >
                <Shield className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-white leading-none">TrustyPro™</p>
                <p className="text-xs text-gray-600">Service Professional Network</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/trustypro")}
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                Homeowner Portal
              </button>
              <button
                onClick={() => navigate("/help")}
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                Need help?
              </button>
              <p className="text-xs text-gray-700">© 2026 TrustyPro</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
