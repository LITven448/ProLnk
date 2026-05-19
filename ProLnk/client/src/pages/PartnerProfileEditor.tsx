import { useState, useRef, useEffect, useCallback } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  User, MapPin, Globe, Phone, FileText, Save, Loader2,
  CheckCircle, Building2, Star, Award, Camera, ArrowRight,
  Shield, Upload, AlertTriangle, ExternalLink, Copy, Network,
  CalendarClock, BadgeCheck, Hash, Tag, DollarSign, X, Plus
} from "lucide-react";
import { Link } from "wouter";

export default function PartnerProfileEditor() {
  const { data: profileData, isLoading, refetch } = trpc.partners.getMyProfile.useQuery();
  const updateProfile = trpc.partners.updateProfile.useMutation({
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  const [form, setForm] = useState({
    businessName: "",
    serviceArea: "",
    website: "",
    description: "",
    contactPhone: "",
    googleReviewUrl: "",
    licenseNumber: "",
  });
  const [zipInput, setZipInput] = useState("");
  const [serviceZipCodes, setServiceZipCodes] = useState<string[]>([]);
  const [hourlyRateMin, setHourlyRateMin] = useState("");
  const [hourlyRateMax, setHourlyRateMax] = useState("");
  const [jobSizePref, setJobSizePref] = useState<string[]>([]);
  const [licenseUploading, setLicenseUploading] = useState(false);
  const [licenseExpiry, setLicenseExpiry] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);
  const licenseInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const JOB_SIZE_OPTIONS = ["Small (< $500)", "Medium ($500–$5K)", "Large ($5K–$25K)", "Commercial ($25K+)"];

  const uploadLicense = trpc.compliance.uploadCoi.useMutation({
    onSuccess: () => {
      toast.success("License uploaded — pending admin verification");
      refetch();
      setLicenseExpiry("");
    },
    onError: (e) => toast.error(e.message),
    onSettled: () => setLicenseUploading(false),
  });

  const handleLicenseUpload = async (file: File) => {
    setLicenseUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!json.url) throw new Error("Upload failed");
      uploadLicense.mutate({ coiUrl: json.url, expiresAt: licenseExpiry ? new Date(licenseExpiry).getTime() : Date.now() + 1000 * 60 * 60 * 24 * 365 });
    } catch {
      toast.error("License upload failed — please try again");
      setLicenseUploading(false);
    }
  };

  const handlePhotoUpload = async (file: File) => {
    setPhotoUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!json.url) throw new Error("Upload failed");
      updateProfile.mutate({ ...form, serviceZipCodes } as any);
      toast.success("Profile photo updated!");
      refetch();
    } catch {
      toast.error("Photo upload failed — please try again");
    } finally {
      setPhotoUploading(false);
    }
  };

  const addZip = () => {
    const zip = zipInput.trim();
    if (!/^\d{5}$/.test(zip)) { toast.error("Enter a valid 5-digit ZIP code"); return; }
    const max = (partner as any)?.maxZipCodes ?? 5;
    if (serviceZipCodes.length >= max) { toast.error(`Your tier allows up to ${max} ZIP codes`); return; }
    if (serviceZipCodes.includes(zip)) { toast.error("ZIP already added"); return; }
    const updated = [...serviceZipCodes, zip];
    setServiceZipCodes(updated);
    setZipInput("");
    setDirty(true);
  };

  const removeZip = (zip: string) => {
    setServiceZipCodes(prev => prev.filter(z => z !== zip));
    setDirty(true);
  };

  const toggleJobSize = (size: string) => {
    setJobSizePref(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
    setDirty(true);
  };
  const [dirty, setDirty] = useState(false);
  const [serviceAreaMapUrl, setServiceAreaMapUrl] = useState<string | null>(null);
  const [serviceAreaCity, setServiceAreaCity] = useState<string | null>(null);
  const geocodeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN ?? "";

  const geocodeAndBuildMap = useCallback(async (query: string) => {
    if (!query.trim()) { setServiceAreaMapUrl(null); setServiceAreaCity(null); return; }
    try {
      const encoded = encodeURIComponent(query.trim());
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded}.json?types=place,district,locality&limit=1&access_token=${MAPBOX_TOKEN}`
      );
      const json = await res.json();
      const feature = json.features?.[0];
      if (!feature) { setServiceAreaMapUrl(null); setServiceAreaCity(null); return; }
      const [lon, lat] = feature.center as [number, number];
      const city = feature.text as string;
      const mapUrl =
        `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/` +
        `pin-l-home+1B4FD8(${lon},${lat})/` +
        `${lon},${lat},10,0/600x240@2x?access_token=${MAPBOX_TOKEN}`;
      setServiceAreaMapUrl(mapUrl);
      setServiceAreaCity(city);
    } catch {
      setServiceAreaMapUrl(null);
      setServiceAreaCity(null);
    }
  }, []);
  const [coiUploading, setCoiUploading] = useState(false);
  const [coiExpiry, setCoiExpiry] = useState("");
  const coiInputRef = useRef<HTMLInputElement>(null);

  const uploadCoi = trpc.compliance.uploadCoi.useMutation({
    onSuccess: () => {
      toast.success("COI uploaded — pending admin verification");
      refetch();
      setCoiExpiry("");
    },
    onError: (e) => toast.error(e.message),
    onSettled: () => setCoiUploading(false),
  });

  const handleCoiUpload = async (file: File) => {
    if (!coiExpiry) {
      toast.error("Please enter your COI expiration date first");
      return;
    }
    setCoiUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!json.url) throw new Error("Upload failed");
      uploadCoi.mutate({ coiUrl: json.url, expiresAt: new Date(coiExpiry).getTime() });
    } catch {
      toast.error("File upload failed — please try again");
      setCoiUploading(false);
    }
  };

  useEffect(() => {
    if (profileData?.partner) {
      const p = profileData.partner;
      setForm({
        businessName: p.businessName ?? "",
        serviceArea: p.serviceArea ?? "",
        website: p.website ?? "",
        description: p.description ?? "",
        contactPhone: p.contactPhone ?? "",
        googleReviewUrl: (p as any).googleReviewUrl ?? "",
        licenseNumber: (p as any).licenseNumber ?? "",
      });
      if ((p as any).serviceZipCodes?.length) setServiceZipCodes((p as any).serviceZipCodes);
      if (p.serviceArea) geocodeAndBuildMap(p.serviceArea);
    }
  }, [profileData, geocodeAndBuildMap]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setDirty(true);
    if (field === "serviceArea") {
      if (geocodeTimer.current) clearTimeout(geocodeTimer.current);
      geocodeTimer.current = setTimeout(() => geocodeAndBuildMap(value), 700);
    }
  };

  const handleSave = () => {
    updateProfile.mutate({ ...form, serviceZipCodes });
    setDirty(false);
  };

  if (isLoading) {
    return (
      <PartnerLayout>
        <div className="flex items-center justify-center py-24″>
          <Loader2 className="w-8 h-8 animate-spin text-[#0A1628]" />
        </div>
      </PartnerLayout>
    );
  }

  const partner = profileData?.partner;
  if (!partner) {
    return (
      <PartnerLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Building2 className="w-12 h-12 text-gray-200 mb-4″ />
          <h2 className="text-xl font-heading text-gray-900 mb-2″>No Partner Profile</h2>
          <p className="text-gray-500 mb-4″>Apply to join the ProLnk network first.</p>
          <Link href="/apply">
            <Button className="text-white" style={{ backgroundColor: "#0A1628″ }}>Apply Now</Button>
          </Link>
        </div>
      </PartnerLayout>
    );
  }

  const tierColors: Record<string, string> = {
    bronze: "#CD7F32″, silver: "#9CA3AF", gold: "#F59E0B", platinum: "#8B5CF6"
  };
  const tierColor = tierColors[partner.tier ?? "bronze"] ?? "#CD7F32″;

  const completionChecks = [
    { label: "Business name", done: !!partner.businessName },
    { label: "Service area", done: !!partner.serviceArea },
    { label: "Phone number", done: !!partner.contactPhone },
    { label: "Business description", done: !!partner.description },
    { label: "Website", done: !!partner.website },
    { label: "Service ZIP codes", done: !!(serviceZipCodes.length || (partner as any).serviceZipCodes?.length) },
    { label: "License number", done: !!(form.licenseNumber || (partner as any).licenseNumber) },
    { label: "COI on file", done: !!((partner as any).coiUrl) },
    { label: "Google Review link", done: !!((partner as any).googleReviewUrl) },
    { label: "Profile photo", done: !!((partner as any).avatarUrl || (partner as any).profilePhotoUrl) },
  ];
  const completedCount = completionChecks.filter(c => c.done).length;
  const completionPct = Math.round((completedCount / completionChecks.length) * 100);
  const incomplete = completionChecks.filter(c => !c.done);

  return (
    <PartnerLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8″>
          <h1 className="text-2xl font-heading text-gray-900″>Edit Profile</h1>
          <p className="text-gray-500 mt-1 text-sm">Update your business information visible to the ProLnk network</p>
        </div>

        {/* Profile Completion Progress */}
        {completionPct < 100 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 mb-6″>
            <div className="flex items-center justify-between mb-2″>
              <span className="text-sm font-semibold text-blue-900″>Profile Completion</span>
              <span className="text-sm font-bold text-blue-700″>{completionPct}%</span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2.5 mb-3″>
              <div className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500″
                style={{ width: `${completionPct}%` }} />
            </div>
            <div className="flex flex-wrap gap-1.5″>
              {incomplete.map(item => (
                <span key={item.label} className="text-xs px-2 py-0.5 bg-white/70 rounded-md text-blue-700 border border-blue-200″>
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Profile summary card */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6″>
          <div className="flex items-center gap-4″>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0″
              style={{ backgroundColor: tierColor + "20″, color: tierColor }}>
              {partner.businessName?.charAt(0)?.toUpperCase() ?? "P"}
            </div>
            <div className="flex-1 min-w-0″>
              <h2 className="font-heading text-gray-900 text-lg">{partner.businessName}</h2>
              <p className="text-sm text-gray-500″>{partner.businessType}  {partner.serviceArea}</p>
            </div>
            <div className="flex flex-col items-end gap-1″>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                style={{ backgroundColor: tierColor + "15″, color: tierColor }}>
                {partner.tier ?? "bronze"} tier
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-400″>
                <Star className="w-3 h-3″ />
                <span>{partner.referralCount ?? 0} referrals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Founding Network Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6″>
          <div className="flex items-center gap-2 mb-4″>
            <Network className="w-4 h-4 text-[#0A1628]" />
            <h3 className="text-sm font-bold text-gray-900″>Founding Network Status</h3>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4″>
            <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1″>Tier</p>
              <p className="text-base font-black capitalize" style={{ color: tierColor }}>{partner.tier ?? "bronze"}</p>
            </div>
            <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1″>Position</p>
              <p className="text-base font-black text-gray-900″>#{partner.id}</p>
            </div>
            <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1″>Trial Status</p>
              {(partner as any).trialEndsAt ? (
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1″>
                    <CalendarClock className="w-3 h-3 text-amber-500″ />
                    <p className="text-xs font-semibold text-amber-600″>Active</p>
                  </div>
                  <p className="text-[10px] text-gray-400″>
                    until {new Date((partner as any).trialEndsAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1″>
                  <BadgeCheck className="w-3 h-3 text-green-500″ />
                  <p className="text-xs font-semibold text-green-600″>Live</p>
                </div>
              )}
            </div>
          </div>

          {/* Referral Code */}
          {(partner as any).referralCode && (
            <div className="rounded-lg bg-[#0A1628]/4 border border-[#0A1628]/10 p-3″>
              <div className="flex items-center justify-between gap-3″>
                <div className="min-w-0″>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5″>Your Referral Code</p>
                  <p className="text-sm font-mono font-bold text-[#0A1628] tracking-widest">
                    {(partner as any).referralCode}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText((partner as any).referralCode);
                    toast.success("Referral code copied!");
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0A1628]/20 text-xs font-semibold text-[#0A1628] hover:bg-[#0A1628]/5 transition-colors flex-shrink-0″
                >
                  <Copy className="w-3 h-3″ /> Copy
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-2″>
                Share this code when recruiting partners — you earn 12% of their $149/mo subscription.
              </p>
            </div>
          )}
        </div>

        {/* Edit form */}
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100″>
          {/* Business Name */}
          <div className="p-5″>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2″>
              <Building2 className="w-4 h-4 text-gray-400″ /> Business Name
            </label>
            <Input
              value={form.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              placeholder="Your business name"
              className="text-sm"
            />
          </div>

          {/* Service Area */}
          <div className="p-5″>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2″>
              <MapPin className="w-4 h-4 text-gray-400″ /> Service Area
            </label>
            <Input
              value={form.serviceArea}
              onChange={(e) => handleChange("serviceArea", e.target.value)}
              placeholder="e.g. Dallas, TX -- DFW Metroplex"
              className="text-sm"
            />
            <p className="text-xs text-gray-400 mt-1.5″>This is shown to other partners and homeowners when matching leads.</p>
            {serviceAreaMapUrl && (
              <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 relative">
                <img
                  src={serviceAreaMapUrl}
                  alt={`Map of ${serviceAreaCity ?? form.serviceArea}`}
                  className="w-full object-cover"
                  style={{ height: 180 }}
                  onError={() => setServiceAreaMapUrl(null)}
                />
                {serviceAreaCity && (
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
                    <MapPin className="w-3 h-3 text-[#1B4FD8]" />
                    <span className="text-xs font-semibold text-gray-700″>You cover {serviceAreaCity}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Phone */}
          <div className="p-5″>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2″>
              <Phone className="w-4 h-4 text-gray-400″ /> Contact Phone
            </label>
            <Input
              value={form.contactPhone}
              onChange={(e) => handleChange("contactPhone", e.target.value)}
              placeholder="(214) 555-0100″
              type="tel"
              className="text-sm"
            />
          </div>

          {/* Website */}
          <div className="p-5″>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2″>
              <Globe className="w-4 h-4 text-gray-400″ /> Website
            </label>
            <Input
              value={form.website}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="https://yourbusiness.com"
              type="url"
              className="text-sm"
            />
          </div>

          {/* Google Review URL */}
          <div className="p-5″>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2″>
              <Star className="w-4 h-4 text-yellow-400″ /> Google Review Link
            </label>
            <Input
              value={form.googleReviewUrl}
              onChange={(e) => handleChange("googleReviewUrl", e.target.value)}
              placeholder="https://g.page/r/your-business/review"
              type="url"
              className="text-sm"
            />
            <p className="text-xs text-gray-400 mt-1″>Paste your Google Business review link. When homeowners leave 4-5 star ratings, they'll be prompted to also leave a Google review.</p>
          </div>

          {/* Description */}
          <div className="p-5″>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2″>
              <FileText className="w-4 h-4 text-gray-400″ /> Business Description
            </label>
            <Textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Tell homeowners and partners about your business, specialties, and service area..."
              className="text-sm min-h-[120px] resize-none"
              maxLength={1000}
            />
            <p className="text-xs text-gray-400 mt-1.5 text-right">{form.description.length}/1000</p>
          </div>

          {/* COI Upload */}
          <div className="p-5″>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1″>
              <Shield className="w-4 h-4 text-[#00B5B8]" /> Certificate of Insurance (COI)
            </label>
            <p className="text-xs text-gray-400 mb-3″>
              Upload your current COI to earn the Verified badge and unlock higher-tier leads.
              Accepted formats: PDF, JPG, PNG (max 10MB).
            </p>

            {/* Current COI status */}
            {(partner as any).coiUrl && (
              <div className="flex items-center gap-2 mb-3 p-2.5 rounded-lg bg-gray-50 border border-gray-200″>
                <FileText className="w-4 h-4 text-gray-400 flex-shrink-0″ />
                <div className="flex-1 min-w-0″>
                  <p className="text-xs font-medium text-gray-700″>COI on file</p>
                  {(partner as any).coiExpiresAt && (
                    <p className="text-xs text-gray-400″>
                      Expires: {new Date((partner as any).coiExpiresAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {(partner as any).coiVerifiedAt ? (
                  <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#D1FAE5″, color: "#059669" }}>
                    <CheckCircle className="w-3 h-3″ /> Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FEF3C7″, color: "#D97706" }}>
                    <AlertTriangle className="w-3 h-3″ /> Pending Review
                  </span>
                )}
                <a href={(partner as any).coiUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 hover:text-[#00B5B8]" />
                </a>
              </div>
            )}

            {/* Expiry date input */}
            <div className="mb-2″>
              <label className="text-xs text-gray-500 mb-1 block">COI Expiration Date</label>
              <input
                type="date"
                value={coiExpiry}
                onChange={e => setCoiExpiry(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="border rounded-lg px-3 py-1.5 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00B5B8] w-full"
              />
            </div>

            {/* File input */}
            <input
              ref={coiInputRef}
              type="file"
              accept=".pdf,image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) handleCoiUpload(file);
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={coiUploading}
              onClick={() => coiInputRef.current?.click()}
              className="gap-2 text-xs"
              style={{ borderColor: "#00B5B8″, color: "#00B5B8" }}
            >
              {coiUploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5″ />
              )}
              {coiUploading ? "Uploading..." : "Upload COI Document"}
            </Button>
          </div>

          {/* Profile Photo Upload */}
          <div className="p-5″>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1″>
              <Camera className="w-4 h-4 text-gray-400″ /> Profile Photo
            </label>
            <p className="text-xs text-gray-400 mb-3″>Upload a professional headshot or business logo. Shown in the partner directory.</p>
            <div className="flex items-center gap-3″>
              <div className="w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                {(partner as any).avatarUrl || (partner as any).profilePhotoUrl ? (
                  <img src={(partner as any).avatarUrl ?? (partner as any).profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-6 h-6 text-gray-300″ />
                )}
              </div>
              <div>
                <input ref={photoInputRef} type="file" accept="image/*" className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(f); }} />
                <Button type="button" variant="outline" size="sm" disabled={photoUploading}
                  onClick={() => photoInputRef.current?.click()}
                  className="gap-2 text-xs">
                  {photoUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5″ />}
                  {photoUploading ? "Uploading..." : "Upload Photo"}
                </Button>
                <p className="text-xs text-gray-400 mt-1″>JPG or PNG, max 5MB</p>
              </div>
            </div>
          </div>

          {/* License Number */}
          <div className="p-5″>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1″>
              <Hash className="w-4 h-4 text-gray-400″ /> License Number
            </label>
            <p className="text-xs text-gray-400 mb-2″>Your state contractor or trade license number. Required for Verified badge.</p>
            <Input
              value={form.licenseNumber}
              onChange={(e) => handleChange("licenseNumber", e.target.value)}
              placeholder="e.g. TX-CONT-123456″
              className="text-sm"
            />
            {(partner as any).licenseVerifiedAt && (
              <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1″>
                <CheckCircle className="w-3 h-3″ /> License verified
              </p>
            )}
          </div>

          {/* License File Upload */}
          <div className="p-5″>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1″>
              <FileText className="w-4 h-4 text-gray-400″ /> License Document
            </label>
            <p className="text-xs text-gray-400 mb-3″>Upload a copy of your contractor license (PDF, JPG, PNG — max 10MB).</p>
            {(partner as any).licenseUrl && (
              <div className="flex items-center gap-2 mb-3 p-2.5 rounded-lg bg-gray-50 border border-gray-200″>
                <FileText className="w-4 h-4 text-gray-400 flex-shrink-0″ />
                <div className="flex-1 min-w-0″>
                  <p className="text-xs font-medium text-gray-700″>License on file</p>
                  {(partner as any).licenseExpiresAt && (
                    <p className="text-xs text-gray-400″>Expires: {new Date((partner as any).licenseExpiresAt).toLocaleDateString()}</p>
                  )}
                </div>
                {(partner as any).licenseVerifiedAt ? (
                  <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#D1FAE5″, color: "#059669" }}>
                    <CheckCircle className="w-3 h-3″ /> Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FEF3C7″, color: "#D97706" }}>
                    <AlertTriangle className="w-3 h-3″ /> Pending Review
                  </span>
                )}
                <a href={(partner as any).licenseUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 hover:text-[#1B4FD8]" />
                </a>
              </div>
            )}
            <div className="mb-2″>
              <label className="text-xs text-gray-500 mb-1 block">License Expiration Date (optional)</label>
              <input type="date" value={licenseExpiry} onChange={e => setLicenseExpiry(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="border rounded-lg px-3 py-1.5 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1B4FD8]/30 w-full" />
            </div>
            <input ref={licenseInputRef} type="file" accept=".pdf,image/*" className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleLicenseUpload(f); }} />
            <Button type="button" variant="outline" size="sm" disabled={licenseUploading}
              onClick={() => licenseInputRef.current?.click()} className="gap-2 text-xs"
              style={{ borderColor: "#1B4FD8″, color: "#1B4FD8" }}>
              {licenseUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5″ />}
              {licenseUploading ? "Uploading..." : "Upload License Document"}
            </Button>
          </div>

          {/* Service ZIP Codes */}
          <div className="p-5″>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1″>
              <MapPin className="w-4 h-4 text-gray-400″ /> Service ZIP Codes
            </label>
            <p className="text-xs text-gray-400 mb-3″>
              Add the specific ZIP codes you serve. Your tier allows up to <strong>{(partner as any).maxZipCodes ?? 5}</strong> ZIP codes.
            </p>
            <div className="flex gap-2 mb-3″>
              <Input
                value={zipInput}
                onChange={e => setZipInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addZip(); } }}
                placeholder="75001″
                maxLength={5}
                className="text-sm w-32″
              />
              <Button type="button" variant="outline" size="sm" onClick={addZip} className="gap-1.5 text-xs">
                <Plus className="w-3.5 h-3.5″ /> Add
              </Button>
            </div>
            {serviceZipCodes.length > 0 && (
              <div className="flex flex-wrap gap-1.5″>
                {serviceZipCodes.map(zip => (
                  <span key={zip} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EFF6FF] text-[#1B4FD8] text-xs font-semibold border border-[#BFDBFE]">
                    {zip}
                    <button type="button" onClick={() => removeZip(zip)} className="hover:text-red-500 transition-colors">
                      <X className="w-3 h-3″ />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Hourly Rate / Job Size */}
          <div className="p-5″>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1″>
              <DollarSign className="w-4 h-4 text-gray-400″ /> Rate & Job Size Preference
            </label>
            <p className="text-xs text-gray-400 mb-3″>Help homeowners understand your pricing range and ideal job sizes.</p>
            <div className="flex items-center gap-3 mb-3″>
              <div className="flex-1″>
                <label className="text-xs text-gray-500 mb-1 block">Min rate ($/hr)</label>
                <Input
                  value={hourlyRateMin}
                  onChange={e => { setHourlyRateMin(e.target.value); setDirty(true); }}
                  placeholder="75″
                  type="number"
                  min="0″
                  className="text-sm"
                />
              </div>
              <span className="text-gray-400 text-sm mt-5″>–</span>
              <div className="flex-1″>
                <label className="text-xs text-gray-500 mb-1 block">Max rate ($/hr)</label>
                <Input
                  value={hourlyRateMax}
                  onChange={e => { setHourlyRateMax(e.target.value); setDirty(true); }}
                  placeholder="150″
                  type="number"
                  min="0″
                  className="text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-2 block">Preferred job sizes</label>
              <div className="flex flex-wrap gap-2″>
                {JOB_SIZE_OPTIONS.map(size => (
                  <button key={size} type="button" onClick={() => toggleJobSize(size)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                      jobSizePref.includes(size)
                        ? "bg-[#0A1628] text-white border-[#0A1628]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400″
                    }`}>
                    <Tag className="w-3 h-3 inline mr-1″ />
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Save button */}
          <div className="p-5 flex items-center justify-between">
            <p className="text-xs text-gray-400″>
              {dirty ? "You have unsaved changes" : "All changes saved"}
            </p>
            <Button
              onClick={handleSave}
              disabled={!dirty || updateProfile.isPending}
              className="text-white flex items-center gap-2″
              style={{ backgroundColor: "#0A1628″ }}
            >
              {updateProfile.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4″ />
              )}
              Save Changes
            </Button>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-6 grid grid-cols-2 gap-4″>
          <Link href="/dashboard/referral">
            <div className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:border-[#0A1628]/30 transition-colors group">
              <div className="flex items-center gap-3″>
                <div className="w-9 h-9 rounded-lg bg-[#F5E642]/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-[#0A1628]" />
                </div>
                <div className="flex-1 min-w-0″>
                  <p className="text-sm font-semibold text-gray-900″>Referral Hub</p>
                  <p className="text-xs text-gray-400″>Share your link</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#0A1628] transition-colors" />
              </div>
            </div>
          </Link>
          <Link href="/dashboard/reviews">
            <div className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:border-[#0A1628]/30 transition-colors group">
              <div className="flex items-center gap-3″>
                <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-500″ />
                </div>
                <div className="flex-1 min-w-0″>
                  <p className="text-sm font-semibold text-gray-900″>My Reviews</p>
                  <p className="text-xs text-gray-400″>See what partners say</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-yellow-500 transition-colors" />
              </div>
            </div>
          </Link>
          <Link href="/job/new">
            <div className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:border-[#0A1628]/30 transition-colors group">
              <div className="flex items-center gap-3″>
                <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Camera className="w-4 h-4 text-purple-500″ />
                </div>
                <div className="flex-1 min-w-0″>
                  <p className="text-sm font-semibold text-gray-900″>Log a Job</p>
                  <p className="text-xs text-gray-400″>Upload photos for AI</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-purple-500 transition-colors" />
              </div>
            </div>
          </Link>
          <Link href="/dashboard/tier">
            <div className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:border-[#0A1628]/30 transition-colors group">
              <div className="flex items-center gap-3″>
                <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Award className="w-4 h-4 text-amber-500″ />
                </div>
                <div className="flex-1 min-w-0″>
                  <p className="text-sm font-semibold text-gray-900″>Tier Progress</p>
                  <p className="text-xs text-gray-400″>Track your ranking</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-amber-500 transition-colors" />
              </div>
            </div>
          </Link>
        </div>

        {/* Photo Guide banner */}
        <Link href="/photo-guide">
          <div className="mt-4 bg-gradient-to-r from-[#0A1628] to-[#1B4FD8] rounded-xl p-4 cursor-pointer hover:opacity-95 transition-opacity group">
            <div className="flex items-center gap-3″>
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0″>
                <Camera className="w-4 h-4 text-[#F5E642]" />
              </div>
              <div className="flex-1 min-w-0″>
                <p className="text-sm font-semibold text-white">Photo Guide</p>
                <p className="text-xs text-blue-300″>Learn how to document homes for maximum AI match quality and origination rights</p>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-300 group-hover:text-[#F5E642] transition-colors flex-shrink-0″ />
            </div>
          </div>
        </Link>
      </div>
    </PartnerLayout>
  );
}
