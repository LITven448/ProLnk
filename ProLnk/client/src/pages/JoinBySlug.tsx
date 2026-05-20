import { trpc } from "@/lib/trpc";
import { useParams, Link } from "wouter";
import { ArrowRight, Loader2, UserCheck, Home as HomeIcon, Sparkles } from "lucide-react";
import ProLnkLogo from "@/components/ProLnkLogo";
import { TrustyProLogo } from "@/components/TrustyProLogo";

/**
 * /join/:slug — brand-aware referral landing
 *
 * Resolves the slug via `waitlist.resolveSlug`, then routes the visitor
 * to the appropriate waitlist (ProLnk pro or TrustyPro homeowner)
 * with attribution to the referrer.
 */
export default function JoinBySlug() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = trpc.waitlist.resolveSlug.useQuery(
    { slug: slug ?? "" },
    { enabled: !!slug, retry: false }
  );

  const isTrustyPro =
    typeof window !== "undefined" &&
    ((window as { __BRAND__?: string }).__BRAND__ === "trustypro" ||
      window.location.hostname.includes("trustypro"));

  // ── Loading state ───────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isTrustyPro ? "bg-white" : "bg-[#FAFBFC]"}`}>
        <Loader2 className={`w-10 h-10 animate-spin ${isTrustyPro ? "text-[#4F46E5]" : "text-[#0A1628]"}`} />
      </div>
    );
  }

  // ── Not found ───────────────────────────────────────────────────────────
  if (isError || !data?.found) {
    if (isTrustyPro) {
      return (
        <div className="min-h-screen bg-white flex flex-col px-6">
          <header className="py-6 max-w-6xl w-full mx-auto">
            <Link href="/">
              <TrustyProLogo height={56} />
            </Link>
          </header>
          <main className="flex-1 flex flex-col items-center justify-center -mt-12">
            <div className="max-w-md w-full text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#EEF2FF] flex items-center justify-center mx-auto mb-6">
                <HomeIcon className="w-8 h-8 text-[#4F46E5]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                Referral link not found
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                This link doesn't exist or may have changed. You can still join the TrustyPro homeowner waitlist directly.
              </p>
              <Link
                href="/waitlist/homeowner"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-lg rounded-xl transition-colors shadow-lg shadow-[#4F46E5]/20"
              >
                Join the Waitlist
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </main>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-[#FAFBFC] flex flex-col px-6">
        <header className="py-6 max-w-6xl w-full mx-auto">
          <Link href="/">
            <ProLnkLogo height={48} />
          </Link>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center -mt-12">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FEF9C3] flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-[#854D0E]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Referral link not found
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              This link doesn't exist or may have changed. You can still join the ProLnk founding network directly.
            </p>
            <Link
              href="/pro-waitlist"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5E642] hover:bg-[#f0dc30] text-[#0A1628] font-black text-lg rounded-xl transition-colors shadow-lg shadow-[#F5E642]/30"
            >
              Join the Waitlist
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Save referral to localStorage so it persists across navigation
  if (typeof window !== "undefined") {
    if (isTrustyPro) {
      localStorage.setItem("trustypro_referral_code", data.referralCode);
    } else {
      localStorage.setItem("prolnk_referral_code", data.referralCode);
    }
  }

  // ── TrustyPro (homeowner) landing — white + indigo ─────────────────────
  if (isTrustyPro) {
    return (
      <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
        {/* Soft gradient ambient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EEF2FF] via-white to-[#EEF2FF]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4F46E5]/5 rounded-full blur-3xl -ml-32 -mb-32" />

        {/* Header with logo */}
        <header className="relative z-10 py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <Link href="/">
              <TrustyProLogo height={64} />
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="relative z-10 flex-1 flex items-center justify-center px-6 pb-12">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-3xl shadow-2xl shadow-[#4F46E5]/10 border border-gray-100 p-10 md:p-12 text-center">
              {/* Invite badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold uppercase tracking-wider mb-6">
                <UserCheck className="w-3.5 h-3.5" />
                Personal Invitation
              </div>

              {/* Avatar circle */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#6366F1] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#4F46E5]/25">
                <span className="text-3xl font-black text-white">
                  {data.firstName.charAt(0).toUpperCase()}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                {data.firstName} invited you to TrustyPro
              </h1>

              <p className="text-gray-600 text-lg mb-2 leading-relaxed">
                Build your complete home profile and connect with verified, certified pros for any project.
              </p>

              <p className="text-gray-500 text-base mb-10 leading-relaxed">
                {data.firstName} will be notified when you sign up, and you'll get early access as TrustyPro launches in your area.
              </p>

              <Link
                href={`/waitlist/homeowner?ref=${data.referralCode}`}
                className="inline-flex items-center gap-2 px-10 py-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-black text-lg rounded-xl transition-all shadow-lg shadow-[#4F46E5]/30 hover:shadow-xl hover:shadow-[#4F46E5]/40 hover:-translate-y-0.5"
              >
                Join the Waitlist
                <ArrowRight className="w-5 h-5" />
              </Link>

              <p className="text-gray-400 text-xs mt-8 max-w-xs mx-auto">
                Free for homeowners — always. We're funded by pros, never by you.
              </p>
            </div>
          </div>
        </main>

        <footer className="relative z-10 py-6 text-center text-xs text-gray-400">
          TrustyPro <span className="mx-2 text-gray-300">·</span> Powered by ProLnk
        </footer>
      </div>
    );
  }

  // ── ProLnk (pro) landing — light cream/white with navy + yellow ────────
  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col relative overflow-hidden">
      {/* Subtle gradient ambient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5E642]/10 via-white to-[#FAFBFC]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5E642]/15 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0A1628]/5 rounded-full blur-3xl -ml-32 -mb-32" />

      {/* Header with ProLnk logo */}
      <header className="relative z-10 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <ProLnkLogo height={52} />
          </Link>
        </div>
      </header>

      {/* Main content card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 pb-12">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl shadow-[#0A1628]/10 border border-gray-100 p-10 md:p-12 text-center">
            {/* Invite badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF9C3] text-[#854D0E] text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Founding Network Invitation
            </div>

            {/* Avatar circle */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0A1628] to-[#1E293B] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#0A1628]/25 ring-4 ring-[#F5E642]">
              <span className="text-3xl font-black text-[#F5E642]">
                {data.firstName.charAt(0).toUpperCase()}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              You've been invited by {data.firstName}
            </h1>

            {data.businessType && (
              <p className="text-gray-500 text-base mb-6 font-medium">
                {data.firstName} is a {data.businessType} pro on the ProLnk founding network
              </p>
            )}

            <p className="text-gray-600 text-lg mb-2 leading-relaxed">
              Join the ProLnk founding network — lock in charter pricing, earn 72% Network Bonus, and build your downline across 4 generations.
            </p>

            <p className="text-gray-500 text-base mb-10 leading-relaxed">
              Only 2,125 founding spots exist. Your position is reserved when you complete the application.
            </p>

            <Link
              href={`/pro-waitlist?ref=${data.referralCode}`}
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#F5E642] hover:bg-[#f0dc30] text-[#0A1628] font-black text-lg rounded-xl transition-all shadow-lg shadow-[#F5E642]/40 hover:shadow-xl hover:shadow-[#F5E642]/50 hover:-translate-y-0.5"
            >
              Join the Waitlist
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="text-gray-400 text-xs mt-8 max-w-xs mx-auto">
              90 days free top-tier subscription · $149/mo locked after · Home Origination Bonus
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-6 text-center text-xs text-gray-400">
        ProLnk Founding Network <span className="mx-2 text-gray-300">·</span> DFW, Texas
      </footer>
    </div>
  );
}
