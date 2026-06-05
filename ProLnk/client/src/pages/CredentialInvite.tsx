import { useParams } from "wouter";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import ProLnkLogo from "@/components/ProLnkLogo";

export default function CredentialInvite() {
  const params = useParams();
  const token = (params as { token?: string }).token ?? "";
  const [started, setStarted] = useState(false);

  const { data, isLoading, refetch } = trpc.roster.publicResume.useQuery(
    { token },
    { enabled: token.length >= 8 },
  );

  const startCheck = trpc.roster.startSelfBackgroundCheck.useMutation({
    onSuccess: (res) => {
      setStarted(true);
      refetch();
      if (res.invitationUrl) window.location.href = res.invitationUrl;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
        <Loader2 className="w-8 h-8 text-[#0d9488] animate-spin" />
      </div>
    );
  }

  if (!data || data.valid === false) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Invite link not found</h1>
          <p className="text-slate-300 text-sm">This credential link is invalid or expired. Ask your company to re-send it.</p>
        </div>
      </div>
    );
  }

  const bgStatus = String(data.backgroundCheckStatus ?? "not_submitted");
  const isClear = bgStatus === "clear" || bgStatus === "passed";
  const inProgress = bgStatus === "pending" || started;

  return (
    <div className="min-h-screen bg-[#0A1628] flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <ProLnkLogo className="h-8" />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-[#0d9488]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#0d9488]">ProLnk Credential</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Hi {data.firstName}</h1>
          <p className="text-sm text-gray-500 mb-6">
            {data.companyName} added you to their crew. Complete your background check to get cleared for work — your clearance follows you wherever you go.
          </p>

          <div className="rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Clearance tier</span>
              <span className={`text-sm font-bold ${data.tier >= 1 ? "text-[#0d9488]" : "text-gray-500"}`}>
                Tier {data.tier} · {data.tierLabel}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {isClear ? (
                <><CheckCircle className="w-4 h-4 text-[#0d9488]" /><span className="text-gray-700">Background check cleared</span></>
              ) : inProgress ? (
                <><Loader2 className="w-4 h-4 text-amber-500 animate-spin" /><span className="text-gray-700">Background check in progress</span></>
              ) : (
                <><AlertCircle className="w-4 h-4 text-gray-400" /><span className="text-gray-500">No background check yet</span></>
              )}
            </div>
          </div>

          {isClear ? (
            <div className="text-center py-2">
              <CheckCircle className="w-10 h-10 text-[#0d9488] mx-auto mb-2" />
              <p className="font-semibold text-gray-900">You're Home-Ready.</p>
              <p className="text-sm text-gray-500">Nothing more to do right now.</p>
            </div>
          ) : (
            <>
              <Button
                onClick={() => startCheck.mutate({ token })}
                disabled={startCheck.isPending || inProgress}
                className="w-full py-4 text-base font-bold bg-[#0d9488] hover:bg-[#0d9488]/90 text-white rounded-xl"
              >
                {startCheck.isPending ? <Loader2 className="w-5 h-5 animate-spin" />
                  : inProgress ? "Background check started"
                  : "Start background check"}
              </Button>
              {startCheck.data && startCheck.data.success === false && (
                <p className="text-xs text-amber-600 mt-3 text-center">{startCheck.data.message}</p>
              )}
              {startCheck.error && (
                <p className="text-xs text-red-500 mt-3 text-center">{startCheck.error.message}</p>
              )}
              <p className="text-[11px] text-gray-400 mt-3 leading-relaxed text-center">
                Your background check is processed by Checkr under the FCRA. The report belongs to you and is reusable across ProLnk jobs.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
