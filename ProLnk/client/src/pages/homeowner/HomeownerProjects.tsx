import { useState, useRef } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Camera, Upload, X, Loader2, AlertTriangle, CheckCircle,
  Zap, Star, Shield, DollarSign, Clock, ChevronDown, ChevronUp,
  Wrench, Droplets, Wind, Paintbrush, Leaf, Home, ArrowRight,
  Lightbulb, FolderOpen, Info, Hammer, Search, Sparkles,
  Phone, Mail, FileText
} from "lucide-react";

// --- Constants ----------------------------------------------------------------

const PROJECT_TYPES = [
  { key: "repair",      label: "Repair",      icon: Wrench,    color: "#EF4444", desc: "Fix something broken or damaged" },
  { key: "improvement", label: "Improvement", icon: Hammer,    color: "#8B5CF6", desc: "Upgrade or enhance your home" },
  { key: "inspection",  label: "Inspection",  icon: Search,    color: "#0284C7", desc: "Get a professional assessment" },
  { key: "emergency",   label: "Emergency",   icon: AlertTriangle, color: "#DC2626", desc: "Needs immediate attention" },
];

const SERVICE_CATEGORIES = [
  { key: "plumbing",       label: "Plumbing",          icon: Droplets,   color: "#3B82F6" },
  { key: "electrical",     label: "Electrical",        icon: Zap,        color: "#F59E0B" },
  { key: "hvac",           label: "HVAC / AC",         icon: Wind,       color: "#06B6D4" },
  { key: "painting",       label: "Painting",          icon: Paintbrush, color: "#8B5CF6" },
  { key: "landscaping",    label: "Landscaping",       icon: Leaf,       color: "#10B981" },
  { key: "roofing",        label: "Roofing",           icon: Home,       color: "#EF4444" },
  { key: "general_repair", label: "General Repair",    icon: Wrench,     color: "#D97706" },
  { key: "pest_control",   label: "Pest Control",      icon: Shield,     color: "#6B7280" },
  { key: "flooring",       label: "Flooring",          icon: Hammer,     color: "#92400E" },
  { key: "windows_doors",  label: "Windows & Doors",   icon: Home,       color: "#0EA5E9" },
  { key: "cleaning",       label: "Cleaning",          icon: Sparkles,   color: "#EC4899" },
  { key: "other",          label: "Other / Not Sure",  icon: Search,     color: "#9CA3AF" },
];

const URGENCY_OPTIONS = [
  { key: "low",      label: "When ready -- no rush",        sub: "Within 30 days",     color: "#10B981" },
  { key: "moderate", label: "Soon -- within 2 weeks",       sub: "Moderate priority",  color: "#F59E0B" },
  { key: "urgent",   label: "Urgent -- within a few days",  sub: "High priority",      color: "#EF4444" },
];

const BUDGET_OPTIONS = [
  { key: "under_500",     label: "Under $500" },
  { key: "500_2000",      label: "$500 - $2,000" },
  { key: "2000_5000",     label: "$2,000 - $5,000" },
  { key: "over_5000",     label: "Over $5,000" },
  { key: "not_sure",      label: "Not sure yet" },
];

const PHOTO_TIPS = [
  { icon: Camera,    tip: "Take photos in good lighting -- natural daylight works best" },
  { icon: Home,      tip: "Capture the full area first, then close-up shots of the problem" },
  { icon: Lightbulb, tip: "Include multiple angles -- front, side, and overhead if possible" },
  { icon: Info,      tip: "Show the surrounding area so the AI can detect related issues nearby" },
];

const SEVERITY_CONFIG = {
  urgent:   { label: "Urgent",      bg: "#FEE2E2", text: "#DC2626", border: "#FCA5A5" },
  moderate: { label: "Soon",        bg: "#FEF3C7", text: "#D97706", border: "#FCD34D" },
  low:      { label: "When Ready",  bg: "#D1FAE5", text: "#059669", border: "#6EE7B7" },
} as const;

const CONDITION_CONFIG = {
  excellent:        { label: "Excellent Condition",  color: "#059669", bg: "#D1FAE5" },
  good:             { label: "Good Condition",        color: "#0284C7", bg: "#E0F2FE" },
  fair:             { label: "Fair Condition",        color: "#D97706", bg: "#FEF3C7" },
  needs_attention:  { label: "Needs Attention",       color: "#DC2626", bg: "#FEE2E2" },
} as const;

// --- Types --------------------------------------------------------------------

interface Issue {
  name: string;
  severity: "urgent" | "moderate" | "low";
  description: string;
  tradeType: string;
  estimatedCost: string;
}

interface ScanResult {
  issues: Issue[];
  overallCondition: "excellent" | "good" | "fair" | "needs_attention";
  summary: string;
  photoUrls: string[];
}

// --- Component ----------------------------------------------------------------

export default function HomeownerProjects() {
  // Profile for pre-filled address
  const { data: profile } = trpc.homeowner.getProfile.useQuery();

  // Flow state: "intake"  "upload"  "scanning"  "results"  "submitted"
  const [stage, setStage] = useState<"intake" | "upload" | "scanning" | "results" | "submitted">("intake");

  // Intake filter answers
  const [projectType, setProjectType]     = useState("");
  const [category, setCategory]           = useState("");
  const [urgency, setUrgency]             = useState("moderate");
  const [budget, setBudget]               = useState("");
  const [description, setDescription]     = useState("");
  const [showTipsExpanded, setShowTipsExpanded] = useState(false);
  // AI description guidance
  const [aiGuidance, setAiGuidance] = useState<{ improvedDescription: string; tips: string[]; missingInfo: string[]; qualityScore: number } | null>(null);
  const [showAiGuidance, setShowAiGuidance] = useState(false);

  // Photo upload state
  const [photos, setPhotos]               = useState<Array<{ file: File; preview: string }>>([]);
  const [uploading, setUploading]         = useState(false);
  const fileInputRef                      = useRef<HTMLInputElement>(null);

  // AI scan result
  const [result, setResult]               = useState<ScanResult | null>(null);
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);

  // Contact form (pre-filled from profile)
  const [contactName,  setContactName]    = useState("");
  const [contactEmail, setContactEmail]   = useState("");
  const [contactPhone, setContactPhone]   = useState("");

  // tRPC
  const analyzePhotos = trpc.trustyPro.analyzePhotos.useMutation({
    onSuccess: (data) => {
      setResult(data as ScanResult);
      setStage("results");
      toast.success("AI scan complete!");
    },
    onError: (err) => {
      setStage("upload");
      toast.error("Scan failed: " + err.message);
    },
  });

  const improveDescription = trpc.trustyPro.improveDescription.useMutation({
    onSuccess: (data) => {
      setAiGuidance(data);
      setShowAiGuidance(true);
    },
    onError: (err) => toast.error("AI guidance failed: " + err.message),
  });

  const submitRequest = trpc.trustyPro.submitRequest.useMutation({
    onSuccess: () => {
      setStage("submitted");
      toast.success("Project request submitted! We'll match you with a pro shortly.");
    },
    onError: (err) => toast.error(err.message),
  });

  // -- Helpers ----------------------------------------------------------------

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const newPhotos = Array.from(files).slice(0, 5 - photos.length).map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPhotos(prev => [...prev, ...newPhotos].slice(0, 5));
  };

  const removePhoto = (idx: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  const handleScan = async () => {
    if (photos.length === 0) { toast.error("Please add at least one photo"); return; }
    setUploading(true);
    const uploadedUrls: string[] = [];
    for (const photo of photos) {
      try {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(photo.file);
        });
        const res = await fetch("/api/upload-photos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ photos: [{ data: base64, type: photo.file.type, name: photo.file.name }] }),
        });
        const data = await res.json();
        if (data.urls?.[0]) uploadedUrls.push(data.urls[0]);
      } catch { toast.error("Failed to upload a photo"); }
    }
    setUploading(false);
    if (uploadedUrls.length === 0) { toast.error("No photos uploaded successfully"); return; }
    setStage("scanning");
    analyzePhotos.mutate({ photoUrls: uploadedUrls });
  };

  const handleSubmitRequest = () => {
    const address = profile?.address
      ? `${profile.address}${profile.city ? ", " + profile.city : ""}${profile.state ? ", " + profile.state : ""}${profile.zip ? " " + profile.zip : ""}`
      : "On file";
    submitRequest.mutate({
      name: contactName || "TrustyPro Homeowner",
      email: contactEmail || "homeowner@trustypro.com",
      phone: contactPhone || undefined,
      address,
      serviceType: category || projectType || "Home Services",
      description: [
        description,
        result ? `AI scan: ${result.issues.map(i => i.name).join(", ")}. ${result.summary}` : "",
      ].filter(Boolean).join(" | "),
      urgency: urgency as "urgent" | "moderate" | "low",
      photoUrls: result?.photoUrls,
    });
  };

  const profileAddress = profile?.address
    ? `${profile.address}${profile.city ? ", " + profile.city : ""}${profile.state ? ", " + profile.state : ""}`
    : null;

  // -- Submitted --------------------------------------------------------------

  if (stage === "submitted") {
    return (
      <HomeownerLayout>
        <div className="p-4 md:p-8 max-w-lg mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#D1FAE5" }}>
            <CheckCircle className="w-10 h-10" style={{ color: "#059669" }} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Project Submitted!</h2>
          <p className="text-gray-500 mb-6">
            We're matching you with a verified TrustyPro professional for{" "}
            <strong>{SERVICE_CATEGORIES.find(s => s.key === category)?.label ?? (category || projectType || "your project")}</strong>.
            You'll hear back within 24 hours.
          </p>
          <div className="rounded-xl p-4 text-left w-full mb-6" style={{ backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE" }}>
            <p className="text-sm font-semibold mb-2" style={{ color: "#1E40AF" }}>What happens next:</p>
            <ol className="space-y-1.5 text-sm" style={{ color: "#3B82F6" }}>
              <li className="flex items-start gap-2"><span className="font-bold">1.</span> Our team reviews your project request</li>
              <li className="flex items-start gap-2"><span className="font-bold">2.</span> We match you with 1-3 verified pros</li>
              <li className="flex items-start gap-2"><span className="font-bold">3.</span> You receive offers in your dashboard</li>
              <li className="flex items-start gap-2"><span className="font-bold">4.</span> Accept the best fit -- no obligation</li>
            </ol>
          </div>
          <Button className="w-full text-white" style={{ backgroundColor: "#1B4FD8" }} onClick={() => window.location.href = "/my-home"}>
            Back to Dashboard
          </Button>
        </div>
      </HomeownerLayout>
    );
  }

  // -- Scanning overlay -------------------------------------------------------

  if (stage === "scanning") {
    return (
      <HomeownerLayout>
        <div className="p-4 md:p-8 max-w-lg mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "linear-gradient(135deg, #00B5B8, #0A7A7C)" }}>
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Analyzing Your Photos...</h2>
          <p className="text-gray-500 text-sm mb-6">Our AI is scanning for issues, opportunities, and the best-matched professionals for your project.</p>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div className="h-2 rounded-full animate-pulse" style={{ width: "70%", background: "linear-gradient(90deg, #00B5B8, #0A7A7C)" }} />
          </div>
          <p className="text-xs text-gray-400 mt-3">Usually takes 15-30 seconds</p>
        </div>
      </HomeownerLayout>
    );
  }

  // -- Results ----------------------------------------------------------------

  if (stage === "results" && result) {
    const condCfg = CONDITION_CONFIG[result.overallCondition] ?? CONDITION_CONFIG.fair;
    return (
      <HomeownerLayout>
        <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-heading text-gray-900">AI Scan Results</h1>
              <p className="text-sm text-gray-500 mt-1">Based on the photos you uploaded for your project</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 gap-1.5 text-teal-700 border-teal-300 hover:bg-teal-50"
              onClick={() => {
                const lines: string[] = [];
                lines.push("TRUSTYPRO PROPERTY INTELLIGENCE REPORT");
                lines.push("======================================");
                lines.push(`Date: ${new Date().toLocaleDateString()}`);
                lines.push(`Address: ${profileAddress || "Not provided"}`);
                lines.push("");
                lines.push(`Overall Condition: ${result.overallCondition.replace("_", " ").toUpperCase()}`);
                lines.push(`Summary: ${result.summary}`);
                lines.push("");
                lines.push(`DETECTED ISSUES (${result.issues.length})`);
                lines.push("------------------------------------");
                result.issues.forEach((issue, i) => {
                  lines.push(`${i + 1}. ${issue.name} [${issue.severity.toUpperCase()}]`);
                  lines.push(`   Trade: ${issue.tradeType}`);
                  lines.push(`   Estimated Cost: ${issue.estimatedCost}`);
                  lines.push(`   ${issue.description}`);
                  lines.push("");
                });
                lines.push("------------------------------------");
                lines.push("Generated by TrustyPro \u00b7 ProLnk Partner Network");
                const blob = new Blob([lines.join("\n")], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `TrustyPro-Report-${Date.now()}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <FileText className="w-3.5 h-3.5" /> Download Report
            </Button>
          </div>

          {/* Overall condition */}
          <div className="rounded-xl p-5 flex items-start gap-4" style={{ backgroundColor: condCfg.bg }}>
            <Home className="w-8 h-8 flex-shrink-0 mt-0.5" style={{ color: condCfg.color }} />
            <div>
              <p className="font-heading text-gray-900 text-lg">{condCfg.label}</p>
              <p className="text-sm text-gray-600 mt-1">{result.summary}</p>
            </div>
          </div>

          {/* Issues */}
          {result.issues.length > 0 ? (
            <div>
              <h2 className="font-heading text-gray-900 mb-3">{result.issues.length} Issue{result.issues.length !== 1 ? "s" : ""} Detected</h2>
              <div className="space-y-3">
                {result.issues.map((issue, idx) => {
                  const cfg = SEVERITY_CONFIG[issue.severity] ?? SEVERITY_CONFIG.low;
                  const isExpanded = expandedIssue === idx;
                  return (
                    <div key={idx} className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: cfg.border }}>
                      <button className="w-full text-left p-4 flex items-center gap-3" onClick={() => setExpandedIssue(isExpanded ? null : idx)}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cfg.bg }}>
                          {issue.severity === "urgent" ? <AlertTriangle className="w-4 h-4" style={{ color: cfg.text }} /> : issue.severity === "moderate" ? <Clock className="w-4 h-4" style={{ color: cfg.text }} /> : <CheckCircle className="w-4 h-4" style={{ color: cfg.text }} />}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-900 text-sm">{issue.name}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: cfg.bg, color: cfg.text }}>{cfg.label}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{issue.tradeType}  {issue.estimatedCost}</p>
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                      </button>
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-0">
                          <p className="text-sm text-gray-600">{issue.description}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500"><DollarSign className="w-3.5 h-3.5" /><span>Est. {issue.estimatedCost}</span></div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500"><Wrench className="w-3.5 h-3.5" /><span>{issue.tradeType}</span></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-100 rounded-xl p-5 text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-900">No issues detected</p>
              <p className="text-sm text-gray-500 mt-1">Your home looks great! You can still request a pro for your project below.</p>
            </div>
          )}

          {/* Request a pro CTA */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h3 className="font-heading text-gray-900">Connect with a Verified Pro</h3>
            <p className="text-sm text-gray-500">
              {profileAddress
                ? <>Your address <strong>{profileAddress}</strong> is already on file.</>
                : "We'll use the address from your profile."}
              {" "}We'll match you with the best-fit professional for your project.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Your Name (optional)</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="Your name"
                  value={contactName}
                  onChange={e => setContactName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Phone (optional)</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="(214) 555-0100"
                  value={contactPhone}
                  onChange={e => setContactPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStage("upload")}>
                Re-scan Photos
              </Button>
              <Button
                className="flex-1 text-white gap-2"
                style={{ background: "linear-gradient(135deg, #00B5B8, #0A7A7C)" }}
                disabled={submitRequest.isPending}
                onClick={handleSubmitRequest}
              >
                {submitRequest.isPending
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                  : <><CheckCircle className="w-4 h-4" /> Request a Pro</>}
              </Button>
            </div>
          </div>
        </div>
      </HomeownerLayout>
    );
  }

  // -- Upload stage -----------------------------------------------------------

  if (stage === "upload") {
    return (
      <HomeownerLayout>
        <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <button onClick={() => setStage("intake")} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <ChevronDown className="w-4 h-4 rotate-90" />
            </button>
            <div>
              <h1 className="text-2xl font-heading text-gray-900">Upload Project Photos</h1>
              <p className="text-sm text-gray-500">Our AI will scan your photos and find the best-matched pro</p>
            </div>
          </div>

          {/* Photo tips -- collapsible */}
          <div className="rounded-xl border border-teal-100 overflow-hidden" style={{ backgroundColor: "#F0FDFA" }}>
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-teal-700"
              onClick={() => setShowTipsExpanded(!showTipsExpanded)}
            >
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                How to get the best AI scan results
              </div>
              {showTipsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showTipsExpanded && (
              <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PHOTO_TIPS.map((t, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-teal-100">
                      <t.icon className="w-3.5 h-3.5 text-teal-600" />
                    </div>
                    <p className="text-xs text-teal-800 leading-relaxed">{t.tip}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drop zone */}
          <div
            className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors hover:border-teal-400 hover:bg-teal-50/30"
            style={{ borderColor: photos.length > 0 ? "#00B5B8" : "#D1D5DB" }}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleFileSelect(e.dataTransfer.files); }}
          >
            <input ref={fileInputRef} type="file" accept="image/*" multiple capture="environment" className="hidden" onChange={(e) => handleFileSelect(e.target.files)} />
            <Upload className="w-10 h-10 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-700 font-semibold mb-1">Drop photos here or tap to browse</p>
            <p className="text-sm text-gray-400">Exterior, roof, gutters, fence, interior -- any area of concern</p>
            <p className="text-xs text-gray-300 mt-2">JPG, PNG, HEIC  Max 10MB each  Up to 5 photos</p>
          </div>

          {/* Photo strip */}
          {photos.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              {photos.map((photo, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <img src={photo.preview} alt="" className="w-full h-full object-cover" />
                  <button onClick={(e) => { e.stopPropagation(); removePhoto(idx); }} className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80">
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
              {photos.length < 5 && (
                <div className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-teal-400 transition-colors" onClick={() => fileInputRef.current?.click()}>
                  <span className="text-2xl text-gray-300">+</span>
                </div>
              )}
            </div>
          )}

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Shield, label: "Private & Secure",  desc: "Photos analyzed then deleted" },
              { icon: Zap,    label: "Instant Results",   desc: "AI scan in under 30 seconds" },
              { icon: Star,   label: "Verified Pros Only",desc: "Licensed & insured partners" },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                <item.icon className="w-5 h-5 mx-auto mb-1.5 text-teal-500" />
                <p className="text-xs font-semibold text-gray-700">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStage("intake")}>
              Back
            </Button>
            <Button
              className="flex-1 text-white gap-2"
              style={{ background: "linear-gradient(135deg, #00B5B8, #0A7A7C)" }}
              disabled={photos.length === 0 || uploading || analyzePhotos.isPending}
              onClick={handleScan}
            >
              {uploading
                ? <><Loader2 className="w-5 h-5 animate-spin" /> Uploading...</>
                : <><Sparkles className="w-5 h-5" /> Scan with AI -- Free</>}
            </Button>
          </div>

          {/* Skip scan option */}
          <div className="text-center">
            <button
              className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2"
              onClick={() => {
                setResult(null);
                setStage("results");
              }}
            >
              Skip AI scan -- just request a pro
            </button>
          </div>
        </div>
      </HomeownerLayout>
    );
  }

  // -- Intake stage (default) -------------------------------------------------

  return (
    <HomeownerLayout>
      <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-8">

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #00B5B8, #0A7A7C)" }}>
            <FolderOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-heading text-gray-900">New Project Request</h1>
            <p className="text-sm text-gray-500 mt-1">
              Tell us about your project -- then upload photos for our AI to find the perfect pro for you.
              {profileAddress && (
                <span className="ml-1 text-teal-600 font-medium">Your address ({profileAddress}) is already on file.</span>
              )}
            </p>
          </div>
        </div>

        {/* Step 1: Project type */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">What type of project is this?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PROJECT_TYPES.map((pt) => (
              <button
                key={pt.key}
                onClick={() => setProjectType(pt.key)}
                className="p-4 rounded-xl border-2 flex flex-col items-center gap-2 text-center transition-all hover:shadow-sm"
                style={{
                  borderColor: projectType === pt.key ? pt.color : "#E5E7EB",
                  backgroundColor: projectType === pt.key ? `${pt.color}10` : "#fff",
                }}
              >
                <pt.icon className="w-6 h-6" style={{ color: pt.color }} />
                <span className="text-xs font-semibold text-gray-800">{pt.label}</span>
                <span className="text-xs text-gray-400 leading-tight">{pt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Service category */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">What kind of pro do you need?</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {SERVICE_CATEGORIES.map((sc) => (
              <button
                key={sc.key}
                onClick={() => setCategory(sc.key)}
                className="p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 text-center transition-all hover:shadow-sm"
                style={{
                  borderColor: category === sc.key ? sc.color : "#E5E7EB",
                  backgroundColor: category === sc.key ? `${sc.color}10` : "#fff",
                }}
              >
                <sc.icon className="w-5 h-5" style={{ color: sc.color }} />
                <span className="text-xs font-medium text-gray-700 leading-tight">{sc.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Urgency */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">How urgent is this?</h2>
          <div className="space-y-2">
            {URGENCY_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setUrgency(opt.key)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all"
                style={{
                  borderColor: urgency === opt.key ? opt.color : "#E5E7EB",
                  backgroundColor: urgency === opt.key ? `${opt.color}10` : "#fff",
                }}
              >
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: opt.color }} />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-800">{opt.label}</span>
                  <span className="text-xs text-gray-400 ml-2">{opt.sub}</span>
                </div>
                {urgency === opt.key && <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: opt.color }} />}
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Budget */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Approximate budget range?</h2>
          <div className="flex flex-wrap gap-2">
            {BUDGET_OPTIONS.map((b) => (
              <button
                key={b.key}
                onClick={() => setBudget(b.key)}
                className="px-4 py-2 rounded-full border-2 text-sm font-medium transition-all"
                style={{
                  borderColor: budget === b.key ? "#00B5B8" : "#E5E7EB",
                  backgroundColor: budget === b.key ? "#E0F7F7" : "#fff",
                  color: budget === b.key ? "#0A7A7C" : "#6B7280",
                }}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 5: Description */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Describe your project <span className="text-gray-400 font-normal normal-case">(optional -- photos tell the story)</span></h2>
          <Textarea
            placeholder="e.g. The fence along the back yard has two broken panels and the gate won't close properly. Looking for a quote to repair or replace."
            value={description}
            onChange={(e) => { setDescription(e.target.value); setShowAiGuidance(false); setAiGuidance(null); }}
            rows={3}
            className="border-gray-200 resize-none text-sm"
          />
          {description.length >= 15 && !showAiGuidance && (
            <button
              type="button"
              onClick={() => improveDescription.mutate({ description, projectType, category })}
              disabled={improveDescription.isPending}
              className="mt-2 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              style={{ backgroundColor: '#EEF2FF', color: '#4F46E5' }}
            >
              {improveDescription.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              {improveDescription.isPending ? 'Analyzing...' : 'AI: Improve this description & get photo tips'}
            </button>
          )}
          {showAiGuidance && aiGuidance && (
            <div className="mt-3 rounded-xl border p-4 space-y-3" style={{ borderColor: '#C7D2FE', backgroundColor: '#EEF2FF' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" style={{ color: '#4F46E5' }} />
                  <span className="text-xs font-bold" style={{ color: '#4F46E5' }}>AI Improved Description</span>
                  <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold" style={{ backgroundColor: aiGuidance.qualityScore >= 7 ? '#D1FAE5' : aiGuidance.qualityScore >= 4 ? '#FEF3C7' : '#FEE2E2', color: aiGuidance.qualityScore >= 7 ? '#059669' : aiGuidance.qualityScore >= 4 ? '#D97706' : '#DC2626' }}>
                    Original: {aiGuidance.qualityScore}/10
                  </span>
                </div>
                <button onClick={() => setShowAiGuidance(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-white rounded-lg p-3 text-sm text-gray-700 border border-indigo-100">
                {aiGuidance.improvedDescription}
              </div>
              <button
                type="button"
                onClick={() => { setDescription(aiGuidance.improvedDescription); setShowAiGuidance(false); }}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
                style={{ backgroundColor: '#4F46E5' }}
              >
                Use this description
              </button>
              {aiGuidance.tips.length > 0 && (
                <div>
                  <p className="text-xs font-semibold mb-1.5" style={{ color: '#4F46E5' }}>📷 Photo tips for best AI results:</p>
                  <ul className="space-y-1">
                    {aiGuidance.tips.map((tip, i) => (
                      <li key={i} className="text-xs text-indigo-700 flex items-start gap-1.5">
                        <span className="mt-0.5">•</span>{tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {aiGuidance.missingInfo.length > 0 && (
                <div>
                  <p className="text-xs font-semibold mb-1.5" style={{ color: '#D97706' }}>❓ Consider adding:</p>
                  <ul className="space-y-1">
                    {aiGuidance.missingInfo.map((q, i) => (
                      <li key={i} className="text-xs text-amber-700 flex items-start gap-1.5">
                        <span className="mt-0.5">•</span>{q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <Button
            className="w-full h-12 text-white text-base font-semibold gap-2"
            style={{ background: "linear-gradient(135deg, #00B5B8, #0A7A7C)" }}
            disabled={!projectType && !category}
            onClick={() => setStage("upload")}
          >
            <Camera className="w-5 h-5" /> Continue -- Upload Photos
            <ArrowRight className="w-4 h-4 ml-auto" />
          </Button>
          <p className="text-center text-xs text-gray-400">
            No photos? You can still request a pro -- just skip the AI scan on the next step.
          </p>
        </div>

      </div>
    </HomeownerLayout>
  );
}
