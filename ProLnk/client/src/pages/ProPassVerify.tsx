/**
 * Pro Pass QR Verification Page
 * Route: /pass/:passCode
 * Public — shown when a facility manager scans a pro's QR code.
 */

import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { CheckCircle, XCircle, Shield, Home, Award, Calendar } from "lucide-react";

const CLEARANCE_LABELS: Record<string, { label: string; color: string }> = {
  residential: { label: "Residential", color: "bg-blue-500/10 text-blue-400" },
  commercial: { label: "Commercial", color: "bg-indigo-500/10 text-indigo-400" },
  school: { label: "School", color: "bg-purple-500/10 text-purple-400" },
  healthcare: { label: "Healthcare", color: "bg-pink-500/10 text-pink-400" },
  government: { label: "Government", color: "bg-red-500/10 text-red-400" },
};

export default function ProPassVerify() {
  const params = useParams<{ passCode: string }>();
  const verify = trpc.proPass.publicVerifyPass.useQuery(
    { passCode: params.passCode ?? "" },
    { enabled: !!params.passCode }
  );

  if (verify.isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Shield className="w-12 h-12 mx-auto mb-4 animate-pulse text-teal-500" />
          <p>Verifying credentials...</p>
        </div>
      </div>
    );
  }

  const data = verify.data;
  const isValid = data?.valid;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className={`p-6 text-center ${isValid ? "bg-green-500/10 border-b border-green-500/20" : "bg-red-500/10 border-b border-red-500/20"}`}>
          {isValid
            ? <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
            : <XCircle className="w-12 h-12 text-red-400 mx-auto mb-2" />
          }
          <div className={`text-2xl font-black ${isValid ? "text-green-400" : "text-red-400"}`}>
            {isValid ? "VERIFIED" : "NOT VERIFIED"}
          </div>
          {!isValid && data?.reason && (
            <p className="text-red-300 text-sm mt-1">{data.reason}</p>
          )}
        </div>

        {isValid && data && (
          <div className="p-6 space-y-4">
            {/* Person */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center text-xl font-bold text-white">
                {data.firstName?.[0]}{data.lastName?.[0]}
              </div>
              <div>
                <div className="text-xl font-black text-white">{data.firstName} {data.lastName}</div>
                <div className="text-gray-400 text-sm">{data.role}</div>
                <div className="text-gray-500 text-xs">{data.company}</div>
              </div>
            </div>

            {/* Clearance */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${CLEARANCE_LABELS[data.clearanceLevel]?.color ?? "bg-gray-700 text-gray-300"}`}>
              <Shield className="w-4 h-4" />
              {CLEARANCE_LABELS[data.clearanceLevel]?.label ?? data.clearanceLevel} Clearance
            </div>

            {/* Credentials */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Background Check</span>
                <span className={`font-semibold ${data.backgroundCheckStatus === "clear" ? "text-green-400" : "text-red-400"}`}>
                  {data.backgroundCheckStatus === "clear" ? "✓ Clear" : `✗ ${data.backgroundCheckStatus}`}
                </span>
              </div>
              {data.backgroundCheckExpiresAt && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">BG Check Expires</span>
                  <span className="text-gray-400">{new Date(data.backgroundCheckExpiresAt).toLocaleDateString()}</span>
                </div>
              )}
              {(data.osha10Certified || data.osha30Certified) && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">OSHA Certification</span>
                  <span className="text-green-400 font-semibold">✓ {data.osha30Certified ? "OSHA-30" : "OSHA-10"}</span>
                </div>
              )}
              {data.contractorLicenseNumber && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">License #{data.contractorLicenseNumber}</span>
                  <span className="text-gray-400 text-xs">{data.contractorLicenseState}</span>
                </div>
              )}
              {data.primaryTrade && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Primary Trade</span>
                  <span className="text-white">{data.primaryTrade.replace(/_/g, " ")}</span>
                </div>
              )}
            </div>

            {/* Verified timestamp */}
            <div className="bg-gray-800 rounded-xl p-3 flex items-center gap-2 text-xs text-gray-400">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              Verified {new Date(data.verifiedAt).toLocaleString()}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-800 px-6 py-4 border-t border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-teal-400" />
            <span className="text-teal-400 font-black text-sm">ProLnk</span>
          </div>
          <span className="text-gray-500 text-xs">prolnk.io/verify</span>
        </div>
      </div>
    </div>
  );
}
