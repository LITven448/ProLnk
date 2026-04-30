import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import TrustyProLogo from "@/components/TrustyProLogo";
import { Link, useLocation } from "wouter";
import { Shield, Camera, CheckCircle, AlertTriangle, Sparkles, ArrowRight, X, Plus, Home, Star } from "lucide-react";

type ScanStep = "upload" | "contact" | "analyzing" | "results";

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

const ACCENT = "#4f46e5";

const severityConfig = {
  urgent: { label: "Urgent", color: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500", icon: AlertTriangle },
  moderate: { label: "Moderate", color: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500", icon: AlertTriangle },
  low: { label: "Low Priority", color: "bg-green-100 text-green-700 border-green-200", dot: "bg-green-500", icon: CheckCircle },
};

const conditionConfig = {
  excellent: { label: "Excellent Condition", color: "text-green-600", bg: "bg-green-50 border-green-200", emoji: "✅" },
  good: { label: "Good Condition", color: "text-blue-600", bg: "bg-blue-50 border-blue-200", emoji: "👍" },
  fair: { label: "Fair — Some Attention Needed", color: "text-amber-600", bg: "bg-amber-50 border-amber-200", emoji: "⚠️" },
  needs_attention: { label: "Needs Attention", color: "text-red-600", bg: "bg-red-50 border-red-200", emoji: "🔴" },
};

const ANALYZING_STEPS = [
  { label: "Uploading photos securely", duration: 3000 },
  { label: "Scanning for structural issues", duration: 5000 },
  { label: "Identifying maintenance needs", duration: 5000 },
  { label: "Detecting improvement opportunities", duration: 4000 },
  { label: "Generating transformation previews", duration: 6000 },
  { label: "Matching with DFW verified pros", duration: 3000 },
];

function AnalyzingScreen({ uploading }: { uploading: boolean }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    let idx = uploading ? 0 : 1;
    setCurrentStep(idx);
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
    return () => timers.forEach(clearTimeout);
  }, [uploading]);

  return (
    <motion.div
      key="analyzing"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"
    >
      <div className="relative w-24 h-24 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
        <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
        <div className="absolute inset-3 rounded-full bg-indigo-50 flex items-center justify-center text-3xl">🏠</div>
      </div>
      <h2 className="text-2xl font-black text-gray-900 mb-3">
        {uploading ? "Uploading Photos..." : "AI is Scanning Your Home..."}
      </h2>
      <p className="text-gray-500 mb-8 text-sm max-w-sm mx-auto">
        Our AI is analyzing every detail — structural issues, maintenance needs, upgrade opportunities, and potential insurance claims.
      </p>
      <div className="space-y-3 text-left max-w-sm mx-auto">
        {ANALYZING_STEPS.map((step, i) => {
          const isDone = completedSteps.includes(i);
          const isActive = currentStep === i && !isDone;
          return (
            <div key={i} className={`flex items-center gap-3 transition-opacity duration-300 ${i > currentStep ? "opacity-30" : "opacity-100"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-all duration-500 ${
                isDone ? "bg-green-500 text-white" : isActive ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400"
              }`}>
                {isDone ? "✓" : isActive ? <span className="w-2 h-2 bg-white rounded-full animate-pulse" /> : "○"}
              </div>
              <span className={`text-sm transition-all duration-300 ${isDone ? "text-green-700 font-medium" : isActive ? "text-indigo-700 font-semibold" : "text-gray-400"}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-gray-400 mt-8">This usually takes 15–30 seconds. Please don't close this tab.</p>
    </motion.div>
  );
}

function RequestProModal({ issue, contact, onClose }: { issue: Issue; contact: { name: string; email: string; phone: string; address: string }; onClose: () => void }) {
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
      email: contact.email || "noreply@trustypro.com",
      phone: contact.phone || undefined,
      address: contact.address || "Address on file",
      serviceType: issue.tradeType,
      description: `Issue detected by AI scan: ${issue.name}. ${issue.description}`,
      urgency: issue.severity,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {sent ? (
          <div className="text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Request Sent!</h3>
            <p className="text-gray-500 mb-6">A verified DFW pro specializing in <strong>{issue.tradeType}</strong> will reach out within 2 hours.</p>
            <button onClick={onClose} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors">Done</button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-black text-gray-900">Request a Pro</h3>
                <p className="text-gray-500 text-sm mt-1">For: <strong>{issue.name}</strong></p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm">
              <div className="flex items-center gap-2 mb-1"><span className="font-semibold text-gray-700">Trade needed:</span><span className="text-indigo-600 font-bold">{issue.tradeType}</span></div>
              <div className="flex items-center gap-2"><span className="font-semibold text-gray-700">Est. cost:</span><span className="text-gray-600">{issue.estimatedCost}</span></div>
            </div>
            <p className="text-sm text-gray-500 mb-6">We'll match you with a background-checked, insured {issue.tradeType} professional in your area. No commitment required.</p>
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button
                onClick={handleSubmit}
                disabled={submitRequest.isPending}
                className="flex-[2] bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors"
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

export default function PhotoScan() {
  const [step, setStep] = useState<ScanStep>("upload");
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "" });
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dataConsent, setDataConsent] = useState(false);
  const [requestIssue, setRequestIssue] = useState<Issue | null>(null);
  const [expandedTransform, setExpandedTransform] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

  // SEO meta
  useEffect(() => {
    document.title = "Free AI Home Scan — TrustyPro | Find Issues Before They Cost You";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Upload photos of your home and get a free AI-powered analysis in under 60 seconds. TrustyPro detects 50+ issue types and matches you with verified DFW pros.");
  }, []);

  const analyzePhotos = trpc.trustyPro.analyzePhotos.useMutation({
    onSuccess: (data) => {
      setResult(data as AnalysisResult);
      setStep("results");
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
    if (oversized.length > 0) {
      toast.error(`${oversized.length} photo(s) exceed the 16MB limit and were skipped.`);
    }
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

  const removePhoto = (idx: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAnalyze = async (anonymous = false) => {
    if (photos.length === 0) { toast.error("Please upload at least one photo."); return; }
    if (!anonymous && !dataConsent) { toast.error("Please agree to the data consent before scanning."); return; }
    if (!anonymous && !contact.email && !contact.phone) { toast.error("Please enter your email or phone number."); return; }

    setStep("analyzing");
    setUploading(true);

    try {
      const base64Photos = await Promise.all(photos.map(async ({ file }) => {
        return new Promise<{ data: string; type: string; name: string }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ data: reader.result as string, type: file.type, name: file.name });
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }));

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
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast.error(msg);
      setStep("contact");
    }
  };

  const insuranceIssues = result?.issues.filter(i => i.isInsuranceClaim) ?? [];
  const transformationIssues = result?.issues.filter(i => i.offerTrack === "transformation" && i.transformationImageUrl) ?? [];

  const stepIndex = ["upload", "contact", "analyzing", "results"].indexOf(step);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/trustypro">
            <TrustyProLogo height={52} />
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-green-700 font-semibold bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              100% Free — No Credit Card
            </div>
            <Link href="/trustypro" className="text-sm text-gray-600 hover:text-gray-900 font-medium">← Back to Home</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <AnimatePresence mode="wait">
          {step !== "results" && step !== "analyzing" && (
            <motion.div
              key="header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-10"
            >
              <h1 className="text-4xl font-black text-gray-900 mb-3">
                {step === "upload" && "Upload Your Home Photos"}
                {step === "contact" && "Almost There — Tell Us Where to Send Results"}
              </h1>
              <p className="text-gray-500 text-lg">
                {step === "upload" && "Upload up to 5 photos of any area of your home — exterior, interior, yard, roof, or garage."}
                {step === "contact" && "We'll send your full AI report and match you with a verified DFW pro."}
              </p>

              {/* Progress bar */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {["upload", "contact", "analyzing", "results"].map((s, i) => (
                  <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${
                    stepIndex >= i ? "bg-indigo-600 w-12" : "bg-gray-200 w-8"
                  }`} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step: Upload */}
        <AnimatePresence mode="wait">
          {step === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                  isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-white"
                }`}
              >
                <Camera className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                <p className="text-xl font-bold text-gray-800 mb-1">Add photos of your home</p>
                <p className="text-gray-500 text-sm mb-5">JPG, PNG, WEBP — up to 5 photos, 16MB each</p>
                {/* Dual buttons: camera (mobile-first) + library */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 active:scale-95 transition-all"
                  >
                    <Camera className="w-4 h-4" /> Take Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:border-indigo-400 hover:text-indigo-600 active:scale-95 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Choose from Library
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-4 hidden sm:block">or drag &amp; drop photos here</p>
                {/* Hidden inputs */}
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => addPhotos(e.target.files)}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => addPhotos(e.target.files)}
                />
              </div>

              {/* Photo previews */}
              {photos.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 grid grid-cols-3 sm:grid-cols-5 gap-3"
                >
                  {photos.map((p, i) => (
                    <div key={i} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100">
                      <img src={p.preview} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={(e) => { e.stopPropagation(); removePhoto(i); }}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {photos.length < 5 && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  )}
                </motion.div>
              )}

              {/* Tip cards */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: "🏠", title: "Exterior", desc: "Roof, siding, gutters, driveway, fence" },
                  { icon: "🛁", title: "Interior", desc: "Kitchen, bathrooms, floors, walls, ceilings" },
                  { icon: "🌿", title: "Yard & Garage", desc: "Landscaping, deck, patio, garage door" },
                ].map(tip => (
                  <div key={tip.title} className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl mb-2">{tip.icon}</div>
                    <div className="font-semibold text-gray-800 text-sm">{tip.title}</div>
                    <div className="text-gray-500 text-xs mt-1">{tip.desc}</div>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {["👩", "👨", "👩‍🦳", "👨‍🦱"].map((e, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-sm border-2 border-white">{e}</div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-xs text-indigo-700 font-medium">2,400+ DFW homeowners have scanned their homes — average 3.2 issues found per scan</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (photos.length === 0) { toast.error("Please upload at least one photo first."); return; }
                  setStep("contact");
                }}
                className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl text-lg transition-colors flex items-center justify-center gap-2"
              >
                Analyze My Home <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* Step: Contact */}
          {step === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    value={contact.name}
                    onChange={e => setContact(p => ({ ...p, name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    value={contact.email}
                    onChange={e => setContact(p => ({ ...p, email: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="(214) 555-0100"
                    value={contact.phone}
                    onChange={e => setContact(p => ({ ...p, phone: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Property Address</label>
                  <input
                    type="text"
                    placeholder="1234 Oak St, Frisco TX 75034"
                    value={contact.address}
                    onChange={e => setContact(p => ({ ...p, address: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dataConsent}
                  onChange={(e) => setDataConsent(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300"
                />
                <span className="text-xs text-gray-500">
                  I consent to TrustyPro analyzing my uploaded photos using AI. My photos and contact information will be used to generate a home health report and may be shared with verified service professionals if I request a quote. <a href="/privacy" className="text-indigo-600 underline">Privacy Policy</a>
                </span>
              </label>

              <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
                <Shield className="w-3 h-3" /> Your information is private. We never sell your data or share it with third parties.
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep("upload")}
                  className="flex-1 border border-gray-200 text-gray-600 font-semibold py-4 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => handleAnalyze(false)}
                  disabled={!dataConsent}
                  className={`flex-[2] font-bold py-4 rounded-2xl text-lg transition-colors ${dataConsent ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                >
                  Run AI Scan — It's Free
                </button>
              </div>
              <button
                onClick={() => {
                  setContact(p => ({ ...p, name: p.name || "Anonymous" }));
                  handleAnalyze(true);
                }}
                className="w-full mt-2 text-xs text-gray-400 hover:text-gray-600 transition-colors py-2"
              >
                Skip — view results anonymously (report won't be saved)
              </button>
            </motion.div>
          )}

          {/* Step: Analyzing */}
          {step === "analyzing" && <AnalyzingScreen uploading={uploading} />}

          {/* Step: Results */}
          {step === "results" && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">{conditionConfig[result.overallCondition].emoji}</div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">Your Home AI Report</h1>
                {result.roomLabel && (
                  <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                    <Home className="w-4 h-4" /> {result.roomLabel}
                  </div>
                )}
                <p className="text-gray-500">
                  {contact.name ? `${contact.name}, here` : "Here"}'s what our AI found.
                  {contact.email ? " A verified DFW pro will follow up shortly." : ""}
                </p>
              </div>

              {/* Disclaimer */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-6 text-xs text-gray-500 flex items-start gap-2">
                <Shield className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-400" />
                <span>
                  This AI analysis is for informational purposes only and is <strong>not a substitute for a professional home inspection</strong>. Always consult a licensed inspector for real estate transactions or structural concerns. Results are based on visible photo analysis and may not detect hidden issues.
                </span>
              </div>

              {/* Photo quality warning */}
              {result.photoQualityFlag && result.photoQualityFlag !== "ok" && result.photoQualityNote && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 mb-6 flex items-start gap-3">
                  <div className="text-2xl flex-shrink-0">
                    {result.photoQualityFlag === "too_dark" ? "💡" : result.photoQualityFlag === "too_blurry" ? "📷" : "🔍"}
                  </div>
                  <div>
                    <h4 className="font-black text-amber-900 text-sm mb-0.5">Photo Quality Note</h4>
                    <p className="text-amber-800 text-sm">{result.photoQualityNote}</p>
                    <p className="text-amber-600 text-xs mt-1">Retaking this photo will improve the accuracy of your analysis.</p>
                  </div>
                </div>
              )}

              {/* Insurance alert — shown first if any insurance claims detected */}
              {insuranceIssues.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 mb-6 flex items-start gap-4"
                >
                  <div className="text-3xl flex-shrink-0">🏛️</div>
                  <div>
                    <h3 className="font-black text-amber-900 text-lg mb-1">Potential Insurance Claim Detected</h3>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      Our AI detected {insuranceIssues.length === 1 ? "an issue" : `${insuranceIssues.length} issues`} that may be caused by storm, hail, wind, or water damage — which could be covered by your homeowner's insurance policy. A TrustyPro-verified contractor can document the damage and help you file a claim.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {insuranceIssues.map((issue, i) => (
                        <span key={i} className="bg-amber-200 text-amber-900 text-xs font-semibold px-3 py-1 rounded-full">{issue.name}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Overall condition */}
              <div className={`rounded-2xl border p-6 mb-6 ${conditionConfig[result.overallCondition].bg}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-gray-800">Overall Condition</span>
                  <span className={`font-black text-lg ${conditionConfig[result.overallCondition].color}`}>
                    {conditionConfig[result.overallCondition].label}
                  </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{result.summary}</p>
              </div>

              {/* Issues */}
              {result.issues.length > 0 ? (
                <div className="space-y-4 mb-8">
                  <h2 className="text-xl font-black text-gray-900">
                    {result.issues.length} Issue{result.issues.length !== 1 ? "s" : ""} Detected
                  </h2>
                  {result.issues.map((issue, i) => {
                    const cfg = severityConfig[issue.severity];
                    const isTransform = issue.offerTrack === "transformation";
                    const hasTransformImg = isTransform && issue.transformationImageUrl;
                    const isExpanded = expandedTransform === i;

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
                      >
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-start gap-3 flex-1">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-bold text-gray-900">{issue.name}</h3>
                                  {issue.isInsuranceClaim && (
                                    <span className="text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">🏛️ Possible Claim</span>
                                  )}
                                  {isTransform && (
                                    <span className="text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI Preview Available</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full border whitespace-nowrap flex-shrink-0 ${cfg.color}`}>
                              <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${cfg.dot}`} />
                              {cfg.label}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{issue.description}</p>

                          {/* AI Confidence Bar */}
                          {issue.confidence !== undefined && (
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                <span>AI Confidence</span>
                                <span className="font-semibold text-gray-700">{Math.round((issue.confidence ?? 0.8) * 100)}%</span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full transition-all duration-700 ${
                                    (issue.confidence ?? 0.8) >= 0.85 ? "bg-red-500" :
                                    (issue.confidence ?? 0.8) >= 0.65 ? "bg-amber-500" : "bg-blue-400"
                                  }`}
                                  style={{ width: `${Math.round((issue.confidence ?? 0.8) * 100)}%` }}
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>🔧 <strong>{issue.tradeType}</strong></span>
                              <span>💰 Est. <strong>{issue.estimatedCost}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                              {hasTransformImg && (
                                <button
                                  onClick={() => setExpandedTransform(isExpanded ? null : i)}
                                  className="text-xs font-semibold text-purple-600 border border-purple-200 bg-purple-50 px-3 py-1.5 rounded-full hover:bg-purple-100 transition-colors flex items-center gap-1"
                                >
                                  <Sparkles className="w-3 h-3" />
                                  {isExpanded ? "Hide Preview" : "See AI Transformation"}
                                </button>
                              )}
                              <button
                                onClick={() => setRequestIssue(issue)}
                                className="text-xs font-bold text-white px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                                style={{ backgroundColor: ACCENT }}
                              >
                                <Home className="w-3 h-3" /> Request a Pro
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Transformation image reveal */}
                        <AnimatePresence>
                          {isExpanded && hasTransformImg && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="border-t border-purple-100 bg-purple-50 overflow-hidden"
                            >
                              <div className="p-5">
                                <p className="text-xs font-semibold text-purple-700 mb-3 flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> AI-Generated Transformation Preview</p>
                                <img
                                  src={issue.transformationImageUrl}
                                  alt={`AI transformation preview for ${issue.name}`}
                                  className="w-full rounded-xl shadow-md object-cover max-h-64"
                                />
                                <p className="text-xs text-purple-600 mt-2 text-center">This is an AI-generated visualization of what this area could look like after professional work.</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center mb-8">
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="font-black text-green-800 text-xl mb-2">Your Home Looks Great!</h3>
                  <p className="text-green-700 text-sm">No major issues detected. We recommend a routine check-up in 6 months.</p>
                </div>
              )}

              {/* Transformation gallery summary */}
              {transformationIssues.length > 0 && (
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-6 mb-8">
                  <h3 className="font-black text-gray-900 text-lg mb-1 flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-500" /> Upgrade Opportunities Found</h3>
                  <p className="text-gray-500 text-sm mb-4">Your home has {transformationIssues.length} area{transformationIssues.length > 1 ? "s" : ""} with upgrade potential. Click "See AI Transformation" on any issue above to see what it could look like.</p>
                  <div className="grid grid-cols-3 gap-2">
                    {transformationIssues.slice(0, 3).map((issue, i) => (
                      <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                        <img src={issue.transformationImageUrl} alt={issue.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                          <span className="text-white text-xs font-bold leading-tight">{issue.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Save to vault prompt */}
              <div className="bg-gray-900 rounded-2xl p-6 mb-6 flex items-center gap-4">
                <div className="text-3xl flex-shrink-0">🔐</div>
                <div className="flex-1">
                  <h3 className="font-black text-white text-base mb-1">Save This Report to Your Home Health Vault</h3>
                  <p className="text-gray-400 text-xs">Create a free account to store this report, track repairs over time, and get proactive maintenance alerts.</p>
                </div>
                <button
                  onClick={() => navigate("/trustypro/login")}
                  className="flex-shrink-0 bg-white text-gray-900 font-bold text-sm px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  Save Free →
                </button>
              </div>

              {/* CTA */}
              <div className="rounded-2xl p-8 text-center text-white" style={{ backgroundColor: ACCENT }}>
                <h2 className="text-2xl font-black mb-2">Get Matched with a Verified DFW Pro</h2>
                <p className="text-indigo-200 mb-6 text-sm">
                  We'll connect you with a background-checked, insured professional in your area — usually within 2 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/trustypro"
                    className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
                  >
                    Browse Verified Pros
                  </Link>
                  <button
                    onClick={() => {
                      setStep("upload");
                      setPhotos([]);
                      setResult(null);
                      setContact({ name: "", email: "", phone: "", address: "" });
                      setExpandedTransform(null);
                    }}
                    className="border border-indigo-400 text-white font-bold px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    Scan Another Room
                  </button>
                  <button
                    onClick={() => {
                      const scanUrl = `${window.location.origin}/trustypro/scan`;
                      const text = `I just got a free AI home scan from TrustyPro! It found ${result?.issues?.length ?? 0} issues in my home \u2014 some I didn't even know about. The scan is free and takes 60 seconds. Try it:`;
                      if (navigator.share) {
                        navigator.share({ title: "Free AI Home Scan \u2014 TrustyPro", text, url: scanUrl });
                      } else {
                        navigator.clipboard.writeText(`${text} ${scanUrl}`);
                        toast.success("Share message copied! Send it to a neighbor.");
                      }
                    }}
                    className="border border-indigo-400 text-white font-bold px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 justify-center"
                  >
                    Share Report
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Request Pro Modal */}
      {requestIssue && (
        <RequestProModal
          issue={requestIssue}
          contact={contact}
          onClose={() => setRequestIssue(null)}
        />
      )}
    </div>
  );
}
