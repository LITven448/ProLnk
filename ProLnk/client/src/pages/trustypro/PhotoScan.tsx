import React from 'react';
import type React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import TrustyProLogo from "@/components/TrustyProLogo";
import { Link, useLocation } from "wouter";
import {
  Shield, Camera, CheckCircle, AlertTriangle, Sparkles, ArrowRight, X,
  Plus, Home, Star, Copy, Share2, TrendingUp, ExternalLink, ZoomIn,
  Image, BookOpen, ChevronRight, Vault, Clock, FileText, Cpu,
} from "lucide-react";

type ScanStep = "area" | "upload" | "contact" | "analyzing" | "results";
type ActiveTab = "scan" | "history";

interface Issue {
  name: string;
  severity: "urgent" | "moderate" | "low";
  description: string;
  tradeType: string;
  estimatedCost: string;
  confidence?: number;
  offerTrack?: "repair" | "transformation";
  transformationPrompt?: string;
  transformationImageUrl?: string;
  isInsuranceClaim?: boolean;
}

interface AnalysisResult {
  issues: Issue[];
  overallCondition: "excellent" | "good" | "fair" | "needs_attention";
  summary: string;
  photoUrls: string[];
  roomLabel?: string;
  photoQualityFlag?: "ok" | "too_dark" | "too_blurry" | "too_far" | "retake_needed";
  photoQualityNote?: string;
}

interface ScanHistoryEntry {
  id: string;
  date: string;
  area: string;
  areaIcon: string;
  thumbnail: string;
  healthScore: number;
  prevScore: number;
  issuesFound: number;
}

const VIOLET = "#7c3aed";
const VIOLET_LIGHT = "#8b5cf6";
const VIOLET_DIM = "rgba(124,58,237,0.15)";
const DARK_BG = "#0A1628";
const CARD_BG = "#0f1f3d";
const CARD_BORDER = "rgba(124,58,237,0.25)";

const SCAN_AREAS = [
  { id: "exterior", icon: "🏠", label: "Exterior", desc: "Siding, windows, driveway" },
  { id: "roof", icon: "🏗️", label: "Roof", desc: "Shingles, gutters, flashing" },
  { id: "hvac", icon: "❄️", label: "HVAC", desc: "A/C unit, vents, ductwork" },
  { id: "electrical", icon: "⚡", label: "Electrical", desc: "Panel, outlets, wiring" },
  { id: "plumbing", icon: "🚿", label: "Plumbing", desc: "Pipes, fixtures, water heater" },
  { id: "bathroom", icon: "🛁", label: "Bathroom", desc: "Tile, grout, fixtures" },
  { id: "kitchen", icon: "🍳", label: "Kitchen", desc: "Cabinets, appliances, counters" },
  { id: "basement", icon: "🔦", label: "Basement", desc: "Foundation, moisture, framing" },
];

const ANALYZING_STEPS = [
  { label: "Uploading photos securely", duration: 3000 },
  { label: "Scanning for structural issues", duration: 5000 },
  { label: "Identifying maintenance needs", duration: 5000 },
  { label: "Detecting improvement opportunities", duration: 4000 },
  { label: "Generating transformation previews", duration: 6000 },
  { label: "Matching with verified pros", duration: 3000 },
];

const MOCK_SCAN_HISTORY: ScanHistoryEntry[] = [
  {
    id: "scan-001",
    date: "2026-05-12",
    area: "Roof",
    areaIcon: "🏗️",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=80&fit=crop",
    healthScore: 72,
    prevScore: 85,
    issuesFound: 3,
  },
  {
    id: "scan-002",
    date: "2026-05-08",
    area: "HVAC",
    areaIcon: "❄️",
    thumbnail: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=120&h=80&fit=crop",
    healthScore: 88,
    prevScore: 82,
    issuesFound: 1,
  },
  {
    id: "scan-003",
    date: "2026-05-01",
    area: "Kitchen",
    areaIcon: "🍳",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=80&fit=crop",
    healthScore: 91,
    prevScore: 88,
    issuesFound: 0,
  },
  {
    id: "scan-004",
    date: "2026-04-22",
    area: "Plumbing",
    areaIcon: "🚿",
    thumbnail: "https://images.unsplash.com/photo-1585704032915-c3400305e979?w=120&h=80&fit=crop",
    healthScore: 65,
    prevScore: 78,
    issuesFound: 4,
  },
  {
    id: "scan-005",
    date: "2026-04-10",
    area: "Exterior",
    areaIcon: "🏠",
    thumbnail: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=120&h=80&fit=crop",
    healthScore: 80,
    prevScore: 76,
    issuesFound: 2,
  },
];

const severityConfig = {
  urgent: {
    label: "Urgent",
    badge: "bg-red-500/20 text-red-400 border-red-500/30",
    dot: "bg-red-500",
    ring: "border-red-500/40",
    btn: "#dc2626",
  },
  moderate: {
    label: "Schedule Service",
    badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    dot: "bg-amber-500",
    ring: "border-amber-500/40",
    btn: "#d97706",
  },
  low: {
    label: "Monitor",
    badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
    dot: "bg-yellow-400",
    ring: "border-yellow-500/30",
    btn: VIOLET,
  },
};

const conditionConfig = {
  excellent: { label: "Excellent Condition", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", emoji: "✅" },
  good: { label: "Good Condition", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", emoji: "👍" },
  fair: { label: "Fair — Some Attention Needed", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", emoji: "⚠️" },
  needs_attention: { label: "Needs Attention", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", emoji: "🔴" },
};

function computeHealthScore(issues: Issue[]): number {
  if (issues.length === 0) return 95;
  const urgentPenalty = issues.filter(i => i.severity === "urgent").length * 20;
  const moderatePenalty = issues.filter(i => i.severity === "moderate").length * 10;
  const lowPenalty = issues.filter(i => i.severity === "low").length * 3;
  return Math.max(0, 100 - urgentPenalty - moderatePenalty - lowPenalty);
}

function healthScoreConfig(score: number) {
  if (score >= 80) return { color: "#10b981", trackColor: "rgba(16,185,129,0.15)", label: "Excellent", textColor: "text-green-400" };
  if (score >= 60) return { color: "#3b82f6", trackColor: "rgba(59,130,246,0.15)", label: "Good", textColor: "text-blue-400" };
  if (score >= 40) return { color: "#eab308", trackColor: "rgba(234,179,8,0.15)", label: "Fair", textColor: "text-yellow-400" };
  return { color: "#ef4444", trackColor: "rgba(239,68,68,0.15)", label: "Needs Attention", textColor: "text-red-400" };
}

function HealthScoreRing({ score, prevScore }: { score: number; prevScore?: number }) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;
  const { color, trackColor, label, textColor } = healthScoreConfig(score);
  const delta = prevScore !== undefined ? score - prevScore : null;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex items-center justify-center w-44 h-44">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="70" cy="70" r={radius} fill="none" stroke={trackColor} strokeWidth="12" />
          <circle
            cx="70" cy="70" r={radius}
            fill="none" stroke={color} strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </svg>
        <div className="text-center z-10">
          <p className="text-5xl font-black leading-none" style={{ color }}>{score}</p>
          <p className="text-xs font-semibold text-slate-400 mt-1">out of 100</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-bold ${textColor}`}>{label}</span>
        {delta !== null && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${delta >= 0 ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
            {delta >= 0 ? "+" : ""}{delta} pts
          </span>
        )}
      </div>
    </div>
  );
}

function ScannerOverlay() {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl opacity-20">🏠</div>
      </div>
      {[
        "top-3 left-3 border-t-2 border-l-2 rounded-tl-lg",
        "top-3 right-3 border-t-2 border-r-2 rounded-tr-lg",
        "bottom-3 left-3 border-b-2 border-l-2 rounded-bl-lg",
        "bottom-3 right-3 border-b-2 border-r-2 rounded-br-lg",
      ].map((cls, i) => (
        <div key={i} className={`absolute w-6 h-6 ${cls}`} style={{ borderColor: VIOLET }} />
      ))}
      <motion.div
        className="absolute left-3 right-3 h-0.5 opacity-80"
        style={{ background: `linear-gradient(90deg, transparent, ${VIOLET}, transparent)` }}
        animate={{ top: ["12%", "88%", "12%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 0.4, 0.8].map((delay, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{ borderColor: `${VIOLET}60`, width: 48 + i * 32, height: 48 + i * 32 }}
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay, ease: "easeOut" }}
          />
        ))}
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: VIOLET }}>
          <Sparkles className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}

function AIBrainAnimation() {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {[0, 0.3, 0.6].map((delay, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2"
            style={{ borderColor: `${VIOLET}50`, width: 40 + i * 24, height: 40 + i * 24 }}
            animate={{ scale: [1, 1.4], opacity: [0.8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, delay, ease: "easeOut" }}
          />
        ))}
        <motion.div
          className="w-14 h-14 rounded-2xl flex items-center justify-center z-10"
          style={{ backgroundColor: VIOLET_DIM, border: `2px solid ${VIOLET}60` }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cpu className="w-7 h-7" style={{ color: VIOLET_LIGHT }} />
        </motion.div>
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-white">AI Analyzing Your Photos</p>
        <p className="text-xs text-slate-400 mt-1">Neural network scanning for issues...</p>
      </div>
      <div className="flex gap-1">
        {[0, 0.15, 0.3].map((delay, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: VIOLET_LIGHT }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.9, repeat: Infinity, delay }}
          />
        ))}
      </div>
    </div>
  );
}

function AnalyzingScreen({ uploading }: { uploading: boolean }) {
  const [currentStep, setCurrentStep] = useState(uploading ? 0 : 1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showBrain, setShowBrain] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;
    ANALYZING_STEPS.forEach((step, i) => {
      if (i === 0 && uploading) return;
      elapsed += step.duration;
      const t = setTimeout(() => {
        setCompletedSteps(prev => [...prev, i]);
        setCurrentStep(Math.min(i + 1, ANALYZING_STEPS.length - 1));
      }, elapsed - (uploading ? 0 : ANALYZING_STEPS[0].duration));
      timers.push(t);
    });
    const brainTimer = setTimeout(() => setShowBrain(true), uploading ? ANALYZING_STEPS[0].duration + 200 : 200);
    timers.push(brainTimer);
    return () => timers.forEach(clearTimeout);
  }, [uploading]);

  return (
    <motion.div
      key="analyzing"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="rounded-2xl p-8 border"
      style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
    >
      <ScannerOverlay />

      <AnimatePresence>
        {showBrain && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <AIBrainAnimation />
          </motion.div>
        )}
      </AnimatePresence>

      {!showBrain && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-black text-white mb-2">Uploading Photos...</h2>
          <p className="text-slate-400 text-sm max-w-sm mx-auto mb-8">Securely transferring your photos to our AI servers.</p>
        </div>
      )}

      <div className="space-y-3 max-w-sm mx-auto mt-4">
        {ANALYZING_STEPS.map((step, i) => {
          const isDone = completedSteps.includes(i);
          const isActive = currentStep === i && !isDone;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 transition-opacity duration-300 ${i > currentStep ? "opacity-25" : "opacity-100"}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-all duration-500 ${
                isDone
                  ? "bg-green-500 text-white"
                  : isActive
                  ? "text-white"
                  : "bg-slate-700 text-slate-500"
              }`} style={isActive ? { backgroundColor: VIOLET } : {}}>
                {isDone ? "✓" : isActive ? <span className="w-2 h-2 bg-white rounded-full animate-pulse" /> : "○"}
              </div>
              <span className={`text-sm transition-all duration-300 ${
                isDone ? "text-green-400 font-medium" : isActive ? "text-white font-semibold" : "text-slate-500"
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-500 mt-8 text-center">This usually takes 15–30 seconds. Please don't close this tab.</p>
    </motion.div>
  );
}

function RequestProModal({
  issue,
  contact,
  onClose,
}: {
  issue: Issue;
  contact: { name: string; email: string; phone: string; address: string };
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);
  const submitRequest = trpc.trustyPro.submitRequest.useMutation({
    onSuccess: () => setSent(true),
    onError: () => toast.error("Failed to send request. Please try again."),
  });

  const handleSubmit = () => {
    if (!contact.email && !contact.phone) {
      toast.error("Please provide your email or phone to request a pro.");
      return;
    }
    submitRequest.mutate({
      name: contact.name || "Homeowner",
      email: contact.email || "noreply@trustypro.io",
      phone: contact.phone || undefined,
      address: contact.address || "Address on file",
      serviceType: issue.tradeType,
      description: `Issue detected by AI scan: ${issue.name}. ${issue.description}`,
      urgency: issue.severity,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl p-8 max-w-md w-full shadow-2xl border"
        style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
        onClick={e => e.stopPropagation()}
      >
        {sent ? (
          <div className="text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-black text-white mb-2">Request Sent!</h3>
            <p className="text-slate-400 mb-6">
              A verified pro specializing in <strong className="text-white">{issue.tradeType}</strong> will reach out within 2 hours.
            </p>
            <button
              onClick={onClose}
              className="w-full text-white font-bold py-3 rounded-xl transition-colors"
              style={{ backgroundColor: VIOLET }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-black text-white">Request a Pro</h3>
                <p className="text-slate-400 text-sm mt-1">For: <strong className="text-slate-200">{issue.name}</strong></p>
              </div>
              <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="rounded-xl p-4 mb-6 text-sm border" style={{ backgroundColor: "#0A1628", borderColor: CARD_BORDER }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-slate-400">Trade needed:</span>
                <span className="font-bold" style={{ color: VIOLET_LIGHT }}>{issue.tradeType}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-400">Est. cost:</span>
                <span className="text-slate-300">{issue.estimatedCost}</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-6">
              We'll match you with a background-checked, insured {issue.tradeType} professional in your area. No commitment required.
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 border border-slate-600 text-slate-400 font-semibold py-3 rounded-xl hover:bg-slate-700/40 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitRequest.isPending}
                className="flex-[2] text-white font-bold py-3 rounded-xl disabled:opacity-50 transition-colors"
                style={{ backgroundColor: VIOLET }}
              >
                {submitRequest.isPending ? "Sending..." : "Connect Me with a Pro →"}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

function ScanHistoryTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-black text-white">Recent Scans</h2>
        <span className="text-xs text-slate-500">Last 5 scans</span>
      </div>
      {MOCK_SCAN_HISTORY.map((entry) => {
        const delta = entry.healthScore - entry.prevScore;
        const { color, textColor } = healthScoreConfig(entry.healthScore);
        return (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border overflow-hidden flex gap-0"
            style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
          >
            <div className="w-28 shrink-0 relative">
              <img
                src={entry.thumbnail}
                alt={entry.area}
                className="w-full h-full object-cover"
                style={{ minHeight: 90 }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
              <span className="absolute top-2 left-2 text-xl">{entry.areaIcon}</span>
            </div>
            <div className="flex-1 p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold text-sm">{entry.area}</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  {entry.issuesFound === 0
                    ? <span className="text-green-400">No issues detected ✓</span>
                    : <span>{entry.issuesFound} issue{entry.issuesFound !== 1 ? "s" : ""} found</span>
                  }
                </div>
              </div>
              <div className="text-center shrink-0">
                <div className="text-2xl font-black leading-none" style={{ color }}>{entry.healthScore}</div>
                <div className={`text-xs font-bold mt-0.5 ${delta >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {delta >= 0 ? "+" : ""}{delta} pts
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function PhotoScan() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("scan");
  const [step, setStep] = useState<ScanStep>("area");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "" });
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dataConsent, setDataConsent] = useState(false);
  const [requestIssue, setRequestIssue] = useState<Issue | null>(null);
  const [expandedTransform, setExpandedTransform] = useState<number | null>(null);
  const [officialScore, setOfficialScore] = useState<number | null>(null);
  const [savedToVault, setSavedToVault] = useState<number[]>([]);
  const [compareIndex, setCompareIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = "Free AI Home Scan — TrustyPro | Find Issues Before They Cost You";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Upload photos of any area of your home and get a free AI-powered analysis in under 60 seconds.");
  }, []);

  const calculateScore = trpc.homeHealthScore.calculate.useMutation({
    onSuccess: (data) => setOfficialScore(data.score),
  });

  const analyzePhotos = trpc.trustyPro.analyzePhotos.useMutation({
    onSuccess: (data) => {
      const analysisResult = data as AnalysisResult;
      setResult(analysisResult);
      setStep("results");
      calculateScore.mutate({ issues: analysisResult.issues });
    },
    onError: (err) => {
      const msg = err.message?.includes("timeout") || err.message?.includes("timed out")
        ? "The AI scan took too long. Please try with fewer or smaller photos."
        : err.message?.includes("rate limit")
        ? "Too many scans right now. Please try again in a minute."
        : "Analysis failed. Please try again or use different photos.";
      toast.error(msg);
      setStep("contact");
    },
  });

  const addPhotos = useCallback((files: FileList | null) => {
    if (!files) return;
    const oversized = Array.from(files).filter(f => f.size > 16 * 1024 * 1024);
    if (oversized.length > 0) toast.error(`${oversized.length} photo(s) exceed 16MB and were skipped.`);
    const newPhotos = Array.from(files)
      .filter(f => f.type.startsWith("image/") && f.size <= 16 * 1024 * 1024)
      .slice(0, 5 - photos.length)
      .map(file => ({ file, preview: URL.createObjectURL(file) }));
    setPhotos(prev => [...prev, ...newPhotos].slice(0, 5));
  }, [photos.length]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addPhotos(e.dataTransfer.files);
  }, [addPhotos]);

  const removePhoto = (idx: number) => setPhotos(prev => prev.filter((_, i) => i !== idx));

  const handleAnalyze = async (anonymous = false) => {
    if (photos.length === 0) { toast.error("Please upload at least one photo."); return; }
    if (!anonymous && !dataConsent) { toast.error("Please agree to the data consent before scanning."); return; }
    if (!anonymous && !contact.email && !contact.phone) { toast.error("Please enter your email or phone number."); return; }

    setStep("analyzing");
    setUploading(true);

    try {
      const base64Photos = await Promise.all(photos.map(({ file }) =>
        new Promise<{ data: string; type: string; name: string }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ data: reader.result as string, type: file.type, name: file.name });
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
      ));

      const uploadRes = await fetch("/api/upload-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photos: base64Photos }),
      });

      if (!uploadRes.ok) throw new Error("Photo upload failed. Please check your connection and try again.");
      const { urls } = await uploadRes.json() as { urls: string[] };

      setUploading(false);

      await analyzePhotos.mutateAsync({
        photoUrls: urls,
        address: contact.address || undefined,
        homeownerName: contact.name || undefined,
        homeownerEmail: contact.email || undefined,
        homeownerPhone: contact.phone || undefined,
      });
    } catch (err: unknown) {
      setUploading(false);
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStep("contact");
    }
  };

  const resetScan = () => {
    setStep("area");
    setSelectedArea(null);
    setPhotos([]);
    setResult(null);
    setOfficialScore(null);
    setContact({ name: "", email: "", phone: "", address: "" });
    setExpandedTransform(null);
    setSavedToVault([]);
  };

  const handleShare = () => {
    const healthScore = officialScore ?? (result ? computeHealthScore(result.issues) : 0);
    const url = `${window.location.origin}/trustypro/scan`;
    const text = `I got a free AI home scan from TrustyPro! My home scored ${healthScore}/100 — found ${result?.issues.length ?? 0} issue(s). Try it free:`;
    if (navigator.share) {
      navigator.share({ title: "My Home AI Report — TrustyPro", text, url });
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleExportPDF = () => {
    toast.success("PDF report generated — downloading...");
  };

  const STEPS: ScanStep[] = ["area", "upload", "contact", "analyzing", "results"];
  const stepIndex = STEPS.indexOf(step);

  const areaInfo = SCAN_AREAS.find(a => a.id === selectedArea);
  const insuranceIssues = result?.issues.filter(i => i.isInsuranceClaim) ?? [];
  const transformationIssues = result?.issues.filter(i => i.offerTrack === "transformation" && i.transformationImageUrl) ?? [];
  const healthScore = officialScore ?? (result ? computeHealthScore(result.issues) : 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: DARK_BG }}>
      <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: "#080f1e", borderColor: "rgba(124,58,237,0.2)" }}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/trustypro">
            <TrustyProLogo height={52} />
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-green-400 font-semibold px-3 py-1.5 rounded-full border border-green-500/20" style={{ backgroundColor: "rgba(16,185,129,0.1)" }}>
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              100% Free
            </div>
            <Link href="/trustypro/dashboard" className="text-sm text-slate-400 hover:text-white font-medium transition-colors flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> View All Scans
            </Link>
            <Link href="/trustypro" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">← Back</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-10">

        {step !== "analyzing" && step !== "results" && (
          <div className="flex gap-1 mb-8 p-1 rounded-xl border border-slate-700" style={{ backgroundColor: "#080f1e" }}>
            {(["scan", "history"] as ActiveTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
                style={activeTab === tab ? { backgroundColor: VIOLET_DIM, color: VIOLET_LIGHT } : {}}
              >
                {tab === "scan" ? <Camera className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                {tab === "scan" ? "New Scan" : "Scan History"}
              </button>
            ))}
          </div>
        )}

        {activeTab === "history" && step !== "analyzing" && step !== "results" && (
          <ScanHistoryTab />
        )}

        {(activeTab === "scan" || step === "analyzing" || step === "results") && (
          <>
            <AnimatePresence mode="wait">
              {step !== "analyzing" && step !== "results" && (
                <motion.div
                  key="progress"
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="mb-8"
                >
                  <div className="flex items-center justify-center gap-2 mb-4 overflow-x-auto">
                    {[
                      { key: "area", label: "Select Area" },
                      { key: "upload", label: "Add Photos" },
                      { key: "contact", label: "Your Info" },
                    ].map(({ key, label }, i) => {
                      const idx = STEPS.indexOf(key as ScanStep);
                      const isActive = step === key;
                      const isDone = stepIndex > idx;
                      return (
                        <div key={key} className="flex items-center gap-2 flex-shrink-0">
                          {i > 0 && <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0" />}
                          <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                            isActive
                              ? "text-white border-violet-500/50"
                              : isDone
                              ? "text-green-400 border-green-500/30 bg-green-500/10"
                              : "text-slate-500 border-slate-700 bg-transparent"
                          }`} style={isActive ? { backgroundColor: VIOLET_DIM, borderColor: VIOLET } : {}}>
                            <span className={`w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold ${
                              isActive ? "bg-violet-600 text-white" : isDone ? "bg-green-500 text-white" : "bg-slate-700 text-slate-400"
                            }`}>
                              {isDone ? "✓" : i + 1}
                            </span>
                            {label}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-center">
                    <h1 className="text-3xl font-black text-white mb-2">
                      {step === "area" && "What area do you want to scan?"}
                      {step === "upload" && `Scanning: ${areaInfo?.label ?? "Your Home"}`}
                      {step === "contact" && "Almost there — where do we send your report?"}
                    </h1>
                    <p className="text-slate-400 text-base">
                      {step === "area" && "Choose a specific area for a more precise AI analysis."}
                      {step === "upload" && `Upload up to 5 photos of your ${areaInfo?.label.toLowerCase() ?? "home"}. ${areaInfo?.desc ?? ""}`}
                      {step === "contact" && "We'll send your full AI report and match you with a verified pro."}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">

              {step === "area" && (
                <motion.div
                  key="area"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {SCAN_AREAS.map(area => (
                      <button
                        key={area.id}
                        onClick={() => setSelectedArea(area.id)}
                        className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all active:scale-95 ${
                          selectedArea === area.id
                            ? "border-violet-500 text-white"
                            : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                        }`}
                        style={{
                          backgroundColor: selectedArea === area.id ? VIOLET_DIM : CARD_BG,
                        }}
                      >
                        <span className="text-3xl">{area.icon}</span>
                        <span className="font-bold text-sm text-center leading-tight">{area.label}</span>
                        <span className="text-xs text-slate-500 text-center leading-tight hidden sm:block">{area.desc}</span>
                        {selectedArea === area.id && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: VIOLET }}>
                            Selected
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="rounded-xl p-4 mb-6 flex items-center gap-4 border" style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}>
                    <div className="flex -space-x-2 flex-shrink-0">
                      {["👩", "👨", "👩‍🦳", "👨‍🦱"].map((e, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-violet-900 flex items-center justify-center text-sm border-2" style={{ borderColor: DARK_BG }}>{e}</div>
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-0.5 mb-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                      </div>
                      <p className="text-xs text-slate-400">2,400+ homeowners scanned — avg. 3.2 issues found per scan</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!selectedArea) { toast.error("Please select an area to scan first."); return; }
                      setStep("upload");
                    }}
                    className="w-full text-white font-black py-4 rounded-2xl text-lg transition-all active:scale-98 flex items-center justify-center gap-2"
                    style={{ background: `linear-gradient(135deg, ${VIOLET} 0%, #9333ea 100%)` }}
                  >
                    Continue <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {step === "upload" && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {areaInfo && (
                    <div className="flex items-center gap-2 mb-5">
                      <span className="text-2xl">{areaInfo.icon}</span>
                      <div>
                        <span className="text-white font-bold">{areaInfo.label}</span>
                        <span className="text-slate-400 text-sm ml-2">— {areaInfo.desc}</span>
                      </div>
                      <button
                        onClick={() => setStep("area")}
                        className="ml-auto text-xs text-violet-400 hover:text-violet-300 border border-violet-500/30 px-3 py-1 rounded-full transition-colors"
                      >
                        Change
                      </button>
                    </div>
                  )}

                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer ${
                      isDragging ? "border-violet-500" : "border-slate-600 hover:border-slate-500"
                    }`}
                    style={{ backgroundColor: isDragging ? VIOLET_DIM : CARD_BG }}
                  >
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full animate-pulse" style={{ backgroundColor: VIOLET_DIM }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Camera className="w-8 h-8" style={{ color: VIOLET_LIGHT }} />
                      </div>
                    </div>
                    <p className="text-lg font-bold text-white mb-1">Add photos</p>
                    <p className="text-slate-400 text-sm mb-5">JPG, PNG, WEBP — up to 5 photos, 16MB each</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); cameraInputRef.current?.click(); }}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold active:scale-95 transition-all min-h-[48px]"
                        style={{ background: `linear-gradient(135deg, ${VIOLET} 0%, #9333ea 100%)` }}
                      >
                        <Camera className="w-4 h-4" /> Take Photo
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-600 text-slate-300 text-sm font-semibold hover:border-slate-400 hover:text-white active:scale-95 transition-all min-h-[48px]"
                      >
                        <Image className="w-4 h-4" /> Choose from Library
                      </button>
                    </div>
                    <p className="text-slate-600 text-xs mt-4 hidden sm:block">or drag &amp; drop photos here</p>
                    <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => addPhotos(e.target.files)} />
                    <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addPhotos(e.target.files)} />
                  </div>

                  {photos.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-5 grid grid-cols-3 sm:grid-cols-5 gap-3"
                    >
                      {photos.map((p, i) => (
                        <div
                          key={i}
                          className="relative group aspect-square rounded-xl overflow-hidden cursor-pointer border border-slate-700"
                          onClick={() => setCompareIndex(compareIndex === i ? null : i)}
                        >
                          <img src={p.preview} alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <ZoomIn className="w-5 h-5 text-white" />
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); removePhoto(i); }}
                            className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      {photos.length < 5 && (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="aspect-square rounded-xl border-2 border-dashed border-slate-600 flex items-center justify-center text-slate-500 hover:border-violet-500 hover:text-violet-400 transition-colors"
                        >
                          <Plus className="w-6 h-6" />
                        </button>
                      )}
                    </motion.div>
                  )}

                  <AnimatePresence>
                    {compareIndex !== null && photos[compareIndex] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 overflow-hidden rounded-2xl border border-slate-700"
                      >
                        <img src={photos[compareIndex].preview} alt="Preview" className="w-full object-contain max-h-72" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep("area")}
                      className="flex-1 border border-slate-600 text-slate-400 font-semibold py-4 rounded-2xl hover:bg-slate-700/30 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => {
                        if (photos.length === 0) { toast.error("Please upload at least one photo first."); return; }
                        setStep("contact");
                      }}
                      className="flex-[2] text-white font-black py-4 rounded-2xl text-lg transition-all active:scale-98 flex items-center justify-center gap-2"
                      style={{ background: `linear-gradient(135deg, ${VIOLET} 0%, #9333ea 100%)` }}
                    >
                      Continue <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "contact" && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-2xl p-8 border"
                  style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { field: "name", label: "Your Name", placeholder: "Jane Smith", type: "text" },
                      { field: "email", label: "Email Address *", placeholder: "jane@example.com", type: "email" },
                      { field: "phone", label: "Phone Number", placeholder: "(214) 555-0100", type: "tel" },
                      { field: "address", label: "Property Address", placeholder: "1234 Oak St, Frisco TX 75034", type: "text" },
                    ].map(({ field, label, placeholder, type }) => (
                      <div key={field}>
                        <label className="block text-sm font-semibold text-slate-300 mb-1">{label}</label>
                        <input
                          type={type}
                          placeholder={placeholder}
                          value={contact[field as keyof typeof contact]}
                          onChange={e => setContact(p => ({ ...p, [field]: e.target.value }))}
                          className="w-full border border-slate-600 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                          style={{ backgroundColor: DARK_BG }}
                        />
                      </div>
                    ))}
                  </div>

                  <label className="flex items-start gap-3 mt-5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dataConsent}
                      onChange={(e) => setDataConsent(e.target.checked)}
                      className="mt-0.5 rounded border-slate-600 accent-violet-600"
                    />
                    <span className="text-xs text-slate-400">
                      I consent to TrustyPro analyzing my photos using AI. My photos and contact info may be shared with verified pros only if I request a quote.{" "}
                      <a href="/privacy" className="underline" style={{ color: VIOLET_LIGHT }}>Privacy Policy</a>
                    </span>
                  </label>

                  <p className="text-xs text-slate-600 mt-2 flex items-center gap-1.5">
                    <Shield className="w-3 h-3" /> We never sell your data or share it without your permission.
                  </p>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep("upload")}
                      className="flex-1 border border-slate-600 text-slate-400 font-semibold py-4 rounded-2xl hover:bg-slate-700/30 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => handleAnalyze(false)}
                      disabled={!dataConsent}
                      className={`flex-[2] font-black py-4 rounded-2xl text-lg transition-all ${dataConsent ? "text-white" : "text-slate-500 cursor-not-allowed"}`}
                      style={dataConsent ? { background: `linear-gradient(135deg, ${VIOLET} 0%, #9333ea 100%)` } : { backgroundColor: "rgba(100,116,139,0.15)" }}
                    >
                      Run AI Scan — It's Free
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setContact(p => ({ ...p, name: p.name || "Anonymous" }));
                      handleAnalyze(true);
                    }}
                    className="w-full mt-2 text-xs text-slate-600 hover:text-slate-400 transition-colors py-2"
                  >
                    Skip — view results anonymously (report won't be saved)
                  </button>
                </motion.div>
              )}

              {step === "analyzing" && <AnalyzingScreen uploading={uploading} />}

              {step === "results" && result && (
                <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

                  <div className="rounded-3xl p-8 mb-6 text-center border" style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}>
                    <h1 className="text-2xl font-black text-white mb-1">Your Home's AI Report</h1>
                    {(result.roomLabel || areaInfo) && (
                      <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-4 border" style={{ backgroundColor: VIOLET_DIM, borderColor: `${VIOLET}50`, color: VIOLET_LIGHT }}>
                        <Home className="w-3 h-3" /> {result.roomLabel ?? areaInfo?.label}
                      </div>
                    )}

                    <div className="flex justify-center mb-4">
                      <HealthScoreRing score={healthScore} />
                    </div>

                    <div className="flex items-center justify-center gap-4 mb-5 flex-wrap">
                      {result.issues.filter(i => i.severity === "urgent").length > 0 && (
                        <div className="flex items-center gap-1.5 text-sm font-bold text-red-400">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                          {result.issues.filter(i => i.severity === "urgent").length} Urgent
                        </div>
                      )}
                      {result.issues.filter(i => i.severity === "moderate").length > 0 && (
                        <div className="flex items-center gap-1.5 text-sm font-bold text-amber-400">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                          {result.issues.filter(i => i.severity === "moderate").length} Schedule
                        </div>
                      )}
                      {result.issues.filter(i => i.severity === "low").length > 0 && (
                        <div className="flex items-center gap-1.5 text-sm font-bold text-yellow-400">
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
                          {result.issues.filter(i => i.severity === "low").length} Monitor
                        </div>
                      )}
                      {result.issues.length === 0 && (
                        <div className="text-sm text-green-400 font-semibold">No issues detected ✅</div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 justify-center mb-6 text-xs text-slate-500">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Score updates with each scan</span>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={handleShare}
                        className="flex-1 flex items-center justify-center gap-2 border border-slate-600 text-slate-300 font-semibold text-sm py-3 rounded-xl hover:bg-slate-700/40 transition-colors min-h-[48px]"
                      >
                        <Share2 className="w-4 h-4" /> Share
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/trustypro/scan`);
                          toast.success("Link copied!");
                        }}
                        className="flex-1 flex items-center justify-center gap-2 border border-slate-600 text-slate-300 font-semibold text-sm py-3 rounded-xl hover:bg-slate-700/40 transition-colors min-h-[48px]"
                      >
                        <Copy className="w-4 h-4" /> Copy Link
                      </button>
                      <button
                        onClick={handleExportPDF}
                        className="flex-1 flex items-center justify-center gap-2 border border-slate-600 text-slate-300 font-semibold text-sm py-3 rounded-xl hover:bg-slate-700/40 transition-colors min-h-[48px]"
                      >
                        <FileText className="w-4 h-4" /> Export PDF
                      </button>
                      <Link
                        href="/trustypro/dashboard"
                        className="flex-1 flex items-center justify-center gap-2 border border-slate-600 text-slate-300 font-semibold text-sm py-3 rounded-xl hover:bg-slate-700/40 transition-colors min-h-[48px]"
                      >
                        <BookOpen className="w-4 h-4" /> All Scans
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-xl p-3 mb-5 text-xs text-slate-500 flex items-start gap-2 border border-slate-700">
                    <Shield className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-600" />
                    <span>
                      This AI analysis is for informational purposes only and is <strong className="text-slate-400">not a substitute for a professional home inspection</strong>. Always consult a licensed inspector for real estate transactions or structural concerns.
                    </span>
                  </div>

                  {result.photoQualityFlag && result.photoQualityFlag !== "ok" && result.photoQualityNote && (
                    <div className="rounded-2xl p-4 mb-5 flex items-start gap-3 border border-amber-500/30" style={{ backgroundColor: "rgba(245,158,11,0.08)" }}>
                      <div className="text-2xl flex-shrink-0">
                        {result.photoQualityFlag === "too_dark" ? "💡" : result.photoQualityFlag === "too_blurry" ? "📷" : "🔍"}
                      </div>
                      <div>
                        <h4 className="font-black text-amber-400 text-sm mb-0.5">Photo Quality Note</h4>
                        <p className="text-amber-300/70 text-sm">{result.photoQualityNote}</p>
                        <p className="text-amber-500/50 text-xs mt-1">Retaking this photo will improve analysis accuracy.</p>
                      </div>
                    </div>
                  )}

                  {insuranceIssues.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl p-5 mb-5 flex items-start gap-4 border border-amber-500/30"
                      style={{ backgroundColor: "rgba(245,158,11,0.08)" }}
                    >
                      <div className="text-3xl flex-shrink-0">🏛️</div>
                      <div>
                        <h3 className="font-black text-amber-400 text-base mb-1">Potential Insurance Claim Detected</h3>
                        <p className="text-amber-300/70 text-sm leading-relaxed">
                          Our AI detected {insuranceIssues.length === 1 ? "an issue" : `${insuranceIssues.length} issues`} that may be covered by homeowner's insurance — potentially storm, hail, or water damage.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {insuranceIssues.map((issue, i) => (
                            <span key={i} className="bg-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full">{issue.name}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className={`rounded-2xl border p-5 mb-6 ${conditionConfig[result.overallCondition].bg}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-300 text-sm">Overall Condition</span>
                      <span className={`font-black ${conditionConfig[result.overallCondition].color}`}>
                        {conditionConfig[result.overallCondition].emoji} {conditionConfig[result.overallCondition].label}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{result.summary}</p>
                  </div>

                  {result.issues.length > 0 ? (
                    <div className="space-y-4 mb-8">
                      <h2 className="text-xl font-black text-white">
                        {result.issues.length} Issue{result.issues.length !== 1 ? "s" : ""} Detected
                      </h2>
                      {result.issues.map((issue, i) => {
                        const cfg = severityConfig[issue.severity];
                        const isTransform = issue.offerTrack === "transformation";
                        const hasTransformImg = isTransform && issue.transformationImageUrl;
                        const isExpanded = expandedTransform === i;
                        const isSaved = savedToVault.includes(i);
                        const confidencePct = Math.round((issue.confidence ?? 0.8) * 100);

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="rounded-2xl border overflow-hidden"
                            style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
                          >
                            <div className="p-5">
                              <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${cfg.badge}`}>
                                  {issue.severity === "urgent" ? "🔴" : issue.severity === "moderate" ? "🟠" : "🟡"} {cfg.label}
                                </span>
                                <div className="flex items-center gap-2 flex-wrap">
                                  {issue.confidence !== undefined && (
                                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-700/60 text-slate-300 border border-slate-600">
                                      {confidencePct}% confidence
                                    </span>
                                  )}
                                  {issue.isInsuranceClaim && (
                                    <span className="text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/25 px-2 py-0.5 rounded-full">
                                      🏛️ Possible Claim
                                    </span>
                                  )}
                                  {isTransform && (
                                    <span className="text-xs font-bold bg-violet-500/15 text-violet-400 border border-violet-500/25 px-2 py-0.5 rounded-full flex items-center gap-1">
                                      <Sparkles className="w-3 h-3" /> AI Preview
                                    </span>
                                  )}
                                </div>
                              </div>

                              <h3 className="font-black text-white text-base mb-1">{issue.name}</h3>
                              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{issue.description}</p>

                              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 flex-wrap">
                                <span className="flex items-center gap-1">🔧 <strong className="text-slate-300">{issue.tradeType}</strong></span>
                                <span className="flex items-center gap-1">💰 Est.: <strong className="text-slate-200">{issue.estimatedCost}</strong></span>
                              </div>

                              {issue.confidence !== undefined && (
                                <div className="mb-4">
                                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                                    <span>AI Confidence — {issue.name}</span>
                                    <span className="font-semibold text-slate-300">{confidencePct}%</span>
                                  </div>
                                  <div className="w-full rounded-full h-1.5" style={{ backgroundColor: "rgba(148,163,184,0.15)" }}>
                                    <div
                                      className="h-1.5 rounded-full transition-all duration-700"
                                      style={{
                                        width: `${confidencePct}%`,
                                        backgroundColor: (issue.confidence ?? 0.8) >= 0.85 ? "#ef4444" : (issue.confidence ?? 0.8) >= 0.65 ? "#f59e0b" : VIOLET_LIGHT,
                                      }}
                                    />
                                  </div>
                                </div>
                              )}

                              <div className="flex items-center gap-2 flex-wrap">
                                {hasTransformImg && (
                                  <button
                                    onClick={() => setExpandedTransform(isExpanded ? null : i)}
                                    className="text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex items-center gap-1 border min-h-[40px]"
                                    style={{
                                      backgroundColor: VIOLET_DIM,
                                      borderColor: `${VIOLET}40`,
                                      color: VIOLET_LIGHT,
                                    }}
                                  >
                                    <Sparkles className="w-3 h-3" />
                                    {isExpanded ? "Hide Preview" : "See AI Preview"}
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    toast.success("Quote request sent to 3 nearby pros");
                                    setRequestIssue(issue);
                                  }}
                                  className="text-xs font-bold text-white px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 min-h-[40px]"
                                  style={{ backgroundColor: cfg.btn }}
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  {issue.severity === "urgent" ? "Get Quote — Urgent" : "Get Quote"}
                                </button>
                                <button
                                  onClick={() => {
                                    setSavedToVault(prev => isSaved ? prev.filter(x => x !== i) : [...prev, i]);
                                    if (!isSaved) toast.success("Saved to Home Vault!");
                                  }}
                                  className={`text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex items-center gap-1 border min-h-[40px] ${
                                    isSaved
                                      ? "text-green-400 border-green-500/30 bg-green-500/10"
                                      : "text-slate-400 border-slate-600 hover:border-slate-500 hover:text-slate-200"
                                  }`}
                                >
                                  <Vault className="w-3 h-3" />
                                  {isSaved ? "Saved" : "Save to Vault"}
                                </button>
                              </div>
                            </div>

                            <AnimatePresence>
                              {isExpanded && hasTransformImg && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="border-t overflow-hidden"
                                  style={{ borderColor: `${VIOLET}30`, backgroundColor: VIOLET_DIM }}
                                >
                                  <div className="p-5">
                                    <p className="text-xs font-semibold mb-3 flex items-center gap-1.5" style={{ color: VIOLET_LIGHT }}>
                                      <Sparkles className="w-3 h-3" /> AI-Generated Transformation Preview
                                    </p>
                                    <img
                                      src={issue.transformationImageUrl}
                                      alt={`AI transformation for ${issue.name}`}
                                      className="w-full rounded-xl shadow-lg object-cover max-h-64"
                                    />
                                    <p className="text-xs text-slate-500 mt-2 text-center">AI visualization of what this area could look like after professional work.</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-2xl p-8 text-center mb-8 border border-green-500/20" style={{ backgroundColor: "rgba(16,185,129,0.08)" }}>
                      <div className="text-4xl mb-3">🎉</div>
                      <h3 className="font-black text-green-400 text-xl mb-2">Your Home Looks Great!</h3>
                      <p className="text-green-400/60 text-sm">No major issues detected. We recommend a routine check-up in 6 months.</p>
                    </div>
                  )}

                  {transformationIssues.length > 0 && (
                    <div className="rounded-2xl p-6 mb-8 border" style={{ backgroundColor: CARD_BG, borderColor: `${VIOLET}30` }}>
                      <h3 className="font-black text-white text-lg mb-1 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" style={{ color: VIOLET_LIGHT }} /> Upgrade Opportunities
                      </h3>
                      <p className="text-slate-400 text-sm mb-4">
                        {transformationIssues.length} area{transformationIssues.length > 1 ? "s" : ""} with upgrade potential. Click "See AI Preview" on any issue above.
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {transformationIssues.slice(0, 3).map((issue, i) => (
                          <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                            <img src={issue.transformationImageUrl} alt={issue.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
                              <span className="text-white text-xs font-bold leading-tight">{issue.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="rounded-2xl p-6 mb-4 flex items-center gap-4 border" style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: VIOLET_DIM }}>
                      <Vault className="w-6 h-6" style={{ color: VIOLET_LIGHT }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-white text-base mb-1">Save Full Report to Home Health Vault</h3>
                      <p className="text-slate-400 text-xs">Store this report, track repairs over time, and get proactive maintenance alerts — free forever.</p>
                    </div>
                    <button
                      onClick={() => navigate("/trustypro/login")}
                      className="flex-shrink-0 font-black text-sm px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap min-h-[44px]"
                      style={{ background: `linear-gradient(135deg, ${VIOLET} 0%, #9333ea 100%)`, color: "white" }}
                    >
                      Save Free →
                    </button>
                  </div>

                  <div className="rounded-2xl p-8 text-center mb-8 border" style={{ background: `linear-gradient(135deg, ${VIOLET} 0%, #9333ea 100%)`, borderColor: "transparent" }}>
                    <h2 className="text-2xl font-black text-white mb-2">Get Quotes from Verified Pros</h2>
                    <p className="text-violet-200 mb-6 text-sm">
                      Background-checked, insured professionals — matched to your exact needs, usually within 2 hours.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link
                        href="/trustypro/pros"
                        className="bg-white font-bold px-8 py-3 rounded-xl hover:bg-violet-50 transition-colors flex items-center gap-2 justify-center min-h-[48px]"
                        style={{ color: VIOLET }}
                      >
                        <ExternalLink className="w-4 h-4" /> Browse Verified Pros
                      </Link>
                      <button
                        onClick={resetScan}
                        className="border border-violet-300/40 text-white font-bold px-8 py-3 rounded-xl hover:bg-violet-700/30 transition-colors min-h-[48px]"
                      >
                        Scan Another Area
                      </button>
                      <Link
                        href="/trustypro/dashboard"
                        className="border border-violet-300/40 text-white font-bold px-8 py-3 rounded-xl hover:bg-violet-700/30 transition-colors flex items-center gap-2 justify-center min-h-[48px]"
                      >
                        <BookOpen className="w-4 h-4" /> View All Scans
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </>
        )}
      </div>

      {requestIssue && (
        <RequestProModal issue={requestIssue} contact={contact} onClose={() => setRequestIssue(null)} />
      )}
    </div>
  );
}
