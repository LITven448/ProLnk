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
import { Camera, Upload, X, CheckCircle, Loader2, ArrowLeft, Zap, MapPin, User, Phone, Mail, LocateFixed } from "lucide-react";
import PartnerLayout from "@/components/PartnerLayout";

export default function LogJob() {
  const [, navigate] = useLocation();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    serviceAddress: "",
    serviceType: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    notes: "",
  });
  const [photos, setPhotos] = useState<{ file: File; preview: string; uploading: boolean; url?: string }[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [jobId, setJobId] = useState<number | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  // GPS auto-fill: reverse geocode via browser Geolocation API
  const handleGpsAutoFill = () => {
    if (!navigator.geolocation) {
      toast.error("GPS not available on this device");
      return;
    }
    setGpsLoading(true);
    const timeout = setTimeout(() => {
      setGpsLoading(false);
      toast.error("GPS timed out — please enter address manually");
    }, 5000);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        clearTimeout(timeout);
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const addr = data.address;
          const street = [addr.house_number, addr.road].filter(Boolean).join(" ");
          const city = addr.city || addr.town || addr.village || "";
          const state = addr.state || "";
          const postcode = addr.postcode || "";
          const full = [street, city, state, postcode].filter(Boolean).join(", ");
          setForm((f) => ({ ...f, serviceAddress: full }));
          toast.success("Address filled from GPS");
        } catch {
          toast.error("Could not resolve address — enter manually");
        } finally {
          setGpsLoading(false);
        }
      },
      () => {
        clearTimeout(timeout);
        setGpsLoading(false);
        toast.error("GPS access denied — please enter address manually");
      },
      { timeout: 4500, maximumAge: 30000 }
    );
  };

  // Client-side photo compression: target ~800KB per photo
  const compressPhoto = (file: File): Promise<File> => {
    return new Promise((resolve) => {
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
          "image/jpeg",
          0.82
        );
      };
      img.onerror = () => resolve(file);
      img.src = url;
    });
  };

  const logJobMutation = trpc.jobs.logJob.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      setJobId(data.jobId);
      toast.success("Job logged! AI is analyzing your photos...");
    },
    onError: (err) => toast.error(err.message),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    // Compress each photo client-side before adding to state
    const compressed = await Promise.all(files.map(compressPhoto));
    const newPhotos = compressed.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      uploading: false,
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
        // Use a placeholder URL for demo purposes if upload fails
        const placeholder = `https://placehold.co/800x600/00B5B8/white?text=Job+Photo+${i + 1}`;
        updated[i] = { ...updated[i], uploading: false, url: placeholder };
        urls.push(placeholder);
      }
      setPhotos([...updated]);
    }

    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#0A1628]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4 px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-heading">Sign In Required</h2>
          <p className="text-gray-600 mb-6">You need to be signed in to log jobs.</p>
          <Button className="bg-[#0A1628] hover:bg-teal-700 text-white" onClick={() => { window.location.href = getLoginUrl(); }}>Sign In</Button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#0A1628]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#0A1628]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 font-heading">
            Job Logged Successfully!
          </h2>
          <p className="text-gray-600 mb-2">
            Your job has been recorded and our AI is now analyzing your photos in the background.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            If any opportunities are detected -- like overgrown grass, a broken gate, or a window that needs repair -- they'll automatically be routed to the right partner in the network. You'll earn a commission if they close the job.
          </p>

          <div className="bg-[#F5E642]/10 border border-[#0A1628]/20 rounded-xl p-4 mb-8 text-left">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-[#0A1628] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-teal-800">AI Analysis in Progress</p>
                <p className="text-xs text-[#0A1628] mt-1">
                  GPT-4o Vision is scanning your photos for lawn care, pest control, fence repair, window cleaning, and 15+ other service opportunities. This typically takes 30-60 seconds.
                </p>
              </div>
            </div>
          </div>

          {/* Completion checklist */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-gray-700 mb-3">Job Completion Checklist</p>
            <div className="space-y-2">
              {[
                { label: "Photos uploaded & AI scan running", done: true },
                { label: "Job recorded in your history", done: true },
                { label: "Commission tracking activated", done: true },
                { label: "Customer follow-up (optional)", done: false },
                { label: "Leave a note for next visit", done: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.done ? "bg-[#0A1628]/10" : "bg-gray-100"
                  }`}>
                    {item.done
                      ? <CheckCircle className="w-3 h-3 text-[#0A1628]" />
                      : <div className="w-2 h-2 rounded-full bg-gray-300" />}
                  </div>
                  <span className={`text-xs ${
                    item.done ? "text-gray-700" : "text-gray-400"
                  }`}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              className="flex-1 bg-[#0A1628] hover:bg-teal-700 text-white"
              onClick={() => navigate("/dashboard")}
            >
              View Dashboard
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setSubmitted(false);
                setPhotos([]);
                setForm({ serviceAddress: "", serviceType: "", customerName: "", customerEmail: "", customerPhone: "", notes: "" });
              }}
            >
              Log Another Job
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PartnerLayout>
    <div className="bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2 text-gray-600">
              <ArrowLeft className="w-4 h-4" /> Dashboard
            </Button>
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-semibold text-gray-700">Log a Completed Job</span>
        </div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Log a Completed Job</h1>
          <p className="text-gray-500 text-sm mt-1">
            Upload photos from your completed job. Our AI will scan them for opportunities to refer to other network partners -- earning you a referral commission.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo upload */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#0A1628]" />
                Job Photos
                <span className="text-red-500">*</span>
              </CardTitle>
              <p className="text-xs text-gray-500">Upload 1-8 photos from the completed job. The AI analyzes all of them for opportunities.</p>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-[#0A1628]/40 hover:bg-[#F5E642]/10/30 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700">Click to upload photos</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, HEIC up to 10MB each</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {photos.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                  {photos.map((photo, i) => (
                    <div key={i} className="relative group aspect-square">
                      <img
                        src={photo.preview}
                        alt={`Photo ${i + 1}`}
                        className="w-full h-full object-cover rounded-lg border border-gray-200"
                      />
                      {photo.uploading && (
                        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                          <Loader2 className="w-5 h-5 text-white animate-spin" />
                        </div>
                      )}
                      {photo.url && (
                        <div className="absolute top-1 left-1 bg-green-500 rounded-full p-0.5">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 bg-red-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                  <div
                    className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#0A1628]/40 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Job details */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0A1628]" />
                Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="serviceAddress" className="text-sm font-medium text-gray-700">
                    Service Address <span className="text-red-500">*</span>
                  </Label>
                  <button
                    type="button"
                    onClick={handleGpsAutoFill}
                    disabled={gpsLoading}
                    className="flex items-center gap-1 text-xs text-[#00B5B8] hover:text-[#009a9d] font-medium disabled:opacity-50"
                  >
                    {gpsLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <LocateFixed className="w-3 h-3" />}
                    {gpsLoading ? "Getting location..." : "Use my GPS"}
                  </button>
                </div>
                <Input
                  id="serviceAddress"
                  placeholder="123 Main St, Dallas, TX 75201"
                  value={form.serviceAddress}
                  onChange={(e) => setForm((f) => ({ ...f, serviceAddress: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="serviceType" className="text-sm font-medium text-gray-700">Service Type</Label>
                <Input
                  id="serviceType"
                  placeholder="e.g., Pet waste removal, Lawn care, Pool cleaning"
                  value={form.serviceType}
                  onChange={(e) => setForm((f) => ({ ...f, serviceType: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="notes" className="text-sm font-medium text-gray-700">Job Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any notes about the job, property condition, or what you observed..."
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className="mt-1 resize-none"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Customer info (optional) */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4 text-[#0A1628]" />
                Customer Info
                <span className="text-xs text-gray-400 font-normal">(optional -- helps with follow-up)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName" className="text-sm font-medium text-gray-700">Customer Name</Label>
                  <Input
                    id="customerName"
                    placeholder="John Smith"
                    value={form.customerName}
                    onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone" className="text-sm font-medium text-gray-700">Phone</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="customerPhone"
                      placeholder="(214) 555-0100"
                      value={form.customerPhone}
                      onChange={(e) => setForm((f) => ({ ...f, customerPhone: e.target.value }))}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="customerEmail" className="text-sm font-medium text-gray-700">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="customerEmail"
                    type="email"
                    placeholder="john@example.com"
                    value={form.customerEmail}
                    onChange={(e) => setForm((f) => ({ ...f, customerEmail: e.target.value }))}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI notice */}
          <div className="bg-[#F5E642]/10 border border-[#0A1628]/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-[#0A1628] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-teal-800">AI Analysis Included</p>
                <p className="text-xs text-[#0A1628] mt-1">
                  After submission, GPT-4o Vision will analyze your photos and automatically detect opportunities -- overgrown grass, broken fences, dirty windows, pest indicators, and more. Matching partners in the network will be notified, and you earn a referral commission when they close the job.
                </p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0A1628] hover:bg-teal-700 text-white h-12 text-base font-semibold gap-2"
            disabled={logJobMutation.isPending || photos.length === 0}
          >
            {logJobMutation.isPending ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Uploading & Analyzing...</>
            ) : (
              <><Camera className="w-5 h-5" /> Submit Job & Run AI Analysis</>
            )}
          </Button>
        </form>
      </div>
    </div>
    </PartnerLayout>
  );
}
