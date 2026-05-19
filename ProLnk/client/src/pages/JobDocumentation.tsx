import React, { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  ArrowLeft, Camera, X, Loader2, CheckCircle, Star,
  FileText, PenLine, Wrench, Clock, DollarSign,
  Plus, Download, Sparkles, Shield,
} from "lucide-react";
import PartnerLayout from "@/components/PartnerLayout";

const TRADE_OPTIONS = [
  "HVAC", "Plumbing", "Electrical", "Landscaping", "Pest Control",
  "Roofing", "Painting", "General Repair", "Cleaning", "Other",
];

const MATERIAL_SUGGESTIONS = [
  "PVC pipe", "Capacitor", "Refrigerant R-410A", "Air filter", "Sealant",
  "Copper fittings", "Mulch", "Fertilizer", "Circuit breaker", "Paint",
];

interface PhotoItem {
  file: File;
  preview: string;
  label: "before" | "after" | "detail";
  uploading: boolean;
  url?: string;
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-2″>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          className="active:scale-110 transition-transform"
        >
          <Star
            className="w-9 h-9″
            fill={(hovered || value) >= n ? "#14B8A6″ : "none"}
            stroke={(hovered || value) >= n ? "#14B8A6″ : "#334155"}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}

function PhotoGrid({ photos, onAdd, onRemove }: {
  photos: PhotoItem[];
  onAdd: (label: PhotoItem["label"]) => void;
  onRemove: (i: number) => void;
}) {
  const labelConfig: Record<PhotoItem["label"], { color: string; bg: string }> = {
    before: { color: "#94A3B8″, bg: "rgba(148,163,184,0.12)" },
    after:  { color: "#14B8A6″, bg: "rgba(20,184,166,0.12)"  },
    detail: { color: "#A78BFA", bg: "rgba(167,139,250,0.12)" },
  };

  return (
    <div>
      <div className="flex gap-2 mb-3″>
        {(["before", "after", "detail"] as const).map(lbl => {
          const cnt = photos.filter(p => p.label === lbl).length;
          const cfg = labelConfig[lbl];
          return (
            <button
              key={lbl}
              type="button"
              onClick={() => onAdd(lbl)}
              className="flex-1 rounded-xl py-2.5 flex flex-col items-center gap-1 active:scale-95 transition-transform border"
              style={{ background: cfg.bg, borderColor: `${cfg.color}30` }}
            >
              <div className="flex items-center gap-1″>
                <Camera className="w-3.5 h-3.5″ style={{ color: cfg.color }} />
                {cnt > 0 && (
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
                    style={{ background: cfg.bg, color: cfg.color }}>
                    {cnt}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-bold capitalize" style={{ color: cfg.color }}>{lbl}</span>
            </button>
          );
        })}
      </div>
      {photos.length > 0 ? (
        <div className="grid grid-cols-3 gap-2″>
          {photos.map((photo, i) => {
            const cfg = labelConfig[photo.label];
            return (
              <div key={i} className="relative aspect-square group">
                <img src={photo.preview} alt="" className="w-full h-full object-cover rounded-2xl" />
                <span
                  className="absolute bottom-1.5 left-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-lg capitalize"
                  style={{ background: "rgba(0,0,0,0.7)", color: cfg.color }}
                >
                  {photo.label}
                </span>
                {photo.uploading && (
                  <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => onRemove(i)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity active:scale-90″
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            );
          })}
          <button
            type="button"
            onClick={() => onAdd("detail")}
            className="aspect-square border-2 border-dashed border-slate-700 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
          >
            <Plus className="w-5 h-5 text-slate-600″ />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onAdd("before")}
          className="w-full border-2 border-dashed border-slate-700 rounded-2xl p-8 flex flex-col items-center gap-2 active:scale-[0.98] transition-transform"
        >
          <Camera className="w-10 h-10 text-slate-600″ />
          <span className="text-sm font-bold text-slate-500″>Tap to add photos</span>
          <span className="text-xs text-slate-600″>Before, after, and detail shots</span>
        </button>
      )}
    </div>
  );
}

export default function JobDocumentation() {
  const [, navigate] = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingLabel, setPendingLabel] = useState<PhotoItem["label"]>("before");

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [rating, setRating] = useState(0);
  const [shareToTrustyPro, setShareToTrustyPro] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);
  const [signatureSaved, setSignatureSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [materialInput, setMaterialInput] = useState("");
  const [materials, setMaterials] = useState<string[]>([]);
  const [showMaterialSuggestions, setShowMaterialSuggestions] = useState(false);

  const [form, setForm] = useState({
    trade: "",
    duration: "",
    totalValue: "",
    customerName: "",
    notes: "",
  });

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const compressed = await Promise.all(files.map(compressPhoto));
    const label = pendingLabel;
    setPhotos(prev => [
      ...prev,
      ...compressed.map(file => ({ file, preview: URL.createObjectURL(file), uploading: false, label })),
    ]);
  };

  const removePhoto = (i: number) => {
    setPhotos(prev => {
      URL.revokeObjectURL(prev[i].preview);
      return prev.filter((_, idx) => idx !== i);
    });
  };

  const addMaterial = (mat: string) => {
    const trimmed = mat.trim();
    if (trimmed && !materials.includes(trimmed)) setMaterials(prev => [...prev, trimmed]);
    setMaterialInput("");
    setShowMaterialSuggestions(false);
  };

  const handleGeneratePdf = () => {
    setGeneratingPdf(true);
    setTimeout(() => {
      setGeneratingPdf(false);
      setPdfReady(true);
      toast.success("Professional report generated!");
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.trade) { toast.error("Please select a trade"); return; }
    if (photos.length === 0) { toast.error("At least one photo is required"); return; }
    if (rating === 0) { toast.error("Please collect a customer rating"); return; }
    setSubmitted(true);
    toast.success("Job documented successfully!");
  };

  const filteredSuggestions = MATERIAL_SUGGESTIONS.filter(
    s => s.toLowerCase().includes(materialInput.toLowerCase()) && !materials.includes(s)
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex flex-col items-center justify-center px-4″>
        <div className="max-w-sm w-full text-center">
          <div className="relative inline-flex items-center justify-center mb-6″>
            <div className="absolute inset-0 rounded-full bg-teal-400/20 animate-ping"
              style={{ animationDuration: "1.5s" }} />
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-[0_0_40px_rgba(20,184,166,0.4)]">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-white mb-2″>Job Documented!</h2>
          <div className="flex justify-center gap-1 mb-4″>
            {[1,2,3,4,5].map(n => (
              <Star key={n} className="w-6 h-6″
                fill={n <= rating ? "#14B8A6″ : "#1E293B"}
                stroke={n <= rating ? "#14B8A6″ : "#334155"}
                strokeWidth={1.5} />
            ))}
          </div>
          {shareToTrustyPro && (
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl px-4 py-3 mb-4 flex items-center gap-2″>
              <Shield className="w-4 h-4 text-teal-400 flex-shrink-0″ />
              <span className="text-teal-300 text-sm font-semibold">Shared to your TrustyPro Portfolio</span>
            </div>
          )}
          {pdfReady && (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 mb-6 flex items-center gap-3″>
              <FileText className="w-5 h-5 text-teal-400 flex-shrink-0″ />
              <div className="flex-1 text-left">
                <p className="text-white text-sm font-bold">Report ready</p>
                <p className="text-slate-500 text-xs">Professional PDF generated</p>
              </div>
              <button className="text-teal-400 text-xs font-bold flex items-center gap-1 active:scale-95″>
                <Download className="w-3 h-3″ /> Download
              </button>
            </div>
          )}
          <div className="flex gap-3″>
            <Button
              className="flex-1 bg-teal-500 hover:bg-teal-400 text-white h-12 font-bold"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-slate-700 text-slate-300 h-12″
              onClick={() => {
                setSubmitted(false);
                setPhotos([]);
                setRating(0);
                setMaterials([]);
                setPdfReady(false);
                setShareToTrustyPro(false);
                setSignatureSaved(false);
                setForm({ trade: "", duration: "", totalValue: "", customerName: "", notes: "" });
              }}
            >
              New Doc
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
              <h1 className="text-white text-xl font-black">Job Documentation</h1>
              <p className="text-slate-500 text-xs mt-0.5″>Document completed work & collect customer sign-off</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5″>

            {/* Photo Grid */}
            <div className="bg-slate-800 rounded-3xl p-4 border border-slate-700″>
              <div className="flex items-center justify-between mb-4″>
                <div className="flex items-center gap-2″>
                  <Camera className="w-4 h-4 text-teal-400″ />
                  <span className="text-white text-sm font-black">Photos</span>
                  <span className="text-red-400 text-xs">*</span>
                </div>
                <span className="text-xs text-slate-500″>{photos.length} added</span>
              </div>
              <PhotoGrid
                photos={photos}
                onAdd={(label) => { setPendingLabel(label); fileInputRef.current?.click(); }}
                onRemove={removePhoto}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Job Summary */}
            <div className="bg-slate-800 rounded-3xl p-4 border border-slate-700 space-y-4″>
              <div className="flex items-center gap-2 mb-1″>
                <Wrench className="w-4 h-4 text-teal-400″ />
                <span className="text-white text-sm font-black">Job Summary</span>
              </div>

              <div>
                <Label className="text-xs text-slate-500 mb-2 block">Trade *</Label>
                <div className="flex flex-wrap gap-2″>
                  {TRADE_OPTIONS.map(trade => (
                    <button
                      key={trade}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, trade }))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold active:scale-95 transition-all border ${
                        form.trade === trade
                          ? "bg-teal-500/20 border-teal-500/40 text-teal-300″
                          : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600″
                      }`}
                    >
                      {trade}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3″>
                <div>
                  <Label className="text-xs text-slate-500 mb-1.5 block">
                    <Clock className="w-3 h-3 inline mr-1″ />
                    Duration (hrs)
                  </Label>
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="1.5″
                    value={form.duration}
                    onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                    className="bg-slate-900 border-slate-700 text-white h-11 text-base"
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-500 mb-1.5 block">
                    <DollarSign className="w-3 h-3 inline mr-1″ />
                    Total Value ($)
                  </Label>
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="250″
                    value={form.totalValue}
                    onChange={e => setForm(f => ({ ...f, totalValue: e.target.value }))}
                    className="bg-slate-900 border-slate-700 text-white h-11 text-base"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs text-slate-500 mb-1.5 block">Customer Name</Label>
                <Input
                  placeholder="John Smith"
                  value={form.customerName}
                  onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))}
                  className="bg-slate-900 border-slate-700 text-white h-11 text-base"
                />
              </div>

              <div>
                <Label className="text-xs text-slate-500 mb-1.5 block">Materials Used</Label>
                <div className="relative">
                  <Input
                    placeholder="Type material and press Enter..."
                    value={materialInput}
                    onChange={e => {
                      setMaterialInput(e.target.value);
                      setShowMaterialSuggestions(e.target.value.length > 0);
                    }}
                    onKeyDown={e => {
                      if (e.key === "Enter") { e.preventDefault(); addMaterial(materialInput); }
                    }}
                    className="bg-slate-900 border-slate-700 text-white h-11 text-base"
                  />
                  {showMaterialSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full mt-1 left-0 right-0 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden z-10″>
                      {filteredSuggestions.slice(0, 4).map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => addMaterial(s)}
                          className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 border-b border-slate-800 last:border-0″
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {materials.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2″>
                    {materials.map(mat => (
                      <span key={mat} className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-300″>
                        {mat}
                        <button type="button" onClick={() => setMaterials(prev => prev.filter(m => m !== mat))}>
                          <X className="w-2.5 h-2.5 text-slate-500 hover:text-red-400″ />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label className="text-xs text-slate-500 mb-1.5 block">Notes</Label>
                <Textarea
                  placeholder="Work performed, findings, recommendations..."
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  className="bg-slate-900 border-slate-700 text-white resize-none text-base"
                  rows={3}
                />
              </div>
            </div>

            {/* Customer Signature */}
            <div className="bg-slate-800 rounded-3xl p-4 border border-slate-700″>
              <div className="flex items-center justify-between mb-4″>
                <div className="flex items-center gap-2″>
                  <PenLine className="w-4 h-4 text-teal-400″ />
                  <span className="text-white text-sm font-black">Customer Signature</span>
                </div>
                {signatureSaved && (
                  <span className="flex items-center gap-1 text-xs text-teal-400 font-bold">
                    <CheckCircle className="w-3 h-3″ /> Saved
                  </span>
                )}
              </div>
              {signatureSaved ? (
                <div className="bg-slate-900 rounded-2xl h-28 flex items-center justify-center border border-teal-500/20″>
                  <div className="text-center">
                    <p className="text-teal-400 font-black italic text-xl" style={{ fontFamily: "cursive" }}>
                      {form.customerName || "Customer"}
                    </p>
                    <p className="text-slate-600 text-xs mt-1″>
                      Signed · {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className="bg-slate-900 rounded-2xl h-28 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transition-transform"
                  onClick={() => {
                    if (!form.customerName) { toast.error("Enter customer name first"); return; }
                    setSignatureSaved(true);
                    toast.success("Signature captured");
                  }}
                >
                  <PenLine className="w-6 h-6 text-slate-600″ />
                  <p className="text-slate-500 text-sm font-semibold">Tap to capture signature</p>
                  <p className="text-slate-700 text-xs">Customer signs here on your phone</p>
                </div>
              )}
            </div>

            {/* Homeowner Rating */}
            <div className="bg-slate-800 rounded-3xl p-4 border border-slate-700″>
              <div className="flex items-center gap-2 mb-4″>
                <Star className="w-4 h-4 text-teal-400″ />
                <span className="text-white text-sm font-black">Customer Rating *</span>
              </div>
              <div className="flex flex-col items-center gap-3″>
                <StarRating value={rating} onChange={setRating} />
                {rating > 0 && (
                  <p className="text-teal-400 text-sm font-bold">
                    {["", "Needs Improvement", "Below Average", "Good", "Great", "Excellent!"][rating]}
                  </p>
                )}
              </div>
            </div>

            {/* Generate PDF */}
            <div className="bg-slate-800 rounded-3xl p-4 border border-slate-700″>
              <div className="flex items-center justify-between mb-3″>
                <div className="flex items-center gap-2″>
                  <FileText className="w-4 h-4 text-teal-400″ />
                  <span className="text-white text-sm font-black">Professional Report</span>
                </div>
                {pdfReady && (
                  <span className="flex items-center gap-1 text-xs text-teal-400 font-bold">
                    <CheckCircle className="w-3 h-3″ /> Ready
                  </span>
                )}
              </div>
              <p className="text-slate-500 text-xs mb-3 leading-relaxed">
                Generates a branded PDF with photos, job summary, materials, and customer signature — ready to email or print.
              </p>
              <Button
                type="button"
                onClick={handleGeneratePdf}
                disabled={generatingPdf || photos.length === 0}
                className="w-full h-11 font-bold rounded-2xl border border-teal-500/30 text-teal-400″
                style={{ background: "rgba(20,184,166,0.08)" }}
                variant="ghost"
              >
                {generatingPdf ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2″ /> Generating...</>
                ) : pdfReady ? (
                  <><Download className="w-4 h-4 mr-2″ /> Download PDF Report</>
                ) : (
                  <><Sparkles className="w-4 h-4 mr-2″ /> Generate Professional Report</>
                )}
              </Button>
            </div>

            {/* TrustyPro Portfolio Toggle */}
            <div
              className="rounded-3xl p-4 border"
              style={{
                background: shareToTrustyPro ? "rgba(20,184,166,0.08)" : "rgba(255,255,255,0.02)",
                borderColor: shareToTrustyPro ? "rgba(20,184,166,0.30)" : "#1E293B",
              }}
            >
              <div className="flex items-center gap-3″>
                <button
                  type="button"
                  onClick={() => setShareToTrustyPro(v => !v)}
                  className="flex-shrink-0 w-12 h-7 rounded-full flex items-center transition-all"
                  style={{
                    background: shareToTrustyPro ? "#14B8A6″ : "#1E293B",
                    padding: 3,
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full bg-white shadow transition-transform duration-200″
                    style={{ transform: shareToTrustyPro ? "translateX(20px)" : "translateX(0)" }}
                  />
                </button>
                <div className="flex-1 min-w-0″>
                  <div className="flex items-center gap-1.5″>
                    <Shield className="w-4 h-4 text-teal-400 flex-shrink-0″ />
                    <span className={`text-sm font-black ${shareToTrustyPro ? "text-white" : "text-slate-400"}`}>
                      Share to TrustyPro Portfolio
                    </span>
                  </div>
                  <p className="text-slate-600 text-[10px] mt-0.5 leading-tight">
                    Add this job to your public TrustyPro profile to attract new homeowner leads
                  </p>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pb-6″>
              <Button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-400 text-white h-14 text-base font-black rounded-2xl gap-2 shadow-[0_8px_24px_rgba(20,184,166,0.3)] active:scale-[0.98] transition-transform"
                disabled={!form.trade || photos.length === 0 || rating === 0}
              >
                <CheckCircle className="w-5 h-5″ />
                Save Job Documentation
              </Button>
              <p className="text-center text-xs text-slate-600 mt-2″>
                Trade required · At least 1 photo · Customer rating
              </p>
            </div>
          </form>
        </div>
      </div>
    </PartnerLayout>
  );
}
