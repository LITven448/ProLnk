import { useState, useRef, useEffect } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  User, MapPin, Globe, Phone, FileText, Save, Loader2,
  CheckCircle, Building2, Star, Award, Camera, ArrowRight,
  Shield, Upload, AlertTriangle, ExternalLink
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
  });
  const [dirty, setDirty] = useState(false);
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
      });
    }
  }, [profileData]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setDirty(true);
  };

  const handleSave = () => {
    updateProfile.mutate(form);
    setDirty(false);
  };

  if (isLoading) {
    return (
      <PartnerLayout>
        <div className="flex items-center justify-center py-24">
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
          <Building2 className="w-12 h-12 text-gray-200 mb-4" />
          <h2 className="text-xl font-heading text-gray-900 mb-2">No Partner Profile</h2>
          <p className="text-gray-500 mb-4">Apply to join the ProLnk network first.</p>
          <Link href="/apply">
            <Button className="text-white" style={{ backgroundColor: "#0A1628" }}>Apply Now</Button>
          </Link>
        </div>
      </PartnerLayout>
    );
  }

  const tierColors: Record<string, string> = {
    bronze: "#CD7F32", silver: "#9CA3AF", gold: "#F59E0B", platinum: "#8B5CF6"
  };
  const tierColor = tierColors[partner.tier ?? "bronze"] ?? "#CD7F32";

  const completionChecks = [
    { label: "Business name", done: !!partner.businessName },
    { label: "Service area", done: !!partner.serviceArea },
    { label: "Phone number", done: !!partner.contactPhone },
    { label: "Business description", done: !!partner.description },
    { label: "Website", done: !!partner.website },
    { label: "Service zip codes", done: !!((partner as any).serviceZipCodes?.length) },
    { label: "License on file", done: !!((partner as any).licenseFileUrl) },
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
        <div className="mb-8">
          <h1 className="text-2xl font-heading text-gray-900">Edit Profile</h1>
          <p className="text-gray-500 mt-1 text-sm">Update your business information visible to the ProLnk network</p>
        </div>

        {/* Profile Completion Progress */}
        {completionPct < 100 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-blue-900">Profile Completion</span>
              <span className="text-sm font-bold text-blue-700">{completionPct}%</span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2.5 mb-3">
              <div className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${completionPct}%` }} />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {incomplete.map(item => (
                <span key={item.label} className="text-xs px-2 py-0.5 bg-white/70 rounded-md text-blue-700 border border-blue-200">
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Profile summary card */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
              style={{ backgroundColor: tierColor + "20", color: tierColor }}>
              {partner.businessName?.charAt(0)?.toUpperCase() ?? "P"}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-heading text-gray-900 text-lg">{partner.businessName}</h2>
              <p className="text-sm text-gray-500">{partner.businessType}  {partner.serviceArea}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                style={{ backgroundColor: tierColor + "15", color: tierColor }}>
                {partner.tier ?? "bronze"} tier
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Star className="w-3 h-3" />
                <span>{partner.referralCount ?? 0} referrals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit form */}
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {/* Business Name */}
          <div className="p-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Building2 className="w-4 h-4 text-gray-400" /> Business Name
            </label>
            <Input
              value={form.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              placeholder="Your business name"
              className="text-sm"
            />
          </div>

          {/* Service Area */}
          <div className="p-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="w-4 h-4 text-gray-400" /> Service Area
            </label>
            <Input
              value={form.serviceArea}
              onChange={(e) => handleChange("serviceArea", e.target.value)}
              placeholder="e.g. Dallas, TX -- DFW Metroplex"
              className="text-sm"
            />
            <p className="text-xs text-gray-400 mt-1.5">This is shown to other partners and homeowners when matching leads.</p>
          </div>

          {/* Phone */}
          <div className="p-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Phone className="w-4 h-4 text-gray-400" /> Contact Phone
            </label>
            <Input
              value={form.contactPhone}
              onChange={(e) => handleChange("contactPhone", e.target.value)}
              placeholder="(214) 555-0100"
              type="tel"
              className="text-sm"
            />
          </div>

          {/* Website */}
          <div className="p-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Globe className="w-4 h-4 text-gray-400" /> Website
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
          <div className="p-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Star className="w-4 h-4 text-yellow-400" /> Google Review Link
            </label>
            <Input
              value={form.googleReviewUrl}
              onChange={(e) => handleChange("googleReviewUrl", e.target.value)}
              placeholder="https://g.page/r/your-business/review"
              type="url"
              className="text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">Paste your Google Business review link. When homeowners leave 4-5 star ratings, they'll be prompted to also leave a Google review.</p>
          </div>

          {/* Description */}
          <div className="p-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-gray-400" /> Business Description
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
          <div className="p-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <Shield className="w-4 h-4 text-[#00B5B8]" /> Certificate of Insurance (COI)
            </label>
            <p className="text-xs text-gray-400 mb-3">
              Upload your current COI to earn the Verified badge and unlock higher-tier leads.
              Accepted formats: PDF, JPG, PNG (max 10MB).
            </p>

            {/* Current COI status */}
            {(partner as any).coiUrl && (
              <div className="flex items-center gap-2 mb-3 p-2.5 rounded-lg bg-gray-50 border border-gray-200">
                <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-700">COI on file</p>
                  {(partner as any).coiExpiresAt && (
                    <p className="text-xs text-gray-400">
                      Expires: {new Date((partner as any).coiExpiresAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {(partner as any).coiVerifiedAt ? (
                  <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#D1FAE5", color: "#059669" }}>
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FEF3C7", color: "#D97706" }}>
                    <AlertTriangle className="w-3 h-3" /> Pending Review
                  </span>
                )}
                <a href={(partner as any).coiUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 hover:text-[#00B5B8]" />
                </a>
              </div>
            )}

            {/* Expiry date input */}
            <div className="mb-2">
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
              style={{ borderColor: "#00B5B8", color: "#00B5B8" }}
            >
              {coiUploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              {coiUploading ? "Uploading..." : "Upload COI Document"}
            </Button>
          </div>

          {/* Save button */}
          <div className="p-5 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              {dirty ? "You have unsaved changes" : "All changes saved"}
            </p>
            <Button
              onClick={handleSave}
              disabled={!dirty || updateProfile.isPending}
              className="text-white flex items-center gap-2"
              style={{ backgroundColor: "#0A1628" }}
            >
              {updateProfile.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </Button>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Link href="/dashboard/referral">
            <div className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:border-[#0A1628]/30 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F5E642]/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-[#0A1628]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">Referral Hub</p>
                  <p className="text-xs text-gray-400">Share your link</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#0A1628] transition-colors" />
              </div>
            </div>
          </Link>
          <Link href="/dashboard/reviews">
            <div className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:border-[#0A1628]/30 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">My Reviews</p>
                  <p className="text-xs text-gray-400">See what partners say</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-yellow-500 transition-colors" />
              </div>
            </div>
          </Link>
          <Link href="/job/new">
            <div className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:border-[#0A1628]/30 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Camera className="w-4 h-4 text-purple-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">Log a Job</p>
                  <p className="text-xs text-gray-400">Upload photos for AI</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-purple-500 transition-colors" />
              </div>
            </div>
          </Link>
          <Link href="/dashboard/tier">
            <div className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:border-[#0A1628]/30 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Award className="w-4 h-4 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">Tier Progress</p>
                  <p className="text-xs text-gray-400">Track your ranking</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-amber-500 transition-colors" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </PartnerLayout>
  );
}
