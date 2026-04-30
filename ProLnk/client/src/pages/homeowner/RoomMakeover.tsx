import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { Sparkles, Upload, X, ChevronRight, ChevronLeft, Wand2, Loader2, CheckCircle2, Camera, Home, Sofa, BedDouble, ChefHat, Bath, Dumbbell } from "lucide-react";

// ── Room Types ──────────────────────────────────────────────────────────────
const ROOM_TYPES = [
  { value: "living_room", label: "Living Room", icon: Sofa },
  { value: "bedroom", label: "Bedroom", icon: BedDouble },
  { value: "kitchen", label: "Kitchen", icon: ChefHat },
  { value: "bathroom", label: "Bathroom", icon: Bath },
  { value: "home_office", label: "Home Office", icon: Home },
  { value: "gym", label: "Home Gym", icon: Dumbbell },
  { value: "dining_room", label: "Dining Room", icon: Home },
  { value: "outdoor_patio", label: "Outdoor / Patio", icon: Home },
] as const;

// ── Design Styles ────────────────────────────────────────────────────────────
const DESIGN_STYLES = [
  { value: "modern", label: "Modern & Minimalist", desc: "Clean lines, neutral tones, clutter-free" },
  { value: "farmhouse", label: "Farmhouse / Rustic", desc: "Warm wood tones, cozy textures, vintage accents" },
  { value: "transitional", label: "Transitional", desc: "Blend of traditional and contemporary" },
  { value: "contemporary", label: "Contemporary", desc: "Bold, current trends with statement pieces" },
  { value: "traditional", label: "Traditional / Classic", desc: "Elegant, symmetrical, rich colors" },
  { value: "industrial", label: "Industrial", desc: "Exposed brick, metal accents, raw materials" },
  { value: "coastal", label: "Coastal / Beachy", desc: "Light blues, whites, natural textures" },
  { value: "bohemian", label: "Bohemian / Eclectic", desc: "Layered textures, global patterns, plants" },
];

// ── Color Palettes ───────────────────────────────────────────────────────────
const COLOR_PALETTES = [
  { value: "neutral_warm", label: "Warm Neutrals", colors: ["#F5F0E8", "#D4B896", "#8B6F47", "#3D2B1F"] },
  { value: "neutral_cool", label: "Cool Grays", colors: ["#F0F2F5", "#B0BEC5", "#607D8B", "#263238"] },
  { value: "earth_tones", label: "Earth Tones", colors: ["#E8D5B7", "#A0785A", "#6B4226", "#2C1810"] },
  { value: "navy_gold", label: "Navy & Gold", colors: ["#F8F6F0", "#C9A84C", "#1B3A6B", "#0A1628"] },
  { value: "sage_cream", label: "Sage & Cream", colors: ["#F9F5EE", "#B5C9B7", "#7A9E7E", "#3D5A40"] },
  { value: "blush_white", label: "Blush & White", colors: ["#FFF8F6", "#F4B8B0", "#D4847A", "#8B4A44"] },
  { value: "charcoal_white", label: "Charcoal & White", colors: ["#FFFFFF", "#E0E0E0", "#616161", "#212121"] },
  { value: "bold_jewel", label: "Jewel Tones", colors: ["#F0EBF8", "#9C6BB5", "#5B2D8E", "#2D1557"] },
];

// ── Budget Ranges ────────────────────────────────────────────────────────────
const BUDGET_RANGES = [
  { value: "under_5k", label: "Under $5,000", desc: "Refresh with paint, accessories & small furniture" },
  { value: "5k_15k", label: "$5,000 – $15,000", desc: "New furniture, lighting, and flooring updates" },
  { value: "15k_30k", label: "$15,000 – $30,000", desc: "Full room renovation with custom pieces" },
  { value: "30k_plus", label: "$30,000+", desc: "Complete transformation with premium materials" },
];

// ── Priority Features ────────────────────────────────────────────────────────
const PRIORITY_FEATURES = [
  "More storage", "Better lighting", "Open floor plan feel", "Cozy & comfortable",
  "Kid-friendly", "Pet-friendly", "Work from home space", "Entertainment-focused",
  "Maximize natural light", "Better traffic flow", "Spa-like feel", "Statement wall",
];

type Step = "room_type" | "photos" | "style" | "details" | "generating" | "result";

export default function RoomMakeover() {
  const { user } = useAuth();
  const [step, setStep] = useState<Step>("room_type");
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    roomType: "",
    designStyle: "",
    colorPalette: "",
    budgetRange: "",
    priorityFeatures: [] as string[],
    additionalNotes: "",
  });

  const startMutation = trpc.roomMakeover.startSession.useMutation({
    onSuccess: (result) => {
      setSessionId(result.sessionId);
      setStep("generating");
      // Poll for result
      pollForResult(result.sessionId);
    },
    onError: (err) => {
      toast.error("Could not start makeover", { description: err.message });
      setStep("details");
    },
  });

  const getResultQuery = trpc.roomMakeover.getSession.useQuery(
    { sessionId: sessionId! },
    {
      enabled: false,
      refetchInterval: false,
    }
  );

  async function pollForResult(sid: number) {
    let attempts = 0;
    const maxAttempts = 30; // 60 seconds max
    const interval = setInterval(async () => {
      attempts++;
      try {
        const result = await getResultQuery.refetch();
        if (result.data?.generationStatus === "complete" && result.data.generatedImageUrl) {
          clearInterval(interval);
          setResultImageUrl(result.data.generatedImageUrl);
          setStep("result");
        } else if (result.data?.generationStatus === "failed") {
          clearInterval(interval);
          toast.error("Generation failed", { description: "Please try again with different photos." });
          setStep("details");
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          toast.error("Timed out", { description: "The AI is taking too long. Please try again." });
          setStep("details");
        }
      } catch {
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          setStep("details");
        }
      }
    }, 2000);
  }

  function handlePhotoAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (photoFiles.length + files.length > 4) {
      toast.error("Max 4 photos", { description: "Please remove some photos first." });
      return;
    }
    const newFiles = [...photoFiles, ...files];
    setPhotoFiles(newFiles);
    const newUrls = files.map(f => URL.createObjectURL(f));
    setPhotoPreviewUrls(prev => [...prev, ...newUrls]);
  }

  function removePhoto(idx: number) {
    setPhotoFiles(prev => prev.filter((_, i) => i !== idx));
    setPhotoPreviewUrls(prev => {
      URL.revokeObjectURL(prev[idx]);
      return prev.filter((_, i) => i !== idx);
    });
  }

  function toggleFeature(f: string) {
    setForm(prev => ({
      ...prev,
      priorityFeatures: prev.priorityFeatures.includes(f)
        ? prev.priorityFeatures.filter(x => x !== f)
        : [...prev.priorityFeatures, f],
    }));
  }

  async function handleGenerate() {
    if (photoFiles.length === 0) {
      toast.error("Please add at least 1 photo of your room");
      return;
    }
    setUploading(true);
    try {
      // Upload photos using base64 encoding
      const photosPayload = await Promise.all(
        photoFiles.map(async (file) => {
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          return { data: base64, type: file.type, name: file.name };
        })
      );
      const uploadRes = await fetch("/api/upload-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photos: photosPayload }),
      });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { urls: uploadedUrls } = await uploadRes.json();
      setUploading(false);
      startMutation.mutate({
        roomType: form.roomType as "living_room" | "bedroom" | "kitchen" | "bathroom" | "home_office" | "gym" | "dining_room" | "master_bedroom" | "master_bathroom" | "laundry_room" | "garage" | "outdoor_patio" | "basement" | "playroom" | "sunroom" | "entryway",
        styleAnswers: {
          designStyle: form.designStyle as any,
          colorPalette: form.colorPalette as any,
          budget: form.budgetRange as any,
          priorities: form.priorityFeatures.slice(0, 3).map(f => f.toLowerCase().replace(/ /g, "_").replace(/[^a-z_]/g, "")) as any,
          additionalNotes: form.additionalNotes,
        },
        photoUrls: uploadedUrls,
      });
    } catch {
      setUploading(false);
      toast.error("Upload failed", { description: "Please check your connection and try again." });
    }
  }

  const STEPS: Step[] = ["room_type", "photos", "style", "details"];
  const stepIdx = STEPS.indexOf(step);

  return (
    <HomeownerLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            AI Room Makeover
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload photos of your room and our AI will generate a stunning redesign based on your style preferences.
          </p>
        </div>

        {/* Progress Bar */}
        {step !== "generating" && step !== "result" && (
          <div className="flex gap-1.5">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  i <= stepIdx ? "bg-purple-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        )}

        {/* Step 1: Room Type */}
        {step === "room_type" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What room are we redesigning?</CardTitle>
              <CardDescription>This helps the AI understand the space and its purpose.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ROOM_TYPES.map(rt => {
                  const Icon = rt.icon;
                  return (
                    <button
                      key={rt.value}
                      onClick={() => setForm(f => ({ ...f, roomType: rt.value }))}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        form.roomType === rt.value
                          ? "bg-purple-600 border-purple-600 text-white"
                          : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-xs font-medium text-center">{rt.label}</span>
                    </button>
                  );
                })}
              </div>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={!form.roomType}
                onClick={() => setStep("photos")}
              >
                Next: Add Photos <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Photos */}
        {step === "photos" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add photos of your room</CardTitle>
              <CardDescription>
                Upload 1–4 photos from different angles. The more photos, the better the AI understands your space.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Photo Tips */}
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                <p className="text-xs font-semibold text-purple-800 mb-1.5 flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5" /> Tips for best results
                </p>
                <ul className="text-xs text-purple-700 space-y-0.5 list-disc list-inside">
                  <li>Take photos in good natural lighting</li>
                  <li>Capture the full room from a corner or doorway</li>
                  <li>Include close-ups of problem areas or features you want to keep</li>
                  <li>Avoid blurry or dark photos</li>
                </ul>
              </div>

              {/* Photo Grid */}
              <div className="grid grid-cols-2 gap-3">
                {photoPreviewUrls.map((url, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-100">
                    <img src={url} alt={`Room photo ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removePhoto(i)}
                      className="absolute top-1.5 right-1.5 bg-black/60 rounded-full p-1 hover:bg-black/80"
                    >
                      <X className="w-3.5 h-3.5 text-white" />
                    </button>
                    <div className="absolute bottom-1.5 left-1.5 bg-black/50 rounded-md px-1.5 py-0.5">
                      <span className="text-white text-xs">Photo {i + 1}</span>
                    </div>
                  </div>
                ))}
                {photoPreviewUrls.length < 4 && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 hover:border-purple-400 hover:bg-purple-50 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-sm text-gray-500">Add Photo</span>
                    <span className="text-xs text-gray-400">{photoPreviewUrls.length}/4</span>
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handlePhotoAdd}
              />

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("room_type")} className="flex-1">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={photoPreviewUrls.length === 0}
                  onClick={() => setStep("style")}
                >
                  Next: Choose Style <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Style */}
        {step === "style" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Choose your design style</CardTitle>
              <CardDescription>The AI will use this to guide the aesthetic of your makeover.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Design Style */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Design Style *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DESIGN_STYLES.map(s => (
                    <button
                      key={s.value}
                      onClick={() => setForm(f => ({ ...f, designStyle: s.value }))}
                      className={`flex flex-col items-start p-3 rounded-xl border-2 text-left transition-all ${
                        form.designStyle === s.value
                          ? "bg-purple-600 border-purple-600 text-white"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <span className="font-semibold text-sm">{s.label}</span>
                      <span className={`text-xs mt-0.5 ${form.designStyle === s.value ? "text-purple-100" : "text-gray-500"}`}>{s.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Palette */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Color Palette *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {COLOR_PALETTES.map(p => (
                    <button
                      key={p.value}
                      onClick={() => setForm(f => ({ ...f, colorPalette: p.value }))}
                      className={`p-2.5 rounded-xl border-2 transition-all ${
                        form.colorPalette === p.value ? "border-purple-600 ring-2 ring-purple-300" : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <div className="flex gap-1 mb-1.5">
                        {p.colors.map((c, i) => (
                          <div key={i} className="flex-1 h-4 rounded-sm" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-gray-700">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("photos")} className="flex-1">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={!form.designStyle || !form.colorPalette}
                  onClick={() => setStep("details")}
                >
                  Next: Final Details <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Details */}
        {step === "details" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Final details</CardTitle>
              <CardDescription>Help the AI understand your priorities and budget.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Budget */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Budget Range</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {BUDGET_RANGES.map(b => (
                    <button
                      key={b.value}
                      onClick={() => setForm(f => ({ ...f, budgetRange: b.value }))}
                      className={`flex flex-col items-start p-3 rounded-xl border-2 text-left transition-all ${
                        form.budgetRange === b.value
                          ? "bg-purple-600 border-purple-600 text-white"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <span className="font-semibold text-sm">{b.label}</span>
                      <span className={`text-xs mt-0.5 ${form.budgetRange === b.value ? "text-purple-100" : "text-gray-500"}`}>{b.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Features */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">What matters most to you? (pick all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {PRIORITY_FEATURES.map(f => (
                    <button
                      key={f}
                      onClick={() => toggleFeature(f)}
                      className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                        form.priorityFeatures.includes(f)
                          ? "bg-purple-600 border-purple-600 text-white"
                          : "border-gray-300 text-gray-600 hover:border-purple-400"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">
                  Anything else the AI should know? (optional)
                </label>
                <Textarea
                  value={form.additionalNotes}
                  onChange={e => setForm(f => ({ ...f, additionalNotes: e.target.value }))}
                  placeholder="e.g. 'Keep the brick fireplace', 'I love mid-century modern furniture', 'Need space for a home office corner', 'The ceiling is 9 feet high'..."
                  rows={3}
                  maxLength={500}
                />
                <p className="text-xs text-gray-400 mt-1">{form.additionalNotes.length}/500</p>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm border">
                <p className="font-semibold text-gray-700">Ready to generate your makeover:</p>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-gray-500">Room</span><span className="font-medium capitalize">{form.roomType.replace("_", " ")}</span>
                  <span className="text-gray-500">Photos</span><span className="font-medium">{photoPreviewUrls.length} uploaded</span>
                  <span className="text-gray-500">Style</span><span className="font-medium capitalize">{form.designStyle.replace("_", " ")}</span>
                  <span className="text-gray-500">Colors</span><span className="font-medium">{COLOR_PALETTES.find(p => p.value === form.colorPalette)?.label ?? "—"}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("style")} className="flex-1">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={uploading || startMutation.isPending}
                  onClick={handleGenerate}
                >
                  {uploading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading photos...</>
                  ) : (
                    <><Wand2 className="w-4 h-4 mr-2" /> Generate My Makeover</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generating */}
        {step === "generating" && (
          <Card>
            <CardContent className="py-16 flex flex-col items-center gap-6 text-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-purple-600" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-purple-300 border-t-purple-600 animate-spin" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Designing your makeover...</h2>
                <p className="text-gray-500 text-sm max-w-sm">
                  Our AI is analyzing your photos and creating a personalized room design. This usually takes 20–40 seconds.
                </p>
              </div>
              <div className="flex flex-col gap-2 text-sm text-gray-500 w-full max-w-xs">
                {[
                  "Analyzing room dimensions and layout",
                  "Applying your style preferences",
                  "Selecting furniture and color scheme",
                  "Rendering your new room design",
                ].map((msg, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-purple-400 animate-spin flex-shrink-0" />
                    <span>{msg}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Result */}
        {step === "result" && resultImageUrl && (
          <div className="space-y-4">
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative">
                <img src={resultImageUrl} alt="AI Room Makeover" className="w-full object-cover" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-purple-600 text-white px-3 py-1 text-sm">
                    <Sparkles className="w-3.5 h-3.5 mr-1 inline" /> AI Generated
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Before photos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Your Original Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {photoPreviewUrls.map((url, i) => (
                    <img key={i} src={url} alt={`Before ${i + 1}`} className="rounded-lg object-cover aspect-video w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Design Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Your Design Profile</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-500 block text-xs">Room Type</span><span className="font-medium capitalize">{form.roomType.replace("_", " ")}</span></div>
                <div><span className="text-gray-500 block text-xs">Style</span><span className="font-medium capitalize">{form.designStyle.replace("_", " ")}</span></div>
                <div><span className="text-gray-500 block text-xs">Color Palette</span><span className="font-medium">{COLOR_PALETTES.find(p => p.value === form.colorPalette)?.label ?? "—"}</span></div>
                <div><span className="text-gray-500 block text-xs">Budget</span><span className="font-medium">{BUDGET_RANGES.find(b => b.value === form.budgetRange)?.label ?? "Not specified"}</span></div>
                {form.priorityFeatures.length > 0 && (
                  <div className="col-span-2">
                    <span className="text-gray-500 block text-xs mb-1">Priorities</span>
                    <div className="flex flex-wrap gap-1">
                      {form.priorityFeatures.map(f => (
                        <Badge key={f} variant="outline" className="text-xs">{f}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setStep("room_type");
                  setPhotoFiles([]);
                  setPhotoPreviewUrls([]);
                  setResultImageUrl(null);
                  setSessionId(null);
                  setForm({ roomType: "", designStyle: "", colorPalette: "", budgetRange: "", priorityFeatures: [], additionalNotes: "" });
                }}
              >
                Start New Makeover
              </Button>
              <Button
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = resultImageUrl;
                  a.download = "room-makeover.jpg";
                  a.click();
                }}
              >
                Download Design
              </Button>
            </div>

            {/* CTA to find a pro */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
              <CardContent className="py-5 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1">
                  <p className="font-bold text-lg">Ready to make it real?</p>
                  <p className="text-blue-100 text-sm mt-0.5">Connect with vetted TrustyPro partners who can bring your design to life.</p>
                </div>
                <Button
                  className="bg-white text-blue-700 hover:bg-blue-50 flex-shrink-0"
                  onClick={() => window.location.href = "/my-home/quick-quote"}
                >
                  Get Free Quotes
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </HomeownerLayout>
  );
}
