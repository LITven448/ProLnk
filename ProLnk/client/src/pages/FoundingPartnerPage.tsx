/**
 * Founding Partner Landing Page
 * Route: /founding-partner
 * Public — shows the program details and enrollment CTA.
 * Also serves as the partner's personal founding partner dashboard when logged in.
 */

import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Lock, DollarSign, RefreshCw, Calendar, Home, Zap, CheckCircle,
  Star, Users, TrendingUp, ArrowRight, Shield, Award,
} from "lucide-react";

const BENEFIT_ICONS: Record<string, React.ReactNode> = {
  "🔒": <Lock className="w-6 h-6" />,
  "💰": <DollarSign className="w-6 h-6" />,
  "🔄": <RefreshCw className="w-6 h-6" />,
  "📅": <Calendar className="w-6 h-6" />,
  "🏠": <Home className="w-6 h-6" />,
  "⚡": <Zap className="w-6 h-6" />,
  "✅": <Shield className="w-6 h-6" />,
  "🎉": <Award className="w-6 h-6" />,
};

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
  const pct = Math.min(100, (filled / 100) * 100);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Nav */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <button onClick={() => navigate("/")} className="font-black text-teal-400 text-xl">ProLnk</button>
        <Button size="sm" className="bg-teal-500 hover:bg-teal-400 text-white" onClick={() => navigate(user ? "/dashboard" : "/apply")}>
          {user ? "My Dashboard" : "Apply to Join"}
        </Button>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 mb-6 text-sm px-4 py-1.5">
          Founding Partner Program · {filled}/100 slots filled
        </Badge>
        <h1 className="text-6xl font-black text-white leading-tight mb-6">
          The first 100 pros to<br />
          <span className="text-teal-400">build ProLnk with us.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          This is a permanent status — not a tier, not a title. Once the 100 slots close, they're closed forever.
          Founding Partners are the people who believed early and get rewarded for life.
        </p>

        {/* Progress bar */}
        <div className="max-w-sm mx-auto mb-10">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{filled} enrolled</span>
            <span>{100 - filled} remaining</span>
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {!user ? (
          <Button size="lg" onClick={() => navigate("/apply?founding=1")} className="bg-teal-500 hover:bg-teal-400 text-white font-black text-xl px-12 py-5 h-auto rounded-xl">
            Apply for a Founding Partner Slot
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        ) : myStatus.data ? (
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-6 max-w-sm mx-auto">
            <div className="text-teal-400 font-black text-2xl mb-1">Founding Partner #{myStatus.data.enrollmentNumber}</div>
            <div className="text-gray-400 text-sm">{myStatus.data.status === "trial" ? "Trial period active" : "Active member"}</div>
          </div>
        ) : (
          <Button size="lg" onClick={() => navigate("/apply?founding=1")} className="bg-teal-500 hover:bg-teal-400 text-white font-black text-xl px-12 py-5 h-auto rounded-xl">
            Apply for Founding Partner Status
          </Button>
        )}
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-white text-center mb-12">What You Get — For Life</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(p?.benefits ?? []).map((benefit: any, i: number) => (
            <div key={i} className="bg-gray-800 rounded-2xl p-5 border border-gray-700 hover:border-teal-500/30 transition-all">
              <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 mb-4">
                {BENEFIT_ICONS[benefit.icon] ?? <Star className="w-6 h-6" />}
              </div>
              <h3 className="font-bold text-white text-sm mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Network commission table */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-black text-white">Your Network Earnings Rate Card</h2>
            <p className="text-gray-400 text-sm mt-1">These run automatically on every job and every subscription in your network.</p>
          </div>
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-700">
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
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
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
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                    <span className="text-gray-300 text-sm">{item.level}</span>
                    <span className="font-bold text-indigo-400">{item.rate}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-gray-700/50 rounded-xl p-3">
                <div className="flex items-center gap-2 text-home-400 text-xs text-teal-300">
                  <Home className="w-3.5 h-3.5" />
                  Home Origination Rights: <strong>1.5%</strong> of platform fee per job, any documented address, forever
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
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

      {/* My progress (if logged in and applied) */}
      {user && requirements.data && !myStatus.data && (
        <section className="max-w-3xl mx-auto px-6 py-8">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
            <h2 className="text-lg font-bold text-white mb-4">Your Progress</h2>
            <div className="space-y-2 mb-4">
              {Object.entries(requirements.data.progress).filter(([k]) => typeof requirements.data.progress[k as keyof typeof requirements.data.progress] === "boolean").map(([key, value]) => (
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

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-black text-white mb-4">
          {filled < 100 ? `${100 - filled} spots left.` : "Enrollment closed."}
        </h2>
        <p className="text-gray-400 mb-8">This is the only time you can get founding partner status. Once it's gone, it's gone.</p>
        {filled < 100 ? (
          <Button size="lg" onClick={() => navigate(user ? "/dashboard/onboarding" : "/apply?founding=1")} className="bg-teal-500 hover:bg-teal-400 text-white font-black text-lg px-10 py-4 h-auto rounded-xl">
            {user ? "Complete My Application" : "Apply Now"} <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        ) : (
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-sm px-6 py-3">
            Enrollment Closed — 100/100 Founding Partners Enrolled
          </Badge>
        )}
      </section>

      <footer className="border-t border-gray-800 py-8 text-center text-gray-600 text-sm">
        © 2026 ProLnk LLC · DFW, Texas · <a href="/legal/terms" className="hover:text-gray-400">Terms</a> · <a href="/legal/privacy" className="hover:text-gray-400">Privacy</a>
      </footer>
    </div>
  );
}
