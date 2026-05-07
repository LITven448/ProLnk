import { useRef, useEffect, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

// ─── Types ───────────────────────────────────────────────────────────────────

interface StatItem {
  value: string;
  label: string;
  prefix?: string;
}

interface Tier {
  name: string;
  price: string;
  borderColor: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

interface Placement {
  title: string;
  description: string;
  tag: string;
}

interface Card {
  icon: string;
  title: string;
  body: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STATS: StatItem[] = [
  { value: "10,000", prefix: "", label: "Verified Professionals" },
  { value: "150,000", prefix: "", label: "Homeowner Profiles" },
  { value: "65", prefix: "", label: "Trade Categories" },
  { value: "94", prefix: "", label: "Campaign Completion Rate" },
];

const TIERS: Tier[] = [
  {
    name: "Spotlight",
    price: "$499/mo",
    borderColor: "#17C1E8",
    features: [
      "Partner directory listing",
      "1 email blast per month",
      "Click & impression analytics",
      "Monthly performance report",
      "Cancel anytime",
    ],
    cta: "Start Spotlight",
  },
  {
    name: "Featured",
    price: "$1,499/mo",
    borderColor: "#A855F7",
    highlight: true,
    features: [
      "Priority placement in feed",
      "Weekly email campaign",
      "Full-width banner ads",
      "Bi-weekly performance report",
      "Territory exclusivity option",
      "Cancel anytime",
    ],
    cta: "Go Featured",
  },
  {
    name: "Enterprise",
    price: "Custom",
    borderColor: "#F59E0B",
    features: [
      "Full campaign management",
      "Dedicated account rep",
      "Custom integrations",
      "Custom territory exclusivity",
      "Quarterly strategy calls",
      "Priority support",
    ],
    cta: "Contact Sales",
  },
];

const PLACEMENTS: Placement[] = [
  {
    title: "Partner Dashboard Banner",
    description: "Full-width banner seen every time a pro logs in",
    tag: "HIGH VISIBILITY",
  },
  {
    title: "Scan Results Spotlight",
    description: "First result when AI detects your trade category",
    tag: "AI-TRIGGERED",
  },
  {
    title: "Email Campaign",
    description: "Direct email to verified pros in your trade",
    tag: "DIRECT REACH",
  },
  {
    title: "Mobile Push Notification",
    description: "Push notification to active field pros",
    tag: "REAL-TIME",
  },
];

const CARDS: Card[] = [
  {
    icon: "◈",
    title: "Trade-Level Precision",
    body: "Show ads only to roofers, only to HVAC techs, only to landscapers. No wasted impressions.",
  },
  {
    icon: "◉",
    title: "Job-Event Triggers",
    body: "Ads fire the moment a contractor logs a job in your category. Intent-based targeting at its finest.",
  },
  {
    icon: "◎",
    title: "Geographic Intelligence",
    body: "Zip-code and radius targeting across the DFW market with real-time coverage analytics.",
  },
];

// ─── 3D Network Scene ─────────────────────────────────────────────────────────

function NetworkParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const count = 800;

  const { positions, linePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const pts: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      pts.push(new THREE.Vector3(x, y, z));
    }

    const linePts: number[] = [];
    const threshold = 3.2;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < threshold) {
          linePts.push(pts[i].x, pts[i].y, pts[i].z);
          linePts.push(pts[j].x, pts[j].y, pts[j].z);
          if (linePts.length > 12000) break;
        }
      }
      if (linePts.length > 12000) break;
    }

    return { positions: pos, linePositions: new Float32Array(linePts) };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.05;
    if (meshRef.current) {
      meshRef.current.rotation.y = t;
      meshRef.current.rotation.x = t * 0.4;
    }
    if (lineRef.current) {
      lineRef.current.rotation.y = t;
      lineRef.current.rotation.x = t * 0.4;
    }
  });

  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#17C1E8"
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.75}
        />
      </points>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#17C1E8"
          transparent
          opacity={0.12}
        />
      </lineSegments>
    </>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#17C1E8" />
      <pointLight position={[-5, -5, 2]} intensity={0.8} color="#8B5CF6" />
    </>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = "", isVisible }: { target: number; suffix?: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function useIntersection(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ─── Section: Hero ────────────────────────────────────────────────────────────

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

function HeroSection({ onCta }: { onCta: () => void }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 600,
        background: "#050508",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {isMobile ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(23,193,232,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(139,92,246,0.12) 0%, transparent 60%)",
          }}
        />
      ) : (
        <div style={{ position: "absolute", inset: 0 }}>
          <Suspense fallback={<div style={{ background: "#050508", width: "100%", height: "100%" }} />}>
            <Canvas
              camera={{ position: [0, 0, 8], fov: 60 }}
              gl={{ antialias: true, alpha: false }}
              style={{ background: "#050508" }}
            >
              <SceneLighting />
              <Stars radius={80} depth={50} count={3000} factor={3} fade speed={0.5} />
              <NetworkParticles />
            </Canvas>
          </Suspense>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(5,5,8,0.25) 0%, rgba(5,5,8,0.75) 100%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: 900,
        }}
      >
        <motion.div variants={fadeUp}>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#17C1E8",
              border: "1px solid rgba(23,193,232,0.4)",
              borderRadius: 100,
              padding: "6px 18px",
              marginBottom: 28,
              textShadow: "0 0 20px rgba(23,193,232,0.8)",
              background: "rgba(23,193,232,0.08)",
            }}
          >
            ProLnk Media
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          style={{
            fontSize: "clamp(42px, 7vw, 90px)",
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            margin: "0 0 24px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          THE MOST TARGETED
          <br />
          <span style={{ color: "#17C1E8" }}>ADVERTISING</span>
          <br />
          IN HOME SERVICES
        </motion.h1>

        <motion.p
          variants={fadeUp}
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(255,255,255,0.55)",
            maxWidth: 600,
            margin: "0 auto 44px",
            lineHeight: 1.6,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Reach verified contractors, homeowners, and service professionals
          across the DFW network — at the exact moment they need you.
        </motion.p>

        <motion.div
          variants={fadeUp}
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
        >
          <button
            onClick={onCta}
            style={{
              background: "#17C1E8",
              color: "#050508",
              border: "none",
              borderRadius: 10,
              padding: "16px 34px",
              fontSize: 15,
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "-0.01em",
              transition: "all 0.2s",
              boxShadow: "0 0 32px rgba(23,193,232,0.45)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = "translateY(-2px)";
              (e.target as HTMLButtonElement).style.boxShadow = "0 0 48px rgba(23,193,232,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = "translateY(0)";
              (e.target as HTMLButtonElement).style.boxShadow = "0 0 32px rgba(23,193,232,0.45)";
            }}
          >
            Book a Campaign
          </button>
          <a
            href="#pricing"
            style={{
              background: "transparent",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 10,
              padding: "16px 34px",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "system-ui, -apple-system, sans-serif",
              textDecoration: "none",
              transition: "all 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.borderColor = "rgba(23,193,232,0.6)";
              (e.target as HTMLAnchorElement).style.color = "#17C1E8";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)";
              (e.target as HTMLAnchorElement).style.color = "#FFFFFF";
            }}
          >
            View Rate Card
          </a>
        </motion.div>
      </motion.div>

      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: 0.4,
        }}
      >
        <span style={{ color: "#fff", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)",
          }}
        />
      </div>
    </section>
  );
}

// ─── Section: Stats ───────────────────────────────────────────────────────────

function StatsSection() {
  const { ref, isVisible } = useIntersection();

  const targets = [10000, 150000, 65, 94];
  const suffixes = ["+", "+", "+", "%"];

  return (
    <section
      ref={ref}
      style={{
        background: "#0A0B0F",
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 48,
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: "center" }}
            >
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(44px, 5vw, 72px)",
                  fontWeight: 900,
                  color: "#FFFFFF",
                  lineHeight: 1,
                  marginBottom: 10,
                  letterSpacing: "-0.03em",
                }}
              >
                <AnimatedCounter target={targets[i]} suffix={suffixes[i]} isVisible={isVisible} />
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Why Advertise ───────────────────────────────────────────────────

function WhySection() {
  const { ref, isVisible } = useIntersection();

  return (
    <section
      ref={ref}
      style={{
        background: "#08090E",
        padding: "120px 24px",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 70 }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#17C1E8",
              marginBottom: 16,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Why ProLnk Media
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontFamily: "system-ui, -apple-system, sans-serif",
              margin: 0,
            }}
          >
            UNMATCHED TARGETING
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "40px 32px",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                cursor: "default",
                transition: "transform 0.3s ease, border-color 0.3s ease",
              }}
              whileHover={{
                rotateY: 3,
                rotateX: -2,
                borderColor: "rgba(23,193,232,0.3)",
                transition: { duration: 0.3 },
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  marginBottom: 20,
                  color: "#17C1E8",
                  lineHeight: 1,
                }}
              >
                {card.icon}
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  marginBottom: 12,
                  letterSpacing: "-0.01em",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.65,
                  margin: 0,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Ad Placements ───────────────────────────────────────────────────

function PlacementsSection() {
  const { ref, isVisible } = useIntersection();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      style={{
        background: "#050508",
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center", marginBottom: 60, padding: "0 24px" }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#17C1E8",
            marginBottom: 16,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Placement Options
        </p>
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: 0,
          }}
        >
          WHERE YOUR BRAND APPEARS
        </h2>
      </motion.div>

      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: 20,
          overflowX: "auto",
          padding: "0 40px 20px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
        }}
      >
        {PLACEMENTS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              minWidth: 300,
              flexShrink: 0,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 180,
                background:
                  i === 0
                    ? "linear-gradient(135deg, rgba(23,193,232,0.12) 0%, rgba(139,92,246,0.08) 100%)"
                    : i === 1
                    ? "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(23,193,232,0.08) 100%)"
                    : i === 2
                    ? "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(23,193,232,0.06) 100%)"
                    : "linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(139,92,246,0.08) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: i < 2 ? 200 : 80,
                  height: i < 2 ? 40 : 140,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: i < 2 ? 8 : 20,
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "70%",
                    height: 6,
                    background: "rgba(23,193,232,0.4)",
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>

            <div style={{ padding: "24px 24px 28px" }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: "#17C1E8",
                  display: "block",
                  marginBottom: 10,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {p.tag}
              </span>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  marginBottom: 8,
                  letterSpacing: "-0.01em",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.6,
                  margin: 0,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {p.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Section: Pricing ─────────────────────────────────────────────────────────

function PricingSection({ onCta }: { onCta: () => void }) {
  const { ref, isVisible } = useIntersection();

  return (
    <section
      id="pricing"
      ref={ref}
      style={{
        background: "#0A0B0F",
        padding: "120px 24px",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 70 }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#17C1E8",
              marginBottom: 16,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Rate Card
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              fontFamily: "system-ui, -apple-system, sans-serif",
              margin: 0,
            }}
          >
            TRANSPARENT PRICING
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            alignItems: "start",
          }}
        >
          {TIERS.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: tier.highlight
                  ? "rgba(139,92,246,0.07)"
                  : "rgba(255,255,255,0.025)",
                border: `1px solid ${tier.highlight ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.07)"}`,
                borderTop: `3px solid ${tier.borderColor}`,
                borderRadius: 20,
                padding: "36px 30px 40px",
                position: "relative",
              }}
            >
              {tier.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#A855F7",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "4px 16px",
                    borderRadius: 100,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Most Popular
                </div>
              )}

              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  marginBottom: 6,
                  letterSpacing: "-0.01em",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {tier.name}
              </h3>
              <div
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 900,
                  color: tier.borderColor,
                  marginBottom: 28,
                  letterSpacing: "-0.02em",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {tier.price}
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 12 }}>
                {tier.features.map((f, j) => (
                  <li
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 14,
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.5,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    <span style={{ color: tier.borderColor, flexShrink: 0, marginTop: 1 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={onCta}
                style={{
                  width: "100%",
                  background: tier.highlight ? "#A855F7" : "rgba(255,255,255,0.06)",
                  color: "#FFFFFF",
                  border: tier.highlight ? "none" : "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 10,
                  padding: "14px 0",
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: "pointer",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  letterSpacing: "0.02em",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.opacity = "0.85";
                  (e.target as HTMLButtonElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.opacity = "1";
                  (e.target as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Final CTA ───────────────────────────────────────────────────────

function FinalCtaSection({ onCta }: { onCta: () => void }) {
  const { ref, isVisible } = useIntersection();

  return (
    <section
      ref={ref}
      style={{
        background: "#000000",
        padding: "140px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600,
          height: 600,
          background:
            "radial-gradient(ellipse, rgba(23,193,232,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <h2
          style={{
            fontSize: "clamp(40px, 7vw, 96px)",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            margin: "0 0 24px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          READY TO REACH THEM?
        </h2>
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(255,255,255,0.4)",
            marginBottom: 52,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Join the brands already advertising to the ProLnk network
        </p>

        <button
          onClick={onCta}
          style={{
            background: "#17C1E8",
            color: "#050508",
            border: "none",
            borderRadius: 12,
            padding: "20px 52px",
            fontSize: 17,
            fontWeight: 900,
            cursor: "pointer",
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "-0.01em",
            transition: "all 0.25s",
            boxShadow: "0 0 60px rgba(23,193,232,0.35)",
            display: "inline-block",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.transform = "translateY(-3px) scale(1.02)";
            (e.target as HTMLButtonElement).style.boxShadow = "0 0 90px rgba(23,193,232,0.6)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.transform = "translateY(0) scale(1)";
            (e.target as HTMLButtonElement).style.boxShadow = "0 0 60px rgba(23,193,232,0.35)";
          }}
        >
          Start Your Campaign →
        </button>

        <p
          style={{
            marginTop: 24,
            fontSize: 13,
            color: "rgba(255,255,255,0.25)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Average campaign ROI 4.2x. Minimum 30-day commitment.
        </p>
      </motion.div>
    </section>
  );
}

// ─── Campaign Form Modal ───────────────────────────────────────────────────────

function CampaignModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    contactEmail: "",
    tier: "Featured",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "#0D0E14",
          border: "1px solid rgba(23,193,232,0.2)",
          borderRadius: 24,
          padding: "48px 40px",
          width: "100%",
          maxWidth: 480,
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(255,255,255,0.06)",
            border: "none",
            color: "rgba(255,255,255,0.5)",
            width: 32,
            height: 32,
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(23,193,232,0.12)",
                border: "2px solid rgba(23,193,232,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
                fontSize: 28,
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#FFFFFF",
                marginBottom: 12,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Campaign Request Received
            </h3>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, fontFamily: "system-ui, -apple-system, sans-serif" }}>
              Our team will reach out within 1–2 business days to build your campaign.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: 28,
                background: "#17C1E8",
                color: "#050508",
                border: "none",
                borderRadius: 10,
                padding: "12px 28px",
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "#17C1E8",
                textTransform: "uppercase",
                marginBottom: 12,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Start a Campaign
            </div>
            <h3
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#FFFFFF",
                marginBottom: 32,
                letterSpacing: "-0.01em",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Book Your Placement
            </h3>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Business Name", key: "businessName", placeholder: "Your company name", required: true },
                { label: "Your Name", key: "contactName", placeholder: "First and last name", required: true },
                { label: "Email Address", key: "contactEmail", placeholder: "work@company.com", required: true, type: "email" },
              ].map(({ label, key, placeholder, required, type }) => (
                <div key={key}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.4)",
                      marginBottom: 6,
                      letterSpacing: "0.04em",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type={type || "text"}
                    placeholder={placeholder}
                    required={required}
                    value={(form as any)[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 10,
                      padding: "12px 14px",
                      fontSize: 14,
                      color: "#FFFFFF",
                      outline: "none",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: 6,
                    letterSpacing: "0.04em",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Interested Tier
                </label>
                <select
                  value={form.tier}
                  onChange={(e) => setForm((f) => ({ ...f, tier: e.target.value }))}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    padding: "12px 14px",
                    fontSize: 14,
                    color: "#FFFFFF",
                    outline: "none",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    cursor: "pointer",
                  }}
                >
                  <option value="Spotlight">Spotlight — $499/mo</option>
                  <option value="Featured">Featured — $1,499/mo</option>
                  <option value="Enterprise">Enterprise — Custom</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: 6,
                    letterSpacing: "0.04em",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Additional Notes (optional)
                </label>
                <textarea
                  placeholder="Tell us about your target market, goals, etc."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  rows={3}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    padding: "12px 14px",
                    fontSize: 14,
                    color: "#FFFFFF",
                    outline: "none",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: "#17C1E8",
                  color: "#050508",
                  border: "none",
                  borderRadius: 10,
                  padding: "15px 0",
                  fontSize: 15,
                  fontWeight: 900,
                  cursor: "pointer",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  marginTop: 6,
                  transition: "opacity 0.2s",
                }}
              >
                Submit Campaign Request
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav({ onCta }: { onCta: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        padding: "0 32px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(5,5,8,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "rgba(23,193,232,0.15)",
            border: "1px solid rgba(23,193,232,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          ◈
        </div>
        <span
          style={{
            color: "#FFFFFF",
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: "-0.01em",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          ProLnk Media
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        {["#pricing"].map((href, i) => (
          <a
            key={i}
            href={href}
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              fontFamily: "system-ui, -apple-system, sans-serif",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = "#FFFFFF"; }}
            onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"; }}
          >
            Pricing
          </a>
        ))}
        <button
          onClick={onCta}
          style={{
            background: "#17C1E8",
            color: "#050508",
            border: "none",
            borderRadius: 8,
            padding: "9px 20px",
            fontSize: 13,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "system-ui, -apple-system, sans-serif",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.opacity = "0.85"; }}
          onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.opacity = "1"; }}
        >
          Book Campaign
        </button>
      </div>
    </nav>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function ProLnkMediaSite() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#050508" }}>
      <Nav onCta={() => setShowModal(true)} />
      <HeroSection onCta={() => setShowModal(true)} />
      <StatsSection />
      <WhySection />
      <PlacementsSection />
      <PricingSection onCta={() => setShowModal(true)} />
      <FinalCtaSection onCta={() => setShowModal(true)} />

      <footer
        style={{
          background: "#050508",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "32px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.8)",
            fontWeight: 800,
            fontSize: 15,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          ProLnk Media
        </span>
        <div style={{ display: "flex", gap: 28 }}>
          {[
            { label: "ProLnk Network", href: "https://prolnk.io" },
            { label: "TrustyPro", href: "https://trustypro.io" },
            { label: "media@prolnk.io", href: "mailto:media@prolnk.io" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: 13,
                textDecoration: "none",
                fontFamily: "system-ui, -apple-system, sans-serif",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)"; }}
              onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.3)"; }}
            >
              {label}
            </a>
          ))}
        </div>
        <span
          style={{
            color: "rgba(255,255,255,0.2)",
            fontSize: 13,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          © 2026 ProLnk LLC — DFW, Texas
        </span>
      </footer>

      {showModal && <CampaignModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
