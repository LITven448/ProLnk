import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Camera, Upload, Zap, CheckCircle, AlertCircle, X, Image, Loader2, MapPin, Home, ClipboardList, Shield, ArrowRight, Network, DollarSign } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

type Severity = "low" | "medium" | "high" | "urgent";

const SEVERITY_STYLES: Record<Severity, { badge: string; header: string; dot: string }> = {
  urgent: { badge: "bg-red-100 text-red-700 border border-red-200", header: "bg-red-50 border-b border-red-100 text-red-800", dot: "bg-red-500" },
  high:   { badge: "bg-orange-100 text-orange-700 border border-orange-200", header: "bg-orange-50 border-b border-orange-100 text-orange-800", dot: "bg-orange-500" },
  medium: { badge: "bg-yellow-100 text-yellow-700 border border-yellow-200", header: "bg-yellow-50 border-b border-yellow-100 text-yellow-800", dot: "bg-yellow-500" },
  low:    { badge: "bg-gray-100 text-gray-600 border border-gray-200", header: "bg-gray-50 border-b border-gray-100 text-gray-700", dot: "bg-gray-400" },
};

const SEVERITY_ORDER: Record<Severity, number> = { urgent: 0, high: 1, medium: 2, low: 3 };

const DETECTION_CATEGORIES = [
  { trade: "Roofing", items: ["Shingle damage", "Missing shingles", "Flashing failure", "Moss/algae growth", "Gutter separation", "Sagging ridge", "Chimney cracks", "Fascia rot"] },
  { trade: "HVAC", items: ["AC unit age", "Condenser condition", "Refrigerant leak signs", "Ductwork damage", "Air handler rust", "Clogged coils", "Outdoor unit debris"] },
  { trade: "Plumbing", items: ["Pipe corrosion", "Water stains", "Drain backup signs", "Hose bib damage", "Sump pump issues", "Water heater age", "Pressure valve wear"] },
  { trade: "Electrical", items: ["Panel age/condition", "Exposed wiring", "Meter condition", "Outdoor outlet damage", "Knob-and-tube signs", "Junction box issues"] },
  { trade: "Structural", items: ["Foundation cracks", "Wall bowing", "Beam deterioration", "Post settling", "Crawl space moisture", "Joist damage"] },
  { trade: "Siding", items: ["Warped panels", "Rot sections", "Paint peeling", "Caulk failure", "Impact damage", "Mold infiltration"] },
  { trade: "Windows", items: ["Seal failure", "Frame rot", "Glazing crack", "Sash damage", "Trim deterioration"] },
  { trade: "Landscaping", items: ["Drainage grading", "Tree proximity", "Root heave", "Erosion", "Overgrown vegetation"] },
  { trade: "Other", items: ["Pest entry points", "Deck condition", "Driveway cracks", "Walkway hazards", "Garage door wear", "Fence damage", "Pool equipment"] },
];

const TRADE_ICONS: Record<string, string> = {
  roofing: "🏚️",
  hvac: "❄️",
  plumbing: "🔧",
  electrical: "⚡",
  landscaping: "🌿",
  siding: "🏠",
  windows: "🪟",
  pest: "🐛",
  structural: "🏗️",
  foundation: "🪨",
  painting: "🎨",
  flooring: "🪵",
  insulation: "🌡️",
  gutters: "💧",
  fencing: "🏡",
  drywall: "🔨",
  garage: "🚗",
  deck: "🌳",
  chimney: "🏔️",
  appliance: "🏠",
  tree_service: "🌲",
  water_mitigation: "💦",
  general_contractor: "🔩",
  default: "🔧",
};

export default function PhotoUpload() {
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);
  const [propertyAddress, setPropertyAddress] = useState("");
  const [uploading, setUploading] = useState(false);
  const [originationClaimed, setOriginationClaimed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

  const scanMutation = trpc.photoIntelligence.scanMultiple.useMutation({
    onSuccess: (data) => {
      if (propertyAddress && data.totalDetections > 0) {
        setOriginationClaimed(true);
      }
    },
    onError: (err) => {
      toast.error(err.message || "Analysis failed. Please try again.");
    },
    onSettled: () => setUploading(false),
  });

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const incoming = Array.from(files)
      .filter(f => f.type.startsWith("image/"))
      .slice(0, 10 - photos.length);
    const next = incoming.map(file => ({ file, preview: URL.createObjectURL(file) }));
    setPhotos(prev => [...prev, ...next].slice(0, 10));
  };

  const removePhoto = (idx: number) => {
    setPhotos(prev => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const handleAnalyze = async () => {
    if (photos.length === 0) return;
    setUploading(true);
    scanMutation.reset();

    try {
      const photoPayloads = await Promise.all(
        photos.map(p => new Promise<{ data: string; type: string; name: string }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ data: reader.result as string, type: p.file.type, name: p.file.name });
          reader.onerror = reject;
          reader.readAsDataURL(p.file);
        }))
      );

      const uploadRes = await fetch("/api/upload-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photos: photoPayloads }),
      });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { urls } = await uploadRes.json() as { urls: string[] };

      scanMutation.mutate({
        photoUrls: urls,
        propertyAddress: propertyAddress.trim() || undefined,
      });
    } catch {
      setUploading(false);
      toast.error("Failed to upload photos. Please try again.");
    }
  };

  const handleReset = () => {
    photos.forEach(p => URL.revokeObjectURL(p.preview));
    setPhotos([]);
    setPropertyAddress("");
    setOriginationClaimed(false);
    scanMutation.reset();
  };

  const result = scanMutation.data;
  const isAnalyzing = uploading || scanMutation.isPending;
  const sortedDetections = result?.detections
    ? [...result.detections].sort((a, b) => SEVERITY_ORDER[a.severity as Severity] - SEVERITY_ORDER[b.severity as Severity])
    : [];

  const groupedDetections = sortedDetections.reduce((acc, det) => {
    const sev = det.severity as Severity;
    if (!acc[sev]) acc[sev] = [];
    acc[sev].push(det);
    return acc;
  }, {} as Record<Severity, typeof sortedDetections>);

  const highestSeverity = sortedDetections.length > 0 ? sortedDetections[0].severity : null;

  const getTradeIcon = (trade: string) => {
    const key = (trade ?? "").toLowerCase().replace(/\s+/g, "_").replace(/-/g, "_");
    return TRADE_ICONS[key] ?? TRADE_ICONS.default;
  };

  return (
    <PartnerLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F5E642]/10 flex items-center justify-center">
            <Camera className="w-5 h-5 text-[#0A1628]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Photo Analysis</h1>
            <p className="text-sm text-gray-500">Upload job-site photos — AI detects home condition issues across 65+ categories and generates partner leads</p>
          </div>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Upload photos", desc: "Up to 10 JPG/PNG from any job site", icon: <Upload className="w-4 h-4 text-[#0A1628]" /> },
            { label: "AI scans 65+ categories", desc: "GPT-4o Vision detects issues & values", icon: <Zap className="w-4 h-4 text-purple-600" /> },
            { label: "Claim origination rights", desc: "Address lock earns permanent revenue share", icon: <Home className="w-4 h-4 text-green-600" /> },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-2">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-gray-900">{item.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Lead generation flow */}
        {!result && (
          <div className="bg-gradient-to-r from-[#0A1628] to-[#0d1f3a] rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Network className="w-4 h-4 text-[#F5E642]" />
              <p className="text-sm font-semibold">How Photos Generate Partner Revenue</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { icon: <Camera className="w-3.5 h-3.5" />, label: "You upload photos" },
                { icon: <Zap className="w-3.5 h-3.5" />, label: "AI analyzes 65 categories" },
                { icon: <AlertCircle className="w-3.5 h-3.5" />, label: "Cross-trade issue detected" },
                { icon: <Network className="w-3.5 h-3.5" />, label: "Lead routed to your network" },
                { icon: <DollarSign className="w-3.5 h-3.5" />, label: "You earn 7% commission" },
              ].map((step, i, arr) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1.5">
                    <span className="text-[#F5E642]">{step.icon}</span>
                    <span className="text-xs font-medium">{step.label}</span>
                  </div>
                  {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-white/30 flex-shrink-0" />}
                </div>
              ))}
            </div>
            <p className="text-xs text-white/50 mt-3">When AI spots a roofing issue on your electrical job, a roofing lead is auto-routed to the roofer in your network — and you earn 7% when they accept it.</p>
          </div>
        )}

        {/* 65 detection categories */}
        {!result && (
          <details className="group bg-white rounded-xl border border-gray-200 overflow-hidden">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-500" />
                <p className="text-sm font-semibold text-gray-900">What ProLnk sees in your photos</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-medium">65 categories</span>
              </div>
              <span className="text-xs text-gray-400 group-open:hidden">Show all</span>
              <span className="text-xs text-gray-400 hidden group-open:inline">Hide</span>
            </summary>
            <div className="px-5 pb-5 pt-1">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {DETECTION_CATEGORIES.map(group => (
                  <div key={group.trade} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">{group.trade}</p>
                    <div className="flex flex-wrap gap-1">
                      {group.items.map(item => (
                        <span key={item} className="text-xs px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-600">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">GPT-4o Vision scans all categories simultaneously — results in under 30 seconds per photo.</p>
            </div>
          </details>
        )}

        {/* Upload form */}
        {!result && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            {/* Address input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">Property Address <span className="text-gray-400 font-normal">(optional — locks origination rights)</span></label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={propertyAddress}
                  onChange={e => setPropertyAddress(e.target.value)}
                  disabled={isAnalyzing}
                  placeholder="123 Main St, Dallas TX 75201"
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20 focus:border-[#0A1628] disabled:bg-gray-50 disabled:text-gray-400"
                />
              </div>
            </div>

            {/* Drop zone */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1.5">Job-Site Photos <span className="text-gray-400 font-normal">(up to 10)</span></p>
              <div
                onClick={() => !isAnalyzing && fileInputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); if (!isAnalyzing) setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={e => { e.preventDefault(); setIsDragging(false); if (!isAnalyzing) handleFiles(e.dataTransfer.files); }}
                className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${
                  isAnalyzing
                    ? "border-gray-100 bg-gray-50 cursor-not-allowed"
                    : isDragging
                    ? "border-[#0A1628] bg-[#F5E642]/10 scale-[1.01] shadow-md cursor-copy"
                    : "border-gray-200 cursor-pointer hover:border-[#0A1628]/40 hover:bg-[#F5E642]/5"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-all ${isDragging ? "bg-[#F5E642]/30" : "bg-gray-50"}`}>
                  <Upload className={`w-6 h-6 transition-colors ${isDragging ? "text-[#0A1628]" : "text-gray-300"}`} />
                </div>
                <p className={`text-sm font-semibold transition-colors ${isDragging ? "text-[#0A1628]" : "text-gray-600"}`}>
                  {isDragging ? "Drop to upload" : "Drop photos here or click to browse"}
                </p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP — up to 10MB each · Max 10 photos</p>
                <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
                  {["Roof", "HVAC", "Plumbing", "Electrical", "Foundation"].map(cat => (
                    <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{cat}</span>
                  ))}
                  <span className="text-xs text-gray-400">+60 more categories</span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="hidden"
                  onChange={e => handleFiles(e.target.files)}
                />
              </div>
            </div>

            {/* Previews */}
            {photos.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {photos.map((p, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                    <img src={p.preview} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                    {!isAnalyzing && (
                      <button
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
                {photos.length < 10 && !isAnalyzing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#0A1628]/40 hover:text-[#0A1628] transition-all"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={photos.length === 0 || isAnalyzing}
              className="w-full py-3 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#0A1628" }}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {uploading ? "Uploading photos..." : "AI analyzing across 65 categories..."}
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Analyze {photos.length > 0 ? `${photos.length} Photo${photos.length !== 1 ? "s" : ""}` : "Photos"} with GPT-4o Vision
                </>
              )}
            </button>
          </div>
        )}

        {/* Analyzing state */}
        {isAnalyzing && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-[#F5E642]/10 flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-6 h-6 text-[#0A1628] animate-spin" />
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-1">GPT-4o Vision is analyzing your photos</p>
            <p className="text-xs text-gray-500">Scanning 65+ categories: roofing, HVAC, plumbing, electrical, landscaping, and more...</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
              {["Roofing", "HVAC", "Plumbing", "Electrical", "Landscaping", "Siding", "Windows", "Pest", "Structural"].map(cat => (
                <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{cat}</span>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {result && !isAnalyzing && (
          <div className="space-y-4">
            {/* Summary bar */}
            <div className="bg-[#0A1628] rounded-2xl p-5 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-widest font-medium mb-1">Analysis Complete</p>
                  <p className="text-base font-semibold">
                    {result.totalDetections === 0 ? "No issues found" : `${result.totalDetections} opportunit${result.totalDetections === 1 ? "y" : "ies"} across ${result.photoCount} photo${result.photoCount !== 1 ? "s" : ""}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#F5E642]" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold">{result.totalDetections}</p>
                  <p className="text-xs text-white/60 mt-0.5">Detections</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold">{result.estimatedTotalValue}</p>
                  <p className="text-xs text-white/60 mt-0.5">Est. value</p>
                </div>
                <div className={`rounded-xl p-3 text-center ${
                  highestSeverity === "urgent" ? "bg-red-500/30" :
                  highestSeverity === "high" ? "bg-orange-500/20" :
                  highestSeverity === "medium" ? "bg-yellow-500/20" :
                  "bg-white/10"
                }`}>
                  <p className="text-2xl font-bold capitalize">{highestSeverity ?? "—"}</p>
                  <p className="text-xs text-white/60 mt-0.5">Top severity</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-3 py-2 font-medium"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload another
                </button>
                <p className="text-xs text-white/40 ml-auto">Leads auto-routed to your network</p>
              </div>
            </div>

            {/* Origination claim banner */}
            {originationClaimed && propertyAddress && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-800">Origination Rights Claimed</p>
                  <p className="text-xs text-green-700 mt-0.5">You now hold Home Origination rights for <strong>{propertyAddress}</strong>. You'll earn a permanent revenue share on all future ProLnk activity at this address.</p>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              </div>
            )}

            {/* Detection cards grouped by severity */}
            {sortedDetections.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500 font-medium">No issues detected in these photos</p>
                <p className="text-xs text-gray-400 mt-1">Try photos showing exterior, roof, yard, or mechanical equipment for better results.</p>
                <button onClick={handleReset} className="mt-4 text-sm text-[#0A1628] hover:underline">Try different photos</button>
              </div>
            ) : (
              <div className="space-y-3">
                {(["urgent", "high", "medium", "low"] as Severity[]).map(sev => {
                  const dets = groupedDetections[sev];
                  if (!dets?.length) return null;
                  const styles = SEVERITY_STYLES[sev];
                  return (
                    <div key={sev} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className={`flex items-center gap-2 px-4 py-2.5 ${styles.header}`}>
                        <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
                        <p className="text-xs font-semibold uppercase tracking-wide">{sev}</p>
                        <span className="text-xs opacity-70 ml-auto">{dets.length} issue{dets.length !== 1 ? "s" : ""}</span>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {dets.map((det, i) => {
                          const confidencePct = Math.round(det.confidence * 100);
                          const tradeIcon = getTradeIcon(det.trade);
                          return (
                            <div key={i} className="flex items-start gap-3 p-4">
                              <span className="text-xl flex-shrink-0 mt-0.5" title={det.trade}>{tradeIcon}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline gap-2 flex-wrap">
                                  <p className="text-sm font-semibold text-gray-900">{det.category.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}</p>
                                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${styles.badge}`}>{sev}</span>
                                  <span className="text-xs text-gray-400 capitalize ml-auto">{det.trade}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{det.description}</p>
                                <div className="flex items-center gap-3 mt-2">
                                  <span className="text-xs font-semibold text-[#0A1628]">{det.estimatedJobValue}</span>
                                  <div className="flex items-center gap-1.5 flex-1">
                                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-[80px]">
                                      <div
                                        className="h-full rounded-full bg-[#0A1628]/70 transition-all"
                                        style={{ width: `${confidencePct}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-gray-400">{confidencePct}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Log This Job CTA */}
            {sortedDetections.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Ready to log this job?</p>
                  <p className="text-xs text-gray-500 mt-0.5">Lock in origination rights and create a job record for this property.</p>
                </div>
                <button
                  onClick={() => navigate(`/job-log${propertyAddress ? `?address=${encodeURIComponent(propertyAddress)}` : ""}`)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium flex-shrink-0 transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#0A1628" }}
                >
                  <ClipboardList className="w-4 h-4" />
                  Log This Job
                </button>
              </div>
            )}

            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 text-sm font-medium text-gray-600 hover:border-[#0A1628]/40 hover:text-[#0A1628] hover:bg-[#F5E642]/5 transition-all"
            >
              <Upload className="w-4 h-4" />
              Upload another set of photos
            </button>
          </div>
        )}

        {/* Error state */}
        {scanMutation.isError && !isAnalyzing && (
          <div className="bg-red-50 rounded-xl border border-red-200 p-6 text-center">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <p className="text-sm font-semibold text-red-700">Analysis failed</p>
            <p className="text-xs text-red-500 mt-1">{scanMutation.error?.message || "Please try again with different photos."}</p>
            <button onClick={handleReset} className="mt-4 text-sm text-red-600 hover:underline">Try again</button>
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
