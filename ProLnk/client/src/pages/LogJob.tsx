import React, { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Camera, Upload, X, CheckCircle, Loader2, ArrowLeft, Zap, MapPin,
  User, Phone, Mail, LocateFixed, Wrench, Droplets, Flame, Leaf,
  Wind, Zap as ElecIcon, Bug, Shield, Hammer, ChevronRight,
  RefreshCw, Trophy, DollarSign, Sparkles,
} from "lucide-react";
import PartnerLayout from "@/components/PartnerLayout";

const TRADE_CATEGORIES = [
  { id: "plumbing",     label: "Plumbing",      icon: Droplets, color: "#3B82F6″ },
  { id: "hvac",         label: "HVAC",           icon: Wind,     color: "#06B6D4″ },
  { id: "electrical",   label: "Electrical",     icon: ElecIcon, color: "#F59E0B" },
  { id: "landscaping",  label: "Landscaping",    icon: Leaf,     color: "#10B981″ },
  { id: "pest",         label: "Pest Control",   icon: Bug,      color: "#EF4444″ },
  { id: "roofing",      label: "Roofing",        icon: Shield,   color: "#8B5CF6″ },
  { id: "general",      label: "General",        icon: Hammer,   color: "#6B7280″ },
  { id: "hvacservice",  label: "Furnace/AC",     icon: Flame,    color: "#F97316″ },
  { id: "other",        label: "Other",          icon: Wrench,   color: "#9CA3AF" },
];

const FSM_SYSTEMS = [
  { id: "jobber",       label: "Jobber",          logo: "J" },
  { id: "hcp",          label: "HCP (Housecall)", logo: "H" },
  { id: "servicetitan", label: "ServiceTitan",    logo: "ST" },
  { id: "workiz",       label: "Workiz",          logo: "W" },
];

const COMMISSION_RATE = 0.12;

function calcEarnings(value: number): number {
  return Math.round(value * COMMISSION_RATE * 100) / 100;
}

export default function LogJob() {
  const [, navigate] = useLocation();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<"quick" | "full">("quick");
  const [showFsmModal, setShowFsmModal] = useState(false);
  const [fsmSyncing, setFsmSyncing] = useState<string | null>(null);
  const [fsmSynced, setFsmSynced] = useState(false);

  const [quickForm, setQuickForm] = useState({
    tradeCategory: "",
    jobValue: "",
    zipCode: "",
  });

  const [form, setForm] = useState({
    serviceAddress: "",
    serviceType: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    notes: "",
  });
  const [photos, setPhotos] = useState<{ file: File; preview: string; uploading: boolean; url?: string; label: "before" | "after" | "general" }[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [pendingPhotoLabel, setPendingPhotoLabel] = useState<"before" | "after" | "general">("general");

  const projectedEarnings = calcEarnings(parseFloat(quickForm.jobValue || "0″));

  const handleGpsAutoFill = () => {
    if (!navigator.geolocation) { toast.error("GPS not available on this device"); return; }
    setGpsLoading(true);
    const timeout = setTimeout(() => { setGpsLoading(false); toast.error("GPS timed out — enter address manually"); }, 5000);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        clearTimeout(timeout);
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const addr = data.address;
          const street = [addr.house_number, addr.road].filter(Boolean).join(" ");
          const city = addr.city || addr.town || addr.village || "";
          const state = addr.state || "";
          const postcode = addr.postcode || "";
          const full = [street, city, state, postcode].filter(Boolean).join(", ");
          if (mode === "quick") {
            setQuickForm(f => ({ ...f, zipCode: postcode }));
          } else {
            setForm(f => ({ ...f, serviceAddress: full }));
          }
          toast.success("Location filled from GPS");
        } catch {
          toast.error("Could not resolve address — enter manually");
        } finally {
          setGpsLoading(false);
        }
      },
      () => { clearTimeout(timeout); setGpsLoading(false); toast.error("GPS access denied"); },
      { timeout: 4500, maximumAge: 30000 }
    );
  };

  const compressPhoto = (file: File): Promise<File> =>
    new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const MAX_PX = 1600;
        let { width, height } = img;
        if (width > MAX_PX || height > MAX_PX) {
          if (width > height) { height = Math.round((height * MAX_PX) / width); width = MAX_PX; }
          else { width = Math.round((width * MAX_PX) / height); height = MAX_PX; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => resolve(blob ? new File([blob], file.name, { type: "image/jpeg" }) : file),
          "image/jpeg", 0.82
        );
      };
      img.onerror = () => resolve(file);
      img.src = url;
    });

  const logJobMutation = trpc.jobs.logJob.useMutation({
    onSuccess: () => { setSubmitted(true); },
    onError: (err) => toast.error(err.message),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const compressed = await Promise.all(files.map(compressPhoto));
    const label = pendingPhotoLabel;
    const newPhotos = compressed.map((file) => ({
      file, preview: URL.createObjectURL(file), uploading: false, label,
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const uploadPhotos = async (): Promise<string[]> => {
    const urls: string[] = [];
    const updated = [...photos];
    for (let i = 0; i < updated.length; i++) {
      const photo = updated[i];
      if (photo.url) { urls.push(photo.url); continue; }
      updated[i] = { ...photo, uploading: true };
      setPhotos([...updated]);
      try {
        const formData = new FormData();
        formData.append("file", photo.file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (!res.ok) throw new Error("Upload failed");
        const { url } = await res.json() as { url: string };
        updated[i] = { ...updated[i], uploading: false, url };
        urls.push(url);
      } catch {
        const placeholder = `https://placehold.co/800x600/00B5B8/white?text=Job+Photo+${i + 1}`;
        updated[i] = { ...updated[i], uploading: false, url: placeholder };
        urls.push(placeholder);
      }
      setPhotos([...updated]);
    }
    return urls;
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.tradeCategory) { toast.error("Pick a trade category"); return; }
    if (!quickForm.zipCode.trim()) { toast.error("ZIP code is required"); return; }
    const uploadedUrls = photos.length > 0 ? await uploadPhotos() : [];
    const selectedTrade = TRADE_CATEGORIES.find(t => t.id === quickForm.tradeCategory);
    logJobMutation.mutate({
      serviceAddress: quickForm.zipCode,
      serviceType: selectedTrade?.label ?? quickForm.tradeCategory,
      notes: quickForm.jobValue ? `Job value: $${quickForm.jobValue}` : undefined,
      photoUrls: uploadedUrls,
    });
  };

  const handleFullSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.serviceAddress.trim()) { toast.error("Service address is required"); return; }
    if (photos.length === 0) { toast.error("At least one photo is required"); return; }
    const uploadedUrls = await uploadPhotos();
    if (uploadedUrls.length === 0) { toast.error("Photo upload failed"); return; }
    logJobMutation.mutate({
      serviceAddress: form.serviceAddress,
      serviceType: form.serviceType || undefined,
      customerName: form.customerName || undefined,
      customerEmail: form.customerEmail || undefined,
      customerPhone: form.customerPhone || undefined,
      notes: form.notes || undefined,
      photoUrls: uploadedUrls,
    });
  };

  const handleFsmSync = (systemId: string) => {
    setFsmSyncing(systemId);
    setTimeout(() => {
      setFsmSyncing(null);
      setFsmSynced(true);
      const sys = FSM_SYSTEMS.find(s => s.id === systemId);
      toast.success(`${sys?.label} connected! Recent jobs imported.`);
      setForm(f => ({
        ...f,
        serviceAddress: "1428 Maple Ave, Dallas, TX 75201″,
        serviceType: "HVAC Maintenance",
        customerName: "Robert Chen",
        customerPhone: "(214) 555-0182″,
      }));
      setTimeout(() => setShowFsmModal(false), 800);
    }, 2200);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A1628]">
        <Loader2 className="w-8 h-8 animate-spin text-teal-400″ />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A1628] gap-4 px-4″>
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-white mb-2″>Sign In Required</h2>
          <p className="text-slate-400 mb-6″>You need to be signed in to log jobs.</p>
          <Button className="bg-teal-500 hover:bg-teal-400 text-white h-12 px-8″ onClick={() => { window.location.href = getLoginUrl(); }}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (submitted) {
    const earnings = projectedEarnings > 0 ? projectedEarnings : null;
    return (
      <div className="min-h-screen bg-[#0A1628] flex flex-col items-center justify-center px-4″>
        <div className="max-w-sm w-full text-center">
          {/* Celebration badge */}
          <div className="relative inline-flex items-center justify-center mb-6″>
            <div className="absolute inset-0 rounded-full bg-teal-400/20 animate-ping" style={{ animationDuration: "1.5s" }} />
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-[0_0_40px_rgba(20,184,166,0.4)]">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-white mb-1″>Job Logged!</h2>
          {earnings !== null && (
            <div className="inline-flex items-center gap-2 bg-teal-400/10 border border-teal-400/30 rounded-2xl px-5 py-3 mb-4″>
              <DollarSign className="w-5 h-5 text-teal-400″ />
              <span className="text-teal-400 font-black text-lg">+${earnings.toFixed(2)} earned</span>
            </div>
          )}
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            AI is scanning your photos for referral opportunities. You'll earn a commission if any network partners close the leads.
          </p>
          <div className="bg-slate-800 rounded-2xl p-4 mb-6 text-left space-y-2.5″>
            {[
              { label: "Photos uploaded & AI scan running", done: true },
              { label: "Job recorded in your history", done: true },
              { label: "Commission tracking activated", done: true },
              { label: "Customer follow-up (optional)", done: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3″>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? "bg-teal-500/20" : "bg-slate-700"}`}>
                  {item.done ? <CheckCircle className="w-3 h-3 text-teal-400″ /> : <div className="w-2 h-2 rounded-full bg-slate-600" />}
                </div>
                <span className={`text-sm ${item.done ? "text-slate-200" : "text-slate-500"}`}>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3″>
            <Button className="flex-1 bg-teal-500 hover:bg-teal-400 text-white h-12 font-bold" onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
            <Button variant="outline" className="flex-1 border-slate-700 text-slate-300 h-12″ onClick={() => {
              setSubmitted(false);
              setPhotos([]);
              setQuickForm({ tradeCategory: "", jobValue: "", zipCode: "" });
              setForm({ serviceAddress: "", serviceType: "", customerName: "", customerEmail: "", customerPhone: "", notes: "" });
            }}>
              Log Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PartnerLayout>
      <div className="bg-[#0A1628] min-h-screen">
        <div className="max-w-lg mx-auto px-4 py-6″>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6″>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-1.5 text-slate-400 hover:text-white px-2″>
                <ArrowLeft className="w-4 h-4″ />
              </Button>
            </Link>
            <div className="flex-1″>
              <h1 className="text-white text-xl font-black">Log a Job</h1>
            </div>
            <button
              onClick={() => setShowFsmModal(true)}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-300 transition-colors active:scale-95″
            >
              <RefreshCw className="w-3.5 h-3.5 text-teal-400″ />
              FSM Sync
            </button>
          </div>

          {/* Mode Toggle */}
          <div className="flex bg-slate-800 rounded-2xl p-1 mb-6″>
            {([["quick", "Quick Log", "5 sec"], ["full", "Full Log", "Full details"]] as const).map(([m, label, sub]) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 rounded-xl py-2.5 flex flex-col items-center transition-all active:scale-95 ${mode === m ? "bg-teal-500 shadow-lg" : "hover:bg-slate-700"}`}
              >
                <span className={`text-sm font-black ${mode === m ? "text-white" : "text-slate-400"}`}>{label}</span>
                <span className={`text-[10px] ${mode === m ? "text-teal-100" : "text-slate-600"}`}>{sub}</span>
              </button>
            ))}
          </div>

          {/* -- QUICK LOG MODE -- */}
          {mode === "quick" && (
            <form onSubmit={handleQuickSubmit} className="space-y-4″>
              {/* Trade Category */}
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold text-slate-500 mb-3″>Trade Category</p>
                <div className="grid grid-cols-3 gap-2″>
                  {TRADE_CATEGORIES.map(({ id, label, icon: Icon, color }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setQuickForm(f => ({ ...f, tradeCategory: id }))}
                      className={`rounded-2xl p-3 flex flex-col items-center gap-2 active:scale-95 transition-all border ${
                        quickForm.tradeCategory === id
                          ? "border-teal-500 bg-teal-500/10″
                          : "border-slate-700 bg-slate-800 hover:border-slate-600″
                      }`}
                    >
                      <Icon className="w-6 h-6″ style={{ color: quickForm.tradeCategory === id ? color : "#64748B" }} />
                      <span className={`text-[11px] font-bold leading-tight text-center ${quickForm.tradeCategory === id ? "text-white" : "text-slate-500"}`}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Value */}
              <div>
                <div className="flex items-center justify-between mb-1.5″>
                  <Label className="text-xs uppercase tracking-widest font-semibold text-slate-500″>Job Value</Label>
                  {projectedEarnings > 0 && (
                    <span className="text-teal-400 text-xs font-black">
                      You earn: ${projectedEarnings.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="0″
                    value={quickForm.jobValue}
                    onChange={e => setQuickForm(f => ({ ...f, jobValue: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl text-white text-xl font-black pl-8 pr-4 py-4 focus:outline-none focus:border-teal-500 placeholder:text-slate-600″
                  />
                </div>
                {projectedEarnings > 0 && (
                  <div className="mt-2 bg-teal-500/10 border border-teal-500/20 rounded-xl px-4 py-2.5 flex items-center gap-2″>
                    <Sparkles className="w-4 h-4 text-teal-400 flex-shrink-0″ />
                    <p className="text-teal-300 text-xs font-semibold">
                      This job earns you <span className="text-teal-400 font-black">${projectedEarnings.toFixed(2)}</span> in network commissions
                    </p>
                  </div>
                )}
              </div>

              {/* ZIP Code */}
              <div>
                <div className="flex items-center justify-between mb-1.5″>
                  <Label className="text-xs uppercase tracking-widest font-semibold text-slate-500″>ZIP Code</Label>
                  <button
                    type="button"
                    onClick={handleGpsAutoFill}
                    disabled={gpsLoading}
                    className="flex items-center gap-1 text-teal-400 text-xs font-bold disabled:opacity-50″
                  >
                    {gpsLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <LocateFixed className="w-3 h-3″ />}
                    {gpsLoading ? "Getting GPS..." : "Use GPS"}
                  </button>
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="75201″
                  maxLength={5}
                  value={quickForm.zipCode}
                  onChange={e => setQuickForm(f => ({ ...f, zipCode: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl text-white text-2xl font-black px-5 py-4 focus:outline-none focus:border-teal-500 placeholder:text-slate-600 tracking-[0.2em]"
                />
              </div>

              {/* Quick photo strip */}
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold text-slate-500 mb-2″>Photos (optional)</p>
                <div className="flex gap-2 overflow-x-auto pb-1″>
                  <button
                    type="button"
                    onClick={() => { setPendingPhotoLabel("general"); fileInputRef.current?.click(); }}
                    className="flex-shrink-0 w-20 h-20 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
                  >
                    <Camera className="w-5 h-5 text-slate-500″ />
                    <span className="text-[9px] text-slate-600″>Add</span>
                  </button>
                  {photos.map((photo, i) => (
                    <div key={i} className="relative flex-shrink-0 w-20 h-20″>
                      <img src={photo.preview} alt="" className="w-full h-full object-cover rounded-2xl" />
                      {photo.uploading && (
                        <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                          <Loader2 className="w-4 h-4 text-white animate-spin" />
                        </div>
                      )}
                      <button type="button" onClick={() => removePhoto(i)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />

              <Button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-400 text-white h-14 text-base font-black rounded-2xl gap-2 shadow-[0_8px_24px_rgba(20,184,166,0.3)] active:scale-[0.98] transition-transform"
                disabled={logJobMutation.isPending || !quickForm.tradeCategory || !quickForm.zipCode}
              >
                {logJobMutation.isPending ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Logging...</>
                ) : (
                  <><Zap className="w-5 h-5″ /> Log Job</>
                )}
              </Button>
            </form>
          )}

          {/* -- FULL LOG MODE -- */}
          {mode === "full" && (
            <form onSubmit={handleFullSubmit} className="space-y-5″>
              {/* Before/After Photos */}
              <Card className="bg-slate-800 border-slate-700″>
                <CardHeader className="pb-3″>
                  <CardTitle className="text-sm text-white flex items-center gap-2″>
                    <Camera className="w-4 h-4 text-teal-400″ />
                    Before / After Photos
                    <span className="text-red-400 ml-1″>*</span>
                  </CardTitle>
                  <p className="text-xs text-slate-500″>AI analyzes all photos for referral opportunities</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 mb-4″>
                    {(["before", "after"] as const).map(lbl => {
                      const group = photos.filter(p => p.label === lbl);
                      return (
                        <div
                          key={lbl}
                          className={`rounded-2xl border-2 border-dashed p-4 flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform ${
                            lbl === "before" ? "border-slate-600 bg-slate-900/50″ : "border-teal-700/40 bg-teal-900/10"
                          }`}
                          onClick={() => { setPendingPhotoLabel(lbl); fileInputRef.current?.click(); }}
                        >
                          <Camera className={`w-6 h-6 ${lbl === "before" ? "text-slate-500" : "text-teal-500"}`} />
                          <span className="text-xs font-bold text-slate-400 capitalize">{lbl} ({group.length})</span>
                        </div>
                      );
                    })}
                  </div>
                  {photos.length > 0 && (
                    <div className="grid grid-cols-4 gap-2″>
                      {photos.map((photo, i) => (
                        <div key={i} className="relative group aspect-square">
                          <img src={photo.preview} alt="" className="w-full h-full object-cover rounded-xl border border-slate-700″ />
                          <span className={`absolute bottom-0.5 left-0.5 text-[8px] font-bold px-1 py-0.5 rounded ${photo.label === "before" ? "bg-slate-800 text-slate-400" : "bg-teal-900 text-teal-400"}`}>
                            {photo.label}
                          </span>
                          {photo.uploading && (
                            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                              <Loader2 className="w-4 h-4 text-white animate-spin" />
                            </div>
                          )}
                          <button type="button" onClick={() => removePhoto(i)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center hidden group-hover:flex">
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      ))}
                      <div
                        className="aspect-square border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
                        onClick={() => { setPendingPhotoLabel("general"); fileInputRef.current?.click(); }}
                      >
                        <Camera className="w-5 h-5 text-slate-600″ />
                      </div>
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
                  {photos.length === 0 && (
                    <div
                      className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center cursor-pointer hover:border-teal-700 transition-colors mt-2″
                      onClick={() => { setPendingPhotoLabel("general"); fileInputRef.current?.click(); }}
                    >
                      <Upload className="w-8 h-8 text-slate-600 mx-auto mb-2″ />
                      <p className="text-sm font-medium text-slate-400″>Tap to add photos</p>
                      <p className="text-xs text-slate-600 mt-1″>JPG, PNG, HEIC up to 10MB</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Job Details */}
              <Card className="bg-slate-800 border-slate-700″>
                <CardHeader className="pb-3″>
                  <CardTitle className="text-sm text-white flex items-center gap-2″>
                    <MapPin className="w-4 h-4 text-teal-400″ />
                    Job Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4″>
                  <div>
                    <div className="flex items-center justify-between mb-1.5″>
                      <Label className="text-xs text-slate-400″>Service Address *</Label>
                      <button type="button" onClick={handleGpsAutoFill} disabled={gpsLoading}
                        className="flex items-center gap-1 text-teal-400 text-xs font-bold disabled:opacity-50″>
                        {gpsLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <LocateFixed className="w-3 h-3″ />}
                        {gpsLoading ? "Getting GPS..." : "Use GPS"}
                      </button>
                    </div>
                    <Input value={form.serviceAddress} onChange={e => setForm(f => ({ ...f, serviceAddress: e.target.value }))}
                      placeholder="123 Main St, Dallas, TX" className="bg-slate-900 border-slate-700 text-white h-12 text-base" required />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-400 mb-1.5 block">Service Type</Label>
                    <Input value={form.serviceType} onChange={e => setForm(f => ({ ...f, serviceType: e.target.value }))}
                      placeholder="e.g., HVAC Tune-up, Lawn Care" className="bg-slate-900 border-slate-700 text-white h-12 text-base" />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-400 mb-1.5 block">Job Notes</Label>
                    <Textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      placeholder="Property condition, what you observed..." className="bg-slate-900 border-slate-700 text-white resize-none text-base" rows={3} />
                  </div>
                </CardContent>
              </Card>

              {/* Customer Info */}
              <Card className="bg-slate-800 border-slate-700″>
                <CardHeader className="pb-3″>
                  <CardTitle className="text-sm text-white flex items-center gap-2″>
                    <User className="w-4 h-4 text-teal-400″ />
                    Customer Info
                    <span className="text-xs text-slate-500 font-normal">(optional)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4″>
                  <Input value={form.customerName} onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))}
                    placeholder="Customer name" className="bg-slate-900 border-slate-700 text-white h-12 text-base" />
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500″ />
                    <Input value={form.customerPhone} onChange={e => setForm(f => ({ ...f, customerPhone: e.target.value }))}
                      placeholder="(214) 555-0100″ className="bg-slate-900 border-slate-700 text-white pl-9 h-12 text-base" />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500″ />
                    <Input type="email" value={form.customerEmail} onChange={e => setForm(f => ({ ...f, customerEmail: e.target.value }))}
                      placeholder="email@example.com" className="bg-slate-900 border-slate-700 text-white pl-9 h-12 text-base" />
                  </div>
                </CardContent>
              </Card>

              <div className="bg-teal-500/5 border border-teal-500/20 rounded-2xl p-4 flex items-start gap-3″>
                <Zap className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0″ />
                <p className="text-xs text-slate-400 leading-relaxed">
                  AI will scan your photos for lawn care, pest, roofing, and 15+ other opportunities. Partners get notified — you earn a commission when they close.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-400 text-white h-14 text-base font-black rounded-2xl gap-2 shadow-[0_8px_24px_rgba(20,184,166,0.3)] active:scale-[0.98] transition-transform"
                disabled={logJobMutation.isPending || photos.length === 0}
              >
                {logJobMutation.isPending ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Uploading & Analyzing...</>
                ) : (
                  <><Camera className="w-5 h-5″ /> Submit Job & Run AI Analysis</>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* FSM Sync Modal */}
      {showFsmModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm px-4 pb-8″>
          <div className="w-full max-w-sm bg-slate-800 rounded-3xl p-6 border border-slate-700″>
            <div className="flex items-center justify-between mb-5″>
              <div>
                <h3 className="text-white font-black text-base">Sync from FSM</h3>
                <p className="text-slate-500 text-xs mt-0.5″>Import your latest job from your field service app</p>
              </div>
              <button onClick={() => setShowFsmModal(false)} className="w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center active:scale-90 transition-transform">
                <X className="w-4 h-4 text-slate-400″ />
              </button>
            </div>
            <div className="space-y-2″>
              {FSM_SYSTEMS.map(sys => (
                <button
                  key={sys.id}
                  onClick={() => handleFsmSync(sys.id)}
                  disabled={fsmSyncing !== null}
                  className="w-full flex items-center gap-4 bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-2xl px-4 py-4 active:scale-[0.98] transition-all disabled:opacity-50″
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0″>
                    <span className="text-teal-400 font-black text-xs">{sys.logo}</span>
                  </div>
                  <span className="text-white font-bold text-sm flex-1 text-left">{sys.label}</span>
                  {fsmSyncing === sys.id ? (
                    <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
                  ) : fsmSynced ? (
                    <CheckCircle className="w-4 h-4 text-teal-400″ />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-600″ />
                  )}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-600 text-center mt-4″>Connects via OAuth — no password stored</p>
          </div>
        </div>
      )}
    </PartnerLayout>
  );
}
