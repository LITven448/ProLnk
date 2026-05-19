/**
 * ProLnkJobSiteVisual
 *
 * Dual-tab visual showing AI scan on a REAL house photo.
 * Tab 1 — Exterior Scan: Real exterior photo with side-panel detection list
 * Tab 2 — Interior Scan: Real interior photo with side-panel detection list
 *
 * Detections appear in a clean side panel instead of floating callouts pointing
 * at random positions on the photo. Each detection card animates in sequentially
 * to give the impression of live AI scanning, without making false geometric
 * claims about where issues are located in the image.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign, AlertTriangle, Eye, Zap, Droplets,
  TreePine, Paintbrush, Home, RefreshCw, Wrench,
  Flame, ShieldAlert, Lightbulb, Pipette, ScanLine,
} from "lucide-react";

const EXTERIOR_DETECTIONS = [
  { id: "gutters",     label: "Gutters: Clogged & Sagging",   trade: "Gutter Cleaning",       severity: "high"   as const, icon: Droplets,    jobValue: 450,  commission: 68   },
  { id: "siding",      label: "Siding: Faded & Weathered",    trade: "Exterior Painting",     severity: "medium" as const, icon: Paintbrush,  jobValue: 4200, commission: 630  },
  { id: "hvac",        label: "HVAC Unit: Est. Age 12+ yrs",  trade: "HVAC Service",          severity: "high"   as const, icon: Zap,         jobValue: 6800, commission: 1020 },
  { id: "landscaping", label: "Landscaping: Overgrown",       trade: "Lawn & Landscaping",    severity: "low"    as const, icon: TreePine,    jobValue: 1800, commission: 270  },
  { id: "driveway",    label: "Driveway: Cracks Detected",    trade: "Concrete & Masonry",    severity: "medium" as const, icon: Wrench,      jobValue: 2400, commission: 360  },
];

const INTERIOR_DETECTIONS = [
  { id: "ceiling",    label: "Ceiling: Water Stain",          trade: "Plumbing / Roof Repair", severity: "high"   as const, icon: Droplets,    jobValue: 3200, commission: 480  },
  { id: "smoke-det",  label: "Smoke Detector: Aging",         trade: "Safety / Electrical",    severity: "medium" as const, icon: Flame,       jobValue: 320,  commission: 48   },
  { id: "fixtures",   label: "Light Fixtures: Outdated",      trade: "Electrical",             severity: "low"    as const, icon: Lightbulb,   jobValue: 1200, commission: 180  },
  { id: "wall-crack", label: "Wall Crack: Settling Sign",     trade: "Foundation Repair",      severity: "high"   as const, icon: ShieldAlert, jobValue: 8500, commission: 1275 },
  { id: "cabinets",   label: "Cabinets: Hardware Worn",       trade: "Cabinet Refacing",       severity: "low"    as const, icon: Pipette,     jobValue: 3600, commission: 540  },
  { id: "flooring",   label: "Hardwood: Wear & Scratches",    trade: "Flooring & Refinishing", severity: "medium" as const, icon: Home,        jobValue: 4800, commission: 720  },
];

const SEVERITY_STYLES = {
  high:   { ring: "ring-red-400/50",    text: "text-red-600",    bg: "bg-red-50",    dot: "bg-red-500"    },
  medium: { ring: "ring-amber-400/50",  text: "text-amber-600",  bg: "bg-amber-50",  dot: "bg-amber-500"  },
  low:    { ring: "ring-blue-400/50",   text: "text-blue-600",   bg: "bg-blue-50",   dot: "bg-blue-500"   },
};

type ViewMode = "detect" | "commission";
type ScanTab = "exterior" | "interior";

const EXTERIOR_IMG = "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-exterior-scan-XiC5FEL4WRxV9PvSmrUL3X.webp";
const INTERIOR_IMG = "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-interior-scan-Cr7e7AXTDitRxYoMQcu8Y5.webp";

export default function ProLnkJobSiteVisual() {
  const [tab, setTab] = useState<ScanTab>("exterior");
  const [mode, setMode] = useState<ViewMode>("detect");
  const [visibleCount, setVisibleCount] = useState(0);

  const detections = tab === "exterior" ? EXTERIOR_DETECTIONS : INTERIOR_DETECTIONS;
  const bgImage = tab === "exterior" ? EXTERIOR_IMG : INTERIOR_IMG;
  const totalCommission = detections.reduce((s, d) => s + d.commission, 0);

  useEffect(() => {
    setVisibleCount(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    detections.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 400 + i * 350));
    });
    return () => timers.forEach(clearTimeout);
  }, [tab, mode, detections.length]);

  useEffect(() => {
    const t = setTimeout(() => {
      setMode(m => m === "detect" ? "commission" : "detect");
    }, 7000);
    return () => clearTimeout(t);
  }, [mode, tab]);

  return (
    <div className="w-full max-w-3xl mx-auto select-none">

      {/* Tab selector */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <button
          onClick={() => { setTab("exterior"); setMode("detect"); }}
          className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
            tab === "exterior" ? "bg-[#0A1628] text-white shadow-lg" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          <Home className="w-4 h-4 inline mr-1.5 -mt-0.5" />Exterior Scan
        </button>
        <button
          onClick={() => { setTab("interior"); setMode("detect"); }}
          className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
            tab === "interior" ? "bg-[#0A1628] text-white shadow-lg" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          <Wrench className="w-4 h-4 inline mr-1.5 -mt-0.5" />Interior Scan
        </button>
      </div>

      {/* Mode toggle */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          onClick={() => setMode("detect")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            mode === "detect" ? "bg-amber-500 text-white shadow" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          <Eye className="w-3 h-3 inline mr-1" />AI Detection
        </button>
        <button
          onClick={() => setMode("commission")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            mode === "commission" ? "bg-green-600 text-white shadow" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          <DollarSign className="w-3 h-3 inline mr-1" />Commission View
        </button>
      </div>

      {/* Photo + side panel grid */}
      <div className="rounded-2xl overflow-hidden border border-gray-200/50 shadow-2xl bg-[#0A1628]">
        <div className="grid grid-cols-1 md:grid-cols-5">

          {/* Photo (3/5 width on desktop) */}
          <div className="relative md:col-span-3 aspect-[4/3] md:aspect-auto md:min-h-[440px]">
            <img
              src={bgImage}
              alt={tab === "exterior" ? "Exterior property scan" : "Interior property scan"}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/15" />

            {/* Scan line animation */}
            <motion.div
              key={`scan-${tab}-${mode}`}
              className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-[#F5E642]/30 to-transparent pointer-events-none"
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />

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

            {/* Detection counter */}
            <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-sm rounded-xl px-4 py-2.5 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <ScanLine className="w-4 h-4 text-[#F5E642]" />
                <span className="text-white text-xs font-bold">
                  {mode === "detect"
                    ? `Scanning · ${visibleCount}/${detections.length} found`
                    : `${detections.length} commission opportunities`}
                </span>
              </div>
              {mode === "commission" && visibleCount === detections.length && (
                <span className="text-green-400 font-black text-sm">
                  ${totalCommission.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Side panel (2/5 width on desktop) */}
          <div className="md:col-span-2 bg-[#0A1628] p-4 md:max-h-[520px] md:overflow-y-auto">
            <div className="text-xs font-bold text-[#F5E642] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              {mode === "detect" ? (
                <><AlertTriangle className="w-3 h-3" /> AI Detected Issues</>
              ) : (
                <><DollarSign className="w-3 h-3" /> Commission Potential</>
              )}
            </div>

            <AnimatePresence mode="popLayout">
              {detections.slice(0, visibleCount).map((d) => {
                const s = SEVERITY_STYLES[d.severity];
                const Icon = d.icon;
                return (
                  <motion.div
                    key={`${mode}-${d.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-2 rounded-xl bg-white/95 backdrop-blur-sm p-2.5 ring-1 ${s.ring}`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${s.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-bold text-gray-900 leading-tight">{d.label}</div>
                        <div className={`text-[11px] ${s.text} font-semibold mt-0.5`}>→ {d.trade}</div>
                        {mode === "commission" && (
                          <div className="flex items-center gap-3 mt-1.5 pt-1.5 border-t border-gray-100">
                            <div className="text-[10px] text-gray-500">
                              Job <span className="font-bold text-gray-800">${d.jobValue.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-0.5 text-green-700 font-black text-xs">
                              +${d.commission.toLocaleString()}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {visibleCount === detections.length && mode === "commission" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between"
              >
                <span className="text-[11px] text-white/60 font-semibold uppercase tracking-wider">Total potential</span>
                <span className="text-green-400 font-black text-lg">${totalCommission.toLocaleString()}</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
        <RefreshCw className="w-3 h-3" />
        <span>
          One {tab} photo · {detections.length} trades detected · ${totalCommission.toLocaleString()} commission potential
        </span>
      </div>
    </div>
  );
}
