import { trpc } from "@/lib/trpc";
import { useParams } from "wouter";
import { Link } from "wouter";
import { Zap, ArrowRight, Loader2, UserCheck } from "lucide-react";

export default function JoinBySlug() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = trpc.waitlist.resolveSlug.useQuery(
    { slug: slug ?? "" },
    { enabled: !!slug, retry: false }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#F5E642] animate-spin" />
      </div>
    );
  }

  if (isError || !data?.found) {
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
          href="/apply"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5E642] hover:bg-[#f0dc30] text-[#0A1628] font-bold rounded-xl transition-colors"
        >
          Apply Now
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

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
          4-level referral income, and 72% job commission keep rate.
        </p>

        <Link
          href={`/apply?ref=${data.referralCode}`}
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
