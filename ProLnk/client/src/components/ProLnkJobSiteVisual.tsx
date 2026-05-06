/**
 * ProLnkJobSiteVisual
 *
 * Dual-tab visual showing AI scan on a REAL house photo.
 * Tab 1 — Exterior Scan: Real exterior photo with detection callouts + commission overlays
 * Tab 2 — Interior Scan: Real interior photo with detection callouts + commission overlays
 *
 * Each tab cycles between "AI Detection" mode and "Commission View" mode.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign, AlertTriangle, Eye, Zap, Droplets,
  TreePine, Paintbrush, Home, RefreshCw, Wrench,
  Flame, ShieldAlert, Lightbulb, Pipette,
} from "lucide-react";

// ── Exterior detections ──────────────────────────────────────────────────────
// Positions carefully spread: no two dots within 18% of each other vertically
// Callout cards alternate left/right based on x position to prevent overlap
const EXTERIOR_DETECTIONS = [
  {
    id: "gutters", label: "Gutters: Clogged & Sagging", trade: "Gutter Cleaning",
    severity: "high" as const, icon: Droplets, x: 42, y: 12,
  },
  {
    id: "siding", label: "Siding: Faded & Weathered", trade: "Exterior Painting",
    severity: "medium" as const, icon: Paintbrush, x: 18, y: 38,
  },
  {
    id: "hvac", label: "HVAC Unit: Est. Age 12+ yrs", trade: "HVAC Service",
    severity: "high" as const, icon: Zap, x: 72, y: 58,
  },
  {
    id: "landscaping", label: "Landscaping: Overgrown", trade: "Lawn & Landscaping",
    severity: "low" as const, icon: TreePine, x: 28, y: 78,
  },
  {
    id: "driveway", label: "Driveway: Cracks Detected", trade: "Concrete & Masonry",
    severity: "medium" as const, icon: Wrench, x: 68, y: 88,
  },
];

const EXTERIOR_COMMISSIONS = [
  { id: "gutters",      jobValue: 450,   commission: 68,   x: 42, y: 12 },
  { id: "siding",       jobValue: 4200,  commission: 630,  x: 18, y: 38 },
  { id: "hvac",         jobValue: 6800,  commission: 1020, x: 72, y: 58 },
  { id: "landscaping",  jobValue: 1800,  commission: 270,  x: 28, y: 78 },
  { id: "driveway",     jobValue: 2400,  commission: 360,  x: 68, y: 88 },
];

// ── Interior detections ──────────────────────────────────────────────────────
// Positions spread to avoid overlap: each callout at least 18% apart vertically
const INTERIOR_DETECTIONS = [
  {
    id: "ceiling", label: "Ceiling: Water Stain", trade: "Plumbing / Roof Repair",
    severity: "high" as const, icon: Droplets, x: 45, y: 10,
  },
  {
    id: "smoke-det", label: "Smoke Detector: Aging", trade: "Safety / Electrical",
    severity: "medium" as const, icon: Flame, x: 78, y: 26,
  },
  {
    id: "fixtures", label: "Light Fixtures: Outdated", trade: "Electrical",
    severity: "low" as const, icon: Lightbulb, x: 18, y: 42,
  },
  {
    id: "wall-crack", label: "Wall Crack: Settling Sign", trade: "Foundation Repair",
    severity: "high" as const, icon: ShieldAlert, x: 72, y: 58,
  },
  {
    id: "cabinets", label: "Cabinets: Hardware Worn", trade: "Cabinet Refacing",
    severity: "low" as const, icon: Pipette, x: 22, y: 74,
  },
  {
    id: "flooring", label: "Hardwood: Wear & Scratches", trade: "Flooring & Refinishing",
    severity: "medium" as const, icon: Home, x: 65, y: 88,
  },
];

const INTERIOR_COMMISSIONS = [
  { id: "ceiling",     jobValue: 3200,  commission: 480,  x: 45, y: 10 },
  { id: "smoke-det",   jobValue: 320,   commission: 48,   x: 78, y: 26 },
  { id: "fixtures",    jobValue: 1200,  commission: 180,  x: 18, y: 42 },
  { id: "wall-crack",  jobValue: 8500,  commission: 1275, x: 72, y: 58 },
  { id: "cabinets",    jobValue: 3600,  commission: 540,  x: 22, y: 74 },
  { id: "flooring",    jobValue: 4800,  commission: 720,  x: 65, y: 88 },
];

const SEVERITY_COLORS = {
  high:   { border: "border-red-400/80",    text: "text-red-600",    dot: "bg-red-500"    },
  medium: { border: "border-amber-400/80",  text: "text-amber-600",  dot: "bg-amber-500"  },
  low:    { border: "border-blue-400/80",   text: "text-blue-600",   dot: "bg-blue-500"   },
};

type ViewMode = "detect" | "commission";
type ScanTab = "exterior" | "interior";

const EXTERIOR_IMG = "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-exterior-scan-XiC5FEL4WRxV9PvSmrUL3X.webp";
const INTERIOR_IMG = "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-interior-scan-Cr7e7AXTDitRxYoMQcu8Y5.webp";

export default function ProLnkJobSiteVisual() {
  const [tab, setTab] = useState<ScanTab>("exterior");
  const [mode, setMode] = useState<ViewMode>("detect");
  const [visibleCount, setVisibleCount] = useState(0);
  const [doneAnimating, setDoneAnimating] = useState(false);

  const detections = tab === "exterior" ? EXTERIOR_DETECTIONS : INTERIOR_DETECTIONS;
  const commissions = tab === "exterior" ? EXTERIOR_COMMISSIONS : INTERIOR_COMMISSIONS;
  const bgImage = tab === "exterior" ? EXTERIOR_IMG : INTERIOR_IMG;
  const totalCommission = commissions.reduce((s, c) => s + c.commission, 0);

  // Stagger callouts in
  useEffect(() => {
    setVisibleCount(0);
    setDoneAnimating(false);
    const timers: ReturnType<typeof setTimeout>[] = [];
    detections.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 500 + i * 400));
    });
    timers.push(setTimeout(() => setDoneAnimating(true), 500 + detections.length * 400 + 200));
    return () => timers.forEach(clearTimeout);
  }, [tab, mode, detections.length]);

  // Auto-cycle detect → commission every 6s
  useEffect(() => {
    const t = setTimeout(() => {
      setMode(m => m === "detect" ? "commission" : "detect");
    }, 6500);
    return () => clearTimeout(t);
  }, [mode, tab]);

  return (
    <div className="w-full max-w-3xl mx-auto select-none">

      {/* Tab selector: Exterior / Interior */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <button
          onClick={() => { setTab("exterior"); setMode("detect"); }}
          className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
            tab === "exterior"
              ? "bg-[#0A1628] text-white shadow-lg"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          <Home className="w-4 h-4 inline mr-1.5 -mt-0.5" />Exterior Scan
        </button>
        <button
          onClick={() => { setTab("interior"); setMode("detect"); }}
          className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
            tab === "interior"
              ? "bg-[#0A1628] text-white shadow-lg"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          <Wrench className="w-4 h-4 inline mr-1.5 -mt-0.5" />Interior Scan
        </button>
      </div>

      {/* Mode toggle: Detection / Commission */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          onClick={() => setMode("detect")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            mode === "detect"
              ? "bg-amber-500 text-white shadow"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          <Eye className="w-3 h-3 inline mr-1" />AI Detection
        </button>
        <button
          onClick={() => setMode("commission")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            mode === "commission"
              ? "bg-green-600 text-white shadow"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          <DollarSign className="w-3 h-3 inline mr-1" />Commission View
        </button>
      </div>

      {/* Main visual — real photo with overlays */}
      <div className="relative rounded-2xl overflow-hidden border border-gray-200/50 shadow-2xl aspect-[4/3]">

        {/* Real photo background */}
        <img
          src={bgImage}
          alt={tab === "exterior" ? "Exterior property scan" : "Interior property scan"}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Subtle dark overlay for callout readability */}
        <div className="absolute inset-0 bg-black/15" />

        {/* Scan grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

        {/* LIVE SCAN badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5 z-10">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white text-xs font-bold tracking-wide">LIVE SCAN</span>
        </div>

        {/* Context badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5 z-10">
          <span className="text-white text-xs font-semibold">
            {tab === "exterior" ? "Roofing Job · DFW" : "Plumbing Job · Kitchen"}
          </span>
        </div>

        {/* ── Detection callouts ─────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {mode === "detect" && detections.slice(0, visibleCount).map((d) => {
            const colors = SEVERITY_COLORS[d.severity];
            const Icon = d.icon;
            const isRight = d.x > 55;
            return (
              <motion.div
                key={`det-${d.id}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.3, ease: "backOut" }}
                className="absolute z-20"
                style={{ left: `${d.x}%`, top: `${d.y}%`, transform: "translate(-50%, -50%)" }}
              >
                {/* Pulsing dot at detection point */}
                <div className={`w-4 h-4 rounded-full ${colors.dot} ring-2 ring-white shadow-lg animate-pulse`} />
                {/* Connector line from dot to card */}
                <div
                  className="absolute top-2"
                  style={{
                    [isRight ? "right" : "left"]: "7px",
                    width: "28px",
                    height: "2px",
                    background: "rgba(255,255,255,0.7)",
                  }}
                />
                {/* Callout card */}
                <div
                  className={`absolute ${isRight ? "right-9" : "left-9"} -top-2 bg-white/97 backdrop-blur-md border-2 ${colors.border} rounded-xl px-3 py-2 shadow-2xl`}
                  style={{ whiteSpace: "nowrap" }}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Icon className={`w-3.5 h-3.5 ${colors.text} flex-shrink-0`} />
                    <span className="text-gray-900 text-xs font-bold leading-tight">{d.label}</span>
                  </div>
                  <div className={`text-[11px] ${colors.text} font-semibold`}>→ {d.trade}</div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* ── Commission callouts ────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {mode === "commission" && commissions.slice(0, visibleCount).map((c) => {
            const isRight = c.x > 55;
            return (
              <motion.div
                key={`com-${c.id}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.3, ease: "backOut" }}
                className="absolute z-20"
                style={{ left: `${c.x}%`, top: `${c.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <div className="w-4 h-4 rounded-full bg-green-500 ring-2 ring-white shadow-lg animate-pulse" />
                {/* Connector line */}
                <div
                  className="absolute top-2"
                  style={{
                    [isRight ? "right" : "left"]: "7px",
                    width: "28px",
                    height: "2px",
                    background: "rgba(255,255,255,0.7)",
                  }}
                />
                <div
                  className={`absolute ${isRight ? "right-9" : "left-9"} -top-2 bg-white/97 backdrop-blur-md border-2 border-green-300/80 rounded-xl px-3 py-2 shadow-2xl`}
                  style={{ whiteSpace: "nowrap" }}
                >
                  <div className="text-gray-500 text-[11px] mb-0.5">
                    Job value: <span className="font-bold text-gray-800">${c.jobValue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-green-700 font-black text-sm">+${c.commission.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Bottom summary bar */}
        <AnimatePresence>
          {doneAnimating && visibleCount >= detections.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm px-5 py-3 flex items-center justify-between z-30"
            >
              {mode === "detect" ? (
                <>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="text-white text-sm font-bold">{detections.length} opportunities detected</span>
                  </div>
                  <span className="text-gray-300 text-xs">across {detections.length} different trades</span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-white text-sm font-bold">Total commission potential</span>
                  </div>
                  <span className="text-green-400 font-black text-lg">${totalCommission.toLocaleString()}</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Caption */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
        <RefreshCw className="w-3 h-3" />
        <span>
          {tab === "exterior"
            ? `One exterior photo · ${detections.length} trades detected · $${totalCommission.toLocaleString()} commission potential`
            : `One interior photo · ${detections.length} trades detected · $${totalCommission.toLocaleString()} commission potential`
          }
        </span>
      </div>
    </div>
  );
}
