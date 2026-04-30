import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Button } from "@/components/ui/button";
import { Camera, Sparkles, Download, RefreshCw, ArrowLeftRight, Upload } from "lucide-react";

type GenStep = "select-property" | "upload" | "generating" | "result";

export default function BeforeAfterGenerator() {
  const [step, setStep] = useState<GenStep>("select-property");
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [beforeUrl, setBeforeUrl] = useState<string | null>(null);
  const [afterUrl, setAfterUrl] = useState<string | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: properties = [] } = trpc.homeowner.getMyProperties.useQuery();

  const uploadMockup = trpc.homeowner.uploadMockupPhoto.useMutation({
    onSuccess: (data) => {
      setBeforeUrl(data.photoUrl);
      setStep("generating");
      generateMockup.mutate({ propertyId: selectedPropertyId! });
    },
    onError: (err) => {
      toast.error(err.message || "Upload failed. Please try again.");
      setStep("upload");
    },
  });

  const generateMockup = trpc.homeowner.generateMockup.useMutation({
    onSuccess: (data) => {
      setAfterUrl(data.mockupUrl ?? null);
      setStep("result");
    },
    onError: (err) => {
      toast.error(err.message || "Generation failed. Please try again.");
      setStep("upload");
    },
  });

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file."); return; }
    if (file.size > 16 * 1024 * 1024) { toast.error("Image must be under 16MB."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).replace(/^data:[^;]+;base64,/, "");
      setStep("generating");
      uploadMockup.mutate({
        propertyId: selectedPropertyId!,
        photoBase64: base64,
        mimeType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSliderMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const pos = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pos);
  };

  const selectedProperty = (properties as any[]).find((p: any) => p.id === selectedPropertyId);

  return (
    <HomeownerLayout>
      <div className="max-w-3xl mx-auto p-6 space-y-8">

        {/* Step 1: Select Property */}
        {step === "select-property" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8" />
                <h2 className="text-2xl font-black">AI Home Transformation</h2>
              </div>
              <p className="text-indigo-200 text-lg">
                Upload a photo of any area of your home. Our AI generates a stunning "after" showing what it could look like after professional renovation -- in seconds.
              </p>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-4">Select a Property</h3>
            {(properties as any[]).length === 0 ? (
              <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200">
                <p className="text-gray-500 mb-4">No properties saved yet. Add your home first.</p>
                <Button onClick={() => window.location.href = "/my-home/property"}>
                  Add My Home
                </Button>
              </div>
            ) : (
              <div className="grid gap-3">
                {(properties as any[]).map((prop: any) => (
                  <button
                    key={prop.id}
                    onClick={() => { setSelectedPropertyId(prop.id); setStep("upload"); }}
                    className={`text-left p-4 rounded-2xl border-2 transition-all ${
                      selectedPropertyId === prop.id
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 bg-white hover:border-indigo-300"
                    }`}
                  >
                    <div className="font-bold text-gray-900">{prop.nickname ?? prop.address}</div>
                    {prop.nickname && <div className="text-sm text-gray-500">{prop.address}</div>}
                    {prop.aiMockupUrl && (
                      <div className="text-xs text-indigo-600 mt-1 font-medium"> Has existing AI mockup</div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Step 2: Upload Photo */}
        {step === "upload" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setStep("select-property")} className="text-gray-400 hover:text-gray-600"></button>
              <div>
                <h2 className="text-xl font-black text-gray-900">Upload a Photo</h2>
                <p className="text-sm text-gray-500">{selectedProperty?.nickname ?? selectedProperty?.address}</p>
              </div>
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setIsDraggingFile(true); }}
              onDragLeave={() => setIsDraggingFile(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingFile(false);
                const file = e.dataTransfer.files[0];
                if (file) handleFileSelect(file);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all ${
                isDraggingFile ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-white hover:border-indigo-400 hover:bg-indigo-50/30"
              }`}
            >
              <Upload className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-bold text-gray-700 mb-2">Drop a photo here or click to browse</p>
              <p className="text-sm text-gray-400">Exterior, interior, yard, kitchen, bathroom -- any area works</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }}
              />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-gray-500">
              {[
                { icon: "", label: "Exterior & Curb Appeal" },
                { icon: "", label: "Interior Rooms" },
                { icon: "", label: "Yard & Landscaping" },
              ].map(tip => (
                <div key={tip.label} className="bg-gray-50 rounded-xl p-3">
                  <div className="text-2xl mb-1">{tip.icon}</div>
                  <div>{tip.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Generating */}
        {step === "generating" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full border-4 border-purple-100" />
              <div className="absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin" />
              <div className="absolute inset-3 rounded-full bg-purple-50 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">
              {uploadMockup.isPending ? "Uploading your photo..." : "AI is transforming your home..."}
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              {uploadMockup.isPending
                ? "Securely uploading your photo."
                : "Our AI is generating a photorealistic renovation result. This takes 15-30 seconds."}
            </p>
            <div className="mt-8 flex justify-center gap-2">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Result -- Before/After Slider */}
        {step === "result" && beforeUrl && afterUrl && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-3">
                <Sparkles className="w-4 h-4" /> AI Transformation Complete
              </div>
              <h2 className="text-2xl font-black text-gray-900">Drag to Compare</h2>
              <p className="text-gray-500 text-sm mt-1">Slide left/right to see before and after</p>
            </div>

            {/* Slider */}
            <div
              ref={sliderRef}
              className="relative rounded-2xl overflow-hidden cursor-ew-resize select-none"
              style={{ aspectRatio: "16/10" }}
              onMouseMove={handleSliderMove}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onTouchMove={(e) => { setIsDragging(true); handleSliderMove(e); }}
              onTouchEnd={() => setIsDragging(false)}
            >
              {/* After (full width, behind) */}
              <img src={afterUrl} alt="After" className="absolute inset-0 w-full h-full object-cover" />

              {/* Before (clipped to left side) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img src={beforeUrl} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: "none" }} />
              </div>

              {/* Divider line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
                  <ArrowLeftRight className="w-5 h-5 text-gray-600" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full">BEFORE</div>
              <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">AFTER [SPARK]</div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => { setStep("upload"); setBeforeUrl(null); setAfterUrl(null); setSliderPos(50); }}
              >
                <RefreshCw className="w-4 h-4" /> Try Another Photo
              </Button>
              <Button
                className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = afterUrl;
                  a.download = "trustypro-renovation-vision.jpg";
                  a.target = "_blank";
                  a.click();
                  toast.success("Downloading your AI transformation...");
                }}
              >
                <Download className="w-4 h-4" /> Download After Photo
              </Button>
            </div>

            <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-2xl p-5 text-center">
              <p className="text-indigo-800 font-semibold mb-2">Ready to make this a reality?</p>
              <p className="text-indigo-600 text-sm mb-4">We'll match you with a verified DFW pro who can bring this vision to life.</p>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => window.location.href = "/trustypro/scan"}
              >
                Get Matched with a Pro 
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </HomeownerLayout>
  );
}
