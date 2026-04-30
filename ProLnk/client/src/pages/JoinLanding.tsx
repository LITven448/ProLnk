import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import ProLnkLogo from "@/components/ProLnkLogo";
import { CheckCircle, Users, DollarSign, Zap, ArrowRight } from "lucide-react";

const LEVEL_NAMES: Record<number, string> = {
  1: "Charter Partner",
  2: "Founding Partner",
  3: "Growth Pro",
  4: "Standard Pro",
};

function getRefFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("ref");
}

export default function JoinLanding() {
  const [, navigate] = useLocation();
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    const code = getRefFromUrl();
    if (code) {
      setRefCode(code.toUpperCase());
      // Store in localStorage so it survives the apply flow
      localStorage.setItem("prolnk_ref_code", code.toUpperCase());
    }
  }, []);

  const { data: referrer } = trpc.network.lookupReferrer.useQuery(
    { code: refCode ?? "" },
    { enabled: !!refCode && refCode.length === 6 }
  );

  const handleApply = () => {
    const dest = refCode ? `/apply?ref=${refCode}` : "/apply";
    navigate(dest);
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <ProLnkLogo height={28} variant="light" />
        <Button variant="outline" size="sm" onClick={() => navigate("/apply")}>
          Already have an account? Sign in
        </Button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full">

          {/* Referrer card */}
          {referrer && (
            <div className="bg-white rounded-2xl border border-[#0A1628]/20 shadow-sm p-5 mb-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#0A1628] flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                {referrer.name?.[0]?.toUpperCase() ?? "P"}
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">You were invited by</p>
              <p className="text-lg font-bold text-gray-900">{referrer.name}</p>
              <p className="text-sm text-gray-500">{referrer.businessName} · {referrer.trade}</p>
              <span className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-[#0A1628]/10 text-[#0A1628]">
                {LEVEL_NAMES[referrer.networkLevel]}
              </span>
            </div>
          )}

          {/* Hero */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-3 leading-tight">
              Join the ProLnk <br />Partner Network
            </h1>
            <p className="text-base text-gray-500 max-w-sm mx-auto">
              Every job you complete builds your network. Every contractor you recruit earns you income — automatically.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3 mb-8">
            {[
              { icon: DollarSign, title: "Earn on every job", desc: "0.5%–2% commission on every job you close through the platform" },
              { icon: Users, title: "Build your downline", desc: "Earn network income on every job your recruits close — up to 4 levels deep" },
              { icon: Zap, title: "AI finds the leads", desc: "AI analyzes job photos and automatically routes cross-sell opportunities to you" },
              { icon: CheckCircle, title: "Starter kit mailed to you", desc: "Business cards, rack cards, QR code decal — shipped to your door when you activate" },
            ].map((b) => (
              <div key={b.title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0A1628]/10 flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-5 h-5 text-[#0A1628]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{b.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Commission table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-8">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Commission Structure</h3>
            <div className="space-y-2">
              {[
                { level: "L1 Charter Partner", own: "2.0%", network: "2.0% on all 3 levels", badge: "bg-amber-100 text-amber-800" },
                { level: "L2 Founding Partner", own: "1.5%", network: "1.5% on L3 + L4", badge: "bg-blue-100 text-blue-800" },
                { level: "L3 Growth Pro", own: "1.0%", network: "1.0% on L4 only", badge: "bg-purple-100 text-purple-800" },
                { level: "L4 Standard Pro", own: "0.5%", network: "—", badge: "bg-gray-100 text-gray-700" },
              ].map((row) => (
                <div key={row.level} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${row.badge}`}>{row.level}</span>
                  <span className="text-xs text-gray-500 flex-1">Own: {row.own} · Network: {row.network}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">+ $0.25 per unique home documented for all levels</p>
          </div>

          <Button
            className="w-full bg-[#0A1628] hover:bg-[#0A1628]/90 text-white h-12 text-base font-semibold rounded-xl gap-2"
            onClick={handleApply}
          >
            Apply to Join <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-xs text-gray-400 text-center mt-3">
            Licensed home service professionals only. Texas DFW market.
          </p>
        </div>
      </main>
    </div>
  );
}
