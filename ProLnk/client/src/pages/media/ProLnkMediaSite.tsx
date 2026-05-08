import { useRef, useEffect, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useIntersection(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useScrolled(px = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > px);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [px]);
  return scrolled;
}

function useMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= bp);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth <= bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);
  return mobile;
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16 } },
};

// ─── 3D: Network Scene ────────────────────────────────────────────────────────

function NetworkMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 600;

  const { positions, linePositions } = useMemo(() => {
    const rng = (n: number) => (Math.random() - 0.5) * n;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      pts.push(new THREE.Vector3(rng(28), rng(16) + rng(4), rng(12)));
    }

    const pos = new Float32Array(count * 3);
    pts.forEach((p, i) => { pos[i * 3] = p.x; pos[i * 3 + 1] = p.y; pos[i * 3 + 2] = p.z; });

    const linePts: number[] = [];
    const DIST = 8;
    for (let i = 0; i < pts.length && linePts.length < 14400; i++) {
      for (let j = i + 1; j < pts.length && linePts.length < 14400; j++) {
        if (pts[i].distanceTo(pts[j]) < DIST) {
          linePts.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }

    return { positions: pos, linePositions: new Float32Array(linePts) };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.05;
    groupRef.current.rotation.x = Math.sin(t * 0.02) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#17C1E8" size={0.055} sizeAttenuation transparent opacity={0.8} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#17C1E8" transparent opacity={0.09} />
      </lineSegments>
    </group>
  );
}

function NetworkScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 25], fov: 60 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: "#050508", width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 10, 0]} intensity={2} color="#17C1E8" />
      <pointLight position={[20, -10, 10]} intensity={1} color="#F59E0B" />
      <Stars radius={60} depth={50} count={3000} factor={3} fade speed={0.4} />
      <NetworkMesh />
    </Canvas>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────

function Counter({ target, suffix = "", visible }: { target: number; suffix?: string; visible: boolean }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start: number | null = null;
    const DURATION = 2200;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target]);

  return <>{val.toLocaleString()}{suffix}</>;
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav({ onCta }: { onCta: () => void }) {
  const scrolled = useScrolled();
  const mobile = useMobile(640);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        height: 64,
        padding: "0 clamp(20px, 4vw, 48px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(5,5,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.35s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: "rgba(23,193,232,0.12)",
            border: "1px solid rgba(23,193,232,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            color: "#17C1E8",
          }}
        >
          ◈
        </div>
        <span
          style={{
            color: "#FFF",
            fontWeight: 800,
            fontSize: 17,
            letterSpacing: "-0.02em",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          ProLnk <span style={{ color: "#17C1E8" }}>Media</span>
        </span>
      </div>

      {!mobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {["How It Works", "Targeting", "Pricing"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(" ", "-")}`}
              style={{
                color: "rgba(255,255,255,0.48)",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                fontFamily: "'Inter', system-ui, sans-serif",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.48)"; }}
            >
              {label}
            </a>
          ))}
        </div>
      )}

      <button
        onClick={onCta}
        style={{
          background: "#17C1E8",
          color: "#050508",
          border: "none",
          borderRadius: 9,
          padding: "10px 22px",
          fontSize: 13,
          fontWeight: 800,
          cursor: "pointer",
          fontFamily: "'Inter', system-ui, sans-serif",
          letterSpacing: "-0.01em",
          transition: "all 0.2s",
          boxShadow: "0 0 24px rgba(23,193,232,0.3)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 36px rgba(23,193,232,0.55)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(23,193,232,0.3)";
        }}
      >
        Book a Campaign
      </button>
    </nav>
  );
}

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

function Hero({ onCta }: { onCta: () => void }) {
  const mobile = useMobile();

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 640,
        background: "#050508",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {mobile ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(23,193,232,0.14) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 85% 80%, rgba(245,158,11,0.08) 0%, transparent 60%)",
          }}
        />
      ) : (
        <div style={{ position: "absolute", inset: 0 }}>
          <Suspense fallback={<div style={{ width: "100%", height: "100%", background: "#050508" }} />}>
            <NetworkScene />
          </Suspense>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(5,5,8,0.2) 0%, rgba(5,5,8,0.78) 100%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 clamp(20px, 5vw, 60px)",
          maxWidth: 960,
        }}
      >
        <motion.div variants={fadeUp}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
              color: "#17C1E8",
              border: "1px solid rgba(23,193,232,0.35)",
              borderRadius: 100,
              padding: "7px 20px",
              marginBottom: 36,
              background: "rgba(23,193,232,0.07)",
              fontFamily: "'Inter', system-ui, sans-serif",
              boxShadow: "0 0 28px rgba(23,193,232,0.12)",
            }}
          >
            <span style={{ opacity: 0.7 }}>◈</span> ProLnk Media
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          style={{
            fontSize: "clamp(48px, 8.5vw, 88px)",
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            margin: "0 0 28px",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          THE HOME SERVICES
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #17C1E8 0%, #38D9F5 50%, #17C1E8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            NETWORK THAT NEVER
          </span>
          <br />
          STOPS WORKING
        </motion.h1>

        <motion.p
          variants={fadeUp}
          style={{
            fontSize: "clamp(16px, 2.2vw, 20px)",
            color: "rgba(255,255,255,0.55)",
            maxWidth: 620,
            margin: "0 auto 52px",
            lineHeight: 1.65,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          Reach 100,000+ verified home service professionals and homeowners across the DFW market — every single day.
        </motion.p>

        <motion.div
          variants={fadeUp}
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" as const }}
        >
          <button
            onClick={onCta}
            style={{
              background: "#17C1E8",
              color: "#050508",
              border: "none",
              borderRadius: 12,
              padding: "18px 38px",
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: "'Inter', system-ui, sans-serif",
              letterSpacing: "-0.01em",
              transition: "all 0.25s",
              boxShadow: "0 0 48px rgba(23,193,232,0.45), 0 8px 32px rgba(23,193,232,0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 72px rgba(23,193,232,0.65), 0 12px 40px rgba(23,193,232,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 48px rgba(23,193,232,0.45), 0 8px 32px rgba(23,193,232,0.2)";
            }}
          >
            Book a Campaign
          </button>
          <a
            href="#pricing"
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "transparent",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: 12,
              padding: "18px 38px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Inter', system-ui, sans-serif",
              textDecoration: "none",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(23,193,232,0.55)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#17C1E8";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.22)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
            }}
          >
            View Rate Card
          </a>
        </motion.div>
      </motion.div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          gap: 8,
          opacity: 0.35,
          pointerEvents: "none",
        }}
      >
        <span style={{ color: "#fff", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" as const, fontFamily: "'Inter', system-ui, sans-serif" }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, rgba(255,255,255,0.55), transparent)" }} />
      </div>
    </section>
  );
}

// ─── Section 2: Social Proof Bar ──────────────────────────────────────────────

const LOGOS = ["Lowe's", "The Home Depot", "ServiceMaster", "Terminix"];

function SocialProof() {
  return (
    <div
      style={{
        background: "#0A0B0F",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "28px clamp(20px, 5vw, 60px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(28px, 4vw, 64px)",
        flexWrap: "wrap" as const,
        overflow: "hidden",
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.2)",
          textTransform: "uppercase" as const,
          fontFamily: "'Inter', system-ui, sans-serif",
          flexShrink: 0,
        }}
      >
        Trusted by
      </span>
      {LOGOS.map((name) => (
        <span
          key={name}
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 15,
            fontWeight: 700,
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "0.04em",
            textTransform: "uppercase" as const,
            userSelect: "none" as const,
          }}
        >
          {name}
        </span>
      ))}
    </div>
  );
}

// ─── Section 3: Stats ─────────────────────────────────────────────────────────

const STATS = [
  { target: 100000, suffix: "+", label: "Verified Professionals" },
  { target: 250000, suffix: "+", label: "Homeowners Reached" },
  { target: 65, suffix: "+", label: "Trade Categories" },
  { target: 4.2, suffix: "×", label: "Average Campaign ROI", isFloat: true },
];

function Stats() {
  const { ref, visible } = useIntersection();

  return (
    <section
      id="how-it-works"
      ref={ref}
      style={{ background: "#050508", padding: "110px clamp(20px, 5vw, 60px)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 48,
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.11, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: "center" }}
            >
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(48px, 5.5vw, 72px)",
                  fontWeight: 900,
                  color: "#17C1E8",
                  lineHeight: 1,
                  marginBottom: 12,
                  letterSpacing: "-0.03em",
                  textShadow: "0 0 40px rgba(23,193,232,0.35)",
                }}
              >
                {s.isFloat ? (
                  visible ? `${s.target}${s.suffix}` : `0${s.suffix}`
                ) : (
                  <Counter target={s.target} suffix={s.suffix} visible={visible} />
                )}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Targeting Pitch ───────────────────────────────────────────────

const TARGETING_CARDS = [
  {
    icon: "◈",
    title: "Trade-Level Targeting",
    body: "Show ads exclusively to roofers, HVAC techs, plumbers, or all 65 categories at once",
  },
  {
    icon: "◉",
    title: "Job-Event Triggers",
    body: "Ads surface the moment a contractor logs a job in your category. Maximum intent. Zero cold traffic.",
  },
  {
    icon: "◎",
    title: "ZIP Code Precision",
    body: "Target by ZIP code, radius, or the entire DFW market. Your budget goes exactly where your customers are.",
  },
];

function Targeting() {
  const { ref, visible } = useIntersection();

  return (
    <section
      id="targeting"
      ref={ref}
      style={{ background: "#08090D", padding: "120px clamp(20px, 5vw, 60px)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 64,
            alignItems: "start",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: "#F59E0B",
                textTransform: "uppercase" as const,
                marginBottom: 20,
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Precision Advertising
            </p>
            <h2
              style={{
                fontSize: "clamp(34px, 5vw, 56px)",
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                margin: "0 0 24px",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              SURGICAL PRECISION.
              <br />
              <span style={{ color: "#F59E0B" }}>ZERO WASTE.</span>
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7,
                fontFamily: "'Inter', system-ui, sans-serif",
                margin: 0,
              }}
            >
              Every impression reaches someone actively working in homes. Not a spray-and-pray audience — a verified, job-active network.
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
            {TARGETING_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.14, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 18,
                  padding: "28px 28px",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  cursor: "default",
                  transition: "border-color 0.25s",
                }}
                onHoverStart={(e) => {
                  (e.target as HTMLDivElement).style.borderColor = "rgba(23,193,232,0.28)";
                }}
                onHoverEnd={(e) => {
                  (e.target as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <span
                    style={{
                      fontSize: 22,
                      color: "#17C1E8",
                      lineHeight: 1,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    {card.icon}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontSize: 17,
                        fontWeight: 800,
                        color: "#FFFFFF",
                        marginBottom: 8,
                        letterSpacing: "-0.01em",
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.45)",
                        lineHeight: 1.65,
                        margin: 0,
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}
                    >
                      {card.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Placements ────────────────────────────────────────────────────

const PLACEMENTS = [
  {
    title: "Partner Dashboard",
    sub: "Seen every login. 0% skip rate.",
    tag: "HIGH VISIBILITY",
    mock: (
      <div style={{ padding: 16, background: "rgba(5,5,8,0.8)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {[0, 1, 2].map((d) => (
            <div key={d} style={{ width: 10, height: 10, borderRadius: "50%", background: d === 0 ? "#FF5F56" : d === 1 ? "#FFBD2E" : "#27C93F" }} />
          ))}
        </div>
        <div style={{ width: "100%", height: 32, background: "linear-gradient(90deg, rgba(23,193,232,0.3) 0%, rgba(23,193,232,0.1) 100%)", borderRadius: 6, marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 9, color: "#17C1E8", fontWeight: 700, letterSpacing: "0.1em", fontFamily: "'Inter', system-ui, sans-serif" }}>YOUR AD HERE</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[70, 50, 85].map((w, i) => (
            <div key={i} style={{ height: 8, width: `${w}%`, background: "rgba(255,255,255,0.06)", borderRadius: 4 }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Scan Results",
    sub: "First thing they see when AI finds a lead in your category.",
    tag: "AI-TRIGGERED",
    mock: (
      <div style={{ padding: 14, background: "rgba(5,5,8,0.8)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", width: 120, margin: "0 auto" }}>
        <div style={{ height: 10, background: "rgba(255,255,255,0.06)", borderRadius: 4, marginBottom: 8 }} />
        <div style={{ height: 48, background: "linear-gradient(135deg, rgba(23,193,232,0.25), rgba(245,158,11,0.15))", borderRadius: 8, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(23,193,232,0.2)" }}>
          <span style={{ fontSize: 8, color: "#17C1E8", fontWeight: 700, fontFamily: "'Inter', system-ui, sans-serif", letterSpacing: "0.08em" }}>SPONSORED</span>
        </div>
        <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, marginBottom: 5 }} />
        <div style={{ height: 6, background: "rgba(255,255,255,0.04)", borderRadius: 3, width: "70%" }} />
      </div>
    ),
  },
  {
    title: "Direct Email",
    sub: "Land in their inbox alongside job alerts.",
    tag: "DIRECT REACH",
    mock: (
      <div style={{ padding: 14, background: "rgba(5,5,8,0.8)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', system-ui, sans-serif", marginBottom: 8, letterSpacing: "0.05em" }}>From: media@prolnk.io</div>
        <div style={{ height: 7, background: "rgba(255,255,255,0.08)", borderRadius: 3, marginBottom: 6, width: "80%" }} />
        <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 3, marginBottom: 4 }} />
        <div style={{ height: 5, background: "rgba(255,255,255,0.04)", borderRadius: 3, marginBottom: 4, width: "60%" }} />
        <div style={{ marginTop: 10, height: 20, background: "rgba(245,158,11,0.2)", borderRadius: 5, border: "1px solid rgba(245,158,11,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 8, color: "#F59E0B", fontWeight: 700, fontFamily: "'Inter', system-ui, sans-serif", letterSpacing: "0.08em" }}>LEARN MORE →</span>
        </div>
      </div>
    ),
  },
  {
    title: "Job Alert Push",
    sub: "Paired with high-intent job notifications.",
    tag: "REAL-TIME",
    mock: (
      <div style={{ padding: 14, background: "rgba(18,18,22,0.95)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.09)", width: 140, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(23,193,232,0.2)", border: "1px solid rgba(23,193,232,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#17C1E8" }}>◈</div>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 600 }}>ProLnk · now</span>
        </div>
        <div style={{ fontSize: 9, color: "#fff", fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, marginBottom: 4 }}>New HVAC lead nearby</div>
        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', system-ui, sans-serif", lineHeight: 1.4 }}>3BR home, Irving TX · Sponsored by Carrier</div>
      </div>
    ),
  },
];

function Placements() {
  const { ref, visible } = useIntersection();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      style={{ background: "#050508", padding: "120px 0", overflow: "hidden" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center", marginBottom: 64, padding: "0 clamp(20px, 5vw, 60px)" }}
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.25em",
            color: "#17C1E8",
            textTransform: "uppercase" as const,
            marginBottom: 16,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          Placements
        </p>
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            margin: 0,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          YOUR BRAND.{" "}
          <span style={{ color: "#F59E0B" }}>EVERYWHERE THEY WORK.</span>
        </h2>
        <p
          style={{
            marginTop: 16,
            fontSize: 16,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'Inter', system-ui, sans-serif",
            maxWidth: 540,
            margin: "16px auto 0",
            lineHeight: 1.6,
          }}
        >
          ProLnk isn't one ad slot — it's the entire daily workflow of a home service professional.
        </p>
      </motion.div>

      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: 20,
          overflowX: "auto",
          padding: "8px clamp(20px, 5vw, 60px) 24px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {PLACEMENTS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.28 } }}
            style={{
              minWidth: 320,
              maxWidth: 340,
              flexShrink: 0,
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderTop: "2px solid #F59E0B",
              borderRadius: 20,
              overflow: "hidden",
              cursor: "default",
            }}
          >
            <div
              style={{
                height: 190,
                background: "linear-gradient(135deg, rgba(12,12,18,1) 0%, rgba(20,20,28,1) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {p.mock}
            </div>
            <div style={{ padding: "24px 24px 28px" }}>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "#F59E0B",
                  textTransform: "uppercase" as const,
                  display: "block",
                  marginBottom: 10,
                  fontFamily: "'Inter', system-ui, sans-serif",
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
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.65,
                  margin: 0,
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                {p.sub}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Section 6: Pricing ───────────────────────────────────────────────────────

const TIERS = [
  {
    name: "Spotlight",
    price: "$499",
    period: "/mo",
    color: "#17C1E8",
    highlight: false,
    features: [
      "Partner directory listing",
      "1 email blast/mo",
      "Dashboard banner",
      "ZIP code targeting",
      "Monthly analytics report",
      "Cancel anytime",
    ],
    cta: "Start Spotlight",
  },
  {
    name: "Featured",
    price: "$1,499",
    period: "/mo",
    color: "#F59E0B",
    highlight: true,
    features: [
      "Everything in Spotlight",
      "Priority placement in feed",
      "Weekly email campaign",
      "Scan result spotlight",
      "Campaign analytics dashboard",
      "Territory exclusivity option",
    ],
    cta: "Go Featured",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    color: "#A855F7",
    highlight: false,
    features: [
      "Full managed campaigns",
      "Dedicated account rep",
      "Custom integrations",
      "White-glove creative",
      "Quarterly strategy calls",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
  },
];

function Pricing({ onCta }: { onCta: () => void }) {
  const { ref, visible } = useIntersection();

  return (
    <section
      id="pricing"
      ref={ref}
      style={{ background: "#0A0B0F", padding: "120px clamp(20px, 5vw, 60px)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.25em",
              color: "#17C1E8",
              textTransform: "uppercase" as const,
              marginBottom: 16,
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Rate Card
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-0.025em",
              margin: 0,
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            ONE INVESTMENT.{" "}
            <span style={{ color: "#17C1E8" }}>FOUR MULTIPLIERS.</span>
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          {TIERS.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: tier.highlight
                  ? `rgba(245,158,11,0.05)`
                  : "rgba(255,255,255,0.025)",
                border: `1px solid ${tier.highlight ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.07)"}`,
                borderTop: `3px solid ${tier.color}`,
                borderRadius: 20,
                padding: "36px 32px 40px",
                position: "relative" as const,
                display: "flex",
                flexDirection: "column" as const,
                boxShadow: tier.highlight ? `0 0 60px rgba(245,158,11,0.1)` : "none",
              }}
            >
              {tier.highlight && (
                <div
                  style={{
                    position: "absolute" as const,
                    top: -13,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#F59E0B",
                    color: "#050508",
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                    padding: "4px 18px",
                    borderRadius: 100,
                    fontFamily: "'Inter', system-ui, sans-serif",
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  Most Popular
                </div>
              )}

              <div style={{ marginBottom: 6 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: tier.color,
                    textTransform: "uppercase" as const,
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  {tier.name}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 4,
                  marginBottom: 28,
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(36px, 5vw, 48px)",
                    fontWeight: 900,
                    color: "#FFFFFF",
                    letterSpacing: "-0.03em",
                    fontFamily: "'Inter', system-ui, sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {tier.price}
                </span>
                {tier.period && (
                  <span
                    style={{
                      fontSize: 15,
                      color: "rgba(255,255,255,0.35)",
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  >
                    {tier.period}
                  </span>
                )}
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 32px",
                  display: "flex",
                  flexDirection: "column" as const,
                  gap: 13,
                  flex: 1,
                }}
              >
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
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  >
                    <span style={{ color: tier.color, flexShrink: 0, marginTop: 1, fontWeight: 700 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={onCta}
                style={{
                  width: "100%",
                  background: tier.highlight ? "#F59E0B" : "rgba(255,255,255,0.06)",
                  color: tier.highlight ? "#050508" : "#FFFFFF",
                  border: tier.highlight ? "none" : "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 11,
                  padding: "15px 0",
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: "pointer",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  letterSpacing: "0.01em",
                  transition: "all 0.22s",
                  boxShadow: tier.highlight ? "0 0 32px rgba(245,158,11,0.3)" : "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
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

// ─── Section 7: The Close ─────────────────────────────────────────────────────

function Close({ onCta }: { onCta: () => void }) {
  const { ref, visible } = useIntersection();

  return (
    <section
      ref={ref}
      style={{
        background: "#000000",
        padding: "160px clamp(20px, 5vw, 60px)",
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
          width: 800,
          height: 800,
          background: "radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 44 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.3em",
            color: "#F59E0B",
            textTransform: "uppercase" as const,
            marginBottom: 28,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          Join the brands already inside the network
        </p>

        <h2
          style={{
            fontSize: "clamp(48px, 9vw, 96px)",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.035em",
            lineHeight: 1.02,
            margin: "0 0 44px",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          READY TO
          <br />
          REACH THEM?
        </h2>

        <motion.button
          onClick={onCta}
          animate={{
            boxShadow: [
              "0 0 40px rgba(245,158,11,0.3)",
              "0 0 80px rgba(245,158,11,0.55)",
              "0 0 40px rgba(245,158,11,0.3)",
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "#F59E0B",
            color: "#050508",
            border: "none",
            borderRadius: 14,
            padding: "22px 60px",
            fontSize: 18,
            fontWeight: 900,
            cursor: "pointer",
            fontFamily: "'Inter', system-ui, sans-serif",
            letterSpacing: "-0.01em",
            transition: "transform 0.25s, opacity 0.25s",
            display: "inline-block",
          }}
          onHoverStart={() => {}}
          whileHover={{ scale: 1.04, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Your Campaign →
        </motion.button>

        <p
          style={{
            marginTop: 24,
            fontSize: 13,
            color: "rgba(255,255,255,0.3)",
            fontFamily: "'Inter', system-ui, sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          Average 4.2× ROI · 30-day minimum · Cancel anytime
        </p>
      </motion.div>
    </section>
  );
}

// ─── Contact Modal ────────────────────────────────────────────────────────────

interface FormState {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  goal: string;
  budget: string;
  message: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  padding: "13px 16px",
  fontSize: 14,
  color: "#FFFFFF",
  outline: "none",
  fontFamily: "'Inter', system-ui, sans-serif",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  color: "rgba(255,255,255,0.38)",
  marginBottom: 6,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontFamily: "'Inter', system-ui, sans-serif",
};

function Modal({ onClose }: { onClose: () => void }) {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormState>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    goal: "Brand Awareness",
    budget: "$500–$1,499/mo",
    message: "",
  });

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/trpc/advertiserLead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ json: form }),
    }).catch(() => {});
    setDone(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        background: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 0,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 80 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "#0D0E16",
          border: "1px solid rgba(23,193,232,0.18)",
          borderRight: "none",
          borderRadius: "20px 0 0 20px",
          padding: "48px 40px",
          width: "100%",
          maxWidth: 520,
          height: "100vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "-40px 0 120px rgba(23,193,232,0.06)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.45)",
            width: 34,
            height: 34,
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          ✕
        </button>

        {done ? (
          <div style={{ textAlign: "center", paddingTop: "20vh" }}>
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(23,193,232,0.1)",
                border: "2px solid rgba(23,193,232,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
                fontSize: 28,
                color: "#17C1E8",
              }}
            >
              ✓
            </motion.div>
            <h3
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#FFFFFF",
                marginBottom: 14,
                fontFamily: "'Inter', system-ui, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Welcome to the Network.
            </h3>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.45)",
                fontFamily: "'Inter', system-ui, sans-serif",
                lineHeight: 1.65,
                marginBottom: 36,
              }}
            >
              We'll be in touch within 24 hours.
            </p>
            <button
              onClick={onClose}
              style={{
                background: "#17C1E8",
                color: "#050508",
                border: "none",
                borderRadius: 10,
                padding: "13px 32px",
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: "#17C1E8",
                textTransform: "uppercase" as const,
                marginBottom: 10,
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Book a Campaign
            </div>
            <h3
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#FFFFFF",
                marginBottom: 36,
                letterSpacing: "-0.02em",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Let's build your campaign.
            </h3>

            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column" as const, gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Company Name</label>
                  <input required style={inputStyle} placeholder="Carrier Corp." value={form.companyName} onChange={set("companyName")} />
                </div>
                <div>
                  <label style={labelStyle}>Contact Name</label>
                  <input required style={inputStyle} placeholder="Jane Smith" value={form.contactName} onChange={set("contactName")} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input required type="email" style={inputStyle} placeholder="jane@carrier.com" value={form.email} onChange={set("email")} />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input type="tel" style={inputStyle} placeholder="(214) 555-0100" value={form.phone} onChange={set("phone")} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Campaign Goal</label>
                <select value={form.goal} onChange={set("goal")} style={{ ...inputStyle, cursor: "pointer" }}>
                  <option>Brand Awareness</option>
                  <option>Lead Generation</option>
                  <option>Retention</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Budget Range</label>
                <select value={form.budget} onChange={set("budget")} style={{ ...inputStyle, cursor: "pointer" }}>
                  <option>$500–$1,499/mo</option>
                  <option>$1,500–$4,999/mo</option>
                  <option>$5,000–$14,999/mo</option>
                  <option>$15,000+/mo</option>
                  <option>Custom / Let's talk</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Message (optional)</label>
                <textarea
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                  placeholder="Tell us about your audience, goals, or any questions..."
                  value={form.message}
                  onChange={set("message")}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: "#17C1E8",
                  color: "#050508",
                  border: "none",
                  borderRadius: 11,
                  padding: "16px 0",
                  fontSize: 15,
                  fontWeight: 900,
                  cursor: "pointer",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  marginTop: 4,
                  letterSpacing: "-0.01em",
                  transition: "all 0.22s",
                  boxShadow: "0 0 36px rgba(23,193,232,0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 56px rgba(23,193,232,0.55)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 36px rgba(23,193,232,0.35)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
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

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function ProLnkMediaSite() {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = ""; };
  }, []);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#050508", color: "#FFFFFF" }}>
      <Nav onCta={openModal} />
      <Hero onCta={openModal} />
      <SocialProof />
      <Stats />
      <Targeting />
      <Placements />
      <Pricing onCta={openModal} />
      <Close onCta={openModal} />

      <footer
        style={{
          background: "#050508",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "32px clamp(20px, 5vw, 60px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap" as const,
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, color: "#17C1E8" }}>◈</span>
          <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 800, fontSize: 14, fontFamily: "'Inter', system-ui, sans-serif" }}>
            ProLnk Media
          </span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {[
            { label: "prolnk.io", href: "https://prolnk.io" },
            { label: "trustypro.io", href: "https://trustypro.io" },
            { label: "media@prolnk.io", href: "mailto:media@prolnk.io" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                color: "rgba(255,255,255,0.25)",
                fontSize: 13,
                textDecoration: "none",
                fontFamily: "'Inter', system-ui, sans-serif",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.25)"; }}
            >
              {label}
            </a>
          ))}
        </div>
        <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 12, fontFamily: "'Inter', system-ui, sans-serif" }}>
          © 2026 ProLnk LLC — DFW, Texas
        </span>
      </footer>

      <AnimatePresence>
        {modal && <Modal onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
}
