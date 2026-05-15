/**
 * ProLnk Media — Advertise With Us
 * Cinematic scroll experience with Three.js particle network,
 * Framer Motion reveals, animated counters, and interactive mockups.
 */
import { useRef, useEffect, useState, lazy, Suspense } from "react";
import {
  motion, useScroll, useTransform, useInView,
  useMotionValue, useSpring, AnimatePresence, animate,
} from "framer-motion";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  ArrowRight, ChevronDown, CheckCircle, Eye, Zap, MapPin,
  BarChart3, Shield, MousePointerClick, TrendingUp, X, Sparkles
} from "lucide-react";
import ProLnkLogo from "@/components/ProLnkLogo";

// Lazy-load Three.js scene to avoid blocking initial render
const NetworkParticles = lazy(() => import("@/components/NetworkParticles"));

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "", prefix = "", duration = 2 }: {
  to: number; suffix?: string; prefix?: string; duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = prefix + Math.floor(v).toLocaleString() + suffix;
      },
    });
    return controls.stop;
  }, [inView]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────
function Reveal({
  children, delay = 0, y = 60, x = 0, scale = 1,
}: { children: React.ReactNode; delay?: number; y?: number; x?: number; scale?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x, scale }}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Glowing text gradient ────────────────────────────────────────────────────
const goldText = {
  background: "linear-gradient(135deg, #F5C518 0%, #ffb700 40%, #F5C518 100%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

// ─── Interactive dashboard mockup ─────────────────────────────────────────────
function DashboardMockup({ glowing = false }: { glowing?: boolean }) {
  return (
    <div
      className="rounded-2xl overflow-hidden border shadow-2xl"
      style={{
        background: "#0a0f1a",
        borderColor: glowing ? "rgba(245,197,24,0.25)" : "rgba(255,255,255,0.07)",
        boxShadow: glowing ? "0 0 80px rgba(245,197,24,0.08), 0 25px 60px rgba(0,0,0,0.6)" : "0 25px 60px rgba(0,0,0,0.5)",
      }}
    >
      {/* Browser bar */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#0d1424", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex gap-1.5">
          {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c, opacity: 0.7 }} />)}
        </div>
        <div className="flex-1 mx-3 rounded-md px-3 py-1 text-xs text-gray-600" style={{ background: "rgba(255,255,255,0.04)" }}>
          app.trustypro.io/my-home
        </div>
      </div>

      {/* Dashboard body */}
      <div className="p-5">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-5">
          <div className="h-2.5 w-20 rounded-full bg-white/10" />
          <div className="flex gap-2">
            {[1,2].map(i => <div key={i} className="h-2.5 w-12 rounded-full bg-white/6" />)}
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {["bg-indigo-500/10","bg-teal-500/10","bg-amber-500/10"].map((bg, i) => (
            <div key={i} className={`rounded-xl p-3 ${bg}`}>
              <div className="h-1.5 w-10 rounded-full bg-white/15 mb-2" />
              <div className="h-4 w-8 rounded-full bg-white/25" />
            </div>
          ))}
        </div>

        {/* The ad slot — featured partner card */}
        <motion.div
          animate={glowing ? {
            boxShadow: [
              "0 0 0 1px rgba(245,197,24,0.15)",
              "0 0 0 2px rgba(245,197,24,0.4)",
              "0 0 0 1px rgba(245,197,24,0.15)",
            ]
          } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-xl p-4 mb-3 border"
          style={{
            background: "linear-gradient(135deg, rgba(245,197,24,0.07) 0%, rgba(245,197,24,0.02) 100%)",
            borderColor: "rgba(245,197,24,0.2)",
          }}
        >
          <div className="flex items-center justify-between mb-2.5">
            <div className="text-[9px] font-bold uppercase tracking-widest text-[#F5C518] flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" /> Featured Partner
            </div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-[#F5C518]"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black text-[#050810]"
              style={{ background: "linear-gradient(135deg, #F5C518, #e6a800)" }}>AC</div>
            <div className="flex-1">
              <div className="h-2.5 w-24 rounded-full bg-white/30 mb-1.5" />
              <div className="h-1.5 w-16 rounded-full bg-white/15" />
            </div>
            <div className="text-[9px] font-bold text-[#F5C518] bg-[#F5C518]/15 px-2.5 py-1.5 rounded-full">
              Book Now →
            </div>
          </div>
        </motion.div>

        {/* Other rows */}
        {[1,2,3].map(i => (
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/4 last:border-0">
            <div className="w-7 h-7 rounded-lg bg-white/6 flex-shrink-0" />
            <div className="flex-1">
              <div className="h-2 w-28 rounded-full bg-white/10 mb-1" />
              <div className="h-1.5 w-20 rounded-full bg-white/6" />
            </div>
            <div className="h-2 w-10 rounded-full bg-white/8" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Comparison row ────────────────────────────────────────────────────────────
function ComparisonRow({ platform, cpl, cold, pay }: { platform: string; cpl: string; cold: boolean; pay: string }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
      <span className="text-sm text-gray-400 w-36 shrink-0">{platform}</span>
      <span className="text-sm font-bold w-20 shrink-0" style={{ color: cold ? "#EF4444" : "#22c55e" }}>{cpl}</span>
      <div className="flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full ${cold ? "bg-red-500" : "bg-green-500"}`} />
        <span className="text-xs text-gray-500">{pay}</span>
      </div>
    </div>
  );
}

// ─── Tier card ────────────────────────────────────────────────────────────────
const TIERS = [
  {
    name: "Connect", price: 199, color: "#6366F1",
    tagline: "Start local. Build fast.",
    features: ["Profile on homeowner dashboard", "3 zip codes", "Impression analytics", "Monthly report", "Cancel anytime"],
  },
  {
    name: "Preferred", price: 349, color: "#00B5B8", popular: true,
    tagline: "The platform's most-booked tier.",
    features: ["Dashboard + AI scan results", "8 zip codes", "Priority placement rotation", "Bi-weekly reports", "Territory exclusivity option", "Cancel anytime"],
  },
  {
    name: "Exclusive", price: 799, color: "#F5C518",
    tagline: "Own your market. Lock out competitors.",
    features: ["Zero competitor ads in your territory", "20 zip codes", "Top-of-scan placement", "Dedicated account manager", "Custom creative assets", "Weekly strategy call"],
  },
];

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function AdvertiseWithUs() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY    = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  const [formOpen, setFormOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [tier, setTier] = useState("featured");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const applyMutation = trpc.featuredAdvertisers.submitApplication.useMutation({
    onSuccess: () => { setSubmitted(true); setSubmitting(false); },
    onError: (e: any) => { toast.error(e.message ?? "Something went wrong"); setSubmitting(false); },
  });

  const handleApply = () => {
    if (!email.trim() || !company.trim()) { toast.error("Fill in all required fields"); return; }
    setSubmitting(true);
    applyMutation.mutate({
      businessName: company.trim(),
      contactName: company.trim(),
      contactEmail: email.trim(),
      contactPhone: phone.trim() || undefined,
      category: "Home Services",
      zipCodes: ["75001"],
      selectedTier: tier as "spotlight" | "featured" | "exclusive",
    });
  };

  return (
    <div className="bg-[#050810] text-white selection:bg-[#F5C518]/30" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ─── Sticky Nav ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 transition-all"
        style={{ background: "linear-gradient(to bottom, rgba(5,8,16,0.95) 0%, rgba(5,8,16,0) 100%)" }}>
        <ProLnkLogo height={26} variant="dark" />
        <div className="hidden md:flex items-center gap-8">
          {[["#reach","Reach"],["#placements","Placements"],["#compare","Why Us"],["#pricing","Pricing"]].map(([href, label]) => (
            <a key={href} href={href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">{label}</a>
          ))}
        </div>
        <motion.button
          onClick={() => setFormOpen(true)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="text-sm font-bold px-5 py-2.5 rounded-full"
          style={{ background: "linear-gradient(135deg,#F5C518,#e6a800)", color: "#050810", boxShadow: "0 4px 20px rgba(245,197,24,0.3)" }}
        >
          Get Started
        </motion.button>
      </nav>

      {/* ─── HERO — Cinematic full-bleed with Three.js ──────────────────────── */}
      <div ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Three.js particle network — lazy loaded */}
        <Suspense fallback={null}>
          <NetworkParticles />
        </Suspense>

        {/* Radial gradient overlays */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(245,197,24,0.05) 0%, transparent 65%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 20% 70%, rgba(99,102,241,0.06) 0%, transparent 60%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(0,181,184,0.05) 0%, transparent 60%)" }} />
          {/* Bottom fade */}
          <div className="absolute bottom-0 inset-x-0 h-64" style={{ background: "linear-gradient(to top, #050810, transparent)" }} />
        </motion.div>

        {/* Hero content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border mb-8"
            style={{ borderColor: "rgba(245,197,24,0.3)", background: "rgba(245,197,24,0.05)" }}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5C518]" />
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-widest">ProLnk Media · DFW Founding Partners</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-black leading-[0.92] tracking-tight mb-8"
            style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)" }}
          >
            Your Brand.<br />
            <span style={goldText}>Their Inbox.</span><br />
            <span className="text-white">Their Next Job.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            The only ad platform where your business appears{" "}
            <span className="text-white font-semibold">at the exact moment</span>{" "}
            AI confirms a homeowner needs you — not before, not after.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <motion.button
              onClick={() => setFormOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 px-9 py-4.5 rounded-full text-base font-bold"
              style={{
                background: "linear-gradient(135deg, #F5C518, #e6a800)",
                color: "#050810",
                boxShadow: "0 0 0 0 rgba(245,197,24,0.4)",
                padding: "1.1rem 2.2rem",
              }}
            >
              Reserve Your Territory
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" style={{ width: "1.1rem", height: "1.1rem" }} />
            </motion.button>
            <a
              href="#placements"
              className="flex items-center gap-2.5 px-7 py-4 rounded-full text-sm font-semibold transition-all duration-200 border"
              style={{ color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.1)", padding: "1.05rem 1.75rem" }}
            >
              See How It Works
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600">Scroll</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </motion.div>
        </motion.div>
      </div>

      {/* ─── STATS — Animated counters ──────────────────────────────────────── */}
      <section className="py-28 px-6 border-y" style={{ borderColor: "rgba(255,255,255,0.05)", background: "linear-gradient(to bottom, #050810, #080d1a)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { to: 14200, suffix: "+", label: "Verified Homeowners" },
            { to: 890,   suffix: "+", label: "Active Partner Pros" },
            { to: 98,    suffix: "%", label: "Ad Viewability Rate" },
            { to: 4,     suffix: "×", label: "Higher Intent vs Google" },
          ].map((s, i) => {
            const ref = useRef<HTMLDivElement>(null);
            const inView = useInView(ref, { once: true });
            return (
              <motion.div
                key={s.label}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-black text-white tabular-nums mb-2">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{s.label}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── REACH — The problem section ────────────────────────────────────── */}
      <section className="py-36 px-6" id="reach">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <Reveal delay={0}>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5C518] mb-5">The Problem With Every Other Ad Platform</div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-black leading-[0.95] mb-7" style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)" }}>
                You're paying to{" "}
                <span className="relative inline-block">
                  <span className="text-gray-600">interrupt</span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute top-1/2 inset-x-0 h-[3px] origin-left"
                    style={{ background: "#EF4444", transform: "translateY(-50%)" }}
                  />
                </span>{" "}
                people.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
                Angi, Thumbtack, Google LSA — they all put your business in front of people who weren't thinking about you yet.
                You pay hundreds of dollars per lead hoping for a conversion.
              </p>
              <p className="text-lg leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.45)" }}>
                <span className="text-white font-semibold">ProLnk Media is built differently.</span>{" "}
                Our AI scans a homeowner's property photos and detects what services they need —{" "}
                <span style={goldText} className="font-bold">then</span> your business appears.
                Intent-first. Zero wasted impressions.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="space-y-3">
                {[
                  { label: "Angi avg cost per booked job", value: "$542", bad: true },
                  { label: "Thumbtack avg cost per booked job", value: "$250", bad: true },
                  { label: "Google LSA avg cost per booked job", value: "$168", bad: true },
                  { label: "ProLnk Media — flat monthly rate", value: "from $199", bad: false },
                ].map(row => (
                  <div key={row.label} className="flex items-center gap-3">
                    <div className={`w-8 h-px ${row.bad ? "bg-gray-700" : "bg-[#F5C518]"}`} />
                    <span className="text-sm text-gray-500 flex-1">{row.label}</span>
                    <span className="text-sm font-bold" style={{ color: row.bad ? "#EF4444" : "#F5C518" }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} x={60}>
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-8 rounded-3xl blur-2xl opacity-20" style={{ background: "radial-gradient(ellipse at center, #F5C518, transparent 70%)" }} />
              <DashboardMockup glowing />
              {/* Floating badge */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -right-5 rounded-2xl px-4 py-3 text-xs font-bold shadow-2xl flex items-center gap-2"
                style={{ background: "linear-gradient(135deg,#F5C518,#e6a800)", color: "#050810" }}
              >
                <Eye className="w-3.5 h-3.5" />
                Seen at the perfect moment
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── MARQUEE ticker ─────────────────────────────────────────────────── */}
      <div className="py-5 overflow-hidden border-y" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {Array(2).fill([
            "Intent-matched placements", "Zero cold impressions", "Real-time analytics",
            "Zip-code targeting", "No setup fee", "Cancel anytime",
            "AI-powered matching", "Verified homeowners only", "Flat monthly rate",
          ]).flat().map((t, i) => (
            <span key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
              <span className="text-[#F5C518] opacity-50">✦</span>
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ─── PLACEMENTS ─────────────────────────────────────────────────────── */}
      <section className="py-36 px-6" id="placements" style={{ background: "linear-gradient(to bottom, #080d1a, #050810)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5C518] mb-4">Three moments. All high intent.</div>
              <h2 className="font-black mb-5" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
                Where you show up.
              </h2>
              <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
                Your business appears in the exact screens homeowners look at when they're deciding who to hire.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Eye, title: "Homeowner Dashboard",
                desc: "Featured on the main home screen every homeowner sees when they log in. High visibility, high dwell time. ~4.2 min avg session.",
                color: "#6366F1", stat: "~4.2 min avg session",
              },
              {
                icon: Zap, title: "AI Scan Results",
                desc: "Your ad appears immediately after the AI detects a need in your trade category. The highest-intent moment in the industry.",
                color: "#F5C518", stat: "Matched to your exact trade", featured: true,
              },
              {
                icon: MapPin, title: "Pro Directory",
                desc: "Priority placement when homeowners search for pros in their area. Filtered to your exact zip codes.",
                color: "#00B5B8", stat: "Filtered to your territory",
              },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: `0 20px 60px ${p.color}18` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="rounded-2xl p-7 border h-full flex flex-col relative overflow-hidden"
                  style={{
                    background: p.featured ? `linear-gradient(135deg, rgba(245,197,24,0.07), rgba(245,197,24,0.02))` : "rgba(255,255,255,0.02)",
                    borderColor: p.featured ? "rgba(245,197,24,0.2)" : "rgba(255,255,255,0.06)",
                  }}
                >
                  {p.featured && (
                    <>
                      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(245,197,24,0.5), transparent)" }} />
                      <div className="absolute top-5 right-5 text-[10px] font-bold text-[#F5C518] bg-[#F5C518]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Most Effective
                      </div>
                    </>
                  )}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                    style={{ background: `${p.color}15`, color: p.color }}>
                    <p.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
                  <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>{p.desc}</p>
                  <div className="text-xs font-bold py-1.5 px-3 rounded-full inline-block"
                    style={{ color: p.color, background: `${p.color}12` }}>
                    {p.stat}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPARISON TABLE ───────────────────────────────────────────────── */}
      <section className="py-36 px-6" id="compare">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5C518] mb-4">Why ProLnk Wins</div>
              <h2 className="font-black" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
                See the difference.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl overflow-hidden border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex gap-4 px-6 py-3 border-b text-xs font-bold uppercase tracking-widest text-gray-600"
                style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <span className="w-36">Platform</span>
                <span className="w-20">Avg CPL</span>
                <span>Model</span>
              </div>
              <div className="px-6">
                <ComparisonRow platform="Angi / HomeAdvisor" cpl="$542" cold pay="Pay per lead, whether it closes or not" />
                <ComparisonRow platform="Thumbtack" cpl="$250" cold pay="Pay per lead, cold intent" />
                <ComparisonRow platform="Google LSA" cpl="$168" cold pay="Pay per click, anyone browsing" />
                <ComparisonRow platform="ProLnk Media" cpl="from $199/mo" cold={false} pay="Flat rate, intent-matched, only when AI confirms need" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── PRICING ────────────────────────────────────────────────────────── */}
      <section className="py-36 px-6" id="pricing" style={{ background: "linear-gradient(to bottom, #050810, #080d1a)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5C518] mb-4">Pricing</div>
              <h2 className="font-black mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
                One flat rate. No surprises.
              </h2>
              <p className="text-lg max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
                No auctions, no bidding wars. A fixed monthly placement in front of verified, intent-driven homeowners.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {TIERS.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 250, damping: 25 }}
                  className="rounded-2xl p-8 border h-full flex flex-col relative overflow-hidden"
                  style={{
                    background: tier.popular
                      ? "linear-gradient(135deg, rgba(0,181,184,0.08), rgba(0,181,184,0.02))"
                      : "rgba(255,255,255,0.02)",
                    borderColor: tier.popular ? "rgba(0,181,184,0.25)" : "rgba(255,255,255,0.06)",
                  }}
                >
                  {tier.popular && (
                    <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: "linear-gradient(90deg, transparent, #00B5B8, transparent)" }} />
                  )}
                  <div className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: tier.color }}>{tier.name}</div>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-5xl font-black text-white">${tier.price}</span>
                    <span className="text-gray-600 text-sm mb-1.5">/mo</span>
                  </div>
                  <p className="text-sm mb-7" style={{ color: "rgba(255,255,255,0.35)" }}>{tier.tagline}</p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: tier.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    onClick={() => { setTier(tier.name === "Connect" ? "spotlight" : tier.name === "Preferred" ? "featured" : "exclusive"); setFormOpen(true); }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl text-sm font-bold transition-all"
                    style={{
                      background: tier.popular ? `linear-gradient(135deg, #00B5B8, #009fa2)` : `rgba(255,255,255,0.06)`,
                      color: "#fff",
                      border: tier.popular ? "none" : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    Get Started →
                  </motion.button>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="text-center text-gray-700 text-sm mt-10">30-day free trial on all plans · No credit card required to apply</p>
          </Reveal>
        </div>
      </section>

      {/* ─── TRUST SIGNALS ──────────────────────────────────────────────────── */}
      <section className="py-28 px-6 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Verified Audience", color: "#6366F1", desc: "Every homeowner completed a full home profile. You know exactly who sees your ad." },
            { icon: BarChart3, title: "Transparent Analytics", color: "#00B5B8", desc: "Real-time impressions, clicks, and conversions. No black box — you see exactly what you paid for." },
            { icon: MapPin, title: "Hyper-Local Targeting", color: "#F5C518", desc: "Zip-code precision targeting. Your ad only reaches homeowners in your actual service territory." },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="p-6 rounded-2xl border" style={{ background: "rgba(255,255,255,0.015)", borderColor: "rgba(255,255,255,0.05)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${item.color}12`, color: item.color }}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className="py-48 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,197,24,0.05) 0%, transparent 70%)" }} />
        {/* Animated ring */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[600px] h-[600px] rounded-full border" style={{ borderColor: "rgba(245,197,24,0.2)" }} />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[900px] h-[900px] rounded-full border" style={{ borderColor: "rgba(245,197,24,0.1)" }} />
        </motion.div>

        <Reveal>
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#F5C518] mb-7">DFW Launch · Limited Territories</div>
            <h2 className="font-black leading-[0.92] mb-7" style={{ fontSize: "clamp(3rem,8vw,6rem)" }}>
              Be first.<br />
              <span style={goldText}>Own your market.</span>
            </h2>
            <p className="text-xl mb-14 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.38)" }}>
              We cap Preferred Partners at 2 per category per zip code. Once a territory fills, it closes.
            </p>
            <motion.button
              onClick={() => setFormOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 rounded-full font-bold text-base"
              style={{
                background: "linear-gradient(135deg, #F5C518, #e6a800)",
                color: "#050810",
                padding: "1.2rem 2.8rem",
                boxShadow: "0 0 80px rgba(245,197,24,0.18), 0 8px 32px rgba(245,197,24,0.2)",
              }}
            >
              Reserve Your Territory
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </Reveal>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="border-t py-10 px-6" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <ProLnkLogo height={22} variant="dark" />
          <div className="flex gap-6 text-sm text-gray-700">
            {[["/"," ProLnk"],[ "/trustypro","TrustyPro"],["/privacy","Privacy"],["/terms","Terms"]].map(([href, label]) => (
              <Link key={href} href={href} className="hover:text-gray-400 transition-colors">{label}</Link>
            ))}
          </div>
          <p className="text-gray-700 text-sm">© 2026 ProLnk Media · DFW, Texas</p>
        </div>
      </footer>

      {/* ─── APPLICATION MODAL ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(5,8,16,0.88)", backdropFilter: "blur(16px)" }}
            onClick={e => { if (e.target === e.currentTarget) setFormOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md rounded-2xl border p-8 shadow-2xl"
              style={{ background: "#0a0f1a", borderColor: "rgba(255,255,255,0.08)" }}
              onClick={e => e.stopPropagation()}
            >
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-8 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(245,197,24,0.6), transparent)" }} />

              <button
                onClick={() => setFormOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-400 hover:bg-white/5 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(245,197,24,0.1)" }}
                  >
                    <CheckCircle className="w-8 h-8 text-[#F5C518]" />
                  </motion.div>
                  <h3 className="text-2xl font-black text-white mb-2">You're on the list.</h3>
                  <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                    We'll reach out within 24 hours to discuss your territory and get your placement live.
                  </p>
                  <button onClick={() => setFormOpen(false)} className="text-sm text-gray-600 hover:text-gray-400 underline">
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-7">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5C518] mb-2">Reserve Your Spot</div>
                    <h3 className="text-2xl font-black text-white">Claim your territory before it fills.</h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: "Business Name *", value: company, set: setCompany, placeholder: "Acme HVAC Services" },
                      { label: "Work Email *", value: email, set: setEmail, placeholder: "you@yourbusiness.com", type: "email" },
                      { label: "Phone (optional)", value: phone, set: setPhone, placeholder: "(214) 555-0100", type: "tel" },
                    ].map(field => (
                      <div key={field.label}>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type ?? "text"}
                          value={field.value}
                          onChange={e => field.set(e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-700 outline-none focus:border-[#F5C518]/40 transition-colors"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                        />
                      </div>
                    ))}

                    {/* Tier selector */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                        Tier Interest
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[["spotlight","Connect","$199"],["featured","Preferred","$349"],["exclusive","Exclusive","$799"]].map(([val, label, price]) => (
                          <button
                            key={val}
                            onClick={() => setTier(val)}
                            className="rounded-xl py-2.5 text-xs font-bold transition-all"
                            style={{
                              background: tier === val ? "rgba(245,197,24,0.12)" : "rgba(255,255,255,0.04)",
                              borderColor: tier === val ? "rgba(245,197,24,0.4)" : "rgba(255,255,255,0.06)",
                              color: tier === val ? "#F5C518" : "rgba(255,255,255,0.4)",
                              border: `1px solid ${tier === val ? "rgba(245,197,24,0.4)" : "rgba(255,255,255,0.06)"}`,
                            }}
                          >
                            {label}<br />
                            <span className="font-black">{price}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      onClick={handleApply}
                      disabled={submitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl text-sm font-bold disabled:opacity-50"
                      style={{ background: "linear-gradient(135deg,#F5C518,#e6a800)", color: "#050810" }}
                    >
                      {submitting ? "Submitting…" : "Reserve My Territory →"}
                    </motion.button>
                    <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
                      No commitment · Our team will reach out within 24 hours
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
