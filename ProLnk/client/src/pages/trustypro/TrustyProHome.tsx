import { useState, useEffect, useRef } from "react";
import SupportChatWidget from "@/components/SupportChatWidget";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import { Plus, X, Star, Menu, Phone, Mail, MapPin, Shield, Clock, Award, MessageSquare, ArrowRight, Camera, CheckCircle, ChevronLeft, ChevronRight, Loader2, AlertTriangle, DollarSign, Search, Zap, Lock, FileText, TrendingUp, XCircle, Target, RefreshCw } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

// --- CDN Images ----------------------------------------------------------------
const CDN = {
  heroModel:      "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/framer-hero-reference_949730d3.webp",
  heroExterior:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/home-exterior-modern_d492c1af.jpg",
  heroInterior:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/trustypro-hero-interior_21ad489c.webp",
  aboutWide:      "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/living-room-luxury_9bf5543c.jpg",
  aboutWide2:     "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/kitchen-white-cabinets_d735258a.jpg",
  projectKitchen: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/project-kitchen_d8ca391a.jpg",
  projectRoofing: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/project-roofing_7f6afdec.jpg",
  projectBath:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/project-bathroom_f9a2bb62.jpg",
  projectLand:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/project-landscaping_7000c429.jpg",
  projectPaint:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/project-painting-c7oS8XApoWgskDsGbPd6h7.webp",
  projectFloor:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/project-flooring_e65ecd45.jpg",
  projectHVAC:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/project-hvac-RMvrh5j9LFy8iRDqmf8xvZ.webp",
  projectPlumb:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/project-plumbing-2mpXEhBrHpF7opmP2R7fBg.webp",
  beforeFront:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/demo-before-front-jqo6uC4xnXLx3JnChPjeTu.webp",
  afterFront:     "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/demo-after-front-JyL4xHCPoi4dWpiePAXTFA.webp",
  scanFrontYard:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/trustypro-frontyard-damage-scan-v2-D9sW97trHmaDoMH7jXUN8A.webp",
  scanBackYard:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/trustypro-backyard-damage-scan-iNiCrAstyruUq9w9XysU59.webp",
};

// --- Accent Color --------------------------------------------------------------
const ACCENT = "#4F46E5";
const ACCENT_LIGHT = "#EEF2FF";

// --- Services ------------------------------------------------------------------
const SERVICES = [
  { title: "Exterior Renovations", desc: "At TrustyPro, we enhance your home's curb appeal with expert exterior improvements. From siding and windows to patios and landscaping, we deliver durable, attractive upgrades that make your home stand out.", image: CDN.heroExterior },
  { title: "Kitchen Remodeling",   desc: "Transform your kitchen into a functional, beautiful space. Our verified pros handle everything from cabinet installation and countertops to full gut renovations -- delivering the kitchen you've always wanted.", image: CDN.projectKitchen },
  { title: "Bathroom Upgrades",    desc: "Upgrade your bathrooms with premium fixtures, tile work, and custom vanities. TrustyPro connects you with verified bathroom specialists who deliver spa-quality results on time and on budget.", image: CDN.projectBath },
  { title: "Flooring & Interior",  desc: "From hardwood and luxury vinyl to tile and carpet, our flooring pros transform every room. We also handle interior painting, trim work, and complete room makeovers to refresh your living spaces.", image: CDN.projectFloor },
  { title: "HVAC & Plumbing",      desc: "Keep your home running smoothly with certified HVAC and plumbing professionals. From AC installations and furnace repairs to pipe replacements and water heater installs, our verified pros handle it all.", image: CDN.projectHVAC },
];

// --- Projects ------------------------------------------------------------------
const PROJECTS = [
  { cat: "Kitchen Remodel",   year: "2025", title: "Modern Kitchen Transformation",   desc: "Full gut renovation with quartz countertops and custom cabinetry in Frisco.", img: CDN.projectKitchen },
  { cat: "Exterior",          year: "2025", title: "Luxury Curb Appeal Upgrade",       desc: "Complete exterior renovation with new siding, windows, and landscaping.", img: CDN.heroExterior },
  { cat: "Bathroom",          year: "2025", title: "Master Bath Spa Retreat",          desc: "Walk-in shower, soaking tub, and heated floors in a Plano home.", img: CDN.projectBath },
  { cat: "Flooring",          year: "2025", title: "Hardwood Throughout",              desc: "3,200 sq ft of white oak hardwood installed in a Frisco home.", img: CDN.projectFloor },
  { cat: "Landscaping",       year: "2025", title: "Backyard Oasis",                   desc: "Full landscaping with pergola, turf, and outdoor lighting in Allen.", img: CDN.projectLand },
  { cat: "Painting",          year: "2025", title: "Interior Refresh",                 desc: "Full interior repaint with premium Sherwin-Williams paint in McKinney.", img: CDN.projectPaint },
];

// --- Benefits ------------------------------------------------------------------
const BENEFITS = [
  { icon: Shield,      title: "Every Pro Verified Before You See Their Name",       desc: "Background check. License verification. Insurance confirmation. References reviewed. 7-point verification before any pro appears on your match list. Zero unverified contractors on the platform." },
  { icon: Camera,      title: "AI Finds Problems You Didn't Know You Had",           desc: "Our AI scans your photos for 50+ issue types — aging HVAC, cracked foundations, drainage problems, roof wear, and more. You get a clear, honest report of what your home needs before it becomes an emergency." },
  { icon: Lock,        title: "Your Home Health Vault — A Living Record",            desc: "Every repair, upgrade, and inspection logged permanently. When you sell, you have documented proof of every improvement. When something breaks, you have the full history. Your home's story, preserved forever." },
  { icon: Zap,         title: "Matched in Hours, Not Days",                          desc: "No more waiting weeks for callbacks. TrustyPro matches you with an available, verified pro in your zip code within hours of your scan. Work starts when you're ready." },
  { icon: DollarSign,  title: "No Hidden Fees. No Surprise Quotes.",                 desc: "You see the full scope before anyone starts. Verified pros provide transparent, itemized quotes. No bait-and-switch pricing, no upsells at the door, no invoice surprises at completion." },
  { icon: TrendingUp,  title: "Protect and Grow Your Home's Value",                  desc: "Deferred maintenance costs 3x more to fix later and kills resale value. TrustyPro's proactive alerts tell you what to address now. Every dollar spent on maintenance returns $2–4 at resale." },
];

// --- Testimonials --------------------------------------------------------------
const TESTIMONIALS = [
  { name: "Sarah M.",    loc: "Frisco, TX",   rating: 5, text: "TrustyPro matched me with an amazing kitchen contractor. The whole process was seamless -- from the AI scan to the final walkthrough. My kitchen looks incredible.", proj: "Kitchen Remodel" },
  { name: "James T.",    loc: "Plano, TX",    rating: 5, text: "I was skeptical at first but the AI photo scan actually found issues I didn't even know about. Got my roof fixed before the next storm season. Worth every penny.", proj: "Roof Repair" },
  { name: "Maria L.",    loc: "McKinney, TX", rating: 5, text: "Three quotes in 24 hours, all from verified pros. Chose the best one and my bathroom renovation was done in 8 days. Absolutely stunning results.", proj: "Bathroom Remodel" },
  { name: "David K.",    loc: "Allen, TX",    rating: 5, text: "The contractor TrustyPro matched me with was professional, on time, and under budget. My backyard transformation exceeded every expectation.", proj: "Landscaping" },
  { name: "Jennifer R.", loc: "Prosper, TX",  rating: 5, text: "As a first-time homeowner, I was nervous about hiring contractors. TrustyPro made it easy and safe. My flooring looks amazing and the process was stress-free.", proj: "Hardwood Flooring" },
  { name: "Michael B.",  loc: "Celina, TX",   rating: 5, text: "The AI scan found a plumbing issue behind my walls that I never would have caught. Saved me from a major disaster. TrustyPro is a game-changer.", proj: "Plumbing" },
];

// --- FAQ -----------------------------------------------------------------------
const FAQS = [
  { q: "What types of home improvement projects do you specialize in?", a: "TrustyPro covers the full spectrum of home improvements -- from kitchen and bathroom remodels to roofing, HVAC, plumbing, flooring, painting, landscaping, and more. If it's your home, we've got a verified pro for it." },
  { q: "How do I get started with a project?",                          a: "Simply upload photos of your home or describe what you need. Our AI analyzes your home and matches you with verified local pros. You'll receive quotes within 24 hours." },
  { q: "Are TrustyPro contractors verified and insured?",               a: "Yes -- every contractor on TrustyPro is background-checked, license-verified, and carries full liability insurance. We don't let just anyone on the platform." },
  { q: "How long does a typical project take?",                         a: "Project timelines vary by scope. Small jobs like painting or flooring can be completed in 1-3 days. Larger renovations like kitchen remodels typically take 2-6 weeks. Your pro will provide a detailed timeline upfront." },
  { q: "What if I'm not satisfied with the work?",                      a: "TrustyPro stands behind every project with a satisfaction guarantee. If you're not happy with the results, contact us within 30 days and we'll work to make it right at no additional cost." },
  { q: "Can I get multiple quotes from different contractors?",          a: "Absolutely. We encourage you to compare quotes from multiple verified pros. Our platform makes it easy to review profiles, ratings, and past work before making your decision." },
];

// --- Marquee Items -------------------------------------------------------------
const MARQUEE = ["Kitchen Remodeling", "Bathroom Renovation", "Roofing & Gutters", "HVAC Installation", "Flooring & Tile", "Interior Painting", "Landscaping", "Plumbing", "Electrical", "Deck & Patio", "Windows & Doors", "Basement Finishing"];

// --- Animation Variants --------------------------------------------------------
const EASE = "easeOut" as const;

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeUpSlow = {
  hidden: { opacity: 0, y: 64 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// --- Animated Section Wrapper --------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AnimSection({ children, className, id, variants = fadeUp }: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variants?: Record<string, any>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

// --- Homeowner Problem Section ------------------------------------------------
function HomeownerProblemSection({ onScan }: { onScan: () => void }) {
  const problems = [
    {
      icon: Search,
      title: "Searching Google or Lead Sites",
      color: "#EF4444",
      stats: "Pros pay $15–100 per lead on Angi — baked into your quote",
      points: [
        "You don't know if they're licensed or insured",
        "Reviews can be fake or paid for",
        "Same contractor listed on 5 platforms with different prices",
        "Pro's lead cost gets passed directly to you in inflated quotes",
      ],
    },
    {
      icon: AlertTriangle,
      title: "The Door-to-Door Salesperson",
      color: "#F97316",
      stats: "Over $3B lost to contractor fraud annually in the US",
      points: [
        "No license verification, no insurance check",
        "High-pressure tactics and inflated quotes",
        "Disappears after deposit — no recourse",
        "You initiated nothing — they showed up uninvited",
      ],
    },
    {
      icon: Clock,
      title: "Waiting for Callbacks That Never Come",
      color: "#EAB308",
      stats: "Avg. 4.7 days to get a contractor callback in DFW",
      points: [
        "Leave 3 voicemails, get 1 callback",
        "Schedule a quote, they don't show",
        "Get 3 wildly different bids with no explanation",
        "Work starts 3 weeks later than promised",
      ],
    },
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden" style={{ borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
      <div className="max-w-6xl mx-auto px-6">
        <AnimSection variants={fadeUp} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6" style={{ backgroundColor: "rgba(79,70,229,0.1)", color: "#4f46e5" }}>
            The Problem
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-950 leading-tight mb-4">
            Finding a Contractor Is<br />
            <span style={{ color: "#4f46e5" }}>Still Broken in 2025.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Most homeowners don't realize they're overpaying, getting ghosted, or hiring unverified strangers. Here's the reality of the traditional contractor search.
          </p>
        </AnimSection>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {problems.map((prob) => (
            <AnimSection key={prob.title} variants={fadeUp}>
              <div className="rounded-2xl p-6 h-full border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${prob.color}20` }}>
                    <prob.icon className="w-5 h-5" style={{ color: prob.color }} />
                  </div>
                  <h3 className="font-black text-gray-900 text-base leading-tight">{prob.title}</h3>
                </div>
                <p className="text-xs font-bold mb-4 px-3 py-1.5 rounded-full inline-block" style={{ backgroundColor: `${prob.color}15`, color: prob.color }}>
                  {prob.stats}
                </p>
                <div className="space-y-2.5">
                  {prob.points.map((pt) => (
                    <div key={pt} className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: prob.color }} />
                      <p className="text-sm text-gray-600 leading-snug">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimSection>
          ))}
        </div>

        {/* The Solution Bridge */}
        <AnimSection variants={fadeUp}>
          <div className="rounded-2xl p-8 md:p-12 text-center bg-white" style={{ border: "1px solid rgba(79,70,229,0.2)", boxShadow: "0 4px 24px rgba(79,70,229,0.08)" }}>
            <div className="text-5xl mb-4">💡</div>
            <h3 className="text-3xl md:text-4xl font-black text-gray-950 mb-4">
              TrustyPro Solves Every Single One of These.
            </h3>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
              We built TrustyPro because we were tired of watching homeowners get burned. Every pro is verified before you ever see their name. Every quote is transparent. Every job is tracked. And you initiate everything — on your terms, on your timeline.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { stat: "7-point", label: "Verification process" },
                { stat: "< 4 hrs", label: "Average match time" },
                { stat: "100%", label: "Licensed & insured" },
              ].map((s) => (
                <div key={s.stat} className="rounded-xl p-4" style={{ backgroundColor: "rgba(79,70,229,0.06)" }}>
                  <p className="text-3xl font-black" style={{ color: "#4f46e5" }}>{s.stat}</p>
                  <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <motion.button
              onClick={onScan}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-black text-white hover:opacity-90 transition-opacity shadow-xl"
              style={{ backgroundColor: ACCENT }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Scan My Home Free — See the Difference <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </AnimSection>
      </div>
    </section>
  );
}

// --- CountUp Hook --------------------------------------------------------------
function useCountUp(end: number, decimals = 0) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    const step = end / (2000 / 16);
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + step, end);
      setCount(parseFloat(cur.toFixed(decimals)));
      if (cur >= end) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [started, end, decimals]);
  return { count, ref };
}

// --- Parallax Image ------------------------------------------------------------
function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.18 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// --- Before/After Slider -------------------------------------------------------
function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const cRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const update = (x: number) => {
    if (!cRef.current) return;
    const r = cRef.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(((x - r.left) / r.width) * 100, 100)));
  };
  return (
    <div ref={cRef} className="relative w-full h-full select-none overflow-hidden cursor-ew-resize rounded-2xl"
      onMouseDown={e => { dragging.current = true; update(e.clientX); e.preventDefault(); }}
      onMouseMove={e => { if (dragging.current) update(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={e => { dragging.current = true; update(e.touches[0].clientX); }}
      onTouchMove={e => { if (dragging.current) update(e.touches[0].clientX); }}
      onTouchEnd={() => { dragging.current = false; }}
    >
      <img src={after}  alt="After"  className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="Before" className="absolute inset-0 h-full object-cover" style={{ width: `${10000/pos}%`, maxWidth: "none" }} draggable={false} />
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl z-10" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-2xl flex items-center justify-center">
          <ChevronLeft size={12} className="text-gray-600" /><ChevronRight size={12} className="text-gray-600" />
        </div>
      </div>
      <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-black/60 text-white text-xs font-bold uppercase tracking-widest">BEFORE</div>
      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 text-white text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: ACCENT }}>AFTER</div>
    </div>
  );
}

// --- Scan Demo Carousel ---------------------------------------------------------------------------------
const SCAN_TABS = [
  {
    label: "Interior",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/trustypro-hero-interior_21ad489c.webp",
    issues: [
      { label: "Water Damage", color: "#ef4444" },
      { label: "Floor Refinishing", color: "#f59e0b" },
      { label: "Foundation Check", color: "#6366f1" },
    ],
    count: 3,
  },
  {
    label: "Front Yard",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/trustypro-frontyard-damage-scan-v2-D9sW97trHmaDoMH7jXUN8A.webp",
    issues: [
      { label: "Driveway Crack", color: "#ef4444" },
      { label: "Gutter Sagging", color: "#f59e0b" },
      { label: "Exterior Paint Fading", color: "#6366f1" },
    ],
    count: 3,
  },
  {
    label: "Back Yard",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/trustypro-backyard-damage-scan-iNiCrAstyruUq9w9XysU59.webp",
    issues: [
      { label: "Fence Damage", color: "#ef4444" },
      { label: "Deck Wear", color: "#f59e0b" },
      { label: "Drainage Issue", color: "#10b981" },
    ],
    count: 3,
  },
];

function ScanDemoCarousel() {
  const [active, setActive] = useState(0);
  const tab = SCAN_TABS[active];
  return (
    <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
      {/* Tab row */}
      <div className="flex bg-gray-950">
        {SCAN_TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className={`flex-1 py-3 text-sm font-bold transition-colors ${
              i === active ? "text-white border-b-2" : "text-gray-400 hover:text-gray-200"
            }`}
            style={i === active ? { borderBottomColor: ACCENT } : {}}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* Image */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg" style={{ backgroundColor: ACCENT }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          AI Scan -- Live Detection Demo
        </div>
        <img
          src={tab.img}
          alt={`TrustyPro AI scan -- ${tab.label}`}
          className="w-full object-cover"
          style={{ maxHeight: 480 }}
        />
      </div>
      {/* Caption strip */}
      <div className="bg-gray-950 px-6 py-4 flex flex-wrap gap-4 items-center justify-between">
        <p className="text-white text-sm font-semibold">AI identified {tab.count} issues in this {tab.label.toLowerCase()} scan</p>
        <div className="flex flex-wrap gap-2">
          {tab.issues.map((tag) => (
            <span key={tag.label} className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: tag.color + "22", border: `1px solid ${tag.color}`, color: tag.color }}>
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Main --------------------------------------------------------------------------------------
const SERVICE_TYPES = [
  "Kitchen Remodel", "Bathroom Upgrade", "Exterior / Curb Appeal",
  "Flooring", "Painting", "HVAC / Plumbing", "Landscaping", "Roofing",
  "General Repairs", "Other",
];

export default function TrustyProHome() {
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq]             = useState<number | null>(0);

  // -- Intake modal state --------------------------------------------------
  const [intakeOpen, setIntakeOpen]       = useState(false);
  const [intakeStep, setIntakeStep]       = useState(1); // 1 = contact, 2 = project, 3 = success
  const [intakeForm, setIntakeForm]       = useState({
    name: "", email: "", phone: "", address: "",
    serviceType: "", description: "", urgency: "moderate" as "urgent" | "moderate" | "low",
  });

  const submitLead = trpc.trustyPro.submitRequest.useMutation({
    onSuccess: () => { setIntakeStep(3); },
    onError: (err: { message?: string }) => { toast.error(err.message || "Something went wrong. Please try again."); },
  });

  const openIntake = () => { setIntakeOpen(true); setIntakeStep(1); setIntakeForm({ name: user?.name ?? "", email: user?.email ?? "", phone: "", address: "", serviceType: "", description: "", urgency: "moderate" }); };
  const closeIntake = () => { setIntakeOpen(false); setIntakeStep(1); };

  const handleIntakeSubmit = () => {
    if (!intakeForm.name || !intakeForm.email || !intakeForm.address) {
      toast.error("Please fill in your name, email, and address."); return;
    }
    if (!intakeForm.serviceType || !intakeForm.description) {
      toast.error("Please describe your project."); return;
    }
    submitLead.mutate({
      name: intakeForm.name,
      email: intakeForm.email,
      phone: intakeForm.phone || undefined,
      address: intakeForm.address,
      serviceType: intakeForm.serviceType,
      description: intakeForm.description,
      urgency: intakeForm.urgency,
    });
  };

  const [, navigate] = useLocation();
  const { isAuthenticated, user } = useAuth();
  const goToWizard = () => {
    // Always route to the live AI scan — no login wall
    navigate("/trustypro/scan");
  };
  // All scan/find-a-pro CTAs route directly to /trustypro/scan

  const s1 = useCountUp(500);
  const s2 = useCountUp(47);
  const s3 = useCountUp(98);
  const s4 = useCountUp(2400);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  // Parallax for hero images
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroLeftY  = useTransform(heroScroll, [0, 1], ["0%", "18%"]);
  const heroRightY = useTransform(heroScroll, [0, 1], ["0%", "12%"]);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* -- INTAKE MODAL ------------------------------------------------------ */}
      <AnimatePresence>
        {intakeOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeIntake} />
            {/* Modal */}
            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {/* Header */}
              <div className="px-8 pt-8 pb-5 border-b border-gray-100">
                <button onClick={closeIntake} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <X className="w-4 h-4 text-gray-600" />
                </button>
                {intakeStep < 3 ? (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: ACCENT }}>Free</span>
                      <span className="text-xs text-gray-400 font-medium">No credit card required</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-950">
                      {intakeStep === 1 ? "Tell us about yourself" : "Describe your project"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {intakeStep === 1 ? "We'll match you with a verified local pro in your area." : "The more detail you share, the better we can match you."}
                    </p>
                    {/* Step indicator */}
                    <div className="flex gap-2 mt-4">
                      <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: intakeStep >= 1 ? ACCENT : "#E5E7EB" }} />
                      <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: intakeStep >= 2 ? ACCENT : "#E5E7EB" }} />
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: ACCENT_LIGHT }}>
                      <CheckCircle className="w-8 h-8" style={{ color: ACCENT }} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-950">You're on the list!</h2>
                    <p className="text-gray-500 mt-2 text-sm">We received your request and will match you with a verified DFW pro within a few hours. Check your email for updates.</p>
                  </div>
                )}
              </div>

              {/* Body */}
              {intakeStep === 1 && (
                <div className="px-8 py-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text" placeholder="Jane Smith"
                        value={intakeForm.name}
                        onChange={e => setIntakeForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 text-gray-900"
                        style={{ focusRingColor: ACCENT } as React.CSSProperties}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel" placeholder="(214) 555-0100"
                        value={intakeForm.phone}
                        onChange={e => setIntakeForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email" placeholder="jane@example.com"
                      value={intakeForm.email}
                      onChange={e => setIntakeForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Home Address *</label>
                    <input
                      type="text" placeholder="123 Main St, Frisco, TX 75034"
                      value={intakeForm.address}
                      onChange={e => setIntakeForm(f => ({ ...f, address: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 text-gray-900"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (!intakeForm.name || !intakeForm.email || !intakeForm.address) {
                        toast.error("Please fill in your name, email, and address."); return;
                      }
                      setIntakeStep(2);
                    }}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Next -- Describe Your Project <ArrowRight className="inline w-4 h-4 ml-1" />
                  </button>
                </div>
              )}

              {intakeStep === 2 && (
                <div className="px-8 py-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">What type of project? *</label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_TYPES.map(s => (
                        <button
                          key={s}
                          onClick={() => setIntakeForm(f => ({ ...f, serviceType: s }))}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                          style={intakeForm.serviceType === s ? { backgroundColor: ACCENT, color: "white", borderColor: ACCENT } : { backgroundColor: "white", color: "#374151", borderColor: "#E5E7EB" }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Describe what you need *</label>
                    <textarea
                      rows={3} placeholder="e.g. My kitchen cabinets need replacing and I'd like new countertops too..."
                      value={intakeForm.description}
                      onChange={e => setIntakeForm(f => ({ ...f, description: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 text-gray-900 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">How urgent is this?</label>
                    <div className="flex gap-2">
                      {(["urgent","moderate","low"] as const).map(u => (
                        <button
                          key={u}
                          onClick={() => setIntakeForm(f => ({ ...f, urgency: u }))}
                          className="flex-1 py-2 rounded-xl text-xs font-semibold border capitalize transition-all"
                          style={intakeForm.urgency === u ? { backgroundColor: ACCENT, color: "white", borderColor: ACCENT } : { backgroundColor: "white", color: "#374151", borderColor: "#E5E7EB" }}
                        >
                          {u === "urgent" ? " Urgent" : u === "moderate" ? " Moderate" : " No Rush"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIntakeStep(1)}
                      className="flex-1 py-3 rounded-xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleIntakeSubmit}
                      disabled={submitLead.isPending}
                      className="flex-1 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {submitLead.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : "Get Matched -- It's Free"}
                    </button>
                  </div>
                </div>
              )}

              {intakeStep === 3 && (
                <div className="px-8 py-6 text-center">
                  <button
                    onClick={closeIntake}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -- NAV --------------------------------------------------------------- */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/trustypro">
            <TrustyProLogo height={52} />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[["about","About Us"],["services","Services"],["how-it-works","How It Works"],["benefits","Why TrustyPro"],["contact","Contact"]].map(([id,label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">{label}</button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
<button onClick={goToWizard} className="text-sm font-semibold px-4 py-1.5 rounded-full border-2 transition-colors" style={{ borderColor: ACCENT, color: ACCENT }}>Scan My Home ✦</button>
            <button
              onClick={() => navigate("/trustypro/login")}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 px-4 py-2 rounded-full hover:border-gray-400"
            >
              My Home Login
            </button>
            <button onClick={goToWizard} className="px-5 py-2 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: ACCENT }}>
              Get Started
            </button>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}><Menu className="w-5 h-5" /></button>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 overflow-hidden"
            >
              {[["about","About Us"],["services","Services"],["how-it-works","How It Works"],["benefits","Why TrustyPro"],["contact","Contact"]].map(([id,label]) => (
                <button key={id} onClick={() => scrollTo(id)} className="text-left text-sm font-medium text-gray-600">{label}</button>
              ))}
              <button onClick={goToWizard} className="text-left text-sm font-medium text-gray-600">Scan My Home</button>
              <button onClick={() => navigate("/trustypro/login")} className="text-left text-sm font-medium text-gray-600">My Home Login</button>
              <button onClick={goToWizard} className="px-5 py-2 rounded-full text-sm font-semibold text-white w-fit" style={{ backgroundColor: ACCENT }}>Get Started</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* -- HERO -------------------------------------------------------------- */}
      <section className="bg-[#f5f5f5] pt-16 pb-0 overflow-hidden" ref={heroRef}>
        <div className="max-w-4xl mx-auto px-6 text-center">

          {/* FREE badge -- first thing they see */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: "#dcfce7", border: "1.5px solid #86efac" }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-bold text-green-700">100% Free for Homeowners -- No Catch. No Credit Card.</span>
          </motion.div>

          {/* Headline -- lead with the difference */}
          <motion.h1
            className="text-5xl md:text-7xl font-black text-gray-950 leading-[1.05] tracking-tight mb-5"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            Stop trusting strangers<br />
            <span style={{ color: ACCENT }}>with your biggest investment.</span>
          </motion.h1>

          {/* Differentiator line */}
          <motion.p
            className="text-xl text-gray-700 font-semibold leading-relaxed mb-3 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            TrustyPro is the only platform where every contractor is verified before you ever see their name — and your AI home scan finds problems before they become expensive disasters.
          </motion.p>

          {/* How it works in one sentence */}
          <motion.p
            className="text-base text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          >
            Upload a few photos. AI scans for 50+ issue types. Get matched with a licensed, insured, background-checked DFW pro — in hours, not days. No calls. No guessing. No risk.
          </motion.p>

          {/* CTA + trust signals */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.42 }}
          >
            <button
              onClick={goToWizard}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-black text-white hover:opacity-90 transition-opacity shadow-xl"
              style={{ backgroundColor: ACCENT }}
            >
              Scan My Home -- It's Free <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400 font-medium">
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> No credit card required</span>
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" style={{ color: ACCENT }} /> Every pro is background-checked</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" style={{ color: ACCENT }} /> Matched in hours, not days</span>
            </div>
          </motion.div>
        </div>

        {/* Hero image -- house model on hand, centered, large */}
        <motion.div
          className="mt-12 max-w-3xl mx-auto px-6"
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        >
          <img
            src={CDN.heroModel}
            alt="Home model -- TrustyPro connects homeowners with trusted pros"
            className="w-full h-auto object-contain drop-shadow-2xl"
            style={{ maxHeight: 480 }}
          />
        </motion.div>

        {/* Marquee ticker */}
        <motion.div
          className="mt-0 bg-gray-950 py-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="flex animate-marquee-tp whitespace-nowrap">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} className="mx-8 text-sm font-medium text-white/70 uppercase tracking-widest">
                {item} <span className="text-white/30 mx-4"></span>
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* -- ABOUT ------------------------------------------------------------- */}
      <section id="about" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <AnimSection variants={fadeLeft}>
              <h2 className="text-4xl md:text-5xl font-black text-gray-950 leading-tight">Hire a Pro You Can Actually Trust</h2>
            </AnimSection>
            <AnimSection variants={fadeRight}>
              <div className="pt-2">
                <p className="text-lg text-gray-600 leading-relaxed">
                  At TrustyPro, we bring skill and care to every detail. We connect DFW homeowners with verified, background-checked professionals who turn ordinary rooms into beautiful, functional spaces that feel like home. Whether it's a small upgrade or a complete renovation, we make every improvement count.
                </p>
              <motion.button
                onClick={goToWizard}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: ACCENT }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Scan My Home Free <ArrowRight className="w-4 h-4" />
              </motion.button>
              </div>
            </AnimSection>
          </div>
          <AnimSection variants={scaleIn}>
            <ParallaxImage src={CDN.aboutWide} alt="Beautiful living space" className="w-full h-[300px] md:h-[440px] rounded-2xl shadow-sm" />
          </AnimSection>
          <AnimSection variants={scaleIn} className="mt-4">
            <ParallaxImage src={CDN.aboutWide2} alt="Modern kitchen" className="w-full h-[240px] md:h-[340px] rounded-2xl shadow-sm" />
          </AnimSection>
        </div>
      </section>

      {/* -- STATS ------------------------------------------------------------- */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {[
              { r: s1.ref, c: s1.count, suffix: "+",  label: "Projects Completed",    desc: "Home improvements delivered on time and on budget." },
              { r: s2.ref, c: s2.count, suffix: "+",  label: "Verified DFW Partners",   desc: "Background-checked, licensed pros across the metroplex." },
              { r: s3.ref, c: s3.count, suffix: "%",  label: "Customer Satisfaction",  desc: "Consistently high praise from our homeowners." },
              { r: s4.ref, c: s4.count, suffix: "+",  label: "Homeowners Matched",      desc: "Homeowners connected to the right pro for their project." },
            ].map((s, i) => (
              <motion.div key={i} ref={s.r as React.RefObject<HTMLDivElement>} className="text-center md:text-left" variants={staggerItem}>
                <div className="text-5xl md:text-6xl font-black text-gray-950 leading-none">{s.c.toLocaleString()}{s.suffix}</div>
                <div className="mt-2 text-sm font-bold text-gray-900">{s.label}</div>
                <div className="mt-1 text-xs text-gray-500 leading-relaxed">{s.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* -- HOW IT WORKS ------------------------------------------------------ */}
      <section id="how-it-works" className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimSection variants={fadeUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-4" style={{ backgroundColor: ACCENT }}>How It Works</span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-950 leading-tight">From Photo to Pro<br />in 3 Simple Steps</h2>
            <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">No calls. No guessing. No wasted time. Just upload a few photos and let us do the work.</p>
          </AnimSection>
          <div className="relative">
            {/* Vertical connector line on desktop */}
            <div className="hidden md:block absolute left-[39px] top-12 bottom-12 w-0.5 bg-gradient-to-b from-indigo-200 via-indigo-400 to-indigo-200" />
            <motion.div
              className="space-y-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.22 } } }}
            >
              {[
                {
                  n: "01",
                  icon: Camera,
                  title: "Snap a Few Photos of Your Home",
                  desc: "Take photos of any area you're curious about -- exterior, kitchen, bathroom, yard, roof. No special equipment needed. Your phone camera is all it takes.",
                  detail: "Takes less than 2 minutes"
                },
                {
                  n: "02",
                  icon: Shield,
                  title: "Our AI Identifies What Needs Attention",
                  desc: "TrustyPro's AI scans your photos and flags issues -- cracked paint, aging gutters, worn flooring, overgrown landscaping, and 50+ more. You get a clear, honest report of what your home actually needs.",
                  detail: "Results in under 60 seconds"
                },
                {
                  n: "03",
                  icon: CheckCircle,
                  title: "We Match You with a Verified Local Pro",
                  desc: "Based on your home's needs and your zip code, we connect you with a background-checked, insured professional who specializes in exactly that type of work. No middlemen. No bidding wars. Just the right pro.",
                  detail: "Matched within hours, not days"
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  className="flex gap-6 md:gap-10 items-start"
                  variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } } }}
                >
                  {/* Step circle */}
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-lg z-10 relative" style={{ backgroundColor: ACCENT }}>
                      <step.icon className="w-7 h-7 text-white mb-1" />
                      <span className="text-xs font-black text-white/70">{step.n}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="pt-2 flex-1">
                    <h3 className="text-xl md:text-2xl font-black text-gray-950 mb-2">{step.title}</h3>
                    <p className="text-gray-500 leading-relaxed mb-3">{step.desc}</p>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: ACCENT_LIGHT, color: ACCENT }}>
                      <CheckCircle className="w-3 h-3" /> {step.detail}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          {/* -- AI Detection Demo Carousel -- */}
          <AnimSection variants={fadeUp} className="mt-14">
            <ScanDemoCarousel />
          </AnimSection>

          <AnimSection variants={fadeUp} className="text-center mt-10">
            <motion.button
              onClick={goToWizard}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white hover:opacity-90 transition-opacity shadow-lg"
              style={{ backgroundColor: ACCENT }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Try It Free -- Scan My Home <ArrowRight className="w-4 h-4" />
            </motion.button>
            <p className="text-xs text-gray-400 mt-3">Free • No account required • Results in under 60 seconds</p>
          </AnimSection>
        </div>
      </section>

      {/* -- Homeowner Problem Section -- */}
      <HomeownerProblemSection onScan={goToWizard} />

      {/* -- SERVICES ACCORDION ------------------------------------------------ */}
      <section id="services" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-4" style={{ backgroundColor: ACCENT }}>Services</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-950">Every Trade. One Trusted Network.</h2>
            <p className="mt-3 text-gray-500 text-lg">From roofing to landscaping to HVAC — every professional in the TrustyPro network is verified, insured, and rated before you ever see their name.</p>
          </AnimSection>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Accordion */}
            <AnimSection variants={fadeLeft}>
              <div>
                {SERVICES.map((svc, i) => (
                  <div key={i} className="border-b border-gray-100">
                    <button className="w-full flex items-center justify-between py-5 text-left group" onClick={() => setActiveService(i)}>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-gray-400 w-6">0{i + 1}</span>
                        <span className={`text-base font-bold transition-colors ${activeService === i ? "text-gray-950" : "text-gray-600 group-hover:text-gray-900"}`}>{svc.title}</span>
                      </div>
                      <motion.div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: activeService === i ? ACCENT : "#F3F4F6" }}
                        animate={{ rotate: activeService === i ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Plus className="w-3.5 h-3.5" style={{ color: activeService === i ? "white" : "#6B7280" }} />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {activeService === i && (
                        <motion.p
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="pb-5 pl-10 text-sm text-gray-500 leading-relaxed overflow-hidden"
                        >
                          {svc.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </AnimSection>
            {/* Photo with crossfade */}
            <AnimSection variants={fadeRight}>
              <div className="sticky top-24">
                <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeService}
                      src={SERVICES[activeService].image}
                      alt={SERVICES[activeService].title}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* -- BEFORE / AFTER ---------------------------------------------------- */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection variants={fadeUp} className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-4" style={{ backgroundColor: ACCENT }}>Results</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-950">See the Transformation</h2>
            <p className="mt-3 text-gray-500 text-lg">Drag the slider to see before and after results from real TrustyPro projects.</p>
          </AnimSection>
          <AnimSection variants={scaleIn}>
            <div className="h-[320px] md:h-[500px]">
              <BeforeAfterSlider before={CDN.beforeFront} after={CDN.afterFront} />
            </div>
          </AnimSection>
        </div>
      </section>

      {/* -- BENEFITS ---------------------------------------------------------- */}
      <section id="benefits" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <AnimSection variants={fadeLeft}>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-4" style={{ backgroundColor: ACCENT }}>Benefits</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-950 leading-tight">Why Choose TrustyPro</h2>
              <p className="mt-4 text-gray-500 text-lg leading-relaxed">We combine AI technology, verified professionals, and a seamless process to transform everyday spaces into lasting impressions.</p>
            </AnimSection>
            <motion.div
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
            >
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-50 rounded-2xl p-5 flex gap-4 items-start"
                  variants={staggerItem}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: ACCENT_LIGHT }}>
                    <b.icon className="w-5 h-5" style={{ color: ACCENT }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{b.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* -- TESTIMONIALS ------------------------------------------------------ */}
      <section className="bg-gray-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-4" style={{ backgroundColor: ACCENT }}>Reviews</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-950">What DFW Homeowners Say</h2>
            <p className="mt-3 text-gray-500 text-lg">Real reviews from real homeowners across the DFW Metroplex.</p>
          </AnimSection>
          {/* Staggered 2-column layout like Estatia -- cards come at you from different heights */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left column -- offset down */}
            <motion.div
              className="flex flex-col gap-6 md:mt-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            >
              {[TESTIMONIALS[0], TESTIMONIALS[2], TESTIMONIALS[4]].map((t, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-50"
                  variants={{ hidden: { opacity: 0, y: 48, rotate: -1 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease: EASE } } }}
                  whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.1)" }}
                >
                  <div className="flex gap-1 mb-3">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 ring-2 ring-offset-1 ring-indigo-200" style={{ background: `linear-gradient(135deg, ${ACCENT}, #7C3AED)` }}>{t.name[0]}</div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                        <div className="text-xs text-gray-400">{t.loc}</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: ACCENT }}>{t.proj}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            {/* Right column -- offset up */}
            <motion.div
              className="flex flex-col gap-6 md:-mt-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
            >
              {[TESTIMONIALS[1], TESTIMONIALS[3], TESTIMONIALS[5]].map((t, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-50"
                  variants={{ hidden: { opacity: 0, y: 48, rotate: 1 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease: EASE } } }}
                  whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.1)" }}
                >
                  <div className="flex gap-1 mb-3">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 ring-2 ring-offset-1 ring-indigo-200" style={{ background: `linear-gradient(135deg, ${ACCENT}, #7C3AED)` }}>{t.name[0]}</div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                        <div className="text-xs text-gray-400">{t.loc}</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: ACCENT }}>{t.proj}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* -- DIFFERENTIATOR ---------------------------------------------------- */}
      <section className="py-24 overflow-hidden" style={{ backgroundColor: "#0a0f1e" }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimSection variants={fadeUp} className="mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6" style={{ backgroundColor: "rgba(79,70,229,0.2)", color: "#818cf8" }}>Why TrustyPro Is Different</span>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              They used to knock on your door.<br />
              <span style={{ color: "#818cf8" }}>Now you knock on theirs.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              For years, homeowners had to deal with door-to-door salespeople, pushy contractors, and cold calls from companies they never asked to hear from. TrustyPro flips that model completely.
            </p>
          </AnimSection>
          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {[
              {
                label: "The Old Way",
                icon: "",
                color: "#ef4444",
                bg: "rgba(239,68,68,0.08)",
                border: "rgba(239,68,68,0.2)",
                points: [
                  "Strangers show up at your door uninvited",
                  "You search for contractors and hope for the best",
                  "Three bids, three different opinions, zero clarity",
                  "You don't know if they're licensed or insured",
                  "Weeks pass before work even starts",
                ],
              },
              {
                label: "The TrustyPro Way",
                icon: "",
                color: "#818cf8",
                bg: "rgba(79,70,229,0.08)",
                border: "rgba(79,70,229,0.3)",
                points: [
                  "You initiate -- on your terms, on your timeline",
                  "AI scans your home and tells you exactly what it needs",
                  "One verified pro matched to your specific project",
                  "Every pro is background-checked, licensed, and insured",
                  "Matched within hours -- work starts when you're ready",
                ],
              },
            ].map((col, i) => (
              <motion.div
                key={i}
                className="rounded-2xl p-7 border"
                style={{ backgroundColor: col.bg, borderColor: col.border }}
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl font-black" style={{ color: col.color }}>{col.icon}</span>
                  <span className="font-black text-white text-lg">{col.label}</span>
                </div>
                <ul className="space-y-3">
                  {col.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 text-sm font-bold" style={{ color: col.color }}>{col.icon}</span>
                      <span className="text-gray-300 text-sm leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          <AnimSection variants={fadeUp}>
            <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: "rgba(79,70,229,0.12)", border: "1px solid rgba(79,70,229,0.25)" }}>
              <p className="text-2xl md:text-3xl font-black text-white leading-snug mb-2">
                "We don't sell you anything. We find what your home needs -- and connect you with someone who can fix it."
              </p>
              <p className="text-gray-500 text-sm">-- The TrustyPro Promise</p>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* -- FAQ --------------------------------------------------------------- */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <AnimSection variants={fadeLeft}>
              <h2 className="text-4xl md:text-5xl font-black text-gray-950 leading-tight">Frequently Asked Questions</h2>
              <p className="mt-4 text-gray-500 leading-relaxed">Clear answers to common questions about our services and how TrustyPro works.</p>
              <motion.button
                onClick={() => scrollTo("contact")}
                className="mt-6 px-6 py-3 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: ACCENT }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Support
              </motion.button>
            </AnimSection>
            <AnimSection variants={fadeRight}>
              <div>
                {FAQS.map((faq, i) => (
                  <div key={i} className="border-b border-gray-200">
                    <button className="w-full flex items-center justify-between py-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span className="font-medium text-gray-900 pr-4 text-sm">{faq.q}</span>
                      <motion.div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: openFaq === i ? ACCENT : "#F3F4F6" }}
                        animate={{ rotate: openFaq === i ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Plus className="w-3.5 h-3.5" style={{ color: openFaq === i ? "white" : "#6B7280" }} />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.p
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="pb-5 text-sm text-gray-500 leading-relaxed overflow-hidden"
                        >
                          {faq.a}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* -- CTA --------------------------------------------------------------- */}
      <section id="contact" className="bg-gray-950 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl md:text-6xl font-black text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            Ready to Transform Your Home?
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            Get matched with a verified TrustyPro contractor in your area today. Upload photos of your home and let our AI find exactly what needs attention.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          >
              <motion.button
                onClick={goToWizard}
                className="px-8 py-4 rounded-full text-base font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: ACCENT }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Scan My Home Free
              </motion.button>
              <motion.button
                onClick={() => navigate("/trustypro/directory")}
                className="px-8 py-4 rounded-full text-base font-semibold text-gray-900 bg-white hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Browse Verified Pros
              </motion.button>
          </motion.div>
        </div>
      </section>

      {/* -- FOOTER ------------------------------------------------------------ */}
      <footer className="bg-gray-950 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <TrustyProLogo height={34} variant="dark" />
              <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">At TrustyPro, we transform DFW homes with verified professionals who blend style, function, and lasting quality into every project.</p>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Menu</div>
              <div className="space-y-2">
                {[["about","About Us"],["projects","Projects"],["services","Services"],["benefits","Benefits"]].map(([id,label]) => (
                  <button key={id} onClick={() => scrollTo(id)} className="block text-sm text-gray-400 hover:text-white transition-colors">{label}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Contact</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400"><Mail className="w-3.5 h-3.5" /> support@trustypro.com</div>
                <div className="flex items-center gap-2 text-sm text-gray-400"><Phone className="w-3.5 h-3.5" /> (214) 555-0100</div>
                <div className="flex items-center gap-2 text-sm text-gray-400"><MapPin className="w-3.5 h-3.5" /> DFW Metroplex, TX</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">TrustyPro 2026. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</a>
              <a href="/ccpa" className="text-xs text-gray-500 hover:text-white transition-colors">CCPA Rights</a>
              <button onClick={() => scrollTo("contact")} className="text-xs text-gray-500 hover:text-white transition-colors">Find a Pro</button>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee-tp { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee-tp { animation: marquee-tp 30s linear infinite; }
      `}</style>
      <SupportChatWidget
        mode="homeowner"
        accentColor="#4F46E5"
        title="TrustyPro Support"
        subtitle="Ask us anything about the platform"
      />
    </div>
  );
}
