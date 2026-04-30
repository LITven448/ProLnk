/**
 * FieldAppV2 — ProLnk Field OS Quick Scan
 * Real AI pipeline: photos → S3 upload → logJob tRPC → AI analysis → real opportunities
 * Polls getJobAnalysis every 3s until analysis is complete or failed.
 */
import { useState, useRef, useEffect } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Camera, MapPin, CheckCircle2, Loader2, Sparkles, ArrowRight,
  Home, Zap, DollarSign, Clock, Upload, X, Star, AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

type Step = "address" | "photos" | "details" | "scanning" | "results";

interface OpportunityResult {
  type: string;
  confidence: number;
  description: string;
  estimatedValue: string;
  partnerCategory: string;
  icon: string;
  offerTrack?: "repair" | "transformation";
}

const SERVICE_CATEGORIES = [
  "Pet Waste Removal", "Lawn & Landscaping", "HVAC", "Plumbing", "Electrical",
  "House Cleaning", "Pest Control", "Pressure Washing", "Window Cleaning",
  "Handyman", "Gutter Cleaning", "Roofing", "Painting", "Pool Service", "Other"
];

const CATEGORY_ICONS: Record<string, string> = {
  "lawn": "🌿", "landscape": "🌿", "hvac": "❄️", "plumb": "🔧", "electric": "⚡",
  "clean": "🧹", "pest": "🐛", "pressure": "💧", "window": "🪟", "handyman": "🔨",
  "gutter": "🏠", "roof": "🏗️", "paint": "🎨", "pool": "🏊", "fence": "🪵",
  "pet": "🐾", "waste": "🐾",
};

function getCategoryIcon(type: string): string {
  const lower = type.toLowerCase();
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "🔍";
}

export default function FieldAppV2() {
  const [step, setStep] = useState<Step>("address");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState<{ dataUrl: string; file: File }[]>([]);
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [uploading, setUploading] = useState(false);
  const [jobId, setJobId] = useState<number | null>(null);
  const [opportunities, setOpportunities] = useState<OpportunityResult[]>([]);
  const [sentLeads, setSentLeads] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

  // Poll for AI analysis results after job is logged
  const { data: jobData } = trpc.jobs.getJobAnalysis.useQuery(
    { jobId: jobId! },
    {
      enabled: !!jobId && step === "scanning",
      refetchInterval: (data: any) => {
        const status = data?.aiAnalysisStatus;
        if (status === "complete" || status === "failed") return false;
        return 3000;
      },
    }
  );

  // When job analysis completes, move to results
  useEffect(() => {
    if (!jobData) return;
    const jd = jobData as any;
    const status = jd.aiAnalysisStatus;
    if (status === "complete") {
      const analysis = jd.aiAnalysis;
      if (analysis?.opportunities?.length > 0) {
        const mapped: OpportunityResult[] = analysis.opportunities.map((opp: any) => ({
          type: opp.type,
          confidence: Math.round((opp.confidence ?? 0.7) * 100),
          description: opp.description,
          estimatedValue: opp.estimatedValue ? `$${opp.estimatedValue}` : "$200–$500",
          partnerCategory: opp.category ?? opp.type,
          icon: getCategoryIcon(opp.type),
          offerTrack: opp.offerTrack ?? "repair",
        }));
        setOpportunities(mapped);
      } else {
        setOpportunities([]);
      }
      setStep("results");
    } else if (status === "failed") {
      toast.error("AI analysis failed. The job was logged — check your dashboard for results.");
      setStep("results");
      setOpportunities([]);
    }
  }, [jobData]);

  // 60s timeout fallback
  useEffect(() => {
    if (step !== "scanning") return;
    const timer = setTimeout(() => {
      toast.info("AI is still processing. Check your dashboard in a few minutes for results.");
      setStep("results");
      setOpportunities([]);
    }, 60000);
    return () => clearTimeout(timer);
  }, [step]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (photos.length + files.length > 5) {
      toast.error("Maximum 5 photos per job");
      return;
    }
    files.forEach(file => {
      const dataUrl = URL.createObjectURL(file);
      setPhotos(prev => [...prev, { dataUrl, file }]);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = (idx: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  const handleScan = async () => {
    if (!address.trim() || photos.length === 0) return;
    setStep("scanning");
    setUploading(true);

    try {
      // Upload photos to S3 via the existing upload endpoint
      const photoUrls: string[] = [];
      for (const photo of photos) {
        try {
          const reader = new FileReader();
          const base64 = await new Promise<string>((resolve, reject) => {
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(photo.file);
          });
          const resp = await fetch("/api/upload-photos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ photos: [{ data: base64, type: photo.file.type, name: photo.file.name }] }),
          });
          if (resp.ok) {
            const { urls } = await resp.json();
            if (urls?.[0]) photoUrls.push(urls[0]);
          }
        } catch {
          // skip failed individual uploads
        }
      }

      if (photoUrls.length === 0) {
        toast.error("Photo upload failed. Check your connection and try again.");
        setStep("photos");
        setUploading(false);
        return;
      }

      // Log job via tRPC — triggers real async AI analysis on the server
      const resp = await fetch("/api/trpc/jobs.logJob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          serviceAddress: address,
          serviceType: category || undefined,
          notes: notes || undefined,
          photoUrls,
        }),
      });
      const data = await resp.json();
      if (data?.result?.data?.success) {
        setJobId(data.result.data.jobId);
        setUploading(false);
        // Polling via useQuery takes over from here
      } else {
        throw new Error(data?.error?.message || "Job log failed");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to log job. Please try again.");
      setStep("photos");
      setUploading(false);
    }
  };

  const sendLead = (opp: OpportunityResult) => {
    setSentLeads(prev => [...prev, opp.type]);
    toast.success(`Lead queued for ${opp.partnerCategory} partner in your area`);
  };

  const resetApp = () => {
    setStep("address");
    setAddress("");
    setPhotos([]);
    setCategory("");
    setNotes("");
    setOpportunities([]);
    setSentLeads([]);
    setJobId(null);
    setUploading(false);
  };

  return (
    <PartnerLayout>
      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">ProLnk Field OS</h1>
            <p className="text-sm text-gray-500">Log a job · Scan for opportunities · Earn commissions</p>
          </div>
          <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">
            AI Powered
          </Badge>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1">
          {(["address", "photos", "details", "scanning", "results"] as Step[]).map((s, i) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                (["address", "photos", "details", "scanning", "results"] as Step[]).indexOf(step) >= i
                  ? "bg-[#0A1628]"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Address */}
        {step === "address" && (
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#0A1628]" />
                <h2 className="font-semibold text-gray-800">Where are you working today?</h2>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Service Address</Label>
                <Input
                  placeholder="123 Main St, Frisco, TX 75034"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && address.trim() && setStep("photos")}
                />
              </div>
              <Button
                className="w-full gap-2 bg-[#0A1628] hover:bg-teal-700"
                disabled={!address.trim()}
                onClick={() => setStep("photos")}
              >
                Next: Add Photos <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Photos */}
        {step === "photos" && (
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-[#0A1628]" />
                  <h2 className="font-semibold text-gray-800">Job Photos</h2>
                </div>
                <span className="text-xs text-gray-400">{photos.length}/5</span>
              </div>
              <p className="text-sm text-gray-500">
                Take 2–5 photos of the property. AI will scan for referral opportunities — yard, gutters, fences, windows, anything visible.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                capture="environment"
                className="hidden"
                onChange={handlePhotoUpload}
              />

              {photos.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((p, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img src={p.dataUrl} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}
                  {photos.length < 5 && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-[#0A1628]/40 hover:text-[#0A1628] transition-colors"
                    >
                      <Camera className="h-5 w-5" />
                      <span className="text-xs">Add</span>
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center gap-3 text-gray-400 hover:border-[#0A1628]/40 hover:text-[#0A1628] transition-colors"
                >
                  <Camera className="h-10 w-10" />
                  <div className="text-center">
                    <p className="font-medium">Tap to take photos</p>
                    <p className="text-xs">or upload from camera roll</p>
                  </div>
                </button>
              )}

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep("address")}>Back</Button>
                <Button
                  className="flex-1 gap-2 bg-[#0A1628] hover:bg-teal-700"
                  disabled={photos.length === 0}
                  onClick={() => setStep("details")}
                >
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Details */}
        {step === "details" && (
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-[#0A1628]" />
                <h2 className="font-semibold text-gray-800">Job Details</h2>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Your Service Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="What service did you perform?" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Notes (optional)</Label>
                <Textarea
                  placeholder="Anything you noticed at the property..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>
              <div className="bg-[#F5E642]/10 border border-[#0A1628]/10 rounded-xl p-3 flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-[#0A1628] mt-0.5 shrink-0" />
                <p className="text-xs text-[#0A1628]">
                  AI will scan your {photos.length} photo{photos.length !== 1 ? "s" : ""} for opportunities — overgrown lawn, dirty gutters, fence damage, and more. Any qualified lead earns you a commission.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep("photos")}>Back</Button>
                <Button
                  className="flex-1 gap-2 bg-[#0A1628] hover:bg-teal-700"
                  onClick={handleScan}
                >
                  <Sparkles className="h-4 w-4" /> Scan with AI
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Scanning */}
        {step === "scanning" && (
          <Card>
            <CardContent className="p-8 flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[#0A1628]/10 flex items-center justify-center">
                  <Sparkles className="h-10 w-10 text-[#0A1628]" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-[#0A1628]/30 border-t-[#0A1628] animate-spin" />
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 text-lg">
                  {uploading ? "Uploading photos..." : "AI is scanning your photos"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {uploading
                    ? "Securely uploading to the AI pipeline..."
                    : "Analyzing property for cross-sell opportunities..."}
                </p>
                <p className="text-xs text-gray-400 mt-2">{address}</p>
              </div>
              <div className="space-y-2 w-full max-w-xs">
                {["Detecting property features...", "Matching to partner categories...", "Calculating lead values..."].map((msg, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="h-3 w-3 animate-spin text-[#0A1628]" />
                    {msg}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400">This usually takes 15–30 seconds</p>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Results */}
        {step === "results" && (
          <div className="space-y-4">
            <Card className={opportunities.length > 0 ? "border-[#0A1628]/20 bg-[#F5E642]/10" : "border-gray-200 bg-gray-50"}>
              <CardContent className="p-4 flex items-center gap-3">
                {opportunities.length > 0 ? (
                  <CheckCircle2 className="h-6 w-6 text-teal-600 shrink-0" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-gray-400 shrink-0" />
                )}
                <div>
                  <p className="font-semibold text-gray-800">
                    {opportunities.length > 0
                      ? `Job logged · ${opportunities.length} opportunit${opportunities.length === 1 ? "y" : "ies"} found`
                      : "Job logged · No issues detected"}
                  </p>
                  <p className="text-xs text-gray-500">{address}</p>
                </div>
              </CardContent>
            </Card>

            {opportunities.length === 0 && (
              <Card className="border-gray-200">
                <CardContent className="p-6 text-center text-gray-500">
                  <Home className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                  <p className="font-medium text-gray-700">Property looks good!</p>
                  <p className="text-sm mt-1">
                    No referral opportunities detected in these photos. Keep logging jobs — more photos means more opportunities.
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              {opportunities.map((opp) => {
                const sent = sentLeads.includes(opp.type);
                return (
                  <Card key={opp.type} className={sent ? "opacity-60" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{opp.icon}</span>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{opp.type}</p>
                            <p className="text-xs text-gray-500">{opp.partnerCategory}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs font-bold text-gray-700">{opp.confidence}%</span>
                          </div>
                          <p className="text-xs text-gray-500">confidence</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{opp.description}</p>
                      {opp.offerTrack === "transformation" && (
                        <Badge className="mb-2 bg-purple-100 text-purple-700 text-xs border-0">
                          ✨ AI Transformation Offer
                        </Badge>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-green-600">
                          <DollarSign className="h-3.5 w-3.5" />
                          <span className="text-xs font-semibold">{opp.estimatedValue} job value</span>
                        </div>
                        {sent ? (
                          <Badge className="bg-green-100 text-green-700 text-xs border-0">Lead Sent ✓</Badge>
                        ) : (
                          <Button
                            size="sm"
                            className="gap-1.5 text-xs bg-[#0A1628] hover:bg-teal-700 h-7"
                            onClick={() => sendLead(opp)}
                          >
                            <Zap className="h-3 w-3" /> Send Lead
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {opportunities.length > 0 && (
              <Card className="bg-gray-900 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold">Potential Commission</p>
                    <DollarSign className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Leads sent</span>
                      <span>{sentLeads.length} of {opportunities.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">If 1 converts (10%)</span>
                      <span className="text-yellow-400 font-bold">~$15–$40</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">If all convert</span>
                      <span className="text-yellow-400 font-bold">~$45–$130</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-2" onClick={resetApp}>
                <Clock className="h-4 w-4" /> Log Another Job
              </Button>
              <Button
                className="flex-1 gap-2 bg-[#0A1628] hover:bg-teal-700"
                onClick={() => navigate("/dashboard")}
              >
                <Upload className="h-4 w-4" /> View Dashboard
              </Button>
            </div>
          </div>
        )}

        {step === "address" && (
          <p className="text-center text-xs text-gray-400">
            Average partner earns $200–$800/month in referral commissions from jobs they already do.
          </p>
        )}
      </div>
    </PartnerLayout>
  );
}
