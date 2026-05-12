/**
 * Founding Partner Landing Page
 * Route: /founding-partner
 * Public — shows the program details and enrollment CTA.
 * Also serves as the partner's personal founding partner dashboard when logged in.
 */

import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/_core/hooks/useAuth";
import BackToTop from "@/components/BackToTop";
import {
  Lock, DollarSign, RefreshCw, Calendar, Home, Zap, CheckCircle,
  Star, Users, TrendingUp, ArrowRight, Shield, Award, AlertTriangle,
} from "lucide-react";

const TOTAL_SLOTS = 2125;

const TIERS = [
  { name: "Charter Member", slots: 25, range: "Positions 1–25", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
  { name: "Founding Member", slots: 100, range: "Positions 26–125", color: "text-teal-400", bg: "bg-teal-400/10", border: "border-teal-400/30" },
  { name: "Level 3 Partner", slots: 400, range: "Positions 126–525", color: "text-indigo-400", bg: "bg-indigo-400/10", border: "border-indigo-400/30" },
  { name: "Level 4 Partner", slots: 1600, range: "Positions 526–2,125", color: "text-gray-300", bg: "bg-gray-700/50", border: "border-gray-600/50" },
];

const FOUNDING_BENEFITS = [
  {
    icon: <Lock className="w-6 h-6" />,
    title: "$149/mo LOCKED FOREVER",
    description: "Rate never changes — even when the platform price goes to $249/mo after the founding network closes.",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "90-Day Free Trial",
    description: "No credit card required until your trial ends. Start earning and building your network risk-free.",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "72% Commission Keep Rate",
    description: "The highest keep rate on the platform. You keep 72 cents of every dollar from every job you close.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "4-Level Deep Network Income",
    description: "Earn 7% → 4% → 2% → 1% on every job your recruits complete, automatically, every month.",
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: "1.5% Home Origination Rights",
    description: "Document a property and earn 1.5% of the platform fee on every job at that address — permanently.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Founding Network Status",
    description: "This designation is permanent and cannot be removed, replicated, or granted to anyone after the waitlist closes.",
  },
];

const TESTIMONIALS = [
  {
    name: "Jake M.",
    trade: "HVAC Technician",
    location: "DFW",
    tier: "Charter Member",
    tierColor: "text-amber-400",
    quote: "Joined early to lock in the rate. The origination rights alone make it worth it.",
  },
  {
    name: "Carlos R.",
    trade: "Electrician",
    location: "Dallas",
    tier: "Founding Member",
    tierColor: "text-teal-400",
    quote: "Referred 8 pros in my first month. That's passive income every time they work.",
  },
  {
    name: "David T.",
    trade: "Roofer",
    location: "Fort Worth",
    tier: "Level 3 Partner",
    tierColor: "text-indigo-400",
    quote: "The 90-day trial sold me. $0 risk, unlimited upside.",
  },
];

function getTierForPosition(pos: number) {
  if (pos <= 25) return TIERS[0];
  if (pos <= 125) return TIERS[1];
  if (pos <= 525) return TIERS[2];
  return TIERS[3];
}

function getSpotColor(filled: number, total: number) {
  const pct = filled / total;
  if (pct < 0.25) return { bar: "bg-green-500", text: "text-green-400", label: "Spots available" };
  if (pct < 0.75) return { bar: "bg-yellow-500", text: "text-yellow-400", label: "Filling fast" };
  return { bar: "bg-red-500", text: "text-red-400", label: "Almost full" };
}

export default function FoundingPartnerPage() {
  const [, navigate] = useLocation();
  const { user } = useAuth();

  const program = trpc.foundingPartner.getProgram.useQuery();
  const enrollmentStatus = trpc.foundingPartner.getEnrollmentStatus.useQuery();
  const myStatus = trpc.foundingPartner.getMyStatus.useQuery(undefined, { enabled: !!user });
  const requirements = trpc.foundingPartner.checkMyRequirements.useQuery(undefined, { enabled: !!user });
  const earnings = trpc.foundingPartner.getEarningsBreakdown.useQuery({ period: "all" }, { enabled: !!user });

  const p = program.data;
  const es = enrollmentStatus.data;
  const filled = es?.enrolled ?? 0;
  const remaining = TOTAL_SLOTS - filled;
  const pct = Math.min(100, (filled / TOTAL_SLOTS) * 100);
  const spotColor = getSpotColor(filled, TOTAL_SLOTS);
  const nextTier = getTierForPosition(filled + 1);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>
      <Helmet>
        <title>Join the ProLnk Founding Network — 2,125 Spots Available</title>
        <meta name="description" content="Charter Members, Founding Members, and Partner tiers. $149/mo locked forever. 90-day free trial. Apply before the waitlist closes." />
        <meta property="og:title" content="Join the ProLnk Founding Network — 2,125 Spots Available" />
        <meta property="og:description" content="Charter Members, Founding Members, and Partner tiers. $149/mo locked forever. 90-day free trial. Apply before the waitlist closes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prolnk.io/founding-partner" />
        <meta property="og:image" content="https://prolnk.io/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Join the ProLnk Founding Network — 2,125 Spots Available" />
        <meta name="twitter:description" content="Charter Members, Founding Members, and Partner tiers. $149/mo locked forever. 90-day free trial. Apply before the waitlist closes." />
        <meta name="twitter:image" content="https://prolnk.io/og-image.png" />
        <link rel="canonical" href="https://prolnk.io/founding-partner" />
      </Helmet>

      {/* Nav */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <button onClick={() => navigate("/")} className="font-black text-teal-400 text-xl">ProLnk</button>
        <Button size="sm" className="bg-teal-500 hover:bg-teal-400 text-white" onClick={() => navigate(user ? "/dashboard" : "/pro-waitlist")}>
          {user ? "My Dashboard" : "Claim Your Spot"}
        </Button>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 mb-6 text-sm px-4 py-1.5">
          Founding Partner Program · {filled.toLocaleString()}/{TOTAL_SLOTS.toLocaleString()} spots filled
        </Badge>
        <h1 className="text-6xl font-black text-white leading-tight mb-6">
          The pros who build ProLnk<br />
          <span className="text-teal-400">get rewarded for life.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          2,125 founding spots — across 4 tiers. Once the waitlist closes, this status is gone forever.
          Lock in $149/mo, 72% keep rate, and permanent network income rights before someone else takes your position.
        </p>

        {/* Live spot counter */}
        <div className="max-w-md mx-auto mb-10">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">{filled.toLocaleString()} enrolled</span>
            <span className={`font-bold ${spotColor.text} flex items-center gap-1.5`}>
              {pct >= 75 && <AlertTriangle className="w-3.5 h-3.5" />}
              {remaining.toLocaleString()} remaining — {spotColor.label}
            </span>
          </div>
          <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${spotColor.bar} rounded-full transition-all duration-700`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Next available tier: <span className={`font-semibold ${nextTier.color}`}>{nextTier.name}</span> — {nextTier.range}
          </div>
        </div>

        {!user ? (
          <Button
            size="lg"
            onClick={() => navigate("/pro-waitlist")}
            className="bg-teal-500 hover:bg-teal-400 text-white font-black text-xl px-12 py-5 h-auto rounded-xl"
          >
            Claim Your Founding Spot
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        ) : myStatus.data ? (
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-6 max-w-sm mx-auto">
            <div className="text-teal-400 font-black text-2xl mb-1">
              {getTierForPosition(myStatus.data.enrollmentNumber ?? 9999).name} #{myStatus.data.enrollmentNumber}
            </div>
            <div className="text-gray-400 text-sm">{myStatus.data.status === "trial" ? "Trial period active" : "Active member"}</div>
          </div>
        ) : (
          <Button
            size="lg"
            onClick={() => navigate("/pro-waitlist")}
            className="bg-teal-500 hover:bg-teal-400 text-white font-black text-xl px-12 py-5 h-auto rounded-xl"
          >
            Claim Your Founding Spot →
          </Button>
        )}
      </section>

      {/* Tier breakdown */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-black text-white text-center mb-3">4 Tiers. One Program.</h2>
        <p className="text-gray-400 text-center text-sm mb-10 max-w-xl mx-auto">
          Every tier gets identical benefits — $149/mo locked, 72% keep, full network income. The only difference is how early you joined.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIERS.map((tier, i) => (
            <div key={i} className={`rounded-2xl p-5 border ${tier.bg} ${tier.border}`}>
              <div className={`font-black text-lg mb-1 ${tier.color}`}>{tier.name}</div>
              <div className="text-white font-bold text-2xl mb-1">{tier.slots.toLocaleString()} slots</div>
              <div className="text-gray-500 text-xs">{tier.range}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Founding benefits */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-black text-white text-center mb-3">What You Get — For Life</h2>
        <p className="text-gray-400 text-center text-sm mb-10 max-w-xl mx-auto">
          Every founding network member gets all six of these — guaranteed in your membership agreement.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FOUNDING_BENEFITS.map((benefit, i) => (
            <div key={i} className="bg-gray-900 rounded-2xl p-5 border border-gray-800 hover:border-teal-500/30 transition-all">
              <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 mb-4">
                {benefit.icon}
              </div>
              <div className="flex items-start gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <h3 className="font-bold text-white text-sm leading-snug">{benefit.title}</h3>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed pl-6">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Commission math example */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-black text-white">See the Math</h2>
            <p className="text-gray-400 text-sm mt-1">
              You and 3 recruits each complete a $3,000 job this month.
            </p>
          </div>
          <div className="divide-y divide-gray-800">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <div className="text-white font-semibold text-sm">Your $3,000 job</div>
                <div className="text-gray-500 text-xs mt-0.5">72% keep rate</div>
              </div>
              <div className="text-right">
                <div className="text-teal-400 font-black text-xl">$2,160</div>
                <div className="text-gray-500 text-xs">you keep</div>
              </div>
            </div>
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <div className="text-white font-semibold text-sm">L1 recruit's $3,000 job</div>
                <div className="text-gray-500 text-xs mt-0.5">7% of the 12% platform fee</div>
              </div>
              <div className="text-right">
                <div className="text-indigo-400 font-black text-xl">+$25</div>
                <div className="text-gray-500 text-xs">passive to you</div>
              </div>
            </div>
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <div className="text-white font-semibold text-sm">L2 recruit's $3,000 job</div>
                <div className="text-gray-500 text-xs mt-0.5">4% of the 12% platform fee</div>
              </div>
              <div className="text-right">
                <div className="text-indigo-400 font-black text-xl">+$14</div>
                <div className="text-gray-500 text-xs">passive to you</div>
              </div>
            </div>
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <div className="text-white font-semibold text-sm">L3 recruit's $3,000 job</div>
                <div className="text-gray-500 text-xs mt-0.5">2% of the 12% platform fee</div>
              </div>
              <div className="text-right">
                <div className="text-indigo-400 font-black text-xl">+$7</div>
                <div className="text-gray-500 text-xs">passive to you</div>
              </div>
            </div>
            <div className="px-6 py-5 flex items-center justify-between bg-teal-500/5">
              <div>
                <div className="text-white font-black">Total this month</div>
                <div className="text-gray-500 text-xs mt-0.5">1 job + 3 recruits each doing 1 job</div>
              </div>
              <div className="text-right">
                <div className="text-teal-400 font-black text-2xl">$2,206</div>
                <div className="text-gray-500 text-xs">$46 passive from your 3 recruits</div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-800/50 text-xs text-gray-500">
            Scale that to 10 recruits each doing 5 jobs/month and your passive network income compounds fast.
          </div>
        </div>
      </section>

      {/* Network commission rate card */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-black text-white">Your Network Earnings Rate Card</h2>
            <p className="text-gray-400 text-sm mt-1">These run automatically on every job and every subscription in your network.</p>
          </div>
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-800">
            <div className="p-6">
              <h3 className="font-bold text-teal-400 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Job Commissions (% of platform fee)
              </h3>
              <div className="space-y-2">
                {[
                  { level: "Level 1 (your direct recruits)", rate: "7%" },
                  { level: "Level 2 (their recruits)", rate: "4%" },
                  { level: "Level 3 (their recruits)", rate: "2%" },
                  { level: "Level 4 (their recruits)", rate: "1%" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                    <span className="text-gray-300 text-sm">{item.level}</span>
                    <span className="font-bold text-teal-400">{item.rate}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-indigo-400 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Subscription Commissions (monthly)
              </h3>
              <div className="space-y-2">
                {[
                  { level: "Level 1 (your direct recruits)", rate: "12%" },
                  { level: "Level 2 (their recruits)", rate: "6%" },
                  { level: "Level 3 (their recruits)", rate: "3%" },
                  { level: "Level 4 (their recruits)", rate: "1.5%" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                    <span className="text-gray-300 text-sm">{item.level}</span>
                    <span className="font-bold text-indigo-400">{item.rate}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-gray-800/50 rounded-xl p-3">
                <div className="flex items-center gap-2 text-teal-300 text-xs">
                  <Home className="w-3.5 h-3.5 shrink-0" />
                  Home Origination Rights: <strong>1.5%</strong> of platform fee per job, any documented address, forever
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-black text-white text-center mb-3">Early Partners Are Already In</h2>
        <p className="text-gray-400 text-center text-sm mb-10">Here's what they're saying about joining the founding network.</p>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <div className="flex items-start gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, si) => <Star key={si} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">"{t.quote}"</p>
              <div className="border-t border-gray-800 pt-4">
                <div className="font-bold text-white text-sm">{t.name}</div>
                <div className="text-gray-500 text-xs">{t.trade} — {t.location}</div>
                <div className={`text-xs font-semibold mt-1 ${t.tierColor}`}>{t.tier}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      {(p?.requirements ?? []).length > 0 && (
        <section className="max-w-3xl mx-auto px-6 py-8">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
            <h2 className="text-xl font-black text-white mb-6">What's Required of You</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {(p?.requirements ?? []).map((req: string, i: number) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  {req}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* My progress (if logged in and applied) */}
      {user && requirements.data && !myStatus.data && (
        <section className="max-w-3xl mx-auto px-6 py-8">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <h2 className="text-lg font-bold text-white mb-4">Your Progress</h2>
            <div className="space-y-2 mb-4">
              {Object.entries(requirements.data.progress)
                .filter(([k]) => typeof requirements.data.progress[k as keyof typeof requirements.data.progress] === "boolean")
                .map(([key, value]) => (
                  <div key={key} className={`flex items-center gap-2 text-sm ${value ? "text-green-400" : "text-gray-500"}`}>
                    {value ? <CheckCircle className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-gray-600" />}
                    {key.replace(/([A-Z])/g, " $1").replace(/^has /, "")}
                  </div>
                ))}
              <div className={`flex items-center gap-2 text-sm ${requirements.data.progress.homesAdded >= 15 ? "text-green-400" : "text-gray-500"}`}>
                {requirements.data.progress.homesAdded >= 15 ? <CheckCircle className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-gray-600" />}
                Homes added: {requirements.data.progress.homesAdded}/15
              </div>
              <div className={`flex items-center gap-2 text-sm ${requirements.data.progress.prosReferred >= 5 ? "text-green-400" : "text-gray-500"}`}>
                {requirements.data.progress.prosReferred >= 5 ? <CheckCircle className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-gray-600" />}
                Pros referred: {requirements.data.progress.prosReferred}/5
              </div>
            </div>
            {requirements.data.meetsAll ? (
              <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4 text-center">
                <CheckCircle className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                <p className="text-teal-400 font-semibold">All requirements met! Contact ProLnk to activate your Founding Partner status.</p>
              </div>
            ) : (
              <p className="text-gray-500 text-xs">Complete all requirements above to qualify for Founding Partner enrollment.</p>
            )}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-b from-teal-500/10 to-transparent border border-teal-500/20 rounded-3xl p-12">
          <h2 className="text-4xl font-black text-white mb-3">
            {remaining > 0 ? `${remaining.toLocaleString()} spots left.` : "Enrollment closed."}
          </h2>
          <p className="text-gray-400 mb-3 text-lg">
            Once the waitlist closes, founding network status is gone forever.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            No extensions. No exceptions. 2,125 pros max — ever.
          </p>
          {remaining > 0 ? (
            <Button
              size="lg"
              onClick={() => navigate(user ? "/dashboard/onboarding" : "/pro-waitlist")}
              className="bg-teal-500 hover:bg-teal-400 text-white font-black text-lg px-10 py-4 h-auto rounded-xl"
            >
              {user ? "Complete My Application" : "Claim Your Founding Spot →"}
              {!user && <ArrowRight className="w-5 h-5 ml-2" />}
            </Button>
          ) : (
            <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-sm px-6 py-3">
              Enrollment Closed — {TOTAL_SLOTS.toLocaleString()}/{TOTAL_SLOTS.toLocaleString()} Founding Partners Enrolled
            </Badge>
          )}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-600">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> 90-day free trial</span>
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> $149/mo locked forever</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> No credit card to start</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-8 text-center text-gray-600 text-sm">
        © 2026 ProLnk LLC · DFW, Texas · <a href="/legal/terms" className="hover:text-gray-400">Terms</a> · <a href="/legal/privacy" className="hover:text-gray-400">Privacy</a>
      </footer>
      <BackToTop />
    </div>
  );
}
