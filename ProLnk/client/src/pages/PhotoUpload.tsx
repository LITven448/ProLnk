import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Camera, Upload, Zap, CheckCircle, AlertCircle, X, Image, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

export default function PhotoUpload() {
  const [jobId, setJobId] = useState<number | null>(null);
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [polling, setPolling] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { data: profile } = trpc.partners.getMyProfile.useQuery();
  const { data: jobData, refetch: refetchJob } = trpc.jobs.getJobAnalysis.useQuery(
    { jobId: jobId! },
    { enabled: !!jobId }
  );

  const logJobMutation = trpc.jobs.logJob.useMutation({
    onSuccess: (data) => {
      if (data?.jobId) {
        setJobId(data.jobId);
        setPolling(true);
      }
      setUploading(false);
    },
    onError: (err) => {
      setUploading(false);
      toast.error(err.message || "Failed to submit photos. Please try again.");
    },
  });

  // Poll for AI analysis results every 3 seconds until complete
  useEffect(() => {
    if (!polling || !jobId) return;
    pollIntervalRef.current = setInterval(async () => {
      const result = await refetchJob();
      const status = result.data?.aiAnalysisStatus;
      if (status === "complete" || status === "failed") {
        setPolling(false);
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        if (status === "failed") {
          toast.error("AI analysis failed. Please try again with different photos.");
        }
      }
    }, 3000);
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [polling, jobId]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newPhotos = Array.from(files).slice(0, 3 - photos.length).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...newPhotos].slice(0, 3));
  };

  const removePhoto = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAnalyze = async () => {
    if (!profile?.partner || photos.length === 0) return;
    setUploading(true);
    setJobId(null);

    try {
      const photoPayloads = await Promise.all(
        photos.map((p) => new Promise<{ data: string; type: string; name: string }>((resolve, reject) => {
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

      logJobMutation.mutate({
        serviceAddress: "DFW Area",
        serviceType: "General Service",
        notes: "Photo analysis job",
        photoUrls: urls,
      });
    } catch {
      setUploading(false);
      toast.error("Failed to upload photos. Please try again.");
    }
  };

  const handleReset = () => {
    setJobId(null);
    setPhotos([]);
    setPolling(false);
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
  };

  const confidenceColor = (c: number) =>
    c >= 0.8 ? "text-green-600 bg-green-50" : c >= 0.6 ? "text-yellow-600 bg-yellow-50" : "text-orange-600 bg-orange-50";

  // Parse AI analysis result from job data
  const analysisStatus = jobData?.aiAnalysisStatus;
  const rawResult = jobData?.aiAnalysisResult as unknown as {
    opportunities?: { type: string; description: string; confidence: number; estimatedValue?: number; category?: string }[];
    photoQuality?: string;
    analysisNotes?: string;
  } | null;
  const result = analysisStatus === "complete" && rawResult ? rawResult : null;

  const isProcessing = uploading || polling || analysisStatus === "processing";

  return (
    <PartnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F5E642]/10 flex items-center justify-center">
            <Camera className="w-5 h-5 text-[#0A1628]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Photo Analysis</h1>
            <p className="text-sm text-gray-500">Upload job photos and let AI find cross-sell opportunities for your partners</p>
          </div>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { step: "1", label: "Upload 1-3 photos", desc: "From any completed job", icon: <Upload className="w-4 h-4 text-[#0A1628]" /> },
            { step: "2", label: "AI scans the scene", desc: "Identifies 12+ opportunity types", icon: <Zap className="w-4 h-4 text-purple-600" /> },
            { step: "3", label: "Leads auto-route", desc: "Sent to matching partners", icon: <CheckCircle className="w-4 h-4 text-green-600" /> },
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-2">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-gray-900">{item.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Upload area */}
        {!result && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm font-semibold text-gray-900 mb-4">Upload Job Photos (up to 3)</p>

            {/* Drop zone */}
            <div
              onClick={() => !isProcessing && fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); if (!isProcessing) handleFiles(e.dataTransfer.files); }}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                isProcessing ? "border-gray-100 bg-gray-50 cursor-not-allowed" : "border-gray-200 cursor-pointer hover:border-[#0A1628]/40 hover:bg-[#F5E642]/10/30"
              }`}
            >
              <Image className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-600">Drop photos here or click to browse</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 10MB each  Max 3 photos</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {/* Photo previews */}
            {photos.length > 0 && (
              <div className="flex gap-3 mt-4">
                {photos.map((p, i) => (
                  <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                    <img src={p.preview} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                    {!isProcessing && (
                      <button
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
                {photos.length < 3 && !isProcessing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#0A1628]/40 hover:text-[#0A1628] transition-all"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={photos.length === 0 || isProcessing}
              className="mt-4 w-full py-3 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#0A1628" }}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {uploading ? "Uploading photos..." : "AI is analyzing your photos..."}
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Analyze Photos with AI
                </>
              )}
            </button>

            {polling && (
              <p className="text-xs text-center text-gray-400 mt-2">
                This usually takes 10-30 seconds. Please wait...
              </p>
            )}
          </div>
        )}

        {/* Processing state */}
        {isProcessing && !uploading && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-[#F5E642]/10 flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-6 h-6 text-[#0A1628] animate-spin" />
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-1">AI is analyzing your photos</p>
            <p className="text-xs text-gray-500">Scanning for home service opportunities across 12+ categories...</p>
            <div className="mt-4 flex items-center justify-center gap-1">
              {["Landscape", "HVAC", "Plumbing", "Roofing", "Painting"].map((cat, i) => (
                <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500" style={{ animationDelay: `${i * 0.2}s` }}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">AI Analysis Results</p>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  result.photoQuality === "good" ? "bg-green-50 text-green-700" :
                  result.photoQuality === "poor" ? "bg-yellow-50 text-yellow-700" :
                  "bg-red-50 text-red-700"
                }`}>
                  Photo quality: {result.photoQuality}
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs text-gray-400 hover:text-gray-600 underline"
                >
                  Analyze more
                </button>
              </div>
            </div>

            {!result.opportunities || result.opportunities.length === 0 ? (
              <div className="p-8 text-center">
                <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No opportunities detected in these photos</p>
                <p className="text-xs text-gray-400 mt-1">Try uploading photos that show the exterior, yard, or surrounding property</p>
                {result.analysisNotes && (
                  <p className="text-xs text-gray-400 mt-2 italic">{result.analysisNotes}</p>
                )}
                <button onClick={handleReset} className="mt-4 text-sm text-[#0A1628] hover:underline">
                  Try different photos
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {result.opportunities.map((opp, i) => (
                  <div key={i} className="flex items-start gap-4 p-4">
                    <div className="w-8 h-8 rounded-lg bg-[#F5E642]/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-[#0A1628]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 capitalize">{opp.type.replace(/_/g, " ")}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{opp.description}</p>
                      {opp.estimatedValue && (
                        <p className="text-xs text-[#0A1628] mt-1 font-medium">
                          Est. job value: ${opp.estimatedValue.toLocaleString()}
                        </p>
                      )}
                    </div>
                    <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${confidenceColor(opp.confidence)}`}>
                      {Math.round(opp.confidence * 100)}% confidence
                    </span>
                  </div>
                ))}
              </div>
            )}

            {result.opportunities && result.opportunities.length > 0 && (
              <div className="p-4 bg-[#F5E642]/10 border-t border-teal-100 flex items-center justify-between">
                <p className="text-xs text-[#0A1628] font-medium">
                   {result.opportunities.length} opportunit{result.opportunities.length === 1 ? "y" : "ies"} detected and routed to matching partners in your network
                </p>
                <button onClick={handleReset} className="text-xs text-[#0A1628] hover:underline font-medium">
                  Analyze more photos 
                </button>
              </div>
            )}
          </div>
        )}

        {/* Failed state */}
        {analysisStatus === "failed" && !polling && (
          <div className="bg-red-50 rounded-xl border border-red-200 p-6 text-center">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <p className="text-sm font-semibold text-red-700">Analysis failed</p>
            <p className="text-xs text-red-500 mt-1">The AI could not process these photos. Please try again with clearer images.</p>
            <button onClick={handleReset} className="mt-4 text-sm text-red-600 hover:underline">
              Try again
            </button>
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
