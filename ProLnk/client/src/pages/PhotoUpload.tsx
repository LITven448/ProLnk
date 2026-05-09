import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Camera, Upload, Zap, CheckCircle, AlertCircle, X, Image, Loader2, MapPin, Home } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

type Severity = "low" | "medium" | "high" | "urgent";

const SEVERITY_STYLES: Record<Severity, string> = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
};

const SEVERITY_ORDER: Record<Severity, number> = { urgent: 0, high: 1, medium: 2, low: 3 };

export default function PhotoUpload() {
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);
  const [propertyAddress, setPropertyAddress] = useState("");
  const [uploading, setUploading] = useState(false);
  const [originationClaimed, setOriginationClaimed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); if (!isAnalyzing) handleFiles(e.dataTransfer.files); }}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  isAnalyzing
                    ? "border-gray-100 bg-gray-50 cursor-not-allowed"
                    : "border-gray-200 cursor-pointer hover:border-[#0A1628]/40 hover:bg-[#F5E642]/5"
                }`}
              >
                <Image className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-600">Drop photos here or click to browse</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG — up to 10MB each · Max 10 photos</p>
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
            <div className="bg-[#0A1628] rounded-xl p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-2xl font-bold">{result.totalDetections}</p>
                  <p className="text-xs text-white/60 mt-0.5">Opportunities detected</p>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div>
                  <p className="text-2xl font-bold">{result.estimatedTotalValue}</p>
                  <p className="text-xs text-white/60 mt-0.5">Total estimated value</p>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div>
                  <p className="text-2xl font-bold">{result.photoCount}</p>
                  <p className="text-xs text-white/60 mt-0.5">Photos analyzed</p>
                </div>
              </div>
              <button onClick={handleReset} className="text-xs text-white/60 hover:text-white underline">
                New scan
              </button>
            </div>

            {/* Origination claim banner */}
            {originationClaimed && propertyAddress && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-800">Origination rights claimed</p>
                  <p className="text-xs text-green-700 mt-0.5">You now hold Home Origination rights for <strong>{propertyAddress}</strong>. You'll earn a permanent revenue share on all future ProLnk activity at this address.</p>
                </div>
              </div>
            )}

            {/* Detection cards */}
            {sortedDetections.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500 font-medium">No issues detected in these photos</p>
                <p className="text-xs text-gray-400 mt-1">Try photos showing exterior, roof, yard, or mechanical equipment for better results.</p>
                <button onClick={handleReset} className="mt-4 text-sm text-[#0A1628] hover:underline">Try different photos</button>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">Detected Opportunities — sorted by severity</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {sortedDetections.map((det, i) => (
                    <div key={i} className="flex items-start gap-4 p-4">
                      <span className={`flex-shrink-0 mt-0.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${SEVERITY_STYLES[det.severity as Severity] ?? SEVERITY_STYLES.low}`}>
                        {det.severity}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-gray-900">{det.category.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}</p>
                          <span className="text-xs text-gray-400 font-medium">{det.trade}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{det.description}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-xs font-semibold text-[#0A1628]">{det.estimatedJobValue}</span>
                          <span className="text-xs text-gray-400">{Math.round(det.confidence * 100)}% confidence</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-[#F5E642]/10 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-[#0A1628] font-medium">
                    {sortedDetections.length} opportunit{sortedDetections.length === 1 ? "y" : "ies"} identified — partner leads auto-routed in your network
                  </p>
                  <button onClick={handleReset} className="text-xs text-[#0A1628] hover:underline font-medium">Analyze more photos</button>
                </div>
              </div>
            )}
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
