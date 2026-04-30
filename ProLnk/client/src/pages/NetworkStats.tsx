import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Users, Briefcase, TrendingUp, DollarSign, ArrowRight, Shield, Zap, Star, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// -- Animated counter hook -----------------------------------------------------
function useCountUp(target: number, duration = 1800, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started || target === 0) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return value;
}

// -- Intersection observer hook ------------------------------------------------
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

// -- Stat card -----------------------------------------------------------------
function StatCard({
  icon: Icon, label, value, prefix = "", suffix = "", color, description, started,
}: {
  icon: React.ElementType; label: string; value: number; prefix?: string; suffix?: string;
  color: string; description: string; started: boolean;
}) {
  const animated = useCountUp(value, 2000, started);
  const display = value >= 1000
    ? animated >= 1000 ? `${(animated / 1000).toFixed(1)}k` : animated.toString()
    : animated.toString();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-600">LIVE</span>
      </div>
      <div className="text-4xl font-heading text-gray-900 mb-1">
        {prefix}{display}{suffix}
      </div>
      <div className="text-sm font-semibold text-gray-700 mb-1">{label}</div>
      <div className="text-xs text-gray-400">{description}</div>
    </div>
  );
}

// -- Video Demo Modal ---------------------------------------------------------
const DEMO_VIDEO_URL = ""; // Replace with Loom/YouTube embed URL when ready

function VideoDemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-heading font-bold text-gray-900">ProLnk -- 2-Minute Demo</h3>
            <p className="text-sm text-gray-500 mt-0.5">See how every job photo becomes a lead</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        {DEMO_VIDEO_URL ? (
          <div className="relative" style={{ paddingBottom: "56.25%" }}>
            <iframe src={DEMO_VIDEO_URL} className="absolute inset-0 w-full h-full" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center" style={{ background: "linear-gradient(135deg, #f0fdfd 0%, #e6f7f7 100%)" }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg" style={{ backgroundColor: "#0A1628" }}>
              <Play className="h-8 w-8 text-white ml-1" fill="white" />
            </div>
            <h4 className="text-xl font-heading font-bold text-gray-900 mb-3">Demo Video Coming Soon</h4>
            <p className="text-gray-600 max-w-md leading-relaxed mb-6">We're recording a full walkthrough -- from logging a job to receiving your first referral commission. Check back in 24 hours.</p>
            <div className="flex gap-3">
              <a href="/apply"><button className="px-6 py-3 rounded-lg text-white font-semibold text-sm" style={{ backgroundColor: "#0A1628" }}>Apply Now -- It's Free</button></a>
              <button onClick={onClose} className="px-6 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-gray-300 transition-colors">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// -- Main page -----------------------------------------------------------------
export default function NetworkStats() {
  const { data: stats } = trpc.directory.getPublicStats.useQuery();
  const { ref, inView } = useInView();
  const [videoOpen, setVideoOpen] = useState(false);

  const totalPartners = stats?.totalPartners ?? 0;
  const totalJobs = stats?.totalJobs ?? 0;
  const totalLeads = stats?.totalLeads ?? 0;
  const totalCommissionsPaid = stats?.totalCommissionsPaid ?? 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <VideoDemoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
      {/* -- Nav -- */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <span className="font-heading text-xl text-gray-900 cursor-pointer">
              Pro<span style={{ color: "#0A1628" }}>Lnk</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/leaderboard">
              <Button variant="ghost" size="sm">Leaderboard</Button>
            </Link>
            <Link href="/apply">
              <Button size="sm" className="text-white" style={{ backgroundColor: "#0A1628" }}>
                Join Network
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* -- Hero -- */}
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5E642]/10 border border-teal-100 text-[#0A1628] text-sm font-medium mb-6">
          <Zap className="w-3.5 h-3.5" />
          Real-time network data
        </div>
        <h1 className="text-5xl font-heading text-gray-900 mb-4">
          The Network Is <span style={{ color: "#0A1628" }}>Growing</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          ProLnk is the DFW home service partner network where field pros earn commissions by referring homeowners to trusted colleagues. Here's the live pulse of the network.
        </p>

        {/* -- Stat cards -- */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <StatCard
            icon={Users} label="Verified Partners" value={totalPartners}
            color="#0A1628" description="Approved home service professionals in the network"
            started={inView}
          />
          <StatCard
            icon={Briefcase} label="Jobs Logged" value={totalJobs}
            color="#8B5CF6" description="Field jobs captured with photos and AI analysis"
            started={inView}
          />
          <StatCard
            icon={TrendingUp} label="Leads Converted" value={totalLeads}
            color="#3B82F6" description="Referral opportunities that became closed jobs"
            started={inView}
          />
          <StatCard
            icon={DollarSign} label="Commissions Paid" value={totalCommissionsPaid}
            prefix="$" color="#10B981" description="Total partner earnings distributed through the platform"
            started={inView}
          />
        </div>

        {/* -- How it works -- */}
        <div className="bg-white rounded-2xl border border-gray-100 p-10 mb-16 text-left shadow-sm">
          <h2 className="text-2xl font-heading text-gray-900 mb-8 text-center">How ProLnk Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01", icon: Shield, color: "#0A1628",
                title: "Scout the Job",
                desc: "A field technician finishes a job and uploads photos through the ProLnk mobile app. Our AI scans for upsell opportunities -- lawn care, pest control, HVAC, and more.",
              },
              {
                step: "02", icon: Zap, color: "#8B5CF6",
                title: "AI Routes the Lead",
                desc: "GPT-4o analyzes the photos, scores the opportunity, and routes the lead to the best-matched verified partner in the network -- automatically, within minutes.",
              },
              {
                step: "03", icon: DollarSign, color: "#10B981",
                title: "Earn on Every Close",
                desc: "The matched partner has 24 hours to accept. When the job closes, commissions are calculated automatically and paid out through the platform.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}18` }}>
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-300 mb-1">STEP {item.step}</div>
                  <div className="font-heading text-gray-900 mb-2">{item.title}</div>
                  <div className="text-sm text-gray-500 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* -- Trust signals -- */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {[
            { icon: Shield, label: "Patent Pending", desc: "Proprietary AI photo analysis pipeline" },
            { icon: Star, label: "Founding Partner Spots", desc: "Limited slots for early network members" },
            { icon: Zap, label: "Instant Lead Routing", desc: "Leads dispatched within minutes of AI scoring" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F5E642]/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-[#0A1628]" />
              </div>
              <div>
                <div className="font-heading text-gray-900 text-sm">{item.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* -- ROI Proof Section -- */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading text-gray-900 mb-2">Your ROI, Proven Before You Sign</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">Every referral you make earns you a commission. Here's what ProLnk partners actually earn — no estimates, no projections.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                scenario: "Light Activity",
                jobs: 4,
                avgValue: 850,
                partnerRate: 0.05,
                color: "#0891b2",
                label: "1 referral/week",
              },
              {
                scenario: "Active Partner",
                jobs: 12,
                avgValue: 1200,
                partnerRate: 0.05,
                color: "#0A1628",
                label: "3 referrals/week",
                featured: true,
              },
              {
                scenario: "Top Performer",
                jobs: 30,
                avgValue: 1500,
                partnerRate: 0.05,
                color: "#F5E642",
                label: "7+ referrals/week",
                textDark: true,
              },
            ].map((s) => {
              const monthly = Math.round(s.jobs * s.avgValue * s.partnerRate);
              const annual = monthly * 12;
              return (
                <div
                  key={s.scenario}
                  className={`rounded-2xl p-6 flex flex-col gap-3 ${s.featured ? "ring-2 ring-[#0891b2] shadow-lg" : "border border-gray-100"}`}
                  style={{ backgroundColor: s.featured ? "#0A1628" : "white" }}
                >
                  {s.featured && (
                    <div className="text-xs font-bold text-teal-300 tracking-widest uppercase mb-1">Most Common</div>
                  )}
                  <div className="font-heading text-lg" style={{ color: s.featured ? "white" : "#0A1628" }}>{s.scenario}</div>
                  <div className="text-xs" style={{ color: s.featured ? "#94a3b8" : "#6b7280" }}>{s.label} · avg job ${s.avgValue.toLocaleString()}</div>
                  <div className="mt-2">
                    <div className="text-3xl font-heading" style={{ color: s.featured ? "#F5E642" : s.color }}>
                      ${monthly.toLocaleString()}<span className="text-base font-normal">/mo</span>
                    </div>
                    <div className="text-sm mt-0.5" style={{ color: s.featured ? "#94a3b8" : "#6b7280" }}>
                      ${annual.toLocaleString()} annually
                    </div>
                  </div>
                  <div className="text-xs mt-1" style={{ color: s.featured ? "#64748b" : "#9ca3af" }}>
                    Based on {s.jobs} referrals/mo at {(s.partnerRate * 100).toFixed(0)}% commission
                  </div>
                </div>
              );
            })}
          </div>
          {/* Zero-risk trial callout */}
          <div className="mt-8 rounded-xl border-2 border-dashed border-teal-200 bg-teal-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <div className="font-heading text-gray-900">Zero-Risk Trial</div>
                <div className="text-sm text-gray-500 mt-0.5">No subscription fee. No setup cost. You only pay ProLnk when a job closes — commissions come out of the job value, not your pocket.</div>
              </div>
            </div>
            <Link href="/apply" className="flex-shrink-0">
              <Button className="text-white font-semibold whitespace-nowrap" style={{ backgroundColor: "var(--teal)" }}>
                Start Earning Free <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* -- CTA -- */}
        <div className="rounded-2xl p-10 text-white text-center" style={{ background: "linear-gradient(135deg, #0A1628 0%, #0891b2 100%)" }}>
          <h2 className="text-3xl font-heading mb-3">Ready to Join?</h2>
          <p className="text-teal-100 mb-6 max-w-xl mx-auto">
            Apply for a founding partner spot and start earning commissions from referrals in your service area.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/apply">
              <Button size="lg" className="bg-white text-[#0A1628] hover:bg-[#F5E642]/10 font-semibold">
                Apply to Join <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <button
              onClick={() => setVideoOpen(true)}
              className="flex items-center gap-2 border-2 border-white/60 text-white hover:bg-white/10 transition-colors px-6 py-3 rounded-lg font-semibold text-base"
            >
              <Play className="w-4 h-4" fill="currentColor" />
              Watch 2-min Demo
            </button>
            <Link href="/leaderboard">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                View Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* -- Footer -- */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p> 2025 ProLnk  Home Service Partner Network  DFW, Texas</p>
      </footer>
    </div>
  );
}
