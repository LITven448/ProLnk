import { useState, useRef, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import InsuranceJobCompletionModal from "@/components/InsuranceJobCompletionModal";
import {
  AreaChart, Area, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import PartnerLayout from "@/components/PartnerLayout";
import { MyPriorityScoreCard } from "@/components/PriorityScoreCard";
import PartnerAchievements from "@/components/PartnerAchievements";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DollarSign, Inbox, Send, Clock, CheckCircle,
  XCircle, Camera, Loader2, Zap, ArrowRight,
  TrendingUp, Award, ChevronRight, MapPin, Globe, Sparkles,
  User, Star, BarChart3, ArrowUpRight, Activity,
  Radar, Eye, CloudLightning, Shield, Repeat, Megaphone,
  Share2, MessageSquare
} from "lucide-react";

// ─── Account Standing Badge ──────────────────────────────────────────────────
function AccountStandingBadge({ partner }: { partner: any }) {
  const strikes = partner.strikeCount ?? 0;
  const suspended = !!partner.suspendedAt;
  const coiExpired = partner.coiExpiresAt && new Date(partner.coiExpiresAt) < new Date();

  let label: string;
  let color: string;
  let bg: string;
  let dot: string;
  let desc: string;

  if (suspended) {
    label = "Suspended"; color = "#EF4444"; bg = "#FEF2F2"; dot = "bg-red-500";
    desc = partner.suspensionReason || "Account suspended — contact support";
  } else if (strikes >= 2 || coiExpired) {
    label = "Probation"; color = "#F59E0B"; bg = "#FFFBEB"; dot = "bg-amber-400";
    desc = coiExpired ? "COI expired — upload updated certificate" : `${strikes} strike${strikes > 1 ? "s" : ""} — one more triggers suspension`;
  } else if (strikes === 1) {
    label = "1 Strike"; color = "#F97316"; bg = "#FFF7ED"; dot = "bg-orange-400";
    desc = partner.lastStrikeReason || "Review your account for details";
  } else {
    label = "Good Standing"; color = "#059669"; bg = "#ECFDF5"; dot = "bg-emerald-500";
    desc = "All compliance checks passed";
  }

  return (
    <div className="rounded-2xl border p-4" style={{ backgroundColor: bg, borderColor: `${color}30` }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${dot} ${label !== "Good Standing" ? "animate-pulse" : ""}`} />
          <span className="text-xs font-bold" style={{ color }}>Account Standing</span>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}15`, color }}>
          {label}
        </span>
      </div>
      <p className="text-xs text-gray-500">{desc}</p>
      {label !== "Good Standing" && (
        <a href="/dashboard/profile" className="mt-2 block text-xs font-semibold" style={{ color }}>
          Resolve now →
        </a>
      )}
    </div>
  );
}

// ─── Onboarding Checklist ─────────────────────────────────────────────────────
function OnboardingChecklist({ partner, hasJobs, hasReferrals }: {
  partner: any; hasJobs: boolean; hasReferrals: boolean;
}) {
  const hasDescription = !!partner.description;
  const hasPhoto = !!partner.logoUrl;
  const hasWebsite = !!partner.website;
  const hasLicense = !!partner.licenseNumber || !!partner.licenseVerifiedAt;
  const hasCOI = !!partner.coiUrl || !!partner.coiVerifiedAt;
  const hasReview = (partner.reviewCount ?? 0) >= 1;
  const hasFiveStarReview = (partner.reviewCount ?? 0) >= 1 && Number(partner.rating) >= 4.5;
  const hasThreeReferrals = (partner.referralCount ?? 0) >= 3;
  const hasFiveReferrals = (partner.referralCount ?? 0) >= 5;
  const isSubscribed = partner.subscriptionPlan && partner.subscriptionPlan !== "scout";

  const steps = [
    { done: true,              label: "Application approved",           href: null },
    { done: hasDescription,    label: "Add business description",        href: "/dashboard/profile" },
    { done: hasPhoto,          label: "Upload business photo / logo",    href: "/dashboard/profile" },
    { done: hasWebsite,        label: "Add your website URL",            href: "/dashboard/profile" },
    { done: hasLicense,        label: "Upload license / credentials",    href: "/dashboard/profile" },
    { done: hasCOI,            label: "Upload Certificate of Insurance", href: "/dashboard/profile" },
    { done: hasJobs,           label: "Log your first job",              href: "/job/new" },
    { done: hasReferrals,      label: "Generate your first referral",    href: "/job/new" },
    { done: hasThreeReferrals, label: "Send 3 referrals",                href: "/dashboard/referrals" },
    { done: hasFiveReferrals,  label: "Send 5 referrals",                href: "/dashboard/referrals" },
    { done: hasReview,         label: "Earn your first homeowner review",href: null },
    { done: hasFiveStarReview, label: "Earn a 4.5+ star rating",         href: null },
    { done: isSubscribed,      label: "Upgrade to Pro+ subscription",    href: "/dashboard/upgrade" },
  ];

  const completed = steps.filter(s => s.done).length;
  const pct = Math.round((completed / steps.length) * 100);

  if (pct === 100) {
    return (
      <div className="rounded-2xl border border-emerald-200 p-5 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="text-3xl mb-2">🎊</div>
          <h3 className="font-bold text-emerald-800 text-sm mb-1">Onboarding Complete!</h3>
          <p className="text-xs text-emerald-600">All partner features unlocked. Your profile is fully optimized.</p>
          <p className="text-xs text-emerald-700 font-semibold mt-2">PPS Bonus: +5 pts applied</p>
        </div>
      </div>
    );
  }

  const doneSteps = steps.filter(s => s.done);
  const incompleteSteps = steps.filter(s => !s.done).slice(0, 4);

  return (
    <div className="rounded-2xl border border-teal-100 p-5 overflow-hidden relative"
      style={{ background: "linear-gradient(135deg, #F0FDFD 0%, #E6F9F9 100%)" }}>
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #0A1628, transparent)", transform: "translate(30%, -30%)" }} />
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-[#0A1628]" />
        <h3 className="font-semibold text-gray-800 text-sm">Getting Started</h3>
        <span className="ml-auto text-xs font-bold text-[#0A1628]">{completed}/{steps.length}</span>
      </div>
      <div className="h-2 bg-[#0A1628]/10 rounded-full mb-1 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #00B5B8, #0A1628)" }} />
      </div>
      <p className="text-xs text-gray-400 mb-4">{pct}% complete · {steps.length - completed} step{steps.length - completed !== 1 ? "s" : ""} remaining</p>
      <div className="space-y-1.5">
        {doneSteps.slice(0, 2).map((step, i) => (
          <div key={`done-${i}`} className="flex items-center gap-2.5 py-0.5">
            <CheckCircle className="w-4 h-4 flex-shrink-0 text-[#00B5B8]" />
            <span className="text-xs text-gray-400 line-through">{step.label}</span>
          </div>
        ))}
        {doneSteps.length > 2 && (
          <p className="text-xs text-gray-400 pl-6">+{doneSteps.length - 2} more completed</p>
        )}
        {incompleteSteps.map((step, i) => (
          step.href ? (
            <Link key={`todo-${i}`} href={step.href}>
              <div className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg bg-white/60 hover:bg-white group cursor-pointer transition-colors">
                <div className="w-4 h-4 rounded-full border-2 border-[#00B5B8]/40 flex-shrink-0" />
                <span className="text-xs text-gray-700 group-hover:text-[#0A1628] font-medium">{step.label}</span>
                <ArrowRight className="w-3 h-3 ml-auto text-[#00B5B8]/60 group-hover:text-[#00B5B8]" />
              </div>
            </Link>
          ) : (
            <div key={`todo-${i}`} className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg bg-white/60">
              <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0" />
              <span className="text-xs text-gray-500">{step.label}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

const TIER_CONFIG = {
  scout:      { label: "Scout",      color: "text-slate-600",  bg: "bg-slate-50 border-slate-200",   bar: "#94A3B8", icon: "[SEARCH]", keepRate: 0.40, next: "Pro",     monthlyFee: 0 },
  pro:        { label: "Pro",        color: "text-[#0A1628]",   bg: "bg-[#F5E642]/10 border-[#0A1628]/20",     bar: "#0A1628", icon: "",   keepRate: 0.55, next: "Crew",    monthlyFee: 29 },
  crew:       { label: "Crew",       color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-200", bar: "#6366F1", icon: "",   keepRate: 0.65, next: "Company", monthlyFee: 79 },
  company:    { label: "Company",    color: "text-amber-600",  bg: "bg-amber-50 border-amber-200",   bar: "#F59E0B", icon: "",   keepRate: 0.72, next: "Enterprise", monthlyFee: 149 },
  enterprise: { label: "Enterprise", color: "text-slate-100",  bg: "bg-slate-900 border-slate-700",  bar: "#64748B", icon: "[AWARD]",   keepRate: 0.78, next: null,      monthlyFee: 299 },
};

const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
  pending:   { label: "Pending",   color: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-400" },
  sent:      { label: "New Lead",  color: "bg-blue-100 text-blue-800",     dot: "bg-blue-400" },
  accepted:  { label: "Accepted",  color: "bg-green-100 text-green-800",   dot: "bg-green-400" },
  declined:  { label: "Declined",  color: "bg-red-100 text-red-800",       dot: "bg-red-400" },
  converted: { label: "Closed",    color: "bg-purple-100 text-purple-800", dot: "bg-purple-400" },
  expired:   { label: "Expired",   color: "bg-gray-100 text-gray-500",     dot: "bg-gray-300" },
};

// -- Stat Card -----------------------------------------------------------------
function StatCard({ label, value, sub, icon: Icon, color, trend, sparkline }: {
  label: string; value: string | number; sub: string;
  icon: React.ElementType; color: string; trend?: string;
  sparkline?: { day: string; amt: number }[];
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-200 overflow-hidden relative group">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at top right, ${color}08, transparent 60%)` }} />
      <div className="flex items-start justify-between mb-3 relative">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
          {trend && (
            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-green-600 mt-0.5">
              <ArrowUpRight className="w-3 h-3" />{trend}
            </span>
          )}
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-4.5 h-4.5" style={{ color, width: "1.125rem", height: "1.125rem" }} />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1 relative font-heading">{value}</p>
      <p className="text-xs text-gray-400 relative">{sub}</p>
      {sparkline && (
        <div className="h-10 -mx-1 mt-3 relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkline} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="amt" stroke={color} strokeWidth={1.5}
                fill={`url(#grad-${label})`} dot={false} />
              <Tooltip
                contentStyle={{ fontSize: 10, padding: '2px 6px', borderRadius: 6, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                formatter={(v: number) => [`$${v.toFixed(0)}`, 'Earned']}
                labelFormatter={(l) => l}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default function PartnerDashboard() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  // PP-35: Auto-redirect mobile users to Field OS
  useEffect(() => {
    if (window.innerWidth < 768) {
      navigate("/field-os");
    }
  }, [navigate]);
  const [closingId, setClosingId] = useState<number | null>(null);
  const [jobValueInput, setJobValueInput] = useState<Record<number, string>>({});
  const [insuranceModalDeal, setInsuranceModalDeal] = useState<{
    dealId: number;
    homeownerName?: string;
    serviceAddress?: string;
    issueType?: string;
    estimatedValue?: number;
  } | null>(null);
  const [linkEmail, setLinkEmail] = useState("");
  const [showLinkForm, setShowLinkForm] = useState(false);
  const linkEmailRef = useRef<HTMLInputElement>(null);

  const linkMutation = trpc.partners.linkMyApplication.useMutation({
    onSuccess: (data) => {
      toast.success(data.status === "approved" ? "Application linked! Welcome to ProLnk." : "Application linked. Your review is in progress.");
      window.location.reload();
    },
    onError: (err) => toast.error(err.message || "Could not link application."),
  });

  const { data: profileData, isLoading: profileLoading } = trpc.partners.getMyProfile.useQuery(
    undefined, { enabled: isAuthenticated }
  );
  const { data: inboundOpps, isLoading: inboundLoading, refetch: refetchInbound } =
    trpc.partners.getInboundOpportunities.useQuery(undefined, { enabled: isAuthenticated });
  const { data: outboundRefs, isLoading: outboundLoading } =
    trpc.partners.getOutboundReferrals.useQuery(undefined, { enabled: isAuthenticated });
  const { data: earnedCommissions } =
    trpc.partners.getEarnedCommissions.useQuery(undefined, { enabled: isAuthenticated });
  const { data: broadcasts } =
    trpc.partners.getBroadcasts.useQuery(undefined, { enabled: isAuthenticated });
  const { data: myJobs } =
    trpc.partners.getMyJobs.useQuery(undefined, { enabled: isAuthenticated });

  const { data: smartAlerts = [] } = trpc.partnerAlerts.getAlerts.useQuery(undefined, { enabled: isAuthenticated });
  const respondMutation = trpc.partners.respondToOpportunity.useMutation({
    onSuccess: () => { toast.success("Response recorded"); refetchInbound(); },
    onError: (err) => toast.error(err.message),
  });

  const closeJobMutation = trpc.partners.closeJob.useMutation({
    onSuccess: () => { toast.success("Job closed! Commission recorded."); setClosingId(null); refetchInbound(); },
    onError: (err) => toast.error(err.message),
  });

  // -- All hooks must be called before any conditional returns ------------------
  const earningsSparkline = useMemo(() => {
    const days: Record<string, number> = {};
    const now = Date.now();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now - i * 86400000);
      days[d.toLocaleDateString('en-US', { weekday: 'short' })] = 0;
    }
    (earnedCommissions ?? []).forEach((c) => {
      const d = new Date(Number(c.createdAt));
      const key = d.toLocaleDateString('en-US', { weekday: 'short' });
      if (key in days) days[key] += Number(c.amount ?? 0);
    });
    return Object.entries(days).map(([day, amt]) => ({ day, amt }));
  }, [earnedCommissions]);

  // W48: Smart Insights computation
  const smartInsights = useMemo(() => {
    const jobs = myJobs ?? [];
    const opps = outboundRefs ?? [];
    const comms = earnedCommissions ?? [];
    const inbound = inboundOpps ?? [];
    // Best performing day of week
    const dayTotals: Record<string, number> = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    comms.forEach((c: any) => {
      const d = new Date(Number(c.createdAt));
      dayTotals[dayNames[d.getDay()]] += Number(c.amount ?? 0);
    });
    const bestDayEntry = Object.entries(dayTotals).sort((a, b) => b[1] - a[1])[0];
    const bestDay = bestDayEntry ? { day: bestDayEntry[0], amount: bestDayEntry[1] } : null;
    // Top opportunity type
    const typeCounts: Record<string, number> = {};
    opps.forEach((o: any) => {
      const t = o.opportunityType ?? 'General';
      typeCounts[t] = (typeCounts[t] ?? 0) + 1;
    });
    const topTypeEntry = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0];
    const topType = topTypeEntry ? { type: topTypeEntry[0], count: topTypeEntry[1] } : null;
    // Acceptance rate
    const accepted = inbound.filter((o: any) => o.status === 'accepted' || o.status === 'converted').length;
    const acceptRate = inbound.length > 0 ? Math.round((accepted / inbound.length) * 100) : 0;
    // Avg commission per job
    const totalComm = comms.reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
    const avgComm = jobs.length > 0 ? totalComm / jobs.length : 0;
    return { bestDay, topType, acceptRate, avgComm, totalJobs: jobs.length };
  }, [myJobs, outboundRefs, earnedCommissions, inboundOpps]);
  // Item 30: Earnings forecast — project next 30 days based on last 30-day run rate
  const forecastedEarnings = useMemo(() => {
    const comms = earnedCommissions ?? [];
    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 86400000;
    const last30 = comms.filter((c: any) => Number(c.createdAt) > thirtyDaysAgo);
    const last30Total = last30.reduce((s: number, c: any) => s + Number(c.amount ?? 0), 0);
    return Math.round(last30Total * 1.05); // 5% growth assumption
  }, [earnedCommissions]);

  // -- Conditional returns after all hooks --------------------------------------
  if (profileLoading) {
    return (
      <PartnerLayout>
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#0A1628] border-t-transparent animate-spin" />
            <p className="text-sm text-gray-400">Loading your dashboard...</p>
          </div>
        </div>
      </PartnerLayout>
    );
  }

  if (!profileData) {
    return (
      <PartnerLayout>
        <div className="max-w-lg mx-auto py-24 px-6 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "linear-gradient(135deg, #E6F9F9, #CCF2F2)" }}>
            <Zap className="w-8 h-8 text-[#0A1628]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-heading">No Partner Profile Found</h2>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
            Apply to join the ProLnk network, or link your existing application to this account.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
            <Link href="/apply">
              <Button className="text-white" style={{ background: "linear-gradient(135deg, #0A1628, #0A1628)" }}>
                Apply to Join ProLnk
              </Button>
            </Link>
            <Button variant="outline" onClick={() => { setShowLinkForm(true); setTimeout(() => linkEmailRef.current?.focus(), 100); }}>
              Link Existing Application
            </Button>
          </div>
          {showLinkForm && (
            <div className="mt-4 bg-white rounded-2xl border border-gray-200 p-6 w-full max-w-sm mx-auto text-left shadow-sm">
              <p className="text-sm font-semibold text-gray-900 mb-3">Enter the email you used to apply</p>
              <input
                ref={linkEmailRef}
                type="email"
                placeholder="you@yourbusiness.com"
                value={linkEmail}
                onChange={(e) => setLinkEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <Button
                className="w-full text-white"
                style={{ background: "linear-gradient(135deg, #0A1628, #0A1628)" }}
                disabled={!linkEmail || linkMutation.isPending}
                onClick={() => linkMutation.mutate({ email: linkEmail })}
              >
                {linkMutation.isPending ? "Linking..." : "Link Application"}
              </Button>
            </div>
          )}
        </div>
      </PartnerLayout>
    );
  }

  const partner = profileData.partner;

  if (partner.status === "pending") {
    return (
      <PartnerLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center px-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "linear-gradient(135deg, #FFFBEB, #FEF3C7)" }}>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-heading">Application Under Review</h2>
          <p className="text-gray-500 max-w-sm text-sm">
            Your application for <strong>{partner.businessName}</strong> is being reviewed.
            You'll receive an email within 1-2 business days.
          </p>
        </div>
      </PartnerLayout>
    );
  }

  if (partner.status === "rejected") {
    return (
      <PartnerLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center px-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "linear-gradient(135deg, #FEF2F2, #FEE2E2)" }}>
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-heading">Application Not Approved</h2>
          <p className="text-gray-500 mb-6 max-w-sm text-sm">Contact us for more information about your application.</p>
          <a href="mailto:partners@prolnk.com">
            <Button variant="outline">Contact Support</Button>
          </a>
        </div>
      </PartnerLayout>
    );
  }

  // -- Active partner ------------------------------------------------------------
  const tier = (partner.tier as keyof typeof TIER_CONFIG) ?? "scout";
  const tierCfg = TIER_CONFIG[tier] ?? TIER_CONFIG.scout;
  const referralCount = partner.referralCount ?? 0;
  const newLeads = inboundOpps?.filter((o) => o.status === "sent") ?? [];
  const activeJobs = inboundOpps?.filter((o) => o.status === "accepted") ?? [];
  const totalEarned = earnedCommissions?.reduce(
    (sum, c) => sum + Number(c.amount ?? 0), 0
  ) ?? 0;

  return (
    <PartnerLayout>
      <div className="p-6 max-w-7xl mx-auto">

        {/* -- Welcome Header ---------------------------------------------------- */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-heading">
              Welcome back, {partner.contactName?.split(" ")[0] ?? "Partner"} 
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              {partner.businessName}
              <span className="mx-2 text-gray-300"></span>
              <span className="inline-flex items-center gap-1">
                <span className="text-lg">{tierCfg.icon}</span>
                <span className={`font-semibold ${tierCfg.color}`}>{tierCfg.label}</span>
              </span>
              <span className="mx-2 text-gray-300"></span>
              {partner.serviceArea}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Subscription plan badge with upgrade CTA */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border" style={{
              background: tier === "enterprise" ? "#0F172A" : tier === "scout" ? "#F8FAFC" : "#F0FDFD",
              borderColor: tier === "enterprise" ? "#334155" : tier === "scout" ? "#E2E8F0" : "#99E6E8"
            }}>
              <Award className="w-4 h-4 flex-shrink-0" style={{ color: tierCfg.bar }} />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: tier === "enterprise" ? "#94A3B8" : "#6B7280" }}>Current Plan</p>
                <p className="text-sm font-bold leading-tight" style={{ color: tierCfg.bar }}>
                  {tierCfg.label}{tierCfg.monthlyFee > 0 ? ` · $${tierCfg.monthlyFee}/mo` : " · Free"}
                </p>
              </div>
              {tierCfg.next && (
                <Link href="/dashboard/upgrade">
                  <button className="ml-1 text-xs font-semibold px-2 py-1 rounded-lg transition-all hover:opacity-90 whitespace-nowrap"
                    style={{ backgroundColor: `${tierCfg.bar}20`, color: tierCfg.bar }}>
                    Upgrade ↑
                  </button>
                </Link>
              )}
            </div>
            <Link href="/job/new">
              <Button className="text-white flex items-center gap-2 shadow-sm"
                style={{ background: "linear-gradient(135deg, #0A1628, #0A1628)" }}>
                <Camera className="w-4 h-4" /> Log a Job
              </Button>
            </Link>
          </div>
        </div>

        {/* -- Smart Alerts Banner -------------------------------------------- */}
        {(smartAlerts as any[]).length > 0 && (
          <div className="mb-6 space-y-2">
            {(smartAlerts as any[]).slice(0, 3).map((alert, i) => {
              const colors: Record<string, { bg: string; border: string; icon: string; text: string }> = {
                milestone: { bg: "#F0FDF4", border: "#86EFAC", icon: "🏆", text: "#166534" },
                success:   { bg: "#EFF6FF", border: "#93C5FD", icon: "✅", text: "#1E40AF" },
                warning:   { bg: "#FFFBEB", border: "#FCD34D", icon: "⚠️", text: "#92400E" },
                info:      { bg: "#F0F9FF", border: "#7DD3FC", icon: "💡", text: "#0C4A6E" },
              };
              const c = colors[alert.severity as string] ?? colors.info;
              return (
                <div key={i} className="rounded-xl px-4 py-3 flex items-start gap-3 border" style={{ background: c.bg, borderColor: c.border }}>
                  <span className="text-lg leading-none mt-0.5">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold" style={{ color: c.text }}>{alert.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: c.text, opacity: 0.75 }}>{alert.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* -- Hero Stat Cards --------------------------------------------------- */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard
            label="New Leads"
            value={newLeads.length}
            sub="Awaiting your response"
            icon={Inbox}
            color="#3B82F6"
            trend={newLeads.length > 0 ? `${newLeads.length} pending` : undefined}
          />
          <StatCard
            label="Active Jobs"
            value={activeJobs.length}
            sub="Accepted, in progress"
            icon={CheckCircle}
            color="#10B981"
          />
          <StatCard
            label="Referrals Sent"
            value={referralCount}
            sub="Jobs your photos generated"
            icon={Send}
            color="#8B5CF6"
          />
          <StatCard
            label="Total Earned"
            value={`$${totalEarned.toFixed(0)}`}
            sub="From referrals closed"
            icon={DollarSign}
            color="#0A1628"
            sparkline={earningsSparkline}
          />
          <StatCard
            label="Projected (30d)"
            value={`$${forecastedEarnings.toLocaleString()}`}
            sub="Based on your run rate"
            icon={TrendingUp}
            color="#059669"
            trend={forecastedEarnings > 0 ? "↑ Next 30 days" : undefined}
          />
        </div>

        {/* -- Quick Actions ------------------------------------------------------ */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {[
            { icon: Camera, label: "Log a Job", sub: "Upload photos", href: "/job/new", color: "#0A1628", action: null },
            { icon: Send, label: "Share Link", sub: "Recruit colleagues", href: "/dashboard/referral", color: "#8B5CF6", action: null },
            { icon: Inbox, label: "View Leads", sub: `${newLeads.length} new`, href: "/dashboard/leads", color: "#3B82F6", action: null },
            { icon: Award, label: "Leaderboard", sub: "See rankings", href: "/leaderboard", color: "#F59E0B", action: null },
            { icon: MessageSquare, label: "Request Review", sub: "Get Google reviews", href: "/dashboard/reviews", color: "#10B981", action: null },
            { icon: Share2, label: "Share Profile", sub: "Copy public link", href: null, color: "#1B4FD8",
              action: () => {
                const url = `${window.location.origin}/pro/${partner?.id}`;
                navigator.clipboard.writeText(url).then(() => toast.success("Profile link copied to clipboard!"));
              }
            },
          ].map((a) => (
            a.action ? (
              <div key={a.label} onClick={a.action}
                className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${a.color}15` }}>
                  <a.icon className="w-4 h-4" style={{ color: a.color }} />
                </div>
                <div className="font-semibold text-gray-900 text-xs">{a.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{a.sub}</div>
              </div>
            ) : (
              <Link key={a.href} href={a.href!}>
                <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${a.color}15` }}>
                    <a.icon className="w-4 h-4" style={{ color: a.color }} />
                  </div>
                  <div className="font-semibold text-gray-900 text-xs">{a.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{a.sub}</div>
                </div>
              </Link>
            )
          ))}
        </div>

        {/* -- W48: Smart Insights -------------------------------------------- */}
        {(smartInsights.bestDay || smartInsights.topType || smartInsights.acceptRate > 0) && (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0A1628, #1B4FD8)" }}>
                  <BarChart3 className="w-4.5 h-4.5 text-white" style={{ width: '1.125rem', height: '1.125rem' }} />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-sm">Smart Insights</h2>
                  <p className="text-xs text-gray-400">Personalized performance patterns from your data</p>
                </div>
              </div>
            </div>
            <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {smartInsights.bestDay && smartInsights.bestDay.amount > 0 && (
                <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                  <p className="text-xs text-indigo-500 font-semibold mb-1">Best Day</p>
                  <p className="text-xl font-black text-indigo-700">{smartInsights.bestDay.day}</p>
                  <p className="text-xs text-indigo-400 mt-1">${smartInsights.bestDay.amount.toFixed(0)} earned</p>
                </div>
              )}
              {smartInsights.topType && (
                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <p className="text-xs text-amber-500 font-semibold mb-1">Top Lead Type</p>
                  <p className="text-sm font-black text-amber-700 leading-tight">{smartInsights.topType.type}</p>
                  <p className="text-xs text-amber-400 mt-1">{smartInsights.topType.count} referrals</p>
                </div>
              )}
              {smartInsights.acceptRate >= 0 && (
                <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                  <p className="text-xs text-gray-400 mb-1">Response Rate</p>
                  <p className="text-xl font-black text-blue-600">{smartInsights.acceptRate}%</p>
                  <p className="text-xs text-gray-400">Lead acceptance</p>
                </div>
              )}
              {smartInsights.acceptRate >= 0 && (
                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <p className="text-xs text-emerald-500 font-semibold mb-1">Accept Rate</p>
                  <p className="text-xl font-black text-emerald-700">{smartInsights.acceptRate}%</p>
                  <p className="text-xs text-emerald-400 mt-1">Of inbound leads</p>
                </div>
              )}
              {smartInsights.avgComm > 0 && (
                <div className="rounded-xl border border-teal-100 bg-teal-50 p-4">
                  <p className="text-xs text-teal-500 font-semibold mb-1">Avg Commission</p>
                  <p className="text-xl font-black text-teal-700">${smartInsights.avgComm.toFixed(0)}</p>
                  <p className="text-xs text-teal-400 mt-1">Per job logged</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* -- V6: Your AI is Working ------------------------------------------- */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7C3AED, #3B82F6)" }}>
                <Radar className="w-4.5 h-4.5 text-white" style={{ width: '1.125rem', height: '1.125rem' }} />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-sm">Your AI is Working</h2>
                <p className="text-xs text-gray-400">Photos you upload keep generating leads -- even months later</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-600 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Engine Active
            </span>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
              {[
                { icon: Eye, label: "Photos Analyzed", value: String(myJobs?.length ?? 0), sub: "AI scanned for opportunities", color: "#3B82F6" },
                { icon: Zap, label: "Leads Generated", value: String(referralCount), sub: "From your photo library", color: "#8B5CF6" },
                { icon: Repeat, label: "Residual Leads", value: String(Math.max(0, referralCount - (newLeads.length + activeJobs.length))), sub: "From past photos, auto-detected", color: "#10B981" },
                { icon: Shield, label: "Photo Impact Score", value: `${Math.min(100, Math.round((referralCount / Math.max(1, myJobs?.length ?? 1)) * 40 + 30))}`, sub: "Quality  lead conversion", color: "#F59E0B" },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-4 bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                      <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{s.label}</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Event-Driven Lead Feed */}
            <div className="rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-600 flex items-center gap-2">
                  <CloudLightning className="w-3.5 h-3.5 text-blue-500" />
                  Predictive Lead Feed
                </span>
                <span className="text-[10px] text-gray-400">Auto-generated from your photo library + external events</span>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  { type: "Storm Watch", desc: "Hail damage detected near 3 of your recent job sites -- roof inspection leads queued", time: "2h ago", color: "#3B82F6", icon: CloudLightning },
                  { type: "Asset Aging", desc: "Water heater in job #47 photo estimated at 12+ years -- replacement lead generated", time: "1d ago", color: "#F59E0B", icon: Clock },
                  { type: "Photo Match", desc: "HVAC unit in your photo matched to a manufacturer recall -- safety lead created", time: "3d ago", color: "#EF4444", icon: Shield },
                ].map((item, i) => (
                  <div key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-gray-50/50 transition-colors">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${item.color}15` }}>
                      <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${item.color}15`, color: item.color }}>{item.type}</span>
                        <span className="text-[10px] text-gray-300">{item.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* -- Main Content Grid -------------------------------------------------- */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left: Leads + Jobs + Referrals */}
          <div className="lg:col-span-2 space-y-6">

            {/* Inbound Leads */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Inbox className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <h2 className="font-semibold text-gray-900 text-sm">Inbound Leads</h2>
                  {newLeads.length > 0 && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {newLeads.length} new
                    </span>
                  )}
                </div>
                <Link href="/dashboard/leads">
                  <span className="text-xs text-[#0A1628] hover:underline cursor-pointer flex items-center gap-1 font-medium">
                    View all <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>

              {inboundLoading ? (
                <div className="p-8 flex justify-center">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-300" />
                </div>
              ) : newLeads.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-3">
                    <Inbox className="w-6 h-6 text-gray-200" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">No new leads right now.</p>
                  <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                    Log jobs to generate referrals for other partners -- they'll return the favor.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {newLeads.slice(0, 5).map((opp) => (
                    <div key={opp.id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_CONFIG[opp.status]?.color ?? "bg-gray-100 text-gray-600"}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[opp.status]?.dot}`} />
                              {STATUS_CONFIG[opp.status]?.label ?? opp.status}
                            </span>
                            <span className="text-xs text-gray-400 capitalize">
                              {opp.opportunityType.replace(/_/g, " ")}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 truncate">{opp.serviceAddress}</p>
                          <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{opp.description}</p>
                          {opp.estimatedJobValue && (
                            <p className="text-xs font-bold text-[#0A1628] mt-1.5">
                              Est. value: ${Number(opp.estimatedJobValue).toLocaleString()}
                            </p>
                          )}
                          {opp.sourcePartnerName && (
                            <p className="text-xs text-gray-300 mt-0.5">Referred by {opp.sourcePartnerName}</p>
                          )}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            size="sm"
                            className="text-xs h-7 text-white shadow-sm"
                            style={{ background: "linear-gradient(135deg, #0A1628, #0A1628)" }}
                            onClick={() => respondMutation.mutate({ opportunityId: opp.id, response: "accepted" })}
                            disabled={respondMutation.isPending}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 text-gray-500"
                            onClick={() => respondMutation.mutate({ opportunityId: opp.id, response: "declined" })}
                            disabled={respondMutation.isPending}
                          >
                            Pass
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Active Jobs */}
            {activeJobs.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
                  <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  </div>
                  <h2 className="font-semibold text-gray-900 text-sm">Active Jobs</h2>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                    {activeJobs.length}
                  </span>
                </div>
                <div className="divide-y divide-gray-50">
                  {activeJobs.map((opp) => (
                    <div key={opp.id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900">{opp.serviceAddress}</p>
                          <p className="text-xs text-gray-400 mt-0.5 capitalize">
                            {opp.opportunityType.replace(/_/g, " ")}  {opp.description}
                          </p>
                          {opp.estimatedJobValue && (
                            <p className="text-xs font-bold text-[#0A1628] mt-1">
                              Est. ${Number(opp.estimatedJobValue).toLocaleString()}
                            </p>
                          )}
                        </div>
                        {closingId === opp.id ? (
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <input
                              type="number"
                              placeholder="Actual $"
                              className="w-24 text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-400"
                              value={jobValueInput[opp.id] ?? ""}
                              onChange={(e) => setJobValueInput((prev) => ({ ...prev, [opp.id]: e.target.value }))}
                            />
                            <Button size="sm" className="text-xs h-7 text-white"
                              style={{ background: "linear-gradient(135deg, #0A1628, #0A1628)" }}
                              onClick={() => {
                                const val = parseFloat(jobValueInput[opp.id] ?? "0");
                                if (val > 0) closeJobMutation.mutate({ opportunityId: opp.id, actualJobValue: val });
                              }}
                              disabled={closeJobMutation.isPending}>
                              Confirm
                            </Button>
                            <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => setClosingId(null)}>
                              Cancel
                            </Button>
                          </div>
                        ) : ((opp as any).isInsuranceJob ? (
                          <Button size="sm" variant="outline"
                            className="text-xs h-7 border-blue-200 text-blue-700 hover:bg-blue-50 flex-shrink-0"
                            onClick={() => setInsuranceModalDeal({
                              dealId: opp.id,
                              homeownerName: undefined,
                              serviceAddress: opp.serviceAddress ?? undefined,
                              issueType: opp.opportunityType,
                              estimatedValue: opp.estimatedJobValue ? Number(opp.estimatedJobValue) : undefined,
                            })}>
                            <Shield className="w-3 h-3 mr-1" />
                            Insurance Close
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline"
                            className="text-xs h-7 border-green-200 text-green-700 hover:bg-green-50 flex-shrink-0"
                            onClick={() => setClosingId(opp.id)}>
                            Mark Closed
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* My Referrals */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Send className="w-3.5 h-3.5 text-purple-500" />
                  </div>
                  <h2 className="font-semibold text-gray-900 text-sm">My Referrals</h2>
                </div>
                <Link href="/dashboard/referrals">
                  <span className="text-xs text-[#0A1628] hover:underline cursor-pointer flex items-center gap-1 font-medium">
                    View all <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>

              {outboundLoading ? (
                <div className="p-8 flex justify-center">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-300" />
                </div>
              ) : !outboundRefs || outboundRefs.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-3">
                    <Camera className="w-6 h-6 text-gray-200" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">No referrals yet.</p>
                  <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                    Log a job and upload photos -- the AI will find opportunities for your network.
                  </p>
                  <Link href="/job/new">
                    <Button size="sm" className="mt-4 text-xs text-white"
                      style={{ background: "linear-gradient(135deg, #0A1628, #0A1628)" }}>
                      <Camera className="w-3 h-3 mr-1" /> Log Your First Job
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {outboundRefs.slice(0, 5).map((opp) => (
                    <div key={opp.id} className="px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_CONFIG[opp.status]?.color ?? "bg-gray-100 text-gray-600"}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[opp.status]?.dot}`} />
                            {STATUS_CONFIG[opp.status]?.label ?? opp.status}
                          </span>
                          <span className="text-xs text-gray-400 capitalize">
                            {opp.opportunityType.replace(/_/g, " ")}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 truncate">{opp.serviceAddress}</p>
                        {opp.receivingPartnerName && (
                          <p className="text-xs text-gray-300">Sent to {opp.receivingPartnerName}</p>
                        )}
                      </div>
                      {opp.status === "converted" && opp.referralCommissionAmount && (
                        <span className="text-xs font-bold text-[#0A1628] flex-shrink-0">
                          +${Number(opp.referralCommissionAmount).toFixed(0)} earned
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">

            {/* Onboarding checklist */}
            <OnboardingChecklist
              partner={partner}
              hasJobs={(myJobs?.length ?? 0) > 0}
              hasReferrals={(outboundRefs?.length ?? 0) > 0}
            />
            {/* Account Standing badge */}
            <AccountStandingBadge partner={partner} />
            {/* TrustyPro Badge Progress */}
            {(() => {
              const jobsDone = myJobs?.length ?? 0;
              const reviews = partner.reviewCount ?? 0;
              const rating = Number(partner.rating ?? 0);
              const refs = partner.referralCount ?? 0;
              const hasCOI = !!(partner.coiUrl || partner.coiVerifiedAt);
              const hasLicense = !!(partner.licenseNumber || partner.licenseVerifiedAt);
              const tiers = [
                { name: "Bronze",   color: "#CD7F32", bg: "#FDF6EE", border: "#E8C49A", emoji: "🥉", req: "Approved + COI + License on file", met: hasCOI && hasLicense },
                { name: "Silver",   color: "#9CA3AF", bg: "#F9FAFB", border: "#D1D5DB", emoji: "🥈", req: "5+ jobs · 4.0+ rating · 3+ reviews", met: jobsDone >= 5 && rating >= 4.0 && reviews >= 3 },
                { name: "Gold",     color: "#F59E0B", bg: "#FFFBEB", border: "#FCD34D", emoji: "🥇", req: "25+ jobs · 4.5+ rating · 10+ reviews · 3+ referrals", met: jobsDone >= 25 && rating >= 4.5 && reviews >= 10 && refs >= 3 },
                { name: "Platinum", color: "#6366F1", bg: "#EEF2FF", border: "#A5B4FC", emoji: "💎", req: "100+ jobs · 4.8+ rating · 25+ reviews · 10+ referrals", met: jobsDone >= 100 && rating >= 4.8 && reviews >= 25 && refs >= 10 },
              ];
              const earnedIdx = tiers.reduce((acc: number, t, i) => t.met ? i : acc, -1);
              const currentBadge = earnedIdx >= 0 ? tiers[earnedIdx] : null;
              const nextBadge = tiers[earnedIdx + 1] ?? null;
              return (
                <div className="rounded-2xl border p-4" style={{ backgroundColor: currentBadge?.bg ?? "#F9FAFB", borderColor: currentBadge?.border ?? "#E5E7EB" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: currentBadge?.color ?? "#6B7280" }}>TrustyPro Badge</span>
                    <span className="text-xl">{currentBadge?.emoji ?? "⬜"}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">{currentBadge ? `${currentBadge.name} Partner` : "No Badge Yet"}</p>
                  {nextBadge ? (
                    <p className="text-xs text-gray-500">Next: <span className="font-semibold">{nextBadge.emoji} {nextBadge.name}</span> — {nextBadge.req}</p>
                  ) : currentBadge ? (
                    <p className="text-xs font-semibold" style={{ color: currentBadge.color }}>🏆 Maximum badge achieved!</p>
                  ) : (
                    <p className="text-xs text-gray-500">Complete verification to earn Bronze — upload COI & license</p>
                  )}
                </div>
              );
            })()}
            {/* Tier card */}
            <div className="rounded-2xl border p-5 overflow-hidden relative" style={{
              background: tier === "enterprise"
                ? "linear-gradient(135deg, #0F172A, #1E293B)"
                : "linear-gradient(135deg, #F0FDFD, #E6F9F9)",
              borderColor: tier === "enterprise" ? "#334155" : "#99E6E8"
            }}>
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10"
                style={{ background: `radial-gradient(circle, ${tierCfg.bar}, transparent)`, transform: "translate(30%, -30%)" }} />
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: tier === "enterprise" ? "#94A3B8" : "#6B7280" }}>Your Tier</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{tierCfg.icon}</span>
                    <span className="text-xl font-bold font-heading" style={{ color: tierCfg.bar }}>
                      {tierCfg.label}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${tierCfg.bar}20` }}>
                  <Award className="w-5 h-5" style={{ color: tierCfg.bar }} />
                </div>
              </div>
              {tierCfg.next && (
                <div>
                  <div className="flex justify-between text-xs mb-1.5"
                    style={{ color: tier === "enterprise" ? "#64748B" : "#9CA3AF" }}>
                    <span>{tierCfg.label}</span>
                    <span>{tierCfg.next} (${TIER_CONFIG[tierCfg.next.toLowerCase() as keyof typeof TIER_CONFIG]?.monthlyFee}/mo)</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden mb-3"
                    style={{ backgroundColor: tier === "enterprise" ? "#1E293B" : "#CCF2F2" }}>
                    <div className="h-full rounded-full" style={{ width: "35%", backgroundColor: tierCfg.bar }} />
                  </div>
                  <a href="/dashboard/upgrade"
                    className="block text-center text-xs font-semibold py-2 px-3 rounded-xl transition-all hover:opacity-90"
                    style={{ backgroundColor: `${tierCfg.bar}20`, color: tierCfg.bar }}>
                    Upgrade to {tierCfg.next}
                  </a>
                </div>
              )}
            </div>

            {/* Commission rates */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#0A1628]" />
                Your Commission Rates
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-xl bg-[#F5E642]/10">
                  <div>
                    <p className="text-xs text-[#0A1628] font-medium">You Earn (Referrals Out)</p>
                    <p className="text-lg font-bold text-[#0A1628] font-heading">
                      {(Number(partner.referralCommissionRate) * 100).toFixed(0)}%
                    </p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-[#0A1628]/70" />
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Platform Fee (Leads In)</p>
                    <p className="text-lg font-bold text-gray-700 font-heading">
                      {(Number(partner.platformFeeRate) * 100).toFixed(0)}%
                    </p>
                  </div>
                  <DollarSign className="w-5 h-5 text-gray-300" />
                </div>
                <div className="flex justify-between items-center px-3 pt-2">
                  <p className="text-xs text-gray-400">Total Earned (all time)</p>
                  <p className="text-sm font-bold text-gray-700">
                    ${Number(partner.totalCommissionEarned).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Priority Score */}
            <MyPriorityScoreCard />

            {/* Achievements & Streak */}
            <PartnerAchievements partner={partner} />

            {/* Network broadcasts */}
            {broadcasts && broadcasts.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#0A1628]" />
                  Network Updates
                </h3>
                <div className="space-y-3">
                  {broadcasts.slice(0, 3).map((b) => (
                    <div key={b.id} className="text-xs p-3 rounded-xl bg-gray-50">
                      <p className="font-semibold text-gray-700">{b.subject}</p>
                      <p className="text-gray-400 mt-0.5 line-clamp-2">{b.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Log a job CTA */}
            <div className="rounded-2xl p-5 text-white overflow-hidden relative"
              style={{ background: "linear-gradient(135deg, #0A1628, #0A7A7C)" }}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #fff, transparent)", transform: "translate(30%, -30%)" }} />
              <Camera className="w-6 h-6 mb-3 opacity-80 relative" />
              <h3 className="font-bold text-base mb-1 relative font-heading">Log a Job</h3>
              <p className="text-xs opacity-80 mb-4 relative">
                Upload 1-3 photos after any job. Our AI finds leads for your network -- and earns you commissions.
              </p>
              <Link href="/job/new">
                <Button size="sm" className="bg-white text-[#0A1628] hover:bg-[#F5E642]/10 text-xs font-semibold w-full relative">
                  Upload Photos <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {insuranceModalDeal && (
        <InsuranceJobCompletionModal
          open={!!insuranceModalDeal}
          onClose={() => setInsuranceModalDeal(null)}
          dealId={insuranceModalDeal.dealId}
          homeownerName={insuranceModalDeal.homeownerName}
          serviceAddress={insuranceModalDeal.serviceAddress}
          issueType={insuranceModalDeal.issueType}
          estimatedValue={insuranceModalDeal.estimatedValue}
          onSuccess={() => { setInsuranceModalDeal(null); }}
        />
      )}
    </PartnerLayout>
  );
}
