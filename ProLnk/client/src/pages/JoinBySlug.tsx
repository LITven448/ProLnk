import { trpc } from "@/lib/trpc";
import { useParams, Link } from "wouter";
import { ArrowRight, Loader2, UserCheck, Home as HomeIcon, Sparkles, Lock, TrendingUp, Users, Award } from "lucide-react";
import ProLnkLogo from "@/components/ProLnkLogo";
import { TrustyProLogo } from "@/components/TrustyProLogo";

/**
 * /join/:slug — brand-aware referral landing
 * ProLnk side: navy + teal gradient with character.
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

  // ── Loading ─────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isTrustyPro ? "bg-white" : "bg-[#0A1628]"}`}>
        <Loader2 className={`w-10 h-10 animate-spin ${isTrustyPro ? "text-[#4F46E5]" : "text-teal-400"}`} />
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
              <TrustyProLogo height={64} />
            </Link>
          </header>
          <main className="flex-1 flex flex-col items-center justify-center -mt-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#EEF2FF] flex items-center justify-center mb-6">
              <HomeIcon className="w-8 h-8 text-[#4F46E5]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Referral link not found</h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md">This link doesn't exist or may have changed.</p>
            <Link href="/waitlist/homeowner" className="inline-flex items-center gap-2 px-8 py-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-lg rounded-xl transition-colors shadow-lg shadow-[#4F46E5]/20">
              Join the Waitlist <ArrowRight className="w-5 h-5" />
            </Link>
          </main>
        </div>
      );
    }
    return (
      <div className="min-h-screen flex flex-col px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0A1628 0%, #0d1f3c 50%, #0f3b4a 100%)" }}>
        <header className="relative z-10 py-6 max-w-6xl w-full mx-auto">
          <Link href="/">
            <ProLnkLogo height={52} />
          </Link>
        </header>
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-400/20 border border-teal-400/30 flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-teal-300" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">Referral link not found</h1>
          <p className="text-white/60 text-lg mb-8 max-w-md">This link doesn't exist or may have changed.</p>
          <Link href="/pro-waitlist" className="inline-flex items-center gap-2 px-8 py-4 bg-teal-400 hover:bg-teal-300 text-[#0A1628] font-black text-lg rounded-xl transition-colors shadow-lg shadow-teal-500/30">
            Join the Waitlist <ArrowRight className="w-5 h-5" />
          </Link>
        </main>
      </div>
    );
  }

  // Persist referral
  if (typeof window !== "undefined") {
    localStorage.setItem(
      isTrustyPro ? "trustypro_referral_code" : "prolnk_referral_code",
      data.referralCode
    );
  }

  // ── TrustyPro (homeowner) — white + indigo ─────────────────────────────
  if (isTrustyPro) {
    return (
      <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EEF2FF] via-white to-[#EEF2FF]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4F46E5]/5 rounded-full blur-3xl -ml-32 -mb-32" />

        <header className="relative z-10 py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <Link href="/"><TrustyProLogo height={64} /></Link>
          </div>
        </header>

        <main className="relative z-10 flex-1 flex items-center justify-center px-6 pb-12">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-3xl shadow-2xl shadow-[#4F46E5]/10 border border-gray-100 p-10 md:p-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold uppercase tracking-wider mb-6">
                <UserCheck className="w-3.5 h-3.5" /> Personal Invitation
              </div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#6366F1] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#4F46E5]/25">
                <span className="text-3xl font-black text-white">{data.firstName.charAt(0).toUpperCase()}</span>
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
                Join the Waitlist <ArrowRight className="w-5 h-5" />
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

  // ── ProLnk (pro) — navy + teal with energy ─────────────────────────────
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0A1628 0%, #0d1f3c 35%, #0f3b4a 70%, #0a2a3f 100%)" }}>
      {/* Animated glow accents */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-[120px]" />
      <div className="absolute top-[40%] left-[20%] w-72 h-72 bg-blue-400/10 rounded-full blur-[100px]" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Confetti dots */}
      <div className="absolute top-[15%] left-[12%] w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
      <div className="absolute top-[30%] right-[18%] w-1.5 h-1.5 rounded-full bg-cyan-300/80" />
      <div className="absolute top-[60%] left-[8%] w-1 h-1 rounded-full bg-teal-200" />
      <div className="absolute bottom-[20%] right-[12%] w-2 h-2 rounded-full bg-blue-300/70 animate-pulse" />
      <div className="absolute bottom-[35%] left-[25%] w-1.5 h-1.5 rounded-full bg-teal-400" />
      <div className="absolute top-[20%] right-[40%] w-1 h-1 rounded-full bg-cyan-200/60" />

      {/* Header with logo */}
      <header className="relative z-10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <div className="bg-white rounded-2xl px-4 py-2 inline-block">
              <ProLnkLogo height={44} />
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-white/50 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            DFW Founding Network — Live
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 pb-12">
        <div className="max-w-3xl w-full">

          {/* Invitation badge floating above card */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-400/15 border border-teal-400/40 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-teal-300" />
              <span className="text-teal-300 text-xs font-black uppercase tracking-[0.2em]">You're Invited</span>
            </div>
          </div>

          {/* Main card */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative accent ring around card */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5 pointer-events-none" />

            {/* Avatar with teal accent */}
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 via-cyan-400 to-teal-500 flex items-center justify-center shadow-2xl shadow-teal-500/40 ring-4 ring-white/10">
                <span className="text-4xl font-black text-[#0A1628]">
                  {data.firstName.charAt(0).toUpperCase()}
                </span>
              </div>
              {/* Little check badge */}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#0A1628] border-2 border-teal-400 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-teal-300" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 leading-[1.05] tracking-tight">
              {data.firstName} just<br />
              <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                pulled you in.
              </span>
            </h1>

            <p className="text-white/60 text-base md:text-lg mt-4 mb-2 leading-relaxed max-w-lg mx-auto">
              You've been hand-picked to join the ProLnk founding network — a closed group of {data.businessType ? `${data.businessType} and other` : ""} service pros locking in lifetime perks before public launch.
            </p>

            <p className="text-white/40 text-sm mb-8 max-w-md mx-auto">
              Only 2,125 founding spots exist. Your seat is reserved.
            </p>

            {/* Benefits pills */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-2xl mx-auto">
              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3 flex flex-col items-center gap-2">
                <Lock className="w-5 h-5 text-teal-300" />
                <span className="text-white/80 text-[11px] font-bold leading-tight text-center">$149/mo<br /><span className="text-white/40 font-medium">Locked for life</span></span>
              </div>
              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3 flex flex-col items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-300" />
                <span className="text-white/80 text-[11px] font-bold leading-tight text-center">72% Bonus<br /><span className="text-white/40 font-medium">On every job</span></span>
              </div>
              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3 flex flex-col items-center gap-2">
                <Users className="w-5 h-5 text-teal-300" />
                <span className="text-white/80 text-[11px] font-bold leading-tight text-center">4-gen network<br /><span className="text-white/40 font-medium">Override income</span></span>
              </div>
              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3 flex flex-col items-center gap-2">
                <Award className="w-5 h-5 text-teal-300" />
                <span className="text-white/80 text-[11px] font-bold leading-tight text-center">TrustyPro<br /><span className="text-white/40 font-medium">Certified badge</span></span>
              </div>
            </div>

            <Link
              href={`/pro-waitlist?ref=${data.referralCode}`}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-[#0A1628] font-black text-lg rounded-2xl transition-all shadow-2xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-400/50 hover:-translate-y-0.5"
            >
              Claim My Spot
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <p className="text-white/30 text-xs mt-6 max-w-sm mx-auto">
              90 days free top-tier subscription · Charter Member status · Home Origination Bonus
            </p>
          </div>

          {/* Subtle proof line below card */}
          <div className="text-center mt-8">
            <p className="text-white/40 text-xs font-medium tracking-wide">
              <span className="text-teal-300">●</span> Founding network active in DFW — verified pros only
            </p>
          </div>

        </div>
      </main>

      <footer className="relative z-10 py-6 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center text-white/30 text-xs">
          ProLnk Founding Network <span className="mx-2 text-white/20">·</span> DFW, Texas
        </div>
      </footer>
    </div>
  );
}
