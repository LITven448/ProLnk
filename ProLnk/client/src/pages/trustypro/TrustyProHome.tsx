import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import SupportChatWidget from "@/components/SupportChatWidget";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import {
  Plus, X, Menu, Phone, Mail, MapPin, Shield, ArrowRight, Camera,
  CheckCircle, Loader2, Sparkles, Copy, Lock, FileText, TrendingUp,
  RefreshCw, Zap, ScanLine, Home as HomeIcon, Wrench, Droplets, Flame,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { AddressAutofill } from "@/components/AddressAutofill";
import { toast } from "sonner";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/* ================================================================================
   TRUSTYPRO HOME — light, warm, 3D
   Palette: #FFFFFF / #FAFAF7 backgrounds · indigo #6366F1 · green #16A34A
================================================================================ */

const INDIGO = "#6366F1";
const INDIGO_DEEP = "#4F46E5";
const INDIGO_SOFT = "#EEF2FF";
const GREEN = "#16A34A";
const GREEN_SOFT = "#DCFCE7";
const CREAM = "#FAFAF7";
const INK = "#1E1B3A";

const EASE = [0.22, 1, 0.36, 1] as const;

const SCAN_IMG = "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/trustypro-frontyard-damage-scan-v2-D9sW97trHmaDoMH7jXUN8A.webp";

/* --- media hooks ---------------------------------------------------------- */
function useMediaFlag(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatch(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatch(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return match;
}

function useLiteMode() {
  const reduced = useMediaFlag("(prefers-reduced-motion: reduce)");
  const small = useMediaFlag("(max-width: 767px)");
  return reduced || small;
}

/* --- count-up ------------------------------------------------------------- */
function useCountUp(end: number, durationMs = 1800) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  useEffect(() => { if (inView) setStarted(true); }, [inView]);
  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, end, durationMs]);
  return { value, ref };
}

/* --- shared motion variants ------------------------------------------------ */
const rise = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};
const riseItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

function Reveal({ children, className, id, variants = rise }: {
  children: React.ReactNode; className?: string; id?: string;
  variants?: typeof rise;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px 0px" });
  return (
    <motion.div ref={ref} id={id} className={className} initial="hidden"
      animate={inView ? "visible" : "hidden"} variants={variants}>
      {children}
    </motion.div>
  );
}

/* ================================================================================
   3D HERO — low-poly house with orbiting home-system nodes
================================================================================ */

const ORBIT_NODES = [
  { label: "Roof",       color: "#6366F1", radius: 2.5, speed: 0.55, phase: 0,                 y: 1.7 },
  { label: "HVAC",       color: "#16A34A", radius: 2.9, speed: 0.42, phase: Math.PI * 0.5,     y: 0.55 },
  { label: "Plumbing",   color: "#0EA5E9", radius: 2.65, speed: 0.48, phase: Math.PI,          y: -0.15 },
  { label: "Electrical", color: "#F59E0B", radius: 3.1, speed: 0.38, phase: Math.PI * 1.5,     y: 1.0 },
];

function OrbitNode({ node, index }: { node: typeof ORBIT_NODES[number]; index: number }) {
  const ref = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const a = node.phase + t * node.speed;
    if (ref.current) {
      ref.current.position.set(Math.cos(a) * node.radius, node.y + Math.sin(t * 0.8 + index) * 0.12, Math.sin(a) * node.radius);
    }
    if (sphereRef.current) {
      const pulse = 1 + Math.sin(t * 2.4 + index * 1.7) * 0.18;
      sphereRef.current.scale.setScalar(pulse);
    }
  });
  return (
    <group ref={ref}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.55} roughness={0.3} />
      </mesh>
      <Html center distanceFactor={9} style={{ pointerEvents: "none" }} zIndexRange={[5, 0]}>
        <div style={{
          padding: "3px 10px", borderRadius: 999, whiteSpace: "nowrap",
          background: "rgba(255,255,255,0.88)", border: `1.5px solid ${node.color}`,
          color: node.color, fontSize: 11, fontWeight: 800, fontFamily: "Inter, sans-serif",
          boxShadow: "0 4px 14px rgba(30,27,58,0.10)", backdropFilter: "blur(4px)",
          transform: "translateY(-22px)",
        }}>
          {node.label}
        </div>
      </Html>
    </group>
  );
}

function LowPolyHouse() {
  const cream = "#F6F1E7";
  const wall = "#FFFFFF";
  const roof = INDIGO;
  const accent = INDIGO_DEEP;
  return (
    <group>
      {/* main body */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[1.9, 1.1, 1.5]} />
        <meshStandardMaterial color={wall} roughness={0.85} />
      </mesh>
      {/* roof — 4-sided pyramid */}
      <mesh position={[0, 1.62, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[1.55, 1.05, 4]} />
        <meshStandardMaterial color={roof} roughness={0.55} flatShading />
      </mesh>
      {/* chimney */}
      <mesh position={[0.62, 1.85, 0.3]}>
        <boxGeometry args={[0.22, 0.6, 0.22]} />
        <meshStandardMaterial color={cream} roughness={0.9} />
      </mesh>
      {/* door */}
      <mesh position={[0, 0.32, 0.76]}>
        <boxGeometry args={[0.34, 0.62, 0.06]} />
        <meshStandardMaterial color={accent} roughness={0.5} />
      </mesh>
      {/* windows */}
      <mesh position={[-0.58, 0.62, 0.76]}>
        <boxGeometry args={[0.34, 0.34, 0.05]} />
        <meshStandardMaterial color="#C7D2FE" emissive="#A5B4FC" emissiveIntensity={0.35} roughness={0.2} />
      </mesh>
      <mesh position={[0.58, 0.62, 0.76]}>
        <boxGeometry args={[0.34, 0.34, 0.05]} />
        <meshStandardMaterial color="#C7D2FE" emissive="#A5B4FC" emissiveIntensity={0.35} roughness={0.2} />
      </mesh>
      <mesh position={[0.96, 0.62, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.4, 0.34, 0.05]} />
        <meshStandardMaterial color="#C7D2FE" emissive="#A5B4FC" emissiveIntensity={0.3} roughness={0.2} />
      </mesh>
      {/* little garage wing */}
      <mesh position={[-1.35, 0.38, -0.1]} castShadow>
        <boxGeometry args={[0.9, 0.76, 1.1]} />
        <meshStandardMaterial color={cream} roughness={0.9} />
      </mesh>
      <mesh position={[-1.35, 0.95, -0.1]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.85, 0.5, 4]} />
        <meshStandardMaterial color="#818CF8" roughness={0.55} flatShading />
      </mesh>
      {/* ground */}
      <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[2.6, 2.6, 0.12, 48]} />
        <meshStandardMaterial color="#E7F6E9" roughness={1} />
      </mesh>
      {/* trees */}
      {[[1.6, 0.9] as const, [-0.4, -1.7] as const, [1.3, -1.3] as const].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.05, 0.07, 0.42, 8]} />
            <meshStandardMaterial color="#A07855" roughness={1} />
          </mesh>
          <mesh position={[0, 0.62, 0]}>
            <coneGeometry args={[0.26, 0.62, 8]} />
            <meshStandardMaterial color={GREEN} roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function HouseScene() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    const targetY = t * 0.16 + pointer.current.x * 0.35;
    const targetX = 0.08 + pointer.current.y * 0.12;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.06;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.06;
  });
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 3]} intensity={1.25} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 3, -4]} intensity={0.35} color="#C7D2FE" />
      <group ref={group} position={[0, -0.55, 0]}>
        <Float speed={1.4} rotationIntensity={0} floatIntensity={0.5} floatingRange={[-0.08, 0.08]}>
          <LowPolyHouse />
        </Float>
        {ORBIT_NODES.map((n, i) => <OrbitNode key={n.label} node={n} index={i} />)}
      </group>
      <ContactShadows position={[0, -0.72, 0]} opacity={0.28} scale={9} blur={2.6} far={3} color={INK} />
    </>
  );
}

function HeroFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center"
      style={{ background: "radial-gradient(ellipse at 50% 45%, #EEF2FF 0%, #FAFAF7 70%)" }}>
      <div className="relative">
        <div className="w-44 h-44 rounded-3xl flex items-center justify-center shadow-xl"
          style={{ background: "linear-gradient(145deg, #FFFFFF, #EEF2FF)", border: "1px solid #E0E7FF" }}>
          <HomeIcon className="w-20 h-20" style={{ color: INDIGO }} strokeWidth={1.4} />
        </div>
        {[
          { Icon: Shield, c: INDIGO, pos: "-top-4 -right-5" },
          { Icon: Flame, c: "#F59E0B", pos: "-bottom-4 -left-5" },
          { Icon: Droplets, c: "#0EA5E9", pos: "top-1/2 -left-9" },
          { Icon: Zap, c: GREEN, pos: "-top-5 left-6" },
        ].map(({ Icon, c, pos }, i) => (
          <div key={i} className={`absolute ${pos} w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center`}
            style={{ border: `1.5px solid ${c}` }}>
            <Icon className="w-4.5 h-4.5" style={{ color: c, width: 18, height: 18 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero3D() {
  const lite = useLiteMode();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
    return () => cancelAnimationFrame(id);
  }, []);
  if (lite || !mounted) return <HeroFallback />;
  return (
    <Suspense fallback={<HeroFallback />}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 1.6, 6.4], fov: 42 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <HouseScene />
      </Canvas>
    </Suspense>
  );
}

/* ================================================================================
   AI PHOTO SCAN DEMO — scan line sweep + typed diagnosis
================================================================================ */

const DIAGNOSIS_LINES = [
  { text: "Roof: hail damage detected — repair est. $2,400", tone: "warn" as const },
  { text: "Gutter: sagging on east side — est. $310", tone: "warn" as const },
  { text: "Driveway: surface crack, low priority — est. $180", tone: "info" as const },
  { text: "Matched to a vetted, background-checked pro ✓", tone: "good" as const },
];

function Typewriter({ text, onDone, speed = 22 }: { text: string; onDone?: () => void; speed?: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    setShown(0);
    const id = setInterval(() => {
      setShown(s => {
        if (s + 1 >= text.length) { clearInterval(id); onDone?.(); return text.length; }
        return s + 1;
      });
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  return <span>{text.slice(0, shown)}</span>;
}

function AIScanDemo() {
  const lite = useLiteMode();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-140px 0px" });
  const [phase, setPhase] = useState<"idle" | "scanning" | "results">("idle");
  const [linesShown, setLinesShown] = useState(0);
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    if (inView && phase === "idle") startScan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const startScan = () => {
    setPhase("scanning");
    setLinesShown(0);
    setRunKey(k => k + 1);
    window.setTimeout(() => { setPhase("results"); setLinesShown(1); }, lite ? 800 : 2300);
  };

  const toneColor = (tone: "warn" | "info" | "good") =>
    tone === "good" ? GREEN : tone === "warn" ? "#D97706" : INDIGO;

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-6 items-stretch">
      {/* Photo card */}
      <motion.div
        className="relative rounded-[28px] overflow-hidden cursor-pointer group select-none"
        style={{ border: "1px solid #E5E7EB", boxShadow: "0 24px 60px -20px rgba(99,102,241,0.25)" }}
        onClick={startScan}
        whileHover={lite ? undefined : { scale: 1.015 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <img src={SCAN_IMG} alt="Homeowner photo being scanned by TrustyPro AI"
          className="w-full h-full object-cover min-h-[320px]" draggable={false} />
        {/* corner brackets */}
        {[["top-4 left-4", "border-t-2 border-l-2"], ["top-4 right-4", "border-t-2 border-r-2"],
          ["bottom-4 left-4", "border-b-2 border-l-2"], ["bottom-4 right-4", "border-b-2 border-r-2"]].map(([pos, b]) => (
          <div key={pos} className={`absolute ${pos} w-8 h-8 ${b} rounded-sm`} style={{ borderColor: "rgba(255,255,255,0.9)" }} />
        ))}
        {/* status chip */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold text-white shadow-lg"
          style={{ backgroundColor: phase === "results" ? GREEN : INDIGO }}>
          {phase === "scanning" ? <ScanLine className="w-3.5 h-3.5 animate-pulse" /> : phase === "results" ? <CheckCircle className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
          {phase === "idle" && "Tap to scan this photo"}
          {phase === "scanning" && "AI scanning…"}
          {phase === "results" && "Scan complete — 3 issues found"}
        </div>
        {/* scan line sweep */}
        <AnimatePresence>
          {phase === "scanning" && !lite && (
            <motion.div key={runKey} className="absolute inset-x-0 pointer-events-none"
              initial={{ top: "-12%" }}
              animate={{ top: ["-12%", "104%", "-12%", "104%"] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.3, ease: "easeInOut", times: [0, 0.45, 0.55, 1] }}
              style={{ height: "14%" }}
            >
              <div className="w-full h-full" style={{
                background: "linear-gradient(to bottom, rgba(99,102,241,0) 0%, rgba(99,102,241,0.35) 55%, rgba(99,102,241,0.9) 98%, rgba(255,255,255,1) 100%)",
                boxShadow: "0 2px 24px rgba(99,102,241,0.6)",
              }} />
            </motion.div>
          )}
        </AnimatePresence>
        {/* detection boxes pop in on results */}
        <AnimatePresence>
          {phase === "results" && (
            <>
              {[
                { top: "12%", left: "18%", w: "30%", h: "20%", label: "Roof" },
                { top: "38%", left: "62%", w: "24%", h: "16%", label: "Gutter" },
                { top: "70%", left: "30%", w: "34%", h: "16%", label: "Driveway" },
              ].map((b, i) => (
                <motion.div key={b.label}
                  className="absolute rounded-lg pointer-events-none"
                  style={{ top: b.top, left: b.left, width: b.w, height: b.h, border: "2px solid #FBBF24", boxShadow: "0 0 0 2px rgba(251,191,36,0.25)" }}
                  initial={{ opacity: 0, scale: 1.25 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.15 + i * 0.2, duration: 0.45, ease: EASE }}
                >
                  <span className="absolute -top-6 left-0 px-2 py-0.5 rounded-md text-[10px] font-black text-gray-900" style={{ backgroundColor: "#FBBF24" }}>{b.label}</span>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Diagnosis terminal */}
      <div className="rounded-[28px] p-7 md:p-9 flex flex-col"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", boxShadow: "0 24px 60px -28px rgba(30,27,58,0.18)" }}>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: INDIGO_SOFT }}>
            <Sparkles className="w-4.5 h-4.5" style={{ color: INDIGO, width: 18, height: 18 }} />
          </div>
          <div>
            <p className="text-sm font-black" style={{ color: INK }}>TrustyPro AI Report</p>
            <p className="text-[11px] text-gray-400 font-medium">50+ issue types · results in under 60 seconds</p>
          </div>
          <button onClick={startScan} className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors hover:bg-indigo-100"
            style={{ backgroundColor: INDIGO_SOFT, color: INDIGO_DEEP }}>
            <RefreshCw className="w-3 h-3" /> Re-scan
          </button>
        </div>
        <div className="flex-1 space-y-3.5 font-mono text-[13px] leading-relaxed">
          {phase !== "results" && (
            <p className="text-gray-400">
              {phase === "scanning" ? "Analyzing photo — roofline, drainage, surfaces…" : "Waiting for a photo. Tap the image to run the demo scan."}
              {phase === "scanning" && <span className="inline-block w-2 h-4 ml-1 align-middle animate-pulse" style={{ backgroundColor: INDIGO }} />}
            </p>
          )}
          {phase === "results" && DIAGNOSIS_LINES.slice(0, linesShown).map((line, i) => (
            <div key={`${runKey}-${i}`} className="flex items-start gap-2.5">
              <span className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: toneColor(line.tone) }} />
              <p style={{ color: line.tone === "good" ? GREEN : INK }} className={line.tone === "good" ? "font-bold" : ""}>
                {i === linesShown - 1
                  ? <Typewriter text={line.text} speed={lite ? 8 : 20} onDone={() => setLinesShown(n => Math.min(n + 1, DIAGNOSIS_LINES.length))} />
                  : line.text}
              </p>
            </div>
          ))}
        </div>
        <AnimatePresence>
          {phase === "results" && linesShown >= DIAGNOSIS_LINES.length && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}
              className="mt-6 rounded-2xl p-4 flex items-center gap-3"
              style={{ backgroundColor: GREEN_SOFT, border: "1px solid #BBF7D0" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: GREEN }}>
                <Shield className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs font-bold leading-snug" style={{ color: "#14532D" }}>
                Your matched pro is licensed, insured, and background-checked through Checkr — before you ever see their name.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ================================================================================
   HOME HEALTH VAULT — tilt card + animated health ring
================================================================================ */

function HealthRing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [score, setScore] = useState(0);
  const TARGET = 92;
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1900, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setScore(Math.round(TARGET * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const R = 84;
  const C = 2 * Math.PI * R;
  return (
    <div ref={ref} className="relative w-56 h-56 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
        <circle cx="100" cy="100" r={R} fill="none" stroke="#EEF2FF" strokeWidth="14" />
        <circle cx="100" cy="100" r={R} fill="none" stroke="url(#tpRingGrad)" strokeWidth="14"
          strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C - (score / 100) * C}
          style={{ transition: "stroke-dashoffset 80ms linear" }} />
        <defs>
          <linearGradient id="tpRingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={INDIGO} />
            <stop offset="100%" stopColor={GREEN} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-black tabular-nums" style={{ color: INK }}>{score}</span>
        <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: GREEN }}>Home Health</span>
      </div>
    </div>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const lite = useLiteMode();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const onMove = (e: React.MouseEvent) => {
    if (lite || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: py * -10, ry: px * 12 });
  };
  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ================================================================================
   CONSTANTS — copy & form options
================================================================================ */

const MARQUEE = ["Kitchen Remodeling", "Bathroom Renovation", "Roofing & Gutters", "HVAC Installation", "Flooring & Tile", "Interior Painting", "Landscaping", "Plumbing", "Electrical", "Deck & Patio", "Windows & Doors", "Basement Finishing"];

const SERVICE_TYPES = [
  "Kitchen Remodel", "Bathroom Upgrade", "Exterior / Curb Appeal",
  "Flooring", "Painting", "HVAC / Plumbing", "Landscaping", "Roofing",
  "General Repairs", "Other",
];

const TIMELINES = [
  { value: "asap", label: "ASAP" },
  { value: "1-3mo", label: "1–3 months" },
  { value: "3-6mo", label: "3–6 months" },
  { value: "6-12mo", label: "6–12 months" },
  { value: "exploring", label: "Just exploring" },
];

const BUDGETS = [
  { value: "<5k", label: "Under $5k" },
  { value: "5-15k", label: "$5k–$15k" },
  { value: "15-50k", label: "$15k–$50k" },
  { value: "50-150k", label: "$50k–$150k" },
  { value: "150k+", label: "$150k+" },
  { value: "unsure", label: "Not sure yet" },
];

const FAQS = [
  { q: "What is TrustyPro?", a: "TrustyPro is a homeowner platform launching soon in DFW. We help you build a complete profile of your home and connect you with verified, certified pros for any maintenance or improvement project. Free for homeowners — always. We're funded by a small platform fee paid by pros when they close a job." },
  { q: "When does TrustyPro launch?", a: "We're onboarding our founding contractor network now. Homeowner access opens in waves as we verify enough TrustyPro Certified pros in each ZIP code. Join the waitlist to be notified the moment your area is live." },
  { q: "What happens after I join the waitlist?", a: "You'll get a confirmation email and a private home profile we build together. As we onboard pros in your area, we'll match your home with the right professionals for the projects you're planning — no spam, no calls from random contractors." },
  { q: "How are TrustyPro contractors verified?", a: "Every TrustyPro Certified pro is background-checked, license-verified, insured, and reviewed by our network. They earn the badge only after passing onboarding." },
  { q: "Is TrustyPro free for homeowners?", a: "Yes — using TrustyPro to plan, document, and find pros is completely free. The platform is funded by a small platform fee paid by the pro when a job closes — never by you." },
  { q: "Will my home data be private?", a: "Yes. Your home profile is yours. We only share your information with pros you explicitly request quotes from. You can opt in or out of marketing communications at any time." },
];

const VERIFY_POINTS = [
  "State contractor license confirmed active",
  "Full criminal background check via Checkr",
  "General liability + workers' comp verified",
  "Past client references checked and scored",
  "Portfolio reviewed for craftsmanship",
  "Pricing audited for fair market rates",
  "Ongoing rating monitoring — pros removed if quality slips",
];

/* ================================================================================
   MAIN PAGE
================================================================================ */

export default function TrustyProHome() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [chatOpen, setChatOpen] = useState(false);
  const lite = useLiteMode();

  const [, navigate] = useLocation();
  const { user } = useAuth();

  /* -- Waitlist form state (carried over — same fields & payload) ----------- */
  const [intakeStep, setIntakeStep] = useState(1); // 1=address, 2=contact, 3=projects, 4=notes+beta, 5=success
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ position: number; shareSlug: string } | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");
  const [intakeForm, setIntakeForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zipCode: "",
    propertyData: null as null | {
      squareFeet: number | null; yearBuilt: number | null;
      bedrooms: number | null; bathrooms: number | null;
      propertyType: string | null;
    },
    projects: [] as string[],
    timeline: "",
    budget: "",
    notes: "",
    betaOptIn: false,
    smsConsent: false,
    emailConsent: true,
  });

  useEffect(() => {
    const uName = typeof (user as any)?.name === "string" ? ((user as any).name as string) : "";
    const uEmail = typeof (user as any)?.email === "string" ? ((user as any).email as string) : "";
    setIntakeForm(f => ({
      ...f,
      firstName: f.firstName || (uName.split(" ")[0] ?? ""),
      lastName: f.lastName || uName.split(" ").slice(1).join(" "),
      email: f.email || uEmail,
    }));
  }, [user]);

  // Capture referral on mount from ?ref= or localStorage
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      if (ref) {
        localStorage.setItem("trustypro_referral_code", ref);
        setReferralCode(ref.toUpperCase());
      } else {
        const stored = localStorage.getItem("trustypro_referral_code");
        if (stored) setReferralCode(stored.toUpperCase());
      }
    } catch {}
  }, []);

  // Beta program capacity check — hides opt-in once 1,000 spots are filled
  const betaStatus = trpc.waitlist.getBetaCount.useQuery(undefined, {
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
  });
  const betaIsOpen = betaStatus.data?.isOpen !== false;
  const betaSpotsRemaining = betaStatus.data?.spotsRemaining ?? 1000;
  const spotsCounter = useCountUp(betaSpotsRemaining, 1600);

  const joinWaitlist = trpc.waitlist.joinHomeWaitlist.useMutation({
    onSuccess: (data: { success: true; position: number }) => {
      const slug = `${intakeForm.firstName}-${intakeForm.lastName}`.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 30) || `home-${data.position}`;
      setSuccessData({ position: data.position, shareSlug: slug });
      setIntakeStep(5);
      toast.success(`You're on the waitlist — position #${data.position}`);
    },
    onError: (err: { message?: string }) => { toast.error(err.message || "Something went wrong. Please try again."); },
  });

  const toggleProject = (p: string) => {
    setIntakeForm(f => ({
      ...f,
      projects: f.projects.includes(p) ? f.projects.filter(x => x !== p) : [...f.projects, p],
    }));
  };

  const handleWaitlistSubmit = () => {
    if (!intakeForm.address || !intakeForm.city || !intakeForm.state || !intakeForm.zipCode) {
      toast.error("Please select your home address first."); setIntakeStep(1); return;
    }
    if (!intakeForm.firstName || !intakeForm.lastName || !intakeForm.email) {
      toast.error("Please fill in your name and email."); setIntakeStep(2); return;
    }
    if (intakeForm.projects.length === 0) {
      toast.error("Pick at least one project you're planning."); setIntakeStep(3); return;
    }
    const projectsLabel = intakeForm.projects.join(", ");
    const meta: string[] = [];
    if (intakeForm.timeline) meta.push(`timeline:${intakeForm.timeline}`);
    if (intakeForm.budget) meta.push(`budget:${intakeForm.budget}`);
    if (intakeForm.betaOptIn && betaIsOpen) meta.push("beta:true");
    if (intakeForm.notes) meta.push(`notes:${intakeForm.notes.slice(0, 100)}`);
    const serviceNeeded = `${projectsLabel} | ${meta.join(" | ")}`.slice(0, 255);

    joinWaitlist.mutate({
      firstName: intakeForm.firstName,
      lastName: intakeForm.lastName,
      email: intakeForm.email,
      phone: intakeForm.phone || undefined,
      address: intakeForm.address,
      city: intakeForm.city,
      state: intakeForm.state.toUpperCase().slice(0, 2),
      zipCode: intakeForm.zipCode,
      serviceNeeded,
      referredBy: referralCode || undefined,
    });
  };

  const goToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  /* hero parallax */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "26%"]);
  const heroCanvasY = useTransform(heroScroll, [0, 1], ["0%", "12%"]);
  const heroFade = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-900";
  const pillBtn = (active: boolean): React.CSSProperties => active
    ? { backgroundColor: INDIGO, color: "white", borderColor: INDIGO }
    : { backgroundColor: "white", color: "#374151", borderColor: "#E5E7EB" };

  const stepTitles = useMemo(() => ({
    1: ["Start with your home address", "We'll pre-fill your home profile from public property records — square footage, year built, beds, baths."],
    2: ["How can we reach you?", "We'll send your confirmation and notify you the moment your area goes live."],
    3: ["What are you planning?", "Tell us what's on your list. We'll match you with the right TrustyPro Certified pro at launch."],
    4: ["One last thing", "Optional notes plus our Beta program — first 1,000 homeowners only."],
  } as Record<number, [string, string]>), []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: CREAM }}>
      <Helmet>
        <title>TrustyPro — Your Home, Scanned, Scored & Cared For by Vetted Pros</title>
        <meta name="description" content="Snap a photo, get an AI home health score, and get matched with verified, background-checked home service professionals in DFW. Free for homeowners." />
        <meta property="og:title" content="TrustyPro — Vetted Home Service Pros, AI-Matched" />
        <meta property="og:description" content="Snap a photo, get an AI home health score, and get matched with verified, background-checked home service professionals in DFW." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://trustypro.io" />
        <meta property="og:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/trustypro-hero-interior_21ad489c.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TrustyPro — Vetted Home Service Pros, AI-Matched" />
        <meta name="twitter:description" content="Snap a photo, get an AI home health score, and get matched with verified, background-checked home service professionals in DFW." />
        <meta name="twitter:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/trustypro-hero-interior_21ad489c.webp" />
        <link rel="canonical" href="https://trustypro.io" />
      </Helmet>

      {/* ============================ NAV ============================ */}
      <nav className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: "rgba(250,250,247,0.85)", backdropFilter: "blur(14px)", borderColor: "rgba(99,102,241,0.10)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/trustypro">
            <TrustyProLogo height={72} />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[["how-it-works", "How It Works"], ["ai-demo", "AI Scan"], ["vetted", "Vetted Pros"], ["vault", "Home Vault"], ["faq", "FAQ"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">{label}</button>
            ))}
            <button onClick={() => { setChatOpen(true); setMobileOpen(false); }} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Contact</button>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/trustypro/login")}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 px-4 py-2 rounded-full hover:border-gray-400 bg-white"
            >
              My Home Login
            </button>
            <button onClick={goToWaitlist} className="px-5 py-2 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-md"
              style={{ backgroundColor: INDIGO }}>
              Join the Waitlist
            </button>
          </div>
          <button className="md:hidden p-2" aria-label="Open menu" onClick={() => setMobileOpen(!mobileOpen)}><Menu className="w-5 h-5" /></button>
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
              {[["how-it-works", "How It Works"], ["ai-demo", "AI Scan"], ["vetted", "Vetted Pros"], ["vault", "Home Vault"], ["faq", "FAQ"]].map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} className="text-left text-sm font-medium text-gray-600">{label}</button>
              ))}
              <button onClick={() => { setChatOpen(true); setMobileOpen(false); }} className="text-left text-sm font-medium text-gray-600">Contact</button>
              <button onClick={() => navigate("/trustypro/login")} className="text-left text-sm font-medium text-gray-600">My Home Login</button>
              <button onClick={goToWaitlist} className="px-5 py-2 rounded-full text-sm font-semibold text-white w-fit" style={{ backgroundColor: INDIGO }}>Join the Waitlist</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ============================ HERO — 3D HOUSE ============================ */}
      <section ref={heroRef} className="relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #FAFAF7 0%, #EEF2FF 55%, #FAFAF7 100%)" }}>
        {/* soft blobs */}
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.14), transparent 70%)" }} />
        <div className="absolute top-40 -right-40 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(22,163,74,0.10), transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 pt-14 md:pt-20 pb-8 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div style={lite ? undefined : { y: heroTextY, opacity: heroFade }} className="relative z-10">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: GREEN_SOFT, border: "1.5px solid #86EFAC" }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: GREEN }} />
              <span className="text-sm font-bold" style={{ color: "#15803D" }}>DFW Waitlist Now Open — Founding Homeowner Perks</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-black leading-[1.02] tracking-tight mb-6"
              style={{ color: INK }}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
            >
              TrustyPro — your home,{" "}
              <span style={{ color: INDIGO }}>scanned, scored,</span> and cared for by{" "}
              <span className="relative inline-block">
                <span style={{ color: GREEN }}>vetted pros</span>
                <motion.svg viewBox="0 0 220 14" className="absolute -bottom-1 left-0 w-full" preserveAspectRatio="none" style={{ height: 10 }}>
                  <motion.path d="M4 10 C 60 2, 160 2, 216 9" fill="none" stroke={GREEN} strokeWidth="5" strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 1.0, ease: EASE }} />
                </motion.svg>
              </span>
              .
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            >
              Snap a photo. Our AI reads it, scores your home's health, and matches you with a licensed, insured, background-checked homeowner-services pro in DFW — in hours, not weeks. Free for homeowners, always.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row sm:items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.32 }}
            >
              <motion.button
                onClick={goToWaitlist}
                className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full text-base font-black text-white shadow-xl"
                style={{ backgroundColor: INDIGO, boxShadow: "0 16px 40px -12px rgba(99,102,241,0.55)" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Join the Waitlist <ArrowRight className="w-5 h-5" />
              </motion.button>
              <button
                onClick={() => scrollTo("ai-demo")}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-bold transition-colors hover:bg-white"
                style={{ color: INDIGO_DEEP, border: "1.5px solid #C7D2FE", backgroundColor: "rgba(255,255,255,0.6)" }}
              >
                <Camera className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} /> Watch the AI scan
              </button>
            </motion.div>

            <motion.div
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" style={{ color: GREEN }} /> Free for homeowners</span>
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" style={{ color: GREEN }} /> Every pro background-checked</span>
            </motion.div>

            <motion.p
              className="mt-5 text-sm text-gray-500"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.6 }}
            >
              Already on the waitlist?{" "}
              <Link href="/waitlist/homeowner/status" className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: INDIGO_DEEP }}>
                Check your position →
              </Link>
              {"  ·  "}
              Need a pro right now?{" "}
              <a href="/request-service" className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: INDIGO_DEEP }}>
                Request service
              </a>
            </motion.p>
          </motion.div>

          {/* 3D canvas */}
          <motion.div
            className="relative h-[380px] sm:h-[460px] lg:h-[560px]"
            style={lite ? undefined : { y: heroCanvasY }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
          >
            <Hero3D />
            {!lite && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-semibold text-gray-400 bg-white/70 backdrop-blur-sm border border-gray-100">
                move your mouse — the house follows
              </div>
            )}
          </motion.div>
        </div>

        {/* marquee */}
        <div className="relative py-4 overflow-hidden border-t" style={{ borderColor: "rgba(99,102,241,0.12)", backgroundColor: "rgba(255,255,255,0.55)" }}>
          <div className="flex tp-marquee whitespace-nowrap">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} className="mx-7 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: i % 2 ? "#A5B4FC" : "#9CA3AF" }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ HOW IT WORKS ============================ */}
      <section id="how-it-works" className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ backgroundColor: INDIGO_SOFT, color: INDIGO_DEEP }}>How It Works</span>
            <h2 className="text-4xl md:text-6xl font-black leading-tight" style={{ color: INK }}>
              Photo → AI scope →<br className="hidden md:block" /> cleared pro → done.
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">No cold calls. No mystery quotes. No strangers at your door. You start everything — on your timeline.</p>
          </Reveal>

          <motion.div
            className="grid md:grid-cols-4 gap-5"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-70px" }}
            variants={stagger}
          >
            {[
              { n: "01", icon: Camera, title: "Snap a photo", desc: "Any room, roof, or yard. Your phone camera is all it takes — under 2 minutes.", color: INDIGO },
              { n: "02", icon: Sparkles, title: "AI scopes the work", desc: "50+ issue types detected, with honest cost estimates. Results in under 60 seconds.", color: "#8B5CF6" },
              { n: "03", icon: Shield, title: "Cleared pro matched", desc: "Licensed, insured, Checkr background-checked — verified before you ever see their name.", color: GREEN },
              { n: "04", icon: CheckCircle, title: "Done & documented", desc: "Work completed, logged forever in your Home Health Vault. Your score goes up.", color: "#0EA5E9" },
            ].map((s) => (
              <motion.div key={s.n} variants={riseItem}
                className="rounded-3xl p-7 h-full"
                style={{ backgroundColor: CREAM, border: "1px solid #F0EFEA" }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${s.color}18` }}>
                    <s.icon className="w-5.5 h-5.5" style={{ color: s.color, width: 22, height: 22 }} />
                  </div>
                  <span className="text-3xl font-black" style={{ color: "#E5E2DA" }}>{s.n}</span>
                </div>
                <h3 className="text-lg font-black mb-2" style={{ color: INK }}>{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================ AI SCAN DEMO ============================ */}
      <section id="ai-demo" className="py-24 overflow-hidden" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #EEF2FF 100%)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ backgroundColor: INDIGO_SOFT, color: INDIGO_DEEP }}>
              <ScanLine className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />Live Demo
            </span>
            <h2 className="text-4xl md:text-6xl font-black leading-tight" style={{ color: INK }}>
              Snap a photo.<br /><span style={{ color: INDIGO }}>Watch the AI read it.</span>
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">This is a real example of what TrustyPro sees in a single homeowner photo. Tap the image to run the scan.</p>
          </Reveal>
          <Reveal>
            <AIScanDemo />
          </Reveal>
        </div>
      </section>

      {/* ============================ VETTED / TRUST ============================ */}
      <section id="vetted" className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ backgroundColor: GREEN_SOFT, color: "#15803D" }}>
                <Shield className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />Cleared to Enter Your Home
              </span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-5" style={{ color: INK }}>
                Every pro passes 7 checks before you see their name.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                The person walking into your home matters. That's why TrustyPro Certified means background-checked, license-verified, and insured — with zero unverified contractors on the platform. Ever.
              </p>
              <motion.button
                onClick={goToWaitlist}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white shadow-lg"
                style={{ backgroundColor: GREEN }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Get Matched with Vetted Pros <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Reveal>
            <motion.div
              className="rounded-[28px] p-8"
              style={{ backgroundColor: CREAM, border: "1px solid #F0EFEA", boxShadow: "0 24px 60px -28px rgba(22,163,74,0.18)" }}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-70px" }}
              variants={stagger}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: GREEN }}>
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-black text-sm" style={{ color: INK }}>7-Point Verification</p>
                  <p className="text-xs text-gray-400 font-medium">Screened through Checkr · no shortcuts</p>
                </div>
                <span className="ml-auto px-3 py-1 rounded-full text-[10px] font-black text-white" style={{ backgroundColor: GREEN }}>100% REQUIRED</span>
              </div>
              <div className="space-y-3">
                {VERIFY_POINTS.map((pt) => (
                  <motion.div key={pt} variants={riseItem} className="flex items-start gap-3 bg-white rounded-2xl px-4 py-3 border border-gray-100">
                    <CheckCircle className="w-4.5 h-4.5 mt-0.5 flex-shrink-0" style={{ color: GREEN, width: 18, height: 18 }} />
                    <p className="text-sm font-medium leading-snug" style={{ color: "#374151" }}>{pt}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================ HOME HEALTH VAULT ============================ */}
      <section id="vault" className="py-24 overflow-hidden" style={{ background: "linear-gradient(180deg, #EEF2FF 0%, #FAFAF7 100%)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ backgroundColor: INDIGO_SOFT, color: INDIGO_DEEP }}>
              <Lock className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />Home Health Vault
            </span>
            <h2 className="text-4xl md:text-6xl font-black leading-tight" style={{ color: INK }}>
              Your home gets a score.<br />And a memory.
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
              Every scan, repair, and upgrade — permanently logged in one secure vault. When you sell, you have proof. When something breaks, you have the history.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <Reveal>
              <TiltCard>
                <div className="rounded-[32px] p-10 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(150deg, #FFFFFF 0%, #F5F6FF 100%)",
                    border: "1px solid #E0E7FF",
                    boxShadow: "0 40px 90px -30px rgba(99,102,241,0.35)",
                  }}>
                  <div className="absolute top-6 left-8 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: INDIGO_SOFT }}>
                      <HomeIcon className="w-4 h-4" style={{ color: INDIGO }} />
                    </div>
                    <div>
                      <p className="text-xs font-black" style={{ color: INK }}>1428 Maplewood Dr</p>
                      <p className="text-[10px] text-gray-400 font-semibold">Frisco, TX · built 2009</p>
                    </div>
                  </div>
                  <span className="absolute top-7 right-8 px-2.5 py-1 rounded-full text-[10px] font-black" style={{ backgroundColor: GREEN_SOFT, color: "#15803D" }}>EXCELLENT</span>
                  <div className="pt-12">
                    <HealthRing />
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-8">
                    {[
                      { label: "Roof", v: "96", c: GREEN },
                      { label: "HVAC", v: "88", c: GREEN },
                      { label: "Plumbing", v: "94", c: GREEN },
                      { label: "Electrical", v: "85", c: "#D97706" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-2xl py-3 text-center bg-white border border-gray-100">
                        <p className="text-lg font-black" style={{ color: s.c }}>{s.v}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            <motion.div className="space-y-4"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-70px" }} variants={stagger}>
              {[
                { icon: FileText, title: "Permanent job records", desc: "Every contractor visit, invoice, and warranty automatically saved. Your home's full service history, always available.", c: INDIGO },
                { icon: TrendingUp, title: "Home value impact", desc: "Documented maintenance returns $2–4 for every $1 spent at sale time. See how each improvement moves your resale value.", c: GREEN },
                { icon: RefreshCw, title: "Proactive maintenance alerts", desc: "AI watches your home's systems and flags small issues before they become expensive emergencies.", c: "#F59E0B" },
              ].map((card) => (
                <motion.div key={card.title} variants={riseItem}
                  className="rounded-3xl p-6 flex gap-4 items-start"
                  style={{ backgroundColor: "rgba(255,255,255,0.8)", border: "1px solid #EDEDEA", backdropFilter: "blur(6px)" }}>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${card.c}16` }}>
                    <card.icon className="w-5 h-5" style={{ color: card.c }} />
                  </div>
                  <div>
                    <h3 className="font-black mb-1" style={{ color: INK }}>{card.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
              <motion.div variants={riseItem}>
                <button onClick={goToWaitlist}
                  className="mt-2 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-lg"
                  style={{ backgroundColor: INDIGO }}>
                  Reserve Your Vault — Free <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================ WAITLIST — THE FORM ============================ */}
      <section id="waitlist" className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left: pitch + counter */}
            <Reveal className="lg:col-span-2 lg:sticky lg:top-24">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ backgroundColor: GREEN_SOFT, color: "#15803D" }}>Beta · Waitlist Open</span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-5" style={{ color: INK }}>
                Be first in line at launch.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Join the waitlist and we'll build your home profile, save your spot, and notify you the moment verified pros go live in your area. Founding homeowners get lifetime perks.
              </p>
              {betaIsOpen && (
                <div ref={spotsCounter.ref} className="rounded-3xl p-6 mb-6"
                  style={{ backgroundColor: INDIGO_SOFT, border: "1px solid #E0E7FF" }}>
                  <p className="text-5xl font-black tabular-nums" style={{ color: INDIGO_DEEP }}>{spotsCounter.value.toLocaleString()}</p>
                  <p className="text-sm font-bold text-gray-600 mt-1">beta spots remaining</p>
                  <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#DDE2FE" }}>
                    <motion.div className="h-full rounded-full"
                      style={{ backgroundColor: INDIGO }}
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${Math.max(4, ((1000 - betaSpotsRemaining) / 1000) * 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: EASE }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2 font-medium">First 1,000 homeowners get early access to the AI home scan, instant matching, and the Home Health Vault.</p>
                </div>
              )}
              <div className="space-y-2.5">
                {["Free for homeowners — always", "No spam, no contractor cold calls", "Your address stays private"].map(t => (
                  <p key={t} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: GREEN }} /> {t}
                  </p>
                ))}
              </div>
            </Reveal>

            {/* Right: THE WORKING FORM (multi-step, same payload as before) */}
            <Reveal className="lg:col-span-3">
              <div className="rounded-[32px] overflow-hidden"
                style={{ backgroundColor: CREAM, border: "1px solid #EDEDEA", boxShadow: "0 30px 80px -30px rgba(30,27,58,0.18)" }}>
                {/* header */}
                <div className="px-8 pt-8 pb-5 border-b border-gray-200/60">
                  {intakeStep < 5 ? (
                    <>
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: INDIGO }}>Waitlist · Free</span>
                        <span className="text-xs text-gray-400 font-medium">DFW launch · 2026</span>
                        {referralCode && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: INDIGO_SOFT, color: INDIGO }}>
                            <Sparkles className="w-3 h-3" /> Referred · {referralCode}
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-black" style={{ color: INK }}>{stepTitles[intakeStep][0]}</h3>
                      <p className="text-sm text-gray-500 mt-1">{stepTitles[intakeStep][1]}</p>
                      <div className="flex gap-2 mt-4">
                        {[1, 2, 3, 4].map(n => (
                          <div key={n} className="h-1.5 flex-1 rounded-full transition-colors duration-300" style={{ backgroundColor: intakeStep >= n ? INDIGO : "#E5E7EB" }} />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <motion.div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: GREEN_SOFT }}
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16 }}
                      >
                        <CheckCircle className="w-8 h-8" style={{ color: GREEN }} />
                      </motion.div>
                      <h3 className="text-2xl font-black" style={{ color: INK }}>You're on the list!</h3>
                      <p className="text-gray-500 mt-2 text-sm">
                        You're <span className="font-bold" style={{ color: INDIGO }}>#{successData?.position}</span> on the TrustyPro homeowner waitlist. Check your email for confirmation — we'll notify you the moment your area is live.
                      </p>
                    </div>
                  )}
                </div>

                {/* body */}
                {intakeStep === 1 && (
                  <div className="px-8 py-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">Home Address *</label>
                      <AddressAutofill
                        value={intakeForm.address ? `${intakeForm.address}, ${intakeForm.city}, ${intakeForm.state} ${intakeForm.zipCode}`.trim() : ""}
                        onAddressSelect={(sel) => {
                          setIntakeForm(f => ({
                            ...f,
                            address: sel.street,
                            city: sel.city,
                            state: sel.state,
                            zipCode: sel.zip,
                            propertyData: sel.propertyData,
                          }));
                        }}
                      />
                    </div>
                    {intakeForm.propertyData && (
                      <div className="rounded-xl p-4 grid grid-cols-2 gap-3" style={{ backgroundColor: INDIGO_SOFT }}>
                        <p className="col-span-2 text-xs font-black uppercase tracking-wider" style={{ color: INDIGO }}>
                          <Sparkles className="inline w-3.5 h-3.5 mr-1" /> Found your home — pre-filled from public records
                        </p>
                        {intakeForm.propertyData.squareFeet && <div className="text-xs"><span className="text-gray-500">Sq ft</span> <span className="font-bold text-gray-900">{intakeForm.propertyData.squareFeet.toLocaleString()}</span></div>}
                        {intakeForm.propertyData.yearBuilt && <div className="text-xs"><span className="text-gray-500">Built</span> <span className="font-bold text-gray-900">{intakeForm.propertyData.yearBuilt}</span></div>}
                        {intakeForm.propertyData.bedrooms != null && <div className="text-xs"><span className="text-gray-500">Beds</span> <span className="font-bold text-gray-900">{intakeForm.propertyData.bedrooms}</span></div>}
                        {intakeForm.propertyData.bathrooms != null && <div className="text-xs"><span className="text-gray-500">Baths</span> <span className="font-bold text-gray-900">{intakeForm.propertyData.bathrooms}</span></div>}
                        {intakeForm.propertyData.propertyType && <div className="col-span-2 text-xs"><span className="text-gray-500">Type</span> <span className="font-bold text-gray-900">{intakeForm.propertyData.propertyType}</span></div>}
                      </div>
                    )}
                    <button
                      onClick={() => {
                        if (!intakeForm.address || !intakeForm.city || !intakeForm.state || !intakeForm.zipCode) {
                          toast.error("Please select your home address from the suggestions."); return;
                        }
                        setIntakeStep(2);
                      }}
                      className="w-full py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: INDIGO }}
                    >
                      Continue <ArrowRight className="inline w-4 h-4 ml-1" />
                    </button>
                    <p className="text-[11px] text-center text-gray-400">Your address is private. We never share it without your explicit consent.</p>
                  </div>
                )}

                {intakeStep === 2 && (
                  <div className="px-8 py-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">First Name *</label>
                        <input type="text" placeholder="Jane" value={intakeForm.firstName}
                          onChange={e => setIntakeForm(f => ({ ...f, firstName: e.target.value }))}
                          className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Last Name *</label>
                        <input type="text" placeholder="Smith" value={intakeForm.lastName}
                          onChange={e => setIntakeForm(f => ({ ...f, lastName: e.target.value }))}
                          className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                      <input type="email" placeholder="jane@example.com" value={intakeForm.email}
                        onChange={e => setIntakeForm(f => ({ ...f, email: e.target.value }))}
                        className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Phone <span className="text-gray-400 font-normal">(optional, for launch alerts)</span></label>
                      <input type="tel" placeholder="(214) 555-0100" value={intakeForm.phone}
                        onChange={e => setIntakeForm(f => ({ ...f, phone: e.target.value }))}
                        className={inputCls} />
                    </div>
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input type="checkbox" checked={intakeForm.emailConsent}
                        onChange={e => setIntakeForm(f => ({ ...f, emailConsent: e.target.checked }))}
                        className="mt-0.5 accent-indigo-600" />
                      <span className="text-xs text-gray-600 leading-snug">Yes, email me launch updates, home tips, and pro matches. You can unsubscribe anytime.</span>
                    </label>
                    {intakeForm.phone && (
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input type="checkbox" checked={intakeForm.smsConsent}
                          onChange={e => setIntakeForm(f => ({ ...f, smsConsent: e.target.checked }))}
                          className="mt-0.5 accent-indigo-600" />
                        <span className="text-xs text-gray-600 leading-snug">Text me at launch — standard messaging rates apply. Reply STOP to opt out.</span>
                      </label>
                    )}
                    <div className="flex gap-3">
                      <button onClick={() => setIntakeStep(1)} className="flex-1 py-3 rounded-xl text-sm font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">Back</button>
                      <button
                        onClick={() => {
                          if (!intakeForm.firstName || !intakeForm.lastName || !intakeForm.email) { toast.error("Please fill in your name and email."); return; }
                          setIntakeStep(3);
                        }}
                        className="flex-1 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: INDIGO }}
                      >
                        Continue <ArrowRight className="inline w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                )}

                {intakeStep === 3 && (
                  <div className="px-8 py-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">What are you planning? * <span className="text-gray-400 font-normal">(select all that apply)</span></label>
                      <div className="flex flex-wrap gap-2">
                        {SERVICE_TYPES.map(s => {
                          const active = intakeForm.projects.includes(s);
                          return (
                            <button key={s} onClick={() => toggleProject(s)}
                              className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                              style={pillBtn(active)}>
                              {active ? "✓ " : ""}{s}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">When are you hoping to start?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {TIMELINES.map(t => (
                          <button key={t.value}
                            onClick={() => setIntakeForm(f => ({ ...f, timeline: t.value }))}
                            className="py-2 rounded-xl text-xs font-semibold border transition-all"
                            style={pillBtn(intakeForm.timeline === t.value)}>
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">Approximate budget</label>
                      <div className="grid grid-cols-2 gap-2">
                        {BUDGETS.map(b => (
                          <button key={b.value}
                            onClick={() => setIntakeForm(f => ({ ...f, budget: b.value }))}
                            className="py-2 rounded-xl text-xs font-semibold border transition-all"
                            style={pillBtn(intakeForm.budget === b.value)}>
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => setIntakeStep(2)} className="flex-1 py-3 rounded-xl text-sm font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">Back</button>
                      <button
                        onClick={() => {
                          if (intakeForm.projects.length === 0) { toast.error("Pick at least one project."); return; }
                          setIntakeStep(4);
                        }}
                        className="flex-1 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: INDIGO }}
                      >
                        Continue <ArrowRight className="inline w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                )}

                {intakeStep === 4 && (
                  <div className="px-8 py-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Anything else we should know? <span className="text-gray-400 font-normal">(optional)</span></label>
                      <textarea rows={3}
                        placeholder="e.g. Trying to finish before family visits in March, looking for eco-friendly materials, recently bought the home..."
                        value={intakeForm.notes}
                        onChange={e => setIntakeForm(f => ({ ...f, notes: e.target.value }))}
                        className={`${inputCls} resize-none`} />
                    </div>
                    {betaIsOpen && (
                      <label className="flex items-start gap-3 p-4 rounded-2xl cursor-pointer border-2 transition-colors"
                        style={intakeForm.betaOptIn
                          ? { backgroundColor: INDIGO_SOFT, borderColor: INDIGO }
                          : { backgroundColor: "white", borderColor: "#E5E7EB" }}>
                        <input type="checkbox" checked={intakeForm.betaOptIn}
                          onChange={e => setIntakeForm(f => ({ ...f, betaOptIn: e.target.checked }))}
                          className="mt-1 accent-indigo-600 w-4 h-4" />
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-black text-gray-900 text-sm">Join the Beta Program</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: INDIGO }}>
                              {betaSpotsRemaining < 100 ? `Only ${betaSpotsRemaining} spots left!` : `Limited · ${betaSpotsRemaining} spots remaining`}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 leading-snug">First 1,000 homeowners get early access to test new features — AI home scan, instant pro matching, and the Home Health Vault — before public launch.</p>
                        </div>
                      </label>
                    )}
                    <div className="flex gap-3">
                      <button onClick={() => setIntakeStep(3)} className="flex-1 py-3 rounded-xl text-sm font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">Back</button>
                      <button
                        onClick={handleWaitlistSubmit}
                        disabled={joinWaitlist.isPending}
                        className="flex-1 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                        style={{ backgroundColor: INDIGO }}
                      >
                        {joinWaitlist.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Joining...</> : "Join the Waitlist"}
                      </button>
                    </div>
                  </div>
                )}

                {intakeStep === 5 && (
                  <div className="px-8 py-6 space-y-5">
                    <div className="rounded-2xl p-5" style={{ backgroundColor: INDIGO_SOFT, border: `1px solid ${INDIGO}33` }}>
                      <p className="text-sm font-bold mb-2" style={{ color: INDIGO }}>
                        Know someone who could use TrustyPro?
                      </p>
                      <p className="text-xs text-gray-600 leading-snug mb-4">Help your neighbors find verified, trusted pros. No tracking, no points — just genuine recommendation.</p>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <a
                          href={`mailto:?subject=${encodeURIComponent("You should check out TrustyPro")}&body=${encodeURIComponent("Hey — I just joined the TrustyPro waitlist. It's a new home services platform launching in DFW that connects you with verified, certified pros. Free for homeowners — you might want to be on the list too:\n\nhttps://trustypro.io\n\nLet me know what you think!")}`}
                          className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: INDIGO }}
                        >
                          <Mail className="w-3.5 h-3.5" /> Email friends
                        </a>
                        <a
                          href={`sms:?body=${encodeURIComponent("Hey — just joined the TrustyPro waitlist. New home services platform launching in DFW with verified pros, free for homeowners. You might want to grab a spot: https://trustypro.io")}`}
                          className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: INDIGO }}
                        >
                          <Phone className="w-3.5 h-3.5" /> Text friends
                        </a>
                      </div>
                      <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-3 py-2 mt-3">
                        <input readOnly value="https://trustypro.io" className="flex-1 text-xs text-gray-700 bg-transparent outline-none truncate" />
                        <button
                          onClick={() => { navigator.clipboard.writeText("https://trustypro.io").then(() => setCopyStatus("copied")); setTimeout(() => setCopyStatus("idle"), 1800); }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          {copyStatus === "copied" ? <><CheckCircle className="inline w-3.5 h-3.5 mr-1" />Copied</> : <><Copy className="inline w-3.5 h-3.5 mr-1" />Copy link</>}
                        </button>
                      </div>
                    </div>
                    {intakeForm.betaOptIn && (
                      <div className="rounded-xl p-3 flex items-center gap-2" style={{ backgroundColor: "#fef3c7", border: "1px solid #fde68a" }}>
                        <Sparkles className="w-4 h-4 text-yellow-700 flex-shrink-0" />
                        <p className="text-xs font-semibold text-yellow-900">You're in the Beta queue. We'll email beta invites as soon as your area is live.</p>
                      </div>
                    )}
                    <p className="text-center text-sm text-gray-500">
                      <Link href="/waitlist/homeowner/status" className="font-semibold underline underline-offset-2" style={{ color: INDIGO_DEEP }}>
                        Check your waitlist position anytime →
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ FAQ ============================ */}
      <section id="faq" className="py-24" style={{ backgroundColor: CREAM }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ color: INK }}>Questions, answered.</h2>
              <p className="mt-4 text-gray-500 leading-relaxed">Clear answers to common questions about TrustyPro and how it works for homeowners.</p>
              <motion.button
                onClick={() => setChatOpen(true)}
                className="mt-6 px-6 py-3 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: INDIGO }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Support
              </motion.button>
            </Reveal>
            <Reveal>
              <div>
                {FAQS.map((faq, i) => (
                  <div key={i} className="border-b border-gray-200">
                    <button className="w-full flex items-center justify-between py-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span className="font-bold pr-4 text-sm" style={{ color: INK }}>{faq.q}</span>
                      <motion.div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: openFaq === i ? INDIGO : "#EDEDEA" }}
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ FINAL CTA ============================ */}
      <section className="py-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 60%, #4338CA 100%)" }}>
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <Wrench className="absolute -top-4 left-4 w-16 h-16 text-white/10 rotate-12" />
          <HomeIcon className="absolute bottom-0 right-4 w-20 h-20 text-white/10 -rotate-6" />
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-5">
              Your home deserves a pro it can trust.
            </h2>
            <p className="text-indigo-100 text-lg max-w-2xl mx-auto mb-9">
              Join the waitlist today — we'll build your home profile, save your spot, and match you with vetted pros the moment we launch in your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={goToWaitlist}
                className="px-9 py-4 rounded-full text-base font-black shadow-2xl"
                style={{ backgroundColor: "#FFFFFF", color: INDIGO_DEEP }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Join the Waitlist — Free
              </motion.button>
              <motion.button
                onClick={() => navigate("/trustypro/login")}
                className="px-8 py-4 rounded-full text-base font-semibold text-white border border-white/40 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Already On the List? Sign In
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ FOOTER ============================ */}
      <footer className="py-14" style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #EDEDEA" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <TrustyProLogo height={44} />
              <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-xs">TrustyPro helps DFW homeowners scan, score, and care for their homes — with verified professionals who blend skill, honesty, and lasting quality into every project.</p>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Explore</div>
              <div className="space-y-2">
                {[["how-it-works", "How It Works"], ["ai-demo", "AI Scan Demo"], ["vetted", "Vetted Pros"], ["vault", "Home Health Vault"], ["waitlist", "Join the Waitlist"]].map(([id, label]) => (
                  <button key={id} onClick={() => scrollTo(id)} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">{label}</button>
                ))}
                <a href="/request-service" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">Request Service</a>
                <Link href="/waitlist/homeowner/status" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">Waitlist Status</Link>
                <Link href="/trustypro/login" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">My Home Login</Link>
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contact</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500"><Mail className="w-3.5 h-3.5" /> support@trustypro.io</div>
                <div className="flex items-center gap-2 text-sm text-gray-500"><MapPin className="w-3.5 h-3.5" /> DFW Metroplex, TX</div>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid #F0EFEA" }}>
            <p className="text-xs text-gray-400">TrustyPro 2026. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="text-xs text-gray-400 hover:text-gray-900 transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-xs text-gray-400 hover:text-gray-900 transition-colors">Terms of Service</a>
              <a href="/ccpa" className="text-xs text-gray-400 hover:text-gray-900 transition-colors">CCPA Rights</a>
              <button onClick={goToWaitlist} className="text-xs text-gray-400 hover:text-gray-900 transition-colors">Join the Waitlist</button>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes tp-marquee-kf { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .tp-marquee { animation: tp-marquee-kf 32s linear infinite; will-change: transform; }
        @media (prefers-reduced-motion: reduce) { .tp-marquee { animation: none; } }
      `}</style>
      <SupportChatWidget
        mode="homeowner"
        accentColor={INDIGO_DEEP}
        title="TrustyPro Support"
        subtitle="Ask us anything about the platform"
        forceOpen={chatOpen}
        onForcedOpenHandled={() => setChatOpen(false)}
      />
    </div>
  );
}
