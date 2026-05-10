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
  Lock,
} from "lucide-react";

const TEAL = "#00B5B8";
const TEAL_LIGHT = "#E0F7F7";
const BG = "#F7FFFE";

// --- Placeholder data -----------------------------------------------------------

const HEALTH_SCORE = 74;

const SCORE_BREAKDOWN = [
  { label: "Roof & Structure", score: 88, icon: Home, color: "#10B981" },
  { label: "HVAC & Air Quality", score: 62, icon: Wind, color: "#F59E0B" },
  { label: "Plumbing", score: 79, icon: Droplets, color: "#3B82F6" },
  { label: "Exterior & Landscaping", score: 55, icon: Leaf, color: "#EF4444" },
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

// --- Sub-components -------------------------------------------------------------

function ScoreRing({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#10B981" : score >= 60 ? TEAL : "#F59E0B";

  return (
    <div className="relative flex items-center justify-center w-36 h-36">
      <svg className="absolute inset-0" viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="text-center z-10">
        <p className="text-4xl font-black" style={{ color }}>{score}</p>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">/ 100</p>
      </div>
    </div>
  );
}

function UrgencyDot({ urgency }: { urgency: string }) {
  const map: Record<string, string> = {
    high: "bg-red-500",
    medium: "bg-amber-400",
    low: "bg-green-400",
  };
  return <span className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${map[urgency] ?? "bg-gray-300"}`} />;
}

// --- Main Component -------------------------------------------------------------

export default function HomeHealthDashboard() {
  const [shareHovered, setShareHovered] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-teal-50 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/trustypro">
            <TrustyProLogo className="h-7" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/trustypro/scan">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                <Camera className="w-3.5 h-3.5" />
                Scan Home
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: TEAL }}>Home Health Dashboard</p>
          <h1 className="text-2xl font-black text-gray-900">Your Home at a Glance</h1>
          <p className="text-sm text-gray-500 mt-1">Updated today · 123 Maple St, Frisco TX 75035</p>
        </div>

        {/* Health Score Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-teal-50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4" style={{ color: TEAL }} />
            <p className="font-bold text-gray-900">Home Health Score</p>
            <span className="ml-auto text-xs font-semibold text-gray-400">BETA</span>
          </div>

          <div className="flex items-center gap-6">
            <ScoreRing score={HEALTH_SCORE} />
            <div className="flex-1 space-y-3">
              {SCORE_BREAKDOWN.map(({ label, score, icon: Icon, color }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" style={{ color }} />
                      <span className="text-xs font-medium text-gray-600">{label}</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color }}>{score}</span>
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

          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <p className="text-xs text-gray-500">
              Score improved <strong className="text-green-600">+6 pts</strong> since your last scan. Scan again to update.
            </p>
          </div>
        </div>

        {/* Documentation Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-teal-50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4" style={{ color: TEAL }} />
              <p className="font-bold text-gray-900">Documentation Status</p>
            </div>
            <Link href="/trustypro/scan">
              <span className="text-xs font-semibold hover:underline" style={{ color: TEAL }}>Add Photos</span>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 rounded-xl" style={{ backgroundColor: TEAL_LIGHT }}>
              <p className="text-2xl font-black" style={{ color: TEAL }}>14</p>
              <p className="text-xs text-gray-500 mt-0.5">Photos</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-indigo-50">
              <p className="text-2xl font-black text-indigo-600">5</p>
              <p className="text-xs text-gray-500 mt-0.5">Rooms</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-amber-50">
              <p className="text-2xl font-black text-amber-600">2</p>
              <p className="text-xs text-gray-500 mt-0.5">Systems</p>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { label: "Exterior Front", done: true },
              { label: "Kitchen", done: true },
              { label: "Living Room", done: true },
              { label: "Master Bedroom", done: false },
              { label: "Garage / Utility", done: false },
            ].map(({ label, done }) => (
              <div key={label} className="flex items-center gap-2.5">
                {done
                  ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  : <AlertCircle className="w-4 h-4 text-gray-300 shrink-0" />}
                <span className={`text-sm ${done ? "text-gray-700" : "text-gray-400"}`}>{label}</span>
                {!done && <span className="ml-auto text-xs text-gray-400">Not documented</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Maintenance */}
        <div className="bg-white rounded-2xl shadow-sm border border-teal-50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4" style={{ color: TEAL }} />
            <p className="font-bold text-gray-900">Upcoming Maintenance</p>
            <span className="ml-auto text-xs font-semibold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: "#EF4444" }}>
              1 urgent
            </span>
          </div>

          <div className="space-y-3">
            {MAINTENANCE_ITEMS.map(({ title, due, desc, urgency, icon: Icon }) => (
              <div key={title} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <UrgencyDot urgency={urgency} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-semibold text-gray-900">{title}</p>
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400 whitespace-nowrap">{due}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
                <Icon className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </div>

        {/* AI Scan CTA */}
        <div
          className="rounded-2xl p-6 text-white overflow-hidden relative"
          style={{ background: `linear-gradient(135deg, ${TEAL} 0%, #0891b2 100%)` }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 bg-white -translate-y-8 translate-x-8" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Camera className="w-5 h-5 text-teal-100" />
              <p className="text-sm font-semibold text-teal-100">AI Home Scan</p>
            </div>
            <h2 className="text-xl font-black mb-2">Scan Your Home for Hidden Issues</h2>
            <p className="text-sm text-teal-100 mb-4">
              Our AI analyzes your photos to detect water damage, structural concerns, and deferred maintenance — in seconds.
            </p>
            <Link href="/trustypro/scan">
              <button className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90" style={{ color: TEAL }}>
                <Camera className="w-4 h-4" />
                Start Scan
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Verified Pros Near You */}
        <div className="bg-white rounded-2xl shadow-sm border border-teal-50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: TEAL }} />
              <p className="font-bold text-gray-900">Verified Pros Near You</p>
            </div>
            <Link href="/trustypro/pros">
              <span className="text-xs font-semibold flex items-center gap-1 hover:underline" style={{ color: TEAL }}>
                See All <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          <div className="space-y-3">
            {NEARBY_PROS.map(({ name, trade, rating, reviews, distance, verified, avatar }) => (
              <div key={name} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-teal-100 hover:bg-teal-50/30 transition-colors cursor-pointer">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: TEAL }}
                >
                  {avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
                    {verified && <Shield className="w-3.5 h-3.5 text-green-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-400">{trade} · {distance}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-0.5 justify-end">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-bold text-gray-800">{rating}</span>
                  </div>
                  <p className="text-xs text-gray-400">{reviews} reviews</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/trustypro/waitlist">
            <button
              className="w-full mt-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors hover:text-white"
              style={{ borderColor: TEAL, color: TEAL }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = TEAL)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              Request a Pro for Your Project
            </button>
          </Link>
        </div>

        {/* Insurance Discount Banner */}
        <div
          className="rounded-2xl p-5 border"
          style={{ backgroundColor: "#FFF7ED", borderColor: "#FED7AA" }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-orange-900 mb-1">Share for Insurance Discount</p>
              <p className="text-xs text-orange-700 mb-3">
                Homeowners who share their verified Home Health Score with participating insurers may qualify for up to <strong>12% off their annual premium</strong>. TrustyPro partners with select carriers to make this seamless — your data stays private.
              </p>
              <button
                className="flex items-center gap-1.5 text-xs font-semibold text-orange-700 hover:text-orange-900 transition-colors"
                onMouseEnter={() => setShareHovered(true)}
                onMouseLeave={() => setShareHovered(false)}
              >
                <Share2 className={`w-3.5 h-3.5 transition-transform ${shareHovered ? "scale-110" : ""}`} />
                Learn About the Insurance Partner Program
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer spacer */}
        <div className="h-6" />
      </div>
    </div>
  );
}
