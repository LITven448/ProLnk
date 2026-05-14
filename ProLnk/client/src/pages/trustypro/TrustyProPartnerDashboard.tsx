import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  LayoutDashboard,
  Briefcase,
  ImageIcon,
  Star,
  Settings,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Users,
  ChevronRight,
  Shield,
  MessageSquare,
  UserCircle,
  Bell,
  ArrowUpRight,
  Zap,
} from "lucide-react";

const PURPLE = "#8B5CF6";
const PURPLE_DARK = "#7C3AED";
const GREEN = "#10B981";
const BG = "#0A0F1E";
const SIDEBAR_BG = "#0D1424";
const CARD_BG = "#111827";
const BORDER = "#1F2937";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/trustypro/partner-dashboard", active: true },
  { icon: Briefcase, label: "Leads", path: "/trustypro/leads" },
  { icon: ImageIcon, label: "Projects", path: "/trustypro/gallery" },
  { icon: Star, label: "Reviews", path: "/trustypro/reviews" },
  { icon: Settings, label: "Settings", path: "/trustypro/settings" },
];

const MOCK_REVIEWS = [
  {
    id: 1,
    author: "James M.",
    rating: 5,
    text: "Absolute pro — showed up on time, explained everything, and the work is flawless. Will 100% hire again.",
    date: "May 10, 2026",
    job: "HVAC Installation",
  },
  {
    id: 2,
    author: "Sandra K.",
    rating: 5,
    text: "Diagnosed our plumbing issue in 20 minutes when two other plumbers couldn't figure it out. Saved us thousands.",
    date: "Apr 28, 2026",
    job: "Plumbing Repair",
  },
  {
    id: 3,
    author: "Tom R.",
    rating: 4,
    text: "Great work on the panel upgrade. Took a bit longer than expected but quality is excellent. Highly recommend.",
    date: "Apr 14, 2026",
    job: "Electrical Panel",
  },
];

function TrustScoreGauge({ score }: { score: number }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const color =
    score >= 80 ? GREEN : score >= 60 ? "#F59E0B" : score >= 40 ? "#F97316" : "#EF4444";
  const dashOffset = circumference - (score / 100) * circumference;
  const label =
    score >= 80 ? "Excellent" : score >= 60 ? "Good" : score >= 40 ? "Fair" : "Needs Work";

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg
        className="absolute inset-0"
        viewBox="0 0 140 140"
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.6s ease" }}
        />
      </svg>
      <div className="text-center z-10">
        <p className="text-5xl font-black text-white leading-none">{score}</p>
        <p className="text-xs text-gray-400 mt-0.5">/100</p>
        <p className="text-xs font-bold mt-1.5" style={{ color }}>
          {label}
        </p>
      </div>
    </div>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
        />
      ))}
    </div>
  );
}

export default function TrustyProPartnerDashboard() {
  const [, navigate] = useLocation();
  const [activeNav, setActiveNav] = useState("/trustypro/partner-dashboard");

  const { data: publicCounts } = trpc.waitlist.getPublicCounts.useQuery(undefined, {
    refetchInterval: 60000,
  });

  const activeLeads = publicCounts ? Math.min(publicCounts.partnerCount ?? 0, 12) : 7;
  const trustScore = 84;
  const jobsThisMonth = 11;
  const revenueThisMonth = 18400;

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: BG, fontFamily: "'Inter', sans-serif" }}
    >
      <aside
        className="hidden lg:flex flex-col w-60 border-r flex-shrink-0 sticky top-0 h-screen"
        style={{ backgroundColor: SIDEBAR_BG, borderColor: BORDER }}
      >
        <div className="px-5 py-5 border-b" style={{ borderColor: BORDER }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: PURPLE }}>
            TrustyPro™
          </p>
          <p className="text-sm font-black text-white">Service Pro Portal</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = activeNav === item.path;
            return (
              <button
                key={item.path}
                onClick={() => {
                  setActiveNav(item.path);
                  navigate(item.path);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  backgroundColor: active ? `${PURPLE}20` : "transparent",
                  color: active ? PURPLE : "#6B7280",
                  border: active ? `1px solid ${PURPLE}30` : "1px solid transparent",
                }}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t" style={{ borderColor: BORDER }}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DARK})` }}
            >
              JP
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Jake Patterson</p>
              <p className="text-xs text-gray-500">HVAC / Plumbing</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <nav
          className="sticky top-0 z-30 border-b backdrop-blur-sm"
          style={{ backgroundColor: "rgba(10,15,30,0.95)", borderColor: BORDER }}
        >
          <div className="px-6 h-16 flex items-center justify-between">
            <div className="lg:hidden">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: PURPLE }}>
                TrustyPro™
              </p>
              <p className="text-sm font-black text-white leading-tight">Partner Dashboard</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-black text-white">Dashboard</p>
              <p className="text-xs text-gray-500">Welcome back, Jake</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl text-gray-400 hover:text-white transition-colors" style={{ backgroundColor: "#1F2937" }}>
                <Bell className="w-4 h-4" />
                <span
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                  style={{ backgroundColor: PURPLE }}
                />
              </button>
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_DARK})` }}>
                JP
              </button>
            </div>
          </div>
        </nav>

        <div className="px-6 py-8 space-y-8 max-w-5xl">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
              Overview
            </p>
            <h1 className="text-2xl font-black text-white">Good morning, Jake</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Here's what's happening with your TrustyPro account today.
            </p>
          </div>

          <div
            className="rounded-2xl border p-6"
            style={{ backgroundColor: CARD_BG, borderColor: BORDER }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Trust Score
                </p>
                <TrustScoreGauge score={trustScore} />
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ backgroundColor: `${GREEN}15`, border: `1px solid ${GREEN}30` }}>
                  <ArrowUpRight className="w-3 h-3" style={{ color: GREEN }} />
                  <span className="text-xs font-bold" style={{ color: GREEN }}>
                    +4 pts this month
                  </span>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                {[
                  {
                    icon: Briefcase,
                    label: "Active Leads",
                    value: activeLeads,
                    sub: "awaiting response",
                    color: PURPLE,
                  },
                  {
                    icon: CheckCircle,
                    label: "Jobs This Month",
                    value: jobsThisMonth,
                    sub: "completed",
                    color: GREEN,
                  },
                  {
                    icon: DollarSign,
                    label: "Revenue",
                    value: `$${(revenueThisMonth / 1000).toFixed(1)}k`,
                    sub: "this month",
                    color: "#F59E0B",
                  },
                  {
                    icon: Star,
                    label: "Avg Rating",
                    value: "4.8",
                    sub: "from 34 reviews",
                    color: "#F59E0B",
                  },
                  {
                    icon: TrendingUp,
                    label: "Match Rate",
                    value: "73%",
                    sub: "leads accepted",
                    color: "#06B6D4",
                  },
                  {
                    icon: Shield,
                    label: "TrustyPro Status",
                    value: "Active",
                    sub: "fully verified",
                    color: GREEN,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-3 border"
                    style={{ backgroundColor: "#0D1424", borderColor: BORDER }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${stat.color}15` }}
                      >
                        <stat.icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
                      </div>
                      <p className="text-xs text-gray-500 truncate">{stat.label}</p>
                    </div>
                    <p className="text-xl font-black text-white">{stat.value}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              {
                icon: Briefcase,
                label: "View Leads",
                path: "/trustypro/leads",
                variant: "primary",
              },
              {
                icon: UserCircle,
                label: "Update Profile",
                path: "/trustypro/profile",
                variant: "secondary",
              },
              {
                icon: MessageSquare,
                label: "Request Review",
                path: "/trustypro/reviews",
                variant: "secondary",
              },
              {
                icon: ImageIcon,
                label: "Add Project",
                path: "/trustypro/gallery",
                variant: "secondary",
              },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={
                  action.variant === "primary"
                    ? { backgroundColor: PURPLE, color: "#fff" }
                    : {
                        backgroundColor: "#1F2937",
                        color: "#D1D5DB",
                        border: `1px solid ${BORDER}`,
                      }
                }
              >
                <action.icon className="w-4 h-4" />
                {action.label}
              </button>
            ))}
          </div>

          <div
            className="rounded-2xl border p-6"
            style={{ backgroundColor: CARD_BG, borderColor: BORDER }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-black text-white">Recent Reviews</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Latest homeowner feedback
                </p>
              </div>
              <button
                onClick={() => navigate("/trustypro/reviews")}
                className="flex items-center gap-1 text-xs font-semibold transition-colors hover:opacity-80"
                style={{ color: PURPLE }}
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {MOCK_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl p-4 border"
                  style={{ backgroundColor: "#0D1424", borderColor: BORDER }}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${PURPLE}80, ${PURPLE_DARK}80)`,
                        }}
                      >
                        {review.author[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{review.author}</p>
                        <p className="text-xs text-gray-500">{review.job}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <StarRow rating={review.rating} />
                      <p className="text-xs text-gray-600">{review.date}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl border p-5 flex items-center gap-4"
            style={{
              background: `linear-gradient(135deg, ${PURPLE}15 0%, #0D1424 100%)`,
              borderColor: `${PURPLE}30`,
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${PURPLE}20` }}
            >
              <Zap className="w-6 h-6" style={{ color: PURPLE }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-black text-white">Increase your Trust Score</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                Add 3+ verified projects and request 5 reviews to unlock the next Trust Score tier and
                receive 2x more lead matches.
              </p>
            </div>
            <button
              onClick={() => navigate("/trustypro/gallery")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white flex-shrink-0 transition-opacity hover:opacity-90"
              style={{ backgroundColor: PURPLE }}
            >
              Add Project <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="lg:hidden">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
              Navigation
            </p>
            <div className="grid grid-cols-2 gap-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left border"
                  style={{ backgroundColor: CARD_BG, borderColor: BORDER, color: "#9CA3AF" }}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: PURPLE }} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
