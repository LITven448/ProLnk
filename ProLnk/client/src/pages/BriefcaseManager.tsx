/**
 * Partner Briefcase Manager
 * Route: /dashboard/briefcase
 * Partners manage their company credentials here.
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Briefcase, Upload, CheckCircle, Clock, AlertTriangle,
  FileText, Shield, ExternalLink, RefreshCw,
} from "lucide-react";

const DOC_TYPES = [
  { key: "general_liability", label: "General Liability Insurance", icon: "🛡️", required: true, weight: 25 },
  { key: "workers_comp", label: "Workers Compensation", icon: "👷", required: true, weight: 20 },
  { key: "contractor_license", label: "Contractor License", icon: "📋", required: true, weight: 20 },
  { key: "w9", label: "W-9 Form", icon: "📄", required: true, weight: 10 },
  { key: "ein", label: "EIN Document", icon: "🏛️", required: true, weight: 10 },
  { key: "llc_registration", label: "LLC / Business Registration", icon: "🏢", required: false, weight: 8 },
  { key: "business_license", label: "Business License", icon: "🏪", required: false, weight: 5 },
  { key: "bonding", label: "Bonding Certificate", icon: "🔒", required: false, weight: 2 },
];

const STATUS_CONFIG: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
  missing:    { color: "text-gray-500", label: "Upload required", icon: <Upload className="w-4 h-4" /> },
  pending:    { color: "text-yellow-400", label: "Pending review", icon: <Clock className="w-4 h-4" /> },
  verified:   { color: "text-green-400", label: "Verified", icon: <CheckCircle className="w-4 h-4" /> },
  expired:    { color: "text-red-400", label: "Expired", icon: <AlertTriangle className="w-4 h-4" /> },
  rejected:   { color: "text-red-400", label: "Rejected", icon: <AlertTriangle className="w-4 h-4" /> },
  exempt:     { color: "text-blue-400", label: "Exempt", icon: <CheckCircle className="w-4 h-4" /> },
  not_applicable: { color: "text-gray-500", label: "N/A", icon: null },
};

export default function BriefcaseManager() {
  const [uploadingType, setUploadingType] = useState<string | null>(null);
  const myBriefcase = trpc.briefcase.getMyBriefcase.useQuery();
  const initBriefcase = trpc.briefcase.initializeBriefcase.useMutation({
    onSuccess: () => { myBriefcase.refetch(); toast.success("Briefcase initialized!"); },
    onError: (e) => toast.error(e.message),
  });
  const uploadDoc = trpc.briefcase.uploadDocument.useMutation({
    onSuccess: () => { myBriefcase.refetch(); setUploadingType(null); toast.success("Document uploaded! Pending admin verification."); },
    onError: (e) => { setUploadingType(null); toast.error(e.message); },
  });

  const briefcase = myBriefcase.data?.briefcase;
  const documents = myBriefcase.data?.documents ?? [];
  const score = briefcase?.briefcaseScore ?? 0;

  const getDocStatus = (docType: string) => {
    const statusField = `${docType.replace(/_([a-z])/g, (_, c) => c.toUpperCase())}Status`;
    const status = briefcase?.[statusField as keyof typeof briefcase];
    return (status as string) ?? "missing";
  };

  const handleFileUpload = async (docType: string, file: File) => {
    setUploadingType(docType);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      const typeConfig = DOC_TYPES.find(d => d.key === docType);
      uploadDoc.mutate({
        documentType: docType as any,
        documentTitle: typeConfig?.label,
        fileBase64: base64.split(",")[1],
        fileName: file.name,
        mimeType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  if (myBriefcase.isLoading) return <PartnerLayout><div className="flex items-center justify-center h-64 text-gray-500">Loading...</div></PartnerLayout>;

  if (!briefcase) {
    return (
      <PartnerLayout>
        <div className="max-w-2xl mx-auto">
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Set Up Your Briefcase</h2>
            <p className="text-gray-400 text-sm mb-8">Your Briefcase contains all your company credentials. Higher scores unlock more leads and commercial opportunities.</p>
            <Button onClick={() => initBriefcase.mutate()} disabled={initBriefcase.isPending} className="bg-teal-500 hover:bg-teal-400 text-white font-bold">
              {initBriefcase.isPending ? "Setting up..." : "Initialize My Briefcase"}
            </Button>
          </div>
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">My Briefcase</h1>
            <p className="text-gray-400 text-sm mt-1">Company credentials and verification status</p>
          </div>
          {briefcase.briefcaseSlug && (
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 gap-2" onClick={() => window.open(`/verify/${briefcase.briefcaseSlug}`, "_blank")}>
              <ExternalLink className="w-4 h-4" />
              Public Profile
            </Button>
          )}
        </div>

        {/* Score card */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-4xl font-black text-white">{score}<span className="text-gray-500 text-lg">/100</span></div>
              <div className="text-gray-400 text-sm">Briefcase Score</div>
            </div>
            <Badge className={
              briefcase.status === "active" ? "bg-green-500/10 text-green-400 border-green-500/30" :
              briefcase.status === "restricted" ? "bg-orange-500/10 text-orange-400 border-orange-500/30" :
              "bg-gray-700 text-gray-400"
            }>
              <Shield className="w-3 h-3 mr-1" />
              {briefcase.status?.charAt(0).toUpperCase() + briefcase.status?.slice(1)}
            </Badge>
          </div>
          <Progress value={score} className="h-2 bg-gray-700" />
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <span>Restricted (30+)</span>
            <span>Active (60+)</span>
            <span>Verified (90+)</span>
          </div>
        </div>

        {/* Documents */}
        <div className="space-y-3">
          {DOC_TYPES.map((doc) => {
            const status = getDocStatus(doc.key);
            const statusConfig = STATUS_CONFIG[status] ?? STATUS_CONFIG.missing;
            const existingDoc = documents.find((d: any) => d.documentType === doc.key);
            const isUploading = uploadingType === doc.key;

            return (
              <div key={doc.key} className={`bg-gray-800 rounded-xl p-4 border transition-all ${status === "verified" ? "border-green-500/20" : status === "pending" ? "border-yellow-500/20" : status === "expired" ? "border-red-500/20" : "border-gray-700"}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{doc.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">{doc.label}</span>
                      {doc.required && <span className="text-xs text-red-400">required</span>}
                    </div>
                    {existingDoc?.expiryDate && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        Expires: {new Date(existingDoc.expiryDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs font-medium ${statusConfig.color}`}>
                    {statusConfig.icon}
                    {statusConfig.label}
                  </div>
                  <label className="cursor-pointer">
                    <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" onChange={e => e.target.files?.[0] && handleFileUpload(doc.key, e.target.files[0])} />
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white text-xs" disabled={isUploading} asChild>
                      <span>{isUploading ? "Uploading..." : status === "verified" ? "Replace" : "Upload"}</span>
                    </Button>
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center text-gray-600 text-xs">
          Documents are verified by ProLnk admin within 1-2 business days. Quarterly reviews run automatically.
        </div>
      </div>
    </PartnerLayout>
  );
}
