import { trpc } from "@/lib/trpc";
import { useParams, Link } from "wouter";
import { ArrowRight, Loader2, UserCheck, Home as HomeIcon, Sparkles, Lock, TrendingUp, Users, Award } from "lucide-react";
import ProLnkLogo from "@/components/ProLnkLogo";
import { TrustyProLogo } from "@/components/TrustyProLogo";

/**
 * /join/:slug — brand-aware referral landing
 * ProLnk side: light hero with slate + bronze accents (logo renders natively).
 * TrustyPro side: white + indigo, friendly.
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className={`w-10 h-10 animate-spin ${isTrustyPro ? "text-[#4F46E5]" : "text-[#C89B5A]"}`} />
      </div>
    );
  }

  if (isError || !data?.found) {
    if (isTrustyPro) {
      return (
        <div className="min-h-screen bg-white flex flex-col px-6">
          <header className="py-6 max-w-6xl w-full mx-auto"><Link href="/"><TrustyProLogo height={64} /></Link></header>
          <main className="flex-1 flex flex-col items-center justify-center -mt-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#EEF2FF] flex items-center justify-center mb-6"><HomeIcon className="w-8 h-8 text-[#4F46E5]" /></div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Referral link not found</h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md">This link doesn't exist or may have changed.</p>
            <Link href="/waitlist/homeowner" className="inline-flex items-center gap-2 px-8 py-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-lg rounded-xl transition-colors shadow-lg shadow-[#4F46E5]/20">Join the Waitlist <ArrowRight className="w-5 h-5" /></Link>
          </main>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-white flex flex-col px-6">
        <header className="py-6 max-w-6xl w-full mx-auto"><Link href="/"><ProLnkLogo height={52} /></Link></header>
        <main className="flex-1 flex flex-col items-center justify-center -mt-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#F5EDE0] border border-[#D9C7A8] flex items-center justify-center mb-6"><Sparkles className="w-8 h-8 text-[#8A5A24]" /></div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Referral link not found</h1>
          <p className="text-gray-600 text-lg mb-8 max-w-md">This link doesn't exist or may have changed.</p>
          <Link href="/pro-waitlist" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E293B] hover:bg-[#0F172A] text-white font-bold text-lg rounded-xl transition-colors shadow-lg shadow-[#1E293B]/20">Join the Waitlist <ArrowRight className="w-5 h-5" /></Link>
        </main>
      </div>
    );
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(isTrustyPro ? "trustypro_referral_code" : "prolnk_referral_code", data.referralCode);
  }

  // ── TrustyPro (homeowner) ───────────────────────────────────────────────
  if (isTrustyPro) {
    return (
      <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EEF2FF] via-white to-[#EEF2FF]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4F46E5]/5 rounded-full blur-3xl -ml-32 -mb-32" />

        <header className="relative z-10 py-8 px-6">
          <div className="max-w-6xl mx-auto"><Link href="/"><TrustyProLogo height={64} /></Link></div>
        </header>

        <main className="relative z-10 flex-1 flex items-center justify-center px-6 pb-12">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-3xl shadow-2xl shadow-[#4F46E5]/10 border border-gray-100 p-10 md:p-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold uppercase tracking-wider mb-6"><UserCheck className="w-3.5 h-3.5" /> Personal Invitation</div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#6366F1] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#4F46E5]/25"><span className="text-3xl font-black text-white">{data.firstName.charAt(0).toUpperCase()}</span></div>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">{data.firstName} invited you to TrustyPro</h1>
              <p className="text-gray-600 text-lg mb-2 leading-relaxed">Build your complete home profile and connect with verified, certified pros for any project.</p>
              <p className="text-gray-500 text-base mb-10 leading-relaxed">{data.firstName} will be notified when you sign up, and you'll get early access as TrustyPro launches in your area.</p>
              <Link href={`/waitlist/homeowner?ref=${data.referralCode}`} className="inline-flex items-center gap-2 px-10 py-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-black text-lg rounded-xl transition-all shadow-lg shadow-[#4F46E5]/30 hover:shadow-xl hover:shadow-[#4F46E5]/40 hover:-translate-y-0.5">Join the Waitlist <ArrowRight className="w-5 h-5" /></Link>
              <p className="text-gray-400 text-xs mt-8 max-w-xs mx-auto">Free for homeowners — always. We're funded by pros, never by you.</p>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-gray-500 text-sm">Are you a home-service professional?</p>
                <a href={`https://prolnk.xyz/apply?ref=${data.referralCode}`} className="inline-flex items-center gap-1.5 mt-1 text-[#4F46E5] hover:text-[#4338CA] font-bold text-sm">Join the ProLnk pro network instead <ArrowRight className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        </main>

        <footer className="relative z-10 py-6 text-center text-xs text-gray-400">TrustyPro <span className="mx-2 text-gray-300">·</span> Powered by ProLnk</footer>
      </div>
    );
  }

  // ── ProLnk (pro) — LIGHT design so original brand logo renders correctly ─
  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Soft bronze-tinted background, no dark bg so the original logo just works */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5EDE0] via-white to-[#F7F2EA]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D9C7A8]/30 rounded-full blur-[120px] -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D9C7A8]/20 rounded-full blur-[120px] -ml-32 -mb-32" />

      {/* Subtle confetti accents */}
      <div className="absolute top-[15%] left-[12%] w-2 h-2 rounded-full bg-[#C89B5A] animate-pulse" />
      <div className="absolute top-[30%] right-[18%] w-1.5 h-1.5 rounded-full bg-[#C89B5A]/70" />
      <div className="absolute bottom-[20%] right-[12%] w-2 h-2 rounded-full bg-[#D9C7A8] animate-pulse" />
      <div className="absolute bottom-[35%] left-[25%] w-1.5 h-1.5 rounded-full bg-[#C89B5A]" />

      {/* Header — original logo renders natively on light bg */}
      <header className="relative z-10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/"><ProLnkLogo height={52} /></Link>
          <div className="hidden sm:flex items-center gap-2 text-gray-500 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-[#C89B5A] animate-pulse" />
            DFW Early Access — Open
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 pb-12">
        <div className="max-w-3xl w-full">

          {/* Invite badge floating above card */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5EDE0] border border-[#D9C7A8] backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#8A5A24]" />
              <span className="text-[#8A5A24] text-xs font-black uppercase tracking-[0.2em]">You're Invited</span>
            </div>
          </div>

          {/* Main card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl shadow-[#1E293B]/10 p-8 md:p-12 text-center relative overflow-hidden">
            {/* Avatar */}
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center shadow-2xl shadow-[#1E293B]/30 ring-4 ring-[#D9C7A8]">
                <span className="text-4xl font-black text-[#C89B5A]">{data.firstName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#C89B5A] border-2 border-white flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-[#1E293B]" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-2 leading-[1.05] tracking-tight">
              {data.firstName} just<br />
              <span className="bg-gradient-to-r from-[#8A5A24] to-[#B08544] bg-clip-text text-transparent">pulled you in.</span>
            </h1>

            <p className="text-gray-600 text-base md:text-lg mt-4 mb-2 leading-relaxed max-w-lg mx-auto">
              You've been hand-picked to join the ProLnk partner network — an invite-only group of {data.businessType ? `${data.businessType} and other` : ""} service pros getting early access before public launch.
            </p>

            <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
              Early access is open — spots are limited. Your seat is reserved.
            </p>

            {/* Benefits — clear bulleted list */}
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 md:p-7 mb-8 max-w-xl mx-auto text-left">
              <p className="text-[#8A5A24] text-[11px] font-black uppercase tracking-[0.18em] mb-4 text-center">What You Get</p>
              <ul className="space-y-3.5">
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#F5EDE0] border border-[#D9C7A8] flex items-center justify-center flex-shrink-0 mt-0.5"><Lock className="w-3 h-3 text-[#8A5A24]" /></div>
                  <div>
                    <div className="text-gray-900 text-sm font-bold">90 days free, then plans from $99/mo</div>
                    <div className="text-gray-500 text-xs mt-0.5">Pick the plan that fits your business when DFW activates.</div>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#F5EDE0] border border-[#D9C7A8] flex items-center justify-center flex-shrink-0 mt-0.5"><TrendingUp className="w-3 h-3 text-[#8A5A24]" /></div>
                  <div>
                    <div className="text-gray-900 text-sm font-bold">Keep up to 60% of the platform fee on every closed job</div>
                    <div className="text-gray-500 text-xs mt-0.5">Paid from the platform fee (6–15% of job value) — bonus income on top of what you'd normally charge.</div>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#F5EDE0] border border-[#D9C7A8] flex items-center justify-center flex-shrink-0 mt-0.5"><Users className="w-3 h-3 text-[#8A5A24]" /></div>
                  <div>
                    <div className="text-gray-900 text-sm font-bold">Bonus from pros you invite</div>
                    <div className="text-gray-500 text-xs mt-0.5">When you invite another pro to ProLnk, you earn a small share of the platform fees from their work. Same applies to anyone they invite, up to 4 layers deep. Every member gets this — regardless of when you joined.</div>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#F5EDE0] border border-[#D9C7A8] flex items-center justify-center flex-shrink-0 mt-0.5"><HomeIcon className="w-3 h-3 text-[#8A5A24]" /></div>
                  <div>
                    <div className="text-gray-900 text-sm font-bold">Home Origination Bonus — permanent</div>
                    <div className="text-gray-500 text-xs mt-0.5">Every homeowner you bring onto TrustyPro pays you a permanent share of platform fees on every future job at their home. Recurring revenue, forever.</div>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#F5EDE0] border border-[#D9C7A8] flex items-center justify-center flex-shrink-0 mt-0.5"><Award className="w-3 h-3 text-[#8A5A24]" /></div>
                  <div>
                    <div className="text-gray-900 text-sm font-bold">TrustyPro Certified badge</div>
                    <div className="text-gray-500 text-xs mt-0.5">The credential homeowners search for.</div>
                  </div>
                </li>
              </ul>
            </div>

            <Link
              href={`/pro-waitlist?ref=${data.referralCode}`}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-[#1E293B] hover:bg-[#0F172A] text-white font-black text-lg rounded-2xl transition-all shadow-2xl shadow-[#1E293B]/30 hover:shadow-2xl hover:shadow-[#1E293B]/40 hover:-translate-y-0.5"
            >
              Claim My Spot
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <p className="text-gray-500 text-xs mt-6 max-w-md mx-auto leading-relaxed">
              Early members are first in line when DFW activates — with <span className="text-[#8A5A24] font-bold">override + origination income</span> on top of the jobs you close.
            </p>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-500 text-sm">Not a pro — own a home in DFW?</p>
              <a href={`https://trustypro.io/waitlist/homeowner?ref=${data.referralCode}`} className="inline-flex items-center gap-1.5 mt-1 text-[#8A5A24] hover:text-[#B08544] font-bold text-sm">Join TrustyPro as a homeowner (free) <ArrowRight className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Proof line below card */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-xs font-medium tracking-wide">
              <span className="text-[#8A5A24]">●</span> Early access network active in DFW — verified pros only
            </p>
          </div>

        </div>
      </main>

      <footer className="relative z-10 py-6 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center text-gray-400 text-xs">
          ProLnk Partner Network <span className="mx-2 text-gray-300">·</span> DFW, Texas
        </div>
      </footer>
    </div>
  );
}
