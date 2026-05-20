import { trpc } from "@/lib/trpc";
import { useParams, Link } from "wouter";
import { Zap, ArrowRight, Loader2, UserCheck, Home as HomeIcon } from "lucide-react";

/**
 * /join/:slug — brand-aware referral landing page
 *
 * Resolves the slug via `waitlist.resolveSlug`, then routes the visitor:
 *  - If on `trustypro.io` (or detected brand=trustypro) → /waitlist/homeowner?ref=CODE
 *  - Otherwise → /pro-waitlist?ref=CODE (existing ProLnk flow)
 *
 * Same slug can be shared for both audiences. The referrer's pro waitlist
 * record is attributed regardless of which side the new user joins through.
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

  // ── Loading state — keep brand-neutral spinner ──────────────────────────
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isTrustyPro ? "bg-white" : "bg-[#0A1628]"}`}>
        <Loader2 className={`w-8 h-8 animate-spin ${isTrustyPro ? "text-[#4F46E5]" : "text-[#F5E642]"}`} />
      </div>
    );
  }

  // ── Not found — link a fallback to the right waitlist page ─────────────
  if (isError || !data?.found) {
    if (isTrustyPro) {
      return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
          <div className="w-14 h-14 rounded-2xl bg-[#4F46E5] flex items-center justify-center mb-6">
            <HomeIcon className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-3 text-center">
            Referral link not found
          </h1>
          <p className="text-gray-600 text-center max-w-md mb-8">
            This referral link doesn't exist or may have changed. You can still
            join the TrustyPro homeowner waitlist directly.
          </p>
          <Link
            href="/waitlist/homeowner"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-xl transition-colors"
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-[#0A1628] flex flex-col items-center justify-center px-6">
        <div className="w-14 h-14 rounded-2xl bg-[#F5E642] flex items-center justify-center mb-6">
          <Zap className="w-7 h-7 text-[#0A1628]" />
        </div>
        <h1 className="text-2xl font-black text-white mb-3 text-center">
          Referral link not found
        </h1>
        <p className="text-gray-400 text-center max-w-md mb-8">
          This referral link doesn't exist or may have changed. You can still
          join the ProLnk founding network directly.
        </p>
        <Link
          href="/pro-waitlist"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5E642] hover:bg-[#f0dc30] text-[#0A1628] font-bold rounded-xl transition-colors"
        >
          Apply Now
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Save referral to localStorage so it persists across page navigation
  if (typeof window !== "undefined") {
    if (isTrustyPro) {
      localStorage.setItem("trustypro_referral_code", data.referralCode);
    } else {
      localStorage.setItem("prolnk_referral_code", data.referralCode);
    }
  }

  // ── TrustyPro (homeowner) landing ───────────────────────────────────────
  if (isTrustyPro) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/5 via-transparent to-[#4F46E5]/5" />
        <div className="max-w-md w-full text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-[#4F46E5] flex items-center justify-center mx-auto mb-6 shadow-lg">
            <UserCheck className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            {data.firstName} invited you to TrustyPro
          </h1>

          <p className="text-gray-600 text-lg mb-2">
            TrustyPro is a homeowner platform built around trust — find verified, certified pros for any home project.
          </p>

          <p className="text-gray-500 mb-10">
            Join the waitlist below. {data.firstName} will be notified when you sign up, and you'll get early access as TrustyPro launches in your area.
          </p>

          <Link
            href={`/waitlist/homeowner?ref=${data.referralCode}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-black text-lg rounded-xl transition-colors shadow-lg shadow-[#4F46E5]/20"
          >
            Join the Waitlist
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-gray-400 text-xs mt-6">
            Free for homeowners — always. We're funded by pros, never by you.
          </p>
        </div>

        <div className="absolute bottom-8 flex items-center gap-2 text-gray-400 text-sm">
          <span className="font-bold text-[#4F46E5]">TrustyPro</span>
          <span>·</span>
          <span>Powered by ProLnk</span>
        </div>
      </div>
    );
  }

  // ── ProLnk (pro) landing ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0A1628] flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#F5E642]/20 border border-[#F5E642]/30 flex items-center justify-center mx-auto mb-6">
          <UserCheck className="w-8 h-8 text-[#F5E642]" />
        </div>

        <h1 className="text-3xl font-black text-white mb-3">
          You were invited by {data.firstName}!
        </h1>

        {data.businessType && (
          <p className="text-gray-400 text-lg mb-2">
            {data.firstName} is a {data.businessType} professional on ProLnk
          </p>
        )}

        <p className="text-gray-500 mb-10">
          Join the ProLnk founding network and lock in charter-rate pricing,
          4-level referral income, and 72% Network Bonus on every closed job.
        </p>

        <Link
          href={`/pro-waitlist?ref=${data.referralCode}`}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5E642] hover:bg-[#f0dc30] text-[#0A1628] font-black text-lg rounded-xl transition-colors shadow-lg shadow-[#F5E642]/20"
        >
          Join ProLnk Now
          <ArrowRight className="w-5 h-5" />
        </Link>

        <p className="text-gray-600 text-xs mt-6">
          Only 2,125 founding network spots available. Your position is reserved
          once you complete the application.
        </p>
      </div>

      <div className="absolute bottom-8 flex items-center gap-2 text-gray-600 text-sm">
        <div className="w-6 h-6 rounded-md bg-[#0A1628] border border-gray-700 flex items-center justify-center">
          <Zap className="w-3 h-3 text-[#F5E642]" />
        </div>
        <span className="font-semibold">ProLnk</span>
      </div>
    </div>
  );
}
