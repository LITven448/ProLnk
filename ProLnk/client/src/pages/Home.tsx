import {
  useState,
  useEffect,
  useRef,
  useMemo,
  Suspense,
  type ReactNode,
  type CSSProperties,
} from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Briefcase,
  Camera,
  CheckCircle2,
  Crown,
  DollarSign,
  Home as HomeIcon,
  Layers,
  Lock,
  Megaphone,
  Network,
  Repeat,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

// ---------------------------------------------------------------------------
// Design tokens (light mode)
// ---------------------------------------------------------------------------
const NAVY = "#0A1628";
const TEAL = "#2DD4BF";
const GOLD = "#F5C518";
const ICE = "#F7FAFC";

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------
function useMediaFlag(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

function useMountedAfterPaint(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMounted(true)),
    );
    return () => cancelAnimationFrame(raf);
  }, []);
  return mounted;
}

// ---------------------------------------------------------------------------
// 3D network scene (hero)
// ---------------------------------------------------------------------------
type NetworkNode = {
  base: THREE.Vector3;
  scale: number;
  speed: number;
  phase: number;
  color: string;
};

function buildNetwork(count: number) {
  const nodes: NetworkNode[] = [];
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 9.5;
    const y = (Math.random() - 0.5) * 5.2;
    const z = (Math.random() - 0.5) * 4.0;
    const roll = Math.random();
    nodes.push({
      base: new THREE.Vector3(x, y, z),
      scale: 0.05 + Math.random() * 0.09,
      speed: 0.4 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      color: roll > 0.92 ? GOLD : roll > 0.42 ? TEAL : NAVY,
    });
  }
  const pairs: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      if (nodes[i].base.distanceTo(nodes[j].base) < 2.35) {
        pairs.push([i, j]);
        if (pairs.length >= 130) return { nodes, pairs };
      }
    }
  }
  return { nodes, pairs };
}

function NetworkField() {
  const { nodes, pairs } = useMemo(() => buildNetwork(64), []);
  const pointerGroup = useRef<THREE.Group>(null);
  const spinGroup = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const lineAttr = useRef<THREE.BufferAttribute>(null);

  const sphereGeo = useMemo(() => new THREE.SphereGeometry(1, 16, 16), []);
  const materials = useMemo(() => {
    const make = (color: string, opacity: number) =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.35,
        metalness: 0.15,
        transparent: true,
        opacity,
      });
    return {
      [TEAL]: make(TEAL, 0.95),
      [NAVY]: make(NAVY, 0.85),
      [GOLD]: make(GOLD, 0.95),
    } as Record<string, THREE.MeshStandardMaterial>;
  }, []);

  const linePositions = useMemo(
    () => new Float32Array(pairs.length * 6),
    [pairs],
  );

  useEffect(() => {
    return () => {
      sphereGeo.dispose();
      Object.values(materials).forEach((m) => m.dispose());
    };
  }, [sphereGeo, materials]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (spinGroup.current) spinGroup.current.rotation.y = t * 0.05;
    if (pointerGroup.current) {
      pointerGroup.current.rotation.y = THREE.MathUtils.lerp(
        pointerGroup.current.rotation.y,
        state.pointer.x * 0.32,
        0.045,
      );
      pointerGroup.current.rotation.x = THREE.MathUtils.lerp(
        pointerGroup.current.rotation.x,
        -state.pointer.y * 0.18,
        0.045,
      );
    }

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const mesh = meshRefs.current[i];
      if (!mesh) continue;
      mesh.position.set(
        n.base.x + Math.sin(t * n.speed + n.phase) * 0.16,
        n.base.y + Math.cos(t * n.speed * 0.9 + n.phase) * 0.2,
        n.base.z + Math.sin(t * n.speed * 0.7 + n.phase * 1.3) * 0.14,
      );
    }

    for (let p = 0; p < pairs.length; p++) {
      const [a, b] = pairs[p];
      const ma = meshRefs.current[a];
      const mb = meshRefs.current[b];
      if (!ma || !mb) continue;
      linePositions[p * 6 + 0] = ma.position.x;
      linePositions[p * 6 + 1] = ma.position.y;
      linePositions[p * 6 + 2] = ma.position.z;
      linePositions[p * 6 + 3] = mb.position.x;
      linePositions[p * 6 + 4] = mb.position.y;
      linePositions[p * 6 + 5] = mb.position.z;
    }
    if (lineAttr.current) lineAttr.current.needsUpdate = true;
  });

  return (
    <group ref={pointerGroup}>
      <group ref={spinGroup}>
        {nodes.map((n, i) => (
          <mesh
            key={i}
            ref={(el) => {
              meshRefs.current[i] = el;
            }}
            geometry={sphereGeo}
            material={materials[n.color]}
            scale={n.scale}
            position={[n.base.x, n.base.y, n.base.z]}
          />
        ))}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              ref={lineAttr}
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={TEAL} transparent opacity={0.28} />
        </lineSegments>
      </group>
    </group>
  );
}

function HeroFallbackArt() {
  const dots: [number, number, number, string][] = [
    [180, 140, 9, TEAL],
    [320, 90, 6, NAVY],
    [470, 160, 11, TEAL],
    [610, 110, 7, GOLD],
    [250, 280, 7, NAVY],
    [420, 320, 9, TEAL],
    [580, 270, 6, NAVY],
    [690, 350, 8, TEAL],
    [140, 360, 6, TEAL],
    [330, 420, 7, GOLD],
  ];
  const links: [number, number, number, number][] = [
    [180, 140, 320, 90],
    [320, 90, 470, 160],
    [470, 160, 610, 110],
    [180, 140, 250, 280],
    [250, 280, 420, 320],
    [420, 320, 470, 160],
    [420, 320, 580, 270],
    [580, 270, 690, 350],
    [140, 360, 250, 280],
    [330, 420, 420, 320],
  ];
  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full h-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="plnk-glow" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor={TEAL} stopOpacity="0.22" />
          <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#plnk-glow)" />
      {links.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={TEAL}
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
      ))}
      {dots.map(([x, y, r, c], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={c} opacity={0.85} />
      ))}
    </svg>
  );
}

function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8.5], fov: 48 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <directionalLight position={[-5, -3, 2]} intensity={0.4} color={TEAL} />
      <NetworkField />
    </Canvas>
  );
}

// ---------------------------------------------------------------------------
// Motion primitives
// ---------------------------------------------------------------------------
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.6, 0.35, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({
  value,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current)
          ref.current.textContent = `${prefix}${Math.round(v).toLocaleString()}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, prefix]);
  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

function MagneticButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={className}
      style={{ display: "inline-block", willChange: "transform" }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.22}px)`;
        el.style.transition = "transform 0.12s ease-out";
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "translate(0,0)";
        el.style.transition = "transform 0.45s cubic-bezier(0.16,1,0.3,1)";
      }}
    >
      {children}
    </div>
  );
}

function TiltCard({
  children,
  className,
  glowColor = TEAL,
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div style={{ perspective: "1100px" }} className="h-full">
      <div
        ref={ref}
        className={className}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          transition:
            "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease",
        }}
        onMouseMove={(e) => {
          const el = ref.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          el.style.transition =
            "transform 0.08s ease-out, box-shadow 0.35s ease";
          el.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateZ(8px)`;
          el.style.boxShadow = `0 30px 60px -18px ${glowColor}33, 0 8px 24px -8px rgba(10,22,40,0.12)`;
        }}
        onMouseLeave={() => {
          const el = ref.current;
          if (!el) return;
          el.style.transition =
            "transform 0.55s cubic-bezier(0.16,1,0.3,1), box-shadow 0.55s ease";
          el.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0)";
          el.style.boxShadow = "0 8px 30px -12px rgba(10,22,40,0.10)";
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Decorative bits
// ---------------------------------------------------------------------------
const gradientTextStyle: CSSProperties = {
  backgroundImage: `linear-gradient(90deg, ${NAVY} 0%, ${TEAL} 35%, #0EA5A0 55%, ${NAVY} 100%)`,
  backgroundSize: "220% 100%",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  animation: "plnk-gradient-pan 7s ease-in-out infinite",
};

const TRADES = [
  "Plumbing",
  "HVAC",
  "Electrical",
  "Roofing",
  "Landscaping",
  "Painting",
  "Fencing",
  "Garage Doors",
  "Gutters",
  "Pool Service",
  "Pest Control",
  "Concrete",
  "Windows",
  "Solar",
  "Foundation",
];

function TradeMarquee() {
  const row = (key: string, ariaHidden: boolean) => (
    <div
      key={key}
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {TRADES.map((t) => (
        <span
          key={`${key}-${t}`}
          className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.18em] whitespace-nowrap"
          style={{ color: "rgba(10,22,40,0.45)" }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: TEAL }}
          />
          {t}
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden py-5 border-y border-slate-200/70 bg-white/50 backdrop-blur-sm">
      <div
        className="flex w-max"
        style={{ animation: "plnk-marquee 42s linear infinite" }}
      >
        {row("a", false)}
        {row("b", true)}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

function SectionLabel({
  children,
  color = TEAL,
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] backdrop-blur-md"
      style={{
        color: color === GOLD ? "#946F00" : "#0F766E",
        borderColor: `${color}55`,
        background: `${color}14`,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page data
// ---------------------------------------------------------------------------
const INCOME_STREAMS = [
  {
    icon: DollarSign,
    title: "Direct Job Commission",
    tag: "Stream 01",
    desc: "Keep up to 72% on every job ProLnk routes to you. Your work, your margin — the network just keeps the calendar full.",
    accent: TEAL,
  },
  {
    icon: Network,
    title: "4-Level Network Override",
    tag: "Stream 02",
    desc: "Earn 7% / 4% / 2% / 1% on jobs closed by pros in your network — four levels deep. Your recruits become recurring revenue.",
    accent: NAVY,
  },
  {
    icon: Repeat,
    title: "Subscription Override",
    tag: "Stream 03",
    desc: "Refer a pro, earn a recurring cut of their subscription every single month they stay on the platform. True passive income.",
    accent: TEAL,
  },
  {
    icon: Megaphone,
    title: "Lead Origination",
    tag: "Stream 04",
    desc: "Source homeowners into the network and get paid per qualified lead — whether or not you ever swing a hammer for them.",
    accent: NAVY,
  },
  {
    icon: HomeIcon,
    title: "Home Origination Rights",
    tag: "Stream 05",
    desc: "Bring a home into the ProLnk system and earn a permanent share of platform fees on that property. Forever. That's equity-grade income.",
    accent: GOLD,
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: BadgeCheck,
    title: "Apply & Get Vetted",
    desc: "Submit your trade, license, and service area. Our ProPass verification clears you for the network — homeowners see a pro they can trust.",
  },
  {
    step: "02",
    icon: Camera,
    title: "Work & Document",
    desc: "Do the jobs you already do. Every property you touch feeds the network — AI detects new opportunities from the work you document.",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Earn On Everything",
    desc: "Direct jobs, your network's jobs, subscriptions, leads, and origination rights — five streams compounding while you sleep.",
  },
];

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
function Hero({
  proCount,
  spotsRemaining,
}: {
  proCount: number;
  spotsRemaining: number;
}) {
  const reducedMotion = useMediaFlag("(prefers-reduced-motion: reduce)");
  const smallScreen = useMediaFlag("(max-width: 767px)");
  const painted = useMountedAfterPaint();
  const show3D = painted && !reducedMotion && !smallScreen;

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      style={{
        background: `radial-gradient(1200px 600px at 75% 20%, ${TEAL}1f 0%, transparent 60%), radial-gradient(900px 500px at 15% 85%, ${GOLD}14 0%, transparent 55%), linear-gradient(180deg, #FFFFFF 0%, ${ICE} 100%)`,
      }}
    >
      <div className="absolute inset-0">
        {show3D ? (
          <Suspense fallback={<HeroFallbackArt />}>
            <HeroCanvas />
          </Suspense>
        ) : (
          <HeroFallbackArt />
        )}
      </div>

      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-32 pb-24"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <SectionLabel>DFW Founding Network — Now Open</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-black leading-[0.98] tracking-tight"
            style={{ fontSize: "clamp(2.6rem, 7vw, 5.2rem)", color: NAVY }}
          >
            ProLnk — the pro network where you{" "}
            <span style={gradientTextStyle}>earn beyond your own jobs</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 text-lg md:text-xl leading-relaxed max-w-xl"
            style={{ color: "rgba(10,22,40,0.62)" }}
          >
            Five income streams for home-service professionals: your jobs, your
            network's jobs, subscriptions, leads, and permanent origination
            rights. One platform, compounding forever.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <Link
                href="/apply"
                className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-base font-bold text-white shadow-xl transition-shadow hover:shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${NAVY} 0%, #14304f 100%)`,
                  boxShadow: `0 18px 40px -12px ${NAVY}55`,
                }}
              >
                Apply to Join
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/partner-checkout"
                className="inline-flex items-center gap-2 rounded-full border-2 px-7 py-[14px] text-base font-bold backdrop-blur-md transition-colors hover:bg-white"
                style={{
                  borderColor: `${TEAL}88`,
                  color: "#0F766E",
                  background: "rgba(255,255,255,0.6)",
                }}
              >
                Lock Your Founding Spot
                <Crown className="w-4 h-4" style={{ color: GOLD }} />
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 inline-flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-white/70 bg-white/60 px-6 py-4 backdrop-blur-xl shadow-lg shadow-slate-900/5"
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" style={{ color: TEAL }} />
              <span className="text-sm font-semibold" style={{ color: NAVY }}>
                {proCount.toLocaleString()} pros on the waitlist
              </span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-slate-200" />
            <div className="flex items-center gap-2.5">
              <Crown className="w-4 h-4" style={{ color: GOLD }} />
              <span className="text-sm font-semibold" style={{ color: NAVY }}>
                {spotsRemaining} founding spots remaining
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-slate-300 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2.5 rounded-full" style={{ background: TEAL }} />
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------
function IncomeStreams() {
  return (
    <section className="relative py-28" style={{ background: ICE }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center mb-16">
          <div className="flex justify-center">
            <SectionLabel>The Network Income System</SectionLabel>
          </div>
          <h2
            className="mt-5 font-black tracking-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", color: NAVY }}
          >
            Five streams. <span style={gradientTextStyle}>One network.</span>
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto text-lg"
            style={{ color: "rgba(10,22,40,0.6)" }}
          >
            Most platforms pay you once per job. ProLnk pays you on the job, the
            network, the subscription, the lead, and the home — permanently.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {INCOME_STREAMS.map((s) => (
            <motion.div key={s.title} variants={fadeUp} className="h-full">
              <TiltCard
                glowColor={s.accent}
                className="h-full rounded-3xl border border-white/80 bg-white/70 p-8 backdrop-blur-xl"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: `${s.accent}1a` }}
                  >
                    <s.icon
                      className="h-6 w-6"
                      style={{
                        color:
                          s.accent === NAVY
                            ? NAVY
                            : s.accent === GOLD
                              ? "#B8860B"
                              : "#0F766E",
                      }}
                    />
                  </div>
                  <span
                    className="text-xs font-bold uppercase tracking-[0.2em]"
                    style={{
                      color: s.accent === GOLD ? "#B8860B" : s.accent === NAVY ? "rgba(10,22,40,0.5)" : "#0F766E",
                    }}
                  >
                    {s.tag}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold" style={{ color: NAVY }}>
                  {s.title}
                </h3>
                <p
                  className="mt-3 leading-relaxed"
                  style={{ color: "rgba(10,22,40,0.6)" }}
                >
                  {s.desc}
                </p>
              </TiltCard>
            </motion.div>
          ))}

          <motion.div variants={fadeUp} className="h-full">
            <TiltCard
              glowColor={GOLD}
              className="relative h-full overflow-hidden rounded-3xl p-8 flex flex-col justify-between"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${NAVY} 0%, #122a47 100%)`,
                }}
              />
              <div className="relative">
                <Sparkles className="h-7 w-7" style={{ color: GOLD }} />
                <h3 className="mt-5 text-xl font-bold text-white">
                  See your numbers
                </h3>
                <p className="mt-3 leading-relaxed text-white/65">
                  Watch the live network grow, then model what your seat in it
                  is worth.
                </p>
              </div>
              <Link
                href="/network-stats"
                className="relative mt-6 inline-flex items-center gap-2 font-bold transition-opacity hover:opacity-80"
                style={{ color: TEAL }}
              >
                Explore live network stats <ArrowUpRight className="h-4 w-4" />
              </Link>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 bg-white">
      <motion.div
        aria-hidden="true"
        style={{
          y: orbY,
          background: `radial-gradient(circle, ${TEAL}26 0%, transparent 70%)`,
        }}
        className="pointer-events-none absolute -left-32 top-1/4 h-[480px] w-[480px] rounded-full"
      />
      <motion.div
        aria-hidden="true"
        style={{
          y: orbY2,
          background: `radial-gradient(circle, ${GOLD}1f 0%, transparent 70%)`,
        }}
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center mb-16">
          <div className="flex justify-center">
            <SectionLabel>How It Works</SectionLabel>
          </div>
          <h2
            className="mt-5 font-black tracking-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", color: NAVY }}
          >
            Three steps to a compounding business
          </h2>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {HOW_IT_WORKS.map((s, i) => (
            <motion.div key={s.step} variants={fadeUp} className="relative">
              <div className="group relative h-full rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_-12px_rgba(10,22,40,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_-16px_rgba(45,212,191,0.25)]">
                <div
                  className="text-6xl font-black opacity-[0.07] absolute right-6 top-4 select-none"
                  style={{ color: NAVY }}
                >
                  {s.step}
                </div>
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `linear-gradient(135deg, ${TEAL}22, ${TEAL}0d)`,
                  }}
                >
                  <s.icon className="h-7 w-7" style={{ color: "#0F766E" }} />
                </div>
                <h3 className="mt-6 text-xl font-bold" style={{ color: NAVY }}>
                  {s.title}
                </h3>
                <p
                  className="mt-3 leading-relaxed"
                  style={{ color: "rgba(10,22,40,0.6)" }}
                >
                  {s.desc}
                </p>
              </div>
              {i < HOW_IT_WORKS.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-6 z-10 h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
                  <ArrowRight className="h-4 w-4" style={{ color: TEAL }} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ExchangeTeaser() {
  return (
    <section className="py-28" style={{ background: ICE }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-16"
            style={{
              background: `linear-gradient(120deg, ${NAVY} 0%, #11293f 55%, #0d3a38 100%)`,
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full"
              style={{
                background: `radial-gradient(circle, ${TEAL}33 0%, transparent 70%)`,
              }}
            />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionLabel>Coming to the Network</SectionLabel>
                <h2
                  className="mt-5 font-black tracking-tight text-white"
                  style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
                >
                  The ProLnk <span style={{ color: TEAL }}>Exchange</span>
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/65 max-w-lg">
                  A pro-to-pro job board. Overbooked? Post the overflow. Slow
                  week? Pick up vetted jobs from other partners — commercial and
                  residential — with AI-curated quotes and network-cleared
                  crews.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/exchange/commercial"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold transition-transform hover:scale-[1.03]"
                    style={{ background: TEAL, color: NAVY }}
                  >
                    Preview the Exchange <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/advertise"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-bold text-white/85 transition-colors hover:bg-white/10"
                  >
                    Advertise with ProLnk <Megaphone className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="space-y-4"
              >
                {[
                  {
                    icon: Briefcase,
                    title: "Commercial overflow job",
                    meta: "HVAC retrofit · 12,000 sq ft · Plano",
                    value: "$18,400",
                  },
                  {
                    icon: Wrench,
                    title: "Residential re-pipe",
                    meta: "Plumbing · PEX whole-home · Frisco",
                    value: "$6,900",
                  },
                  {
                    icon: Zap,
                    title: "Panel upgrade + EV charger",
                    meta: "Electrical · 200A service · Dallas",
                    value: "$4,150",
                  },
                ].map((job) => (
                  <motion.div
                    key={job.title}
                    variants={fadeUp}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-md transition-colors hover:bg-white/[0.12]"
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${TEAL}26` }}
                    >
                      <job.icon className="h-5 w-5" style={{ color: TEAL }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-white truncate">
                        {job.title}
                      </div>
                      <div className="text-sm text-white/50 truncate">
                        {job.meta}
                      </div>
                    </div>
                    <div className="font-black" style={{ color: TEAL }}>
                      {job.value}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TrustSection() {
  const items = [
    {
      icon: Shield,
      title: "ProPass Verification",
      desc: "License checks, background screening, and insurance verification before any pro touches a home in the network.",
    },
    {
      icon: BadgeCheck,
      title: "Vetted, Not Listed",
      desc: "ProLnk is not a directory. Every partner is cleared, badged, and accountable to network standards.",
    },
    {
      icon: Lock,
      title: "Locked Founding Rates",
      desc: "Founding partners lock their rate forever. No bait-and-switch pricing, no auction-style lead fees.",
    },
    {
      icon: Layers,
      title: "Homeowner Side Built In",
      desc: "Our TrustyPro brand brings homeowners to the same network — demand and supply under one roof.",
    },
  ];
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <Reveal className="lg:col-span-2 lg:sticky lg:top-28">
            <SectionLabel>Trust & Vetting</SectionLabel>
            <h2
              className="mt-5 font-black tracking-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: NAVY }}
            >
              A network is only as strong as who gets in
            </h2>
            <p
              className="mt-5 text-lg leading-relaxed"
              style={{ color: "rgba(10,22,40,0.6)" }}
            >
              Every income stream depends on quality. That's why ProPass
              clearance is the gate — and the reason homeowners say yes.
            </p>
            <Link
              href="/trustypro"
              className="mt-7 inline-flex items-center gap-2 font-bold transition-opacity hover:opacity-80"
              style={{ color: "#0F766E" }}
            >
              See the homeowner side — TrustyPro{" "}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {items.map((it) => (
              <motion.div
                key={it.title}
                variants={fadeUp}
                className="rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/60 p-7 shadow-[0_8px_30px_-14px_rgba(10,22,40,0.08)] transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: `${TEAL}18` }}
                >
                  <it.icon className="h-6 w-6" style={{ color: "#0F766E" }} />
                </div>
                <h3 className="mt-5 text-lg font-bold" style={{ color: NAVY }}>
                  {it.title}
                </h3>
                <p
                  className="mt-2.5 text-sm leading-relaxed"
                  style={{ color: "rgba(10,22,40,0.6)" }}
                >
                  {it.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LiveStats({
  pros,
  homes,
  approved,
}: {
  pros: number;
  homes: number;
  approved: number;
}) {
  const stats = [
    { label: "Pros on the waitlist", value: pros, icon: Users, accent: TEAL },
    {
      label: "Homes ready for the network",
      value: homes,
      icon: HomeIcon,
      accent: TEAL,
    },
    {
      label: "Founding partners approved",
      value: approved,
      icon: Crown,
      accent: GOLD,
    },
    {
      label: "Income streams per partner",
      value: 5,
      icon: BarChart3,
      accent: NAVY,
    },
  ];
  return (
    <section className="py-24" style={{ background: ICE }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <SectionLabel>Live Network Pulse</SectionLabel>
            <h2
              className="mt-5 font-black tracking-tight"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", color: NAVY }}
            >
              The network, in real numbers
            </h2>
          </div>
          <Link
            href="/network-stats"
            className="inline-flex items-center gap-2 font-bold whitespace-nowrap transition-opacity hover:opacity-75"
            style={{ color: "#0F766E" }}
          >
            Full network stats <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="rounded-3xl border border-white bg-white/75 p-7 backdrop-blur-xl shadow-[0_10px_36px_-16px_rgba(10,22,40,0.12)]"
            >
              <s.icon
                className="h-5 w-5"
                style={{
                  color:
                    s.accent === GOLD
                      ? "#B8860B"
                      : s.accent === NAVY
                        ? NAVY
                        : "#0F766E",
                }}
              />
              <div
                className="mt-4 font-black tabular-nums tracking-tight"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  color: NAVY,
                }}
              >
                <CountUp value={s.value} />
              </div>
              <div
                className="mt-1.5 text-sm font-medium"
                style={{ color: "rgba(10,22,40,0.55)" }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FoundingUrgency({
  approved,
  spotsRemaining,
}: {
  approved: number;
  spotsRemaining: number;
}) {
  const total = approved + spotsRemaining;
  const pct =
    total > 0 ? Math.min(100, Math.round((approved / total) * 100)) : 0;
  return (
    <section className="relative overflow-hidden py-28 bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${GOLD}66, transparent)`,
        }}
      />
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <div className="flex justify-center">
            <SectionLabel color={GOLD}>Founding Network</SectionLabel>
          </div>
          <h2
            className="mt-6 font-black tracking-tight"
            style={{ fontSize: "clamp(2.1rem, 5vw, 3.8rem)", color: NAVY }}
          >
            Founding spots don't reopen.{" "}
            <span
              style={{
                backgroundImage: `linear-gradient(90deg, #B8860B, ${GOLD}, #B8860B)`,
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                animation: "plnk-gradient-pan 5s ease-in-out infinite",
              }}
            >
              Ever.
            </span>
          </h2>
          <p
            className="mt-5 max-w-2xl mx-auto text-lg"
            style={{ color: "rgba(10,22,40,0.62)" }}
          >
            Founding partners lock their monthly rate for life, keep the
            highest commission share, and hold first position in the 4-level
            override cascade. When the spots are gone, the door closes.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div
            className="mx-auto max-w-xl rounded-3xl border p-8 backdrop-blur-xl"
            style={{
              borderColor: `${GOLD}44`,
              background: `linear-gradient(160deg, #FFFDF4 0%, #FFFFFF 70%)`,
              boxShadow: `0 24px 60px -20px ${GOLD}33`,
            }}
          >
            <div
              className="flex items-center justify-between text-sm font-bold"
              style={{ color: NAVY }}
            >
              <span className="inline-flex items-center gap-2">
                <Crown className="h-4 w-4" style={{ color: "#B8860B" }} />
                <CountUp value={approved} /> approved
              </span>
              <span style={{ color: "#946F00" }}>
                <CountUp value={spotsRemaining} /> spots left
              </span>
            </div>
            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${GOLD}, #E0A800)`,
                }}
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.max(pct, 4)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="mt-7">
              <MagneticButton>
                <Link
                  href="/partner-checkout"
                  className="inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-base font-black transition-shadow hover:shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD} 0%, #E8B400 100%)`,
                    color: NAVY,
                    boxShadow: `0 18px 40px -12px ${GOLD}66`,
                  }}
                >
                  Claim a Founding Spot <ArrowRight className="h-5 w-5" />
                </Link>
              </MagneticButton>
            </div>
            <p className="mt-4 text-xs" style={{ color: "rgba(10,22,40,0.45)" }}>
              Rate locked for life · 4-level override priority · Cancel anytime
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-32"
      style={{
        background: `linear-gradient(160deg, ${NAVY} 0%, #0e2238 60%, #0c3433 100%)`,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full"
        style={{
          background: `radial-gradient(ellipse, ${TEAL}22 0%, transparent 65%)`,
        }}
      />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <h2
            className="font-black tracking-tight text-white"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)" }}
          >
            Your trade built your income.
            <br />
            <span style={{ color: TEAL }}>The network multiplies it.</span>
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto">
            Join the ProLnk founding network and start earning on five streams
            — including the jobs you never have to show up for.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <Link
                href="/apply"
                className="inline-flex items-center gap-2.5 rounded-full px-10 py-4 text-lg font-black transition-transform hover:scale-[1.03]"
                style={{
                  background: TEAL,
                  color: NAVY,
                  boxShadow: `0 20px 50px -14px ${TEAL}66`,
                }}
              >
                Apply Now <ArrowRight className="h-5 w-5" />
              </Link>
            </MagneticButton>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 font-bold text-white/85 transition-colors hover:bg-white/10"
            >
              Partner Login
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/40">
            {[
              "No payment to apply",
              "ProPass vetted network",
              "DFW launch market",
            ].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" style={{ color: TEAL }} /> {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_-16px_rgba(10,22,40,0.18)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl font-black text-white"
            style={{ background: `linear-gradient(135deg, ${NAVY}, #1a3a5c)` }}
          >
            P
          </div>
          <span
            className="text-xl font-black tracking-tight"
            style={{ color: NAVY }}
          >
            Pro<span style={{ color: "#0F766E" }}>Lnk</span>
          </span>
        </Link>
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-semibold"
          style={{ color: "rgba(10,22,40,0.65)" }}
        >
          <Link
            href="/network-stats"
            className="transition-colors hover:text-teal-700"
          >
            Network Stats
          </Link>
          <Link
            href="/exchange/commercial"
            className="transition-colors hover:text-teal-700"
          >
            Exchange
          </Link>
          <Link
            href="/advertise"
            className="transition-colors hover:text-teal-700"
          >
            Advertise
          </Link>
          <Link
            href="/trustypro"
            className="transition-colors hover:text-teal-700"
          >
            For Homeowners
          </Link>
          <Link
            href="/dashboard"
            className="transition-colors hover:text-teal-700"
          >
            Partner Login
          </Link>
        </nav>
        <MagneticButton>
          <Link
            href="/apply"
            className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-shadow hover:shadow-lg"
            style={{ background: NAVY }}
          >
            Apply <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </MagneticButton>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg font-black text-white text-sm"
            style={{ background: NAVY }}
          >
            P
          </div>
          <span className="font-black tracking-tight" style={{ color: NAVY }}>
            ProLnk
          </span>
          <span className="text-sm" style={{ color: "rgba(10,22,40,0.4)" }}>
            · The pro network with compounding income
          </span>
        </div>
        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium"
          style={{ color: "rgba(10,22,40,0.55)" }}
        >
          <Link href="/apply" className="hover:text-teal-700 transition-colors">
            Apply
          </Link>
          <Link
            href="/partner-checkout"
            className="hover:text-teal-700 transition-colors"
          >
            Founding Checkout
          </Link>
          <Link
            href="/exchange/commercial"
            className="hover:text-teal-700 transition-colors"
          >
            Exchange
          </Link>
          <Link
            href="/advertise"
            className="hover:text-teal-700 transition-colors"
          >
            Advertise
          </Link>
          <Link
            href="/network-stats"
            className="hover:text-teal-700 transition-colors"
          >
            Network Stats
          </Link>
          <Link
            href="/trustypro"
            className="hover:text-teal-700 transition-colors"
          >
            TrustyPro
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-teal-700 transition-colors"
          >
            Partner Login
          </Link>
        </nav>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function Home() {
  const { data: foundingData } =
    trpc.directory.getFoundingPartnerCount.useQuery();
  const { data: publicCounts } = trpc.waitlist.getPublicCounts.useQuery(
    undefined,
    { refetchInterval: 60000 },
  );

  const waitlistPros = publicCounts?.pros ?? 0;
  const waitlistHomes = publicCounts?.homes ?? 0;
  const approvedPartners = foundingData?.approvedCount ?? 0;
  const spotsRemaining = foundingData?.spotsRemaining ?? 50;

  return (
    <div className="min-h-screen bg-white antialiased" style={{ color: NAVY }}>
      <Helmet>
        <title>
          ProLnk — The Pro Network Where You Earn Beyond Your Own Jobs
        </title>
        <meta
          name="description"
          content="ProLnk is the home-service pro network with five income streams: direct commissions, 4-level network overrides, subscription overrides, lead origination, and permanent home origination rights. Founding spots open in DFW."
        />
        <meta property="og:title" content="ProLnk — Earn Beyond Your Own Jobs" />
        <meta
          property="og:description"
          content="Five income streams for home-service professionals. Join the ProLnk founding network."
        />
      </Helmet>

      <style>{`
        @keyframes plnk-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes plnk-gradient-pan {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      <TopNav />
      <Hero proCount={waitlistPros} spotsRemaining={spotsRemaining} />
      <TradeMarquee />
      <IncomeStreams />
      <HowItWorks />
      <ExchangeTeaser />
      <TrustSection />
      <LiveStats
        pros={waitlistPros}
        homes={waitlistHomes}
        approved={approvedPartners}
      />
      <FoundingUrgency
        approved={approvedPartners}
        spotsRemaining={spotsRemaining}
      />
      <FinalCTA />
      <Footer />
    </div>
  );
}
