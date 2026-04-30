import { useState, useRef } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Camera, Upload, X, Loader2, AlertTriangle, CheckCircle,
  Zap, Star, Home, DollarSign, Clock,
  ChevronDown, ChevronUp, Shield
} from "lucide-react";

const SEVERITY_CONFIG = {
  urgent: { label: "Urgent", bg: "#FEE2E2", text: "#DC2626", border: "#FCA5A5" },
  moderate: { label: "Soon", bg: "#FEF3C7", text: "#D97706", border: "#FCD34D" },
  low: { label: "When Ready", bg: "#D1FAE5", text: "#059669", border: "#6EE7B7" },
} as const;

const CONDITION_CONFIG = {
  excellent: { label: "Excellent Condition", color: "#059669", bg: "#D1FAE5" },
  good: { label: "Good Condition", color: "#0284C7", bg: "#E0F2FE" },
  fair: { label: "Fair Condition", color: "#D97706", bg: "#FEF3C7" },
  needs_attention: { label: "Needs Attention", color: "#DC2626", bg: "#FEE2E2" },
} as const;

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
  roomLabel?: string;
  photoQualityFlag?: "ok" | "too_dark" | "too_blurry" | "too_far" | "retake_needed";
  photoQualityNote?: string;
}

export default function HomeownerPhotos() {
  const [photos, setPhotos] = useState<Array<{ file: File; preview: string }>>([]);
  const [uploading, setUploading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { data: properties } = trpc.homeowner.getMyProperties.useQuery(undefined, { enabled: !!user });
  const primaryProperty = properties?.[0] as any;

  const analyzePhotos = trpc.trustyPro.analyzePhotos.useMutation({
    onSuccess: (data) => {
      setResult(data as ScanResult);
      setScanning(false);
      toast.success("Analysis complete!");
    },
    onError: (err) => {
      setScanning(false);
      toast.error("Analysis failed: " + err.message);
    },
  });



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
    setScanning(true);
    analyzePhotos.mutate({
      photoUrls: uploadedUrls,
      userId: user?.id,
      address: primaryProperty?.address ?? undefined,
      homeownerEmail: user?.email ?? undefined,
      homeownerName: user?.name ?? undefined,
    });
  };



  return (
    <HomeownerLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00B5B8, #0A7A7C)" }}>
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-heading text-gray-900">AI Home Scan</h1>
              <p className="text-sm text-gray-500">Upload photos -- our AI finds issues and matches you with trusted pros</p>
            </div>
          </div>
        </div>

        {!result ? (
          <>
            <div
              className="border-2 border-dashed rounded-xl p-8 text-center transition-colors"
              style={{ borderColor: photos.length > 0 ? "#00B5B8" : "#D1D5DB" }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleFileSelect(e.dataTransfer.files); }}
            >
              <Upload className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-700 font-semibold mb-1">Add photos of your home</p>
              <p className="text-sm text-gray-400 mb-4">Exterior, roof, gutters, fence, or any area of concern</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button type="button" onClick={() => cameraInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold active:scale-95 transition-all"
                  style={{ background: "linear-gradient(135deg, #00B5B8, #0A7A7C)" }}>
                  <Camera className="w-4 h-4" /> Take Photo
                </button>
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:border-teal-400 hover:text-teal-600 active:scale-95 transition-all">
                  <Upload className="w-4 h-4" /> Choose from Library
                </button>
              </div>
              <p className="text-xs text-gray-300 mt-3 hidden sm:block">or drag &amp; drop  ·  JPG, PNG, HEIC  ·  Max 10MB each</p>
              <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFileSelect(e.target.files)} />
              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFileSelect(e.target.files)} />
            </div>

            {photos.length > 0 && (
              <div className="mt-4 grid grid-cols-5 gap-2">
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

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: "Private & Secure", desc: "Photos analyzed then deleted" },
                { icon: Zap, label: "Instant Results", desc: "AI scan in under 30 seconds" },
                { icon: Star, label: "Verified Pros Only", desc: "Licensed & insured partners" },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                  <item.icon className="w-5 h-5 mx-auto mb-1.5 text-teal-500" />
                  <p className="text-xs font-semibold text-gray-700">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>

            <Button onClick={handleScan} disabled={photos.length === 0 || uploading || scanning} className="w-full mt-6 h-12 text-white text-base font-semibold" style={{ background: "linear-gradient(135deg, #00B5B8, #0A7A7C)" }}>
              {uploading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Uploading Photos...</> : scanning ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing Your Home...</> : <><Zap className="w-5 h-5 mr-2" /> Scan My Home -- Free</>}
            </Button>
          </>
        ) : (
          <div className="space-y-5">
            {/* Room label */}
            {result.roomLabel && (
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-sm font-semibold px-4 py-1.5 rounded-full">
                <Home className="w-4 h-4" /> {result.roomLabel}
              </div>
            )}

            {/* Photo quality warning */}
            {result.photoQualityFlag && result.photoQualityFlag !== "ok" && result.photoQualityNote && (
              <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3">
                <div className="text-xl flex-shrink-0">
                  {result.photoQualityFlag === "too_dark" ? "💡" : result.photoQualityFlag === "too_blurry" ? "📷" : "🔍"}
                </div>
                <div>
                  <p className="font-semibold text-amber-900 text-sm">Photo Quality Note</p>
                  <p className="text-amber-800 text-sm mt-0.5">{result.photoQualityNote}</p>
                </div>
              </div>
            )}

            <div className="rounded-xl p-5 flex items-start gap-4" style={{ backgroundColor: CONDITION_CONFIG[result.overallCondition]?.bg ?? "#F3F4F6" }}>
              <Home className="w-8 h-8 flex-shrink-0 mt-0.5" style={{ color: CONDITION_CONFIG[result.overallCondition]?.color ?? "#6B7280" }} />
              <div>
                <p className="font-heading text-gray-900 text-lg">{CONDITION_CONFIG[result.overallCondition]?.label ?? result.overallCondition}</p>
                <p className="text-sm text-gray-600 mt-1">{result.summary}</p>
              </div>
            </div>

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
                              <div className="flex items-center gap-1.5 text-xs text-gray-500"><Star className="w-3.5 h-3.5" /><span>Verified {issue.tradeType} pros available</span></div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <h3 className="font-heading text-gray-900 mb-1">No Issues Found</h3>
                <p className="text-sm text-gray-500">Your home looks great from these photos!</p>
              </div>
            )}

            {result.issues.length > 0 && (
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-teal-900 text-sm">Saved to Your Home Health Vault</p>
                  <p className="text-teal-700 text-xs mt-0.5">These results are saved to your profile. We'll use your contact info on file to connect you with verified pros for any issues you want addressed.</p>
                </div>
              </div>
            )}

            <Button variant="outline" onClick={() => { setResult(null); setPhotos([]); setSubmitted(false); }} className="w-full">
              Scan Different Photos
            </Button>
          </div>
        )}
      </div>
    </HomeownerLayout>
  );
}
