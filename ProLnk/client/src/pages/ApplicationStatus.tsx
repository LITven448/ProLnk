import React from 'react';
import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  Clock,
  XCircle,
  Search,
  ArrowRight,
  Mail,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";
import ProLnkLogo from "@/components/ProLnkLogo";

type AppStatus = "pending" | "approved" | "rejected" | "invited";

const PROGRESS_STEPS = [
  { key: "submitted", label: "Submitted" },
  { key: "review", label: "Under Review" },
  { key: "decision", label: "Decision" },
  { key: "onboarding", label: "Onboarding" },
] as const;

const STATUS_PROGRESS: Record<AppStatus, number> = {
  pending: 1,
  approved: 2,
  invited: 3,
  rejected: 2,
};

const STATUS_CONFIG: Record<
  AppStatus,
  {
    icon: React.ReactNode;
    bg: string;
    border: string;
    badge: string;
    badgeDot: string;
    label: string;
    headline: string;
    body: string;
    next: string[];
    timeline?: string;
  }
> = {
  pending: {
    icon: <Clock className="w-10 h-10 text-amber-500" />,
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    badgeDot: "bg-amber-500",
    label: "Pending Review",
    headline: "Your application is in the queue.",
    body: "Our team reviews every application personally. You'll receive an email once a decision is made — typically within 1–2 business days.",
    timeline: "Reviews typically take 1–2 business days",
    next: [
      "Our team is verifying your credentials and service area",
      "You'll receive an email at the address you applied with",
      "Once approved, you'll receive your referral code and dashboard access",
    ],
  },
  approved: {
    icon: <CheckCircle className="w-10 h-10 text-emerald-600" />,
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    badgeDot: "bg-emerald-500",
    label: "Approved",
    headline: "You're in the ProLnk network!",
    body: "Your application has been approved. Access your partner dashboard, complete your profile, and start earning with your referral code.",
    next: [
      "Log in to your partner dashboard",
      "Complete your profile and service area",
      "Share your referral link to climb the waitlist",
    ],
  },
  rejected: {
    icon: <XCircle className="w-10 h-10 text-red-500" />,
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    badgeDot: "bg-red-500",
    label: "Not Approved",
    headline: "Your application was not approved at this time.",
    body: "This may be due to service area coverage, trade category, or current capacity limits. You're welcome to re-apply in 90 days.",
    next: [
      "Check your email for details from our team",
      "Review partner requirements at prolnk.io/apply",
      "Re-apply in 90 days if your situation changes",
    ],
  },
  invited: {
    icon: <Mail className="w-10 h-10 text-blue-600" />,
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    badgeDot: "bg-blue-500",
    label: "Invited",
    headline: "You've been invited to join ProLnk!",
    body: "Check your email for the invitation link to complete onboarding and activate your partner dashboard.",
    next: [
      "Check your email for the invitation link",
      "Complete onboarding to activate your account",
      "Start uploading job photos to earn commissions",
    ],
  },
};

function ProgressBar({ status }: { status: AppStatus }) {
  const activeStep = STATUS_PROGRESS[status];
  const isRejected = status === "rejected";

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200 -z-0" />
        <div
          className={`absolute left-0 top-4 h-0.5 transition-all duration-700 -z-0 ${isRejected ? "bg-red-300" : "bg-emerald-500"}`}
          style={{ width: `${(activeStep / (PROGRESS_STEPS.length - 1)) * 100}%` }}
        />
        {PROGRESS_STEPS.map((step, i) => {
          const isComplete = i < activeStep;
          const isCurrent = i === activeStep;
          const isFailed = isRejected && i === activeStep;
          return (
            <div key={step.key} className="flex flex-col items-center gap-1.5 relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isFailed
                    ? "bg-red-500 text-white ring-4 ring-red-100"
                    : isCurrent
                      ? "bg-amber-500 text-white ring-4 ring-amber-100"
                      : isComplete
                        ? "bg-emerald-500 text-white"
                        : "bg-white border-2 border-gray-300 text-gray-400"
                }`}
              >
                {isComplete && !isFailed ? (
                  <Check className="w-4 h-4" />
                ) : isFailed ? (
                  <XCircle className="w-4 h-4" />
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-xs font-medium ${isCurrent || isComplete ? "text-gray-800" : "text-gray-400"}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [value]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="ml-2 text-gray-400 hover:text-gray-700 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

export default function ApplicationStatus() {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, isLoading, error } = trpc.partners.checkApplicationStatus.useQuery(
    { email: submittedEmail },
    { enabled: !!submittedEmail, queryHash: `${submittedEmail}-${refreshKey}` as unknown as string }
  );

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSubmittedEmail(email.trim().toLowerCase());
    setRefreshKey(0);
  };

  const handleRefresh = () => {
    setRefreshKey(k => k + 1);
  };

  const config = data ? STATUS_CONFIG[data.status as AppStatus] : null;
  const status = data?.status as AppStatus | undefined;

  const referralCode = data && "referralCode" in data ? (data as { referralCode?: string }).referralCode : undefined;
  const waitlistUrl = referralCode
    ? `${window.location.origin}/waitlist-status?ref=${referralCode}`
    : undefined;

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Helmet>
        <title>Check Application Status — ProLnk Partner Network</title>
        <meta name="description" content="Check the status of your ProLnk partner application." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <nav className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/"><ProLnkLogo height={36} variant="light" /></Link>
          <Link href="/apply">
            <Button variant="outline" size="sm" className="text-xs">Apply Now</Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Check Application Status</h1>
          <p className="text-gray-500 text-sm">Enter the email address you used when you applied.</p>
        </div>

        <form onSubmit={handleCheck} className="flex gap-2 mb-8">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" disabled={isLoading} className="bg-[#0A1628] hover:bg-[#0A1628]/80 text-white px-5">
            {isLoading ? (
              <span className="flex items-center gap-1.5"><Search className="w-4 h-4 animate-pulse" /> Checking…</span>
            ) : (
              <span className="flex items-center gap-1.5"><Search className="w-4 h-4" /> Check</span>
            )}
          </Button>
        </form>

        {submittedEmail && !isLoading && (
          <>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                <p className="text-red-700 font-medium">Something went wrong. Please try again.</p>
              </div>
            )}

            {!error && data === null && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">No application found</h2>
                <p className="text-gray-500 text-sm mb-6">
                  We couldn't find an application for <strong>{submittedEmail}</strong>. Double-check the email or apply now.
                </p>
                <Link href="/apply">
                  <Button className="bg-[#0A1628] hover:bg-[#0A1628]/80 text-white">
                    Apply Now <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            )}

            {!error && data && config && status && (
              <div className={`${config.bg} border ${config.border} rounded-2xl p-8`}>
                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="shrink-0">{config.icon}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${config.badgeDot}`} />
                        {config.label}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{data.businessName}</h2>
                    <p className="text-gray-500 text-sm">{data.contactName}</p>
                  </div>
                </div>

                {/* Progress */}
                <ProgressBar status={status} />

                {/* Timeline estimate (pending only) */}
                {config.timeline && status === "pending" && (
                  <div className="flex items-center gap-2 bg-white/60 rounded-xl px-4 py-2.5 mb-5 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    {config.timeline}
                  </div>
                )}

                {/* Email reminder */}
                <div className="flex items-center gap-2 bg-white/60 rounded-xl px-4 py-2.5 mb-5 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                  We'll email you at <strong className="ml-1">{submittedEmail}</strong>
                </div>

                <p className="text-gray-700 font-semibold mb-1">{config.headline}</p>
                <p className="text-gray-600 text-sm mb-6">{config.body}</p>

                {/* Referral code block (approved) */}
                {status === "approved" && referralCode && (
                  <div className="bg-white border border-emerald-200 rounded-xl p-4 mb-6">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Your Referral Code</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-mono font-bold text-gray-900 tracking-widest">{referralCode}</span>
                        <CopyButton value={referralCode} />
                      </div>
                    </div>
                    {waitlistUrl && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Share your waitlist link</p>
                        <div className="flex items-center gap-1 text-xs text-emerald-700 font-mono bg-emerald-50 rounded-lg px-3 py-1.5 break-all">
                          {waitlistUrl}
                          <CopyButton value={waitlistUrl} />
                        </div>
                        <Link href={`/waitlist-status?ref=${referralCode}`}>
                          <Button size="sm" variant="outline" className="mt-2 text-xs w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                            View your waitlist position <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Next steps */}
                <div className="space-y-2 mb-6">
                  {config.next.map((step, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-white/60 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-gray-600">{i + 1}</span>
                      </div>
                      <span className="text-sm text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {(status === "approved" || status === "invited") ? (
                  <Link href="/partner/dashboard">
                    <Button className="w-full bg-[#0A1628] hover:bg-[#0A1628]/80 text-white">
                      Go to Partner Dashboard <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </Link>
                ) : status === "pending" ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleRefresh}
                    disabled={isLoading}
                  >
                    <RefreshCw className={`w-4 h-4 mr-1.5 ${isLoading ? "animate-spin" : ""}`} />
                    Check back soon — Refresh status
                  </Button>
                ) : (
                  <Link href="/apply">
                    <Button variant="outline" className="w-full">View Partner Requirements</Button>
                  </Link>
                )}

                {data.createdAt && (
                  <p className="text-center text-xs text-gray-400 mt-4">
                    Applied {new Date(data.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                )}
              </div>
            )}
          </>
        )}

        <p className="text-center text-xs text-gray-400 mt-8">
          Questions? Email{" "}
          <a href="mailto:support@prolnk.io" className="underline hover:text-gray-600">
            support@prolnk.io
          </a>
        </p>
      </div>
    </div>
  );
}
