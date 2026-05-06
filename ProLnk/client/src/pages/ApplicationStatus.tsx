import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Clock, XCircle, Search, ArrowRight, Mail } from "lucide-react";
import ProLnkLogo from "@/components/ProLnkLogo";

const STATUS_CONFIG = {
  pending: {
    icon: <Clock className="w-10 h-10 text-amber-500" />,
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    label: "Under Review",
    headline: "Your application is being reviewed.",
    body: "Our team typically reviews applications within 24–48 hours. You'll receive an email once a decision is made.",
    next: [
      "Our team is reviewing your credentials and service area",
      "You'll receive an email with next steps",
      "If approved, you'll get dashboard access and your referral link",
    ],
  },
  approved: {
    icon: <CheckCircle2 className="w-10 h-10 text-emerald-600" />,
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    label: "Approved",
    headline: "You're in the ProLnk network!",
    body: "Your application has been approved. Log in to access your partner dashboard, upload job photos, and start earning commissions.",
    next: [
      "Log in to your partner dashboard",
      "Complete your profile and add your service area",
      "Upload your first job photos to start generating leads",
    ],
  },
  rejected: {
    icon: <XCircle className="w-10 h-10 text-red-500" />,
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    label: "Not Approved",
    headline: "Your application was not approved at this time.",
    body: "We weren't able to approve your application right now. This may be due to service area coverage, trade category, or capacity limits. You're welcome to re-apply in 90 days.",
    next: [
      "Check your email for details from our team",
      "Review our partner requirements at prolnk.io/apply",
      "Re-apply in 90 days if your situation changes",
    ],
  },
  invited: {
    icon: <Mail className="w-10 h-10 text-blue-600" />,
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    label: "Invited",
    headline: "You've been invited to join ProLnk!",
    body: "Check your email for your invitation link to complete onboarding and access your partner dashboard.",
    next: [
      "Check your email for the invitation link",
      "Complete onboarding to activate your account",
      "Start uploading job photos to earn commissions",
    ],
  },
};

export default function ApplicationStatus() {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const { data, isLoading, error } = trpc.partner.checkApplicationStatus.useQuery(
    { email: submittedEmail },
    { enabled: !!submittedEmail }
  );

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSubmittedEmail(email.trim().toLowerCase());
  };

  const config = data ? STATUS_CONFIG[data.status as keyof typeof STATUS_CONFIG] : null;

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Helmet>
        <title>Check Application Status — ProLnk Partner Network</title>
        <meta name="description" content="Check the status of your ProLnk partner application." />
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Nav */}
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

        {/* Search form */}
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

        {/* Result */}
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
            {!error && data && config && (
              <div className={`${config.bg} border ${config.border} rounded-2xl p-8`}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="shrink-0">{config.icon}</div>
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-1 ${config.badge}`}>{config.label}</span>
                    <h2 className="text-xl font-bold text-gray-900">{data.businessName}</h2>
                    <p className="text-gray-500 text-sm">{data.contactName}</p>
                  </div>
                </div>

                <p className="text-gray-700 font-semibold mb-1">{config.headline}</p>
                <p className="text-gray-600 text-sm mb-6">{config.body}</p>

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

                {data.status === "approved" || data.status === "invited" ? (
                  <Link href="/partner/dashboard">
                    <Button className="w-full bg-[#0A1628] hover:bg-[#0A1628]/80 text-white">
                      Go to Partner Dashboard <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </Link>
                ) : data.status === "pending" ? (
                  <Link href="/">
                    <Button variant="outline" className="w-full">Back to ProLnk Home</Button>
                  </Link>
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
          Questions? Email <a href="mailto:support@prolnk.io" className="underline hover:text-gray-600">support@prolnk.io</a>
        </p>
      </div>
    </div>
  );
}
