import { useMemo } from "react";
import { Link } from "wouter";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck, Clock, CheckCircle, XCircle, Loader2,
  ArrowRight, Building2, FileText, UserCheck, Star,
  BadgeCheck, AlertTriangle, Lock, ChevronRight,
} from "lucide-react";

type VerificationStatus = "not_started" | "submitted" | "pending" | "verified" | "expired" | "failed";

interface VerificationItem {
  id: string;
  label: string;
  description: string;
  status: VerificationStatus;
  detail?: string;
  actionLabel?: string;
  actionHref?: string;
  weight: number;
}

function statusIcon(status: VerificationStatus) {
  if (status === "verified") return <CheckCircle className="w-5 h-5 text-emerald-500" />;
  if (status === "pending" || status === "submitted") return <Clock className="w-5 h-5 text-amber-400" />;
  if (status === "failed" || status === "expired") return <XCircle className="w-5 h-5 text-red-400" />;
  return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
}

function statusBadge(status: VerificationStatus) {
  if (status === "verified") return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
      <CheckCircle className="w-3 h-3" /> Verified
    </span>
  );
  if (status === "submitted") return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
      <Clock className="w-3 h-3" /> Submitted
    </span>
  );
  if (status === "pending") return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
      <Clock className="w-3 h-3" /> Under Review
    </span>
  );
  if (status === "expired") return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
      <AlertTriangle className="w-3 h-3" /> Expired
    </span>
  );
  if (status === "failed") return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
      <XCircle className="w-3 h-3" /> Needs Attention
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
      Not Started
    </span>
  );
}

export default function PartnerVerification() {
  const { data: profileData, isLoading } = trpc.partners.getMyProfile.useQuery();

  const partner = (profileData as any)?.stats ?? profileData;

  const items = useMemo((): VerificationItem[] => {
    if (!partner) return [];

    const profileFields = [
      partner.businessName,
      partner.serviceArea,
      partner.contactPhone,
      partner.description,
      partner.website,
    ];
    const profileDone = profileFields.filter(Boolean).length;
    const profilePct = Math.round((profileDone / profileFields.length) * 100);

    const profileStatus: VerificationStatus =
      profilePct === 100 ? "verified" : profilePct >= 60 ? "submitted" : "not_started";

    const licenseStatus: VerificationStatus =
      partner.licenseVerifiedAt ? "verified"
        : partner.licenseUrl ? "pending"
          : partner.licenseNumber ? "submitted"
            : "not_started";

    const licenseDetail = partner.licenseExpiresAt
      ? `Expires ${new Date(partner.licenseExpiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
      : undefined;

    const coiStatus: VerificationStatus =
      partner.coiVerifiedAt ? "verified"
        : (() => {
            if (!partner.coiUrl) return "not_started";
            if (partner.coiExpiresAt && new Date(partner.coiExpiresAt) < new Date()) return "expired";
            return "pending";
          })();

    const coiDetail = partner.coiExpiresAt
      ? `Expires ${new Date(partner.coiExpiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
      : undefined;

    const bgcStatus: VerificationStatus =
      partner.backgroundCheckVerifiedAt ? "verified" : "not_started";

    return [
      {
        id: "profile",
        label: "Profile Completeness",
        description: "Business name, phone, service area, description, and website.",
        status: profileStatus,
        detail: `${profilePct}% complete — ${5 - profileDone} field${profileDone < 4 ? "s" : ""} remaining`,
        actionLabel: "Edit Profile",
        actionHref: "/dashboard/profile",
        weight: 25,
      },
      {
        id: "license",
        label: "License Verification",
        description: "Upload your state contractor or trade license for review.",
        status: licenseStatus,
        detail: licenseDetail,
        actionLabel: licenseStatus === "not_started" ? "Upload License" : undefined,
        actionHref: licenseStatus === "not_started" ? "/dashboard/profile" : undefined,
        weight: 30,
      },
      {
        id: "insurance",
        label: "Certificate of Insurance",
        description: "Current COI showing general liability coverage.",
        status: coiStatus,
        detail: coiDetail,
        actionLabel: coiStatus === "not_started" || coiStatus === "expired" ? "Upload COI" : undefined,
        actionHref: coiStatus === "not_started" || coiStatus === "expired" ? "/dashboard/profile" : undefined,
        weight: 30,
      },
      {
        id: "background",
        label: "Background Check",
        description: "Identity and criminal background screening via Checkr.",
        status: bgcStatus,
        actionLabel: bgcStatus === "not_started" ? "Initiate Check" : undefined,
        actionHref: bgcStatus === "not_started" ? "/dashboard/background-check" : undefined,
        weight: 15,
      },
    ];
  }, [partner]);

  const verificationScore = useMemo(() => {
    return items.reduce((total, item) => {
      if (item.status === "verified") return total + item.weight;
      if (item.status === "pending" || item.status === "submitted") return total + Math.floor(item.weight * 0.5);
      return total;
    }, 0);
  }, [items]);

  const isFullyVerified = verificationScore >= 100;

  const nextSteps = items.filter(i => i.status === "not_started" || i.status === "expired" || i.status === "failed");

  if (isLoading) {
    return (
      <PartnerLayout>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-[#0A1628]" />
        </div>
      </PartnerLayout>
    );
  }

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

  return (
    <PartnerLayout>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-heading text-gray-900">Verification Status</h1>
          <p className="text-gray-500 mt-1 text-sm">Complete all verification steps to earn the ProLnk Verified badge and unlock premium leads.</p>
        </div>

        {/* Score card */}
        <div className="bg-gradient-to-br from-[#0A1628] to-[#1B4FD8] rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="relative flex items-center gap-5">
            {/* Score ring */}
            <div className="flex-shrink-0 relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
                <circle cx="40" cy="40" r="34" fill="none" stroke={isFullyVerified ? "#34D399" : "#F5E642"}
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - verificationScore / 100)}`}
                  style={{ transition: "stroke-dashoffset 0.6s ease" }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-black text-white">{verificationScore}%</span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Verification Score</p>
              <h2 className="text-xl font-black text-white mb-1">
                {isFullyVerified ? "Fully Verified" : verificationScore >= 75 ? "Almost There" : verificationScore >= 50 ? "In Progress" : "Getting Started"}
              </h2>
              <p className="text-sm text-white/70">
                {isFullyVerified
                  ? "Your ProLnk Verified badge is active. You're getting priority lead routing."
                  : `${nextSteps.length} step${nextSteps.length !== 1 ? "s" : ""} remaining to unlock your Verified badge.`}
              </p>
            </div>
          </div>
        </div>

        {/* Verified Badge Preview */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BadgeCheck className="w-4 h-4 text-[#0A1628]" />
            <h3 className="text-sm font-bold text-gray-900">Your Badge Preview</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
              isFullyVerified
                ? "border-emerald-400 bg-emerald-50"
                : verificationScore >= 50
                  ? "border-amber-300 bg-amber-50"
                  : "border-gray-200 bg-gray-50 opacity-60"
            }`}>
              <ShieldCheck className={`w-5 h-5 ${isFullyVerified ? "text-emerald-600" : "text-gray-400"}`} />
              <div>
                <p className={`text-sm font-black ${isFullyVerified ? "text-emerald-700" : "text-gray-500"}`}>
                  ProLnk Verified
                </p>
                <p className={`text-xs ${isFullyVerified ? "text-emerald-600" : "text-gray-400"}`}>
                  {isFullyVerified ? "Active · Shown in directory" : "Locked until verification complete"}
                </p>
              </div>
              {isFullyVerified && <CheckCircle className="w-4 h-4 text-emerald-500 ml-1" />}
              {!isFullyVerified && <Lock className="w-4 h-4 text-gray-300 ml-1" />}
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 leading-relaxed">
                {isFullyVerified
                  ? "Your badge is live in the partner directory. Homeowners can trust your listing."
                  : "Complete all verification steps to activate this badge on your public directory listing."}
              </p>
            </div>
          </div>
        </div>

        {/* Verification checklist */}
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 mb-6">
          <div className="px-5 py-4">
            <h3 className="text-sm font-bold text-gray-900">Verification Checklist</h3>
          </div>
          {items.map((item) => (
            <div key={item.id} className="p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">{statusIcon(item.status)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    {statusBadge(item.status)}
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{item.description}</p>
                  {item.detail && (
                    <p className={`text-xs font-medium ${
                      item.status === "verified" ? "text-emerald-600"
                        : item.status === "expired" ? "text-red-500"
                          : "text-amber-600"
                    }`}>
                      {item.detail}
                    </p>
                  )}
                </div>
                {item.actionLabel && item.actionHref && (
                  <Link href={item.actionHref}>
                    <button className="flex items-center gap-1 text-xs font-semibold text-[#1B4FD8] hover:underline flex-shrink-0 mt-0.5">
                      {item.actionLabel} <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                )}
              </div>

              {/* Progress bar for profile item */}
              {item.id === "profile" && item.status !== "verified" && (
                <div className="mt-3 ml-8">
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-gradient-to-r from-[#1B4FD8] to-[#00B5B8] transition-all"
                      style={{ width: item.detail?.match(/(\d+)%/)?.[1] ? `${item.detail.match(/(\d+)%/)![1]}%` : "0%" }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Next Steps */}
        {nextSteps.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-amber-900">Next Steps to Get Verified</h3>
            </div>
            <ul className="space-y-2">
              {nextSteps.map((step) => (
                <li key={step.id} className="flex items-start gap-2">
                  <span className="mt-0.5 w-4 h-4 rounded-full border-2 border-amber-400 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-amber-800 font-medium">{step.label}</p>
                    <p className="text-xs text-amber-700">{step.description}</p>
                  </div>
                  {step.actionHref && (
                    <Link href={step.actionHref}>
                      <Button size="sm" variant="outline" className="text-xs border-amber-300 text-amber-700 hover:bg-amber-100 flex-shrink-0">
                        {step.actionLabel ?? "Complete"} <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* What verification unlocks */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            What Verification Unlocks
          </h3>
          <ul className="space-y-3">
            {[
              { icon: ShieldCheck, label: "ProLnk Verified badge", detail: "Shown on your directory listing and profile", color: "text-emerald-500" },
              { icon: UserCheck, label: "Priority lead routing", detail: "Verified pros get first access to high-value leads", color: "text-[#1B4FD8]" },
              { icon: FileText, label: "Higher commission tier eligibility", detail: "Unlock crew and company tier income levels", color: "text-purple-500" },
              { icon: Star, label: "Homeowner trust signals", detail: "Badge visible to homeowners when they receive your quote", color: "text-amber-500" },
            ].map(({ icon: Icon, label, detail, color }) => (
              <li key={label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-500">{detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <Link href="/dashboard/profile">
          <div className="bg-gradient-to-r from-[#0A1628] to-[#1B4FD8] rounded-xl p-5 cursor-pointer hover:opacity-95 transition-opacity group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#F5E642]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Complete Your Profile</p>
                <p className="text-xs text-blue-300">Add missing fields, upload documents, and earn your Verified badge.</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-[#F5E642] transition-colors" />
            </div>
          </div>
        </Link>
      </div>
    </PartnerLayout>
  );
}
