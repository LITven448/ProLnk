/**
 * Wave 47 + Wave 113 — Admin Property Timeline
 * Lists all unique service addresses, then drills into a full job history
 * per address: photos (lightbox + before/after tags), AI scan history tab, partner info.
 */
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin, Clock, Camera, Zap, TrendingUp, ChevronRight, ArrowLeft,
  Home, User, Phone, Mail, CheckCircle2, AlertCircle, Loader2, FileText,
  X, ChevronLeft, ChevronRight as ChevronRightIcon, Images, History,
} from "lucide-react";
import { Link } from "wouter";

function timeAgo(d: Date | string | null): string {
  if (!d) return "—";
  const diff = Date.now() - new Date(d).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function AiStatusBadge({ status }: { status: string | null }) {
  if (status === "complete") return (
    <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-xs gap-1">
      <CheckCircle2 className="w-3 h-3" /> AI Complete
    </Badge>
  );
  if (status === "processing") return (
    <Badge className="bg-blue-500/15 text-blue-400 border-blue-500/30 text-xs gap-1">
      <Loader2 className="w-3 h-3 animate-spin" /> Processing
    </Badge>
  );
  return (
    <Badge className="bg-slate-500/15 text-slate-400 border-slate-500/30 text-xs gap-1">
      <AlertCircle className="w-3 h-3" /> Pending
    </Badge>
  );
}

type Job = {
  id: number;
  partnerName: string | null;
  serviceAddress: string;
  serviceType: string | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  notes: string | null;
  photoUrls: string[] | null;
  aiAnalysisStatus: string | null;
  aiAnalysisResult: unknown;
  status: string | null;
  createdAt: Date | null;
};

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ photos, startIndex, onClose }: { photos: string[]; startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex);
  const prev = () => setIdx(i => (i - 1 + photos.length) % photos.length);
  const next = () => setIdx(i => (i + 1) % photos.length);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white/70 hover:text-white"
        onClick={onClose}
      >
        <X className="w-7 h-7" />
      </button>
      {photos.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            onClick={e => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            onClick={e => { e.stopPropagation(); next(); }}
          >
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        </>
      )}
      <img
        src={photos[idx]}
        alt={`Photo ${idx + 1}`}
        className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
        onClick={e => e.stopPropagation()}
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {idx + 1} / {photos.length}
      </div>
    </div>
  );
}

// ── Photo Gallery Tab ─────────────────────────────────────────────────────────
function PhotoGallery({ jobs }: { jobs: Job[] }) {
  const [lightbox, setLightbox] = useState<{ photos: string[]; idx: number } | null>(null);

  // Flatten all photos across jobs, preserving job context
  const allPhotos = jobs.flatMap(j => (j.photoUrls ?? []).map((url, i) => ({
    url,
    jobId: j.id,
    serviceType: j.serviceType ?? "General Service",
    partnerName: j.partnerName,
    createdAt: j.createdAt,
    // Derive tag from index: first photo = before, last = after, middle = during
    tag: i === 0 ? "Before" : i === (j.photoUrls?.length ?? 1) - 1 ? "After" : "During",
  })));

  const TAG_COLORS: Record<string, string> = {
    Before: "bg-blue-500/80 text-white",
    During: "bg-yellow-500/80 text-black",
    After: "bg-emerald-500/80 text-white",
  };

  if (allPhotos.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <Camera className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p>No photos uploaded for this property yet.</p>
      </div>
    );
  }

  return (
    <>
      {lightbox && (
        <Lightbox
          photos={lightbox.photos}
          startIndex={lightbox.idx}
          onClose={() => setLightbox(null)}
        />
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {allPhotos.map((p, i) => (
          <button
            key={i}
            className="relative aspect-video rounded-xl overflow-hidden bg-white/5 hover:ring-2 hover:ring-[#00B5B8] transition-all group"
            onClick={() => setLightbox({ photos: allPhotos.map(x => x.url), idx: i })}
          >
            <img src={p.url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute top-2 left-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${TAG_COLORS[p.tag]}`}>
                {p.tag}
              </span>
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs font-medium truncate">{p.serviceType}</p>
              <p className="text-slate-300 text-[10px]">{timeAgo(p.createdAt)}</p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

// ── AI Scan History Tab ───────────────────────────────────────────────────────
function AiScanHistory({ jobs }: { jobs: Job[] }) {
  const scanned = jobs.filter(j => j.aiAnalysisStatus === "complete" && j.aiAnalysisResult);

  if (scanned.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <Zap className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p>No AI scans completed for this property yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {scanned.map(job => {
        const analysis = job.aiAnalysisResult as {
          opportunities?: { type: string; confidence: number; description: string; estimatedValue: number }[];
          photoQuality?: string;
          summary?: string;
        } | null;
        const opps = analysis?.opportunities ?? [];
        const totalValue = opps.reduce((s, o) => s + (o.estimatedValue ?? 0), 0);

        return (
          <div key={job.id} className="rounded-xl border border-white/8 bg-white/3 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-white font-semibold text-sm">{job.serviceType ?? "General Service"}</p>
                <p className="text-slate-400 text-xs mt-0.5">{timeAgo(job.createdAt)} · {job.partnerName ?? "Unknown partner"}</p>
              </div>
              <div className="text-right">
                <p className="text-emerald-400 font-bold text-sm">${totalValue.toLocaleString()}</p>
                <p className="text-slate-500 text-xs">{opps.length} detection{opps.length !== 1 ? "s" : ""}</p>
              </div>
            </div>

            {analysis?.summary && (
              <p className="text-slate-300 text-xs mb-3 italic">"{analysis.summary}"</p>
            )}

            {analysis?.photoQuality && (
              <div className="mb-3">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Photo Quality: </span>
                <span className="text-xs text-slate-300 capitalize">{analysis.photoQuality}</span>
              </div>
            )}

            {opps.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Detected Opportunities</p>
                {opps.map((opp, i) => (
                  <div key={i} className="flex items-start justify-between bg-white/4 rounded-lg px-3 py-2 gap-3">
                    <div className="flex items-start gap-2 min-w-0">
                      <Zap className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-white text-xs font-medium">{opp.type}</p>
                        {opp.description && <p className="text-slate-400 text-[10px] mt-0.5 leading-relaxed">{opp.description}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-400">{Math.round(opp.confidence * 100)}%</span>
                      {opp.estimatedValue > 0 && (
                        <span className="text-xs text-emerald-400 font-semibold">${opp.estimatedValue.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Job Card ──────────────────────────────────────────────────────────────────
function JobCard({ job, onPhotoClick }: { job: Job; onPhotoClick: (photos: string[], idx: number) => void }) {
  const photos = job.photoUrls ?? [];
  const analysis = job.aiAnalysisResult as { opportunities?: { type: string; confidence: number; description: string; estimatedValue: number }[]; photoQuality?: string } | null;
  const opps = analysis?.opportunities ?? [];

  return (
    <div className="rounded-xl border border-white/8 bg-white/3 hover:bg-white/5 transition-colors overflow-hidden">
      {/* Photo strip — clickable */}
      {photos.length > 0 && (
        <div className="flex gap-1 p-2 pb-0">
          {photos.slice(0, 4).map((url, i) => (
            <button
              key={i}
              className="relative flex-1 aspect-video rounded-lg overflow-hidden bg-white/5 hover:ring-2 hover:ring-[#00B5B8] transition-all"
              onClick={() => onPhotoClick(photos, i)}
            >
              <img src={url} alt={`Job photo ${i + 1}`} className="w-full h-full object-cover" />
              {i === 3 && photos.length > 4 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold">
                  +{photos.length - 4}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white font-semibold text-sm truncate">
                {job.serviceType ?? "General Service"}
              </span>
              <AiStatusBadge status={job.aiAnalysisStatus} />
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
              {job.partnerName && (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" /> {job.partnerName}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {timeAgo(job.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Camera className="w-3 h-3" /> {photos.length} photo{photos.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Customer info */}
        {(job.customerName || job.customerEmail || job.customerPhone) && (
          <div className="flex flex-wrap gap-3 mb-3 text-xs text-slate-400">
            {job.customerName && <span className="flex items-center gap-1"><User className="w-3 h-3" />{job.customerName}</span>}
            {job.customerEmail && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{job.customerEmail}</span>}
            {job.customerPhone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{job.customerPhone}</span>}
          </div>
        )}

        {/* AI Opportunities */}
        {opps.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">AI Detected Opportunities</p>
            {opps.slice(0, 3).map((opp, i) => (
              <div key={i} className="flex items-center justify-between bg-white/4 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Zap className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="text-white text-xs truncate">{opp.type}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-400">{Math.round(opp.confidence * 100)}%</span>
                  {opp.estimatedValue > 0 && (
                    <span className="text-xs text-emerald-400 font-semibold">
                      ${opp.estimatedValue.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {opps.length > 3 && (
              <p className="text-xs text-slate-500 text-center">+{opps.length - 3} more opportunities</p>
            )}
          </div>
        )}

        {job.notes && (
          <p className="mt-2 text-xs text-slate-400 italic">"{job.notes}"</p>
        )}
      </div>
    </div>
  );
}

// ── Address Detail ────────────────────────────────────────────────────────────
function AddressDetail({ address, onBack }: { address: string; onBack: () => void }) {
  const { data: jobs, isLoading } = trpc.admin.getJobsByAddress.useQuery({ address });
  const [tab, setTab] = useState<"jobs" | "gallery" | "ai">("jobs");
  const [lightbox, setLightbox] = useState<{ photos: string[]; idx: number } | null>(null);

  const totalOpps = (jobs ?? []).reduce((sum, j) => {
    const a = j.aiAnalysisResult as { opportunities?: unknown[] } | null;
    return sum + (a?.opportunities?.length ?? 0);
  }, 0);

  const totalValue = (jobs ?? []).reduce((sum, j) => {
    const a = j.aiAnalysisResult as { opportunities?: { estimatedValue: number }[] } | null;
    return sum + (a?.opportunities ?? []).reduce((s, o) => s + (o.estimatedValue ?? 0), 0);
  }, 0);

  const allPhotos = (jobs ?? []).flatMap(j => j.photoUrls ?? []);

  const TABS = [
    { id: "jobs" as const, label: "Job History", icon: Clock },
    { id: "gallery" as const, label: `Gallery (${allPhotos.length})`, icon: Images },
    { id: "ai" as const, label: `AI Scans (${(jobs ?? []).filter(j => j.aiAnalysisStatus === "complete").length})`, icon: Zap },
  ];

  return (
    <div className="space-y-4">
      {lightbox && (
        <Lightbox
          photos={lightbox.photos}
          startIndex={lightbox.idx}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-bold text-lg truncate">{address}</h2>
          <p className="text-slate-400 text-sm">{jobs?.length ?? 0} jobs logged</p>
        </div>
        <Link href={`/admin/properties/${encodeURIComponent(address)}/report`}>
          <Button size="sm" className="gap-1.5 bg-[#00B5B8] hover:bg-[#009a9d] text-white shrink-0">
            <FileText className="w-3.5 h-3.5" /> Export Report
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Jobs", value: jobs?.length ?? 0, icon: Camera, color: "text-blue-400" },
          { label: "AI Detections", value: totalOpps, icon: Zap, color: "text-amber-400" },
          { label: "Est. Pipeline", value: `$${totalValue.toLocaleString()}`, icon: TrendingUp, color: "text-emerald-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-white/8 bg-white/3 p-3 text-center">
            <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
            <div className="text-white font-bold text-lg">{value}</div>
            <div className="text-slate-400 text-xs">{label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 rounded-xl p-1">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-lg transition-colors ${
              tab === t.id ? "bg-[#00B5B8] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <t.icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      ) : (
        <>
          {tab === "jobs" && (
            (jobs ?? []).length === 0 ? (
              <div className="text-center py-12 text-slate-400">No jobs found for this address.</div>
            ) : (
              <div className="space-y-3">
                {(jobs as Job[]).map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onPhotoClick={(photos, idx) => setLightbox({ photos, idx })}
                  />
                ))}
              </div>
            )
          )}
          {tab === "gallery" && <PhotoGallery jobs={(jobs ?? []) as Job[]} />}
          {tab === "ai" && <AiScanHistory jobs={(jobs ?? []) as Job[]} />}
        </>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PropertyTimeline() {
  const [search, setSearch] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const { data: addresses, isLoading } = trpc.admin.getUniqueAddresses.useQuery();

  const filtered = (addresses ?? []).filter(a =>
    a.serviceAddress?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {selectedAddress ? (
          <AddressDetail address={selectedAddress} onBack={() => setSelectedAddress(null)} />
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-white text-2xl font-black flex items-center gap-2">
                  <Home className="w-6 h-6 text-blue-400" /> Property Timeline
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  Every address ever serviced — full job history, AI detections, and pipeline value
                </p>
              </div>
              <Badge className="bg-blue-500/15 text-blue-400 border-blue-500/30">
                {addresses?.length ?? 0} properties
              </Badge>
            </div>

            {/* Search */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by address..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>

            {/* Address list */}
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                {search ? "No addresses match your search." : "No jobs logged yet."}
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map((addr) => (
                  <button
                    key={addr.serviceAddress}
                    onClick={() => setSelectedAddress(addr.serviceAddress)}
                    className="w-full text-left rounded-xl border border-white/8 bg-white/3 hover:bg-white/6 transition-colors p-4 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{addr.serviceAddress}</p>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-400">
                        <span>{addr.jobCount} job{Number(addr.jobCount) !== 1 ? "s" : ""}</span>
                        <span>Last: {timeAgo(addr.lastJobAt)}</span>
                        {addr.partnerName && <span>by {addr.partnerName}</span>}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
