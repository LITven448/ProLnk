/**
 * Public Briefcase Verification Page
 * Route: /verify/:slug
 * Public — shown when a facility manager views a company's briefcase link.
 */

import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { CheckCircle, Shield, Clock, AlertTriangle, Star, Users } from "lucide-react";

const STATUS_BADGE: Record<string, { color: string; label: string }> = {
  active: { color: "bg-green-500/10 text-green-400 border-green-500/30", label: "Active & Verified" },
  restricted: { color: "bg-orange-500/10 text-orange-400 border-orange-500/30", label: "Restricted" },
};

const DOC_LABELS: Record<string, string> = {
  general_liability: "General Liability Insurance",
  workers_comp: "Workers Compensation",
  contractor_license: "Contractor License",
  w9: "W-9 Tax Form",
  ein: "EIN Document",
  llc_registration: "Business Registration",
  business_license: "Business License",
  bonding: "Bonding Certificate",
  osha_certification: "OSHA Certification",
};

export default function PublicBriefcaseVerify() {
  const params = useParams<{ slug: string }>();
  const verify = trpc.briefcase.publicVerify.useQuery({ slug: params.slug ?? "" }, { enabled: !!params.slug });

  if (verify.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <Shield className="w-12 h-12 mx-auto mb-4 animate-pulse text-indigo-500" />
          <p>Loading briefcase...</p>
        </div>
      </div>
    );
  }

  const data = verify.data;
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700">Briefcase Not Found</h2>
          <p className="text-gray-500 mt-2">This link may have expired or the company is not currently active.</p>
        </div>
      </div>
    );
  }

  const statusConfig = STATUS_BADGE[data.status] ?? STATUS_BADGE.active;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gray-900 p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xl font-black text-white mb-1">{data.businessName}</div>
                <div className="text-gray-400 text-sm">{data.businessType?.replace(/_/g, " ")}</div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${statusConfig.color}`}>
                {statusConfig.label}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-black text-gray-900">{data.briefcaseScore}</div>
                <div className="text-gray-500 text-sm">Briefcase Score</div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-gray-900">{parseFloat(String(data.rating || "0")).toFixed(1)}</span>
                <span className="text-gray-400 text-sm">({data.reviewCount ?? 0} reviews)</span>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${data.briefcaseScore}%` }} />
            </div>
          </div>
        </div>

        {/* Insurance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-500" />
            Insurance Coverage
          </h3>
          <div className="space-y-3">
            {data.generalLiabilityAmount && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">General Liability</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">${parseFloat(String(data.generalLiabilityAmount)).toLocaleString()}</span>
                  {data.generalLiabilityExpiresAt && (
                    <span className="text-gray-400 text-xs">exp. {new Date(data.generalLiabilityExpiresAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Verified Documents */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <h3 className="font-bold text-gray-900 mb-4">Verified Documents</h3>
          <div className="space-y-2">
            {(data.verifiedDocuments ?? []).map((doc: any, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                <span className="text-gray-700 text-sm flex-1">{DOC_LABELS[doc.documentType] ?? doc.documentType}</span>
                {doc.expiryDate && (
                  <span className="text-gray-400 text-xs">expires {new Date(doc.expiryDate).toLocaleDateString()}</span>
                )}
              </div>
            ))}
            {(!data.verifiedDocuments || !data.verifiedDocuments.length) && (
              <p className="text-gray-400 text-sm">No verified documents on file</p>
            )}
          </div>
        </div>

        {/* Pro Pass Summary */}
        {data.proPassSummary && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              Team Credentials
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-black text-gray-900">{data.proPassSummary.active ?? 0}</div>
                <div className="text-gray-500 text-xs">Active Passes</div>
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900">{data.proPassSummary.backgroundClear ?? 0}</div>
                <div className="text-gray-500 text-xs">Background Clear</div>
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900">{data.proPassSummary.oshaCount ?? 0}</div>
                <div className="text-gray-500 text-xs">OSHA Certified</div>
              </div>
            </div>
          </div>
        )}

        {/* Last reviewed */}
        <div className="text-center text-gray-400 text-xs flex items-center justify-center gap-2 mb-4">
          <Clock className="w-3.5 h-3.5" />
          Last reviewed: {data.lastReviewedAt ? new Date(data.lastReviewedAt).toLocaleDateString() : "Pending"} ·
          Next review: {data.nextReviewDueAt ? new Date(data.nextReviewDueAt).toLocaleDateString() : "Scheduled"}
        </div>

        {/* Footer */}
        <div className="text-center">
          <a href="https://prolnk.io" className="text-indigo-500 text-sm font-semibold hover:underline">
            Verified by ProLnk Partner Network
          </a>
        </div>
      </div>
    </div>
  );
}
