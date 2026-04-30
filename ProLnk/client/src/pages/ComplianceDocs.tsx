import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield, FileCheck, Upload, AlertTriangle, CheckCircle2,
  Download, Trash2, Lock, ExternalLink
} from "lucide-react";

export default function ComplianceDocs() {

  const utils = trpc.useUtils();

  // Partner profile data
  const { data: partner } = trpc.partners.getMyProfile.useQuery();

  // COI upload state
  const [coiUrl, setCoiUrl] = useState("");
  const [coiExpiry, setCoiExpiry] = useState("");
  const [coiUploading, setCoiUploading] = useState(false);

  // License state
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseUrl, setLicenseUrl] = useState("");
  const [licenseUploading, setLicenseUploading] = useState(false);

  // CCPA state
  const [exportRequested, setExportRequested] = useState(false);
  const [deleteRequested, setDeleteRequested] = useState(false);

  const uploadCoi = trpc.compliance.uploadCoi.useMutation({
    onSuccess: () => {
      toast.success("COI submitted for review.");
      utils.partners.getMyProfile.invalidate();
      setCoiUrl(""); setCoiExpiry("");
    },
    onError: (e) => toast.error(e.message),
  });

  const uploadLicense = trpc.compliance.uploadLicense.useMutation({
    onSuccess: () => {
      toast.success("License submitted for review.");
      utils.partners.getMyProfile.invalidate();
      setLicenseNumber(""); setLicenseUrl("");
    },
    onError: (e) => toast.error(e.message),
  });

  const requestExport = trpc.compliance.requestDataExport.useMutation({
    onSuccess: () => { setExportRequested(true); toast.success("Data export requested -- ready within 30 days."); },
    onError: (e) => toast.error(e.message),
  });

  const requestDeletion = trpc.compliance.requestDataDeletion.useMutation({
    onSuccess: () => { setDeleteRequested(true); toast.success("Data deletion request submitted."); },
    onError: (e) => toast.error(e.message),
  });

  const handleCoiUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoiUploading(true);
    try {
      const fd = new FormData();
      fd.append("photo", file);
      const resp = await fetch("/api/upload-photos", {
        method: "POST",
        body: JSON.stringify({ photos: [await fileToBase64(file)] }),
        headers: { "Content-Type": "application/json" },
      });
      if (resp.ok) {
        const data = await resp.json();
        setCoiUrl(data.urls?.[0] ?? "");
      }
    } catch {
      toast.error("Upload failed -- try pasting a URL instead.");
    }
    setCoiUploading(false);
  };

  const handleLicenseUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLicenseUploading(true);
    try {
      const fd = new FormData();
      fd.append("photo", file);
      const resp = await fetch("/api/upload-photos", {
        method: "POST",
        body: JSON.stringify({ photos: [await fileToBase64(file)] }),
        headers: { "Content-Type": "application/json" },
      });
      if (resp.ok) {
        const data = await resp.json();
        setLicenseUrl(data.urls?.[0] ?? "");
      }
    } catch {
      toast.error("Upload failed -- try pasting a URL instead.");
    }
    setLicenseUploading(false);
  };

  return (

    <PartnerLayout>

    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
          <Shield className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Compliance & Documents</h1>
          <p className="text-sm text-gray-400">Upload your COI, license, and manage your data rights</p>
        </div>
      </div>

      {/* Strike Status */}
      {partner && (partner as any).strikeCount > 0 && (
        <Card className="bg-orange-500/10 border-orange-500/30">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0" />
            <div>
              <p className="text-orange-300 font-semibold text-sm">
                {(partner as any).strikeCount} Strike{(partner as any).strikeCount > 1 ? "s" : ""} on Record
              </p>
              <p className="text-orange-400/70 text-xs mt-0.5">
                {(partner as any).strikeCount >= 2
                  ? "Warning: One more strike will result in account suspension."
                  : "Please review our partner guidelines to avoid further strikes."}
              </p>
              {(partner as any).lastStrikeReason && (
                <p className="text-orange-400/60 text-xs mt-1">Last reason: {(partner as any).lastStrikeReason}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* COI Section */}
      <Card className="bg-[#0D1525] border-white/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-white flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            Certificate of Insurance (COI)
            {(partner as any)?.coiVerifiedAt ? (
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs ml-auto">Verified</Badge>
            ) : (partner as any)?.coiUrl ? (
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs ml-auto">Pending Review</Badge>
            ) : (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs ml-auto">Not Submitted</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(partner as any)?.coiUrl && (
            <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
              <FileCheck className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300 flex-1 truncate">COI on file</span>
              <a href={(partner as any).coiUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-400 hover:text-blue-300">
                  <ExternalLink className="w-3 h-3 mr-1" /> View
                </Button>
              </a>
            </div>
          )}
          <div className="space-y-3">
            <div>
              <Label className="text-gray-400 text-xs mb-1.5 block">Upload COI Document</Label>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleCoiUpload}
                disabled={coiUploading}
                className="bg-white/5 border-white/10 text-gray-300 text-sm file:text-gray-400 file:bg-transparent file:border-0"
              />
              <p className="text-gray-500 text-xs mt-1">Or paste a direct URL below</p>
            </div>
            <div>
              <Label className="text-gray-400 text-xs mb-1.5 block">COI Document URL</Label>
              <Input
                value={coiUrl}
                onChange={(e) => setCoiUrl(e.target.value)}
                placeholder="https://..."
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
              />
            </div>
            <div>
              <Label className="text-gray-400 text-xs mb-1.5 block">Expiration Date</Label>
              <Input
                type="date"
                value={coiExpiry}
                onChange={(e) => setCoiExpiry(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <Button
              onClick={() => {
                if (!coiUrl || !coiExpiry) return;
                uploadCoi.mutate({ coiUrl, expiresAt: new Date(coiExpiry).getTime() });
              }}
              disabled={!coiUrl || !coiExpiry || uploadCoi.isPending}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploadCoi.isPending ? "Submitting..." : "Submit COI for Review"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* License Section */}
      <Card className="bg-[#0D1525] border-white/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" />
            Business License
            {(partner as any)?.licenseVerifiedAt ? (
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs ml-auto">Verified</Badge>
            ) : (partner as any)?.licenseUrl ? (
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs ml-auto">Pending Review</Badge>
            ) : (
              <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs ml-auto">Optional</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label className="text-gray-400 text-xs mb-1.5 block">License Number</Label>
            <Input
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              placeholder="e.g. TX-12345678"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
            />
          </div>
          <div>
            <Label className="text-gray-400 text-xs mb-1.5 block">License Document URL or Upload</Label>
            <Input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleLicenseUpload}
              disabled={licenseUploading}
              className="bg-white/5 border-white/10 text-gray-300 text-sm file:text-gray-400 file:bg-transparent file:border-0"
            />
            <Input
              value={licenseUrl}
              onChange={(e) => setLicenseUrl(e.target.value)}
              placeholder="Or paste URL..."
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 mt-2"
            />
          </div>
          <Button
            onClick={() => {
              if (!licenseNumber || !licenseUrl) return;
              uploadLicense.mutate({ licenseNumber, licenseUrl });
            }}
            disabled={!licenseNumber || !licenseUrl || uploadLicense.isPending}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white"
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploadLicense.isPending ? "Submitting..." : "Submit License for Review"}
          </Button>
        </CardContent>
      </Card>

      {/* CCPA / Data Rights */}
      <Card className="bg-[#0D1525] border-white/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" />
            Your Data Rights (CCPA)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400 text-sm">
            Under the California Consumer Privacy Act (CCPA) and similar laws, you have the right to request a copy of your data or request its deletion.
          </p>
          <Separator className="bg-white/5" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">Request Data Export</p>
              <p className="text-gray-500 text-xs mt-0.5">Receive a copy of all your data within 30 days</p>
            </div>
            {exportRequested || (partner as any)?.dataExportRequestedAt ? (
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4" />
                Requested
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => requestExport.mutate()}
                disabled={requestExport.isPending}
                className="border-white/10 text-gray-300 hover:text-white bg-transparent text-xs"
              >
                <Download className="w-3 h-3 mr-1.5" />
                Request Export
              </Button>
            )}
          </div>
          <Separator className="bg-white/5" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">Request Data Deletion</p>
              <p className="text-gray-500 text-xs mt-0.5">Permanently delete your account and all associated data</p>
            </div>
            {deleteRequested || (partner as any)?.dataDeleteRequestedAt ? (
              <div className="flex items-center gap-1.5 text-red-400 text-xs">
                <CheckCircle2 className="w-4 h-4" />
                Requested
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (confirm("This will permanently delete all your data. This cannot be undone. Continue?")) {
                    requestDeletion.mutate();
                  }
                }}
                disabled={requestDeletion.isPending}
                className="border-red-500/30 text-red-400 hover:text-red-300 bg-transparent text-xs"
              >
                <Trash2 className="w-3 h-3 mr-1.5" />
                Request Deletion
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>

    </PartnerLayout>

  );
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
