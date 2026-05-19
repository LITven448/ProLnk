/**
 * Scout Assessment Wizard
 * Mobile-optimized step-by-step zone assessment tool.
 * Route: /dashboard/scout/new and /dashboard/scout/:assessmentId
 */

import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Home, Camera, CheckCircle, ChevronRight, ChevronLeft,
  Upload, AlertTriangle, Loader2, FileText, DollarSign,
} from "lucide-react";
import PartnerLayout from "@/components/PartnerLayout";

const ZONE_ICONS: Record<string, string> = {
  roof_gutters: "🏠", exterior_siding_foundation: "🧱", windows_doors: "🪟",
  hvac: "❄️", electrical: "⚡", plumbing: "🚿", appliances: "🏭",
  interior_rooms: "🛋️", attic: "🔺", crawlspace_basement: "⬇️", garage: "🚗", exterior_property: "🌿",
};

const CONDITION_COLORS: Record<string, string> = {
  good: "text-green-400",
  fair: "text-yellow-400",
  poor: "text-orange-400",
  critical: "text-red-400",
  not_applicable: "text-gray-500",
};

type WizardStep = "setup" | "zones" | "zone-detail" | "report";

export default function ScoutAssessmentWizard() {
  const params = useParams<{ assessmentId?: string }>();
  const [, navigate] = useLocation();
  const [step, setStep] = useState<WizardStep>(params.assessmentId ? "zones" : "setup");
  const [assessmentId, setAssessmentId] = useState<number | null>(params.assessmentId ? parseInt(params.assessmentId) : null);
  const [activeZone, setActiveZone] = useState<number | null>(null);
  const [setupForm, setSetupForm] = useState({
    propertyAddress: "",
    propertyZip: "",
    propertyCity: "",
    propertyState: "TX",
    homeownerName: "",
    homeownerEmail: "",
    propertyType: "single_family" as const,
    assessmentType: "residential" as const,
  });

  const zones = trpc.scout.getZones.useQuery();
  const assessment = trpc.scout.getAssessment.useQuery({ assessmentId: assessmentId! }, { enabled: !!assessmentId });
  const createAssessment = trpc.scout.createAssessment.useMutation({
    onSuccess: (data) => {
      setAssessmentId(data.assessmentId);
      setStep("zones");
      toast.success("Assessment started!");
    },
    onError: (e) => toast.error(e.message),
  });

  const submitZonePhotos = trpc.scout.submitZonePhotos.useMutation({
    onSuccess: (data) => {
      toast.success(`Zone analyzed: ${data.condition} · ${data.findingsCount} items found`);
      assessment.refetch();
      setActiveZone(null);
      setStep("zones");
    },
    onError: (e) => toast.error(e.message),
  });

  const generateReport = trpc.scout.generateReport.useMutation({
    onSuccess: (data) => {
      toast.success(`Report generated! Home Health Score: ${data.healthScore}/100`);
      setStep("report");
    },
    onError: (e) => toast.error(e.message),
  });

  const estimateEarnings = trpc.scout.estimateScoutEarnings.useQuery(
    { assessmentId: assessmentId! },
    { enabled: !!assessmentId && step === "report" }
  );

  // Handle photo upload (simplified — uses existing upload endpoint)
  const [zonePhotoUrls, setZonePhotoUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (files: FileList) => {
    setUploading(true);
    const photos = Array.from(files).slice(0, 8);
    const formData = new FormData();
    const photosData = await Promise.all(photos.map(async (f) => {
      const reader = new FileReader();
      return new Promise<{ data: string; type: string; name: string }>((resolve) => {
        reader.onload = (e) => resolve({ data: e.target?.result as string, type: f.type, name: f.name });
        reader.readAsDataURL(f);
      });
    }));
    try {
      const res = await fetch("/api/upload-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photos: photosData.map(p => ({ data: p.data.split(",")[1], type: p.type, name: p.name })) }),
      });
      const data = await res.json();
      if (data.urls) setZonePhotoUrls(prev => [...prev, ...data.urls]);
    } finally {
      setUploading(false);
    }
  };

  const activeZoneData = zones.data?.find(z => z.number === activeZone);
  const assessmentZones = assessment.data?.zones ?? [];
  const completedCount = assessmentZones.filter((z: any) => z.status === "complete").length;
  const totalZones = 12;

  if (step === "setup") {
    return (
      <PartnerLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-black text-white">New Home Assessment</h1>
            <p className="text-gray-400 text-sm mt-1">Start a ProLnk Scout whole-home assessment</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 space-y-4 border border-gray-700">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input placeholder="Property address *" value={setupForm.propertyAddress} onChange={e => setSetupForm(f => ({ ...f, propertyAddress: e.target.value }))} className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <Input placeholder="ZIP code" value={setupForm.propertyZip} onChange={e => setSetupForm(f => ({ ...f, propertyZip: e.target.value }))} className="bg-gray-700 border-gray-600 text-white" />
              <Input placeholder="City" value={setupForm.propertyCity} onChange={e => setSetupForm(f => ({ ...f, propertyCity: e.target.value }))} className="bg-gray-700 border-gray-600 text-white" />
              <Input placeholder="Homeowner name (optional)" value={setupForm.homeownerName} onChange={e => setSetupForm(f => ({ ...f, homeownerName: e.target.value }))} className="bg-gray-700 border-gray-600 text-white" />
              <Input type="email" placeholder="Homeowner email (optional)" value={setupForm.homeownerEmail} onChange={e => setSetupForm(f => ({ ...f, homeownerEmail: e.target.value }))} className="bg-gray-700 border-gray-600 text-white" />
            </div>
            <div className="flex gap-4">
              <select value={setupForm.propertyType} onChange={e => setSetupForm(f => ({ ...f, propertyType: e.target.value as any }))} className="flex-1 bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm">
                <option value="single_family">Single Family</option>
                <option value="condo">Condo</option>
                <option value="townhome">Townhome</option>
                <option value="multifamily">Multifamily</option>
                <option value="commercial">Commercial</option>
              </select>
              <select value={setupForm.assessmentType} onChange={e => setSetupForm(f => ({ ...f, assessmentType: e.target.value as any }))} className="flex-1 bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm">
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="multifamily">Multifamily</option>
              </select>
            </div>
            <Button
              className="w-full bg-teal-500 hover:bg-teal-400 text-white font-bold"
              disabled={!setupForm.propertyAddress || createAssessment.isPending}
              onClick={() => createAssessment.mutate(setupForm)}
            >
              {createAssessment.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Start Assessment
            </Button>
          </div>
        </div>
      </PartnerLayout>
    );
  }

  if (step === "zones") {
    return (
      <PartnerLayout>
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-black text-white">Assessment Progress</h1>
              <p className="text-gray-400 text-xs mt-0.5">{assessment.data?.assessment?.propertyAddress}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-teal-400">{completedCount}/{totalZones}</div>
              <div className="text-gray-500 text-xs">zones complete</div>
            </div>
          </div>

          <div className="w-full h-2 bg-gray-700 rounded-full">
            <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${(completedCount / totalZones) * 100}%` }} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(zones.data ?? []).map((zone) => {
              const zoneRecord = assessmentZones.find((z: any) => z.zoneNumber === zone.number);
              const status = zoneRecord?.status ?? "pending";
              return (
                <button
                  key={zone.number}
                  onClick={() => { setActiveZone(zone.number); setZonePhotoUrls([]); setStep("zone-detail"); }}
                  className={`rounded-xl p-4 text-left border transition-all ${
                    status === "complete" ? "bg-teal-500/10 border-teal-500/30" :
                    status === "in_progress" ? "bg-yellow-500/10 border-yellow-500/30" :
                    "bg-gray-800 border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <div className="text-2xl mb-2">{ZONE_ICONS[zone.name] ?? "🏠"}</div>
                  <div className="font-semibold text-white text-sm">{zone.label}</div>
                  <div className={`text-xs mt-1 ${status === "complete" ? "text-teal-400" : status === "in_progress" ? "text-yellow-400" : "text-gray-500"}`}>
                    {status === "complete" ? "✓ Complete" : status === "in_progress" ? "In progress" : "Not started"}
                  </div>
                </button>
              );
            })}
          </div>

          {completedCount >= 6 && (
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
              onClick={() => generateReport.mutate({ assessmentId: assessmentId! })}
              disabled={generateReport.isPending}
            >
              {generateReport.isPending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Generating Report...</> : <><FileText className="w-4 h-4 mr-2" />Generate Home Intelligence Report</>}
            </Button>
          )}
        </div>
      </PartnerLayout>
    );
  }

  if (step === "zone-detail" && activeZoneData) {
    return (
      <PartnerLayout>
        <div className="max-w-2xl mx-auto space-y-4">
          <button onClick={() => setStep("zones")} className="flex items-center gap-1 text-gray-400 text-sm hover:text-white">
            <ChevronLeft className="w-4 h-4" /> Back to zones
          </button>
          <div className="text-center">
            <div className="text-5xl mb-2">{ZONE_ICONS[activeZoneData.name] ?? "🏠"}</div>
            <h2 className="text-xl font-black text-white">{activeZoneData.label}</h2>
            <p className="text-gray-400 text-sm">Take photos of everything visible in this zone</p>
          </div>

          {/* Photo upload */}
          <div className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${zonePhotoUrls.length ? "border-teal-500/50 bg-teal-500/5" : "border-gray-600 hover:border-gray-500"}`}>
            <input type="file" multiple accept="image/*" capture="environment" className="hidden" id="zone-photos" onChange={e => e.target.files && handlePhotoUpload(e.target.files)} />
            <label htmlFor="zone-photos" className="cursor-pointer">
              {uploading ? (
                <><Loader2 className="w-8 h-8 text-teal-400 animate-spin mx-auto mb-2" /><p className="text-gray-400 text-sm">Uploading...</p></>
              ) : zonePhotoUrls.length ? (
                <><CheckCircle className="w-8 h-8 text-teal-400 mx-auto mb-2" /><p className="text-teal-400 font-semibold">{zonePhotoUrls.length} photo{zonePhotoUrls.length !== 1 ? "s" : ""} uploaded</p><p className="text-gray-500 text-xs mt-1">Tap to add more</p></>
              ) : (
                <><Camera className="w-8 h-8 text-gray-500 mx-auto mb-2" /><p className="text-white font-semibold">Take or upload photos</p><p className="text-gray-500 text-xs mt-1">Wide angle + detail shots · Multiple photos recommended</p></>
              )}
            </label>
          </div>

          <Button
            className="w-full bg-teal-500 hover:bg-teal-400 text-white font-bold h-12"
            disabled={!zonePhotoUrls.length || submitZonePhotos.isPending}
            onClick={() => assessmentId && submitZonePhotos.mutate({ assessmentId, zoneNumber: activeZoneData.number, photoUrls: zonePhotoUrls })}
          >
            {submitZonePhotos.isPending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Analyzing with AI...</> : "Analyze This Zone"}
          </Button>
        </div>
      </PartnerLayout>
    );
  }

  if (step === "report") {
    const report = generateReport.data;
    if (!report) return null;
    return (
      <PartnerLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className={`text-6xl font-black mb-2 ${report.healthScore >= 80 ? "text-green-400" : report.healthScore >= 60 ? "text-yellow-400" : "text-red-400"}`}>
              {report.healthScore}
            </div>
            <div className="text-gray-400 text-sm mb-4">Home Health Score (out of 100)</div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div><div className="text-red-400 font-bold">${(report.immediateActionCost ?? 0).toLocaleString()}</div><div className="text-gray-500 text-xs">Immediate</div></div>
              <div><div className="text-yellow-400 font-bold">${(report.routineMaintenanceCost ?? 0).toLocaleString()}</div><div className="text-gray-500 text-xs">Routine</div></div>
              <div><div className="text-gray-400 font-bold">${(report.deferredCost ?? 0).toLocaleString()}</div><div className="text-gray-500 text-xs">Deferred</div></div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">Executive Summary</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{report.executiveSummary}</p>
          </div>
          {estimateEarnings.data && (
            <div className="bg-teal-500/10 rounded-2xl p-6 border border-teal-500/20">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-teal-400" />
                <h3 className="font-semibold text-teal-400">Your Commission Potential</h3>
              </div>
              <div className="text-3xl font-black text-white">${estimateEarnings.data.estimatedScoutCommission.toLocaleString()}</div>
              <div className="text-gray-400 text-sm mt-1">if all {estimateEarnings.data.findingCount} findings result in closed jobs</div>
              <div className="text-gray-500 text-xs mt-2">Assessment fee separate · Origination commission auto-tracked · {estimateEarnings.data.tier} tier ({Math.round(estimateEarnings.data.commissionRate * 100)}% keep)</div>
            </div>
          )}
          <div className="flex gap-3">
            <Button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold" onClick={() => navigate(`/dashboard/bid-board/new?assessmentId=${assessmentId}`)}>
              Post to Bid Board
            </Button>
            <Button variant="outline" className="flex-1 border-gray-600 text-gray-300" onClick={() => navigate(`/dashboard/scout`)}>
              Back to Assessments
            </Button>
          </div>
        </div>
      </PartnerLayout>
    );
  }

  return null;
}
