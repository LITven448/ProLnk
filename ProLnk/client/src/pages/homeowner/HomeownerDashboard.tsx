import HomeownerLayout from "@/components/HomeownerLayout";
import FeaturedAdvertiserBanner from "@/components/FeaturedAdvertiserBanner";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Zap, Camera, Star, Shield,
  ArrowRight, Clock, CheckCircle,
  DollarSign, Calendar, Sparkles,
  AlertTriangle, Eye, Radar,
  Home, Trophy, Lock, Phone,
  Heart, Plus, FileText, WrenchIcon,
  ChevronRight, Bell, Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const urgencyConfig: Record<string, { dot: string; label: string; text: string }> = {
  high:   { dot: "#EF4444", label: "Urgent",     text: "#EF4444" },
  medium: { dot: "#F59E0B", label: "Soon",       text: "#D97706" },
  low:    { dot: "#10B981", label: "When Ready", text: "#059669" },
};

const TRADE_MOCKUPS: Record<string, string> = {
  Fencing:  "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/after-front-yard_3b26a6f3.jpg",
  Gutters:  "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/after-front-yard_3b26a6f3.jpg",
  Concrete: "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/after-front-yard_3b26a6f3.jpg",
  Handyman: "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/after-interior_aa7c0963.jpg",
  Painting: "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/after-interior_aa7c0963.jpg",
  default:  "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/after-front-yard_3b26a6f3.jpg",
};

const MOCK_MAINTENANCE = [
  { task: "HVAC Filter Replacement", due: "May 20, 2026", urgency: "high",   icon: WrenchIcon },
  { task: "Gutter Cleaning",         due: "Jun 1, 2026",  urgency: "medium", icon: Home },
  { task: "Pest Control Treatment",  due: "Jun 15, 2026", urgency: "low",    icon: Shield },
];

const MOCK_VISITS = [
  { trade: "Plumbing",  pro: "Mike's Plumbing",   date: "Apr 28, 2026", rating: 5, amount: "$280" },
  { trade: "HVAC",      pro: "CoolAir Solutions",  date: "Mar 15, 2026", rating: 5, amount: "$195" },
  { trade: "Handyman",  pro: "Fix-It Fast",        date: "Feb 2, 2026",  rating: 4, amount: "$120" },
];

const MOCK_FAVORITES = [
  { id: 1, name: "Mike's Plumbing",  trade: "Plumber",     rating: 4.9, jobs: 3, phone: "555-0101", avatar: "M" },
  { id: 2, name: "CoolAir Solutions",trade: "HVAC Tech",   rating: 5.0, jobs: 2, phone: "555-0202", avatar: "C" },
];

function HealthScoreGauge({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;
  const gap = circumference - filled;
  const color = score >= 80 ? "#10B981" : score >= 60 ? "#F59E0B" : "#EF4444";
  const label = score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Attention";

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
          <circle cx="72" cy="72" r={radius} fill="none" stroke="#1e2d45" strokeWidth="12" />
          <circle
            cx="72" cy="72" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${gap}`}
            style={{ transition: "stroke-dasharray 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-white leading-none">{score}</span>
          <span className="text-xs text-slate-400 mt-0.5">/ 100</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-semibold" style={{ color }}>{label}</span>
    </div>
  );
}

export default function HomeownerDashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { data: profile, isLoading: profileLoading } = trpc.homeowner.getProfile.useQuery();
  const { data: properties = [], isLoading: propsLoading } = trpc.homeowner.getMyProperties.useQuery();
  const { data: stats } = trpc.homeowner.getMyStats.useQuery();
  const { data: deals = [] } = trpc.homeowner.getMyDeals.useQuery();
  const { data: allPhotos = [] } = trpc.homeowner.getPropertyPhotos.useQuery(
    { propertyId: (properties as any[])[0]?.id ?? 0 },
    { enabled: !!(properties as any[])[0]?.id }
  );
  const isLoading = profileLoading || propsLoading;

  const displayName = user?.name ?? "Homeowner";
  const primaryProperty = (properties as any[])[0];
  const displayAddress = primaryProperty?.address ?? profile?.city ?? "";
  const setupComplete = profile?.setupComplete;

  const profileCompletionPct = (() => {
    let pts = 0;
    if (profile) pts += 15;
    if (primaryProperty?.address) pts += 15;
    if (primaryProperty?.propertyType) pts += 10;
    if (primaryProperty?.yearBuilt) pts += 10;
    if (primaryProperty?.sqft) pts += 10;
    if (primaryProperty?.bedrooms) pts += 5;
    if (primaryProperty?.bathrooms) pts += 5;
    if (primaryProperty?.systems && JSON.parse(primaryProperty.systems || '[]').length > 0) pts += 10;
    if (profile?.consentTerms) pts += 10;
    if (setupComplete) pts += 10;
    return Math.min(pts, 100);
  })();

  const displayOffers = deals.slice(0, 3).map(d => ({
    id: d.id,
    type: d.serviceType,
    trade: d.serviceType,
    urgency: d.urgencyLevel === 1 ? 'high' : d.urgencyLevel === 3 ? 'low' : 'medium',
    description: d.description ?? '',
    proName: d.proName ?? 'Verified Pro',
    proRating: 4.8,
    estimateRange: d.estimateRange ?? 'Free estimate',
    status: d.status,
    photoUrl: null,
    expiresIn: d.expiresAt ? (() => {
      const ms = new Date(d.expiresAt!).getTime() - Date.now();
      const hrs = Math.floor(ms / 3600000);
      return hrs > 24 ? `${Math.floor(hrs/24)} days` : `${hrs} hours`;
    })() : null,
  }));

  const healthScore = (stats as any)?.healthScore ?? null;
  const activeOffersCount = stats?.pendingOffers ?? 0;
  const completedJobsCount = stats?.completedJobs ?? 0;

  if (isLoading) {
    return (
      <HomeownerLayout homeownerName="" homeownerAddress="">
        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
          <div className="h-7 w-56 bg-[#1a2d47] rounded-lg animate-pulse" />
          <div className="h-44 bg-[#1a2d47] rounded-2xl animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1,2,3,4].map(i => <div key={i} className="h-20 bg-[#1a2d47] rounded-2xl animate-pulse" />)}
          </div>
        </div>
      </HomeownerLayout>
    );
  }

  return (
    <HomeownerLayout homeownerName={displayName} homeownerAddress={displayAddress}>
      <div className="min-h-screen bg-[#0A1628]">
        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-24">

          {/* ── Welcome Header ───────────────────────────────────── */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Hey, {displayName.split(" ")[0]} 👋
              </h1>
              {displayAddress && <p className="text-slate-400 mt-0.5 text-sm">{displayAddress}</p>}
            </div>
            <button onClick={() => navigate("/my-home/notifications")} className="w-10 h-10 rounded-full bg-[#1a2d47] flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-400 rounded-full" />
            </button>
          </div>

          {/* ── Home Health Score ─────────────────────────────────── */}
          <div className="bg-gradient-to-br from-[#0f2440] to-[#162d4a] rounded-2xl border border-[#1e3a5f] p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {healthScore !== null ? (
                <HealthScoreGauge score={healthScore} />
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-36 h-36 rounded-full bg-[#1a2d47] border-4 border-dashed border-[#1e3a5f] flex flex-col items-center justify-center">
                    <Radar className="w-10 h-10 text-slate-600 mb-1" />
                    <span className="text-xs text-slate-500">No score yet</span>
                  </div>
                </div>
              )}
              <div className="flex-1 text-center md:text-left">
                <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-1">Home Health Score</p>
                <h2 className="text-xl font-bold text-white mb-2">
                  {healthScore !== null ? "Your home is in great shape" : "Set up your Home Health Score"}
                </h2>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  {healthScore !== null
                    ? "Based on your home systems, completed work, and maintenance history."
                    : "Add your home systems and maintenance history to get a personalized health score."}
                </p>
                <button
                  onClick={() => navigate(healthScore !== null ? "/my-home/health" : "/my-home/vault")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm transition-colors"
                >
                  {healthScore !== null ? "View Full Report" : "Build Health Profile"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Quick Actions ─────────────────────────────────────── */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Request Pro",      icon: Plus,       color: "teal",   path: "/my-home/request-pro" },
              { label: "Health Report",    icon: FileText,   color: "purple", path: "/my-home/health" },
              { label: "Add Record",       icon: Sparkles,   color: "blue",   path: "/my-home/vault" },
              { label: "Documents",        icon: Shield,     color: "amber",  path: "/my-home/documents" },
            ].map(a => {
              const colors: Record<string, { bg: string; icon: string; text: string }> = {
                teal:   { bg: "bg-teal-500/10",  icon: "text-teal-400",  text: "text-teal-300" },
                purple: { bg: "bg-purple-500/10",icon: "text-purple-400",text: "text-purple-300" },
                blue:   { bg: "bg-blue-500/10",  icon: "text-blue-400",  text: "text-blue-300" },
                amber:  { bg: "bg-amber-500/10", icon: "text-amber-400", text: "text-amber-300" },
              };
              const c = colors[a.color];
              return (
                <button key={a.label} onClick={() => navigate(a.path)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl ${c.bg} hover:opacity-80 transition-opacity`}>
                  <div className="w-10 h-10 rounded-xl bg-[#0A1628]/60 flex items-center justify-center">
                    <a.icon className={`w-5 h-5 ${c.icon}`} />
                  </div>
                  <span className={`text-[11px] font-semibold text-center leading-tight ${c.text}`}>{a.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── Stats Row ─────────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Active Requests", value: String(activeOffersCount),  icon: Zap,         color: "#06b6d4" },
              { label: "Jobs Completed",  value: String(completedJobsCount), icon: CheckCircle, color: "#10B981" },
              { label: "Money Saved",     value: (stats as any)?.moneySaved ? `$${Number((stats as any).moneySaved).toLocaleString()}` : "$0", icon: DollarSign, color: "#a78bfa" },
              { label: "Trusted Pros",    value: String((stats as any)?.trustedPros ?? 0), icon: Shield, color: "#fbbf24" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#0f1e35] rounded-2xl p-4 border border-[#1e2d45]">
                <stat.icon className="w-4 h-4 mb-3" style={{ color: stat.color }} />
                <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* ── Active Service Requests ───────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-white">Active Service Requests</h2>
              <Link href="/my-home/offers">
                <span className="text-xs font-semibold text-teal-400 cursor-pointer flex items-center gap-1 hover:text-teal-300">
                  View all <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>

            {displayOffers.length === 0 ? (
              <div className="bg-[#0f1e35] rounded-2xl border border-[#1e2d45] p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center mx-auto mb-4">
                  <WrenchIcon className="w-7 h-7 text-teal-400" />
                </div>
                <p className="text-sm font-semibold text-white mb-1">No active requests</p>
                <p className="text-xs text-slate-500 mb-4">Need work done around the house? Connect with verified pros in minutes.</p>
                <button onClick={() => navigate("/my-home/request-pro")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm transition-colors">
                  Request a Pro <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {displayOffers.map((offer) => {
                  const urg = urgencyConfig[offer.urgency] || urgencyConfig.medium;
                  const mockupUrl = TRADE_MOCKUPS[offer.trade] || TRADE_MOCKUPS.default;
                  return (
                    <div key={offer.id} className="bg-[#0f1e35] rounded-2xl border border-[#1e2d45] overflow-hidden hover:border-teal-500/30 transition-all">
                      <div className="relative h-32 overflow-hidden">
                        <img src={offer.photoUrl ?? mockupUrl} alt={offer.type} className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,30,53,0.9) 0%, transparent 55%)" }} />
                        {offer.expiresIn && (
                          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            <Clock className="w-2.5 h-2.5" /> {offer.expiresIn}
                          </div>
                        )}
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: urg.dot }} />
                          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: urg.text }}>{urg.label}</span>
                          <span className="text-xs text-slate-500">— {offer.type}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{offer.description}</p>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#1a2d47] flex items-center justify-center text-xs font-bold text-white">{offer.proName[0]}</div>
                            <div>
                              <div className="text-xs font-semibold text-white">{offer.proName}</div>
                              <div className="flex items-center gap-1 text-xs text-slate-500">
                                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                                {offer.proRating} &middot; <span className="text-teal-400 font-medium">Verified</span>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-white">{offer.estimateRange}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1 text-white font-semibold text-xs rounded-xl h-9 bg-teal-500 hover:bg-teal-400" onClick={() => navigate("/my-home/offers")}>
                            <Calendar className="w-3 h-3 mr-1.5" /> Schedule
                          </Button>
                          <Button variant="outline" className="text-xs text-slate-400 border-[#1e2d45] rounded-xl h-9 px-3 hover:bg-[#1a2d47]" onClick={() => navigate("/my-home/offers")}>Pass</Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Upcoming Maintenance ─────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                Upcoming Maintenance
              </h2>
              <Link href="/my-home/maintenance">
                <span className="text-xs font-semibold text-teal-400 cursor-pointer flex items-center gap-1 hover:text-teal-300">
                  Full schedule <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
            <div className="bg-[#0f1e35] rounded-2xl border border-[#1e2d45] overflow-hidden">
              {MOCK_MAINTENANCE.map((item, i) => {
                const urg = urgencyConfig[item.urgency];
                return (
                  <div key={item.task} className={`flex items-center gap-4 px-4 py-3.5 ${i < MOCK_MAINTENANCE.length - 1 ? "border-b border-[#1e2d45]" : ""}`}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${urg.dot}20` }}>
                      <item.icon className="w-4 h-4" style={{ color: urg.dot }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white truncate">{item.task}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-500">{item.due}</span>
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: urg.dot }} />
                        <span className="text-xs font-medium" style={{ color: urg.text }}>{urg.label}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Recent Pro Visits Timeline ────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-400" />
                Recent Pro Visits
              </h2>
              <Link href="/my-home/timeline">
                <span className="text-xs font-semibold text-teal-400 cursor-pointer flex items-center gap-1 hover:text-teal-300">
                  View all <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-[#1e2d45]" />
              <div className="space-y-0">
                {MOCK_VISITS.map((visit, i) => (
                  <div key={i} className="relative flex items-start gap-4 pl-4 pb-4">
                    <div className="w-7 h-7 rounded-full bg-teal-500/20 border-2 border-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5 z-10">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-400" />
                    </div>
                    <div className="flex-1 bg-[#0f1e35] rounded-xl border border-[#1e2d45] p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-white">{visit.trade}</span>
                        <span className="text-sm font-bold text-teal-400">{visit.amount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">{visit.pro} · {visit.date}</span>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: visit.rating }).map((_, j) => (
                            <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Favorite Pros ─────────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                Favorite Pros
              </h2>
              <Link href="/my-home/favorites">
                <span className="text-xs font-semibold text-teal-400 cursor-pointer flex items-center gap-1 hover:text-teal-300">
                  Manage <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MOCK_FAVORITES.map(pro => (
                <div key={pro.id} className="bg-[#0f1e35] rounded-2xl border border-[#1e2d45] p-4 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {pro.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{pro.name}</div>
                    <div className="text-xs text-slate-500">{pro.trade} · {pro.jobs} jobs</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-slate-400">{pro.rating}</span>
                    </div>
                  </div>
                  <a href={`tel:${pro.phone}`} className="w-9 h-9 rounded-xl bg-teal-500/10 flex items-center justify-center hover:bg-teal-500/20 transition-colors">
                    <Phone className="w-4 h-4 text-teal-400" />
                  </a>
                </div>
              ))}
              <button onClick={() => navigate("/my-home/pros")}
                className="bg-[#0f1e35] rounded-2xl border border-dashed border-[#1e2d45] p-4 flex items-center justify-center gap-2 text-slate-500 hover:border-teal-500/30 hover:text-teal-400 transition-all sm:col-span-2">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Find more pros</span>
              </button>
            </div>
          </div>

          {/* ── Property Health Score Detail (when set) ───────────── */}
          {!(stats as any)?.healthScore && (
            <div className="bg-[#0f1e35] rounded-2xl border border-[#1e2d45] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Radar className="w-4 h-4 text-purple-400" />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Property Health Alerts</p>
              </div>
              <div className="py-4 text-center">
                <Radar className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                <p className="text-sm font-semibold text-white">No alerts yet</p>
                <p className="text-xs text-slate-500 mt-1 mb-4">Add your home systems to unlock AI-powered maintenance alerts</p>
                <button onClick={() => navigate("/my-home/vault")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 text-sm font-semibold transition-colors">
                  Open Health Vault <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ── Room Gallery ─────────────────────────────────────── */}
          {primaryProperty && (() => {
            const ROOMS = [
              { key: 'living_room', label: 'Living Room' },
              { key: 'kitchen', label: 'Kitchen' },
              { key: 'primary_bedroom', label: 'Primary Bed' },
              { key: 'bathroom', label: 'Bathroom' },
              { key: 'exterior_front', label: 'Front Yard' },
              { key: 'exterior_back', label: 'Back Yard' },
              { key: 'garage', label: 'Garage' },
              { key: 'dining_room', label: 'Dining Room' },
            ];
            const coveredKeys = new Set((allPhotos as any[]).map((p: any) => p.roomLabel));
            const covered = ROOMS.filter(r => coveredKeys.has(r.key)).length;
            const pct = Math.round((covered / ROOMS.length) * 100);
            const unlocked = pct === 100;
            return (
              <div className="bg-[#0f1e35] rounded-2xl border border-[#1e2d45] overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-blue-400" />
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Home Gallery</p>
                    </div>
                    {unlocked ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        <Trophy className="w-3 h-3" /> Gallery Complete!
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-[#1a2d47] px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3" /> {covered}/{ROOMS.length} rooms
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 bg-[#1a2d47] rounded-full h-2 overflow-hidden">
                      <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: unlocked ? '#fbbf24' : '#06b6d4' }} />
                    </div>
                    <span className="text-xs font-bold text-slate-400">{pct}%</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {ROOMS.map(room => {
                      const done = coveredKeys.has(room.key);
                      const photo = (allPhotos as any[]).find((p: any) => p.roomLabel === room.key);
                      return (
                        <button key={room.key} onClick={() => navigate('/my-home/photos')}
                          className={`relative rounded-xl overflow-hidden aspect-square flex flex-col items-center justify-center border-2 transition-all ${
                            done ? 'border-teal-500/40' : 'border-dashed border-[#1e2d45] bg-[#0A1628] hover:border-teal-500/30'
                          }`}>
                          {done && photo?.url ? (
                            <img src={photo.url} alt={room.label} className="w-full h-full object-cover" />
                          ) : (
                            <Camera className={`w-5 h-5 ${done ? 'text-teal-400' : 'text-slate-700'}`} />
                          )}
                          <span className={`absolute bottom-0 left-0 right-0 text-[9px] font-semibold text-center py-0.5 ${
                            done ? 'bg-teal-600/80 text-white' : 'bg-[#0f1e35]/90 text-slate-600'
                          }`}>{room.label}</span>
                          {done && (
                            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center">
                              <CheckCircle className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {!unlocked && (
                    <p className="text-xs text-slate-600 mt-3 text-center">
                      Add all 8 rooms to earn your <span className="font-semibold text-teal-400">Home Gallery Badge</span>
                    </p>
                  )}
                </div>
              </div>
            );
          })()}

          {/* ── Profile Setup Banner ─────────────────────────────── */}
          {!setupComplete && (
            <div className="rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-bold text-white">Complete Your Home Profile</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">
                      Unlock AI-powered maintenance alerts, personalized pro matching, and before/after mockups.
                    </p>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Profile strength</span>
                        <span className="font-semibold text-purple-400">{profileCompletionPct}% complete</span>
                      </div>
                      <div className="w-full bg-[#1a2d47] rounded-full h-2">
                        <div className="h-2 rounded-full bg-purple-500 transition-all duration-500" style={{ width: `${profileCompletionPct}%` }} />
                      </div>
                    </div>
                    <button onClick={() => navigate(profileCompletionPct === 0 ? "/my-home/quick-start" : "/my-home/wizard")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors">
                      {profileCompletionPct === 0 ? "Quick Start (3 min)" : "Continue Setup"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="hidden sm:flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                      <Home className="w-8 h-8 text-purple-400" />
                    </div>
                    <span className="text-xs text-purple-400 font-semibold">{profileCompletionPct}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <FeaturedAdvertiserBanner
            placement="dashboard"
            zipCode={(primaryProperty as any)?.zip ?? undefined}
          />

        </div>

        {/* ── Mobile Bottom Navigation ──────────────────────────── */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#0A1628]/95 backdrop-blur-lg border-t border-[#1e2d45] flex md:hidden z-50">
          {[
            { icon: Home,         label: "Home",      path: "/my-home/dashboard" },
            { icon: WrenchIcon,   label: "Requests",  path: "/my-home/offers" },
            { icon: Calendar,     label: "Scheduled", path: "/my-home/maintenance" },
            { icon: Shield,       label: "Vault",     path: "/my-home/vault" },
            { icon: Eye,          label: "Profile",   path: "/my-home/profile" },
          ].map(item => (
            <button key={item.label} onClick={() => navigate(item.path)}
              className="flex-1 flex flex-col items-center gap-1 py-3 text-slate-500 hover:text-teal-400 transition-colors active:scale-95">
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </HomeownerLayout>
  );
}
