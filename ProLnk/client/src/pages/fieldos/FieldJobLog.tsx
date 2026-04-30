/**
 * Field OS -- Job Log Tab (v4 -- Unified FOS Design System)
 * Teal #0D9488 (actions) | Lime #E8FF47 (money/CTA) | Navy #070D1A (bg)
 * GPS auto-fill (5s timeout), camera-first (up to 5), 800KB compression,
 * offline queue, real AI pipeline via logJob tRPC, 30s polling.
 */
import { useState, useRef, useCallback, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import imageCompression from "browser-image-compression";
import { FOS } from "./fosTokens";
import {
  Camera, MapPin, ChevronDown, X, CheckCircle2,
  Loader2, AlertCircle, Zap, Plus, WifiOff, RefreshCw,
  Clock, TrendingUp,
} from "lucide-react";

interface FieldJobLogProps {
  onSubmitSuccess: () => void;
  onQueueUpdate:   (count: number) => void;
}

const JOB_TYPES_BY_TRADE: Record<string, string[]> = {
  plumbing:     ["Leak Repair","Drain Cleaning","Water Heater","Pipe Replacement","Fixture Install"],
  roofing:      ["Roof Inspection","Shingle Repair","Gutter Cleaning","Storm Damage","Full Replacement"],
  hvac:         ["AC Service","Heating Repair","Filter Change","Duct Cleaning","New Install"],
  electrical:   ["Panel Inspection","Outlet Repair","Lighting Install","Wiring","Safety Check"],
  landscaping:  ["Lawn Mowing","Tree Trimming","Sprinkler Repair","Mulching","Cleanup"],
  painting:     ["Interior Paint","Exterior Paint","Touch-up","Pressure Wash","Staining"],
  cleaning:     ["Deep Clean","Move-out Clean","Window Cleaning","Carpet Clean","Pressure Wash"],
  pest_control: ["Inspection","Treatment","Termite Check","Rodent Control","Prevention"],
  fencing:      ["Fence Repair","New Fence","Gate Install","Staining","Post Replacement"],
  flooring:     ["Hardwood Repair","Tile Install","Carpet Repair","Grout Cleaning","Refinishing"],
  general:      ["Inspection","Maintenance","Repair","Installation","Consultation"],
};

type PhotoQuality = "good" | "retake" | "checking";
type PhotoTag = "before" | "after" | "during" | null;
interface CapturedPhoto { dataUrl: string; file: File; quality: PhotoQuality; compressed?: File; tag: PhotoTag; }
interface AIOpportunity { type: string; category: string; commission: number; confidence: number; description?: string; }

// Step indicator
function Steps({ current }: { current: 1 | 2 | 3 }) {
  const steps = [{ n: 1, label: "Location" }, { n: 2, label: "Photos" }, { n: 3, label: "Submit" }];
  return (
    <div className="flex items-center">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className={`flex items-center gap-1.5 transition-opacity ${s.n <= current ? "opacity-100" : "opacity-25"}`}>
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
              style={{
                background: s.n < current ? FOS.green :
                            s.n === current ? FOS.lime : FOS.ghost,
                color: s.n < current || s.n === current ? FOS.bg : FOS.faint,
              }}
            >
              {s.n < current ? "" : s.n}
            </div>
            <span
              className="text-[10px] font-semibold"
              style={{ color: s.n === current ? FOS.white : FOS.faint }}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className="w-7 h-px mx-2"
              style={{ background: s.n < current ? `${FOS.green}60` : FOS.ghost }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// AI Results Screen -- polls real data
function AIResultsScreen({
  jobId, photoCount, address, onReset, onNavigateToFeed,
}: {
  jobId: number; photoCount: number; address: string;
  onReset: () => void; onNavigateToFeed: () => void;
}) {
  const [pollCount, setPollCount]         = useState(0);
  const [opportunities, setOpportunities] = useState<AIOpportunity[] | null>(null);
  const [status, setStatus]               = useState<"processing" | "complete" | "failed" | "timeout">("processing");

  const { data: jobData } = trpc.jobs.getJobAnalysis.useQuery(
    { jobId },
    { enabled: status === "processing" && pollCount < 15, refetchInterval: status === "processing" ? 2000 : false }
  );

  useEffect(() => {
    if (!jobData) return;
    const aiStatus   = (jobData as { aiAnalysisStatus?: string }).aiAnalysisStatus;
    const aiAnalysis = (jobData as { aiAnalysis?: string | null }).aiAnalysis;

    if (aiStatus === "complete" && aiAnalysis) {
      try {
        const parsed = typeof aiAnalysis === "string" ? JSON.parse(aiAnalysis) : aiAnalysis;
        setOpportunities((parsed.opportunities ?? []).map((o: {
          type?: string; category?: string; estimatedValue?: number; confidence?: number; description?: string;
        }) => ({
          type:        o.type ?? "Opportunity",
          category:    o.category ?? "General",
          commission:  Math.round((o.estimatedValue ?? 500) * 0.08),
          confidence:  o.confidence ?? 0.75,
          description: o.description,
        })));
        setStatus("complete");
      } catch {
        setOpportunities([]);
        setStatus("complete");
      }
    } else if (aiStatus === "failed") {
      setOpportunities([]);
      setStatus("failed");
    } else {
      setPollCount(c => {
        const next = c + 1;
        if (next >= 15) setStatus("timeout");
        return next;
      });
    }
  }, [jobData]);

  const totalCommission = (opportunities ?? []).reduce((s, o) => s + o.commission, 0);

  return (
    <div className="flex flex-col min-h-full px-5 pt-8 pb-6 gap-6" style={{ background: FOS.bg }}>

      {/* Success header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: `${FOS.green}15`, border: `1px solid ${FOS.green}30` }}
        >
          <CheckCircle2 className="w-8 h-8" style={{ color: FOS.green }} />
        </div>
        <div>
          <h2 className="text-white text-2xl font-black">Job Logged!</h2>
          <p className="text-sm mt-1" style={{ color: FOS.muted }}>
            AI scanning {photoCount} photo{photoCount !== 1 ? "s" : ""}  {address.split(",")[0]}
          </p>
        </div>
      </div>

      {/* Processing */}
      {status === "processing" && (
        <div
          className="rounded-2xl p-5 flex flex-col items-center gap-3"
          style={{ background: FOS.surface, border: `1px solid ${FOS.teal}25` }}
        >
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin" style={{ color: FOS.teal }} />
            <p className="font-bold text-sm" style={{ color: FOS.teal }}>AI Analysis Running...</p>
          </div>
          <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ background: FOS.ghost }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${Math.min(95, (pollCount / 15) * 100)}%`,
                background: `linear-gradient(90deg, ${FOS.teal}, ${FOS.lime})`,
              }}
            />
          </div>
          <p className="text-xs" style={{ color: FOS.faint }}>GPT-4o Vision scanning for cross-trade opportunities...</p>
        </div>
      )}

      {/* Complete with results */}
      {status === "complete" && opportunities !== null && (
        <>
          {opportunities.length > 0 ? (
            <>
              {/* Commission banner */}
              <div
                className="rounded-2xl p-4 flex items-center justify-between"
                style={{ background: FOS.limeDim, border: `1px solid ${FOS.lime}25` }}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: FOS.lime }}>Potential Commission</p>
                  <p className="text-white text-3xl font-black mt-0.5">${totalCommission}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" style={{ color: FOS.lime }} />
                  <span className="text-sm font-bold" style={{ color: FOS.lime }}>
                    {opportunities.length} lead{opportunities.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Opportunity cards */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" style={{ color: FOS.teal }} />
                  <p className="text-sm font-bold" style={{ color: FOS.teal }}>
                    {opportunities.length} Opportunit{opportunities.length !== 1 ? "ies" : "y"} Detected
                  </p>
                </div>
                {opportunities.map((opp, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-4"
                    style={{ background: FOS.surface, border: `1px solid ${FOS.teal}20` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-white font-bold text-sm">{opp.type}</p>
                        <p className="text-xs mt-0.5" style={{ color: FOS.muted }}>{opp.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-base" style={{ color: FOS.lime }}>${opp.commission}</p>
                        <p className="text-[10px]" style={{ color: FOS.faint }}>est. commission</p>
                      </div>
                    </div>
                    {opp.description && (
                      <p className="text-xs mb-3 leading-relaxed" style={{ color: FOS.muted }}>{opp.description}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 rounded-full h-1 overflow-hidden" style={{ background: FOS.ghost }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${Math.round(opp.confidence * 100)}%`, background: FOS.teal }}
                        />
                      </div>
                      <span className="text-[10px] font-mono" style={{ color: FOS.faint }}>
                        {Math.round(opp.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={onNavigateToFeed}
                className="w-full py-4 rounded-2xl text-base font-black flex items-center justify-center gap-2 active:scale-95 transition-transform"
                style={{ background: FOS.teal, color: FOS.bg }}
              >
                <Zap className="w-5 h-5" /> View in AI Feed
              </button>
            </>
          ) : (
            <div
              className="rounded-2xl p-5 flex flex-col items-center gap-3 text-center"
              style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
            >
              <AlertCircle className="w-8 h-8" style={{ color: FOS.faint }} />
              <div>
                <p className="text-white font-bold">No Opportunities Found</p>
                <p className="text-sm mt-1" style={{ color: FOS.muted }}>
                  No cross-trade opportunities detected. Try capturing more detail next time.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Timeout / failed */}
      {(status === "failed" || status === "timeout") && (
        <div
          className="rounded-2xl p-5 flex flex-col items-center gap-3 text-center"
          style={{ background: FOS.surface, border: "1px solid rgba(249,115,22,0.25)" }}
        >
          <Clock className="w-8 h-8 text-orange-400" />
          <div>
            <p className="text-white font-bold">Analysis Taking Longer Than Expected</p>
            <p className="text-sm mt-1" style={{ color: FOS.muted }}>
              Your job was logged. AI analysis will complete in the background -- check the AI Feed shortly.
            </p>
          </div>
          <button
            onClick={onNavigateToFeed}
            className="flex items-center gap-2 text-sm font-bold"
            style={{ color: FOS.teal }}
          >
            <RefreshCw className="w-4 h-4" /> Check AI Feed
          </button>
        </div>
      )}

      <button
        onClick={onReset}
        className="w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2"
        style={{ background: FOS.surface, border: `1px solid ${FOS.border}`, color: FOS.muted }}
      >
        <Camera className="w-4 h-4" /> Log Another Job
      </button>
    </div>
  );
}

// Main component
// --- Job Detail Drawer -------------------------------------------------------
function JobDetailDrawer({ job, onClose }: { job: any; onClose: () => void }) {
  const aiResult = job.aiAnalysisResult as any;
  const opps     = aiResult?.opportunities ?? [];
  const photos   = (job.photoUrls ?? []) as string[];
  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: FOS.bg }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4 flex-shrink-0" style={{ borderBottom: `1px solid ${FOS.border}` }}>
        <div>
          <h3 className="text-white font-black text-lg">Job Detail</h3>
          <p className="text-xs mt-0.5 truncate max-w-[220px]" style={{ color: FOS.muted }}>{job.serviceAddress}</p>
        </div>
        <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: FOS.surface }}>
          <X className="w-5 h-5" style={{ color: FOS.muted }} />
        </button>
      </div>
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {/* Meta */}
        <div className="rounded-2xl p-4 space-y-2" style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: FOS.muted }}>Service Type</span>
            <span className="text-white text-xs font-bold">{job.serviceType ?? "General"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: FOS.muted }}>Date</span>
            <span className="text-white text-xs font-bold">{new Date(job.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: FOS.muted }}>AI Status</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{
              background: job.aiAnalysisStatus === "complete" ? "rgba(16,185,129,0.15)" : job.aiAnalysisStatus === "processing" ? "rgba(245,158,11,0.15)" : "rgba(107,114,128,0.15)",
              color: job.aiAnalysisStatus === "complete" ? FOS.green : job.aiAnalysisStatus === "processing" ? FOS.amber : FOS.muted,
            }}>{job.aiAnalysisStatus}</span>
          </div>
          {job.notes && (
            <div>
              <span className="text-xs block mb-1" style={{ color: FOS.muted }}>Notes</span>
              <p className="text-white text-xs leading-relaxed">{job.notes}</p>
            </div>
          )}
        </div>
        {/* Photos */}
        {photos.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: FOS.muted }}>Photos ({photos.length})</p>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((url: string, i: number) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden" style={{ background: FOS.surface }}>
                  <img src={url} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
        {/* AI Opportunities */}
        {opps.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: FOS.muted }}>AI Detected ({opps.length})</p>
            <div className="space-y-2">
              {opps.map((opp: any, i: number) => (
                <div key={i} className="rounded-2xl px-4 py-3 flex items-start gap-3" style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: FOS.limeDim }}>
                    <Zap className="w-3.5 h-3.5" style={{ color: FOS.lime }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-bold">{opp.type ?? opp.opportunityType ?? "Opportunity"}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: FOS.muted }}>{opp.description ?? opp.category ?? ""}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-black" style={{ color: FOS.lime }}>${Number(opp.commission ?? opp.referralCommissionAmount ?? 0).toFixed(0)}</p>
                    <p className="text-[9px]" style={{ color: FOS.faint }}>{Math.round((opp.confidence ?? 0.8) * 100)}% conf.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {job.aiAnalysisStatus === "complete" && opps.length === 0 && (
          <div className="rounded-2xl px-4 py-5 text-center" style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
            <CheckCircle2 className="w-6 h-6 mx-auto mb-2" style={{ color: FOS.green }} />
            <p className="text-white text-sm font-bold">No Issues Detected</p>
            <p className="text-xs mt-1" style={{ color: FOS.muted }}>AI scanned the photos — property looks good!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FieldJobLog({ onSubmitSuccess, onQueueUpdate }: FieldJobLogProps) {
  const { user }       = useAuth();
  const utils          = trpc.useUtils();
  const fileInputRef   = useRef<HTMLInputElement>(null);
  const [address,      setAddress]      = useState("");
  const [jobType,      setJobType]      = useState("");
  const [notes,        setNotes]        = useState("");
  const [photos,       setPhotos]       = useState<CapturedPhoto[]>([]);
  const [gpsLoading,   setGpsLoading]   = useState(false);
  const [gpsError,     setGpsError]     = useState("");
  const [submitting,   setSubmitting]   = useState(false);
  const [submittedId,  setSubmittedId]  = useState<number | null>(null);
  const [submitError,  setSubmitError]  = useState("");
  const [selectedJob,  setSelectedJob]  = useState<any | null>(null);
  const { data: myJobs } = trpc.partners.getMyJobs.useQuery();;

  useEffect(() => {
    const queue = JSON.parse(localStorage.getItem("fieldos_photo_queue") || "[]");
    onQueueUpdate(queue.length);
  }, [onQueueUpdate]);

  const trade       = ((user as { businessType?: string })?.businessType ?? "general").toLowerCase();
  const jobTypes    = JOB_TYPES_BY_TRADE[trade] ?? JOB_TYPES_BY_TRADE.general;
  const defaultType = jobTypes[0];
  const step: 1|2|3 = !address.trim() ? 1 : photos.length === 0 ? 2 : 3;

  const logJobMutation = trpc.jobs.logJob.useMutation({
    onSuccess: (data) => {
      utils.partners.getMyJobs.invalidate();
      utils.partners.getInboundOpportunities.invalidate();
      setSubmittedId((data as { jobId?: number }).jobId ?? -1);
      setSubmitting(false);
      onSubmitSuccess();
    },
    onError: (err) => {
      const queue = JSON.parse(localStorage.getItem("fieldos_photo_queue") || "[]");
      queue.push({ address, jobType: jobType || defaultType, notes, timestamp: Date.now() });
      localStorage.setItem("fieldos_photo_queue", JSON.stringify(queue));
      onQueueUpdate(queue.length);
      setSubmitError(err.message || "Failed to submit. Saved to offline queue.");
      setSubmitting(false);
    },
  });

  const getGPS = useCallback(() => {
    setGpsLoading(true);
    setGpsError("");
    let resolved = false;
    const timeout = setTimeout(() => {
      if (!resolved) { resolved = true; setGpsLoading(false); setGpsError("GPS timed out -- type the address manually"); }
    }, 5000);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        if (resolved) return;
        resolved = true; clearTimeout(timeout);
        try {
          const { latitude, longitude } = pos.coords;
          const resp = await fetch(`/api/maps/geocode?latlng=${latitude},${longitude}`);
          if (resp.ok) {
            const d = await resp.json();
            setAddress(d?.results?.[0]?.formatted_address ?? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
          } else {
            setAddress(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
          }
        } catch { setAddress("GPS location captured"); }
        setGpsLoading(false);
      },
      () => {
        if (resolved) return;
        resolved = true; clearTimeout(timeout);
        setGpsError("GPS unavailable -- type the address manually");
        setGpsLoading(false);
      },
      { timeout: 4500, enableHighAccuracy: true }
    );
  }, []);

  const handlePhotoCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 5 - photos.length);
    for (const file of files) {
      const dataUrl = URL.createObjectURL(file);
      setPhotos(prev => [...prev, { dataUrl, file, quality: "checking", tag: null }]);
      const quality: PhotoQuality = file.size > 40000 ? "good" : "retake";
      let compressed = file;
      try {
        compressed = await imageCompression(file, { maxSizeMB: 0.8, maxWidthOrHeight: 1920, useWebWorker: true, initialQuality: 0.85 });
      } catch { /* use original */ }
      setPhotos(prev => prev.map(p => p.dataUrl === dataUrl ? { ...p, quality, compressed } : p));
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!address.trim() || photos.length === 0) return;
    setSubmitting(true); setSubmitError("");
    const photoUrls: string[] = [];
    for (const photo of photos) {
      try {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(photo.compressed ?? photo.file);
        });
        const resp = await fetch("/api/upload-photos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ photos: [{ data: base64, type: photo.file.type, name: photo.file.name }] }),
        });
        if (resp.ok) { const { urls } = await resp.json(); if (urls?.[0]) photoUrls.push(urls[0]); }
      } catch { /* skip */ }
    }
    if (photoUrls.length === 0) { setSubmitError("Photo upload failed. Check your connection."); setSubmitting(false); return; }
    logJobMutation.mutate({ serviceAddress: address, serviceType: jobType || defaultType, notes, photoUrls });
  };

  const handleReset = () => {
    setAddress(""); setJobType(""); setNotes("");
    setPhotos([]); setSubmittedId(null); setSubmitError("");
  };

  if (submittedId !== null) {
    return (
      <AIResultsScreen
        jobId={submittedId}
        photoCount={photos.length}
        address={address}
        onReset={handleReset}
        onNavigateToFeed={onSubmitSuccess}
      />
    );
  }

  return (
    <>
    <div className="flex flex-col min-h-full px-5 pt-6 pb-6 gap-5" style={{ background: FOS.bg }}>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl font-black">Log a Job</h2>
          <p className="text-xs mt-0.5" style={{ color: FOS.faint }}>AI scans photos for referral opportunities</p>
        </div>
        <Steps current={step} />
      </div>

      {/* Address */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: FOS.muted }}>
          Job Address
        </label>
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="123 Main St, Dallas TX..."
            className="w-full rounded-xl pl-4 pr-24 py-3.5 text-white text-sm placeholder:text-gray-700 focus:outline-none"
            style={{ background: FOS.surface, border: `1px solid ${FOS.border}`, color: FOS.white }}
          />
          <button
            onClick={getGPS}
            disabled={gpsLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-bold disabled:opacity-50"
            style={{ background: FOS.tealDim, border: `1px solid ${FOS.teal}30`, color: FOS.teal }}
          >
            {gpsLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <MapPin className="w-3 h-3" />}
            {gpsLoading ? "Locating..." : "GPS"}
          </button>
        </div>
        {gpsError && (
          <p className="text-orange-400 text-xs flex items-center gap-1.5">
            <AlertCircle className="w-3 h-3 shrink-0" /> {gpsError}
          </p>
        )}
      </div>

      {/* Job Type */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: FOS.muted }}>Job Type</label>
        <div className="relative">
          <select
            value={jobType || defaultType}
            onChange={e => setJobType(e.target.value)}
            className="w-full rounded-xl px-4 py-3.5 text-white text-sm appearance-none focus:outline-none"
            style={{ background: FOS.surface, border: `1px solid ${FOS.border}`, color: FOS.white }}
          >
            {jobTypes.map(t => <option key={t} value={t} style={{ background: FOS.surface }}>{t}</option>)}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: FOS.faint }} />
        </div>
      </div>

      {/* Photos */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: FOS.muted }}>
            Photos <span style={{ color: FOS.faint }}>({photos.length}/5)</span>
          </label>
          {photos.some(p => p.quality === "retake") && (
            <span className="text-orange-400 text-[10px] font-semibold">Some photos may be too dark</span>
          )}
        </div>

        {photos.length === 0 ? (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed rounded-2xl py-10 flex flex-col items-center gap-2 active:scale-95 transition-transform"
            style={{ background: FOS.tealDim, borderColor: `${FOS.teal}40` }}
          >
            <Camera className="w-10 h-10" style={{ color: FOS.teal }} />
            <p className="font-black text-sm" style={{ color: FOS.teal }}>Take Photos</p>
            <p className="text-xs" style={{ color: FOS.faint }}>Up to 5 photos  Auto-compressed to 800KB</p>
          </button>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {photos.map((photo) => (
              <div key={photo.dataUrl} className="relative aspect-square rounded-xl overflow-hidden">
                <img src={photo.dataUrl} alt="" className="w-full h-full object-cover" />
                {/* Quality badge */}
                <div
                  className="absolute top-1.5 left-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-black"
                  style={{
                    background: photo.quality === "good"   ? `${FOS.green}E6` :
                                photo.quality === "retake" ? "rgba(249,115,22,0.9)" :
                                "rgba(55,65,81,0.9)",
                    color: FOS.bg,
                  }}
                >
                  {photo.quality === "good" ? "✓ Good" : photo.quality === "retake" ? "Retake?" : "..."}
                </div>
                {/* Before / During / After tag cycle */}
                <button
                  onClick={() => {
                    const cycle: (PhotoTag)[] = ["before", "during", "after", null];
                    const next = cycle[(cycle.indexOf(photo.tag) + 1) % cycle.length];
                    setPhotos(prev => prev.map(p => p.dataUrl === photo.dataUrl ? { ...p, tag: next } : p));
                  }}
                  className="absolute bottom-1.5 left-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-black transition-all active:scale-90"
                  style={{
                    background: photo.tag === "before" ? "rgba(59,130,246,0.92)" :
                                photo.tag === "during" ? "rgba(234,179,8,0.92)" :
                                photo.tag === "after"  ? "rgba(34,197,94,0.92)" :
                                "rgba(55,65,81,0.7)",
                    color: "#fff",
                  }}
                  title="Tap to tag: Before / During / After"
                >
                  {photo.tag ?? "Tag"}
                </button>
                <button
                  onClick={() => setPhotos(prev => prev.filter(p => p.dataUrl !== photo.dataUrl))}
                  className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
            {photos.length < 5 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
                style={{ background: FOS.surface, border: `2px dashed ${FOS.border}` }}
              >
                <Plus className="w-5 h-5" style={{ color: FOS.faint }} />
                <span className="text-[10px]" style={{ color: FOS.faint }}>Add</span>
              </button>
            )}
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          className="hidden"
          onChange={handlePhotoCapture}
        />
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: FOS.muted }}>
          Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Any observations about the property..."
          rows={2}
          className="rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-700 focus:outline-none resize-none"
          style={{ background: FOS.surface, border: `1px solid ${FOS.border}`, color: FOS.white }}
        />
      </div>

      {/* Error */}
      {submitError && (
        <div className="flex items-start gap-2 rounded-xl px-4 py-3" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)" }}>
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-red-400 text-xs">{submitError}</p>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!address.trim() || photos.length === 0 || submitting || photos.some(p => p.quality === "checking")}
        className="w-full py-4 rounded-2xl text-base font-black active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-30"
        style={{ background: FOS.lime, color: FOS.bg }}
      >
        {submitting
          ? <><Loader2 className="w-5 h-5 animate-spin" /> Uploading &amp; Scanning...</>
          : <><Zap className="w-5 h-5" /> Submit &amp; Scan with AI</>
        }
      </button>

      {!navigator.onLine && (
        <div className="flex items-center gap-2 text-xs justify-center text-orange-400">
          <WifiOff className="w-3 h-3" /> Offline -- will sync when connected
        </div>
      )}

      {photos.length > 0 && (
        <p className="text-[10px] text-center" style={{ color: FOS.faint }}>
          {photos.filter(p => p.quality === "good").length}/{photos.length} photos ready  auto-compressed
        </p>
      )}

      {/* -- Job History -- */}
      {(myJobs ?? []).length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: FOS.muted }}>Recent Jobs</p>
            <span className="text-[10px]" style={{ color: FOS.faint }}>{(myJobs ?? []).length} total</span>
          </div>
          <div className="space-y-2">
            {(myJobs ?? []).slice(0, 5).map((job: any) => (
              <button
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="w-full rounded-2xl px-4 py-3 flex items-center gap-3 active:scale-95 transition-transform text-left"
                style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                  background: job.aiAnalysisStatus === "complete" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)"
                }}>
                  {job.aiAnalysisStatus === "complete"
                    ? <CheckCircle2 className="w-4 h-4" style={{ color: FOS.green }} />
                    : <Clock className="w-4 h-4" style={{ color: FOS.amber }} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-bold truncate">{job.serviceAddress}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: FOS.muted }}>
                    {job.serviceType ?? "General"} · {new Date(job.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
                <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" style={{ color: FOS.faint }} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>

    {selectedJob && <JobDetailDrawer job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </>
  );
}
