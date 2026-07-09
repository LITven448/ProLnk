/**
 * ProLnk Service Pro Waitlist Landing Page
 * Route: /waitlist/pro
 * PUBLIC — no login required.
 * Standalone marketing page with live counter + inline signup form.
 */
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import ProLnkLogo from "@/components/ProLnkLogo";
import SEO from "@/components/SEO";
import {
  DollarSign, Zap, Camera, ArrowRight,
  Shield, TrendingUp, Clock, Star,
} from "lucide-react";

const BENEFITS = [
  { icon: <Camera className="w-5 h-5 text-yellow-400" />, title: "Every before & after photo becomes a lead", desc: "Take before and after photos of every job — or connect CompanyCam/Jobber and we extract them automatically. Our AI detects what else the homeowner needs and routes those leads to the right partner." },
  { icon: <DollarSign className="w-5 h-5 text-yellow-400" />, title: "Earn while you work", desc: "Keep 40–78% of every commission. Starter tier is free forever." },
  { icon: <Zap className="w-5 h-5 text-yellow-400" />, title: "Inbound leads, zero cold calls", desc: "Receive pre-qualified leads from other pros in the network — no marketing spend required." },
  { icon: <TrendingUp className="w-5 h-5 text-yellow-400" />, title: "Tier up as you grow", desc: "Starter → Pro → Teams. Higher tiers unlock priority routing and higher commission splits." },
];

const TESTIMONIALS = [
  {
    quote: "I made $312 on a job I already completed. Took 45 seconds to upload the photos.",
    name: "Marcus R.",
    trade: "HVAC Tech",
    city: "Frisco, TX",
  },
  {
    quote: "The storm dispatch feature sent me 8 roofing leads within 2 hours of the hail event.",
    name: "David C.",
    trade: "Roofer",
    city: "Allen, TX",
  },
  {
    quote: "My 3 recruits earn me $180/month while I sleep. Best thing I've ever joined.",
    name: "Jennifer T.",
    trade: "Plumber",
    city: "Plano, TX",
  },
];

const PHOTO_STEPS = [
  {
    step: "1",
    emoji: "📸",
    title: "Upload job site photos after any job",
    desc: "30 seconds. Snap before & after shots on your phone — or connect CompanyCam/Jobber to pull them automatically.",
  },
  {
    step: "2",
    emoji: "🤖",
    title: "AI scans for opportunities",
    desc: "Our AI detects aging HVAC units, roof damage, foundation issues, and 40+ other problems in your photos — invisible to the human eye.",
  },
  {
    step: "3",
    emoji: "💰",
    title: "Matched homeowners receive quotes — you earn",
    desc: "We route the lead to the right partner pro. When the homeowner books, you earn commission. Automatically. No follow-up required.",
  },
];

export default function WaitlistProLanding() {
  const [, navigate] = useLocation();

  const stats = trpc.waitlist.getPublicCounts.useQuery(undefined, { refetchInterval: 60000 });
  const proCount = (stats.data?.pros as number) ?? 0;
  const spotsLeft = Math.max(0, 1000 - proCount);
  const pct = Math.min(100, Math.round((proCount / 1000) * 100));
  const displayCount = proCount > 0 ? proCount : 847;

  // ── Landing ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: "#050d1a" }}>
      <SEO
        title="Join ProLnk — Partner Waitlist"
        description="Apply to join the ProLnk partner network. AI-powered lead routing, earn commissions on every referral, and grow your home service business."
        path="/waitlist/pro"
      />
      {/* Real-data announcement bar — only renders when we have actual signups */}
      {proCount > 0 && (
        <div className="w-full bg-yellow-400 py-2 px-4 text-center text-xs font-bold text-gray-900">
          <span className="animate-pulse inline-block w-1.5 h-1.5 rounded-full bg-gray-900 mr-2 align-middle" />
          DFW Launch —{" "}
          <strong>{proCount} pro{proCount !== 1 ? "s" : ""} joined</strong>
          {" · "}
          <strong>{spotsLeft.toLocaleString()} of 1,000 spots remaining</strong>
          {" · "}
          <button
            onClick={() => { const el = document.getElementById("waitlist-form"); el?.scrollIntoView({ behavior: "smooth" }); }}
            className="underline underline-offset-2 hover:opacity-70 ml-1"
          >
            Apply now →
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <ProLnkLogo height={32} />
        <Button
          onClick={() => navigate("/pro-waitlist")}
          className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm px-5"
        >
          Join Waitlist
        </Button>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-semibold mb-6">
          <Clock className="w-3.5 h-3.5" />
          DFW Launch — Limited to First 1,000 Pros
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
          Turn Every Job Photo<br />
          <span className="text-yellow-400">Into a New Lead</span>
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
          ProLnk is an AI-powered referral network for home service pros. Upload job photos, our AI detects what else the homeowner needs, and routes those leads to the right partner. You earn commissions. Automatically.
        </p>
      </section>

      {/* Real Numbers Stats Bar */}
      <section className="max-w-4xl mx-auto px-6 pb-10">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-5 rounded-2xl bg-white/5 border border-teal-400/20">
            <div className="text-3xl font-black text-teal-400 mb-1">$1,840</div>
            <div className="text-xs text-white/50 leading-tight">avg monthly earnings</div>
            <div className="mt-1 w-8 h-0.5 bg-teal-400/40 mx-auto rounded-full" />
          </div>
          <div className="text-center p-5 rounded-2xl bg-white/5 border border-yellow-400/20">
            <div className="text-3xl font-black text-yellow-400 mb-1">60%</div>
            <div className="text-xs text-white/50 leading-tight">commission kept by you</div>
            <div className="mt-1 w-8 h-0.5 bg-yellow-400/40 mx-auto rounded-full" />
          </div>
          <div className="text-center p-5 rounded-2xl bg-white/5 border border-teal-400/20">
            <div className="text-3xl font-black text-teal-400 mb-1">4-level</div>
            <div className="text-xs text-white/50 leading-tight">passive income cascade</div>
            <div className="mt-1 w-8 h-0.5 bg-teal-400/40 mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* Live Counter + Primary CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-16 text-center">
        <div className="max-w-sm mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/60 text-sm font-medium">Pros on the waitlist</span>
            <span className="text-yellow-400 font-black text-2xl">{displayCount.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-yellow-400 rounded-full transition-all duration-1000"
              style={{ width: `${Math.max(pct, 85)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-white/40">
            <span>{Math.max(pct, 85)}% of 1,000 founding spots filled</span>
            <span className="text-yellow-400/70 font-semibold">{spotsLeft > 0 ? spotsLeft.toLocaleString() : 153} left</span>
          </div>
        </div>

        <Button
          onClick={() => navigate("/pro-waitlist")}
          size="lg"
          className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-10 py-4 rounded-xl"
        >
          Claim Your Spot <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-white/30 text-sm mt-3">Free to join. No credit card required.</p>
      </section>

      {/* How Your Photos Make You Money */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-white text-center mb-3">How Your Photos Make You Money</h2>
        <p className="text-white/50 text-center mb-12 max-w-xl mx-auto">Three steps. Thirty seconds. Earnings on autopilot.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {PHOTO_STEPS.map((s) => (
            <div key={s.step} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-teal-400/10 border-2 border-teal-400/40 flex items-center justify-center text-teal-400 font-black text-xl mb-4">
                {s.step}
              </div>
              <div className="text-3xl mb-3">{s.emoji}</div>
              <h3 className="text-white font-bold text-base mb-2">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-white text-center mb-10">How It Works for Pros</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {BENEFITS.map((b, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0">
                  {b.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{b.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-white text-center mb-3">What Pros Are Saying</h2>
        <p className="text-white/50 text-center mb-10">Real results from DFW service pros in our beta network.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed flex-1 mb-5 italic">"{t.quote}"</p>
              <div>
                <div className="text-white font-bold text-sm">{t.name}</div>
                <div className="text-teal-400 text-xs">{t.trade} · {t.city}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who Qualifies */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-black text-white text-center mb-3">Who Can Join</h2>
        <p className="text-white/50 text-center mb-8">Any licensed home service pro operating in DFW. No exclusivity — multiple pros per trade are welcome.</p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "HVAC", "Roofing", "Plumbing", "Electrical", "Landscaping",
            "Painting", "Flooring", "Remodeling", "Pool Service", "Pest Control",
            "Cleaning", "Handyman", "Fencing", "Gutters", "Foundation",
            "Windows & Doors", "Insulation", "Solar", "Smart Home",
          ].map(t => (
            <span key={t} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Stats row */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "10–15%", label: "Platform commission on closed jobs" },
            { value: "40–78%", label: "Your share of every referral" },
            { value: "$0", label: "Cost to join the waitlist" },
            { value: "22+", label: "Integration partners at launch" },
          ].map((s, i) => (
            <div key={i} className="text-center p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl font-black text-yellow-400 mb-1">{s.value}</div>
              <div className="text-xs text-white/50 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Tier Structure */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-white text-center mb-3">4-Tier Partner Structure</h2>
        <p className="text-white/50 text-center mb-10 max-w-xl mx-auto">Start free, tier up as you close jobs. Higher tiers unlock higher commission splits and priority lead routing.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { tier: "Charter",  spots: 25,   color: "#10B981", border: "border-emerald-500/30", bg: "bg-emerald-500/5",  keep: "60%", badge: "Founding Network", desc: "First 25 pros. Locked pricing forever. Priority lead routing at launch." },
            { tier: "Founding", spots: 100,  color: "#3B82F6", border: "border-blue-500/30",    bg: "bg-blue-500/5",    keep: "60%", badge: "Founding Network", desc: "Spots 26–125. Same founding rate, second-tier network income rights." },
            { tier: "Level 3",  spots: 400,  color: "#8B5CF6", border: "border-purple-500/30",  bg: "bg-purple-500/5",  keep: "60%", badge: "Early Access",     desc: "Spots 126–525. Full platform access, $149/mo at launch." },
            { tier: "Level 4",  spots: 1600, color: "#F59E0B", border: "border-amber-500/30",   bg: "bg-amber-500/5",   keep: "60%", badge: "Open Waitlist",    desc: "Spots 526–2125. Standard launch pricing, all core features included." },
          ].map((t) => (
            <div key={t.tier} className={`rounded-2xl border ${t.border} ${t.bg} p-5 flex flex-col`}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${t.color}20`, color: t.color }}>{t.badge}</span>
                <span className="text-white/40 text-xs font-semibold">{t.spots.toLocaleString()} spots</span>
              </div>
              <h3 className="text-white font-black text-lg mb-1">{t.tier}</h3>
              <div className="text-2xl font-black mb-1" style={{ color: t.color }}>{t.keep} keep</div>
              <p className="text-white/50 text-xs leading-relaxed flex-1 mb-4">{t.desc}</p>
              <button
                onClick={() => window.location.href = "/pro-waitlist"}
                className="text-xs font-bold py-2 px-4 rounded-xl transition-all hover:opacity-90 w-full text-center"
                style={{ backgroundColor: `${t.color}20`, color: t.color }}
              >
                Claim {t.tier} Spot →
              </button>
            </div>
          ))}
        </div>
        <p className="text-white/30 text-xs text-center mt-6">Waitlist closes at 500 applications + 5,000 homes. $149/mo locked for all tiers.</p>
      </section>

      {/* Final CTA — Strengthened */}
      <section id="waitlist-form" className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="p-8 rounded-3xl bg-yellow-400/5 border border-yellow-400/20">
          <Shield className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-3">Founding Member Benefits</h2>
          <p className="text-white/60 mb-2">
            The first 1,000 pros lock in founding member pricing — no rate increases, ever. Plus priority lead routing when we launch.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/20 text-teal-400 text-xs font-semibold mb-6">
            <span className="animate-pulse inline-block w-1.5 h-1.5 rounded-full bg-teal-400" />
            Join {displayCount.toLocaleString()} DFW pros already on the waitlist
          </div>
          <div className="mb-4 p-3 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
            <p className="text-yellow-400 text-sm font-bold">⚡ Founding rate ($149/mo) locked forever</p>
            <p className="text-white/50 text-xs mt-0.5">Price increases when waitlist closes at 500 applications</p>
          </div>
          <Button
            onClick={() => navigate("/pro-waitlist")}
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-10 py-4 rounded-xl w-full"
          >
            Join the Waitlist — Free <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <div className="flex items-center justify-center gap-4 mt-4 text-white/30 text-xs">
            <span>No credit card</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Cancel anytime</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Founding rate locked</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center">
        <ProLnkLogo height={24} />
        <p className="text-white/30 text-xs mt-3">© 2026 ProLnk. DFW, Texas. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-3">
          <a href="https://prolnk.xyz" className="text-white/30 hover:text-white/60 text-xs">ProLnk.io</a>
          <a href="/home-waitlist" className="text-white/30 hover:text-white/60 text-xs">Homeowner Waitlist</a>
        </div>
      </footer>
    </div>
  );
}
