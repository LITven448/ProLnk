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
  Shield, TrendingUp, Clock,
} from "lucide-react";

const BENEFITS = [
  { icon: <Camera className="w-5 h-5 text-yellow-400" />, title: "Every before & after photo becomes a lead", desc: "Take before and after photos of every job — or connect CompanyCam/Jobber and we extract them automatically. Our AI detects what else the homeowner needs and routes those leads to the right partner." },
  { icon: <DollarSign className="w-5 h-5 text-yellow-400" />, title: "Earn while you work", desc: "Keep 40–78% of every commission. Starter tier is free forever." },
  { icon: <Zap className="w-5 h-5 text-yellow-400" />, title: "Inbound leads, zero cold calls", desc: "Receive pre-qualified leads from other pros in the network — no marketing spend required." },
  { icon: <TrendingUp className="w-5 h-5 text-yellow-400" />, title: "Tier up as you grow", desc: "Starter → Pro → Teams. Higher tiers unlock priority routing and higher commission splits." },
];

export default function WaitlistProLanding() {
  const [, navigate] = useLocation();

  const stats = trpc.waitlist.getPublicCounts.useQuery(undefined, { refetchInterval: 60000 });
  const proCount = (stats.data?.pros as number) ?? 0;
  const spotsLeft = Math.max(0, 1000 - proCount);
  const pct = Math.min(100, Math.round((proCount / 1000) * 100));

  // ── Landing ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: "#050d1a" }}>
      <SEO
        title="Join ProLnk — Partner Waitlist"
        description="Apply to join the ProLnk partner network. AI-powered lead routing, earn commissions on every referral, and grow your home service business."
        path="/waitlist/pro"
      />
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
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-semibold mb-6">
          <Clock className="w-3.5 h-3.5" />
          DFW Launch — Limited to First 1,000 Pros
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
          Turn Every Job Photo<br />
          <span className="text-yellow-400">Into a New Lead</span>
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
          ProLnk is an AI-powered referral network for home service pros. Upload job photos, our AI detects what else the homeowner needs, and routes those leads to the right partner. You earn commissions. Automatically.
        </p>

        {/* Live Counter */}
        <div className="max-w-sm mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/60 text-sm font-medium">Pros on the waitlist</span>
            <span className="text-yellow-400 font-black text-2xl">{proCount.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-yellow-400 rounded-full transition-all duration-1000"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-white/40">
            <span>{pct}% of 1,000 founding spots filled</span>
            <span className="text-yellow-400/70 font-semibold">{spotsLeft.toLocaleString()} left</span>
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

      {/* Final CTA */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="p-8 rounded-3xl bg-yellow-400/5 border border-yellow-400/20">
          <Shield className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-3">Founding Member Benefits</h2>
          <p className="text-white/60 mb-6">
            The first 1,000 pros lock in founding member pricing — no rate increases, ever. Plus priority lead routing when we launch.
          </p>
          <Button
            onClick={() => navigate("/pro-waitlist")}
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-10 py-4 rounded-xl w-full"
          >
            Join the Waitlist — Free <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center">
        <ProLnkLogo height={24} />
        <p className="text-white/30 text-xs mt-3">© 2026 ProLnk. DFW, Texas. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-3">
          <a href="https://prolnk.io" className="text-white/30 hover:text-white/60 text-xs">ProLnk.io</a>
          <a href="/home-waitlist" className="text-white/30 hover:text-white/60 text-xs">Homeowner Waitlist</a>
        </div>
      </footer>
    </div>
  );
}
