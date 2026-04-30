import { useState } from "react";
import { trpc } from "@/lib/trpc";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { Zap, CloudLightning, CheckCircle2, Upload, X, Home } from "lucide-react";

const SERVICE_CATEGORIES = [
  "Roof Repair / Inspection", "HVAC / AC Repair", "Plumbing Emergency",
  "Electrical", "Water Damage / Restoration", "Tree Removal / Trimming",
  "Fence Repair", "Window / Door Repair", "Foundation Inspection",
  "Siding / Exterior Repair", "Gutter Cleaning / Repair", "Flooring",
  "Painting (Interior)", "Painting (Exterior)", "Landscaping / Lawn Care",
  "Pool Service / Repair", "Pest Control", "Appliance Repair",
  "General Handyman", "Other",
];

const WEATHER_EVENTS = [
  "Hailstorm", "Tornado / High Winds", "Flooding / Heavy Rain",
  "Ice Storm / Freeze", "Lightning Strike", "Fallen Tree",
];

const URGENCY_OPTIONS = [
  { value: "emergency", label: "Emergency", icon: "🚨", desc: "Needs attention within hours", color: "border-red-400 bg-red-50 text-red-700" },
  { value: "within_48h", label: "Within 48 Hours", icon: "⚡", desc: "Urgent but not immediate", color: "border-orange-400 bg-orange-50 text-orange-700" },
  { value: "this_week", label: "This Week", icon: "📅", desc: "Can wait a few days", color: "border-yellow-400 bg-yellow-50 text-yellow-700" },
  { value: "flexible", label: "Flexible", icon: "🗓️", desc: "No rush — get the best price", color: "border-green-400 bg-green-50 text-green-700" },
] as const;

type Step = "details" | "service" | "urgency" | "success";

export default function QuickQuoteRequest() {
  // toast from sonner
  const { user } = useAuth();
  const [step, setStep] = useState<Step>("details");
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    homeownerName: user?.name ?? "",
    homeownerEmail: user?.email ?? "",
    homeownerPhone: "",
    propertyAddress: "",
    propertyZipCode: "",
    serviceCategory: "",
    serviceDescription: "",
    urgency: "flexible" as "emergency" | "within_48h" | "this_week" | "flexible",
    isWeatherRelated: false,
    weatherEventType: "",
    photoUrls: [] as string[],
    broadcastToZip: true,
  });

  const submitMutation = trpc.quickQuote.submit.useMutation({
    onSuccess: (result) => {
      setSubmittedId(result.requestId);
      setStep("success");
    },
    onError: (err) => {
      toast.error("Submission failed", { description: err.message });
    },
  });

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    if (form.photoUrls.length + files.length > 5) {
      toast.error("Max 5 photos", { description: "Please remove some photos first." });
      return;
    }
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (!res.ok) throw new Error("Upload failed");
        const { url } = await res.json();
        urls.push(url);
      }
      setForm(f => ({ ...f, photoUrls: [...f.photoUrls, ...urls] }));
    } catch {
      toast.error("Upload failed", { description: "Please try again." });
    } finally {
      setUploading(false);
    }
  }

  function removePhoto(idx: number) {
    setForm(f => ({ ...f, photoUrls: f.photoUrls.filter((_, i) => i !== idx) }));
  }

  function handleSubmit() {
    submitMutation.mutate({
      homeownerName: form.homeownerName,
      homeownerEmail: form.homeownerEmail,
      homeownerPhone: form.homeownerPhone || undefined,
      propertyAddress: form.propertyAddress,
      propertyZipCode: form.propertyZipCode,
      serviceCategory: form.serviceCategory,
      serviceDescription: form.serviceDescription,
      urgency: form.urgency,
      isWeatherRelated: form.isWeatherRelated,
      weatherEventType: form.weatherEventType || undefined,
      photoUrls: form.photoUrls,
      broadcastToZip: form.broadcastToZip,
    });
  }

  if (step === "success") {
    return (
      <HomeownerLayout>
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Sent!</h1>
          <p className="text-gray-500 mb-6">
            Your request has been sent to vetted TrustyPro partners in your area.
            You'll hear back shortly — check your email for responses.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Service</span>
              <span className="font-medium">{form.serviceCategory}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Urgency</span>
              <Badge variant="outline">{form.urgency.replace("_", " ")}</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Zip Code</span>
              <span className="font-medium">{form.propertyZipCode}</span>
            </div>
            {submittedId && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Request ID</span>
                <span className="font-mono text-xs">#{submittedId}</span>
              </div>
            )}
          </div>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => { setStep("details"); setForm(f => ({ ...f, serviceCategory: "", serviceDescription: "", photoUrls: [] })); }}>
              Submit Another
            </Button>
            <Button onClick={() => window.location.href = "/my-home"} className="bg-blue-600 hover:bg-blue-700 text-white">
              Back to My Home
            </Button>
          </div>
        </div>
      </HomeownerLayout>
    );
  }

  return (
    <HomeownerLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600" />
            Request a Free Quote
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Get connected with vetted TrustyPro partners in your area — fast, free, and no obligation.
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-2">
          {(["details", "service", "urgency"] as Step[]).map((s, i) => (
            <div key={s} className={`flex-1 h-1.5 rounded-full ${step === s ? "bg-blue-600" : i < ["details","service","urgency"].indexOf(step) ? "bg-blue-300" : "bg-gray-200"}`} />
          ))}
        </div>

        {/* Step 1: Contact + Property */}
        {step === "details" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Contact & Property</CardTitle>
              <CardDescription>We'll share this with the partner responding to your request.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name *</label>
                  <Input value={form.homeownerName} onChange={e => setForm(f => ({ ...f, homeownerName: e.target.value }))} placeholder="Jane Smith" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Email *</label>
                  <Input type="email" value={form.homeownerEmail} onChange={e => setForm(f => ({ ...f, homeownerEmail: e.target.value }))} placeholder="jane@email.com" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Phone (optional)</label>
                <Input type="tel" value={form.homeownerPhone} onChange={e => setForm(f => ({ ...f, homeownerPhone: e.target.value }))} placeholder="(214) 555-0100" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Property Address *</label>
                <Input value={form.propertyAddress} onChange={e => setForm(f => ({ ...f, propertyAddress: e.target.value }))} placeholder="123 Main St, Plano, TX" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Zip Code *</label>
                <Input value={form.propertyZipCode} onChange={e => setForm(f => ({ ...f, propertyZipCode: e.target.value.replace(/\D/g, "").slice(0, 5) }))} placeholder="75024" maxLength={5} className="max-w-[140px]" />
              </div>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!form.homeownerName || !form.homeownerEmail || !form.propertyAddress || form.propertyZipCode.length !== 5}
                onClick={() => setStep("service")}
              >
                Next: Describe the Work
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Service Details */}
        {step === "service" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What Do You Need?</CardTitle>
              <CardDescription>Be as specific as possible — better details get better quotes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Weather Related Toggle */}
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <CloudLightning className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800">Weather-related damage?</p>
                  <p className="text-xs text-blue-600">Hail, storm, flooding, wind, etc.</p>
                </div>
                <button
                  onClick={() => setForm(f => ({ ...f, isWeatherRelated: !f.isWeatherRelated, weatherEventType: "" }))}
                  className={`w-11 h-6 rounded-full transition-colors ${form.isWeatherRelated ? "bg-blue-600" : "bg-gray-300"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform mx-0.5 ${form.isWeatherRelated ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>

              {form.isWeatherRelated && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Type of Weather Event</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {WEATHER_EVENTS.map(ev => (
                      <button
                        key={ev}
                        onClick={() => setForm(f => ({ ...f, weatherEventType: ev }))}
                        className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${form.weatherEventType === ev ? "bg-blue-600 border-blue-600 text-white" : "border-gray-200 hover:border-blue-400"}`}
                      >
                        {ev}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Category */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Service Category *</label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {SERVICE_CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setForm(f => ({ ...f, serviceCategory: cat }))}
                      className={`px-3 py-2 rounded-lg border text-sm text-left transition-colors ${form.serviceCategory === cat ? "bg-blue-600 border-blue-600 text-white" : "border-gray-200 hover:border-blue-400"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Describe the Issue *</label>
                <Textarea
                  value={form.serviceDescription}
                  onChange={e => setForm(f => ({ ...f, serviceDescription: e.target.value }))}
                  placeholder="Describe what happened, what you see, and what you need done. The more detail, the better your quote will be."
                  rows={4}
                  maxLength={2000}
                />
                <p className="text-xs text-gray-400 mt-1">{form.serviceDescription.length}/2000</p>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Photos (optional, up to 5)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.photoUrls.map((url, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => removePhoto(i)} className="absolute top-0.5 right-0.5 bg-black/60 rounded-full p-0.5">
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                  {form.photoUrls.length < 5 && (
                    <label className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-xs text-gray-400 mt-1">{uploading ? "..." : "Add"}</span>
                      <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} disabled={uploading} />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("details")} className="flex-1">Back</Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!form.serviceCategory || form.serviceDescription.length < 10}
                  onClick={() => setStep("urgency")}
                >
                  Next: Set Urgency
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Urgency + Submit */}
        {step === "urgency" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How Urgent Is This?</CardTitle>
              <CardDescription>This helps partners prioritize your request.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {URGENCY_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setForm(f => ({ ...f, urgency: opt.value }))}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${form.urgency === opt.value ? opt.color + " border-current" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <div>
                      <div className="font-semibold text-sm">{opt.label}</div>
                      <div className="text-xs opacity-75 mt-0.5">{opt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Broadcast toggle */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Home className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Broadcast to all partners in my zip</p>
                  <p className="text-xs text-gray-500">Get quotes from multiple pros — recommended for best pricing.</p>
                </div>
                <button
                  onClick={() => setForm(f => ({ ...f, broadcastToZip: !f.broadcastToZip }))}
                  className={`w-11 h-6 rounded-full transition-colors ${form.broadcastToZip ? "bg-blue-600" : "bg-gray-300"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform mx-0.5 ${form.broadcastToZip ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                <div className="font-semibold text-gray-700 mb-2">Request Summary</div>
                <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="font-medium">{form.serviceCategory}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Address</span><span className="font-medium truncate max-w-[200px]">{form.propertyAddress}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Zip</span><span className="font-medium">{form.propertyZipCode}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Urgency</span><Badge variant="outline">{form.urgency.replace("_", " ")}</Badge></div>
                {form.isWeatherRelated && <div className="flex justify-between"><span className="text-gray-500">Weather Event</span><span className="font-medium">{form.weatherEventType || "Yes"}</span></div>}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("service")} className="flex-1">Back</Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={submitMutation.isPending}
                  onClick={handleSubmit}
                >
                  {submitMutation.isPending ? "Sending..." : "Send Quote Request"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </HomeownerLayout>
  );
}
